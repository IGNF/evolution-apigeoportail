---
layout: ol3
title: Moteur de Recherche
level: 2
order: 000500
api: ol3
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

### Utilisation

Ce widget se comporte comme un contrôle d'OpenLayers (ol.control.Control), il faut donc instancier un objet ol.control.SearchEngine puis l'ajouter à sa carte OpenLayers.

``` javascript
var searchControl = ol.control.SearchEngine(opts);
map.addControl(searchControl);
```

### Options

Le paramètre **opts** est un objet, dont les propriétés peuvent prendre les valeurs suivantes (en plus des [options du contrôle OpenLayers](http://openlayers.org/en/v3.14.2/apidoc/ol.control.Control.html)) :

Paramètre     |  Type    |    Opt.   | Valeur
-|-|-|-|
apiKey                | String  | Conditionnel | Clef API utilisée pour l’utilisation des services d'autocomplétion et de géocodage du Géoportail. Nécessaire si l'autoconfiguration n'a pas été chargée au préalable.
collapsed             | Boolean | Optionnel | Permet de spécifier si le widget doit être déplié au démarrage de l'application (collapsed = false), ou replié (collapsed = true). Plié par défault (true).
resources             | Object  | Optionnel | Liste des ressources de géocodage ou d'autocomplétion qui seront utilsés pour ces services respectifs (voir ci-dessous)
displayAdvancedSearch | Boolean | Optionnel | Permet de ne pas afficher les outils de recherche avancée (displayAdvancedSearch = false). Affichés par défaut (true).
advancedSearch        | Object  | Optionnel | Options de recherche avancée pour le géocodage (filtres). Voir ci-dessous pour plus d'informations.
geocodeOptions        | Object  | Optionnel | Options du service de géocodage, tel que paramétrable via la bibliothèque d'accès (Gp.Services.geocode). Voir [la documentation technique des paramètres du service](http://ignf.github.io/geoportal-access-lib/v1.0.0-beta.1/jsdoc/module-Services.html#~geocode) pour connaître l'ensemble des options.
autocompleteOptions   | Object  | Optionnel | Options du service d'autocomplétion, tel que paramétrable via la bibliothèque d'accès (Gp.Services.autoComplete). Voir [la documentation technique des paramètres du service](http://ignf.github.io/geoportal-access-lib/v1.0.0-beta.1/jsdoc/module-Services.html#~autoComplete) pour connaître l'ensemble des options.

### Exemples de paramétrages possibles

#### Ressources de géocodage ou d'autocomplétion : option **resources**

L'option **resources** (qui est un objet) permet de spécifier les ressources de géocodage à utiliser par les différents services (et leur ordre), et peut donc prendre deux propriétés :

Paramètre     |  Type    |    Opt.   | Valeur
-|-|-|-|
geocode      | Array | Optionnel | Liste ordonnée des ressources de géocodage à utiliser : "PositionOfInterest", "StreetAddress", "CadastralParcel" ou "Administratif". Par défaut : ["StreetAddress", "PositionOfInterest"]
autocomplete | Array | Optionnel | Liste ordonnée des ressources d'autocomplétion à utiliser : "PositionOfInterest" ou "StreetAddress". Par défaut : ["StreetAddress", "PositionOfInterest"]

Exemple :

``` javascript
options.resources = {
    geocode : ["StreetAddress", "CadastralParcel"],
    autocomplete : ["PositionOfInterest", "StreetAddress"]
}
```
=> Le service d'autocomplétion retournera tout d'abord les résultats de type lieux/toponymes (PositionOfInterest) puis les adresses (StreetAddress). Le service de géocodage retournera d'abord les résultats de type addresses (StreetAddress) puis ceux de type parcelles cadastrales (CadastralParcel)

#### Paramétrage des filtres de recherche avancée : option **advancedSearch**

L'option **advancedSearch** (qui est un objet) permet de paramétrer les filtres de géocodage à utiliser lors de la recherche avancée, pour chaque type de géocodage.
Les 4 propriétés possibles sont les 4 types de ressources de géocodage : "PositionOfInterest", "StreetAddress", "CadastralParcel" et "Administratif", et les valeurs correspondantes sont des tableaux contenant les différents filtres à afficher, chaque filtre étant un objet de la forme suivante :

Paramètre     |  Type    |    Opt.   | Valeur
-|-|-|-|
name  | String | Obligatoire | Nom du filtre de géocodage (parmi la liste ci-dessous)
title | String | Obligatoire | Nom à afficher dans le widget (personnalisable)
value | String | Optionnel   | Eventuelle valeur par défaut à afficher
description | String | Optionnel | Eventuelle description plus détaillée qui sera affichée au survol

Les différents filtres (=name) peuvent être :

- pour PositionOfInterest : "importance", "nature", "territory", "insee", "municipality" et "department"
- pour StreetAddress : "territory", "insee", "municipality" et "department"
- pour Administratif : "prefecture", "inseeRegion", "inseeDepartment" et "municipality"
- pour CadastralParcel : "department" (code département à 2 chiffres), "commune" (code commune à 3 chiffres), "insee" (code commune INSEE à 5 chiffres = code département + code commune), "absorbedCity" (code à 3 chiffres), "section" (2 caractères) et "number" (numéro de la parcelle à 4 chiffres)

Exemple :

``` javascript
options.advancedSearch : {
    PositionOfInterest : [
        {name : "municipality", title : "Ville"},
        {name : "department", title : "Département", value : "77"}
    ],
    StreetAddress : [
        {name  : "municipality", title : "Ville"},
        {name  : "department", title : "Département"}
    ]
}
```
=> Seulement deux filtres seront affichés dans le panneau de recherche avancée, pour chacun des types de recherche (adresses ou lieux/toponymes).

## Ergonomie

<div id="viewerDiv">

            <div class="ol-zoom">
                <button class="ol-zoom-in" type="button" title="Zoom in">+</button>
                <button class="ol-zoom-out" type="button" title="Zoom out">−</button>
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
