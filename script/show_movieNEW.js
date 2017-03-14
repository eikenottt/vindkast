window.onload = function() {
    query_params = get_query_string_parameters();
    movie_object = movies_object[query_params.id];

    title = document.querySelector("#title");
    language = document.querySelector("#lang");
    cover_image = document.querySelector("#cover_image");
    duration = document.querySelector("#duration");
    director = document.querySelector("#dir");
    about_movie = document.querySelector("#about_movie");
    video_trailer = document.querySelector(".video-container");
    nor_title = document.querySelector("#no-title");

    title.innerHTML = `${movie_object.otitle}`;
    language.innerHTML = `${movie_object.country} ${movie_object.year}`;
    duration.innerHTML = `(${movie_object.length} minutter)`;
    director.innerHTML = `${movie_object.dir}`;
    about_movie.innerHTML = `${movie_object.description}`;
    nor_title.innerHTML = `Norsk tittel: ${movie_object.ntitle}`;
    video_trailer.innerHTML = `${(movie_object["youtube trailer id"] == "") ? video_trailer.classList.remove("video-container") && "" : '<iframe class="trailer" src="https://www.youtube-nocookie.com/embed/${movie_object["youtube trailer id"]}?rel=0&amp;showinfo=0" allowfullscreen></iframe>'}`;



};