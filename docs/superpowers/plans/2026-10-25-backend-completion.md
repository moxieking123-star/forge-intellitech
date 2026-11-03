# Backend completion only

Owner instruction: complete all remaining backend work before resuming frontend. No shared preview update, website deployment or GitHub push. The earlier visual draft is held privately under private-assets/held-frontend; the active frontend source was restored to the committed baseline. Do not discard that held draft.

- Install the standard Cron/pg_net worker schedule in a paused state. Owner adds the existing worker password directly in Vault; never read or print it.
- Verify a genuine signed Resend event after an authorised admin sign-in email. General queued sending stays disabled until supervised worker verification and rollout.
- Set an audited, researched working-day calendar covering launch and the near term. Do not invent religious or future exceptional holidays. Applied coverage25Oct–30Nov2026 using published Nigerian High Commission calendar; no listed holiday falls in that range. Refresh upon government declaration or before expiry.
- Remove the preview-only production incompatibility with an explicit FORGE_PRODUCTION_BACKEND_ENABLED release switch. Keep production disconnected by default; retain each individual feature switch. Reject service-role/malformed keys and modern publishable-key formats unsupported by the current JWT-checking Edge gateways.
- Disable obsolete public-schema APIs in redesign mode and prevent fallback to old contact/sponsor/referral tables. Prepare coordinated legacy protection SQL and a caller audit; do not mutate the existing live site's public tables without final rollout approval.
- Run unit, rollback SQL, local preview and local production-mode HTTP/browser checks. Independently review and commit only backend files.

Outstanding owner setup: Vault worker secret, then supervised scheduler verification. Existing shared/live website and deployment settings stay unchanged. Production-domain Auth redirects must be configured during the final approved release, not by wildcard.
