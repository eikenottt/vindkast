
window.onload = function() {
    query_params = get_query_string_parameters();
    movie_id = query_params.id;
    movie_object = movies_object[movie_id];
    review = reviews_object[movie_id];
    loaned = [];
    pictureArr = [];

    title = document.querySelector("#title");
    language = document.querySelector("#lang");
    cover_image = document.querySelector("#cover_image");
    duration = document.querySelector("#duration");
    genre = document.querySelector("#genre");
    director = document.querySelector("#dir");
    about_movie = document.querySelector("#about_movie");
    video_trailer = document.querySelector(".video-container");
    nor_title = document.querySelector("#no-title");
    pictures = document.querySelector("#frame");
    recomended = document.querySelector("#recomended");
    folk = document.querySelector("#folk");
    rating = document.querySelector("#ratingnr");
    newlyloanedMovies = document.querySelector("#newlyloanedMovies");

    document.title = `Vindkast - ${movie_object.otitle}`;

    // Title of the movie
    title.innerHTML = `${movie_object.otitle}`;
    // Make buttons
    makeButtons();
    // Country of origin and year of the movie
    language.innerHTML = `<div><span>Land: </span>${showCountryName(movie_object.country)}</div> <div>Utgivelsesår: ${movie_object.year}</div>`;
    // Duration of the movie in minutes
    duration.innerHTML = `(${(movie_object.length != (null && 0)) ? `${movie_object.length} minutter)` : "Ingen informasjon om lengden på filmen)"}`;
    // Rating
    getRating();
    // genre
    showFolk(genres_object[movie_id], genre, "genre");
    //genre.innerHTML = `Sjanger: ${genres_object[movie_id]}`;
    // Director of the movie
    showFolk(movie_object.dir, director, "director");
    // Folk in the movie
    showFolk(movie_object.folk, folk, "actor");
    // About the movie
    about_movie.innerHTML = `${(movie_object.description != (null && "" )) ? movie_object.description : "Ingen omhandling tilgjengelig"}`;
    // Norwegian title of the movie
    nor_title.innerHTML = `Norsk tittel: ${movie_object.ntitle}`;
    // cover of the movie
    cover_image.innerHTML = `<img id="img${movie_id}" src="https://nelson.uib.no/o/${(String(movie_id).length === 4) ? String(movie_id).substring(0,1) : 0}/${movie_id}.jpg" 
                                         alt="${movie_object.otitle}" onerror="this.onerror=null;this.src='https://res.cloudinary.com/cinebee/image/upload/v1452103746/edg9gkd0sawkc34siol1.jpg'">`;


    for(let i = 0; i < 10; i++){
        const pickedMovie = pickRandomMovie(movies_object);
        if(!loaned.includes(pickedMovie))
            loaned.push(pickedMovie);
    }

    writeHTML(loaned, newlyloanedMovies, 10);
   getImages(movie_id);

    if (movie_object["youtube trailer id"] == "") {
        video_trailer.remove();
        cover_image.firstChild.classList.add("big_cover");
    } else {
        video_trailer.innerHTML = `<iframe class="trailer" src="https://www.youtube-nocookie.com/embed/${movie_object["youtube trailer id"]}?rel=0&amp;showinfo=0" allowfullscreen></iframe>`;
    }

    displayRecomendedMovies();



};
function getImages(id){
    alphabet = ["b", "c"];
    for(i = 0; i < alphabet.length; i++) {
        link = `https://nelson.uib.no/o/${(String(id).length === 4) ? String(id).substring(0, 1) : 0}/${id + alphabet[i]}.jpg`;
        if(link != null)
        pictureArr.push(link);
    }
    pictureArr.forEach((pic, i) => {
        pictures.innerHTML += `<div class="image" id="limage${i}" ></div>`;
        document.querySelector(`#limage${i}`).style.backgroundImage = `url('${pic}')`;
    });


}

/**
 * Show information about the movie in html
 *
 * @param {(string|string[])} movieObjList - string or array with type
 * @param {Object} htmlTag - the tag in the html document
 * @param {string} type - the type to search for
 */
function showFolk(movieObjList, htmlTag, type) {

    let folks = movieObjList;

    if(!Array.isArray(movieObjList))
        folks = (movieObjList != null) ? movieObjList.trim().split(/[\s+,/]{2,}/) : [];

    //folks.forEach(pers => folk.innerHTML += `<a href="http://www.imdb.com/find?ref_=nv_sr_fn&q=${pers}&s=nm" target="_blank">${pers}</a>,`);
    let html = '';
    folks.forEach(pers => {
        pers = pers.replace(",","");
        html += `<li><a href="search_results.html?${type}=${pers}">${pers}</a></li>`;
    });
    htmlTag.innerHTML += html;
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

function getRating() {
    if(review != null) {
        ratingavg = 0;
        ratingCount = 0;
        for (usr in review) {
            ratingavg += review[usr].rating;
            ratingCount++;
        }
        avgRating = ratingavg / ratingCount;
        setRatingStars(Math.floor(avgRating));
        rating.innerHTML = `${(avgRating).toFixed(2)}`;
    } else {
        rating.innerHTML = `Bli den første til å vurdere filmen`;
    }
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

function setRatingStars(rating) {
    if(rating != (null || 0)) {
        input = document.querySelector(`#rating-input-1-${rating}`);
        input.setAttribute("checked", "");
    }

}

function showCountryName(cCode){
    if(country_object[cCode] != undefined) return country_object[cCode];
    else {
        countries = [];
        cCode = cCode.split(/[\+\s+,]+/);
        for(i = 0; i < cCode.length; i++) {
            countries.push(country_object[cCode[i]]);
        }
        return countries;
    }
}

function makeButtons() {
    buttons = document.querySelector(".buttons");

    loan_object = JSON.parse(loan_list);
    wish_object = JSON.parse(wish_list);

    buttons.innerHTML = `
        <button id="wish" class="liste">+Liste</button>
        <button id="loan" class="liste">+Låne</button>
    `;

    wishButton = document.querySelector("#wish");
    loanButton = document.querySelector("#loan");

    loanButton.addEventListener("click", () => {
        loan_object[movie_id] = movie_object;
    });

    wishButton.addEventListener("click", () => {
        wish_object[movie_id] = movie_object;
    });
}

function pickRandomMovie(array) {
    let result;
    let count = 0;
    for(let id in array) {
        if(Math.random() < 1/++count)
            result = id;
    }
    return array[result];
}
