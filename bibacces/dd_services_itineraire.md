---
layout: services
title: Calcul d'itinéraires
level: 3
order: 030206
api: services
---

# Calcul d'itinéraires

Il s'agit de proposer une couche logicielle permettant d'utiliser le service de calcul d'itinéraires du Géoportail[^6]. Elle permet à l'utilisateur de passer ses paramètres en entrée du service et d'en récupérer l'itinéraire et les instructions dans une structure JSON en retour.

## Cas d'utilisation

L'utilisateur est un développeur qui souhaite mettre en oeuvre un formulaire permettant de saisir des points de départ et d'arrivée et de déterminer un itinéraire à partir du service de calcul d'itinéraires du Géoportail. Il souhaite pouvoir afficher la géométrie de l'itinéraire avec une API cartographique du marché.

## Mise en oeuvre

La mise en oeuvre de cette fonctionnalité est effective et est <a href="https://github.com/IGNF/geoportal-access-lib#route" target="_blank">décrite ici</a>.
