# Wellcare Bloom: the selected middle section

The `#bloom` section uses a Three.js perspective camera and ten independently textured planes. The existing heading and consultation bar stay as HTML above the canvas. Other page sections and the navigation use their existing code.

## Files

- `js/bloom-parallax.js`: lazy initialization, WebGL scene, GSAP timeline, pointer easing, responsive textures, fallback and cleanup.
- `js/bloom-layers.js`: asset names, depth and composition settings in a shared 1536 x 1024 coordinate system.
- `css/bloom-parallax.css`: styles scoped to the middle section.
- `assets/parallax/desktop/`: all ten optimized images at 1536 x 1024.
- `assets/parallax/mobile/`: the same ten images at 960 x 640.
- `assets/parallax/fallback.webp`: a static composite using the same alignment.
- `js/vendor/`: locally hosted, pinned Three.js and GSAP modules.
- `index.html`: loads the section stylesheet and ES module.
- `app.js`: provides the section's canvas and fallback mounts.
- `animations.js`: the earlier CSS parallax controller for this section was removed so it cannot compete with the new controller.

## Asset mapping

All layers retain actual alpha transparency from the supplied PNGs. Black branch and trunk pixels remain visible; no black-key transparency is applied. The opaque sunrise plane guarantees coverage behind the other layers.

| Supplied layer | Role | Z position | Scale | Canvas offset X / Y |
| --- | --- | ---: | ---: | ---: |
| 01_sunrise_background | Sunrise and distant environment | -360 | 1.14 | 0 / -20 |
| 02_distant_mountains_mist | Mountains and atmospheric mist | -260 | 1.05 | 0 / 30 |
| 03_rear_pink_hills | Rear flowering hills | -160 | 1.12 | 0 / 100 |
| 04_left_pink_hillside | Left hillside | -50 | 1.05 | -200 / 90 |
| 05_right_hillside_grove | Right hillside | 50 | 1.07 | 160 / 80 |
| 06_central_river_valley | River and valley floor | 140 | 1.10 | 0 / 130 |
| 07_foreground_tree | Near right tree | 245 | 0.90 | 330 / 100 |
| 08_lower_left_branch | Near left branch | 340 | 0.95 | -300 / 140 |
| 09_upper_left_canopy | Overhanging canopy | 430 | 0.90 | -160 / -140 |
| 10_floating_petals | Soft petal atmosphere | 500 | 1.18 | 0 / 0 |

The archive contains independently generated cutouts, rather than matching photographic extractions. The offsets open the central river view and move the large branches toward the edges. Mobile framing moves the near tree and branches inward. Perspective compensation preserves each layer's intended apparent scale and position while assigning it a real Z depth. Transparent materials use explicit render order and do not write to the depth buffer.

## Scroll and interaction

- 0–15%: pinned entrance; heading lines arrive and near layers settle into place.
- 15–65%: the camera moves forward gently and nearer layers travel farther than the background. The large heading fades to reveal the landscape.
- 65–75%: camera and layers settle.
- 75–100%: camera and scroll transforms hold. Pointer response and gentle atmospheric movement continue.
- After 100%: the pin releases into the existing Our Approach section. Upward scrolling reverses the same timeline.

The desktop pin distance is 2.5 stage heights; mobile uses 1.6. ScrollTrigger uses `scrub: 1`, pin spacing, anticipation and refresh invalidation. No wheel interception, scroll locking or endless hold is used.

Pointer coordinates are normalized to the section and eased independently from scroll state. Depth responses range from about 1 to 18 CSS pixels. Rendering pauses off screen and in a hidden tab. Pixel ratio is capped at 1.5 on desktop and 1.25 on mobile. Texture upgrades and disposal are handled on resize and page lifecycle events. There are ten textured planes, with no expensive postprocessing pipeline.

## Static hosting and fallback

Libraries, images and module imports are local. Asset URLs resolve relative to the module's location, so `/repository/index.html` works without changing imports. There is no backend, API, build tool or Node runtime dependency. Keep `index.html`, `js/`, `css/` and `assets/` together when deploying the project to GitHub Pages.

Reduced motion skips WebGL and pinning entirely. If imports, WebGL initialization or texture loading fail, the aligned static landscape stays visible. Context loss also shows the fallback; recovery restores the canvas. A repeatable static preview is available at `index.html?bloom-motion=off#bloom`.

## Dependencies

- Three.js 0.180.0, npm package `three`; MIT license included in `js/vendor/three/LICENSE`.
- GSAP 3.13.0, including ScrollTrigger and Observer, npm package `gsap`; source license headers and the official standard-license link are retained. See `js/vendor/README.md`.

## Manual verification

1. Load `index.html#bloom`; check `data-bloom-state="ready"` and `data-bloom-layers="10"` on the section.
2. Scroll through entrance, depth and hold; verify that the section is fixed only within its pin range.
3. At 75–100%, stop scrolling and move the pointer left, right, up and down. Near branches should respond more than the mountains.
4. Scroll beyond the end into Our Approach; scroll upward to reverse the sequence.
5. Repeat at phone width. The canvas must preserve image proportions, use the mobile texture set and keep the consultation link accessible.
6. Open the static preview; it must show a complete scene without a canvas or pin spacer.
7. Serve the project beneath a path such as `/wellcare-bloom/`, rather than only at `/`, and repeat loading and booking navigation.
8. Check console errors, horizontal page overflow and resize behavior.

## Verification record

- Browser preview loaded ten real WebGL texture planes with no console warnings or errors.
- Local module dependency checks passed; all referenced module files exist and use relative imports.
- Both image sets passed dimension and alpha checks: desktop 1536 x 1024, mobile 960 x 640. Nine foreground textures retain alpha; the sunrise remains opaque.
- Desktop pinning, camera/layer movement, the finite interactive hold and normal release into Our Approach were observed. During the hold, left and right pointer offsets changed while scroll progress stayed constant.
- Upward scrolling reversed the scene and restored the heading.
- Phone portrait at 390 x 844 loaded all ten mobile textures, had no horizontal page overflow and kept the complete booking bar visible. The booking link reached the existing consultation page.
- Short landscape at 844 x 390 kept the stage at 390px and the booking bar entirely within the viewport.
- The static preview had no WebGL canvas and no pin spacer, and displayed the complete aligned landscape. The reduced-motion branch skips the same WebGL/pinning initialization; actual OS preference switching was not exercised.
- The project loaded successfully at `/wellcare-bloom/index.html`, including its module, textures, fallback stylesheet URL and consultation navigation. This verifies the GitHub Pages repository-path structure locally; a live GitHub Pages deployment was not performed.

Checks were performed in the available in-app browser at desktop and phone viewport sizes, rather than on every listed physical device/browser combination. Optimized texture payloads total approximately 2.82 MB for desktop or 1.50 MB for mobile, excluding libraries and the static fallback.
