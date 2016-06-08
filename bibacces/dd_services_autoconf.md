---
layout: services
title: Autoconfiguration
level: 3
order: 030201
api: services
---

# Accès au service d'autoconfiguration

Il s'agit de proposer une couche logicielle permettant d'utiliser le service d'auto-configuration des API dont le principe est expliqué en Annexes. Cette couche logicielle devra envoyer une requête au service d'auto-configuration, avec les paramètres éventuellement fournis, puis parser la réponse du service, pour finalement construire une variable globale contenant les informations utiles pour l'utilisation de l'API (configuration des services, informations sur les couches, etc.).

## Cas d'utilisation

L'utilisateur est un développeur web qui souhaite initialiser sa fenêtre cartographique, et a donc besoin d'informations sur les couches et services Géoportail disponibles avec sa clé de contrat API (paramètres des couches, territoires, pyramides d'images, etc), sur les paramètres de configuration par défaut (configuration de la carte, territoires, couches par défaut), ou autres informations renvoyées par le service d'auto-configuration.

L'utilisateur peut fournir des paramètres optionnels, comme sa ou ses clés de contrat API, la fonction de rappel à lancer en cas de succès de la récupération de l'auto-configuration, le protocole à utiliser, ou encore l'identifiant d'une couche agrégée dont il souhaite plus d'informations concernant l'agrégation. (voir ci-dessous pour une liste plus détaillée)

En retour, sauf si une des clés fournies est invalide, il récupère un objet JSON contenant les informations utiles à l'utilisation de l'API ou des services Géoportail.

## Mise en oeuvre

La mise en oeuvre de cette fonctionnalité est effective et est <a href="https://github.com/IGNF/geoportal-access-lib#getConfig" target="_blank">décrite ici</a>







