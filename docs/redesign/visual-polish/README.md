# Tactile surfaces and staff welcome — 25 October 2026

Branch-local visual phase, following completed isolated backend checks. No push, Vercel deployment, shared-preview modification or live cutover.

## Implemented

- Shared cream/forest/orange surface tokens, subtle highlights, shaded panel edges and elevation across programme, application, movement, product, story, school-resource and referral surfaces.
- Larger, rounded form fields with native labels/validation preserved, keyboard focus rings and tactile actions. Checkboxes remain native, with separate sizing from text fields. Hidden honeypots remain hidden.
- Decorative staff welcome illustration with a slowly breathing care symbol and mouse-following light. Reduced-motion users receive static presentation. This component has no access to session or record data.
- Admin-only Forge brand frame and return-to-website link, replacing the unrelated public navbar/newsletter footer on staff routes. Authentication and business review code are unchanged.
- Removed the Our Work page content and navigation/sitemap entry. Its old URL permanently redirects to Products. About's relevant CTA goes directly to Products.

## Verification record

The initial twelve-page responsive pass checked 320, 390, 768 and 1440px widths, contact keyboard focus/field sizing, staff reduced motion and the Work redirect/sitemap without real submissions. An immediate-resize overflow result could not be reproduced after layout/font settling; the browser script now waits for fonts and two animation frames before measurements.

The staff regression was initially interrupted by a stale hot-reloaded server/client frame mismatch while changing the admin frame. The fresh 80-page webpack build and TypeScript checks passed. Both browser suites then passed against the freshly built local server: all twelve public/staff pages at all four widths, contact focus/field dimensions, reduced motion, redirect/sitemap, staff finance/enquiry/delivery review actions, sign-out and permission-denial clearing. Real HTTP missing/bad identity and cross-origin checks passed for all four private routes. No runtime page errors, real emails, real submissions or payments occurred in these browser suites. Screenshots/results are refreshed by `tests/tactile-surfaces.browser.mjs`; fictional staff workflow evidence is in `../backend/admin-workflows-browser-results.json`.

Hero image storytelling, holographic hero typography and image placement remain the next visual subphase. The recruitment/training dashboard remains separately deferred.

## Homepage depth and supplied imagery — 26 October

The hero now transitions from the owner-approved Lagos traffic photograph (`hero-then.jpg`) to the supplied illustrated future city (`hero-now.jpg`). Public WebP derivatives retain the source composition; the photograph's attribution mark was not edited out. The owner confirmed permission in the project conversation. These assets came from the previously fetched Website Images folder; newer folder additions have not yet been inventoried in this pass.

The disclosure distinguishes the real photograph from the imagined development. The highlighted word has layered lighting/depth, the main action has a raised edge, and ordinary mouse movement subtly offsets the landscape without prompting for device sensors. Pause resets pointer depth. Reduced-motion visitors receive a static scene; manual before/after selection remains available. Touch does not activate pointer parallax.

Verification: `tests/hero-depth.browser.mjs` checks manual scene selection, pause/reset, mouse depth, reduced motion, and 320/390/768/1440px layouts without sending forms.

Final verification on 26 October: the updated 80-page webpack build and TypeScript completed successfully. Both visual browser suites passed on the built local server, including the final admin header/footer contrast treatment. Desktop/mobile screenshots were visually inspected. No deployments, pushes, real submissions or emails were performed in this visual pass.
