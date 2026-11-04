# Fourteen-day assignments and feedback

Implemented on codex/instructor-recruitment; not deployed.

- Workspace accepts only day-1 through day-14. Request identity remains session-derived; no browser owner identifier is accepted.
- Existing Training_Work rows already include programme and lesson. No workbook schema or Supabase migration is required.
- Reads return completed days plus the latest submission and its exact revision feedback for each day in the selected programme. The legacy Day 1 receipt remains for compatibility.
- Existing staff queue already groups current revisions by trainee, programme and lesson; it now receives submissions for all fourteen days. Previous feedback remains associated with its old revision.
- Daily lesson navigation changes the assignment form. Drafts survive navigation within the open programme page; they are not durably saved drafts. Confirmed submissions restore from the server.
- The UI refuses Day 2–14 writes if the bridge still returns the legacy Day 1 response. Rollout requires both website and Apps Script updates; neither was published in this task.
- No employment, staff privilege or school access is granted by completion or review.

Verification: 27 focused storage, workspace, review and curriculum tests passed; TypeScript passed. The local multi-day browser fixture passed: per-day drafts, completion, submission, feedback isolation, refresh restoration and mobile containment. Only fictional test data is used.

## Isolated staging rollout — 4 November 2026

Owner explicitly authorised this isolated rollout. Updated only test Apps Script project 12ugqlxLyi-OUFfZmMEERTammdX7pROaOZNqkQfGbOZAZ5_EXQ4kEaGD8, existing test deployment now version 6. Production Google workbook/script and operations app remain untouched.

Latest protected Preview: https://forge-instructor-training-5gz79bke3-mos-projects-33d336dd.vercel.app/instructor-training/join/training
Deployment dpl_BW22nAkYqJJmnFnxZxAmD5Zscx5X, READY, Vercel Authentication enabled; source commit 1dfd128. Staging-only Webpack build override retained. Original shared tester link and live website unchanged.

Real signed bridge integration with labelled fictional work passed for days 2, 7 and 14: practice restoration, assignment saves, idempotent retries, staff feedback restoration, stale-review rejection and exact revision isolation. Revising Day 2 leaves Day 14 feedback intact. Request through the protected deployed Preview returned HTTP 200 and confirmed multi-day state from the real isolated test workbook. Browser interactions were previously verified locally with mocked identity/workbook responses, not in the owner's authenticated staging browser.

Found and fixed the old 16 KiB transport ceiling: complete multi-day workspace responses now allow an explicit bounded 192 KiB receipt; default provision/session limit remains 4 KiB. Tests cover a full fourteen-day Unicode response and refusal beyond the bound. TypeScript passed after correction.

Owner must add the exact new Preview training URL to Supabase Auth Redirect URLs before using a new email sign-in link there. No sign-in email was sent during these tests. No production activation occurred.
