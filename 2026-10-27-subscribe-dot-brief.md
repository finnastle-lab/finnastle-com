# Brief: the live orange dot, and the subscribe flow behind it

2026-10-27 · finnastle.com · for whoever builds it

## What it is

A small orange dot, fixed to the viewport, that stays with you the whole way
down the homepage and pulses slowly. Clicking it opens a short panel that lets
someone subscribe to updates. It is the one piece of the homepage that follows
the reader.

## Why

The homepage now has two ways out: the client work, and an email address on
/studio. Both ask for a decision. Nothing on the page catches a person who
liked it but is not ready to send an email. The dot is that catch. It should
read as a live signal, not a marketing widget.

## The register it has to sit in

The homepage was rebuilt on 2026-10-27 (PR #51, branch
`design/homepage-atmosphere`). Read it before designing anything. The things
that matter here:

- The page is pixel art in both themes. The day sky is an ordered-dithered
  440px plate scaled up with `image-rendering: pixelated`. The night sky is
  square stars and a five-star pixel Crux. Anything that blinks on this page
  blinks in **steps**, not fades: see `@keyframes fa-crux` and
  `@keyframes fa-twinkle` in `src/styles/home.css`, both on
  `animation-timing-function: steps(1)`. A smooth CSS pulse would be the one
  thing on the page that is not of it.
- Orange is `var(--accent)`: `#d9360f` light, `#e5451a` dark. It is described
  in the design system as "the one guest". It is already spent twice on this
  page, on the hero ampersand and on the hover state of "Searching fearlessly
  for answers." A third use has to earn it.
- Everything that moves on this page stops when it is offscreen or the tab is
  hidden, and stops entirely under `prefers-reduced-motion: reduce`. The dot is
  always onscreen, so the tab-hidden rule is the one that applies.

## Behaviour

- Fixed position, visible from first paint to the footer. Pick a corner that
  does not cover the margin cutout rotations (they sit in the gutters at
  >= 80rem, 1.5rem from each edge) or the footer wordmark.
- The blink is slow and stepped. Treat 4 to 8 seconds as the cycle and keep the
  dot lit for most of it. It is a pilot light, not a notification.
- Click or Enter opens the panel. Escape closes it. A click outside closes it.
  Focus moves into the panel on open and returns to the dot on close.
- Dismissible, and the dismissal persists in `localStorage` alongside the
  existing `fa-theme` key. Someone who has already subscribed should not be
  followed down the page forever.
- Under reduced motion the dot is present and static.
- It must not trap scroll, shift layout, or cover text at any width. Check
  390, 834 and 1440 in both themes.

## The panel

Short. A line saying what arrives and how often, an email field, a button.
Finn's own framing of the work is the starting point for the copy, not a
newsletter pitch. The monthly floor he actually holds to is 4 Instagram posts
and 1 blog post, so do not promise a weekly letter.

## The open decision: there is no backend

This is a static Astro site on Cloudflare Pages. There is no form handler and
no mailing list provider configured anywhere in the repo. Nothing collects an
email address today. So the flow needs one of:

1. A provider (Buttondown, Kit, Listmonk). Real double opt-in, real archive,
   a monthly cost or a server.
2. A Cloudflare Pages Function writing to KV or D1. No third party, but the
   list then lives somewhere Finn has to maintain, and the confirmation email
   still needs a sender.
3. `mailto:finnastle@gmail.com` with a prefilled subject. Works today, costs
   nothing, and is honest about what it is. The address is already public on
   /studio. It is not a subscription, it is a request to be added to one.

**Do not pick this on Finn's behalf.** Ask. The UI is the same in all three
cases; only the form's action changes. Build the dot and the panel against
option 3 so it is testable end to end, and keep the endpoint in one named
constant in `src/consts.ts` so swapping it is a one-line change.

If the answer is 1 or 2, the privacy consequences need stating plainly before
anything ships: what is stored, where, who can read it, and how someone gets
removed.

## Where the code goes

- Component: `src/components/home/` alongside `SkyPanel.astro`,
  `SlideCards.astro` and `FooterWordmark.astro`.
- Styles: `src/styles/home.css`, namespaced like everything else in that file.
  Nothing in it may change another route. If the dot is ever wanted
  site-wide, that is a separate decision and a separate file.
- Constant: `src/consts.ts`, next to `SOCIAL`.

## How to verify

The repo already carries the checks. Run them, do not invent new ones:

- `npm run build`
- `.github/workflows/build.yml` runs Playwright 1.56.1 against the preview:
  sunmark integrity, dithered plate integrity, horizontal overflow at 390 and
  1440 in both themes.
- `node scripts/check-icon-catalogue.mjs` and
  `node scripts/check-cutout-browser.cjs`.
- A 52-route sweep for status, overflow and console errors.
- Contrast: every text style on the homepage passes WCAG AA in both themes
  today, and the lowest margin is 4.45:1. The panel must not be the thing that
  breaks that. Orange on the page ground is 4.45:1, which passes for large
  text only. Button text on an orange fill needs checking in both themes.
- Keyboard: 38 tab stops reach every destination on the homepage today. The
  dot adds one, and the panel adds its own. Nothing existing may be lost.

## Out of scope

The homepage itself. Do not restyle the hero, the sky, the slide cards or the
footer to make room for this.
