# Referrer sign-in readiness — 25 October 2026

Local branch only. The owner added the exact local redirect URL in Supabase. Local referrer email sign-in is enabled for verification. No shared-preview or production website changes were made.

## Completed

- Failed email-link callbacks now show a fixed, understandable recovery message. Expired/used links specifically invite a new link.
- Provider error text is never reflected into the page. Failed callback fields are removed from the address bar; unrelated query parameters remain.
- Successful token callbacks remain untouched for Supabase to consume.
- Staff and referrer browser session storage remain separate.
- Validation: 54 Node tests passed, TypeScript passed, diff whitespace check passed.

## Sign-in handoff verification

The first real email request returned HTTP 200 and the owner opened it. Supabase confirmed a new authentication event, but no referral account was created; the owner reported no signed-in account on the page. Do not treat that first attempt as a successful end-to-end sign-in.

Reproduced a callback race: clicking the account anchor while the public configuration request is pending overwrites the token fragment before automatic session detection. A browser regression passed a normal return and failed the immediate-anchor scenario before the fix.

The client now captures the complete callback before asynchronous configuration, removes callback credentials from the address bar, verifies the captured session using Supabase, and retains the callback in memory for transient retries. A new callback clears only the referrer cache so a failed attempt cannot silently load an older referrer account. Staff storage is separate. A failed connection provides retry and explicit fresh-sign-in recovery. Outgoing email requests use the exact allowlisted path, without an anchor.

Passed after the fix:

- All 56 Node tests, TypeScript, full 80-page local build, and diff whitespace checks.
- Browser callback regressions with fictional identities: normal return; account anchor used during delayed configuration; failed first configuration followed by retry with a different older account cached. Every verification request uses the callback identity. Callback credentials leave the address bar.
- Mocked mobile onboarding browser: signed-out gate, school/contact/review steps, unchecked consent and authority, authenticated submission without a client-supplied owner ID, saved reference and mobile fit. No real school or bank record was created by this UI test.
- Actual local onboarding API rejects an unauthenticated assisted request with HTTP 401.
- Actual rolled-back database assertions: all ten checks pass, including central queue attribution, payment-profile prerequisite, consumed-link rejection, cross-owner rejection, duplicate-school atomicity, school authority, link cap, service-only access and account isolation. The original test was updated to satisfy and explicitly assert the newer payment-profile requirement.
- Independent review identified loss of the captured callback on transient failure; fixed and covered by the retry regression. Follow-up review found no remaining actionable issues.

A fresh actual sign-in email was accepted after the fix (HTTP 200), with return URL `http://localhost:3009/earn-with-forge`. A subsequent read-only database check confirmed the owner's real referral account was created and is active, with a referral number. No school referrals or payout profile were created in that real account. This verifies the inbox-to-referral-account backend handoff; the positive onboarding browser checks remain explicitly fictional, supplemented by the actual rolled-back database assertions. No callback credentials were requested, read or copied into chat.

## Local setup and remaining owner verification

1. Completed by owner: in forge-web → Authentication → URL Configuration → Redirect URLs, add exactly `http://localhost:3009/earn-with-forge`. Existing admin return URLs and Site URL stay unchanged.
2. Enabled `REFERRAL_EMAIL_LOGIN_ENABLED=true` only in the local server process; provider and shared deployment settings were not changed by this step.
3. With an owner-controlled test email, request a link from the local referral page. Open it in the same browser used for the local site and confirm the signed-in account loads. Test sign-out and a used/expired link.
4. Complete the owner journey: generate a school-specific link, assisted onboarding, payout profile, private agreement download/upload, staff review, and owner-visible status. Use fictional school records, avoid real financial approvals, and retain/clean test records according to the existing audit rules.

Shared and production destinations require their own separately reviewed settings later. General queued notification sending remains disabled; these sign-in emails use the already configured Supabase Auth SMTP connection.
