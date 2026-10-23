begin;
insert into auth.users(id,email,email_confirmed_at) values
 ('81010101-0101-4101-8101-010101010101','school-admin-fixture@invalid.example',now()),
 ('82020202-0202-4202-8202-020202020202','school-other-fixture@invalid.example',now());
insert into forge_redesign_test.staff_members(email) values('school-admin-fixture@invalid.example');
do $$ begin
 if has_table_privilege('anon','forge_redesign_test.staff_members','select')
 or has_table_privilege('authenticated','forge_redesign_test.school_onboarding_requests','select')
 or has_function_privilege('anon','public.forge_school_staff_action(uuid,text,text,jsonb)','execute')
 or has_function_privilege('authenticated','public.forge_school_intake(jsonb,uuid)','execute') then raise exception 'Public access leaked'; end if;
end $$;
set local role service_role;
do $$
declare payload jsonb; result jsonb; fixture_id uuid; n integer;
begin
 payload:='{"schoolKey":"school-foundation-fixture-a","schoolName":"Fictional Foundation School A","location":"Lagos","email":"school-fixture@invalid.example","name":"Fixture Contact","phone":"08000000000","role":"Proprietor","level":"Primary","learnerCount":20,"startPeriod":"Next term","context":"Test only","note":"Synthetic fixture","consent":true,"assisted":false,"schoolAuthorised":false,"referralCode":null}'::jsonb;
 result:=public.forge_school_intake(payload,null);
 if result->>'success' is distinct from 'true' or result->>'notification' is distinct from 'pending' then raise exception 'Intake did not persist'; end if;
 fixture_id:=(result->>'id')::uuid;
 if not exists(select 1 from forge_redesign_test.school_notification_outbox where school_notification_outbox.request_id=fixture_id and status='pending') then raise exception 'No durable mail job'; end if;
 begin perform public.forge_school_intake(payload,null); raise exception 'Duplicate accepted'; exception when unique_violation then null; end;
 result:=public.forge_school_staff_action('82020202-0202-4202-8202-020202020202','school-other-fixture@invalid.example','list','{}');
 if result->>'forbidden' is distinct from 'true' then raise exception 'Nonstaff can read'; end if;
 result:=public.forge_school_staff_action('81010101-0101-4101-8101-010101010101','school-admin-fixture@invalid.example','list','{}');
 if not(result?'items') then raise exception 'Staff list failed'; end if;
 result:=public.forge_school_staff_action('81010101-0101-4101-8101-010101010101','school-admin-fixture@invalid.example','update',jsonb_build_object('id',fixture_id,'version',1,'status','reviewing','note','Fictional review'));
 if result->>'saved' is distinct from 'true' then raise exception 'Review failed'; end if;
 result:=public.forge_school_staff_action('81010101-0101-4101-8101-010101010101','school-admin-fixture@invalid.example','update',jsonb_build_object('id',fixture_id,'version',1,'status','declined','note','Stale reviewer'));
 if result->>'conflict' is distinct from 'true' then raise exception 'Lost update accepted'; end if;
 select count(*) into n from forge_redesign_test.school_review_audit where school_review_audit.request_id=fixture_id;
 if n<>1 then raise exception 'Audit count wrong'; end if;
 if to_regprocedure('public.forge_referral_action(uuid,text,jsonb)') is not null then
  perform public.forge_referral_action('82020202-0202-4202-8202-020202020202','account','{}');
  perform public.forge_referral_action('82020202-0202-4202-8202-020202020202','profile_save','{"bank_name":"Fixture Bank","account_name":"Fixture Referrer","account_number":"0123456789"}');
 end if;
 payload:=payload||'{"schoolKey":"school-foundation-fixture-b","schoolName":"Fictional Foundation School B","assisted":true,"schoolAuthorised":true}'::jsonb;
 result:=public.forge_school_intake(payload,'82020202-0202-4202-8202-020202020202');
 fixture_id:=(result->>'id')::uuid;
 if not exists(select 1 from forge_redesign_test.school_onboarding_requests s join forge_redesign_test.school_referrals r on r.id=s.referral_id where s.id=fixture_id and r.referrer_id='82020202-0202-4202-8202-020202020202' and r.stage='school_requested') then raise exception 'Assisted attribution failed'; end if;
end $$;
rollback;
