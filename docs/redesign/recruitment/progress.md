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
