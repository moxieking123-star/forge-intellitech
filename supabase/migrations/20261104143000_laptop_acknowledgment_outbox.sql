begin;
create table forge_redesign_test.laptop_reply_outbox (
 id uuid primary key default gen_random_uuid(),
 submission_id uuid not null references forge_redesign_test.participation_submissions(id),
 recipient text not null, name text not null, kind text not null check(kind in ('student','adult','donor')),
 dedupe_key text not null unique, status text not null default 'pending' check(status in ('pending','sending','accepted','failed','uncertain')),
 attempts integer not null default 0, lease_token uuid, leased_until timestamptz,
 provider_id text, created_at timestamptz not null default now(), first_attempt_at timestamptz, accepted_at timestamptz,
 last_error text
);
alter table forge_redesign_test.laptop_reply_outbox enable row level security;
revoke all on forge_redesign_test.laptop_reply_outbox from public,anon,authenticated;
grant select,insert,update on forge_redesign_test.laptop_reply_outbox to service_role;

create function public.forge_laptop_reply_enqueue(p_submission_id uuid) returns jsonb
language plpgsql security invoker set search_path='' as $$
declare entry forge_redesign_test.participation_submissions; reply_kind text; contact text; job uuid; doc jsonb; applicant_role text;
begin
 select * into entry from forge_redesign_test.participation_submissions where id=p_submission_id;
 if not found or entry.kind<>'contact' or entry.payload->>'submissionSource'<>'endless-possibilities' then raise exception 'Invalid laptop submission'; end if;
 if entry.payload->>'subject'='Give a Child a Laptop — donor interest' then reply_kind:='donor';
 elsif entry.payload->>'subject'='Give a Child a Laptop — student support request' then
  begin doc:=(entry.payload->>'message')::jsonb; exception when invalid_text_representation then doc:=null; end;
  applicant_role:=coalesce(doc->'values'->>'role',substring(entry.payload->>'message' from 'I am the: ([^\n\r]+)'));
  reply_kind:=case when applicant_role='Student' then 'student' else 'adult' end;
 else raise exception 'Not a laptop application'; end if;
 contact:=lower(trim(entry.payload->>'email'));
 if contact !~ '^[^[:space:]<>@]+@[^[:space:]<>@]+\.[^[:space:]<>@]+$' then raise exception 'Invalid contact'; end if;
 insert into forge_redesign_test.laptop_reply_outbox(submission_id,recipient,name,kind,dedupe_key)
 values(entry.id,contact,left(entry.payload->>'name',120),reply_kind,pg_catalog.md5(contact || '|' || case when reply_kind='donor' then 'donor' else 'request' end || '|v1'))
 on conflict(dedupe_key) do nothing returning id into job;
 return jsonb_build_object('queued',true,'duplicate',job is null);
end; $$;

create function public.forge_laptop_reply_claim() returns jsonb
language plpgsql security invoker set search_path='' as $$
declare result jsonb;
begin
 -- A lost response must be reconciled, never automatically resent beyond the provider's safe idempotency window.
 update forge_redesign_test.laptop_reply_outbox set status='uncertain',lease_token=null,leased_until=null,last_error='Provider acceptance requires reconciliation'
 where status='sending' and leased_until<now() and first_attempt_at<now()-interval '23 hours';
 with candidate as (
  select id from forge_redesign_test.laptop_reply_outbox
  where attempts<5 and (status='pending' or (status='sending' and leased_until<now() and first_attempt_at>now()-interval '23 hours'))
  order by created_at for update skip locked limit 1
 ), claimed as (
  update forge_redesign_test.laptop_reply_outbox o set status='sending',attempts=attempts+1,lease_token=gen_random_uuid(),leased_until=now()+interval '2 minutes',first_attempt_at=coalesce(first_attempt_at,now())
  from candidate c where o.id=c.id returning o.*
 ) select to_jsonb(claimed) into result from claimed;
 return result;
end; $$;

create function public.forge_laptop_reply_finish(p_id uuid,p_lease uuid,p_provider_id text default null,p_error text default null) returns boolean
language plpgsql security invoker set search_path='' as $$
declare affected integer;
begin
 update forge_redesign_test.laptop_reply_outbox set status=case when p_provider_id is not null then 'accepted' else 'uncertain' end,
 provider_id=left(p_provider_id,255),accepted_at=case when p_provider_id is not null then now() else null end,
 last_error=left(p_error,500),lease_token=null,leased_until=null
 where id=p_id and lease_token=p_lease and status='sending' and leased_until>now();
 get diagnostics affected=row_count; return affected=1;
end; $$;
revoke all on function public.forge_laptop_reply_enqueue(uuid),public.forge_laptop_reply_claim(),public.forge_laptop_reply_finish(uuid,uuid,text,text) from public,anon,authenticated;
grant execute on function public.forge_laptop_reply_enqueue(uuid),public.forge_laptop_reply_claim(),public.forge_laptop_reply_finish(uuid,uuid,text,text) to service_role;
commit;
