# Delivery receipts — 25 October 2026

Implemented on `codex/forge-website-redesign`. Website deployments, the shared URL, existing public customer tables and general email activation were not changed. No customer email, payment or signed document was created by this work.

## Completed

- Dedicated `forge-notification-webhook` version1 validates the original bounded body with the pinned Resend SDK, including signature/timestamp replay checks. Missing configuration rejects every request. It ignores open/click tracking and stores no message body, subject or recipient address.
- Private immutable `notification_provider_events` evidence is independent of worker completion. Exact duplicate receipts are idempotent; conflicting replay fails. Out-of-order delay/delivery cannot erase bounce or complaint evidence.
- Staff delivery workspace distinguishes queue state/provider acceptance from verified delivery to the recipient mail server, delay, bounce, complaint and provider failure. No claim that someone read the email.
- Suppression joins signed bounce/complaint evidence with saved provider IDs. Unknown acceptance is separately persisted before the HTTP send, so a crash or lost response cannot silently release a second message to that recipient.
- Recipient-serialized final reservation rechecks suppression after attachment preparation and holds distinct uncertain sends. The original unresolved attempt can recover using the same idempotency key. Definite first-attempt rejections and local failures do not permanently hold unrelated future messages; later rejections do not erase earlier uncertainty.
- Worker version7 installed in the isolated backend. General delivery remains disabled, and scheduling remains uninstalled. No worker secret was read or changed.

## Verification

- 66 Node tests passed; TypeScript passed. Full local 80-page build passed. The final worker-only changes were checked again with Node/TypeScript; no additional public component changed after the build.
- Actual rollback SQL passed provider receipt/duplicate/reorder tests, private staff status, role restrictions, suppression, uncertain acceptance, definite rejection, original recovery and atomic recheck after competing reservation. Test records rolled back.
- Actual existing referral finance SQL regression passed, including 15% of net full first contract, evidence/deposit/payment gates, complete private statements, reviewed working-day calendar, immutable evidence and safe closure. No actual financial record persisted.
- Staff browser checks passed using explicit fictional API responses: finance actions, enquiry review, verified bounce display, reviewed retry, mobile/tablet/desktop fit, denial clearing and sign-out. Real HTTP identity and cross-origin denials passed independently.
- Deployed webhook rejects HTTP503 before its signing secret is configured. Worker rejects unauthorised HTTP401. No valid provider event or inbox delivery is claimed in this phase.
- All 28 redesign tables have RLS enabled. Zero sensitive new RPC grants to PUBLIC, anon or authenticated. Existing seven legacy public-table RLS issues remain unchanged and require production migration review.
- Independent review found unresolved-acceptance correlation, false ambiguity after definite rejection and concurrent check/reserve gaps. Each was addressed with explicit evidence, atomic gating and regression checks. Final review found no remaining actionable issue.

## Secure owner setup pending

Resend → Webhooks → Add webhook:

`https://deblssilgleuiccsgdcy.supabase.co/functions/v1/forge-notification-webhook`

Select `email.delivered`, `email.delivery_delayed`, `email.bounced`, `email.complained`, `email.failed`. Save its signing secret directly in forge-web → Edge Functions → Secrets as `RESEND_WEBHOOK_SECRET`. Keep it out of source/chat and retain `EMAIL_DELIVERY_ENABLED=false` while testing. The owner has been asked to complete this while other work continues.

After the key is saved, use the provider's signed test/replay facility and confirm the event appears with a successful response. A manually posted unsigned request must remain rejected. Then complete reviewed scheduling and supervised activation before claiming automatic proposal delivery is live. Auth SMTP remains separate and unchanged.

## Sources

[Resend signature verification](https://resend.com/docs/webhooks/verify-webhooks-requests) requires the unmodified raw body and signing secret. The pinned installed SDK is `resend@6.34.1`; the handler uses that SDK's actual `headers.id/timestamp/signature` and `webhookSecret` arguments.
