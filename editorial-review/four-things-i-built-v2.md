---
title: 'The things a certificate can’t prove'
description: 'Eight Google AI courses, four things I built, and an unexpected question about making things.'
pubDate: 2026-09-06
register: craft
draft: true
instagramCta: 'The half-built experiments, the things that never worked, and whatever I’m making instead of writing about it go on Instagram.'
heroImage: ../../assets/writing/four-things-i-built-hero.webp
heroImageAlt: 'A certificate of completion held by one hand and fed into the slot of a scuffed black office shredder, its window half full of cut paper. Behind it is a late-nineties cubicle with a CRT monitor, a mug, biros and beige filing cabinets. The photograph is machine-made.'
---

A certificate only proves you sat still.

I spent much of the year working through Google's AI courses. When I finished the eighth, I added the certificate to LinkedIn like a good professional. I even wrote a post that read, in places, like an ad for Gemini. Which, in fairness, it kind of was.

I'd started for fairly practical reasons. I paint, write, make things, and spend an irritating amount of time maintaining the systems around making them. I wondered whether learning a bit more about AI could give me some of that time back. Less checking apps, less rummaging through folders, less explaining the same decision for the fiftieth time.

The eight courses cost me about seventy dollars on Coursera. They make up **one** Google AI Professional Certificate, [which you can verify](https://coursera.org/verify/professional-cert/G820ON21BRMV). I came out with four things I'd actually built.

## I wanted the numbers, not the app

I hate the Instagram dashboard. Checking how a post did means opening Instagram, which means the Reels feed, suggested posts, and whatever else is designed to keep me there beyond the one thing I wanted to check.

So I built [Almanac](/tools/almanac). It pulls my posts and their reach, engagement and images through the Graph API, then puts the results somewhere I can look at them without opening Instagram. A scheduled job does the fetching every Sunday. I expected it to take weeks to put together. The first working version took hours.

It works. Now I open Almanac instead of Instagram. Same behaviour, different app, nobody trying to sell me something in between.

## All those things I'd already made

Years of scanned collage elements were sitting in folders with names like `IMG_4471` and `scan_final_FINAL`. I knew the material was there. Finding the right bit while working in Figma was another matter.

The [Icon Pack](/tools/icon-pack) gives the elements readable, searchable names. An LLM helped turn the scanner's filing system into descriptions of what was actually on the page. Now I can leave the library open beside Figma, find a mark, and copy it across when I need it.

There's another benefit to having the material in one place. The agents I work with can refer to the same set of elements rather than each forming a slightly different idea of what my work looks like. I still make and choose the marks. I just have a better way of finding and sharing them.

## My head is a bad place to keep a brand

[Source Material](/tools/design-system/) grew out of a similar problem, although it became much harder to explain. It's the design system behind this site: the palette, the three type voices, the marks I return to, and the difference between a useful imperfection and decoration for its own sake.

Most of those decisions lived in my head. I'd look at something and know it was wrong without being particularly good at explaining why. That gets awkward when you're trying to work with another person, or asking a machine to help make something that still feels like yours.

Writing the rules down exposed how many I actually had, and how often I broke them. A design system makes some of that instinct easier to share. It hasn't made every judgment easy to describe. I doubt it will.

## An audience of exactly one

Building an app was a course requirement. The horror-film dating app was my contribution.

There's a particular, slightly embarrassing loss that comes with a happy relationship: nobody's swiping anymore. I missed the rhythm of it. Left, right, fast, decisive, no explaining yourself. So I gave that rhythm to horror-film discovery instead.

[DreadSwipe](https://dreadswipe.ai.studio) lets me dismiss a film, add it to a watchlist, or give it the high-intent swipe up. The recommendations are organised around the kind of transgressive horror and thrillers I actually want to watch, rather than whatever happens to be popular.

Nobody needed this. But I did.

## One drop in the ocean

Once DreadSwipe worked, I kept thinking about how little now stands between having an idea and seeing an early version running on a screen. A few prompts, some Enters and Tabs, and there's a prototype of something that didn't exist before. Keeping it working is another job entirely. I've found Claude more consistent than Gemini when the code needs to survive revisions.

Still, the scale of the possibility is astonishing. [OpenAI said ChatGPT had 900 million weekly users by April 2026](https://openai.com/index/next-phase-of-enterprise-ai/). That doesn't mean 900 million people are making good software. But imagine even a fraction of them trying to make one odd little thing for themselves. An ocean of tiny, specific ideas, many with an audience of one. My horror-film picker is a drop.

And every drop costs something. Prompts consume tokens, iterations use compute, and all of it runs somewhere physical. The [IEA's accounting of rising data-centre electricity demand](https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary) is a useful reminder of the scale behind those friendly little text boxes.

There's something seductive about watching an idea become a thing. A picture, a paragraph, a working button. The next version is always one more prompt away. I'm aware of how easy it is to keep spending tokens simply because I want to see what happens next. I'm certainly not immune to it.

I don't know what happens when making a piece of software becomes easier than deciding whether it needs to exist. Or what all those experiments add up to.

I started this hoping to make more time to paint, write and make things. I haven't done the maths on whether I've succeeded. I do have four things I didn't have before, and I enjoyed making them more than I expected.
