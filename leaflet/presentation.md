---
layout: leaflet
title: Présentation
level: 1
order: 000000
api: leaflet
---

# Extension Géoportail pour Leaflet

## Présentation

L'extension Géoportail pour Leaflet définit des classes et composants à utiliser avec Leaflet permettant de faciliter l'accès aux ressources délivrées par le Géoportail avec cette bibliothèque.

## Fonctionnalités proposées

Les fonctionnalités proposées par cette extension sont les suivantes :

### Affichage simple des couches WMTS et WMS Géoportail

A partir du simple nom de la couche (par exemple : ORTHOIMAGERY.ORTHOPHOTOS) et de votre clef API (prise sur [professionnels.ign.fr](http://professionnels.ign.fr/api-web) ), vous pouvez créer une carte Leaflet utilisant la couche Géoportail de votre choix comme fond de carte.

### Widget de gestion de l'empilement des couches

Intégrez à une carte Leaflet un widget permettant à l'internaute d'organiser l'empilement des couches de données qu'il visualise, de jouer sur l'opacité d'affichage et d'accéder aux légendes et autres informations qui peuvent y être attachées. [En savoir plus sur le widget](./Leaflet-LayerSwitcher.html).

### Barre de recherche utilisant le service de Géocodage IGN

Intégrez à une carte Leaflet une barre de recherche par adresses, toponymes ou identifiant de parcelle cadastrale permettant de se positionner à l'endroit recherché à l'aide du service de Géocodage et des données de référence de l'IGN. [En savoir plus sur le widget](./searchEngine.html).

### Géocodage inverse sur une carte Leaflet

Ajoutez à une carte Leaflet un composant permettant à un internaute d'afficher les toponymes, adresses ou parcelles cadastrales présentes à proximité d'un endroit choisi sur la carte. [En savoir plus sur le widget](./reverseGeocode.html).

### Calcul d'itinéraire sur une carte Leaflet

Ajoutez à une carte Leaflet un formulaire permettant faire des recherche d'itinéraires à partir du service proposé par la plateforme Géoportail et de les visualiser avec les instructions de navigation associées. [En savoir plus sur le widget](./route.html).


### Calcul d'isochrones / isodistances sur une carte Leaflet

Utilisez le service de calcul d'isochrones / isodistances proposé par la plateforme Géoportail pour visualiser sur une carte Leaflet les zones que vous pouvez atteindre en voiture ou à pieds à partir d'un point donné en un temps (ou sur une distance) voulu(e). [En savoir plus sur le widget](./isochron.html).

### Affichage de l'altitude en un point

En plus des coordonnées x et y de la souris sur une carte Leaflet, obtenez l'altitude à l'aide du service altimétrique proposé par la plateforme Géoportail. [En savoir plus sur le widget](./mousePosition.html).







 
