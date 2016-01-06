// Test for reverse geocoding plugin existence 
if (document.getElementById('GPreverseGeocodingPanel')) {
	
	// Open reverse geocoding panel
	document.getElementById('GPshowReverseGeocodingPicto').addEventListener('click', function() {
	    document.getElementById('GPadvancedToolsPanel').className = 'GPadvancedToolsPanelHidden';
	    document.getElementById('GPreverseGeocodingPanel').className = 'GPadvancedToolVisible';
	});
	
	// Close reverse geocoding panel
	document.getElementById('GPreverseGeocodingPanelClose').addEventListener('click', function() {
	    document.getElementById('GPreverseGeocodingPanel').className = 'GPadvancedToolHidden';
	    document.getElementById('GPadvancedToolsPanel').className = 'GPadvancedToolsPanelVisible';
	});
	
	// Submit the reverse geocoding search
	document.forms['GPreverseGeocodingForm'].addEventListener('submit', function(e) {
	    e.preventDefault();
	    // TODO lancer la requête afficher les résultats
	    return false;
	});

}