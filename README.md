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

The build produces static HTML plus CSS, the font and public assets. No server, adapter, SPA rewrite or `render.yaml` is needed. Add `chriscompiles.com` as the custom domain in Render and follow its DNS instructions. Canonical URLs, the generated sitemap and social metadata use `https://chriscompiles.com`.

## Edit content

- `src/data/projects.ts`: project names, short descriptions, status and optional URL. Add `url: 'https://…'` to make a whole row a link. Rows without a URL remain ordinary content.
- `src/data/elsewhere.ts`: verified external profiles.
- `src/pages/index.astro`: homepage introduction, projects and About copy.
- `src/layouts/SiteLayout.astro`: shared navigation, footer and document metadata.
- `src/styles/global.css`: layout, typography and theme colours. Dark mode follows the system preference with CSS; there is no toggle or stored preference.
- `public/`: favicon, social image and robots.txt. The Astro sitemap integration generates `sitemap-index.xml` and `sitemap-0.xml` during the build.

## Add writing

Add a Markdown file to `src/content/writing/`. Its filename becomes the URL slug: `first-post.md` is published at `/writing/first-post/`.

Every piece requires this frontmatter:

```yaml
---
title: A clear title
description: A concise summary used on the index and in page metadata.
publicationDate: 2026-09-18
type: Essay
draft: true
---
```

`type` must be `Essay`, `Note`, `Fiction` or `Build log`. Set `draft: false` to include a piece in the newest-first writing index, generate its public route and add it to the sitemap. Drafts are excluded from all three. `src/content/writing/example.md` is an unpublished reference file and can be replaced when the first real piece is ready.

The social image is a checked-in 1200 × 630 PNG. Its editable source is `design/social.html`; after installing dependencies, open that file in a browser and capture its 1200 × 630 viewport to update `public/social.png`. It is a design asset, not an additional site page.

Project URLs are maintained in `src/data/projects.ts`; social URLs are maintained in `src/data/elsewhere.ts`. PulseWatch, Didn’t Ship, DEV Community, GitHub and X were verified on 18 September 2026. AthleteAsk remains unlinked because its candidate domain did not resolve when checked. Well Built remains unlinked because no public URL is established. `BUILDING` is a conservative placeholder for projects whose launch status is unknown.

## Verification

`npm run build` is the production check. For layout changes, inspect mobile and desktop widths in both system themes, use keyboard navigation, and check colour contrast. The homepage should contain five projects, the site should contain no client scripts or horizontal scrolling, and the `#projects` and `#about` anchors should work.
