begin;
do $$
begin
 if has_function_privilege('anon','public.forge_notification_claim(text,integer)','EXECUTE') or has_function_privilege('authenticated','public.forge_notification_retry(text,uuid)','EXECUTE') then raise exception 'Delivery privileges exposed'; end if;
 if not has_function_privilege('service_role','public.forge_notification_finish(text,uuid,uuid,text,text)','EXECUTE') then raise exception 'Missing service access'; end if;
end $$;
-- Full state machine fixture uses proposal queue to avoid dependence on auth users.
do $$
declare job uuid; claimed jsonb; token uuid; ok boolean;
begin
 job:=public.forge_proposal_submit('{"name":"Synthetic QA","school":"Example QA","email":"synthetic@example.test"}');
 if public.forge_proposal_submit('{"name":"Synthetic QA","school":"Example QA","email":"synthetic@example.test"}')<>job then raise exception 'Proposal retry created duplicate delivery';end if;
 claimed:=public.forge_notification_claim('proposal',1);
 token:=(claimed->0->>'lease_token')::uuid;
 if claimed->0->>'id' is distinct from job::text then raise exception 'Run tests on an empty proposal queue'; end if;
 ok:=public.forge_notification_finish('proposal',job,gen_random_uuid(),'fake-provider-id',null);
 if ok then raise exception 'Stale lease accepted'; end if;
 ok:=public.forge_notification_finish('proposal',job,token,'fake-provider-id',null);
 if not ok then raise exception 'Valid completion refused'; end if;
 if public.forge_notification_retry('proposal',job) then raise exception 'Sent job retried'; end if;
 update forge_redesign_test.proposal_notification_outbox set status='pending',provider_id=null,first_attempt_at=now()-interval '24 hours' where id=job;
 perform public.forge_notification_claim('proposal',1);
 if (select status from forge_redesign_test.proposal_notification_outbox where id=job)<>'failed' then raise exception 'Expired idempotency window not fenced'; end if;
 if public.forge_notification_retry('proposal',job) then raise exception 'Unsafe old retry accepted'; end if;
end $$;
rollback;
