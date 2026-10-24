begin;
alter table forge_redesign_test.referral_agreements add column review_version integer not null default 1;
alter table forge_redesign_test.referral_agreements add column review_state text not null default 'pending' check(review_state in ('pending','approved','changes_requested'));
create table forge_redesign_test.school_contract_evidence (
 id uuid primary key,request_id uuid not null unique references forge_redesign_test.school_onboarding_requests(id),
 referral_id uuid not null references forge_redesign_test.school_referrals(id),
 object_path text not null unique,content_hash text not null check(content_hash ~ '^[0-9a-f]{64}$'),
 signed_on date not null,recorded_by uuid not null references auth.users(id),note text not null check(length(trim(note)) between 1 and 1000),
 recorded_at timestamptz not null default clock_timestamp()
);
create table forge_redesign_test.agreement_review_audit (
 id uuid primary key default gen_random_uuid(),referral_id uuid not null references forge_redesign_test.school_referrals(id),
 actor_id uuid not null references auth.users(id),action text not null,previous_state text not null,next_state text not null,
 document_hash text not null check(document_hash ~ '^[0-9a-f]{64}$'),note text not null check(length(trim(note)) between 1 and 1000),created_at timestamptz not null default clock_timestamp()
);
alter table forge_redesign_test.school_contract_evidence enable row level security;
alter table forge_redesign_test.agreement_review_audit enable row level security;
revoke all on forge_redesign_test.school_contract_evidence,forge_redesign_test.agreement_review_audit from public,anon,authenticated;
grant select,insert on forge_redesign_test.school_contract_evidence,forge_redesign_test.agreement_review_audit to service_role;
create index agreement_review_audit_referral on forge_redesign_test.agreement_review_audit(referral_id,created_at desc);

-- User ID/email are exclusively supplied by the edge after auth.getUser verification.
create or replace function public.forge_staff_agreement_action(p_user_id uuid,p_verified_email text,p_action text,p_payload jsonb default '{}')
returns jsonb language plpgsql security invoker set search_path='' as $$
declare staff forge_redesign_test.staff_members; a forge_redesign_test.referral_agreements; s forge_redesign_test.school_onboarding_requests;
 r forge_redesign_test.school_referrals; c forge_redesign_test.school_contract_evidence; result jsonb; next_status text; next_review text; skip_count integer;
begin
 select * into staff from forge_redesign_test.staff_members where email=lower(p_verified_email) and active and role='admin' and (user_id is null or user_id=p_user_id) for update;
 if not found or p_user_id is null then return '{"forbidden":true}'::jsonb;end if;
 if staff.user_id is null then update forge_redesign_test.staff_members set user_id=p_user_id where email=staff.email;end if;
 if p_action='authorize' then return '{"allowed":true}'::jsonb;end if;
 if p_action='list' then
  skip_count:=coalesce((p_payload->>'offset')::integer,0);if skip_count<0 or skip_count>100000 then raise exception 'Invalid page';end if;
  select jsonb_build_object('total',(select count(*) from forge_redesign_test.referral_agreements qa join forge_redesign_test.referrer_accounts qc on qc.id=qa.referrer_id where qc.status='active'),
   'items',coalesce(jsonb_agg(to_jsonb(x) order by x.downloaded_at desc,x.referral_id),'[]'::jsonb)) into result from (
   select ag.referral_id,ag.version,ag.content_hash,ag.signed_hash,ag.downloaded_at,ag.uploaded_at,ag.status,ag.review_state,ag.review_version,ag.school_contract_signed_at,
    rf.school_name,rf.location,rf.code,rf.stage,ac.status as account_status,
    sc.id as school_id,sc.status as school_status,sc.version as school_version,
    (select jsonb_build_object('id',e.id,'signedOn',e.signed_on,'hash',e.content_hash,'recordedAt',e.recorded_at,'note',e.note) from forge_redesign_test.school_contract_evidence e where e.request_id=sc.id) as contract,
    (select coalesce(jsonb_agg(jsonb_build_object('action',h.action,'previousState',h.previous_state,'nextState',h.next_state,'note',h.note,'createdAt',h.created_at) order by h.created_at desc),'[]'::jsonb) from forge_redesign_test.agreement_review_audit h where h.referral_id=ag.referral_id) as history
   from forge_redesign_test.referral_agreements ag join forge_redesign_test.school_referrals rf on rf.id=ag.referral_id
   join forge_redesign_test.referrer_accounts ac on ac.id=rf.referrer_id
   left join forge_redesign_test.school_onboarding_requests sc on sc.referral_id=rf.id
   where ac.status='active'
   order by ag.downloaded_at desc,ag.referral_id limit 50 offset skip_count
  ) x;return result;
 end if;
 if p_action in ('contract_check','contract_record') then
  select * into s from forge_redesign_test.school_onboarding_requests where id=(p_payload->>'schoolId')::uuid;
  if not found or s.referral_id is null then return '{"missing":true}'::jsonb;end if;
  -- Match the finance and owner upload lock order: account, referral, school, agreement.
  perform 1 from forge_redesign_test.referrer_accounts ac join forge_redesign_test.school_referrals rf on rf.referrer_id=ac.id where rf.id=s.referral_id for update of ac;
  select * into r from forge_redesign_test.school_referrals where id=s.referral_id for update;
  select * into s from forge_redesign_test.school_onboarding_requests where id=(p_payload->>'schoolId')::uuid and referral_id=r.id for update;
  if not found then return '{"conflict":true}'::jsonb;end if;
  select * into c from forge_redesign_test.school_contract_evidence where request_id=s.id;
  if found then
   if p_action in ('contract_check','contract_record') and c.id=(p_payload->>'receiptId')::uuid and c.content_hash=p_payload->>'hash' and c.recorded_by=p_user_id and c.signed_on=(p_payload->>'signedOn')::date and c.note=trim(p_payload->>'note') then return jsonb_build_object('saved',true,'receiptId',c.id);end if;
   return '{"conflict":true}'::jsonb;
  end if;
  if s.version<>(p_payload->>'schoolVersion')::integer then return '{"conflict":true}'::jsonb;end if;
  if s.status not in ('reviewing','proposal_shared','agreed') then return '{"locked":true}'::jsonb;end if;
  select * into r from forge_redesign_test.school_referrals where id=s.referral_id for update;
  select * into a from forge_redesign_test.referral_agreements where referral_id=r.id for update;
 else
  perform 1 from forge_redesign_test.referrer_accounts ac join forge_redesign_test.school_referrals rf on rf.referrer_id=ac.id where rf.id=(p_payload->>'referralId')::uuid for update of ac;
  select * into r from forge_redesign_test.school_referrals where id=(p_payload->>'referralId')::uuid for update;
  if not found then return '{"missing":true}'::jsonb;end if;
  select * into a from forge_redesign_test.referral_agreements where referral_id=r.id for update;
 end if;
 if a.referral_id is null then return '{"missing":true}'::jsonb;end if;
 if p_action='document' then
  if a.uploaded_at is null or a.object_path is null then return '{"missing":true}'::jsonb;end if;
  return jsonb_build_object('path',a.object_path,'hash',a.signed_hash);
 elsif p_action='contract_document' then
  select * into c from forge_redesign_test.school_contract_evidence where referral_id=r.id;
  if not found then return '{"missing":true}'::jsonb;end if;
  return jsonb_build_object('path',c.object_path,'hash',c.content_hash);
 end if;
 if r.stage in ('cancelled','teaching_started','payable','paid') or a.status in ('effective','discharged') or not exists(select 1 from forge_redesign_test.referrer_accounts where id=r.referrer_id and status='active') then return '{"locked":true}'::jsonb;end if;
 if p_action='review' then
  if p_payload->>'version' is null or a.review_version<>(p_payload->>'version')::integer or a.signed_hash is distinct from p_payload->>'hash' then return '{"conflict":true}'::jsonb;end if;
  if a.uploaded_at is null or a.object_path is null then return '{"locked":true}'::jsonb;end if;
  next_review:=p_payload->>'decision';
  if next_review not in ('approved','changes_requested') or p_payload->>'reviewed' is distinct from 'true' or nullif(trim(p_payload->>'note'),'') is null or length(trim(p_payload->>'note')) not between 1 and 1000 then raise exception 'Invalid document review';end if;
  next_status:=case when next_review='approved' and a.school_contract_signed_at is not null then 'effective' when next_review='approved' then 'approved_awaiting_school' else 'uploaded_awaiting_review' end;
  update forge_redesign_test.referral_agreements set review_state=next_review,status=next_status,review_version=review_version+1 where referral_id=r.id;
  insert into forge_redesign_test.agreement_review_audit(referral_id,actor_id,action,previous_state,next_state,document_hash,note) values(r.id,p_user_id,'agreement_review',a.review_state,next_review,a.signed_hash,trim(p_payload->>'note'));
  return jsonb_build_object('saved',true,'status',next_status);
 elsif p_action in ('contract_check','contract_record') then
  if p_payload->>'reviewed' is distinct from 'true' or nullif(trim(p_payload->>'note'),'') is null or length(trim(p_payload->>'note')) not between 1 and 1000 or p_payload->>'signedOn' is null or (p_payload->>'signedOn')::date>(clock_timestamp() at time zone 'Africa/Lagos')::date or (p_payload->>'signedOn')::date<'2000-01-01' then raise exception 'Invalid contract evidence';end if;
  if p_action='contract_check' then return '{"allowed":true}'::jsonb;end if;
  if p_payload->>'hash' !~ '^[0-9a-f]{64}$' or p_payload->>'path'<>'contracts/'||s.id::text||'/'||(p_payload->>'receiptId')||'.pdf' then raise exception 'Invalid evidence file';end if;
  insert into forge_redesign_test.school_contract_evidence(id,request_id,referral_id,object_path,content_hash,signed_on,recorded_by,note) values((p_payload->>'receiptId')::uuid,s.id,r.id,p_payload->>'path',p_payload->>'hash',(p_payload->>'signedOn')::date,p_user_id,trim(p_payload->>'note'));
  update forge_redesign_test.school_onboarding_requests set status='agreed',version=version+1,updated_at=now() where id=s.id;
  insert into forge_redesign_test.school_review_audit(request_id,actor_id,previous_status,next_status,note) values(s.id,p_user_id,s.status,'agreed',trim(p_payload->>'note'));
  next_status:=case when a.review_state='approved' then 'effective' else a.status end;
  update forge_redesign_test.referral_agreements set school_contract_signed_at=((p_payload->>'signedOn')||' 00:00:00 Africa/Lagos')::timestamptz,status=next_status,review_version=review_version+1 where referral_id=r.id;
  insert into forge_redesign_test.agreement_review_audit(referral_id,actor_id,action,previous_state,next_state,document_hash,note) values(r.id,p_user_id,'school_contract',s.status,'agreed',p_payload->>'hash',trim(p_payload->>'note'));
  return jsonb_build_object('saved',true,'receiptId',p_payload->>'receiptId','status',next_status);
 end if;
 raise exception 'Unknown staff action';
end $$;
revoke all on function public.forge_staff_agreement_action(uuid,text,text,jsonb) from public,anon,authenticated;
grant execute on function public.forge_staff_agreement_action(uuid,text,text,jsonb) to service_role;
commit;
