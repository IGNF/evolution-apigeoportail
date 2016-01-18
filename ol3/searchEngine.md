---
layout: ol3
title: Moteur de Recherche
level: 2
order: 000500
api: ol3
---

# Widget de positionnement par Géocodage IGN

## Présentation générale

Ce widget permet de positionner la carte à partir de la saisie d'un localisant dont la position sera retournée par le service de géocodage de l'IGN.

Le widget est paramétrable par le développeur de façon à pouvoir exploiter les différents modes d'accès du service de Géocodage :

* type de localisants (adresses, toponymes, parcelles, ...)
* différentes possibilités de filtrage (attributaire, géographique)

Il peut être proposé en mode recherche simple (un champ texte) ou avancée (choix par l'utilisateur des différents critères de filtrage).

La saisie de localisants peut s'accompagner d'un mode d'autocomplétion s'appuyant sur le service d'autocomplétion de la plateforme Géoportail.

## Spécification détaillée

## Ergonomie
    
<div id="viewerDiv">
            
            <div class="ol-zoom">
                <button class="ol-zoom-in" type="button" title="Zoom in">+</button>
                <button class="ol-zoom-out" type="button" title="Zoom out">−</button>
            </div>
            
            <!-- SEARCH ENGINE -->
            
            <div id="GPsearchEngine" class="GPwidget">
                
                <!-- Hidden checkbox for minimizing/maximizing -->
                <input type="checkbox" id="GPshowSearchEngine" />
                <label for="GPshowSearchEngine" id="GPshowSearchEnginePicto" class="GPshowAdvancedToolPicto" title="Afficher/masquer la recherche par lieux">
                    <span id="GPshowSearchEngineOpen" class="GPshowAdvancedToolOpen"></span>
                </label>
                
                <!-- Simple search input -->
                <form id="GPsearchInput">
                    <input type="text" placeholder="Rechercher un lieu, une adresse" />
                    <div id="GPsearchInputReset"></div>
                </form>
                
                <!-- Advanced search panel -->
                <div id="GPshowAdvancedSearch" class="GPshowAdvancedToolPicto" title="Ouvrir la recherche avancée">
                    <span id="GPshowAdvancedSearchOpen" class="GPshowAdvancedToolOpen"></span>
                </div>
                <div id="GPadvancedSearchPanel" class="GPpanel">
                    <div class="GPpanelHeader">
                        <div class="GPpanelTitle">Recherche avancée</div>
                        <div id="GPadvancedSearchClose" class="GPpanelClose" title="Fermer la recherche avancée"></div>
                    </div>
                    <form id="GPadvancedSearchForm">
                        <div class="GPflexInput">
                            <label class="GPadvancedSearchCodeLabel">Recherche par</label>
                            <select class="GPadvancedSearchCode">
                                <option>Lieux/toponymes</option>
                                <option>Adresses</option>
                                <option>Parcelles cadastrales</option>
                            </select>
                        </div>
                        <!-- Search filters -->
                        <div id="GPadvancedSearchFilters">
                            <!-- Research filters are filled in Javascript depending on developer choice -->
                            <div class="GPflexInput">
                                <label for="GPadvancedSearchFilter1" class="GPadvancedSearchFilterLabel">Rue</label>
                                <input type="text" id="GPadvancedSearchFilter1" class="GPadvancedSearchFilterInput" />
                            </div>
                            <div class="GPflexInput">
                                <label for="GPadvancedSearchFilter2" class="GPadvancedSearchFilterLabel">Code postal</label>
                                <input type="text" id="GPadvancedSearchFilter2" class="GPadvancedSearchFilterInput" />
                            </div>
                            <div class="GPflexInput">
                                <label for="GPadvancedSearchFilter3" class="GPadvancedSearchFilterLabel">Ville</label>
                                <input type="text" id="GPadvancedSearchFilter3" class="GPadvancedSearchFilterInput" />
                            </div>
                        </div>
                        <input type="submit" id="GPadvancedSearchSubmit" class="GPinputSubmit" value="Chercher" />
                    </form>
                </div>
                
                <!-- Autocomplete list -->
                <div id="GPautoCompleteList" class="GPautoCompleteList">
                    <!-- Proposals are dynamically filled in Javascript by autocomplete service -->
                    <div class="GPautoCompleteProposal">17000 La Rochelle</div>
                    <div class="GPautoCompleteProposal">94165 Saint Mandé</div>
                    <div class="GPautoCompleteProposal">Une proposition super longue exprès pour voir ce que ça fait si ça déborde</div>
                    <div class="GPautoCompleteProposal">What else ?</div>
                    <div class="GPautoCompleteProposal">Last and surely least</div>
                </div>
                
                <!-- Geocoding results list -->
                <div id="GPgeocodeResultsList" class="GPpanel">
                    <div class="GPpanelHeader">
                        <div class="GPpanelTitle">Résultats de la recherche</div>
                        <div class="GPpanelClose" id="GPgeocodeResultsClose" title="Fermer la fenêtre de résultats"></div>
                    </div>
                    <div id="GPgeocodeResults">
                        <!-- Results are dynamically filled in Javascript by geocoding service -->
                        <div class="GPautoCompleteProposal">17000 La Rochelle</div>
                        <div class="GPautoCompleteProposal">94165 Saint Mandé</div>
                        <div class="GPautoCompleteProposal">Une proposition super longue exprès pour voir ce que ça fait si ça déborde</div>
                        <div class="GPautoCompleteProposal">What else ?</div>
                        <div class="GPautoCompleteProposal">Result example</div>
                        <div class="GPautoCompleteProposal">Result example</div>
                        <div class="GPautoCompleteProposal">Result example</div>
                        <div class="GPautoCompleteProposal">Result example</div>
                        <div class="GPautoCompleteProposal">Result example</div>
                        <div class="GPautoCompleteProposal">Result example</div>
                        <div class="GPautoCompleteProposal">Result example</div>
                        <div class="GPautoCompleteProposal">Result example</div>
                        <div class="GPautoCompleteProposal">Result example</div>
                        <div class="GPautoCompleteProposal">Result example</div>
                        <div class="GPautoCompleteProposal">Result example</div>
                    </div>
                </div>
                
            </div>
        
</div>
