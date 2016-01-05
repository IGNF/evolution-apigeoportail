---
layout: ahn
title: Packaging
level: 2
order: 020100
api: ahn
---

# Packaging

Le Kit de développement (ou SDK) est disponible sous la forme d'un fichier JavaScript disponible pour chacune des bibliothèques cartographiques supportées (Leaflet ou Openlayers).

Ce fichier embarque les codes :

* de la bibliothèque d'accès JavaScript aux ressources du Géoportail,
* de la bibliothèque cartographique sous-jacente
* de l'extension Géoportail correspondant à la bibliothèque choisie
* de toutes les fonctionnalités de l'API Haut Niveau décrites dans ce document.

Le Kit de développement se charge de faire appel au script de la bibliothèque sous-jacente en fonction du nom du ou des packages SDK chargés. Si le développeur souhaite utiliser une autre version de la bibliothèque, le chargement de celle-ci reste à sa charge et le Kit de développement ne fait pas l'appel à la bibliothèque sous-jacente.


## Utilisation

Le développeur, utilisateur du Kit de développement, doit intégrer dans sa page :

* le script du Kit de développement correspondant à la librairie choisie par le développeur.
* la bibliothèque cartographique qui embarque toutes les fonctionnalités cartographiques de base.

Il utilise la fonction Gp.Map.load() pour initialiser la carte avec les paramètres qu'il souhaite.

La fonction est exécutée. Le Kit de développement traduit ces paramètres en utilisant la bibliothèque cartographique choisie, l'extension Géoportail associée et la bibliothèque d'accès JavaScript aux ressources du Géoportail.

La fonction Gp.Map.load() retourne un objet Gp.Map.

Le développeur peut alors intéragir avec la carte en utilisant les méthodes et les évènements disponibles sur cet objet Gp.Map.

Pour une utilisation avancée, il a accès à toutes les méthodes et fonctionnalités de la librairie sous jacente et de ses extensions grace à la méthode getLibMap() de cet objet Gp.Map.

Exemple de structure du code dans la page HTML utilisant le Kit de développement associée avec la bibliothèque OpenLayers 3.


```
<div id="geoportalMap"></div>
<!-- chargement SDK -->
<script type="text/javascript" src=" http://api.ign.fr/geoportail/api/GpAHN.js" />
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
