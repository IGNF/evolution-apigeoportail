---
layout: services
title: Géocodage inverse
level: 3
order: 030203
api: services
---

# Geocodage inverse

Il s'agit de proposer une couche logicielle permettant l'utilisation du service de géocodage indirect. Cette couche logicielle devra envoyer une requête correctement construite au serveur de géocodage indirect selon des paramètres passés par le développeur et, parser la réponse du serveur, pour présenter au développeur les résultats.

## Cas d'utilisation

Il peut rechercher un toponyme et/ou une adresse à proximité d'une position. Il peut utiliser plusieurs méthodes et protocoles pour faire cette recherche. La réponse du serveur, après avoir été analysée et structurée, lui sera communiquée pour qu'il puisse ensuite effectuer le traitement qu'il souhaite.

## Mise en oeuvre

La mise en oeuvre de cette fonctionnalité est effective et est <a href="https://github.com/IGNF/geoportal-access-lib#reverseGeocode" target="_blank">décrite ici</a>.
