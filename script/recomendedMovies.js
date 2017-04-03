document.write(`
    <section>
        <h2>Nylig Lånte Filmer</h2>
        <ul id="newlyLoanedMovies" class="movies">
        </ul>
  </section>
  <section>
        <h2>Anbefalte Filmer</h2>
        <ul class="movies" id="recomended">
        </ul>
  </section>


`);

const newlyLoaned = document.querySelector("#newlyLoanedMovies"),
    recomended = document.querySelector("#recomended");

displayRecomendedMovies(recomended, get_query_string_parameters().id);
displayLoanedMovies(newlyLoaned);

