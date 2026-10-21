# Gentle Bloom — independent liquid-glass section

Added above Personalised Care (`#pricing`), after the existing floral scene and approach content. The new scene is edge to edge and exactly one viewport tall, without an outer border, rounded frame, shadow or side margins. The original `#bloom` video/parallax scene is unchanged.

## Editable content and assets

- `app.js`: `glassBloomContent` contains the eyebrow, heading, description, CTA label and destination. `glassBloomSection()` renders the semantic HTML.
- `css/bloom-glass.css`: scoped composition, glass surface, droplet entrance and responsive/reduced-motion fallbacks.
- `js/bloom-glass.js`: mouse interaction, entrance observer and cleanup.
- `assets/bloom-glass/`: the six supplied WebP layers, unmodified, on their shared 1916 × 821 artboard. The opaque background covers the full viewport. Foreground canvases preserve their 1916 × 821 aspect ratio: the reduced cherry branch sits at the upper left, the glass flower at the lower right, and waves along the bottom. This avoids magnifying the transparent artwork to fill a tall viewport. Pointer offsets are applied independently of those corner anchors. Diffuse overlays use reduced opacity.

The scene uses no external dependencies. The existing homepage startup gate decodes its six images before revealing the page. Rebuild with `python3 scripts/build-home-runtime.py` after editing a source file.

## Interaction

Only fine mouse input changes layer transforms. The base is stationary; other layers translate up to 6–32 px horizontally and 3–12 px vertically with restrained opposing rotations. One easing loop stops when settled. Pointer leave does not reset the composition. The scene has no scroll listener, automatic pan, idle animation or device tilt. Touch and reduced-motion modes disable the pointer effect. Reduced motion shows the glass card immediately.

A visibility observer triggers the droplet expansion once. Its surface expands independently of the text. Keyboard focus reveals the card immediately. Page teardown disconnects listeners/observer, and background tabs stop the easing loop.

## Verification

Automated behaviour checks passed: single RAF, settling, no scroll listener, once-only entrance, stationary base, differing layer depths, ignored touch input, reduced-motion fallback, visibility pause and teardown. Source comparison confirms the original floral section is unchanged.

Manual checks: desktop pointer depth and idle stop; complete card entrance without replay; responsive mobile layout; accessible working CTA; no exposed artboard edges at pointer extremes.

## Animated cherry branch

The upper-left branch alone now uses the supplied `Untitled design.mp4`. Its solid near-white background was keyed out while preserving the pale petals. `flower-branch-alpha.webm` carries VP9 alpha for Chromium/Firefox; `flower-branch-alpha.mov` carries HEVC alpha for Safari/WebKit. Neither export contains audio. `flower-branch-poster.webp` is the transparent reduced-motion/error fallback. The original glass flower, backdrop, bubbles and waves remain unchanged.

`js/bloom-flower-video.js` selects one compatible format, buffers it through the existing startup gate, plays once when the scene becomes visible, pauses offscreen/in hidden tabs, and retains the final bloom. The branch wrapper keeps its existing mouse depth transform and corner anchor.

## Scene entrance and bloom timing

A stationary full-screen section now contains `.wb-glass-stage`. When 22% of the section enters the viewport, the stage blends from a softly rounded, slightly smaller panel into its full-screen shape over 950 ms. It runs once per page visit. On stage completion the card entrance is released and a scoped `bloom:glass-scene-ready` event allows the branch video to start. The video uses playbackRate/defaultPlaybackRate 2, so its six-second bloom takes about three seconds. Reduced-motion and keyboard focus skip the scene entrance. Mouse depth remains independent of scrolling.
