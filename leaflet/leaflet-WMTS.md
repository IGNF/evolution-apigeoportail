---
layout: leaflet
title: Affichage de couche WMTS
level: 2
order: 000200
api: leaflet
---

# Affichage simple de couches WMTS Géoportail

## Présentation générale

Cette fonctionnalité permet à un développeur d'afficher simplement les couches WMTS diffusées par la plateforme Géoportail à l'aide de la bibliothèque cartographique Leaflet.

Il fournit simplement sa clef d'accès à la plateforme Géoportail et l'identifiant de la couche (par exemple : "ORTHOIMAGERY.ORTHOPHOTOS").


## Mise en oeuvre

L'utilisation de cette fonctionnalité est conditionnée au [chargement préalable de la configuration associée à se clef de contrat](./Leaflet-autoconf.html).

L'utilisation se fera ensuite par la création d'une nouvelle instance de la classe L.GeoportalLayer.WMTS, de la manière suivante :


``` javascript
L.GeoportalLayer.WMTS(options, [leafletParams]);
```

Cette fonction retourne un objet de type [L.TileLayer](http://leafletjs.com/reference.html#tilelayer).

La fonction prend en paramètre d'entrée un objet, dont les propriétés peuvent prendre les valeurs suivantes :

Paramètre |  Type   |    Opt.     | Valeur
- |-|-|-|
options           | Object  | Obligatoire | Options spécifiques à la couche Geoportail
options.layer     | String  | Obligatoire | Nom de la couche Géoportail que l'on souhaite afficher (par exemple, "ORTHOIMAGERY.ORTHOPHOTOS" ou "GEOGRAPHICALGRIDSYSTEMS.MAPS"
options.apiKey    | String  | Optionnel   | Clé d'accès à la plateforme Géoportail.
leafletParams     | Object  | Optionnel   | Autres options possibles pour la création d'un objet L.TileLayer (voir la [documentation Leaflet](http://leafletjs.com/reference.html#tilelayer) pour la liste des options possibles).


### Exemples d'utilisation

#### Utilisation simple de la fonction

Création d'une couche Géoportail, pour les orthos-images. (Utilisation simple de la fonction)

``` javascript
var layer = L.GeoportalLayer.WMTS({
  layer:  "ORTHOIMAGERY.ORTHOPHOTOS"
});
```

#### Affichage simple avec Leaflet

Affichage simple des ortho-images du Géoportail : création d'une *layer* Géoportail, et ajout à la *map* Leaflet.

``` javascript
var map = L.Map('divmap', {center: [2.38, 45.23] , zoom: 13}) ;
var lyr = L.GeoportalLayer.WMTS({
    layer  : "ORTHOIMAGERY.ORTHOPHOTOS",
}, { // leafletParams
    opacity : 0.5
}) ;

lyr.addTo(map); // ou map.addLayer(lyr);
```


<!--
#### Affichage simple d'une couche en Lambert 93 avec Leaflet


Affichage simple de la BDOrtho du Géoportail en Lambert 93 : création d'une *layer* à partir d'une source Géoportail, et ajout à la *map* Leaflet.

``` javascript
var map = L.Map('divmap', {
    crs : L.GeoportalCRS.EPSG2154(),
}).setView();
var lyr = L.GeoportalLayer.WMTS({
    layer  : "ORTHOIMAGERY.ORTHOPHOTOS.BDORTHO.L93",
    apiKey : "KEY-API"
}, {
    attribution : "test for layer ORTHOIMAGERY",
    opacity : 1,
    tileSize : 256
});

lyr.addTo(map); // ou map.addLayer(lyr);
```

-->

