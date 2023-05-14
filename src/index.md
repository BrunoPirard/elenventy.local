---
sitetitle: Mon site de base
title: accueil
layout: base.njk
---

## Sous-titre

lorem ipsum c'est très bien

{% for post in collections.posts %}

- [{{ post.data.title }}]({{ post.url | url }})
  {%- endfor %}

C'est la fin
