let wishList = document.querySelector("#my_wish"),
    wishArray = fromWishToMovie(wish_list);

pagination(calculateSpace(wishList), wishArray, wishList);

