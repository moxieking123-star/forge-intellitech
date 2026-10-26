# Image story, logo colours and reading alignment — 26 October 2026

All changes are branch-local. No shared preview or production deployment was changed.

## Reading layout

The About text had no spacing between successive paragraphs and headings, while journal cards had newly raised borders with zero horizontal padding. Editorial rows also devoted excess width to their number column. The shared page modules now use explicit paragraph spacing, consistent card insets, flexible text columns and minimum-width constraints. Home, programme, journal and initiative boxes use restrained blue, green and gold details sampled from the Forge wordmark; body copy remains dark and readable.

The gratitude section is a dedicated blue panel with gold `Jehovah.`, warm highlights, generous reading space and a stacked mobile layout. The original gratitude message is preserved.

## Drive assets

Source: the owner's Website Images folder, Hero Section. Every one of the eight hero images is used as one of four story pairs:

| Story | Before source | Future source |
|---|---|---|
| Our streets | then.jpg | now.jpg |
| Our coastline | Then1.jpg | Now2.jpg |
| Our everyday journeys | Then3.jpg | Now3.jpg |
| Our communities | Then4.jpg | Now4.jpg |

Future scenes are labelled illustrated possibilities, not existing developments. Stories advance automatically every 20 seconds while active; pause, background-tab detection, reduced motion and the site's motion control stop story changes. Visitors can also select a story and compare either view. Public WebP files are in `public/images/home/`. The supplied adult-team artwork is now the About image at `public/images/editorial/forge-shared-ideas.webp`.

The file `Poverty.jpg` visibly bears a stock watermark, and the World Vision file remains excluded. Supplied identifiable young-child portraits were reviewed but not published or aged into purported real beneficiaries. Two new fictional secondary-school illustrations communicate the intended opportunity without implying those children are programme recipients.

## Generated images

Built-in image generation was used; no API key or paid fallback was used.

- `public/images/home/student-possibilities.webp`: transparent 1200×800 derivative used once in the orange homepage movement section.
- `public/images/editorial/laptop-class-beginning.webp`: 1672×941 derivative used once on the laptop initiative page.

Prompt 1: Create a premium photographic website cutout on a genuinely transparent background: three fictional Nigerian secondary school students aged 14 to 17, two girls and one boy, wearing neat modest school uniforms in cream shirts and deep blue/navy trousers or skirt. They are clustered naturally around one open silver laptop, looking engaged, capable and hopeful, one girl explaining an idea and the others listening with warm authentic smiles. Waist-up composition, all hands anatomically natural and visible where appropriate, laptop visible from back at a three-quarter angle. Nigerian Black African features, varied hairstyles. Warm afternoon light from upper left with subtle orange rim light for placement on an orange webpage background. Realistic professional documentary portrait quality, dignified everyday young learners, original fictional people with no resemblance to any supplied child. No written words, no logo, no watermark, no school badges. Subjects occupy a compact wide triangular composition, fully framed with breathing room, edges clean but soft natural lighting.

Prompt 2: Wide cinematic 16:9 photographic editorial image for a Nigerian secondary-school laptop learning initiative. Entirely original fictional Nigerian teenagers aged 14–17, a girl and a boy in clean navy-blue and cream school uniform, at an ordinary wooden school desk using a silver laptop together; girl is showing a small coding project on screen, boy taking notes, both absorbed and hopeful. An adult Nigerian instructor seen from the back in the midground offering guidance. Natural modest classroom, louvred windows, afternoon light, no luxury lab, dignified realistic opportunities, no pity imagery. Camera slightly behind the students at eye-level showing their profile expressions and laptop; people concentrated to the right two thirds of the wide frame. Left third is an uncluttered burnt-orange plaster wall with soft window shadows, intentionally calm space. Orange warmth transitions seamlessly into the actual classroom. No words, no text, no badges, no logos, no watermark. Natural skin and believable hands, professional documentary photography aesthetic. Visibly different people and composition from the first image.

## Verification

Pending final browser results below.

### Verification outcome

The 80-page webpack build and TypeScript passed. The fifteen-page layout suite passed at 320, 390, 768 and 1440px, including the gratitude word size/colour, journal-card padding, form focus and no runtime errors. The four-story hero check passed automatic progression, manual comparison, pause and reduced motion. Its first run hit a browser-test clock/load-wait interaction; installing the clock after load and avoiding navigation waits for non-navigation buttons resolved that fixture issue.

Screenshot inspection then caught an old homepage movement layout spacer and an initially unused CSS module. The student layout was moved into the homepage's actual Editorial module; the unused additions were removed. Final local rebuild and focused homepage checks follow this correction. The gratitude screenshots were inspected at desktop and mobile sizes.

Final outcome: the corrected homepage build and TypeScript passed. The focused hero test passed again, including the two-column desktop student layout and the absence of the old mobile spacer. Desktop/mobile student-section screenshots were refreshed and visually inspected. The pause test compares the chapter selected at the moment of pause, so real browser action time does not make it assume an earlier chapter is still selected. No actual form submissions, emails, pushes or deployments occurred.
