---
layout: ahn
title: Présentation
level: 1
order: 000000
api: ahn
---

# Kit de développement

## Contexte

Le Kit de développement proposé par l'IGN est une librairie JavaScript mise à disposition sous licence libre par l'IGN dans le cadre de la refonte des outils proposés pour faciliter l'utilisation des ressources du Géoportail dans des développements web.

## Présentation

Le Kit de développement est une intégration tout-en-un d'une bibliothèque cartographique OpenLayers 3 et de son extension Géoportail avec une interface de programmation légère permettant d'ajouter simplement une carte utilisant les ressources du Géoportail dans un site web et de réagir aux interactions des internautes.

Elle s'adresse à des gestionnaires de site internet non initiés à l'utilisation de bibliothèques cartographiques et désireux de proposer rapidement une cartographie dynamique utilisant les fonds IGN sur leur site et faisant appel à des fonctionnalités simples :

* positionnement de la carte (centrage, orientation, niveau de zoom)
* composition de la carte (choix et assemblage du fond cartographique)
* mise à disposition d'outils d'interaction avec la carte aux internautes
* gestion de l'interaction de l'internaute avec la carte (événements)

Le détail de ces fonctionnalités est donné dans la [page sur la couverture fonctionnelle de cette API](pg_couverture-fonctionnelle.html).

## Les prérequis pour utiliser ce Kit de développement

_Attention_ : L'utilisation de ce Kit de développement nécessite l'obtention d'une clé API. Cette clé API s'obtient -gratuitement pour la plupart des utilisations- sur le site [professionnels.ign.fr](http://professionnels.ign.fr/api-web). Elle est nécessaire pour avoir accès aux ressources du Géoportail, telles que l'affichage d'une couche ou l'utilisation du service de géocodage pour centrer la carte sur l'adresse fournie par l'internaute.

## Licence

Ce Kit de développement est fourni sous licence de logiciel libre [Cecill-B](http://www.cecill.info/licences/Licence_CeCILL-B_V1-fr.html)

## Exemple d'utilisation

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



