---
layout: post
title:  "A Recursive Decent into Text Adventures"
summary: "How simple text adventures can make good use of parsing techniques."
date:   2019-10-04
categories: challenge programming language parsing text adventure
---

As a challenge, [I am trying to write source code for a large number of 3.5" floppy disks]({{ site.baseurl }}{% post_url 2019-10-04-Floppy-Challenge %}). As of a few days ago, **I completed my second floppy.** It is a text adventure. You can find the sources [here](https://github.com/LucvandenBrand/FloppyChallenge/tree/master/floppies/text-adventure). The game is also listed on the [Floppy Challenge website](https://floppychallenge.com) if you just want the binaries.

![Tiled Image](/assets/posts/2020-2-23-Text-adventure/Zork_photo.jpg "Photo from Wikipedia."){: .figure .right .small}
I'm sad to say that I never got to play much text adventures as a kid. I was of the [Freddy Fish](https://en.wikipedia.org/wiki/Freddi_Fish) generation: colourful graphics and simple buttons clearly explaining to me what is happening and what I am able to do. It was only in my early teens that I learned about one of the first text adventures, Zork. You can [play Zork online](https://archive.org/details/msdos_Zork_I_-_The_Great_Underground_Empire_1980) these days. The game loop is described in three easy steps:

1. **Game** provides introduction.
2. **User** provides commands.
3. **Game** describes results of commands.
4. If the results are not a win-state, go to step 2.
5. **Game** provides congratulations.

Of course, there is an argument to be made that most (if not all) games can be reduced to this description. For text-adventures though, this description is extremely close to the actual implementation and behaviour of the game (see the GIF below).

[GIF]

Due to this clear structure, these are very fun to program in imperative languages like C, the language I've been using for my floppies up till now. The most important part to implement is the **parser**. 