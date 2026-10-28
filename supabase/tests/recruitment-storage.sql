-- Fictional fixtures only. The caller MUST run this entire script in a transaction.
do $$
declare
 owner_id uuid := gen_random_uuid(); other_id uuid := gen_random_uuid();
 request_id uuid := gen_random_uuid(); result jsonb; replay jsonb; attempt_id uuid;
 questions jsonb; app_id uuid;
begin
 if has_function_privilege('anon','public.forge_recruitment_start(uuid,uuid)','execute')
 or has_function_privilege('authenticated','public.forge_recruitment_start(uuid,uuid)','execute')
 then raise exception 'Candidate roles can execute privileged recruitment RPC'; end if;
 insert into auth.users(id,email,email_confirmed_at) values
 (owner_id,owner_id::text||'@example.invalid',now()),(other_id,other_id::text||'@example.invalid',now());
 perform set_config('role','service_role',true);
 perform public.forge_recruitment_save(owner_id,owner_id::text||'@example.invalid','{"consent":true,"name":"Fictional integration applicant"}');
 select id into app_id from forge_recruitment.applications where owner=owner_id;
 select jsonb_agg(jsonb_build_object('id','q'||n,'prompt','Fictional question '||n,
 'options',jsonb_build_array(jsonb_build_object('id','a','text','One'),jsonb_build_object('id','b','text','Two'),jsonb_build_object('id','c','text','Three'),jsonb_build_object('id','d','text','Four')),'correctOptionId','a'))
 into questions from generate_series(1,30) n;
 for n in 1..10 loop
 insert into forge_recruitment.forms(id,questions,reviewed) values('fixture-'||owner_id||'-'||n,questions,true);
 end loop;
 result:=public.forge_recruitment_start(owner_id,request_id); attempt_id:=(result->>'id')::uuid;
 replay:=public.forge_recruitment_state(other_id);
 if replay->'application'<>'null'::jsonb or jsonb_array_length(replay->'attempts')<>0 then raise exception 'State ownership leaked'; end if;
 replay:=public.forge_recruitment_state(owner_id);
 if replay::text like '%correctOptionId%' or replay->'attempts'->0->>'id'<>attempt_id::text then raise exception 'Unsafe applicant state'; end if;
 if result::text like '%correctOptionId%' then raise exception 'Answer key leaked'; end if;
 replay:=public.forge_recruitment_start(owner_id,request_id);
 if result-'serverNow'<>replay-'serverNow' then raise exception 'Request replay created a fresh attempt'; end if;
 begin
 perform public.forge_recruitment_start(owner_id,gen_random_uuid());
 raise exception 'Concurrent attempt allowed';
 exception when sqlstate 'P0001' then if sqlerrm<>'Attempt already active' then raise; end if; end;
 begin
 perform public.forge_recruitment_answer(other_id,attempt_id,'q1','a');
 raise exception 'Cross-owner answer allowed';
 exception when sqlstate 'P0001' then if sqlerrm<>'Attempt unavailable' then raise; end if; end;
 for n in 1..23 loop perform public.forge_recruitment_answer(owner_id,attempt_id,'q'||n,'a'); end loop;
 result:=public.forge_recruitment_submit(owner_id,attempt_id);
 if result->>'status'<>'passed' or (result->>'correct')::int<>23 then raise exception 'Pass boundary failed'; end if;
 if result<>public.forge_recruitment_submit(owner_id,attempt_id) then raise exception 'Submission not idempotent'; end if;
 -- Independent applicant consumes three expired attempts; a fourth is denied.
 perform public.forge_recruitment_save(other_id,other_id::text||'@example.invalid','{"consent":true,"name":"Fictional limit applicant"}');
 for n in 1..3 loop
 result:=public.forge_recruitment_start(other_id,gen_random_uuid());
 if n=1 then
 for k in 1..22 loop perform public.forge_recruitment_answer(other_id,(result->>'id')::uuid,'q'||k,'a'); end loop;
 replay:=public.forge_recruitment_submit(other_id,(result->>'id')::uuid);
 if replay->>'status'<>'not_passed' or (replay->>'correct')::int<>22 then raise exception 'Fail boundary incorrect'; end if;
 elsif n=2 then
 replay:=public.forge_recruitment_abandon(other_id,(result->>'id')::uuid);
 if replay->>'status'<>'abandoned' then raise exception 'Abandon failed'; end if;
 if replay<>public.forge_recruitment_abandon(other_id,(result->>'id')::uuid) then raise exception 'Abandon not idempotent'; end if;
 else
 update forge_recruitment.attempts set started_at=now()-interval '6 minutes',deadline_at=now()-interval '1 minute' where id=(result->>'id')::uuid;
 begin
 perform public.forge_recruitment_answer(other_id,(result->>'id')::uuid,'q1','a');
 raise exception 'Late answer allowed';
 exception when sqlstate 'P0001' then if sqlerrm<>'Attempt closed' then raise; end if; end;
 end if;
 end loop;
 begin
 perform public.forge_recruitment_start(other_id,gen_random_uuid());
 raise exception 'Fourth attempt allowed';
 exception when sqlstate 'P0001' then if sqlerrm<>'Staff review required' then raise; end if; end;
 if exists(select 1 from forge_recruitment.attempts where application_id=app_id and status<>'passed') then raise exception 'Saved pass changed'; end if;
end $$;
