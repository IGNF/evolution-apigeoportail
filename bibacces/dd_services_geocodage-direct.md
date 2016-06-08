---
layout: services
title: Géocodage direct
level: 3
order: 030202
api: services
---

# Géocodage Direct

Il s'agit de proposer une couche logicielle permettant l'utilisation du service de géocodage du Géoportail[^4]. Cette couche logicielle devra envoyer une requête correctement construite au serveur de géocodage selon des paramètres passés par le développeur et, parser la réponse du serveur, pour présenter au développeur les résultats.

## Cas d'utilisation

L'utilisateur est un développeur qui souhaite géocoder un ou plusieurs localisants. Il peut rechercher l'emplacement d'un toponyme, d'une adresse, d'une parcelle cadastrale et filtrer cette recherche en fonction d'attributs ou de contraintes géographiques. Il peut utiliser plusieurs méthodes et protocoles pour faire cette recherche. La réponse du serveur, après avoir été analysée et structurée, lui sera communiquée pour qu'il puisse ensuite effectuer le traitement qu'il souhaite.

## Mise en oeuvre

La mise en oeuvre de cette fonctionnalité est effective et est <a href="https://github.com/IGNF/geoportal-access-lib#geocode" target="_blank">décrite ici</a>

