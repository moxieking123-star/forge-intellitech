# Homepage implementation plan

Status: homepage implementation and local verification complete. See root `design-qa.md` and `verification/browser-results.json` for evidence. Remaining website pages and dedicated donation/application workflows are subsequent work; production release still requires final approval.

Visual target: `refined/homepage-desktop.png`, `refined/homepage-mobile-opening.png` and `refined/homepage-mobile-campaign.png`. Scope: working homepage only on `codex/forge-website-redesign`. No production deployment or merge.

- Generate individual hero, campaign and editorial images; retain the new Forge-only logo.
- Build the page in `app/HomePageClient.tsx` with scoped `components/home/Home.module.css`.
- Add a header with native modal mobile navigation and a simple footer. Select these only for `/` using `components/SiteFrame.tsx`, preserving other routes.
- Host fonts locally; retain Poppins/Open Sans for legacy pages and use Manrope for the homepage.
- Connect actions to existing routes or real anchors. Expandable stories use founder-provided accounts. Donor interest uses the existing enquiry route until its dedicated flow is built.
- Browser-check menu, Escape/focus restoration, story expansion, anchors, destination routes, image loading and overflow at 320/390/768/1440px. Do not submit forms or write production data.
- Run TypeScript and a production build; compare screenshots with visual targets and record design QA.
- Commit and push intended files to the existing branch and retain a local preview. Production remains untouched.
