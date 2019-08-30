function instructionsCloseEventListener() {

}

function displayPlantCareInstructions() {

}

function searchResultsEventListener() {

}

function formatSearchParameters() {

}

function makeRequestToTrefle() {

}

function populateSearchResults() {

}

function userInputEventListener() {
    $('form').submit(event => {
        event.preventDefault();
        searchInput = document.getElementById("search-by-input").value;
        formatSearchParameters();
    });
}

function plantListEventListener() {
    
}

function alphaEventListener() {
    
}

function watchForm() {
    
}

$(function() {
    console.log('App loaded and waining for user input!');
    watchForm();
} )