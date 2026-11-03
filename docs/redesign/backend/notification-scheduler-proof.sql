begin;
create table forge_redesign_test.notification_trigger_receipts(nonce uuid primary key,requested_at bigint not null,received_at timestamptz not null default now());
alter table forge_redesign_test.notification_trigger_receipts enable row level security;
revoke all on forge_redesign_test.notification_trigger_receipts from public,anon,authenticated,service_role;
grant select,insert on forge_redesign_test.notification_trigger_receipts to service_role;
create function public.forge_notification_consume_trigger(p_nonce uuid,p_timestamp bigint) returns boolean language plpgsql security invoker set search_path='' as $$
declare affected integer;begin
 if p_nonce is null or p_timestamp is null or abs(extract(epoch from clock_timestamp())-p_timestamp)>90 then return false;end if;
 insert into forge_redesign_test.notification_trigger_receipts(nonce,requested_at) values(p_nonce,p_timestamp) on conflict do nothing;
 get diagnostics affected=row_count;return affected=1;
end $$;
revoke all on function public.forge_notification_consume_trigger(uuid,bigint) from public,anon,authenticated;
grant execute on function public.forge_notification_consume_trigger(uuid,bigint) to service_role;

-- Managed pg_net queues retain extension-owner PUBLIC grants. Send only a
-- narrowly scoped, expiring, single-use proof, never the reusable worker secret.
create or replace function forge_redesign_test.dispatch_notification_worker() returns bigint language plpgsql security invoker set search_path='' as $$
declare worker_secret text;request_id bigint;nonce uuid:=gen_random_uuid();stamp bigint:=floor(extract(epoch from clock_timestamp()));signature text;begin
 select decrypted_secret into worker_secret from vault.decrypted_secrets where name='forge_notification_worker_secret';
 if worker_secret is null or length(worker_secret)<32 then raise exception 'Worker scheduler secret not configured';end if;
 signature:=encode(extensions.hmac('forge-notifications-v1'||chr(10)||stamp::text||chr(10)||nonce::text,worker_secret,'sha256'),'hex');
 select net.http_post(url:='https://deblssilgleuiccsgdcy.supabase.co/functions/v1/forge-notification-worker',headers:=jsonb_build_object('Content-Type','application/json','X-Forge-Signature',signature),body:=jsonb_build_object('timestamp',stamp,'nonce',nonce),timeout_milliseconds:=60000) into request_id;
 return request_id;
end $$;
revoke all on function forge_redesign_test.dispatch_notification_worker() from public,anon,authenticated,service_role;
commit;
