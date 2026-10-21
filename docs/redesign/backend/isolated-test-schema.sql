-- REVIEW DRAFT ONLY. Not applied to any database.
-- Generate a proper migration with `supabase migration new school_referrals` when CLI is available.
-- Apply and verify first on an isolated development database, never directly to forge-web.
begin;
create schema forge_redesign_test;
grant usage on schema forge_redesign_test to authenticated,service_role;
create table forge_redesign_test.referrer_accounts (
 id uuid primary key references auth.users(id) on delete restrict,
 referral_number text not null unique default ('FORGE-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,12))),
 status text not null default 'active' check(status in ('active','closed')),
 created_at timestamptz not null default now()
);
create table forge_redesign_test.school_referrals (
 id uuid primary key default gen_random_uuid(),
 referrer_id uuid not null references forge_redesign_test.referrer_accounts(id) on delete restrict,
 code text not null unique default ('FRG-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,12))) check(code ~ '^FRG-[A-Z0-9]{12}$'),
 school_name text not null check(length(school_name) between 1 and 200),
 location text not null check(length(location) between 1 and 200),
 school_key text not null,
 stage text not null default 'link_created' check(stage in ('link_created','school_requested','verified','teaching_started','payable','paid','cancelled')),
 earned_kobo bigint check(earned_kobo is null or earned_kobo between 0 and 9007199254740991),
 paid_kobo bigint not null default 0 check(paid_kobo between 0 and 9007199254740991),
 starts_on date,
 payable_on date generated always as (starts_on + 28) stored,
 created_at timestamptz not null default now(),
 unique(referrer_id,school_key),
 check(paid_kobo=0 or (earned_kobo is not null and paid_kobo<=earned_kobo)),
 check(stage not in ('teaching_started','payable','paid') or starts_on is not null),
 check(stage<>'paid' or (earned_kobo is not null and paid_kobo=earned_kobo))
);
create index school_referrals_owner_created on forge_redesign_test.school_referrals(referrer_id,created_at desc);
create table forge_redesign_test.school_onboarding_requests (
 id uuid primary key default gen_random_uuid(),
 school_key text not null unique,
 school_name text not null,
 referral_id uuid unique references forge_redesign_test.school_referrals(id) on delete restrict,
 submitted_by_referrer uuid references forge_redesign_test.referrer_accounts(id) on delete restrict,
 payload jsonb not null,
 status text not null default 'pending' check(status in ('pending','reviewing','proposal_shared','agreed','teaching_started','declined')),
 created_at timestamptz not null default now()
);
alter table forge_redesign_test.referrer_accounts enable row level security;
alter table forge_redesign_test.school_referrals enable row level security;
alter table forge_redesign_test.school_onboarding_requests enable row level security;
revoke all on forge_redesign_test.referrer_accounts,forge_redesign_test.school_referrals,forge_redesign_test.school_onboarding_requests from anon,authenticated;
grant select on forge_redesign_test.referrer_accounts,forge_redesign_test.school_referrals to authenticated;
create policy referrers_read_own_account on forge_redesign_test.referrer_accounts for select to authenticated using((select auth.uid())=id and status='active');
create policy referrers_read_own_links on forge_redesign_test.school_referrals for select to authenticated using((select auth.uid())=referrer_id and exists(select 1 from forge_redesign_test.referrer_accounts a where a.id=referrer_id and a.status='active'));
grant all on forge_redesign_test.referrer_accounts,forge_redesign_test.school_referrals,forge_redesign_test.school_onboarding_requests to service_role;
-- Locking the account makes concurrent link creation respect the hourly cap.
create function forge_redesign_test.create_school_referral(p_referrer_id uuid,p_school_name text,p_location text,p_school_key text) returns forge_redesign_test.school_referrals
language plpgsql security invoker set search_path='' as $$
declare linked forge_redesign_test.school_referrals;
begin
 perform 1 from forge_redesign_test.referrer_accounts where id=p_referrer_id and status='active' for update;
 if not found then raise exception 'Inactive referrer'; end if;
 if (select count(*) from forge_redesign_test.school_referrals where referrer_id=p_referrer_id and created_at>now()-interval '1 hour')>=30 then raise exception 'Link rate limit'; end if;
 insert into forge_redesign_test.school_referrals(referrer_id,school_name,location,school_key) values(p_referrer_id,p_school_name,p_location,p_school_key) returning * into linked;
 return linked;
end $$;
revoke all on function forge_redesign_test.create_school_referral(uuid,text,text,text) from public,anon,authenticated;
grant execute on function forge_redesign_test.create_school_referral(uuid,text,text,text) to service_role;

-- Both self-onboarding and assisted onboarding call the SAME atomic operation.
-- SECURITY INVOKER: only the server role may call it; no public privilege escalation.
create function forge_redesign_test.submit_school_onboarding(p_payload jsonb,p_referrer_id uuid default null) returns uuid
language plpgsql security invoker set search_path='' as $$
declare linked forge_redesign_test.school_referrals; request_id uuid;
begin
 if p_payload->>'schoolKey' is null or p_payload->>'schoolName' is null or p_payload->>'consent' is distinct from 'true' then raise exception 'Invalid school request'; end if;
 if p_referrer_id is not null then
  if p_payload->>'schoolAuthorised' is distinct from 'true' then raise exception 'School authorisation required'; end if;
  perform 1 from forge_redesign_test.referrer_accounts where id=p_referrer_id and status='active' for update;
  if not found then raise exception 'Inactive referrer'; end if;
 end if;
 if nullif(p_payload->>'referralCode','') is not null then
  select * into linked from forge_redesign_test.school_referrals where code=p_payload->>'referralCode' for update;
  if not found or linked.stage<>'link_created' or linked.school_key<>p_payload->>'schoolKey' then raise exception 'Referral unavailable'; end if;
  if p_referrer_id is not null and linked.referrer_id<>p_referrer_id then raise exception 'Referral owner mismatch'; end if;
  if not exists(select 1 from forge_redesign_test.referrer_accounts where id=linked.referrer_id and status='active') then raise exception 'Inactive referrer'; end if;
 elsif p_referrer_id is not null then
  select * into linked from forge_redesign_test.school_referrals where referrer_id=p_referrer_id and school_key=p_payload->>'schoolKey' for update;
  if found then
   if linked.stage<>'link_created' then raise exception 'School already submitted'; end if;
  else
   select * into linked from forge_redesign_test.create_school_referral(p_referrer_id,p_payload->>'schoolName',p_payload->>'location',p_payload->>'schoolKey');
  end if;
 end if;
 insert into forge_redesign_test.school_onboarding_requests(school_key,school_name,referral_id,submitted_by_referrer,payload)
 values(p_payload->>'schoolKey',p_payload->>'schoolName',linked.id,p_referrer_id,p_payload) returning id into request_id;
 if linked.id is not null then update forge_redesign_test.school_referrals set stage='school_requested' where id=linked.id; end if;
 return request_id;
end $$;
revoke all on function forge_redesign_test.submit_school_onboarding(jsonb,uuid) from public,anon,authenticated;
grant execute on function forge_redesign_test.submit_school_onboarding(jsonb,uuid) to service_role;
commit;
-- No legacy table policies are changed here. Review their existing live consumers separately.
