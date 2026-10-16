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

Images and fonts are stored locally in `assets/`. The original layout reference was created by Anton Drukarov and published at https://templatoria.com/. Some inherited images, fonts and audio came from that public reference; review and meet their licensing requirements before commercial use. Bloom posters and clinical copy were supplied by the client. Current clinic contact details are from https://wellcarephysiotherapy.in/contact.html.
