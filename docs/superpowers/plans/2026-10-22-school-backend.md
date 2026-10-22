# School backend foundation

Approved in chat: implement database, staff permissions, school intake and admin review first; staff administrator admin@forgeintellitech.com. Remain on redesign branch and isolated `forge_redesign_test` schema. Existing customer data and production deployment unchanged.

1. Extend isolated school records with versioning; add deny-by-default staff allowlist, review audit and email outbox. Service-only invoker RPCs reuse existing atomic referral attribution. Bound hourly/daily intake; no direct anonymous database access.
2. Add JWT-protected edge bridge using managed service credentials. Staff requests validate real confirmed Supabase user and database allowlist; never use user-editable metadata. New Next proxy routes require preview feature flag, same-origin mutation, bounded input, and private no-store responses.
3. Replace placeholder admin with school review interface: email sign-in, list, detail, safe early-stage changes, notes, refresh, sign-out. No financial/contract completion shortcuts. Keep sign-in email delivery gated until Zoho is configured; no emails sent by tests.
4. Connect school intake behind dedicated flag without enabling unrelated legacy APIs or referral scaffold. Persist notification job rather than treating an unconnected mail service as success.
5. Verify validator boundaries, SQL permissions, unauthorised staff, duplicate school/referral conflicts, transactional outbox, optimistic concurrency and audit. Build, focused tests and browser checks; record missing SMTP/redirect settings honestly.
6. Later phases: referral account/auth and agreements, movement intake/matching, email workers and delivery monitoring, private documents, earnings and payout controls, end-to-end launch checks.
7. **After backend completion:** remove `/work` (Our work) and update navigation, inbound links, sitemap and redirects. Do not remove it before the backend is complete.

The existing private referral fixture's generated payable date still uses +28 days. Correct and verify to the confirmed fourth-week marker (+21) during referral ledger activation; do not activate financial calculations from this fixture.
