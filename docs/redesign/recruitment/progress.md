# Instructor journey execution ledger

## 27 October 2026 — started

- Owner approved starting instructor recruitment first and expanded project completion to the operational/student dashboard work. Full scope saved in ../project-completion-scope.md.
- Created local branch codex/instructor-recruitment. No push, merge, deployment, email invitation, production database write or spreadsheet write performed in this phase.
- Google Drive connector found the exact operations workbook, read its metadata and four bounded header rows only. Existing personal/financial rows were not needed or inspected.
- Read the owner-supplied current Apps Script project in the editor. Private copies of Auth.gs and DashboardApi.gs are stored under ignored private-assets/recruitment-audit. Did not press Run, Save or Deploy. The current unknown-role fallback would treat an unrecognised trainee staff role as instructor; the new trainee adapter must avoid operational staff provisioning.
- Recorded the signed-event proposal and source-of-truth boundaries in integration-contract.md. Current Apps Script version label is still 2026-10-05.1; verify the deployed revision independently before changing it.
- RED: recruitment-assessment.test.mjs failed because assessment.ts did not exist. GREEN: implemented question-form validation, safe candidate projection, marking, server-time checks and attempt allocation decisions. All12tests passed.
- RED: recruitment-application.test.mjs failed because application.ts did not exist. GREEN: implemented bounded/minimised fields, consent, email normalisation and matching to a server-verified identity. Combined16tests passed.
- Ruling: first implement pure domain controls without exposing a public form or endpoint. Persistent attempt allocation must be atomic in the database; these functions alone are not a live test system. This avoids accidentally reopening the recruitment holding page with an incomplete backend.
- No real question bank or answer keys were placed in the public repository. Unit fixtures contain fictional repeated example questions, not approved recruitment material.
- Verification: combined16newtests passed; full88-test regression suite passed; TypeScript --noEmit passed; whitespace check passed. Private source copies are excluded from Git. No actual auth sessions, applications, recruitment attempts, profiles or emails were created by these tests.

## Next deliverables

1. Private recruitment schema and service adapter: completed 28 October; public routes/UI and pilot still pending. Keep production release switches off.
2. Applicant API/UI implemented and checked locally with fictional browser responses; real email/auth round-trip and full pilot still pending.
3. Ten reviewed, comparable question forms (minimum300questions); keep marking keys private.
4. Signed Apps Script trainee provisioning, restricted session/action handlers and reliable invitation queue.
5. Programme selection and the co-developed two-week training content, submissions and daily feedback.

Broader dashboard/student/name/Seyi/task/attendance changes remain recorded and are not represented as completed. Synthetic attendance examples remain demo-only.

## 28 October 2026 — private persistence installed

- Applied `instructor_recruitment_private_storage` in forge-web, creating four private tables: applications, forms, attempts and answers. All have RLS and no anon/authenticated table grants. Four SECURITY INVOKER RPCs are executable only by service_role (and owner/admin roles); the private schema is not exposed to applicants.
- Draft saving, atomic parent-row locking for attempt starts, idempotent request keys, one active attempt index, unused-form selection, a database five-minute deadline, server timestamped answer saves and repeat-safe marking are implemented. A start fails closed until at least ten reviewed forms exist. Each attempt snapshots its question form so edits cannot change marking later.
- Added server service adapter using Auth.getUser plus confirmed-email matching. Owner IDs, timestamps and marking keys cannot be accepted from applicant input. `RECRUITMENT_BACKEND_ENABLED` defaults off and was not enabled in any environment.
- RED: six new service tests failed on the missing service module. GREEN: six passed after implementation. Full regression suite: 94 tests passed; TypeScript and whitespace checks passed.
- Database integration tests used only randomly identified `example.invalid` applicants and fictional question fixtures, under the actual service_role. Verified request replay, active-attempt denial, cross-owner denial, safe question projection, 22/30 failure, 23/30 pass, idempotent submission, late-answer denial and fourth-attempt refusal. All fixtures rolled back. Post-install counts: zero applications, zero forms, zero attempts.
- Permission testing caught that service_role cannot SELECT auth.users. Kept that restriction intact: verified identity is obtained through Auth.getUser in the server adapter rather than granting broad Auth table access.
- Security advisor reports intentional RLS-without-policy INFO notices for service-only tables. The existing project-wide leaked-password protection warning remains (current sign-in uses email links); no new security warnings from this schema.
- No website deployment, shared-link change, applicant emails, Google Sheet writes or Apps Script edits. The SQL regression test must always be invoked inside BEGIN/ROLLBACK.
- Next: applicant API/UI, explicit abandonment and audited staff reset, private reviewed bank publishing, then reliable invitation/provisioning and trainee-only Apps Script integration. The complete recruitment journey is not yet enabled or complete.

## 28 October 2026 — applicant screens and request handlers

- Added feature-gated `/api/recruitment` and `/api/recruitment/config`. Mutations require same-origin requests, bearer identity and exact bounded JSON shapes; private responses are never cached. Known failures map to helpful messages, and unexpected backend errors stay private.
- Added a separate session-storage recruitment Auth client, email-link/code screen, minimised introduction form, explicit test readiness/consent, and a thirty-question assessment UI with navigator, selected-answer status, saved/unsaved indicators, retry-save handling, monotonic countdown and timeout submission. No live flag or email flag was enabled.
- Applied `recruitment_applicant_state`: owner-scoped state, idempotent abandonment and fresh server time in start responses. Candidate projections now strip private fields even from individual option objects. State/abandon remain service-only; anon/authenticated cannot call either.
- Refresh recovery records only an attempt UUID under an identity-scoped session key, closes that interrupted attempt before fetching state on return, and retains every consumed attempt. If browser storage/unload signals fail, the earlier-attempt screen gives an explicit close action rather than silently starting an extra chance. Brief visibility/focus changes do not forfeit attempts. Staff reset remains to be built.
- Verified the SQL regression suite against the installed schema as service_role inside BEGIN/ROLLBACK, including own-state isolation and idempotent abandonment. No real recruitment records were retained.
- Browser tests use mocked Auth/API responses and explicitly fictional questions, not a real applicant account or approved assessment bank. Passed sign-in gate, form/start, failed-save/retry, navigation, pass/nonpass, remaining attempts, three-attempt contact screen, interrupted return, timeout submission, refresh recovery and viewport fit at 1440/768/390. Real local HTTP checks denied cross-origin and anonymous requests.
- RED/GREEN: seven request-handler tests, three screen-rule tests and two extra service tests; full regression suite now 106 passing. Fixed an inherited-property error-map bug, pale inherited heading colours and the refresh/keepalive race exposed during checks. Read-only introduction fields after the first attempt match the database's frozen-introduction behaviour.
- Local captures: ignored `private-assets/recruitment-application-mobile.png` and `recruitment-assessment-desktop.png`. The timed page omits floating mascots/video/feedback widgets. The header skip link is hidden by clipping until focus, so reduced-motion mode does not expose it in the middle of the page.
- Production recruitment stays on its holding page. No website/shared-preview deployment, email invitation, Sheets write or Apps Script edit. Local server feature flags are process-only and do not alter hosted settings.
- Next: a private reviewed bank with at least ten comparable forms, audited staff follow-up/reset, then transactional pass-event delivery, signed trainee provisioning, invitations and training. Real email callback testing also requires the `/join/apply` return URL and secure local server configuration; no credentials should be put in chat or Git.
- Production build passed: compiled, TypeScript passed, 81 static outputs generated and both new API routes remain dynamic. The initial restricted build worker stalled; retry with normal local process permissions completed. No build artifacts were deployed.
- Verified the built site on local port 3013 with no recruitment flag: `/join/apply` renders the existing hold, `/api/recruitment` returns 503 and `/api/recruitment/config` returns 503. No applicant data or publishable configuration is exposed by those disabled endpoints.

## 29 October 2026 — question drafts and staff review

- Authored 300 distinct draft questions in ten forms with the shared 5/6/3/4/5/7 topic blueprint. Private files and answer keys remain under ignored `private-assets/recruitment-bank`; no actual question content is committed to the public repository. Added a metadata-only validator and a local HTML review renderer. Staged ten forms in private Supabase storage as `reviewed=false`; zero forms are approved or available for candidate starts. Original sources orient the editorial review; link presence and technical validation do not prove item-level accuracy or calibrated difficulty.
- The private review artifact is `private-assets/recruitment-bank/review.html`; it contains marking keys and must not be given to applicants. Ruling: keep the draft question bank disabled until representative content/source review and a phone pilot, rather than treating 300 structurally valid questions as approved assessment content.
- Added `/admin/recruitment` using existing staff sign-in, with name/email/location search, assessment-status filters, pagination, applicant details, attempt history and reset history. Recruitment administrators can grant the next three attempts only after existing attempts are exhausted. Reasons are mandatory, requests are idempotent and stale versions/active assessments/passed applicants cannot be reset. Previous attempts remain intact; used question forms are not recycled.
- Applied `recruitment_staff_review_and_resets`, adding an application allowance/version and a private append-only reset-audit table. The service-only staff RPC checks an active, verified, matching admin membership; school reviewers and candidate roles cannot access it. No staff membership was created or changed outside rollback fixtures.
- RED/GREEN: bank-validator, review-parser and staff-identity modules. Full regression suite: 115 tests passed; TypeScript passed. SQL tests ran as service_role inside BEGIN/ROLLBACK, including mismatched identity, non-admin denial, absent/stale version, duplicate reset, preserved history, reopened allowance and active-attempt protection.
- Mocked browser tests passed filters, pagination, details/history, reason validation, failed-reset retry with the same request ID, empty/forbidden screens, sign-out and 1440/768/390 viewport fit. Real local HTTP denied anonymous and cross-origin staff calls. No real applicant, reset or email was created.
- Confirmed stored counts: zero applications, attempts or resets; ten draft forms; zero approved forms. Live website/shared preview and operational Apps Script/Sheets remain unchanged. Next: durable pass-event outbox and tested signed handoff contract before connecting the actual trainee workspace.

## 29 October 2026 — pass-to-training delivery foundation

- Applied `recruitment_pass_delivery_outbox`: a marked pass now atomically queues one training provisioning event; repeated submission cannot duplicate it. New provisioning and invitation outboxes are private/RLS-protected and have no candidate permissions. No actual applicant/event/invitation was created.
- Added service-only claim/settle RPCs with bounded batches, fresh five-minute leases, expired-lease recovery, stale-worker rejection, doubling backoff, an eight-claim stop and idempotent acknowledgements. Only a successful matching provisioning receipt prepares one invitation entry; no sender is enabled or implemented for that queue yet.
- Implemented HMAC-SHA256 envelopes and a matching Apps Script-compatible training-only verifier/receiver core. Tests cover Unicode byte parity, exact field allowlists, role injection, stale timestamps, nonce replay, event/payload conflicts and repair after profile creation with an interrupted receipt write. The actual durable training store and trainee session dispatcher are still pending; memory-backed contract tests do not claim a live workbook integration.
- Added a disabled server delivery adapter and bounded manual-redirect transport. Only a configured Google Apps Script execution destination is accepted; redirects are checked before following, responses are bounded and the Supabase service key is never sent to Google. No key, destination, release flag, cron or public worker route was configured.
- Saved the exact wire representation, authority boundaries, receiver-storage interface and remaining rollout work in handoff-contract.md. No current Apps Script source/deployment or operational workbook was edited.
- Full regression suite: 133 passing tests. SQL delivery tests passed inside BEGIN/ROLLBACK as service_role, including lease expiration and the eight-claim budget. Security advisors show only intentional service-only RLS-without-policy INFO notices and the previously known project-wide leaked-password-protection warning; no new recruitment warning.
- Production build passed compilation, TypeScript and all 81 static outputs. Recruitment/admin request handlers are dynamic. Confirmed zero real applications, provisioning events or invitations and zero approved question forms after all rollback tests. No delivery was attempted against Google and no email was sent.

## 31 October 2026 - persisted local training work

- Programme selection, Day 1 practice completion and text assignment submissions now use a session-scoped signed bridge and the isolated test workbook's Training_Work log. Existing programme histories and assignment revisions are retained; request IDs prevent duplicate retries.
- Real fictional Google persistence and signed-in owner pilot submission passed. 173 unit tests, TypeScript and the expanded browser save/reload/retry/mobile test pass. See saved-training-work.md for scope and limitations.
- Operational dashboard, production site and shared tester deployment are unchanged. Remaining instructor work: staff marking/feedback, full lesson content, automated welcome delivery and the dashboard-host integration; public assessment forms still require approval. Student dashboard, seminar entry and result/report requirements remain deferred as previously recorded.

## 31 October 2026 - staff assignment feedback

- Added /admin/training: latest-submission queue, status filters, assignment details, written feedback, reviewed/request-changes outcomes and recent review history. Trainees can refresh their own feedback; revisions start awaiting review.
- Existing verified recruitment-admin authority is required before signing any Google staff request. No new staff grant or operational workbook change. Review saves are append-only, idempotent and reject stale submissions or review versions.
- 177 automated tests pass. Real fictional Google review/trainee-visibility pilot and existing admin/non-admin guard checks pass. Browser fixtures cover staff save retries/conflicts/filters/mobile and trainee feedback refresh. See staff-training-review.md for details.
- Owner explicitly deferred daily lesson content recreation. Remaining delivery/dashboard-host/assessment approval and later student dashboard requirements are unchanged. Website remains branch-only; shared preview and production were not deployed.

## 31 October 2026 - staged welcome automation and app namespace

- Built a private scheduled-worker endpoint that processes confirmed provisioning and welcome jobs, a Resend adapter, immutable-recipient queue leases/receipts and bounded retries. Sender and destination readiness remain disabled; no real welcome email was sent.
- Prepared a separate /instructor-training build, prefixed assets/API/auth callbacks, instructor frame and a safe rewrite merger preserving the existing app root. Inspected the current operations source read-only; no operational deployment was changed.
- 183 automated tests and local PostgreSQL migration integration passed. The namespaced trainee browser flow passed; the separate production build compiled and generated all routes successfully. Added release-only migration/scheduler files and a secure environment checklist in welcome-and-app-host.md.
- Public activation still requires approval: deploy the reviewed training build, merge only its app namespace, allow exact auth return URLs, securely configure the email/worker secrets, apply the reviewed migration, verify an owner pilot, then enable automation. Shared preview and live site are unchanged. Lesson content remains explicitly deferred.
- Final safeguards: production training requires an explicit matching production workbook, and the queue refuses applications labelled testOnly. Queue-to-provider integration persisted one mocked acceptance and confirmed no duplicate on the next run. No actual email or production workbook was created. Full compiled namespaced browser flow passed.

## 1 November 2026 - production resources prepared, not activated

- Created a fresh private production training workbook with eight exact-schema tabs, Lagos timezone, no records and WriteEnabled=false. Resource IDs are retained in ignored private-assets/production-training-setup/resources.json.
- Created a separate standalone production Apps Script project and uploaded source without any web deployment. Added an owner-run readiness reporter that exposes only status flags; two focused tests pass.
- Created forge-instructor-training in the existing Vercel team via its CLI fallback. It has no Git connection or deployments. Twelve non-secret Production configuration values were saved, including all automation/delivery readiness flags set false. No existing private key was retrieved or copied.
- Owner must add four script properties and five Vercel credential values through secure settings. TRAINING_BRIDGE_URL, Auth return URLs, migration activation and scheduler remain deferred until deployment approval. Shared preview and live site unchanged.

## 1 November 2026 - secure setting presence check

- Verified by environment metadata that all five requested credentials exist in the new training project's Production environment as sensitive/Secret entries. No private value was decrypted, printed or tested against a provider.
- Verified all six release/delivery gates remain false, and the production workbook has Environment=production and boolean WriteEnabled=false.
- Still requires owner-run forgeTrainingReportReadiness output to verify script properties and key shape. Secret presence does not prove validity or that the bridge signing keys match.
- Remaining release work: reviewed queue migration; approved production bridge and app namespace deployments; exact Auth return URLs; controlled real sign-in/email pilot; then scheduler activation. No public or shared deployment changed.
