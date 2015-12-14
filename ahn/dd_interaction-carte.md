---
layout: ahn
title: Interaction avec la carte
level: 2
order: 030300
api: ahn
---
## Interaction avec la carte

Le Kit de développement (ou "API Haut Niveau" dans ce document) doit permettre à l'utilisateur d'intéragir avec les éléments de la fenêtre cartographique. Cette fonctionnalité sera disponible une fois la carte initialisée à l'aide de fonctions permettant d'agir sur la carte et d'événements permettant connaitre l'état de la carte en fonction des actions de l'internaute.

### Cas d'utilisation

L'utilisateur est un développeur qui souhaite proposer une fenêtre cartographique au sein d'une page web.

Une fois la carte chargée, le développeur peut vouloir donner à l'utilisateur la possibilité de modifier la carte grâce à des formulaires, des boutons etc.

### Mise en oeuvre

L'utilisation se fera par l'exploitation des méthodes de l'objet Gp.Map retourné par la fonction de chargement Gp.Map.load().

#### Objet : Gp.Map

Cet objet est renvoyé par la fonction [Gp.Map.load()](./dd_configuration-carte.html#gpMapLoad).

Une fois la carte initialisée, l'objet permet d'intéragir avec elle à l'aide de getters, de setters et d'autres fonctions.

Methodes | Type retourné | Valeur
-|-|-|
getProjection() | String | Retourne le code de la projection courante de la carte.
getCenter() | Object({x:Float,y:Float}) | Retourne les coordonnées du centre de la carte dans la projection courante.
getTilt() | Float | Retourne l'inclinaison de la caméra (uniquement 3d).
getAzimuth() | Float | Retourne l'azimut courant de la carte.
getZoom() | Integer | Retourne le niveau de zoom courant de la carte.
getLib() | String | Retourne le nom de la bibliothèque cartographique utilisée.
getLayersOptions(layerIds:Array(String)/null) | Array([LayerOptions](dd_configuration-carte.html#layerOptions)) | Retourne les options de la couche si un identifiant est passé en entrée de la fonction. Sinon, retourne les options de toutes les couches de la carte.
getControlsOptions(controlIds:Array(String)/ null) | Array([ControlOptions](dd_configuration-carte.html#controlOptions)) | Retourne les options du contrôle si un nom est passé en entrée de la fonction. Sinon, retourne les options de toutes les contrôles de la carte.
getLibMap() | Objet | Retourne l'objet "carte" de la bibliothèque cartographique sous-jacente.
setProjection(projection:String) |  - | Définit la projection de la carte. Si certaines couches ne sont pas compatibles avec la nouvelle projection, elles ne seront pas affichées.
setCenter(center: {x:Float,y:Float}/location:String/geolocate:Boolean) | - | Définit le centre de la carte. 
setTilt(tilt:Float) | - | Définit l'inclinaison de la caméra en degrés (uniquement en 3d).
setAzimut(azimuth:Float) | - | Définit l'azimuth de la carte en degrés.
setZoom(zoom : Integer) | - | Définit le niveau de zoom de la carte.
zoomIn() | - | Incrémente le niveau de zoom de la carte de 1.
zoomOut() | - | Décrémente le niveau de zoom de la carte de 1.
switchToLib(library:String) | - | Définit la bibliothèque utilisée pour la construction de la fenêtre cartographique.
addLayers(layers:[LayersOptions](dd_configuration-carte.html#layersOptions)) | - | Ajoute les couches listées dans la carte. Les propriétés de l'objet LayersOptions sont décrites dans le chapitre précédent.
removeLayers(layers:Array(String)) | - | Supprime de la carte les couches dont les identifiants font partie de la liste.
modifyLayers(layers:[LayersOptions](dd_configuration-carte.html#layersOptions)) | - | Modifie les couches listées dans la carte. Les propriétés de l'objet LayersOptions sont décrites dans le chapitre précédent.
addControls(controls:[ControlOptions](dd_configuration-carte.html#controlsOptions)) | - | Ajoute les outils listés dans la carte. Les propriétés de l'objet ControlOptions sont décrites dans le chapitre précédent.
removeControls(controls:Array(String)) | - | Supprime de la carte les couches dont les noms font partie de la liste.
modifyControls(controls:[ControlOptions](dd_configuration-carte.html#controlsOptions)) | - | Modifie les outils listés. Les propriétés de l'object ControlsOptions sont décrite dans le chapitre précédent.
<a name="gpMapListen"></a>listen(event : String, do : Function)) | - | Associe un traitement (fonction "do") à la réception de l'événemment "event". La liste des événements auxquels la fonction peut s'abonner est donnée [ci-dessous](#evenements).
forget(event : String ; do : Function) | - | Annule l'association du traitement "do" à l'événement "event".


#### <a name="evenements"></a>Evénements

[La méthode listen de l'objet Gp.Map](#gpMapListen) permet de s'abonner à divers événements transmis par l'API HAut Niveau. Chaque événement est accompagné d'un ensemble de propriétés passées en paramètre de la fonction d'écoute.

Nom de l'événement | Propriétés | Valeur
-|-|-|
mapLoaded | map:Gp.Map | déclenché une fois la carte chargée.
mapFailure | error:String | déclenché en cas d'échec de Gp.Map.load().
mapGeolocated | center:{x:Float,y:Float} | déclenché une fois le centrage par géolocalisation effectué.
mapLocated | center:{x:Float,y:Float} | déclenché une fois le centrage par Géocodage effectué.
mapConfigured | config:[Gp.Config](../services/dd_services_autoconf.html) | déclenché une fois l'appel à l'autoconfiguration effectué.
centerChanged | center:{x:Float,y:Float} | déclenché au changement de centre de la carte. La fonction propose en entrée les nouvelles coordonnées du centre.
zoomChanged | zoom:Integer | déclenché au changement de zoom de la carte. La fonction propose en entrée le nouveau niveau de zoom.
azimuthChanged | azimuth:Number | déclenché au changement d'azimuth de la carte. La fonction propose en entrée la nouvelle inclinaison en degrés décimaux.
tiltChanged | tilt:Number | déclenché au changement de cap de la carte 3d. La fonction propose en entrée le nouveau cap en degrés décimaux.
projectionChanged | projection:String | déclenché au changement de projection de la carte. La fonction propose en entrée la nouvelle projection.
layerChanged | layerOptions:[LayerOptions](dd_configuration-carte.html#layerOptions) | déclenché au changement d'une couche de la carte. La fonction propose en entrée les paramètres de la couche modifiée.
controlChanged | controlOptions: [ControlOptions](dd_configuration-carte.html#controlOptions) | déclenché au changement d'un outil de la carte. La fonction propose en entrée les paramètres de l'outil modifié.

