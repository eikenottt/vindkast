let wishList = document.querySelector("#my_wish"),
    wishArray = fromWishToMovie(wish_list);

writeMovieHTML(wishArray, wishList, wishArray.length);

