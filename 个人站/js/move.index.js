$(function(){
    //弹性导航条
    function startMove(obj,iTarget){
            var iSpeed = 0;
            var left = obj.offsetLeft;
            // obj.timer = null;
            clearInterval(obj.timer);
            obj.timer = setInterval(function(){
                iSpeed+=(iTarget-obj.offsetLeft)/5;
                iSpeed*=0.7;
                left+=iSpeed;
                obj.style.left = Math.round(left)+'px';
                if(Math.round(left) == iTarget && Math.round(iSpeed) == 0){
                    clearInterval(obj.timer);
                }
            },30)
        }
        var oUl = document.getElementById('nav');
        var aLi = oUl.children;
        var oLast = oUl.children[aLi.length-1];

        for(var i=0; i<aLi.length-1; i++){
            aLi[i].onmouseover = function(){
                startMove(oLast,this.offsetLeft);
            }
        }

       //翻页效果
        var oSec=document.querySelector('.section');
        var oPage=document.querySelector('.page');
        var oL=document.querySelector('.l');
        var oR=document.querySelector('.r');
        var oF=document.querySelector('.front');
        var oB=document.querySelector('.back');
        var bOk=true;
        var iNow=0;
        oSec.onclick=function(){
            if(bOk==false)return;
            bOk=false;
            oPage.style.transition='1s';
            oPage.style.transform='perspective(800px) rotateY(-180deg)';
        };
        // timer=setInterval(function(){

        //     oPage.style.transition='1s';
        //     oPage.style.transform='perspective(800px) rotateY(-180deg)';
        // },300)
        //监测过渡完毕
        oPage.addEventListener('transitionend',function(){
            iNow++;
            bOk=true;
            oPage.style.transition='none';
            oPage.style.transform='perspective(800px) rotateY(0deg)';

            oL.style.backgroundImage='url(img/'+(iNow%3)+'.jpg)';
            oF.style.backgroundImage='url(img/'+(iNow%3)+'.jpg)';
            oR.style.backgroundImage='url(img/'+(iNow+1)%3+'.jpg)';
            oB.style.backgroundImage='url(img/'+(iNow+1)%3+'.jpg)';


        },false);
        // oSec.onmouseenter=function(){
        //     clearInterval(timer);
        // }
        // oSec.onmouseleave=function(){
        //      timer=setInterval(function(){
        //         iNow++;
        //         oPage.style.transition='1s';
        //         oPage.style.transform='perspective(800px) rotateY(-180deg)';
        //     },300)
        // }
        //作品展示穿墙效果
         var  aLi=document.querySelectorAll('.work li');
        //  console.log(aLi)
        for(var i=0;i<aLi.length;i++){
            through(aLi[i]);
        }

        function getDir(obj,ev){
            var x=obj.offsetLeft+obj.offsetWidth/2-ev.pageX;
            var y=obj.offsetTop+obj.offsetHeight/2-ev.pageY;

            return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;
        }
        function through(obj){
            var oSpan=obj.getElementsByTagName('span')[0];
             //console.log(oSpan)
            obj.onmouseenter=function (ev){
                var oEvent=ev||event;
                var dir=getDir(obj,oEvent);

                switch(dir){
                    case 0:
                        oSpan.style.left='350px';
                        oSpan.style.top=0;

                    break;
                    case 1:
                        oSpan.style.left=0;
                        oSpan.style.top='200px';
                    break;
                    case 2:
                        oSpan.style.left='-350px';
                        oSpan.style.top=0;
                    break;
                    case 3:
                        oSpan.style.left=0;
                        oSpan.style.top='-200px';
                    break;
                }
                move(oSpan,{left:0,top:0},{duration:400});
            };

            obj.onmouseleave=function (ev){
                var oEvent=ev||event;
                var dir=getDir(this,oEvent);

                switch(dir){
                    case 0:
                        move(oSpan,{left:350,top:0},{duration:400});
                    break;
                    case 1:
                        move(oSpan,{left:0,top:200},{duration:400});
                    break;
                    case 2:
                        move(oSpan,{left:-350,top:0},{duration:400});
                    break;
                    case 3:
                        move(oSpan,{left:0,top:-200},{duration:400});
                    break;
                }
            };
        };

        //点击收缩；
        var oBtn=document.querySelector('.myEffects .move-Btn');

        var aLi=document.querySelectorAll('.effect li');
        //把浮动布局转化成定位布局
        var arrPos=[];
        for(var i=0;i<aLi.length;i++){
            arrPos[i]={
                left:aLi[i].offsetLeft,
                top:aLi[i].offsetTop
            }
        }
        // console.log(arrPos);
        for(var i=0;i<aLi.length;i++){
            aLi[i].style.position='absolute';
            aLi[i].style.left=arrPos[i].left+'px';
            aLi[i].style.top=arrPos[i].top+'px';
            aLi[i].style.margin=0;
        }
        var bOk=true;
        oBtn.onclick=function(){
            if(!bOk)return;
            bOk=false;
            clearInterval(timer);
            var n=0;
            var timer=null;
            timer=setInterval(function(){
                (function(index){
                    move(aLi[n],{left:-100,top:120,width:0,height:0,opacity:0},{fn:function(){
                    if(index==aLi.length-1){
                        //alert('over');
                        n=0;
                        timer=setInterval(function(){
                            move(aLi[n],{left:arrPos[n].left,top:arrPos[n].top,width:300,height:300,opacity:1});
                            n++;
                            if(n==aLi.length){
                                bOk=true;
                                clearInterval(timer);
                            }
                        },200)
                    }
                    }})
                })(n)
                n++;

                if(n==aLi.length){
                    clearInterval(timer);
                }
            },30);
        }
        var oDes=document.querySelector('#describe');
        var aP=oDes.children;
        for(var i=0;i<aP.length;i++){
            (function(index){
                setTimeout(function(){
                    aP[index].classList.add('rotateIn');
                },i*500);
            })(i);
        }
        var app = angular.module('app', []);

        // app.factory('$myAjax',function(){
        //     return {
        //         myajax:ajax
        //     }
        // })

        app.controller('message',function($scope,$http){
            var URL = 'weibo.php';
            $scope.data = [];
            // 发送留言
            $scope.send = function(){
                $http.get(URL,{params:{
                    act:'add',
                    content:$scope.content
                }}).success(function(data){
                    $scope.data.unshift({
                        content:$scope.content
                    })
                })

            }
        })
});
function addEvent(obg,sEv,fn){
    if(obg.addEventListener){
        obg.addEventListener(sEv,fn,false);
    }else{
        obg.attachEvent('on'+sEv,fn);
    }
}
function $(fn){
    if(document.addEventListener){
        addEvent(document,'DOMContentLoaded',function(){
            fn&&fn();
        })
    }else{
        addEvent(document,'readystatechange',function(){
            if(document.readyState=='complete'){
                fn&&fn();
            }
        })
    }
}


