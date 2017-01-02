function getStyle(obj,name){
		return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name];
	}
function move(obj,json,options){
 	var options=options || {};
 	options.duration=options.duration || 800;
 	options.type=options.type|| 'ease-in';
	clearInterval(obj.timer);
	var  start={};
	var  dis={};
	for(var name in json){
		start[name]=parseFloat(getStyle(obj,name));
		dis[name]=json[name]-start[name];
	}
	//总次数=总时间1000/走一次所需时间30
	var count=Math.floor(options.duration/30);
	//走了几次
	var n=0;
	//每次走多少距离
	//var step=dis/count;
	obj.timer=setInterval(function(){
		n++;
		for(name in json){
			switch(options.type){
				case 'linear'://匀速运动
					var a=n/count;
					var cur=start[name]+dis[name]*a;
					break;
				case 'ease-in'://加速运动
					var a=n/count;
					var cur=start[name]+dis[name]*a*a*a;
					break;
				case 'ease-out'://缓冲运动
					var a=1-n/count;
					var cur=start[name]+dis[name]*(1-a*a*a);
					break;
			}
			if(name=='opacity'){
				obj.style[name]=cur;
				obj.style.filter='alpha(opacity='+cur*100+')'
			}else{
				obj.style[name]=cur+'px';
			}
		}

		if(n==count){
			clearInterval(obj.timer);
			options.fn && options.fn();
		}
	},30);
}
