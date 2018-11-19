---
layout: default
title: Projects
permalink: /projects
---

On this page I have featured some of my _personal projects_ for easy access by anyone who is interested.
I tend to write **cross-platform**, **open-source** solutions, and do my best to provide clear documentation 
whenever applicable. If anything does not work, feel free to create an issue on the
linked Git page or to [send me a message](/contact) directly.

## Projects
<div id="project-list">
    {% for item in site.data.projects %}
    {% include project.html item=item %}
    {% endfor %}
</div>

Interested in more? You can find it on my [Github page](https://github.com/LucvandenBrand).