
let search_result = []; // Global Array for the Search Result

window.onload = function () {
    query_params = get_query_string_parameters(); // Retrieving parameters from the user
    let title_search, actor_search, director_search, genre_search, country_search, moviesArray, movie; // Creating an empty variable for each possible user input

    title_search = (query_params.film_title != null) ? String(query_params.film_title).toLowerCase() : ""; // TITLE - Validating that the parameter is not 'null' and updating it to reflect the users query
    actor_search = (query_params.actor != null) ? String(query_params.actor).toLowerCase().split(", ") : ""; // ACTOR - Validating that the parameter is not 'null' and updating it to reflect the users query
    director_search = (query_params.director != null) ? String(query_params.director).toLowerCase().split(", ") : ""; // DIRECTOR - Validating that the parameter is not 'null' and updating it to reflect the users query
    genre_search = (query_params.genre != null) ? String(query_params.genre).toLowerCase().split(", ") : ""; // GENRE - Validating that the parameter is not 'null' and updating it to reflect the users query
    country_search = (query_params.country != null) ? String(query_params.country).toLowerCase().split(", ") : ""; // COUNTRY - Validating that the parameter is not 'null' and updating it to reflect the users query

    moviesArray = sortAfterRating();

    for (movie in moviesArray) { // For-loop iterating through the JSON-file movies_object.js
        let title = String(moviesArray[movie].movieId.otitle).toLowerCase(), // Retrieving title from the JSON-file
            actor = (moviesArray[movie].movieId.folk != null) ? (moviesArray[movie].movieId.folk).toLowerCase() : "", // Retrieving actors from the JSON-file, and seperating by tilde
            director = (moviesArray[movie].movieId.dir != null) ? (moviesArray[movie].movieId.dir).toLowerCase() : "", // Retrieving directors from the JSON-file, and seperating by tilde
            genre = (genres_object[moviesArray[movie].movieId.id] != null) ? genres_object[moviesArray[movie].movieId.id].join("~").toLowerCase() : "", // Retrieving genres from the JSON-file, and seperating by tilde
            country = (moviesArray[movie].movieId.country != (null && undefined)) ? String(showCountryName(moviesArray[movie].movieId.country)).toLowerCase() : ""; // Retrieving country from the JSON-file

        switch (true) { // If any of the following statements is inValid, break the switch-statement and continue iterating through the rest of the JSON-file
            case  isValid(title, title_search):
                break; // Checking if title is inValid
            case  isValid(actor, actor_search):
                break; // Checking if actor is inValid
            case  isValid(director, director_search):
                break; // Checking if director is inValid
            case  isValid(genre, genre_search):
                break; // Checking if genre is inValid
            case  isValid(country, country_search):
                break; // Checking if country is inValid
            default :
                search_result.push(moviesArray[movie].movieId); // If all the above statements are valid add the movie to our search_result
        }
    }
    display(search_result);
};

function isValid(x, y) { // Function called to check if a search parameter 'y' is inValid
    return y !== "" && !(x.includes(y)); // If not it is valid

}

function display(array) {
    let count, ul, number, colums, length;
    const title = document.querySelector("#film_title-adv"),
        actor = document.querySelector("#actor"),
        dir = document.querySelector("#director"),
        genre = document.querySelector("#genre"),
        country = document.querySelector("#country");

    // Assign the search value to the input fields
    title.value = query_params.film_title || "";
    actor.value = query_params.actor || "";
    dir.value = query_params.director || "";
    genre.value = query_params.genre || "";
    country.value = query_params.country || "";

    if(actor.value !== "" || dir.value !== "" || genre.value !== "" || country.value !== "") {
        showAdvancedSearch(2);
    }

    count = document.querySelector("#count");
    count.style.marginBottom = "10";
    count.innerHTML = `Antall: ${array.length}`;
    ul = document.querySelector("#res_list");
    pagination(25, array, ul);
}