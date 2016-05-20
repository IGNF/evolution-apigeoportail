---
layout: ol3
title: Geocodage inverse
level: 2
order: 000600
api: ol3
---

# Widget d'utilisation du service géocodage inverse

## Présentation générale

En terme d'utilisation par l'internaute, ce widget permet :

*  une intéraction avec la carte permettant de saisir la zone de recherche du Géocodage inverse
* de lancer la requête
* d'afficher les résultats sur la carte (localisation ponctuelle, associée à une popup contenant les informations attributaires de la réponse)

En terme de mise en oeuvre par le développeur, la création du widget doit permettre de préciser le paramétrage lié au service de géocodage inverse :

* type(s) de localisants impliqués dans les requêtes (toponymes, adresses, ...)
* filtres attributaires éventuels associés aux requêtes


## Spécification détaillée

A venir...

## Ergonomie
    

<div id="viewerDiv">
            
            <div class="ol-zoom">
                <button class="ol-zoom-in" type="button" title="Zoom in">+</button>
                <button class="ol-zoom-out" type="button" title="Zoom out">−</button>
            </div>
            
            <!-- REVERSE GOECODING -->
            
            <div id="GPreverseGeocoding" class="GPwidget">
                
                <!-- Hidden checkbox for minimizing/maximizing -->
                <input type="checkbox" id="GPshowReverseGeocoding" />
                <label for="GPshowReverseGeocoding" id="GPshowReverseGeocodingPicto" class="GPshowAdvancedToolPicto" title="Ouvrir la recherche inverse">
                    <span id="GPshowReverseGeocodingOpen" class="GPshowAdvancedToolOpen"></span>
                </label>
                
                <!-- Reverse geocoding panel -->
                <div id="GPreverseGeocodingPanel" class="GPpanel">
                    <div class="GPpanelHeader">
                        <div class="GPpanelTitle">Recherche inverse</div>
                        <div id="GPreverseGeocodingPanelClose" class="GPpanelClose" title="Fermer le panneau"></div>
                    </div>
                    <form id="GPreverseGeocodingForm">
                        <div class="GPflexInput">
                            <label class="GPreverseGeocodingCodeLabel">Recherche par</label>
                            <select class="GPreverseGeocodingCode">
                                <option>Lieux/toponymes</option>
                                <option>Adresses</option>
                                <option>Parcelles cadastrales</option>
                            </select>
                        </div>
                        <div class="GPflexInput">
                            <label class="GPreverseGeocodingCodeLabel">Délimitation</label>
                            <select class="GPreverseGeocodingCode">
                                <option>Pointer un lieu</option>
                                <option>Dessiner un cercle</option>
                                <option>Dessiner une emprise</option>
                            </select>
                        </div>
                        <!-- Hidden checkbox + label for showing filters -->
                        <input type="checkbox" id="GPshowReverseGeocodingFilters" />
                        <label for="GPshowReverseGeocodingFilters" id="GPshowReverseGeocodingFiltersPicto" class="GPshowMoreOptions GPshowReverseGeocodingFiltersPicto" title="Filtres"></label>
                        <!-- Search filters -->
                        <div id="GPreverseGeocodingFilters">
                            <span class="GPreverseGeocodingFiltersLabel">Filtres de recherche</span>
                            <!-- Research filters are filled in Javascript depending on developer choice -->
                            <div class="GPflexInput">
                                <label for="GPreverseGeocodingFilter1" class="GPreverseGeocodingFilterLabel">Rue</label>
                                <input type="text" id="GPreverseGeocodingFilter1" class="GPreverseGeocodingFilterInput" />
                            </div>
                            <div class="GPflexInput">
                                <label for="GPreverseGeocodingFilter2" class="GPreverseGeocodingFilterLabel">Code postal</label>
                                <input type="text" id="GPreverseGeocodingFilter2" class="GPreverseGeocodingFilterInput" />
                            </div>
                            <div class="GPflexInput">
                                <label for="GPreverseGeocodingFilter3" class="GPreverseGeocodingFilterLabel">Ville</label>
                                <input type="text" id="GPreverseGeocodingFilter3" class="GPreverseGeocodingFilterInput" />
                            </div>
                        </div>
                        <input type="submit" id="GPreverseGeocodingSubmit" class="GPinputSubmit" value="Chercher" />
                    </form>
                </div>
            
            </div>
            
</div>
        

