# Forge launch review — 27 October 2026

## What is built

- Responsive public website: company story and leadership, gratitude to Jehovah, four then-and-now hero stories, products, school programmes, movement initiatives, stories/blog, contact, partnerships, privacy and terms. Shared navigation, all six supplied social profiles and accessible reduced-motion behaviour are present.
- Programme explanations for ElyTech and TechUp, primary/junior/senior learning paths, illustrative interactive activities and support journeys. School enquiries, self-onboarding and signed-in referrer-assisted onboarding reach the private backend.
- School proposal email gate, private PDF attachment, parent-message customisation, downloadable materials and manual WhatsApp sharing.
- Endless Possibilities with Launchpad, in-school Launchpad, laptop offers and student support, internships, government-school seminars and contribution routes. The new weekend-space/power offer records contact, area, capacity, availability, facilities, electricity/generator/fuel arrangements and the contributor's authority/conditions; it routes to movement enquiries. Review precedes any student attendance.
- Referrer email-link accounts, per-school referral links, attribution, payment profile registration, agreement download/upload timestamps, staff review, contract evidence, one-time 15% of net full contract value, audited financial review and statement requests. Payments remain an authorised staff process.
- Private staff workspace for schools, enquiries, agreements, finance, tester feedback/filtering/export and delivery receipts. Queued Resend notifications, signed provider webhooks, retry/suppression controls and scheduled delivery are connected; Zoho remains the inbox service.
- New-logo multicoloured O browser icons, tightly framed and exported at 16/32/48/64/180/192/512 pixels. The previous full-wordmark favicon and missing 512-pixel icon reference are replaced.

## Final fixes and verification

Raised programme learning panels now have internal padding, columns that can shrink, and wrapping suited to phone widths. The same edge-spacing issue in movement contribution panels was repaired. Donation instructions have a separate route so the recruitment hold does not block contributors.

`browser-results.json` records 35 public routes, 140 viewport checks (320/390/768/1440), 50 linked internal targets and a successful intercepted space-offer submission. No detected horizontal overflow, text beyond raised boxes, broken in-page fragments or missing main headings remained. The form test created no real enquiry or email.

`asset-link-results.json` records 41 referenced source images/icons with no missing files. External destinations responded successfully except the two LinkedIn URLs, which rejected automated HEAD checks (403/405). These are the supplied public company and CEO URLs; their logged-in platform presentation requires a human browser check. A platform access restriction is not represented as a successful external test.

All 72 Node regression tests passed. These exercise validation, routing, owner access, staff actions, document handling, statement rules, notification signatures, retries and provider evidence. The full 82-page webpack build and TypeScript passed. All 48 interactive programme states passed at 320/768/1440 pixels, together with contribution navigation and donation-instruction checks. The existing staff sign-in and private finance/enquiry/delivery browser regressions passed; real HTTP identity and cross-origin checks denied unauthorised access to all four reviewed private routes. No email, payment or enquiry was sent by those browser fixtures.

## Security review

The official npm production-dependency audit reported zero known vulnerabilities at check time. This is a point-in-time dependency result, not a penetration-test guarantee.

The fresh Supabase review identified a mutable trigger-function search path and unnecessarily public execution of the RLS event-trigger helper. The helper's public/anonymous/member execution was revoked and the timestamp trigger's search path fixed to pg_catalog; fresh privilege checks and a second advisor scan confirmed those warnings cleared. The event trigger itself and existing account roles were retained. Exact SQL is recorded in `../backend/final-function-hardening.sql`.

All private application tables retain RLS; service-only tables intentionally have no ordinary-user policies. Anonymous access to retired public intake/blog tables is denied. Existing checks cover unauthorised staff access, foreign-owner requests, cross-origin writes, bounded input/files, private proposal storage and signed email worker/webhook requests. No service credential was added to public code.

The remaining Auth advisor warns that leaked-password protection is disabled. The website's staff/referrer interfaces use email links rather than password fields. Review that provider setting before introducing password-based access. Relevant guidance: https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection

## Outstanding operational items

1. Supply the approved About/TechUp/ElyTech video URLs when ready; the YouTube channel link is active, but embedded programme films are not invented.
2. Recruitment assessment, training/employee dashboard and internal communications remain a separate project. The Work with Forge application hold is intentional, not an active form. Its planned reopening date must match actual readiness.
3. WhatsApp sharing currently opens a draft for the school to send. Automatic API delivery is not claimed. Donations use bank-transfer instructions; the site does not verify payment automatically.
4. Notification safety policy currently allows 40 new queued messages per rolling 24 hours across queues. Above that, records stay saved and mail waits. Review this against expected ad traffic and the email provider quota before a high-volume campaign. The worker normally runs every ten minutes.
5. Refresh the reviewed Nigerian working-day/holiday calendar before its existing 30 November 2026 coverage ends, and after applicable exceptional public-holiday declarations, so five-working-day statement promises remain correctly calculated.
6. Google Analytics is consent-gated. Confirm access to the existing property and agree ad conversion events/attribution before relying on campaign reporting. Platform-specific advertising pixels are not represented as configured.
7. A final human check of the private sign-in email in the owner's own browser and of the supplied LinkedIn destinations completes the checks that cannot be substituted by unauthenticated automated browsing.

The original immutable tester URL remains unchanged. Production publishing uses the approved GitHub/Vercel project and preserves all approved visual work.
