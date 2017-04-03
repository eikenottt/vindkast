
let wishList = document.querySelector("#my_wish"),
    wishArray = fromWishToMovie(wish_list);

document.write(writeMovieHTML(wishArray,wishList,wishArray.length));
