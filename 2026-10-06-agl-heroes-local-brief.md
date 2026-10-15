# Brief: add the two AGL hero images to /studio

**For:** a Claude Code session running on Finn's own computer
**Why local:** the cloud session can't reach YouTube or Finn's desktop. Its
network policy blocks youtube.com, and the desktop is a different machine.

## Context

finnastle.com is an Astro site. `/studio` lists client case studies, one Markdown file
per case in `src/content/studio/`. Each case's `hero:` frontmatter field names an image
file in `src/assets/studio/`. Astro optimises these images at build time, so
commit the full-resolution originals.

Two AGL cases need better heroes:

| Case | Content file | Current hero | Problem |
|---|---|---|---|
| AGL × Netflix ("Can't live without Netflix") | `src/content/studio/agl-netflix.md` | `agl-netflix.jpeg` (800×400) | Too small |
| AGL Join the Change | `src/content/studio/agl-join-the-change.md` | `agl-join-the-change.png` (1112×1450) | Finn has a better image |

## Setup

```bash
cd <your local clone of finnastle-lab/finnastle-com>
git fetch origin
git checkout claude/tender-bardeen-rimzmn
git pull origin claude/tender-bardeen-rimzmn
npm install
```

Work only on `claude/tender-bardeen-rimzmn`. It has an open pull request against `main`.

## Task 1: AGL × Netflix frame from YouTube

Source: https://www.youtube.com/watch?v=kjUefTi5Jc0 (Finn's AGL × Netflix TVC).

1. Download the best available quality to a temporary folder **outside the repo**:
   ```bash
   mkdir -p ~/tmp/agl-netflix && cd ~/tmp/agl-netflix
   yt-dlp -f "bv*[height>=1080]+ba/bv*+ba/b" -o "tvc.%(ext)s" "https://www.youtube.com/watch?v=kjUefTi5Jc0"
   ```
   If `yt-dlp` or `ffmpeg` is missing, install it (`brew install yt-dlp ffmpeg`).
2. Pull candidate frames, one every second:
   ```bash
   ffmpeg -i tvc.* -vf fps=1 -q:v 2 frame_%03d.jpg
   ```
3. Choose 4–6 candidates. A good hero frame:
   - shows the people and the joke: the TV Dad moments, ideally the dinner/F1 scene
     the site uses now;
   - is sharp, not mid-motion blur;
   - has no legal text, end card or heavy supers burned in;
   - is clearly AGL × Netflix at a glance.
4. **Show Finn the candidates and let him pick.** Don't choose for him.
5. Export the chosen moment at native resolution as a high-quality JPEG. Use the exact
   timestamp, not the 1 fps sample:
   ```bash
   ffmpeg -ss <mm:ss.ms> -i tvc.* -frames:v 1 -q:v 2 agl-netflix.jpg
   ```
6. Copy it into the repo and point the case at it:
   - `cp agl-netflix.jpg <repo>/src/assets/studio/agl-netflix.jpg`
   - In `src/content/studio/agl-netflix.md`, change `hero: agl-netflix.jpeg` to
     `hero: agl-netflix.jpg`
   - `git rm src/assets/studio/agl-netflix.jpeg`

**Never commit the video or the spare frames.** Only the one JPEG goes into the repo.

## Task 2: Join the Change image from the desktop

Finn saved the image he wants to `~/Desktop`. He hasn't given the filename.

1. List recently added images on the desktop (`ls -lt ~/Desktop | head`) and **confirm
   the right file with Finn** before using it.
2. Check its size (`sips -g pixelWidth -g pixelHeight <file>` on macOS). Ideally it's at
   least 1400px on the long edge; if it's smaller, tell Finn but still use it if he says so.
3. Copy it in, keeping its real extension (jpg, png or webp):
   - `cp <file> <repo>/src/assets/studio/agl-join-the-change.<ext>`
   - In `src/content/studio/agl-join-the-change.md`, set `hero: agl-join-the-change.<ext>`
   - If the extension isn't `.png`, `git rm src/assets/studio/agl-join-the-change.png`

## Check before committing

```bash
npm run build      # must finish with no errors
npm run preview    # open http://localhost:4321/studio#agl-netflix
                   # and http://localhost:4321/studio#agl-join-the-change
```

Both cases should open on load and show the new image, sharp, with no stretching. Check
light and dark mode (the toggle is top right).

## Commit and push

```bash
git add src/assets/studio src/content/studio
git status          # only the hero images and the two .md files should be listed
git commit -m "Studio: new AGL heroes (Netflix TVC frame, Join the Change key visual)"
git push origin claude/tender-bardeen-rimzmn
```

Then tell Finn it's pushed, and give the pixel dimensions of both images.

## Don'ts

- Don't edit any other case, copy or styling.
- Don't commit anything from `~/tmp` or the desktop apart from the two chosen images.
- Don't push to `main`.
