# Saved trainee work — isolated local pilot, 31 October 2026

Programme selection, Day 1 practice completion and written assignment submissions now persist in the isolated Google training TEST workbook. The operational dashboard and its workbook remain untouched. The existing isolated test bridge was updated to version 4; no website deployment was made.

## Behaviour

- Choosing ElyTech or TechUp saves the selection and opens that preparation view. Reopening the entry restores it.
- Practice completion is explicitly self-reported, separate from assessment results, review and employment status.
- Written submissions accept 30–1,200 characters. Each revision is retained as an append-only event; the latest submission for the selected programme is displayed with its server timestamp and awaiting-review wording.
- Programme histories remain separate when changing programmes. The current release contains a full starter activity for Day 1 only; the other days remain an outline.
- A failed save preserves the mounted draft. Retrying unchanged work reuses its request ID. Refreshing before a successful save can still lose an unsaved draft; the page asks users to keep a copy until confirmation.
- Assignment files, persistent practice quiz answers, staff marking and later lesson content are not implemented by this change.

## Access and storage

The local POST endpoint requires a same-origin request, bounded exact-shape JSON and the memory-only trainee bearer issued by the verified handoff. The server signs a timestamped, nonce-bound envelope. Google verifies the signature before opening the workbook, then validates the hashed session, expiry, trainee status and workbook configuration under the script lock. The client supplies no owner or trainee ID.

`Training_Work` stores request ID, trainee ID, programme, lesson ID, operation, literal text, payload hash and server timestamp. Conflicting request-ID reuse fails; identical retries return current state without a duplicate event. Selection is reconstructed from the durable event log so an interrupted profile-column update can be repaired. All reads are scoped to the authenticated trainee and chosen programme. Formula-like text uses the existing reversible literal encoding. The service does not grant school or staff permissions.

## Verification

173 automated tests pass. Tests cover cross-trainee isolation, malformed commands, altered signatures, expired requests, unknown sessions, unavailable lessons, duplicate/conflicting request IDs, formula-like text and programme history restoration. The real fictional Google pilot saved and restored programme, progress and submission, including an idempotent retry. The browser fixture verifies programme choice, practice feedback, saved progress, failed-save draft retention, retry ID reuse, restoration after reload, both programmes, mobile fit and sign-out. TypeScript passes.

Next: staff review and feedback, the remaining two-week lessons, automated invitation delivery and mounting the trainee journey on the dashboard host. Public recruitment remains gated pending those release requirements and question-bank approval.
