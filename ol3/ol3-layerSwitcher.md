---
layout: ol3
title: Layer Switcher
level: 2
order: 000001
api: ol3
---

# Widget de gestion de l'empilement des couches pour OL3

## Présentation générale

Ce widget permet à l'utilisateur de gérer l'empilement des couches composant la carte ol.Map et, pour chacune d'elle, d'agir sur la visibilité, l'opacité et d'afficher des informations qui lui sont associées (titre, description, métadonnées, légende).

ce widget peut être positionné par le développeur à n'importe quel endroit de la carte ou de la page HTML via le mécanisme standard des CSS. Cette possibilité est fournie nativement par la classe ol.control.Control.

Il est aussi pourvu d'un mécanisme permettant de maximiser / minimiser son affichage.

## Spécification détaillée

## Ergonomie
    
<div id="viewerDiv">
            
            <div class="ol-zoom">
                <button class="ol-zoom-in" type="button" title="Zoom in">+</button>
                <button class="ol-zoom-out" type="button" title="Zoom out">−</button>
            </div>
            
            <!-- LAYERSWITCHER -->
            
            <div id="GPlayerSwitcher">
                
                <!-- Hidden checkbox for minimizing/maximizing -->
                <input type="checkbox" id="GPshowLayersList" />
                
                <!-- Layers list -->
                <div id="GPlayersList">
                    
                    <!-- Layer entry in layer list -->
                    <div id="GPlayerSwitcher_IDLayer1" class="GPlayerSwitcher_layer outOfRange">
                        <!-- Basic toolbar : visibility / layer name -->
                        <div id="GPbasicTools_IDLayer1" class="GPlayerBasicTools">
                            <input type="checkbox" id="GPvisibility_IDLayer1" checked />
                            <label for="GPvisibility_IDLayer1" id="GPvisibilityPicto_IDLayer1" class="GPlayerVisibility" title="Afficher/masquer la couche"></label>
                            <span id="GPname_IDLayer1" class="GPlayerName" title="Quartiers prioritaires de la ville">Quartiers prioritaires de la ville</span>
                        </div>
                        <!-- Hidden checkbox + label for showing advanced toolbar -->
                        <input type="checkbox" id="GPshowAdvancedTools_IDLayer1" />
                        <label for="GPshowAdvancedTools_IDLayer1" id="GPshowAdvancedToolsPicto_IDLayer1" class="GPshowLayerAdvancedTools" title="Plus d'outils"></label>
                        <!-- Advanced toolbar : layer info / opacity slider / opacity value / removal -->
                        <div id="GPadvancedTools_IDLayer1" class="GPlayerAdvancedTools">
                            <div id="GPinfo_IDLayer1" class="GPlayerInfo" title="Informations/légende"></div>
                            <div id="GPopacity_IDLayer1" class="GPlayerOpacity" title="Opacité"><input id="GPopacityRange_IDLayer1" type="range" value="100" oninput="changeOpacityValue(this);" onchange="changeOpacityValue(this);" /></div>
                            <div class="GPlayerOpacityValue" id="GPopacityValueDiv_IDLayer1"><span id="GPopacityValue_IDLayer1">100</span>%</div>
                            <div id="GPremove_IDLayer1" class="GPlayerRemove" title="Supprimer la couche"></div>
                        </div>
                    </div>
                    
                    <div id="GPlayerSwitcher_IDLayer2" class="GPlayerSwitcher_layer">
                        <div id="GPbasicTools_IDLayer2" class="GPlayerBasicTools">
                            <input type="checkbox" id="GPvisibility_IDLayer2" checked />
                            <label for="GPvisibility_IDLayer2" id="GPvisibilityPicto_IDLayer2" class="GPlayerVisibility" title="Afficher/masquer la couche"></label>
                            <span id="GPname_IDLayer2" class="GPlayerName" title="Quartiers prioritaires de la ville">Cartes IGN</span>
                        </div>
                        <input type="checkbox" id="GPshowAdvancedTools_IDLayer2" />
                        <label for="GPshowAdvancedTools_IDLayer2" id="GPshowAdvancedToolsPicto_IDLayer2" class="GPshowLayerAdvancedTools" title="Plus d'outils"></label>
                        <div id="GPadvancedTools_IDLayer2" class="GPlayerAdvancedTools">
                            <div id="GPinfo_IDLayer2" class="GPlayerInfo" title="Informations/légende"></div>
                            <div id="GPopacity_IDLayer2" class="GPlayerOpacity" title="Opacité"><input id="GPopacityRange_IDLayer2" type="range" value="100" oninput="changeOpacityValue(this);" onchange="changeOpacityValue(this);" /></div>
                            <div class="GPlayerOpacityValue" id="GPopacityValueDiv_IDLayer2"><span id="GPopacityValue_IDLayer2">100</span>%</div>
                            <div id="GPremove_IDLayer2" class="GPlayerRemove" title="Supprimer la couche"></div>
                        </div>
                    </div>
                    
                    <div id="GPlayerSwitcher_IDLayer3" class="GPlayerSwitcher_layer">
                        <div id="GPbasicTools_IDLayer3" class="GPlayerBasicTools">
                            <input type="checkbox" id="GPvisibility_IDLayer3" checked />
                            <label for="GPvisibility_IDLayer3" id="GPvisibilityPicto_IDLayer3" class="GPlayerVisibility" title="Afficher/masquer la couche"></label>
                            <span id="GPname_IDLayer3" class="GPlayerName" title="Quartiers prioritaires de la ville">Photographies aériennes</span>
                        </div>
                        <input type="checkbox" id="GPshowAdvancedTools_IDLayer3" />
                        <label for="GPshowAdvancedTools_IDLayer3" id="GPshowAdvancedToolsPicto_IDLayer3" class="GPshowLayerAdvancedTools" title="Plus d'outils"></label>
                        <div id="GPadvancedTools_IDLayer3" class="GPlayerAdvancedTools">
                            <div id="GPinfo_IDLayer3" class="GPlayerInfo" title="Informations/légende"></div>
                            <div id="GPopacity_IDLayer3" class="GPlayerOpacity" title="Opacité"><input id="GPopacityRange_IDLayer3" type="range" value="100" oninput="changeOpacityValue(this);" onchange="changeOpacityValue(this);" /></div>
                            <div class="GPlayerOpacityValue" id="GPopacityValueDiv_IDLayer3"><span id="GPopacityValue_IDLayer3">100</span>%</div>
                            <div id="GPremove_IDLayer3" class="GPlayerRemove" title="Supprimer la couche"></div>
                        </div>
                    </div>
                    
                </div>
                
                <!-- Label for minimizing/maximizing -->
                <label id="GPshowLayersListPicto" for="GPshowLayersList" title="Afficher/masquer le gestionnaire de couches"><span id="GPshowLayersListOpen"></span><span id="GPshowLayersListClose"></span></label>
                
                <!-- Panel for layer informations : title / description / metadata / legend - to be filled in Javascript -->
                <div id="GPlayerInfoPanel" class="GPlayerInfoPanelClosed">
                    <div id="GPlayerInfoContent">
                        <div id="GPlayerInfoTitle">Photographies aériennes</div>
                        <div id="GPlayerInfoQuicklook" title="Afficher un aperçu de la couche"></div>
                        <div id="GPlayerInfoClose" title="Fermer la fenêtre"></div>
                        <div id="GPlayerInfoDescription">Les photos aériennes sont un super moyen de connaître un territoire. Bon, en vrai, c'est surtout pour triper en allant chercher votre maison et regarder si votre voisin a une piscine.</div>
                        <div id="GPlayerInfoMetadata">
                            <div class="GPlayerInfoSubtitle">Métadonnées</div>
                            <div class="GPlayerInfoLink"><a href="#">http://www.monsite.fr/metadata1</a></div>
                            <div class="GPlayerInfoLink"><a href="#">http://www.monsite.fr/metadata2/j-ai-fait-une-url-super-longue</a></div>
                        </div>
                        <div id="GPlayerInfoLegend">
                            <div class="GPlayerInfoSubtitle">Légende</div>
                            <div class="GPlayerInfoPopup">Du 1/1 au 1/25000</div>
                            <div class="GPlayerInfoPopup">Du 1/25000 au 1/100000</div>
                            <div class="GPlayerInfoLink"><a href="#">Du 1/100000 au 1/8000000</a></div>
                        </div>
                    </div>
                </div>
                
            </div>
        
</div>
