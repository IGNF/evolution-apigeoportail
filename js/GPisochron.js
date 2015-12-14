// Open isochron panel
document.getElementById('GPshowIsochronPicto').addEventListener('click', function() {
    document.getElementById('GPadvancedToolsPanel').className = 'GPadvancedToolsPanelHidden';
    document.getElementById('GPisochronPanel').className = 'GPadvancedToolVisible';
});

// Close isochron panel
document.getElementById('GPisochronPanelClose').addEventListener('click', function() {
    document.getElementById('GPisochronPanel').className = 'GPadvancedToolHidden';
    document.getElementById('GPadvancedToolsPanel').className = 'GPadvancedToolsPanelVisible';
});

// Manage autocomplete list appearance
document.getElementById('GPisochronOrigin').addEventListener('keyup', function(e) {
    var charCode = e.which || e.keyCode;
    if (charCode === 13 || charCode === 10) {
        return;
    }
    if (document.getElementById('GPisochronOrigin').value.length>2) {
        document.getElementById('GPisochronAutoCompleteList').style.display = 'block';
    } else {
        document.getElementById('GPisochronAutoCompleteList').style.display = 'none';
    }
});
document.getElementById('GPisochronOrigin').addEventListener('blur', function(e) {
    document.getElementById('GPisochronAutoCompleteList').style.display = 'none';
});

// Click on map pointer
document.getElementsByClassName('GPisochronOriginPointerImg')[0].addEventListener('click', function(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (document.getElementById('GPisochronOriginPointer').checked) {
        document.getElementById('GPisochronOriginCoords').value = '';
        document.getElementById('GPisochronForm').className = '';
        document.getElementById('GPisochronOriginPointer').checked = false;
        document.getElementById('GPisochronOrigin').className = 'GPisochronOriginVisible';
        document.getElementById('GPisochronOriginCoords').className = 'GPisochronOriginHidden';
    } else {
        document.getElementById('GPisochronOriginCoords').value = 'Pointer un lieu sur la carte';
        document.getElementById('GPisochronForm').className = 'GPisochronFormMini';
        document.getElementById('GPisochronOriginPointer').checked = true;
        document.getElementById('GPisochronOrigin').className = 'GPisochronOriginHidden';
        document.getElementById('GPisochronOriginCoords').className = 'GPisochronOriginVisible';
    }
});

document.getElementById('GPisochronOriginLabel').addEventListener('click', function() {
    document.getElementById('GPisochronOriginCoords').value = '';
    document.getElementById('GPisochronForm').className = '';
    document.getElementById('GPisochronOriginPointer').checked = false;
    document.getElementById('GPisochronOrigin').className = 'GPisochronOriginVisible';
    document.getElementById('GPisochronOriginCoords').className = 'GPisochronOriginHidden';
});

// Manage map pointing => TODO adapter à une vraie map JS
document.getElementById('viewerDiv').addEventListener('click', function(evt) {
   if (!document.getElementById('GPisochronOriginPointer').checked) {
       return;
   }
   document.getElementById('GPisochronOriginCoords').value = evt.clientX+'.00,'+evt.clientY+'.00';
   document.getElementById('GPisochronForm').className = '';
   document.getElementById('GPisochronOriginPointer').checked = false;
});

// Alternative choice betwen isochron and isodistance
document.getElementById('GPisochronChoiceAltChron').addEventListener('change', function() {
   document.getElementById('GPisochronValueChron').className = 'GPflexInput';
   document.getElementById('GPisochronValueDist').className = 'GPisochronValueHidden';
});
document.getElementById('GPisochronChoiceAltDist').addEventListener('change', function() {
   document.getElementById('GPisochronValueDist').className = 'GPflexInput';
   document.getElementById('GPisochronValueChron').className = 'GPisochronValueHidden';
});

// Link alternative text choice to real choice
document.getElementById('GPisochronChoiceAltChronTxt').addEventListener('click', function() {
    document.getElementById('GPisochronChoiceAltChron').click();
});
document.getElementById('GPisochronChoiceAltDistTxt').addEventListener('click', function() {
    document.getElementById('GPisochronChoiceAltDist').click();
});

// Change origin label when changing direction
document.getElementById('GPisochronDirectionSelect').addEventListener('change', function() {
   var direction = document.getElementById('GPisochronDirectionSelect');
   document.getElementById('GPisochronOriginLabel').innerHTML = direction.options[direction.selectedIndex].text;
});

// Submit the isochron search
document.forms['GPisochronForm'].addEventListener('submit', function(e) {
    e.preventDefault();
    // TODO lancer la requête afficher les résultats
    return false;
});