---
layout: ahn
title: Packaging
level: 2
order: 020100
api: ahn
---


# Packaging

Le Kit de développement (ou SDK) est disponible sous la forme d'un fichier JavaScript accompagné de ressources de styles (fichier CSS + images).

Il embarque les codes :

* de la bibliothèque d'accès JavaScript aux ressources du Géoportail,
* de la bibliothèque cartographique OpenLayers 3
* de l'extension Géoportail OpenLayers 3
* de toutes les fonctionnalités de l'API mise en oeuvre par le SDK et décrite dans ce document.

**Le Kit de développement est désormais disponible**. Rendez-vous [ici](https://github.com/IGNF/geoportal-sdk#mise-en-oeuvre) pour l'utiliser.

## Utilisation

Le développeur, utilisateur du Kit de développement, doit intégrer dans sa page le script du Kit de développement et les ressources associées.

Il utilise la fonction Gp.Map.load() pour initialiser la carte avec les paramètres qu'il souhaite.

La fonction est exécutée. Le Kit de développement traduit ces paramètres en utilisant la bibliothèque cartographique sous-jacente, l'extension Géoportail associée et la bibliothèque d'accès JavaScript aux ressources du Géoportail.

La fonction Gp.Map.load() retourne un objet Gp.Map.

Le développeur peut alors intéragir avec la carte en utilisant les méthodes et les évènements disponibles sur cet objet Gp.Map.

Pour une utilisation avancée, il a accès à toutes les méthodes et fonctionnalités de la librairie sous jacente et de ses extensions grace à la méthode getLibMap() de cet objet Gp.Map.

Exemple de structure du code dans la page HTML utilisant le Kit de développement associée avec la bibliothèque OpenLayers 3.


```
<!-- chargement SDK : css-->
<link rel="stylesheet" href="./chemin/vers/GpOl3.css" type="text/css"/>
<!-- chargement SDK : javascript -->
<script type="text/javascript" src="chemin/vers/GpOl3.js" />

<!-- ... -->

<div id="geoportalMap"></div>
<script type="text/javascript">
var gpMap = null;

window.onload = function() {
    //initialisation de la carte
    gpMap = Gp.Map.load(
        //configuration de la carte initiale
    ) ;

    //interaction après chargement de la carte
    gpMap.listen(
        "mapLoaded",
        function(){
            // Accès à l'objet "carte" de la bibliothèque sous jacente pour exploiter
            // toutes les fonctionnalités avancées
            var lbMap = gMap.getLibMap();
            //action déclenchée à la fin du chargement de la carte
        }
    ) ;
    gpMap.listen(
        "zoomChanged",
        function(){
            //action déclenchée au changement de zoom
        }
    ) ;
}
</script>
```
