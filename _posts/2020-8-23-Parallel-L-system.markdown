---
layout: post
title:  "Generating L-systems using Parallel Processing"
summary: "A short overview of methods to generate L-Systems in parallel."
date:   2020-8-23
categories: tutorial programming parallel l-system
---

L-systems are beautiful. My friend Job Talle [explains them very well](https://jobtalle.com/lindenmayer_systems.html), he'll be the first you find on a quick web-query about L-systems and he's the first person to introduce me to them. In short, an L-system is a mathematical notation that allow for generating beautiful self-repeating structures from a set of symbols and rules that apply to them.

What I mean with that can be best explained by example. There are two parts to L-systems: first we **generate** an L-system. 

## Generating L-systems sequentially
Let's define our L-system by its two components: it's **axiom** $A$ and its **rules** $R$.

$$ A = A,$$

$$ R = A \Rightarrow B, B \Rightarrow AB $$

To generate this L-system for $N$ steps, we simply apply the rules $R$ to all symbols for $N$ iterations.

## Rendering L-systems sequentially

Explanation.

## Generating L-systems in parallel

Explanation, sample code and short demo.

## Rendering L-systems in parallel

Explanation, sample code and short demo.

## References

Some references.
