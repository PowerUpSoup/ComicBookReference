function CloseEventListener() {

}

function populateInformationPanel(responseJson, searchOption, identifier) {
    if (searchOption == "Character") {
        $('.comic-info-overlay-content').append(
            `<h2>${responseJson.results[identifier].name}</h2>
            <img src="${responseJson.results[identifier].image.original_url}>
            <p><b>Aliases:</b> ${responseJson.results[identifier].aliases}</p>
            `
        )
    } else if (searchOption == "Issue") {
        $('.comic-info-overlay-content').append(
            
            )
    } else if (searchOption == "Story Arc") {
        $('.comic-info-overlay-content').append(
            
            )
    }
}

function searchResultsEventListener(responseJson, searchOption) {
    $('.search-item').on('click', event => {
        console.log($('.search-item').value);
        console.log("search-item clicked");
        console.log(identifier);
        $('header').addClass("blur");
        $('#search-options').addClass("blur");
        $('#comic-search-list').addClass("blur");
        populateInformationPanel(responseJson, searchOption, identifier);    
        $('#comic-info-overlay').removeClass("hidden");
    })
}

function populateSearchResults(responseJson, searchOption) {
    $('#search-results').empty();
    console.log(responseJson);
    if (searchOption == "Character") {
        for (i = 0; i < responseJson.results.length; i++) {
            $('#search-results').append(
                `<div class="search-item" id="${i}">
                    <img src="${responseJson.results[i].image.icon_url}" alt="thumbnail featuring ${responseJson.results[i].name}">
                <li>
                    <h3>${responseJson.results[i].name}</h3>
                    <h4>${responseJson.results[i].real_name}</h4>
                </li>
            </div>`
            )
        }
    } else if (searchOption == "Issue") {
        for (i = 0; i < responseJson.results.length; i++) {
            $('#search-results').append(
                `<div class="search-item" id="${i}">
                    <img src="${responseJson.results[i].image.icon_url}" alt="thumbnail featuring ${responseJson.results[i].name}">
                <li>
                    <h3>${responseJson.results[i].name}</h3>
                    <h4>${responseJson.results[i].volume.name}</h4>
                </li>
            </div>`
            )
        }
    } else if (searchOption == "Story Arc") {
        for (i = 0; i < responseJson.results.length; i++) {
            $('#search-results').append(
                `<div class="search-item" id="${i}">
                    <img src="${responseJson.results[i].image.icon_url}" alt="thumbnail featuring ${responseJson.results[i].name}">
                <li>
                    <h3>${responseJson.results[i].name}</h3>
                </li>
            </div>`
            )
        }
    }
$('#search-results').removeClass("hidden");
searchResultsEventListener(responseJson, searchOption);
}

function makeRequestToComicVine(comicVineRequest, searchOption) {
    console.log("Get Request = " + comicVineRequest);
    fetch(`https://cors-anywhere.herokuapp.com/${comicVineRequest}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(responseJson => populateSearchResults(responseJson, searchOption))
        .catch(error => console.log(error));
}

function formatSearchParameters(searchOption, characterEntry) {
    if (searchOption == "Character") {
        let comicVineRequest = "https://comicvine.gamespot.com/api/characters/?api_key=6f149cf016e46702bc7dac438b4b48106b6a0892&filter=name:" + characterEntry + "&format=json";
        makeRequestToComicVine(comicVineRequest, searchOption);
    } else if (searchOption == "Issue") {
        let comicVineRequest = "https://comicvine.gamespot.com/api/issues/?api_key=6f149cf016e46702bc7dac438b4b48106b6a0892&filter=name:" + characterEntry + "&format=json";
        makeRequestToComicVine(comicVineRequest, searchOption);
    } else if (searchOption = "Story Arc") {
        let comicVineRequest = "https://comicvine.gamespot.com/api/story_arcs/?api_key=6f149cf016e46702bc7dac438b4b48106b6a0892&filter=name:" + characterEntry + "&format=json";
        makeRequestToComicVine(comicVineRequest, searchOption);
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