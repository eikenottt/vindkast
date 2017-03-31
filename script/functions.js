function showHeader() {
    header = document.querySelector("header");
    header.innerHTML = 
    `     <h1><a href="index.html" title="Vindkast">Vindkast</a></h1>
            <nav>
                <!-- Hamburger meny -->
                <input type="checkbox" id="hamburger"/>
                <label for="hamburger" class="whitebox-l">
                </label>
                <!-- Søkeskjema gir mulighet for å søke etter film tittel. -->
                <form id="search-form" action="search_results.html" method="get">
                    <input id="film_title" name="film_title" type="text" placeholder="e.g. King Kong" class="search">
                    <input type="submit" id="submit_search" value="Søk">
                </form>
                <label class="menuicon" for="hamburger">
                    <span></span>
                </label>
                <ul id="menu">
                    <li class="menuItem" id="innhold">Innhold</li>
                    <li class="menuItem"><a href="search_results.html?film_title="><img class="navimg" src="img/ikon/play.svg" alt="menyikon">Filmer A-Å</a></li>
                    <li class="menuItem"><a href="search_results.html?genre=dokumentar"><img class="navimg" src="img/ikon/kamera.svg" alt="menyikon">Dokumentarer</a></li>
                    <li class="menuItem"><a href="#"><img class="navimg" src="img/ikon/stol.svg" alt="menyikon">Regissører</a></li>
                    <li class="menuItem"><a href="#"><img class="navimg" src="img/ikon/siluett.svg" alt="menyikon">Skuespillere</a></li>
                    <li class="menuItem" id="minside"><a href="onskeliste.html">Min side (Ola123)</a></li>
                    <!-- Åpne og lukke meny (accordion) -->
                    <li class="accordion menuItem">
                        <input type="checkbox" id="check-1"/>
                        <label class="hoverColor" for="check-1"><img class="navimg" src="img/ikon/hjul.svg" alt="menyikon">Mine Filmer</label>
                        <div class="accordion-menu">
                            <a href="theintouchables.html">The Intouchables</a>
                            <a href="lunch.html">The Lunchbox</a>
                        </div>
                    </li>
                    <li class="accordion menuItem">
                        <!-- Ønskede filmer -->
                        <input type="checkbox" id="check-2"/>
                        <label class="hoverColor" for="check-2"><img class="navimg" src="img/ikon/fav.svg" alt="menyikon">Ønskeliste</label>
                        <div class="accordion-menu">
                            <a href="theintouchables.html">The Intouchables</a>
                            <a href="lunch.html">The Lunchbox</a>
                        </div>
                        </li> <!-- Slutt på accordion -->
                        <li class="menuItem" id="rutine-side"><a href="rutiner.html"><img class="navimg" src="img/ikon/rutinecheck.svg">Rutiner</a></li>
                        <!-- Logg ut -->
                        <li class="menuItem"><a href="#"><img class="navimg" src="img/ikon/ut.svg">Logg ut</a></li>
                        </ul> <!-- Slutt på Hamburger menyen -->
                </nav> `
}


function displayRecomendedMovies() {
    genreCount = 0;
    folkCount = 0;
    otherCount = 0;
    recomendedMovies = [];
    ratings = sortAfterRating();
    for(i = 0; i < ratings.length; i++) {
        pickMovie = pickRandomMovie(ratings).movieId;
        if(genreCount < 5){

            if(((genres_object[pickMovie.id] && genres_object[movie_id]) != undefined) ? genres_object[movie_id].some(v => genres_object[pickMovie.id].indexOf(v) >= 0) : false) {
                if(pickMovie.id === movie_object.id || recomendedMovies.includes(pickMovie)) continue;
                recomendedMovies.push(pickMovie);
                genreCount++;
            }

        }

        if (folkCount < 5) {
            if (((pickMovie.folk != null && movie_object.folk != null) ? movie_object.folk.trim().split(",").some(v => pickMovie.folk.trim().split(",").indexOf(v) >= 0) : false)) {
                recMovie_id = pickMovie.id;
                if (recMovie_id === movie_object.id || recomendedMovies.includes(pickMovie) ) continue;
                recomendedMovies.push(pickMovie);
                folkCount++;
            }

        }

        if(otherCount > 9)
            if((folkCount && genreCount) == 0) {
                recomendedMovies.push(ratings[i].id);
            }

    }

    writeHTML(recomendedMovies, recomended, recomendedMovies.length);


}

function sortAfterRating() {
    ratingsArray = [];


    for(mid in movies_object) {
        ratings = {};
        ravg = 0;
        rev = reviews_object[mid];
        i = 0;
        for(usr in rev) {
            i++;
            ravg += rev[usr].rating;

        }
        if(i > 0){
            ravg = (ravg / i).toFixed(2);
            ratings.movieId = movies_object[mid];
            ratings.ratingAvg = ravg;
            ratingsArray.push(ratings);
        }

    }
    ratingsArray.sort((a,b) => b.ratingAvg - a.ratingAvg);
    return ratingsArray;
}
