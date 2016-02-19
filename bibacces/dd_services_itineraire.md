---
layout: services
title: Calcul d'itinéraires
level: 3
order: 030206
api: services
---

# Calcul d'itinéraires

Il s'agit de proposer une couche logicielle permettant d'utiliser le service de calcul d'itinéraires du Géoportail[^6]. Elle permet à l'utilisateur de passer ses paramètres en entrée du service et d'en récupérer l'itinéraire et les instructions dans une structure JSON en retour.

## Cas d'utilisation

L'utilisateur est un développeur qui souhaite mettre en oeuvre un formulaire permettant de saisir des points de départ et d'arrivée et de déterminer un itinéraire à partir du service de calcul d'itinéraires du Géoportail. Il souhaite pouvoir afficher la géométrie de l'itinéraire avec une API cartographique du marché.

## Mise en oeuvre

L'invocation du service se fait via l'appel d'une fonction statique

> Gp.Services.route(routeOptions)

La fonction prend en paramètre d'entrée un objet dont les propriétés peuvent prendre les valeurs suivantes (en plus des [propriétés générales décrites précédemment](./dd_services.html#commonParams)) :

Paramètre | Type | Opt. | Valeur
- |-|-|-|
routePreference | String | Optionnel | Mode de calcul à utiliser : * le plus rapide « fastest » * le plus court « shortest ». Par défaut : « fastest ».
**startPoint** | Object | **Obligatoire** | Point de départ du calcul. Coordonnées exprimées en longitudes, latitudes (EPSG:4326) :{x:float, y:float} 
**endPoint** | Object | **Obligatoire** | Point d'arrivé du calcul. Coordonnées exprimées en longitudes, latitudes (EPSG:4326) :{x:float, y:float}
viaPoints | Array(Object) | Optionnel | Liste de point intermédaires que l'itinéraire doit emprunter dans l'ordre du tableau. Coordonnées exprimées en longitudes, latitudes (EPSG:4326) :{x:float, y:float}
graph | String | Optionnel | Type de graphe utilisé : "Voiture" ou "Pieton". Détermine le profil de vitesses utilisé pour le calcul ainsi que les tronçons autorisés ou non. Par défaut, c'est la valeur "Voiture" qui sera utilisée.
exclusions | Array(String) | Optionnel | Critères d'exclusions à appliquer pour le calcul. On précise ici le type de tronçons que l'on ne veut pas que l'itinéraire emprunte (valeurs possibles : « toll » (éviter les péages), « bridge », « tunnel »).
provideGeometry | Booléen | Optionnel | Indique si la géométrie de l'itinéraire doit être reprise morceau par morceau dans les instructions. Par défaut : false.
provideBbox | Booléen | Optionnel | Indique si les instructions doivent être localisées par une bbox dans la réponse. Par défaut : true. 
distanceUnit | String | Optionnel | Unité dans laquelle les distances seront exprimées dans la réponse (« m » ou « km »). Par défaut : « km ».
api | String | Optionnel | Manière d'accéder au service : 'REST' (via l'API REST) ou 'OLS' (via la norme XLS). Par défaut, on utilise l'API REST.
outputFormat | string | Conditionnel | Le format de la réponse du service : 'xml' ou 'json'. Ce paramètre déterminera l'extension '.xml' ou '.json' du service dans le cas de l'API REST. Nécessaire si serverUrl est renseigné, et qu'on souhaite passer par l'API REST, pour connaître le format dans lequel sera fournie la réponse (pour son traitement). Non nécessaire pour la norme OLS. Par défaut, ce paramètre vaut 'json'.
srs | String | Optionnel | Système de coordonnées dans lequel les paramètres géographiques en entrée et la réponse du service sont exprimés. Pas de valeur par défaut. Si le serveur consulté est celui du Géoportail, la valeur par défaut sera donc celle du service : 'EPSG:4326'.

### Paramètres de la fonction onSuccess

La fonction onSuccess prend un objet JSON en entrée, ayant les propriétés suivantes :

Propriété | Type | Valeur
- |-|-|
totalTime | float | Durée totale de l'itinéraire (en secondes).
totalDistance | float | Longueur totale de l'itinéraire (en « m » ou « km » selon le paramètre distanceUnit de la requête).
bbox | bbox | Emprise (rectangle englobant) de l'itinéraire.
routeGeometry | geoJSON | Géométrie de l'itinéraire.
routeInstructions | Array(Object) | Liste des instructions le long de l'itinéraire. Les propriétés d'un objet d'instructions esont décrites dans le tableau suivant.

### Propriétés des instructions

Propriété | Type | Valeur
- |-|-|
duration | Float | Durée (en secondes) de l'instruction
distance | Float | Longueur (en « m » ou « km » selon le paramètre distanceUnit de la requête)
code | String | Code de l'instuction : - F : tout droit - B : demi-tour - L : tourner à gauche - R : tourner à droite - BL : tourner très à gauche - BR : tourner très à droite - FL : tourner légèrement à gauche - FR : tourner légèrement à droite - round_about_entry : entrée rond-point - round_about_exit : sortie rond-point :
instruction | String | Texte de l'instruction (traduction du code + nom de la rue concernée)
bbox | bbox | Emprise (rectangle englobant) de l'instruction. La présence de cette propriété est déterminée par le paramètre provideBbox de la requête.
geometry | geoJSON | Géometrie de l'instruction. La présence de cette propriété est déterminée par le paramètre provideGeometry de la requête.

## Exemples d'utilisation

### Exemple 1

Calcul d'itinéraire entre deux points donnés et affichage avec OpenLayers 3.


``` javascript
Gp.Services.route({
	apiKey :'CLEF_API',
	startPoint : {
		x : 2.25,
		y : 45.12
	},
	endPoint : {
		x : 3.25,
		y : 48.12
	},
	onSuccess : function(route) {
		// cf. http://openlayers.org/en/master/examples/geojson.html
		var vectorSource = new ol.source.Vector({
			features: (new ol.format.GeoJSON()).readFeatures(route.geometry)
		});

		var vectorLayer = new ol.layer.Vector({
			source: vectorSource
		});
	
		// l'objet map est un objet ol.Map precedemment cree.
		map.addLayer(vectorLayer) ;
	}
}) ;
```

[^6]: TODO : url de documentation du service
