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
