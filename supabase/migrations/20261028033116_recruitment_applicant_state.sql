create function public.forge_recruitment_state(p_owner uuid)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare a forge_recruitment.applications; history jsonb; moment timestamptz:=clock_timestamp();
begin
 select * into a from forge_recruitment.applications where owner=p_owner for update;
 if not found then return jsonb_build_object('application',null,'attempts','[]'::jsonb,'remaining',3,'serverNow',moment); end if;
 update forge_recruitment.attempts set status='expired',completed_at=moment
 where application_id=a.id and status='in_progress' and deadline_at<=moment;
 select coalesce(jsonb_agg(jsonb_build_object('id',id,'status',status,'correct',correct,'startedAt',started_at,'deadlineAt',deadline_at) order by started_at),'[]'::jsonb)
 into history from forge_recruitment.attempts where application_id=a.id;
 if jsonb_array_length(history)>=3 and a.status<>'passed' then
 update forge_recruitment.applications set status='review_required',updated_at=moment where id=a.id returning * into a;
 end if;
 return jsonb_build_object('application',jsonb_build_object('id',a.id,'status',a.status,'fields',a.payload),
 'attempts',history,'remaining',greatest(0,3-jsonb_array_length(history)),'serverNow',moment);
end $$;

create function public.forge_recruitment_abandon(p_owner uuid,p_attempt uuid)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare app_id uuid; t forge_recruitment.attempts;
begin
 select id into app_id from forge_recruitment.applications where owner=p_owner for update;
 if not found then raise exception 'Attempt unavailable'; end if;
 select * into t from forge_recruitment.attempts where application_id=app_id and id=p_attempt for update;
 if not found then raise exception 'Attempt unavailable'; end if;
 if t.status='in_progress' then
 update forge_recruitment.attempts set status=case when deadline_at<=clock_timestamp() then 'expired' else 'abandoned' end,completed_at=clock_timestamp()
 where id=t.id returning * into t;
 if (select count(*) from forge_recruitment.attempts where application_id=app_id)>=3 then
 update forge_recruitment.applications set status='review_required',updated_at=clock_timestamp() where id=app_id;
 end if;
 end if;
 return jsonb_build_object('id',t.id,'status',t.status);
end $$;
revoke all on function public.forge_recruitment_state(uuid) from public,anon,authenticated;
revoke all on function public.forge_recruitment_abandon(uuid,uuid) from public,anon,authenticated;
grant execute on function public.forge_recruitment_state(uuid) to service_role;
grant execute on function public.forge_recruitment_abandon(uuid,uuid) to service_role;

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
 select jsonb_agg(jsonb_build_object('id',q->>'id','prompt',q->>'prompt','options',(select jsonb_agg(jsonb_build_object('id',o->>'id','text',o->>'text') order by pos) from jsonb_array_elements(q->'options') with ordinality as choices(o,pos))) order by ord)
 into candidate from jsonb_array_elements(t.questions) with ordinality as items(q,ord);
 return jsonb_build_object('id',t.id,'status',t.status,'startedAt',t.started_at,'deadlineAt',t.deadline_at,'questions',candidate,'serverNow',clock_timestamp());
end $$;
