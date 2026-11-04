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
