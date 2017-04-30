const regexp = /[\s+,/;.]{2,}/;

/**
 * Show information about the movie in html
 *
 * @param {(string|string[])} movieObjList - string or array with type
 * @param {string} type - the type to search for
 */
function showInformationAboutMovie(movieObjList, type) {
    let html = '';
    if(movieObjList !== undefined && movieObjList !== null && movieObjList !== "") {
        let tempArray = movieObjList;

        if (!Array.isArray(movieObjList))
            tempArray = (movieObjList !== null) ? movieObjList.trim().split(regexp) : [];

        tempArray.forEach(elem => {
            if (elem !== undefined) {
                elem = elem.replace(",", "");
                html += `<li><a href="search_results.html?${type}=${elem}">${elem}</a></li>, `;
            }
        });
    }
    else {
        html = "Ingen " + type + " registrert";
    }
    return html;
}

/**
 * Gets the extra images for a movie from the nelson.uib.no server
 * where the image file has the movie id + a letter
 *
 * @param id - id of movie
 * @returns {string} - string with html to write to webpage
 */
function getImages(id) {
    let i, link, pictureArr = [], html = '';
    const alphabet = ["b", "c"];
    for (i = 0; i < alphabet.length; i++) {
        link = `https://nelson.uib.no/o/${(String(id).length === 4) ? String(id).substring(0, 1) : 0}/${id + alphabet[i]}.jpg`;
        pictureArr.push(link);
    }
    /*if(!checkLink(pictureArr[0]) && !checkLink(pictureArr[1]))
        document.querySelector("#frame").remove();*/
    pictureArr.forEach((pic, i) => {
        html += `<div class="image" id="limage${i}" style="background-image: url(${pic});" ></div>`;
    });
    return html;
}

function checkLink(link) {
    const imgTag = document.createElement('img');
    imgTag.setAttribute('src', link);
    let timer = setInterval(function () {
        imgTag.error = function() {
            console.log(link);
            imgTag.remove();
            clearInterval(timer);
            return true;
        };
    }, 1000);
    if(timer > 10) {
        clearInterval(timer);
        console.log("Done");
        return false;
    }
    checkLink(link);
}


/**
 * Shows recommended movies based on the movie id
 *
 * @param htmltag - reference to the html tag where the movies will be written
 * @param movie_id - the id of the movie
 */
function displayRecomendedMovies(htmltag, movie_id) {

    if (movie_id == undefined) { // if the movie id is undefined / if on the index.html
        movie_id = pickRandomMovie(wish_list);  // pick a random movie id from wish_list
    }

    let countryArray,
        c,
        beforeCount,
        otherCount = 0,
        pickMovie, i, recMovie_id,
        movie_object = movies_object[movie_id],
        recomendedMovies = [],
        ratings = sortAfterRating();

    for (i = 0; i < ratings.length; i++) {
        pickMovie = ratings[i].movieId;
        countryArray = movie_object.country.split(regexp);
        beforeCount = otherCount;

        if (otherCount > 2 && otherCount < 6) {
            for (c in countryArray) {
                if (pickMovie.country.includes(countryArray[c])) {
                    recomendedMovies.push(pickMovie);
                    otherCount++;
                }
            }
        }

        if (otherCount > 5 && otherCount < 9) {

            if (((genres_object[pickMovie.id] && genres_object[movie_id]) != undefined) ? genres_object[movie_id].some(v => genres_object[pickMovie.id].indexOf(v) >= 0) : false) {
                if (pickMovie.id === movie_object.id || recomendedMovies.includes(pickMovie)) continue;
                recomendedMovies.push(pickMovie);
                otherCount++;
            }
        }

        if (otherCount < 3) {

            if (((pickMovie.folk != null && movie_object.folk != null) ? movie_object.folk.trim().split(",").some(v => pickMovie.folk.trim().split(",").indexOf(v) >= 0) : false)) {
                recMovie_id = pickMovie.id;
                if (recMovie_id === movie_object.id || recomendedMovies.includes(pickMovie)) continue;
                recomendedMovies.push(pickMovie);
                otherCount++;
            }

        }

        if (otherCount == beforeCount && otherCount < 15) {
            if (pickMovie.dir.includes(movie_object.dir)) {
                if (pickMovie.id != movie_object.id) {
                    recomendedMovies.push(pickMovie);
                    otherCount++;
                }
            }
        }


    }

    recomendedMovies = shuffle(recomendedMovies);

    pagination(calculateSpace(), recomendedMovies, htmltag);

    //writeMovieHTML(recomendedMovies, htmltag, recomendedMovies.length, 0);

}

/**
 * Gets the average rating from a movie, if the movie rating is null on a movie
 * the output will say "be the first to rate the movie".
 *
 * @param reviewObj -
 * @returns {string}
 */
function getAvgRating(reviewObj) {
    let ratingavg = 0, ratingCount = 0, usr, avgRating;
    if (reviewObj == null) {
        return `Bli den første til å vurdere filmen`;
    } else {
        for (usr in reviewObj) {
            ratingavg += reviewObj[usr].rating;
            ratingCount++;
        }
        avgRating = ratingavg / ratingCount;
        setRatingStars(avgRating);
        return `${(avgRating).toFixed(2)}`;
    }
}

function shuffle(array) {
    let currentIndex = array.length, t, i;

    // While there remain elements to shuffle…
    while (currentIndex) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * currentIndex--);

        // And swap it with the current element.
        t = array[currentIndex];
        array[currentIndex] = array[i];
        array[i] = t;
    }

    return array;
}

/**
 *
 * @returns {Array}
 */
function sortAfterRating() {
    let mid, ratings, ravg, rev, i, usr;
    const ratingsArray = [];


    for (mid in movies_object) {
        ratings = {};
        ravg = 0;
        rev = reviews_object[mid];
        i = 0;
        for (s in rev) {
            i++;
            ravg += rev[s].rating;
        }
        if (ravg != null) {
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
    ratingsArray.sort((a, b) => b.ratingAvg - a.ratingAvg);
    return ratingsArray;
}

/**
 *
 * @param rating
 */
function setRatingStars(rating) {
    let input;
    if (rating != (null || 0)) {
        rating = Math.floor(rating);
        input = document.querySelector(`#rating-input-1-${rating}`);
        input.setAttribute("checked", "");
    }

}

/**
 *
 * @param cCode
 * @returns {*}
 */
function showCountryName(cCode) {
    cCode = cCode.toUpperCase();
    if (country_object[cCode] != undefined) return country_object[cCode];
    else {
        const countries = [];
        let i;
        cCode = cCode.split(/[\s+,;.]+/);
        for (i = 0; i < cCode.length; i++) {
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
    for (let id in array) {
        if (Math.random() < 1 / ++count)
            result = id;
    }
    return array[result];
}

/**
 *
 */
function displayLoanedMovies(htmlTag) {
    let loaned = [], i;
    for (i = 0; i < 10; i++) {
        const pickedMovie = pickRandomMovie(movies_object);
        if (!loaned.includes(pickedMovie))
            loaned.push(pickedMovie);
    }

    pagination(calculateSpace(), loaned, htmlTag);
    //writeMovieHTML(loaned, htmlTag, 10, 0);
}

/**
 *
 * @param array
 * @param place
 * @param amount
 */
function writeMovieHTML(array, place, amount, start) {
    let html = document.createDocumentFragment();

    function getImage(objid) {
        return `https://nelson.uib.no/o/${(String(objid).length === 4) ? String(objid).substring(0, 1) : 0}/${objid}.jpg`;
    }

    for (let i = start; i < amount; i++) {
        let desc = array[i].description;
        desc = (desc != (null && "" && undefined)) ? desc.trim().substring(0, 160) + "..." : 'Ingen informasjon om filmen';
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
        a.classList.add("movie-info-a");
        a.appendChild(img);
        a.appendChild(span);
        li.setAttribute("title", desc);
        li.appendChild(a);
        html.appendChild(li);
    }
    place.appendChild(html);
}


function listings(list) {
    let html = '', i;

    let j = list.length, movies;
    if (list.length > 3) {
        j = 3
    }
    i = list.length - 1;
    movies = fromWishToMovie(list);
    if (movies != undefined) {
        for (; i >= movies.length - j; i--) {
            html += `<a href="show_movie.html?id=${movies[i].id}">${movies[i].otitle}</a>`
        }
    }

    return html;

}


function fromWishToMovie(array) {
    let i, movieArray = [];
    for (i = 0; i < array.length; i++) {
        movieArray.push(movies_object[array[i]]);
    }

    return movieArray;
}

/**
 * Paginate a site
 * @param itemsPerPage
 * @param moviesArray
 * @param listing_table
 */
function pagination(itemsPerPage, moviesArray, listing_table) {
    // sets the default page to 1
    let current_page = 1,
        // sets the amount of movies to show to the input itemsPerPage
        records_per_page = itemsPerPage,
        // checks if the input moviesArray is array, if not it converts to array
        objJson = makeArray(moviesArray);

    // if elements is not found on page, make a empty one
    const btn_next = document.querySelector("div[title~='Neste']") || document.createElement("button"),
        btn_prev = document.querySelector("div[title~='Forrige']") || document.createElement("button"),
        page_span = document.querySelector("[data-pageNumber]") || document.createElement("span"),
        btn_first = document.querySelector("div[title~='Første']") || document.createElement("utton"),
        btn_last = document.querySelector("div[title~='Siste']") || document.createElement("button"),
        page_num = document.querySelector("input[name=pageNumber]") || document.createElement("span"),
        dropdown_amount = document.querySelector("#amountOfResults") || document.createElement("span");
        
    // prints the current page number to the input field in search results
    page_num.value = current_page;

    // if input listing_table is null, create a new ul element to print the movie objects in
    if(listing_table === null) {
        listing_table = document.createElement("ul");
    }

    /**
     * Makes an array of input
     * @param obj
     * @returns {Array}
     */
    function makeArray(obj) {
        "use strict";
        let i, array = [];
        for (i in obj) {
            array.push(obj[i]);
        }
        return array;
    }

    /**
     * Goes to previous page
     */
    function prevPage() {
        if (current_page > 1) {
            // decreases the current page number by one
            current_page--;
            // runs the printing function
            changePage(current_page);
        }
    }

    /**
     * Goes to the next page
     */
    function nextPage() {
        if (current_page < numPages()) {
            // increases the current page number by one
            current_page++;
            // runs the printing function
            changePage(current_page);
        }
    }

    /**
     * Goes to the first page
     */
    function toFirstPage() {
        // sets the current page number back to 1
        current_page = 1;
        // runs the printing function
        changePage(current_page);
    }

    /**
     * Goes to the last page
     */
    function toLastPage() {
        // sets the current page number to the total number of pages
        current_page = numPages();
        // runs the printing function
        changePage(current_page);

    }

    // if the "next" button is pressed, go to next page
    btn_next.addEventListener('click', nextPage);
    // if the "previous" button is pressed, go to previous page
    btn_prev.addEventListener('click', prevPage);
    // if the "first" button is pressed, go to first page
    btn_first.addEventListener('click', toFirstPage);
    // if the "last" button is pressed, go to last page
    btn_last.addEventListener('click', toLastPage);
    // if the enter key is pressed in the input field, go to given page
    page_num.addEventListener('keyup', function (event) {
        if(event.keyCode === 13) {
            if(page_num.value > numPages()){
                page_num.value = numPages()
            }
            if(page_num.value < 1) {
                page_num.value = 1;
            }
            current_page = page_num.value;
            // runs the printing function
            changePage(current_page);
        }
    });
    // show amount of movie objects on page from the dropdown menu
    dropdown_amount.addEventListener('change', function () {
        records_per_page = dropdown_amount.value;
        if(current_page > numPages()){
            current_page = numPages();
        }
        // runs the printing function
        changePage(current_page);
    });


    function changePage(page) {
        page_num.value = page;
        // Validate page
        if (page < 1) page = 1;
        if (page > numPages()) page = numPages();

        listing_table.innerHTML = "";

        writeMovieHTML(objJson, listing_table, (((page * records_per_page) < objJson.length) ? page * records_per_page : objJson.length), (current_page - 1) * records_per_page);

        page_span.innerHTML = "av\n" + numPages();

        if (page === 1) {
            btn_prev.style.display = "none";
            btn_first.style.display = "none";
        } else {
            btn_prev.style.display = "block";
            btn_first.style.display = "block";
        }

        if (page === numPages()) {
            btn_next.style.display = "none";
            btn_last.style.display = "none";

        } else {
            btn_next.style.display = "block";
            btn_last.style.display = "block";

        }
    }

    function numPages() {
        return Math.ceil(objJson.length / records_per_page);
    }

    changePage(1);
}

/**
 * Outputs the recommended movies, based on the movie site shown, to the given page
 */
function getRecommendedMovies() {
    // makes html for recommended movies
    document.querySelector("#recommended").innerHTML = `
        <h2>Anbefalte Filmer</h2>
        <span id="btn_prev"></span>
        <ul class="movies" data-typeOfList="recommended">
        </ul>
        <span id="btn_next"></span>
`;
    // makes html for newly loaned movies
    document.querySelector("#loaned").innerHTML = `
        <h2>Nylig Lånte Filmer</h2>
        <span id="btn_prev"></span>
        <ul class="movies" data-typeOfList="loaned">
        </ul>
        <span id="btn_next"></span>
    `;

    displayRecomendedMovies(document.querySelector('[data-typeOfList="recommended"]'), get_query_string_parameters().id);
    displayLoanedMovies(document.querySelector('[data-typeOfList="loaned"]'));
}

/**
 * This function loads the newest movie releases onto the index page
 */
function loadRecOnIndex(){
    // gets the section to place the movies
    const newMovies = document.querySelector("#newMovies");
    // runs the sorting
    let years = sortByYear();

    // prints the movies to the index page
    pagination(calculateSpace(), years, newMovies);
    // loads the recommended movies to the index page
    getRecommendedMovies();
};

/**
 * Sorts the movie objects after the year the movie was released
 *
 * @returns {Array} - Sorted array
 */
function sortByYear() {
    // make an array for sorting
    let years = [];
    // place every movie in the years array
    for (let movie in movies_object) {
        years.push(movies_object[movie]);
    }
    // sort the array from biggest to smallest
    years.sort((a, b) => b.year - a.year);
    return years;
}

/**
 * Calculates the amount of movies to show on a given page based on its container
 *
 * @returns number of movies to show on page
 */
function calculateSpace() {
    // the width of the movie_objects
    const movieCoverWidth = 133,
        // the container the movies gets printed in
        movieContainer = document.querySelectorAll(".movies");
    // calculate for each section in case there is a difference
    let ul = movieContainer[0];
    // the calculation takes place based on container width
    amount = Math.floor((ul.offsetWidth - parseInt(window.getComputedStyle(ul).paddingLeft.replace("px", ""))) / movieCoverWidth);
    return amount;
}

/**
 * Toggles a class on the advanced search to show and hide it.
 * @param id - which represents the different position on the site: 1 - header, 2 - search results
 */
function showAdvancedSearch(id) {
    const adv = document.querySelector("[data-advanced-search='"+id+"']");
    adv.classList.toggle("close");
}

