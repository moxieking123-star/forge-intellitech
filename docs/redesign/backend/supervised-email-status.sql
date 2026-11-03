-- Read-only. Run in forge-web SQL Editor as the project database owner.
-- No secret values, authentication links, request headers or message bodies.
select jsonb_build_object(
  'proposal_test', (
    select jsonb_build_object(
      'id', id, 'status', status, 'attempts', attempts,
      'provider_accepted', provider_id is not null,
      'delivery', case when provider_id is not null
        then public.forge_notification_delivery_summary(provider_id::text)
        else null end
    ) from forge_redesign_test.proposal_notification_outbox
    where id = 'b6c5a83f-aa78-4257-9acc-50e13709d752'
  ),
  'other_pending_jobs',
    (select count(*) from forge_redesign_test.school_notification_outbox where status = 'pending') +
    (select count(*) from forge_redesign_test.notification_outbox where status = 'pending') +
    (select count(*) from forge_redesign_test.proposal_notification_outbox
       where status = 'pending' and id <> 'b6c5a83f-aa78-4257-9acc-50e13709d752'),
  'scheduler', (
    select jsonb_build_object('active', active, 'schedule', schedule)
    from cron.job where jobname = 'forge-redesign-notifications'
  )
) as email_verification;
