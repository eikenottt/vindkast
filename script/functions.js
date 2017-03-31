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
