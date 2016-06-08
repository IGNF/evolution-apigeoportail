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

## Mise en oeuvre

La mise en oeuvre de cette fonctionnalité est effective et est <a href="https://github.com/IGNF/geoportal-extensions/blob/master/README-ol3.md#WMTS" target="_blank">décrite ici</a>.

