window.onload = function() {
    let loaned = [];

    const newMovies = document.querySelector("#newMovies"),
        newlyloanedMovies = document.querySelector("#newlyloanedMovies");

    let years = sortByYear();

    writeHTML(years, newMovies, 10);

    for(let i = 0; i < 10; i++){
        const pickedMovie = pickRandomMovie(movies_object);
        if(!loaned.includes(pickedMovie))
            loaned.push(pickedMovie);
    }

    writeHTML(loaned, newlyloanedMovies, 10);

    displayRecomendedMovies();
};

function pickRandomMovie(obj) {
    let result;
    let count = 0;
    for(let id in obj) {
        if(Math.random() < 1/++count)
            result = id;
    }
    return obj[result];
}

function sortByYear() {
    let years = [];
    for(let movie in movies_object) {
        years.push(movies_object[movie]);
    }
    years.sort((a,b) => b.year-a.year);
    return years;
}


function displayRecomendedMovies() {
    genreCount = 0;
    folkCount = 0;
    otherCount = 0;
    recomendedMovies = [];
    ratings = sortAfterRating();
    for(i = 0; i < ratings.length; i++) {
        pickMovie = pickRandomMovie(ratings).movieId;
        movie_id = pickMovie.id;
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

