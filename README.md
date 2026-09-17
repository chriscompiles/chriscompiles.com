# chriscompiles.com

A small, static home for things Chris is building, shipping and creating. Built with Astro, plain HTML/CSS and a self-hosted Manrope variable font. No browser JavaScript, backend, cookies or third-party requests.

## Local development

Use Node 24 LTS (specified in `.node-version`; Astro requires at least 22.12).

```sh
npm ci
npm run dev
```

To build and inspect the production site:

```sh
npm run build
npm run preview
```

## Deploy to Render

Connect this repository as a **Static Site**:

- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- Node version: `24`, selected by the root `.node-version` file
- Required environment variables: **none**

The build produces one HTML page plus CSS, the font and public assets. No server, adapter, SPA rewrite or `render.yaml` is needed. Add `chriscompiles.com` as the custom domain in Render and follow its DNS instructions. Canonical URLs, sitemap and social metadata already use `https://chriscompiles.com`.

## Edit content

- `src/data/projects.ts`: project names, short descriptions, status and optional URL. Add `url: 'https://…'` to make a whole row a link. Rows without a URL remain ordinary content.
- `src/data/elsewhere.ts`: verified external profiles.
- `src/pages/index.astro`: introduction, About, footer and metadata.
- `src/styles/global.css`: layout, typography and theme colours. Dark mode follows the system preference with CSS; there is no toggle or stored preference.
- `public/`: favicon, social image, robots.txt and the single-page sitemap.

The social image is a checked-in 1200 × 630 PNG. Its editable source is `design/social.html`; after installing dependencies, open that file in a browser and capture its 1200 × 630 viewport to update `public/social.png`. It is a design asset, not an additional site page.

PulseWatch and DEV profile links were verified against https://dev.to/chriscompiles and https://pulsewatch.ai/. The other project URLs are intentionally absent. No unverified GitHub or X handles are published. `BUILDING` is a conservative placeholder for projects whose launch status is unknown.

## Verification

`npm run build` is the production check. For layout changes, inspect mobile and desktop widths in both system themes, use keyboard navigation, and check colour contrast. The page should contain five projects, no client scripts, no horizontal scrolling, and working `#projects` and `#about` anchors.
