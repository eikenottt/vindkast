/* Her kan dere implementere en søkefunksjon. For eksempel:
 function search_for_X() {
 }
 */

/* Her kan dere implementere en display function som viser resulatetene av søket. For eksempel:
 function display_X() {
 }
 */

window.onload = function() {
    query_params = get_query_string_parameters();

    search_result = [];

    if (query_params.film_title) {
        film_title = document.querySelector("#film_title");
        //Her kan dere for eksempel kalle en søkefunksjon som søker for tittel.
        for(movie in movies_object) {
            if(movies_object[movie].otitle.includes(query_params.film_title)) {
                search_result.push(movies_object[movie]);
            }

        }
        display();
    }


    if (query_params.actor) {
        actor = document.getElementById("actor");
        for(movie in movies_object) {
            if(movies_object[movie].folk != null && movies_object[movie].folk.includes(query_params.actor)) {
                search_result.push(movies_object[movie]);
            }

        }
    }

    if (query_params.director) {
        director = document.getElementById("director");
        director.innerHTML = query_params.director;
    }

    if (query_params.genre) {
        genre = document.getElementById("genre");
        genre.innerHTML = query_params.genre;
    }

    if (query_params.country) {
        country = document.getElementById("country");
        country.innerHTML = query_params.country;
    }

    //Her kan dere for eksempel kalle en (display) funksjon som viser søkeresultater

    function display() {
        for(i = 0; i < search_result.length; i++){
            li = document.createElement("li");
            film_title.appendChild(li);
            li.innerHTML = search_result[i];
        }

    }


}