import { defineConfig } from 'astro/config';

// Canonical host is the apex domain. www -> apex 301 is handled at Cloudflare
// (DNS redirect rule), not here. Path-level legacy 301s live in public/_redirects.
//
// TODO (deploy phase): re-add a sitemap. @astrojs/sitemap 3.1.6 targets Astro 5's
// routes:resolved hook and crashes on Astro 4.16, so it's deferred until the Astro
// version is pinned for deploy (either upgrade to Astro 5, or add a matched sitemap
// version / small static endpoint).
export default defineConfig({
  site: 'https://finnastle.com',
  // Clean URLs, no trailing slash: /work not /work/. Astro's default
  // (directory format -> route/index.html) is what caused the trailing
  // slash on Cloudflare. `file` format emits route.html, served at /route.
  trailingSlash: 'never',
  build: { format: 'file' },
});
