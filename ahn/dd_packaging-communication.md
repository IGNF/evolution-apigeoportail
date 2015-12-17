---
layout: ahn
title: Packaging
level: 2
order: 030100
api: ahn
---

# Packaging

Le Kit de développement (ou "API Haut Niveau" dans ce document) est disponible sous la forme d'un fichier Javascript disponible pour chaque bibliothèque cartographique supportée.

Ce fichier embarque les codes :

* de l'API Service,
* de la bibliothèque cartographique sous-jacente
* de l'extension Géoportail correspondant à la bibliothèque choisie
* de toutes les fonctionnalités de l'API Haut Niveau décrites dans ce document.

L'API Haut Niveau se charge de faire appel au script de la librairie sous-jacente en fonction du nom du ou des packages AHN chargés. Si le développeur souhaite utiliser une autre version de la bibliothèque, le chargement de celle-ci reste à sa charge et l'API Haut Niveau ne fait pas l'appel à la bibliothèque sous-jacente.


## Utilisation

Le développeur, utilisateur de l'API Haut Niveau, doit intégrer dans sa page :

* le script de l'API Haut Niveau pour la librairie choisie par le développeur.
* la librairie cartographique qui embarque toutes les fonctionnalités cartographiques de base.

Il utilise la fonction Gp.Map.load() pour initialiser la carte avec les paramètres qu'il souhaite.

La fonction est exécutée. Selon la bibliothèque cartographique choisie, l'API Haut Niveau traduit ces paramètres en utilisant la librairie cartographique, l'extension Géoportail associée et l'API Géoportail Services.

La fonction Gp.Map.load() retourne un objet Gp.Map.

Le développeur peut alors intéragir avec la carte en utilisant les méthodes et les évènements disponibles sur cet objet Gp.Map.

Pour une utilisation avancée, il a accès à toutes les méthodes et fonctionnalités de la bibliothèque sous jacente et de ses extensions grace à la méthode getLibMap() de cet objet Gp.Map.

Exemple de structure du code dans la page HTML utilisant l'API Haut Niveau associée avec la biblitohèque OpenLayers 3.


```
<div id="geoportalMap"></div>
<!-- chargement API Haut Niveau -->
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
            // Accès à l'objet "carte" de la librairie sous jacente pour exploiter
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
