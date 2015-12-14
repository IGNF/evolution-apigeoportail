---
layout: services
title: Autoconfiguration
level: 3
order: 030201
api: services
---

## Accès au service d'autoconfiguration

Il s'agit de proposer une couche logicielle permettant d'utiliser le service d'auto-configuration des API dont le principe est expliqué en Annexes. Cette couche logicielle devra envoyer une requête au service d'auto-configuration, avec les paramètres éventuellement fournis, puis parser la réponse du service, pour finalement construire une variable globale contenant les informations utiles pour l'utilisation de l'API (configuration des services, informations sur les couches, etc.).

### Cas d'utilisation

L'utilisateur est un développeur web qui souhaite initialiser sa fenêtre cartographique, et a donc besoin d'informations sur les couches et services Géoportail disponibles avec sa clé de contrat API (paramètres des couches, territoires, pyramides d'images, etc), sur les paramètres de configuration par défaut (configuration de la carte, territoires, couches par défaut), ou autres informations renvoyées par le service d'auto-configuration.

L'utilisateur peut fournir des paramètres optionnels, comme sa ou ses clés de contrat API, la fonction de rappel à lancer en cas de succès de la récupération de l'auto-configuration, le protocole à utiliser, ou encore l'identifiant d'une couche agrégée dont il souhaite plus d'informations concernant l'agrégation. (voir ci-dessous pour une liste plus détaillée)

En retour, sauf si une des clés fournies est invalide, il récupère un objet JSON contenant les informations utiles à l'utilisation de l'API ou des services Géoportail.

### Mise en oeuvre

L'utilisation se fera par l'appel de la fonction statique :

> Gp.services.getConfig(options)

Dans un premier temps, cette fonction envoie une requête HTTP au service d'auto-configuration, via le protocole JSONP ou Ajax, avec les éventuels paramètres fournis par l'utilisateur (clé(s) et identifiant d'un agrégat), et en spécifiant une fonction de callback.

Dans un second temps, après avoir récupéré la réponse XML sous forme d'un objet document, la fonction va récupérer les différentes informations présentes dans cet objet, et les stocker selon leur valeur dans une variable globale Gp.Config.

La fonction prend en paramètre d'entrée un objet dont les propriétés peuvent prendre les valeurs suivantes (en plus des [propriétés générales décrites précédemment](./dd_services.html#commonParams)) :

Paramètre | Type | Opt. | Valeur
- |-|-|-|
layerId | String | Optionnel | Le nom de l'agrégat (couche) dont on veut connaître les informations détaillées. La présence de cette propriété implique l'utilisation de la deuxième opération du service pour accéder aux informations d'une couche aggrégée. L'usage est d'appeler tout d'abord le service d'autoconf "classique" pour cette clé de contrat (cf. exemple 1), de sorte à récupérer l'autoconfiguration complète, sous la forme d'une variable Gp.Config, à laquelle seront ensuite ajoutées les informations de la couche agrégée. Si aucun appel à l'autoconf n'a été préalablement effectué, la variable Gp.Config en sortie ne contiendra que les information de la couche agrégée layerId.

#### Paramètres de la fonction onSuccess

Paramètre | Type | Opt. | Valeur
- |-|-|-|
Gp.Config | Object | Obligatoire | Il s'agit de la variable globale contenant les informations utiles récupérées via le service d'auto-configuration. Sa structure est détaillée ci-après.

#### Paramètres de la fonction onFailure

La fonction onConfFailure prend en paramètre un objet contenant les propriétés suivantes :

Paramètre | Type | Opt. | Valeur
- |-|-|-|
status | Number | obligatoire | Code HTTP de retour du serveur, ou -1 (par exemple) si on est en timeout. (S'il vaut 200, c'est que l'erreur provient de la lecture des paramètres de la réponse.)
message | String | obligatoire | Message de retour du serveur, ou notification de timeOut, ou encore de l'API en cas de problème d'interprétation des résultats.

#### Résultat en sortie

Le résultat est une variable globale Gp.Config, qui est un objet contenant les informations utiles
renvoyées par l'auto-configuration, et dont la structure est la suivante :

Gp.Config

* generalOptions
	* apiKeys
	* title
	* defaultGMLGFIStyle
	* theme
	* WGS84Resolutions
* Layers
	* layerID
		* name
		* layerId
		* title
		* description
		* apiKeys
		* defaultProjection
		* additionalProjections
		* queryable
		* quicklookURL
		* isAggregate
		* aggregatedLayers
		* globalConstraint
			* CRS
			* BBOX
			* minScaleDenominator
			* maxScaleDenominator
			* temporalExtent
		* contraints
			* CRS
			* BBOX
			* minScaleDenominator
			* maxScaleDenominator
			* temporalExtent
		* legends
			* format
			* url
			* minScale
		* metadata
			* format
			* url
		* originators
			* name
			* attribution
			* logo
			* url
			* constraints
				* CRS
				* BBOX
				* minScaleDenominator
				* maxScaleDenominator
				* temporalExtent
		* thematics
			* inspire (boolean)
			* name
		* dimensions
			* type
			* visibilityRange
			* visibilityMode
			* noDataValue
			* geometricType
		* formats
			* current (boolean)
			* name
		* hidden
		* styles
			* name
			* title
			* current
		* serviceParams
			* id
			* serviceUrl
			* version
		* wmtsOptions
			* tileMatrixSetLink
			* tileMatrixSetLimits
				* minTileRow
				* maxTileRow
				* minTileCol
				* maxTileCol
	* LayerID
* Territories
	* territoryID
		* isDefault
		* defaultCRS
		* additionalCRS
		* geoBBOX
		* geoCenter
		* defaultOptions
			* defaultZoomLevel
			* minScaleDenominator
			* maxScaleDenominator
		* defaultLayers
			* layerID
		* territoryID
* TileMatrixSets
	* TMSID
		* projection
		* nativeResolutions
		* matrixIds
		* tileMatrices
			* matrixId
			* matrixHeight
			* matrixWidth
			* scaleDenominator
			* tileHeight
			* tileWidth
			* topLeftCorner
	* TMSID
* Services
	* serviceID
		* title
		* serverUrl
		* version
	* serviceID

Les tableaux ci-dessous détaillent les différentes propriétés de cet objet.

#### Propriétés de l'objet Gp.Config

Propriété | Type | Opt. | Valeur
- |-|-|-|
generalOptions | Object | Obligatoire | Options générales par défaut 
layers | Object | Obligatoire | Objet ayant pour propriétés les identifiants des couches disponibles d'après le contrat API.
territories | Object | Obligatoire | Objet ayant pour propriétés les identifiants des territoires disponibles.
tileMatrixSets | Object | Optionnel | Objet ayant pour propriétés les identifiants des TileMatrixSets disponibles.
services | Object | Obligatoire | Objet ayant pour propriétés les identifiants des services disponibles.

#### Propriétés de l'objet generalOptions

Propriété | Type | Opt. | Valeur
- |-|-|-|
apiKeys | Object | Obligatoire | Objet contenant les informations de la ou des clés de contrat API spécifiées (peut être vide). Chaque propriété de l'objet est la (ou une des) clé(s) API pour laquelle la configuration a été demandée, et la valeur associée est un tableau contenant la liste des identifiants des couches associées au contrat. Exemple : apiKeys={"macleAPI":["LayerId1","LayerId2"]}.
title | String | Obligatoire | Titre du service d'auto-configuration 
defaultGMLGFIStyle | String | Obligatoire | URL pointant vers la feuille de style XSL (eXtensible Stylesheet Language)
theme | String | Obligatoire | Thème par défaut
wgs84Resolutions | Array({float}) | Obligatoire | Les résolutions en WGS84. Peuvent être utiles par ex. car les BBOX et centres des territoires sont exprimés en coordonnées géographiques.

#### Propriétés des différentes couches de l'objet layers

L'objet LAYERS a pour propriétés l'ensemble des identifiants des ressources disponibles, par exemple : « GEOGRAPHICALGRIDSYSTEMS.MAPS$GEOPORTAIL:OGC:WMTS ». 
Pour chacune d'elles, les propriétés associées sont détaillées ci-dessous :
(Attention, cette liste recense l'ensemble des propriétés POSSIBLES, mais non nécessairement présentes).

Propriété | Type | Opt. | Valeur
- |-|-|-|
name | String | Obligatoire | Le nom usuel de la couche (par exemple « GEOGRAPHICALGRIDSYSTEMS.MAPS »)
layerId | String | Obligatoire | L'identifiant de la couche (par exemple « GEOGRAPHICALGRIDSYSTEMS.MAPS$GEOPORTAIL:OGC:WMTS »)
title | String | Optionnel | Le titre de la couche (par exemple « Cartes IGN »)
description | String | Optionnel | La description associée à la couche
apiKeys | Array(String) | Optionnel | La (ou les) clé(s) de contrat à laquelle cette couche est associée
defaultProjection | String | Optionnel | La projection (généralement le code EPSG) par défaut de la couche (couches WMS et WFS), ou la projection du TileMatrixSet (couche WMTS)
additionalProjections | Array(String) | Optionnel | D'autres projections associées à la couche. (WMS et WFS uniquement)
queryable | Boolean | Optionnel | Indique si on peut faire ou non un getFeatureInfo sur la couche (WMS ou WMTS)
quicklookUrl | String | Optionnel | Url pointant vers l'image d'aperçu rapide (pour les couches associées à une visualisation)
isAggregate | Boolean | Obligatoire | Permet de savoir si la couche est un agrégat d'autres données.
aggregatedLayers | Array({string}) | Optionnel | Objet contenant la liste des identifiants des couches agrégées formant l'agrégat. Cette liste n'apparaît que lorsque l'utilisateur a demandé explicitement des informations sur l'agrégat.
globalConstraint | Object | Optionnel | Contraintes générales de la couche : emprise spatiale (bbox) et temporelle (temporalExtent), dénominateurs d'échelle min et max (la liste des propriétés est détaillée plus loin)
constraints | Array({object}) | Optionnel | Autres contraintes associées à la couche, généralement plus détaillées, comme les emprises des territoires couverts par les données. (la liste des propriétés est détaillée plus loin).
legends | Array({object}) | Optionnel | Informations concernant les légendes associées à la couche (la liste des propriétés est détaillée plus loin).
metadata | Array({object}) | Optionnel | Informations concernant les métadonnées associées à la couche (la liste des propriétés est détaillée plus loin).
originators | Array({object}) | Optionnel | Informations concernant les propriétaires des données (originators). La liste des propriétés est détaillée plus loin.
thematics | Array({object}) | Optionnel | Informations concernant les thématiques associées à la couche (la liste des propriétés est détaillée plus loin).
dimensions | Object | Optionnel | Informations concernant les dimensions associées aux données (la liste des propriétés est détaillée plus loin).
formats | Array({object}) | Optionnel | Informations concernant les formats des données (la liste des propriétés est détaillée plus loin).
hidden | Boolean | Optionnel | Indique si la couche est visible. Par défaut la couche n'est pas visible.
styles | Array({object}) | Optionnel | Informations concernant les styles associés à la couche (normal, bdparcellaire, …). La liste des propriétés est détaillée plus loin.
serviceParams | Object | Optionnel | Service associé à la couche (OpenLS, WFS, WMTS)
wmtsOptions | Object | Optionnel | Options spécifiques aux couches WMTS

#### Propriétés de l'objet territories

L'objet TERRITORIES a pour propriétés l'ensemble des identifiants des territoires disponibles, par exemple 'FXX'. Pour chaque territoire, les propriétés sont détaillées ci-dessous :

Propriété | Type | Opt. | Valeur
- |-|-|-|
isDefault | Boolean | Obligatoire | Vaut 'true' si c'est le territoire à charger par défaut, ou 'false' sinon.
defaultCRS | String | Obligatoire | Identifiant de la projection associée par défaut au territoire (par exemple 'EPSG:3857').
additionalCRS | Array({string}) | Obligatoire | Autres projections associées au territoire, sous forme d'un tableau contenant les identifiants des projections.
geoBBOX | Object({left,right,top,bottom}) | Obligatoire | Objet contenant les coordonnées des extrémités de l'étendue spatiale du territoire (en coordonnées géographiques WGS84)
geoCenter | Object({lon,lat}) | Obligatoire | Objet contenant la latitude et longitude du centre du territoire (en coordonnées géographiques WGS84).
defaultOptions | Object | Obligatoire | Les niveaux de zoom utilisés par défaut pour ce territoire. La liste des propriétés est détaillée plus loin.
defaultLayers | Array({string}) | Obligatoire | Tableau contenant les identifiants des couches associées par défaut à ce territoire (par exemple,GEOGRAPHICALGRIDSYSTEMS.MAPS$GEOPORT AIL:OGC:WMTS).

#### Propriétés de l'objet tileMatrixSets

L'objet TILEMATRIXSETS a pour propriétés l'ensemble des identifiants des TMS disponibles, par exemple 'PM'. Pour chaque TMS, les propriétés sont détaillées ci-dessous :

Propriété | Type | Opt. | Valeur
- |-|-|-|
projection | String | Obligatoire | La projection associée (par exemple 'EPSG:3857').
nativeResolutions | Array({float}) | Obligatoire | Tableau contenant les résolutions associées aux différents niveaux de zoom, calculées à partir des échelles des niveaux de la pyramide (tileMatrices).
matrixIds | Array({String}) | Obligatoire | Tableau contenant les identifiants des différents niveaux de matrice (détaillés dans les objets tileMatrices)
tileMatrices | Array({object}) | Obligatoire | Tableau contenant les informations des niveaux de la pyramide (tileMatrix), sous forme d'objets de type TileMatrix. La liste des propriétés de ces objets est détaillée plus loin.

#### Propriétés de l'objet services

L'objet SERVICES a pour propriétés l'ensemble des services disponibles, par exemple 'OGC:WMTS'. Pour chaque service, les propriétés sont détaillées ci-dessous :

Propriété | Type | Opt. | Valeur
-|-|-|-|
title | String | Obligatoire | Titre du service (par exemple 'Point altimetrique')
serverUrl | String | Obligatoire | URL du serveur associé à ce service (par exemple 'http://wxs.ign.fr/geoportail/ols')
version | String | Obligatoire | Version du service (par exemple 2.0.0)

#### Propriétés de l'objet serviceParams (de l'objet Layers)

Propriété | Type | Opt. | Valeur
-|-|-|-|
id | String | Optionnel | Identifiant du service (OGC:WMTS, OGC:OPENLS;ReverseGeocode, etc)
serviceUrl | Array({string}) | Optionnel | Tableau contenant les URL du service (avec la ou les clé(s) de contrat associées à la couche)
version | String | Optionnel | Version du service

#### Propriétés des objets du tableau constraints (de l'objet Layers ou Layers.originators), et de l'objet globalConstraint (de l'objet Layers)

Propriété | Type | Opt. | Valeur
-|-|-|-|
crs | String | Optionnel | Identifiant de la projection associée.
bbox | Object({left,right,top,bottom}) | Optionnel | Objet contenant les coordonnées des extrémités de l'étendue géographique correspondant à la contrainte (en coordonnées géographiques WGS84)
minScaleDenominator | Number | Optionnel | Dénominateur d'échelle minimum
maxScaleDenominator | Number | Optionnel | Dénominateur d'échelle maximum
temporalExtent | Array({String}) | Optionnel | Etendue temporelle : [minT, maxT], où minT et maxT sont les dates correspondant aux extrémités de l'étendue temporelle, sous forme de chaîne de caractères.

#### Propriétés des objets du tableau metadata (de l'objet Layers)

Propriété | Type | Opt. | Valeur
-|-|-|-|
format | String | Obligatoire | Format du fichier de métadonnées (généralement XML).
url | String | Obligatoire | URL du fichier de métadonnées

#### Propriétés des objets du tableau styles (de l'objet Layers) 

Propriété | Type | Opt. | Valeur
-|-|-|-|
name | String | Obligatoire | Identifiant du style (par exemple 'normal' ou 'bdparcellaire').
title | String | Obligatoire | Titre décrivant un peu plus le style.
current | Boolean | Optionnel | Vaut true si le style actuel est sélectionné, false sinon.

#### Propriétés des objets du tableau legends (de l'objet Layers)

Propriété | Type | Opt. | Valeur
-|-|-|-|
format | String | Obligatoire | Format de la légende. /!\ Vaut toujours 'format' pour l'instant...
url | String | Obligatoire | URL du fichier de légende
minScale | Number | Obligatoire | Dénominateur de l'échelle maximum à laquelle la légende est disponible.

#### Propriétés des objets du tableau originators (de l'objet Layers)

Propriété | Type | Opt. | Valeur
-|-|-|-|
name | String | Obligatoire | Identifiant du propriétaire des données 
attribution | String | Obligatoire | Nom complet du propriétaire des données 
logo | String | Obligatoire | Url du logo du propriétaire des données
url | String | Obligatoire | URL du propriétaire des données (par exemple, http://www.ign.fr) 
constraints | Array({Object}) | Obligatoire | Informations concernant des contraintes associées à l'originator : notamment les emprises géographiques et échelles correspondantes aux données couvertes (la liste des propriétés est détaillée plus loin).

#### Propriétés des objets du tableau thematics (de l'objet Layers)

Propriété | Type | Opt. | Valeur
-|-|-|-|
inspire | Boolean | Obligatoire | Vaut true si c'est une thématique Inspire, false si c'est une thématique autre.
name | String | Obligatoire | Intitulé de la thématique.

#### Propriétés des objets du tableau formats (de l'objet Layers)

Propriété | Type | Opt. | Valeur
-|-|-|-|
current | Boolean | Optionnel | Vaut true si c'est le format actuel sélectionné, false sinon.
name | String | Obligatoire | Nom du format des données (par exemple, 'image/png').

#### Propriétés de l'objet dimensions (de l'objet Layers) 

Propriété | Type | Opt. | Valeur
-|-|-|-|
type | String | Optionnel | Type de visualisation (2D)
visibilityRange | String | Optionnel | Échelle de visualisation
visibilityMode | String | Optionnel | Exemple : 'resolution', 'distance'
noDataValue | String | Optionnel | Exemple : 'FFFFFF'
geometricType | String | Optionnel | Type de géométrie (uniquement pour les couches WFS)

#### Propriétés de l'objet wmtsOptions (de l'objet Layers)

Propriété | Type | Opt. | Valeur
-|-|-|-|
tileMatrixSetLink | String | Optionnel | Identifiant du TileMatrixSet associé à la couche (défini dans Gp.Config.tileMatrixSets)
tileMatrixSetLimits | Object | Optionnel | Objet contenant les limites des niveaux du tileMatrixSet (chaque clé de l'objet étant un identifiant de tileMatrix et la valeur étant un objet TileMatrixLimit, dont les propriétés sont définies ci-dessous)

#### Propriétés de l'objet tileMatrixSetLimits (de l'objet Layers.wmtsOptions)

Propriété | Type | Opt. | Valeur
-|-|-|-|
minTileRow | Number | Optionnel | Index de ligne minimum valide pour le niveau de pyramide pour une couche donnée. Compris entre 0 et maxTileRow.
maxTileRow | Number | Optionnel | Index de ligne maximum valide pour le niveau de pyramide pour une couche donnée.
minTileCol | Number | Optionnel | Index de colonne minimum valide pour le niveau de pyramide pour une couche donnée. Compris entre 0 et maxTileCol.
maxTileCol | Number | Optionnel | Index de colonne maximum valide pour le niveau de pyramide pour une couche donnée.

#### Propriétés de l'objet defaultOptions (de l'objet Territories)

Propriété | Type | Opt. | Valeur
-|-|-|-|
defaultResolution | Number | Obligatoire | La résolution par défaut spécifiée pour ce territoire (en mètres par pixel).
minScaleDenominator | Number | Obligatoire | Le dénominateur d'échelle maximal par défaut spécifié pour ce territoire.
maxScaleDenominator | Number | Obligatoire | Le dénominateur d'échelle minimal par défaut spécifié pour ce territoire.

#### Propriétés des objets du tableau TileMatrices (de l'objet TileMatrixSets)

Chaque élément de TileMatrices a pour propriétés l'ensemble des identifiants d'un niveau de matrice (généralement de 0 à 21). Pour chaque niveau, les propriétés sont détaillées ci-dessous :

Propriété | Type | Opt. | Valeur
-|-|-|-|
matrixId | Number | Obligatoire | Identifiant de la matrice (= niveau de pyramide) : entier entre 0 et 21.
matrixHeight | Number | Obligatoire | Hauteur de la matrice, en nombre de tuiles
matrixWidth | Number | Obligatoire | Largeur de la matrice, en nombre de tuiles
scaleDenominator | Float | Obligatoire | Dénominateur d'échelle associé à ce niveau (permet de calculer la résolution associée)
tileHeight | Number | Obligatoire | Hauteur des tuiles, en pixels (généralement 256)
tileWidth | Number | Obligatoire | Largeur des tuiles, en pixels (généralement 256)
topLeftCorner | Array({float}) | Obligatoire | Coordonnées d'origine des tuiles (coin « en haut à gauche »), dans la projection du TileMatrixSet : [x, y].

#### Quelques remarques

*Plusieurs clés*

Si plusieurs clés sont spécifiées, les informations relatives aux deux clés de contrat seront alors disponibles dans la variable Gp.Config. La clé spécifiée dans l'objet layers permet de savoir à quel contrat est associé chaque ressource, et donc de bien différencier les droits relatifs à chaque clé (notamment si on prévoit de gérer l'utilisation de plusieurs clés dans l'API).

*Informations des couches agrégées*

Si l'identifiant d'une couche agrégée est spécifié, les informations spécifiques à l'agrégation seront ajoutées dans la variable globale Gp.Config, dans les informations de la couche agrégée (l'agrégat final des autres couches).

*Informations manquantes pour les couches WFS*

Les informations retournées par le service, et stockées dans l'objet Gp.Config ne sont pas suffisantes, notamment pour afficher une couche WFS. En effet, il est nécessaire de connaître des paramètres concernant le protocole WFS : le namespace de la couche (featureNS) ainsi que le nom de l'attribut contenant la géométrie (geometryName). Ces deux éléments ne peuvent être récupérés qu'avec une requête DescribeFeatureType sur la couche que l'on veut récupérer. De même, il est nécessaire de connaître le featurePrefix ainsi que le typename, qui peuvent être récupérés à partir du nom de la ressouce.

On peut récupérer les paramètres featurePrefix et typename à partir du nom de la ressource pour les ajouter à la variable globale. Par exemple avec la ressource BDCARTO_BDD_GLP_WGS84G_20131216:commune :

* featurePrefix : la chaine de caractères avant les « : » dans le nom de la ressource. Par exemple, featurePrefix = BDCARTO_BDD_GLP_WGS84G_20131216.
* typename : la chaine de caractères après les « : » dans le nom de la ressource. Par exemple, typename = commune.

En revanche, pour les paramètres featureNS et geometryName, on les laissera vide. Lorsqu'on souhaitera ajouter une couche WFS, on pourra essayer les propositions suivantes :

* featureNS : uri composée de la manière suivante : http://wxs.ign.fr/datastore/featurePrefix. Par exemple, http://wxs.ign.fr/datastore/BDCARTO_BDD_GLP_WGS84G_20131216.
* geometryName = 'the_geom' ou 'geom'


### Exemples d'utilisation : Utilisation de la fonction getConfig()

#### Exemple 1

Première opération de l'autoconf avec une clef ; utilisation des différentes fonctions de rappel.

``` javascript
Gp.services.getConfig({
	apiKey: 'CLE_API',
	onSuccess: function(config){
		console.log("Succès de la lecture de l'auto-configuration");
		//affiche le contenu de la variable Geoportal.Config
		console.log(config);
	},
	onFailure: function(error){
		console.log("erreur de récupération des paramètres d'autoconfiguration");
		console.log("erreur : "+error.errorStatus);
		console.log(error.message);
	}
}) ;
```

L'objet **config** de la fonction onConfLoaded correspond à la variable globale Gp.Config. On peut alors visualiser notamment les différentes ressources auxquelles on a accès avec sa clé dans l'objet config.layers.

#### Exemple 2

getConfig avec plusieurs clefs.

``` javascript
Gp.services.getConfig({
	apiKey: [
		'CLE_1',
		'CLE_2'
	],
	onSuccess: function(config){
		console.log(config.generalOptions.apiKeys);
	},
}) ;
```

Pour visualiser rapidement les ressources disponibles pour chacune des clés, on peut visualiser l'objet Gp.Config.generalOptions.apiKeys, qui liste pour chaque clé les identifiants des couches disponibles.

#### Exemple 3 

Utilisation du paramètre layerId (deuxième opération de l'autoconf).

``` javascript
Gp.Services.getConfig({
	apiKey: 'CLE_API',
	layerID: "GEOGRAPHICALGRIDSYSTEMS.MAPS.3D$GEOPORTAIL:OGC:WMTS@aggregate",
	onSuccess: function(config) {
		console.log("success autoconf couche agrégée");
		console.log(config);
	}
});
```

Cette fonction s'utilise normalement après un premier appel à l'autonfiguration, simple (pour la clé de contrat) :

``` javascript
function onConfig (config) {
	console.log("success autoconf classique");
	console.log(config);
	Gp.Services.getConfig({
		apiKey: 'CLE_API',
		layerID: "GEOGRAPHICALGRIDSYSTEMS.MAPS.3D$GEOPORTAIL:OGC:WMTS@aggregate",
		onSuccess: function(config2) {
			console.log("success autoconf couche agrégée");
			console.log(config2);
		}
	})
};

Gp.services.getConfig({
	apiKey: 'CLE_API',
	onSuccess: onConfig
});
```

On peut alors visualiser le nom des couches composant la couche agrégée dans le tableau :

> config.layers["GEOGRAPHICALGRIDSYSTEMS.MAPS.3D$GEOPORTAIL:OGC:WMTS@aggregate"].aggregationOptions.aggregatedLayers[].

#### Exemple 4

Autoconf chargée localement.

``` javascript
Gp.services.getConfig(
	serverUrl: "autoconf.js",
	onSuccess: function(config){
		console.log(config);
	}
) ;
```

#### Exemple 5

Autoconf en GET sans passer par le protocole JSONP. Utilisation d'un proxy.

``` javascript
Gp.services.getConfig(
	apiKey: 'CLE_API',
	onSuccess: function(config){
		console.log(config);
	},
	protocol:'XHR',
	proxyURL: "/proxy/proxy.php",
	httpMethod:'GET'
) ;
```

Le résultat est le même : l'ensemble des informations associées à son contrat sont présentes dans la variable Gp.Config.

#### Exemple 6

Autoconf en POST. Utilisation d'un proxy.

``` javascript
Gp.services.getConfig({
	apiKey: 'CLE_API',
	onSuccess: function(config){
		console.log(config);
	},
	protocol:'XHR',
	proxyURL: "/proxy/proxy.php",
	httpMethod:'POST'
}) ;
```

### Exploitation des résultats avec OpenLayers 3

#### Exemple 1

Affichage d'une couche Géoportail WMTS avec OpenLayers 3 et les informations issues de l'autoconfiguration.

``` javascript
var map = null;
Gp.services.getConfig({
	apiKey: 'CLE_API',
	// la fin de chargement de l'autoconf declenche l'affichage de la carte
	onSuccess: initMap
});

function initMap(config){
	var layerID= 'GEOGRAPHICALGRIDSYSTEMS.MAPS$GEOPORTAIL:OGC:WMTS';
	var layerConf= Gp.Config.layers[layerID];
	var territoryConf= Gp.Config.territories;
	var TMSconf= Gp.Config.TileMatrixSets[layerConf.wmtsOptions.tileMatrixSetLink];
	map= new ol.Map({
		target: 'viewerDiv',
		renderer: "dom",
		view: new ol.View({
			zoom: 7,
			center: [288074.8449901076, 6247982.515792289],
			maxZoom: territoryConf.defaultOptions.maxZoomLevel
		}),
	layers: [
		new ol.layer.Tile({
			source: new ol.source.WMTS({
			url: layerConf.serviceParams.serviceUrl
			layer: layerConf.name,
			matrixSet: layerConf.wmtsOptions.TileMatrixSetLink,
			format: layerConf.formats[0].name,
			projection: layerConf.defaultProjection,
			tileGrid: new ol.tilegrid.WMTS({
				origin: TMSConf.matrixIds[0].topLeftCorner,
				resolutions: TMSConf.nativeResolutions,
				matrixIds: TMSConf.matrixIds
			}),
			style: layerConf.styles[0].name
			})
		})
	]
	});
}
```

#### Exemple 2

Affichage d'une couche WMS Géoportail avec OpenLayers 3 et les données de l'autoconfiguration. (GEOGRAPHICALGRIDSYSTEMS.MAPS$GEOPORTAIL:OGC:WMS)

``` javascript
var map = null;
Gp.services.getConfig({
	apiKey: 'CLE_API',
	// la fin de chargement de l'autoconf déclenche l'affichage de la carte
	onSuccess : initMap
});

function initMap(config){
	var layerID = 'GEOGRAPHICALGRIDSYSTEMS.MAPS$GEOPORTAIL:OGC:WMS';
	var layerConf = Gp.Config.layers[layerID];
	var territoryConf = Gp.Config.territories;
	map = new ol.Map({
		target: 'viewerDiv',
		view: new ol.View({
			zoom: 7,
			center: [288074.8449901076, 6247982.515792289],
			maxZoom: territoryConf.defaultOptions.maxZoomLevel
		}),
	layers: [
		new ol.layer.Image({
			source: new ol.source.ImageWMS({
				url: layerConf.serviceParams.serviceUrl,
				params: {'LAYERS': layerConf.name}
			})
		})
	]
	});
}
```







