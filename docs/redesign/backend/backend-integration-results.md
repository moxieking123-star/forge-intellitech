# Backend integration — 24 October 2026

Branch: codex/forge-website-redesign. No GitHub push, Vercel deployment, shared-preview/alias change or live website deployment.

## Implemented and connected to isolated test backend

- Existing school self/assisted onboarding, staff sign-in and feedback remain in place.
- Staff agreement review: private PDF download with digest check, versioned approval/corrections and immutable signed-school evidence. Receipt retry recovery and consistent account/referral/school lock ordering.
- Referral finance: 15% of the full first contract after actual internet, direct school operations and tax, excluding salaries; integer kobo rounded consistently. Reviewed teaching start, verified first deposit, day-21 eligibility, one external full-payment receipt with bank-profile binding, immutable history and agreement discharge. No bank transfer is executed.
- Owner statements: complete gross/deductions/net/reward/paid breakdown, statement request/fulfillment visibility and no full bank number disclosure.
- Reviewed calendar administration with official-source references; no real holiday dates invented or seeded. Existing issued deadlines do not change after calendar replacement.
- Private enquiry intake/review: fixed mailbox routing, database-before-email save, deduplication, database rate limits, versioned notes and audit. Existing public-schema legacy behaviour remains the default outside explicit local preview flags.
- Proposal request queue through the isolated Edge bridge; no paid Zoho SMTP or Next service-role credential required. Same normalised request on the same Lagos day returns its existing receipt before quota checks.
- Outbox delivery worker: dedicated secret, explicit disabled-by-default transport, leases, stable provider idempotency, bounded retry/backoff and a 23-hour ambiguity cutoff. Admin status/read and reviewed retry are independently authenticated and audited.
- All shared Edge modules have checked-in copies and a bundle manifest. Run node scripts/prepare-backend-functions.mjs after source changes.

## Fresh verification

- node --test tests/*.test.mjs: 44 passed, 0 failed.
- npm run build -- --webpack: passed, including TypeScript and all 80 generated pages. Legacy missing Supabase environment warnings are unrelated to the isolated bridge and did not fail the build.
- Rollback SQL suites passed: staff-agreement-review-tests, referral-finance-tests, participation-tests, notification-delivery-tests and notification-admin-tests. No fixture holiday, financial calculation, payment or staff account persisted.
- Real Edge HTTP: invalid staff identity denied by agreements/finance/notification admin; fictional enquiry and proposal saved and deduplicated; worker unauthorised trigger denied. Both saved fixtures and their outbox jobs removed; zero fixture rows remain.
- Browser against local production server: agreement PDF-gated approval and signed-school upload; finance reviewed start payload; enquiry review; provider-checked retry; owner statement breakdown; permission-denial clearing; sign-out; responsive 390/768/1440 widths. These positive UI interactions use mocked fictional records. Real HTTP negative identity/origin checks passed independently.
- Feedback dashboard regression passed with mocked filters/pagination/export and real HTTP denials. Earlier actual owner sign-in and actual four feedback responses remain the evidence for real feedback reads; no new real-admin financial approval was performed.
- Full-page cartoon journey browser passed: actual CSS motion, eight scroll chapters, optional fence activity, focus restoration, 320/390/768/1440 widths, reduced motion, route-specific chapter and form-focus suppression. No page errors.

- Legacy public /api/test-email diagnostic disabled on the branch: it can no longer send a message or disclose mail configuration/key prefixes. A focused HTTP/unit regression protects this boundary. The live route remains unchanged until an approved release.

- Final advisor/permission check: all 25 redesign tables have RLS enabled; zero sensitive staff/finance/worker RPC grants to PUBLIC, anon or authenticated. Service-only private tables intentionally have no ordinary-user policies. Pre-existing legacy advisories are unchanged.

## Deployment boundary and activation remaining

Only new/service test Edge handlers and forge_redesign_test SQL were installed in the existing authorised forge-web project. Existing public customer tables and live website settings were not changed. MCP apply_migration returned Invalid or expired requestState; the reviewed isolated SQL was applied through execute_sql and verified afterward. These SQL bundles must be incorporated into a reviewed migration history before production release.

Local production servers: http://localhost:3009 (approved staff email-return origin) and http://localhost:3011 (site preview). Feature flags are process-local. Public referrer email login remains disabled until its exact callback is configured and verified. No wildcard redirects added.

Application email activation still requires the Resend API key to be added through Supabase Edge Function Secrets, a dedicated random worker secret, verified sender and private proposal PDF storage. No credentials were copied from Supabase Auth SMTP. Configure a scheduler only after supervised delivery tests; observe the account's actual free-tier limits. No application emails were sent in this phase.

Statement deadlines need a reviewed applicable holiday calendar saved through /admin/finance. The code refuses to invent coverage. Paid accounts can be closed after all referrals and statement obligations are settled; financial evidence is retained and auth accounts are not automatically deleted. Retention/deletion and signed-document correction/reconciliation policies remain operational release decisions.

Existing legacy public-table RLS advisories remain pre-existing release blockers for the production integration. They were not altered because that could affect live consumers. Post-backend visual polish and removal of Our work remain separate; do not treat disabled delivery/configuration as a completed public launch.

Run the real synthetic Edge script only with FORGE_TEST_DELIVERY_DISABLED=true after verifying the transport is off; its durable fixtures must be cleaned by their saved IDs before enabling delivery.
