window.onload = function () {
    const query_params = get_query_string_parameters(),
        movie_id = query_params.id,
        movie_object = movies_object[movie_id],
        review = reviews_object[movie_id],

        title = document.querySelector("#title"),
        language = document.querySelector("#lang"),
        cover_image = document.querySelector("#cover_image"),
        duration = document.querySelector("#duration"),
        genre = document.querySelector("p#genre"),
        director = document.querySelector("#dir"),
        about_movie = document.querySelector("#about_movie"),
        video_trailer = document.querySelector(".video-container"),
        nor_title = document.querySelector("#no-title"),
        pictures = document.querySelector("#frame"),
        recomended = document.querySelector("#recomended"),
        folk = document.querySelector("#folk"),
        rating = document.querySelector("#ratingnr"),
        newlyloanedMovies = document.querySelector("#newlyloanedMovies"),
        imdb = document.querySelector("#imdb"),
        review_text = document.querySelector("#review");


    document.title = `Vindkast - ${movie_object.otitle}`;

    // Title of the movie
    title.innerHTML = movie_object.otitle;
    // Imdb link
    imdb.innerHTML = (movie_object.imdb_id !== null && movie_object.imdb_id !== "" && movie_object.imdb_id.substring(0, 1) === "t") ? `<a href="http://www.imdb.com/title/${movie_object.imdb_id}" target="_blank">Se mer på Imdb.com</a>` : "";
    // Country of origin and year of the movie
    language.innerHTML = `<div><span>Land: </span>${showInformationAboutMovie(showCountryName(movie_object.country), "country")}</div> <div><span>Utgivelsesår: </span>${movie_object.year}</div>`;
    // Duration of the movie in minutes
    duration.innerHTML = `(${(movie_object.length !== (null && 0)) ? `${movie_object.length} minutter)` : "Ingen informasjon om lengden på filmen)"}`;
    // Rating
    rating.innerHTML = getAvgRating(review);
    // genre
    genre.innerHTML = `<span>Sjanger: </span> ${showInformationAboutMovie(genres_object[movie_id], "genre")}`;
    //genre.innerHTML = `Sjanger: ${genres_object[movie_id]}`;
    // Director of the movie
    director.innerHTML = showInformationAboutMovie(movie_object.dir, "director");
    // Folk in the movie
    folk.innerHTML = showInformationAboutMovie(movie_object.folk, "actor");
    // About the movie
    about_movie.innerHTML = `${(movie_object.description !== (null && "" )) ? movie_object.description : "Ingen omhandling tilgjengelig"}`;
    // Norwegian title of the movie
    nor_title.innerHTML = `Norsk tittel: ${movie_object.ntitle}`;
    // cover of the movie
    cover_image.innerHTML = `<img id="img${movie_id}" src="https://nelson.uib.no/o/${(String(movie_id).length === 4) ? String(movie_id).substring(0, 1) : 0}/${movie_id}.jpg" 
                                         alt="${movie_object.otitle}" onerror="this.onerror=null;this.src='https://res.cloudinary.com/cinebee/image/upload/v1452103746/edg9gkd0sawkc34siol1.jpg'">`;

    // user comment
    review_text.innerHTML = getReviews();




    pictures.innerHTML = getImages(movie_id);

    if (movie_object["youtube trailer id"] === "") {
        video_trailer.remove();
        cover_image.firstChild.classList.add("big_cover");
    } else {
        video_trailer.innerHTML = `<iframe class="trailer" src="https://www.youtube-nocookie.com/embed/${movie_object["youtube trailer id"]}?rel=0&amp;showinfo=0" allowfullscreen></iframe>`;
    }

    getRecommendedMovies();

    function getReviews() {
        html = "";
        for (userid in review) {
            html +=`<h4 id="brukernavn"> ${review[userid].username} </h4> <p id="dato"> Dato: ${review[userid].mod_date}</p> 
            <p id="commentRating"> Rating: ${review[userid].rating} </p>
            <p id="kommentar"> Kommentar: ${review[userid].comment} </p>`
        }
        return html; 
    } 

};

