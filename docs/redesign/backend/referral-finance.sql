-- REVIEW BUNDLE ONLY. Requires referral foundation, school foundation, staff agreement review.
-- Isolated test-schema implementation. All amounts integer kobo, commission rounded to nearest kobo.
begin;
alter table forge_redesign_test.school_referrals add column finance_version integer not null default 1;
create table forge_redesign_test.referral_financial_terms (
 referral_id uuid primary key references forge_redesign_test.school_referrals(id),
 school_id uuid not null unique references forge_redesign_test.school_onboarding_requests(id),
 contract_evidence_id uuid not null unique references forge_redesign_test.school_contract_evidence(id),
 agreement_hash text not null check(agreement_hash ~ '^[0-9a-f]{64}$'),
 gross_kobo bigint not null check(gross_kobo between 0 and 9007199254740991),
 internet_kobo bigint not null check(internet_kobo between 0 and 9007199254740991),
 operations_kobo bigint not null check(operations_kobo between 0 and 9007199254740991),
 tax_kobo bigint not null check(tax_kobo between 0 and 9007199254740991),
 net_kobo bigint generated always as (gross_kobo-internet_kobo-operations_kobo-tax_kobo) stored check(net_kobo>=0),
 rate_bps integer not null default 1500 check(rate_bps=1500),
 commission_kobo bigint generated always as (round((gross_kobo::numeric-internet_kobo-operations_kobo-tax_kobo)*15/100)::bigint) stored,
 starts_on date not null,actor_id uuid not null references auth.users(id),recorded_at timestamptz not null default clock_timestamp()
);
create table forge_redesign_test.referral_finance_events (
 receipt_id uuid primary key,referral_id uuid not null references forge_redesign_test.school_referrals(id),
 action text not null check(action in ('start','deposit','payable','payment','fulfill')),
 actor_id uuid not null references auth.users(id),payload jsonb not null,result jsonb not null,created_at timestamptz not null default clock_timestamp()
);
create unique index referral_one_deposit on forge_redesign_test.referral_finance_events(referral_id) where action='deposit';
create unique index referral_unique_external_payment_reference on forge_redesign_test.referral_finance_events(lower(trim(payload->>'reference'))) where action='payment';
create unique index referral_one_payment on forge_redesign_test.referral_finance_events(referral_id) where action='payment';
create table forge_redesign_test.referral_statement_fulfillments (
 request_id uuid primary key references forge_redesign_test.referral_statement_requests(id),receipt_id uuid not null unique,
 actor_id uuid not null references auth.users(id),statement jsonb not null,note text not null,fulfilled_at timestamptz not null default clock_timestamp()
);
create table forge_redesign_test.referrer_closure_audit (
 referrer_id uuid primary key references forge_redesign_test.referrer_accounts(id),actor_id uuid not null references auth.users(id),note text not null,closed_at timestamptz not null default clock_timestamp()
);
create table forge_redesign_test.referral_calendar_audit (
 id uuid primary key default gen_random_uuid(),actor_id uuid not null references auth.users(id),
 previous_calendar jsonb,previous_holidays jsonb not null,reviewed_calendar jsonb not null,
 note text not null check(length(trim(note)) between 1 and 1000),reviewed_at timestamptz not null default clock_timestamp()
);
alter table forge_redesign_test.referral_calendar_audit enable row level security;
revoke all on forge_redesign_test.referral_calendar_audit from public,anon,authenticated,service_role;
grant select,insert on forge_redesign_test.referral_calendar_audit to service_role;
revoke all on forge_redesign_test.referral_holiday_calendar,forge_redesign_test.nigerian_public_holidays from public,anon,authenticated,service_role;
grant select,insert,update on forge_redesign_test.referral_holiday_calendar to service_role;
grant select,insert,delete on forge_redesign_test.nigerian_public_holidays to service_role;
create function forge_redesign_test.reject_finance_mutation() returns trigger language plpgsql security invoker set search_path='' as $$begin raise exception 'Financial evidence is immutable';end $$;
create trigger immutable_calendar_audit before update or delete on forge_redesign_test.referral_calendar_audit for each row execute function forge_redesign_test.reject_finance_mutation();
create trigger immutable_terms before update or delete on forge_redesign_test.referral_financial_terms for each row execute function forge_redesign_test.reject_finance_mutation();
create trigger immutable_events before update or delete on forge_redesign_test.referral_finance_events for each row execute function forge_redesign_test.reject_finance_mutation();
create trigger immutable_fulfillments before update or delete on forge_redesign_test.referral_statement_fulfillments for each row execute function forge_redesign_test.reject_finance_mutation();
create trigger immutable_closures before update or delete on forge_redesign_test.referrer_closure_audit for each row execute function forge_redesign_test.reject_finance_mutation();
create trigger immutable_payout_profile before update or delete on forge_redesign_test.referrer_payout_profiles for each row execute function forge_redesign_test.reject_finance_mutation();
alter table forge_redesign_test.referral_financial_terms enable row level security;
alter table forge_redesign_test.referral_finance_events enable row level security;
alter table forge_redesign_test.referral_statement_fulfillments enable row level security;
alter table forge_redesign_test.referrer_closure_audit enable row level security;
revoke all on forge_redesign_test.referral_financial_terms,forge_redesign_test.referral_finance_events,forge_redesign_test.referral_statement_fulfillments,forge_redesign_test.referrer_closure_audit from public,anon,authenticated,service_role;
grant update(status) on forge_redesign_test.referral_statement_requests to service_role;
grant select,insert on forge_redesign_test.referral_financial_terms,forge_redesign_test.referral_finance_events,forge_redesign_test.referral_statement_fulfillments,forge_redesign_test.referrer_closure_audit to service_role;
create function forge_redesign_test.finance_statement(p_referral uuid) returns jsonb language sql stable security invoker set search_path='' as $$
 select jsonb_build_object('referralId',r.id,'schoolName',r.school_name,'stage',r.stage,'startsOn',r.starts_on,'payableOn',r.payable_on,'paidKobo',r.paid_kobo,
 'calculation',(select to_jsonb(t)-'actor_id' from forge_redesign_test.referral_financial_terms t where t.referral_id=r.id),
 'events',(select coalesce(jsonb_agg(jsonb_build_object('receiptId',e.receipt_id,'action',e.action,'recordedAt',e.created_at,'result',e.result,'evidence',e.payload-'accountNumber'-'accountName'-'bankName') order by e.created_at),'[]'::jsonb) from forge_redesign_test.referral_finance_events e where e.referral_id=r.id)) from forge_redesign_test.school_referrals r where r.id=p_referral
$$;
create function public.forge_referral_finance_action(p_user_id uuid,p_verified_email text,p_action text,p_payload jsonb default '{}',p_owner boolean default false)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare staff forge_redesign_test.staff_members; r forge_redesign_test.school_referrals; s forge_redesign_test.school_onboarding_requests; a forge_redesign_test.referral_agreements; c forge_redesign_test.school_contract_evidence; t forge_redesign_test.referral_financial_terms; e forge_redesign_test.referral_finance_events; profile forge_redesign_test.referrer_payout_profiles; req forge_redesign_test.referral_statement_requests; result jsonb; owner_id uuid; today date:=(clock_timestamp() at time zone 'Africa/Lagos')::date; calendar_previous jsonb;holidays_previous jsonb;holiday jsonb;covered_from date;covered_through date;off integer:=coalesce((p_payload->>'offset')::integer,0);
begin
 if p_user_id is null or nullif(p_verified_email,'') is null then return '{"forbidden":true}';end if;
 if p_owner then
  if p_action<>'statements' or not exists(select 1 from forge_redesign_test.referrer_accounts where id=p_user_id) then return '{"forbidden":true}';end if;
 else
  select * into staff from forge_redesign_test.staff_members where email=lower(p_verified_email) and active and role='admin' and (user_id is null or user_id=p_user_id) for update;
  if not found then return '{"forbidden":true}';end if;
  if staff.user_id is null then update forge_redesign_test.staff_members set user_id=p_user_id where email=staff.email;end if;
 end if;
 if p_action='calendar' and not p_owner then
  if p_payload->>'reviewed' is distinct from 'true' or nullif(trim(p_payload->>'note'),'') is null or length(p_payload->>'note')>1000 or p_payload->>'coveredFrom' is null or p_payload->>'coveredThrough' is null or jsonb_typeof(p_payload->'holidays') is distinct from 'array' or exists(select 1 from jsonb_object_keys(p_payload) k where k not in ('coveredFrom','coveredThrough','holidays','note','reviewed')) then raise exception 'Explicit reviewed calendar required';end if;
  covered_from:=(p_payload->>'coveredFrom')::date;covered_through:=(p_payload->>'coveredThrough')::date;
  if covered_from<'2000-01-01' or covered_from>today or covered_through<today+10 or covered_through>(today+interval '2 years')::date or jsonb_array_length(p_payload->'holidays')>100 then raise exception 'Invalid calendar coverage';end if;
  if (select count(*) from jsonb_array_elements(p_payload->'holidays'))<>(select count(distinct h->>'date') from jsonb_array_elements(p_payload->'holidays') h) then raise exception 'Duplicate holiday date';end if;
  for holiday in select value from jsonb_array_elements(p_payload->'holidays') loop
   if jsonb_typeof(holiday)<>'object' or exists(select 1 from jsonb_object_keys(holiday) k where k not in ('date','name','sourceUrl')) or holiday->>'date' is null or holiday->>'name' is null or length(trim(holiday->>'name')) not between 1 and 200 or holiday->>'sourceUrl' is null or length(holiday->>'sourceUrl')>2000 or holiday->>'sourceUrl' !~ '^https://([a-z0-9-]+\.)*gov\.ng(/[^[:space:]]*)?$' or (holiday->>'date')::date not between covered_from and covered_through then raise exception 'Official sourced holiday required';end if;
  end loop;
  perform pg_catalog.pg_advisory_xact_lock(74265021);
  select to_jsonb(hc) into calendar_previous from forge_redesign_test.referral_holiday_calendar hc where id=true for update;
  select coalesce(jsonb_agg(to_jsonb(h) order by h.holiday),'[]'::jsonb) into holidays_previous from forge_redesign_test.nigerian_public_holidays h where h.holiday between covered_from and covered_through;
  insert into forge_redesign_test.referral_holiday_calendar(id,covered_from,covered_through,reviewed_at) values(true,covered_from,covered_through,clock_timestamp()) on conflict(id) do update set covered_from=excluded.covered_from,covered_through=excluded.covered_through,reviewed_at=excluded.reviewed_at;
  delete from forge_redesign_test.nigerian_public_holidays h where h.holiday between covered_from and covered_through;
  insert into forge_redesign_test.nigerian_public_holidays(holiday,name,source_url,reviewed_at) select (h->>'date')::date,trim(h->>'name'),h->>'sourceUrl',clock_timestamp() from jsonb_array_elements(p_payload->'holidays') h;
  insert into forge_redesign_test.referral_calendar_audit(actor_id,previous_calendar,previous_holidays,reviewed_calendar,note) values(p_user_id,calendar_previous,holidays_previous,p_payload,trim(p_payload->>'note')) returning jsonb_build_object('saved',true,'auditId',id,'coveredFrom',covered_from,'coveredThrough',covered_through) into result;
  return result;
 end if;
 if off<0 or off>100000 then raise exception 'Invalid pagination';end if;
 if p_action='statements' then
  return jsonb_build_object('items',(select coalesce(jsonb_agg(x.statement),'[]'::jsonb) from (select forge_redesign_test.finance_statement(rf.id)||jsonb_build_object('requests',(select coalesce(jsonb_agg(to_jsonb(q)||jsonb_build_object('fulfillment',(select to_jsonb(f)-'actor_id' from forge_redesign_test.referral_statement_fulfillments f where f.request_id=q.id)) order by q.requested_at desc),'[]'::jsonb) from forge_redesign_test.referral_statement_requests q where q.referral_id=rf.id)) as statement from forge_redesign_test.school_referrals rf where rf.referrer_id=p_user_id order by rf.created_at desc,rf.id limit 50 offset off) x));
 elsif p_action='list' and not p_owner then
  return jsonb_build_object('calendar',(select to_jsonb(hc)||jsonb_build_object('holidays',(select coalesce(jsonb_agg(to_jsonb(h) order by h.holiday),'[]'::jsonb) from forge_redesign_test.nigerian_public_holidays h where h.holiday between hc.covered_from and hc.covered_through)) from forge_redesign_test.referral_holiday_calendar hc where hc.id=true),'total',(select count(*) from forge_redesign_test.school_referrals),'items',(select coalesce(jsonb_agg(to_jsonb(x)),'[]'::jsonb) from (select rf.*,sc.id as school_id,sc.version as school_version,ac.status as account_status,forge_redesign_test.finance_statement(rf.id) as statement,(select to_jsonb(bp) from forge_redesign_test.referrer_payout_profiles bp where bp.referrer_id=rf.referrer_id) as bank_profile,(select coalesce(jsonb_agg(to_jsonb(q) order by q.requested_at),'[]'::jsonb) from forge_redesign_test.referral_statement_requests q where q.referral_id=rf.id) as requests from forge_redesign_test.school_referrals rf join forge_redesign_test.referrer_accounts ac on ac.id=rf.referrer_id left join forge_redesign_test.school_onboarding_requests sc on sc.referral_id=rf.id order by rf.created_at desc,rf.id limit 50 offset off) x));
 end if;
 if p_owner then return '{"forbidden":true}';end if;
 if p_action not in ('start','deposit','payable','payment','fulfill','close') or p_payload->>'reviewed' is distinct from 'true' or nullif(trim(p_payload->>'note'),'') is null or length(trim(p_payload->>'note')) not between 1 and 1000 then raise exception 'Explicit reviewed action required';end if;
 if p_action='close' then
  owner_id:=(p_payload->>'ownerId')::uuid;
  perform 1 from forge_redesign_test.referrer_accounts where id=owner_id and status='active' for update;if not found then return '{"locked":true}';end if;
  perform 1 from forge_redesign_test.school_referrals where referrer_id=owner_id for update;
  if exists(select 1 from forge_redesign_test.school_referrals where referrer_id=owner_id and (stage not in ('paid','cancelled') or paid_kobo<>coalesce(earned_kobo,0))) or exists(select 1 from forge_redesign_test.referral_statement_requests where referrer_id=owner_id and status='requested') or exists(select 1 from forge_redesign_test.referral_agreements where referrer_id=owner_id and status='effective') then return '{"locked":true}';end if;
  insert into forge_redesign_test.referrer_closure_audit(referrer_id,actor_id,note) values(owner_id,p_user_id,trim(p_payload->>'note'));
  update forge_redesign_test.referrer_accounts set status='closed' where id=owner_id;
  return jsonb_build_object('closed',true,'evidenceRetained',true);
 end if;
 select referrer_id into owner_id from forge_redesign_test.school_referrals where id=(p_payload->>'referralId')::uuid;
 if not found then return '{"missing":true}';end if;
 perform 1 from forge_redesign_test.referrer_accounts where id=owner_id for update;
 select * into r from forge_redesign_test.school_referrals where id=(p_payload->>'referralId')::uuid for update;
 select * into e from forge_redesign_test.referral_finance_events where receipt_id=(p_payload->>'receiptId')::uuid;
 if found then
  if e.referral_id=r.id and e.actor_id=p_user_id and e.action=p_action and e.payload=p_payload then return e.result;end if;
  return '{"conflict":true}';
 end if;
 if p_payload->>'version' is null or r.finance_version<>(p_payload->>'version')::integer then return '{"conflict":true}';end if;
 if not exists(select 1 from forge_redesign_test.referrer_accounts where id=r.referrer_id and status='active') then return '{"locked":true}';end if;
 select * into t from forge_redesign_test.referral_financial_terms where referral_id=r.id;
 if p_action='start' then
  select * into s from forge_redesign_test.school_onboarding_requests where id=(p_payload->>'schoolId')::uuid and referral_id=r.id for update;
  select * into a from forge_redesign_test.referral_agreements where referral_id=r.id for update;
  select * into c from forge_redesign_test.school_contract_evidence where request_id=s.id and referral_id=r.id;
  if s.id is null or s.status<>'agreed' or p_payload->>'schoolVersion' is null or s.version<>(p_payload->>'schoolVersion')::integer or a.status<>'effective' or a.review_state<>'approved' or a.signed_hash is null or c.id is null or r.stage not in ('school_requested','verified') or t.referral_id is not null then return '{"locked":true}';end if;
  if (p_payload->>'startsOn')::date>today or (p_payload->>'startsOn')::date<c.signed_on or (p_payload->>'startsOn')::date<(a.uploaded_at at time zone 'Africa/Lagos')::date or exists(select 1 from forge_redesign_test.agreement_review_audit ar where ar.referral_id=r.id and ar.next_state='approved' and (ar.created_at at time zone 'Africa/Lagos')::date>(p_payload->>'startsOn')::date) or (p_payload->>'startsOn')::date<'2000-01-01' then raise exception 'Invalid teaching date';end if;
  insert into forge_redesign_test.referral_financial_terms(referral_id,school_id,contract_evidence_id,agreement_hash,gross_kobo,internet_kobo,operations_kobo,tax_kobo,starts_on,actor_id) values(r.id,s.id,c.id,a.signed_hash,(p_payload->>'grossKobo')::bigint,(p_payload->>'internetKobo')::bigint,(p_payload->>'operationsKobo')::bigint,(p_payload->>'taxKobo')::bigint,(p_payload->>'startsOn')::date,p_user_id) returning * into t;
  update forge_redesign_test.school_referrals set stage='teaching_started',starts_on=t.starts_on,earned_kobo=t.commission_kobo where id=r.id;
  update forge_redesign_test.school_onboarding_requests set status='teaching_started',version=version+1,updated_at=now() where id=s.id;
  insert into forge_redesign_test.school_review_audit(request_id,actor_id,previous_status,next_status,note) values(s.id,p_user_id,s.status,'teaching_started',trim(p_payload->>'note'));
 elsif p_action='deposit' then
  if t.referral_id is null or r.stage<>'teaching_started' or exists(select 1 from forge_redesign_test.referral_finance_events where referral_id=r.id and action='deposit') then return '{"locked":true}';end if;
  if p_payload->>'receivedOn' is null or p_payload->>'amountKobo' is null or p_payload->>'reference' is null or (p_payload->>'receivedOn')::date>today or (p_payload->>'receivedOn')::date<'2000-01-01' or (p_payload->>'amountKobo')::numeric not between 1 and 9007199254740991 or (p_payload->>'amountKobo')::numeric<>trunc((p_payload->>'amountKobo')::numeric) or length(trim(p_payload->>'reference')) not between 1 and 200 then raise exception 'Invalid first deposit';end if;
 elsif p_action='payable' then
  if r.stage<>'teaching_started' or t.referral_id is null or r.payable_on is null or today<r.payable_on or not exists(select 1 from forge_redesign_test.referral_finance_events where referral_id=r.id and action='deposit') then return '{"locked":true}';end if;
  update forge_redesign_test.school_referrals set stage='payable' where id=r.id;
 elsif p_action='payment' then
  select * into profile from forge_redesign_test.referrer_payout_profiles where referrer_id=r.referrer_id;
  if r.stage<>'payable' or t.referral_id is null or r.payable_on is null or today<r.payable_on or profile.referrer_id is null or not exists(select 1 from forge_redesign_test.referral_finance_events where referral_id=r.id and action='deposit') then return '{"locked":true}';end if;
  if p_payload->>'amountKobo' is null or p_payload->>'paidOn' is null or p_payload->>'reference' is null or p_payload->>'completedExternally' is distinct from 'true' or (p_payload->>'amountKobo')::numeric<>t.commission_kobo or p_payload->>'bankName' is distinct from profile.bank_name or p_payload->>'accountName' is distinct from profile.account_name or p_payload->>'accountNumber' is distinct from profile.account_number or (p_payload->>'paidOn')::date>today or (p_payload->>'paidOn')::date<r.payable_on or exists(select 1 from forge_redesign_test.referral_finance_events de where de.referral_id=r.id and de.action='deposit' and (de.payload->>'receivedOn')::date>(p_payload->>'paidOn')::date) or length(trim(p_payload->>'reference')) not between 1 and 200 then raise exception 'Payment must match the full earned amount and registered bank profile';end if;
  update forge_redesign_test.school_referrals set stage='paid',paid_kobo=t.commission_kobo where id=r.id;
  update forge_redesign_test.referral_agreements set status='discharged',review_version=review_version+1 where referral_id=r.id and status='effective';
 elsif p_action='fulfill' then
  select * into req from forge_redesign_test.referral_statement_requests where id=(p_payload->>'requestId')::uuid and referral_id=r.id and referrer_id=r.referrer_id and status='requested' for update;
  if not found then return '{"locked":true}';end if;
  insert into forge_redesign_test.referral_statement_fulfillments(request_id,receipt_id,actor_id,statement,note) values(req.id,(p_payload->>'receiptId')::uuid,p_user_id,forge_redesign_test.finance_statement(r.id),trim(p_payload->>'note'));
  update forge_redesign_test.referral_statement_requests set status='fulfilled' where id=req.id;
 end if;
 update forge_redesign_test.school_referrals set finance_version=finance_version+1 where id=r.id returning jsonb_build_object('saved',true,'receiptId',p_payload->>'receiptId','version',finance_version,'stage',stage,'earnedKobo',earned_kobo,'paidKobo',paid_kobo) into result;
 insert into forge_redesign_test.referral_finance_events(receipt_id,referral_id,action,actor_id,payload,result) values((p_payload->>'receiptId')::uuid,r.id,p_action,p_user_id,p_payload,result);
 return result;
end $$;
revoke all on function forge_redesign_test.reject_finance_mutation(),forge_redesign_test.finance_statement(uuid),public.forge_referral_finance_action(uuid,text,text,jsonb,boolean) from public,anon,authenticated;
grant execute on function forge_redesign_test.reject_finance_mutation(),forge_redesign_test.finance_statement(uuid),public.forge_referral_finance_action(uuid,text,text,jsonb,boolean) to service_role;
-- Lock the reviewed coverage row while counting days so a calendar replacement cannot mix snapshots.
create or replace function forge_redesign_test.request_referral_statement(p_owner uuid,p_referral uuid) returns jsonb language plpgsql security invoker set search_path='' as $$
declare start_date date:=(clock_timestamp() at time zone 'Africa/Lagos')::date; target date; total integer:=0; calendar forge_redesign_test.referral_holiday_calendar; receipt forge_redesign_test.referral_statement_requests;
begin
 perform forge_redesign_test.referral_owner_lock(p_owner,p_referral);
 select * into calendar from forge_redesign_test.referral_holiday_calendar where id=true for share;
 if not found or calendar.covered_from>start_date then raise exception 'Holiday calendar unconfigured';end if;
 select * into receipt from forge_redesign_test.referral_statement_requests where referral_id=p_referral and referrer_id=p_owner and status='requested' order by requested_at desc limit 1;
 if found then return jsonb_build_object('id',receipt.id,'requestedAt',receipt.requested_at,'dueOn',receipt.due_on);end if;
 target:=start_date;
 while total<5 loop
 target:=target+1;
 if target>calendar.covered_through then raise exception 'Holiday coverage unconfigured';end if;
 if extract(isodow from target)<6 and not exists(select 1 from forge_redesign_test.nigerian_public_holidays where holiday=target) then total:=total+1;end if;
 end loop;
 insert into forge_redesign_test.referral_statement_requests(referral_id,referrer_id,due_on) values(p_referral,p_owner,target) returning * into receipt;
 return jsonb_build_object('id',receipt.id,'requestedAt',receipt.requested_at,'dueOn',receipt.due_on);
end $$;

commit;
