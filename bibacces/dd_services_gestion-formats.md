---
layout: services
title: Gestion des formats
level: 2
order: 030300
api: services
published: false
---

# Gp.formats : Gestion des formats relatifs aux services

Les services de la plateforme Géoportail exposent selon les cas plusieurs interfaces pour exprimer les requêtes et formuler les réponses.

L'API Géoportail Services propose une interface permettant de faire abstraction de ces protocoles de dialogue. Elle utilisera et exposera cependant des classes utilitaires permettant de gérer les différents formalismes, essentiellement lorsqu'il sagit d'exprimer des requêtes ou de traiter des réponses en XML (éventuellement encapsulé en JSON pour ces dernières).

On proposera ainsi des classes dédiées au traitement :

* du formalisme WPS pour les services d'altimétrie et WCTS ;
* du standard OpenLS pour les services de Géocodage et de calcul d'itinéraires ;
* de la syntaxe de réponse du service d'autoconfiguration ;
* du formalisme XML propriétaire du service d'altimétrie du Géoportail.
* des formalismes WKT et GML pour l'expression des géométries exposées par les différents services (Géocodage, Itinéraire, Isochrones / Isodistances, … ) ;
* d'autres formats pourront être pris en charge en fonction de l'évolution des interfaces des services de la plateforme.

Chacune de ces classes exposera :

* des fonctions d'écriture au format XML, dans la syntaxe attendue par le service ;
* des fonctions d'analyse des syntaxes XML relatives aux services ;
* des fonctions d'écriture des réponses dans le format attendu en paramètre des fonctions de rappel onResponse associées à l'invocation des services par l'API.

## Packaging

L'API Géoportail Services sera disponible sous la forme d'un fichier Javascript permettant d'accéder à toutes les fonctionnalités décrites dans ce document.
