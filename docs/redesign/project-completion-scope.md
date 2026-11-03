# Forge project completion scope — owner update, 27 October 2026

This is persistent project memory. The owner has expanded completion beyond the public website: the project concludes after the instructor employment/training journey and the dashboard improvements below are completed and verified. Current priority is the instructor journey; do not replace it with the later student/attendance work.

## Confirmed access and current sources

- Google Drive is connected. Operational workbook: **ForgeITs Operations For All Schools**, ID `1aQyRddZlyCtkClQ3BMS2N5aFIWv7a6A5tlqw-1kH_I4`. Metadata read 27 October; 57 tabs, Africa/Lagos timezone. No student/staff personal rows needed for initial schema review.
- Existing development workbook: **ForgeITS DEV**, ID `1ote5xxD7RkJ3qL-UQbFfQlXS6QGcfMUbxeOsA69VXO0`; last provider modification date is 9 October, so do not assume it represents current production.
- Local source: `C:/Users/Forge/Downloads/Forge_Dashboard_Full_Code`, includes Apps Script server files, index.html and student.html. API_VERSION in the local DashboardApi.gs is 2026-10-05.1; validate freshness before changing a deployed project.
- Current dashboard frontend repository: https://github.com/moxieking123-star/ForgeITS_Dashboard. Public app host: https://app.forgeintellitech.com.
- Owner supplied the current script project: https://script.google.com/u/0/home/projects/1eZmkoN63wexGtwJbjKaJ-LuBqNk6ZJodGAIMZ6jf6og9RgAP39qmtBx0/edit . Read-only editor inspection of Auth.gs and DashboardApi.gs completed; private working copies remain excluded from Git. The current editor still contains the unknown-role instructor fallback, so the trainee boundary is required, not merely an old-copy concern. Editor inspection does not prove which saved version is deployed.
- The 8 October local handover describes an EXISTING Supabase student portal alongside the Apps Script operations backend. Preserve that arrangement; no new migration is authorised. Older handover business statements can be superseded by the owner's current instructions.

## Work order and completion requirements

1. Instructor recruitment, assessment and training journey described in docs/superpowers/specs/2026-10-27-instructor-pipeline.md and its implementation plan. Owner approved starting on 27 October. Five minutes, 30 questions, 23/30 to pass, three started attempts then audited staff reset. No automatic employment/operational instructor privileges from a screening pass.
2. Major main-dashboard visual upgrade, following the approved direction of the planning examples while retaining real branding and role boundaries.
3. Student dashboard: make lessons, assignments, submission location/instructions and task states immediately understandable. Distinguish to do, submitted, needs revision/review, completed. Improve the learning experience based on the owner's report that students struggled with the existing portal.
4. Full, accurate lesson notes and guided practice; age/programme-appropriate small games that demonstrate each topic. Students should understand what to try, how to practise, what to produce and where to submit. Useful YouTube learning links must be verified and attached to the relevant task/topic.
5. Correct week/topic mapping and teaching content through week8. Determine the actual term dates/classes/programmes from the approved curriculum and schedules; do not infer missing real teaching events from synthetic examples.
6. Repair attendance, check-in/out, school arrival/leaving and their views/logic. Requested made-up realistic week1–8 data belongs in a clearly labelled DEMO/TEST workbook or dataset with fictional people and exclusion from payroll, deductions and live attendance reports. Real missing records require source evidence and audited corrections; never silently present fictional activity as actual staff/student attendance.
7. Friendly student name-correction UI with ownership checks and an audit trail. Restrict it to correcting names, not changing school, identity, role or credentials.
8. Give Seyi/Sheyi the reviewed ability to add students and issue the appropriate codes, through explicit permissions and an audit trail rather than broad administrator access. Resolve the actual staff account before changing its rights.
9. Major task-view update: helpful verified YouTube links, clear instructions and visible statuses showing completed work, remaining tasks and work awaiting review.
10. Keep the dashboards fun and memorable without making learning or submissions harder. Include mobile, keyboard and reduced-motion accessibility.

## Current audit findings

- Operational Instructors headers include PIN, Password_Hash and Dashboard_Access. Two View_Pages columns appear in the header; record this for compatibility review, do not silently delete/reorder them.
- Current local accessFor_ falls back to instructor for unrecognised roles. Never add a trainee into the operational Instructors table and assume a label restricts access. Use a separate restricted trainee identity/action path and explicit server enforcement.
- Tasks already has submitted/reviewed/status columns; extend the existing workflow rather than throwing away its history.
- Upload_Invites already stores a Code_Hash and expiry/status fields. Determine its intended school-upload use before considering any reuse for trainees.

No production sheet rows, accounts, attendance entries, grants or deployments have been changed by this memory update.

## Owner addition — seminar learners and lesson design, 29 October 2026

- Add a separate student entry/sign-in route for learners met at Forge seminars. A learner supplies their own email and uses a PIN already issued by Forge; after verification they can receive the appropriate student sign-in code. This must not become unrestricted self-enrolment, expose reusable PINs, or bypass the existing student identity/safeguarding rules. Exact PIN/code lifecycle will be designed against the existing student portal before implementation.
- Their student dashboard should follow the SS2 experience, with different learning tracks based on the learner's interests. Track selection must map to approved learning content and appropriate age/level support; it must not give instructor or other students' access.
- Redesign lesson notes around understanding, guided practice and enjoyment. Explain JavaScript, HTML, CSS, Python, project management and the other approved topics using familiar everyday experiences the children recognise, practical demonstrations and small games. Use a clear loop: a relatable example, a short explanation, a worked example, a guided try, an independent challenge, feedback and reflection.
- The owner also said “dif”; retain that wording as an unresolved topic name. Do not silently expand it into an invented curriculum topic. Resolve its meaning when the student-content phase reaches that topic.
- Preserve the earlier requirements for easier lesson discovery, clear assignment/submission steps, meaningful task states, verified supporting videos, name correction, Seyi's scoped student/code tools and demo-only attendance examples. Do not lose these while delivering instructor onboarding.
- Current work order is unchanged: continue the employee/instructor onboarding journey first. These student additions are recorded for the subsequent dashboard/lesson work, not a request to switch tasks now.

## Owner addition — results and parent visibility, 30 October 2026

Deferred until the previously requested instructor journey and dashboard/lesson work are complete. Record these requirements now; do not implement them ahead of the existing work.

- Instructors can enter assessment/test and examination scores. Support school-specific weightings, such as 40% continuous assessment and 60% examination, rather than assuming one scheme fits every school. Validate totals and score limits; preserve raw marks and the scheme used for each published result. Record who changed a scheme, when and why; prevent silent changes to already published results.
- Generate a school/class Excel results compilation and downloadable individual child reports when requested by the school. Include marks, participation and relevant learning evidence/questions. Restrict exports to authorised school/class scope and protect downloads containing children's information.
- Parents can see their own child's learning questions and the answers given. Define this as a parent-safe learning record, distinguishing student questions, instructor replies and assessment responses; do not expose other children, private safeguarding notes or unreleased assessment answer keys. Verify the parent–child link before access.
- Additional proposed improvements to review in that phase: draft/review/publish result states; missing-mark warnings that distinguish absent, exempt and not yet assessed from zero; a score preview before publication; an audited correction history; learner progress and practical next-step suggestions; accessible mobile parent reports; and export column/weighting labels that make calculations understandable. These are proposals, not already built features.
- In progress/final updates, keep reminding the owner of the remaining phases and their order. Never describe deferred results features as complete.
