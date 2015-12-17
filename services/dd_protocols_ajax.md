---
layout: services
title: AJAX
level: 3
order: 030101
api: services
---

# Accès en mode AJAX

Il s'agit de proposer une couche logicielle permettant la mise en oeuvre du mode AJAX (XHR) pour l'invocation des services de la plateforme Géoportail grâce aux navigateurs usuels.

Cette couche logicielle devra instancier la requête en fonction des paramètres passés par l'utilisateur, l'envoyer au serveur et retourner sa réponse en paramètre d'une fonction de rappel.

L'utilisation du protocole XHR se fera toujours en mode asynchrone : les appels aux services en mode AJAX ne bloqueront pas le déroulement de l'application.

## Cas d'utilisation

L'utilisateur est un développeur qui souhaite invoquer un service de la plateforme Géoportail en HTTP GET ou POST avec des paramètres d'appel au service et en traiter la réponse au moyen d'une fonction de rappel.

Il doit fournir les paramètres nécessaires à l'invocation du service et la fonction de traitement de la réponse lorsque celle-ci arrive. La couche XHR se chargera simplement d'invoquer le service en mode AJAX et d'appeler la fonction de rappel lors de la réception du résultat. Elle offrira aussi une possibilité de traitement en cas de non réponse du service (timeOut) au bout d'un laps de temps paramétrable.

## Mise en oeuvre

L'utilisation se fera par l'appel d'une fonction statique :

> Gp.protocols.XHR(options)

Cette fonction envoie une requête HTTP sur l'URL fournie via le paramètre « options.url » en mettant en oeuvre le protocole XHR.

Elle permet de lier l'émission de la requête à deux fonctions de rappel fournies par l'utilisateur :

* onResponse(result) : appelée lors de la réception des résultats avec pour paramètre la réponse du service ;
* onTimeOut() : appelée en cas de non réponse au bout d'un temps déterminé par le paramètre « options.timeout ».

Les propriétés de l'objet « options » sont les suivantes :


Paramètre | Type | Opt. | Valeur
- |-|-|-|
**url** | String | **obligatoire** | URL à invoquer.
httpMethod | String | optionnel | Méthode de transfert : "GET" ou "POST".  La valeur par défaut est "GET".
content | String | optionnel | Liste d'en-têtes pour la requête HTTP.  Exemple :  ``` headers : {	'content-type' :'text/xml'	} ```
timeOut | Entier positif | optionnel | Nombre de ms au bout duquel on considère que le service n'a pas répondu.  Par défaut, cette valeur est fixée à 10000 (10 secondes). Une valeur de 0 pour ce paramètre permet de désactiver la gestion du timeOut.
**onResponse** | Fonction | **Obligatoire** | Fonction qui sera appelée lors de la réception des résultats du service.  Elle prend en paramètre la réponse du service sous la forme d'une chaîne de caractères.
onTimeOut | Fonction | optionnel | Fonction qui sera appelée en cas de non réponse du service.  Le temps au bout duquel on considère que le service n'a pas répondu est déterminé  par le paramètre timeOut. Par défaut, une fonction timeOut, notifiant dans la console le timeOut sur le service sera appelée.

## Exemples d'utilisation

Requête en POST sur le service de géocodage du Géoportail. Utilisation d'un proxy pour contourner les problèmes de cross-domain.

``` javascript
Gp.protocols.XHR({
	url :"http://localhost/proxy.php?url=http%3A//wxs.ign.fr/CLE_API/geoportail/ols%3F%0A",
	method :"POST",
	content :"<RequestHeader sessionID="" srsName="epsg:4326"/><Request maximumResponses="30" methodName="GeocodeRequest" version="1.2" requestID=""><GeocodeRequest returnFreeForm="false"><Address countryCode="StreetAddress">StreetAddress><Building number="36"/><Street>rue gérald rey</Street></StreetAddress><Place type="Municipality">arles</Place><PostalCode>13200</PostalCode><Department>13</Department><gml:envelope><gml:pos>43.682765684094534 4.604832911570827</gml:pos><gml:pos>43.686676004569826 4.614145541270513</gml:pos></gml:envelope></Address></GeocodeRequest></Request>",
	timeout : 15000,
	onResponse: function (response){
		console.log(response);
		var parser = new DOMParser() ;
		var xmlDoc = parser.parseFromString(response,'text/xml') ;
	//exploitation du document XML résultat
	//...
	},
onTimeOut : function (){
	alert("TIME OUT");
}
}) ;
```
