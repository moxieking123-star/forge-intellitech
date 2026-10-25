# Finish delivery reporting safely

User authorises completing the website today without repeated approval, while preserving the branch, shared preview and live site. Continue the existing isolated backend; no website deployment or automatic email activation.

1. Verify delivery webhook signatures with the provider SDK and its replay protection, on the original bounded request body. Test invalid, stale, duplicate, reordered and failed-persistence cases.
2. Store minimal immutable provider-event evidence in a private RLS table, independently of outbox completion. Expose a service-only idempotent recording function and delivery summaries to authenticated staff.
3. Before each queued provider send, check for an earlier bounce or complaint linked to the recipient. Fail closed on unavailable suppression checks. Never reclassify provider acceptance as delivery or inbox reading.
4. Show accepted/delivered/delayed/bounced/complained/failed evidence in the private notification workspace. Retain its staff authentication and safe-retry rules.
5. Run no-network tests, rollback SQL and local browser checks; independently review, commit locally. Prepare/deploy only the dedicated isolated webhook handler if possible, without enabling emails or changing either website deployment. Give exact secure signing-secret setup instructions when the endpoint exists; a missing signing secret must reject every event.

Ruling: do not collect email opens/clicks or full webhook bodies; store provider IDs, event IDs, event type and timestamps only. Auth SMTP events without application outbox matches cannot change any account or grant access. General mail remains disabled until the owner has configured the signed callback and scheduled activation is verified.
