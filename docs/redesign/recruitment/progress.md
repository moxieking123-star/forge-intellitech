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
2. Verified-email application UI and assessment screen connected to that adapter in a test environment.
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
