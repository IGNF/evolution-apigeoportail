---
layout: ahn
title: Présentation
level: 1
order: 000000
api: ahn
---

# Kit de développement

## Présentation

Le "Kit de développement" est une intégration tout-en-un d'OpenLayers 3 et de son extensions Géoportail avec une interface de programmation légère permettant d’intégrer simplement une carte utilisant les ressources du Géoportail dans un site web et de réagir aux intéractions des internautes.

Elle s'adresse à des gestionnaires de site internet non initiés à l'utilisation de bibliothèques cartographiques et désireux de proposer une cartographie dynamique utilisant les fonds IGN sur leur site et faisant appel à des fonctionnalités simples :

* positionnement de la carte (centrage, orientation, niveau de zoom)
* composition de la carte (choix et assemblage du fond cartographique)
* mise à disposition d'outils d'intéraction avec la carte aux internautes
* gestion de l'intéraction de l'internaute avec la carte (événements)

Le détail de ces fonctionnalités est donné dans la [page sur la couverture fonctionnelle de cette API](dg_couverture-fonctionnelle.html).

## Exemples d'utilisations

### Intégration d'une carte dans une page web

L'intégration des balises suivantes dans une page HTML permet d'afficher une carte centrée sur l'adresse "73 avenue de Paris, Saint-Mandé" au niveau de zoom 10 en utilisant la couche "photographies aériennes" de l'IGN. 


```
<div id="mapDiv"></div>
<script type="text/javascript" src=" http://api.ign.fr/geoportail/api/Gp.js" />
<script type="text/javascript">
var gpMap = null;
window.onload = function(){
    //initialisation de la carte
    gpMap = Gp.Map.load(
        // clef d'accès aux géoservices du Géoportail
        "CLEF_API",
        // positionnement de la carte dans la page HTML
        "mapDiv",
        {
            // positionnement de la carte
            location : "73 avenue de Paris, Saint-Mandé",
            zoom : 10,
            // utilisation de la couche "Photographies aériennes"
            layersOptions : {
                "ORTHOIMAGERY.ORTHOPHOTOS" : {} 
            },
            // intégration d'un marker au centre de la carte
            markerOptions : {
                title : "Entrée du Pôle Géosciences",
            },
            // intégration d'une échelle graphique sur la carte
            controlOptions : {
                graphicScale : {}
            }
        }
    );
}
</script>
```

_NB_ : La fourniture d'une clef API obtenue sur le site [professionnels.ign.fr](http://professionnels.ign.fr/api-web) est nécessaire pour avoir accès à l'affichage de cette couche et à l'utilisation du service de Géocodage pour le centrage selon l'adresse fournie.


