begin;
alter table forge_redesign_test.school_onboarding_requests add column version integer not null default 1;
alter table forge_redesign_test.school_onboarding_requests add column updated_at timestamptz not null default now();
create index school_onboarding_status_created on forge_redesign_test.school_onboarding_requests(status,created_at desc);
create table forge_redesign_test.staff_members (
 email text primary key check(email=lower(email)),
 user_id uuid unique references auth.users(id),
 role text not null default 'admin' check(role in ('admin','school_reviewer')),
 active boolean not null default true,
 created_at timestamptz not null default now()
);
insert into forge_redesign_test.staff_members(email) values('admin@forgeintellitech.com');
create table forge_redesign_test.school_review_audit (
 id uuid primary key default gen_random_uuid(),
 request_id uuid not null references forge_redesign_test.school_onboarding_requests(id),
 actor_id uuid not null references auth.users(id),
 previous_status text not null,
 next_status text not null,
 note text not null check(length(note) between 1 and 1000),
 created_at timestamptz not null default now()
);
create index school_review_audit_request on forge_redesign_test.school_review_audit(request_id,created_at);
create table forge_redesign_test.school_notification_outbox (
 id uuid primary key default gen_random_uuid(),
 request_id uuid not null unique references forge_redesign_test.school_onboarding_requests(id),
 recipient text not null default 'programs@forgeintellitech.com' check(recipient='programs@forgeintellitech.com'),
 kind text not null default 'school_onboarding_received',
 status text not null default 'pending' check(status in ('pending','sending','sent','failed')),
 attempts integer not null default 0,
 created_at timestamptz not null default now(),
 sent_at timestamptz
);
alter table forge_redesign_test.staff_members enable row level security;
alter table forge_redesign_test.school_review_audit enable row level security;
alter table forge_redesign_test.school_notification_outbox enable row level security;
revoke all on forge_redesign_test.staff_members,forge_redesign_test.school_review_audit,forge_redesign_test.school_notification_outbox from public,anon,authenticated;
grant select,insert,update on forge_redesign_test.staff_members,forge_redesign_test.school_review_audit,forge_redesign_test.school_notification_outbox to service_role;

-- Trusted edge role only: public browsers cannot invoke these functions.
create function public.forge_school_intake(p_payload jsonb,p_user_id uuid default null)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare request_id uuid;
begin
 perform pg_catalog.pg_advisory_xact_lock(2201022,920);
 if p_payload->>'consent' is distinct from 'true' or length(p_payload::text)>16000 then raise exception 'Invalid school request'; end if;
 if (select count(*) from forge_redesign_test.school_onboarding_requests where created_at>now()-interval '1 day')>=100
 or (select count(*) from forge_redesign_test.school_onboarding_requests where lower(payload->>'email')=lower(p_payload->>'email') and created_at>now()-interval '1 hour')>=3 then
  return '{"limited":true}'::jsonb;
 end if;
 if p_payload->>'assisted'='true' then
  -- The service edge verifies the user's JWT and confirmed email before supplying this ID.
  if p_user_id is null then raise exception 'Verified sign-in required'; end if;
  insert into forge_redesign_test.referrer_accounts(id) values(p_user_id) on conflict(id) do nothing;
 elsif p_user_id is not null then raise exception 'Unexpected referrer';
 end if;
 request_id:=forge_redesign_test.submit_school_onboarding(p_payload,p_user_id);
 insert into forge_redesign_test.school_notification_outbox(request_id) values(request_id);
 return jsonb_build_object('success',true,'id',request_id,'notification','pending','message','School onboarding request received for review.');
end; $$;
revoke all on function public.forge_school_intake(jsonb,uuid) from public,anon,authenticated;
grant execute on function public.forge_school_intake(jsonb,uuid) to service_role;

create function public.forge_school_staff_action(p_user_id uuid,p_verified_email text,p_action text,p_payload jsonb default '{}')
returns jsonb language plpgsql security invoker set search_path='' as $$
declare staff forge_redesign_test.staff_members; school forge_redesign_test.school_onboarding_requests; email_address text; rows_json jsonb; total_count bigint; skip_count int;
begin
 -- Verified by auth.getUser in the edge, never taken from a browser payload.
 email_address:=lower(p_verified_email);
 if email_address is null then return '{"forbidden":true}'::jsonb; end if;
 select * into staff from forge_redesign_test.staff_members where email=email_address and active and (user_id is null or user_id=p_user_id) for update;
 if not found then return '{"forbidden":true}'::jsonb; end if;
 if staff.user_id is null then update forge_redesign_test.staff_members set user_id=p_user_id where email=email_address; end if;
 if p_action='list' then
  skip_count:=coalesce((p_payload->>'offset')::int,0);
  if skip_count<0 or skip_count>10000 then raise exception 'Invalid offset'; end if;
  select count(*) into total_count from forge_redesign_test.school_onboarding_requests;
  select coalesce(jsonb_agg(to_jsonb(r)),'[]'::jsonb) into rows_json from (
   select s.id,s.school_name,s.status,s.version,s.created_at,s.updated_at,s.referral_id,s.submitted_by_referrer,s.payload,
    (select status from forge_redesign_test.school_notification_outbox o where o.request_id=s.id) as notification_status,
    (select coalesce(jsonb_agg(jsonb_build_object('previousStatus',a.previous_status,'nextStatus',a.next_status,'note',a.note,'createdAt',a.created_at) order by a.created_at desc),'[]'::jsonb) from forge_redesign_test.school_review_audit a where a.request_id=s.id) as history
   from forge_redesign_test.school_onboarding_requests s order by s.created_at desc,s.id limit 50 offset skip_count
  ) r;
  return jsonb_build_object('items',rows_json,'total',total_count,'offset',skip_count,'staffEmail',email_address);
 elsif p_action='update' then
  if p_payload->>'status' not in ('pending','reviewing','proposal_shared','declined') or length(trim(p_payload->>'note')) not between 1 and 1000 then raise exception 'Invalid review'; end if;
  select * into school from forge_redesign_test.school_onboarding_requests where id=(p_payload->>'id')::uuid for update;
  if not found then return '{"missing":true}'::jsonb; end if;
  if school.version<>(p_payload->>'version')::int then return '{"conflict":true}'::jsonb; end if;
  if school.status not in ('pending','reviewing','proposal_shared','declined') then return '{"locked":true}'::jsonb; end if;
  update forge_redesign_test.school_onboarding_requests set status=p_payload->>'status',version=version+1,updated_at=now() where id=school.id;
  insert into forge_redesign_test.school_review_audit(request_id,actor_id,previous_status,next_status,note) values(school.id,p_user_id,school.status,p_payload->>'status',trim(p_payload->>'note'));
  return jsonb_build_object('saved',true,'version',school.version+1);
 end if;
 raise exception 'Unknown staff action';
end; $$;
revoke all on function public.forge_school_staff_action(uuid,text,text,jsonb) from public,anon,authenticated;
grant execute on function public.forge_school_staff_action(uuid,text,text,jsonb) to service_role;
commit;
