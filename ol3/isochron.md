---
layout: ol3
title: Calcul d'isochrones
level: 2
order: 000701
api: ol3
---

# Widget de calcul et d'affichage d'isochrones / isodistances

## Présentation générale

### Utilisation par l'internaute

Le widget se présente sous la forme d'un formulaire (minimisable / maximisable) permettant de saisir les paramètres nécessaires au lancement d'un calcul d'isochrones (point de départ ou d'arrivée, mode de calcul, ...).

La saisie du point de départ ou d'arrivée doit pouvoir se faire par intéraction avec la carte, par géocodage (géocodeur IGN) ou par saisie directe de coordonnées.

Une fois l'isochrone/distance obtenue celle-ci est affichée sur la carte.

### Utilisation par un développeur

la création du widget permet au développeur :

* d'accrocher les différents éléments graphiques (formulaire de saisie) à la page html via le mécanisme standard des CSS,
* de rendre visibles ou non des élements du formulaire à l'internaute,
* d'activer / désactiver certains modes de saisie des points pour le calcul,
* de fixer des valeurs par défaut de certains paramètres de calcul d'iso.

Le développeur peut agir sur l'état (maximisé / minimisé) du widget

## Spécification détaillée

A venir...

## Ergonomie
    

<div id="viewerDiv">
            
            <div class="ol-zoom">
                <button class="ol-zoom-in" type="button" title="Zoom in">+</button>
                <button class="ol-zoom-out" type="button" title="Zoom out">−</button>
            </div>
            
            <!-- ADVANCED TOOLS PANEL -->
            
            <div id="GPadvancedToolsPanel" class="GPadvancedToolsPanelVisible">
                <div id="GPshowIsochronPicto" class="GPshowAdvancedToolPicto" title="Ouvrir le calcul d'isochrones">
                    <span id="GPshowIsochronOpen" class="GPshowAdvancedToolOpen"></span>
                </div>
            </div>
            
            <!-- ADVANCED TOOLS : ISOCHRON -->
            
            <div id="GPisochronPanel" class="GPwidget GPpanel GPadvancedToolHidden">
            
                <div class="GPpanelHeader">
                    <div class="GPpanelTitle">Calcul d'isochrone</div>
                    <div id="GPisochronPanelClose" class="GPpanelClose" title="Fermer le panneau"></div>
                </div>
                
                <form id="GPisochronForm">
                    
                    <!-- Origin input -->
                    <div class="GPflexInput">
                        <label id="GPisochronOriginLabel" for="GPisochronOrigin">Départ</label>
                        <input id="GPisochronOrigin" class="GPisochronOriginVisible" type="text" placeholder="Saisir une adresse" />
                        <input id="GPisochronOriginCoords" class="GPisochronOriginHidden" type="text" disabled />
                        <input id="GPisochronOriginPointer" type="checkbox" />
                        <label class="GPisochronOriginPointerImg" for="GPisochronOriginPointer" title="Pointer un lieu sur la carte"></label>
                    </div>
                    
                    <!-- Autocomplete list -->
                    <div id="GPisochronAutoCompleteList" class="GPadvancedAutoCompleteList">
                        <!-- Proposals are dynamically filled in Javascript by autocomplete service -->
                        <div class="GPautoCompleteProposal">17000 La Rochelle</div>
                        <div class="GPautoCompleteProposal">94165 Saint Mandé</div>
                        <div class="GPautoCompleteProposal">Une proposition super longue exprès pour voir ce que ça fait si ça déborde</div>
                        <div class="GPautoCompleteProposal">What else ?</div>
                        <div class="GPautoCompleteProposal">Last and surely least</div>
                    </div>
                    
                    <!-- Choice isochron / isodistance -->
                    <div id="GPisochronChoice">
                        <div class="GPisochronChoiceAlt">
                            <input type="radio" id="GPisochronChoiceAltChron" name="GPisochronChoiceMode" value="isochron" checked>
                            <label class="GPisochronChoiceAltImg" for="GPisochronChoiceAltChron"></label>
                            <span id="GPisochronChoiceAltChronTxt">isochrone</span>
                        </div>
                        <div class="GPisochronChoiceAlt">
                            <input type="radio" id="GPisochronChoiceAltDist" name="GPisochronChoiceMode" value="isodistance">
                            <label class="GPisochronChoiceAltImg" for="GPisochronChoiceAltDist"></label>
                            <span id="GPisochronChoiceAltDistTxt">isodistance</span>
                        </div>
                    </div>
                    
                    <!-- Isochron input values -->
                    <div id="GPisochronValueChron" class="GPflexInput">
                        <label id="GPisochronValueChronLabel" for="GPisochronValueChronInput">Temps</label>
                        <input id="GPisochronValueChronInput1" type="number" value="0" min="0" step="1"/>
                        <label>h</label>
                        <input id="GPisochronValueChronInput2" type="number" value="0" min="0" max="59" step="1"/>
                        <label>min</label>
                    </div>
                    
                    <!-- Isodistance input values -->
                    <div id="GPisochronValueDist" class="GPisochronValueHidden">
                        <label id="GPisochronValueDistLabel" for="GPisochronValueDistInput">Distance</label>
                        <input id="GPisochronValueDistInput" type="number" value="0" min="0" step="any" />
                        <label>km</label>
                    </div>
                    
                    <!-- Computation modes -->
                    <div id="GPisochronModeChoice">
                        <div id="GPisochronTransportChoice">
                            <span class="GPisochronModeLabel">Mode de transport</span>
                            <input type="radio" id="GPisochronTransportCar" name="GPisochronTransport" value="car" checked>
                            <label class="GPisochronTransportImg" for="GPisochronTransportCar" title="Voiture"></label>
                            <input type="radio" id="GPisochronTransportPedestrian" name="GPisochronTransport" value="pedestrian">
                            <label class="GPisochronTransportImg" for="GPisochronTransportPedestrian" title="Piéton"></label>
                        </div>
                        <div id="GPisochronDirectionChoice">
                            <span class="GPisochronModeLabel">Sens de parcours</span>
                            <select id="GPisochronDirectionSelect" class="GPinputSelect">
                                <option>Départ</option>
                                <option>Arrivée</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Input button -->
                    <input type="submit" id="GPisochronSubmit" class="GPinputSubmit" value="Calculer" />
                    
                </form>
                
            </div>
            
</div>
        
