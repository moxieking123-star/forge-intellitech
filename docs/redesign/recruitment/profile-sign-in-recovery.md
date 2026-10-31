# Local training profile recovery — 31 October 2026

The owner reported a long wait followed by a training sign-in error. A real local request took 68 seconds before returning HTTP 503. One later real request succeeded in 23 seconds; that isolated success does not establish reliable performance.

The branch now applies one 25-second deadline across authoritative identity verification, private profile lookup and the Google session exchange. Browser recovery is bounded at 30 seconds, preserves the existing email session and distinguishes an expired sign-in, a profile not ready, a connection timeout and service unavailability. The redundant browser session lookup before the profile request was removed. Tokens remain absent from URLs and persistent browser storage.

The isolated Google training store now validates its full schema and configuration once under the mutation lock instead of twice. Deferred reads fail closed before validation. Both valid and malformed-schema paths have regression coverage. The existing isolated Google test endpoint was updated to version 3 after uploading its source. The operational dashboard script and workbook were not changed.

Verification: 168 automated tests pass; TypeScript passes; the local training browser fixture passes with fictional identity and bridge responses, including mobile overflow, sign-out and token-storage checks. The owner signed in again and real profile checks completed successfully in about 8–10 seconds. Both preparation pathways were visibly opened in that real signed-in session. The isolated Google version 3 pilot also passed provisioning, replay rejection, duplicate prevention, altered-identity rejection and session creation. Network reliability is still dependent on the upstream services; bounded recovery remains necessary.

The previous ElyTech and TechUp cards were informational only. Both now have explicit exploration buttons opening a two-week preparation outline, a first-day practical activity and a formative question with explanatory feedback. These are clearly labelled previews: programme choice, practice answers and progress are not saved. The browser regression exercises both pathways, wrong/right feedback, reset on switching programmes and mobile fit. No new enrolment, staff access or employment status is created by exploration.

All website changes remain on codex/instructor-recruitment. Neither production nor the shared tester deployment was changed. Automatic welcome delivery, actual training enrolment/content and the later student dashboard work remain separate unfinished tasks.
