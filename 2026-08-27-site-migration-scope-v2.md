---
title: Site Migration — Scope & Safe Sequence (v2)
status: active
created: 2026-08-27
supersedes: 2026-08-22-site-migration-scope-v1.md
source: five-year-plan-v1.md §Web architecture, checklist A1 / B1
owner: finnastle@gmail.com
note: v2 corrects the registrar map after seeing the live Squarespace + IONOS panels. v1's assumption (astlecreative=IONOS, finnastle=Squarespace) was backwards.
---

# Site Migration — Scope & Safe Sequence (v2)

Executes checklist **A1** (web architecture) as the **Q1 (Sep–Dec 2026)** build.
Corrected against the actual registrar panels (27 Aug 2026).

---

## The one principle that removes the fear

> **You cannot lose a domain by repointing it. You lose a domain only two ways:
> (1) it expires, or (2) a registrar transfer is botched.**

Changing DNS / nameservers / hosting is fully reversible and invisible to
ownership. So: **change hosting freely, protect registration separately, one
change at a time, and treat any registrar transfer as a separate, optional,
later step — never on the Q1 critical path.**

---

## The estate — confirmed (4 domains, 2 registrars)

| Domain | Registrar | Points to now | Role | Plan action |
|---|---|---|---|---|
| **finnastle.com** | **IONOS** | Squarespace (A → 198.185.159.144) | **HERO** — ranks for your name | Repoint DNS → Cloudflare Pages. Keep forever. |
| **astlecreative.com** | **Squarespace** | Squarespace site | Trading name | 301 → `finnastle.com/studio`. Keep forever. |
| **finnastlecreative.com** | **IONOS** | Squarespace (same IP) | Defensive variant | 301 → `finnastle.com`. Keep (cheap insurance). |
| **fineasscreative.com** | **IONOS** | "Domain not in use" | **Burner** — throwaway virality, *deliberately not attached to your name* | **Keep + auto-renew ON, but do NOT redirect to finnastle.com.** Leave parked; wakes up only for a future throwaway project on its own hosting. |

**Expiry:**
- The three **IONOS** domains show `10/05/2026` — **ambiguous, possibly imminent.** Verify the true date + auto-renew (Phase 0). This is the only genuine domain-loss risk in the whole project, and the hero is one of them.
- **astlecreative.com** (Squarespace): **Oct 24, 2027** — comfortable runway, auto-renew icon present.

**Key correction vs v1:** the hero (`finnastle.com`) is at **IONOS**, only *pointed* at Squarespace. Cancelling Squarespace hosting therefore touches **nothing** about the hero's registration. **No domain needs to change registrar for this migration** — only DNS/hosting moves.

**Still to confirm:** where `/fearlessanswer` currently resolves and what it should map to.

---

## Target architecture (all free except domain renewals)

```
finnastle.com ──(nameservers @ IONOS → Cloudflare)──> Cloudflare Pages (static site, free)
                                                        └─ markdown content, RSS, internal 301 map

astlecreative.com     ─(reg. stays @ Squarespace, NS → Cloudflare)─> 301 finnastle.com/studio
   /fearlessanswer    ─────────────────────────────────────────────> 301 <specific destination>
finnastlecreative.com ─(reg. stays @ IONOS, NS → Cloudflare)───────> 301 finnastle.com
fineasscreative.com   ─(BURNER — keep parked, NOT redirected; off-name by design)

mail: finnastle@gmail.com (unchanged)
```

- **Host:** Cloudflare Pages (free). **DNS + all redirects:** Cloudflare (free), one place for all four domains.
- **Source:** GitHub repo (free) → auto-deploy on push. **SSL:** automatic, free, all domains.
- Registrations stay exactly where they are. Cloudflare only holds *nameservers* (reversible).

---

## Site structure — day one (agreed 27 Aug 2026)

Two registers, one site (per plan §Identity). Astro pages; markdown content.

| Path | Register | Purpose |
|---|---|---|
| `/` | art chapter | Home |
| `/work` | art chapter | Visual portfolio — **absorbs the retired Webflow site** |
| `/exhibitions` | art chapter | Gallery-track history (the credential) — the 2015–2024 record from the current text page |
| `/writing` | art chapter | Essays — canonical home (Medium/LinkedIn → syndication only) |
| `/tools` | on-territory hub | **unwrite** + **fa-art-namer (Google naming script)** — hub page framing each, linking to live app / repo |
| `/studio` | monochrome business | Proposals, client-facing, the invoicing register |
| `/fast-as` | business | Reserved — documented method + cost curve (graduates only with paying customers) |
| RSS | — | `@astrojs/rss` feed for `/writing` |

**Canonical host:** apex `finnastle.com` (301 `www` → apex).
**Webflow:** retired — salvage copy + image assets first (see [redirect-map.md](redirect-map.md)).

## Cost — before vs after

| Item | Now | After |
|---|---|---|
| Squarespace **website** subscription | ~$16–23/mo (~$200–280/yr) | **$0** (cancelled) |
| Hosting / DNS / redirects / SSL (Cloudflare) | — | $0 |
| `finnastle.com` (IONOS) | IONOS renewal | same (keep at IONOS) |
| `finnastlecreative.com` (IONOS) | IONOS renewal | same (or drop) |
| `fineasscreative.com` (IONOS, burner) | IONOS renewal | same (keep parked — cheap optionality) |
| `astlecreative.com` (Squarespace) | ~$20/yr | ~$20/yr (domain-only, keep) |
| **Total ongoing** | **~$250–340/yr** | **~$50–70/yr** (4 domain renewals, everything else free) |

Net: **~$200+/yr saved.** Real cost is your build time, not money. Registrar
consolidation (→ Cloudflare Registrar, at-cost ~$10/domain) is an optional later
saving, off the critical path.

---

## The safe sequence

### Phase 0 · 🚨 Expiry lock-down (THIS WEEK — the only real risk)
- [x] IONOS → **finnastle.com**: **auto-renew ON**, **transfer lock ON**, renews **5 Oct 2026** (auto). Auth code available under Change provider if ever needed. ✅ *Hero secured 27 Aug 2026.*
- [x] IONOS → **finnastlecreative.com**: auto-renew ON. ✅ *Confirmed 27 Aug 2026.*
- [x] IONOS → **fineasscreative.com** (burner, off-name by design): auto-renew ON, left parked, not redirected. ✅ *Confirmed 27 Aug 2026.*
- [x] Squarespace → **astlecreative.com**: **auto-renew ON**, **domain lock ON**, WHOIS privacy ON, renews **Oct 24 2027** (A$23.50/yr). ✅ *Confirmed 27 Aug 2026.*
- [ ] Confirm `finnastle@gmail.com` is the registrant/admin email on all four (that's where expiry + transfer notices land).
- [ ] *(Optional)* IONOS "Domain Guard" is currently **not** active (shows "Order") — basic transfer lock is enough; skip the paid upsell unless you want it.

> Completing Phase 0 alone removes the domain-loss risk. Everything after is hosting, which is reversible.

### Phase 1 · Redirect map (before moving anything) ✅ *done 27 Aug 2026 → [redirect-map.md](redirect-map.md)*
- [x] Crawled `finnastle.com` — **it's a single-page site** (one URL: `/`, duplicated at `/finnastle`). Negligible URL structure to preserve.
- [x] Map built: `/finnastle` → 301 `/`; everything else is 1:1. Full table in [redirect-map.md](redirect-map.md).
- [ ] `/fearlessanswer` destination — still TBD (doesn't exist yet; decide target).
- [ ] Decide canonical host: apex `finnastle.com` (recommended) vs `www`.

### Phase 2 · Build & stage the new site (zero risk to live site)
- [x] Generator: **Astro** (decided 27 Aug 2026 — already using it at work; suits the two-register design, reads markdown, RSS via `@astrojs/rss`).
- [x] **Scaffold built + committed** (local git repo at `04_WORK/website/`, branch `main`, commit `96503da`). All 7 routes + `/fast-as` + RSS build clean. ✅ 27 Aug 2026.
- [x] Internal `_redirects` (`/finnastle` → `/` 301), **RSS** (`/rss.xml`), **canonical tags**, two-register layout — all wired in and verified in the build output.
- [ ] Content pass: migrate current Squarespace text + salvaged Webflow assets into the stub pages.
- [ ] Visual design pass (design-like-finn) — the scaffold ships a neutral baseline only.
- [ ] Push repo to GitHub → connect Cloudflare Pages → `*.pages.dev` preview URL.
- [ ] Test fully on the preview URL. Nothing points at a real domain yet.
- [ ] Re-add a sitemap (deferred — @astrojs/sitemap 3.1.6 needs Astro 5; pin versions at deploy).

### Phase 3 · Cut `finnastle.com` over (reversible)
- [ ] Add `finnastle.com` to Cloudflare (free); it imports DNS — verify every record carried over (watch for any TXT/verification; you're on gmail so likely no MX).
- [ ] At **IONOS**, change nameservers → the two Cloudflare NS. **Registration stays at IONOS.**
- [ ] Point apex + `www` at the Pages project.
- [ ] Verify: loads, SSL valid, spot-check 10 old URLs 301, RSS resolves. Submit sitemap to **Google Search Console**; watch coverage 2–4 weeks.
- [ ] Rollback if needed: revert nameservers at IONOS (or restore the A record → 198.185.159.144).

### Phase 4 · Redirect the other three
- [ ] Move `astlecreative.com` (Squarespace) and `finnastlecreative.com` (IONOS) nameservers → Cloudflare. Registrations stay put.
- [ ] Cloudflare Redirect Rules (301):
      - `astlecreative.com` (apex+www) → `finnastle.com/studio`
      - `astlecreative.com/fearlessanswer` → its specific destination
      - `finnastlecreative.com` → `finnastle.com`
      - *(`fineasscreative.com` — no rule; stays parked and off-name.)*
- [ ] Calendar reminder: renew `astlecreative.com` + `finnastle.com` indefinitely.

### Phase 5 · Decommission + (optional) consolidation
- [ ] After the new site is **stable ~2–4 weeks and rankings hold**: cancel the Squarespace **website** subscription. `astlecreative.com` stays as a **domain-only** registration at Squarespace (~$20/yr) — the subscription and the domain are separate products, so this is safe.
- [ ] *(Optional, later, off critical path)* Consolidate registrars to **Cloudflare Registrar** (at-cost ~$10/domain) once DNS is already on Cloudflare. Needs: unlock + auth/EPP code from current registrar, domain >60 days old. One at a time; keep auth codes.

---

## Domain-loss risk register

| Risk | Mitigation |
|---|---|
| Domain **expires** (esp. the IONOS 10/05/2026 ambiguity) | **Phase 0**: auto-renew ON + valid card + gmail monitored, verified per domain. |
| **Botched transfer** | No transfers during migration; consolidation is Phase 5, optional, one at a time, auth codes saved. |
| Cancelling Squarespace **website** plan affects a domain | Only `astlecreative.com` is Squarespace-registered; it survives as domain-only. The hero is at IONOS, untouched. |
| **Rankings drop** | Redirect map built first (Phase 1); every URL 301s; canonical tags; GSC submitted (Phase 3). |
| **Email breaks** | On gmail free (low risk); still capture any TXT/MX before the NS move and recreate on Cloudflare. |
| **Cutover fails** | Nameserver/A-record change is reversible; site proven on `*.pages.dev` first. |

---

## What I need from you to move

1. **Phase 0 answers:** the true IONOS renewal date + auto-renew status for the three IONOS domains. *(fineasscreative decided: keep parked, off-name.)*
2. **`/fearlessanswer`:** where it lives now and where it should redirect to.
3. **Generator:** Astro / Eleventy / you pick.
4. Green light to run **Phase 1** (crawl `finnastle.com`, build the redirect map) — the zero-risk step everything depends on.
