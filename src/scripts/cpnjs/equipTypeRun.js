//装备类型轮播


let curEquipIdx = 2;//当前最前的装备类型图的索引
let equipTypeLists = document.querySelectorAll("ul.equip-slide-lists li.equip-slide-item");
let equipFooterTags=document.querySelectorAll("ul.equip-type-tags li.equip-tag-item");
let equipTypeLen = equipTypeLists.length;//要轮播的图片数量

let halfLen = (equipTypeLen - 1) / 2;//一边放的图片数量

// 装备图片轮播
function equipRunTurn() {
    equipFooterBtnCh();
    equipTypeLists[curEquipIdx].style.transform="scale(1.4)";
    equipTypeLists[curEquipIdx].style.zIndex=9;
    equipTypeLists[curEquipIdx].style.opacity=1;
    for(let i=1;i<=halfLen;i++){
        let rightIdx=curEquipIdx+i;
        rightIdx=rightIdx>equipTypeLen-1?rightIdx%equipTypeLen:rightIdx;
        let leftIdx=curEquipIdx-i;
        leftIdx=leftIdx>=0?leftIdx:equipTypeLen+leftIdx;

        //左边
        equipTypeLists[leftIdx].style.transform="translate(-"+2*i+"rem)";
        equipTypeLists[leftIdx].style.zIndex=5-i;
        equipTypeLists[leftIdx].style.opacity=0.2*(5-i);
        //右边
        equipTypeLists[rightIdx].style.transform="translate("+2*i+"rem)";
        equipTypeLists[rightIdx].style.zIndex=5-i;
        equipTypeLists[rightIdx].style.opacity=0.2*(5-i);
    }
}


// 下方按钮变化
function equipFooterBtnCh(){
    equipFooterTags[curEquipIdx].style.backgroundColor="orange";
    equipFooterTags[curEquipIdx].style.color="#fff";
    equipFooterTags[curEquipIdx].style.fontWeight=800;

    for(let i=0;i<equipTypeLen;i++){
        if(i!=curEquipIdx){
            equipFooterTags[i].style.backgroundColor="#fff";
            equipFooterTags[i].style.color="#000";
            equipFooterTags[i].style.fontWeight=400;
        }
    }
}



equipRunTurn();//初始化装备类型轮播
listenMouseEnterLeave();
let equipRunTimer=setInterval(function(){
    curEquipIdx++;
    curEquipIdx=curEquipIdx>equipTypeLen-1?0:curEquipIdx;
    equipRunTurn();
},3000);




//下方按钮监听鼠标mouseenter事件，切换到对应的图片
function listenMouseEnterLeave(){
  
    for(let i=0;i<equipTypeLen;i++){
        equipFooterTags[i].addEventListener("mouseenter",function(){
          
           clearInterval(equipRunTimer);
            if(i!=curEquipIdx){
                curEquipIdx=i;
                equipRunTurn();
            }
          
        },false);
        equipFooterTags[i].addEventListener("mouseleave",function(){
          
             equipRunTimer=setInterval(function(){
                curEquipIdx++;
                curEquipIdx=curEquipIdx>equipTypeLen-1?0:curEquipIdx;
                equipRunTurn();
            },3000);
            
           
         },false);
    }
}