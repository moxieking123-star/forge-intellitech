# Recruitment assessment and training dashboard — deferred owner requirements

**3 November 2026 update:** The owner authorised lesson development using the three supplied PDFs. The current scope and explicit added TechUp subjects are recorded in [curriculum brief](recruitment/curriculum-brief-2026-11-03.md). Two 14-day starter courses, a Canva workbook and interactive preparation screens are now implemented locally on the instructor branch. This supersedes earlier lesson-content deferral; it does not activate the live dashboard or make Days 2–14 server submissions available.

**Updated implementation reference, 27 October 2026:** The owner approved starting. Current rules are 30 questions, five minutes, at least 75% (23/30), and three attempts followed by a staff-only reset. The destination is app.forgeintellitech.com. These replace the earlier counts/threshold/timing proposals below. See [current design](../superpowers/specs/2026-10-27-instructor-pipeline.md), [implementation plan](../superpowers/plans/2026-10-27-instructor-pipeline.md) and [execution ledger](recruitment/progress.md). First domain validation/assessment modules and16tests are implemented locally; persistent services, public screens and trainee provisioning are not complete or deployed. Historical deferred requirements below are retained as context, not the current implementation status.

Recorded 25 October 2026. This is project memory for the separate Forge dashboard phase. The owner explicitly excluded it from the website launch dependency and instructed us not to implement the dashboard now. Continue the existing website/backend completion first.

## Intended journey

- A new Work with Forge applicant completes the application form and proceeds to a general technology knowledge assessment.
- Use 60 multiple-choice questions covering basic technology, AI/ML terminology, technology fields, fintech and related general knowledge. Exact wording such as the spoken “MML” needs editorial clarification before authoring the question bank.
- Require at least 70% (42 correct answers out of 60) before forwarding the application to Forge. Do not silently change the current recruitment form until this separate flow is built and verified.
- The owner mentioned conflicting timing examples: 60 seconds, five minutes and an unclear reference to 30 seconds. Assessment duration remains undecided; do not encode one as approved.
- Successful applicants receive a pre-activation training profile in the Forge dashboard, onboarding instructions and a training calendar. A training profile must be clearly distinguished from confirmed employee status.
- Applicants log in to a dashboard with lessons, assignments, timed exercises/tests and progress tracking, similar in usability to the student dashboard but written and designed for adults.
- Learning materials should already be available for people joining during November 2026. Weekly live classes are intended to start 1 December 2026; time, timezone, facilitator and joining destination remain to be supplied.
- Include Chisanbop video instruction and practice, HTML/CSS, Excel lesson notes, relevant YouTube resources and thoughtful practical exercises that test understanding and preparation to teach. The spoken “HIA AI” topic needs clarification before defining lessons.
- Support remote preparation and training before school assignments, reducing the need for in-person meetings.
- Enable communication with the chairman, CEO and other people specifically permitted by the CEO; implement explicit access rules when this phase starts.

## Decisions for that phase

Confirm assessment duration, retry/accommodation rules, question bank and scoring review, training content, calendar, profile destination/integration and staff communication permissions. Server-authoritative timing/scoring and controlled profile creation will be necessary; client-only scoring must not determine access.

No assessment, training account or new dashboard functionality has been implemented by recording this brief. The current website launch remains a separate scope.
