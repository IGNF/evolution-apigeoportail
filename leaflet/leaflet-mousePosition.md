---
layout: leaflet
title: Coordonnées de la souris
level: 2
order: 000702
api: leaflet
---

# Widget d'affichage des coordonnées de la souris (x,y et h)

## Présentation générale

Ce widget permet d'indiquer, dans une carte Leaflet, les coordonnées de la souris sur la carte avec l'altitude obtenue à partir du [service d'altimétrie du Géoportail](http://api.ign.fr/tech-docs-js/fr/developpeur/alti.html).

Il doit être paramétrable de façon à pouvoir indiquer : 

* une clef d'accès à la plateforme pour l'obtention des altitudes
* les systèmes de coordonnées proposés pour l'affichage
* les coordonnées à afficher (toutes, seulement le z ou seulement (x,y))
* le temps d'immobilité de la souris à partir duquel une requête sera envoyée sur le service d'altimétrie. 


## Spécification détaillée

### Usage

``` javascript
var mousePoistion = L.geoportalControl.MousePosition(opts);
map.addControl(mousePoistion);
```

### Options

Les propriétés possibles de l'objet **options** sont les suivantes 
(en plus des [options communes aux contrôles Leaflet](http://leafletjs.com/reference.html#control) ) :

Option      |  Type   |    Opt.   | Defaut    | Valeur
-|-|-|-|-|
collapsed   | Boolean | Optionnel | false     | Permet de replier le widget au chargement de la carte (collapsed = true). Par défaut, il est déplié (collapsed = false)
position    | String  | Optionnel | 'bottomleft' | Position initiale du contrôle sur la carte ([cf. options de positionnement Leaflet](http://leafletjs.com/reference.html#control-positions))
apiKey      | String  | Optionnel | null      | Clef API utilisée pour l'utilisation des services.
altitudeOptions | Object | Optionnel | {}     | Options du service de calcul d'altitude.
noaltitude  | Boolean | Optionnel | false     | active ou desactive le calcul d'altitude.

#### Configuration du service

Le service de calcul d'altitude est configurable :

``` javascript
altitudeOptions : {
    protocol : XHR,
    httpMethod : "GET",
    apiKey : "fjfz8rg7r89t45t4er8t7g84er56g486t",
    api : 'REST'
}
```

Pour plus de détails, consulter la page de description :
- [altitude](./../bibacces/dd_services_altimetrie.html)

Le controle recupère une altitude. 
Donc par defaut, l'option 'zonly' est toujours configurée.

On peut voir que la propriété 'apiKey' se trouve aussi au niveau des options du service.
Il faut savoir que la clef du service surcharge toujours celle du contrôle. 
Il en va de même avec l'autoconfiguration.

### Exemples

#### simple

L'autoconfiguration est chargée.
La vérification des droits sur les ressources est realisée.

On change la position du contrôle, et on le souhaite deplié.

``` javascript
var mousePoistion  = L.geoportalControl.MousePosition({
    position : 'bottomright',
    collapsed : true
});
```

#### avancé

L'autoconfiguration n'est pas chargée !
Aucune vérification des droits n'est possible.
La responsabilité revient à l'utilisateur de gérer ses droits sur la ressource.

Une clef API est renseignée au niveau du contrôle :

``` javascript
var mousePosition = L.geoportalControl.MousePosition({
    apiKey : "far4ze5t4z56t4z65t4ert465zr6z"
});
```

Il est possible aussi de renseigner la clef API via la configuration des services.

``` javascript
var mousePosition = L.geoportalControl.MousePosition({
    altitudeOptions : {
        apiKey : "far4ze5t4z56t4z65t4ert465zr6z"
    }
});
```

#### quelques cas particuliers

L'autoconfiguration est chargée.
La vérification des droits sur les ressources est realisée.
Si l'utilisateur renseigne une clef, on verifie la coherence entre l'autoconfiguration 
et la clef. Si des incoherences apparaissent, on previent simplement l'utilisateur.

L'autoconfiguration n'est pas chargée !
Aucune vérification des droits n'est possible.
La responsabilité revient à l'utilisateur de gérer ses droits sur la ressource.


## Ergonomie
    

<div id="viewerDiv">
            
            <div class="leaflet-control-zoom">
                <a class="leaflet-control-zoom-in" href="#" title="Zoom in">+</a>
                <a class="leaflet-control-zoom-out" href="#" title="Zoom out">-</a>
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

