# Homepage design QA

final result: passed

Scope: redesigned homepage only. Other destination pages retain their existing design. No production deployment, merge or live form submission was performed.

## Visual evidence

Approved references: `docs/redesign/refined/homepage-desktop.png`, `homepage-mobile-opening.png` and `homepage-mobile-campaign.png`.

Final browser captures: `docs/redesign/verification/desktop-final.png` (1440px wide), `mobile-final.png` and `mobile-opening-final.png` (390px wide). Side-by-side comparisons are saved as `desktop-comparison.png` and `mobile-comparison.png`; approved reference is left, browser implementation right. Desktop images were normalized to 720px wide and mobile images to 390px wide for comparison.

The comparison retained the cinematic opening, Forge-only logo, warm paper sections, ruled programme rows, navy laptop campaign, stories and invitation strip. Initial typography and mobile opening-height differences were corrected and recaptured. Homepage paragraphs now inherit Manrope. No outstanding P0, P1 or P2 defects were identified within this homepage scope.

Intentional adaptations: individual illustrative assets replace the reference's composite imagery; orange buttons use dark labels for contrast; movement requirements and case accounts expand inline; donor interest opens the existing enquiry page until the dedicated donation workflow is built. Image captions identify the future landscape as a vision.

## Verification

- Production build and its TypeScript check passed on 20 October 2026.
- Browser verification passed at 320, 390, 768 and 1440px: no horizontal overflow, missing images or broken in-page targets; one primary heading.
- Mobile menu: modal focus, scroll locking, Escape, focus restoration and movement navigation passed.
- Movement disclosure and case-story expansion passed.
- Donor and partnership enquiry prefills passed without submitting data.
- Existing programme, product and work destinations returned HTTP 200.
- Browser error collection was empty. Machine-readable evidence: `docs/redesign/verification/browser-results.json`.
- `git diff --check` passed (Windows line-ending notices only).

Limits: local Supabase credentials are absent; database and email submissions remain unverified. The build reports this missing configuration and an outdated Browserslist dataset, but completes successfully. These checks do not constitute a full accessibility audit or verification of the remaining website.

## Local preview

Run `npm ci`, `npm run build`, then `npm run start -- --hostname 127.0.0.1 --port 3001`. Open `http://127.0.0.1:3001`. Browser regression checks use `node scripts/verify-homepage.mjs <agent-browser-binary>` against loopback only. The current machine's development Turbopack runtime encountered a CPU compatibility issue; the production build and local production preview work.
