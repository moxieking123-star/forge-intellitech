begin;
alter table forge_redesign_test.school_notification_outbox
 add column next_attempt_at timestamptz not null default now(), add column lease_token uuid,
 add column leased_until timestamptz, add column provider_id text, add column last_error text;
create table forge_redesign_test.proposal_notification_outbox (
 id uuid primary key default gen_random_uuid(), recipient text not null, payload jsonb not null,
 kind text not null default 'school_proposal_requested' check(kind='school_proposal_requested'),
 status text not null default 'pending' check(status in ('pending','sending','sent','failed')),
 attempts int not null default 0, next_attempt_at timestamptz not null default now(),
 lease_token uuid, leased_until timestamptz, provider_id text, last_error text,
 created_at timestamptz not null default now(), sent_at timestamptz, dedupe_key text unique
);
alter table forge_redesign_test.proposal_notification_outbox enable row level security;
revoke all on forge_redesign_test.proposal_notification_outbox from public,anon,authenticated;
grant select,insert,update on forge_redesign_test.proposal_notification_outbox to service_role;
-- first_attempt_at bounds Resend's 24-hour idempotency lifetime even across lease recovery.
alter table forge_redesign_test.school_notification_outbox add column first_attempt_at timestamptz;
alter table forge_redesign_test.notification_outbox add column first_attempt_at timestamptz;
alter table forge_redesign_test.proposal_notification_outbox add column first_attempt_at timestamptz;
create function public.forge_notification_table(p_queue text) returns text language sql immutable set search_path='' as $$
 select case p_queue when 'school' then 'school_notification_outbox' when 'participation' then 'notification_outbox' when 'proposal' then 'proposal_notification_outbox' else null end
$$;
create function public.forge_notification_claim(p_queue text,p_limit int default 5) returns jsonb language plpgsql security invoker set search_path='' as $$
declare t text:=public.forge_notification_table(p_queue); result jsonb;
begin
 if t is null or p_limit is null or p_limit not between 1 and 10 then raise exception 'Invalid queue or batch'; end if;
 execute format('update forge_redesign_test.%I set status=''failed'',last_error=''Delivery window elapsed; reconcile provider before retry'',lease_token=null,leased_until=null where (status in (''pending'',''sending'') and first_attempt_at < now()-interval ''23 hours'') or (status=''sending'' and leased_until<now() and attempts>=6)',t);
 execute format('with candidates as (select id from forge_redesign_test.%I where attempts<6 and (status=''pending'' and next_attempt_at<=now() or status=''sending'' and leased_until<now()) order by created_at for update skip locked limit $1), claimed as (update forge_redesign_test.%I o set status=''sending'',attempts=attempts+1,first_attempt_at=coalesce(first_attempt_at,now()),lease_token=gen_random_uuid(),leased_until=now()+interval ''5 minutes'' from candidates c where o.id=c.id returning o.*) select coalesce(jsonb_agg(to_jsonb(claimed)),''[]''::jsonb) from claimed',t,t) into result using p_limit;
 if p_queue='school' then
  select coalesce(jsonb_agg(j || jsonb_build_object('payload',s.payload,'queue',p_queue)),'[]') into result from jsonb_array_elements(result) j join forge_redesign_test.school_onboarding_requests s on s.id=(j->>'request_id')::uuid;
 elsif p_queue='participation' then
  select coalesce(jsonb_agg(j || jsonb_build_object('payload',s.payload,'queue',p_queue)),'[]') into result from jsonb_array_elements(result) j join forge_redesign_test.participation_submissions s on s.id=(j->>'submission_id')::uuid;
 else select coalesce(jsonb_agg(j || jsonb_build_object('queue',p_queue)),'[]') into result from jsonb_array_elements(result) j; end if;
 return result;
end; $$;
create function public.forge_notification_finish(p_queue text,p_id uuid,p_lease uuid,p_provider_id text default null,p_error text default null) returns boolean language plpgsql security invoker set search_path='' as $$
declare t text:=public.forge_notification_table(p_queue); affected int;
begin
 if t is null then raise exception 'Invalid queue'; end if;
 execute format('update forge_redesign_test.%I set status=case when $3 is not null then ''sent'' when attempts>=6 then ''failed'' else ''pending'' end,provider_id=left($3,255),sent_at=case when $3 is not null then now() else null end,last_error=case when $3 is null then left(coalesce($4,''Provider failure''),1000) else null end,next_attempt_at=now()+make_interval(secs=>least(3600,60*power(2,attempts)::int)),lease_token=null,leased_until=null where id=$1 and lease_token=$2 and status=''sending'' and leased_until>now()',t) using p_id,p_lease,p_provider_id,p_error;
 get diagnostics affected=row_count; return affected=1;
end; $$;
-- Manual retries retain the original idempotency key and cannot cross the safe window.
create function public.forge_notification_retry(p_queue text,p_id uuid) returns boolean language plpgsql security invoker set search_path='' as $$
declare t text:=public.forge_notification_table(p_queue); affected int;
begin
 if t is null then raise exception 'Invalid queue'; end if;
 execute format('update forge_redesign_test.%I set status=''pending'',attempts=0,next_attempt_at=now(),last_error=null where id=$1 and status=''failed'' and provider_id is null and first_attempt_at>now()-interval ''23 hours''',t) using p_id;
 get diagnostics affected=row_count; return affected=1;
end; $$;
create function public.forge_proposal_submit(p_payload jsonb) returns uuid language plpgsql security invoker set search_path='' as $$
declare job uuid; fingerprint text;
begin
 perform pg_catalog.pg_advisory_xact_lock(2201022,921);
 if length(p_payload::text)>4096 or p_payload->>'email' !~ '^[^[:space:]<>@]+@[^[:space:]<>@]+\.[^[:space:]<>@]+$' or coalesce(length(p_payload->>'name'),0) not between 1 and 100 or coalesce(length(p_payload->>'school'),0) not between 1 and 160 then raise exception 'Invalid proposal'; end if;
 fingerprint:=pg_catalog.md5(jsonb_build_array(p_payload->>'email',p_payload->>'name',p_payload->>'school',(clock_timestamp() at time zone 'Africa/Lagos')::date)::text);
 select id into job from forge_redesign_test.proposal_notification_outbox where dedupe_key=fingerprint;
 if found then return job;end if;
 if (select count(*) from forge_redesign_test.proposal_notification_outbox where created_at>now()-interval '1 hour')>=50 or (select count(*) from forge_redesign_test.proposal_notification_outbox where recipient=p_payload->>'email' and created_at>now()-interval '1 hour')>=2 then raise exception 'Proposal limit reached'; end if;
 insert into forge_redesign_test.proposal_notification_outbox(recipient,payload,dedupe_key) values(p_payload->>'email',p_payload,fingerprint) returning id into job;
 return job;
end; $$;
revoke all on function public.forge_notification_table(text),public.forge_notification_claim(text,int),public.forge_notification_finish(text,uuid,uuid,text,text),public.forge_notification_retry(text,uuid),public.forge_proposal_submit(jsonb) from public,anon,authenticated;
grant execute on function public.forge_notification_table(text),public.forge_notification_claim(text,int),public.forge_notification_finish(text,uuid,uuid,text,text),public.forge_notification_retry(text,uuid),public.forge_proposal_submit(jsonb) to service_role;
commit;
