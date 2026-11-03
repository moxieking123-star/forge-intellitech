# Backend completion results — 25 October 2026

## Latest supervised email verification

The signed-in Supabase SQL editor provided a working fallback when the connector remained unavailable. The owner-run result showed exactly the intended proposal test pending, attempts0, no other pending jobs, and scheduler paused. Authenticated dispatch request2 returned HTTP503 `Disabled`, without claiming the job. The displayed digest established that the delivery boolean was saved as `True`, while the explicit worker switch requires lowercase `true`. Corrected only this non-credential boolean through Edge Secrets; its new digest matched lowercase `true`. The sender digest matched the configured `programs@auth.forgeintellitech.com` address; no API/worker/webhook key value was retrieved.

Dispatch request3 returned HTTP200 with accepted1, failed0, pausedfalse. Existing test job `b6c5a83f-aa78-4257-9acc-50e13709d752` is sent after exactly one provider attempt; provider receipt `01a174be-e6bd-7489-8e3e-880019b04d62`. The verified signed delivery summary reports `delivered` at 2026-10-25T20:27:20.727Z (21:27 Lagos). This means recipient-server acceptance, not proof the inbox message was opened. No duplicate proposal job was created.

The empty-queue guard passed before enabling a supervised one-minute scheduler verification at 20:29:57Z. Cron ran successfully at 20:30:00Z. Its actual asynchronous HTTP request4 returned HTTP200 with accepted0, failed0, pausedfalse; four consumed authenticated proofs correspond to the four dispatches so far. This verifies scheduling, Vault/HMAC authentication, nonce consumption and the empty-queue worker together. Restored the normal `*/10 * * * *` interval with active=true, verified at 20:30:56Z. No second internal test was sent. Private screenshot evidence is `private-assets/backend-scheduler-verified.png`.

The isolated backend email activation and verification gates are now complete. Backend implementation and its current isolated operational checks are complete; this does not claim the final website or approved production cutover is complete. The website deployment, shared preview, production feature settings and legacy live tables remain unchanged. Historical paused/blocked notes below describe the earlier stages, superseded by this result.

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

## Vault connection verified

The owner created Vault secret `forge_notification_worker_secret`. A real scheduler dispatch returned request1, the worker consumed exactly one authenticated proof and returned HTTP503 `Disabled`, with no timeout or transport error. This establishes that Vault and Edge credentials match, HMAC generation/verification works, nonce consumption works and the disabled-delivery gate is enforced. No secret value was read into chat/source and no mail was sent by that dispatch.

Queue review found zero pending jobs before supervised activation. The owner has been asked to set `EMAIL_DELIVERY_ENABLED=true` in Edge secrets. One fixed-recipient internal proposal test and signed delivery confirmation must complete before activating the recurring job. General sending and recurring activation are not yet claimed complete.

Production Auth URLs, environment activation and legacy-table permission cutover belong to final approved deployment. The backend code is implemented and locally verified; the above secure activation and approved production cutover remain explicit boundaries.

## Continuation verification

The owner subsequently confirmed `EMAIL_DELIVERY_ENABLED=true`. This is an owner-reported setting; it has not yet been independently read or exercised. A further connector attempt still returned unavailable. Do not request the setting again. `supervised-email-status.sql` provides a read-only owner-run fallback without secret values or any send/activation mutation. The new recruitment/training requirements are saved in `../recruitment-training-backlog.md` and explicitly excluded from the launch dependency.

All 72 Node tests passed again; the controlled proposal integration script passes its syntax check and the branch diff passes whitespace validation. No second proposal request was created. The Supabase connector returned unavailable during this continuation, so the saved queued test, current delivery switch, provider result and scheduler state could not be freshly inspected. Last verified recurring scheduler state remains paused; no activation or delivery is claimed. Await connector access and confirmation of the delivery switch before supervised dispatch.

