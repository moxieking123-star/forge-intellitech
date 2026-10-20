# Editorial homepage design QA

final result: passed

Scope: responsive homepage, product logo/status row and the new TechUp/ElyTech programmes page. This is approval to review a branch implementation, not approval to release the full website.

## Evidence and comparison state

- Source visual truth: `docs/redesign/editorial/homepage-reference.png`, 1054 × 1492 pixels.
- Same-width implementation: `docs/redesign/editorial/desktop-reference-width.png`, 1054 × 2014 pixels, browser viewport 1054 × 1492 CSS px, default device scale 1. Initial homepage state: menus, stories, product dialogs and movement disclosure closed; cookie banner previously dismissed.
- Full comparison: `docs/redesign/editorial/comparison-final.png`, source left, implementation right, both normalized to 700px wide. The extra height is the user-requested product row plus the retained movement disclosure and company footer, absent from the reference crop.
- Focused original-density comparisons: `hero-comparison.png` and `lower-comparison.png` in the same directory. These put source and rendered regions in one input so typography, image treatment and controls can be inspected. Lower sections are intentionally displaced by the added product row.
- Additional captures: `docs/redesign/verification/desktop-final.png` (1440 × 2444), `mobile-final.png` (390 × 3465), and `mobile-opening-final.png` (390 × 1000). Mobile is a responsive interpretation because no mobile source was supplied.
- Programme captures: `docs/redesign/editorial/programmes-390.png` and `programmes-1440.png`. The mobile capture is 390 × 2428 pixels.

## Findings and fixes

No outstanding actionable P0/P1/P2 findings in this scope.

1. Initial comparison: programme rows, masthead and movement band had excessive height; laptop crop cut off the right edge. Reduced vertical padding, made masthead height responsive and anchored the campaign image crop to the right. Post-fix screenshots preserve the continuous orange wall and show the whole laptop.
2. Subsequent same-width comparison: moving the opening into alignment caused “built here.” to wrap onto two lines, and the newsroom title also gained a line. Reduced the desktop heading scale slightly, preserved the four explicit heading lines and widened the first newsroom column. Final recapture confirms the four-line opening and two-line newsroom title.
3. The temporary plain product names were replaced after the user authorised image generation instead of unavailable Figma. All four logos now use actual transparent image assets; status messages appear only when clicked.

## Required fidelity surfaces

- Typography: locally hosted Manrope Variable, bold display headings and readable body copy. The opening follows the reference's four-line arrangement and underlined orange “here.”. The exact mockup font was not supplied; current weight and scale are a close implementation rather than an asserted exact font match. Mobile wraps longer movement text naturally.
- Spacing/layout: split opening, full portrait studio image, outlined statement, ruled programme rows, added compact product row, full-width campaign and dark newsroom retain the chosen hierarchy. Mobile stacks the opening, products and stories; checked at 320/390/768/1440px without horizontal overflow.
- Colours/tokens: warm cream, deep forest ink and orange follow the source. The laptop campaign uses one generated photographic background, not a boxed image or code-drawn illustration. Mobile places the photograph below its copy, preserving a continuous orange section.
- Images/assets: original studio and laptop scenes follow the reference composition; subject crops and transparency were inspected. The new approved Forge-only logo is retained instead of the old logo pictured in the reference. Generated product marks are optimized WebP with PNG sources retained. No image placeholder remains.
- Copy/content: main headlines and calls to action follow the selected source. Longer movement copy draws from the user's essay “The Future We Keep Waiting For”; practical opportunity, Nigerian responsibility and exposure remain central, without claims that technology automatically eliminates crime or poverty. Company and movement are distinguished. Product descriptions are deliberately omitted from the row; statuses follow the user's brief. Programme page distinguishes primary ElyTech from secondary TechUp. No impact numbers or attributed quotes were invented.

## Functional and technical verification

- Final `npm run build` completed successfully, including TypeScript and all 31 generated routes.
- Browser regression passed: responsive layout, image loading, anchors, mobile modal navigation, Escape, focus restoration, scroll lock, movement disclosure and newsroom expansion.
- Each product opens the correct status: BiteBank, Trego and Forge All-In “In development”; Forge TechUp Dashboard “Testing”. Focus and keyboard dismissal passed for all four.
- Donor, partnership and school enquiry prefills passed without form submission. `/programmes`, `/techup`, `/join` and `/launchpad` returned HTTP 200.
- Rendered homepage title, description, canonical, social image and parsed JSON-LD checked. See `docs/redesign/editorial/seo-checks.md` and `docs/redesign/verification/browser-results.json`.
- Browser error collection was empty. `git diff --check` passed with Windows line-ending notices only.

## Limits and follow-up

Figma, Writing Style retrieval and Firecrawl calls returned unavailable. The user explicitly authorised another logo tool and supplied original writing directly; the implementation does not claim Figma authorship or a plugin crawl. SEO was inspected locally. Supabase credentials remain absent, so live database/email submission is unverified. The build's outdated Browserslist notice remains non-blocking. No full accessibility audit or ranking result is claimed.

P3 follow-up: vector refinement of the approved raster product marks and final social-preview crop selection can follow brand review. Remaining legacy pages and dedicated donor/student workflows remain part of the full-site brief. Keep all work on `codex/forge-website-redesign`; production release requires explicit final approval.

Local preview: `http://127.0.0.1:3001`. Start with `npm run build` then `npm run start -- --hostname 127.0.0.1 --port 3001`. Browser checks: `node scripts/verify-homepage.mjs <agent-browser-binary>` (loopback only).
