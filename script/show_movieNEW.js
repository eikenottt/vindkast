
window.onload = function() {
    query_params = get_query_string_parameters();
    movie_id = query_params.id;
    movie_object = movies_object[movie_id];
    review = reviews_object[movie_id];

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

    document.title = `Vindkast - ${movie_object.otitle}`;

    // Title of the movie
    title.innerHTML = `${movie_object.otitle}`;
    // Country of origin and year of the movie
    language.innerHTML = `<div>Land: ${showCountryName(movie_object.country)}</div> <div>Utgivelsesår: ${movie_object.year}</div>`;
    // Duration of the movie in minutes
    duration.innerHTML = `(${(movie_object.length != (null || 0)) ? `${movie_object.length} minutter)` : "Ingen informasjon om lengden på filmen)"}`;
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
    about_movie.innerHTML = `${(movie_object.description != (null || "" )) ? movie_object.description : "Ingen omhandling tilgjengelig"}`;
    // Norwegian title of the movie
    nor_title.innerHTML = `Norsk tittel: ${movie_object.ntitle}`;
    // cover of the movie
    cover_image.innerHTML = `<img id="img${movie_id}" src="https://nelson.uib.no/o/${(String(movie_id).length === 4) ? String(movie_id).substring(0,1) : 0}/${movie_id}.jpg" 
                                         alt="${movie_object.otitle}" onerror="this.onerror=null;this.src='https://res.cloudinary.com/cinebee/image/upload/v1452103746/edg9gkd0sawkc34siol1.jpg'">`;


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
        img = document.createElement("img");
        img.setAttribute("src", link);
        img.setAttribute("onerror", "this.onerror=null");
        if(img.getAttribute("onerror") != null)
        pictureArr.push(link);
    }
    pictureArr.forEach((pic, i) => {
        pictures.innerHTML += `<div class="image" id="limage${i}" ></div>`;
        document.querySelector(`#limage${i}`).style.backgroundImage = `url('${pic}')`;
    });


}

function showFolk(movieObjList, htmlTag, type) {

    let folks = movieObjList;

    if(!Array.isArray(movieObjList))
     folks = (movieObjList != null) ? movieObjList.trim().split(/[\s+,/]{2,}/) : [];

    //folks.forEach(pers => folk.innerHTML += `<a href="http://www.imdb.com/find?ref_=nv_sr_fn&q=${pers}&s=nm" target="_blank">${pers}</a>,`);
    folks.forEach(pers => {
        pers = pers.replace(",","");
        htmlTag.innerHTML += `<a href="search_results.html?${type}=${pers}">${pers}</a>, `
    });
}

function displayRecomendedMovies() {
    genreCount = 0;
    folkCount = 0;
    otherCount = 0;
    recomendedMovies = [];
    ratings = sortAfterRating();
    for(i = 0; i < ratings.length; i++) {

        if(genreCount < 4){
            if((genres_object[ratings[i].movieId.id] != undefined) ? genres_object[movie_id].some(v => genres_object[ratings[i].movieId.id].indexOf(v) >= 0) : false) {
                if(ratings[i].movieId.id === movie_object.id || recomendedMovies.includes(ratings[i].movieId)) continue;
                recomendedMovies.push(ratings[i].movieId);
                genreCount++;
            }

        }

        if (folkCount < 4) {
            if (((ratings[i].movieId.folk != null && movie_object.folk != null) ? movie_object.folk.trim().split(",").some(v => ratings[i].movieId.folk.trim().split(",").indexOf(v) >= 0) : false)) {
                recMovie_id = ratings[i].movieId.id;
                if (recMovie_id === movie_object.id || recomendedMovies.includes(ratings[i].movieId) ) continue;
                recomendedMovies.push(ratings[i].movieId);
                folkCount++;
            }

        }

    }
    recomendedMovies.forEach(mov => {
        recomended.innerHTML += `<li>
                    <a href="show_movie.html?id=${mov.id}" class="movie-info movie-info-a">
                        <img id="img${mov.id}" src="https://nelson.uib.no/o/${(String(mov.id).length === 4) ? String(mov.id).substring(0, 1) : 0}/${mov.id}.jpg" 
                             alt="${mov.otitle}" onerror="this.onerror=null;this.src='https://res.cloudinary.com/cinebee/image/upload/v1452103746/edg9gkd0sawkc34siol1.jpg'">
                        <span>${mov.otitle}</span>
                    </a>
                </li>`
    })

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
