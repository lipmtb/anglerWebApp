// 轮播图

let imglists = document.querySelectorAll("ul.md-imglists li.md-li");//轮播的图片
let btnLists = document.querySelectorAll("div.thumb-lists a.thumb-item");//轮播下方按钮

let lens = imglists.length;//图片数量
let li_one = imglists[0];
let li_bounding = li_one.getBoundingClientRect();
let li_wd = li_bounding.width;//每张图宽度

let cur_idx = 0;//刚开始的图片索引
let prev_idx = lens - 1;

window.addEventListener("resize", function () {
    let lists = document.querySelectorAll("ul.md-imglists li.md-li");
    let li_resize = lists[0];
    let li_bound = li_resize.getBoundingClientRect();
    li_wd = li_bound.width;//每张图宽度
}, false);

//初始化轮播图
mdimg_init();
changeSelectedInit();
let timer = setInterval(run_img, 4000);//启动轮播

function mdimg_init() {
    console.log("mdimginit");
    btnLists[cur_idx].style.backgroundColor = "red";
    for (let i = 0; i < imglists.length; i++) {
        if (i != cur_idx) {
            imglists[i].style.left = li_wd + "px";
        }

        imglists[i].addEventListener("transitionend", function (e) {

            let tar = e.currentTarget;
            //  console.log(tar,cur_idx);
            if (i!=cur_idx) {

                tar.style.transition = "";
                tar.style.left = li_wd + "px";
                tar.style.zIndex = 0;
            }
        })
    }
}






function run_img() {
    prev_idx = cur_idx;
    imglists[cur_idx].style.transition = "left 1s linear,background-color 0.5s";
    imglists[cur_idx].style.left = -li_wd + "px";
    btnLists[cur_idx].style.backgroundColor = "#37291c";

    cur_idx++;
    if (cur_idx > lens - 1) {
        cur_idx = 0;
    }
    imglists[cur_idx].style.transition = "left 1s linear,backgeround-color 0.5s";
    imglists[cur_idx].style.left = 0;
    imglists[cur_idx].style.zIndex = 2;
    btnLists[cur_idx].style.backgroundColor = "red";

}

function changeSelectedInit() {
    for (let i = 0; i < lens; i++) {
        btnLists[i].addEventListener("mouseenter", function () {
            clearInterval(timer);
            if (i < cur_idx) { //从左往右
            
                if (i === cur_idx - 1) {
                    prev_idx = cur_idx;
                    imglists[cur_idx].style.left = li_wd + "px";
                    btnLists[cur_idx].style.backgroundColor = "#37291c";
                    let computedStyle = document.defaultView.getComputedStyle(imglists[i]);
                    if (parseFloat(computedStyle.left) > 0) {

                        imglists[i].style.transition = "";
                        imglists[i].style.left = -li_wd + "px";
                    }

                    setTimeout(function () {
                        imglists[i].style.transition = "left 1s linear,backgeround-color 0.5s";
                        imglists[i].style.left = 0;
                        imglists[i].style.zIndex = 2;
                        btnLists[i].style.backgroundColor = "red";
                        cur_idx=i;
                    }, 0);

                }
            }

            if (i > cur_idx) {
          
                if (i === cur_idx + 1) {
                    prev_idx = cur_idx;
                    imglists[cur_idx].style.left = -li_wd + "px";
                    btnLists[cur_idx].style.backgroundColor = "#37291c";

                    imglists[i].style.transition = "left 1s linear,backgeround-color 0.5s";
                    imglists[i].style.left = 0;
                    imglists[i].style.zIndex = 2;
                    btnLists[i].style.backgroundColor = "red";
                    cur_idx=i;
                }

            }


        })

        btnLists[i].addEventListener("mouseleave", function () {
            timer = setInterval(run_img, 4000);
        })
    }

}