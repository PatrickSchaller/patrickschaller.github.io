# Patrick Schaller — portfolio

[![Check and publish](https://github.com/PatrickSchaller/patrickschaller.github.io/actions/workflows/pages.yml/badge.svg)](https://github.com/PatrickSchaller/patrickschaller.github.io/actions/workflows/pages.yml)

**[patrickschaller.github.io](https://patrickschaller.github.io/)**

A small, static portfolio for prospective employers and professional contacts. The tone is practical and friendly, with an original workflow illustration that untangles on request. The landing page uses plain HTML, CSS and JavaScript. A separate, self-hosted Swagger UI reference makes the API work inspectable. No analytics, cookies, forms, accounts or backend are hosted.

![Desktop portfolio](docs/desktop.png)

## Work on it

Requires Node.js 22 or newer for the local tools. The actual site is plain HTML, CSS and a little JavaScript.

```sh
npm run dev
```

Open **http://127.0.0.1:5100**. Edit `site/index.html`, `site/styles.css` and `site/script.js`. Local serving uses Node's standard library and does not require installing packages.

## Check it

```sh
npm ci --ignore-scripts
npm run check
npx playwright install chromium
npm test
```

The static check verifies internal file/anchor links, image dimensions and the contact route. Eight browser checks cover loaded assets, project links, disclosure controls, email, keyboard interaction, reduced motion, layouts from 320px to desktop, core content with JavaScript disabled, and the read-only API explorer with no external requests. These checks are not a complete assistive-technology audit.

To refresh the documentation screenshots, start the local server and run `npm run screenshots`.

## API reference

**[Published explorer](https://patrickschaller.github.io/api/inventory/)**

`site/api/inventory/` is a static copy of [Inventory Receiving's canonical API reference](https://github.com/PatrickSchaller/inventory-receiving/tree/main/docs/api-reference). Its OpenAPI JSON is generated and snapshot-checked in that application; the `.http` walkthrough is executed against a real scratch SQLite database. `responses.json` records the synthetic test responses. The landing page's conflict example comes from that recording.

When the application contract changes, regenerate and verify its documentation first, then copy the complete contents of `docs/api-reference/` from that checkout into `site/api/inventory/` here. Run the site checks and browser tests before publishing. There is no automatic connection to a private development checkout.

The public explorer disables request execution. Running Inventory Receiving locally enables GET/POST execution in the same UI. Swagger UI 5.34.0 is vendored under Apache 2.0; its original license and notice are preserved in `site/api/inventory/vendor/`. Assets load from this site, with the external validator disabled. The landing page does not load Swagger UI's JavaScript or CSS.

## Publish

The workflow checks the site before publishing **only the `site/` folder** to GitHub Pages. Development tools, packages and documentation are not included in the deployment. Push to `main` to update the public site. Repository Settings → Pages uses **GitHub Actions** as the source.

## Content and assets

- Contact: the email supplied for publication by Patrick. There is a `mailto:` link, not a message-collection form.
- Five independent, AI-assisted example projects are linked to their source repositories. Their synthetic-data scope and live-AI limits remain visible.
- Project screenshots come from the public Inventory Receiving, Label Review and Workflow Workbench examples, using invented data. No private work screenshots or employer assets are used.
- The SVG workflow and monogram are original code-drawn artwork. The interaction is an illustration, not a working business-system integration.
- [Bricolage Grotesque](https://github.com/google/fonts/tree/main/ofl/bricolagegrotesque) is self-hosted under its [SIL Open Font License](site/assets/bricolage-OFL.txt). Other text uses system fonts. Visitors do not request external fonts.
- No personal photograph, unprovided career history, client endorsements or business outcome claims are included.

Site implementation and writing were produced with AI assistance using Patrick's supplied background and preferences. Code and original artwork are MIT licensed; the included font and Swagger UI retain their own licenses.
