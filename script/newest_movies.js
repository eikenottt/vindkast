years = [];
window.onload = function() {

    newMovies = document.querySelector("#newMovies");
    prev = null;
    for(movie in movies_object) {
        years.push(movies_object[movie]);
    }
    years.sort((a,b) => b.year-a.year);

    for(i = 0; i < 10; i++){
        newMovies.innerHTML += `<li>
                                <a href="show_movie.html?id=${years[i].id}" class="movie-info movie-info-a">
                                    <img id="img${years[i].id}" src="https://nelson.uib.no/o/${(String(years[i].id).length === 4) ? String(years[i].id).substring(0,1) : 0}/${years[i].id}.jpg" 
                                         alt="${years[i].otitle}" onerror="this.onerror=null;this.src='https://res.cloudinary.com/cinebee/image/upload/v1452103746/edg9gkd0sawkc34siol1.jpg'">
                                    <span>${years[i].otitle}</span>
                                </a>
                            </li>`;
    }
};
