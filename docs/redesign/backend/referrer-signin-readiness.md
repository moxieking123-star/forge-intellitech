# Referrer sign-in readiness — 25 October 2026

Local branch only. No shared-preview, production website, auth provider configuration or email sending changes were made in this step.

## Completed

- Failed email-link callbacks now show a fixed, understandable recovery message. Expired/used links specifically invite a new link.
- Provider error text is never reflected into the page. Failed callback fields are removed from the address bar; unrelated query parameters remain.
- Successful token callbacks remain untouched for Supabase to consume.
- Staff and referrer browser session storage remain separate.
- Validation: 54 Node tests passed, TypeScript passed, diff whitespace check passed.

## Before enabling local public referrer sign-in

1. In forge-web → Authentication → URL Configuration → Redirect URLs, add exactly `http://localhost:3009/earn-with-forge`. Keep existing admin return URLs and Site URL unchanged. The UI appends `#account`, a browser fragment.
2. Enable `REFERRAL_EMAIL_LOGIN_ENABLED=true` only in the local server configuration, then restart the local server.
3. With an owner-controlled test email, request a link from the local referral page. Open it in the same browser used for the local site and confirm the signed-in account loads. Test sign-out and a used/expired link.
4. Complete the owner journey: generate a school-specific link, assisted onboarding, payout profile, private agreement download/upload, staff review, and owner-visible status. Use fictional school records, avoid real financial approvals, and retain/clean test records according to the existing audit rules.

This step does not claim that the real emailed referrer journey has passed. It remains gated on exact provider configuration and an actual owner-controlled inbox test. Shared and production destinations require their own separately reviewed settings later.
