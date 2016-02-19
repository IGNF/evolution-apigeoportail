---
layout: services
title: Calcul d'isochrones
level: 3
order: 030207
api: services
---

# Calcul d'isochrones / isodistances

Il s'agit de proposer une couche logicielle permettant d'utiliser le service de calcul d'isochrones / isodistances du Géoportail[^7]. Elle permet à l'utilisateur de passer ses paramètres en entrée du service et d'en récupérer la géométrie de la courbe calculée et ses caractéristiques dans une structure JSON en retour.

## Cas d'utilisation

L'utilisateur est un développeur qui souhaite mettre en oeuvre un formulaire permettant de saisir un point de départ des paramètres afin de déterminer une courbe ischrone ou isodistance à partir du service de calcul d'itinéraires du Géoportail. Il souhaite afficher cette courbe avec une API cartographique du marché.

## Mise en oeuvre

L'invocation du service se fait via l'appel d'une fonction statique :

> Gp.service.isoCurve(isoCurveOptions)

La fonction prend en paramètre d'entrée un objet dont les propriétés peuvent prendre les valeurs suivantes (en plus des [propriétés générales décrites précédemment](./dd_services.html#commonParams)) :

Paramètre | Type | Opt. | Valeur
- |-|-|-|
position | Object | Obligatoire | Coordonnées du point de départ (ou d'arrivée) du calcul de courbe. Les coordonnées son exprimée sous la forme d'un objet : { x:float, y:float}. Le système de coordonnées est spécifié à l'aide du paramètre « srs ».
outputFormat | String | Optionnel | Le format de la réponse du service iso : 'xml' ou 'json'. Ce paramètre déterminera l'extension '.xml' ou '.json' du service. Nécessaire si serverUrl est renseigné pour connaître le format dans lequel sera fournie la réponse (pour son traitement). Par défaut, ce paramètre vaut 'json'.
srs | String | Optionnel | Système de coordonnées dans lequel les coordonnées du point « location » sont exprimées et dans lequel la géométrie de la courbe résultante sera exprimée. Par défaut, le système de coordonnées utilisé sera « EPSG:4326 ».
graph | String | Optionnel | Nom du graphe à utiliser pour le calcul (« Pieton » ou « Voiture »). La valeur par défaut est : «voiture» 
exclusions | Array(String) | Optionnel | Critères d'exclusions à appliquer pour le calcul. On précise ici le type de tronçons que l'on ne veut pas que le calcul utilise (« Toll », « Bridge » ou « Tunnel »).
time | Float | Conditionnel | Durée maximum (exprimée en secondes) à utiliser pour le calcul de la courbe à partir du ou j'usqu'au point « location ». L'utilisation de ce paramètre entraine un calcul d'isochrone. S'il n'est pas spécifié alors le paramètre distance doit être renseigné pour déclencher un calcul d'isodistance. Si les deux paramètres sont renseignés, le paramètre distance sera ignoré.
distance | Float | Conditionnel | Distance maximum (exprimée en metres) à utiliser pour le calcul de la courbe à partir du ou j'usqu'au point « location ». L'utilisation de ce paramètre entraine un calcul d'isodistance. S'il n'est pas spécifié alors le paramètre time doit être renseigné pour déclencher un calcul d'isochrone. Si les deux paramètres sont renseignés, le paramètre distance sera ignoré.
reverse | Boolean | Optionnel | Indique si le point spécifié via le paramètre « location » doit être utilisé comme point d'arrivée (« true ») au lieu de point de départ du calcul (« false »). Par défaut, la valeur « false » est appliquée.
smoothing | Boolean | Optionnel | Indique si la géométrie résultante doit être lissée (« true ») pour ne pas avoir d'effet d'escalier. Par défaut, la valeur « false » est appliquée.
holes | Boolean | Optionnel | Indique si la géométrie résultante (surface) doit être retournée avec des trous (« true »). Par défaut, la valeur « false » est appliquée.


### Paramètres de la fonction onSuccess

La fonction onSuccess prend en paramètre un objet IsoCurveResponse, ayant les propriétés suivantes :

Propriété | Type | Valeur
- |-|-|
message | String | Message éventuel accompagnant la réponse du service
id | String | Identifiant de la requête à partir de laquelle la réponse a été calculée
location | Object | Coordonnées du point de départ ou d'arrivée ({x:float, y:float}) exprimées dans le système de coordonnées spécifié via la propriété « srs ».
srs | String | Système de coordonnées dans lequel les coordonnées de la réponse sont exprimées.
time | Float | Durée utilisée pour le calcul dans le cas d'une isochrone (nul dans le cas d'une isodistance)
distance | Float | Distance utilisée pour le calcul dans le cas d'une isodistance (nul dans le cas d'une isochrone)
geometry | geoJSON | Géométrie de la courbe calculée.

## Exemples d'utilisation

### Exemple 1

Calcul d'isochrone à partir d'un point donné et affichage avec OpenLayers 3.

``` javascript
Gp.Services.isoCurve({
	apiKey :'CLEF_API',
	position : {
		x : 2.25,
		y : 45.12
	},
	time : 1000,
	onSuccess : function(isoCurve) {
		// cf. http://openlayers.org/en/master/examples/geojson.html
		var vectorSource = new ol.source.Vector({features: (new ol.format.GeoJSON()).readFeatures(isoCurve.geometry)});
		var vectorLayer = new ol.layer.Vector({
			source: vectorSource
		});
		// l'objet map est un objet ol.Map precedemment cree.
		map.addLayer(vectorLayer) ;
	}
}) ;
```


[^7]: TODO : URL de description du service
