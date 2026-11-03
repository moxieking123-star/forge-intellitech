# Private feedback dashboard implementation plan

**Goal:** Let the authorised administrator read, filter and export tester reviews.
**Architecture:** Reuse staff sign-in at /admin/feedback. A same-origin server endpoint passes verified sessions to the existing isolated backend; an admin-only database function returns bounded pages without session identifiers.
**Constraints:** Existing branch only. No Vercel deployment, shared-link change, public navigation or production schema changes. Email login remains disabled pending secure mail setup.

- [x] Test filter validation and spreadsheet-safe CSV output.
- [x] Build admin-only SQL reader and authenticated API bridge; verify privileges and filters in rollback-only SQL tests.
- [x] Build responsive dashboard using existing staff authentication, with page/section/reaction/visitor filters, search, pagination and CSV export.
- [x] Run tests, production build and browser checks; document access prerequisites and commit on existing branch.
