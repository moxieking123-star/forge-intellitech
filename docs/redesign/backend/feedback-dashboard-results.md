# Private feedback dashboard — 23 October 2026

## Delivered

- `/admin/feedback`, linked from the private school workspace. Reuses staff authentication and session storage; no public navigation or sitemap entry.
- Newest-first, 50-response pages. Filters: page, section, reaction, optional visitor type, literal comment search. Apply, clear and refresh controls; explicit empty/error/loading states.
- Filtered CSV export, maximum 5,000 matching responses. Larger exports require narrower filters. Cells are quoted and spreadsheet formula prefixes neutralised. Session identifiers are never returned or exported.
- POST-only same-origin API, bounded request bodies, verified Auth identity at the backend, active administrator allowlist and bound user ID checked on every database read. School-reviewer accounts cannot read feedback. No service credentials enter the browser.

## Verification

- 26 Node tests passed, including filter bounds/unknown fields and CSV quoting/formula safety.
- Production webpack build passed, including TypeScript and `/admin/feedback` plus `/api/staff/feedback` routes. Existing legacy Supabase environment warnings remain; they did not fail the build.
- Rollback-only SQL fixture test passed: authorised filters, count/pagination, omission of session IDs, wrong account/unlisted account/reviewer denial, and revoked anonymous/authenticated function execution. No new fixture data persisted.
- Playwright against local production server: mocked authenticated UI tested sign-in gate, filter submission, pagination, export, empty/error/clear states, 1440/768/390 px overflow checks, and sign-out clearing.
- Real HTTP checks (not mocked): missing session 401, invalid session 401, cross-origin 403.
- Existing administrator email login was NOT exercised: secure mail configuration and provisioned staff Auth account remain prerequisites. No real emails were sent.
- Security advisor: no new feedback-reader finding. Existing legacy public-table RLS errors and legacy function/auth advisories remain outside this scope. Private redesign tables intentionally have no ordinary user policies, using service-only operations instead. Reference: https://supabase.com/docs/guides/database/database-linter?lint=0013_rls_disabled_in_public

## State and access

Source is on `codex/forge-website-redesign`. The service-only feedback SQL function was installed in the isolated redesign backend and the existing test school Edge Function updated to support its authenticated read actions. The feedback collector and its permissions were not changed.

No Vercel deployment, production promotion, shared alias/protection change, or shared URL change. The new dashboard is therefore not present on the immutable tester deployment.

Local server: http://localhost:3008/admin/feedback . Sign-in is intentionally disabled until Zoho SMTP, allowed redirects and `admin@forgeintellitech.com` Auth provisioning are securely completed. Enable `STAFF_EMAIL_LOGIN_ENABLED` only after testing mail delivery. Runtime requires `VERCEL_ENV=preview`, `SCHOOL_BACKEND_ENABLED=true`, and the existing publishable `PREVIEW_FEEDBACK_ANON_KEY`; never substitute a service key.

Until login is ready, the owner can read existing reviews at https://supabase.com/dashboard/project/deblssilgleuiccsgdcy/editor — schema `forge_redesign_test`, table `preview_feedback`.

Ruling: keep this commit local rather than push, because GitHub pushes can trigger Vercel branch previews and the user asked for branch-only work without a deployment.
