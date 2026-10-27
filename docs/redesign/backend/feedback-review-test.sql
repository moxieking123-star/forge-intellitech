begin;
insert into auth.users(id,email,email_confirmed_at) values('b3030303-0303-4303-8303-030303030303','feedback-test@invalid.example',now());
insert into forge_redesign_test.staff_members(email,user_id,role,active) values('feedback-test@invalid.example','b3030303-0303-4303-8303-030303030303','admin',true);
insert into forge_redesign_test.preview_feedback(id,session_id,page,section,reaction,visitor_type,comment,build)
values('b4040404-0404-4404-8404-040404040404','b5050505-0505-4505-8505-050505050505','/feedback-test','Dashboard fixture','Inspired','Student','Rollback-only unique feedback phrase','test');
set local role service_role;
do $$ declare r jsonb;begin
 r:=public.forge_staff_feedback('b3030303-0303-4303-8303-030303030303','feedback-test@invalid.example','{"page":"/feedback-test","reaction":"Inspired","visitor":"Student","search":"unique feedback phrase"}');
 if (r->>'total')::integer<>1 or jsonb_array_length(r->'items')<>1 or r->'items'->0 ? 'session_id' then raise exception 'Filtered read failed';end if;
 r:=public.forge_staff_feedback('b3030303-0303-4303-8303-030303030303','feedback-test@invalid.example','{"page":"/feedback-test","offset":50}');
 if jsonb_array_length(r->'items')<>0 or (r->>'total')::integer<>1 then raise exception 'Pagination failed';end if;
 r:=public.forge_staff_feedback('b3030303-0303-4303-8303-030303030303','not-staff@invalid.example','{}');
 if r->>'forbidden'<>'true' then raise exception 'Unlisted account allowed';end if;
 r:=public.forge_staff_feedback('b4040404-0404-4404-8404-040404040404','feedback-test@invalid.example','{}');
 if r->>'forbidden'<>'true' then raise exception 'Wrong bound account allowed';end if;
 update forge_redesign_test.staff_members set role='school_reviewer' where email='feedback-test@invalid.example';
 r:=public.forge_staff_feedback('b3030303-0303-4303-8303-030303030303','feedback-test@invalid.example','{}');
 if r->>'forbidden'<>'true' then raise exception 'Reviewer role allowed';end if;
 if has_function_privilege('anon','public.forge_staff_feedback(uuid,text,jsonb,boolean)','execute') or has_function_privilege('authenticated','public.forge_staff_feedback(uuid,text,jsonb,boolean)','execute') then raise exception 'Public execution allowed';end if;
end $$;
reset role;
rollback;
select 'PASS: admin filters, pagination, no session ids, wrong identity and reviewer denied, anonymous/authenticated execute denied; all fixtures rolled back' as outcome;
