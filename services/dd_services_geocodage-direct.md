---
layout: services
title: Géocodage direct
level: 3
order: 030202
api: services
---

## Géocodage Direct

Il s'agit de proposer une couche logicielle permettant l'utilisation du service de géocodage du Géoportail[^4]. Cette couche logicielle devra envoyer une requête correctement construite au serveur de géocodage selon des paramètres passés par le développeur et, parser la réponse du serveur, pour présenter au développeur les résultats.

### Cas d'utilisation

L'utilisateur est un développeur qui souhaite géocoder un ou plusieurs localisants. Il peut rechercher l'emplacement d'un toponyme, d'une adresse, d'une parcelle cadastrale et filtrer cette recherche en fonction d'attributs ou de contraintes géographiques. Il peut utiliser plusieurs méthodes et protocoles pour faire cette recherche. La réponse du serveur, après avoir été analysée et structurée, lui sera communiquée pour qu'il puisse ensuite effectuer le traitement qu'il souhaite.

### Mise en oeuvre

L'utilisation se fera par l'appel de la fonction statique :

> Gp.services.geocode(geocodeOptions)

La fonction prend en paramètre d'entrée un objet dont les propriétés peuvent prendre les valeurs suivantes (en plus des [propriétés générales décrites précédemment](./dd_services.html#commonParams)) :

Propriété | Type | Opt. | Valeur
-|-|-|-|
**location** | String or Object | **obligatoire** | Nom de l'adresse, du toponyme ou de la parcelle cadastrale recherchée (ou autre type de localisant). Sous forme de String, la propriété permet de faire une recherche déstructurée. Sous forme d'objet, la propriété permet de structurer la recherche. Dans ce cas, les propriétés possibles de cet objet sont décrites ci-après. 
filterOptions | Object | optionnel | Les propriétés possibles de cet objet sont décrites ci-après. 
maximumResponses | Number | optionnel | Nombre de réponses maximal que l'on souhaite recevoir. Pas de valeur par défaut. Si le serveur consulté est celui du Géoportail, la valeur par défaut sera donc celle du service : 25.
returnFreeForm | Boolean | optionnel | Indique si l'on souhaite en réponse un localisant concaténée plutôt que structuré. Pas de valeur par défaut. Si le serveur consulté est celui du Géoportail, la valeur par défaut sera donc celle du service : 'false'.
srs | String | optionnel | Système de coordonnées dans lequel les paramètres géographiques en entrée et la réponse du service sont exprimés. Pas de valeur par défaut. Si le serveur consulté est celui du Géoportail, la valeur par défaut sera donc celle du service : 'EPSG:4326'. 

#### Propriétés de l'objet location

Propriété | Type | Valeur
-|-|-|
[propriétés du localisant] | String | Propriété du localisant recherché sous la forme d'un couple clé/valeur à définir selon les possibilités du serveur. Le service de géocodage du Géoportail permet de faire des recherches structurées avec les propriétés : "number", "street", "postalCode" et "city",


#### Propriétés de l'objet filterOptions

Propriété | Type | Valeur
-|-|-|
bbox | Object | Emprise dans laquelle on souhaite effectuer la recherche. Les propriétés possibles de cet objet sont décrites ci-après. Pas de valeur par défaut.
type | Array(String) | Type de l'objet recherché. Le service de géocodage du Géoportail permet de rechercher des 'PostionOfInterest' pour des toponymes, des 'StreetAddress' pour des adresses postales et/ou des 'CadastralParcel' pour des parcelles cadastrales. D'autres types pourront être rajoutés selon l'évolution du service. Par défaut, type = ['StreetAddress'].
[propriétés du filtre] | String | Critère supplémentaire pour filtrer la recherche sous la forme d'un couple clé/valeur à définir selon les possibilités du serveur ajouté à la requête. Le service de géocodage du Géoportail permet de filtrer tous les résultats avec les propriétés : "municipality", "insee", "department", "accuracy" et "matchType". Il permet aussi de filtrer les adresses postales avec les propriétés : "number", "street", "postalCode","quality", "ID", "ID_TR", et "territory". Il permet de filtrer les toponymes avec les propriétés : "importance", "nature", "postalCode" et "territory". Enfin, il permet de filtrer les parcelles cadastrales avec les propriétés : "sheet", "section", et "absorbedcity". Pas de valeur par défaut.

#### Propriétés de l'objet bbox

Propriété | Type | Opt. | Valeur
-|-|-|-|
left | Float | obligatoire | Abscisse du côté gauche de la BBOX
right |Float | obligatoire | Abscisse du côté droit de la BBOX.
top | Float | obligatoire | Ordonnée supérieure de la BBOX.
bottom | Float | obligatoire | Ordonnée inférieure de la BBOX.

#### Paramètres de la fonction onSuccess()

La fonction onSuccess() prend en paramètre un objet GeocodeResponse ayant les propriétés suivantes:

Propriété | Type | Valeur
-|-|-|
locations | Array({DirectGeocodedLocation}) | Liste des résultats géolocalisés. Chaque objet DirectGeocodedLocation du tableau correspond à un résultat, dont les propriétés sont décrites ci-dessous.

#### Propriétés des objets DirectGeocodedLocation du tableau locations

Propriété | Type | Valeur
-|-|-|
position | Object({x :Float,y:Float}) | Longitude, latitude du résultat dans le système de coordonnées demandé.
accuracy | Float | Indicateur de pertinence (proximité phonétique et orthographique) entre la requête et le résultat. Il est compris entre 0 (pas de correspondance) et 1 (exactement identique).
matchType | String | Indique comment a été fait le géocodage : "street number" (à l'adresse exacte), "street enhanced" (à l'adresse avec interpolation entre les bornes de début et de fin du tronçon), "street" (à la rue sans interpolation), "city" (à la commune).
type | String | Type du résultat de géocodage retourné (lieu, parcelle cadastrale, toponyme, limite administrative). Valeurs possibles : "StreetAddress", "PositionOfInterest", "CadastralParcel" ou "Administratif".
placeAttributes | Object | Les attributs du résultat de géocodage retourné. Les attributs possibles de cet objet dépendent du type de résultat (renseigné dans l'attribut "type" de ce même objet). La liste de ces attributs est détaillée ci-dessous (propriétés générales ET spécifiques).


#### Propriétés générales de placeAttributes 

Propriété | Type | Valeur
-|-|-|
municipality | String | Municipalité du résultat.
freeform | String | Nom de l'adresse, du toponyme, de la limite administrative ou de la parcelle dans le cas où une forme déstructurée a été demandée.

#### Propriétés de placeAttributes spécifiques aux adresses postales (quand type = "StreetAddress")

Propriété | Type | Valeur
-|-|-|
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


#### Propriétés de placeAttributes spécifiques aux toponymes (quand type = "PositionOfInterest")

Propriété | Type | Valeur
-|-|-|
bbox | Object{left, right, top, bottom} | Emprise du toponyme dans le système de coordonnées demandé.
importance | Number | Importance du toponyme.
nature | String | Nature du toponyme.
postalCode | String | Code postal du toponyme.
territoire | String | Code du territoire français où se situe le toponyme.
commune | String | Ville du toponyme
department | String | Département du toponyme
insee | String | Code INSEE du toponyme


#### Propriétés de placeAttributes spécifiques aux parcelles cadastrales (quand type = "CadastralParcel")

Propriété | Type | Valeur
-|-|-|
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


#### Propriétés de placeAttributes spécifiques aux limites administratives (quand type = "Administratif")

Propriété | Type | Valeur
-|-|-|
bbox | Object{left, right, top, bottom} | Emprise de l'unité administrative dans le système de coordonnées demandé
prefecture | String | Nom de la préfécture de la région ou du département
postalCode | String | Code postal de l'unité administrative
inseeRegion | String | Numéro INSEE de la région
inseeDepartment | String | Numéro INSEE du département
municipality | String | Nom de l'unité administrative


Les propriétés listées ci-dessus sont celles fournies par le service de géocodage du Géoportail. Dans le cas de consultations d'un autre service, d'autres propriétés peuvent être retournées.

#### Paramètres de la fonction onFailure()

La fonction onFailure() prend en paramètre un objet ayant les propriétés suivantes:

Propriété | Type | Valeur
-|-|-|
status | Number | Code HTTP de retour du serveur.
message | String | Message de retour du serveur.

### Exemples d'utilisations

#### Exemple 1

Recherche des coordonnées d'un localisant sur le serveur de géocodage du Géoportail


``` javascript
Gp.services.geocode({
	apiKey:"CLEF_API",
	location : "rue pasteur, Saint-Mandé",
	onSuccess : function(geocodedLocations){
		if(geocodedLocations.legth > 0){
			console.log(geocodedLocations[0]) ;
		}
	},
	onFailure : function(response){
		alert("Erreur "+ response.status + " : " + response.message)
	}
}) ;
```

#### Exemple 2

Recherche structurée des coordonnées d'un localisant. Limite aux 5 premiers résultats. Adresses reçues en texte libre.

``` javascript
Gp.services.geocode({
    apiKey:"CLEF_API",
    location : {
        street:"rue pasteur",
        city : "Saint-Mandé"
    },
    maximumResponses : 5,
    returnFreeForm : true,
    onSuccess : function(geocodedLocations){
        if(geocodedLocations.legth > 0){
            alert(geocodedLocations[0].freeForm)
        }
    },
    onFailure : function(response){
        alert("Erreur "+ response.status + " : " + response.message)
    }
}) ;
```

#### Exemple 3

Recherche d'adresses ou toponymes avec un filtre attributaire la limitant au département des Bouches-du-Rhône.


``` javascript
Gp.services.geocode({
	apiKey:"CLEF_API",
	location : "rey arles",
	filterOptions : {
		type:['StreetAddress','PointOfInterest'],
		departement :"13"
	},
	onSuccess : function(geocodedLocations){
		alert(geocodedLocations.length + " réponses")
	}
}) ;
```

#### Exemple 4

Recherche d'une parcelle cadastrale avec un filtre géographique exprimée en Lambert 93 (EPSG:2154).

``` javascript
Gp.services.geocode({
	apiKey:"CLEF_API",
	location : "000BO01297",
	srs : "EPSG:2154",
	filterOptions : {
		type:['CadastralParcel'],
		bbox :{
			left : 735394,
			right : 884191,
			top : 6326325,
			bottom : 6236944
		}
	},
	onSuccess : function(geocodedLocations){
		alert(geocodedLocations.length + " réponses")
	}
}) ;
```

#### Exemple 5

Interrogation en mode AJAX (protocole XHR) et utilisation d'un proxy.

``` javascript
Gp.services.geocode({
	apiKey:"CLEF_API",
	location : "rue pasteur, Saint-Mandé",
	httpMethod : "GET",
	protocol : "XHR",
	proxyUrl :"/proxy.php?url="
	onSuccess : function(geocodedLocations){
		alert(geocodedLocations.length + " réponses")
	}
}) ;
```

#### Exemple 6

Envoi d'une requête en POST. Utilisation d'un proxy.

``` javascript
Gp.services.geocode({
	apiKey:"CLEF_API",
	location : "rue pasteur, Saint-Mandé",
	httpMethod : "POST",
	proxyUrl :"/proxy.php?url="
	onSuccess : function(geocodedLocations){
		alert(geocodedLocations.length + " réponses")
	}
}) ;
```

#### Exemple 7

Utilisation d'une autre URL pour le serveur de Géocodage.

``` javascript
Gp.services.geocode({
        location : "rue pasteur, Saint-Mandé",
        serverUrl : "http://pp-gpp3-wxs-ignfr.
        aw.atosorigin.com/CLEF_API/geoportail/ols",
        onSuccess : function(geocodedLocations){
                alert(geocodedLocations.length + " réponses")
        }
}) ;
```


[^4]: cf. http://api.ign.fr/tech-docs-js/fr/developpeur/search.html
