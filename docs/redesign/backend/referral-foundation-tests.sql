begin;
insert into auth.users(id,email,email_confirmed_at) values
 ('91010101-0101-4101-8101-010101010101','referral-a-fixture@invalid.example',now()),
 ('92020202-0202-4202-8202-020202020202','referral-b-fixture@invalid.example',now());
do $$ begin
 if has_table_privilege('anon','forge_redesign_test.referrer_payout_profiles','select') or has_table_privilege('authenticated','forge_redesign_test.referral_agreements','select') or has_function_privilege('anon','public.forge_referral_action(uuid,text,jsonb)','execute') then raise exception 'Public access leaked'; end if;
 if (select public from storage.buckets where id='forge-referral-review-agreements') is distinct from false then raise exception 'Signed bucket must be private'; end if;
end $$;
set local role service_role;
do $$
declare owner_a uuid:='91010101-0101-4101-8101-010101010101'; owner_b uuid:='92020202-0202-4202-8202-020202020202'; a jsonb; b jsonb; result jsonb; ref uuid; object_path text; blocked boolean; first_time text; hash text:=repeat('a',64);
begin
 a:=public.forge_referral_action(owner_a,'account','{}');
 b:=public.forge_referral_action(owner_b,'account','{}');
 if a#>>'{account,referralNumber}'=b#>>'{account,referralNumber}' then raise exception 'Account numbers collide'; end if;
 result:=public.forge_referral_action(owner_a,'link_create','{"schoolName":"Fixture A School","location":"Lagos","schoolKey":"referral-fixture-a"}');
 if result->>'profileRequired' is distinct from 'true' then raise exception 'Bank registration bypass'; end if;
 perform public.forge_referral_action(owner_a,'profile_save','{"bank_name":"Fixture Bank","account_name":"Fixture A","account_number":"0123456789"}');
 blocked:=false; begin perform public.forge_referral_action(owner_a,'profile_save','{"bank_name":"Other Bank","account_name":"Changed","account_number":"9876543210"}'); exception when unique_violation then blocked:=true; end;
 if not blocked then raise exception 'Bank details overwritten'; end if;
 result:=public.forge_referral_action(owner_a,'profile','{}');
 if result#>>'{profile,maskedAccountNumber}'<>'••••••6789' or result::text like '%0123456789%' then raise exception 'Full bank number exposed'; end if;
 result:=public.forge_referral_action(owner_b,'profile',jsonb_build_object('referrerId',owner_a));
 if result->'profile'<>'null'::jsonb then raise exception 'Foreign payment profile exposed'; end if;
 a:=public.forge_referral_action(owner_a,'link_create','{"schoolName":"Fixture A School","location":"Lagos","schoolKey":"referral-fixture-a"}'); ref:=(a#>>'{link,id}')::uuid;
 blocked:=false; begin perform public.forge_referral_action(owner_a,'link_create','{"schoolName":"Fixture A School","location":"Lagos","schoolKey":"referral-fixture-a"}'); exception when unique_violation then blocked:=true; end;
 if not blocked then raise exception 'Duplicate link accepted'; end if;
 result:=public.forge_referral_action(owner_b,'account','{}');
 if jsonb_array_length(result->'links')<>0 then raise exception 'Foreign links leaked'; end if;
 blocked:=false;begin perform public.forge_referral_action(owner_b,'agreement',jsonb_build_object('referralId',ref));exception when sqlstate 'P0001' then blocked:=true;end;
 if not blocked then raise exception 'Foreign agreement accepted'; end if;
 object_path:=owner_a::text||'/'||ref::text||'/93030303-0303-4303-8303-030303030303.pdf';
 blocked:=false;begin perform public.forge_referral_action(owner_a,'_reserve',jsonb_build_object('referralId',ref,'version','draft-2026-10-22-v1','path',object_path));exception when sqlstate 'P0001' then blocked:=true;end;
 if not blocked then raise exception 'Upload without download accepted'; end if;
 perform public.forge_referral_action(owner_a,'download',jsonb_build_object('referralId',ref,'version','draft-2026-10-22-v1','hash',hash));
 perform public.forge_referral_action(owner_a,'download',jsonb_build_object('referralId',ref,'version','draft-2026-10-22-v1','hash',hash));
 if (select count(*) from forge_redesign_test.referral_agreement_downloads where referral_id=ref)<>2 then raise exception 'Download history lost'; end if;
 perform public.forge_referral_action(owner_a,'_reserve',jsonb_build_object('referralId',ref,'version','draft-2026-10-22-v1','path',object_path));
 blocked:=false;begin perform public.forge_referral_action(owner_a,'_reserve',jsonb_build_object('referralId',ref,'version','draft-2026-10-22-v1','path',object_path));exception when sqlstate 'P0001' then blocked:=true;end;
 if not blocked then raise exception 'Concurrent reservation accepted'; end if;
 result:=public.forge_referral_action(owner_a,'_cancel',jsonb_build_object('referralId',ref,'path',object_path));
 if result->>'cancelled' is distinct from 'true' then raise exception 'Pending reservation not cancelled'; end if;
 perform public.forge_referral_action(owner_a,'_reserve',jsonb_build_object('referralId',ref,'version','draft-2026-10-22-v1','path',object_path));
 result:=public.forge_referral_action(owner_a,'_complete',jsonb_build_object('referralId',ref,'path',object_path,'hash',hash));first_time:=result->>'uploadedAt';
 if result->>'status'<>'uploaded_awaiting_review' then raise exception 'Upload auto-approved'; end if;
 result:=public.forge_referral_action(owner_a,'_complete',jsonb_build_object('referralId',ref,'path',object_path,'hash',hash));
 if result->>'uploadedAt'<>first_time then raise exception 'Idempotent completion changed receipt'; end if;
 result:=public.forge_referral_action(owner_a,'_cancel',jsonb_build_object('referralId',ref,'path',object_path));
 if result->>'cancelled' is distinct from 'false' then raise exception 'Committed receipt cancelled'; end if;
 result:=public.forge_referral_action(owner_a,'_upload_result',jsonb_build_object('referralId',ref,'path',object_path));
 if result->>'completed' is distinct from 'true' then raise exception 'Committed receipt cannot be recovered'; end if;
 update forge_redesign_test.school_referrals set starts_on='2026-10-01' where id=ref;
 if (select payable_on from forge_redesign_test.school_referrals where id=ref)<>'2026-10-22'::date then raise exception 'Wrong fourth-week marker'; end if;
 -- Keep this refusal assertion independent of the owner's real reviewed calendar.
 update forge_redesign_test.referral_holiday_calendar set covered_from=covered_through where id=true;
 blocked:=false;begin perform public.forge_referral_action(owner_a,'statement_request',jsonb_build_object('referralId',ref));exception when sqlstate 'P0001' then blocked:=true;end;
 if not blocked then raise exception 'Unreviewed holiday deadline supplied'; end if;
 update forge_redesign_test.referrer_accounts set status='closed' where id=owner_b;
 result:=public.forge_referral_action(owner_b,'account','{}');if result->>'closed' is distinct from 'true' then raise exception 'Closed account reopened';end if;
end $$;
rollback;
