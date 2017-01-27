(function() {

  "use strict";

  var toggles = document.querySelectorAll(".hamb");
  var menu = document.getElementById("menu");

  console.log(menu);

  for (var i = toggles.length - 1; i >= 0; i--) {
    var toggle = toggles[i];
    toggleHandler(toggle);
  }

  function toggleHandler(toggle) {
    toggle.addEventListener( "click", function(e) {
      e.preventDefault();
      if(this.classList.contains("is-active") === true){
        this.classList.remove("is-active");
        removeClass(menu, 'is-active');
      }
      else {
        this.classList.add("is-active");
        addClass(menu, "is-active");
      }
    });
  }

  function hasClass(el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    }
    else {
      console.log(el.className);
      return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$'));
    }
  }

  function addClass(el, className) {
    if (el.classList){
      el.classList.add(className);
    }
    else if (!hasClass(el, className)) {el.className+= " " + className;}
  }

  function removeClass(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    }
    else if (hasClass(el, className)) {
      var reg = new RegExp('(\\s|^)' + className + '(\\s|$');
      el.className=el.className.replace(reg, ' ');
    }
  }

})();