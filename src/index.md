---
sitetitle: Mon site de base
title: accueil
layout: base.njk
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
