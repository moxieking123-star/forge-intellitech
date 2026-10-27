# Instructor integration discovery — 27 October 2026

Status: initial read-only audit and first website domain implementation. The exact live Apps Script revision still needs verification; old local files are reference material, not an authorised replacement for production.

The owner subsequently provided current project `1eZmkoN63wexGtwJbjKaJ-LuBqNk6ZJodGAIMZ6jf6og9RgAP39qmtBx0`. Its Auth.gs and DashboardApi.gs were inspected read-only in the signed-in editor, not executed. The unknown-role instructor fallback and staff-only refresh path are confirmed in that editor. No server file, deployment, secret or operational record was changed. Inspect the deployment's selected version before wiring a service handler; editor source and deployed revision are distinct.

## Boundaries

Website identity/application/assessment records are new recruitment data. Existing operational Apps Script/Sheets and existing student-portal services remain intact. Stable applicantId maps to a separate traineeId. A training invite never provisions an employee, enables payroll or exposes internal school/student records.

## Observed interfaces

The local Apps Script handleRequest_ obtains a token with getSession_, refreshes user access, then dispatches operational actions. The local auth helper defaults unknown roles to instructor. Therefore trainee traffic must be separated BEFORE operational dispatch and must not be inserted into the Instructors staff table as a shortcut.

The frontend's public API_URL points to an Apps Script /exec deployment and uses JSON in a text/plain POST. The public deployment URL is not a credential. Service provisioning will require its own signed envelope, server validation and replay protection; ordinary browser calls cannot choose a role or invoke service actions.

## Proposed service contract

Envelope: `{version:1,eventId,timestamp,nonce,action:'trainee.provision',payload,signature}`.
Payload: `{applicantId,verifiedEmail,displayName,assessmentReceiptId,eligibility:'training'}`.
Response: `{eventId,traineeId,status:'created'|'existing'}`.

Signature covers version/action/IDs/timestamp/nonce and a canonical payload digest. Reject extra keys, expired messages, replayed nonces, altered content and caller-supplied operational roles. Store keys in server configuration and Script Properties. Persist event receipts in private training storage; perform short locked create-or-find by applicantId and reconcile partial writes. Exact signing representation is defined by the tested bridge module, not ad hoc JSON serialisation on each side.

## Initial website rules

- Deadline300seconds; thirty equally weighted questions; pass at23correct; max3started attempts; no fourth without staff review/reset.
- Authentication and attempt persistence remain server responsibilities; the pure domain module does not by itself provide atomic allocation or an endpoint.
- Return to an abandoned page uses a fresh unused form. Brief focus loss is recorded separately, not proof of cheating. Server expiry handles disappearance without a reliable unload request.
- Keep never_started/in_progress/abandoned/expired/not_passed/passed distinctions for staff follow-up.
- New applicant data is minimised; no banking, salary, tax, child data or operational permissions are collected by the application.

## Readiness gate before deployment

Verify current Apps Script source and deployment, separate test workbook/deployment, existing-role regression tests, server-authoritative transactional attempt storage, at least ten reviewed question forms, signed bridge replay tests, trainee own-data access tests and explicit owner release approval. The existing live recruitment hold remains until those gates pass.
