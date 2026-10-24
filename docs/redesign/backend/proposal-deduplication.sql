begin;
alter table forge_redesign_test.proposal_notification_outbox add column dedupe_key text unique;
create or replace function public.forge_proposal_submit(p_payload jsonb) returns uuid language plpgsql security invoker set search_path='' as $$
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
commit;
