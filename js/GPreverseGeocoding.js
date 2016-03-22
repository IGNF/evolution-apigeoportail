/*
 * Test for reverse geocoding plugin existence 
 */
if (document.getElementById('GPreverseGeocodingPanel')) {
	
    /*
     * Link panel close / visibility checkbox
     */
	document.getElementById('GPreverseGeocodingPanelClose').addEventListener('click', function() {
	   document.getElementById('GPshowReverseGeocodingPicto').click();
	});
    
	/*
     * Submit the reverse geocoding search
     * TODO à remplir
     */
	document.forms['GPreverseGeocodingForm'].addEventListener('submit', function(e) {
        
	    e.preventDefault();
        
	    // TODO lancer la requête => callback : afficher les résultats
        
	    return false;
        
	});

}