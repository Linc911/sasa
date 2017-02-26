//=======公用====
function getStyle(obj,attr) {
    return obj.currentStyle?obj.currentStyle(attr):getComputedStyle(obj)[attr];
};
//=======JSONP=====
function categoryGoods(json) {
    var oContain=document.querySelectorAll(".category-detail");
    for(var k=0;k<oContain.length;k++){
        for(var j=0;j<json.goodsList.length;j++){
            var oUl=document.createElement('ul');
            var oH5=document.createElement('h5');
            oUl.className='detail-list clearfix';
            oH5.className='detail-header';
            oH5.innerHTML=json.goodsList[j].title;
            for(var i=0;i<json.goodsList[j].date.length;i++){
                oUl.innerHTML+="<li class='detail-content'><a href='#'>"+json.goodsList[j].date[i]+"</a></li>";
            }
            oContain[k].appendChild(oH5);
            oContain[k].appendChild(oUl);
        }
    }
}
//========倒计时==========
// console.log(new Date('2016/12/20 00:00:00'));
function getRTime(date,callback) {
    var endT=new Date(date);
    var intervalT=parseInt((endT.getTime()-(new Date()).getTime())/1000);
    var d=0;
    var h=0;
    var m=0;
    var s=0;
    var timer=setInterval(function () {
        intervalT--;
        if(intervalT>=0){
            s=parseInt(intervalT%60);
            m=parseInt(intervalT/60%60);
            h=parseInt(intervalT/3600%24);
            d=parseInt(intervalT/(3600*24));
            callback(d,h,m,s);
        } else{
            callback(d,h,m,s);
            clearInterval(timer);
        }
    },1000);
}
// ======回调函数=====
function fillCountDown(d,h,m,s,oDid,oHid,oMid,oSid) {
    var oD=document.getElementById(oDid);
    var oH=document.getElementById(oHid);
    var oM=document.getElementById(oMid);
    var oS=document.getElementById(oSid);
    oD.innerHTML=d+"天";
    oH.innerHTML=h+"时";
    oM.innerHTML=m+"分";
    oS.innerHTML=s+"秒";
}
//======输出======
getRTime('2017/04/17',function (d,h,m,s) {
    fillCountDown(d,h,m,s,'residue-d','residue-h','residue-m','residue-s')
});
//=======放大镜==封装OOP=======
var magPic={
    'oBtnLeft':document.querySelector("#dir-left-btn"),
    'oBtnRight':document.querySelector("#dir-right-btn"),
    'oPicBtn':document.querySelector("#pic-btn"),
    //====02===
    'oImgBtn':document.querySelectorAll(".pic-btn .img-btn"),
    'oImgShow':document.querySelector(".left-side .pic-show"),
    //====03===
    'oMagPic':document.querySelector(".left-side .magnifying-pic-show"),
    //====04===
    'oPicShade':document.querySelector(".pic-show .pic-shade"),
    'oPicOutShade':document.querySelector(".pic-show .pic-out-shade"),
    'bindListen':function () {
        var self=this;
        //===part01==btnMove===
        self.oBtnLeft.onclick=function () {
            self.oPicBtn.style.left=parseInt(getStyle(self.oPicBtn,'left'))<-10?
            parseInt(getStyle(self.oPicBtn,'left'))+108+'px':0;
        };
        self.oBtnRight.onclick=function () {
            self.oPicBtn.style.left=parseInt(getStyle(self.oPicBtn,'left'))>-530?
                parseInt(getStyle(self.oPicBtn,'left'))-108+'px':'-540px';
        };
        //===part02==showBigPic===
        for(var i=0;i<self.oImgBtn.length;i++){
            self.oImgBtn[i].index=i;
            self.oImgBtn[i].onmouseover=function () {
                self.oImgShow.style.backgroundImage='url(../sasa/images/goods_01_x_0'+(this.index+1)+'.jpg)';
            }
        }
        //====part03=showMagnifyingPic====
        self.oImgShow.addEventListener('mouseover',function () {
            self.oMagPicBG=getStyle(self.oImgShow,'backgroundImage');
            self.oMagPic.style.backgroundImage='url(../sasa/images/goods_01_d_0'+self.oMagPicBG.charAt(self.oMagPicBG.indexOf(".jpg")-1)+'.jpg)'
        });
        //=====part04=magnifying====
        self.oPicOutShade.addEventListener('mousemove',function () {
            self.oPicShade.style.left=event.offsetX-75+"px";
            self.oPicShade.style.top=event.offsetY-75+"px";
            event.offsetX<75&& (self.oPicShade.style.left=0);
            event.offsetY<75&& (self.oPicShade.style.top=0);
            event.offsetX>225&&(self.oPicShade.style.left='150px');
            event.offsetY>225&&(self.oPicShade.style.top='150px');
            //======放大镜====
            self.oMagPic.style.backgroundPosition=-parseInt(self.oPicShade.style.left)*2+"px"+" "+-parseInt(self.oPicShade.style.top)*2+"px";
        });
    },
};
magPic.bindListen();
//=======放大镜==函数封装=======
/*function magnifyingPic(json) {
    var oBtnLeft=document.querySelector(json.oBtnLeftSelector);
    var oBtnRight=document.querySelector(json.oBtnRightSelector);
    var oPicBtn=document.querySelector(json.oPicBtnSelector);
    var oImgBtn=document.querySelectorAll(json.oImgBtnSelector);
    var oImgShow=document.querySelector(json.oImgShowSelector);
    var oMagPic=document.querySelector(json.oMagPicSelector);
    var oPicShade=document.querySelector(json.oPicShadeSelector);
    var oPicOutShade=document.querySelector(json.oPicOutShadeSelector);
    //===part01==b
    oBtnLeft.onclick=function () {
        oPicBtn.style.left=parseInt(getStyle(oPicBtn,'left'))<-10?
        parseInt(getStyle(oPicBtn,'left'))+108+'px':0;
    };
    oBtnRight.onclick=function () {
        oPicBtn.style.left=parseInt(getStyle(oPicBtn,'left'))>-530?
        parseInt(getStyle(oPicBtn,'left'))-108+'px':'-540px';
    };
    //===part02==showBigPic===
    for(var i=0;i<oImgBtn.length;i++){
        oImgBtn[i].index=i;
        oImgBtn[i].onmouseover=function () {
            oImgShow.style.backgroundImage='url(../sasa_com/images/goods_01_x_0'+(this.index+1)+'.jpg)';
        }
    };
    //====part03=showMagnifyingPic====
    oImgShow.addEventListener('mouseover',function () {
        oMagPicBG=getStyle(oImgShow,'backgroundImage');
        oMagPic.style.backgroundImage='url(../sasa_com/images/goods_01_d_0'+oMagPicBG.charAt(oMagPicBG.length-6)+'.jpg)'
    });
    //=====part04=magnifying====
    oPicOutShade.addEventListener('mousemove',function () {
        oPicShade.style.left=event.offsetX-75+"px";
        oPicShade.style.top=event.offsetY-75+"px";
        event.offsetX<75&& (oPicShade.style.left=0);
        event.offsetY<75&& (oPicShade.style.top=0);
        event.offsetX>225&&(oPicShade.style.left='150px');
        event.offsetY>225&&(oPicShade.style.top='150px');
        //======放大镜====
        oMagPic.style.backgroundPosition=-parseInt(oPicShade.style.left)*2+"px"+" "+-parseInt(oPicShade.style.top)*2+"px";
    });
}
magnifyingPic({
    'oBtnLeftSelector':"#dir-left-btn",
    'oPicBtnSelector':"#pic-btn",
    'oImgBtnSelector':".pic-btn .img-btn",
    'oBtnRightSelector':"#dir-right-btn",
    'oImgShowSelector':".left-side .pic-show",
    'oPicShadeSelector':".pic-show .pic-shade",
    'oPicOutShadeSelector':".pic-show .pic-out-shade",
    'oMagPicSelector':".left-side .magnifying-pic-show",
});*/
//=====goods-count====
(function () {
    var oReduce=document.querySelector(".limit-count .reduce");
    var oAdd=document.querySelector(".limit-count .add");
    var oCountContainer=document.querySelector(".limit-count .count-num");
    oReduce.onclick=function () {
        oCountContainer.innerHTML>=1&&oCountContainer.innerHTML--;
    }
    oAdd.onclick=function () {
        oCountContainer.innerHTML++;
    }
})();
//======侧边nav-right=====
(function () {
    var oTop=document.querySelector(".sasa-arc-four");
    var oSwitchTop=true;
    window.addEventListener("scroll",function () {
        if(pageYOffset>0&&oSwitchTop){
            oSwitchTop=false;
            oTop.style.visibility="visible";
        }else if(pageYOffset==0&&!oSwitchTop){
            oSwitchTop=true;
            oTop.style.visibility="hidden";
        }
    });
})();

//====放大镜=未用OOP方法=====作废=====
/*(function () {
 //===part01==btnMove===
 var oBtnLeft=document.querySelector("#dir-left-btn");
 var oBtnRight=document.querySelector("#dir-right-btn");
 var oPicBtn=document.querySelector("#pic-btn");
 oBtnLeft.onclick=function () {
 oPicBtn.style.left=0;
 };
 oBtnRight.onclick=function () {
 oPicBtn.style.left="-108px";
 };
 //===part02==showBigPic===
 var oImgBtn=document.querySelectorAll(".pic-btn .img-btn");
 var oImgShow=document.querySelector(".left-side .pic-show");
 for(var i=0;i<oImgBtn.length;i++){
 oImgBtn[i].index=i;
 oImgBtn[i].onmouseover=function () {
 oImgShow.style.backgroundImage='url(../sasa_com/images/goods_01_x_0'+(this.index+1)+'.jpg)';
 }
 }
 //====part03=showMagnifyingPic====
 var oMagPic=document.querySelector(".left-side .magnifying-pic-show");
 oImgShow.addEventListener('mouseover',function () {
 var oMagPicBG=getStyle(oImgShow,'backgroundImage');
 oMagPic.style.backgroundImage='url(../sasa_com/images/goods_01_d_0'+oMagPicBG.charAt(oMagPicBG.length-7)+'.jpg)'
 });
 //=====part04=magnifying====
 var oPicShade=document.querySelector(".pic-show .pic-shade");
 var oPicOutShade=document.querySelector(".pic-show .pic-out-shade");
 oPicOutShade.addEventListener('mousemove',function () {
 oPicShade.style.left=event.offsetX-75+"px";
 oPicShade.style.top=event.offsetY-75+"px";
 event.offsetX<75&&(oPicShade.style.left=0);
 event.offsetY<75&&(oPicShade.style.top=0);
 event.offsetX>225&&(oPicShade.style.left='150px');
 event.offsetY>225&&(oPicShade.style.top='150px');
 //======放大镜====
 oMagPic.style.backgroundPosition=-parseInt(oPicShade.style.left)*2+"px"+" "+-parseInt(oPicShade.style.top)*2+"px";
 })
 })();*/
