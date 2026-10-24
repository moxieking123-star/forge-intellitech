# Notification readiness follow-through

Approved: user confirmed the delivered proposal/PDF and requested the next fix. Keep branch-only website work, shared preview/live unchanged. Supabase changes remain isolated to forge_redesign_test and the existing test worker.

- [x] Quarantine the two exact synthetic queued school jobs, retain audit/history and deny retry.
- [x] Limit new application-email jobs to 40 per rolling 24 hours across all three queues; keep existing safe retries within that reservation. Preserve first-attempt/idempotency evidence and deny public policy writes.
- [x] Extract and test worker execution: disabled no-op, permanent/transient/configuration errors, provider pacing, bounded private attachment, stop on ambiguous persistence, stable retry keys.
- [x] Prepare standard paused Supabase Cron/Vault SQL; do not install or enable recurring sends while general delivery is false.
- [x] Rollback SQL, focused Node tests, independent review, isolated worker verification and local commit.

Ruling: general delivery remains false after the one approved test. No new email is necessary for this fix; use fake HTTP and rollback-only fixtures. The conservative app budget reserves headroom for sign-in mail but cannot measure other senders on the same Resend account. Provider quota errors still pause the batch. Native pg_cron/pg_net are not installed in this project, so scheduling is prepared as reviewed SQL rather than enabling new extensions during a paused pilot. Do not copy the worker secret into code or chat; future activation uses Supabase Vault.

Review: corrected Resend in-progress 409 handling after a failing regression. Concurrent idempotent requests pause/retry the same key; mismatched payload conflicts stop automatic retries. No general mail was enabled and no new email was sent in this phase.
