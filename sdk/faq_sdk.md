---
layout: ahn
title: FAQ
level: 1
order: 030000
api: ahn
---
# FAQ

## Quel est le namespace du SDK ?

Le namespace lié au Kit de développement est "Gp".

## Comment s'articule le SDK avec les autres blocs de code proposés par l'IGN ? 

Le Kit de développementest un bloc de fonctions de gestion de l'initialisation et de l'interaction avec la carte. 

Ce bloc utilise une bibliothèque cartographique et son extension Géoportail. Par défaut, le SDK utilise [Openlayers 3](http://openlayers.org/) et son [extension Géoportail](https://depot.ign.fr/geoportail/extensions/ol3/develop/doc/), qui repose elle-même sur la [bibliothèque d'accès](http://ignf.github.io/geoportal-access-lib/latest/jsdoc/index.html) JavaScript aux ressources du Géoportail. 

Les dépendances entre ces blocs sont les suivantes.

![diagramme découpage fonctionnel](../images/archi-ahn.png)

*NB* : les noms sur le diagramme ne sont pas les noms définitifs adoptés pour les composants désormais livrés :

* *l'API Géoportail "Services"* est devenue *la bibliothèque d'accès*

* *l'API Géoportail "Haut Niveau"* est devenue *le SDK Géoportail*


L'interface utilisateur du SDK est indépendante de la bibliothèque cartographique sur laquelle elle s'appuie.

