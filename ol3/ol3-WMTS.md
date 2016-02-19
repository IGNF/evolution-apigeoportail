---
layout: ol3
title: Affichage de couche WMTS
level: 2
order: 000200
api: ol3
---

# Affichage simple de couches WMTS Géoportail

## Présentation générale

Cette fonctionnalité permet à l'utilisateur d'afficher simplement les couches WMTS de la plateforme Géoportail avec OpenLayers : le développeur fournit simplement l'identifiant de la couche (par exemple : "ORTHOIMAGERY.ORTHOPHOTOS").

Il est nécessaire d'avoir préalablement mis en place le chargement automatique de l'autoconfiguration au chargement de la page [(voir détails)](./ol3-autoconf.html).

On distingue deux cas d'utilisation :

1. L'utilisateur souhaite une mise en oeuvre simple, où il saisit uniquement le nom de sa couche, et d'éventuels paramètres d'affichage (visibilité ou opacité). Il va donc créer une **layer** WMTS Géoportail.

2. L'utilisateur souhaite pouvoir paramétrer plus finement l'affichage de sa couche dans la carte, ainsi que d'éventuels paramètres du service (format, style, pyramide). Il va donc créer une **source** WMTS Géoportail.

## Méthode 1 : création d'une layer WMTS

C'est la méthode la plus simple : l'utilisateur crée une layer WMTS, en spécifiant le nom de la ressource Géoportail qu'il souhaite ajouter. Il peut aussi spécifier lui même des paramètres d'affichage (opacity, visibility, minResolution, ...), ou d'autres paramètres gérés par OpenLayers.

### Mise en oeuvre

L'utilisation se fera par la création d'une nouvelle instance de la classe ol.layer.GeoportalWMTS, de la manière suivante :

``` javascript
new ol.layer.GeoportalWMTS(options);
```

Cette fonction retourne un objet **ol.layer.GeoportalWMTS**, qui hérite de l'objet OpenLayers *ol.layer.Tile*, qui peut ainsi être interprété par la librairie OpenLayers pour l'ajout dans la carte.

La fonction prend en paramètre d'entrée un objet, dont les propriétés peuvent prendre les valeurs suivantes :

Paramètre |  Type   |    Opt.     | Valeur
- |-|-|-|
layer     | String  | Obligatoire | Nom de la couche Géoportail que l'on souhaite afficher (par exemple, "ORTHOIMAGERY.ORTHOPHOTOS" ou "GEOGRAPHICALGRIDSYSTEMS.MAPS"
apiKey    | String  | Optionnel   | Clé d'accès à la plateforme Géoportail.
olParams  | Object  | Optionnel   | Autres options possibles pour la création d'un objet ol.layer.Tile (voir la [documentation OpenLayers](http://openlayers.org/en/v3.13.0/apidoc/ol.layer.Tile.html) pour la liste des options possibles).

### Exemples d'utilisation

#### Utilisation simple de la fonction

Création d'une layer Géoportail, pour les orthos-images. (Utilisation simple de la fonction)

``` javascript
var layer = new ol.layer.GeoportalWMTS({
  layer:  "ORTHOIMAGERY.ORTHOPHOTOS"
};
```

#### Affichage simple avec OpenLayers

Affichage simple des ortho-images du Géoportail : création d'une *layer* Géoportail, et ajout à la *map* OpenLayers.

``` javascript
var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.GeoportalWMTS({
        layer: "ORTHOIMAGERY.ORTHOPHOTOS"
    })
  ],
  view: new ol.View({
    center: [288074.8449901076, 6247982.515792289],
    zoom: 12
  })
});
```

<!--
#### Affichage simple d'une couche en Lambert 93 avec OpenLayers

Affichage simple des ortho-images du Géoportail en Lambert 93 : création d'une *layer* Géoportail, et ajout à la *map* OpenLayers. Il est nécessaire de spécifier la projection de la carte (par défaut : "EPSG:3857").

``` javascript
var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.GeoportalWMTS({
        layer: "ORTHOIMAGERY.ORTHOPHOTOS.BDORTHO.L93"
    })
  ],
  view: new ol.View({
    projection : "EPSG:2154",
    center: [600000, 6750000],
    zoom: 12
  })
});
```
-->


#### Affichage simple avec OpenLayers, et affichage des logos.

Affichage simple des ortho-images du Géoportail, et ajout d'un contrôle pour afficher les attributions associées (voir [documentation du contrôle](./ol3-originators.html) pour plus de détails).

``` javascript
var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.GeoportalWMTS({
        layer: "ORTHOIMAGERY.ORTHOPHOTOS"
      })
    })
  ],
  view: new ol.View({
    center: [288074.8449901076, 6247982.515792289],
    zoom: 12
  })
});
map.addControl(
    new ol.control.GeoportalAttribution({
        collapsed : false
    }
));
```

## Méthode 2 : création d'une source WMTS

Cette méthode permet plus de paramétrages : l'utilisateur crée une source WMTS spécifique à la couche Géoportail qu'il souhaite ajouter, en spécifiant le nom de cette ressource. Cette source lui servira à la création d'une *layer* OpenLayers. Il peut aussi spécifier lui même des paramètres WMTS (url, TMS), ou d'autres paramètres gérés par OpenLayers.

### Mise en oeuvre

L'utilisation se fera par la création d'une nouvelle instance de la classe ol.source.GeoportalWMTS, de la manière suivante :

``` javascript
new ol.source.GeoportalWMTS(options);
```

Cette fonction retourne un objet **ol.source.GeoportalWMTS**, qui hérite de l'objet OpenLayers *ol.source.WMTS*, qui peut ainsi être interprété par la librairie OpenLayers pour la création d'une couche.

La fonction prend en paramètre d'entrée un objet, dont les propriétés peuvent prendre les valeurs suivantes :

Paramètre |  Type   |    Opt.     | Valeur
- |-|-|-|
layer     | String  | Obligatoire | Nom de la couche Géoportail que l'on souhaite afficher (par exemple, "ORTHOIMAGERY.ORTHOPHOTOS" ou "GEOGRAPHICALGRIDSYSTEMS.MAPS"
apiKey    | String  | Optionnel   | Clé d'accès à la plateforme Géoportail.
olParams  | Object  | Optionnel   | Autres options possibles pour la création d'un objet ol.source.WMTS (voir la [documentation OpenLayers](http://openlayers.org/en/v3.12.1/apidoc/ol.source.WMTS.html) pour la liste des options possibles).

### Exemples d'utilisation

#### Utilisation simple de la fonction

Création d'une source Géoportail, pour les orthos-images. (Utilisation simple de la fonction)

``` javascript
var source = new ol.source.GeoportalWMTS({
  layer:  "ORTHOIMAGERY.ORTHOPHOTOS"
};
```

#### Affichage simple avec OpenLayers

Affichage simple des ortho-images du Géoportail : création d'une *layer* à partir d'une source Géoportail, et ajout à la *map* OpenLayers.

``` javascript
var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.GeoportalWMTS({
        layer: "ORTHOIMAGERY.ORTHOPHOTOS"
      }),
      opacity: 0.7
    })
  ],
  view: new ol.View({
    center: [288074.8449901076, 6247982.515792289],
    zoom: 12
  })
});
```

<!--
#### Affichage simple d'une couche en Lambert 93 avec OpenLayers

Affichage simple des ortho-images du Géoportail en Lambert 93 : création d'une *layer* à partir d'une source Géoportail, et ajout à la *map* OpenLayers. Il est nécessaire de spécifier la projection de la carte (par défaut : "EPSG:3857").

``` javascript
var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.GeoportalWMTS({
        layer: "ORTHOIMAGERY.ORTHOPHOTOS.BDORTHO.L93"
      })
    })
  ],
  view: new ol.View({
    projection : "EPSG:2154",
    center: [600000, 6750000],
    zoom: 12
  })
});
```
-->


#### Affichage simple avec OpenLayers, et affichage des logos.

Affichage simple des ortho-images du Géoportail, et ajout d'un contrôle pour afficher les attributions associées (voir [documentation du contrôle](./ol3-originators.html) pour plus de détails).

``` javascript
var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.GeoportalWMTS({
        layer: "ORTHOIMAGERY.ORTHOPHOTOS"
      })
    })
  ],
  view: new ol.View({
    center: [288074.8449901076, 6247982.515792289],
    zoom: 12
  })
});
map.addControl(
    new ol.control.GeoportalAttribution({
        collapsed : false
    }
));
```

## Exemple de rendu : 

![Affichage simple d'une couche WMTS avec ses logos](./img/GporiginatorsView.png)
