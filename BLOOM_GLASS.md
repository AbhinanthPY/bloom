# When to Start — cherry blossom background and liquid-glass card

The `#gentle-bloom` section sits after the approach content and above Personalised Care (`#pricing`). It fills at least one viewport and grows naturally on small screens to fit the card. The separate `#bloom` garden video scene is unchanged.

## Background and content

- `assets/bloom-glass/cherry-blossom-background.png`: the supplied 1672 × 941 cherry blossom image, copied unchanged. It covers the full stage with centred framing.
- `app.js`: `glassBloomSection()` renders this single decorative background image. `glassBloomContent` retains the existing When to Start text, three supporting points and consultation link.
- The previous six-layer composition and transparent branch video are no longer rendered or downloaded by this section. Their source assets remain archived for reuse.
- `css/bloom-glass.css`: responsive stage layout, clear rounded glass surface, entrance and reduced-motion rules.

The image is included in the existing startup image gate. The background stays stationary; with a single flat image, the pointer depth loop stays disabled.

## Entrance and glass

`js/bloom-glass.js` retains the once-only 950 ms rounded scene entrance at 22% visibility, followed by the glass droplet expansion. Keyboard focus and reduced motion reveal the card immediately.

`js/bloom-liquid-glass.js` samples the new image beneath the card through its existing WebGL lens, including convex edges, stationary water-like refraction and restrained highlights. It derives the uncovered colour from the stage. Text stays in a separate sharp DOM layer. Rendering happens only for relevant entry, visibility and resize events; there is no idle animation loop.

Local `file://` artwork can taint a sampled canvas, so Chromium uses native SVG backdrop displacement there. GPU restrictions fall back to clear CSS glass. The published HTTPS site uses the live shader when available.

## Source maintenance

The section remains vanilla HTML/CSS/JavaScript with no added dependencies. Rebuild the generated homepage bundles using `python3 scripts/build-home-runtime.py` after changes.

The postpartum copy remains unchanged. Existing references: [NHS: exercise after birth](https://www.nhs.uk/baby/support-and-services/keeping-fit-and-healthy-with-a-baby/) and [NHS My Joint Health Hub: return to exercise after birth](https://myjointhealthhub.bnssg.nhs.uk/pelvic-health-physiotherapy-service/pregnancy-and-after-childbirth/return-to-exercise-and-activity-after-birth/).
