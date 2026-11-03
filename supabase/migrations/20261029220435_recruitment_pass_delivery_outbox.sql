create table forge_recruitment.provisioning_outbox(
 id uuid primary key default gen_random_uuid(),
 application_id uuid not null unique references forge_recruitment.applications(id) on delete cascade,
 receipt_id uuid not null references forge_recruitment.attempts(id),
 payload jsonb not null check(payload->>'eligibility'='training'),
 status text not null default 'pending' check(status in ('pending','leased','provisioned','attention')),
 delivery_attempts integer not null default 0 check(delivery_attempts between 0 and 8),
 next_attempt_at timestamptz not null default clock_timestamp(),
 lease_token uuid,lease_until timestamptz,ack_token uuid,
 trainee_id text check(trainee_id ~ '^TRN-[a-zA-Z0-9_-]{1,90}$'),
 last_error_code text check(last_error_code in ('bridge_unavailable','invalid_receipt','invalid_event')),
 created_at timestamptz not null default clock_timestamp(),provisioned_at timestamptz,
 check((status='leased')=(lease_token is not null and lease_until is not null))
);
create index recruitment_provision_due on forge_recruitment.provisioning_outbox(next_attempt_at) where status='pending';
create index recruitment_provision_receipt on forge_recruitment.provisioning_outbox(receipt_id);
create table forge_recruitment.invitation_outbox(
 id uuid primary key default gen_random_uuid(),
 application_id uuid not null unique references forge_recruitment.applications(id) on delete cascade,
 event_id uuid not null unique references forge_recruitment.provisioning_outbox(id) on delete cascade,
 recipient_email text not null,
 trainee_id text not null check(trainee_id ~ '^TRN-[a-zA-Z0-9_-]{1,90}$'),
 status text not null default 'pending' check(status in ('pending','sending','sent','attention')),
 created_at timestamptz not null default clock_timestamp()
);
alter table forge_recruitment.provisioning_outbox enable row level security;
alter table forge_recruitment.invitation_outbox enable row level security;
revoke all on forge_recruitment.provisioning_outbox,forge_recruitment.invitation_outbox from public,anon,authenticated;
grant select,insert,update on forge_recruitment.provisioning_outbox,forge_recruitment.invitation_outbox to service_role;

create function public.forge_recruitment_claim(p_limit integer default 5)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare items jsonb;moment timestamptz:=clock_timestamp();
begin
 if p_limit is null or p_limit<1 or p_limit>5 then raise exception 'Invalid batch size'; end if;
 update forge_recruitment.provisioning_outbox set status='attention',lease_token=null,lease_until=null
 where status='leased' and lease_until<=moment and delivery_attempts>=8;
 with due as (
 select id from forge_recruitment.provisioning_outbox
 where delivery_attempts<8 and ((status='pending' and next_attempt_at<=moment) or (status='leased' and lease_until<=moment))
 order by created_at,id for update skip locked limit p_limit
 ), claimed as (
 update forge_recruitment.provisioning_outbox o set status='leased',lease_token=gen_random_uuid(),lease_until=moment+interval '5 minutes',delivery_attempts=delivery_attempts+1
 from due where o.id=due.id returning o.id,o.lease_token,o.payload
 )
 select coalesce(jsonb_agg(jsonb_build_object('eventId',id,'leaseToken',lease_token,'payload',payload)),'[]'::jsonb) into items from claimed;
 return items;
end $$;

create function public.forge_recruitment_settle(p_event uuid,p_lease uuid,p_trainee text default null,p_error text default null)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare job forge_recruitment.provisioning_outbox;moment timestamptz:=clock_timestamp();
begin
 if (p_trainee is null)=(p_error is null) or (p_trainee is not null and p_trainee !~ '^TRN-[a-zA-Z0-9_-]{1,90}$')
 or (p_error is not null and p_error not in ('bridge_unavailable','invalid_receipt','invalid_event')) then raise exception 'Invalid delivery result'; end if;
 select * into job from forge_recruitment.provisioning_outbox where id=p_event for update;
 if not found then return '{"missing":true}'::jsonb; end if;
 if job.status='provisioned' and job.ack_token=p_lease and job.trainee_id=p_trainee then return '{"saved":true}'::jsonb; end if;
 if job.status<>'leased' or job.lease_token is distinct from p_lease or job.lease_until<=moment then return '{"conflict":true}'::jsonb; end if;
 if p_trainee is not null then
 update forge_recruitment.provisioning_outbox set status='provisioned',trainee_id=p_trainee,ack_token=p_lease,provisioned_at=moment,last_error_code=null,lease_token=null,lease_until=null where id=job.id;
 -- Prepared only after a verified provisioning receipt. A separate, disabled
 -- invitation sender must establish its own idempotency and provider receipts.
 insert into forge_recruitment.invitation_outbox(application_id,event_id,recipient_email,trainee_id)
 values(job.application_id,job.id,job.payload->>'verifiedEmail',p_trainee) on conflict(application_id) do nothing;
 else
 update forge_recruitment.provisioning_outbox set status=case when delivery_attempts>=8 or p_error='invalid_event' then 'attention' else 'pending' end,
 last_error_code=p_error,next_attempt_at=moment+make_interval(secs=>least(3600,15*power(2,delivery_attempts-1))::double precision),lease_token=null,lease_until=null where id=job.id;
 end if;
 return '{"saved":true}'::jsonb;
end $$;
revoke all on function public.forge_recruitment_claim(integer) from public,anon,authenticated;
revoke all on function public.forge_recruitment_settle(uuid,uuid,text,text) from public,anon,authenticated;
grant execute on function public.forge_recruitment_claim(integer) to service_role;
grant execute on function public.forge_recruitment_settle(uuid,uuid,text,text) to service_role;

create or replace function public.forge_recruitment_submit(p_owner uuid,p_attempt uuid)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare t forge_recruitment.attempts; app_id uuid; allowance integer; tally integer; moment timestamptz;
begin
 select id,attempt_allowance into app_id,allowance from forge_recruitment.applications where owner=p_owner for update;
 if not found then raise exception 'Attempt unavailable'; end if;
 select * into t from forge_recruitment.attempts where id=p_attempt and application_id=app_id for update;
 if not found then raise exception 'Attempt unavailable'; end if;
 if t.status in ('abandoned','expired') then raise exception 'Attempt closed'; end if;
 if t.status='in_progress' then
 moment:=clock_timestamp();
 select count(*) into tally from forge_recruitment.answers ans
 join jsonb_array_elements(t.questions) q on q->>'id'=ans.question_id
 where ans.attempt_id=t.id and ans.option_id=q->>'correctOptionId'
 and ans.received_at>=t.started_at and ans.received_at<t.deadline_at;
 update forge_recruitment.attempts set correct=tally,status=case when tally>=23 then 'passed' else 'not_passed' end,completed_at=moment
 where id=t.id returning * into t;
 update forge_recruitment.applications set status=case when tally>=23 then 'passed'
 when (select count(*) from forge_recruitment.attempts where application_id=app_id)>=allowance then 'review_required' else 'assessing' end,
 updated_at=moment where id=app_id;
 end if;
 if t.status='passed' then
 insert into forge_recruitment.provisioning_outbox(application_id,receipt_id,payload)
 select a.id,t.id,jsonb_build_object('applicantId',a.id,'verifiedEmail',a.email,'displayName',a.payload->>'name','assessmentReceiptId',t.id,'eligibility','training')
 from forge_recruitment.applications a where a.id=app_id on conflict(application_id) do nothing;
 end if;
 return jsonb_build_object('id',t.id,'status',t.status,'correct',t.correct,'total',30);
end $$;
