var search_result = []; // Global Array for the Search Result

window.onload = function() {
    query_params = get_query_string_parameters(); // Retrieving parameters from the user
    var title_search, actor_search, director_search, genre_search, country_search = ""; // Creating an empty variable for each possible user input
    title_search = (query_params.film_title != null) ? String(query_params.film_title).toLowerCase() : false; // TITLE - Validating that the parameter is not 'null' and updating it to reflect the users query

    actor_search = (query_params.actor != null) ? String(query_params.actor).toLowerCase() : false; // ACTOR - Validating that the parameter is not 'null' and updating it to reflect the users query

    director_search = (query_params.director != null) ? String(query_params.director).toLowerCase() : false; // DIRECTOR - Validating that the parameter is not 'null' and updating it to reflect the users query

    genre_search = (query_params.genre != null) ? String(query_params.genre).toLowerCase() : false; // GENRE - Validating that the parameter is not 'null' and updating it to reflect the users query

    country_search = (query_params.country != null) ? String(query_params.country).toLowerCase() : false; // COUNTRY - Validating that the parameter is not 'null' and updating it to reflect the users query


    for(movie in movies_object) { // For-loop iterating through the JSON-file movies_object.js
        var title = String(movies_object[movie].otitle).toLowerCase(); // Retrieving title from the JSON-file
        var actor = (movies_object[movie].folk != null) ? (movies_object[movie].folk).toLowerCase() : ""; // Retrieving actors from the JSON-file, and seperating by tilde
        var director = (movies_object[movie].dir != null) ? (movies_object[movie].dir).toLowerCase() : ""; // Retrieving directors from the JSON-file, and seperating by tilde
        var genre = (genres_object[movies_object[movie].id] != null) ? genres_object[movies_object[movie].id].join("~").toLowerCase() : ""; // Retrieving genres from the JSON-file, and seperating by tilde
        var country = String(movies_object[movie].country).toLowerCase(); // Retrieving country from the JSON-file

        switch(true) { // If any of the following statements is inValid, break the switch-statement and continue iterating through the rest of the JSON-file
            case  isValid(title, title_search): break; // Checking if title is inValid
            case  isValid(actor, actor_search): break; // Checking if actor is inValid
            case  isValid(director, director_search): break; // Checking if director is inValid
            case  isValid(genre, genre_search): break; // Checking if genre is inValid
            case  isValid(country, country_search): break; // Checking if country is inValid
            default : search_result.push(movies_object[movie]); // If all the above statements are valid add the movie to our search_result
        }
    }
    // DISPLAY FUNCTION START
    display(search_result,25);

    // DISPLAY FUNCTION END
};
function isValid(x, y) { // Function called to check if a search parameter 'y' is inValid
    if (y != "" && !(x.includes(y))) { // If the parameter 'y' is not empty, and is not found in 'x' then it is inValid
        return true;
    }
    else {return false;} // If not it is valid
}
function display(array,number) {
    count = document.querySelector("#count");
    count.style.marginBottom = "10";
    count.innerHTML = `Antall: ${search_result.length}`;
    ul = document.querySelector("#res_list");
    for(i = 0; i < ((array.length > number) ? number : array.length); i++) {
        writeOut(ul, search_result);
    }
    pages = ul.parentNode;
    pages.innerHTML = ``;

}

function writeOut(tag, array) {
        tag.innerHTML += `<li>
                                <a href="show_movie.html?id=${array[i].id}" class="movie-info movie-info-a">
                                    <img id="img${array[i].id}" src="https://nelson.uib.no/o/${(String(array[i].id).length === 4) ? String(array[i].id).substring(0,1) : 0}/${array[i].id}.jpg" 
                                         alt="${array[i].otitle}" onerror="this.onerror=null;this.src='https://res.cloudinary.com/cinebee/image/upload/v1452103746/edg9gkd0sawkc34siol1.jpg'">
                                    <span>${array[i].otitle}</span>
                                </a>
                            </li>`;
}




