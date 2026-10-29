-- Fictional records only. Run inside BEGIN/ROLLBACK.
do $$
declare owner_id uuid:=gen_random_uuid();app_id uuid;event_id uuid;attempt_id uuid;q jsonb;job jsonb;replay jsonb;result jsonb;old_lease uuid;new_lease uuid;
begin
 insert into auth.users(id,email,email_confirmed_at) values(owner_id,owner_id::text||'@example.invalid',now());
 perform set_config('role','service_role',true);
 perform public.forge_recruitment_save(owner_id,owner_id::text||'@example.invalid','{"consent":true,"name":"Fictional queued applicant"}');
 select id into app_id from forge_recruitment.applications where owner=owner_id;
 select jsonb_agg(jsonb_build_object('id','q'||n,'prompt','Fictional delivery question '||n,'options',jsonb_build_array(jsonb_build_object('id','a','text','One'),jsonb_build_object('id','b','text','Two'),jsonb_build_object('id','c','text','Three'),jsonb_build_object('id','d','text','Four')),'correctOptionId','a')) into q from generate_series(1,30) n;
 for n in 1..10 loop insert into forge_recruitment.forms(id,questions,reviewed) values('delivery-fixture-'||owner_id||'-'||n,q,true); end loop;
 result:=public.forge_recruitment_start(owner_id,gen_random_uuid());attempt_id:=(result->>'id')::uuid;
 for n in 1..23 loop perform public.forge_recruitment_answer(owner_id,attempt_id,'q'||n,'a'); end loop;
 perform public.forge_recruitment_submit(owner_id,attempt_id);
 perform public.forge_recruitment_submit(owner_id,attempt_id);
 if (select count(*) from forge_recruitment.provisioning_outbox where application_id=app_id)<>1 then raise exception 'Pass did not queue exactly one event'; end if;
 if exists(select 1 from forge_recruitment.invitation_outbox where application_id=app_id) then raise exception 'Invitation queued before provisioning'; end if;
 select id into event_id from forge_recruitment.provisioning_outbox where application_id=app_id;
 result:=public.forge_recruitment_claim(1);job:=result->0;old_lease:=(job->>'leaseToken')::uuid;
 if (job->>'eventId')::uuid<>event_id or job->'payload'->>'eligibility'<>'training' then raise exception 'Unsafe claim payload'; end if;
 if jsonb_array_length(public.forge_recruitment_claim(1))<>0 then raise exception 'Already leased job claimed twice'; end if;
 result:=public.forge_recruitment_settle(event_id,gen_random_uuid(),'TRN-fixture',null);
 if result->>'conflict'<>'true' then raise exception 'Wrong lease accepted'; end if;
 perform public.forge_recruitment_settle(event_id,old_lease,null,'bridge_unavailable');
 if exists(select 1 from forge_recruitment.invitation_outbox where application_id=app_id) then raise exception 'Failed bridge queued invitation'; end if;
 if jsonb_array_length(public.forge_recruitment_claim(1))<>0 then raise exception 'Retry backoff ignored'; end if;
 update forge_recruitment.provisioning_outbox set next_attempt_at=now()-interval '1 second' where id=event_id;
 result:=public.forge_recruitment_claim(1);job:=result->0;new_lease:=(job->>'leaseToken')::uuid;
 if new_lease=old_lease then raise exception 'Retry reused lease'; end if;
 result:=public.forge_recruitment_settle(event_id,old_lease,'TRN-fixture',null);
 if result->>'conflict'<>'true' then raise exception 'Stale lease accepted'; end if;
 result:=public.forge_recruitment_settle(event_id,new_lease,'TRN-fixture',null);
 replay:=public.forge_recruitment_settle(event_id,new_lease,'TRN-fixture',null);
 if result<>replay or result->>'saved'<>'true' then raise exception 'Acknowledgement not idempotent'; end if;
 if (select count(*) from forge_recruitment.invitation_outbox where application_id=app_id)<>1 then raise exception 'Missing or duplicate invitation'; end if;
 if (select status from forge_recruitment.provisioning_outbox where id=event_id)<>'provisioned' then raise exception 'Provision not recorded'; end if;
 if has_function_privilege('authenticated','public.forge_recruitment_claim(integer)','execute') or has_table_privilege('anon','forge_recruitment.invitation_outbox','select') then raise exception 'Queue exposed to applicants'; end if;
end $$;

do $$
declare owner_id uuid:=gen_random_uuid();app_id uuid;attempt_id uuid;event_id uuid;form_id text;job jsonb;old_token uuid;result jsonb;
begin
 -- A separate fixture tests lease expiry and the hard retry budget.
 perform set_config('role','none',true);
 insert into auth.users(id,email,email_confirmed_at) values(owner_id,owner_id::text||'@example.invalid',now());
 perform set_config('role','service_role',true);
 perform public.forge_recruitment_save(owner_id,owner_id::text||'@example.invalid','{"consent":true,"name":"Fictional exhausted delivery"}');
 select id into app_id from forge_recruitment.applications where owner=owner_id;
 select id into form_id from forge_recruitment.forms where id like 'delivery-fixture-%' limit 1;
 insert into forge_recruitment.attempts(application_id,request_id,form_id,questions,status,correct,started_at,deadline_at,completed_at)
 values(app_id,gen_random_uuid(),form_id,'[]'::jsonb,'passed',23,now()-interval '6 minutes',now()-interval '1 minute',now()) returning id into attempt_id;
 perform public.forge_recruitment_submit(owner_id,attempt_id);
 job:=public.forge_recruitment_claim(1)->0;event_id:=(job->>'eventId')::uuid;old_token:=(job->>'leaseToken')::uuid;
 update forge_recruitment.provisioning_outbox set lease_until=now()-interval '1 second' where id=event_id;
 job:=public.forge_recruitment_claim(1)->0;
 if (job->>'leaseToken')::uuid=old_token then raise exception 'Expired lease was not replaced'; end if;
 result:=public.forge_recruitment_settle(event_id,old_token,'TRN-expired',null);
 if result->>'conflict'<>'true' then raise exception 'Expired lease acknowledged'; end if;
 perform public.forge_recruitment_settle(event_id,(job->>'leaseToken')::uuid,null,'bridge_unavailable');
 for n in 3..8 loop
 update forge_recruitment.provisioning_outbox set next_attempt_at=now()-interval '1 second' where id=event_id;
 job:=public.forge_recruitment_claim(1)->0;
 perform public.forge_recruitment_settle(event_id,(job->>'leaseToken')::uuid,null,'bridge_unavailable');
 end loop;
 if (select status from forge_recruitment.provisioning_outbox where id=event_id)<>'attention' then raise exception 'Retry budget did not stop'; end if;
 if jsonb_array_length(public.forge_recruitment_claim(1))<>0 then raise exception 'Exhausted delivery reclaimed'; end if;
 if exists(select 1 from forge_recruitment.invitation_outbox where application_id=app_id) then raise exception 'Exhausted delivery queued invitation'; end if;
end $$;
