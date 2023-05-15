---
title: Blog
description: Archive des articles
keyword: nouvelles entreprise
menu-order: 2
---

<h1>Mes Articles</h1>
<ul role="list" class="article__list">
    {% for post in collections.posts | reverse %}
        {% include 'partials/post-archive.njk' %}
    {%- endfor %}
</ul>
