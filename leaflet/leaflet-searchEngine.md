---
layout: leaflet
title: Moteur de Recherche
level: 2
order: 000500
api: leaflet
---

# Widget de positionnement par Géocodage IGN

## Présentation générale

Ce widget permet de positionner la carte à partir de la saisie d'un localisant dont la position sera retournée par le service de géocodage de l'IGN.

Le widget est paramétrable par le développeur de façon à pouvoir exploiter les différents modes d'accès du service de Géocodage :

* type de localisants (adresses, toponymes, parcelles, ...)
* différentes possibilités de filtrage (attributaire, géographique)

Il peut être proposé en mode recherche simple (un champ texte) ou avancée (choix par l'utilisateur des différents critères de filtrage).

La saisie de localisants peut s'accompagner d'un mode d'autocomplétion s'appuyant sur le service d'autocomplétion de la plateforme Géoportail.

## Spécification détaillée

### Usage

``` javascript
var searchEngine = L.geoportalControl.SearchEngine(opts);
map.addControl(searchEngine);
```

### Options

Les propriétés possibles de l'objet **options** sont les suivantes 
(en plus des [options communes aux contrôles Leaflet](http://leafletjs.com/reference.html#control) ) :

Option      |  Type   |    Opt.   | Defaut    | Valeur
-|-|-|-|-|
collapsed   | Boolean | Optionnel | false     | Permet de replier le widget au chargement de la carte (collapsed = true). Par défaut, il est déplié (collapsed = false)
position    | String  | Optionnel | 'topleft' | Position initiale du contrôle sur la carte ([cf. options de positionnement Leaflet](http://leafletjs.com/reference.html#control-positions))
displayInfo | Boolean | Optionnel | true      | Active la popup d'information sur le marker.
apiKey      | String  | Optionnel | null      | Clef API utilisée pour l'utilisation des services.
resources   | Array   | Optionnel | []        | Liste des ressources à utiliser pour les services.
advancedSearch | Object | Optionnel | {}      | Configuration du geocodage avancé.
geocodeOptions | Object | Optionnel | {}      | Options du service de geocodage.
autocompleteOptions | Object | Optionnel | {} | Options du service d'autocompletion.

#### Liste des ressources

Les ressources possibles pour le service d'autocompletion et du geocodage sont les suivantes :

- PositionOfInterest
- StreetAddress
- CadastralParcel
- Administratif

Il est possible de definir la liste des ressources que l'on souhaite utiliser :

``` javascript
resources : [ "PositionOfInterest", "StreetAddress" ]
```

Ces ressources sont definies automatiquement par le chargement de l'autoconfiguration,
sauf si l'on souhaite limiter les requêtes sur queleques ressources.

#### Configuration des services

Les services d'autocompletion et du geocodage sont configurables :

``` javascript
geocodeOptions : {
    protocol : XHR,
    httpMethod : "GET",
    apiKey : "fjfz8rg7r89t45t4er8t7g84er56g486t",
    filterOptions : {
        type : [ "PositionOfInterest", "StreetAddress" ],
        department : 77,
        territory : "FXX"
    }
}
```

Pour plus de détails, consulter la page de description :
- [geocodage direct](./../bibacces/dd_services_geocodage-direct.html)
- [autocompletion](./../bibacces/dd_services_autocompletion.html)

Il est donc possible de configurer les services independamments.

On peut voir que la propriété 'apiKey' se trouve aussi au niveau des options du service.
Il faut savoir que la clef des services surcharge toujours celle du contrôle. 
Il en va de même avec l'autoconfiguration.

#### Configuration du geocodage avancé

Cette option 'advancedSearch' est utilisée sur le geocodage en mode avancé. 
Elle permet de configurer les filtres pour les ressources. 
Les filtres configurés écrasent ceux par défaut. 
Sinon, on prend les filtres par défaut. 


Exemple de configuration :

``` javascript
advancedSearch : {
  PositionOfInterest : [
    { name : "importance", title : "Importance" },
    { name : "nature", title : "Nature" }
  ],
  StreetAddress : [],
  CadastralParcel : [
    { name : "sheet", title :  "Feuille" },
    { name : "number", title : "Numero" },
    { name : "section", title : "Section" },
    { name : "commune", title : "Commune" }
  ]
}
```

Si l'on souhaite aucun filtre, aucune configuration pour une ressource : 

``` javascript
advancedSearch : { 
    StreetAdress : null || []
} 
```

Il est possible de mettre en place des filtres avec des valeurs par defaut :

``` javascript
advancedSearch : { 
    PositionOfInterest : [
    { name : "importance", title : "Importance", value : 6 },
    { name : "nature", title : "Nature", value : "Commune" }
  ]
} 
```

Pour chaque ressource, on a les proprités suivantes :

Option      |  Type   |    Opt.   | Defaut | Valeur
-|-|-|-|-|
name        | String  | Optionnel |        | nom du filtre du service
title       | String  | Optionnel |        | nom usuel
value       | String  | Optionnel |        | valeur par défaut


### Exemples

#### simple

L'autoconfiguration est chargée.
La vérification des droits sur les ressources est realisée.

On change la position du contrôle, et on le souhaite deplié.

``` javascript
var searchEngine = L.geoportalControl.SearchEngine({
    position : 'bottomright',
    collapsed : true
});
```

On souhaite afficher des informations (popup) sur le marker :

``` javascript
var searchEngine = L.geoportalControl.SearchEngine({
    displayInfo : true
});
```

L'autoconfiguration nous donne des droits sur toutes les ressources, mais nous voulons limiter 
les requêtes sur des recherches de type "StreetAddress" uniquement :

``` javascript
var searchEngine = L.geoportalControl.SearchEngine({
    resources : ["StreetAddress"],
});
```

#### avancé

L'autoconfiguration n'est pas chargée !
Aucune vérification des droits n'est possible.
La responsabilité revient à l'utilisateur de gérer ses ressources.

Une clef API est renseignée au niveau du contrôle :

``` javascript
var searchEngine = L.geoportalControl.SearchEngine({
    apiKey : "far4ze5t4z56t4z65t4ert465zr6z"
});
```

Il est possible aussi de renseigner la clef API via la configuration des services.
Trés utile, si l'utilisateur possède des clefs differentes par service.

``` javascript
var searchEngine = L.geoportalControl.SearchEngine({
    geocodeOptions : {
        apiKey : "far4ze5t4z56t4z65t4ert465zr6z"
    },
    autocompleteOptions : {
        apiKey : "87987897987897878795123123181"
    }
});
```

On peut redefinir les options des services, aussi bien des protocoles que sur les 
options du services tels que les filtres ou les ressources :

``` javascript
var searchEngine = L.geoportalControl.SearchEngine({
    geocodeOptions : {
        protocol : "XHR",
        proxyUrl : "http://localhost/proxy/proxy.jsp",
        apiKey : "far4ze5t4z56t4z65t4ert465zr6z",
        filterOptions : {
            type : ["PositionOfInterest", "StreetAddress"],
            departement : 77
        }
    },
    autocompleteOptions : {
        filterOptions : {
            type : ["PositionOfInterest"],
            territory : "FXX"
        }
    }
});
```

#### recherche avancée

Pour la recherche avancé, on peut limiter le nombre de champs :

``` javascript
var searchEngine = L.geoportalControl.SearchEngine({
    advancedSearch : {
        PositionOfInterest : [
            { name : "importance", title : "Importance" },
            { name : "nature", title : "Nature" }
        ],
        StreetAddress : [],
    }
});
```

On peut y ajouter des champs avec des valeurs par defaut :

``` javascript
var searchEngine = L.geoportalControl.SearchEngine({
     advancedSearch : {
        PositionOfInterest : [
            { name : "importance", title : "Importance", value : 6 },
            { name : "nature", title : "Nature", value : "Commune" }
        ],
        StreetAddress : [],
    }
});
```

#### quelques cas particuliers

L'autoconfiguration est chargée.
La vérification des droits sur les ressources est realisée.

Si l'utilisateur renseigne une clef, on verifie la coherence entre l'autoconfiguration 
et la clef. Si des incoherences apparaissent, on previent simplement l'utilisateur.

``` javascript
var searchEngine = L.geoportalControl.SearchEngine({
    apiKey : "far4ze5t4z56t4z65t4ert465zr6z"
});
```

Si l'utilisateur renseigne des ressources, on verifie que l'on a bien les droits dessus.
Si la clef ne possede pas de droit sur une ressource, cette derniere est ecartée de la liste.

``` javascript
var searchEngine = L.geoportalControl.SearchEngine({
    resources : ["PositionOfInterest", "StreetAddress", "CadastralParcel"],
});
```

## Ergonomie
    
<div id="viewerDiv">
            
            <div class="leaflet-control-zoom">
                <a class="leaflet-control-zoom-in" href="#" title="Zoom in">+</a>
                <a class="leaflet-control-zoom-out" href="#" title="Zoom out">-</a>
            </div>
            
            <!-- SEARCH ENGINE -->
            
            <div id="GPsearchEngine" class="GPwidget">
                
                <!-- Hidden checkbox for minimizing/maximizing -->
                <input type="checkbox" id="GPshowSearchEngine" />
                <label for="GPshowSearchEngine" id="GPshowSearchEnginePicto" class="GPshowAdvancedToolPicto" title="Afficher/masquer la recherche par lieux">
                    <span id="GPshowSearchEngineOpen" class="GPshowAdvancedToolOpen"></span>
                </label>
                
                <!-- Simple search input -->
                <form id="GPsearchInput">
                    <input type="text" placeholder="Rechercher un lieu, une adresse" />
                    <div id="GPsearchInputReset"></div>
                </form>
                
                <!-- Advanced search panel -->
                <div id="GPshowAdvancedSearch" class="GPshowAdvancedToolPicto" title="Ouvrir la recherche avancée">
                    <span id="GPshowAdvancedSearchOpen" class="GPshowAdvancedToolOpen"></span>
                </div>
                <div id="GPadvancedSearchPanel" class="GPpanel">
                    <div class="GPpanelHeader">
                        <div class="GPpanelTitle">Recherche avancée</div>
                        <div id="GPadvancedSearchClose" class="GPpanelClose" title="Fermer la recherche avancée"></div>
                    </div>
                    <form id="GPadvancedSearchForm">
                        <div class="GPflexInput">
                            <label class="GPadvancedSearchCodeLabel">Recherche par</label>
                            <select class="GPadvancedSearchCode">
                                <option>Lieux/toponymes</option>
                                <option>Adresses</option>
                                <option>Parcelles cadastrales</option>
                            </select>
                        </div>
                        <!-- Search filters -->
                        <div id="GPadvancedSearchFilters">
                            <!-- Research filters are filled in Javascript depending on developer choice -->
                            <div class="GPflexInput">
                                <label for="GPadvancedSearchFilter1" class="GPadvancedSearchFilterLabel">Rue</label>
                                <input type="text" id="GPadvancedSearchFilter1" class="GPadvancedSearchFilterInput" />
                            </div>
                            <div class="GPflexInput">
                                <label for="GPadvancedSearchFilter2" class="GPadvancedSearchFilterLabel">Code postal</label>
                                <input type="text" id="GPadvancedSearchFilter2" class="GPadvancedSearchFilterInput" />
                            </div>
                            <div class="GPflexInput">
                                <label for="GPadvancedSearchFilter3" class="GPadvancedSearchFilterLabel">Ville</label>
                                <input type="text" id="GPadvancedSearchFilter3" class="GPadvancedSearchFilterInput" />
                            </div>
                        </div>
                        <input type="submit" id="GPadvancedSearchSubmit" class="GPinputSubmit" value="Chercher" />
                    </form>
                </div>
                
                <!-- Autocomplete list -->
                <div id="GPautoCompleteList" class="GPautoCompleteList">
                    <!-- Proposals are dynamically filled in Javascript by autocomplete service -->
                    <div class="GPautoCompleteProposal">17000 La Rochelle</div>
                    <div class="GPautoCompleteProposal">94165 Saint Mandé</div>
                    <div class="GPautoCompleteProposal">Une proposition super longue exprès pour voir ce que ça fait si ça déborde</div>
                    <div class="GPautoCompleteProposal">What else ?</div>
                    <div class="GPautoCompleteProposal">Last and surely least</div>
                </div>
                
                <!-- Geocoding results list -->
                <div id="GPgeocodeResultsList" class="GPpanel">
                    <div class="GPpanelHeader">
                        <div class="GPpanelTitle">Résultats de la recherche</div>
                        <div class="GPpanelClose" id="GPgeocodeResultsClose" title="Fermer la fenêtre de résultats"></div>
                    </div>
                    <div id="GPgeocodeResults">
                        <!-- Results are dynamically filled in Javascript by geocoding service -->
                        <div class="GPautoCompleteProposal">17000 La Rochelle</div>
                        <div class="GPautoCompleteProposal">94165 Saint Mandé</div>
                        <div class="GPautoCompleteProposal">Une proposition super longue exprès pour voir ce que ça fait si ça déborde</div>
                        <div class="GPautoCompleteProposal">What else ?</div>
                        <div class="GPautoCompleteProposal">Result example</div>
                        <div class="GPautoCompleteProposal">Result example</div>
                        <div class="GPautoCompleteProposal">Result example</div>
                        <div class="GPautoCompleteProposal">Result example</div>
                        <div class="GPautoCompleteProposal">Result example</div>
                        <div class="GPautoCompleteProposal">Result example</div>
                        <div class="GPautoCompleteProposal">Result example</div>
                        <div class="GPautoCompleteProposal">Result example</div>
                        <div class="GPautoCompleteProposal">Result example</div>
                        <div class="GPautoCompleteProposal">Result example</div>
                        <div class="GPautoCompleteProposal">Result example</div>
                    </div>
                </div>
                
            </div>
        
</div>
