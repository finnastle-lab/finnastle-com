import { defineConfig } from 'astro/config';

// Canonical host is the apex domain. www -> apex 301 is handled at Cloudflare
// (DNS redirect rule), not here. Path-level legacy 301s live in public/_redirects.
//
// Sitemap is a small static endpoint (src/pages/sitemap.xml.ts) rather than
// @astrojs/sitemap: 3.1.6 targets Astro 5's routes:resolved hook and crashes on
// Astro 4.16. Swap to the integration if the site moves to Astro 5.
export default defineConfig({
  site: 'https://finnastle.com',
  // Clean URLs, no trailing slash: /work not /work/. Astro's default
  // (directory format -> route/index.html) is what caused the trailing
  // slash on Cloudflare. `file` format emits route.html, served at /route.
  trailingSlash: 'never',
  build: { format: 'file' },
});
