-- Recruitment remains closed until its server feature gate is explicitly enabled.
-- No marking keys or real applicant fixtures belong in this public repository.
create schema forge_recruitment;
revoke all on schema forge_recruitment from public,anon,authenticated;
grant usage on schema forge_recruitment to service_role;

create table forge_recruitment.applications(
 id uuid primary key default gen_random_uuid(),
 owner uuid not null unique references auth.users(id) on delete cascade,
 email text not null,
 payload jsonb not null check(jsonb_typeof(payload)='object' and octet_length(payload::text)<16000 and payload->'consent'='true'::jsonb),
 status text not null default 'draft' check(status in ('draft','assessing','passed','review_required')),
 consent_at timestamptz not null default clock_timestamp(),
 created_at timestamptz not null default clock_timestamp(),
 updated_at timestamptz not null default clock_timestamp()
);
create table forge_recruitment.forms(
 id text primary key check(length(id) between 1 and 100),
 questions jsonb not null check(jsonb_typeof(questions)='array' and jsonb_array_length(questions)=30),
 reviewed boolean not null default false,
 created_at timestamptz not null default clock_timestamp()
);
create table forge_recruitment.attempts(
 id uuid primary key default gen_random_uuid(),
 application_id uuid not null references forge_recruitment.applications(id) on delete cascade,
 request_id uuid not null,
 form_id text not null references forge_recruitment.forms(id),
 -- Snapshot prevents later bank edits changing an assessment already started.
 questions jsonb not null,
 status text not null default 'in_progress' check(status in ('in_progress','passed','not_passed','expired','abandoned')),
 started_at timestamptz not null,
 deadline_at timestamptz not null,
 correct integer check(correct between 0 and 30),
 completed_at timestamptz,
 unique(application_id,request_id),
 unique(application_id,form_id),
 check(deadline_at=started_at+interval '5 minutes')
);
create unique index recruitment_one_active on forge_recruitment.attempts(application_id) where status='in_progress';
create table forge_recruitment.answers(
 attempt_id uuid not null references forge_recruitment.attempts(id) on delete cascade,
 question_id text not null,
 option_id text not null,
 received_at timestamptz not null default clock_timestamp(),
 primary key(attempt_id,question_id)
);
alter table forge_recruitment.applications enable row level security;
alter table forge_recruitment.forms enable row level security;
alter table forge_recruitment.attempts enable row level security;
alter table forge_recruitment.answers enable row level security;
revoke all on all tables in schema forge_recruitment from public,anon,authenticated;
grant select,insert,update,delete on all tables in schema forge_recruitment to service_role;

-- These service-only entry points are callable via RPC without exposing the private schema.
-- SECURITY INVOKER retains the caller's privileges. Owner parameters MUST come from
-- Auth.getUser in the server service adapter, never from browser JSON.
create function public.forge_recruitment_save(p_owner uuid,p_email text,p_payload jsonb)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare a forge_recruitment.applications;
begin
 -- Auth.getUser and confirmed-email matching run in the server adapter.
 -- Do not grant this service general read access to the private Auth tables.
 if p_email is null or p_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
 then raise exception 'Verified identity required'; end if;
 insert into forge_recruitment.applications(owner,email,payload)
 values(p_owner,lower(p_email),p_payload) on conflict(owner) do nothing;
 select * into a from forge_recruitment.applications where owner=p_owner for update;
 if a.status='draft' then
 update forge_recruitment.applications set payload=p_payload,updated_at=clock_timestamp() where id=a.id;
 end if;
 return jsonb_build_object('id',a.id,'status',a.status);
end $$;

create function public.forge_recruitment_start(p_owner uuid,p_request uuid)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare a forge_recruitment.applications; t forge_recruitment.attempts;
 f forge_recruitment.forms; candidate jsonb; moment timestamptz;
begin
 select * into a from forge_recruitment.applications where owner=p_owner for update;
 if not found then raise exception 'Application unavailable'; end if;
 -- Lock taken before reading attempts or time, serialising concurrent starts.
 moment:=clock_timestamp();
 select * into t from forge_recruitment.attempts where application_id=a.id and request_id=p_request;
 if not found then
 if a.status='passed' then raise exception 'Assessment already passed'; end if;
 update forge_recruitment.attempts set status='expired',completed_at=moment
 where application_id=a.id and status='in_progress' and deadline_at<=moment;
 if (select count(*) from forge_recruitment.attempts where application_id=a.id)>=3 then
 raise exception 'Staff review required'; end if;
 if exists(select 1 from forge_recruitment.attempts where application_id=a.id and status='in_progress')
 then raise exception 'Attempt already active'; end if;
 if (select count(*) from forge_recruitment.forms where reviewed)<10 then raise exception 'Assessment bank not ready'; end if;
 select * into f from forge_recruitment.forms
 where reviewed and not exists(select 1 from forge_recruitment.attempts where application_id=a.id and form_id=forms.id)
 order by random() limit 1;
 if not found then raise exception 'Assessment bank not ready'; end if;
 insert into forge_recruitment.attempts(application_id,request_id,form_id,questions,started_at,deadline_at)
 values(a.id,p_request,f.id,f.questions,moment,moment+interval '5 minutes') returning * into t;
 update forge_recruitment.applications set status='assessing',updated_at=moment where id=a.id;
 end if;
 select jsonb_agg(jsonb_build_object('id',q->>'id','prompt',q->>'prompt','options',q->'options') order by ord)
 into candidate from jsonb_array_elements(t.questions) with ordinality as items(q,ord);
 return jsonb_build_object('id',t.id,'status',t.status,'startedAt',t.started_at,'deadlineAt',t.deadline_at,'questions',candidate);
end $$;

create function public.forge_recruitment_answer(p_owner uuid,p_attempt uuid,p_question text,p_option text)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare t forge_recruitment.attempts; moment timestamptz;
begin
 select at.* into t from forge_recruitment.attempts at
 join forge_recruitment.applications a on a.id=at.application_id
 where at.id=p_attempt and a.owner=p_owner for update of at;
 if not found then raise exception 'Attempt unavailable'; end if;
 moment:=clock_timestamp();
 if t.status<>'in_progress' or moment>=t.deadline_at then raise exception 'Attempt closed'; end if;
 if not exists(select 1 from jsonb_array_elements(t.questions) q,
 lateral jsonb_array_elements(q->'options') o where q->>'id'=p_question and o->>'id'=p_option)
 then raise exception 'Invalid answer'; end if;
 insert into forge_recruitment.answers(attempt_id,question_id,option_id,received_at)
 values(t.id,p_question,p_option,moment)
 on conflict(attempt_id,question_id) do update set option_id=excluded.option_id,received_at=excluded.received_at;
 return jsonb_build_object('saved',true);
end $$;

create function public.forge_recruitment_submit(p_owner uuid,p_attempt uuid)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare t forge_recruitment.attempts; app_id uuid; tally integer; moment timestamptz;
begin
 select id into app_id from forge_recruitment.applications where owner=p_owner for update;
 if not found then raise exception 'Attempt unavailable'; end if;
 select * into t from forge_recruitment.attempts where id=p_attempt and application_id=app_id for update;
 if not found then raise exception 'Attempt unavailable'; end if;
 if t.status in ('abandoned','expired') then raise exception 'Attempt closed'; end if;
 if t.status='in_progress' then
 moment:=clock_timestamp();
 select count(*) into tally from forge_recruitment.answers ans
 join jsonb_array_elements(t.questions) q on q->>'id'=ans.question_id
 where ans.attempt_id=t.id and ans.option_id=q->>'correctOptionId'
 and ans.received_at>=t.started_at and ans.received_at<t.deadline_at;
 update forge_recruitment.attempts set correct=tally,status=case when tally>=23 then 'passed' else 'not_passed' end,completed_at=moment
 where id=t.id returning * into t;
 update forge_recruitment.applications set status=case when tally>=23 then 'passed'
 when (select count(*) from forge_recruitment.attempts where application_id=app_id)>=3 then 'review_required' else 'assessing' end,
 updated_at=moment where id=app_id;
 end if;
 return jsonb_build_object('id',t.id,'status',t.status,'correct',t.correct,'total',30);
end $$;

revoke all on function public.forge_recruitment_save(uuid,text,jsonb) from public,anon,authenticated;
revoke all on function public.forge_recruitment_start(uuid,uuid) from public,anon,authenticated;
revoke all on function public.forge_recruitment_answer(uuid,uuid,text,text) from public,anon,authenticated;
revoke all on function public.forge_recruitment_submit(uuid,uuid) from public,anon,authenticated;
grant execute on function public.forge_recruitment_save(uuid,text,jsonb) to service_role;
grant execute on function public.forge_recruitment_start(uuid,uuid) to service_role;
grant execute on function public.forge_recruitment_answer(uuid,uuid,text,text) to service_role;
grant execute on function public.forge_recruitment_submit(uuid,uuid) to service_role;
