begin;
-- Recover the oldest attempted job with its original idempotency key before
-- permitting a distinct message to the same recipient. No extra recipient data.
create function public.forge_notification_send_guard(p_queue text,p_id uuid,p_recipient text) returns jsonb language plpgsql security invoker set search_path='' as $$
declare t text:=public.forge_notification_table(p_queue);first_at timestamptz;unresolved boolean;begin
 if t is null then raise exception 'Invalid queue';end if;
 execute format('select first_attempt_at from forge_redesign_test.%I where id=$1 and lower(recipient)=lower($2) and status=''sending''',t) into first_at using p_id,p_recipient;
 if first_at is null then raise exception 'Current delivery claim required';end if;
 select exists(select 1 from (
  select 'school'::text as queue,id,first_attempt_at,provider_id,status,recipient from forge_redesign_test.school_notification_outbox
  union all select 'participation'::text,id,first_attempt_at,provider_id,status,recipient from forge_redesign_test.notification_outbox
  union all select 'proposal'::text,id,first_attempt_at,provider_id,status,recipient from forge_redesign_test.proposal_notification_outbox
 ) j where lower(j.recipient)=lower(p_recipient) and j.provider_id is null and j.status<>'cancelled' and j.first_attempt_at is not null and (j.first_attempt_at,j.queue,j.id)<(first_at,p_queue,p_id)) into unresolved;
 return jsonb_build_object('suppressed',public.forge_notification_recipient_blocked(p_recipient),'unresolved',unresolved);
end $$;
revoke all on function public.forge_notification_send_guard(text,uuid,text) from public,anon,authenticated;
grant execute on function public.forge_notification_send_guard(text,uuid,text) to service_role;
commit;
