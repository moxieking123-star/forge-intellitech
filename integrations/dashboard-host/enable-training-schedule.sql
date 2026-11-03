-- RELEASE ACTION ONLY. Do not run during branch/local development.
-- Requires the reviewed app namespace, worker, queue migration and secure Vault
-- entry training_worker_secret (the same 64-hex secret as the worker environment).
do $$
begin
 if not exists(select 1 from vault.decrypted_secrets where name='training_worker_secret' and decrypted_secret ~* '^[a-f0-9]{64}$') then raise exception 'Configure the private training worker secret in Vault first';end if;
 if exists(select 1 from cron.job where jobname='forge-training-delivery') then raise exception 'Training schedule already exists; inspect it instead of duplicating it';end if;
 perform cron.schedule('forge-training-delivery','* * * * *',$job$
  select net.http_post(
   url:='https://app.forgeintellitech.com/instructor-training/api/internal/training-worker',
   headers:=jsonb_build_object('Content-Type','application/json','Authorization','Bearer '||(select decrypted_secret from vault.decrypted_secrets where name='training_worker_secret')),
   body:='{}'::jsonb,timeout_milliseconds:=120000
  );
 $job$);
end $$;
