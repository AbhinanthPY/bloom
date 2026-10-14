# Wellcare Bloom

A static website recreation for Wellcare Bloom, built with HTML, CSS and JavaScript. It has no package install or build step.

## Run locally

Open `index.html` in a browser, or serve this folder with any static file server. For example:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Then open http://127.0.0.1:8000.

## Publish

The GitHub Actions workflow in `.github/workflows/pages.yml` deploys the site to GitHub Pages whenever changes reach `main`. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. The published address will be `https://abhinanthpy.github.io/bloom/`.

## Pages

Home, About, Services, Journal, Contact, consultation, two articles, three legal pages and a 404 page. The home page includes the hero, founder statement, service cards, care journey, consultation CTA, approach, reviews, pricing, counters, journal, FAQ, newsletter and footer.

## Forms and privacy

Contact, consultation and newsletter forms validate input and show a local preview response. They do not send email, subscribe visitors or create appointments. No visitor information is persisted.

## Reference and assets

This recreation is based on the public Althea reference by Anton Drukarov at https://templatoria.com/. The custom motion is a close recreation, not the original Framer implementation; timing and some inner-page layouts may differ. Images, fonts, sample clinic copy and audio came from the public reference. Review and meet the original assets' licensing requirements before reusing them, especially for commercial purposes.
