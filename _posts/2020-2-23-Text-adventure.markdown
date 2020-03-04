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

If this sounds familiar, then that's because this is exactly the (very simplified) idea behind the very language we are programming our game with! We write C in simple human readable statements, which are parsed and (eventually) get converted into actionable machine code. If an erronous statement has been provided in C, the compiler will usually give a pretty good hint of what went wrong. I first learned about the topic of implementing parsers by following an university course on Compiler Construction. We will not use tools such as [yacc]() or [bison]() here though, we will roll our own cute little **recusive descent parser**.

## Defining the grammar
In order to write something that can parse a human-readable language, we first need to **determine the grammar of the language**. Grammars like these are usually defined in [?](), with statements in the shape of `STATEMENT => DEFINITION`. In turn, a `DEFINITION` can itself have its own `SUB_DEFINITION`'s or [recursively]({{ site.baseurl }}{% post_url 2018-07-14-Butter-Cheese-Recursion %}) define itself with its own defininition. I'm aware that my explanation might be a little bit sub-par, but I'm hoping our text adventure's grammar definition below makes this idea a bit more clear to you.

{% highlight javascript %}
{% raw %}
STATEMENT := ACTION | MOVEMENT | EXIT
ACTION := INSPECTING | TAKING | PLACING | LOCKING | UNLOCKING | KILLING
INSPECTING := LOOK {AT} ITEM | ROOM | INVENTORY
TAKING := TAKE ITEM
PLACING := PLACE ITEM
LOCKING := LOCK DOOR WITH ITEM
UNLOCKING := UNLOCK DOOR WITH ITEM
DOOR := [a-Z]+
KILLING := KILL ENTITY WITH ITEM
ENTITY := [a-Z]+
ITEM := [a-Z]+
MOVEMENT := WALK DIRECTION
DIRECTION := north | east | south | west
{% endraw %}
{% endhighlight %}

The topmost definition shows the three main things a user can do in this game: an **action** (walking, taking, placing, locking, unlocking and killing), a **movement** and **exit**. The keen reader might notice that this grammar represent a graph of possible commands, with `STATEMENT` at the root and things like `ENTITY` and `ITEM` as the leaves.

![Grammar Graph](/assets/posts/2020-2-23-Text-adventure/grammar_graph.svg "Grammar Graph.")

This idea of a graph is a very useful mental model to have, as we can now give **meaning** to each path in our tree, from root to leaf. As long as the user provides a sequence of characters that allow us to traverse the tree, the user wrote a correct statement! If not, we have a pretty good idea of where we diverted from our tree and what kind of feedback to give.

## How to write recursive decent parsers
