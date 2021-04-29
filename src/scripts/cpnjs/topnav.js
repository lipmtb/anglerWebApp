
;(function topnavfn() {
    console.log("topnavfn");
    $(".nav-link a").click(function (e) {
        $(this).addClass("nav-cur-act");
        $(this).siblings().removeClass("nav-cur-act");
        e.preventDefault();
    })
    return topnavfn;
})();

