var current_user = "bruker1"

function setup_frontpage() {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "http://wildboy.uib.no/mongodb/profiles/?filter_username=" + current_user + "&limit=1", true);
    xhr.responseType = "json";
    xhr.onload = function() {
	profile = xhr.response.rows[0];

	// show username
	username_span = document.getElementById("username");
	if (username_span)
	    username_span.innerHTML = profile.username;
	else
	    console.log("Fant ikke brukernavn-elementet.");
	
	// show loans
	loans_list = document.getElementById("mine_lån");
	if (loans_list) {
	    for (movie_id_index in profile.loans) {
		movie_id = profile.loans[movie_id_index];
		list_item = document.createElement("LI");
		list_item.appendChild(document.createTextNode("id = " + movie_id));
		loans_list.appendChild(list_item);
	    }
	} else
	    console.log("Fant ikke lånelisten.");

	// show mylist
	mylist_list = document.getElementById("min_liste");
	if (mylist_list) {
	    for (movie_id_index in profile.mylist) {
		movie_id = profile.mylist[movie_id_index];
		list_item = document.createElement("LI");
		list_item.appendChild(document.createTextNode("id = " + movie_id));
		mylist_list.appendChild(list_item);
	    }
	} else
	    console.log("Fant ikke Min liste-listen.");
    };
    xhr.send();
}
