# Bloom cherry-blossom garden scroll scene

The middle `#bloom` scene uses the client-supplied cherry-blossom garden film. “YOUR WELLBEING FIRST”, the live “CARE THAT BLOOMS” typography and white Wellcare Bloom logo remain above the background, with their existing entrance and logo reveal phases.

## Files

- `js/bloom-scroll-video.js` (part of the generated homepage bundle): native scroll progress, paused video seeking, text transitions and final-frame parallax. Loaded as a classic deferred script, so it also works when opening the local HTML directly.
- `css/bloom-parallax.css`: sticky stage, responsive artwork framing, text and reduced-motion styles.
- `assets/bloom-garden-scroll.mp4`: 1280 × 720 H.264, 24 fps, silent, keyframe every 12 frames, fast-start metadata.
- `assets/bloom-garden-scroll-mobile.mp4`: 960 × 540 version selected before loading on smaller screens.
- `assets/bloom-garden-start.webp` and `assets/bloom-garden-end.webp`: exact first/last source frames as optimized stills.

The new source film is eight seconds at 30 fps, supplied by the client as `Animate_cherry_blossom_garden_image_20261022224835 (online-video-cutter.com).mp4`. The web versions use 24 fps (192 frames), with a last-frame time of 7.9583 seconds. No generated replacement artwork is used.

## Sequence

The scene occupies 350 small viewport heights on desktop and 260 on smaller screens, including the sticky viewport. It reserves its scroll space immediately, without a late pin spacer or runtime framework imports.

- 0–15%: existing heading entrance.
- 8–76%: scroll position maps to video time, rounded to the source frame rate. Reverse scrolling seeks backwards. The video never plays on its own.
- 34–61%: existing heading exit; the kicker fades from 38–58%.
- 62–76%: existing white logo fades into the same central position.
- 76–100%: the final film frame holds, with a small scroll zoom and vertical movement plus subtle mouse movement.
- 88–98%: existing logo exit.

Only one precise seek is issued at a time. The next `seeked` event uses the latest scroll position, so rapid scroll input does not build a queue of stale frames. The last-frame still keeps the finish available while the video catches up.

## Loading and accessibility

The start/end stills participate in the page image loader. The selected MP4 downloads completely during startup, is cached persistently where supported, and is assigned through a local blob URL. The decoder seeks to the final frame and back before startup completes; once fonts and geometry settle, it prepares the current scroll position. The loading screen waits for these steps alongside the image and animation promises. Video is muted, inline, decorative and has no separate sound or controls. The ordinary stills remain available if the video fails.

Reduced motion and `?bloom-motion=off` show the final still without pinning or downloading the video; the heading and logo are visible. Rendering work stops while the page is hidden. The previous Three.js scene and vendor files remain as archived source material and are no longer imported by the homepage.


Rebuild the generated homepage assets with `python3 scripts/build-home-runtime.py` after source changes. GitHub Actions also runs this automatically before deployment.
