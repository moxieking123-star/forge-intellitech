# Instructor training test store

`TrainingStore.gs` supplies the storage interface used by `RecruitmentBridge.gs`.
It is branch code, not installed in the operational Apps Script project.

The adapter requires an explicit workbook ID, exact headers from
`training-store-schema.json`, the schema marker, `Environment=test` and a boolean
`WriteEnabled=true`. There is no active-workbook fallback. The private empty pilot
workbook currently has writes disabled. Do not enable it in the operations workbook.

Provisioning runs under a script lock. Pending events survive interrupted calls;
the bridge can find an existing profile before completing the receipt on retry.
Event payload bindings cannot change, nonces are stored as hashes, and ambiguous
duplicate identities fail closed. All profiles have trainee access only. User text
is encoded when necessary to prevent formula evaluation, then decoded on read.

The adapter deliberately stops at 10,000 rows per tab rather than scanning an
unbounded sheet. Nonce retention/cleanup and capacity monitoring must be added
before a production pilot. Sessions and audit tabs are reserved schema only:
trainee session issuance, revocation and audit writers are not implemented yet.

Verification: `node --test tests/recruitment-store.test.mjs` uses a fake Sheets
service and exercises configuration guards, locks, persistence, duplicate/conflict
checks and literal text. It does not prove installation or live Google execution.
Next: verified-identity trainee sign-in, invitation delivery, restricted dashboard
routes, and complete isolated pass-to-training integration tests. No operational
staff account or employment role should be created from an assessment pass.
