window.onload = function() {
    list_element = document.getElementById("all_movies");
    for (movie in movies_object){
        movie_details = movies_object[movie];
        list_item = document.createElement("LI");

	// prepare the link
        item_link = document.createElement("A");
        item_link.href = "show_movie.html?id=" + movie;
		link_text = document.createTextNode(movie_details["otitle"]);
        item_link.appendChild(link_text);
	
        list_item.appendChild(item_link);
        list_element.appendChild(list_item);      
    }
}
