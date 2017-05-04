let loanList = document.querySelector("#my_loan"),
    loanArray = fromWishToMovie(loan_list);

pagination(calculateSpace(loanList), loanArray, loanList);