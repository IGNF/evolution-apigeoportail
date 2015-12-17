---
layout: ahn
title: Couverture fonctionnelle
level: 2
order: 020200
api: ahn
---

# Couverture Fonctionnelle

Le Kit de développement (ou "API Haut Niveau" dans ce document) doit permettre de créer une carte intéractive aux fonctionnalités équivalentes à partir d'un même code et indépendamment de la bibliothèque cartographique sous-jacente.

## Centrage, orientation et zoom

L'API Haut Niveau doit permettre de positionner le centre de la carte par différents moyens : 

* par géolocalisation (si l'internaute l'autorise), 
* par géocodage (d'une adresse, d'un toponyme, d'une parcelle cadastrale),
* par coordonnées exprimées dans la projection courante de la carte. 

Le développeur peut aussi définir l'orientation de la carte, l'inclinaison de la caméra (en 3d) et le niveau de zoom. 

## Ajout de couches Géoportail et autres 

L'API Haut Niveau doit permettre d'ajouter à la carte les couches du Géoportail accessibles grâce à la clé API. 

Le développeur peut aussi ajouter des couches "métier", fournies dans des formats standards : KML, GPX, WMS, WFS, GeoRSS etc. 

Le développeur doit pouvoir configurer l'opacité, la visibilité, le style de chaque couche de la carte.

## Ajout d'outils Géoportail et autres

L'API Haut Niveau doit permettre d'ajouter à la carte les outils d'interaction avec la carte que le développeur juge utile (et d'enlever ceux qui n'ont pas d'intérêt pour son utilisation). 

Il doit pouvoir rajouter les outils classiques fournis par la librairie (navigation, outils de mesure etc) ainsi que ceux fournis par l'extension Géoportail (géocodage, altimétrie etc).


## Intéractions avec les éléments de la carte

L'API Haut Niveau doit permettre d'agir en fonction de certains évènements remontés :

* par la carte : changement de zoom, déplacement, modification de la projection, réponse d'un service etc,
* par les couches : ajout d'une couche, modification de visibilité, d'opacité etc,
* ou par les outils : ajout d'un outil, modification de paramétrage d'un outil, réponse d'un service etc.


