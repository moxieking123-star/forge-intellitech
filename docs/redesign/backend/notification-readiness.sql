begin;
alter table forge_redesign_test.school_notification_outbox drop constraint school_notification_outbox_status_check;
alter table forge_redesign_test.school_notification_outbox add constraint school_notification_outbox_status_check check(status in ('pending','sending','sent','failed','cancelled'));
alter table forge_redesign_test.notification_outbox drop constraint notification_outbox_status_check;
alter table forge_redesign_test.notification_outbox add constraint notification_outbox_status_check check(status in ('pending','sending','sent','failed','cancelled'));
alter table forge_redesign_test.proposal_notification_outbox drop constraint proposal_notification_outbox_status_check;
alter table forge_redesign_test.proposal_notification_outbox add constraint proposal_notification_outbox_status_check check(status in ('pending','sending','sent','failed','cancelled'));
create table forge_redesign_test.notification_suppression_audit(job_id uuid primary key,request_id uuid not null,previous_status text not null,reason text not null,recorded_at timestamptz not null default now());
create table forge_redesign_test.notification_delivery_policy(id boolean primary key default true check(id),new_jobs_per_24h integer not null check(new_jobs_per_24h between 1 and 80));
insert into forge_redesign_test.notification_delivery_policy(id,new_jobs_per_24h) values(true,40);
alter table forge_redesign_test.notification_suppression_audit enable row level security;
alter table forge_redesign_test.notification_delivery_policy enable row level security;
revoke all on forge_redesign_test.notification_suppression_audit,forge_redesign_test.notification_delivery_policy from public,anon,authenticated,service_role;
grant select on forge_redesign_test.notification_suppression_audit,forge_redesign_test.notification_delivery_policy to service_role;
create index school_notification_first_attempt on forge_redesign_test.school_notification_outbox(first_attempt_at) where first_attempt_at is not null;
create index participation_notification_first_attempt on forge_redesign_test.notification_outbox(first_attempt_at) where first_attempt_at is not null;
create index proposal_notification_first_attempt on forge_redesign_test.proposal_notification_outbox(first_attempt_at) where first_attempt_at is not null;
-- Exact known synthetic notifications only. Retain history and prevent delivery.
insert into forge_redesign_test.notification_suppression_audit(job_id,request_id,previous_status,reason)
select o.id,s.id,o.status,'Synthetic prelaunch verification; never send as a real school notification.' from forge_redesign_test.school_notification_outbox o join forge_redesign_test.school_onboarding_requests s on s.id=o.request_id
where o.status='pending' and o.attempts=0 and o.first_attempt_at is null and o.provider_id is null
and ((o.id='71f55bb2-5a8d-4c55-993f-cfe4ae4e039f' and s.id='6059d9fc-117a-4d87-871c-9a6c6d285d80' and s.school_name='Synthetic Referral HTTP School' and s.payload->>'email'='referral-http-school@invalid.example')
or (o.id='a82fd7b9-0ed1-439a-82cb-95362ae22c18' and s.id='18dffb13-22be-4f27-9c3b-decc62082f4c' and s.school_name='Synthetic Assisted Browser School' and s.payload->>'email'='referral-browser-school@invalid.example'));
update forge_redesign_test.school_notification_outbox o set status='cancelled',last_error='Suppressed synthetic verification notification; no email sent.' from forge_redesign_test.notification_suppression_audit a where a.job_id=o.id and o.status='pending' and o.attempts=0;
create or replace function public.forge_notification_claim(p_queue text,p_limit int default 5) returns jsonb language plpgsql security invoker set search_path='' as $$
declare t text:=public.forge_notification_table(p_queue);result jsonb;used bigint;cap integer;slots integer;retry_ids uuid[];new_ids uuid[];begin
 if t is null or p_limit is null or p_limit not between 1 and 10 then raise exception 'Invalid queue or batch';end if;
 perform pg_catalog.pg_advisory_xact_lock(74265022);
 select new_jobs_per_24h into cap from forge_redesign_test.notification_delivery_policy where id=true;
 if cap is null then raise exception 'Delivery budget unconfigured';end if;
 select (select count(*) from forge_redesign_test.school_notification_outbox where first_attempt_at>=now()-interval '24 hours')+(select count(*) from forge_redesign_test.notification_outbox where first_attempt_at>=now()-interval '24 hours')+(select count(*) from forge_redesign_test.proposal_notification_outbox where first_attempt_at>=now()-interval '24 hours') into used;
 execute format('update forge_redesign_test.%I set status=''failed'',last_error=''Delivery window elapsed; reconcile provider before retry'',lease_token=null,leased_until=null where (status in (''pending'',''sending'') and first_attempt_at < now()-interval ''23 hours'') or (status=''sending'' and leased_until<now() and attempts>=6)',t);
 execute format('select coalesce(array_agg(id),array[]::uuid[]) from (select id from forge_redesign_test.%I where first_attempt_at is not null and attempts<6 and (status=''pending'' and next_attempt_at<=now() or status=''sending'' and leased_until<now()) order by created_at,id for update skip locked limit $1)x',t) into retry_ids using p_limit;
 slots:=least(p_limit-coalesce(array_length(retry_ids,1),0),greatest(0,cap-used)::integer);
 execute format('select coalesce(array_agg(id),array[]::uuid[]) from (select id from forge_redesign_test.%I where first_attempt_at is null and attempts<6 and status=''pending'' and next_attempt_at<=now() order by created_at,id for update skip locked limit $1)x',t) into new_ids using slots;
 execute format('with claimed as (update forge_redesign_test.%I set status=''sending'',attempts=attempts+1,first_attempt_at=coalesce(first_attempt_at,now()),lease_token=gen_random_uuid(),leased_until=now()+interval ''5 minutes'' where id=any($1) returning *) select coalesce(jsonb_agg(to_jsonb(claimed)),''[]''::jsonb) from claimed',t) into result using retry_ids||new_ids;
 if p_queue='school' then
 select coalesce(jsonb_agg(j||jsonb_build_object('payload',s.payload,'queue',p_queue)),'[]') into result from jsonb_array_elements(result)j join forge_redesign_test.school_onboarding_requests s on s.id=(j->>'request_id')::uuid;
 elsif p_queue='participation' then
 select coalesce(jsonb_agg(j||jsonb_build_object('payload',s.payload,'queue',p_queue)),'[]') into result from jsonb_array_elements(result)j join forge_redesign_test.participation_submissions s on s.id=(j->>'submission_id')::uuid;
 else select coalesce(jsonb_agg(j||jsonb_build_object('queue',p_queue)),'[]') into result from jsonb_array_elements(result)j;end if;
 return result;
end $$;
create or replace function public.forge_notification_finish(p_queue text,p_id uuid,p_lease uuid,p_provider_id text default null,p_error text default null) returns boolean language plpgsql security invoker set search_path='' as $$
declare t text:=public.forge_notification_table(p_queue);affected integer;begin
 if t is null then raise exception 'Invalid queue';end if;
 execute format('update forge_redesign_test.%I set status=case when $3 is not null then ''sent'' when attempts>=6 or left(coalesce($4,''''),12)=''[permanent] '' then ''failed'' else ''pending'' end,provider_id=left($3,255),sent_at=case when $3 is not null then now() else null end,last_error=case when $3 is null then left(coalesce($4,''Provider failure''),1000) else null end,next_attempt_at=now()+make_interval(secs=>least(3600,60*power(2,attempts)::int)),lease_token=null,leased_until=null where id=$1 and lease_token=$2 and status=''sending'' and leased_until>now()',t) using p_id,p_lease,p_provider_id,p_error;
 get diagnostics affected=row_count;return affected=1;
end $$;
commit;
