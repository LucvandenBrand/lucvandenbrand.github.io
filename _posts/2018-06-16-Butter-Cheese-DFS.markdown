---
layout: post
title:  "Butter, Cheese and Depth-first search"
summary: "An introduction to the concept of DFS"
date:   2018-06-16
categories: tutorial algorithms
tags: tutorial depth-first dfs graph search algorithm
---

Tic-Tac-Toe (or as we call it in the Netherlands, "[Boter Kaas en Eieren](https://translate.google.com/#nl/en/Boter%20kaas%20en%20Eieren)") is a game you probably have played at least once, and if you did,
you most assuredly finished with a draw (leaving you and your opponent
equally bored as when you started the darned game). In contrast to games like Chess,
the noble sport of Tic-Tac-Toe is simple enough for our feeble minds to plan to its
inevitable end:

![Tic-Tac-Toe draw states](/assets/posts/2018-06-16-Butter-Cheese-DFS/draws.png "Draw!")

## Why you draw
When you are mentally preparing your moves, your brain is performing
an algorithm known to Computer Scientists as **Depth-first search**.

Depth-first search is an algorithm that works on trees. A tree is a graph that
contains a collection of nodes that are connected in a parent-child relationship.
Imagine a hereditary tree where one parent can have multiple children (without loops, this family cannot travel through time):

![A hereditary tree](/assets/posts/2018-06-16-Butter-Cheese-DFS/tree.png "A very special family.")

Depth-first search is a searching algorithm that traverses down a branch of the tree and checks for every node in the branch if a particular condition has been met. If it reaches a leaf, it moves back up the tree and starts traversing the next alternative branch. For example, imagine the algorithm looking for `Jessy`,
it would find him like so:

![A hereditary tree](/assets/posts/2018-06-16-Butter-Cheese-DFS/tree.gif "Find Jessy.")

One can see how this simple search can help you solve Tic-Tac-Toe: you
mentally imagine what will happen if you place a marker on the board and envision
the end-game state that will occur as a result of that choice.
If this end-game state does not appeal to you, you imagine another sequence of
events that will most likely make you win. Don't believe me?
Try to beat the algorithm yourselves below!

<style>
    #game {
        position: relative;
        background-color: #AAA;
        border: 1px dashed black;
    }

    #playing-field {
        display: grid;
        grid-template-columns: auto auto auto;
        width:12em; height:12em; margin: auto;
        padding: 1em;
    }

    #playing-field div {
        border: 1px solid black;
        background-color: #EEE;
    }

    #playing-field div[mark="0"] {
        background-color: red;
    }

    #playing-field div[mark="1"] {
        background-color: green;
    }

    #interaction {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        color: white;
    }

    #interaction:after {
        position:absolute;
        content: "Click me, I'm interactive!";
        padding:1em;
    }

    #robot-thinking {
        display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,255,0.5);
        color: white;
    }

    #robot-thinking:after {
        position:absolute;
        content: "🤖 Thinking...";
        padding:1em;
        font-size: 2em;
    }
</style>

<div id ="game">
    <div id="robot-thinking">
    </div>
    <div id="interaction" onclick="this.style.display='none'">
    </div>
    <div id="playing-field">
    </div>
</div>
<script src="/assets/posts/2018-06-16-Butter-Cheese-DFS/TTT-dfs.js"></script> 

## Stepping up the game
In an effort to increase the complexity of this game, bored scientist have invented
_Meta_ Tic-Tac-Toe. A game that cannot be trivially solved, and is **much more
fun to play** as a result. In [part 2]({{ site.baseurl }}{% post_url 2018-07-14-Butter-Cheese-Recursion %}),
we will discuss this game and how it can be constructed using **recursion**.
