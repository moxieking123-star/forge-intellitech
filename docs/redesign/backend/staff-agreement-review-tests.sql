begin;
insert into auth.users(id,email,email_confirmed_at) values
 ('c9010101-0101-4101-8101-010101010101','agreement-admin@invalid.example',now()),
 ('c9020202-0202-4202-8202-020202020202','agreement-owner@invalid.example',now()),
 ('c9030303-0303-4303-8303-030303030303','agreement-reviewer@invalid.example',now());
insert into forge_redesign_test.staff_members(email,user_id,role) values
 ('agreement-admin@invalid.example','c9010101-0101-4101-8101-010101010101','admin'),
 ('agreement-reviewer@invalid.example','c9030303-0303-4303-8303-030303030303','school_reviewer');
insert into forge_redesign_test.referrer_accounts(id) values('c9020202-0202-4202-8202-020202020202');
insert into forge_redesign_test.school_referrals(id,referrer_id,school_name,location,school_key,stage) values
 ('c9040404-0404-4404-8404-040404040404','c9020202-0202-4202-8202-020202020202','Rollback Contract School','Lagos','rollback-contract-school','school_requested'),
 ('c9050505-0505-4505-8505-050505050505','c9020202-0202-4202-8202-020202020202','Rollback Unsigned School','Lagos','rollback-unsigned-school','link_created');
insert into forge_redesign_test.school_onboarding_requests(id,school_key,school_name,referral_id,payload,status) values('c9060606-0606-4606-8606-060606060606','rollback-contract-school','Rollback Contract School','c9040404-0404-4404-8404-040404040404','{}','reviewing');
insert into forge_redesign_test.referral_agreements(referral_id,referrer_id,version,content_hash,uploaded_at,signed_hash,object_path,status) values('c9040404-0404-4404-8404-040404040404','c9020202-0202-4202-8202-020202020202','draft-2026-10-22-v1',repeat('a',64),now(),repeat('b',64),'c9020202-0202-4202-8202-020202020202/c9040404-0404-4404-8404-040404040404/test.pdf','uploaded_awaiting_review');
insert into forge_redesign_test.referral_agreements(referral_id,referrer_id,version,content_hash) values('c9050505-0505-4505-8505-050505050505','c9020202-0202-4202-8202-020202020202','draft-2026-10-22-v1',repeat('a',64));
set local role service_role;
do $$ declare uid uuid:='c9010101-0101-4101-8101-010101010101';em text:='agreement-admin@invalid.example';r jsonb;p jsonb;blocked boolean;begin
 r:=public.forge_staff_agreement_action('c9030303-0303-4303-8303-030303030303','agreement-reviewer@invalid.example','list','{}');if r->>'forbidden'<>'true' then raise exception 'Reviewer allowed';end if;
 r:=public.forge_staff_agreement_action('c9030303-0303-4303-8303-030303030303',em,'list','{}');if r->>'forbidden'<>'true' then raise exception 'Wrong bound ID allowed';end if;
 r:=public.forge_staff_agreement_action(uid,'unknown@invalid.example','list','{}');if r->>'forbidden'<>'true' then raise exception 'Unknown staff allowed';end if;
 r:=public.forge_staff_agreement_action(uid,em,'list','{}');if r::text like '%account_number%' or r::text like '%object_path%' then raise exception 'Private bank/storage fields leaked';end if;
 p:=jsonb_build_object('referralId','c9050505-0505-4505-8505-050505050505','version',1,'hash',repeat('b',64),'decision','approved','note','Fixture review','reviewed',true);
 r:=public.forge_staff_agreement_action(uid,em,'review',p);if r->>'locked'<>'true' then raise exception 'Unsigned agreement approved';end if;
 p:=p||jsonb_build_object('referralId','c9040404-0404-4404-8404-040404040404','decision','changes_requested');
 r:=public.forge_staff_agreement_action(uid,em,'review',p);if r->>'status'<>'uploaded_awaiting_review' then raise exception 'Correction review failed';end if;
 p:=p||'{"version":2,"decision":"approved"}';r:=public.forge_staff_agreement_action(uid,em,'review',p);if r->>'status'<>'approved_awaiting_school' then raise exception 'Agreement prematurely effective';end if;
 r:=public.forge_staff_agreement_action(uid,em,'review',p);if r->>'conflict'<>'true' then raise exception 'Stale review accepted';end if;
 p:=jsonb_build_object('schoolId','c9060606-0606-4606-8606-060606060606','receiptId','c9070707-0707-4707-8707-070707070707','schoolVersion',1,'signedOn','2026-10-22','reviewed',true,'note','Fixture contract signed parties checked','hash',repeat('c',64),'path','contracts/c9060606-0606-4606-8606-060606060606/c9070707-0707-4707-8707-070707070707.pdf');
 r:=public.forge_staff_agreement_action(uid,em,'contract_check',p||'{"schoolVersion":99}');if r->>'conflict'<>'true' then raise exception 'Stale school accepted';end if;
 blocked:=false;begin perform public.forge_staff_agreement_action(uid,em,'contract_check',p||'{"reviewed":false}');exception when sqlstate 'P0001' then blocked:=true;end;if not blocked then raise exception 'Missing review declaration accepted';end if;
 r:=public.forge_staff_agreement_action(uid,em,'contract_check',p);if r->>'allowed'<>'true' then raise exception 'Evidence preflight failed';end if;
 if exists(select 1 from forge_redesign_test.school_contract_evidence where request_id='c9060606-0606-4606-8606-060606060606') then raise exception 'Preflight wrote evidence';end if;
 r:=public.forge_staff_agreement_action(uid,em,'contract_record',p);if r->>'status'<>'effective' then raise exception 'Reviewed pair did not become effective';end if;
 r:=public.forge_staff_agreement_action(uid,em,'contract_record',p);if r->>'saved'<>'true' then raise exception 'Idempotent receipt failed';end if;
 r:=public.forge_staff_agreement_action(uid,em,'contract_record',p||'{"receiptId":"c9080808-0808-4808-8808-080808080808"}');if r->>'conflict'<>'true' then raise exception 'Evidence overwritten';end if;
 r:=public.forge_staff_agreement_action(uid,em,'contract_document','{"referralId":"c9040404-0404-4404-8404-040404040404"}');if r->>'hash'<>repeat('c',64) then raise exception 'Wrong private evidence selected';end if;
 if (select status from forge_redesign_test.school_onboarding_requests where id='c9060606-0606-4606-8606-060606060606')<>'agreed' then raise exception 'School agreement missing';end if;
 if (select count(*) from forge_redesign_test.agreement_review_audit where referral_id='c9040404-0404-4404-8404-040404040404')<>3 then raise exception 'Audit count incorrect';end if;
 if exists(select 1 from forge_redesign_test.school_referrals where id='c9040404-0404-4404-8404-040404040404' and (starts_on is not null or earned_kobo is not null or paid_kobo<>0 or stage<>'school_requested')) then raise exception 'Teaching or payment changed';end if;
 if has_function_privilege('anon','public.forge_staff_agreement_action(uuid,text,text,jsonb)','execute') or has_function_privilege('authenticated','public.forge_staff_agreement_action(uuid,text,text,jsonb)','execute') or has_table_privilege('authenticated','forge_redesign_test.school_contract_evidence','select') or has_table_privilege('service_role','forge_redesign_test.school_contract_evidence','update') then raise exception 'Evidence access or immutability wrong';end if;
end $$;
reset role;
rollback;
select 'PASS: admin-only review, immutable contract evidence, stale versions, idempotent receipt, audit, prerequisites and no teaching/payment changes; fixtures rolled back' as outcome;
