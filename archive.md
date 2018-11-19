---
layout: post
title: Archive
permalink: /archive/
---

Welcome to the archive! Here you will find all posts neatly ordered based on their publishing date.

<div id="post-list">
{% for post in site.posts %}	
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