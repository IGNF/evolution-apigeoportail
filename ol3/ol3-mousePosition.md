---
layout: ol3
title: Coordonnées de la souris
level: 2
order: 000702
api: ol3
---

# Widget d'affichage des coordonnées de la souris (x,y et h)

## Présentation générale

Ce widget permet d'indiquer, dans une carte OL3, les coordonnées de la souris sur la carte avec l'altitude obtenue à partir du [service d'altimétrie du Géoportail](http://api.ign.fr/tech-docs-js/fr/developpeur/alti.html).

Il est paramétrable, l'utilisateur peut donc indiquer :

* une clef d'accès à la plateforme pour l'obtention des altitudes
* les systèmes de coordonnées proposés pour l'affichage
* les coordonnées à afficher (toutes, seulement le z ou seulement (x,y))
* le temps d'immobilité de la souris à partir duquel une requête sera envoyée sur le service d'altimétrie.


## Spécification détaillée

### Utilisation

Ce widget se comporte comme un contrôle d'OpenLayers (ol.control.Control), il faut donc instancier un objet ol.control.GeoportalMousePosition puis l'ajouter à sa carte OpenLayers.

``` javascript
var mousePosition = ol.control.GeoportalMousePosition(opts);
map.addControl(mousePosition);
```

### Options

Le paramètre **opts** est un objet, dont les propriétés peuvent prendre les valeurs suivantes (en plus des [options du contrôle OpenLayers](http://openlayers.org/en/v3.14.2/apidoc/ol.control.Control.html)) :

Paramètre     |  Type    |    Opt.   | Valeur
-|-|-|-|
apiKey             | String  | Conditionnel | Clef API utilisée pour l’utilisation du service de calcul altimétrique, nécessaire si l'autoconf n'a pas été chargée au préalable.
collapsed          | Boolean | Optionnel | Permet de spécifier si le widget doit être déplié au démarrage de l'application (collapsed = false), ou replié (collapsed = true). Plié par défault (true).
displayAltitude    | Boolean | Optionnel | Affiche (true) ou non (false) le panneau d'affichage de l'altitude. Affiché par défaut (true).
displayCoordinates | Boolean | Optionnel | Affiche (true) ou non (false) le panneau d'affichage des coordonnées. Affiché par défaut (true).
systems            | Array   | Optionnel | Liste de systèmes de coordonnées supplémentaires pour l'affichage (voir ci-dessous)
units              | Array   | Optionnel | Liste d'unités de coordonnées pour l'affichage (voir ci-dessous)
altitude           | Object  | Optionnel | Configuration du calcul des altitudes (voir ci-dessous)

#### Configuration des systèmes de coordonnées

Par défaut, le widget propose 4 systèmes de coordonnées pour l'affichage :

* Géographiques (EPSG:4326),
* Web Mercator (EPSG:3857),
* Lambert 93 (EPSG:2154)
* Lambert II étendu (EPSG:27572).

Pour modifier les systèmes à afficher dans le widget, l'utilisateur peut spécifier un paramètre **systems** dans les options, qui est un tableau d'objets pouvant prendre les valeurs suivantes :

Paramètre     |  Type    |    Opt.   | Valeur
-|-|-|-|
crs   | String | Obligatoire | Code du système de coordonnées (l'un des codes par défaut ("EPSG:4326", "EPSG:3857", "EPSG:2154", "EPSG:27572") ou l'alias de défini dans proj4js)
label | String | Optionnel   | Nom du système de coordonnées à afficher dans le contrôle. Par défaut, c'est le code défini ci-dessus qui sera affiché.
type  | String | Optionnel   | Type d'unités du système, pour les conversions de coordonnées : "Geographical" ou "Metric"

Par exemple :

``` javascript
systems = [
    {
        crs : "EPSG:3857",
        label : "Mercator",
        type : "Metric"
    },
    {
        crs : "EPSG:4326",
        label : "Géographiques",
        type : "Geographical"
    }
]
```

#### Configuration des formats d'unités des coordonnées

Par défaut, le widget propose d'afficher

* les unités des coordonnées géographiques en 4 formats : "DEC" (décimales), "DMS" (sexagecimal, ou degrés minutes secondes), "RAD" (radians) ou "GON" (grades),
* les coordonnées métriques en 2 formats : "M" (mètres) ou "KM" (kilomètres).

Pour paramétrer les formats d'unités à afficher, l'utilisateur peut utiliser un paramètre **units** dans les options, qui est un tableau dont les éléments peuvent prendre les valeurs suivantes : "DEC", "DMS", "RAD", "GON", "M", "KM" (choisir celles que l'on veut proposer dans le widget).

Par exemple :

``` javascript
units = ["DEC", "DMS", "M"];
```

#### Configuration du service

Le calcul des altitudes est paramétrable, via le paramètre *altitude* des options, qui est un objet dont les propriétés peuvent être les suivantes :

Paramètre     |  Type    |    Opt.   | Valeur
-|-|-|-|
responseDelay         | Number | Optionnel | Latence d'une requête d'altitude, 500ms par défaut
triggerDelay          | Number | Optionnel | Temps d'immobilisation du mouvement (de la souris ou de la carte) avant de déclencher le calcul d'altitude. 200ms par défaut.
noDataValue           | Number | Optionnel | Valeur en cas d'absence de donnée d'altitude (no data), à ne pas afficher. Dans ce cas, la valeur ne sera pas affichée, mais : "---m". Par défaut : -99999
noDataValueTolerance  | Number | Optionnel | Tolérance autour de la valeur "noDataValue", délimitant un intervalle dans lequel les valeurs ne seront pas affichées ([noDataValue + noDataValueTolerance ; noDataValue - noDataValueTolerance]). Par défaut : 90000 (les valeurs entre -9999 et -189999 ne sont pas affichées).
serviceOptions        | Object | Optionnel | Options du service d'altimétrie du Géoportail, tel que paramétrable via la bibliothèque d'accès. Pour plus de détails, voir la [documentation technique des paramètres du service](http://ignf.github.io/geoportal-access-lib/v1.0.0-beta.1/jsdoc/module-Services.html#~getAltitude).

Remarques sur les options du service (serviceOptions) :

* le contrôle envoie une seule coordonnée, le paramètre *sampling*
* le contrôle récupère une altitude : l'option *zonly* est donc toujours configurée, et vaut *true*
* la propriété *apiKey* se retrouve aussi au niveau des options du service : cette clé surchargera toujours celle du contrôle.

## Ergonomie


<div id="viewerDiv">

            <div class="ol-zoom">
                <button class="ol-zoom-in" type="button" title="Zoom in">+</button>
                <button class="ol-zoom-out" type="button" title="Zoom out">−</button>
            </div>

            <!-- MOUSE POSITION -->

            <div id="GPmousePosition" class="GPwidget">

                <!-- Hidden checkbox for minimizing/maximizing -->
                <input type="checkbox" id="GPshowMousePosition" />
                <label for="GPshowMousePosition" id="GPshowMousePositionPicto" class="GPshowAdvancedToolPicto" title="Afficher les coordonnées du curseur">
                    <span id="GPshowMousePositionOpen" class="GPshowAdvancedToolOpen"></span>
                </label>

                <!-- Mouse position panel -->
                <div id="GPmousePositionPanel" class="GPpanel">
                    <div class="GPpanelHeader">
                        <div class="GPpanelTitle">Coordonnées</div>
                        <div id="GPmousePositionPanelClose" class="GPpanelClose" title="Fermer le panneau"></div>
                    </div>
                    <!-- Basic infos : coordinates & altitude -->
                    <div id="GPmousePositionBasicPanel">
                        <!-- Values are updated in Javascript when moving curosr/map -->
                        <span class="GPmousePositionLabel">Latitude : </span>
                        <span class="GPmousePositionCoords" id="GPmousePositionLat">0.00</span>
                        <span class="GPmousePositionLabel">Longitude : </span>
                        <span class="GPmousePositionCoords" id="GPmousePositionLon">0.00</span>
                        <!-- Altitude, exists or not depending on developer choice -->
                        <div id="GPmousePositionAltitude">
                            <span class="GPmousePositionLabel">Altitude : </span>
                            <span class="GPmousePositionCoords" id="GPmousePositionAlt">...</span>
                        </div>
                    </div>
                    <!-- Hidden checkbox + label for showing settings -->
                    <input type="checkbox" id="GPshowMousePositionSettings" />
                    <label for="GPshowMousePositionSettings" id="GPshowMousePositionSettingsPicto" class="GPshowMoreOptions GPshowMousePositionSettingsPicto" title="Réglages"></label>
                    <!-- Settings : projection system -->
                    <div id="GPmousePositionSettings">
                        <span class="GPmousePositionSettingsLabel">Système de référence</span>
                        <select id="GPmousePositionProjectionSystem" class="GPinputSelect GPmousePositionSettingsSelect">
                            <!-- Options below are examples, it will be defined later -->
                            <option>Géographique</option>
                            <option>Mercator</option>
                            <option>Lambert 93</option>
                            <option>Lambert II étendu</option>
                        </select>
                        <select id="GPmousePositionProjectionUnits" class="GPinputSelect GPmousePositionSettingsSelect">
                            <!-- Options below are supposed to update dynamically when changing projection system -->
                            <option>degrés décimaux</option>
                            <option>degrés sexagésimaux</option>
                            <option>radians</option>
                            <option>grades</option>
                        </select>
                    </div>
                </div>

            </div>

            <!-- Map center localisation (tactile use) -->
            <div id="GPmapCenter">
            </div>

</div>
