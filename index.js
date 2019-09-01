function CloseEventListener() {

}


function searchResultsEventListener() {

}

function populateSearchResults(responseJson) {
    console.log(responseJson);

}

function makeRequestToComicVine(comicVineRequest) {
    fetch(comicVineRequest)
        .then(response => response.json())
        .then(responseJson => populateSearchResults(responseJson))
        .catch(error => console.log(error));
}

function formatSearchParameters(searchOption, characterEntry) {
    if (searchOption == "Character") {
        let comicVineRequest = "https://comicvine.gamespot.com/api/characters/?api_key=6f149cf016e46702bc7dac438b4b48106b6a0892&filter=name:" + characterEntry + "&format=json";
        makeRequestToComicVine(comicVineRequest);
    } else if (searchOption == "Issue") {
        let comicVineRequest = "https://comicvine.gamespot.com/api/issues/?api_key=6f149cf016e46702bc7dac438b4b48106b6a0892&filter=name:" + characterEntry + "&format=json";
        makeRequestToComicVine(comicVineRequest);
    } else if (searchOption = "Story Arc") {
        let comicVineRequest = "https://comicvine.gamespot.com/api/story_arcs/?api_key=6f149cf016e46702bc7dac438b4b48106b6a0892&filter=name:" + characterEntry + "&format=json";
        makeRequestToComicVine(comicVineRequest);
    }
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        let searchOption = document.querySelector('input[name="search-resource"]:checked').value;
        let characterEntry = document.getElementById("search-by-input").value;
        console.log(searchOption);
        console.log(characterEntry);
        formatSearchParameters(searchOption, characterEntry);
    });
}

$(function () {
    console.log('App loaded and waining for user input!');
    watchForm();
})