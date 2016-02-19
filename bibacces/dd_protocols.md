---
layout: services
title: Protocoles d'accès aux services
level: 2
order: 030100
api: services
published: false
---

# Gp.protocols : Protocoles d'accès

Les webservices de la plateforme Géoportail sont, par définition, accessibles via le protocole HTTP.

Le dialogue avec ces services depuis une API cliente peut donc naturellement se faire **en mode AJAX** (via des objets de type XMLHTTPRequest[^1] : « XHR ») en s'exposant alors aux blocages des navigateurs due à la politique sécuritaire dite de « même origine »[^2] empêchant l'accès à des ressources hébergées sur un serveur ayant un autre nom de domaine que celui où est hébergée la page web.

La plateforme Géoportail offre aussi la possibilité de dialoguer avec les services **en mode JSONP[^3]** afin de contourner ce blocage. Le principe du protocole JSONP mis en oeuvre sur la platforme Géoportail est détaillé en annexes.

L'API Géoportail « Services » offrira donc les outils permettant de dialoguer avec les services de la platforme selon ces deux modes.

[^1]: cf. http://fr.wikipedia.org/wiki/XMLHttpRequest

[^2]: « Same-origin policy » : http://en.wikipedia.org/wiki/Same-origin_policy

[^3]: cf. http://en.wikipedia.org/wiki/JSONP

**Remarque :** Les utilisateurs de l'API Géoportail Services auront rarement besoin d'utiliser directement les outils exposés ici. Ces derniers ont surtout pour vocation à être exploités par la couche supérieure exposée dans le package Gp.Services.
