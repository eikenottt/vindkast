function panic(message) {
    // window.history.back();
    alert(message);
}

function add_row(table, left, right) {
    new_row = document.createElement("TR");
    left_cell = document.createElement("TD");
    left_cell.appendChild(left);
    new_row.appendChild(left_cell);

    right_cell = document.createElement("TD");
    right_cell.appendChild(right);
    new_row.appendChild(right_cell);

    table.appendChild(new_row);
}

window.onload = function () {
    query_params = get_query_string_parameters();
    if (!query_params.id) {
        panic("No id given");
        return;
    }

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "http://wildboy.uib.no/mongodb/objects/?filter_id=" + query_params.id, true);

    xhr.responseType = "json";

    xhr.onload = function () {
        movie_object = xhr.response.rows[0];
        //console.log("Response", movie_object);

        // add a "debug-table" on the bottom showing all elements from movie_object
        stats_table = document.getElementById("movie_stat_table");
        for (key in movie_object) {
            left = document.createTextNode(key);
            right = document.createTextNode(movie_object[key]);
            add_row(stats_table, left, right);
        }

    };
    xhr.send();
};
