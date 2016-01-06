---
layout: services
title: JSONP
level: 3
order: 030102
api: services
---

# Accès en mode JSONP

Il s'agit de proposer une couche logicielle permettant la mise en oeuvre du protocole JSONP pour l'invocation des services de la plateforme qui le supportent. Cette couche logicielle devra écrire la balise <script> ayant comme valeur pour l'attibut href, l'URL du service contenant les paramètres fournis et y rajouter, **si nécessaire**, le paramètre permettant l'activation du filtre au niveau de la plateforme Géoportail (callback=xxx).

## Cas d'utilisation

L'utilisateur est un développeur qui souhaite invoquer un service de la plateforme Géoportail en HTTP GET avec des paramètres d'appel au service et en traiter la réponse au moyen d'une fonction qui a été au préalable écrite.

Il doit fournir les paramètres nécessaires à l'invocation du service et la fonction de traitement de la réponse lorsque celle-ci arrive. La couche JSONP se chargera simplement d'appeler cette fonction lors de la réception du résultat. Elle offrira aussi une possibilité de traitement en cas de non réponse du service (timeOut) au bout d'un laps de temps paramétrable.

## Mise en oeuvre

L'utilisation se fera par l'appel d'une fonction statique :

> Gp.protocols.JSONP(options) ;

Cette fonction réalise l'appel du service fourni via le paramètre « options.url » en mettant en oeuvre le protocole JSONP.

Elle permet de lier l'appel du service à deux fonctions de rappel fournies par l'utilisateur :

* onResponse(result) : appelée lors de la réception des résultats avec pour paramètre le résultat du service encapsulé dans sa coquille JSON ;
* onTimeOut() : appelée en cas de non réponse du service au bout d'un temps déterminé via le paramètre timeout.

### Paramètres

Paramètre | Type | Opt. | Valeur
-|-|-|-|
**url** | String | **obligatoire** | URL du service à invoquer (indépendamment du protocole JSONP). Cette URL contient déjà les paramètres du service. Si le paramètre dédié à la mise en oeuvre du protocole JSONP (callback=xxx) n'est pas présent, ils est rajouté par la fonction ; sa valeur est déterminée en fonction du paramètre callbackName. L'ajout du paramètre output=json si nécessaire est à la charge du développeur. 
timeOut | Entier positif | optionnel | Nombre de ms au bout duquel on considère que le service n'a pas répondu. Par défaut, cette valeur est fixée à 10000 (10 secondes). Une valeur de 0 pour ce paramètre permet de désactiver la gestion du timeOut.
callbackName | String | optionnel | Valeur du paramètre callback à rajouter sur l'URL. Si l'URL fournie contient déjà le paramètre callback, le paramètre callbackName ne sera pas pris en compte. La fonction de callback est créée dynamiquement par la fonction JSONP ; elle a deux fonctions : elle annule la condition de timeOut puis appelle la fonction fournie par l'utilisateur via le paramètre onResponse. Par défaut, le nom de la fonction de callback sera *TODO : nom de la fonction*
onResponse | fonction | Conditionnel | Nom de la fonction qui sera appelée lors de la réception des résultats du service. Ce paramètre sera ignoré si l'URL contient déjà le paramètre callback. La fonction de rappel appelée sera alors celle ayant pour nom la valeur de ce paramètre.
onTimeOut | fonction | optionnel | Nom de la fonction qui sera appelée en cas de non réponse du service. Le temps au bout duquel on considère que le service n'a pas répondu est déterminé par le paramètre timeOut. Par défaut, une fonction timeOut, notifiant dans la console le timeOut sur le service sera appelée. 

## Exemples d'utilisation

### Exemple 1

Envoi d'une requête de géocodage en GET et JSONP. L'ajout du paramètre output=json dans l'URL entraine l'encapsulation de la réponse du service dans une « coquille » JSON.


``` javascript
Gp.protocols.JSONP({
	url :"http://wxs.ign.fr/CLE_API/geoportail/ols?xls=%3CRequestHeader%20sessionID%3D%22%22%20srsName%3D%22epsg%3A4326%22/%3E%3CRequest%20maximumResponses%3D%2230%22%20methodName%3D%22GeocodeRequest%22%20version%3D%221.2%22%20requestID%3D%22%22%3E%3CGeocodeRequest%20returnFreeForm%3D%22false%22%3E%3CAddress%20countryCode%3D%22StreetAddress%22%3EStreetAddress%3E%3CBuilding%20number%3D%2236%22/%3E%3CStreet%3Erue%20g%E9rald%20rey%3C/Street%3E%3C/StreetAddress%3E%3CPlace%20type%3D%22Municipality%22%3Earles%3C/Place%3E%3CPostalCode%3E13200%3C/PostalCode%3E%3CDepartment%3E13%3C/Department%3E%3Cgml%3Aenvelope%3E%3Cgml%3Apos%3E43.682765684094534%204.604832911570827%3C/gml%3Apos%3E%3Cgml%3Apos%3E43.686676004569826%204.614145541270513%3C/gml%3Apos%3E%3C/gml%3Aenvelope%3E%3C/Address%3E%3C/GeocodeRequest%3E%3C/Request%3E%0A%0A&output=json",
	timeOut : 15000,
	onResponse: function (response){
		console.log(response);
	var parser = new DOMParser() ;
	// la réponse xml est accessible via response.xml
		var xmlDoc = parser.parseFromString(response.xml,'text/xml') ;
	//exploitation du document XML résultat
	//...
	},
	onTimeOut : function (){
		alert("TIME OUT");
	}
}) ;
```

### Exemple 2

Envoi d'une requête d'altimétrie en GET et JSONP.

``` javascript
Gp.protocols.JSONP({
	url :"http://wxs.ign.fr/CLE_API/alti/rest/elevation.json?lon=0.2367|2.1570&lat=48.0551|46.6077",
	timeOut : 5000,
	onResponse: function (response){
		console.log(response.elevations);
		// exploitation de la réponse
		// ...
	},
	onTimeOut : function (){
		alert("TIME OUT");
	}
}) ;
```

#### Exemple 3

Même traitement que précédemment mais avec utilisation du paramètre « callback » dans l'URL. Ici, le paramètre onResponse n'est pas utilisé, mais la valeur du paramètre callback doit faire référence à une fonction existante.

``` javascript
function traiteResultats (response){
	console.log(response.elevations);
	// exploitation de la réponse
	// ...
} ;
Gp.protocols.JSONP({
	url :"http://wxs.ign.fr/CLE_API/alti/rest/elevation.json?lon=0.2367|2.1570&lat=48.0551|46.6077&callback=traiteResultats",
	timeOut : 5000,
	onTimeOut : function (){
		alert("TIME OUT");
	}
}) ;
```
