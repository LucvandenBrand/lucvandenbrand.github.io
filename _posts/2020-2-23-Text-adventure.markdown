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

![Animated Game Loop](/assets/posts/2020-2-23-Text-adventure/game_loop.gif "The game loop.")

Due to this clear structure, these are very fun to program in imperative languages like C, the language I've been using for my floppies up till now. The most important part to implement is the **parser**. The parser allows for translating the provided human-readable command (step 2 of our game loop) into commands the computer is able to understand. A very simple 1-word parser is easy to make: a mapping between words and actions (think of a large ugly switch case). If the user says `north` the in-game character is moved north, and if the user says `kill` the closest enemy is killed. The problem becomes more difficult if we which for our user to write full-blown sentences. Suddenly we do not only need to parse entire statements like `kill the goblin with the shortbread`, we need to provide hints like `the goblin you are trying to kill is not in this room`. How do we turn long statements with syntathic rules into actionable statements our code is able to, well, parse?

If this sounds familiar, then that's because this is exactly the (very simplified) idea behind the very language we are programming our game with! We write C in simple human readable statements, which are parsed and (eventually) get converted into actionable machine code. If an erronous statement has been provided in C, the compiler will user usually give a pretty good hint of what went wrong. I first learned about the topic of implementing parsers by following an university course on Compiler Construction. We will not use tools such as [yacc]() or [bison]() here though, we will roll our own cute little **recusive descent parser**.
