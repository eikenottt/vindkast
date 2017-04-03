
/**
 * Show information about the movie in html
 *
 * @param {(string|string[])} movieObjList - string or array with type
 * @param {Object} htmlTag - the tag in the html document
 * @param {string} type - the type to search for
 */
function showInformationFromMovie(movieObjList, htmlTag, type) {

    let tempArray = movieObjList;

    if(!Array.isArray(movieObjList))
        tempArray = (movieObjList != null) ? movieObjList.trim().split(/[\s+,/]{2,}/) : [];

    //folks.forEach(pers => folk.innerHTML += `<a href="http://www.imdb.com/find?ref_=nv_sr_fn&q=${pers}&s=nm" target="_blank">${pers}</a>,`);
    let html = '';
    tempArray.forEach(pers => {
        pers = pers.replace(",","");
        html += `<li><a href="search_results.html?${type}=${pers}">${pers}</a></li>, `;
    });
    htmlTag.innerHTML += html;
}

/**
 *
 * @param id
 * @returns {string}
 */
function getImages(id){
    let i, link, pictureArr = [], html = '', xhttp;
    const alphabet = ["b", "c"];
    for(i = 0; i < alphabet.length; i++) {
        link = `https://nelson.uib.no/o/${(String(id).length === 4) ? String(id).substring(0, 1) : 0}/${id + alphabet[i]}.jpg`;

        pictureArr.push(link);

    }
    pictureArr.forEach((pic, i) => {
        html += `<div class="image" id="limage${i}" style="background-image: url(${pic});" ></div>`;
    });
    return html;


}

/**
 *
 * @param htmltag
 */
function displayRecomendedMovies(htmltag, movie_id) {
    if(movie_id == undefined) {
        movie_id = pickRandomMovie(movies_object).id;
    }

    let genreCount = 0,
        folkCount = 0,
        otherCount = 0,
        pickMovie, i, recMovie_id,
        movie_object = movies_object[movie_id];
    const recomendedMovies = [],
        ratings = sortAfterRating();

    for(i = 0; i < ratings.length; i++) {
        pickMovie = pickRandomMovie(ratings).movieId;
        if(otherCount < 11){

            if(((genres_object[pickMovie.id] && genres_object[movie_id]) != undefined) ? genres_object[movie_id].some(v => genres_object[pickMovie.id].indexOf(v) >= 0) : false) {
                if(pickMovie.id === movie_object.id || recomendedMovies.includes(pickMovie)) continue;
                recomendedMovies.push(pickMovie);
                genreCount++;
                otherCount++;
            }

        }

        if (otherCount < 11) {
            if (((pickMovie.folk != null && movie_object.folk != null) ? movie_object.folk.trim().split(",").some(v => pickMovie.folk.trim().split(",").indexOf(v) >= 0) : false)) {
                recMovie_id = pickMovie.id;
                if (recMovie_id === movie_object.id || recomendedMovies.includes(pickMovie) ) continue;
                recomendedMovies.push(pickMovie);
                folkCount++;
                otherCount++;
            }

        }

        if(otherCount > 9)
            if((folkCount || genreCount) == 0) {
                recomendedMovies.push(ratings[i].id);
                otherCount++;
            }

    }

    writeMovieHTML(recomendedMovies, htmltag, recomendedMovies.length);

}

/**
 *
 * @param reviewObj
 * @returns {string}
 */
function getRating(reviewObj) {
    let ratingavg = 0, ratingCount = 0, usr, avgRating;
    if(reviewObj != null) {
        for (usr in reviewObj) {
            ratingavg += reviewObj[usr].rating;
            ratingCount++;
        }
        avgRating = ratingavg / ratingCount;
        setRatingStars(Math.floor(avgRating));
        return `${(avgRating).toFixed(2)}`;
    } else {
        return `Bli den første til å vurdere filmen`;
    }
}

/**
 *
 * @returns {Array}
 */
function sortAfterRating() {
    let mid, ratings, ravg, rev, i, usr;
    const ratingsArray = [];


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
        else {
            ratings.movieId = movies_object[mid];
            ratings.ratingAvg = 0;
            ratingsArray.push(ratings);
        }

    }
    ratingsArray.sort((a,b) => b.ratingAvg - a.ratingAvg);
    return ratingsArray;
}

/**
 *
 * @param rating
 */
function setRatingStars(rating) {
    let input;
    if(rating != (null || 0)) {
        input = document.querySelector(`#rating-input-1-${rating}`);
        input.setAttribute("checked", "");
    }

}

/**
 *
 * @param cCode
 * @returns {*}
 */
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

/**
 *
 */
function makeButtons() {
    let wishButton, loanButton;
    const buttons = document.querySelector(".buttons");

    //loan_object = JSON.parse(loan_list);
    //wish_object = JSON.parse(wish_list);

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

/**
 *
 * @param array
 * @returns {*}
 */
function pickRandomMovie(array) {
    let result;
    let count = 0;
    for(let id in array) {
        if(Math.random() < 1/++count)
            result = id;
    }
    return array[result];
}

/**
 *
 */
function displayLoanedMovies(htmlTag) {
    let loaned = [], i;
    for(i = 0; i < 10; i++){
        const pickedMovie = pickRandomMovie(movies_object);
        if(!loaned.includes(pickedMovie))
            loaned.push(pickedMovie);
    }

    writeMovieHTML(loaned, htmlTag, 10);
}

/**
 *
 * @param array
 * @param place
 * @param amount
 */
function writeMovieHTML(array, place, amount){
    let html = document.createDocumentFragment();
    function getImage(objid) {
        return `https://nelson.uib.no/o/${(String(objid).length === 4) ? String(objid).substring(0,1) : 0}/${objid}.jpg`;
    }
    for(let i = 0; i < amount; i++){
        let desc = array[i].description;
        let movie = array[i];
        const li = document.createElement("li"),
            a = document.createElement("a"),
            img = document.createElement("img"),
            span = document.createElement("span");
        span.appendChild(document.createTextNode(array[i].otitle));
        img.setAttribute("id", `img${movie.id}`);
        img.src = getImage(movie.id);
        img.alt = movie.otitle;
        img.setAttribute("onerror", "this.onerror=null;this.src='img/notFound.jpg'");
        a.href = `show_movie.html?id=${movie.id}`;
        a.classList.add("movie-info");
        a.classList.add("movie-info-a")
        a.appendChild(img);
        a.appendChild(span);
        li.setAttribute("title", (desc != (null && "" && undefined)) ? desc.trim().substring(0,160) + "..." : 'Ingen informasjon om filmen');
        li.appendChild(a);
        html.appendChild(li);
    }
    place.appendChild(html);
}