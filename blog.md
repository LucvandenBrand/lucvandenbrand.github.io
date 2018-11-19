---
layout: default
title: Blog
permalink: /blog
---

Welcome to the **Cozy Coding** blog ♥️.

During my teaching years, I tried to make an effort to rekindle some of the fun others might have lost on their journey in becoming a software engineer. Programming is serious business, and should be treated as such. However, it is also cool, funny, and endlessly enjoyable.

This blog tries to focus on the latter, whilst showing that fun does not mean carelessness and ugly code. On the contrary, the most fun is had when your code is clean, neat, and adorably short.

## The Latest
<div id="post-list">
{% for post in site.posts limit:3 %}	
    <h3>
        <a href="{{ post.url }}">
            <img src="{{ "/assets/icons/coffee.svg" | relative_url }}" alt="☕">
            {{ post.title }}
        </a>
    </h3>
    <p>
        {{ post.summary }} 
    </p>
{% endfor %} 
</div>

## Archives and Feed
Want more? Great! Please visit the <a href="/archive">Archive by clicking on this link.</a>
Alternatively, you can <a href="/feed.xml">get an Atom feed here</a> for reading in your preferred reader. 