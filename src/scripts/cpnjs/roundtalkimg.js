//钓友圈轮播图

let cur_round_idx = 0;//当前展示最前的
let roundDataBox = document.getElementById("round-data-lists");
let ddbox = document.querySelector("dl.dl-lists");
let refDataLists = document.querySelectorAll("dl.dl-lists dd.dd-item");
let round_lists = document.querySelectorAll("#round-data-lists li.round-move-item");//轮播的列表项
let roundLen = round_lists.length;
let arcDeg = 360 / roundLen;//每个项旋转角度


//初始化基本位置
function talk_round_init() {

    round_lists[cur_round_idx].style.transform = "rotateY(0deg) scale(1.2) translateZ(4rem)";
    round_lists[cur_round_idx].style.opacity = 1;
    for (let i = 0; i < roundLen; i++) {
        if (i != cur_round_idx) {
            round_lists[i].style.opacity = 0.4;

            if (i % 2 == 0) {

                round_lists[i].style.transform = "rotateY(" + arcDeg + "deg) scale(0.8) translateZ(4rem)";
            } else {
                round_lists[i].style.transform = "rotateY(" + (-1 * arcDeg) + "deg) scale(0.8) translateZ(4rem)";

            }
        }
    }
    changeRefText();
  

}

//轮播（改变transform:scale属性），opacity
function changeRound() {
    // round_lists[cur_round_idx].style.transform="rotateY(0deg) scale(1.2) translateZ(6rem)";
    round_lists[cur_round_idx].style.opacity = 1;
    let cur_item_transform = round_lists[cur_round_idx].style.transform;
    let cur_rep_tran = cur_item_transform.replace(/scale(\([\S]+\))/, "scale(1.2)");
    round_lists[cur_round_idx].style.transform = cur_rep_tran;


    for (let i = 0; i < roundLen; i++) {
        if (i != cur_round_idx) {
            round_lists[i].style.opacity = 0.4;

            let temp_item_transform = round_lists[i].style.transform;
            let repTransform = temp_item_transform.replace(/scale(\([\S]+\))/, "scale(0.8)");
            round_lists[i].style.transform = repTransform;
            // round_lists[i].style.transform="rotateY("+arcDeg+"deg) scale(0.8) translateZ(4rem)";

        }
    }
}

//该变对应内容
function changeRefText() {
    //    let cur=$("dl.dl-lists dd.dd-item").eq(cur_round_idx).siblings().hide(10).end().show(1000);
    //     console.log(cur);
    refDataLists[cur_round_idx].style.transition = "all 1s";
    refDataLists[cur_round_idx].style.opacity = 0;
    refDataLists[cur_round_idx].style.height = 0;

    refDataLists[cur_round_idx].style.display = "block";

    setTimeout(function () {
        refDataLists[cur_round_idx].style.height = "6rem";
        refDataLists[cur_round_idx].style.opacity = 1;
    }, 100);

    for (let i = 0; i < roundLen; i++) {
        if (cur_round_idx != i) {

            refDataLists[i].style.display = "none";
        }
    }
}

// git@git.zhlh6.cn:lipmtb/anglerWebApp


talk_round_init();
let cur_deg = 1;

setInterval(function () {
    roundDataBox.style.transform = "rotateY(" + (arcDeg * cur_deg) + "deg)";
    cur_deg++;
    cur_round_idx = cur_round_idx >= roundLen - 1 ? 0 : cur_round_idx + 1;

    changeRound();
    changeRefText();

}, 5000);



