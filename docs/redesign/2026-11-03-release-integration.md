# Forge public redesign and trainee integration

## Current objective
Prepare the approved Forest & Ivory redesign on GitHub for the eventual release after the trainee journey is complete. Apply the visual system across public pages. Do not deploy production during this task.

## Decisions approved
- Retain Forge as a Nigerian technology company and movement, with the School Program as one connected offering.
- Retain the selected rich illustrative imagery until consented photographs are supplied.
- Forest, evergreen, ivory, beige, sage and burnt orange are the approved palette.
- Homepage enquiry, Earn with Forge, distinct donor and student laptop routes, and a teacher/parent/student application with discovery source.
- The owner authorised frontend implementation and updating the GitHub release branch on 3 November. Live deployment remains deferred until the trainee journey is ready.

## Work completed
- Implemented the new public shell and homepage, company, programmes, products, movement, laptop and contact pages.
- Rebuilt journal listing and article layouts with search, theme filtering, short excerpts, table of contents and related stories.
- Applied palette and shared form treatments to existing curriculum, resource, referral, participation and policy pages while preserving their content and business rules.
- Integrated `origin/main` at `35caff6` and the committed instructor checkpoint `2f47f24`. Dedicated instructor build routing, private administration and feature gates are preserved.
- Public enquiries, laptop requests and device offers use the existing contact endpoint. Explicit visual-preview mode remains available through `NEXT_PUBLIC_FORGE_PREVIEW=true`.
- Existing LaunchPad 2025 records supply the clearly labelled historical proof strip; figures do not represent company-wide totals.
- Restored consent settings and official social destinations. Feedback lives in the footer to avoid covering mobile actions.
- 119 recruitment/training/participation regression tests passed. Other verification evidence is recorded in `design-qa.md` and `forest-review/`.

## Work in progress
Final responsive browser checks and production-build verification. The release branch must not be described as production-ready without the final evidence.

## Outstanding questions
- Confirm the direct business WhatsApp number. Current public contact flow collects a visitor's number and offers email; it does not invent a direct WhatsApp destination.
- Confirm current registration/office details for publication against the authoritative company document.
- Supply consented programme photographs and validated student outcomes.
- Agree donor device preparation, acknowledgment and update arrangements before accepting devices.
- Trainee work committed after `2f47f24`, or still uncommitted in the original checkout, needs a subsequent merge into the release branch.

## Recommended next actions and release rule
Use `codex/forge-website-redesign` as the integration branch for the eventual website release. Merge the remaining trainee changes into that branch, run the combined checks, review the diff and only then release to production with the owner's instruction. Do not deploy an older trainee-only checkout over this design. Do not cherry-pick just a favicon, profile link or training fix and assume the full public redesign is included.

No credentials, private question assets, live records, feature switches, messages or production domains were changed by this frontend task. The original instructor checkout was left untouched.
