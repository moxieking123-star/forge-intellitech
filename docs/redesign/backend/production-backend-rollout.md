# Production backend integration — prepared, not deployed

The new site now supports production without removing preview isolation. Existing website deployments and their environment settings remain unchanged.

## Server configuration for the final approved release

- `FORGE_PRODUCTION_BACKEND_ENABLED=true` is required in addition to the individual feature switches. Without it, production access to the new services is off. Do not set it on the live deployment yet.
- `FORGE_BACKEND_PUBLISHABLE_KEY`: the forge-web **legacy anonymous JWT** already used by the isolated bridge. Current Edge gateways verify JWTs, so modern `sb_publishable_` strings cannot be used as their Bearer token. Secret keys, service-role JWTs and malformed keys are rejected. This is a publishable credential, not a service secret.
- Enable the reviewed features: `SCHOOL_BACKEND_ENABLED`, `REFERRAL_BACKEND_ENABLED`, `STAFF_AGREEMENTS_ENABLED`, `REFERRAL_FINANCE_ENABLED`, `PARTICIPATION_BACKEND_ENABLED`, `NOTIFICATION_ADMIN_ENABLED`, `SCHOOL_PROPOSAL_QUEUE_ENABLED`, `STAFF_EMAIL_LOGIN_ENABLED`, `REFERRAL_EMAIL_LOGIN_ENABLED`.
- Keep the old `REFERRALS_ENABLED` path off. No Next/browser service-role key is required for the new Edge bridges. The existing `PREVIEW_FEEDBACK_ANON_KEY` remains a compatibility setting for the unchanged tester preview.
- Add exact approved production Auth callback URLs when performing the final approved release. Keep working local/admin callbacks. No wildcard return destination is introduced.
- Tester feedback submission intentionally remains preview-only; private staff access to existing reviews works in the enabled production backend.

## Legacy caller audit

The redesigned application journeys submit through `/api/contact`, `/api/sponsor` and `/api/schools/onboard`; school proposal requests use `/api/programmes/proposal`. These use the isolated, service-mediated private schema when their switches are enabled. Missing features fail closed instead of writing old public tables.

Older `/api/launchpad`, `/api/launchpad/apply` and `/api/newsletter` endpoints return HTTP410 in redesign mode. The new application form uses `/api/contact`; no new newsletter signup flow was requested. The old public-schema referral fallback is disabled in redesign mode. Published blog content uses versioned local editorial sources rather than direct public blog-table reads.

Seven old public tables still have pre-existing exposure. The reviewed protection SQL is `legacy-rls-review.sql`; it enables RLS and revokes PUBLIC/anon/authenticated access, including old broad authenticated-write access to blog data. It also revokes the unrelated public security-definer helper. The file refuses execution without a transaction-local approved-cutover marker.

This SQL is deliberately **not applied** while the existing live site's old anonymous table callers remain deployed. Applying it now would change live form behaviour, contrary to the owner's deployment boundary. It must be executed as part of the final approved cutover to the redesigned service routes. No claim that these older live tables are already secured is made.

## Release sequence

1. Signed proposal delivery and Vault/scheduler verification against the isolated backend completed on 25 October 2026. Its isolated queue worker is active every ten minutes; confirm queue contents and provider quota again before approved production traffic. This does not enable production website feature settings.
2. Confirm domain-specific Auth callbacks and all server feature settings on a separately approved deployment configuration.
3. After full website approval, coordinate deployment of the new service routes with the legacy permission change. Apply the guard marker only inside that approved transaction, then run role-denial and form smoke checks. Keep the previous site/database rollback plan available; do not drop legacy records.
4. Recheck the already-enabled email delivery and tested schedule against the approved production traffic and provider quota. No payments or account deletions become automatic.

The schema name `forge_redesign_test` remains intentionally unchanged to avoid silently moving existing evidence/accounts. Its private tables and reviewed service RPCs are the new site's store. A cosmetic schema rename is not a prerequisite for secure operation.
