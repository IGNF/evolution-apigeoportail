---
layout: services
title: Altitudes
level: 3
order: 030205
api: services
---

# Services d'altimétrie

Il s'agit de proposer une couche logicielle permettant d'utiliser le service d'altimétrie du Géoportail[^8]. Elle permettra à l'utilisateur de choisir le mode d'interrogation du service (API REST ou norme WPS), le protocole utilisé (XHR ou JSONP), la méthode HTTP – lorsque c'est possible- (GET ou POST), ou encore le format de sortie. Par défaut, on propose d'utiliser l'API REST, via le protocole JSONP.

## Cas d'utilisation

L'utilisateur est un développeur web qui souhaite intégrer une fonctionnalité de calcul d'altitude dans son application. Par exemple, il souhaite pouvoir récupérer l'altitude de points saisis une carte intéractive par un internaute, ou encore proposer un profil altimétrique calculé à partir d'un échantillonage déterminé par ces points. Il fournit comme paramètres les coordonnées des points dont il souhaite connaître l'altitude, et éventuellement des paramètres concernant la méthode utilisée pour interroger le service.

## Mise en oeuvre

L'utilisation se fera par l'appel d'une seule fonction statique :

> Gp.Services.getAltitude(altitudeOptions)

On propose une seule fonction, qui gère les deux fonctionnalités du service (calcul d'altitudes simples : Elevation, ou avec échantillonnage : ElevationLine). La présence d'un paramètre « sampling », indiquant un pas d'échantillonnage ainsi que la présence de deux points minimum dans la requête, déclenchera la demande de calcul avec échantillonnage au service.

### Description

La fonction prend en paramètre d'entrée un objet dont les propriétés peuvent prendre les valeurs suivantes (en plus des [propriétés générales décrites précédemment](./dd_services.html#commonParams)) :

### Paramètres de l'objet altitudeOptions en entrée de la fonction getAltitude

Paramètre | Type | Opt. | Valeur
- |-|-|-|
outputFormat | string | Conditionnel | Le format de la réponse du service alti : 'xml' ou 'json'. Ce paramètre déterminera l'extension '.xml' ou '.json' du service dans le cas de l'API REST, ou la valeur du paramètre 'format' dans le cas de la norme WPS. Nécessaire si serverUrl est renseigné, et qu'on souhaite passer par l'API REST, pour connaître le format dans lequel sera fournie la réponse (pour son traitement). Non nécessaire pour la norme WPS. Par défaut, ce paramètre vaut 'xml'.
positions | Array({x,y}) | Obligatoire | Tableau contenant les coordonnées des points (CRS:84) dont on veut connaître les altitudes (ou à partir desquelles on va calculer le profil). Minimum 2 éléments si on souhaite calculer un profil altimétrique (ElevationLine). Maximum 50 éléments.
sampling | Integer | Optionnel | Nombre de points à utiliser pour déterminer le tracé d'un profil altimétrique, compris entre 2 et 5000. A spécifier lorsqu'on souhaite accéder à cette fonctionnalité. Dans ce cas, les points fournis en entrée (au minimum de deux) servent à déterminer l'axe planimétrique le long duquel le profil doit être calculé. Si le paramètre sampling n'est pas spécifié, c'est le service Elevation qui sera interrogé (altitudes simples calculées pour les points fournis).
api | string | Optionnel | Manière d'accéder au service : 'REST' (via l'API REST) ou 'WPS' (via la norme WPS). Par défaut, on utilise l'API REST.
zonly | boolean | Optionnel | Permet de ne récupérer que les altitudes en sortie s'il vaut 'true'. Vaut 'false' par défaut. Non pris en compte dans le cas d'un calcul de profil altimétrique.

### Paramètres de la fonction onSuccess 

La fonction prend en paramètre un objet AltiResponse, dont la propriété "elevations" (ci-dessous) est un tableau contenant les informations des différents points (coordonnées, altitude, précision) fournis ou échantillonnés. Ce tableau est le même quel que soit le format de réponse du service spécifié.

Paramètre | Type | Valeur
- |-|-|
elevations | array({Elevation}) | Tableau contenant les informations (lon, lat, z et acc) des points fournis sous forme d'un objet Elevation (ci-dessous), dans l'ordre dans lequel ils ont été fournis, et éventuellement des points échantillonnés.


### Propriétés des objets Elevation du tableau AltiResponse.elevations

Chaque attribut du tableau elevations est un objet dont les propriétés sont les suivantes :

Paramètre | Type | Valeur
- |-|-|
lon | float | Longitude du point fourni (si zonly n'est pas spécifié).
lat | float | Latitude du point fourni (idem)
z | float | Altitude déterminée du point fourni
acc | float | Précision de la valeur au point considéré (si zonly n'est pas spécifié)..


### Paramètres de la fonction onFailure

La fonction onFailure prend en paramètre un objet failureData avec les propriétés suivantes :

Paramètre | Type | Valeur
- |-|-|
status | number | Code HTTP de retour du serveur, ou -1 si on est en timeout. (S'il vaut 200, c'est que l'erreur provient de la lecture des paramètres de la réponse.)
message | string | Message d'erreur. Il peut s'agir de celui renvoyé par le service (not found, clé invalide, missing parameter), ou d'un message renvoyé par l'API, selon l'erreur (timeout, exception, structure non reconnue).

## Exemples d'utilisation

### Exemple 1

Récupération de l'altitude d'un point à partir de ses coordonnées, et utilisation des fonctions de rappel.

``` javascript
Gp.Services.getAltitude({
	apiKey: 'CLE_API',
	positions:[
		{x:0.2367,y:48.0551}
	],
	onSuccess: function(elevations){
		// affiche les informations du point fourni
		console.log(elevations[0]);
	},
	onFailure: function(erro){
		console.log(error.message);
	}
});
```

### Exemple 2 

Récupération des altitudes seulement d'une série de points. 

``` javascript
Gp.Services.getAltitude({
	apiKey: 'CLE_API',
	positions:[
		{x:0.2367,y:48.0551}, {x:1.2099,y:47.3354},
		{x:2.157,y:46.607}, {x:3.3003,y:45.2644}, {x:4.3907,y:43.91}
	],
	zonly:true,
	onSuccess: function(elevations){
		console.log(elevations);
	}
}) ;
```

### Exemple 3

Récupération d'un profil altimétrique de 20 points, à partir de 5 points en entrée.

``` javascript
Gp.Services.getAltitude({
	apiKey: 'CLE_API',
	positions:[
		{x:0.2367,y:48.0551}, {x:1.2099,y:47.3354},
		{x:2.157,y:46.607}, {x:3.3003,y:45.2644}, {x:4.3907,y:43.91}
	],
	sampling:20,
	onSuccess: function(elevations){
		// informations des points fournis ET échantillonnés
		console.log(elevations);
	}
}) ;
```

### Exemple 4

Accès au service en POST, via la norme WPS, et spécification d'un proxy.

``` javascript
Gp.Services.getAltitude({
	apiKey: 'CLE_API',
	positions:[
		{x:0.2367,y:48.0551}, {x:1.2099,y:47.3354},
		{x:2.157,y:46.607}, {x:3.3003,y:45.2644}, {x:4.3907,y:43.91},
		(...)
	],
	api:'WPS',
	httpMethod: 'POST',
	proxyURL: '/proxy/proxy.php?url=',
	onSuccess: function(elevations){
		console.log(elevations);
	}
}) ;
```

### Exemple 5

Utilisation d'une autre URL de serveur, en WPS


``` javascript
Gp.Services.getAltitude({
	serverUrl:'http://wxs.ign.fr/CLE_ALTI/alti/wps?service=WPS&version=1.0.0',
	positions:[
		{x:0.2367,y:48.0551}
	],
	api:'WPS',
	onSuccess: function(elevations){
		console.log(elevations);
	}
});
```
### Exemple 6

Utilisation d'une autre URL de serveur, en REST


``` javascript
Gp.Services.getAltitude({
	serverUrl: 'http://wxs.ign.fr/CLE_API/alti/rest/Elevation.xml',
	outputFormat:'xml',
	positions:[
		{x:0.2367,y:48.0551}
	],
	api:'REST',
	onSuccess: function(elevations){
		console.log(elevations);
	}
}) ;
```


[^8]: cf. http://api.ign.fr/tech-docs-js/fr/developpeur/alti.html
