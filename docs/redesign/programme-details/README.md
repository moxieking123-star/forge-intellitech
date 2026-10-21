# Dedicated school programme pages

21 October 2026. Builds the programme-specific pages discussed in the brief; the existing company, movement, editorial and application pages remain in place.

- `/programmes/techup`: secondary-school learners, digital tools, coding foundations, purposeful design, projects and pathways through partner schools.
- `/programmes/elytech`: primary-school discovery, sequences, digital confidence, creative projects and age-appropriate reasoning.

Both pages contain distinct original AI classroom imagery, an interactive activity example and a four-stage support explanation: class, connectivity, Saturday live learning and carrying work forward. Illustrated examples are clearly distinguished from a fixed curriculum promise or a real dashboard. Dashboard testing status is explicit. The school onboarding, private proposal enquiry and parent resource kit use the existing routes. No public school pricing, guaranteed devices, career outcomes, live account activation or email delivery is invented.

Legacy `/techup` and `/elytech` addresses now permanently redirect to the detail pages. The school hub links to each page; its existing anchors remain. Canonical metadata and sitemap entries are added. The YouTube configuration supports a different video for each page, but actual IDs are still required; no empty player appears.

Images were made using built-in image_gen and optimised to 1600 × 900 WebP with Sharp. Files: `public/images/programmes/techup-project-studio.webp` and `public/images/programmes/elytech-discovery-studio.webp`. Exact prompts, method and original output paths are in `prompts.json`. Fictional Nigerian learners are visibly disclosed; no actual client child photographs are used here. Code-native SVG scenes are original and contain no third-party assets.

Verification: `scripts/verify-programme-details.mjs`; final evidence in `results.json`. This work does not activate Supabase/email, change production data, merge or deploy live.
