begin;
create table forge_redesign_test.participation_submissions (
 id uuid primary key default gen_random_uuid(),kind text not null check(kind in ('contact','sponsor')),
 recipient text not null check(recipient in ('work@forgeintellitech.com','programs@forgeintellitech.com','admin@forgeintellitech.com','info@forgeintellitech.com')),
 payload jsonb not null check(jsonb_typeof(payload)='object' and octet_length(payload::text)<=26000),fingerprint text not null unique check(fingerprint ~ '^[a-f0-9]{64}$'),
 status text not null default 'new' check(status in ('new','reviewing','contacted','closed')),version integer not null default 1 check(version>0),created_at timestamptz not null default now(),updated_at timestamptz not null default now()
);
create index participation_review_queue on forge_redesign_test.participation_submissions(status,created_at desc);
create index participation_email_rate on forge_redesign_test.participation_submissions((payload->>'email'),created_at);
create table forge_redesign_test.notification_outbox (
 id uuid primary key default gen_random_uuid(),submission_id uuid not null unique references forge_redesign_test.participation_submissions(id),
 recipient text not null check(recipient in ('work@forgeintellitech.com','programs@forgeintellitech.com','admin@forgeintellitech.com','info@forgeintellitech.com')),
 kind text not null default 'participation_received' check(kind='participation_received'),status text not null default 'pending' check(status in ('pending','sending','sent','failed')),
 attempts integer not null default 0 check(attempts>=0),next_attempt_at timestamptz not null default now(),lease_token uuid,leased_until timestamptz,provider_id text check(length(provider_id)<=255),last_error text check(length(last_error)<=1000),created_at timestamptz not null default now(),updated_at timestamptz not null default now(),sent_at timestamptz
);
create index participation_notification_due on forge_redesign_test.notification_outbox(status,next_attempt_at);
create table forge_redesign_test.participation_review_audit (
 id uuid primary key default gen_random_uuid(),submission_id uuid not null references forge_redesign_test.participation_submissions(id),actor_id uuid not null references auth.users(id),previous_status text not null,next_status text not null,note text not null check(length(trim(note)) between 1 and 1000),created_at timestamptz not null default now()
);
alter table forge_redesign_test.participation_submissions enable row level security;
alter table forge_redesign_test.notification_outbox enable row level security;
alter table forge_redesign_test.participation_review_audit enable row level security;
revoke all on forge_redesign_test.participation_submissions,forge_redesign_test.notification_outbox,forge_redesign_test.participation_review_audit from public,anon,authenticated;
grant select,insert,update on forge_redesign_test.participation_submissions,forge_redesign_test.notification_outbox,forge_redesign_test.participation_review_audit to service_role;
create function public.forge_participation_intake(p_payload jsonb,p_kind text,p_fingerprint text) returns jsonb language plpgsql security invoker set search_path='' as $$
declare submission uuid; destination text; field record; maximum int;
begin
 if p_kind is null or p_kind not in ('contact','sponsor') or jsonb_typeof(p_payload) is distinct from 'object' or octet_length(p_payload::text)>26000 or p_fingerprint is null or p_fingerprint !~ '^[a-f0-9]{64}$' then raise exception 'Invalid enquiry';end if;
 for field in select key,value from jsonb_each(p_payload) loop
  maximum:=case field.key when 'email' then 254 when 'phone' then 80 when 'message' then 20000 when 'name' then case when p_kind='contact' then 120 end when 'subject' then case when p_kind='contact' then 250 end when 'inquiryType' then case when p_kind='contact' then 40 end when 'submissionSource' then case when p_kind='contact' then 40 end when 'companyName' then case when p_kind='sponsor' then 200 end when 'contactName' then case when p_kind='sponsor' then 120 end when 'sponsorshipType' then case when p_kind='sponsor' then 100 end end;
  if maximum is null or jsonb_typeof(field.value)<>'string' or length(p_payload->>field.key)>maximum then raise exception 'Invalid enquiry field';end if;
 end loop;
 if coalesce(p_payload->>'email','') !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' or (p_payload->>'email')<>lower(p_payload->>'email') or (p_kind='contact' and (coalesce(length(trim(p_payload->>'name')),0)=0 or coalesce(length(trim(p_payload->>'message')),0)=0)) or (p_kind='sponsor' and (coalesce(length(trim(p_payload->>'companyName')),0)=0 or coalesce(length(trim(p_payload->>'contactName')),0)=0)) then raise exception 'Missing enquiry fields';end if;
 if p_kind='contact' and ((p_payload ? 'inquiryType' and p_payload->>'inquiryType' not in ('','general','partnership','schools','careers','press','support')) or (p_payload ? 'submissionSource' and p_payload->>'submissionSource' not in ('','work','programmes','endless-possibilities','general'))) then raise exception 'Invalid routing';end if;
 destination:=case when p_kind='sponsor' or p_payload->>'submissionSource'='endless-possibilities' then 'admin@forgeintellitech.com' when p_payload->>'submissionSource'='work' or p_payload->>'inquiryType'='careers' then 'work@forgeintellitech.com' when p_payload->>'submissionSource'='programmes' or p_payload->>'inquiryType'='schools' then 'programs@forgeintellitech.com' when coalesce(p_payload->>'subject','') ~* 'endless possibilities|give a child a laptop|launchpad|government.school seminar|volunteer' then 'admin@forgeintellitech.com' else 'info@forgeintellitech.com' end;
 -- Serialise duplicate detection and database rate limits. No untrusted IP headers.
 perform pg_catalog.pg_advisory_xact_lock(2201022,940);
 select id into submission from forge_redesign_test.participation_submissions where fingerprint=p_fingerprint;
 if submission is not null then return jsonb_build_object('success',true,'id',submission,'duplicate',true,'notification','pending','message','Enquiry received.');end if;
 if (select count(*) from forge_redesign_test.participation_submissions where created_at>now()-interval '1 day')>=200 or (select count(*) from forge_redesign_test.participation_submissions where payload->>'email'=p_payload->>'email' and created_at>now()-interval '1 hour')>=3 then return '{"limited":true}'::jsonb;end if;
 insert into forge_redesign_test.participation_submissions(kind,recipient,payload,fingerprint) values(p_kind,destination,p_payload,p_fingerprint) returning id into submission;
 insert into forge_redesign_test.notification_outbox(submission_id,recipient) values(submission,destination);
 return jsonb_build_object('success',true,'id',submission,'notification','pending','message','Enquiry received.');
end;$$;
revoke all on function public.forge_participation_intake(jsonb,text,text) from public,anon,authenticated;
grant execute on function public.forge_participation_intake(jsonb,text,text) to service_role;
create function public.forge_participation_staff_action(p_user_id uuid,p_verified_email text,p_action text,p_payload jsonb default '{}') returns jsonb language plpgsql security invoker set search_path='' as $$
declare staff forge_redesign_test.staff_members; entry forge_redesign_test.participation_submissions; rows_json jsonb; total_count bigint; skip_count int; filter_status text; filter_kind text;
begin
 if p_user_id is null or p_verified_email is null then return '{"forbidden":true}'::jsonb;end if;
 select * into staff from forge_redesign_test.staff_members where email=lower(p_verified_email) and active and role='admin' and (user_id is null or user_id=p_user_id) for update;
 if not found then return '{"forbidden":true}'::jsonb;end if;
 if staff.user_id is null then update forge_redesign_test.staff_members set user_id=p_user_id where email=staff.email;end if;
 if p_action='list' then
  skip_count:=coalesce((p_payload->>'offset')::int,0);filter_status:=coalesce(p_payload->>'status','');filter_kind:=coalesce(p_payload->>'kind','');
  if skip_count<0 or skip_count>10000 or filter_status not in ('','new','reviewing','contacted','closed') or filter_kind not in ('','contact','sponsor') then raise exception 'Invalid filters';end if;
  select count(*) into total_count from forge_redesign_test.participation_submissions s where (filter_status='' or s.status=filter_status) and (filter_kind='' or s.kind=filter_kind);
  select coalesce(jsonb_agg(to_jsonb(r)),'[]'::jsonb) into rows_json from (select s.*,(select o.status from forge_redesign_test.notification_outbox o where o.submission_id=s.id) as notification_status,(select coalesce(jsonb_agg(jsonb_build_object('previousStatus',a.previous_status,'nextStatus',a.next_status,'note',a.note,'createdAt',a.created_at) order by a.created_at desc),'[]'::jsonb) from forge_redesign_test.participation_review_audit a where a.submission_id=s.id) as history from forge_redesign_test.participation_submissions s where (filter_status='' or s.status=filter_status) and (filter_kind='' or s.kind=filter_kind) order by s.created_at desc,s.id limit 50 offset skip_count) r;
  return jsonb_build_object('items',rows_json,'total',total_count);
 elsif p_action='update' then
  if p_payload->>'status' is null or p_payload->>'status' not in ('new','reviewing','contacted','closed') or coalesce(length(trim(p_payload->>'note')),0) not between 1 and 1000 or coalesce((p_payload->>'version')::int,0)<1 then raise exception 'Invalid review';end if;
  select * into entry from forge_redesign_test.participation_submissions where id=(p_payload->>'id')::uuid for update;
  if not found then return '{"missing":true}'::jsonb;end if;
  if entry.version<>(p_payload->>'version')::int then return '{"conflict":true}'::jsonb;end if;
  update forge_redesign_test.participation_submissions set status=p_payload->>'status',version=version+1,updated_at=now() where id=entry.id;
  insert into forge_redesign_test.participation_review_audit(submission_id,actor_id,previous_status,next_status,note) values(entry.id,p_user_id,entry.status,p_payload->>'status',trim(p_payload->>'note'));
  return '{"saved":true}'::jsonb;
 end if;raise exception 'Invalid action';
end;$$;
revoke all on function public.forge_participation_staff_action(uuid,text,text,jsonb) from public,anon,authenticated;
grant execute on function public.forge_participation_staff_action(uuid,text,text,jsonb) to service_role;
commit;
