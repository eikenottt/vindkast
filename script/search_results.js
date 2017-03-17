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

    // Lager en global Array for søket til å oppdatere søkeresultatene i etterhvert som man sjekker flere søkefelt
    search_result = [];

    // Vi starter med søkefelt for tittel-parameteret da har størst sannsynlighet for å generere færrest resultater
    if (query_params.film_title) {
        //Lager et lokalt array for å lagre søkeresultater for dette inputfeltet gjennom iterasjoner
        title_search = [];
        
        // (SKAL SLETTES) film_title = document.querySelector("#film_title");

        // Går igjennom alle elementer i Object.js
        for(movie in movies_object) {
            if(movies_object[movie].otitle.toLowerCase().includes(String(query_params.film_title).toLowerCase())) {
                title_search.push(movies_object[movie]);
            }

        }
        search_result = title_search;
    }

// Sjanger - Genre.js
// Tittel, Actor, Director, Country - Object.js

    if (query_params.actor) {
        actor_search = [];

        for(movie in movies_object) {
            if(movies_object[movie].folk.toLowerCase().includes(String(query_params.actors).toLowerCase())) {
                actor_search.push(movies_object[movie]);
            }
            // Gjør den senere - Må dele opp strengen - Bruk split(",") og trim()
            // Sjekk hva som er felles i search_result og actor_search
            // Oppdated actor_search
            // Bruker .folk for å referere til actors i JSON
        }

        // Må skrive noe som sammenligner og oppdaterer search_result basert på actor_search.

        actor = document.getElementById("actor");
        actor.innerHTML = query_params.actor;
    }

    if (query_params.director) {
        dir_search = [];

        for(movie in movies_object) {
            if(movies_object[movie].dir.toLowerCase().includes(String(query_params.director).toLowerCase())) {
                dir_search.push(movies_object[movie]);
            }
        }
        // Skal være lik forrige løkke men bruker i stedet dir_search og .dir (for director)
        director = document.getElementById("director");
        director.innerHTML = query_params.director;
    }

    if (query_params.genre) {
        gen_search = [];

        for(movie in movies_object) {
            // Denne er feil
            if(genres_object[movie.id].toLowerCase().includes(String(query_params.genre).toLowerCase())) {
                gen_search.push(movies_object[movie]);
            }
        }
            // Denne referer til Genres.js ved genres_object istedetfor movies_object.
            // Må også bruke split og trim
            // Kalles ved å bruke id'en fra movies_object
        genre = document.getElementById("genre");
        genre.innerHTML = query_params.genre;
    }

    if (query_params.country) {
        c_search = [];

        for(movie in movies_object) {
            if(movies_object[movie].country.toLowerCase().includes(String(query_params.country).toLowerCase())) {
                dir_search.push(movies_object[movie]);
            }
        }
        // Denne referer til Objects.js og movies_object igjen og kalles ved .country
        country = document.getElementById("country");
        country.innerHTML = query_params.country;
    }

    //Her kan dere for eksempel kalle en (display) funksjon som viser søkeresultater
    display();
    function display() {
        count = document.querySelector("#count");
        count.style.marginBottom = "10";
        count.innerHTML = `Antall: ${search_result.length}`;
        ol = document.querySelector("#res_list");
        for(i = 0; i < search_result.length; i++){
            movie_id = search_result[i].id;
            ol.innerHTML += `<li>
                                <a href="show_movie.html?id=${movie_id}" class="movie-info movie-info-a">
                                    <img id="img${movie_id}" src="https://nelson.uib.no/o/${(String(movie_id).length === 4) ? String(movie_id).substring(0,1) : 0}/${movie_id}.jpg" 
                                         alt="${search_result[i].otitle}" onerror="this.onerror=null;this.src='https://res.cloudinary.com/cinebee/image/upload/v1452103746/edg9gkd0sawkc34siol1.jpg'">
                                    <span>${search_result[i].otitle}</span>
                                </a>
                            </li>`;
        }

    }
};