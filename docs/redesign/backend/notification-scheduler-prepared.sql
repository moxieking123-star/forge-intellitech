-- PREPARATION ONLY: not applied while regular email delivery is disabled.
-- Store the existing worker secret through Supabase Vault's secure dashboard as
-- forge_notification_worker_secret. Never paste it into source, cron SQL or chat.
-- This file creates a PAUSED job. Apply notification-scheduler-proof.sql as well.
-- Requests use expiring one-time HMAC proofs, never the reusable Vault password.
-- Extension-owner PUBLIC grants may survive the best-effort REVOKEs below;
-- no security property relies on those REVOKEs removing owner-granted access.
begin;
create extension if not exists pg_cron;
create extension if not exists pg_net with schema extensions;
revoke usage on schema net,cron from public,anon,authenticated;
revoke all on all tables in schema net,cron from public,anon,authenticated;
revoke all on all sequences in schema net,cron from public,anon,authenticated;
revoke all on all functions in schema net,cron from public,anon,authenticated;
create function forge_redesign_test.dispatch_notification_worker() returns bigint language plpgsql security invoker set search_path='' as $$
declare worker_secret text;request_id bigint;nonce uuid:=gen_random_uuid();stamp bigint:=floor(extract(epoch from clock_timestamp()));signature text;begin
 select decrypted_secret into worker_secret from vault.decrypted_secrets where name='forge_notification_worker_secret';
 if worker_secret is null or length(worker_secret)<32 then raise exception 'Worker scheduler secret not configured';end if;
 signature:=encode(extensions.hmac('forge-notifications-v1'||chr(10)||stamp::text||chr(10)||nonce::text,worker_secret,'sha256'),'hex');
 select net.http_post(url:='https://deblssilgleuiccsgdcy.supabase.co/functions/v1/forge-notification-worker',headers:=jsonb_build_object('Content-Type','application/json','X-Forge-Signature',signature),body:=jsonb_build_object('timestamp',stamp,'nonce',nonce),timeout_milliseconds:=60000) into request_id;
 return request_id;
end $$;
revoke all on function forge_redesign_test.dispatch_notification_worker() from public,anon,authenticated,service_role;
do $$ declare job_id bigint;begin
 if exists(select 1 from cron.job where jobname='forge-redesign-notifications') then raise exception 'Existing scheduler must be reviewed rather than overwritten';end if;
 job_id:=cron.schedule('forge-redesign-notifications','*/10 * * * *','select forge_redesign_test.dispatch_notification_worker();');
 perform cron.alter_job(job_id,active:=false);
end $$;
commit;
