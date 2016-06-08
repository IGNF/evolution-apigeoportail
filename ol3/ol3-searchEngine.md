---
layout: ol3
title: Moteur de Recherche
level: 2
order: 000500
api: ol3
---

# Widget de positionnement par Géocodage IGN

## Présentation générale

Ce widget permet de positionner la carte à partir de la saisie d'un localisant dont la position sera retournée par le service de géocodage de l'IGN.

Le widget est paramétrable par le développeur de façon à pouvoir exploiter les différents modes d'accès du service de Géocodage :

* type de localisants (adresses, toponymes, parcelles, ...)
* différentes possibilités de filtrage (attributaire, géographique)

Il peut être proposé en mode recherche simple (un champ texte) ou avancée (choix par l'utilisateur des différents critères de filtrage).

La saisie de localisants peut s'accompagner d'un mode d'autocomplétion s'appuyant sur le service d'autocomplétion de la plateforme Géoportail.

## Mise en oeuvre

La mise en oeuvre de cette fonctionnalité est effective et est <a href="https://github.com/IGNF/geoportal-extensions/blob/master/README-ol3.md#geocode" target="_blank">décrite ici</a>.

