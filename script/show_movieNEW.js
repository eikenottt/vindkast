window.onload = function() {
    query_params = get_query_string_parameters();
    movie_id = query_params.id;
    movie_object = movies_object[movie_id];

    pictureArr = [];

    recomendedMovies = [];

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

    document.title = movie_object.otitle;

    // Title of the movie
    title.innerHTML = `${movie_object.otitle}`;
    // Country of origin and year of the movie
    language.innerHTML = `${movie_object.country} ${movie_object.year}`;
    // Duration of the movie in minutes
    duration.innerHTML = `(${movie_object.length} minutter)`;
    // genre
    genre.innerHTML = `${genres_object[movie_id]}`;
    // Director of the movie
    director.innerHTML = `${movie_object.dir}`;
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
    } else {
        video_trailer.innerHTML = `<iframe class="trailer" src="https://www.youtube-nocookie.com/embed/${movie_object["youtube trailer id"]}?rel=0&amp;showinfo=0" allowfullscreen></iframe>`;
    }

    counter = 0;
    for(mov_id in movies_object) {
        if(movies_object[mov_id].otitle.toLowerCase().includes(movie_object.otitle.toLowerCase().substring(0,3)) && movies_object[mov_id].country.includes(movie_object.country)){
            recMovie_id = movies_object[mov_id].id;
            if(recMovie_id === movie_object.id) continue;
            counter++;
            if(counter < 8) {
                recomended.innerHTML += `<li>
                        <a href="show_movie.html?id=${recMovie_id}" class="movie-info movie-info-a">
                            <img id="img${recMovie_id}" src="https://nelson.uib.no/o/${(String(recMovie_id).length === 4) ? String(recMovie_id).substring(0, 1) : 0}/${recMovie_id}.jpg" 
                                 alt="${movies_object[recMovie_id].otitle}" onerror="this.onerror=null;this.src='https://res.cloudinary.com/cinebee/image/upload/v1452103746/edg9gkd0sawkc34siol1.jpg'">
                            <span>${movies_object[recMovie_id].otitle}</span>
                        </a>
                    </li>`;
            }

        }
    }




};
function getImages(id){
    alphabet = ["b", "c", "d"];
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
