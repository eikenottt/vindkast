window.onload = function() {

    const newMovies = document.querySelector("#newMovies");

    let years = sortByYear();

    writeMovieHTML(years, newMovies, 10);
};


function sortByYear() {
    let years = [];
    for(let movie in movies_object) {
        years.push(movies_object[movie]);
    }
    years.sort((a,b) => b.year-a.year);
    return years;
}



