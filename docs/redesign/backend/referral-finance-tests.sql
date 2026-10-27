-- Rollback-only integration suite. Run ONLY against reviewed isolated test schema after referral-finance.sql.
begin;
insert into auth.users(id,email,email_confirmed_at) values
 ('fa010101-0101-4101-8101-010101010101','finance-admin@invalid.example',now()),
 ('fa020202-0202-4202-8202-020202020202','finance-owner@invalid.example',now()),
 ('fa030303-0303-4303-8303-030303030303','finance-other@invalid.example',now());
insert into forge_redesign_test.staff_members(email,user_id,role) values('finance-admin@invalid.example','fa010101-0101-4101-8101-010101010101','admin');
insert into forge_redesign_test.referrer_accounts(id) values('fa020202-0202-4202-8202-020202020202'),('fa030303-0303-4303-8303-030303030303');
insert into forge_redesign_test.referrer_payout_profiles values('fa020202-0202-4202-8202-020202020202','Fixture Bank','Fixture Owner','0123456789',now());
insert into forge_redesign_test.school_referrals(id,referrer_id,school_name,location,school_key,stage) values('fa040404-0404-4404-8404-040404040404','fa020202-0202-4202-8202-020202020202','Finance Fixture','Lagos','finance-fixture','school_requested');
insert into forge_redesign_test.school_onboarding_requests(id,school_key,school_name,referral_id,payload,status) values('fa050505-0505-4505-8505-050505050505','finance-fixture','Finance Fixture','fa040404-0404-4404-8404-040404040404','{}','agreed');
insert into forge_redesign_test.referral_agreements(referral_id,referrer_id,version,content_hash,uploaded_at,signed_hash,object_path,status,review_state,school_contract_signed_at) values('fa040404-0404-4404-8404-040404040404','fa020202-0202-4202-8202-020202020202','fixture',repeat('a',64),now()-interval '31 days',repeat('b',64),'finance-fixture.pdf','effective','approved',now()-interval '31 days');
insert into forge_redesign_test.school_contract_evidence(id,request_id,referral_id,object_path,content_hash,signed_on,recorded_by,note) values('fa060606-0606-4606-8606-060606060606','fa050505-0505-4505-8505-050505050505','fa040404-0404-4404-8404-040404040404','finance-contract.pdf',repeat('c',64),current_date-31,'fa010101-0101-4101-8101-010101010101','Fixture only');
set local role service_role;
do $$ declare uid uuid:='fa010101-0101-4101-8101-010101010101';em text:='finance-admin@invalid.example';p jsonb;result jsonb;blocked boolean;cal jsonb;statement_request jsonb;candidate date;target date;day_count integer;begin
 if has_function_privilege('anon','public.forge_referral_finance_action(uuid,text,text,jsonb,boolean)','execute') or has_table_privilege('authenticated','forge_redesign_test.referral_finance_events','select') or has_table_privilege('service_role','forge_redesign_test.referral_financial_terms','update') then raise exception 'Privilege leakage';end if;
 result:=public.forge_referral_finance_action('fa030303-0303-4303-8303-030303030303',em,'list');if result->>'forbidden' is distinct from 'true' then raise exception 'Bound identity bypass';end if;
 p:=jsonb_build_object('referralId','fa040404-0404-4404-8404-040404040404','version',1,'receiptId',gen_random_uuid(),'reviewed',true,'note','Reviewed fixture start','schoolId','fa050505-0505-4505-8505-050505050505','schoolVersion',1,'startsOn',current_date-30,'grossKobo',10000000,'internetKobo',100000,'operationsKobo',200000,'taxKobo',300000);
 result:=public.forge_referral_finance_action(uid,em,'start',p||'{"schoolVersion":99}');if result->>'locked' is distinct from 'true' then raise exception 'Stale school bypass';end if;
 result:=public.forge_referral_finance_action(uid,em,'start',p);if result->>'earnedKobo'<>'1410000' then raise exception 'Wrong full contract commission';end if;
 if public.forge_referral_finance_action(uid,em,'start',p)<>result then raise exception 'Receipt replay not idempotent';end if;
 result:=public.forge_referral_finance_action(uid,em,'start',p||'{"grossKobo":999}');if result->>'conflict' is distinct from 'true' then raise exception 'Receipt payload changed';end if;
 p:=jsonb_build_object('referralId','fa040404-0404-4404-8404-040404040404','version',2,'receiptId',gen_random_uuid(),'reviewed',true,'note','Reviewed fixture');
 result:=public.forge_referral_finance_action(uid,em,'payable',p);if result->>'locked' is distinct from 'true' then raise exception 'Deposit gate bypass';end if;
 result:=public.forge_referral_finance_action(uid,em,'deposit',p||jsonb_build_object('receivedOn',current_date-30,'amountKobo',100000,'reference','fixture-deposit'));if result->>'saved' is distinct from 'true' then raise exception 'Deposit failed';end if;
 p:=p||jsonb_build_object('version',3,'receiptId',gen_random_uuid());result:=public.forge_referral_finance_action(uid,em,'payable',p);if result->>'stage'<>'payable' then raise exception 'Day 21 eligibility failed';end if;
 p:=p||jsonb_build_object('version',4,'receiptId',gen_random_uuid(),'paidOn',current_date,'amountKobo',1,'reference','fixture-payment','bankName','Fixture Bank','accountName','Fixture Owner','accountNumber','0123456789','completedExternally',true);
 blocked:=false;begin perform public.forge_referral_finance_action(uid,em,'payment',p);exception when sqlstate 'P0001' then blocked:=true;end;if not blocked then raise exception 'Partial payment accepted';end if;
 p:=p||'{"amountKobo":1410000}';result:=public.forge_referral_finance_action(uid,em,'payment',p);if result->>'stage'<>'paid' then raise exception 'Payment failed';end if;
 if public.forge_referral_finance_action(uid,em,'payment',p)<>result then raise exception 'Payment retry duplicated';end if;
 blocked:=false;begin update forge_redesign_test.referrer_payout_profiles set account_number='9999999999' where referrer_id='fa020202-0202-4202-8202-020202020202';exception when others then blocked:=true;end;if not blocked then raise exception 'Bank profile mutable';end if;
 result:=public.forge_referral_finance_action('fa030303-0303-4303-8303-030303030303','finance-other@invalid.example','statements','{}',true);if jsonb_array_length(result->'items')<>0 then raise exception 'Foreign statement leaked';end if;
 result:=public.forge_referral_finance_action('fa020202-0202-4202-8202-020202020202','finance-owner@invalid.example','statements','{}',true);if result#>>'{items,0,calculation,gross_kobo}'<>'10000000' or result#>>'{items,0,calculation,rate_bps}'<>'1500' then raise exception 'Statement missing complete calculation';end if;
 cal:=jsonb_build_object('coveredFrom',current_date-1,'coveredThrough',current_date+40,'holidays','[]'::jsonb,'note','Rollback fixture only; not real holiday evidence','reviewed',true);
 result:=public.forge_referral_finance_action('fa020202-0202-4202-8202-020202020202','finance-owner@invalid.example','calendar',cal,true);if result->>'forbidden' is distinct from 'true' then raise exception 'Owner modified reviewed calendar';end if;
 candidate:=current_date+1;while extract(isodow from candidate)>5 loop candidate:=candidate+1;end loop;
 cal:=cal||jsonb_build_object('holidays',jsonb_build_array(jsonb_build_object('date',candidate,'name','ROLLBACK SYNTHETIC DATE - not an actual holiday','sourceUrl','https://interior.gov.ng/rollback-fixture-only')));
 blocked:=false;begin perform public.forge_referral_finance_action(uid,em,'calendar',cal||jsonb_build_object('coveredThrough',current_date+9));exception when others then blocked:=true;end;if not blocked then raise exception 'Short calendar coverage accepted';end if;
 blocked:=false;begin perform public.forge_referral_finance_action(uid,em,'calendar',cal||jsonb_build_object('holidays',jsonb_build_array(jsonb_build_object('date',candidate,'name','Invalid source fixture','sourceUrl','https://interior.gov.ng.evil.example/'))));exception when others then blocked:=true;end;if not blocked then raise exception 'Nonofficial holiday source accepted';end if;
 result:=public.forge_referral_finance_action(uid,em,'calendar',cal);if result->>'saved' is distinct from 'true' then raise exception 'Reviewed calendar failed';end if;
 if not exists(select 1 from forge_redesign_test.referral_calendar_audit where id=(result->>'auditId')::uuid and actor_id=uid and reviewed_calendar=cal) then raise exception 'Calendar audit missing';end if;
 blocked:=false;begin update forge_redesign_test.referral_calendar_audit set note='Overwrite';exception when others then blocked:=true;end;if not blocked then raise exception 'Calendar audit mutable';end if;
 statement_request:=forge_redesign_test.request_referral_statement('fa020202-0202-4202-8202-020202020202','fa040404-0404-4404-8404-040404040404');
 target:=current_date;day_count:=0;while day_count<5 loop target:=target+1;if extract(isodow from target)<6 and target<>candidate then day_count:=day_count+1;end if;end loop;
 if (statement_request->>'dueOn')::date<>target then raise exception 'Five working days ignored reviewed holiday';end if;
 result:=public.forge_referral_finance_action(uid,em,'close','{"ownerId":"fa020202-0202-4202-8202-020202020202","note":"Open statement blocks closure","reviewed":true}');if result->>'locked' is distinct from 'true' then raise exception 'Open obligation closure bypass';end if;
 result:=public.forge_referral_finance_action(uid,em,'fulfill',jsonb_build_object('referralId','fa040404-0404-4404-8404-040404040404','version',5,'receiptId',gen_random_uuid(),'requestId',statement_request->>'id','reviewed',true,'note','Rollback statement fulfillment'));if result->>'saved' is distinct from 'true' then raise exception 'Statement fulfillment failed';end if;
 cal:=cal||jsonb_build_object('holidays','[]'::jsonb);perform public.forge_referral_finance_action(uid,em,'calendar',cal);
 if (select due_on from forge_redesign_test.referral_statement_requests where id=(statement_request->>'id')::uuid)<>target then raise exception 'Calendar replacement rewrote issued deadline';end if;
 result:=public.forge_referral_finance_action(uid,em,'close','{"ownerId":"fa020202-0202-4202-8202-020202020202","note":"All obligations settled","reviewed":true}');if result->>'closed' is distinct from 'true' then raise exception 'Settled closure failed';end if;
 if not exists(select 1 from forge_redesign_test.referral_financial_terms where referral_id='fa040404-0404-4404-8404-040404040404') then raise exception 'Closure deleted evidence';end if;
end $$;
reset role;
rollback;
