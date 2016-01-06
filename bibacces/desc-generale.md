---
layout: services
title: Description Générale
level: 1
order: 020000
api: services
---

# Description générale

## Objectifs de la Bibiliothèque d'accès

La Bibliothèque d'accès est une brique logicielle mise à disposition des développeurs pour leur faciliter l'accès aux services de la plateforme Géoportail. Pour cela, elle propose un ensemble de classes et fonctions permettant :

* d'accéder aux définitions et paramétrages des webs services de la plateforme Géoportail ainsi qu'aux ressources accessibles depuis une clef d'accès à la plateforme.
* d'utiliser les webservices spécifiques de la plateforme en faisant abstraction des protocoles de dialogue.


## Couverture Fonctionnelle

La Bibliothèque d'accès doit permettre d'encapsuler l'accès aux webservices suivants de la plateforme :

* Autoconfiguration
* Géocodage
* Autocomplétion
* Calcul d'itinéraire et d'isochrones / isodistances
* Services d'altimétrie et de calcul de profils altimétriques
* Transformations de coordonnées (en projet)

Au travers de l'accès au service d'autoconfiguration, la Bibliothèque d'accès permet de consulter les droits relatifs à une clef (Ressources disponibles) et de disposer des paramètres nécessaires pour exploiter ces ressources avec des outils logiciels tiers. 

Elle doit permettre aussi de prendre en charge les différents protocoles d'interrogation des services offerts par la plateforme Géoportail.


## Cas d'utilisation

### Accès au paramétrage des couches WMTS / WMS / WFS / KML de la plateforme

Un développeur souhaite afficher des couches WMTS, WMS, WFS ou KML diffusées par la platforme Géoportail à l'aide d'une bibliothèque cartographique du marché (Google, Leaflet, OpenLayers, …).

Il dispose d'une clef d'accès à la plateforme.

Il a besoin de connaître le paramétrage à appliquer pour afficher ces couches (URL, layers, pyramides, … ).

Le service d'autoconfiguration de la plateforme Géoportail permet d'obtenir ces informations.

La Bibilothèque d'accès doit permettre d'invoquer simplement ce service, d'analyser la réponse de façon à proposer les informations lues de façon simple, intuitive et exploitable.

### Mise en oeuvre d'un formulaire de recherche, de calcul d'itinéraire

Un développeur souhaite proposer un formulaire HTML permettant d'intéragir avec les services de Géocodage et de calcul d'itinéraire, indépendamment de toute visualisation cartographique.

L'internaute saisit, avec l'aide du service d'autocomplétion, des adresses ou toponymes pour établir ses points de départ, intermédiaires et d'arrivée. Il soumet son formulaire et la page lui retoune une feuille de route.

Les services de Géocodage, d'autocomplétion et de calcul d'itinéraire sont sollicités.

La Bibliothèque d'accès doit permettre de faire intéragir simplement le formulaire avec ces services en formalisant et envoyant les requêtes OpenLS ou d'autocomplétion correspondantes à la saisie, puis en analysant les réponses de façon à en restituer le contenu de façon simple, intuitive et exploitable.

### Accès aux services d'altimétrie et de calcul de profil

Un développeur souhaite pouvoir déterminer les altitudes en un ou plusieurs points saisis à partir d'une interface cartographique quelquonque de façon à pouvoir soit les afficher lors de la saisie, soit afficher un profil altimétrique à l'aide d'une bibliothèque tierce dédiée.

Les services d'altimétrie et de calcul de profil de la plateforme Géoportail sont sollicités.

La Bibliothèque d'accès doit permettre de formaliser et d'envoyer les requêtes à ces services puis d'en analyser les réponses de façon à en restituer le contenu de façon simple, intuitive et exploitable.

### Transformations de coordonnées en utilisant le service et les registres IGN

Un développeur souhaite transformer des lots de coordonnées pour son application en s'appuyant sur le registre de système de coordonnées IGN (« IGNF ») et sans utiliser de bibliothèque logicielle tierce.

Le service WCTS de la plateforme Géoportail est sollicité.

La Bibliothèque d'accès doit permettre de formaliser et d'envoyer les requêtes de transformation à ce service puis de récupérer les coordonnées transformées, de façon simple, intuitive et exploitable.



