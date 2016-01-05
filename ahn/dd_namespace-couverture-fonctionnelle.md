---
layout: ahn
title: Description détaillée
level: 1
order: 030000
api: ahn
---
# Description détaillée

## Namespace

Le namespace lié à l'API Géoportail Haut Niveau est "Gp".

## Découpage fonctionnel

Le Kit de développement (ou "API Haut Niveau" dans ce document) est un bloc de fonctions de gestion de l'initialisation et de l'interaction avec la carte. 

Ce bloc utilise une librairie cartographique et son extension Géoportail, qui repose elle-même sur l'"API Géoportail Services". 

Les dépendances entre ces blocs sont les suivantes.

![diagramme découpage fonctionnel](../images/archi-ahn.png)


L'interface utilisateur de l'API Haut Niveau est indépendante de la bibliothèque cartographique sur laquelle elle s'appuie.

