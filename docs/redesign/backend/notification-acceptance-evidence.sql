begin;
alter table forge_redesign_test.school_notification_outbox add column acceptance_uncertain boolean not null default false;
alter table forge_redesign_test.notification_outbox add column acceptance_uncertain boolean not null default false;
alter table forge_redesign_test.proposal_notification_outbox add column acceptance_uncertain boolean not null default false;
-- Earlier attempts without a receipt are conservatively treated as ambiguous.
update forge_redesign_test.school_notification_outbox set acceptance_uncertain=true where first_attempt_at is not null and provider_id is null and status<>'cancelled';
update forge_redesign_test.notification_outbox set acceptance_uncertain=true where first_attempt_at is not null and provider_id is null and status<>'cancelled';
update forge_redesign_test.proposal_notification_outbox set acceptance_uncertain=true where first_attempt_at is not null and provider_id is null and status<>'cancelled';

create function public.forge_notification_begin_send(p_queue text,p_id uuid,p_lease uuid) returns jsonb language plpgsql security invoker set search_path='' as $$
declare t text:=public.forge_notification_table(p_queue);prior boolean;begin
 if t is null then raise exception 'Invalid queue';end if;
 execute format('select acceptance_uncertain from forge_redesign_test.%I where id=$1 and lease_token=$2 and status=''sending'' and leased_until>now() for update',t) into prior using p_id,p_lease;
 if prior is null then raise exception 'Current delivery lease required';end if;
 execute format('update forge_redesign_test.%I set acceptance_uncertain=true where id=$1',t) using p_id;
 return jsonb_build_object('priorUncertain',prior);
end $$;

create function public.forge_notification_send_rejected(p_queue text,p_id uuid,p_lease uuid,p_prior_uncertain boolean) returns boolean language plpgsql security invoker set search_path='' as $$
declare t text:=public.forge_notification_table(p_queue);n integer;begin
 if t is null or p_prior_uncertain is null then raise exception 'Invalid rejection evidence';end if;
 -- A later definitive rejection never erases uncertainty from an earlier attempt.
 execute format('update forge_redesign_test.%I set acceptance_uncertain=$3 where id=$1 and lease_token=$2 and status=''sending'' and leased_until>now()',t) using p_id,p_lease,p_prior_uncertain;
 get diagnostics n=row_count;return n=1;
end $$;

create or replace function public.forge_notification_send_guard(p_queue text,p_id uuid,p_recipient text) returns jsonb language plpgsql security invoker set search_path='' as $$
declare t text:=public.forge_notification_table(p_queue);first_at timestamptz;unresolved boolean;begin
 if t is null then raise exception 'Invalid queue';end if;
 execute format('select first_attempt_at from forge_redesign_test.%I where id=$1 and lower(recipient)=lower($2) and status=''sending''',t) into first_at using p_id,p_recipient;
 if first_at is null then raise exception 'Current delivery claim required';end if;
 select exists(select 1 from (
  select 'school'::text as queue,id,first_attempt_at,provider_id,status,recipient,acceptance_uncertain from forge_redesign_test.school_notification_outbox
  union all select 'participation'::text,id,first_attempt_at,provider_id,status,recipient,acceptance_uncertain from forge_redesign_test.notification_outbox
  union all select 'proposal'::text,id,first_attempt_at,provider_id,status,recipient,acceptance_uncertain from forge_redesign_test.proposal_notification_outbox
 ) j where lower(j.recipient)=lower(p_recipient) and j.provider_id is null and j.status<>'cancelled' and j.acceptance_uncertain and (j.first_attempt_at,j.queue,j.id)<(first_at,p_queue,p_id)) into unresolved;
 return jsonb_build_object('suppressed',public.forge_notification_recipient_blocked(p_recipient),'unresolved',unresolved);
end $$;
revoke all on function public.forge_notification_begin_send(text,uuid,uuid),public.forge_notification_send_rejected(text,uuid,uuid,boolean) from public,anon,authenticated;
grant execute on function public.forge_notification_begin_send(text,uuid,uuid),public.forge_notification_send_rejected(text,uuid,uuid,boolean) to service_role;
commit;
