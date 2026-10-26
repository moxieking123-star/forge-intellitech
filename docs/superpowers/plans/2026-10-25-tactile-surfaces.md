# Tactile surfaces and navigation implementation plan

**Goal:** Implement the owner's already-approved depth and form direction now that isolated backend verification is complete, and remove the Our Work page.

**Architecture:** Reuse existing CSS modules and the saved pre-backend visual draft. Add shared surface tokens, restrained local panel/control treatments and a decorative staff welcome component. Keep auth, submission and backend logic unchanged. No deployment or push.

**Tech stack:** Next.js App Router, React, TypeScript, CSS modules, local Playwright browser verification.

- [x] Inspect saved draft against current source; restore its scoped CSS and staff welcome changes without replacing unrelated code.
- [x] Strengthen form fields and primary actions in application, onboarding, referral and proposal modules. Preserve checkboxes, hidden honeypots, visible focus and comfortable mobile targets.
- [x] Add depth to generic editorial panels and homepage actions; keep body text static and respect reduced motion.
- [x] Replace `/work` page with a permanent redirect to `/products`; remove navigation/sitemap links and route About's work CTA to products.
- [x] Run TypeScript and full build. Verify local desktop/mobile pages, form states without submissions, staff sign-in/fixture access controls, reduced motion, removed-route redirect and sitemap.
- [x] Record actual verification results/screenshots and commit only intended changes locally.

Hero imagery/story/3D headline enhancement remains the following visual subphase; avoid mixing unreviewed Drive assets or recruitment dashboard features into this surface pass.
