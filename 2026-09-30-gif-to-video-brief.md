# Brief — convert "Let the world tell your story" GIFs to video

**Status:** ready to build. Blocks publishing the essay.
**Owner:** unassigned
**Essay:** `src/content/essays/2020-09-13-let-the-world-tell-your-story.md` (currently `draft: true`)

---

## Why

The essay carries eight images, seven of them long animations (44–180 frames). They were
hotlinked from Medium's CDN and got pulled local in `24f1334`, which fixed the third-party
dependency but not the weight.

Astro's sharp pipeline converts animated GIF to animated WebP and **preserves the animation**,
which is good, but on clips this long it buys nothing. Measured on the built page:

| | |
|---|---|
| Source GIFs | 17,407 KB |
| After Astro's animated-WebP conversion | 17,885 KB |

It got **bigger**. One file nearly doubled: `05.gif` went 2,095 KB → 4,088 KB. The page ships
**17.9 MB**, which is why the essay is still a draft.

Animated WebP is the wrong container for multi-second footage. These are videos.

---

## Measured results

All numbers from real encodes on 2026-09-30, `ffmpeg 9.0.1`, sources in
`src/assets/writing/let-the-world-tell-your-story/`.

### H.264 MP4, CRF curve

The two worst compressors are `03` (grainy red rock) and `04` (aerial B&W, fine detail):

| File | GIF | CRF 26 | CRF 30 | CRF 34 |
|---|---|---|---|---|
| `03` | 3,583 KB | 1,462 KB | **746 KB** | 325 KB |
| `04` | 1,352 KB | 1,091 KB | **500 KB** | 166 KB |

CRF 26 is not aggressive enough (`04` only saved 19%). CRF 34 is visibly soft. **CRF 30 is the
pick** — a frame pulled from the CRF 30 encode of `03` holds its grain and texture, because the
source was already heavily dithered and posterised, so the codec has little to destroy.

### Full set at CRF 30

| File | GIF | MP4 @ CRF 30 |
|---|---|---|
| `01` | 2,539 KB | 222 KB |
| `02` | 2,775 KB | 335 KB |
| `03` | 3,583 KB | 746 KB |
| `04` | 1,352 KB | 500 KB |
| `05` | 2,095 KB | 497 KB |
| `06` | 3,532 KB | 477 KB |
| `07` | 1,401 KB | 144 KB |
| **Total (7 clips)** | **17,280 KB** | **2,925 KB** |

**83% smaller.** Posters for all seven come to **182 KB** as WebP q70.

### WebM/VP9 — tested, not recommended

VP9 totalled 6,495 KB against H.264's 6,976 KB at CRF 26, so it wins slightly in aggregate but
loses badly per-file on exactly the clips that matter (`03`: 1,679 KB vs 1,462 KB; `05`:
1,536 KB vs 1,016 KB). Not worth a second encode and a `<source>` fallback chain. H.264 MP4 plays
everywhere. Revisit only if the page weight still bothers you afterwards.

> Note: VP9 fails outright on these sources without an explicit `-pix_fmt yuv420p`, because the
> GIFs decode to `gbrap` and libvpx refuses it. Same flag is already in the commands below.

---

## Decisions

1. **`08.gif` is not animated.** It reports 0 frames — it is a single-frame GIF (the clouds).
   Leave it as an image and let Astro optimise it as now. Do not convert it. Seven videos, one
   image.
2. **CRF 30, H.264, MP4 only.** No WebM.
3. **Files go in `public/`, not `src/assets/`.** Astro's asset pipeline does not process `<video>`
   sources, and raw HTML in `.md` cannot reference `src/` imports. Putting them in `public/`
   keeps this a plain markdown change with no MDX migration.
4. **`preload="none"` plus a poster.** This is the single biggest win and it is not about codecs.
   With posters only on first paint, the page lands at **~180 KB** instead of 17.9 MB, and the
   footage streams as the reader reaches it.
5. **Autoplay muted on scroll**, so it behaves like the GIFs it replaces rather than making the
   reader click seven play buttons. `muted` + `playsinline` is required or iOS will refuse.

---

## Work

### 1. Encode

```bash
cd src/assets/writing/let-the-world-tell-your-story
mkdir -p ../../../../public/writing/let-the-world-tell-your-story
for n in 01 02 03 04 05 06 07; do
  ffmpeg -y -i $n.gif -movflags +faststart -pix_fmt yuv420p \
    -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -crf 30 -preset slow -an \
    ../../../../public/writing/let-the-world-tell-your-story/$n.mp4
done
```

`-movflags +faststart` moves the index to the front so playback can begin before the file
finishes. `scale=trunc(iw/2)*2` forces even dimensions, which H.264 requires (`06` and `07` are
600×338 and would fail without it).

### 2. Posters

`ffmpeg` on this machine has no `libwebp`, so extract PNG first frames and convert with the
`sharp` that Astro already depends on (libvips 8.15.3, confirmed present):

```bash
for n in 01 02 03 04 05 06 07; do
  ffmpeg -y -i src/assets/writing/let-the-world-tell-your-story/$n.gif -vframes 1 /tmp/$n.png
  node -e "require('sharp')('/tmp/$n.png').webp({quality:70}).toFile('public/writing/let-the-world-tell-your-story/$n.webp')"
done
```

### 3. Markup

Replace each markdown image with a `<video>`. Raw HTML passes through Astro markdown untouched.
`width`/`height` are mandatory — without them the page reflows as each clip loads, which is the
layout-shift problem the rehost was meant to fix.

```html
<video
  class="essay-clip"
  src="/writing/let-the-world-tell-your-story/01.mp4"
  poster="/writing/let-the-world-tell-your-story/01.webp"
  width="600" height="300"
  muted loop playsinline preload="none"
  aria-label="Bare feet walking across rippled red sand, the hem of a pale blue robe swinging above them."
></video>
```

Dimensions: `01`–`05` and `08` are 600×300; `06` and `07` are 600×338.

**Carry the alt text across.** `<video>` has no `alt`, so the existing alt strings move to
`aria-label`. They are already written and sitting in the markdown — do not discard them and do
not regenerate them. They were written from looking at each clip.

### 4. Autoplay on scroll

One `IntersectionObserver`, added to the essay layout or inlined in the markdown:

```html
<script>
  const clips = document.querySelectorAll('.essay-clip');
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.play().catch(() => {}); }
      else { e.target.pause(); }
    }
  }, { rootMargin: '200px' });
  clips.forEach((c) => io.observe(c));
</script>
```

Respect the reader's motion preference — skip the observer entirely and leave the poster showing
under `prefers-reduced-motion: reduce`.

### 5. CSS

`.essay img` already handles sizing; `<video>` needs the same rule:

```css
.essay-clip { width: 100%; height: auto; display: block; margin: 1.5rem 0; }
```

### 6. Clean up

Delete the seven source GIFs from `src/assets/writing/let-the-world-tell-your-story/` once the
MP4s are in and the page renders. Keep `08.gif`. They are in git history if they are ever needed.

---

## Acceptance

- [ ] Page weight on `/writing/2020-09-13-let-the-world-tell-your-story` under **300 KB** on first
      paint, measured with `read_network_requests` or devtools, not estimated.
- [ ] All seven clips play, loop, and are silent.
- [ ] Nothing downloads until a clip is near the viewport.
- [ ] No layout shift as clips load — every `<video>` has `width` and `height`.
- [ ] All seven `aria-label`s match the alt text they replaced.
- [ ] `08` still renders as an optimised image, not a video.
- [ ] Nothing autoplays under `prefers-reduced-motion: reduce`.
- [ ] `npm run build` clean; no external image or media requests on the page.

## Then

Flip `draft: true` to `false`. The essay also still carries Medium's auto-extracted description
rather than a written dek, and has no `heroImage` or `instagramCta` — worth doing in the same
pass, but that is writing, not engineering, and it is FA's call.
