---
title: Blog
layout: base.njk
---

<h1>Mes Articles</h1>
{% for post in collections.posts %}

- [{{ post.data.title }}]({{ post.url | url }})
  {%- endfor %}
