# Staff referral agreement and school contract review

Approved scope: the owner's “do it” follows the proposed staff agreement/contract evidence phase. Existing branch and isolated schema only; no Vercel deployment or shared-link changes.

Design: reuse staff authentication with an admin-only /admin/agreements queue. Show referral/school identity, template/download/upload timestamps and review history, never bank data. Serve signed PDFs through an authenticated no-store proxy rather than public links. Review decisions require the current document hash, version and an explanatory note. Corrections are recorded for staff follow-up; a signed copy is never overwritten.

School contracts: staff upload a plain signed PDF with signing date, school version, note and explicit declaration of external review. Store an immutable private copy/hash and audit the verified staff actor. Require the school to be in review/proposal/agreed state and its chosen referral to match. Idempotent receipt prevents duplicate evidence. Activate the referral agreement's document status only when both documents have been reviewed; do not start teaching, calculate earnings, transfer funds or discharge agreements.

- [x] Tests first: bounded inputs, actual calendar dates, document hash/version, required declarations and safe actions.
- [x] Admin-only service SQL and private evidence storage. Rolled-back tests for authorization, locking, stale versions, document prerequisites and audit.
- [x] Dedicated JWT-verified Edge Function and same-origin preview-only Next proxy for list/review/PDF/contract intake.
- [x] Responsive queue within existing staff session; authenticated downloads, decisions, contract upload and errors.
- [x] Unit/SQL/HTTP/browser/build verification, security review and recorded limits; commit locally without push.

Rulings: retain original documents on any ambiguous upload/commit response (never risk deleting committed evidence). Unreferenced upload reconciliation and versioned correction submissions remain a later workflow, explicitly labelled. The staff decision records human verification rather than applying a digital signature or making a legal determination automatically.

Verification and remaining operational setup: docs/redesign/backend/backend-integration-results.md.
