begin;
create table forge_redesign_test.notification_provider_events(
 event_id text primary key check(length(event_id) between 1 and 255),
 provider_id uuid not null,
 event_type text not null check(event_type in ('email.delivered','email.delivery_delayed','email.bounced','email.complained','email.failed')),
 occurred_at timestamptz not null,
 received_at timestamptz not null default now()
);
create index notification_provider_events_lookup on forge_redesign_test.notification_provider_events(provider_id,event_type,occurred_at desc);
alter table forge_redesign_test.notification_provider_events enable row level security;
revoke all on forge_redesign_test.notification_provider_events from public,anon,authenticated,service_role;
grant select,insert on forge_redesign_test.notification_provider_events to service_role;
create function forge_redesign_test.preserve_notification_event() returns trigger language plpgsql set search_path='' as $$begin raise exception 'Provider evidence is immutable';end $$;
create trigger preserve_provider_evidence before update or delete on forge_redesign_test.notification_provider_events for each row execute function forge_redesign_test.preserve_notification_event();
revoke all on function forge_redesign_test.preserve_notification_event() from public,anon,authenticated;

create function public.forge_notification_provider_event(p_event_id text,p_provider_id uuid,p_event_type text,p_occurred_at timestamptz) returns jsonb language plpgsql security invoker set search_path='' as $$
declare prior forge_redesign_test.notification_provider_events;begin
 insert into forge_redesign_test.notification_provider_events(event_id,provider_id,event_type,occurred_at) values(p_event_id,p_provider_id,p_event_type,p_occurred_at) on conflict(event_id) do nothing;
 select * into prior from forge_redesign_test.notification_provider_events where event_id=p_event_id;
 if prior.provider_id is distinct from p_provider_id or prior.event_type is distinct from p_event_type or prior.occurred_at is distinct from p_occurred_at then raise exception 'Conflicting provider receipt';end if;
 return '{"saved":true}';
end $$;

create function public.forge_notification_delivery_summary(p_provider_id text) returns jsonb language sql stable security invoker set search_path='' as $$
 select jsonb_build_object('status',case
 when bool_or(event_type='email.complained') then 'complained'
 when bool_or(event_type='email.bounced') then 'bounced'
 when bool_or(event_type='email.failed') then 'failed'
 when bool_or(event_type='email.delivered') then 'delivered'
 when bool_or(event_type='email.delivery_delayed') then 'delayed'
 else 'unconfirmed' end,'lastEventAt',max(occurred_at))
 from forge_redesign_test.notification_provider_events where provider_id::text=p_provider_id;
$$;

create function public.forge_notification_recipient_blocked(p_recipient text) returns boolean language sql stable security invoker set search_path='' as $$
 select exists(select 1 from (
 select provider_id from forge_redesign_test.school_notification_outbox where lower(recipient)=lower(p_recipient) and provider_id is not null
 union all select provider_id from forge_redesign_test.notification_outbox where lower(recipient)=lower(p_recipient) and provider_id is not null
 union all select provider_id from forge_redesign_test.proposal_notification_outbox where lower(recipient)=lower(p_recipient) and provider_id is not null
 ) jobs join forge_redesign_test.notification_provider_events e on e.provider_id::text=jobs.provider_id where e.event_type in ('email.bounced','email.complained'));
$$;
create index school_provider_receipt_lookup on forge_redesign_test.school_notification_outbox(provider_id) where provider_id is not null;
create index participation_provider_receipt_lookup on forge_redesign_test.notification_outbox(provider_id) where provider_id is not null;
create index proposal_provider_receipt_lookup on forge_redesign_test.proposal_notification_outbox(provider_id) where provider_id is not null;

create or replace function public.forge_notification_staff_action(p_user_id uuid,p_verified_email text,p_action text,p_payload jsonb default '{}') returns jsonb language plpgsql security invoker set search_path='' as $$
declare staff forge_redesign_test.staff_members;t text;result jsonb;total bigint;off integer;begin
 select * into staff from forge_redesign_test.staff_members where email=lower(p_verified_email) and active and role='admin' and (user_id is null or user_id=p_user_id) for update;
 if not found or p_user_id is null then return '{"forbidden":true}';end if;
 if staff.user_id is null then update forge_redesign_test.staff_members set user_id=p_user_id where email=staff.email;end if;
 t:=public.forge_notification_table(p_payload->>'queue');if t is null then raise exception 'Unknown notification queue';end if;
 if p_action='list' then
  off:=coalesce((p_payload->>'offset')::integer,0);if off<0 or off>100000 then raise exception 'Invalid page';end if;
  execute format('select count(*) from forge_redesign_test.%I',t) into total;
  execute format('select coalesce(jsonb_agg(to_jsonb(x)),''[]''::jsonb) from (select id,recipient,status,attempts,created_at,next_attempt_at,sent_at,first_attempt_at,provider_id,last_error from forge_redesign_test.%I order by created_at desc,id limit 50 offset $1)x',t) into result using off;
  select coalesce(jsonb_agg(item||jsonb_build_object('delivery',public.forge_notification_delivery_summary(item->>'provider_id'))),'[]'::jsonb) into result from jsonb_array_elements(result) item;
  return jsonb_build_object('items',result,'total',total);
 elsif p_action='retry' then
  if p_payload->>'reviewed' is distinct from 'true' or coalesce(length(trim(p_payload->>'note')),0) not between 1 and 1000 then raise exception 'Reviewed retry required';end if;
  if not public.forge_notification_retry(p_payload->>'queue',(p_payload->>'id')::uuid) then return '{"locked":true}';end if;
  insert into forge_redesign_test.notification_retry_audit(queue,job_id,actor_id,note) values(p_payload->>'queue',(p_payload->>'id')::uuid,p_user_id,trim(p_payload->>'note'));
  return '{"saved":true}';
 end if;raise exception 'Unknown notification action';end $$;

revoke all on function public.forge_notification_provider_event(text,uuid,text,timestamptz),public.forge_notification_delivery_summary(text),public.forge_notification_recipient_blocked(text) from public,anon,authenticated;
grant execute on function public.forge_notification_provider_event(text,uuid,text,timestamptz),public.forge_notification_delivery_summary(text),public.forge_notification_recipient_blocked(text) to service_role;
commit;
