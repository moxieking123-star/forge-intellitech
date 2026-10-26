# A little story of possibility

21 October 2026. Supersedes the hero letter-collection experiment.

The founder approved an ambient story about making things together. It runs without a deliberate action, reacts to normal browsing, and offers a separate optional building activity when a character is clicked.

## Story

1. An orange builder struggles with a timber beam, frowns and wipes away a little sweat.
2. A teal builder arrives. Two people can carry what one could not.
3. A purple girl brings a wheel and a different idea. The programme pages introduce her here.
4. Their objects become a bridge; the three characters celebrate.
5. A builder waves down a yellow vehicle. It stops, then continues the journey.
6. A shared Forge workshop becomes the destination. Everyone remains visible at the celebration.

Scrolling maps to chapters, including reverse scrolling. Each chapter has its own repeating choreography. Pointer movement gives the characters small eye movements. The shared SiteFrame keeps the cast present across public routes. Programmes and movement pages have their own introductory chapter. This version does not store visitor behaviour or persist story state beyond the mounted site session.

Clicking the scene opens a native modal: give the idea a foundation, bring a team together, then make a way for the journey. Visitors assemble objects and a working scene, rather than collecting letters. Escape closes it and restores focus.

## Implementation and controls

`components/story/ForgeJourney.tsx` and its scoped CSS contain original vector characters, expressions and props. No animation package, downloaded character asset, stock licence or external media request is required. The root is a small fixed corner scene. Pause and hide controls are available, and the story hides while input fields are focused. Reduced-motion mode uses static drawings while retaining discrete scroll chapters and accessible optional play. Animation is CSS transforms/opacity; scroll calculations run at most once per animation frame.

The former HeroPlay component and its letter-collection test have been removed. The full “Made of possibility” line is sized to fit at narrow widths. The homepage has a direct NDECA anchor from the hero; its proposal status remains explicit. Broader content changes remain separate.

See `results.json` for browser evidence and the chapter screenshots for the actual rendered scenes. No live deployment or production data changes are part of this work.
