# Approved production activation — 27 October 2026

The owner explicitly approved enabling and publishing the live backend after the activation confirmation. PR #5 merged as `f2cc94a78d141fb8d164a87266de23a1fa9072cc`. Vercel production deployment `dpl_3zjXJSmoPmvxaKwga6oJVVfrHDhe` is READY. The approved design and main's release safeguards are retained. The original immutable tester URL was not changed.

## Connected services

Production now enables schools, referrals, staff agreement review, referral finance, participation enquiries, notification review, proposal queuing and both email sign-in interfaces. The anonymous bridge key and explicit production release switch remain server configuration. No staff account, role, bank payment or financial entitlement was created by activation.

Exact production callbacks are allowed for `/admin/feedback` and `/earn-with-forge` on `https://www.forgeintellitech.com`; the existing local callbacks remain. Both sign-in components explicitly request their own destination, so the global Supabase Site URL was left unchanged.

Available donor, student-support, movement, school and contact forms use the reviewed private services. Work with Forge's application hold remains intentional; its future assessment/training dashboard is outside this launch. Bank-transfer instructions do not verify payments. No automatic payout is enabled.

## Fresh verification

- All 72 Node tests passed again.
- Local browser sign-in states, duplicate-click prevention and assisted school onboarding passed with intercepted fictional data. The real local API denied assisted onboarding without a session.
- Live HTTP checks passed: both configuration endpoints HTTP200; invalid intake HTTP400; unauthenticated private actions HTTP401; retired legacy APIs HTTP410; malformed feedback HTTP400. These checks created no records.
- All 29 private tables have RLS enabled. The seven retired public intake/blog tables also have RLS enabled and deny anonymous SELECT.
- The exact proposal PDF exists in private `forge-school-proposals` storage.
- Three clearly labelled internal live tests saved with actual receipts: movement enquiry HTTP201, school intake HTTP201, proposal HTTP202. Worker dispatch 197 returned HTTP200, accepted3, failed0, pausedfalse. Each outbox receipt is sent after one attempt with a provider ID and no error. Internal school/enquiry records are retained for review and explicitly say they are not customer requests.
- The ten-minute worker schedule remains active. Queue acceptance is distinct from proof that a person opened the email.
- The live admin button showed sending and success after one request to the existing admin mailbox. No private email link/code was inspected or consumed. The owner must open the newest email to complete their own sign-in.

Historical pre-release notes in other files describe earlier disabled states. This activation record supersedes those states, not the underlying security rules.
