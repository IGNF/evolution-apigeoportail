---
layout: services
title: Domaine de validité d'un système de coordonnées
level: 3
order: 030211
api: services
---

# Service WCTS : connaître le domaine de validité d'un Système de coordonnées.

Il s'agit de proposer une couche logicielle permettant d'utiliser l'opération getValidityArea du service de transformations de coordonnées du Géoportail.

## Cas d'utilisation

L'utilisateur invoque le service WCTS pour connaître le domaine de validité d'un système de coordonnées dont il fournit l'identifiant. Il reçoit en retour les coordonnées de l'emprise géographique (rectangle englobant) du système de coordonnées.

## Mise en oeuvre

L'utilisation se fera par l'appel d'une fonction statique :

> Gp.services.getSrsValidityArea(options)

### Description

La fonction prend en paramètre d'entrée un objet dont les propriétés peuvent prendre les valeurs suivantes (en plus des [propriétés générales décrites précédemment](./dd_services.html#commonParams)) :

### Paramètres de l'objet options en entrée de la fonction srsValidityArea

Paramètre | Type | Opt. | Valeur
- |-|-|-|
identifier | String | Obligatoire identifiant du système de coordonnées, compréhensible par le service (la liste des identifiants supportés est disponible à l'aide de l'opération DescribeProcess sur le processus GetValidityArea (http://wxs.ign.fr/CLEF/geoportail/wps?Service=WPS&Request=DescribeProcess&Version=1.0.0&Identifier=GetValidityArea )

### Paramètres de la fonction onSuccess

La fonction onSuccess prend en paramètre un objet ayant les propriétés suivantes :

Paramètre | Type | Valeur
- |-|-|-|
bbox | array(Float) | Objet contenant les coordonnées, exprimées longitudes, latitudes (EPSG:4326) du rectangle englobant décrivant la zone de validité, dans l'ordre suivant : [lonMin, latMin, lonMax, latMax].

### Paramètres de la fonction onFailure

La fonction onFailure prend en paramètre un objet error avec les propriétés suivantes :

Paramètre | Type | Valeur
- |-|-|-|
status | number | Code HTTP de retour du serveur, ou -1 si on est en timeout. (S'il vaut 200, c'est que l'erreur provient de la lecture des paramètres de la réponse.) 
message | string | Message d'erreur. Il peut s'agir de celui renvoyé par le service (not found, clé invalide, missing parameter), ou d'un message renvoyé par l'API, selon l'erreur (timeout, exception, structure non reconnue).




## Exemples d'utilisation

### Exemple 1

Récupération du domaine de validité d'un SRS, et utilisation des fonctions de rappel.

``` javascript
Gp.services.getSrsValidityArea ({
	apiKey: 'CLE_API',
	identifier:'IGNF:LAMB93',
	onSuccess: function(validityArea){
		// bbox du domaine de validité
		console.log(validityArea.bbox);
	},
	onFailure: function(error){
		console.log(error.message);
	}
}) ;
```

