---
layout: ol3
title: Coordonnées de la souris
level: 2
order: 000702
api: ol3
---

# Widget d'affichage des coordonnées de la souris (x,y et h)

## Présentation générale

Ce widget permet d'indiquer, dans une carte OL3, les coordonnées de la souris sur la carte avec l'altitude obtenue à partir du [service d'altimétrie du Géoportail](http://api.ign.fr/tech-docs-js/fr/developpeur/alti.html).

Il est paramétrable, l'utilisateur peut donc indiquer :

* une clef d'accès à la plateforme pour l'obtention des altitudes
* les systèmes de coordonnées proposés pour l'affichage
* les coordonnées à afficher (toutes, seulement le z ou seulement (x,y))
* le temps d'immobilité de la souris à partir duquel une requête sera envoyée sur le service d'altimétrie.

## Mise en oeuvre

La mise en oeuvre de cette fonctionnalité est effective et est <a href="https://github.com/IGNF/geoportal-extensions/blob/master/README-ol3.md#mp" target="_blank">décrite ici</a>.

