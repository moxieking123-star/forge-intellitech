begin;
-- Narrow service-only bridge to an unexposed schema. User identity comes only
-- from the edge's verified auth.getUser result, never a browser supplied ID.
create function public.forge_referral_action(p_owner uuid,p_action text,p_payload jsonb default '{}')
returns jsonb language plpgsql security invoker set search_path='' as $$
declare account forge_redesign_test.referrer_accounts; profile forge_redesign_test.referrer_payout_profiles; linked forge_redesign_test.school_referrals; evidence forge_redesign_test.referral_agreements; rows_json jsonb; served timestamptz; statement forge_redesign_test.referral_statement_requests; changed integer;
begin
 insert into forge_redesign_test.referrer_accounts(id) values(p_owner) on conflict(id) do nothing;
 select * into account from forge_redesign_test.referrer_accounts where id=p_owner for update;
 if account.status<>'active' then return '{"closed":true}'::jsonb; end if;
 if p_action='account' then
  select coalesce(jsonb_agg(jsonb_build_object('id',r.id,'code',r.code,'schoolName',r.school_name,'location',r.location,'stage',r.stage,'earnedKobo',r.earned_kobo,'paidKobo',r.paid_kobo,'startsOn',r.starts_on,'payableOn',r.payable_on) order by r.created_at desc),'[]'::jsonb) into rows_json from forge_redesign_test.school_referrals r where r.referrer_id=p_owner;
  return jsonb_build_object('account',jsonb_build_object('referralNumber',account.referral_number,'status',account.status),'links',rows_json);
 elsif p_action='profile' then
  select * into profile from forge_redesign_test.referrer_payout_profiles where referrer_id=p_owner;
  return jsonb_build_object('profile',case when found then jsonb_build_object('bankName',profile.bank_name,'accountName',profile.account_name,'maskedAccountNumber','••••••'||right(profile.account_number,4)) else null end);
 elsif p_action='profile_save' then
  insert into forge_redesign_test.referrer_payout_profiles(referrer_id,bank_name,account_name,account_number) values(p_owner,p_payload->>'bank_name',p_payload->>'account_name',p_payload->>'account_number');
  return '{"saved":true}'::jsonb;
 elsif p_action='link_create' then
  if not exists(select 1 from forge_redesign_test.referrer_payout_profiles where referrer_id=p_owner) then return '{"profileRequired":true}'::jsonb; end if;
  select * into linked from forge_redesign_test.create_school_referral(p_owner,p_payload->>'schoolName',p_payload->>'location',p_payload->>'schoolKey');
  return jsonb_build_object('link',jsonb_build_object('id',linked.id,'code',linked.code,'schoolName',linked.school_name,'location',linked.location,'stage',linked.stage,'earnedKobo',linked.earned_kobo,'paidKobo',linked.paid_kobo,'startsOn',linked.starts_on,'payableOn',linked.payable_on));
 end if;
 perform forge_redesign_test.referral_owner_lock(p_owner,(p_payload->>'referralId')::uuid);
 if p_action='agreement' then
  select * into evidence from forge_redesign_test.referral_agreements where referral_id=(p_payload->>'referralId')::uuid and referrer_id=p_owner;
  return jsonb_build_object('agreement',case when found then jsonb_build_object('version',evidence.version,'downloaded_at',evidence.downloaded_at,'uploaded_at',evidence.uploaded_at,'status',evidence.status,'school_contract_signed_at',evidence.school_contract_signed_at) else null end);
 elsif p_action='download' then
  served:=forge_redesign_test.record_referral_agreement_download(p_owner,(p_payload->>'referralId')::uuid,p_payload->>'version',p_payload->>'hash');
  return jsonb_build_object('recorded',true,'servedAt',served);
 elsif p_action='_reserve' then
  perform forge_redesign_test.reserve_referral_agreement_upload(p_owner,(p_payload->>'referralId')::uuid,p_payload->>'version',p_payload->>'path');
  return '{"reserved":true}'::jsonb;
 elsif p_action='_complete' then
  select * into evidence from forge_redesign_test.referral_agreements where referral_id=(p_payload->>'referralId')::uuid and referrer_id=p_owner;
  if evidence.uploaded_at is not null and evidence.object_path=p_payload->>'path' and evidence.signed_hash=p_payload->>'hash' then return jsonb_build_object('status','uploaded_awaiting_review','uploadedAt',evidence.uploaded_at); end if;
  served:=forge_redesign_test.complete_referral_agreement_upload(p_owner,(p_payload->>'referralId')::uuid,p_payload->>'path',p_payload->>'hash');
  return jsonb_build_object('status','uploaded_awaiting_review','uploadedAt',served);
 elsif p_action='_cancel' then
  update forge_redesign_test.referral_agreements set object_path=null,upload_reserved_at=null where referral_id=(p_payload->>'referralId')::uuid and referrer_id=p_owner and object_path=p_payload->>'path' and uploaded_at is null;
  get diagnostics changed=row_count;
  return jsonb_build_object('cancelled',changed=1);
 elsif p_action='_upload_result' then
  select * into evidence from forge_redesign_test.referral_agreements where referral_id=(p_payload->>'referralId')::uuid and referrer_id=p_owner and object_path=p_payload->>'path';
  return jsonb_build_object('completed',found and evidence.uploaded_at is not null,'uploadedAt',evidence.uploaded_at);
 elsif p_action='statement' then
  select * into statement from forge_redesign_test.referral_statement_requests where referrer_id=p_owner and referral_id=(p_payload->>'referralId')::uuid order by requested_at desc limit 1;
  return jsonb_build_object('receipt',case when found then jsonb_build_object('id',statement.id,'requestedAt',statement.requested_at,'dueOn',statement.due_on,'status',statement.status) else null end);
 elsif p_action='statement_request' then
  rows_json:=forge_redesign_test.request_referral_statement(p_owner,(p_payload->>'referralId')::uuid);
  return jsonb_build_object('receipt',rows_json);
 end if;
 raise exception 'Unsupported referral action';
end $$;
revoke all on function public.forge_referral_action(uuid,text,jsonb) from public,anon,authenticated;
grant execute on function public.forge_referral_action(uuid,text,jsonb) to service_role;

-- Cover assisted onboarding through the same intake. Calling the original school
-- helper cannot skip the registered payout profile after referral activation.
create function forge_redesign_test.require_assisted_payout_profile() returns trigger
language plpgsql security invoker set search_path='' as $$
begin
 if new.submitted_by_referrer is not null and not exists(select 1 from forge_redesign_test.referrer_payout_profiles where referrer_id=new.submitted_by_referrer) then raise exception 'Register payment details before assisting a school'; end if;
 return new;
end $$;
revoke all on function forge_redesign_test.require_assisted_payout_profile() from public,anon,authenticated;
grant execute on function forge_redesign_test.require_assisted_payout_profile() to service_role;
create trigger school_assisted_payout_required before insert on forge_redesign_test.school_onboarding_requests for each row execute function forge_redesign_test.require_assisted_payout_profile();
commit;
