---
title: 'The things a certificate won’t teach you'
description: 'Eight Google AI courses, four things I built, and some thoughts about creative purpose when making gets easier than deciding why.'
pubDate: 2026-09-06
register: craft
draft: false
instagramCta: 'The half-built experiments, the things that never worked, and whatever I’m making instead of writing about it go on Instagram.'
heroImage: ../../assets/writing/four-things-i-built-hero.webp
heroImageAlt: 'A certificate of completion held by one hand and fed into the slot of a scuffed black office shredder, its window half full of cut paper. Behind it is a late-nineties cubicle with a CRT monitor, a mug, biros and beige filing cabinets. The photograph is machine-made.'
---

A certificate only proves you sat still.

I spent much of the year working through Google's AI courses. Partly because I wanted to understand the technology, partly because it's uncomfortable watching a machine get passably good at things you've spent years learning to do. I'd like to claim it was all curiosity. There was some professional self-defence in there too.

I also paint, write, make things, and spend an irritating amount of time maintaining the systems around making them. I wondered whether AI could give me some of that time back. Less checking apps, less rummaging through folders, less explaining the same decision for the fiftieth time. More time making the things I actually wanted to make.

When I finished the eighth course, I added the certificate to LinkedIn like a good professional. I even wrote a post that read, in places, like an ad for Gemini. Which, in fairness, it kind of was.

The courses cost me about seventy dollars on Coursera. They make up **one** Google AI Professional Certificate. I came out with four things I'd actually built.

<p class="certs-receipt">One Google AI Professional Certificate, issued 6 September 2026. Fundamentals · Brainstorming and Planning · Research and Insights · Writing and Communicating · Content Creation · Data Analysis · App Building · App Deployment. <a href="https://coursera.org/verify/professional-cert/G820ON21BRMV" rel="external nofollow">Verify it</a>. Next: Generative AI Leader, Google Cloud, in progress.</p>

## Getting out of the app

I hate the Instagram dashboard. Checking how a post did means opening Instagram, which means the Reels feed, suggested posts, and whatever else is designed to keep me there beyond the one thing I wanted to check.

So I built [Almanac](/tools/almanac). It pulls my posts and their reach, engagement and images through the Graph API, then puts the results somewhere I can look at them without opening Instagram. A scheduled job does the fetching every Sunday. I expected it to take a couple of weeks. The first working version took hours. What annoyed me was how easy it was.

![Screenshot of Almanac's Post Review for a carousel album: a photograph of a figure walking through tall forest with white and black line-drawn horses added over the grass, beside a reach of 165, 14 likes, zero saves, shares and comments, an efficiency figure of 8.5 per cent, the post's caption and the date 28/09/2026.](../../assets/tools/almanac-post-review.png)

*A post's numbers, without opening Instagram.*

It works. Now I open Almanac instead of Instagram. Same behaviour, different app, nobody trying to sell me something in between.

## Things I'd already made

Years of scanned collage elements were sitting in folders with names like `IMG_4471` and `scan_final_FINAL`. I knew the material was there. Finding the right bit while working in Figma was another matter.

The [Icon Pack](/tools/icon-pack) gives the elements readable, searchable names. An LLM helped turn the scanner's filing system into descriptions of what was actually on the page. Now I can leave the library open beside Figma, find a mark, and copy it across when I need it.

![Screenshot of the Icon Pack: a grid of scanned collage elements on transparent backgrounds, among them a magenta letter B, a blue wave, a yellow smiley face, a pink running horse and several engraved plants and animals, each under a descriptive filename such as "clipping text smile please" and "engraving otter crayfis…". The header reads 76 scanned collage elements, with a keyword filter above the grid.](../../assets/writing/four-things-i-built/icon-pack.png)

*Seventy-six scanned elements, named by what's on them.*

There's another benefit to having the material in one place. The agents I work with can refer to the same set of elements rather than each forming a slightly different idea of what my work looks like. I still make and choose the marks. The machine is better at remembering where I put them.

## What I couldn't quite explain

[Source Material](/tools/design-system/) grew out of a similar problem, although it became much harder to explain. It's the design system behind this site: the palette, the three type voices, the marks I return to, and the difference between a useful imperfection and decoration for its own sake.

Most of those decisions lived in my head. I'd look at something and know it was wrong without being particularly good at explaining why. That gets awkward when you're trying to work with another person, or asking a machine to help make something that still feels like yours.

![Screenshot of Source Material: a Palette section with six labelled swatches, Ink, Graphite, Sage frame, Paper, Card and Vermilion, each with its hex value, above a section called Three voices in tension setting Instrument Serif, Cousine and Inter side by side, and a panel headed "The fourth voice: hand-drawn" showing four scanned marks.](../../assets/writing/four-things-i-built/source-material.png)

*The palette and the three type voices, finally outside my head.*

Writing the rules down exposed how many I actually had, and how often I broke them. A design system makes some of that instinct easier to share. It hasn't made every judgment easy to describe. I still have to decide when the rules are worth following, and when something is better for breaking them.

## Something nobody asked for

Building an app was a course requirement. The horror-film dating app was my contribution.

There's a particular, slightly embarrassing loss that comes with a happy relationship: nobody's swiping anymore. I missed the rhythm of it. Left, right, fast, decisive, no explaining yourself. So I gave that rhythm to horror-film discovery instead.

[DreadSwipe](https://dreadswipe.ai.studio) lets me dismiss a film, add it to a watchlist, or give it the high-intent swipe up. The recommendations are organised around the kind of transgressive horror and thrillers I actually want to watch, rather than whatever happens to be popular.

<!-- DreadSwipe screenshot slot: drop the real capture at
     ../../assets/writing/four-things-i-built/dreadswipe.png and insert it here with
     literal alt text and an italic caption line. Do not fabricate one. -->

Nobody had asked for a horror-film dating app. The assignment had only asked for an app. I apparently had my own requirements.

## One drop in the ocean

Once DreadSwipe worked, I kept thinking about how little now stands between having an idea and seeing an early version running on a screen. A few prompts, some Enters and Tabs, and there's a prototype of something that didn't exist before. Keeping it working is another job entirely. I've found Claude more consistent than Gemini when the code needs to survive revisions.

[OpenAI said ChatGPT had 900 million weekly users by April 2026](https://openai.com/index/next-phase-of-enterprise-ai/). That doesn't mean 900 million people are making good software. But imagine even a fraction of them trying to make one odd little thing for themselves. An ocean of tiny, specific ideas, many with an audience of one. My horror-film picker is a drop.

And every drop costs something. Prompts consume tokens, iterations use compute, and all of it runs somewhere physical. The [IEA's accounting of rising data-centre electricity demand](https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary) is a useful reminder of the scale behind those friendly little text boxes.

Watching an idea turn into a working button is a very good feeling. That's the problem. The next version is always one more prompt away, and it's easy to spend tokens simply because I want to see what happens next. I'm writing this instead of painting.

I don't know what happens when making a piece of software becomes easier than deciding whether it needs to exist. Or what all those experiments add up to.

Deciding was the part I couldn't quite write into Source Material, either. You can describe a palette or name a mark. You can't make a rule for why a particular thing is worth making in the first place.

I started this hoping to make more time to paint, write and make things. I've got four things I didn't have before. I still haven't done the maths on whether I've saved any time.
