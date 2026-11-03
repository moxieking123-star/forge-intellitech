# Welcome automation and app-host connection — branch preparation

The owner authorised implementation, with no deployment or change to the shared tester URL. Daily lesson content is deferred. Everything below is staged for review; the public app route and automatic sender have not been activated.

## What is built

Confirmed assessment passes already queue a signed Google provisioning job. The new private worker processes one provisioning job and one welcome job per call. Welcome claims require a matching passed application, confirmed provisioning event, trainee ID and verified recipient email. The message is versioned, plain text, addressed only from the private queue and replies to work@forgeintellitech.com. It directs the recipient to:

`https://app.forgeintellitech.com/instructor-training/join/training`

This is a training invitation, not an employment offer. It contains no bearer token or password. The recipient signs in with the same email; identity and profile checks still apply.

The queue migration adds locked leases, immutable recipient snapshots, provider acceptance IDs, bounded errors, exponential backoff, an eight-attempt limit and an attention state. Uncertain sends stop after 23 hours from the first claim, inside Resend's documented 24-hour idempotency window. A repeated acknowledgement is safe; a stale lease cannot settle someone else's job. `sent` records provider acceptance, not proof of inbox delivery. Automatic provider delivery/bounce reconciliation for this new queue is not connected by this change.

The POST worker at `/api/internal/training-worker` requires its own 64-hex server secret and explicit automation flags. It accepts no application ID, recipient or email content. No scheduler or sender is active. A release-only SQL script can create the private one-minute scheduler after its secret is in Vault.

## Existing app compatibility

Read-only inspection confirmed that app.forgeintellitech.com serves the existing ForgeITS Operations frontend on Vercel. The operational Apps Script source was downloaded into ignored local storage for inspection only; it was not edited or deployed. The current dashboard must keep its root route.

A dedicated build from this branch uses `/instructor-training` as its base path, including scripts, images, auth callbacks and API calls. It has its own instructor frame and links back to the existing operations root. The original website build keeps an empty base path. Separate build output prevents the local training build from replacing the website's local output.

`integrations/dashboard-host/generate-training-rewrite.mjs` merges only the exact namespace and its descendants ahead of the existing app rewrites. It preserves the rest of the existing hosting configuration and refuses unsafe targets or duplicate training rules. A reviewed deployment HTTPS root URL is required; there is no guessed public target. Browser tokens remain in the existing memory/session storage arrangement and are never forwarded through a navigation URL. The dedicated build allows only the fixed app origin for proxy requests; arbitrary forwarded-host headers confer no trust.

## Verification

183 automated tests pass, including production-workbook isolation. A local PostgreSQL/PGlite integration run verifies the migration: service-only execution, confirmed-profile gate, claim exclusion, stale leases, immutable snapshots, idempotent acceptance, retry cap, changed email/test-application rejection and the 23-hour stop. It also runs the queue through the actual sender core with a mocked Resend response, persists its provider receipt and confirms a second run sends nothing. No Supabase schema was changed and no real welcome email was sent. The full trainee browser flow passed under the namespaced local server and compiled production build, including save/reload and feedback. The final namespaced production build and TypeScript checks passed.

To repeat the local database test, install `@electric-sql/pglite` into the ignored `private-assets/sql-harness` directory with npm's `--prefix` option, then run `node --experimental-strip-types tests/training-invitation-queue.integration.mjs`. It creates an in-memory PostgreSQL database and closes it afterwards.

## Release steps — approval required before any public action

1. Review the branch and daily-content/assessment readiness separately. Keep the existing public recruitment gate disabled until the question forms are approved.
2. Create a separate training deployment from this branch, with the values in `integrations/dashboard-host/training.env.example`. Enter keys securely, never in chat. Existing Resend secrets in Supabase are not automatically available to a Next.js deployment; the approved sender needs its Resend key in the new deployment's server environment. No email key was retrieved during this work.
3. Create a separate production training workbook from the versioned schema and a standalone training script. Keep the operational workbook/script untouched. Set `Training_Config.Environment=production`, the matching `TRAINING_ENVIRONMENT=production` script property, its explicit workbook ID and signing key. The bridge refuses a production setting pointing at the pilot workbook. The default remains test; no production workbook or bridge was created in this branch task. Deploy that reviewed bridge only with approval. Then apply `20261031152236_recruitment_training_invitation_delivery.sql` to forge-web after reviewing the local SQL evidence. Neither action alone activates the welcome sender.
4. Add exact Supabase Auth return URLs for the app training route and, if using its staff page, `/instructor-training/admin/training`. Preserve existing return URLs. The new route is not an operational Apps Script login and grants no instructor/staff role there.
5. Generate and review the namespace rewrite against the existing operations project's configuration, then publish it only with approval. Do not change the operations root, DNS or the old shared preview.
6. Test a controlled owner sign-in, programme restoration, submission and feedback through the actual app hostname. Test the worker's unauthorised response and anonymous trainee/staff denial. Set `TRAINING_DESTINATION_READY=true` only after these pass.
7. Securely configure one worker secret both in the training deployment and a Vault entry named `training_worker_secret`. Configure the verified `FROM_EMAIL` under auth.forgeintellitech.com, Resend key and signing key in server settings. Enable email, provisioning, invitations and automation only after the controlled email pilot is approved.
8. Run the release-only scheduler SQL. Check one acceptance ID and actual mailbox arrival, then observe retries/attention records. The owner pilot's existing attention invitation must not be silently re-queued as a genuine assessment pass.

Rollback: disable TRAINING_AUTOMATION_ENABLED first, disable invitation/provisioning flags, then stop only the named training scheduler. Remove only the two namespace rewrites if the new app route must be withdrawn. Keep queue/audit records and the existing operations dashboard intact.

Remaining after this branch work: approved activation on the app hostname, real welcome-email pilot and delivery/bounce reconciliation, then the deferred daily lesson content and later student-dashboard requirements.

Reference: https://resend.com/docs/dashboard/emails/idempotency-keys
