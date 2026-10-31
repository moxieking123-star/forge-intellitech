# Instructor assignment review — local pilot, 31 October 2026

The private page at `/admin/training` lists the latest submission for each trainee/programme/lesson, ten at a time. Filters cover awaiting review, changes requested, reviewed and all. Staff can read the assignment, save written feedback and mark it reviewed or request changes. The trainee can refresh feedback in their preparation view; a revised submission starts awaiting review while earlier submissions and reviews remain stored.

The website code remains on the instructor recruitment branch. Only the existing isolated training test bridge was updated, to version 5. The operational dashboard, live site and shared tester deployment were not changed. Daily lesson content remains deferred at the owner's instruction.

## Access and integrity

- Each staff request verifies its Supabase access token with Auth.getUser, requires a confirmed email and invokes the existing service-only recruitment administrator guard. No staff membership or permission was granted. The guard uses a read-only list request with a sentinel search and maximum offset; returned applicant data is discarded. A dedicated minimal authorisation RPC would be a future optimisation.
- Only after that check does the server sign a short-lived `staff.training` envelope containing the verified actor ID. Browser JSON cannot nominate an actor or trainee. Google validates the signature and nonce before workbook access.
- Feedback and outcomes are appended to `Training_Reviews` with actor, submission, request ID, payload hash and server timestamp. Unchanged retries are idempotent; conflicting request-ID reuse fails. All actions run under the test script's lock.
- Saves require the expected previous review ID and the latest assignment revision. Concurrent reviews or a new trainee submission return a conflict and preserve the staff's mounted feedback draft.
- Trainees see only feedback for their own currently selected programme and latest assignment. Staff identifiers are omitted from trainee responses. Reviewed status is separate from employment, placement and school access.
- Current feedback is limited to 20–1,200 characters; assignment text remains limited to 30–1,200. Responses are bounded at 16 KiB for work/review only. Staff history shows the last five review outcomes and timestamps; full feedback revisions remain in the test workbook. Spreadsheet formula-like text is stored literally.

## Verification and next work

177 automated tests pass, including signature parity, role/actor injection denial, non-admin denial before Google exchange, duplicate/conflicting saves, stale submission/review handling, programme isolation and no role escalation. The real fictional Google pilot confirmed feedback persistence, safe retry, stale conflict and trainee visibility. It also checked the existing administrator database guard for the owner and a fictional non-admin. This is not a claim of a fresh real staff-browser login.

The staff browser fixture covers the queue, filters, empty results, assignment detail, failed-save draft preservation, request-ID reuse, stale conflict, mobile fit and sign-out. The trainee browser fixture covers feedback refresh alongside save/reload and programme switching. TypeScript passes. Fixtures use fictional identities; only the isolated Google pilot writes labelled test feedback.

Remaining: automated welcome delivery and mounting the trainee journey at the dashboard host; reviewed assessment-bank release; daily lesson content and later training workflows. The student dashboard, seminar entry, attendance, scoring/export and parent-view requirements remain recorded for the subsequent phase.
