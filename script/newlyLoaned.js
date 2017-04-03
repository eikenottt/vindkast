document.write(`<section>
        <h2>Nylig Lånte Filmer</h2>
        <ul id="newlyLoanedMovies" class="movies">
        </ul>
  </section>`);

const newlyLoaned = document.querySelector("#newlyLoanedMovies");

displayLoanedMovies(newlyLoaned);