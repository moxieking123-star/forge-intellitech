-- REVIEW PROPOSAL ONLY. UNAPPLIED. Requires referral-schema-proposal.sql first.
-- Legal and isolated database/security review required before enabling REFERRALS_ENABLED.
begin;
-- Replace the older week-five date with the beginning of week four. This is an
-- eligibility marker only; staff must verify first deposit receipt before payment.
alter table public.school_referrals drop column payable_on;
alter table public.school_referrals add column payable_on date generated always as (starts_on + 21) stored;
create table public.referrer_payout_profiles (
 referrer_id uuid primary key references public.referrer_accounts(id),
 bank_name text not null check(length(bank_name) between 1 and 120),
 account_name text not null check(length(account_name) between 1 and 200),
 account_number text not null check(account_number ~ '^[0-9]{10}$'),
 created_at timestamptz not null default clock_timestamp()
);
create table public.referral_agreements (
 referral_id uuid primary key references public.school_referrals(id),
 referrer_id uuid not null references public.referrer_accounts(id),
 version text not null,
 content_hash text not null check(content_hash ~ '^[0-9a-f]{64}$'),
 downloaded_at timestamptz not null default clock_timestamp(),
 uploaded_at timestamptz,
 signed_hash text check(signed_hash ~ '^[0-9a-f]{64}$'),
 object_path text unique,
 upload_reserved_at timestamptz,
 school_contract_signed_at timestamptz,
 status text not null default 'awaiting_signed_upload' check(status in ('awaiting_signed_upload','uploaded_awaiting_review','approved_awaiting_school','effective','discharged')),
 check((uploaded_at is null and signed_hash is null) or (uploaded_at is not null and signed_hash is not null and object_path is not null))
);
create table public.referral_agreement_downloads (
 id uuid primary key default gen_random_uuid(),referral_id uuid not null references public.referral_agreements(referral_id),
 referrer_id uuid not null references public.referrer_accounts(id),version text not null,content_hash text not null,
 served_at timestamptz not null default clock_timestamp()
);
create table public.nigerian_public_holidays (holiday date primary key, name text not null, source_url text not null, reviewed_at timestamptz not null);
create table public.referral_holiday_calendar (id boolean primary key default true check(id),covered_from date not null,covered_through date not null,reviewed_at timestamptz not null,check(covered_through>=covered_from));
-- Intentionally UNSEEDED: staff must review official federal/state applicability and exceptional declarations.
create table public.referral_statement_requests (
 id uuid primary key default gen_random_uuid(),referral_id uuid not null references public.school_referrals(id),referrer_id uuid not null references public.referrer_accounts(id),
 requested_at timestamptz not null default clock_timestamp(),due_on date not null,status text not null default 'requested' check(status in ('requested','fulfilled'))
);
alter table public.referrer_payout_profiles enable row level security;
alter table public.referral_agreements enable row level security;
alter table public.referral_agreement_downloads enable row level security;
alter table public.nigerian_public_holidays enable row level security;
alter table public.referral_holiday_calendar enable row level security;
alter table public.referral_statement_requests enable row level security;
revoke all on public.referrer_payout_profiles,public.referral_agreements,public.referral_agreement_downloads,public.nigerian_public_holidays,public.referral_holiday_calendar,public.referral_statement_requests from public,anon,authenticated;
grant select,insert on public.referrer_payout_profiles to service_role;
grant select,insert,update on public.referral_agreements to service_role;
grant select,insert on public.referral_agreement_downloads,public.referral_statement_requests to service_role;
grant select on public.nigerian_public_holidays,public.referral_holiday_calendar to service_role;
-- Private bucket, zero client storage policies. Service routes only. Never issue a public URL.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('referral-signed-agreements','referral-signed-agreements',false,5242880,array['application/pdf']);
create function public.referral_owner_lock(p_owner uuid,p_referral uuid) returns void language plpgsql security invoker set search_path='' as $$
begin
 perform 1 from public.referrer_accounts where id=p_owner and status='active' for update;
 if not found then raise exception 'Inactive account'; end if;
 perform 1 from public.school_referrals where id=p_referral and referrer_id=p_owner and stage<>'cancelled' for update;
 if not found then raise exception 'Referral unavailable'; end if;
end $$;
create function public.record_referral_agreement_download(p_owner uuid,p_referral uuid,p_version text,p_hash text) returns timestamptz language plpgsql security invoker set search_path='' as $$
declare served timestamptz:=clock_timestamp(); existing public.referral_agreements;
begin
 perform public.referral_owner_lock(p_owner,p_referral);
 if p_version<>'draft-2026-10-22-v1' or p_hash !~ '^[0-9a-f]{64}$' then raise exception 'Invalid template';end if;
 select * into existing from public.referral_agreements where referral_id=p_referral for update;
 if found and (existing.version<>p_version or existing.content_hash<>p_hash) then raise exception 'Template revision requires reviewed version flow';end if;
 insert into public.referral_agreements(referral_id,referrer_id,version,content_hash,downloaded_at) values(p_referral,p_owner,p_version,p_hash,served) on conflict(referral_id) do nothing;
 insert into public.referral_agreement_downloads(referral_id,referrer_id,version,content_hash,served_at) values(p_referral,p_owner,p_version,p_hash,served);
 return served;
end $$;
create function public.reserve_referral_agreement_upload(p_owner uuid,p_referral uuid,p_version text,p_path text) returns void language plpgsql security invoker set search_path='' as $$
declare agreement public.referral_agreements;
begin
 perform public.referral_owner_lock(p_owner,p_referral);
 select * into agreement from public.referral_agreements where referral_id=p_referral and referrer_id=p_owner for update;
 if not found or agreement.version<>p_version or agreement.uploaded_at is not null or agreement.object_path is not null then raise exception 'Upload unavailable'; end if;
 if p_path not like p_owner::text||'/'||p_referral::text||'/%' or p_path ~ '\.\.' then raise exception 'Invalid path';end if;
 if not exists(select 1 from public.referral_agreement_downloads where referral_id=p_referral and referrer_id=p_owner and version=p_version and content_hash=agreement.content_hash and served_at>clock_timestamp()-interval '30 days') then raise exception 'Recent matching download required';end if;
 update public.referral_agreements set object_path=p_path,upload_reserved_at=clock_timestamp() where referral_id=p_referral;
end $$;
create function public.complete_referral_agreement_upload(p_owner uuid,p_referral uuid,p_path text,p_hash text) returns timestamptz language plpgsql security invoker set search_path='' as $$
declare received timestamptz:=clock_timestamp();
begin
 perform public.referral_owner_lock(p_owner,p_referral);
 update public.referral_agreements set uploaded_at=received,signed_hash=p_hash,status='uploaded_awaiting_review' where referral_id=p_referral and referrer_id=p_owner and object_path=p_path and uploaded_at is null;
 if not found then raise exception 'Upload reservation unavailable';end if;
 return received;
end $$;
create function public.cancel_referral_agreement_upload(p_owner uuid,p_referral uuid,p_path text) returns void language plpgsql security invoker set search_path='' as $$
begin
 perform public.referral_owner_lock(p_owner,p_referral);
 update public.referral_agreements set object_path=null,upload_reserved_at=null where referral_id=p_referral and referrer_id=p_owner and object_path=p_path and uploaded_at is null;
end $$;
create function public.request_referral_statement(p_owner uuid,p_referral uuid) returns jsonb language plpgsql security invoker set search_path='' as $$
declare start_date date:=(clock_timestamp() at time zone 'Africa/Lagos')::date; target date; total integer:=0; calendar public.referral_holiday_calendar; receipt public.referral_statement_requests;
begin
 perform public.referral_owner_lock(p_owner,p_referral);
 select * into calendar from public.referral_holiday_calendar where id=true;
 if not found or calendar.covered_from>start_date then raise exception 'Holiday calendar unconfigured';end if;
 select * into receipt from public.referral_statement_requests where referral_id=p_referral and referrer_id=p_owner and status='requested' order by requested_at desc limit 1;
 if found then return jsonb_build_object('id',receipt.id,'requestedAt',receipt.requested_at,'dueOn',receipt.due_on);end if;
 target:=start_date;
 while total<5 loop
 target:=target+1;
 if target>calendar.covered_through then raise exception 'Holiday coverage unconfigured';end if;
 if extract(isodow from target)<6 and not exists(select 1 from public.nigerian_public_holidays where holiday=target) then total:=total+1;end if;
 end loop;
 insert into public.referral_statement_requests(referral_id,referrer_id,due_on) values(p_referral,p_owner,target) returning * into receipt;
 return jsonb_build_object('id',receipt.id,'requestedAt',receipt.requested_at,'dueOn',receipt.due_on);
end $$;
revoke all on function public.referral_owner_lock(uuid,uuid),public.record_referral_agreement_download(uuid,uuid,text,text),public.reserve_referral_agreement_upload(uuid,uuid,text,text),public.complete_referral_agreement_upload(uuid,uuid,text,text),public.cancel_referral_agreement_upload(uuid,uuid,text),public.request_referral_statement(uuid,uuid) from public,anon,authenticated;
grant execute on function public.referral_owner_lock(uuid,uuid),public.record_referral_agreement_download(uuid,uuid,text,text),public.reserve_referral_agreement_upload(uuid,uuid,text,text),public.complete_referral_agreement_upload(uuid,uuid,text,text),public.cancel_referral_agreement_upload(uuid,uuid,text),public.request_referral_statement(uuid,uuid) to service_role;
commit;
-- Operational review: staff must verify external signing evidence, school contract and first-deposit receipt.
-- Signed upload alone NEVER sets school_contract_signed_at. No browser role can write these tables.
-- Add reviewed payment ledger/audit operation before live; discharge only THIS referral on full correct payment.
-- No live enablement, bank verification, automatic transfer or signature validity is implied by this proposal.
-- Reserved objects stranded by process failure require staff reconciliation; never silently reopen an uploaded record.
