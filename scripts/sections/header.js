document.write(`
     <h1><a href="index.html" title="Vindkast">Vindkast</a></h1>
            <nav>
                <!-- Hamburger meny -->
                <input type="checkbox" id="hamburger"/>
                <label for="hamburger" class="whitebox-l">
                </label>
                <!-- Søkeskjema gir mulighet for å søke etter film tittel. -->
                <div id="search-div">
                    <form id="search-form" action="search_results.html" method="get">
                        <!-- Avansert søk i header -->
                        <input id="film_title" name="film_title" type="text" placeholder="e.g. King Kong" class="search">
                        <input type="submit" id="submit_search" value="Søk">
                    </form>
                    <div id="advanced-search-header">
                            <span>Søk etter tittel eller gjør et </span>
                            <button onclick="showAdvancedSearch(1)" data-popout">Avansert søk</button>
                        </div>
                    <div data-advanced-search="1" class="close popout">
                        <form id="search" action="search_results.html" method="get">
                            <fieldset>
                                <legend>Avansert Søk</legend>
                                <div>
                                    <label for="film_title-header">Film tittel</label>
                                    <input id="film_title-header" name="film_title" type="text" placeholder="e.g. King Kong" >
                                </div>
                                <div>
                                    <label for="actor-header">Skuespiller</label>
                                    <input id="actor-header" name="actor" type="text" placeholder="e.g. Tom Hanks" >
                                </div>
                                <div>
                                    <label for="director-header">Regissør</label>
                                    <input id="director-header" name="director" type="text" placeholder="e.g. Tom Hanks" >
                                </div>
                                <div>
                                    <label for="genre-header">Sjanger</label>
                                    <input id="genre-header" name="genre" type="text" placeholder="Drama">
                                </div>
                                <div>
                                    <label for="country-header">Land</label>
                                    <input id="country-header" name="country" type="text" placeholder="Frankrike">
                                </div>
                            </fieldset>
                            <input type="submit" id="submit_search" value="Søk">
                        </form>
                    </div>
                </div>
                <label class="menuicon" for="hamburger">
                    <span></span>
                </label>
                <ul id="menu">
                    <li class="menuItem" id="innhold">Innhold</li>
                    <li class="menuItem"><a href="search_results.html?film_title="><img class="navimg" src="img/ikon/play.svg" alt="menyikon">Filmer A-Å</a></li>
                    <li class="menuItem"><a href="search_results.html?genre=dokumentar"><img class="navimg" src="img/ikon/kamera.svg" alt="menyikon">Dokumentarer</a></li>
                    <li class="menuItem"><a href="#"><img class="navimg" src="img/ikon/stol.svg" alt="menyikon">Regissører</a></li>
                    <li class="menuItem"><a href="#"><img class="navimg" src="img/ikon/siluett.svg" alt="menyikon">Skuespillere</a></li>
                    <li class="menuItem" id="minside"><a href="myspace.html">Min side (Ola123)</a></li>
                    <!-- Åpne og lukke meny (accordion) -->
                    <li class="accordion menuItem">
                        <input type="checkbox" id="check-1"/>
                        <label class="hoverColor" for="check-1"><img class="navimg" src="img/ikon/hjul.svg" alt="menyikon">Mine Lån</label>
                        <div id="loan" class="accordion-menu">
                            
                        </div>
                    </li>
                    <li class="accordion menuItem">
                        <!-- Ønskede filmer -->
                        <input type="checkbox" id="check-2"/>
                        <label class="hoverColor" for="check-2"><img class="navimg" src="img/ikon/fav.svg" alt="menyikon">Ønskeliste</label>
                        <div id="wish" class="accordion-menu">
                            
                        </div>
                        </li> <!-- Slutt på accordion -->
                        <li class="menuItem" id="rutine-side"><a href="rutiner.html"><img class="navimg" src="img/ikon/rutinecheck.svg">Rutiner</a></li>
                        <!-- Logg ut -->
                        <li class="menuItem"><a href="#"><img class="navimg" src="img/ikon/ut.svg">Logg ut</a></li>
                        </ul> <!-- Slutt på Hamburger menyen -->
                </nav> `);

const loan = document.querySelector("#loan"),
    wish = document.querySelector("#wish");
loan.innerHTML = listings(loan_list);
wish.innerHTML = listings(wish_list);