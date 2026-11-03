# Notification follow-through

Owner confirmed the proposal email and attachment worked. Implemented on codex/forge-website-redesign; no Git push, shared-preview deployment or live website change.

- Reviewed the two pending school messages: both were exact synthetic HTTP/browser verification records with .invalid contact addresses. Marked cancelled with a dedicated audit, retained history and verified they cannot be retried. Zero real school notifications were cancelled or sent.
- Shared database reservation limit: 40 new application-email jobs per rolling 24 hours across school, participation and proposal queues. Includes in-flight reservations; safe retries keep the original reservation and key. Ordinary users and service API clients cannot edit the budget table. This reserves application headroom, not a guarantee about other senders on the same Resend account.
- Worker claims one message per queue rather than prefetching a batch; spaces provider requests by 650ms; stops the batch on configuration, rate-limit, transient or ambiguous receipt errors. Permanent invalid-content errors stop automatic retries for that job. In-progress 409 conflicts retry the same key; actual idempotency payload conflicts require review.
- Private proposal downloads are streamed with the 8MB bound. No arbitrary bucket or path is accepted.
- Standard Supabase Cron/Vault scheduler SQL is prepared but NOT installed or activated. pg_cron and pg_net were absent. The script creates a paused job atomically and refuses to overwrite an existing one. Future activation uses the existing worker secret via Supabase Vault; no secret copied into source or chat.

## Evidence

51 Node tests passed. TypeScript no-emit passed. Rollback SQL tests passed for cross-queue budget exhaustion, in-flight reservation, stable retry window, cancelled-job exclusion, stale receipts, permanent/transient states and staff retry authorization. All temporary budget/message fixtures rolled back. An independent review found one actionable conflict-classification issue; regression failed before the fix and passed afterward. Test worker version4 deployed in the isolated backend; a real unauthorised HTTP trigger returned401, proving runtime startup and auth enforcement without sending email. No Next.js page or website API source was changed, so a new website build/deployment was unnecessary.

The general EMAIL_DELIVERY_ENABLED setting remains false; scheduler remains uninstalled. No further email was sent after the owner-confirmed proposal test. Bounce/delivery webhooks, scheduled activation and the wider production rollout remain separate release steps. Existing legacy public-table RLS advisories are unchanged; the new tables are private and RLS-enabled.

## Sources checked

[Resend idempotency responses](https://resend.com/changelog/idempotency-keys) distinguishes concurrent in-progress conflicts from payload conflicts. [Supabase scheduled Edge Functions](https://supabase.com/docs/guides/functions/schedule-functions) recommends Cron/pg_net with secrets in Vault. [Resend pricing](https://resend.com/pricing) supplies the account-wide free limits; check actual account usage before activating regular delivery.
