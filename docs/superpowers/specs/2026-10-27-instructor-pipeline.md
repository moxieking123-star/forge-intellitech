# Forge instructor application and training — outcome and design

Planning only. Prepared 27 October 2026. No recruitment feature, database change, dashboard update or deployment is authorised by saving this document.

## Intended outcome

A verified applicant completes a short technology screen, accepts a training invitation and reaches the appropriate instructor training workspace at app.forgeintellitech.com. Forge can distinguish people who never started, were interrupted, did not pass, passed, or need help. Training produces evidence of practical skill and teaching ability; a human decides whether the person is ready for school deployment. Existing dashboard records and operational accounts continue working throughout.

## Confirmed current requirements

- Correct destination: app.forgeintellitech.com, confirmed by owner.
- 30 questions in five minutes; no political questions. This replaces earlier 60-question/70% ideas. The owner's final timing statement is used rather than the earlier spoken reference to 30 minutes.
- Passing threshold at least 75%: with equally weighted questions this means 23/30 (76.67%). 22/30 is 73.33% and does not pass.
- At least ten balanced question sets. Start with 300 reviewed questions organised into ten comparable 30-question forms; expand to twenty forms later if useful. Randomise question/answer order without changing difficulty or exposing the key.
- Three started attempts per applicant/campaign; subsequent attempts require an authorised staff reset. The owner explicitly confirmed three attempts, then reset.
- A return after leaving the assessment should get another unused set. Incomplete attempts must remain visible for follow-up, with neutral factual labels.
- Successful candidates receive a welcome-to-training message and onboarding destination, not an employment offer.
- Programme selection: existing website brand names ElyTech and TechUp. Training lasts at least two weeks, about three hours daily, with daily feedback. The curriculum will be developed with the owner.
- Existing Apps Script and Google Sheets dashboard data must not be migrated now. A future migration remains possible.

## Evidence about the existing dashboard

Read-only inspection of moxieking123-star/ForgeITS_Dashboard/main/index.html found a hosted HTML interface that sends action-based requests to an Apps Script /exec deployment. Login supplies ID/email/phone plus PIN/password; returned session tokens authorise actions. It is not safe to assume Google account identity is the current authentication mechanism.

The repository's docs/forge-talent-pipeline-spec.md already distinguishes website recruitment, restricted trainee portal, internal operational dashboard and the unrelated commercial Forge All-In product. Keep those boundaries. A trainee workspace can live at the confirmed app host while using a separate view and server permissions from internal staff.

Actual Apps Script server source, deployment settings and sheet structure have NOT been inspected. Those are prerequisites for an executable integration patch; public HTML alone cannot establish backend security or schema compatibility.

## Recommended architecture: extend, do not migrate

Use the existing website backend for NEW applicant identity/application/assessment/invitation/bridge records. Its existing Supabase services can support those new records without moving anything out of the dashboard. Keep current operational data and the new training records in private Google Sheets behind Apps Script. Use the existing app host for a trainee-only interface.

| Responsibility | Authority |
|---|---|
| Email verification, application, attempts, scores, resets, invitations | Existing website backend, new private recruitment records |
| Question bank and marking key | Private server-side recruitment store; never a browser bundle or public sheet |
| Trainee profile mapping, programme, modules, assignments, feedback | Private training Sheets and authenticated Apps Script actions |
| Existing schools, staff, finance, student/parent accounts | Existing operational dashboard, unchanged |
| Account provisioning receipts and integration retries | Durable website outbox plus Apps Script processed-event log |

If the owner wants all NEW recruitment records in Sheets too, that is a separate alternative: the website still needs a protected server API, durable attempt/timing rules and atomic sheet updates. It is less suitable for frequent public-test autosaves and should be piloted against Apps Script quotas before committing. No migration is necessary in either case.

## Applicant experience

1. Explain the five-minute screen, passing requirement, three-attempt rule and privacy use before collecting the application. Provide a human-support/accommodation route.
2. Verify email ownership using the website's existing email-link identity mechanism before consuming assessment attempts. This prevents an outsider exhausting another person's attempts and avoids asking candidates to open email during the timer.
3. Save form data privately as assessment_pending, with a stable applicant ID. Do not say the application is complete or forward it as a successful application yet.
4. The last form action opens the assessment readiness screen. A deliberate Start action consumes an attempt and begins the server deadline; merely viewing or prefetching a page does not spend a chance.
5. Questions have a numbered navigator, answered/unanswered states, accessible controls, clear save status and a visible timer. Save on question changes and submission; preserve unsent answers visibly if the network fails.
6. At expiry, score answers already received by the server. A forged client score, changed computer clock or refreshed page cannot extend time.
7. A pass creates a durable provisioning event. On Apps Script acknowledgement, queue the training invitation. If provisioning fails, show pass recorded / training access being prepared, then retry; do not tell someone to sign into a nonexistent account.
8. Invitation acceptance establishes only restricted trainee access. Choose a programme and provide an honest skills/support declaration. No applicant or trainee receives internal finance, other people's records or teaching deployment rights.

## Leaving, retries and staff follow-up

Started attempts count whether failed, expired or abandoned; passing closes the screen rather than offering repeated score farming. Each retry uses an unused form. Refresh or a confirmed return after leaving closes the old attempt before a new one starts; it never resets the old timer for free. Duplicate requests and two browser tabs must not allocate two simultaneous attempts.

Browser visibility/focus signals are imperfect: phone calls, screen readers, system dialogs and connectivity problems can resemble departure. Record what was observed, not a conclusion of cheating. Proposed default: navigation/reload produces a new attempt on return; brief focus loss records a signal without immediate forfeiture. Exact focus/grace behaviour needs owner approval and a mobile pilot before enforcement. Closing a page cannot always send a reliable final request; the server records an expired/incomplete session on the next request or scheduled reconciliation.

After three attempts, show a clear staff-contact route. Staff can see never_started, incomplete, timed_out, not_passed or passed, and request follow-up or give an explained reset. A reset is audited, does not erase history, and records whether an accommodation or technical incident applied. Do not erase a failed application or make an irreversible employment rejection solely from a five-minute score.

Five minutes averages ten seconds per item. Use short definitions and scenarios, not long passages. Pilot with real phones and different reading speeds; consider an approved extra-time route. The quiz is a basic screening signal, not sufficient proof of teaching readiness.

## Question blueprint per form

| Topic | Questions |
|---|---:|
| Digital/non-digital technology and computer basics | 5 |
| Cybersecurity habits: phishing, access, passwords and reporting | 6 |
| Nigerian cybercrime/data-responsibility basics | 3 |
| AI terminology, LLMs, limitations and responsible use | 4 |
| Design foundations: pixels, contrast, layout and file formats | 5 |
| Web, data and productivity foundations | 7 |
| Total | 30 |

Each item needs stable ID, approved wording/options, correct option, rationale, topic, difficulty, source where relevant, reviewer and version. Review Nigerian legal material against the Cybercrimes Act 2015 as amended in 2024; do not ask obscure penalties or political trivia. No live AI-generated marking keys. Review quality and similar pass rates across forms before launch.

## Secure handoff and session design

- The website server sends a narrowly scoped signed event to Apps Script. It contains event ID, schema version, applicant ID, verified email, display name and permitted training status, not raw answer keys or unrelated personal data.
- Verify HMAC-SHA256 over a defined canonical representation, timestamp, nonce and payload hash. Apps Script doPost does not offer the same arbitrary request-header interface as a normal Node server; use an authenticated JSON envelope if required by the verified deployment. Do not base authentication on CORS or a secret URL.
- Secrets belong in website server configuration and Script Properties, never JavaScript, sheets cells, browser localStorage or query strings. Script editors are trusted administrators; restrict editor access.
- Persist processed event IDs. Under a short Apps Script lock, create-or-find the trainee by stable applicant ID. A retry returns the existing trainee ID. Do not hold a global lock during network calls; use repairable event/profile states because Sheets is not a transactional database.
- Use short-lived single-use handoff codes bound to verified identity and the intended app origin. Redeem server-to-server and issue a trainee-only session. Never put a reusable password, dashboard session token or service credential in an email URL. Avoid sharing login cookies across unrelated subdomains.
- The existing dashboard staff login remains intact. A new trainee adapter maps to narrowly scoped actions such as own training profile, assigned modules, own submissions and permitted feedback. Every action authorises the server-derived identity, not an applicant-supplied ID or role.
- Use a separate private training workbook/tabs where practical. Treat submitted text as literal text to prevent Sheets formula injection. Private Drive assignment uploads use type/size controls and owner checks; no public student data or bank details are needed during screening.
- Queue/reconcile failed sync and email jobs, with visible staff status and alerts. Keep provider receipts. Use a versioned integration boundary so a future datastore migration changes an adapter, not every UI.

## Two-week training outcome

Proposed model: 14 calendar days x approximately 3 hours = 42 guided/practical hours. This is a proposal, not an approved calendar. If training means ten weekdays instead, the load is 30 hours and the curriculum must be adjusted.

Daily block: 45 minutes guided learning, 75 minutes practice, 30 minutes AI/verification practice, 20 minutes teaching reflection and 10 minutes submission. Completion follows evidence and feedback, not an open browser timer.

ElyTech covers Chisanbop, touch typing, Scratch and Canva, plus explaining concepts to primary learners. TechUp offers Builder, Storyteller and Strategist specialisation with the existing JSS foundations shared across tracks. Ask candidates to declare two or three relevant JSS skills and where they need training; agree the precise minimum before enforcing it.

Week one: orientation, tool foundations, responsible AI, basic projects and explaining a concept. Week two: applied lessons, differentiation, digital citizenship/safeguarding, feedback, revision and a recorded micro-lesson. All tracks need adult-level tasks and practical teaching evidence. A facilitator posts/replies daily; define their roster and response window. Do not fabricate a live-class date or populate unapproved lessons as if final.

Management can see assigned trainees, attempts, resets, programme choice, daily progress, submissions, feedback and sync failures. Final human review approves further training, reassessment or school readiness. Any later staff activation/deployment is a separate authorised transition.

## Sources checked

- Existing dashboard code and talent spec: https://github.com/moxieking123-star/ForgeITS_Dashboard
- Web app execution/permissions: https://developers.google.com/apps-script/guides/web
- Identity limitation: https://developers.google.com/apps-script/reference/base/session
- Quotas: https://developers.google.com/apps-script/guides/services/quotas
- Locking: https://developers.google.com/apps-script/reference/lock/lock-service
- HMAC: https://developers.google.com/apps-script/reference/utilities/utilities
- Nigerian Cybercrimes Amendment: https://cert.gov.ng/ngcert/resources/CyberCrime__Prohibition_Prevention_etc__Act__2024.pdf
- Nigerian Data Protection Act, including section37 on significant automated decisions and human intervention: https://ndpc.gov.ng/wp-content/uploads/2024/03/Nigeria_Data_Protection_Act_2023.pdf
