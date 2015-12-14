---
layout: ol3
title: Coordonnées de la souris
level: 2
order: 000003
api: ol3
---

# Widget d'affichage des coordonnées de la souris (x,y et h)

## Présentation générale

Ce widget permet d'indiquer, dans une carte OL3, les coordonnées de la souris sur la carte avec l'altitude obtenue à partir du [service d'altimétrie du Géoportail](http://api.ign.fr/tech-docs-js/fr/developpeur/alti.html).

Il doit être paramétrable de façon à pouvoir indiquer : 

* une clef d'accès à la plateforme pour l'obtention des altitudes
* les systèmes de coordonnées proposés pour l'affichage
* les coordonnées à afficher (toutes, seulement le z ou seulement (x,y))
* le temps d'immobilité de la souris à partir duquel une requête sera envoyée sur le service d'altimétrie. 


## Spécification détaillée

A venir...

## Ergonomie
    

<div id="viewerDiv">
            
            <div class="ol-zoom">
                <button class="ol-zoom-in" type="button" title="Zoom in">+</button>
                <button class="ol-zoom-out" type="button" title="Zoom out">−</button>
            </div>
            
            <!-- MOUSE POSITION -->
            
            <div id="GPmousePosition">
                
                <!-- Hidden checkbox for minimizing/maximizing -->
                <input type="checkbox" id="GPshowMousePosition" />
                <label for="GPshowMousePosition" id="GPshowMousePositionPicto" title="Afficher les coordonnées du curseur"><span id="GPshowMousePositionOpen"></span></label>
                
                <!-- Mouse position panel -->
                <div id="GPmousePositionPanel">
                    <div class="GPmousePositionPanelHeader">
                        <div class="GPmousePositionPanelTitle">Coordonnées</div>
                        <div id="GPmousePositionPanelClose" title="Fermer le panneau"></div>
                    </div>
                    <!-- Basic infos : coordinates & altitude -->
                    <div id="GPmousePositionBasicPanel">
                        <span class="GPmousePositionLabel">Latitude : </span>
                        <span class="GPmousePositionCoords" id="GPmousePositionLat">0.00</span>
                        <span class="GPmousePositionLabel">Longitude : </span>
                        <span class="GPmousePositionCoords" id="GPmousePositionLon">0.00</span>
                        <!-- Altitude, exists or not depending on developer choice -->
                        <div id="GPmousePositionAltitude">
                            <span class="GPmousePositionLabel">Altitude : </span>
                            <span class="GPmousePositionCoords" id="GPmousePositionAlt">...</span>
                        </div>
                    </div>
                    <!-- Hidden checkbox + label for showing settings -->
                    <input type="checkbox" id="GPshowMousePositionSettings" />
                    <label for="GPshowMousePositionSettings" id="GPshowMousePositionSettingsPicto" class="GPshowMousePositionSettingsPicto" title="Réglages"></label>
                    <!-- Settings : projection system -->
                    <div id="GPmousePositionSettings">
                        <span class="GPmousePositionSettingsLabel">Système de référence</span>
                        <select id="GPmousePositionProjectionSystem" class="GPmousePositionSettingsSelect">
                            <option>Géographique</option>
                            <option>Mercator</option>
                            <option>Lambert 93</option>
                            <option>Lambert II étendu</option>
                        </select>
                        <select id="GPmousePositionProjectionUnits" class="GPmousePositionSettingsSelect">
                            <option>degrés décimaux</option>
                            <option>degrés sexagésimaux</option>
                            <option>radians</option>
                            <option>grades</option>
                        </select>
                    </div>
                </div>
                
            </div>
            
            <!-- Map center localisation (tactile use) -->
            <div id="GPmapCenter">
            </div>
        
</div>

