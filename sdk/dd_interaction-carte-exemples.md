---
layout: ahn
title: Exemples d'utilisation
level: 3
order: 030301
api: ahn
---

# Exemples d'interactions

## Evenement centerChanged

Réception des coordonnées du centre après déplacement de la carte


``` javascript
gpMap = Gp.Map.load(
    //configuration de la carte initiale
    ...
) ;

gpMap.listen( "centerChanged", function(coords){
    console.log(coords) ;
}) ;
```


## Méthode addLayers

Rajout dynamique de couches

``` html
<div id="geoportalMap"></div>
<p>Sélectionner la couche de référence parmi cette liste : </p>

<select id="GpLayer">
    <option value="GEOGRAPHICALGRIDSYSTEMS.MAPS">Cartes</option>
    <option value="ORTHOIMAGERY.ORTHOPHOTOS">Photos</option>
</select>

<button onclick="click()">Valider</button>

<script type="text/javascript">
var gpMap = null;
    
window.onload = function(){
    gpMap = Gp.Map.load(
        //configuration de la carte initiale
        ...
    ) ;

    function click(){
        var liste = document.getElementById("GpLayer");
        var selectedGpLayer = liste.options[liste.seelctdIndex].value;
        gpMap.removeLayers([
            'GEOGRAPHICALGRIDSYSTEMS.MAPS',
            'ORTHOIMAGERY.ORTHOPHOTOS'
        }) ;

        var obj= {} ;
        obj[selectedGpLayer]= {
            opacity : 1
        } ;
        gpMap.addLayers(obj) ;
    }
}
</script>
```


