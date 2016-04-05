---
layout: ahn
title: Exemples d'initialisation
level: 3
order: 020201
api: ahn
---

# Exemples d'initialisations

## Centrage par adresse

Affichage d'une carte utilisant les fonds associés à la clé CLE_API et centrée sur une adresse donnée dans une <div> d'identifiant 'geoportalMap'.

```
Gp.Map.load(
    'geoportalMap',
    {
        apiKey:"CLE_API",
        center : {
            location : "rue pasteur, Saint-Mandé"
        }
    }
) ;
```

## Centrage par coordonnées

Affichage d'une carte utilisant les fonds associés à la clé CLE_API et centrée sur un point donné dans une <div> d'identifiant 'geoportalMap'.

```
Gp.Map.load(
    'geoportalMap',
    {
        apiKey:"CLE_API",
        center : {
            x:2.731525,
            y:45,83333
        }
    }
) ;
```


## Centrage par géolocalisation 

Affichage d'une carte centrée en fonction de l'IP et zoomée au niveau 10. Si l'utilisateur refuse la géolocalisation par IP, le développeur prévoit de centrer la carte sur une position sexagésimale.


```
var mapOptions = {
    apiKey:"CLE_API",
    center:{
        x : '2°43\'53.49"E',
        y : '45°49\'59.9874"N',
        geolocate : true,
    },
    zoom : 10
} ;

Gp.Map.load(
    'geoportalMap',
    mapOptions
) ;
```


## Utilisation d'un marker

Affichage d'une carte centrée sur une adresse et zoomée au niveau 10 avec une puce centrale présentant donnant quelques informations au clic . Personnalisation de la puce.


```
var mapOptions = {
    apiKey:"CLE_API",
    center : {
        location : "6 rue du temple 13200 arles"
    },
    zoom:10,
    markerOptions : {
        title:"Plastic Bois",
        description :"Menuiseries Bois, PVC, Alu <br/> <a href="www.plasticbois.fr">Plastic Bois</a>",
        iconUrl:"http://www.poi-factory.com/files/img/McDonalds.bmp",
        iconWidth:30,
        iconHeight:30
    }
} ;

Gp.Map.load(
    'geoportalMap',
    mapOptions
) ;
```


## Interception des événements liés à la carte

Evénement lié à la géolocalisation.


```
Gp.Map.load(
    'geoportalMap',
    {
        apiKey:"CLE_API",
        mapEventOptions:{
            'mapGeolocated':function(){alert('Centre trouvé!')},
        }
    }
) ;
```


## Gestion des couches Géoportail

Affichage d'une carte avec seulement la couche "Photographies aériennes" du Géoportail.


```
Gp.Map.load(
    'geoportalMap',
    { 
        apiKey:"CLE_API",
        layersOptions:{
            'ORTHOIMAGERY.ORTHOPHOTOS': {}
        }
    }
) ;
```


## Affichage de couches métiers 


### WMS

Affichage d'un flux WMS superposé à la couche "Photographies aériennes" du Géoportail.

```
var mapOptions = {
    apiKey:"CLE_API",
    layersOptions:{
        'ORTHOIMAGERY.ORTHOPHOTOS':{
    },
        'wms1' : {
            name : 'Cours d'eau'
            format:'wms',
            url:'http://services.sandre.eaufrance.fr/geo/zonage',
            layers:['TronconHydrographique','RegionHydro'],
            outputFormat:'image/jpeg',
            backgroundColor:'FFFFFF'
            opacity:0.8
        }
    }
} ;

Gp.Map.load({
    'geoportalMap',
    mapOptions
}) ;
```

### GPX

Affichage d'une couche GPX et utilisation des paramètres relatifs aux échelles d'affichage et des logos.

```
var mapOptions = {
    apiKey:"CLE_API",
    layersOptions:{
        'ORTHOIMAGERY.ORTHOPHOTOS':{
            opacity:1,
            visibility:false
        },
        'GEOGRAPHICALGRIDSYSTEMS.MAPS':{
            opacity:1
        },
        'gpx':{
            name : 'Randonnée des 3 lacs',
            format:'gpx',
            url:'data/rando.gpx',
            minZoom:10,
            maxZoom:19,
            originators:[
                {
                    logo:'img/logoRP.jpg'
                    url:'www.randopassion.fr'
                }
            ],
            extractAttributes:false
        }
    }
}

Gp.Map.load({
    'geoportalMap',
    mapOptions
})
```


### KML

Affichage d'un fichier KML. Utilisation de paramètres relatifs au chargement des couches vecteur.

```
var mapOptions = {
    apiKey:"CLE_API",
    layersOptions:{
        'GEOGRAPHICALGRIDSYSTEMS.MAPS ':{
            opacity:1
        },
        'kml1':{
            name : 'Réseau Inter',
            format:'kml',
            url:'data/inter.kml',
            maxFeatures : 20,
            layerEventOptions:{
                'loadend' : function(){
                    alert("veuillez cliquer sur un magasin pour obtenir son numéro de téléphone");
                }
            }
        }
    }
}

Gp.Map.load(
    'geoportalMap',
    mapOptions
) ;
```

## Paramétrage des outils

Gestion de l'affichage du LayerSwitcher dans une div différente.

```
Gp.Map.load(
    'geoportalMap',
    {
        apiKey:"CLE_API",
        center : {
            x:2.731525,
            y:45,83333
        },
        controlsOptions:{
            'layerSwitcher': {
                div : "lsDiv"
            }
        }
    }
) ;
```

## Outils de croquis

Utilisation des outils de croquis et association à une couche de dessin.


```
var mapOptions = {
    apiKey:"CLE_API",
    layersOptions:{
        'GEOGRAPHICALGRIDSYSTEMS.MAPS ':{
            opacity:1
        },
        'dessin1' : {
            name : "Mes points d'intérêts",
            format : 'drawing"
        }
    },
    controlsOptions : {
        'drawing':{
            layers : ['dessin1']
        }
    }
}

Gp.Map.load({
    'geoportalMap',
    mapOptions
})
```




