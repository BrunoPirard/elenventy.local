---
sitetitle: Mon site de base
title: Accueil
layout: base.njk
eleventyNavigation:
  key: Accueil
  order: 0
---

## Page d'acceuil uniquement

lorem ipsum c'est très bien

C'est la fin

### Derniers articles

<div class="featured__front">
<ul role="list" class="article__list">
    {% for post in collections.featured | reverse %}
        {% include 'partials/post-archive.njk' %}
    {%- endfor %}
</ul>
</div>
