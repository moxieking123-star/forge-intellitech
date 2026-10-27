begin;
create table forge_redesign_test.notification_retry_audit(id uuid primary key default gen_random_uuid(),queue text not null,job_id uuid not null,actor_id uuid not null references auth.users(id),note text not null check(length(trim(note)) between 1 and 1000),created_at timestamptz not null default now());
alter table forge_redesign_test.notification_retry_audit enable row level security;
revoke all on forge_redesign_test.notification_retry_audit from public,anon,authenticated,service_role;
grant select,insert on forge_redesign_test.notification_retry_audit to service_role;
create function public.forge_notification_staff_action(p_user_id uuid,p_verified_email text,p_action text,p_payload jsonb default '{}') returns jsonb language plpgsql security invoker set search_path='' as $$
declare staff forge_redesign_test.staff_members;t text;result jsonb;total bigint;off integer;begin
 select * into staff from forge_redesign_test.staff_members where email=lower(p_verified_email) and active and role='admin' and (user_id is null or user_id=p_user_id) for update;
 if not found or p_user_id is null then return '{"forbidden":true}';end if;
 if staff.user_id is null then update forge_redesign_test.staff_members set user_id=p_user_id where email=staff.email;end if;
 t:=public.forge_notification_table(p_payload->>'queue');if t is null then raise exception 'Unknown notification queue';end if;
 if p_action='list' then
  off:=coalesce((p_payload->>'offset')::integer,0);if off<0 or off>100000 then raise exception 'Invalid page';end if;
  execute format('select count(*) from forge_redesign_test.%I',t) into total;
  execute format('select coalesce(jsonb_agg(to_jsonb(x)),''[]''::jsonb) from (select id,recipient,status,attempts,created_at,next_attempt_at,sent_at,first_attempt_at,provider_id,last_error from forge_redesign_test.%I order by created_at desc,id limit 50 offset $1)x',t) into result using off;
  return jsonb_build_object('items',result,'total',total);
 elsif p_action='retry' then
  if p_payload->>'reviewed' is distinct from 'true' or coalesce(length(trim(p_payload->>'note')),0) not between 1 and 1000 then raise exception 'Reviewed retry required';end if;
  if not public.forge_notification_retry(p_payload->>'queue',(p_payload->>'id')::uuid) then return '{"locked":true}';end if;
  insert into forge_redesign_test.notification_retry_audit(queue,job_id,actor_id,note) values(p_payload->>'queue',(p_payload->>'id')::uuid,p_user_id,trim(p_payload->>'note'));
  return '{"saved":true}';
 end if;raise exception 'Unknown notification action';end $$;
revoke all on function public.forge_notification_staff_action(uuid,text,text,jsonb) from public,anon,authenticated;
grant execute on function public.forge_notification_staff_action(uuid,text,text,jsonb) to service_role;
commit;
