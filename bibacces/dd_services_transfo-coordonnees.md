---
layout: services
title: Transformation de coordonnées
level: 3
order: 030210
api: services
published: false
---

# Service WCTS : transformer des coordonnées

Il s'agit de proposer une couche logicielle permettant d'utiliser l'opération « TransformCoordinates » du service de transformations de coordonnées du Géoportail[^10].

## Cas d'utilisation

L'utilisateur invoque le service WCTS pour transformer les coordonnées d'une liste de points d'un système de coordonnées vers un autre dont il fournit les identifiants. Il reçoit en retour la liste des points avec leurs coordonnées exprimées dans le système de coordonnées cible.

## Mise en oeuvre

L'utilisation se fera par l'appel d'une fonction statique :

> Gp.Services.transformCoordinates(options)

### Description

La fonction prend en paramètre d'entrée un objet dont les propriétés peuvent prendre les valeurs suivantes (en plus des [propriétés générales décrites précédemment](./dd_services.html#commonParams)) :

### Paramètres de l'objet options en entrée de la fonction transformCoordinates

Paramètre | Type | Opt. | Valeur
- |-|-|-|
sourceCRS | String | Optionnel | Identifiant du système de coordonnées, compréhensible par le service (la liste des identifiants supportés est disponible à l'aide de l'opération DescribeProcess sur le processus TransformCoordinates (http://wxs.ign.fr/CLEF/geoportail/wps?Service=WPS&Request=DescribeProcess&Version=1.0.0&Identifier=TransformCoordinates ) Par défaut la valeur utilisée est : IGNF:LAMB93
targetCRS | String | Optionnel | Identifiant du système de coordonnées, compréhensible par le service (la liste des identifiants supportés est disponible à l'aide de l'opération DescribeProcess sur le processus TransformCoordinates. (http://wxs.ign.fr/CLEF/geoportail/wps?Service=WPS&Request=DescribeProcess&Version=1.0.0&Identifier= TransformCoordinates ) Par défaut la valeur utilisée est : IGNF:LAMB93
points | Array({x :Float, y:Float}) | Obligatoire | Liste des points dont on veut transformer les coordonnées. Chaque point est exprimé via un objet javascript ayant la structure suivante : {x : Float, y : Float}.
nadgridMode | String | Optionnel | Comportement face aux grilles de changement de système de référence. Le mode « strict » applique la grille seulement entre les 2 datums correspondants à cette grille (comportement Circé : http://geodesie.ign.fr). Le mode « relax » applique toujours la grille dès qu’un des datums demandé correspond à cette grille (comportement Proj4). Par défaut, la valeur « relax » est appliquée.

### Paramètres de la fonction onSuccess

La fonction onSuccess prend en paramètre un objet ayant les propriétés suivantes :

Paramètre | Type | Valeur
- |-|-|
points | Array({x:Float, y:Float}) | Liste des points transformés. Elle est ordonnée dans le même ordre que la liste passée en paramètres

### Paramètres de la fonction onFailure

La fonction onFailure prend en paramètre un objet error avec les propriétés suivantes :

Paramètre | Type | Valeur
- |-|-|
status | number | Code HTTP de retour du serveur, ou -1 si on est en timeout.
message | string | Message d'erreur. Il peut s'agir de celui renvoyé par le service (not found, clé invalide, missing parameter), ou d'un message renvoyé par l'API, selon l'erreur (timeout, exception, structure non reconnue).


## Exemples d'utilisation

### Exemple 1

Transformation des coordonnées d'une liste de points. Utilisation des fonctions de rappel.


``` javascript
Gp.Services.transformCoordinates ({
	apiKey: 'CLE_API',
	sourceCRS:'EPSG:4326',
	targetCRS:'IGNF:LAMB93',
	points: [{x:2.0, y:45},{x:3.0, y:45}],
	onSuccess: function(results){
		// bbox du domaine de validité
		console.log(results.points);
	},
	onFailure: function(error){
		console.log(error.message);
	}
}) ;
```

[^10]: TODO : url de description du service
