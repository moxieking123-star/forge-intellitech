# Backend completion results — 25 October 2026

Branch-only website work. No GitHub push, Vercel/shared-preview update or live website deployment. Frontend work is paused. Its earlier uncommitted draft was saved privately in `private-assets/held-frontend`, and active frontend source restored to the committed baseline. Private assets are excluded from TypeScript compilation.

## Completed in this phase

- Genuine Resend callback confirmed after an authorised admin sign-in email: `email.delivered` persisted at 2026-10-25 14:19:49 UTC. The signature, configured secret, deployed endpoint and database receipt path therefore work together. No email link/code was read. Earlier real proposal attachment delivery was already confirmed by the owner.
- Cron/pg_net installed; ten-minute `forge-redesign-notifications` job created and kept paused. Worker version9 supports single-use, 90-second HMAC scheduler proofs plus the existing private manual trigger. Reusable credentials stay in Vault/Edge secrets, not queued HTTP requests or cron command text.
- Managed extension-owner PUBLIC grants could not be removed by the database role. The best-effort permission migration was not treated as successful isolation. Scheduler security instead depends on a narrowly scoped expiring proof, atomic service-only nonce consumption and private credential storage. Invalid/stale/reused proofs are rejected; no private records are returned by the worker. Net schemas are not application API endpoints.
- Audited statement calendar configured for 25 October–30 November 2026. The published [Nigerian High Commission calendar](https://nigeriahcottawa.ca/public-holidays/) lists no federal holiday in that window; federal notice and Lagos declaration searches were checked. Calendar review records scope, sources, operator delegation and exceptional-declaration maintenance. No future religious dates were invented. Refresh before expiry or after an applicable new declaration.
- Explicit production backend opt-in added, retaining each feature switch and preview compatibility. The production release switch remains unset on every actual deployment. Configured keys must be legacy anonymous JWTs for the current JWT-checking gateways; malformed, service-role and unsupported modern key strings fail closed.
- Redesign mode cannot silently use legacy contact/sponsor/referral stores. Unused old Launchpad/newsletter APIs return HTTP410, while current forms use the new service routes. Tester feedback submission stays preview-only.
- Coordinated legacy protection SQL and caller audit prepared. Seven old public tables and their existing live callers were not changed. The SQL refuses execution outside an explicitly approved cutover transaction. This remains an approval-time production action, not an undisclosed completed security fix.

## Fresh evidence

- 72 Node tests passed; TypeScript passed; complete local 80-page webpack build passed.
- Actual rolled-back SQL: live reviewed calendar yields the fifth business day; statement deduplication; scheduler nonce freshness/replay/private grants; earlier referral foundation ownership/download/upload/closed-account checks with calendar-independent refusal. No fictional records or statements persisted.
- Local production mode with release switch off: configuration HTTP503, no key disclosure, review-feedback HTTP404.
- Local production mode with explicit release opt-in and features on: configuration available; only anonymous publishable JWT returned; obsolete endpoints HTTP410; invalid intake HTTP400; private unauthenticated requests HTTP401. No requests or emails created by these HTTP tests.
- Local production opt-in with individual features off: contact/sponsor/referral HTTP503 and no old-table fallback.
- Staff workflow browser regression passed on the unchanged frontend: fictional reviewed finance/enquiry/delivery actions, mobile/tablet/desktop fit, denial clearing and sign-out. Actual HTTP identity and cross-origin denials passed separately.
- All 29 new private tables have RLS enabled. Nonce consumption is not executable by anonymous users. Scheduler remains paused. One real signed delivery receipt is present.
- Independent source review found no concrete defect in production gating, key filtering, fallback prevention, HMAC authentication, atomic nonce consumption or scheduler SQL.

## One secure setup step still pending

The owner must create Vault secret `forge_notification_worker_secret` with the same private value as Edge secret `NOTIFICATION_WORKER_SECRET`. The application never reads that value into chat/source. If the value is no longer available, rotate it securely in both places.

After Vault setup, invoke the scheduler once while `EMAIL_DELIVERY_ENABLED=false` and verify authenticated worker response/consumed proof without draining mail. Then review pending queues and perform supervised mail activation. General sending and recurring activation are not claimed complete before that check.

Production Auth URLs, environment activation and legacy-table permission cutover belong to final approved deployment. The backend code is implemented and locally verified; the above secure activation and approved production cutover remain explicit boundaries.
