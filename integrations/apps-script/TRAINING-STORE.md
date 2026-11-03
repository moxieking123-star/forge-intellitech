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
lookup SQL was subsequently applied as migration
`20261030064706_recruitment_training_identity_lookup.sql` and tested using
fictional records inside BEGIN/ROLLBACK. Anonymous/authenticated execution was
denied and service-role execution confirmed. All fixtures were rolled back.
The dashboard frontend entry, private token transport/session lifecycle UI and
Google test installation remain to be connected. No Google HTTP dispatcher or
email worker invokes these handlers yet. Keep invitations disabled until the full
destination works. `TRAINING_SIGN_IN_ENABLED` must remain unset.

Handoff tokens must travel only in private no-store responses and authenticated
POST bodies or a suitably configured secure session cookie; never email them,
append them to a URL, log them or put them in analytics. The server must obtain
identity through Auth.getUser and provisioning from private storage. An injection
interface in a unit test is not a substitute for those production adapters.

### Local entry and invitation checkpoint

`/join/training` now has a gated entry screen: existing applicant email sign-in,
explicit profile confirmation, in-memory-only trainee credential, session expiry
and local sign-out. ElyTech/TechUp pathway explanations are visible after a valid
handoff. Programme selection and lessons are clearly marked as not yet connected;
no unsaved selection is presented as enrolment. Floating feedback/video/mascot
overlays are excluded from this private entry. It uses the existing website auth
client; it is not yet mounted at app.forgeintellitech.com. The welcome template
must not be sent while that destination lacks the trainee route.

`invitation-delivery.ts` now prepares validated queue jobs, stable provider keys
and receipt settlement with bounded error codes. It refuses even to claim jobs
when disabled or the training destination is unready. A database lease/settlement
adapter, provider sender/receipts and bounded retry policy are still required;
there is no running invitation sender or cron. A stable key alone does not prove
provider deduplication outside the provider's retention window.

Verification: local browser fixture with fictional Auth and handoff responses at
1440/768/390 pixels, no horizontal overflow, no trainee bearer in web storage,
correct local sign-out and disabled unconfigured email login. This is not a real
Supabase/Google/Resend end-to-end sign-in. Test workbook writes remain disabled.

### Connection checkpoint — 30 October 2026

Created standalone Google project **Forge Instructor Training TEST Bridge**,
script ID `12ugqlxLyi-OUFfZmMEERTammdX7pROaOZNqkQfGbOZAZ5_EXQ4kEaGD8`.
The four tested GS modules and manifest have been uploaded through clasp. The
operational script project was not edited. The test project's Script Properties
are not yet configured; no sheet writes, session creation or email has occurred.
The local test signing key is stored only under ignored private-assets and must
never be committed, printed, pasted into chat or embedded in Apps Script source.

Before the first real test: owner adds the test workbook ID and signing key through
the Google test project's Script Properties, runs `forgeTrainingConnectionCheck`
and approves Google's spreadsheet-access consent. That check only reads the test
schema. Configure the local server with the same signing key and test endpoint,
keep hosted website feature flags off, then enable writes on the isolated test
workbook for a fictional provisioning/session pilot. The local server still needs
its Supabase server credentials through secure configuration; no production env
file was downloaded or secret exposed by this checkpoint.

Test deployment v1 endpoint:
`https://script.google.com/macros/s/AKfycbw6bkEa7310aSRravvVz8eN8_2jKvNatPvW0RHpeBWYZ5W8wCwIdPja7U6GF55KOA/exec`.
Unsigned probe currently receives Google's 403 authorization page, with no trainee
data. This is not yet proof of application-level rejection or successful signed
execution: owner consent/configuration is pending. Local `.env.local` contains
the matching test key and endpoint, with all recruitment/training switches false;
existing local configuration is never overwritten by setup. This file is ignored.
No production server environment or domain was changed.

### Real Google pilot verified

After owner consent, an unsigned probe returned the application's generic JSON
rejection (HTTP200), rather than Google's authorization page. Enabled writes only
on the isolated training workbook and ran a labelled fictional profile through
the signed Google endpoint: provisioning acknowledged, reused nonce rejected,
fresh signed retry returned the same trainee ID, changed email rejected, and a
restricted session was created. Pilot metadata/report stays in ignored
private-assets; its identity source is explicitly fictional, not Supabase Auth.

Local training sign-in is enabled with the correct public forge-web key; public
application/assessment and hosted feature switches remain off/unchanged. The auth
configuration route now supports training independently of public recruitment.
No actual sign-in/welcome email has been sent in this pilot yet. Still waiting
for the localhost training return URL and local private backend credential.

Automatic approval rejected a full development-environment download because it
could extract unrelated secrets. No environment download occurred. Requested
owner approval for retrieving only the required service-role credential (or owner
entry through secure local configuration). Do not work around that rejection by
fetching every secret separately. The Resend sender and real email receipts still
require their own verified integration; SMTP acceptance alone is not delivery.

Owner subsequently confirmed the local training return URL was saved. Supabase
accepted one `shouldCreateUser:false` sign-in email request for the existing owner
mailbox with return URL `http://localhost:3009/join/training`. Local test server
was started on port3009. Await mailbox delivery and signed-in UI confirmation;
no welcome invitation was sent. Private service-role credential approval is still
pending, so the profile handoff from that real account is not yet verified. The
test bridge pilot above used a fictional identity and cannot substitute for it.
Latest branch checks:162 unit tests and TypeScript passed.

### Real owner sign-in pilot completed

The owner explicitly approved retrieving only `SUPABASE_SERVICE_ROLE_KEY` from
the connected Vercel project. Retrieved that single variable, checked its
forge-web/service-role claims, and saved it in ignored local `.env.local` without
printing it. Did not retrieve Resend credentials or download the environment.

Used the existing verified owner mailbox with one clearly labelled test-only
application/attempt (payload `testOnly=true`), not a genuine assessment decision.
Application ID `82d34efe-5f22-4dbf-9524-c7fe2b48ecf5`; event ID
`c4c5eb15-36eb-4a65-83ff-99e18bafe27c`; Google trainee ID
`TRN-480ca9d7-4f2e-4116-838c-8fd7c3e91523`. No staff grant or new Auth user.
Keep this fixture identifiable and remove/archive it during pilot cleanup rather
than treating it as a successful real applicant.

The sign-in email reached the mailbox: the owner followed it, and browser UI
showed the verified email signed in. The real browser POST then verified Auth,
read the private provisioned identity, established a signed Google session and
displayed **Trainee entry confirmed** with both pathway cards. The route returned
HTTP200. Screenshot saved privately as `recruitment-training-real-signin.png`.

Found a real timing issue: Google completed a profile write after the previous
12s transport deadline. Safe retry reused the profile, then acknowledged the
queue. Raised the single shared redirect budget to30s (still bounded); successful
real handoff took23.7s. Added regression coverage and a60s route execution cap.
Further performance tuning is still needed before public release.

The test invitation was queued only after provisioning, then moved to attention
so it cannot be picked up as a real welcome. No welcome email was sent. Real
SMTP magic-link delivery/return and restricted entry are verified; the automated
welcome sender/provider receipts are NOT. Next work: programme enrolment,
reviewed training content, invitation sender/receipts, final assessment editorial
review and controlled pilot cleanup. Subsequent student/dashboard/results scope
remains in project-completion-scope.md. Hosted flags/links/deployments unchanged.
