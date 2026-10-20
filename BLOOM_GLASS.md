# Gentle Bloom — independent liquid-glass section

Added above Personalised Care (`#pricing`), after the existing floral scene and approach content. The original `#bloom` video/parallax scene is unchanged.

## Editable content and assets

- `app.js`: `glassBloomContent` contains the eyebrow, heading, description, CTA label and destination. `glassBloomSection()` renders the semantic HTML.
- `css/bloom-glass.css`: scoped composition, glass surface, droplet entrance and responsive/reduced-motion fallbacks.
- `js/bloom-glass.js`: mouse interaction, entrance observer and cleanup.
- `assets/bloom-glass/`: the six supplied WebP layers, unmodified, on their shared 1916 × 821 artboard. Every layer uses the same sizing and crop; only pointer offsets differ. Diffuse overlays use reduced opacity.

The scene uses no external dependencies. The existing homepage startup gate decodes its six images before revealing the page. Rebuild with `python3 scripts/build-home-runtime.py` after editing a source file.

## Interaction

Only fine mouse input changes layer transforms. The base is stationary; other layers translate up to 6–32 px horizontally and 3–12 px vertically with restrained opposing rotations. One easing loop stops when settled. Pointer leave does not reset the composition. The scene has no scroll listener, automatic pan, idle animation or device tilt. Touch and reduced-motion modes disable the pointer effect. Reduced motion shows the glass card immediately.

A visibility observer triggers the droplet expansion once. Its surface expands independently of the text. Keyboard focus reveals the card immediately. Page teardown disconnects listeners/observer, and background tabs stop the easing loop.

## Verification

Automated behaviour checks passed: single RAF, settling, no scroll listener, once-only entrance, stationary base, differing layer depths, ignored touch input, reduced-motion fallback, visibility pause and teardown. Source comparison confirms the original floral section is unchanged.

Manual checks: desktop pointer depth and idle stop; complete card entrance without replay; responsive mobile layout; accessible working CTA; no exposed artboard edges at pointer extremes.
