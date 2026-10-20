# Wellcare Bloom

A static website for Wellcare Bloom, built with HTML, CSS and JavaScript. No package installation is needed. The homepage sources are bundled by a small Python script.

## Run locally

After editing homepage sources, run `python3 scripts/build-home-runtime.py`. Then open `index.html` in a browser, or serve this folder with any static file server. For example:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Then open http://127.0.0.1:8000.

## Publish

The GitHub Actions workflow in `.github/workflows/pages.yml` rebuilds the homepage bundle and deploys the site to GitHub Pages whenever changes reach `main`. In repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. The published address is `https://abhinanthpy.github.io/bloom/`.

## Pages

Home, About, Services, Journal, Contact, consultation, two journal articles, three legal information pages and a 404 page.

## Forms

Contact and consultation pages provide direct telephone, email and Google Maps links using the official Wellcare Physiotherapy contact information. Appointment confirmation is handled by the clinic. The newsletter form remains a local preview and does not subscribe visitors or persist information.

## Media

The homepage ships one content-hashed stylesheet and one content-hashed deferred script. `js/page-ready.js` waits for decoded page images/backgrounds, fonts, native animation setup, the hero portrait renderer and the complete selected flower video before revealing the page. Geometry is refreshed and the initial video position is decoded before reveal. There is no minimum wait or timer that exposes incomplete content. A genuine loading error offers a retry action.

The complete flower MP4 is persisted in Cache Storage when available and replayed from a local blob URL, preventing new network range requests during scroll seeking. Only the desktop or mobile variant is downloaded. Ordinary browser caching handles images and versioned bundles. Local `file:` previews load the video directly from disk. Hero CSS animations stay paused behind the loader, and scroll reveals begin after readiness, so their entrances are visible. Audio remains opt-in and is excluded from the startup gate.

A 1–2 second startup is the target for cached visits, not a fixed timer or a guarantee on every first connection. Slow or failed network access may take longer. `data-startup-state`, `data-startup-ms`, `data-animations-ready` and the Bloom scene's `data-bloom-cache`/`data-bloom-prepared` attributes describe the actual observed state.

Images and fonts are stored locally in `assets/`. The original layout reference was created by Anton Drukarov and published at https://templatoria.com/. Some inherited images, fonts and audio came from that public reference; review and meet their licensing requirements before commercial use. Bloom posters and clinical copy were supplied by the client. Current clinic contact details are from https://wellcarephysiotherapy.in/contact.html.
