# Referral accounts and agreements — verification, 23 October 2026

Implemented on the redesign branch, isolated to `forge_redesign_test` plus service-only RPC and `forge-referral-review-agreements` private bucket. The shared immutable Vercel tester preview and production configuration were not changed.

## Verified

- Next.js webpack build and TypeScript passed for disabled and referral-enabled local preview configurations.
- 24 focused tests passed, including the 3 MB signed-PDF boundary, known active-content rejection, bank-number masking, amount rounding and +21 fourth-week marker.
- Rolled-back SQL tests: bank profile immutable; account/link ownership; no bank disclosure through supplied foreign ID; unique school link; download before upload; repeated downloads audited; concurrent reservation rejected; cancel/retry; idempotent receipt; committed receipt cannot be cancelled; closed account; unreviewed holiday-calendar refusal.
- Real Auth/API tests with two confirmed fictional `.invalid` users: distinct referral numbers, separate links to the same school, chosen-link attribution, duplicate intake cannot change ownership, foreign-owner agreement/upload denied, correct template hash/version required, signing declaration enforced, bad PDFs rejected, two uploads accept exactly once, private receipt awaiting review. Anonymous direct RPC denied.
- Real local browser: signed-in account, masked bank details, school link creation, recorded PDF download, declared upload, no invented school signature, assisted onboarding and resulting school record in the same account, sign-out clears records, unauthenticated/cross-owner/origin checks. Viewports 320/390/768/1440 passed; reduced motion used for reliable automation.
- Private storage URLs reject both anonymous and ordinary authenticated direct reads. Restrictive bucket-specific policy leaves other buckets' existing access rules unchanged.

## Boundaries and setup still required

`REFERRAL_BACKEND_ENABLED=true` with `VERCEL_ENV=preview` activates the new service. `REFERRAL_EMAIL_LOGIN_ENABLED` stays false until Zoho SMTP, sign-in email template and exact redirect URLs are configured and tested by the owner. No global legacy Supabase credentials or production referral flag were activated.

Agreement template remains `draft-2026-10-22-v1`. External signing and upload are supported; document hashes and timestamps do not validate a signature. Staff approval, signed-school-contract evidence, cost/earnings ledger, statement fulfilment and payout/discharge operations remain next-phase work. No transfers or account deletions are automated.

The official Nigerian holiday calendar is intentionally unseeded: the statement endpoint does not invent a five-working-day due date. It returns an explicit setup error and contact route until calendar review is complete.

Uploaded PDFs cannot overwrite prior signed copies. Storage failure compensation first cancels the reservation atomically; an already-committed receipt cannot be cancelled or have its file removed. An ambiguous committed response can recover the same receipt. Process crashes and orphaned private files still need staff reconciliation/retention monitoring before launch.

Synthetic accounts, sessions, rows and objects are cleaned separately using the scoped fixture cleanup SQL and Storage API. No real customer, child or bank records were used. No emails were intentionally sent to real recipients and no payments were made.

Cleanup outcome: both synthetic PDF objects were removed through Storage API and zero objects remain. The connector returned `Invalid or expired requestState` for full fixture-row/account deletion, so the two synthetic referral accounts were closed instead; the saved scoped cleanup SQL remains available for retry. These are fictional `.invalid` accounts, not customer records. The temporary nonce-gated fixture storage-cleanup handler was removed by restoring the normal edge function (version 4).

## Tester feedback location

Owner-only Supabase Table Editor: schema `forge_redesign_test`, table `preview_feedback`. The current website admin page covers school review, not feedback. Add a private feedback view with page/section/reaction/visitor filters and CSV export next; never expose comments through a public report endpoint.

Our work page remains until backend completion, per the user's instruction.
