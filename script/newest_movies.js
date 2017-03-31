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

