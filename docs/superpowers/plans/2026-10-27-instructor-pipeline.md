# Forge instructor pipeline implementation plan

> **For agentic workers:** Use superpowers:executing-plans to implement task-by-task only after owner approval. No implementation or production change is authorised by this planning artifact.

**Goal:** Move verified applicants from the public website through a reliable basic assessment into restricted instructor training, preserving current Apps Script/Sheets operations.

**Architecture:** New application/assessment records use the current website backend; existing dashboard and training data remain in Sheets. A signed, replay-resistant server bridge provisions a trainee exactly once. A role-separated trainee view at app.forgeintellitech.com cannot access operational staff functions.

**Tech stack:** Existing Next.js/TypeScript website, existing Supabase Auth/private backend for new recruitment records, Resend, existing dashboard HTML/JavaScript, Google Apps Script/Sheets/private Drive. No wholesale migration.

**Spec:** ../specs/2026-10-27-instructor-pipeline.md

## Global constraints

- Planning only until the owner approves the design and implementation scope.
- Thirty MCQs; five-minute server deadline; pass at 23/30; three started attempts, then audited staff reset.
- At least ten reviewed comparable forms; no political questions.
- Preserve existing school/student/parent/staff/finance accounts and data.
- Never trust client scores, role choices or applicant IDs for authorisation.
- Passing creates eligibility for trainee access, not employment or school deployment.
- No shared preview update or production release without an explicitly agreed rollout for this separate feature.

## Review focus

Concurrent tabs, interrupted saves and timer expiry; spoofed/replayed handoff events; duplicate applicant/profile creation; mobile interruptions and staff reset; trainee access to other people's or operational records. Each task below owns the corresponding tests.

## Phase 1 — Inspect and define the integration contract

**Inputs:** Website app/join/apply/page.tsx, existing lib/server and auth/notification patterns; dashboard index.html, student.html and docs/forge-talent-pipeline-spec.md; actual Apps Script project and private spreadsheet structure still to be supplied.

**Output:** Proposed docs/redesign/recruitment/integration-contract.md in this repository and a matching reviewed dashboard contract. No live code changes.

- [ ] Obtain read access to Apps Script server source, current deployment configuration and sheet schemas. Do not request credentials in chat.
- [ ] Map current token creation/expiry, per-action authorisation, existing trainee support, role grants and private upload handling. Confirm whether the app host is a static frontend to Apps Script.
- [ ] Inventory current staff/student/parent/school smoke tests and create a separate test workbook/deployment for the new flow.
- [ ] Specify authoritative fields and stable applicantId/traineeId mapping, versioned event schema, signing representation, nonce expiry and processed-event retention.
- [ ] Verify with contract tests that a client cannot choose its role, impersonate another ID, or invoke operational actions through trainee access.
- [ ] Review the contract with the owner before executable work; resolve focus-loss policy, training-day calendar, skill minimum and retention policy.

## Phase 2 — Applicant identity, draft and question bank

**Proposed website files:** components/recruitment/Application.tsx; lib/recruitment/application.ts; lib/server/recruitment.ts; app/api/recruitment/application/route.ts; tests/recruitment-application.test.mjs. Reuse current auth and bounded/origin-checked route conventions rather than creating another generic contact endpoint.

**Interface:** saveApplication(verifiedUser, validatedFields, campaignId) -> applicantId, assessmentStatus. Identity comes from verified server auth; clients cannot set staff status.

- [ ] Write failing tests for unverified access, duplicate submissions, malformed input, consent, edit ownership and sensitive-field exclusion.
- [ ] Create reviewed private recruitment tables through the normal migration workflow, with RLS/service-only marking keys and no public answer-key read policy.
- [ ] Implement stable applicant IDs, assessment_pending drafts and a clear incomplete/complete distinction. Explain the assessment before form submission.
- [ ] Author/review the first 300 questions and ten topic-balanced forms; check answer rationale, ambiguity and current Nigerian legal sources.
- [ ] Test schema validation and bank export: no browser payload contains correctness or the unused full bank.
- [ ] Commit after the tests pass and owner reviews representative questions.

## Phase 3 — Assessment engine and staff follow-up

**Proposed files:** lib/recruitment/assessment.ts; lib/server/recruitment-assessment.ts; app/api/recruitment/assessment/{start,answer,submit}/route.ts; components/recruitment/Assessment.tsx; app/join/assessment/page.tsx; tests/recruitment-assessment.test.mjs and tests/recruitment-assessment.browser.mjs.

**Interfaces:** startAttempt(user, applicantId, requestId) -> attemptId, deadline, questionsWithoutKeys; saveAnswer(user, attemptId, questionId, optionId, requestId); finishAttempt(user, attemptId) -> passed/notPassed/pendingReview. Proposed exact names are locked in the phase1 contract before coding.

- [ ] Write failing tests for 22-vs-23 scoring, server deadline, shuffled options, omitted answers, expired requests, duplicate start/submit, fourth start denial and concurrent tabs.
- [ ] Implement atomic attempt allocation/numbering, unused-form selection, deadline enforcement and idempotent answer persistence. Record exact bank/form versions.
- [ ] Implement accessible timer/navigation, truthful saved/unsaved state, final auto-submit and interrupted-return behaviour. Never silently spend an attempt on page prefetch.
- [ ] Add staff-only status filtering, follow-up and reasoned reset; preserve attempt history and an accommodation route. Mark incomplete records factually, not as cheating.
- [ ] Test route departure, reload, temporary blur, phone interruption, slow/offline save, clock tampering and stale-tab answers. Enforce only the reviewed policy.
- [ ] Pilot wording and timing with a small varied group; compare form difficulty before allowing the quiz to control invitations.
- [ ] Commit after backend and phone/browser tests pass.

## Phase 4 — Signed provisioning and invitation

**Proposed website files:** lib/server/recruitment-bridge.ts; app/api/recruitment/handoff/route.ts; private provisioning outbox/receipts through reviewed migrations; tests/recruitment-bridge.test.mjs. Proposed dashboard additions: a documented Apps Script bridge module in the verified server project and docs/recruitment-bridge.md; exact server filenames depend on phase1 discovery.

**Interface:** provisionTrainee({eventId, schemaVersion, applicantId, verifiedEmail, displayName, eligibleForTraining}, signatureEnvelope) -> traineeId, created|existing. Browser-supplied role or marking claims are rejected.

- [ ] Write failing tests for altered signatures, expired/replayed messages, duplicate events, partial sheet writes and collisions with existing users.
- [ ] Add allowlisted action validation, server-side secrets, short locking and repairable deduplication states. Preserve every existing dashboard login action.
- [ ] Queue pass events atomically; retry with stable event IDs and surface failures to staff. Do not send an account-ready email before provisioning acknowledgement.
- [ ] Extend the existing notification worker with a reviewed recruitment invitation template/queue. Its current internal-enquiry and proposal templates do not already authorise arbitrary applicant emails. Bind the destination to the verified applicant and invitation record, preserve idempotency/provider receipts, and review the current 40-new-messages/day safety budget before onboarding campaigns.
- [ ] Implement invitation acceptance and a short-lived single-use identity-bound handoff. Reusable tokens/passwords never appear in email URLs.
- [ ] Test trainee-only session scopes, same-user redemption, expired/used links, email failure/retry and account creation exactly once.
- [ ] Verify existing staff/student/school/parent flows against the test deployment and approve a rollback procedure.
- [ ] Commit after integration tests pass without altering production sheets.

## Phase 5 — Programme selection and training ground

**Proposed dashboard units:** dedicated trainee view/module (for example trainee.html if consistent with repository conventions), training API actions in the verified Apps Script project, isolated training workbook/tabs and staff oversight additions. Avoid growing index.html with unrelated inline logic if the existing deployment can serve focused modules.

**Interfaces:** getMyTraining(session); chooseProgramme(session, programme, declaredSkills, supportNeeds); submitMyAssignment(session, assignmentId, evidence); reviewSubmission(staffSession, submissionId, feedback). Every method derives ownership and permissions server-side.

- [ ] Write tests for unassigned programmes, own-data isolation, required support declaration, assignment dates, late submissions and unauthorised staff review.
- [ ] Build ElyTech/TechUp selection, skill declaration and diagnostic practical tasks. Do not claim missing skills are disqualifying when Forge intends to train them.
- [ ] Co-design and review the minimum two-week curriculum with the owner. Add lessons, videos, practical tasks, responsible AI work, reflection and daily feedback only after content approval.
- [ ] Store profiles/progress/submissions/reviews in private training Sheets/Drive; neutralise formula-like input, validate file size/type and deny foreign-owner access.
- [ ] Add staff daily-review queue, notifications, revision requests and an audited human approval for school readiness. No automatic employment/payroll creation.
- [ ] Test one complete ElyTech and one TechUp learner journey with fictional records; regression-test existing dashboard roles.
- [ ] Commit after content, permissions and browser checks pass.

## Phase 6 — Pilot and controlled release

- [ ] Run end-to-end scenarios: pass, nonpass, never started, abandoned, expired, three attempts, audited reset, broken handoff, duplicate callbacks and retried email.
- [ ] Verify a trainee cannot see schools, payroll, bank records, other trainees or internal messaging not explicitly allowed.
- [ ] Load-test the expected recruitment burst; measure Apps Script quotas/locks, website database concurrency and email queue capacity. Keep assessment autosaves off the operational spreadsheet.
- [ ] Confirm retention/privacy wording, support contact, question-bank reviewers, facilitator roster, feedback response window and reset permissions.
- [ ] Review the working preview with the owner, then request the separate production rollout approval. Preserve the current public recruitment hold until the complete journey is verified.
- [ ] Release behind feature switches with reconciliation alerts and a tested switch back to the holding page. Monitor early applicants; do not delete their data as a rollback mechanism.

## First practical action after plan approval

Inspect the actual Apps Script backend and its spreadsheet layout in a separate test environment. This is the dependency that decides how trainee sessions and profile provisioning can safely fit the existing dashboard. Do not begin by moving data or replacing the current login system.
