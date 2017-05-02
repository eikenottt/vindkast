function show_search_results() {
    query_params = get_query_string_parameters();

    result_list = document.getElementById("res_list");

    if (query_params.film_title) {
        film_title = document.getElementById("film_title");
        film_title.innerHTML = query_params.film_title;

        for (index in movies_object) {
            movie = movies_object[index];
            test_title = movie.otitle.toLowerCase();
            query_title = query_params.film_title.toLowerCase();
            if (test_title.indexOf(query_title) >= 0) {
                film_name = document.createTextNode(movie.otitle);
                details_url = "show_movie.html?id=" + movie.id;
                link_el = document.createElement("A");
                link_el.appendChild(film_name);
                link_el.href = details_url;

                list_el = document.createElement("LI");
                list_el.appendChild(link_el);
                result_list.appendChild(list_el);
            }
        }
    }

    if (query_params.actor) {
        actor = document.getElementById("actor");
        actor.innerHTML = query_params.actor;
    }

    if (query_params.director) {
        director = document.getElementById("director");
        director.innerHTML = query_params.director;
    }

    if (query_params.genre) {
        genre = document.getElementById("genre");
        genre.innerHTML = query_params.genre;
    }

    if (query_params.country) {
        country = document.getElementById("country");
        country.innerHTML = query_params.country;
    }
}
