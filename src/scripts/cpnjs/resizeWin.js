function init() {
    let tipMain = document.querySelector("div.tip-main");
    let contentWidth = parseFloat(document.defaultView.getComputedStyle(tipMain).width);
      console.log(contentWidth);

    let tipType = document.querySelector(".tip-type");

      console.log(tipType.offsetWidth);

    tipType.style.marginLeft = -(contentWidth + tipType.offsetWidth) + "px";
}

(function () {
    init();
    window.onresize = function () {
        // console.log(e);
        let tipMain = document.querySelector("div.tip-main");
        let contentWidth = parseFloat(document.defaultView.getComputedStyle(tipMain).width);
        //  console.log(contentWidth);

        let tipType = document.querySelector(".tip-type");

        //  console.log(tipType.offsetWidth);

        tipType.style.marginLeft = -(contentWidth + tipType.offsetWidth) + "px";

    }
}())