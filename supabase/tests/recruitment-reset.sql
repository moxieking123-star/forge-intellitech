-- Fictional records only. Run inside BEGIN/ROLLBACK.
do $$
declare
 owner_id uuid:=gen_random_uuid(); admin_id uuid:=gen_random_uuid(); reviewer_id uuid:=gen_random_uuid();
 app_id uuid; reset_id uuid:=gen_random_uuid(); q jsonb; result jsonb; repeated jsonb; first_form text; next_attempt jsonb;
begin
 insert into auth.users(id,email,email_confirmed_at) values
 (owner_id,owner_id::text||'@example.invalid',now()),(admin_id,admin_id::text||'@example.invalid',now()),(reviewer_id,reviewer_id::text||'@example.invalid',now());
 insert into forge_redesign_test.staff_members(email,user_id,role,active) values
 (admin_id::text||'@example.invalid',admin_id,'admin',true),(reviewer_id::text||'@example.invalid',reviewer_id,'school_reviewer',true);
 perform set_config('role','service_role',true);
 perform public.forge_recruitment_save(owner_id,owner_id::text||'@example.invalid','{"consent":true,"name":"Fictional reset applicant"}');
 select id into app_id from forge_recruitment.applications where owner=owner_id;
 select jsonb_agg(jsonb_build_object('id','q'||n,'prompt','Fictional reset question '||n,'options',jsonb_build_array(jsonb_build_object('id','a','text','One'),jsonb_build_object('id','b','text','Two'),jsonb_build_object('id','c','text','Three'),jsonb_build_object('id','d','text','Four')),'correctOptionId','a')) into q from generate_series(1,30) n;
 for n in 1..10 loop insert into forge_recruitment.forms(id,questions,reviewed) values('reset-fixture-'||owner_id||'-'||n,q,true); end loop;
 for n in 1..3 loop
 next_attempt:=public.forge_recruitment_start(owner_id,gen_random_uuid());
 perform public.forge_recruitment_abandon(owner_id,(next_attempt->>'id')::uuid);
 end loop;
 result:=public.forge_recruitment_staff_action(reviewer_id,reviewer_id::text||'@example.invalid','list','{}');
 if result->>'forbidden'<>'true' then raise exception 'School reviewer gained recruitment access'; end if;
 result:=public.forge_recruitment_staff_action(admin_id,'wrong@example.invalid','list','{}');
 if result->>'forbidden'<>'true' then raise exception 'Actor email mismatch accepted'; end if;
 result:=public.forge_recruitment_staff_action(admin_id,admin_id::text||'@example.invalid','reset',jsonb_build_object('id',app_id,'requestId',reset_id,'reason','Documented fictional connectivity incident.'));
 if result->>'conflict'<>'true' then raise exception 'Reset without version accepted'; end if;
 result:=public.forge_recruitment_staff_action(admin_id,admin_id::text||'@example.invalid','reset',jsonb_build_object('id',app_id,'version',99,'requestId',reset_id,'reason','Documented fictional connectivity incident.'));
 if result->>'conflict'<>'true' then raise exception 'Stale reset accepted'; end if;
 result:=public.forge_recruitment_staff_action(admin_id,admin_id::text||'@example.invalid','reset',jsonb_build_object('id',app_id,'version',1,'requestId',reset_id,'reason','Documented fictional connectivity incident.'));
 if (result->>'allowance')::int<>6 then raise exception 'Reset did not grant next three attempts'; end if;
 repeated:=public.forge_recruitment_staff_action(admin_id,admin_id::text||'@example.invalid','reset',jsonb_build_object('id',app_id,'version',1,'requestId',reset_id,'reason','Documented fictional connectivity incident.'));
 if repeated<>result then raise exception 'Reset request replay changed allowance'; end if;
 if (select count(*) from forge_recruitment.attempts where application_id=app_id)<>3 then raise exception 'Attempt history erased'; end if;
 if (select count(*) from forge_recruitment.reset_audit where application_id=app_id)<>1 then raise exception 'Reset audit not exactly once'; end if;
 result:=public.forge_recruitment_state(owner_id);
 if (result->>'remaining')::int<>3 then raise exception 'Reset not visible to applicant'; end if;
 next_attempt:=public.forge_recruitment_start(owner_id,gen_random_uuid());
 if next_attempt->>'status'<>'in_progress' then raise exception 'Reset did not reopen assessment'; end if;
 result:=public.forge_recruitment_staff_action(admin_id,admin_id::text||'@example.invalid','reset',jsonb_build_object('id',app_id,'version',2,'requestId',gen_random_uuid(),'reason','Another fictional request while active.'));
 if result->>'locked'<>'true' then raise exception 'Active assessment reset allowed'; end if;
 result:=public.forge_recruitment_staff_action(admin_id,admin_id::text||'@example.invalid','list',jsonb_build_object('search',owner_id::text,'status','all','offset',0));
 if (result->>'total')::int<>1 or result::text like '%correctOptionId%' then raise exception 'Unsafe staff review projection'; end if;
 if has_function_privilege('authenticated','public.forge_recruitment_staff_action(uuid,text,text,jsonb)','execute') then raise exception 'Applicant can invoke staff RPC'; end if;
end $$;
