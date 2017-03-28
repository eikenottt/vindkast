let years = [];
let loaned = [];
window.onload = function() {

    const newMovies = document.querySelector("#newMovies");
    const newlyloanedMovies = document.querySelector("#newlyloanedMovies");

    for(let movie in movies_object) {
        years.push(movies_object[movie]);
    }
    years.sort((a,b) => b.year-a.year);

    writeHTML(years, newMovies);

    for(let i = 0; i < 10; i++){
        const pickedMovie = pickRandomMovie(movies_object);
        if(!loaned.includes(pickedMovie))
            loaned.push(pickedMovie);
    }

    writeHTML(loaned, newlyloanedMovies);


};

function writeHTML(array, place){
    for(let i = 0; i < 10; i++){
        place.innerHTML += `<li>
                                <a href="show_movie.html?id=${array[i].id}" class="movie-info movie-info-a">
                                    <img id="img${array[i].id}" src="https://nelson.uib.no/o/${(String(array[i].id).length === 4) ? String(array[i].id).substring(0,1) : 0}/${array[i].id}.jpg" 
                                         alt="${array[i].otitle}" onerror="this.onerror=null;this.src='https://res.cloudinary.com/cinebee/image/upload/v1452103746/edg9gkd0sawkc34siol1.jpg'">
                                    <span>${array[i].otitle}</span>
                                </a>
                            </li>`;
    }
}

function pickRandomMovie(obj) {
    let result;
    let count = 0;
    for(let id in obj) {
        if(Math.random() < 1/++count)
            result = id;
    }
    return obj[result];
}
