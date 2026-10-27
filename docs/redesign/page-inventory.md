# Forge public page inventory

All routes below are implemented on the redesign branch. This is frontend availability, not a claim that live email, account onboarding or payments are active.

| Area | Routes |
| --- | --- |
| Company | `/`, `/about`, `/contact`; retired `/work` redirects permanently to `/products` |
| School programmes | `/programmes`, `/programmes/techup`, `/programmes/elytech` |
| School tools | `/programmes/enquire`, `/programmes/onboard`, `/programmes/resources` |
| Endless Possibilities | `/endless-possibilities` |
| Movement pathways | `/endless-possibilities/launchpad`, `/endless-possibilities/in-school-launchpad`, `/endless-possibilities/intern-with-forge`, `/endless-possibilities/public-school-seminars` |
| Give a Child a Laptop | `/endless-possibilities/give-a-child-a-laptop`, its `/donate` and `/request-support` pages |
| Join and referrals | `/join`, `/join/apply`, `/earn-with-forge`, `/earn-with-forge/onboard` |
| Stories and archive | `/blog`, six editorial story pages and the Launchpad story |
| Policies | `/privacy`, `/terms` |

33 canonical public pages. Old programme, careers, product and LaunchPad links retain redirects into the relevant new journeys. NDECA is a homepage section; product marks open status dialogs as requested.

## Remaining release dependencies

Real account and school submissions stay disabled until the isolated backend integration and secure credentials are ready. Email destinations are implemented; Zoho delivery still needs configuration/testing. Financial automation and automatic account deletion are not active. The commercial proposal is drafted; private storage and email activation/testing, YouTube IDs and social URLs are still required. Product-specific motion is implemented locally with pause and reduced-motion support. All live deployment remains subject to the founder’s final approval.

## Frontend review update
/products is now a real product/service overview and /partner separates investment, sponsorship and donations. /gallery redirects permanently to the main Launchpad story and is removed from navigation/sitemap. The dashboard is live/in use, while the public website backend remains disabled pending secure activation. Review access preference: generate and verify a shareable Vercel no-sign-in link only when the founder requests the next review; retain production unchanged.
