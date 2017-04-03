document.write(`
  <section>
        <h2>Anbefalte Filmer</h2>
        <ul class="movies" id="recomended">
        </ul>
  </section>


`);

const
    recomended = document.querySelector("#recomended");

displayRecomendedMovies(recomended, get_query_string_parameters().id);

