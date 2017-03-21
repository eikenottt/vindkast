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
    // Global Array for det endelige søkeresultatet.
    var search_result = [];
    var parameters = []; // Lagrer parameter for søket hvis vi vil displaye dette
    var temp_param; // holder på parameteret i hver enkelt metode

    // SØK PÅ TITTEL
    if (query_params.film_title) {
        temp_param = query_params.film_title; // Brukerens søkeord
        parameters.push(temp_param); // Legger til søkeordet i en Global Liste som senere kan skrives ut
        // Sjekker om det Globale Arrayet er tomt og søker deretter i databasen - STRENGT TATT IKKE NØDVENDIG FOR FØRSTE PARAMETER
        if(search_result.length<1) { // Hvis dette er første gyldige søkeparameter
            for(movie in movies_object) { // Søk gjennom hele Object.js
                let title = String(movies_object[movie].otitle).toLowerCase(); // Holder på tittelen til objektet i små bokstaver
                let title_check = String(temp_param).toLowerCase(); // Holder på brukerens søkeord som strengverdi i små bokstaver (Med tanke på potensiell implementasjon av søkeparameter som ikke er strenger)
                if(title.includes(title_check)) { // Hvis søkeordet er en del av tittelen
                    search_result.push(movies_object[movie]); // Legg objektet til i det Globale Arrayet
                }
            }
        }
        // I tilfellet hvor det Globale Arrayet ikke er tomt - VIL IKKE INTREFFE FOR FØRSTE PARAMETER
        else { // Hvis dette IKKE er første gyldige søkeparameter
            for(movie in search_result) { // Søk gjennom det Globale Arrayet for søkeresultater
                let title =  String(search_result[movie].otitle).toLowerCase();
                let title_check = String(query_params.film_title).toLowerCase();
                if(!(title.includes(title_check))) { // Hvis brukerens søkeord IKKE finnes i tittelen
                    search_result.splice(search_result[movie], 1); // Fjern objektet fra det Globale Arrayet
                }
            }
            if(search_result.length<1) { // Dersom det Globale Arrayet tømmes
                console.log("Error"); // Skriv error
                return; // Avslutt søk
            }
        }
    }
    // SØK PÅ SKUESPILLER
    if (query_params.actor) {
        temp_param = query_params.actors;
        parameters.push(temp_param);
        // Sjekker om det Globale Arrayet er tomt og søker deretter i databasen - STRENGT TATT IKKE NØDVENDIG FOR FØRSTE PARAMETER
        if(search_result.length<1) {
            for(movie in movies_object) {
                let actor = String(movies_object[movie].folk).toLowerCase();
                let actor_check = String(temp_param).toLowerCase();
                if(actor.includes(actor_check)) {
                    search_result.push(movies_object[movie]);
                }
            }
        }
        // I tilfellet hvor det Globale Arrayet ikke er tomt - VIL IKKE INTREFFE FOR FØRSTE PARAMETER
        else {
            for(movie in search_result) {
                let actor =  String(search_result[movie].folk).toLowerCase();
                let actor_check = String(temp_param).toLowerCase();
                if(!(actor.includes(actor_check))) {
                    search_result.splice(search_result[movie], 1);
                }
            }
            if(search_result.length<1) {
                console.log("Error");
                return;
            }
        }
    }
    // SØK PÅ REGISSØR
    if (query_params.director) {
        temp_param = query_params.director;
        parameters.push(temp_param);
        // Sjekker om det Globale Arrayet er tomt og søker deretter i databasen - STRENGT TATT IKKE NØDVENDIG FOR FØRSTE PARAMETER
        if(search_result.length<1) {
            for(movie in movies_object) {
                let director = String(movies_object[movie].dir).toLowerCase();
                let director_check = String(temp_param).toLowerCase();
                if(director.includes(director_check)) {
                    search_result.push(movies_object[movie]);
                }
            }
        }
        // I tilfellet hvor det Globale Arrayet ikke er tomt - VIL IKKE INTREFFE FOR FØRSTE PARAMETER
        else {
            for(movie in search_result) {
                let director =  String(search_result[movie].dir).toLowerCase();
                let director_check = String(temp_param).toLowerCase();
                if(!(director.includes(director_check))) {
                    search_result.splice(search_result[movie], 1);
                }
            }
            if(search_result.length<1) {
                console.log("Error");
                return;
            }
        }
    }
    // SØK PÅ SJANGER
    if (query_params.genre) {
        temp_param = query_params.genre;
        parameters.push(temp_param);
        // Sjekker om det Globale Arrayet er tomt og søker deretter i databasen - STRENGT TATT IKKE NØDVENDIG FOR FØRSTE PARAMETER
        if(search_result.length<1) {
            for(movie in movies_object) {
                let genre = genres_object[movies_object[movie].id].join("~").toLowerCase();
                let genre_check = String(temp_param).toLowerCase();
                if(genre.includes(genre_check)) {
                    search_result.push(movies_object[movie]);
                }
            }
            
        }
        // I tilfellet hvor det Globale Arrayet ikke er tomt - VIL IKKE INTREFFE FOR FØRSTE PARAMETER
        else {
            for(movie in search_result) {
                let genre =  genres_object[search_result[movie].id].join("~").toLowerCase();
                let genre_check = String(temp_param).toLowerCase();
                if(!(genre.includes(genre_check))) {
                    search_result.splice(search_result[movie], 1);
                }
            }
            if(search_result.length<1) {
                console.log("Error");
                return;
            }
        }
    }

    // SØK PÅ LAND
    if (query_params.country) {
        temp_param = query_params.country;
        parameters.push(temp_param);
        // Sjekker om det Globale Arrayet er tomt og søker deretter i databasen - STRENGT TATT IKKE NØDVENDIG FOR FØRSTE PARAMETER
        if(search_result.length<1) {
            for(movie in movies_object) {
                let country = String(movies_object[movie].country).toLowerCase();
                let country_check = String(temp_param).toLowerCase();
                if(country.includes(country_check)) {
                    search_result.push(movies_object[movie]);
                }
            }
        }
        // I tilfellet hvor det Globale Arrayet ikke er tomt - VIL IKKE INTREFFE FOR FØRSTE PARAMETER
        else {
            for(movie in search_result) {
                let country =  String(search_result[movie].country).toLowerCase();
                let country_check = String(temp_param).toLowerCase();
                if(!(country.includes(country_check))) {
                    search_result.splice(search_result[movie], 1);
                }
            }
            if(search_result.length<1) {
                console.log("Error");
                return;
            }
        }
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