let search_result = []; // Global Array for the Search Result

window.onload = function() {
    query_params = get_query_string_parameters(); // Retrieving parameters from the user
    let title_search, actor_search, director_search, genre_search, country_search = "", moviesArray, movie; // Creating an empty variable for each possible user input

    title_search = (query_params.film_title != null) ? String(query_params.film_title).toLowerCase() : false; // TITLE - Validating that the parameter is not 'null' and updating it to reflect the users query
    actor_search = (query_params.actor != null) ? String(query_params.actor).toLowerCase() : false; // ACTOR - Validating that the parameter is not 'null' and updating it to reflect the users query
    director_search = (query_params.director != null) ? String(query_params.director).toLowerCase() : false; // DIRECTOR - Validating that the parameter is not 'null' and updating it to reflect the users query
    genre_search = (query_params.genre != null) ? String(query_params.genre).toLowerCase() : false; // GENRE - Validating that the parameter is not 'null' and updating it to reflect the users query
    country_search = (query_params.country != null) ? String(query_params.country).toLowerCase() : false; // COUNTRY - Validating that the parameter is not 'null' and updating it to reflect the users query

    moviesArray = sortAfterRating();

    for(movie in moviesArray) { // For-loop iterating through the JSON-file movies_object.js
        let title = String(moviesArray[movie].movieId.otitle).toLowerCase(), // Retrieving title from the JSON-file
            actor = (moviesArray[movie].movieId.folk != null) ? (moviesArray[movie].movieId.folk).toLowerCase() : "", // Retrieving actors from the JSON-file, and seperating by tilde
            director = (moviesArray[movie].movieId.dir != null) ? (moviesArray[movie].movieId.dir).toLowerCase() : "", // Retrieving directors from the JSON-file, and seperating by tilde
            genre = (genres_object[moviesArray[movie].movieId.id] != null) ? genres_object[moviesArray[movie].movieId.id].join("~").toLowerCase() : "", // Retrieving genres from the JSON-file, and seperating by tilde
            country = String(country_object[moviesArray[movie].movieId.country]).toLowerCase(); // Retrieving country from the JSON-file

        switch(true) { // If any of the following statements is inValid, break the switch-statement and continue iterating through the rest of the JSON-file
            case  isValid(title, title_search): break; // Checking if title is inValid
            case  isValid(actor, actor_search): break; // Checking if actor is inValid
            case  isValid(director, director_search): break; // Checking if director is inValid
            case  isValid(genre, genre_search): break; // Checking if genre is inValid
            case  isValid(country, country_search): break; // Checking if country is inValid
            default : search_result.push(moviesArray[movie].movieId); // If all the above statements are valid add the movie to our search_result
        }
    }
    display(search_result);
};

function isValid(x, y) { // Function called to check if a search parameter 'y' is inValid
    return y != "" && !(x.includes(y)); // If not it is valid

}
function display(array) {
    let count,ul,number,colums, length;
    count = document.querySelector("#count");
    count.style.marginBottom = "10";
    count.innerHTML = `Antall: ${array.length}`;
    ul = document.querySelector("#res_list");
    number = array.length;
    const movieCoverWidth = 133;
    const width = Math.floor((ul.offsetWidth - parseInt(window.getComputedStyle(ul).paddingLeft.replace("px",""))) / movieCoverWidth);
    /*if(array.length % width != 0 && array.length > width) {
        colums = Math.round(array.length/width);
        number = //(colums > 4) ? splitToPages:
            array.length;
    }*/
    length = ((array.length > number) ? number : array.length);
    writeMovieHTML(array, ul, array.length);

}

/**
 * Toggles a class on the advanced search to show and hide it.
 */
function showAdvancedSearch() {
    const adv = document.querySelector("#adv_box");
    adv.classList.toggle("close");
}
