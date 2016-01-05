---
layout: ahn
title: Couverture fonctionnelle
level: 2
order: 020200
api: ahn
---

# Fonctions proposées

Le Kit de développement (ou "SDK" dans ce document) permet de créer une carte interactive aux fonctionnalités de base indépendamment de la bibliothèque cartographique sous-jacente.

## Centrage, orientation et zoom

Le Kit de développement permet de positionner le centre de la carte par différents moyens : 

* par géolocalisation automatique (si l'internaute l'autorise), 
* par géocodage (d'une adresse, d'un toponyme, d'une parcelle cadastrale),
* par coordonnées exprimées dans la projection courante de la carte. 

Le développeur peut aussi définir l'orientation de la carte, l'inclinaison de la caméra (en 3D) et le niveau de zoom. 

## Ajout de couches Géoportail et externes 

Le Kit de développement permet d'ajouter à la carte les couches du Géoportail accessibles grâce à la clé API. 

Le développeur peut aussi ajouter des couches "métier", fournies dans des formats standards : KML, GPX, WMS, WFS, GeoRSS etc. 

Le développeur peut configurer l'opacité, la visibilité, le style de chaque couche de la carte.

## Ajout d'outils Géoportail et autres

Le Kit de développement permet d'ajouter à la carte les outils d'interaction avec la carte que le développeur juge utiles (et d'enlever ceux qui n'ont pas d'intérêt pour son utilisation). 

Il peut rajouter les outils classiques fournis par la librairie (navigation, outils de mesure etc) ainsi que ceux fournis par l'extension Géoportail (géocodage, altimétrie etc).


## Intéractions avec les éléments de la carte

Le Kit de développement permet d'agir en fonction de certains évènements remontés :

* par la carte : changement de zoom, déplacement, modification de la projection, réponse d'un service etc,
* par les couches : ajout d'une couche, modification de visibilité, d'opacité etc,
* ou par les outils : ajout d'un outil, modification de paramétrage d'un outil, réponse d'un service etc.


