# Validation

Prepared October 29, 2026, on Windows with Node.js 22.18.0 and Playwright 1.64.1.

- All local static file links and anchors resolve; project image dimensions match their PNGs.
- Eight Chromium checks pass, covering desktop assets and project/contact links, native disclosure controls, keyboard interaction, reduced motion, four viewport widths (320, 390, 768 and 1440px), and core navigation with JavaScript disabled, and API evidence linking to the read-only Swagger UI reference.
- Desktop, project and phone screenshots were inspected. Content uses the supplied background and publication-approved contact email, with no unprovided personal history or employer information.
- The landing page has no third-party runtime scripts. The API reference self-hosts Swagger UI 5.34.0, renders all five operations, disables request execution, and makes no external requests. There are no external webfont requests, telemetry, local storage or submitted contact forms. Links to GitHub and the mail client are visitor-initiated.
- The local server binds to loopback and serves only `site/`. GitHub Pages publishes that same directory after checks succeed.

The browser checks use Chromium, not every browser or assistive technology. The email link opens the visitor's mail application; no message was sent as part of validation. This portfolio does not host the linked .NET/Python applications.

The exact deployment result is available in the repository's **Check and publish portfolio** Actions workflow. A successful deployment is followed by an HTTP check of the public page.
