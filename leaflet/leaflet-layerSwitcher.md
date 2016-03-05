---
layout: leaflet
title: Layer Switcher
level: 2
order: 000400
api: leaflet
---

# Widget de gestion de l'empilement des couches pour Leaflet

## Présentation générale

Ce widget permet à l'utilisateur de gérer l'empilement des couches composant la carte L.Map et, pour chacune d'elle, d'agir sur la visibilité, l'opacité et d'afficher des informations qui lui sont associées (titre, description, métadonnées, légende).

Il est pourvu d'un mécanisme permettant de maximiser / minimiser son affichage.

Leaflet gère des controles (L.Control) dont on peut préciser le positionnement global sur la carte (au choix dans un des quatre coins). Ce widget repose sur ce mécanisme.


## Spécification détaillée

### Utilisation

L'utilisateur a ajouté des couches à sa carte, en utilisant par exemple la [fonctionnalité d'affichage simple des couches WMS](./leaflet-WMS.html) ou [WMTS du Géoportail](./leaflet-WMTS.html) de l'extension pour Leaflet, ou simplement avec les fonctions natives de Leaflet.

Dans le premier cas, l'utilisation du widget est très simple : car toutes les informations à afficher dans le gestionnaire sont déjà récupérées via [l'autoconfiguration](./leaflet-autoconf.html).

Dans le deuxième cas, l'utilisateur pourra paramétrer le widget, pour spécifier les informations associées à ces couches.

Dans tous les cas, toutes les couches composant la carte seront affichées dans le widget de gestion des couches.


### Mise en oeuvre

L'utilisation se fera par la création d'un nouveau contrôle : L.geoportalControl.LayerSwitcher, que l'on peut ajouter à la carte comme [les autres contrôles de Leaflet](http://leafletjs.com/reference.html#map-stuff-methods), par exemple de la manière suivante :

``` javascript
var layerSwitcher = L.geoportalControl.LayerSwitcher(opts);
map.addControl(layerSwitcher);
```

Le widget affichera l'ensemble des couches composant la carte L.Map.

Pour chaque couche de la carte L.Map, le widget affichera son titre et sa description (par défaut : l'identifiant Leaflet de la couche), et, si elles sont spécifiées, des informations plus détaillées : légendes, métadonnées, aperçu rapide.

La récupération de ces informations n'est pas la même selon la manière dont chaque couche a été ajoutée à la carte :

- Couches ajoutées via la [fonctionnalité d'affichage simple des couches WMS](./leaflet-WMS.html) ou [WMTS du Géoportail](./leaflet-WMTS.html) de l'extension pour Leaflet : ces informations sont disponibles car elles proviennent du [service d'auto-configuration](./leaflet-autoconf.html), il n'y a donc rien à faire de particulier.

- Autres couches : afin d'afficher ces informations, il est nécessaire de les spécifier dans les options du widget, comme détaillé ci-après.

### Paramétrage du widget

Le widget peut prendre en paramètre un objet **opts**, permettant de renseigner des informations de couches à afficher dans le gestionnaire de couches, ou de paramétrer le widget.

Cet objet peut prendre 2 propriétés, toutes deux facultatives :

* un objet **options** pour les options spécifiques au widget.
* un tableau **layers**


#### Options du widget

Les propriétés possibles de l'objet **options** sont les suivantes (en plus des [options communes aux contrôles Leaflet](http://leafletjs.com/reference.html#control) ) :

Paramètre |  Type   |    Opt.     | Valeur
-|-|-|-|
collapsed | Boolean | Optionnel   | Permet de replier le widget au chargement de la carte (collapsed = true). Par défaut, il est déplié (collapsed = false)

#### Configuration des informations des couches (qui n'ont pas été ajoutées via [l'extension Géoportail pour Leaflet](./leaflet-WMTS.html))

Chaque élément du tableau **layers** est un objet, qui peut prendre les propriétés suivantes :

Paramètre |  Type   |    Opt.     | Valeur
- |-|-|-|
layer     | L.TileLayer  | Obligatoire | Couche de type [L.TileLayer](http://leafletjs.com/reference.html#tilelayer) qui a déjà été ajoutée à la carte, et dont on veut renseigner ou modifier les informations.
config    | Object  | Optionnel   | Configuration personnalisée des informations de la couche : titre, description, légendes, métadonnées, aperçu rapide.
display    | Boolean  | Optionnel   | Permet d'écarter une couche du gestionnaire.

L'objet config peut prendre les propriétés suivantes :

Paramètre |  Type   |    Opt.     | Valeur
- |-|-|-|
title     | String | Obligatoire   | Alias de la couche, qui apparaît dans la liste des couches du widget. Par exemple : "Cartes IGN", ou "Cours d'eau".
description | String  | Optionnel   | Description plus détaillée de la couche, qui apparaît au survol du titre, ainsi que dans le panneau d'informations de la couche.
quicklookUrl | String | Optionnel   | Url vers un aperçu rapide de la couche. Par exemple, "http://wxs.ign.fr/static/pictures/ign_carte2.jpg"
legends | Array  | Optionnel   | Tableau contenant des éventuelles légendes de la couche. Chaque élément du tableau est un objet, avec les propriétés suivantes : url (String, obligatoire) : lien vers une légende et minScaleDenominator (Number, optionnel) : dénominateur minimum d'échelle à partir de laquelle cette légende est valide.
metadata | Array  | Optionnel   | Tableau contenant des éventuelles métadonnées de la couche. Chaque élément du tableau est un objet, avec la proriété url (String, obligatoire) : lien vers une métadonnée.

### Exemples d'utilisation

#### Utilisation simple

Ajout du widget de gestion de l'empilement des couches, à partir d'une couche Géoportail.

``` javascript
var map = L.Map('divmap', {center: [2.38, 45.23] , zoom: 13});
var lyr = L.geoportalLayer.WMTS({
    layer  : "ORTHOIMAGERY.ORTHOPHOTOS",
});

lyr.addTo(map); // ou map.addLayer(lyr);
map.addControl(
    L.geoportalControl.LayerSwitcher()
);
```

#### Utilisation personnalisée

Au moins une des couches de la carte n'a pas été ajoutée via l'extension Géoportail pour Leaflet. Il faut alors spécifier les informations de cette couche dans les options du widget.

``` javascript
map.addControl(
    L.geoportalControl.LayerSwitcher({
        layers : [{
            layer : myLayer,
            config : {
                title : "Couche externe",
                description : "Description de ma couche",
                quicklookUrl : "lien/Vers/UnApercuRapide.png",
                legends: [{url : "lien/Vers/UneLegende.png"}],
                metadata : [{url : "lien/Vers/Une/MetaDonnee.xml"}]
            }
        }],
        options : {
            collapsed : true
        }
    })
);
```

## Ergonomie

<div id="viewerDiv">

            <div class="leaflet-control-zoom">
                <a class="leaflet-control-zoom-in" href="#" title="Zoom in">+</a>
                <a class="leaflet-control-zoom-out" href="#" title="Zoom out">-</a>
            </div>

            <!-- LAYERSWITCHER -->

            <div id="GPlayerSwitcher" class="GPwidget">

                <!-- Hidden checkbox for minimizing/maximizing -->
                <input type="checkbox" id="GPshowLayersList" />

                <!-- Layers list -->
                <div id="GPlayersList" class="GPpanel">

                    <!-- Layer entry in layer list -->
                    <!-- Every item is marked with layerID, which is defined at layer import -->
                    <div id="GPlayerSwitcher_IDLayer1" class="GPlayerSwitcher_layer draggable-layer outOfRange">
                        <!-- Basic toolbar : visibility / layer name -->
                        <div id="GPbasicTools_IDLayer1" class="GPlayerBasicTools">
                            <input type="checkbox" id="GPvisibility_IDLayer1" checked />
                            <label for="GPvisibility_IDLayer1" id="GPvisibilityPicto_IDLayer1" class="GPlayerVisibility" title="Afficher/masquer la couche"></label>
                            <span id="GPname_IDLayer1" class="GPlayerName" title="Quartiers prioritaires de la ville">Quartiers prioritaires de la ville</span>
                        </div>
                        <!-- Hidden checkbox + label for showing advanced toolbar -->
                        <input type="checkbox" id="GPshowAdvancedTools_IDLayer1" />
                        <label for="GPshowAdvancedTools_IDLayer1" id="GPshowAdvancedToolsPicto_IDLayer1" class="GPshowMoreOptions GPshowLayerAdvancedTools" title="Plus d'outils"></label>
                        <!-- Advanced toolbar : layer info / opacity slider / opacity value / removal -->
                        <div id="GPadvancedTools_IDLayer1" class="GPlayerAdvancedTools">
                            <div id="GPinfo_IDLayer1" class="GPlayerInfo" title="Informations/légende" onclick="GPopenLayerInfo(this);"></div>
                            <div id="GPopacity_IDLayer1" class="GPlayerOpacity" title="Opacité"><input id="GPopacityRange_IDLayer1" type="range" value="100" oninput="GPchangeLayerOpacity(this);" onchange="GPchangeLayerOpacity(this);" /></div>
                            <div class="GPlayerOpacityValue" id="GPopacityValueDiv_IDLayer1"><span id="GPopacityValue_IDLayer1">100</span>%</div>
                            <div id="GPremove_IDLayer1" class="GPlayerRemove" title="Supprimer la couche" onclick="GPdropLayer(this);"></div>
                        </div>
                    </div>

                    <!-- Layer entry in layer list -->
                    <!-- Every item is marked with layerID, which is defined at layer import -->
                    <div id="GPlayerSwitcher_IDLayer2" class="GPlayerSwitcher_layer draggable-layer">
                    <!-- Basic toolbar : visibility / layer name -->
                        <div id="GPbasicTools_IDLayer2" class="GPlayerBasicTools">
                            <input type="checkbox" id="GPvisibility_IDLayer2" checked />
                            <label for="GPvisibility_IDLayer2" id="GPvisibilityPicto_IDLayer2" class="GPlayerVisibility" title="Afficher/masquer la couche"></label>
                            <span id="GPname_IDLayer2" class="GPlayerName" title="Quartiers prioritaires de la ville">Cartes IGN</span>
                        </div>
                        <!-- Hidden checkbox + label for showing advanced toolbar -->
                        <input type="checkbox" id="GPshowAdvancedTools_IDLayer2" />
                        <label for="GPshowAdvancedTools_IDLayer2" id="GPshowAdvancedToolsPicto_IDLayer2" class="GPshowMoreOptions GPshowLayerAdvancedTools" title="Plus d'outils"></label>
                        <!-- Advanced toolbar : layer info / opacity slider / opacity value / removal -->
                        <div id="GPadvancedTools_IDLayer2" class="GPlayerAdvancedTools">
                            <div id="GPinfo_IDLayer2" class="GPlayerInfo" title="Informations/légende" onclick="GPopenLayerInfo(this);"></div>
                            <div id="GPopacity_IDLayer2" class="GPlayerOpacity" title="Opacité"><input id="GPopacityRange_IDLayer2" type="range" value="100" oninput="GPchangeLayerOpacity(this);" onchange="GPchangeLayerOpacity(this);" /></div>
                            <div class="GPlayerOpacityValue" id="GPopacityValueDiv_IDLayer2"><span id="GPopacityValue_IDLayer2">100</span>%</div>
                            <div id="GPremove_IDLayer2" class="GPlayerRemove" title="Supprimer la couche" onclick="GPdropLayer(this);"></div>
                        </div>
                    </div>

                    <!-- Layer entry in layer list -->
                    <!-- Every item is marked with layerID, which is defined at layer import -->
                    <div id="GPlayerSwitcher_IDLayer3" class="GPlayerSwitcher_layer draggable-layer">
                    <!-- Basic toolbar : visibility / layer name -->
                        <div id="GPbasicTools_IDLayer3" class="GPlayerBasicTools">
                            <input type="checkbox" id="GPvisibility_IDLayer3" checked />
                            <label for="GPvisibility_IDLayer3" id="GPvisibilityPicto_IDLayer3" class="GPlayerVisibility" title="Afficher/masquer la couche"></label>
                            <span id="GPname_IDLayer3" class="GPlayerName" title="Quartiers prioritaires de la ville">Photographies aériennes</span>
                        </div>
                        <!-- Hidden checkbox + label for showing advanced toolbar -->
                        <input type="checkbox" id="GPshowAdvancedTools_IDLayer3" />
                        <label for="GPshowAdvancedTools_IDLayer3" id="GPshowAdvancedToolsPicto_IDLayer3" class="GPshowMoreOptions GPshowLayerAdvancedTools" title="Plus d'outils"></label>
                        <!-- Advanced toolbar : layer info / opacity slider / opacity value / removal -->
                        <div id="GPadvancedTools_IDLayer3" class="GPlayerAdvancedTools">
                            <div id="GPinfo_IDLayer3" class="GPlayerInfo" title="Informations/légende" onclick="GPopenLayerInfo(this);"></div>
                            <div id="GPopacity_IDLayer3" class="GPlayerOpacity" title="Opacité"><input id="GPopacityRange_IDLayer3" type="range" value="100" oninput="GPchangeLayerOpacity(this);" onchange="GPchangeLayerOpacity(this);" /></div>
                            <div class="GPlayerOpacityValue" id="GPopacityValueDiv_IDLayer3"><span id="GPopacityValue_IDLayer3">100</span>%</div>
                            <div id="GPremove_IDLayer3" class="GPlayerRemove" title="Supprimer la couche" onclick="GPdropLayer(this);"></div>
                        </div>
                    </div>

                </div>

                <!-- Label for minimizing/maximizing -->
                <label id="GPshowLayersListPicto" class="GPshowAdvancedToolPicto" for="GPshowLayersList" title="Afficher/masquer le gestionnaire de couches">
                    <span id="GPshowLayersListOpen" class="GPshowAdvancedToolOpen"></span><span id="GPshowLayersListClose"></span>
                </label>

                <!-- Panel for layer informations : title / description / metadata / legend -->
                <div id="GPlayerInfoPanel" class="GPpanel GPlayerInfoPanelClosed">
                    <div id="GPlayerInfoContent">
                        <!-- Content has to be filled in Javascript via function GPopenLayerInfo -->
                        <div id="GPlayerInfoTitle">Photographies aériennes</div>
                        <div id="GPlayerInfoQuicklook" title="Afficher un aperçu de la couche"></div>
                        <div id="GPlayerInfoClose" title="Fermer la fenêtre"></div>
                        <div id="GPlayerInfoDescription">Les photos aériennes sont un excellent moyen de connaître un territoire, d'en comprendre l'aménagement, les enjeux, les évolutions. Elles sont réalisées par l'IGN et régulièrement actualisées.</div>
                        <div id="GPlayerInfoMetadata">
                            <div class="GPlayerInfoSubtitle">Métadonnées</div>
                            <div class="GPlayerInfoLink"><a href="#">http://www.monsite.fr/metadata1</a></div>
                            <div class="GPlayerInfoLink"><a href="#">http://www.monsite.fr/metadata2/j-ai-fait-une-url-super-longue</a></div>
                        </div>
                        <div id="GPlayerInfoLegend">
                            <div class="GPlayerInfoSubtitle">Légende</div>
                            <div class="GPlayerInfoPopup">Du 1/1 au 1/25000</div>
                            <div class="GPlayerInfoPopup">Du 1/25000 au 1/100000</div>
                            <div class="GPlayerInfoLink"><a href="#">Du 1/100000 au 1/8000000</a></div>
                        </div>
                    </div>
                </div>

            </div>

</div>
