-- Branch-only until release. No scheduler, email or access grant is activated here.
alter table forge_recruitment.invitation_outbox
 add column template_version integer not null default 1 check(template_version=1),
 add column recipient_snapshot jsonb,
 add column delivery_attempts integer not null default 0 check(delivery_attempts between 0 and 8),
 add column next_attempt_at timestamptz not null default clock_timestamp(),
 add column first_attempt_at timestamptz,
 add column lease_token uuid,add column lease_until timestamptz,add column ack_token uuid,
 add column provider_id text unique,add column accepted_at timestamptz,
 add column last_error_code text check(last_error_code in ('invalid_invitation','email_unavailable','invalid_receipt')),
 add constraint training_invitation_lease check((status='sending')=(lease_token is not null and lease_until is not null));
create index training_invitation_due on forge_recruitment.invitation_outbox(next_attempt_at) where status='pending';

create function public.forge_training_invitation_claim(p_limit integer default 1)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare moment timestamptz:=clock_timestamp();result jsonb;
begin
 if p_limit is null or p_limit<1 or p_limit>5 then raise exception 'Invalid invitation batch';end if;
 -- Resend idempotency expires after 24 hours. Never automatically re-send an
 -- uncertain acceptance outside a conservative 23-hour retry window.
 update forge_recruitment.invitation_outbox set status='attention',lease_token=null,lease_until=null
 where status in ('pending','sending') and (status='pending' or lease_until<=moment)
 and (delivery_attempts>=8 or first_attempt_at<=moment-interval '23 hours');
 update forge_recruitment.invitation_outbox set status='pending',lease_token=null,lease_until=null
 where status='sending' and lease_until<=moment;
 update forge_recruitment.invitation_outbox i set status='attention',last_error_code='invalid_invitation'
 where i.status='pending' and not exists(
  select 1 from forge_recruitment.applications a join forge_recruitment.provisioning_outbox p on p.application_id=a.id
  where a.id=i.application_id and p.id=i.event_id and a.status='passed' and a.payload->'testOnly' is distinct from 'true'::jsonb and p.status='provisioned'
   and p.trainee_id=i.trainee_id and a.email=i.recipient_email and p.payload->>'verifiedEmail'=i.recipient_email
 );
 with due as (
  select i.id from forge_recruitment.invitation_outbox i where i.status='pending' and i.next_attempt_at<=moment and i.delivery_attempts<8
  order by i.created_at,i.id for update skip locked limit p_limit
 ), claimed as (
  update forge_recruitment.invitation_outbox i set status='sending',lease_token=gen_random_uuid(),lease_until=moment+interval '3 minutes',
   first_attempt_at=coalesce(i.first_attempt_at,moment),delivery_attempts=i.delivery_attempts+1,
   recipient_snapshot=coalesce(i.recipient_snapshot,jsonb_build_object('verifiedEmail',i.recipient_email,'displayName',a.payload->>'name','traineeId',i.trainee_id))
  from due,forge_recruitment.applications a where i.id=due.id and a.id=i.application_id
  returning i.id,i.lease_token,i.recipient_snapshot
 ) select coalesce(jsonb_agg(jsonb_build_object('invitationId',id,'leaseToken',lease_token,'recipient',recipient_snapshot)),'[]'::jsonb) into result from claimed;
 return result;
end $$;

create function public.forge_training_invitation_settle(p_invitation uuid,p_lease uuid,p_provider text default null,p_error text default null)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare job forge_recruitment.invitation_outbox;moment timestamptz:=clock_timestamp();
begin
 if (p_provider is null)=(p_error is null) or (p_provider is not null and p_provider !~* '^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$')
 or (p_error is not null and p_error not in ('invalid_invitation','email_unavailable','invalid_receipt')) then raise exception 'Invalid invitation receipt';end if;
 select * into job from forge_recruitment.invitation_outbox where id=p_invitation for update;
 if not found then return '{"missing":true}'::jsonb;end if;
 if job.status='sent' and job.ack_token=p_lease and job.provider_id=p_provider then return '{"saved":true}'::jsonb;end if;
 if job.status<>'sending' or job.lease_token is distinct from p_lease or job.lease_until<=moment then return '{"conflict":true}'::jsonb;end if;
 if p_provider is not null then
  update forge_recruitment.invitation_outbox set status='sent',provider_id=p_provider,accepted_at=moment,ack_token=p_lease,
   last_error_code=null,lease_token=null,lease_until=null where id=job.id;
 else
  update forge_recruitment.invitation_outbox set status=case when delivery_attempts>=8 or p_error='invalid_invitation' or first_attempt_at<=moment-interval '23 hours' then 'attention' else 'pending' end,
   next_attempt_at=moment+make_interval(secs=>least(3600,15*power(2,delivery_attempts-1))::double precision),last_error_code=p_error,lease_token=null,lease_until=null where id=job.id;
 end if;
 return '{"saved":true}'::jsonb;
end $$;
revoke all on function public.forge_training_invitation_claim(integer) from public,anon,authenticated;
revoke all on function public.forge_training_invitation_settle(uuid,uuid,text,text) from public,anon,authenticated;
grant execute on function public.forge_training_invitation_claim(integer) to service_role;
grant execute on function public.forge_training_invitation_settle(uuid,uuid,text,text) to service_role;
