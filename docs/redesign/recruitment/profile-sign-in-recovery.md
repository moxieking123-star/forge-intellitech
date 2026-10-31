# Local training profile recovery — 31 October 2026

The owner reported a long wait followed by a training sign-in error. A real local request took 68 seconds before returning HTTP 503. One later real request succeeded in 23 seconds; that isolated success does not establish reliable performance.

The branch now applies one 25-second deadline across authoritative identity verification, private profile lookup and the Google session exchange. Browser recovery is bounded at 30 seconds, preserves the existing email session and distinguishes an expired sign-in, a profile not ready, a connection timeout and service unavailability. The redundant browser session lookup before the profile request was removed. Tokens remain absent from URLs and persistent browser storage.

The isolated Google training store now validates its full schema and configuration once under the mutation lock instead of twice. Deferred reads fail closed before validation. Both valid and malformed-schema paths have regression coverage. The existing isolated Google test endpoint was updated to version 3 after uploading its source. The operational dashboard script and workbook were not changed.

Verification: 168 automated tests pass; TypeScript passes; the local training browser fixture passes with fictional identity and bridge responses, including mobile overflow, sign-out and token-storage checks. A fresh real signed-in browser check remains required after the previous browser tab closed. Do not describe the intermittent connection as fully resolved until that check succeeds.

All website changes remain on codex/instructor-recruitment. Neither production nor the shared tester deployment was changed. Automatic welcome delivery, actual training enrolment/content and the later student dashboard work remain separate unfinished tasks.
