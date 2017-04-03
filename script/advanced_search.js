document.write{` <form id="search" action="../search_results.html" method="get">
		<div>
			<h1>Advanced search</h1>
			<h2>Her blir det mulig å søke etter filmer basert på tittel, skuespillere, sjangere, land og/eller regissør</h2>
		</div>
		<fieldset>
			<legend>Søk</legend>
			<div>
				<label for="film_title">Film tittel</label>
				<input id="film_title" name="film_title" type="text" placeholder="e.g. King Kong" >
			</div>
			<div>
				<label for="actor">Skuespiller</label>
				<input id="actor" name="actor" type="text" placeholder="e.g. Tom Hanks" >
			</div>
			<div>
				<label for="director">Regissør</label>
				<input id="director" name="director" type="text" placeholder="e.g. Tom Hanks" >
			</div>
			<div>
				<label for="genre">Sjanger</label>
				<input id="genre" name="genre" type="text" placeholder="Drama">
			</div>
			<div>
				<label for="country">Land</label>
				<input id="country" name="country" type="text" placeholder="Frankrike">
			</div>	
		</fieldset>
		<input type="submit" id="submit_search" value="Søk">
	</form> `
}