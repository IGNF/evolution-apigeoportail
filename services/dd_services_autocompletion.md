---
layout: services
title: Autocompletion
level: 3
order: 030204
api: services
---


# Autocomplétion

Il s'agit de proposer une couche logicielle permettant l'utilisation du service d'autocomplétion5. Cette couche logicielle devra envoyer une requête correctement construite au serveur d'autocomplétion[^5] selon des paramètres passés par le développeur et, parser la réponse du serveur, pour présenter au développeur les résultats.

## Cas d'utilisation

Le cas d'utilisation classique est le champ de saisie texte d'un moteur de recherche dans une application dont on veut qu'il propose des suggestions d'adresses ou de toponymes au fur et à mesure de la saisie. Les suggestions peuvent alors être ré-exploitées, soit pour récupérer les coordonnées qui y sont associées, soit comme critère de recherche pour le service de Géocodage du Géoportail (recherche plus pertinente et informations attributaires plus riches).

## Mise en oeuvre

L'utilisation se fera par l'appel de la fonction statique.

> Gp.services.autocomplete(autocompleteOptions)

La fonction prend en paramètre d'entrée un objet dont les propriétés peuvent prendre les valeurs suivantes (en plus des [propriétés générales décrites précédemment](./dd_services.html#commonParams)) :

### Propriétés de l'objet autocompleteOptions

Propriété | Type | Opt. | Valeur
- |-|-|-|
**text** | String | obligatoire | La chaîne de caractère à compléter. Cette chaîne n'est pas "URL encodée". C'est l'API qui s'occupe de l'encoder pour l'inclure dans la requête.
filterOptions | Object | optionnel | Les propriétés possibles de cet objet sont décrites ci-après.
maximumResponses | Number | optionnel | Nombre de réponses maximales que l'on souhaite recevoir. Pas de valeur par défaut. La valeur par défaut sera donc celle du service : 10.

### Propriétés de l'objet filterOptions

Propriété | Type | Valeur
- |-|-|
type | Array(String) | Type de l'objet recherché. Le service d'autocomplétion du Géoportail permet de rechercher des toponymes 'PostionOfInterest' et/ou des adresses postales 'StreetAddress'. D'autres types pourront être rajoutés selon l'évolution du service. Par défaut, type = ['StreetAddress'].
territory | Array(String) | Limitation de la zone de recherche de localisants. Le service d'autocomplétion du Géoportail permet de limiter la recherche à la métropole et la Corse 'METROPOLE', aux DOMS TOMS. 'DOMTOM', à une liste de codes de départements ou codes INSEE de communes. Pas de valeur par défaut. La valeur par défaut est donc celle du service. Le service d'autocomplétion du Géoportail renvoie toutes les informations quand aucun territoire n'est spécifié.

### Paramètres de la fonction onSuccess(AutoCompleteResponse)

La fonction onSuccess() prend en paramètre un objet AutoCompleteResponse ayant les propriétés suivantes:

Propriété | Type | Valeur
- |-|-|
suggestedLocations | Array({SuggestedLocation}) | Liste des localisants proposés par le service. Les propriétés possibles de cet objet sont décrites ci-après.

### Propriétés générales des objets SuggestedLocation

Propriété | Type | Valeur
- |-|-|
type | String | Type de la suggestion retournée : "StreetAddress" (adresse) ou "PositionOfInterest" (toponyme)
position | Object({x :Float, y :Float}) | Longitude et latitude du résultat dans le système de coordonnées demandé.
commune | String | Ville du résultat.
fullText | String | Nom complet de l'adresse, du toponyme.
postalCode | Number | Propre aux adresses postales et toponymes. Code postal de l'adresse ou du toponyme géolocalisée.
classification | Integer | Valeur fonction de la nature du localisant. Pour les communes, ce chiffre varie de 1 (capitale) à 6 (commune). Pour les autres toponyme, il est égal à 8.

### Propriétés spécifiques aux suggestions de type "PositionOfInterest" (toponymes)

Propriété | Type | Valeur
- |-|-|
poi | String | Propre aux toponymes. Nom du lieu.
kind | String | Propre aux toponymes. Type de toponymes ( par exemple "préfecture", monument, "commune"... ).

### Propriétés spécifiques aux suggestions de type "StreetAddress" (adresses)

Propriété | Type | Valeur
- |-|-|
street | String | Propre aux adresses postales. Nom de la rue.

### Paramètres de la fonction onFailure()

La fonction onFailure() prend en paramètre un objet ayant les propriétés suivantes:

Propriété | Type | Valeur
- |-|-|
status | Number | Code HTTP de retour du serveur.
message | String | Message de retour du serveur.


## Exemples d'utilisation

### Exemple 1

Demande de suggestions d'adresses commencant par "rue pasteur, Sai" .

``` javascript
Gp.services.autocomplete({
	apiKey:"CLEF_API",
	text : "rue pasteur, Sai",
	onSuccess : function(autocompleteResponse){
		console.log(autocompleteResponse)
	},
	onFailure : function(autocompleteResponse){
		alert("Erreur "autocompleteResponse.status + " : " +
		autocompleteResponse.message)
	}
}) ;
```

### Exemple 2

Demande de suggestions d'adresses ou de toponymes commençant par "rue pasteur, Sai". Restriction de la recherche sur le département 94. Limitation du nombre de réponses.

``` javascript
Gp.services.autocomplete ({
	apiKey:"CLEF_API",
	text : "rue pasteur, Sai",
	filterOptions:{
		type:['StreetAddress','PositionOfInterest'],
		territory :["94"]
	},
	maximumResponses : 5,
	onSuccess : function(autocompleteResponse){
		alert(autocompleteResponse.suggestedLocations.length + " réponses")
	}
}) ;
```

### Exemple 3

Utilisation du service d'autocompletion sur une autre URL.

``` javascript
Gp.services.geocode({
	text : "rue pasteur, Saint-Man",
	serverUrl : "http://autre.url/CLEF_API/geoportail/ols/apis/completion"
	
	onSuccess : function(geocodedResponse){
		alert(geocodedResponse.suggestedLocations.length + " réponses")
	}
}) ;
```


[^5]: TODO : URL de doc du service

