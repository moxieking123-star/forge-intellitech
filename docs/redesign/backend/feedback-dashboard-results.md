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
- Initial implementation checks did not exercise real administrator email login. This was subsequently completed through Resend; see the real administrator follow-through below.
- Security advisor: no new feedback-reader finding. Existing legacy public-table RLS errors and legacy function/auth advisories remain outside this scope. Private redesign tables intentionally have no ordinary user policies, using service-only operations instead. Reference: https://supabase.com/docs/guides/database/database-linter?lint=0013_rls_disabled_in_public

## State and access

### Real administrator follow-through, 23 October

Owner completed email-link sign-in in the accessible browser. Real authenticated `/api/staff/feedback` reads succeeded and displayed 4 existing responses across /about, /blog and /products. These were not mocked and no review was added, edited or deleted during verification.

Verified against the actual records: /products returns 2; combined /products + Useful here. Worth building. + Inspired + Student returns 1; literal comment search `connected` returns the expected single /blog review; a nonmatching search returns 0 with the explicit empty state; independent Confused reaction returns the single /about review; independent Looking for work visitor filter returns the /about and /blog reviews; Clear restores all 4. There are not enough real responses to test a second real page, so the earlier mocked pagination test remains the evidence for that control. A previously used/expired sign-in link produced otp_expired; a fresh email link subsequently established the real administrator session.

The active local email-enabled server is now http://localhost:3009/admin/feedback. See staff-email-setup.md. No website deployment or shared-link change occurred.

Source is on `codex/forge-website-redesign`. The service-only feedback SQL function was installed in the isolated redesign backend and the existing test school Edge Function updated to support its authenticated read actions. The feedback collector and its permissions were not changed.

No Vercel deployment, production promotion, shared alias/protection change, or shared URL change. The new dashboard is therefore not present on the immutable tester deployment.

Initial development server was port 3008 with sign-in disabled. The current verified local server is http://localhost:3009/admin/feedback with Resend SMTP, the exact allowed return URL and the administrator account configured. `STAFF_EMAIL_LOGIN_ENABLED` is enabled only on that local process. Runtime requires `VERCEL_ENV=preview`, `SCHOOL_BACKEND_ENABLED=true`, and the existing publishable `PREVIEW_FEEDBACK_ANON_KEY`; never substitute a service key.

The owner can also read existing reviews at https://supabase.com/dashboard/project/deblssilgleuiccsgdcy/editor — schema `forge_redesign_test`, table `preview_feedback`.

Ruling: keep this commit local rather than push, because GitHub pushes can trigger Vercel branch previews and the user asked for branch-only work without a deployment.
