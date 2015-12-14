// Latency for altitude request
var timeout;
var timeoutDelay = 500;

/*
 * Detection  test for desktop or tactile
 */
var isDesktop = true;
var userAgent = window.navigator.userAgent.toLowerCase();
if (userAgent.indexOf('iphone')!==-1 || userAgent.indexOf('ipod')!==-1 || userAgent.indexOf('ipad')!==-1 || userAgent.indexOf('android')!==-1 || userAgent.indexOf('mobile')!==-1 || userAgent.indexOf('blackberry')!==-1 || userAgent.indexOf('tablet')!==-1 || userAgent.indexOf('phone')!==-1 || userAgent.indexOf('touch')!==-1 ) {
	isDesktop = false;
}
if (userAgent.indexOf('msie')!== -1 || userAgent.indexOf('trident')!==-1) {
	isDesktop = true;
}

// Link panel close / visibility checkbox
document.getElementById('GPmousePositionPanelClose').addEventListener('click', function() {
   document.getElementById('GPshowMousePositionPicto').click();
});

// Show map center localisation if panel opened and tactile support
document.getElementById('GPshowMousePositionPicto').addEventListener('click', function() {
    var mapCenterClass = '';
    if (!document.getElementById('GPshowMousePosition').checked && !isDesktop) {
        mapCenterClass = 'GPmapCenterVisible'
    }
    document.getElementById('GPmapCenter').className = mapCenterClass;
});

/*
 * Calling coords update when moving cursor
 */
if (isDesktop) {
    // Desktop : detect mouse move
    document.getElementById('viewerDiv').addEventListener('mousemove', function(evt) {
        var mousePos = {
            x: evt.clientX,
            y: evt.clientY
        }
        displayCoords(mousePos);
    });
} else {
    // Tactile : detect map move
    // TODO : brancher le déclenchement de displayCoords(null) par l'évènement de mouvement de la carte
}

/**
 * Function displaying coordinates and altitude from cursor position (desktop) or map center (tactile)
 */
function displayCoords(mousePos) {
    
    if (!document.getElementById('GPshowMousePosition').checked) {
        return;
    }
    
    clearTimeout(timeout);
    document.getElementById('GPmousePositionAlt').innerHTML = '...';
    
    // Compute coords in case of cursor position (desktop)
    if (isDesktop) {
        // TODO : brancher la conversion coords souris / coords map JS
        document.getElementById('GPmousePositionLat').innerHTML = mousePos.x+'.00';
        document.getElementById('GPmousePositionLon').innerHTML = mousePos.y+'.00';
        // If no altitude panel, don't call altitude request
        if (document.getElementById('GPmousePositionAltitude')) {
            timeout = setTimeout(function(){
                document.getElementById('GPmousePositionAlt').innerHTML = (Math.round(Math.random()*1000000)/100)+' m';
            }, timeoutDelay);
        }
    }
    
    // Compute coords in case of map center (tactile)
    else {
        // TODO : brancher la récupération des coordonnées du centre de la map JS
    }
}

// Updating display when changing coords system
document.getElementById('GPmousePositionProjectionSystem').addEventListener('change', function() {
   // TODO : à remplir 
});

// Updating display when changing coords units
document.getElementById('GPmousePositionProjectionUnits').addEventListener('change', function() {
   // TODO : à remplir 
});