# School foundation setup and remaining connections

Initial authorised staff address: `admin@forgeintellitech.com`, stored in the private staff allowlist. User ID binds on first verified login. No staff account or email was automatically created/sent.

## Isolation

School requests, review notes, roles and notification jobs use `forge_redesign_test` only. Public-schema RPCs are callable only by the service role. Edge gateway requires project JWT; staff actions independently validate the caller with `/auth/v1/user` and require a confirmed email and database allowlist membership. No direct public/ordinary authenticated reads. Service role is not given broad access to `auth.users`.

`SCHOOL_BACKEND_ENABLED=true` and `VERCEL_ENV=preview` enable only this bridge. Existing `REFERRALS_ENABLED` remains disabled. The local/preview connection reuses server-side `PREVIEW_FEEDBACK_ANON_KEY`; no service key is placed in Next or browser bundles. For production use a separately reviewed configuration and migrated schema after full approval.

## Staff sign-in before real use

1. Connect Zoho SMTP to Supabase Auth using secure dashboard settings (not chat): regional SMTP host, port 465 or 587, sender address and mailbox app password. Confirm verified sender, TLS and domain delivery settings.
2. Provision or invite `admin@forgeintellitech.com` through Supabase Auth. The UI uses `shouldCreateUser:false` so public sign-in attempts cannot provision staff accounts.
3. Allow the exact approved admin preview URL under Supabase Auth redirect URLs. Do not add a broad arbitrary wildcard.
4. Configure sign-in email template for link and optionally OTP code. Never use a real staff email for automated tests.
5. Set `STAFF_EMAIL_LOGIN_ENABLED=true` only after one owner-supervised delivery/sign-in check. It remains false by default. Admin screen is `/admin`; unauthenticated visitors see no records.

## Notifications

School intake and `programs@forgeintellitech.com` notification job are written in one transaction. Pending status is reported honestly to the school. This phase does not send notification email: next implement an outbox worker with restricted credentials, claim/lease, idempotent delivery, retries/backoff, and a manual retry screen. No automatic payments or account deletion.

## Verification

`node --test tests/*.test.mjs`: 23 checks passed. `school-foundation-tests.sql` exercises service-only permissions, intake/outbox atomicity, duplicate rejection, staff allowlist, audit, stale update conflict and assisted attribution inside a rolled-back transaction. `verify-school-edge.mjs` tests the deployed gateway using synthetic data, including concurrent duplicate requests and forged JWT rejection. Delete only its recorded synthetic request and matching notification job after verification.

Edge deployment bundle: `index.ts`, `lib/referrals/policy.ts` as `policy.ts`, `lib/school-review.ts` as `school-review.ts`. No duplicated checked-in validation logic.

Remaining: real staff email/session end-to-end check after SMTP; full referral account/auth and document workflow, contract lifecycle, statement calendars/ledger, donor/student and other participation intake, email delivery monitoring. Remove Our work page only when backend work is complete, as requested.
