begin;
create or replace function public.forge_notification_begin_send(p_queue text,p_id uuid,p_lease uuid) returns jsonb language plpgsql security invoker set search_path='' as $$
declare t text:=public.forge_notification_table(p_queue);prior boolean;recipient_email text;first_at timestamptz;held boolean;blocked boolean;begin
 if t is null then raise exception 'Invalid queue';end if;
 execute format('select recipient from forge_redesign_test.%I where id=$1',t) into recipient_email using p_id;
 if recipient_email is null then raise exception 'Unknown delivery';end if;
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(lower(recipient_email),74265023));
 execute format('select acceptance_uncertain,first_attempt_at from forge_redesign_test.%I where id=$1 and lease_token=$2 and status=''sending'' and leased_until>now() for update',t) into prior,first_at using p_id,p_lease;
 if prior is null or first_at is null then raise exception 'Current delivery lease required';end if;
 blocked:=public.forge_notification_recipient_blocked(recipient_email);
 select exists(select 1 from (
  select 'school'::text as queue,id,first_attempt_at,provider_id,status,recipient,acceptance_uncertain from forge_redesign_test.school_notification_outbox
  union all select 'participation'::text,id,first_attempt_at,provider_id,status,recipient,acceptance_uncertain from forge_redesign_test.notification_outbox
  union all select 'proposal'::text,id,first_attempt_at,provider_id,status,recipient,acceptance_uncertain from forge_redesign_test.proposal_notification_outbox
 ) j where lower(j.recipient)=lower(recipient_email) and j.provider_id is null and j.status<>'cancelled' and j.acceptance_uncertain and (j.queue<>p_queue or j.id<>p_id)
 and (not prior or (j.first_attempt_at,j.queue,j.id)<(first_at,p_queue,p_id))) into held;
 if not blocked and not held then execute format('update forge_redesign_test.%I set acceptance_uncertain=true where id=$1',t) using p_id;end if;
 return jsonb_build_object('priorUncertain',prior,'suppressed',blocked,'unresolved',held);
end $$;
commit;
