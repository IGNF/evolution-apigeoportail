---
layout: ahn
title: Initialisation de la carte
level: 2
order: 020200
api: ahn
---

# Initialisation de la carte

Le Kit de développement (ou SDK) permet au développeur d'initialiser une fenêtre cartographique en fonction :

* des possibilités que lui offre sa clé API,
* d'éléments de positionnement (zoom, centre etc)
* des couches qu'il souhaite afficher :

	* **couches Géoportail** : Données fournies par l'infrastructure du Géoportail.
	* **couches métiers** : Données personnelles fournies par un autre webservice (WMS, WMTS, WFS, GeoRSS etc) ou dans un fichier statique (KML, GPX, etc).
    
* d'outils qu'il souhaite proposer à l'internaute parmi une liste prédéfinie :

Nom de l'outil | Description | Utilisation
------------ | ------------- | -------------
 **pan** | Ensemble de 4 boutons de déplacement vers l'est, le nord, l'ouest ou le sud. | Le développeur peut paramétrer le décalage en pixels résultant d'un clic sur un des boutons.
**zoomBox** | Bouton de l'outil de zoom sur une emprise. Si le bouton est enfoncé, le cliquerglisser sur la carte permet à l'internaute de dessiner une emprise. | A la fin du clic, la carte est repositionnée (zoom et centre) sur l'emprise dessinée.
**zoom** | Outil permettant de zoomer / dezoomer sur la carte |
**orientation** | Widget indiquant l'orientation de la carte. | 
**camera** | Outil de gestion de la caméra (uniquement 3D). | L'internaute s'en sert pour orienter la caméra.
**layerSwitcher** | Outil de gestion des couches. Cette fenêtre permet de gérer l'opacité, l'ordre, la visibilité des couches. Mais aussi de consulter la description, la légende et les métadonnées de chaque couche. | Par défaut, l'outil est ouvert au chargement de la carte.
**length** | Bouton de l'outil de mesure de distances. Si le bouton est enfoncé, les clics sur la carte permettent de dessiner une polyligne. A la fin de la saisie, la longueur totale est affichée. | Le développeur peut paramétrer l'unité et la précision du résultat. Il peut aussi indiquer vouloir un résultat qui prend en compte la courbure du géoïde.
**area** | Bouton de l'outil de mesure de surfaces. Si le bouton est enfoncé, les clics sur la carte permettent de dessiner un polygone. A la fin de la saisie, l'aire totale est affichée. | Le développeur peut paramétrer l'unité et la précision du résultat. Il peut aussi indiquer vouloir un résultat qui prend en compte la courbure du géoïde.
**azimuth** | Bouton de l'outil de mesure d'azimut. Si le bouton est enfoncé, les clics sur la carte permettent de dessiner une droite. A la fin de la saisie, l'azimut est affichée. | Le développeur peut paramétrer l'unité et la précision du résultat.
**elevationPath** | Bouton de l'outil de mesure de profil d'altitude. Si le bouton est enfoncé, les clics sur la carte permettent de dessiner une polyligne. A la fin de la saisie, le profil altimétrique est calculé. | Le développeur peut paramétrer le nombres de points qui constituent le profil altimétrique.
**search** | Bouton de l'outil de recherche (géocodage). Si le bouton est enfoncé, une fenêtre contenant le formulaire de géocodage s'ouvre. | Le développeur peut indiquer sur quelles ressources le géocodage sera lancé, le nombre maximal de réponses souhaité. Il peut aussi choisir d'utiliser ou non le service d'autocomplétion pour aider l'internaute dans la saisie. Enfin, il peut configurer l'affichage de puces sur les positions résultantes de la recherche.
**reverseSearch** | Bouton de l'outil de recherche inverse. Si le bouton est enfoncé, une fenêtre contenant le formulaire de recherche inverse s'ouvre. | Le développeur peut indiquer sur quelles ressources le géocodage sera lancé, le nombre maximal de réponses souhaité. Il peut aussi choisir d'utiliser ou non le service d'autocomplétion pour aider l'internaute dans la saisie. Enfin, il peut configurer l'affichage de puces sur les positions résultantes de la recherche.
**layerImport** | ajout de couches | Le développeur peut indiquer la liste des formats importables.
**drawing** | Barre d'outils pour les couches de dessin. Elle contient l'outil de dessin d'une géométrie (drawFeature), l'outil de déplacement d'une géométrie dessinée (dragFeature), l'outil d'édition d'une géométrie dessinée (modifyFeature), l'outil de suppression d'une géométrie dessinée (deleteFeature), l'outil d'ajout d'attributs (attributesFeature), l'outil de modification du style de la couche (stylesFeature), l'outil d'export (saveFeatures). | Le développeur peut configurer les outils constituants la barre d'outil de dessin et indiquer les couches de données éditables.
**graphicScale** | Barre d'échelle. | Le développeur peut paramétrer la longueur minimale et l'unité de la barre d'échelle.
**mousePosition** | Coordonnées de la souris. Le texte renseigne l'internaute sur les coordonnées courantes de la souris avec obtention de l'altitude via le service d'altimetrie du Géoportail. | Le développeur peut indiquer la projection d'affichage des coordonnées de la souris.
**overview** | Carte d'ensemble. Cette mini-carte permet à l'internaute de se situer plus facilement. | Le développeur peut configurerla liste des couches constituant la mini-carte et les informations de zooms de celles-ci.
**fullScreen** | Bouton de l'outil de plein écran. Au clic sur le bouton, la fenêtre cartographique passe en mode plein écran.
**graticule** | Grille des méridiens et parallèles s'affichant au dessus des couches de la carte pour aider l'internaute à se situer. | Le développeur peut indiquer les intervalles de la grille en degrés.
**logo** | Logo des fournisseurs des couches visibles de la carte. Le survol des images affiche un texte. Le clic sur l'image permet d'être dirigé vers le site internet du fournisseur de données. Cet outil est toujours actif. | Le développeur peut modifier la taille par défaut des images.
        
Ces outils ne sont pas implémentés par le SDK mais par la bibliothèque sous jacente. Si la bibliothèque ne propose pas les outils, ils ne sont pas intégrés.

Le paramétrage proposé par le SDK est un paramétrage minimal. S'il n'est pas géré par l'outil sous jacent il est ignoré. Si l'outil propose un paramétrage plus avancé, celui-ci sera accessible uniquement via la bibliothèque sous-jacente.

Le développeur peut paramétrer, pour chacun de ces outils, leur position, leur aspect et leur activation/desactivation au chargement de la carte.

Enfin, d'autres outils, invisibles, peuvent aussi être configurés. Le développeur peut activer/désactiver la navigation et/pi la sélection à la souris et/ou au clavier.

## Cas d'utilisation

L'utilisateur souhaite proposer une fenêtre cartographique au sein d'une page web.

Il peut vouloir afficher, centrer la carte par différents moyens (coordonnées, géocodage, etc), afficher des couches Géoportail, des couches personnelles de différents formats (KML, GpX, WMS etc), ajouter des outils (de navigation, de dessin, de mesures etc)...

L'API peut rendre compte de l'état de chargement de la fenêtre cartographique.

## <a name="gpMapLoad"></a>Mise en oeuvre

L'utilisation se fait par l'appel d'une fonction statique.

``` javascript
Gp.Map.load(apiKey:String, div:String, MapOptions:Object) ;
```

Cette fonction initialise une fenêtre cartographique au sein d'un élément HTML.

Dans le cas où l'option n'a aucun sens pour la bibliothèque choisie, le SDK ignore le paramètre. Par exemple, si le développeur indique vouloir ajouter un outil à la carte alors que ni la bibliothèque choisie ni son plugin Géoportail ne proposent cet outil, la carte sera correctement chargée dans la bibliothèque demandée mais sans l'outil en question.

### Paramètres de la fonction Gp.Map.load()


Propriété | Type | Opt. | Valeur
-|-|-|-|
**apiKey** | String or Array({St ring}) | obligatoire | La ou les clés API permettant l'accès aux différents services.
**div** | String / DOMElement | obligatoire | Identifiant de l'élément HTML ou directement l'élement HTMLdans lequel la fenêtre cartographique sera chargée.
[mapOptions](#mapOptions)| Object | optionnel | Cet objet permet de paramétrer la carte. Les propriétés possibles sont décrites ci-après.

La fonction Gp.Map.load() retourne un objet de type [Gp.Map]().

<a name="mapOptions"></a>

### Propriétés de l'objet MapOptions :


Propriété | Type | Opt. | Valeur
-|-|-|-|
projection | String | optionnel | Projection (code EPSG ou registre IGNF) dans laquelle sont représentées les couches de la carte et exprimées les coordonnées de paramétrage. Par défaut, la projection est la projection mondiale WebMercator (EPSG:3857). Ce paramètre doit être en accord avec les informations de centrage. Si ce n'est pas le cas, la projection sera forcée à la projection mondiale.
center | Object({x:Float,y:Float,projection:String, location:String,locationType:Array(String), geolocate:Boolean}) | optionnel | Information de centrage de la carte : par coordonnées (via x,y et projection) ; par géocodage (via location et locationType) ou par geolocalisation (via geolocate)
tilt | Number | optionnel | Inclinaison de la caméra en degrés (uniquement 3d). Tilt= 0 correspond à une vision complètement tournée vers le bas. Tilt=90 correspond à une vision horizontale. Par défaut, l'inclinaison de la caméra est nulle.
zoom | Integer \| Float | optionnel | Niveau de zoom (entre 0 et 21) ou la résolution d'affichage.
maxZoom | Integer | optionnel | Niveau de zoom au dela duquel l'utilisateur ne peut plus zoomer dans la carte. Par défaut, 21.
minZoom | Integer | optionnel | Niveau de zoom au dela duquel l'utilisateur ne peut plus dézoomer dans la carte. Par défaut, 0.
[markerOptions](#markerOptions) | Object | optionnel | Cet objet permet de paramétrer une puce au centre de la carte. Les propriétés possibles ont décrites ci-après.
library | String | optionnel | Bibliothèque cartographique utilisée avec l'API Géoportail. Cette propriété prend en valeur les noms des bibliothèques supportées (par exemple, on peut envisager 'ol3', 'Leaflet', '3d'). Par défaut, si une seule bibliothèque n'est chargée, c'est elle qui est utilisée. Si plusieurs librairies sont chargées, il faut définir un ordre de priorité.
proxyUrl | String | optionnel | Url du proxy (avec ?url= à la fin) permettant de contourner les problèmes de cross-domain.
noProxyDomains | Array(String) | optionnel | Liste des domaines pour lesquels aucun proxy n'est utilisé. Inutile si le paramètre proxyUrl n'est pas utilisé.
reloadAutoconf | Boolean | optionnel | Indique si le service d'autoconfiguration est réinterrogé pour le chargement de la carte. Sinon, le résultat de l'autoconf précédent est réutilisé (s'il existe). Par défaut, false.
autoconfUrl | String | optionnel | Url du fichier d'autoconfiguration à utiliser. Pour accélérer le chargement de la carte, il peut être intéressant de spécifier l'url vers un fichier de configuration statique. Si une autoconfUrl est précisé, reloadAutoconf n'est pas pris en compte et l'autoconfiguration sera forcément rechardée. Par défaut, il s'agit du serveur d'autoconfiguration du Géoportail : http://wxs.ign.fr/CLEAPI/conf?.
[layersOptions](#layersOptions) | Object | optionnel | Liste des couches à ajouter à la carte. Les propriétés possibles de cet objet sont décrites ci-après. Par défaut, c'est la couche 'ORTHOIMAGERY.ORTHOPHOTOS' du Géoportail qui est affichée. Si la clé API ne contient pas cette couche, toutes les couches de la clé sont affichées dans à la carte.
[controlsOptions](#controlsOptions) | Object | optionnel | Liste des outils à ajouter à la carte. Les propriétés possibles de cet objet sont décrites ci-après. Par défaut, les controles activés lorsqu'ils sont ceux de déplacements, de zoom et de sélection (à la souris et au clavier) et l'outil d'affichage des logos.
[mapEventsOptions](#mapEventsOptions) | Object | optionnel  | Intéraction avec la carte. Les propriétés possibles pour cet objet sont décrites ci-dessous.

<a name="markerOptions"></a>

### Propriétés de l'objet MarkerOptions :


Propriété | Type | Valeur
-|-|-|
title | String | Titre de la popup s'ouvrant au clic sur la puce centrale. Le titre peut contenir du langage HTML. Par défaut, le titre est "Coordonnées : " traduit dans la langue de la fenêtre de visualisation.
description | String | La description de la popup s'ouvrant au clic sur la puce centrale. La description peut contenir du langage HTML. Par défaut, la description de la popup contient les coordonnées du centre de la carte (dans la projection courante).
iconUrl | String | Url de l'image de l'icône.
iconScale | Integer | Rapport à appliquer à la taille de l'image de l'icône en pixels. Par défaut, 1.
iconXAnchor | Integer | Décalage de l'image sur l'axe horizontal. Par défaut, 0.
iconYAnchor | Integer | Décalage de l'image sur l'axe vertical. Par défaut, 0. 
rotation | Integer | Rotation de l'image en degrés dans le sens des aiguilles d'une montre autour du centre de l'image (ou d'un autre point indiqué par les offsets sur x et sur y). Par défaut, 0.

<a name="layersOptions"></a>

### Propriétés de l'objet LayersOptions :


Propriété | Type | Opt. | Valeur
-|-|-|-|
[_nom d'une couche_] | Object | optionnel | Couple clé/valeur pour l'ajout d'une couche à la carte. La clé est le nom officiel de la couche Géoportail ou l'identifiant donné par le développeur à la couche métier. La valeur est un objet [LayerOptions](). Les propriétés possibles pour cet objet sont décrites ci-dessous. Par défaut, c'est la couche 'ORTHOIMAGERY.ORTHOPHOTOS' du Géoportail qui est affichée. Si la clé API ne contient pas cette couche, toutes les couches de la clé sont affichées dans à la carte.

L'ordre des couches dans cette liste sera celui d'insertion dans la carte. La couche déclarée en premier sera donc en dessous des autres dans la fenêtre cartographique.

### <a name="layerOptions"></a>Propriétés de l'objet LayerOptions

Propriété | Type | Opt. | Valeur
-|-|-|-|
**format** | String | **conditionnel** | Format de la couche. Cette propriété peut prendre les valeurs suivantes : 'kml', 'gpx', 'georss', 'geojson', 'wms', 'wfs', 'wmts','osm' ou 'drawing'. Ce paramètre est optionnel pour les couches Géoportail mais obligatoire pour les couches métiers.
opacity | Float | optionnel | Opacité (entre 0 et 1) de la couche. Par défaut, 1 pour les couches métiers et dépend de l'autoconfiguration pour les couches Géoportail.
description | String | optionnel | Texte de description de la couche. Par défaut, null.
legendURL | String | optionnel | URL vers l'image de légende de la couche. Par défaut, null.
metadataURL | String | optionnel | URL vers les métadonnées de la couche. Par défaut, null.
visibility | Boolean | optionnel | Indique si la couche est visible. Par défaut true pour les couches métiers et dépend de l'autoconfiguration pour les couches Géoportail.
minZoom | Integer | optionnel | Si le zoom courant est inférieur à cet entier, la couche n'est pas affichée. Par défaut, on utilisera le zoomMinimal de la couche s'il s'agit d'une couche Géoportail ; sinon, celui de la carte.
maxZoom | Integer | optionnel | Si le zoom courant est supérieur à cet entier, la couche n'est pas affichée. Par défaut, on utilisera le zoomMaximal de la couche s'il s'agit d'une couche Géoportail ; sinon, celui de la carte.
[layerEventOptions](#layerEventOptions) | Object | optionnel | Intéraction avec les couches. Les propriétés possibles pour cet objet sont décrites ci-dessous. 
**Propriétés propres aux couches non Géoportail** | | |
name | String | optionnel | Nom de la couche dans le LayerSwitcher. Par défaut, "".
**url** | String | **obligatoire** | Url du fichier ou du service pour accéder à la ressource originators Array(Object) optionnel Logos des fournisseurs de données qui s'affichent lorsque la couche est visible et que l'outil 'logo'" est ajouté à la carte. Les propriétés possibles de cet objet sont décrites ci-dessous. 
[originators](#originators) | Array(Object) | optionnel | Logos des fournisseurs de données qui s'affichent lorsque la couche est visible et que l'outil 'logo'" est ajouté à la carte. Les propriétés possibles de cet objet sont décrites ci-dessous. 
**Propriétés propres aux couches KML** | | |
extractStyles | Boolean | optionnel | Indique si les styles sont récupérés (en plus de la géométrie). Par défaut, true. 
**Propriétés propres aux couches WMS** | | | 
**layers** | Array(String) | **obligatoire** | Liste des noms des couches (dans le GetCapabilities) à ajouter .
version | String | optionnel | Numéro de version du service 
stylesName | Array(String) | optionnel | Noms des styles des couches. Pas de valeur par défaut. Les couches seront affichées dans le style par défaut géré par le service.
outputFormat | String | optionnel | Formats de l'image de sortie. Cette propriété peut prendre différentes valeurs selon ce que propose le service (voir le GetCapabilities) : 'image/png', 'image/gif','image/jpeg','image/wbmp','image/tif f' etc. Pas de valeur par défaut. Les couches seront affichées dans le format par défaut géré par le service.
backgroundColor | String | optionnel | Couleur RVB en hexadécimal pour le fond de la couche ou 'transparent'. Pas de valeur par défaut. Les couches seront affichées avec la couleur de fond par défaut géré par le service.
sld | String | optionnel | URL vers un fichier sld pour définir un style personnel pour les couches.
**Propriétés propres aux couches WMTS** | | |
**layer** | String | **obligatoire** | Nom (dans le GetCapabilities) de la couche à ajouter .
**tileMatrixSet** | String | **obligatoire** | Nom du TileMatrixSet de la couche.
topLeftCorner | Object({x:Float,y:Float}) | optionnel | Point origine pour la pyramide WMTS. Par défaut, on s'appuie sur la définition standard des pyramides pour les projections classiques (EPSG:3857 et EPSG:4326)
resolutions | Array(Float) | optionnel | Liste des résolutions (taille terrain d'un pixel) pour chaque niveau de la pyramide WMTS
matrixIds | Array(String) | optionnel | Listes des identifiants des niveaux de zoom. Par défaut une liste croissante de chiffres est appliquée ("0","1","2", ... "21")
version | String | optionnel | Numéro de version du service. Par défaut, "1.0.0".
**outputFormat** | String | **obligatoire** | Formats de l'image de sortie. Cette propriété peut prendre différentes valeurs selon ce que propose le service (voir le GetCapabilities) : 'image/png', 'image/gif','image/jpeg','image/wbmp','image/tif f' etc.
**styleName** | String | **obligatoire** | Nom du style de la couche. 
**Propriétés propres aux couches WFS** | | |
**typeNames** | String | **obligatoire** | Nom (dans le GetCapabilities) des géométries à afficher. 
version | String | optionnel | Numéro de version du service. Par défaut, "2.0.0".
outputFormat | String | optionnel | Formats de sortie. Cette propriété peut prendre différentes valeurs selon ce que propose le service (voir le GetCapabilities) : text/xml, text/plain, or application/x-gzip;subtype=text/xml etc. Par défaut, 'text/xml'.
maxFeatures | Integer | optionnel | Nombre maximal de géométries à ajouter à la carte. Par défaut, 'null' (la valeur est fixée par la librairie cartographique).
sld | String | optionnel | Fichier sld (uniquement pour WMS et WFS)

<a name="originators"></a>

### Propriétés de l'objet Originator:


Propriété | Type | Opt. | Valeur
-|-|-|-|
logoUrl | String | optionnel | Url du logo du fournisseur de données. Par défaut, une image sera affectée si le paramètre originators est utilisé.
url | String | optionnel | Url vers laquelle l'internaute sera redirigé lorsqu'il clique sur le logo.
label | String | optionnel | Texte qui apparaît lorsque l'internaute survole le logo.



<a name="layerEventOptions"></a>

### Propriétés de l'objet LayerEventOptions :


Propriété | Type | Opt. | Valeur
-|-|-|-|
[non de l'évènement] | Function | optionnel | Couple clé/valeur pour l'ajout d'un contrôle à la carte. Les clés possibles sont :<br>- 'added' : déclenché après l'ajout de la couche à la carte.<br>- 'loadstart' : déclenché quand le chargement de la couche commence<br>- 'loadend' : déclenché quand le chargement de la couche est terminé.<br>- 'visibilitychanged' : déclenché quand la visibilité de la couche a changé. <br>- 'move' : déclenché quand la couche est déplacée (à chaque mouvement de la souris).<br>- 'moveend' : déclenché quand la couche a été bougée.<br>- 'zoomend' : déclenché quand la couche a été zoomée.<br> - 'opacitychanged' : déclenché quand l'opacité de la couche a été changée. <br>- 'orderchanged' : déclenché quand le rang de la couche a été changée. <br>- 'removed' : déclenché après la suprression de la couche. La valeur est une fonction qui sera exécutée lorsque l'évènement sera déclenché.

<a name="controlsOptions"></a>

### Propriétés de l'objet ControlsOptions 

Propriété | Type | Opt. | Valeur
-|-|-|-|
draggable | Boolean | optionnel | Active/Désactive l'outil de déplacement à la souris. Par défaut, true.
keyboard | Boolean | optionnel | Active/Désactive la gestion de la navigation avec le clavier. Par défaut, true.
scrollwheel | Boolean | optionnel | Active/Désactive le zoom molette. Par défaut, true.
selectable | Boolean | optionnel | Active/Désactive l'outil de sélection d'une géométrie à la souris. Par défaut, true.
[_nom d'un contrôle_] | Boolean \| Object | optionnel | Couple clé/valeur pour l'ajout d'un contrôle à la carte. La clé est le nom du contrôle : 'pan','zoomBox', 'zoom', 'orientation', 'camera', 'layerswitcher', 'lenght', area', azimuth', 'elevationPath', 'geocoding', 'reverseGeocoding', 'layerImport', 'drawing', 'graphicScale', 'mousePosition', 'overview', 'fullScreen', 'graticule', 'logo'. Si le developpeur demande l'ajout d'un outil exploitant un service Géoportail non accessible avec sa clé API alors l'outil n'est pas ajouté à la carte. La valeur est :<br/>- soit 'null' si l'on souhaite désactiver l'outil. 'Logo' ne peut être désactivé (de même que les conditions d'utilisation).<br/>- soit un objet ControlOptions. Les propriétés possibles pour cet objet sont décrites cidessous. 

<a name="controlOptions"></a>

### Propriétés de l'objet ControlOptions :


Propriété | Type | Opt. | Valeur
-|-|-|-|
div | String / DOMElement | optionnel | Elément HTML dans lequel le contrôle sera intégré. Par défaut, le contrôle est positionné sur la carte. La div du contrôle 'logo' ne peut être modifiée.
active | Boolean | optionnel | Indique si le contrôle est activé lorsqu'il est rajouté à la carte. Par défaut, les seuls controles activés lorsqu'ils sont ajoutés à la carte sont : 'layerSwitcher', 'graphicScale', 'mousePosition', 'graticule' et 'logo'. Le contrôle 'logo' ne peut être désactivé. 
maximised | Boolean | optionnel | Propre à certains contrôles : indique s'il est ouvert au chargement de la carte. Par défaut, les contrôles sont repliés (maximised='false').
[controlEventOptions](#controlEventOptions) | Object | optionnel | Intéraction avec le contrôle. Les propriétés possibles pour cet objet sont décrites ci-dessous. 
**Propriétés de l'outil Pan** | | |
slideFactor | Integer | optionnel | Nombre de pixels du déplacement de la carte à chaque clic sur les boutons de déplacement. Par défaut, 50. 
**Propriétés de l'outil Orientation** | | |
**Propriétés de l'outil Length et Area** | | |
geodesic | Boolean | optionnel | Si geodesic = true, le calcul des longueurs est geodésique au lieu de planaire. Par défaut, false.
unit | String | optionnel | Unité de la mesure. Les valeurs possibles sont : 'm' (mètres), 'ft' (feet), 'km' (kilomètres, 'mi' (miles) et 'inches'. Par défaut, 'km'.
accuracy | Interger | optionnel | Nombre de chiffres après la virgule affichés dans le résultat de la mesure. Par défaut, 2.
**Propriétés de l'outil Azimuth** | | |
unit | String | optionnel | Unité de la mesure. Les valeurs possibles sont : 'dd' (degrés décimaux), 'rad' (radians), 'grad' (grades),. Par défaut, 'km'.
accuracy | Interger | optionnel | Nombre de chiffres après la virgule affichés dans le résultat de la mesure. Par défaut, 2.
**Propriétés de l'outil ElevationPath** | | |
sampling | Integer | optionnel | Nombre de points qui constituent le profil altimétrique. Par défaut, 50.
**Propriétés de l'outil Geocode et ReverseGeocode** | | |
type | Array(String) | optionnel | Type de l'objet qui est recherché par le service : 'PositionOfInterest', 'StreetAddress', CadastralParcel' et/ou 'Administratif'.
maxResponses | Integer | optionnel | Nombre de réponses maximum à afficher dans les outils. Par défaut, 25. 
autocomplete | Boolean | optionnel | Active ou non l'autocomplétion dans l'outil de recherche. Par défaut, true.
drawLocation | Boolean | optionnel | Affiche une puce sur les positions résultantes de la recherche. Par défaut, true.
**Propriétés de l'outil layerImport** | | |
format | Array(String) | optionnel | Tableau des formats qui seront proposés par l'outil d'ajout de couches. Par défaut, tous les formats seront proposés : 'wms', 'wmts', 'wfs', 'osm' et 'georss', 'kml', 'gpx', 'geojson'. 
**Propriétés de l'outil Drawing** | | |
**layers** | Array(String) | **obligatoire** | Liste des identifiants des couches éditables. 
drawFeature | Boolean | optionnel | Affiche ou non l'outil de dessin d'une géométrie. Par défaut, true.
dragFeature | Boolean | optionnel | Affiche ou non l'outil de déplacement d'une géométrie dessinée. Par défaut, true.
modifyFeature | Boolean | optionnel | Affiche ou non l'outil de modification d'une géométrie dessinée. Par défaut, true.
deleteFeature | Boolean | optionnel | Affiche ou non l'outil de suppression d'une géométrie dessinée.Par défaut, true.
attributesFeature | Boolean | optionnel | Affiche ou non l'outil d'ajout d'attributs à une couche dessinée. Par défaut, true.
stylesFeature | Boolean | optionnel | Affiche ou non l'outil de modification des styles d'un couche dessinée. Par défaut, true.
saveFeatures | Boolean | optionnel | Affiche ou non l'outil d'export d'une couche dessinée. Par défaut, true.
**Propriétés de l'outil GraphicScale** | | |
units | String | optionnel | Unité de la mesure. Les valeurs possibles sont : 'degrees', 'imperial', 'nautical', 'metric' ou 'us'. Par défaut, 'metric'. 
minWidth | Number | optionnel | Longueur minimale de la barre en pixels. Par défaut, 64.
**Propriétés de l'outil MousePosition** | | |
displayProjection | String | optionnel | Projection dans laquelle sont exprimées les coordonnées de la souris. Par défaut, la projection est celle de la carte.
**Propriétés de l'outil Overview** | | |
layers | Array(String) | optionnel | Liste des identifiants des couches à afficher dans la vue d'ensemble. Par défaut, toutes les couches Géoportail sont affichées.
minZoom | Integer | optionnel | Si le zoom courant de la mini-carte est inférieur à cet entier, la mini carte reste à ce niveau de zoom. Par défaut, on utilisera le minZoom de la carte.
maxZoom | Integer | optionnel | Si le zoom courant de la mini-carte est supérieur à cet entier, la mini carte reste à ce niveau de zoom. Par défaut, on utilisera le minZoom de la carte.
deltaZoom | Integer | optionnel | Différence entre le zoom de la carte et le niveau de zoom de la mini-carte.
**Propriétés de l'outil Graticule** | | |
intervals | Array(Float) | optionnel | Liste des intervalles de la grille en degrés.
**Propriétés de l'outil Logo** | | |
logoSize | Integer | optionnel | Taille (hauteur et largeur) en pixels des logos. La taille ne peut-être inférieure à 30. Par défaut, 50.

<a name="controlEventOptions"></a>

## Propriétés de l'objet ControlEventOptions :


Propriété | Type | Opt. | Valeur
-|-|-|-|
[non de l'évènement] | Function | optionnel | Couple clé/valeur pour l'ajout d'un contrôle à la carte. Les clés possibles sont :<br>- 'activate' : déclenché une fois le contrôle activé, <br>- 'deactivate' : déclenché une fois le contrôle désactivé,<br>- 'onServiceResult' : si l'outil utilise un service, l'évènement est déclenché lorsque le service web répond. La valeur est une fonction qui sera exécutée lorsque l'évènement sera déclenché.



<a name="mapEventsOptions"></a>

## Propriétés de l'objet MapEventsOptions :

Propriété | Type | Opt. | Valeur
-|-|-|-|
[non de l'évènement] | Function | optionnel | Couple clef / valeur pour associer un événement relatif à la carte à un traitement à déclencher lors de la réception de l'événement. La [liste des évenements (et donc des clefs possibles) est donnée ici](./dd_interaction-carte.html#evenements).


