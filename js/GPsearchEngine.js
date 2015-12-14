// Close all results and panels when minimizing the widget
document.getElementById('GPshowSearchEnginePicto').addEventListener('click', function() {
    document.getElementById('GPautoCompleteList').style.display = 'none';
    document.getElementById('GPgeocodeResultsList').style.display = 'none';
    document.getElementById('GPshowAdvancedSearch').style.display = null;
    document.getElementById('GPadvancedSearchPanel').style.display = 'none';
    document.querySelector('#GPsearchInput input').disabled = false;
});

// Manage autocomplete list appearance
document.querySelector('#GPsearchInput input').addEventListener('keyup', function(e) {
    var charCode = e.which || e.keyCode;
    if (charCode === 13 || charCode === 10) {
        return;
    }
    document.getElementById('GPgeocodeResultsList').style.display = 'none';
    if (document.querySelector('#GPsearchInput input').value.length>2) {
        document.getElementById('GPautoCompleteList').style.display = 'block';
    } else {
        document.getElementById('GPautoCompleteList').style.display = 'none';
    }
});
document.querySelector('#GPsearchInput input').addEventListener('blur', function(e) {
    document.getElementById('GPautoCompleteList').style.display = 'none';
});

// Reset input
document.getElementById('GPsearchInputReset').addEventListener('click', function() {
    document.querySelector('#GPsearchInput input').value = '';
    document.getElementById('GPautoCompleteList').style.display = 'none';
    document.getElementById('GPgeocodeResultsList').style.display = 'none';
});

// Open geocode results panel when submitting the input
document.forms['GPsearchInput'].addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('GPgeocodeResultsList').style.display = 'block';
    document.querySelector('#GPsearchInput input').blur();
    return false;
});

// Close geocode results panel
document.getElementById('GPgeocodeResultsClose').addEventListener('click', function() {
    document.getElementById('GPgeocodeResultsList').style.display = 'none'; 
});

// Open advanced search
document.getElementById('GPshowAdvancedSearch').addEventListener('click', function() {
    document.querySelector('#GPsearchInput input').disabled = true;
    document.getElementById('GPautoCompleteList').style.display = 'none';
    document.getElementById('GPgeocodeResultsList').style.display = 'none';
    document.getElementById('GPshowAdvancedSearch').style.display = 'none';
    document.getElementById('GPadvancedSearchPanel').style.display = 'inline-block';
});

// Close advanced search
document.getElementById('GPadvancedSearchClose').addEventListener('click', function() {
    document.querySelector('#GPsearchInput input').disabled = false;
    document.getElementById('GPgeocodeResultsList').style.display = 'none';
    document.getElementById('GPshowAdvancedSearch').style.display = 'inline-block';
    document.getElementById('GPadvancedSearchPanel').style.display = 'none';
});

// Open geocode results panel when submitting the advanced search
document.forms['GPadvancedSearchForm'].addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('GPgeocodeResultsList').style.display = 'block';
    document.querySelector('#GPsearchInput input').blur();
    return false;
});
