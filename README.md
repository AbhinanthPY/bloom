# Wellcare Bloom

A static website for Wellcare Bloom, built with HTML, CSS and JavaScript. It has no package install or build step.

## Run locally

Open `index.html` in a browser, or serve this folder with any static file server. For example:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Then open http://127.0.0.1:8000.

## Publish

The GitHub Actions workflow in `.github/workflows/pages.yml` deploys the site to GitHub Pages whenever changes reach `main`. In repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. The published address is `https://abhinanthpy.github.io/bloom/`.

## Pages

Home, About, Services, Journal, Contact, consultation, two journal articles, three legal information pages and a 404 page.

## Forms

Contact and consultation pages provide direct telephone, email and Google Maps links using the official Wellcare Physiotherapy contact information. Appointment confirmation is handled by the clinic. The newsletter form remains a local preview and does not subscribe visitors or persist information.

## Media

Page images load eagerly with the hero prioritised. `js/media-loader.js` decodes responsive image sources and warms CSS background images before dismissing the home loader. The loader has no minimum delay; a six-second escape keeps slow or failed connections from trapping navigation. Failed images retry once, and failed AVIF sources fall back to WebP. Background preparation continues if the escape is reached. Optional portrait and landscape WebGL setup follows page image readiness, with ordinary images available as fallbacks. The logo uses a lossless WebP with the same pixels as the original PNG.

Images and fonts are stored locally in `assets/`. The original layout reference was created by Anton Drukarov and published at https://templatoria.com/. Some inherited images, fonts and audio came from that public reference; review and meet their licensing requirements before commercial use. Bloom posters and clinical copy were supplied by the client. Current clinic contact details are from https://wellcarephysiotherapy.in/contact.html.
