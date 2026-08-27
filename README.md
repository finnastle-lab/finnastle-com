# finnastle.com

Static site for finnastle.com, built with [Astro](https://astro.build). One
domain, two registers, markdown content, RSS. Scaffolded 2026-08-27.

Full scope + rationale: `../2026-08-27-site-migration-scope-v2.md`.
Redirect map: `../redirect-map.md`.

## Run

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview  # serve the build locally
```

## Structure

```
public/
  _redirects        Cloudflare Pages 301s (/finnastle -> /)
  robots.txt
src/
  consts.ts         site metadata + primary nav
  styles/global.css NEUTRAL baseline only — design pass comes later
  components/Nav.astro
  layouts/BaseLayout.astro   canonical, RSS <link>, register switch
  content/
    config.ts       'essays' collection schema
    essays/*.md      one file per essay (draft: true = hidden)
  pages/
    index.astro      /            (art register)
    work.astro       /work        visual portfolio (absorbs old Webflow)
    exhibitions.astro /exhibitions gallery-track credential
    tools.astro      /tools       unwrite + fa-art-namer hub
    studio.astro     /studio      business register (astlecreative.com 301 target)
    fast-as.astro    /fast-as     reserved (not in nav)
    writing/
      index.astro    /writing     essay list
      [...slug].astro /writing/:slug
    rss.xml.js       /rss.xml
```

## Two registers

`BaseLayout` takes `register="art" | "studio"`. It sets `data-register` on
`<html>`; `global.css` swaps tokens (studio = monochrome). Art pages keep the
chapter-variable accent. See plan §Identity.

## Deploy (Cloudflare Pages)

1. Push this repo to GitHub.
2. Cloudflare Pages → Create project → connect the repo.
   - Build command: `npm run build`
   - Output directory: `dist`
3. Test on the `*.pages.dev` preview URL **before** touching finnastle.com DNS.
4. Cutover: point finnastle.com (apex + www) at the Pages project (Phase 3).

## Status: scaffold

Pages are stubs (`.stub` class). No visual design yet — that's a separate pass
with the design-like-finn system. Content migration (current Squarespace text,
salvaged Webflow assets) is the next job.
