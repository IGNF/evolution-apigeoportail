////////////////////////
// OPACITY SLIDER
////////////////////////

/**
 * Function changing the written value of layer opacity when slider is moving
 */
function changeOpacityValue(elt) {
    var layerId = elt.id.substring(elt.id.indexOf('_')+1);
    document.getElementById('GPopacityValue_'+layerId).innerHTML = elt.value;
}

////////////////////////
// LAYER INFORMATIONS
////////////////////////

/**
 * Function managing the layerInfo panel visibility when checking the buttons
 */
function openLayerInfo() {
    
    // Close layer info panel
    if (this.className=='GPlayerInfoOpened') {
        this.className = 'GPlayerInfo';
        document.getElementById('GPlayerInfoPanel').className = 'GPlayerInfoPanelClosed';
        return;
    }
    
    // Open layer info panel
    var layers = document.getElementsByClassName('GPlayerInfoOpened');
    for (var i=0;i<layers.length;i++) {
        layers[i].className = 'GPlayerInfo';
    }
    this.className = 'GPlayerInfoOpened';
    document.getElementById('GPlayerInfoPanel').className = 'GPlayerInfoPanelOpened';
    
}

// Apply informations opening mechanism on layerInfo buttons
var layers = document.getElementsByClassName('GPlayerInfo');
for (var i=0;i<layers.length;i++) {
    layers[i].addEventListener('click',openLayerInfo);
}


// Close layerInfo panel
document.getElementById('GPlayerInfoClose').addEventListener('click', function() {
    document.getElementById('GPlayerInfoPanel').className = 'GPlayerInfoPanelClosed';
    var layers = document.getElementsByClassName('GPlayerInfoOpened');
    for (var i=0;i<layers.length;i++) {
        layers[i].className = 'GPlayerInfo';
    }
});

// Reset layers info when minimizing the layerSwitcher
document.getElementById('GPshowLayersListPicto').addEventListener('click', function() {
   if (document.getElementById('GPshowLayersList').checked) {
        var layers = document.getElementsByClassName('GPlayerInfoOpened');
        for (var i=0;i<layers.length;i++) {
            layers[i].className = 'GPlayerInfo';
        }
        document.getElementById('GPlayerInfoPanel').className = 'GPlayerInfoPanelClosed';
   }
});

////////////////////////
// LAYERS DRAG AND DROP
////////////////////////

var layersList = document.getElementById('GPlayersList');
Sortable.create(layersList,{
    handle: '.GPlayerName',
    ghostClass: 'GPghostLayer',
    animation: 200,
    onEnd: function() {
        // TODO : reordering the layers of the Javascript map object depending on new HTML order
    }
});