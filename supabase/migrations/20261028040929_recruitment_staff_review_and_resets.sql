alter table forge_recruitment.applications add column attempt_allowance integer not null default 3 check(attempt_allowance between 3 and 30), add column review_version integer not null default 1;
create table forge_recruitment.reset_audit(
 id uuid primary key default gen_random_uuid(),
 application_id uuid not null references forge_recruitment.applications(id) on delete cascade,
 actor_id uuid not null references auth.users(id),
 request_id uuid not null,
 reason text not null check(length(trim(reason)) between 20 and 1000),
 previous_allowance integer not null,
 next_allowance integer not null,
 next_version integer not null,
 created_at timestamptz not null default clock_timestamp(),
 unique(application_id,request_id)
);
alter table forge_recruitment.reset_audit enable row level security;
revoke all on forge_recruitment.reset_audit from public,anon,authenticated;
grant select,insert on forge_recruitment.reset_audit to service_role;
create index recruitment_reset_actor on forge_recruitment.reset_audit(actor_id);

create function public.forge_recruitment_staff_action(p_actor uuid,p_email text,p_action text,p_payload jsonb default '{}'::jsonb)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare a forge_recruitment.applications; audit forge_recruitment.reset_audit;
 wanted_status text; query_text text; skip_count int; answer jsonb;
begin
 if not exists(select 1 from forge_redesign_test.staff_members where email=lower(p_email) and active and role='admin' and (user_id is null or user_id=p_actor))
 then return '{"forbidden":true}'::jsonb; end if;
 if p_action='list' then
 wanted_status:=coalesce(p_payload->>'status','all');query_text:=coalesce(p_payload->>'search','');skip_count:=coalesce((p_payload->>'offset')::int,0);
 if wanted_status not in ('all','never_started','in_progress','abandoned','expired','not_passed','passed','review_required') or length(query_text)>100 or skip_count<0 or skip_count>10000 then raise exception 'Invalid filters'; end if;
 with records as (
 select app.id,app.email,app.payload,app.created_at,app.review_version as version,app.attempt_allowance,
 coalesce(usage.count,0) as used,
 case when app.status='passed' then 'passed' when coalesce(usage.count,0)>=app.attempt_allowance and (latest.status is null or latest.status<>'in_progress' or latest.deadline_at<=clock_timestamp()) then 'review_required'
 when latest.id is null then 'never_started' when latest.status='in_progress' and latest.deadline_at<=clock_timestamp() then 'expired' else latest.status end as status,
 coalesce(usage.history,'[]'::jsonb) as attempts,
 (select coalesce(jsonb_agg(jsonb_build_object('reason',reason,'createdAt',created_at,'previousAllowance',previous_allowance,'nextAllowance',next_allowance) order by created_at desc),'[]'::jsonb) from forge_recruitment.reset_audit where application_id=app.id) as resets
 from forge_recruitment.applications app
 left join lateral(select id,status,deadline_at from forge_recruitment.attempts where application_id=app.id order by started_at desc limit 1) latest on true
 left join lateral(select count(*) as count,jsonb_agg(jsonb_build_object('id',id,'status',case when status='in_progress' and deadline_at<=clock_timestamp() then 'expired' else status end,'correct',correct,'startedAt',started_at,'completedAt',completed_at) order by started_at) as history from forge_recruitment.attempts where application_id=app.id) usage on true
 ), filtered as (
 select * from records where (wanted_status='all' or status=wanted_status)
 and (query_text='' or strpos(lower(email||' '||coalesce(payload->>'name','')||' '||coalesce(payload->>'location','')),lower(query_text))>0)
 )
 select jsonb_build_object('total',(select count(*) from filtered),'offset',skip_count,'items',(select coalesce(jsonb_agg(to_jsonb(page)),'[]'::jsonb) from (select * from filtered order by created_at desc,id limit 25 offset skip_count) page)) into answer;
 return answer;
 elsif p_action='reset' then
 if length(trim(coalesce(p_payload->>'reason',''))) not between 20 and 1000 then raise exception 'Reason required'; end if;
 select * into a from forge_recruitment.applications where id=(p_payload->>'id')::uuid for update;
 if not found then return '{"missing":true}'::jsonb; end if;
 select * into audit from forge_recruitment.reset_audit where application_id=a.id and request_id=(p_payload->>'requestId')::uuid;
 if found then
 if audit.actor_id<>p_actor or audit.reason<>trim(p_payload->>'reason') then return '{"conflict":true}'::jsonb; end if;
 return jsonb_build_object('saved',true,'version',audit.next_version,'allowance',audit.next_allowance);
 end if;
 if a.review_version is distinct from (p_payload->>'version')::int then return '{"conflict":true}'::jsonb; end if;
 if a.status='passed' or a.attempt_allowance>=30 or exists(select 1 from forge_recruitment.attempts where application_id=a.id and status='in_progress' and deadline_at>clock_timestamp())
 or (select count(*) from forge_recruitment.attempts where application_id=a.id)<a.attempt_allowance then return '{"locked":true}'::jsonb; end if;
 update forge_recruitment.attempts set status='expired',completed_at=clock_timestamp() where application_id=a.id and status='in_progress' and deadline_at<=clock_timestamp();
 insert into forge_recruitment.reset_audit(application_id,actor_id,request_id,reason,previous_allowance,next_allowance,next_version)
 values(a.id,p_actor,(p_payload->>'requestId')::uuid,trim(p_payload->>'reason'),a.attempt_allowance,a.attempt_allowance+3,a.review_version+1);
 update forge_recruitment.applications set attempt_allowance=attempt_allowance+3,review_version=review_version+1,status='assessing',updated_at=clock_timestamp() where id=a.id;
 return jsonb_build_object('saved',true,'version',a.review_version+1,'allowance',a.attempt_allowance+3);
 end if;
 raise exception 'Unknown recruitment staff action';
end $$;
revoke all on function public.forge_recruitment_staff_action(uuid,text,text,jsonb) from public,anon,authenticated;
grant execute on function public.forge_recruitment_staff_action(uuid,text,text,jsonb) to service_role;

create or replace function public.forge_recruitment_start(p_owner uuid,p_request uuid)
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
 if (select count(*) from forge_recruitment.attempts where application_id=a.id)>=a.attempt_allowance then
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
 select jsonb_agg(jsonb_build_object('id',q->>'id','prompt',q->>'prompt','options',(select jsonb_agg(jsonb_build_object('id',o->>'id','text',o->>'text') order by pos) from jsonb_array_elements(q->'options') with ordinality as choices(o,pos))) order by ord)
 into candidate from jsonb_array_elements(t.questions) with ordinality as items(q,ord);
 return jsonb_build_object('id',t.id,'status',t.status,'startedAt',t.started_at,'deadlineAt',t.deadline_at,'questions',candidate,'serverNow',clock_timestamp());
end $$;

create or replace function public.forge_recruitment_state(p_owner uuid)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare a forge_recruitment.applications; history jsonb; moment timestamptz:=clock_timestamp();
begin
 select * into a from forge_recruitment.applications where owner=p_owner for update;
 if not found then return jsonb_build_object('application',null,'attempts','[]'::jsonb,'remaining',3,'serverNow',moment); end if;
 update forge_recruitment.attempts set status='expired',completed_at=moment
 where application_id=a.id and status='in_progress' and deadline_at<=moment;
 select coalesce(jsonb_agg(jsonb_build_object('id',id,'status',status,'correct',correct,'startedAt',started_at,'deadlineAt',deadline_at) order by started_at),'[]'::jsonb)
 into history from forge_recruitment.attempts where application_id=a.id;
 if jsonb_array_length(history)>=a.attempt_allowance and a.status<>'passed' then
 update forge_recruitment.applications set status='review_required',updated_at=moment where id=a.id returning * into a;
 end if;
 return jsonb_build_object('application',jsonb_build_object('id',a.id,'status',a.status,'fields',a.payload),
 'attempts',history,'remaining',greatest(0,a.attempt_allowance-jsonb_array_length(history)),'serverNow',moment);
end $$;

create or replace function public.forge_recruitment_submit(p_owner uuid,p_attempt uuid)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare t forge_recruitment.attempts; app_id uuid; allowance integer; tally integer; moment timestamptz;
begin
 select id,attempt_allowance into app_id,allowance from forge_recruitment.applications where owner=p_owner for update;
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
 when (select count(*) from forge_recruitment.attempts where application_id=app_id)>=allowance then 'review_required' else 'assessing' end,
 updated_at=moment where id=app_id;
 end if;
 return jsonb_build_object('id',t.id,'status',t.status,'correct',t.correct,'total',30);
end $$;

create or replace function public.forge_recruitment_abandon(p_owner uuid,p_attempt uuid)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare app_id uuid; allowance integer; t forge_recruitment.attempts;
begin
 select id,attempt_allowance into app_id,allowance from forge_recruitment.applications where owner=p_owner for update;
 if not found then raise exception 'Attempt unavailable'; end if;
 select * into t from forge_recruitment.attempts where application_id=app_id and id=p_attempt for update;
 if not found then raise exception 'Attempt unavailable'; end if;
 if t.status='in_progress' then
 update forge_recruitment.attempts set status=case when deadline_at<=clock_timestamp() then 'expired' else 'abandoned' end,completed_at=clock_timestamp()
 where id=t.id returning * into t;
 if (select count(*) from forge_recruitment.attempts where application_id=app_id)>=allowance then
 update forge_recruitment.applications set status='review_required',updated_at=clock_timestamp() where id=app_id;
 end if;
 end if;
 return jsonb_build_object('id',t.id,'status',t.status);
end $$;
