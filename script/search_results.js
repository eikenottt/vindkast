var search_result = []; // Global Array for the Search Result

window.onload = function() {
    query_params = get_query_string_parameters(); // Retrieving parameters from the user
    var title_search, actor_search, director_search, genre_search, country_search = "", moviesArray; // Creating an empty variable for each possible user input
    title_search = (query_params.film_title != null) ? String(query_params.film_title).toLowerCase() : false; // TITLE - Validating that the parameter is not 'null' and updating it to reflect the users query

    actor_search = (query_params.actor != null) ? String(query_params.actor).toLowerCase() : false; // ACTOR - Validating that the parameter is not 'null' and updating it to reflect the users query

    director_search = (query_params.director != null) ? String(query_params.director).toLowerCase() : false; // DIRECTOR - Validating that the parameter is not 'null' and updating it to reflect the users query

    genre_search = (query_params.genre != null) ? String(query_params.genre).toLowerCase() : false; // GENRE - Validating that the parameter is not 'null' and updating it to reflect the users query

    country_search = (query_params.country != null) ? String(query_params.country).toLowerCase() : false; // COUNTRY - Validating that the parameter is not 'null' and updating it to reflect the users query

    moviesArray = sortAfterRating();

    for(movie in moviesArray) { // For-loop iterating through the JSON-file movies_object.js
        var title = String(moviesArray[movie].movieId.otitle).toLowerCase(); // Retrieving title from the JSON-file
        var actor = (moviesArray[movie].movieId.folk != null) ? (moviesArray[movie].movieId.folk).toLowerCase() : ""; // Retrieving actors from the JSON-file, and seperating by tilde
        var director = (moviesArray[movie].movieId.dir != null) ? (moviesArray[movie].movieId.dir).toLowerCase() : ""; // Retrieving directors from the JSON-file, and seperating by tilde
        var genre = (genres_object[moviesArray[movie].movieId.id] != null) ? genres_object[moviesArray[movie].movieId.id].join("~").toLowerCase() : ""; // Retrieving genres from the JSON-file, and seperating by tilde
        var country = String(moviesArray[movie].movieId.country).toLowerCase(); // Retrieving country from the JSON-file

        switch(true) { // If any of the following statements is inValid, break the switch-statement and continue iterating through the rest of the JSON-file
            case  isValid(title, title_search): break; // Checking if title is inValid
            case  isValid(actor, actor_search): break; // Checking if actor is inValid
            case  isValid(director, director_search): break; // Checking if director is inValid
            case  isValid(genre, genre_search): break; // Checking if genre is inValid
            case  isValid(country, country_search): break; // Checking if country is inValid
            default : search_result.push(moviesArray[movie].movieId); // If all the above statements are valid add the movie to our search_result
        }
    }
    // DISPLAY FUNCTION START
    display(search_result);

    // DISPLAY FUNCTION END

};

function isValid(x, y) { // Function called to check if a search parameter 'y' is inValid
    if (y != "" && !(x.includes(y))) { // If the parameter 'y' is not empty, and is not found in 'x' then it is inValid
        return true;
    }
    else {return false;} // If not it is valid
}
function display(array) {
    count = document.querySelector("#count");
    count.style.marginBottom = "10";
    count.innerHTML = `Antall: ${array.length}`;
    ul = document.querySelector("#res_list");
    number = array.length;
    const movieCoverWidth = 133;
    const width = Math.floor((ul.offsetWidth - parseInt(window.getComputedStyle(ul).paddingLeft.replace("px",""))) / movieCoverWidth);
    if(array.length % width != 0 && array.length > width) {
        colums = Math.round(array.length/width);
        number = (colums > 4) ? splitToPages: array.length;
    }
    length = ((array.length > number) ? number : array.length);
    writeHTML(array, ul, array.length);

}

function splitToPages() {

}

function sortAfterRating() {
    const ratingsArray = [];
    let mid;

    for(mid in movies_object) {
        const ratings = {};
        let ravg = 0;
        let rev = reviews_object[mid];
        let i = 0;
        for(let usr in rev) {
            i++;
            ravg += rev[usr].rating;

        }
        if(i > 0){
            ravg = (ravg / i).toFixed(2);
        }
        else {
            ravg = 0;
        }
        ratings.movieId = movies_object[mid];
        ratings.ratingAvg = ravg;
        ratingsArray.push(ratings);

    }
    ratingsArray.sort((a,b) => b.ratingAvg - a.ratingAvg);
    return ratingsArray;
}




