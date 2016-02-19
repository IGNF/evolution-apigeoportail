---
layout: leaflet
title: Affichage de couche WMS
level: 2
order: 000300
api: leaflet
---

# Affichage simple de couches WMS Géoportail

## Présentation générale

Cette fonctionnalité permet à un développeur d’afficher simplement les couches WMS diffusées par la plateforme Géoportail à l’aide de la bibliothèque cartographique Leaflet.

Il fournit simplement sa clef d’accès à la plateforme Géoportail et l’identifiant de la couche (par exemple : “ORTHOIMAGERY.ORTHOPHOTOS”).

Il peut aussi spécifier lui même des paramètres WMS (version, style, etc.), ou d'autres paramètres gérés par Leaflet.


## Mise en oeuvre

L’utilisation de cette fonctionnalité est conditionnée au [chargement préalable de la configuration associée à se clef de contrat](./leaflet-autoconf.html).

L'utilisation se fera par la création d'une nouvelle instance de la classe L.GeoportalLayer.WMS, de la manière suivante :

``` javascript
L.GeoportalLayer.WMS(options, [leafletParams]);
```

Cette fonction retourne un objet [L.TileLayer.WMS](http://leafletjs.com/reference.html#tilelayer-wms).

La fonction prend en paramètre d'entrée un objet, dont les propriétés peuvent prendre les valeurs suivantes :

Paramètre |  Type   |    Opt.     | Valeur
- |-|-|-|
options           | Object  | Obligatoire | Options spécifiques à la couche Geoportail
options.layer     | String  | Obligatoire | Nom de la couche Géoportail que l'on souhaite afficher (par exemple, "ORTHOIMAGERY.ORTHOPHOTOS" ou "GEOGRAPHICALGRIDSYSTEMS.MAPS"
options.apiKey    | String  | Optionnel   | Clé d'accès à la plateforme Géoportail.
leafletParams     | Object  | Optionnel   | Autres options possibles pour la création d'un objet L.TileLayer (voir la [documentation Leaflet](http://leafletjs.com/reference.html#tilelayer-wms) pour la liste des options possibles).


### Exemples d'utilisation

#### Utilisation simple de la fonction

Création d'une source Géoportail, pour les orthos-images. (Utilisation simple de la fonction)

``` javascript
var layer = L.GeoportalLayer.WMS({
  layer:  "ORTHOIMAGERY.ORTHOPHOTOS"
});
```

#### Affichage simple avec Leaflet

Affichage simple des cartes IGN du Géoportail : création d'une *layer* Géoportail, et ajout à la *map* Leaflet.

``` javascript
var map = L.Map('divmap', {center: [2.38, 45.23] , zoom: 13}) ;
var lyr = L.GeoportalLayer.WMS({
    layer  : "GEOGRAPHICALGRIDSYSTEMS.MAPS"
}, {
    opacity : 1
});

lyr.addTo(map); // ou map.addLayer(lyr);
```

<!--
#### Affichage simple d'une couche en Lambert 93 avec Leaflet

Affichage simple de la BDOrtho du Géoportail en Lambert 93 : création d'une *layer* Géoportail, et ajout à la *map* Leaflet.

``` javascript
var map = L.Map('divmap', {
    crs : L.GeoportalCRS.EPSG2154(),
}).setView();
var lyr = L.GeoportalLayer.WMS({
    layer  : "ORTHOIMAGERY.ORTHOPHOTOS.BDORTHO",
    apiKey : "KEY-API"
});

lyr.addTo(map); // ou map.addLayer(lyr);
```
-->

