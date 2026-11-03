begin;
-- These extensions were installed for this private scheduler. Their default
-- request queue must not expose transient Authorization headers to API roles.
revoke usage on schema net,cron from public,anon,authenticated;
revoke all on all tables in schema net,cron from public,anon,authenticated;
revoke all on all sequences in schema net,cron from public,anon,authenticated;
revoke all on all functions in schema net,cron from public,anon,authenticated;
commit;
