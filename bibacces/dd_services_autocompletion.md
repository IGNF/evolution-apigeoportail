---
layout: services
title: Autocompletion
level: 3
order: 030204
api: services
---


# Autocomplétion

Il s'agit de proposer une couche logicielle permettant l'utilisation du service d'autocomplétion5. Cette couche logicielle devra envoyer une requête correctement construite au serveur d'autocomplétion[^5] selon des paramètres passés par le développeur et, parser la réponse du serveur, pour présenter au développeur les résultats.

## Cas d'utilisation

Le cas d'utilisation classique est le champ de saisie texte d'un moteur de recherche dans une application dont on veut qu'il propose des suggestions d'adresses ou de toponymes au fur et à mesure de la saisie. Les suggestions peuvent alors être ré-exploitées, soit pour récupérer les coordonnées qui y sont associées, soit comme critère de recherche pour le service de Géocodage du Géoportail (recherche plus pertinente et informations attributaires plus riches).

## Mise en oeuvre

La mise en oeuvre de cette fonctionnalité est effective et est <a href="https://github.com/IGNF/geoportal-access-lib#autocomplete" target="_blank">décrite ici</a>.

