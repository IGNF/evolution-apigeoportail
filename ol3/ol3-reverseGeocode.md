---
layout: ol3
title: Geocodage inverse
level: 2
order: 000600
api: ol3
---

# Widget d'utilisation du service géocodage inverse

## Présentation générale

En terme d'utilisation par l'internaute, ce widget permet :

*  une intéraction avec la carte permettant de saisir la zone de recherche du Géocodage inverse
* de lancer la requête
* d'afficher les résultats sur la carte (localisation ponctuelle, associée à une popup contenant les informations attributaires de la réponse)

En terme de mise en oeuvre par le développeur, la création du widget doit permettre de préciser le paramétrage lié au service de géocodage inverse :

* type(s) de localisants impliqués dans les requêtes (toponymes, adresses, ...)
* filtres attributaires éventuels associés aux requêtes


## Spécification détaillée

### Utilisation

Ce widget se comporte comme un contrôle d'OpenLayers (ol.control.Control), il faut donc instancier un objet ol.control.ReverseGeocoding puis l'ajouter à sa carte OpenLayers.

``` javascript
var reverseControl = ol.control.ReverseGeocoding(opts);
map.addControl(reverseControl);
```

### Options

Le paramètre **opts** est un objet, dont les propriétés peuvent prendre les valeurs suivantes (en plus des [options du contrôle OpenLayers](http://openlayers.org/en/v3.14.2/apidoc/ol.control.Control.html)) :

Paramètre     |  Type    |    Opt.   | Valeur
-|-|-|-|
apiKey                | String  | Conditionnel | Clef API utilisée pour l’utilisation du service de géocodage inverse du Géoportail. Nécessaire si l'autoconfiguration n'a pas été chargée au préalable.
collapsed             | Boolean | Optionnel | Permet de spécifier si le widget doit être déplié au démarrage de l'application (collapsed = false), ou replié (collapsed = true). Plié par défault (true).
resources             | Array   | Optionnel | Liste des ressources de géocodage inverse qui seront proposées dans le composant. Les valeurs peuvent être les suivantes : "StreetAddress", "PositionOfInterest", "CadastralParcel", et "Administratif". Par défaut : ["StreetAddress", "PositionOfInterest", "CadastralParcel"].
delimitations         | Array   | Optionnel | Liste ordonnée des types de délimitations proposés dans le composant, permettant de fixer/délimiter une zone de recherche pour le géocodage inverse. Par défaut : ["Point", "Circle", "Extent"]
reverseGeocodeOptions | Object  | Optionnel | Options du service de géocodage inverse, tel que paramétrable via la bibliothèque d'accès (Gp.Services.reverseGeocode). Voir [la documentation technique des paramètres du service](http://ignf.github.io/geoportal-access-lib/v1.0.0-beta.1/jsdoc/module-Services.html#~reverseGeocode) pour connaître l'ensemble des options.

### Exemples de paramétrages possibles

#### Ressources de géocodage inverse : option **resources**

L'option **resources** permet de spécifier les ressources de géocodage inverse qui seront proposées à l'utilisateur (et leur ordre).

Exemple :

``` javascript
options.resources = ["PositionOfInterest", "StreetAddress"]
```
=> Le widget proposera deux types de géocodage inverse : sur les lieux/toponymes ("PositionOfInterest"), ou sur les adresses ("StreetAddress").

#### Délimitations pour la zone de recherche : option **delimitations**

L'option **delimitations** permet de spécifier ce qui sera proposés dans la liste "Délimitation" du composant (et leur ordre) : c'est-à-dire les délimitations de la zone de recherche.
Une délimitation par "Point" enverra une requête de géocodage autour du point saisi.
Une délimitation par "Cercle" filtrera plus particulièrement les résultats à l'intérieur du cercle saisi (dans la limite d'un rayon de 1000m).
Une délimitation par "Extent" filtrera plus particulièrement les résultats à l'intérieur de l'emprise (rectangle) saisie.

Exemple :

``` javascript
options.delimitations = ["Circle", "Extent"]
```
=> Le widget proposera deux types de délimitations : par cercle et par étendue (dans cet ordre).

``` javascript
options.delimitations = ["Point"]
```
=> Le widget proposera un seul type de délimitation : par pointage sur la carte.

## Ergonomie


<div id="viewerDiv">

            <div class="ol-zoom">
                <button class="ol-zoom-in" type="button" title="Zoom in">+</button>
                <button class="ol-zoom-out" type="button" title="Zoom out">−</button>
            </div>

            <!-- REVERSE GEOCODING -->

            <div id="GPreverseGeocoding" class="GPwidget">

                <!-- Hidden checkbox for minimizing/maximizing -->
                <input type="checkbox" id="GPshowReverseGeocoding" />
                <label for="GPshowReverseGeocoding" id="GPshowReverseGeocodingPicto" class="GPshowAdvancedToolPicto" title="Ouvrir la recherche inverse">
                    <span id="GPshowReverseGeocodingOpen" class="GPshowAdvancedToolOpen"></span>
                </label>

                <!-- Reverse geocoding panel -->
                <div id="GPreverseGeocodingPanel" class="GPpanel">
                    <div class="GPpanelHeader">
                        <div class="GPpanelTitle">Recherche inverse</div>
                        <div id="GPreverseGeocodingPanelClose" class="GPpanelClose" title="Fermer le panneau"></div>
                    </div>
                    <form id="GPreverseGeocodingForm">
                        <div class="GPflexInput">
                            <label class="GPreverseGeocodingCodeLabel">Recherche par</label>
                            <select class="GPreverseGeocodingCode">
                                <option>Lieux/toponymes</option>
                                <option>Adresses</option>
                                <option>Parcelles cadastrales</option>
                            </select>
                        </div>
                        <div class="GPflexInput">
                            <label class="GPreverseGeocodingCodeLabel">Délimitation</label>
                            <select class="GPreverseGeocodingCode">
                                <option>Pointer un lieu</option>
                                <option>Dessiner un cercle</option>
                                <option>Dessiner une emprise</option>
                            </select>
                        </div>
                        <input type="submit" id="GPreverseGeocodingSubmit" class="GPinputSubmit" value="Chercher" />
                    </form>
                </div>

            </div>

</div>
