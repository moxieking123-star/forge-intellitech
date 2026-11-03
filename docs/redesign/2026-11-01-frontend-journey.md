# Forge frontend journey — 1 November 2026

## Current objective
Recreate the selected image-rich Forge homepage and extend its design language to public pages. Preserve the company, education, technology and movement identity. Frontend preview only.

## Decisions approved
- Latest selected mockup: “Forge homepage: technology, learning, and opportunity.png”, Library ID `libfile_e24bd486e2608191bd4da7fc580fcb4e`.
- White/soft blue surfaces, navy type, orange actions, rich illustrative imagery, homepage enquiry form.
- Earn with Forge near student projects/stories.
- Equally visible Give a laptop and Request a laptop actions.
- Student support application supports student, parent/guardian and teacher; asks where they heard about Forge.
- Keep placeholder imagery until real photographs are supplied; do not misrepresent placeholders as evidence.
- No deployment, production data changes, backend integration or message sending.

## Implementation plan
1. Isolate code from the existing repository at `origin/main` (`71286a6`). Exclude unrelated instructor-training branch work and all environment credentials.
2. Create shared responsive public shell, accessible navigation, footer, image treatment and data-light control. Preserve administrative shell.
3. Rebuild homepage in selected sequence: identity → audience routes → School Program + enquiry → LaunchPad → products → movement/laptop support → stories + Earn with Forge → vision.
4. Apply visual language to key public destinations; preserve detailed existing curriculum, resources, legal and referral terms/routes.
5. Add stateful demonstration enquiries and a four-step laptop application with native validation, review, back navigation and honest completion messaging. No network writes or persistence of form details.
6. Optimise imagery and verify type checking, production build, desktop/mobile presentation, navigation and form journeys. Record limits honestly.

## Work completed
- Located existing local repository and remote branches.
- Created independent checkout branch `codex/forge-frontend-journey` inside this project. Native managed worktree service unavailable; original checkout is unchanged.
- Read repository instructions and installed Next.js layout/component documentation.

## Work in progress
- Implementing shared shell, homepage, public destination layouts and demonstration forms.
- Producing matching placeholder image assets.

## Outstanding questions
- Confirm current WhatsApp number, office address and registration details before release.
- Replace conceptual imagery with consented photographs and verified product captures when available.
- Reconcile impact totals and confirm final donor handling/acknowledgment/update policies before publishing.
- Confirm any commercial or product-status changes against the founder’s current authoritative company document.

## Recommended next actions
Review the local frontend preview; then refine copy/imagery. Backend connection and deployment require a separate instruction.

## 3 November — approved Forest & Ivory palette
- Current objective: apply the founder-approved forest-green colour study without changing the approved page journey or imagery.
- Decision approved: deep forest `#203F35`, evergreen ink `#142C25`, ivory `#F8F5ED`, beige `#E7DDCB`, sage `#B6C3AD`, burnt orange `#BE542A`.
- Work completed: recoloured the public stylesheet, replaced pale-blue school sections with forest green, preserved a bright enquiry panel, gave movement/footer evergreen surfaces, and retained beige LaunchPad/referral areas. Form submission behaviour and backend code unchanged.
- Work in progress: refreshing portable snapshots and checking types/local preview access.
- Outstanding questions: browser verification and the earlier production-build permission failure remain unresolved until fresh successful evidence exists. Confirm contact and impact details before public release.
- Recommended next actions: inspect the refreshed homepage snapshot, verify the interactive local application at desktop/mobile sizes, then address any layout issues. No deployment authorised.
