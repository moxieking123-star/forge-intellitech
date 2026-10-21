# Endless Possibilities — movement hub and initiative QA

final result: passed

Reviewed 21 October 2026. Scope: the movement landing page and five connected initiative pages, on the existing redesign branch. This is not a completed full-site release.

## Visual source and evidence

The approved homepage (`docs/redesign/verification/desktop-final.png` and the supplied editorial source in `docs/redesign/editorial/homepage-reference.png`) is the design-system reference. These new pages extend that system; they are not claimed to be pixel copies of a separately supplied movement mockup. The founder's latest hierarchy and content brief governs the structure.

`docs/redesign/endless-possibilities/design-system-comparison.png` places equal-size opening crops of the approved homepage and new movement hub together (reference left, new page right). Both use 1440 × 1000 CSS-pixel captures at density 1, normalized to 720px wide. The logo, cream/forest/orange palette, typography, photographic treatment and ruled layout were compared in the same input.

Browser-rendered full-page captures are in `docs/redesign/endless-possibilities/`:
- `hub-1440.png` (1440 × 4768) and `hub-390.png` (390 × 6340).
- `laptop-1440.png` (1440 × 6112) and `laptop-390.png` (390 × 8982).
- `launchpad-1440.png` (1440 × 3562), plus a 390px mobile capture.
- Desktop and mobile captures for In-school LaunchPad, Intern with Forge and public-school seminars.

States: default closed FAQs, no modal open, fresh route, cookie banner previously dismissed. Hub default selection is Volunteer; laptop default is Give a laptop. `opening-review.png` provides a six-page opening review at 600px per view. Focused `hub-mobile-opening.png`, `laptop-mobile-opening.png` and `laptop-opening.png` were inspected alongside the full pages. The six-page sheet predates the final student-button contrast refinement; the current laptop captures and contrast comparison are the final evidence for that button.

## Findings and comparison history

No outstanding actionable P0/P1/P2 findings within this scope.

- The founder changed the architecture during implementation. Device details were moved into their own initiative; the movement hub was rebuilt around ideology, participation and five real page links. This is intentional scope alignment, not drift from the earlier laptop-only page.
- [P2, fixed] A newly added student/parent enquiry link crossed the photograph's darker area on desktop. It now has the existing cream button background. `contrast-comparison.png` shows the earlier and final 1440px opening crops together, normalized to 600px wide. The final capture confirms clear separation and legibility; mobile layout and the full movement suite were rerun after the fix.
- Test harness issues corrected: the first browser startup timed out after launch; retry reused the browser successfully. An anchor check needed to allow smooth scrolling to settle; the FAQ uses a direct summary selector after text-locator failure. These were verification harness issues, not claims of application fixes.

## Required fidelity surfaces

- Typography: locally hosted Manrope, bold editorial headlines, restrained uppercase labels and readable paragraph widths. Long initiative names wrap deliberately on mobile. Each route has one H1.
- Spacing and layout: shared masthead/footer, split-image openings, ruled initiative rows, clear eligibility/support sections and sibling navigation. Hub and laptop layouts passed at 320/390/768/1440px; other initiative layouts at 390/1440px. No horizontal overflow or clipped controls observed.
- Colours and tokens: warm cream and forest ink carry the company identity; orange distinguishes the movement's shared-future message and laptop campaign. Student/parent action uses a solid cream treatment for consistent readability. No full accessibility certification is claimed.
- Images: existing studio and laptop illustrations are labelled as illustrative. LaunchPad uses actual old-site archive photographs, inspected before use and compressed to WebP without replacing the originals. No generated participants or fabricated event photos were added. Loaded-image checks passed.
- Copy: founder's supplied essay and current brief guide the reflective, practical invitation. Company and movement are distinct. The 2025 recap uses supported details, omits conflicting attendance counts and does not repeat unconfirmed winner-success claims. The next edition is explicitly 2027 in planning. In-school enterprise and post-SSCE internship pages identify partner-school eligibility; government-school seminars are separate. Device rules remain Core i5 5th generation+, 4 GB RAM+, 128 GB SSD+, Windows, new/used, verified secondary-school need and a full year of training.

## Functional and technical verification

- Final production build and TypeScript completed successfully; all 37 application routes generated.
- `scripts/verify-movement.mjs` passed against the final local build. Evidence: `docs/redesign/endless-possibilities/browser-results.json`.
- Verified donation anchor, six contribution selections, keyboard activation, FAQ disclosure and mobile navigation dismissal.
- Verified hub-to-initiative journey, all five initiative links, breadcrumbs, unique canonicals, loaded images, the old `/launchpad` redirect and unknown-initiative 404.
- Verified student, volunteer, educator, sponsor, patron and four initiative enquiry prefills without submitting any forms or writing production data.
- Homepage regression passed after navigation changes; evidence: `docs/redesign/verification/browser-results.json`.
- Browser error collection was empty. Source whitespace check passed with Windows line-ending notices only.
- React review: server-rendered page/data content; one small stateful participation selector; native buttons and disclosures; no added backend calls, animation loops or dependencies.

## Scope limits and follow-up

Dedicated donor/student intake forms and live delivery verification are the next stage. Supabase credentials are absent locally, so database/email submission remains untested. Formal agreements remain deferred. Existing legacy destination pages still require their planned redesign. YouTube URLs are not ready; no guessed link or empty player was added. Programme-page teaching, internet/dashboard integration, Saturday class and portfolio requirements are recorded in `docs/redesign/content-principles.md`. Larger character/hero/logo animations remain for the agreed whole-site animation phase.

P3 follow-up: review long-form page density with the founder after content approval and refine photography where more initiative-specific assets become available. No further P3 iteration is required for this review handoff.

Local preview: `http://127.0.0.1:3001/endless-possibilities`. All work stays on `codex/forge-website-redesign`; no production deployment or merge is authorised by this QA result.
