# Cartoon collaboration journey

Requested replacement for the stick figures: Tom, Jerry and Doggy tell an eight-scene story across scroll progress. Rivalry gives way to a shared problem, an unsuccessful solo attempt, a plan, an invitation, carrying together, construction and a completed fence for Doggy.

The optional activity uses the same actors and lets a visitor invite help, share the load, build and celebrate. The site remains usable without opening it. Pointer glances, pause, hide, form-focus suppression and reduced-motion support remain available.

Implementation uses local SVG illustrations and CSS choreography, with no video or new external animation dependency. This is a stylised vector treatment, not footage from the cartoon.

No deployment, shared-preview change or production setting changes. Existing backend work remains separate and unfinished.

## Verification

- TypeScript: `npx tsc --noEmit` passed.
- All eight SVG scenes rendered and visually inspected.
- `node scripts/check-cartoon-isolated.mjs` passed using the actual React components: eight scroll chapters, four construction actions, Escape, 320/390/768/1440 widths, reduced motion and hide/restore.
- Full Next.js development-page verification could not confirm hydration: the page rendered but the pause control did not become interactive in the automated browser. This remains an integration check, not a claim that the full-page test passed.
- No backend or real user data was changed by these animation checks.

## Full-page verification completed

24 October: scripts/check-cartoon-journey.mjs passed against the local production site on port3011, including actual motion, eight scroll scenes, optional activity, Escape/focus, all four widths, reduced motion, hide/restore, programme navigation, pause/resume and form-focus suppression. Zero page errors. The earlier development-browser failure was premature interaction before hydration; the test now waits for the component mounted-effect marker. No animation source change was needed.
