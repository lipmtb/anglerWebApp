//轮播图右边的广播：动画
// const scrollSpan = document.querySelector("span#scroll-text");
// console.log(scrollSpan);
// scrollSpan.style.transform = "translate(8.4rem,0)";
// function oneTurn () {

//     setTimeout(function () {
//         let spanlen = scrollSpan.innerText.length;
//         spanlen = spanlen / 2;

//         scrollSpan.style.transition = "transform "+(spanlen/4)+"s linear";

//         scrollSpan.style.transform = "translate(-" + spanlen + "rem,0)";
//     }, 100);


// }

// oneTurn();

// scrollSpan.addEventListener("transitionend",function(e){
//     console.log("ended",e);
//     scrollSpan.style.transition = "";
//     scrollSpan.style.transform = "translate(8.4rem,0)";
//     oneTurn();
// },false);

//jquery method
$("#scroll-text").css("transform", "translate(8.4rem)");

// setTimeout(oneTurn, 80);//关闭
function oneTurn() {
    let spanlen = $('#scroll-text').text().length;
    spanlen = (spanlen / 2);
    let transtr = "translate(-" + spanlen + "rem,0)";

    $("#scroll-text").css("transition", "transform "+(spanlen/4)+"s linear").css({
        transform: transtr
    })
}

$("#scroll-text").on("transitionend",function(){
    $("#scroll-text").css("transition", "").css("transform", "translate(8.4rem)");
    setTimeout(oneTurn,100);
})


