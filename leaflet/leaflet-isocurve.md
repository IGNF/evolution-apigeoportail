---
layout: leaflet
title: Calcul d'isochrones
level: 2
order: 000701
api: leaflet
---

# Widget de calcul et d'affichage d'isochrones / isodistances

## Présentation générale

### Utilisation par l'internaute

Le widget se présente sous la forme d'un formulaire (minimisable / maximisable) permettant de saisir les paramètres nécessaires au lancement d'un calcul d'isochrones (point de départ ou d'arrivée, mode de calcul, ...).

La saisie du point de départ ou d'arrivée doit pouvoir se faire par intéraction avec la carte, par géocodage (géocodeur IGN) ou par saisie directe de coordonnées.

Une fois l'isochrone/distance obtenue celle-ci est affichée sur la carte.

### Utilisation par un développeur

la création du widget permet au développeur :

* d'accrocher les différents éléments graphiques (formulaire de saisie) à la page html via le mécanisme standard des CSS,
* de rendre visibles ou non des élements du formulaire à l'internaute,
* d'activer / désactiver certains modes de saisie des points pour le calcul,
* de fixer des valeurs par défaut de certains paramètres de calcul d'iso.

Le développeur peut agir sur l'état (maximisé / minimisé) du widget

## Mise en oeuvre

La mise en oeuvre de cette fonctionnalité est effective et est <a href="https://github.com/IGNF/geoportal-extensions/blob/master/README-leaflet.md#isocurve" target="_blank">décrite ici</a>.

