function closeEventListener() {
    //sets up the event listener for closing the information panel and returing to the search list
    $('.information-close-window').on('click', event => {
        $('header').removeClass("blur");
        $('#search-options').removeClass("blur");
        $('#comic-search-list').removeClass("blur");
        $('#comic-info-overlay').addClass("hidden");
        $('.comic-info-overlay-content').empty();
    })
}

//disables all links in the bio of the information panel, because the links provided by the API tend to break
function cleanAnchorsFromInformationPanel() {
    $('.comic-info-overlay-content').find('a').each(function (e) {
        $(this).addClass('disabled');
    })
}

function populateInformationPanel(responseJson, searchOption, searchItemID) {
    //builds content for the information display panel based on the search parameter
    if (searchOption == "Character") {
        $('.comic-info-overlay-content').append(
            `<h2>${responseJson.results[searchItemID].name}</h2>
            <img src=${responseJson.results[searchItemID].image.original_url}>
            <p><b>Aliases:</b> ${responseJson.results[searchItemID].aliases}</p>
            <p><b>First Appearance: </b>${responseJson.results[searchItemID].first_appeared_in_issue.name}</p>
            <p><b>Bio: </b>${responseJson.results[searchItemID].description}</p>
            <button type="button" class="information-close-window">Close</button>
            `
        )
    } else if (searchOption == "Issue") {
        $('.comic-info-overlay-content').append(
            `<h2>${responseJson.results[searchItemID].name}</h2>
            <img src=${responseJson.results[searchItemID].image.original_url}>
            <p><b>Cover Date:</b> ${responseJson.results[searchItemID].cover_date}</p>
            <p>${responseJson.results[searchItemID].description}</p>
            <button type="button" class="information-close-window">Close</button>
            `
        )
    } else if (searchOption == "Story Arc") {
        $('.comic-info-overlay-content').append(
            `<h2>${responseJson.results[searchItemID].name}</h2>
            <img src=${responseJson.results[searchItemID].image.original_url}>
            <p>${responseJson.results[searchItemID].description}</p>
            <button type="button" class="information-close-window">Close</button>
            `
        )
    }
    closeEventListener();
}

function searchResultsEventListener(responseJson, searchOption) {
    //set up an event listener for the search menu items
    $('.search-item').on('click', event => {
        let searchItemID = event.currentTarget.attributes.id.value;
        $('header').addClass("blur");
        $('#search-options').addClass("blur");
        $('#comic-search-list').addClass("blur");
        populateInformationPanel(responseJson, searchOption, searchItemID);
        cleanAnchorsFromInformationPanel();
        $('#comic-info-overlay').removeClass("hidden");
    })
}

function populateSearchResults(responseJson, searchOption) {
    //clears the search list upon a second search
    $('#search-results').empty();
    //builds different search list items based on the search parameters
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

function displayAlertMessage() {
    $('.search-results-error').removeClass("hidden");
    $('.error-message-close').on('click', event => {
        console.log("the button was clicked");
        $('.search-results-error').addClass("hidden");
    })
}

//loop through everything in the responseJson object and find all NULL values, turn them to empty strings
function cleanSearchResults(responseJson, searchOption) {
    console.log(responseJson);
    for (i = 0; i < responseJson.results.length; i++) {
        if (responseJson.results.bio === null) {
            responseJson.results.bio = "There's no bio available for this character."
        }
        if (responseJson.results[i].name === null) {
            responseJson.results[i].name = " ";
        }
        if (responseJson.results[i].real_name === null) {
            responseJson.results[i].real_name = " ";
        }
        if (responseJson.results[i].aliases === null) {
            responseJson.results[i].aliases = " ";
        }
        if (searchOption != "Issue") {
            if (responseJson.results[i].first_appeared_in_issue !== null) {
                if (responseJson.results[i].first_appeared_in_issue.name === null) {
                    responseJson.results[i].first_appeared_in_issue.name = " ";
                } else {
                    responseJson.results[i].first_appeared_in_issue = " ";
                }
            }
        }
        if (responseJson.results[i].cover_date === null) {
            responseJson.results[i].cover_date = " ";
        }
    }
    if (responseJson.results.length === 0) {
        displayAlertMessage();
    }
    populateSearchResults(responseJson, searchOption);
}


function makeRequestToComicVine(comicVineRequest, searchOption) {
    //This fetch request routes through the Heroku app to circumvent the problem of CORS blocking
    //Then it posts the response as a JSON object the app can parse
    fetch(`https://cors-anywhere.herokuapp.com/${comicVineRequest}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(responseJson => cleanSearchResults(responseJson, searchOption))
        .catch(error => console.log(error));
}

function formatSearchParameters(searchOption, characterEntry) {
    //Differentiate between the three search parameters
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
    //Set up event listeners for the search menu
    $('form').submit(event => {
        event.preventDefault();
        let searchOption = document.querySelector('input[name="search-resource"]:checked').value;
        let characterEntry = document.getElementById("search-by-input").value;
        formatSearchParameters(searchOption, characterEntry);
    });
}

$(function () {
    watchForm();
})


