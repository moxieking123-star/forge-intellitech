# Recruitment training handoff, version 1

Implementation status: website queue/signing/transport and an offline-tested Apps Script core. The real training-store adapter, isolated deployment, trainee sessions and invitation sender are still pending. No live dispatcher, cron, spreadsheet, Script Property or website release was changed for this module.

## Authority and identity

`forge_recruitment_submit` marks saved answers in the database. A pass inserts one provisioning event in the same transaction, keyed uniquely by application. Repeating submission finds the same event. No browser score, role, email destination or operational employee identifier can create this event.

The payload contains only applicantId, verifiedEmail, displayName, assessmentReceiptId and eligibility=`training`. It creates eligibility for a restricted training profile, not an employee, school assignment, payroll entry or operational instructor account.

## Signed wire representation

The envelope has exactly version, eventId, timestamp, nonce, action, payload and signature. Version is 1, action is `trainee.provision`, timestamp is integer Unix seconds, and nonce is 24 random bytes represented by 48 lowercase hexadecimal characters.

The HMAC input is UTF-8 JSON of this fixed array, in this order:

```
[version,eventId,timestamp,nonce,action,
 applicantId,verifiedEmail,displayName,assessmentReceiptId,eligibility]
```

The key is 32 random bytes configured as 64 hexadecimal characters and decoded to bytes before HMAC-SHA256. The resulting signature is lowercase hex. No key is stored in code, the browser, Sheets cells or request URLs. Test fixtures are not real signing keys.

Verification rejects unexpected keys, invalid identifiers, role injection, oversized fields, non-training eligibility, stale messages older than 300 seconds and timestamps more than 60 seconds ahead of the server. Both runtimes use the same byte representation, including Unicode names. Verification compares the full signature without stopping at the first unequal character.

Transport accepts only a configured HTTPS Apps Script `/macros/s/<deployment>/exec` destination. Redirects are checked before following, limited to Google Script/content hosts, and bounded to three. The receipt is limited to 4 KiB and the total request to twelve seconds. Supabase service credentials are never forwarded to Google.

## Receiver storage contract

`integrations/apps-script/RecruitmentBridge.gs` has no public web handler and is not installed in the current operations project. Its trusted `store` adapter must implement synchronous:

- `withLock(callback)` using a short Apps Script lock.
- `hasNonce(nonce)` and `rememberNonce(nonce, expiresAt)` with one-use records retained for the validity window and bounded cleanup.
- `getEvent(eventId)` and `reserveEvent(eventId, payloadHash)` with a durable pending/complete state.
- `findTrainee(applicantId)` and `createTrainee(profile)` in isolated training storage, never the existing Instructors staff table.
- `completeEvent(eventId, payloadHash, traineeId)` after successful create-or-find.

The event binding is SHA-256 of a fixed payload array, independent of nonce/timestamp/key rotation. Reusing an event ID for different content fails. Retrying the same event with a fresh signed nonce returns the existing trainee. A crash after profile creation but before receipt completion is repaired by finding the existing applicant profile. The receiver rejects a profile whose applicant/email/assessment binding or `access=trainee` does not match.

The actual store must explicitly open a dedicated training workbook, escape formula-like user text, maintain unique application-to-trainee mappings under the lock, cap lookups and preserve recoverable writes. There is no fallback to the active or operational spreadsheet. These requirements are not represented as implemented by the in-memory contract tests.

## Queue and acknowledgements

`forge_recruitment_claim` takes up to five due events using row locks with SKIP LOCKED. A claim has a new random lease token and five-minute lease. Expired leases can be reclaimed with a different token. The sender signs a fresh nonce/timestamp for each attempt while retaining the permanent event ID.

`forge_recruitment_settle` accepts results only for the current unexpired lease. Successful receipts must name the expected event, a `TRN-` trainee ID and created/existing status. It records provisioning and atomically creates one invitation-outbox entry. A repeated matching acknowledgement is safe. Stale or mismatched workers cannot overwrite the result.

Failures retain only bounded codes: bridge_unavailable, invalid_receipt or invalid_event. Retry delay doubles from fifteen seconds. After eight claims, or an invalid stored event, the job requires attention. An invitation is never queued for a failed or unacknowledged provision. The invitation outbox is preparation only: its sender, identity-bound acceptance and provider receipts are not built yet.

## Configuration and rollout boundary

The server adapter uses `TRAINING_BRIDGE_ENABLED`, `TRAINING_BRIDGE_URL` and `TRAINING_BRIDGE_SIGNING_KEY`. No values were set. The disabled path performs no claims or network requests. No cron or public endpoint currently invokes the adapter.

Before enabling: finish the isolated storage adapter and restricted trainee session/action handlers; verify the actual Apps Script deployment version and existing operational-role regression checks; review the draft questions; complete invitation acceptance/email delivery; run a real fictional-applicant pilot; obtain the separate release approval. Keep public recruitment and the shared tester URL unchanged meanwhile.

## Verification evidence

- Node and Apps Script-compatible fixtures verify the same Unicode signature, reject altered/stale/extra-field events and nonce replays, and recover interrupted profile writes without duplicates.
- SQL integration tests use fictional users and rollback all changes. They cover exactly-one pass event, leasing, backoff, stale/expired lease rejection, exactly-one invitation after acknowledgement, idempotent acknowledgement and the eight-claim stop.
- These tests do not establish a live Google Sheets connection or real email delivery.
