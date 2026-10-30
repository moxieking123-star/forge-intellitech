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
before a production pilot. Session storage supports hashed tokens, a maximum
two-hour lifetime, explicit revocation and active-trainee checks. The token issuer
and verified-identity exchange are still pending; never call session creation from
an unverified browser request. Audit writers are not implemented yet.

Verification: `node --test tests/recruitment-store.test.mjs` uses a fake Sheets
service and exercises configuration guards, locks, persistence, duplicate/conflict
checks and literal text. It does not prove installation or live Google execution.
Next: verified-identity trainee sign-in, invitation delivery, restricted dashboard
routes, and complete isolated pass-to-training integration tests. No operational
staff account or employment role should be created from an assessment pass.

## Branch checkpoint — 30 October 2026

Session creation/revocation and lookup are covered by fake-Sheets tests, including
expired and suspended identities. `lib/recruitment/invitation.ts` prepares a
plain-text training welcome for a validated recipient and fixed dashboard URL;
it neither sends mail nor creates a login. The invitation outbox sender must
remain disabled until that destination supports verified trainee sign-in.

Still required, in order: verified-identity exchange and restricted trainee view;
invitation claim/send/settle with provider idempotency; isolated end-to-end pilot;
question editorial approval; training-path selection and reviewed two-week content.
Then resume the recorded dashboard/student work, followed by deferred school
grading, exports and parent views. These later requirements remain unimplemented.

### Verified handoff checkpoint

`lib/recruitment/handoff.ts` now orchestrates verified identity lookup, confirmed
provisioning lookup, random token generation and a signed `trainee.session`
exchange. The matching `TrainingSession.gs` validates the signature, time window,
one-use nonce and exact stored trainee identity before creating a session.
`forgeTrainingGetMyEntry_` exposes only the current trainee's restricted entry
state; it does not call operational user refresh or accept a browser role.

These are tested building blocks, not a deployed login screen. The website now
has a disabled `/api/recruitment/handoff` POST endpoint and server adapter that
uses Auth.getUser, the private provisioning lookup and the signed exchange. The
lookup SQL in `training-identity.pending.sql` is NOT applied or database-tested.
It is intentionally outside the migrations directory to avoid accidental release.
The dashboard frontend entry, private token transport/session lifecycle UI and
Google test installation remain to be connected. No Google HTTP dispatcher or
email worker invokes these handlers yet. Keep invitations disabled until the full
destination works. `TRAINING_SIGN_IN_ENABLED` must remain unset.

Handoff tokens must travel only in private no-store responses and authenticated
POST bodies or a suitably configured secure session cookie; never email them,
append them to a URL, log them or put them in analytics. The server must obtain
identity through Auth.getUser and provisioning from private storage. An injection
interface in a unit test is not a substitute for those production adapters.
