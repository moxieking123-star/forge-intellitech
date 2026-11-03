begin;
do $$declare owner_id uuid:=gen_random_uuid();ref_id uuid;receipt jsonb;again jsonb;expected date;n uuid:=gen_random_uuid();stamp bigint:=floor(extract(epoch from clock_timestamp()));begin
 if has_function_privilege('anon','public.forge_notification_consume_trigger(uuid,bigint)','EXECUTE') or has_table_privilege('authenticated','forge_redesign_test.notification_trigger_receipts','SELECT') then raise exception 'Scheduler receipt publicly accessible';end if;
 if not public.forge_notification_consume_trigger(n,stamp) or public.forge_notification_consume_trigger(n,stamp) or public.forge_notification_consume_trigger(gen_random_uuid(),stamp-300) then raise exception 'Scheduler nonce expiry/replay check failed';end if;
 insert into auth.users(id,email,email_confirmed_at) values(owner_id,'completion-fixture@invalid.example',now());
 insert into forge_redesign_test.referrer_accounts(id) values(owner_id);
 insert into forge_redesign_test.school_referrals(referrer_id,school_name,location,school_key) values(owner_id,'Rollback calendar school','Fictional Lagos','rollback-calendar-'||owner_id::text) returning id into ref_id;
 receipt:=forge_redesign_test.request_referral_statement(owner_id,ref_id);
 select day into expected from (select ((clock_timestamp() at time zone 'Africa/Lagos')::date+i)::date as day from generate_series(1,30)i) d where extract(isodow from day)<6 and not exists(select 1 from forge_redesign_test.nigerian_public_holidays h where h.holiday=d.day) order by day offset 4 limit 1;
 if (receipt->>'dueOn')::date is distinct from expected then raise exception 'Reviewed live calendar gives incorrect fifth working day';end if;
 again:=forge_redesign_test.request_referral_statement(owner_id,ref_id);if receipt<>again then raise exception 'Duplicate statement request changed receipt';end if;
 if (select active from cron.job where jobname='forge-redesign-notifications') is distinct from false then raise exception 'Schedule unexpectedly active';end if;
end $$;
select 'PASS: real reviewed calendar, fifth working day, statement dedupe, private one-time scheduler proof and paused rollout; all fixtures rolled back' as outcome;
rollback;
