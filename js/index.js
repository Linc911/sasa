//=======公用====
function getStyle(obj,attr) {
    return obj.currentStyle?obj.currentStyle(attr):getComputedStyle(obj)[attr];
}
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
//========banner轮播=======
var bannerCarousal={
    'oBanner':document.querySelector("#banner-show"),
    //=====btn=====
    'ABtn':document.querySelectorAll(".banner .btn-list"),
    'btnLen':null,
    //====pathname=====
    'srcArr':['images/banner01.jpg','images/banner02.jpg','images/banner03.jpg','images/banner04.jpg','images/banner05.jpg'],
    'srcArrIndex':0,
    //====定时器====
    'timer':null,
    update:function () {
        var self=this;
        //=====banner====
        self.oBanner.style.backgroundImage='url('+self.srcArr[self.srcArrIndex]+')';
        //====btn=====
        for(var i=0;i<self.btnLen;i++){
            self.ABtn[i].style.background=i==self.srcArrIndex?"#FA3778":'#ADADAD';
        }
    },
    mainloop:function () {
        var self=this;
        this.timer=setInterval(function () {
            self.srcArrIndex++;
            self.srcArrIndex%=5;
            self.update();
        },3000)
    },
    stop:function () {
        clearInterval(this.timer);
    },
    run:function () {
        bannerCarousal.bindListener();
        bannerCarousal.mainloop()
    },
    bindListener:function () {
        var self=this;
        this.btnLen=this.ABtn.length;
        for(var i=0;i<this.btnLen;i++){
            self.ABtn[i].index=i;
            self.ABtn[i].addEventListener('mouseover',function () {
                self.stop();
                self.oBanner.style.transition='background .5s';
                self.srcArrIndex=this.index;
                self.update();
            });
            self.ABtn[i].addEventListener('mouseout',function () {
                self.oBanner.style.transition='background 1.6s';
                self.mainloop();
            });
        }
    }
};

bannerCarousal.run();
//======侧边nav-left=====
(function () {
    var oFix=document.querySelector("#nav-float-fix");
    var oSwitch=true;
    window.addEventListener("scroll",function () {
        if(pageYOffset>=parseInt(getStyle(oFix,'top'))-100&&oSwitch){
            oSwitch=false;
            oFix.style.position="fixed";
            oFix.style.top="100px";
        }else if(pageYOffset<700&&!oSwitch){
            oSwitch=true;
            oFix.style.position="absolute";
            oFix.style.top="800px";
        }
    });
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
//======回调函数=====
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
getRTime('2016/12/17',function (d,h,m,s) {
    fillCountDown(d,h,m,s,'interval-d1','interval-h1','interval-m1','interval-s1')
});
getRTime('2016/12/25',function (d,h,m,s) {
    fillCountDown(d,h,m,s,'interval-d2','interval-h2','interval-m2','interval-s2')
});
getRTime('2016/12/28',function (d,h,m,s) {
    fillCountDown(d,h,m,s,'interval-d3','interval-h3','interval-m3','interval-s3')
});
getRTime('2017/01/01',function (d,h,m,s) {
    fillCountDown(d,h,m,s,'interval-d4','interval-h4','interval-m4','interval-s4')
});
getRTime('2017/02/16',function (d,h,m,s) {
    fillCountDown(d,h,m,s,'interval-d5','interval-h5','interval-m5','interval-s5')
});
getRTime('2017/12/16',function (d,h,m,s) {
    fillCountDown(d,h,m,s,'interval-d6','interval-h6','interval-m6','interval-s6')
});
//=====作废（未用禅意函数思维）===
/*
(function () {
    var oBanner=document.querySelector("#banner-show");
    var srcArr=['images/banner01.jpg','images/banner02.jpg','images/banner03.jpg','images/banner04.jpg','images/banner05.jpg'];
    var srcArrIndex=0;
    //===加载图片===
    var count=0;
    var srcLen=srcArr.length;
    for(var i=0;i<srcLen;i++){
        var oImage=new Image();
        oImage.src=srcArr[i];
        oImage.onload=function () {
            count++;console.log(count);
        }
    };
    if(count==srcLen){
        setInterval(function () {
            srcArrIndex++;
            srcArrIndex%=5;
            oBanner.style.background='url(../'+srcArr[srcArrIndex]+')';
        },2000)
    }

})();*/
//========banner轮播===作废====
/*var bannerCarousal={
 'oBanner':document.querySelector("#banner-show"),
 //=====btn=====
 'ABtn':document.querySelectorAll(".banner .btn-list"),
 //====pathname=====
 'srcArr':['images/banner01.jpg','images/banner02.jpg','images/banner03.jpg','images/banner04.jpg','images/banner05.jpg'],
 'srcArrIndex':0,
 //====定时器====
 'timer':null,
 'imageLoad':function (callback) {
 this.btnLen=this.ABtn.length;
 var self=this;
 var count=0;
 var srcLen=this.srcArr.length;
 for(var i=0;i<srcLen;i++){
 var oImage=new Image();
 oImage.src=this.srcArr[i];
 oImage.onload=function () {
 count++;
 count==srcLen&&callback();

 }
 };
 },
 update:function () {
 var self=this;
 //=====banner====
 self.oBanner.style.backgroundImage='url('+self.srcArr[self.srcArrIndex]+')';
 //====btn=====
 for(var i=0;i<self.btnLen;i++){
 self.ABtn[i].style.background=i==self.srcArrIndex?"#FA3778":'#ADADAD';
 }
 },
 mainloop:function () {
 var self=this;
 this.timer=setInterval(function () {
 self.srcArrIndex++;
 self.srcArrIndex%=5;
 self.update();
 },3000)
 },
 stop:function () {
 clearInterval(this.timer);
 },
 run:function () {
 this.imageLoad(function () {
 bannerCarousal.bindListener();
 bannerCarousal.mainloop()
 });
 },
 bindListener:function () {
 var self=this;
 for(var i=0;i<self.btnLen;i++){
 self.ABtn[i].index=i;
 self.ABtn[i].addEventListener('mouseover',function () {
 self.stop();
 self.oBanner.style.transition='background .5s';
 self.srcArrIndex=this.index;
 self.update();
 });
 self.ABtn[i].addEventListener('mouseout',function () {
 self.oBanner.style.transition='background 1.6s';
 self.mainloop();
 });
 }
 }
 };*/
