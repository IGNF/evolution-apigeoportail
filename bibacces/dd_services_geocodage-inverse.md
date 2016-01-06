---
layout: services
title: Géocodage inverse
level: 3
order: 030203
api: services
---

# Geocodage inverse

Il s'agit de proposer une couche logicielle permettant l'utilisation du service de géocodage indirect. Cette couche logicielle devra envoyer une requête correctement construite au serveur de géocodage indirect selon des paramètres passés par le développeur et, parser la réponse du serveur, pour présenter au développeur les résultats.

## Cas d'utilisation

Il peut rechercher un toponyme et/ou une adresse à proximité d'une position. Il peut utiliser plusieurs méthodes et protocoles pour faire cette recherche. La réponse du serveur, après avoir été analysée et structurée, lui sera communiquée pour qu'il puisse ensuite effectuer le traitement qu'il souhaite.

## Mise en oeuvre

L'utilisation se fera par l'appel de la fonction statique.

> Gp.services.reverseGeocode(reverseGeocodeOptions)

La fonction prend en paramètre d'entrée un objet dont les propriétés peuvent prendre les valeurs suivantes (en plus des [propriétés générales décrites précédemment](./dd_services.html#commonParams)) :

Propriété | Type | Opt. | Valeur
- |-|-|-|
**position** | Object({x:Float,y:Float}) | **obligatoire** | Abscisse et ordonnée du point de référence pour le calcul de proximité exprimées dans le système de référence spécifié par le srs.
srs | String | optionnel | Système de coordonnées dans lequel les paramètres géographiques en entrée sont exprimés. La réponse du service sera alors aussi exprimée dans ce système de coordonnées. Pas de valeur par défaut. Si le serveur consulté est celui du Géoportail, la valeur par défaut sera donc celle du service : 'EPSG:4326'.
filterOptions | Object | optionnel | Les propriétés possibles de cet objet sont décrites ci-après.
returnFreeForm | Boolean | optionnel | Indique si l'on souhaite en réponse un localisant exprimé en texte libre plutôt que dans une forme structurée. Pas de valeur par défaut. La valeur par défaut sera donc celle du service : 'false' pour le Géoportail.
maximumResponses | Number | optionnel | Nombre de réponses maximal que l'on souhaite recevoir. Pas de valeur par défaut. Si le serveur consulté est celui du Géoportail, la valeur par défaut sera donc celle du service : 25.

### Propriétés de l'objet filterOptions

Propriété | Type | Valeur
- |-|-|
bbox | Object | Emprise dans laquelle on souhaite effectuer la recherche. Les propriétés possibles de cet objet sont décrites ci-après. Pas de valeur par défaut.
circle | Object | Cercle dans lequel on souhaite effectuer la recherche. Les propriétés possibles de cet objet sont décrites ci-après. Pas de valeur par défaut.
polygon | Array({x:Float,y:Float}) | Polygone dans lequel on souhaite effectuer la recherche. Liste des couples x et y pour chaque point constituant le polygone. Pas de valeur par défaut.
type | Array(String) | Type de l'objet recherché. Le service de géocodage du Géoportail permet de rechercher des 'PostionOfInterest' pour des toponymes, des 'StreetAddress' pour des adresses postales et/ou des 'CadastralParcel' pour des parcelles cadastrales. D'autres types pourront être rajoutés selon l'évolution du service. Par défaut, type = ['StreetAddress'].

### Propriétés de l'objet bbox

Propriété | Type | Opt. | Valeur
- |-|-|-|
left | Float | obligatoire | Abscisse du côté gauche de la BBOX.
right | Float | obligatoire | Abscisse du côté droit de la BBOX.
top | Float | obligatoire | Ordonnée supérieure de la BBOX.
bottom | Float | obligatoire | Ordonnée inférieure de la BBOX.

### Propriétés de l'objet circle

Propriété | Type | Opt. | Valeur
- |-|-|-|
x | Float | obligatoire | Abscisse du centre du cercle de recherche.
y | Float | obligatoire | Ordonnée du centre du cercle de recherche.
radius | Float | obligatoire | Rayon du cercle de recherche.

### Paramètres de la fonction onSuccess()

La fonction onSuccess() prend en paramètre un objet GeocodeResponse ayant les propriétés suivantes:

Propriété | Type | Valeur
-|-|-|
locations | Array({ReverseGeocodedLocation}) | Liste des résultats géolocalisés. Chaque objet ReverseGeocodedLocation du tableau correspond à un résultat, dont les propriétés sont décrites ci-dessous.

### Propriétés des objets ReverseGeocodedLocation du tableau locations

Propriété | Type | Valeur
- |-|-|
position | Object({x :Float,y:Float}) | Longitude, latitude du résultat dans le système de coordonnées demandé.
matchType | String | Indique comment a été fait le géocodage : "street number" (à l'adresse exacte), "street enhanced" (à l'adresse avec interpolation entre les bornes de début et de fin du tronçon), "street" (à la rue sans interpolation), "city" (à la commune).
type | String | Type du résultat de géocodage retourné (lieu, parcelle cadastrale, toponyme, limite administrative). Valeurs possibles : "StreetAddress", "PositionOfInterest", "CadastralParcel" ou "Administratif".
placeAttributes | Object | Les attributs du résultat de géocodage retourné. Les attributs possibles de cet objet dépendent du type de résultat (renseigné dans l'attribut "type" de ce même objet). La liste de ces attributs est détaillée ci-dessous (propriétés générales ET spécifiques).
searchCenterDistance | Float | Distance entre le point de référence et le résultat (dépend du système de coordonnées).

### Propriétés générales de placeAttributes 

Propriété | Type | Valeur
-|-|-|
municipality | String | Municipalité du résultat.

### Propriétés de placeAttributes spécifiques aux adresses postales (quand type = "StreetAddress")

Propriété | Type | Valeur
- |-|-|
bbox | Object{left, right, top, bottom} | Emprise de l'adresse dans le système de coordonnées demandé. 
ID | String | Identifiant BD ADRESSE dans le cas où le résultat est une adresse.
IDTR | String | Identifiant "Route Adresse" de la voie portant l'adresse dans la base BD ADRESSE.
number | String | Numéro de l'adresse (avec répétiteur s'il y a lieu) .
postalCode | String | Code postal de l'adresse.
quality | String | Indicateur de qualité du géocodage (pour plus d'infos http://api.ign.fr/tech-docs-js/fr/developpeur/search.html)
street | String | Nom de la rue dans laquelle se trouve l'adresse.
territoire | String | Code du territoire français où se situe l'adresse
commune | String | Ville de l'adresse
department | String | Département de l'adresse
insee | String | Code INSEE de l'adresse

### Propriétés de placeAttributes spécifiques aux toponymes (quand type = "PositionOfInterest")

Propriété | Type | Valeur
- |-|-|
bbox | Array(Object) | Emprise du toponyme dans le système de coordonnées demandé.
importance | Number | Importance du toponyme.
nature | String | Nature du toponyme.
postalCode | String | Code postal du toponyme.
territoire | String | Code du territoire français où se situe le toponyme.
commune | String | Ville du toponyme.
department | String | Département du toponyme.
insee | String | Code INSEE du toponyme

### Propriétés de placeAttributes spécifiques aux parcelles cadastrales (quand type = "CadastralParcel")

Propriété | Type | Valeur
- |-|-|
absorbedCity | String | Code commune absorbée de la parcelle : lorsqu'une parcelle est issue d'une ancienne commune qui a fusionné avec une autre. Sinon, le code vaut '000'.
cadastralParcel | String | Nom de la parcelle (ex. 940670000D0041).
district | String | Arrondissement de la parcelle.
sheet | String | Feuille de la parcelle (ex 1).
number | String | Numéro de la parcelle (ex. 0041).
section | String | Section de la parcelle (ex 0D).
origin | String | L'origine de l'objet parcellaire renvoyé (correspond à l'attribut "type" dans la réponse XML) Pour plus d'informations : http://api.ign.fr/tech-docs-js/fr/developpeur/search.html#Recherche_par_parcelles_cadastrales
commune | String | Ville de la parcelle
department | String | Département de la parcelle
insee | String | Code INSEE de la parcelle

### Propriétés de placeAttributes spécifiques aux limites administratives (quand type = "Administratif")

Propriété | Type | Valeur
-|-|-|
bbox | Object{left, right, top, bottom} | Emprise de l'unité administrative dans le système de coordonnées demandé
prefecture | String | Nom de la préfécture de la région ou du département
postalCode | String | Code postal de l'unité administrative
inseeRegion | String | Numéro INSEE de la région
inseeDepartment | String | Numéro INSEE du département
municipality | String | Nom de l'unité administrative

Les propriétés listées ci-dessus sont celles fournies actuellement par le service de géocodage du Géoportail.

### Paramètres de la fonction onFailure()

La fonction onFailure() prend en paramètre un objet ayant les propriétés suivantes:

Propriété | Type | Opt. | Valeur
- |-|-|-|
status | Number | obligatoire | Code HTTP de retour du serveur.
message | String | obligatoire | Message de retour du serveur.

## Exemples d'utilisation

### Exemple 1

Recherche d'adresses proches d'un point.


``` javascript
Gp.services.reverseGeocode({
	apiKey:"CLEF_API",
	position : {
		x : 43,6779842,
		y : 4,621130
	},
	onSuccess : function(geocodedLocations){
		console.log(geocodedLocations)
	},
	onFailure : function(response){
		alert("Erreur "response.status + " : " + response.message)
	}
})
```

### Exemple 2

Recherche d'adresses proches d'un point. Limitation aux 5 premiers résultats. Adresses exprimées en texte libre.

``` javascript
Gp.services.reverseGeocode ({
	apiKey:"CLEF_API",
	position : {
		x : 43,6779842,
		y : 4,621130
	},
	maximumResponses : 5,
	returnFreeForm : true,
	onSuccess : function(geocodedLocations){
		alert(geocodedLocations.length + " réponses")
	}
})
```

### Exemple 3

Recherche d'adresses ou toponymes proches d'un point.

``` javascript
Gp.services.reverseGeocode ({
	apiKey:"CLEF_API",
	position : {
		x : 43,6779842,
		y : 4,621130
	},
	filterOptions : {
		type:['StreetAddress','PointOfInterest']
	}
	onSuccess : function(geocodedLocations){
		alert(geocodedLocations.length + " réponses")
	}
}) ;
```

### Exemple 4

Recherche de parcelles proches d'un point dans une zone de recherche rectangulaire exprimée en Lambert 93.

``` javascript
Gp.services.reverseGeocode ({
	apiKey:"CLEF_API",
	position : {
		x : 755394,
		y : 6296944
	}
	srs : "EPSG:2154",
	filterOptions : {
		type:['CadastralParcel'],
		bbox:{
			left : 735394,
			right : 884191,
			top : 6326325,
			down : 6236944
		}
	},
	onSuccess : function(geocodedLocations){
		alert(geocodedLocations.length + " réponses") ;
	}
})
```

