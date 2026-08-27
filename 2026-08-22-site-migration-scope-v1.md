---
title: Site Migration — Scope & Safe Sequence (v1)
status: superseded
superseded-by: 2026-08-27-site-migration-scope-v2.md
superseded-note: v1 had the registrars backwards (assumed astlecreative=IONOS, finnastle=Squarespace). Actual map is in v2.
created: 2026-08-22
source: five-year-plan-v1.md §Web architecture, checklist A1 / B1
owner: finnastle@gmail.com
links: [five-year-plan-v1.md, five-year-plan-checklist.md]
---

# Site Migration — Scope & Safe Sequence

Executes checklist **A1** (web architecture) as the **Q1 (Sep–Dec 2026)** build.
Goal from the plan: *one domain (`finnastle.com`), static markdown site, RSS, every
URL survives or 301s, `astlecreative.com` → `/studio`, mail stays on gmail.*
This doc adds the **how** — cheap, efficient, and with **zero risk of losing a domain**.

---

## The one principle that removes the fear

> **You cannot lose a domain by repointing it. You lose a domain only two ways:
> (1) you let it expire, or (2) you botch a registrar transfer.**

Changing DNS, nameservers, or hosting is **fully reversible** and invisible to
domain ownership. So this migration is built around one rule:

- **Change hosting freely. Protect registration separately.**
- **Do one change at a time, verify, then the next.**
- **Any registrar transfer is a separate, optional, *later* step** — never mixed
  into the cutover, never on the Q1 critical path.

---

## Current state (confirm these — I can't see your panels)

| # | What to confirm | Where | Why it matters |
|---|---|---|---|
| C1 | `finnastle.com` — is it a **free bundled** domain (came with the site plan) or **paid separately**? Expiry date? Auto-renew ON? | Squarespace → Domains | If it's bundled-free, cancelling the site plan can end the free status. Must resolve **before** cancelling. |
| C2 | `finnastle.com` current **DNS records** — any MX (custom email), TXT/verification, or other records? | Squarespace → DNS | You're on gmail free, so probably no custom MX — but any TXT/verification must be recreated after a nameserver move. |
| C3 | `astlecreative.com` — expiry, auto-renew ON, and **what it currently serves** (parked page / old site / forwarding). Does `/fearlessanswer` exist today, and where does it point? | IONOS → Domains | Determines whether the `/fearlessanswer` mapping is preserving something live or creating something new. |
| C4 | Rough **count of live URLs** on `finnastle.com` today | `finnastle.com/sitemap.xml` | Sizes the redirect map. For a portfolio/personal site this is usually <50. I can crawl it for you. |

Everything below works regardless of the answers; the answers only change small
details (noted inline).

---

## Target architecture (all free except domain renewals)

```
finnastle.com ──(nameservers)──> Cloudflare DNS (free)
     apex + www ──────────────> Cloudflare Pages  (static site, free)
                                 └─ content in markdown, RSS, internal 301 map

astlecreative.com ─(nameservers)─> Cloudflare DNS (free)
     apex + www ─(Redirect Rule)─> 301 finnastle.com/studio
     /fearlessanswer ─(rule)────> 301 <specific destination>

mail: finnastle@gmail.com  (unchanged, no custom-domain email)
```

- **Host:** **Cloudflare Pages** (recommended over Netlify — better free tier for
  a low-traffic static site, and DNS + redirects live in the same place so
  `astlecreative.com` needs no separate host at all). Either satisfies the plan;
  pick the one you'll finish. Everything below assumes Cloudflare.
- **Source:** GitHub repo (free) → auto-deploys to Pages on push.
- **SSL:** automatic, free, both domains.

---

## Cost — before vs after

| Item | Now | After |
|---|---|---|
| Squarespace site subscription | ~$16–23/mo (~$200–280/yr) | **$0** (cancelled) |
| Hosting (Cloudflare Pages) | — | $0 |
| DNS + redirects (Cloudflare) | — | $0 |
| SSL | included | $0 |
| Custom email | none | $0 (gmail) |
| `finnastle.com` renewal | ~$20/yr (Squarespace) | ~$20/yr (stay) **or** ~$10/yr (move to Cloudflare Registrar, at-cost) |
| `astlecreative.com` renewal | IONOS (~$15–20/yr typical post-promo) | keep at IONOS **or** ~$10/yr (Cloudflare Registrar) |
| **Total ongoing** | **~$230–320/yr** | **~$20–40/yr** |

Net: **~$200+/yr saved.** The real cost is *your time building the static site*,
not money. Registrar consolidation to Cloudflare saves a further ~$10–20/yr but is
**optional** and deferred (see Phase 5).

---

## The safe sequence

Each phase is reversible until the one after it. Nothing touches the live site
until Phase 3, and the live site is proven on a staging URL first.

### Phase 0 · Lock down (do first — zero risk)
- [ ] Squarespace: **auto-renew ON** for `finnastle.com`; valid card on file; note expiry (C1).
- [ ] IONOS: **auto-renew ON** for `astlecreative.com`; valid card on file; note expiry (C3).
- [ ] Confirm `finnastle@gmail.com` is the registrant/admin email on both and that you can access it — this is where expiry + transfer-auth notices go.
- [ ] Enable **registrar transfer lock** on both while not transferring (default; just confirm).
- [ ] Screenshot / export current site content from Squarespace (its export is imperfect — you'll rebuild in markdown, but keep it as reference).

### Phase 1 · Build the redirect map (before moving anything)
> *The plan is explicit: migrations tank rankings on URL structure, not on host changes.*
- [ ] Pull the full URL list from `finnastle.com/sitemap.xml` (I can crawl + tabulate).
- [ ] Table: **old URL → new URL** (301). Aim for 1:1; only redirect to home as a last resort.
- [ ] Record the `astlecreative.com/fearlessanswer` → *specific destination* mapping (not a lump redirect).

### Phase 2 · Build & stage the new site (zero risk to live site)
- [ ] Pick a static generator that reads markdown + emits RSS. Recommend **Astro** (handles the two-register design well) or **Eleventy** (simplest). Your call — say the word and I'll scaffold it.
- [ ] GitHub repo → connect to Cloudflare Pages → deploys to a `*.pages.dev` preview URL.
- [ ] Build core pages incl. `/studio` (monochrome business register) and reserve `/fast-as`.
- [ ] Add the internal **`_redirects`** file (the Phase 1 map), **RSS feed**, and **canonical tags** pointing home.
- [ ] Test everything on the preview URL. **Nothing points at `finnastle.com` yet.**

### Phase 3 · Cut `finnastle.com` over (reversible — revert nameservers to roll back)
- [ ] Add `finnastle.com` to Cloudflare (free plan); it imports existing DNS records — verify every record from C2 came across (esp. any MX/TXT).
- [ ] Change nameservers at Squarespace → the two Cloudflare NS. Registration **stays at Squarespace** for now.
- [ ] Point apex + `www` at the Pages project.
- [ ] Verify: site loads, SSL valid, spot-check 10 old URLs 301 correctly, RSS resolves.
- [ ] Submit new sitemap to **Google Search Console**; keep an eye on coverage for 2–4 weeks.

### Phase 4 · Point `astlecreative.com` at `/studio`
- [ ] Add `astlecreative.com` to Cloudflare; change nameservers at IONOS → Cloudflare NS.
- [ ] **Redirect Rule:** apex + `www` → `https://finnastle.com/studio` (301). No hosting needed.
- [ ] **Redirect Rule:** `/fearlessanswer` → its specific destination (301).
- [ ] Calendar reminder: renew `astlecreative.com` indefinitely; never serve a site from it.
  *(Alternative with zero migration: IONOS built-in domain forwarding → `/studio`. But path-specific `/fearlessanswer` mapping is cleaner on Cloudflare, so moving DNS to CF is recommended.)*

### Phase 5 · Decommission + (optional) registrar consolidation
- [ ] After the site is **stable ~2–4 weeks and rankings hold**: cancel the Squarespace **website subscription**.
      → **First resolve the `finnastle.com` domain (C1):** either keep it at Squarespace domain-only (~$20/yr, zero effort) **or** transfer to Cloudflare Registrar (~$10/yr). **Do not cancel the subscription until the domain's fate is settled**, especially if it was bundled-free.
- [ ] *(Optional, later)* Transfer `finnastle.com` and/or `astlecreative.com` to **Cloudflare Registrar** (at-cost). Only do this once DNS is already on Cloudflare — the transfer is then invisible to visitors. Requires: domain unlocked, **auth/EPP code** from current registrar, and the domain **>60 days** old / >60 days since last transfer. Save the auth codes.

---

## Domain-loss risk register (the whole point of doing it this way)

| Risk | Mitigation |
|---|---|
| Domain **expires** | Auto-renew ON + valid card + gmail monitored (Phase 0). |
| **Botched transfer** | Transfers are separate + late (Phase 5), never during cutover. Keep auth codes; verify 60-day eligibility; do one domain at a time. |
| **Cancelling Squarespace kills the free bundled domain** | Settle domain ownership (transfer out or pay domain-only) *before* cancelling the subscription (Phase 5 gate). |
| **Rankings drop** | Redirect map built first (Phase 1); every URL 301s; canonical tags; GSC submitted (Phase 3). |
| **Email breaks** | You're on gmail free (low risk). Still: capture MX/TXT before the nameserver move (C2) and recreate them on Cloudflare. |
| **Cutover goes wrong** | Nameserver change is reversible — revert to Squarespace/IONOS NS to roll back instantly. Site is proven on `*.pages.dev` before cutover. |

---

## What I need from you to move

1. Answers (or a "go crawl it") for **C1–C4** above.
2. Static generator preference — **Astro / Eleventy / other**, or "you pick."
3. Registrar strategy — **leave both where they are** (simplest) or **consolidate to Cloudflare Registrar later** (~$10–20/yr cheaper). Either is safe with this sequence.

Say the word and I'll start with Phase 1 (crawl `finnastle.com`, build the redirect map) — it's the zero-risk step everything else depends on.
