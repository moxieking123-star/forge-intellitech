# Endless Possibilities Implementation Plan

Goal: create a convincing movement page in the approved editorial Forge design, grounded in the founder's essay and device programme rules.

Architecture: server-rendered Next.js route with scoped CSS, reuse the approved orange laptop photograph and shared Forge masthead/footer. One small client component lets visitors choose how they can contribute. Native FAQ disclosures provide detail. Existing contact enquiries are the handoff; dedicated forms and animation are subsequent work.

- [ ] Add `/endless-possibilities`: orange photographic hero; reflective opening; student-first matching process; Windows laptop requirements; full-year learning; verified founder stories; contribution selector; FAQs and closing invitation.
- [ ] Link homepage campaign, masthead/footer and school page to the movement. Add specific enquiry contexts, metadata and sitemap entry.
- [ ] Browser-check widths 320/390/768/1440, role changes, FAQs, menu and enquiry handoffs. Do not submit data. Build and compare visual composition with the approved editorial homepage.
- [ ] Save QA evidence and push only to `codex/forge-website-redesign`. Never deploy or merge.

Copy constraints: distinguish company and movement, no invented results or stats, no promises that devices automatically solve crime, no drafted contract or published unreviewed liability clauses. Explain verification and the year of training, sponsor updates and supported handover accurately. Use user-supplied original prose as the voice reference.

Future page requirements captured from this turn: About Forge and TechUp/ElyTech school programmes need user-supplied YouTube advertisement links (exact URLs pending; never guess). Programmes must persuasively explain practical skills and teaching, internet provision, dashboard integration, Saturday live class and downloadable student records/projects as a leaving-school portfolio. Add interactive animated explanations in the deferred whole-site animation phase. Keep content lead-oriented without inventing curriculum, fees or service coverage.

## Updated structure and completion

The founder's subsequent instruction expands this into a landing page plus five initiative pages. Implemented: the movement hub, annual LaunchPad (2025 recap and 2027 planning), Give a Child a Laptop (the detailed original page), In-school LaunchPad (TechUp partner schools), Intern with Forge (post-SSCE partner-school pathway), and government-school creativity seminars. All are under `/endless-possibilities/`. The hub prioritises ideology and participation; device rules remain on the laptop page.

Build and TypeScript checks passed with all 37 routes. Movement browser suite and homepage regression passed, including all initiative links, enquiry prefills without submission, unknown-route 404, legacy LaunchPad redirect, device FAQ and six contribution choices. Source and image review are recorded in `docs/redesign/endless-possibilities/README.md`. Final visual evidence and contrast refinement are recorded in the root design QA report.

Follow-up: dedicated donor/student intake forms and verified submission delivery; company and school-programme detail pages; approved YouTube links (not yet available); deferred whole-site animations. No deploy, merge or production data changes.
