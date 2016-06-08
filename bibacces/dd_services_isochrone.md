---
layout: services
title: Calcul d'isochrones
level: 3
order: 030207
api: services
---

# Calcul d'isochrones / isodistances

Il s'agit de proposer une couche logicielle permettant d'utiliser le service de calcul d'isochrones / isodistances du Géoportail[^7]. Elle permet à l'utilisateur de passer ses paramètres en entrée du service et d'en récupérer la géométrie de la courbe calculée et ses caractéristiques dans une structure JSON en retour.

## Cas d'utilisation

L'utilisateur est un développeur qui souhaite mettre en oeuvre un formulaire permettant de saisir un point de départ des paramètres afin de déterminer une courbe ischrone ou isodistance à partir du service de calcul d'itinéraires du Géoportail. Il souhaite afficher cette courbe avec une API cartographique du marché.

## Mise en oeuvre

La mise en oeuvre de cette fonctionnalité est effective et est <a href="https://github.com/IGNF/geoportal-access-lib#isoCurve" target="_blank">décrite ici</a>.
