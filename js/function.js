// 1、兼容的通过类名获取元素
function getClass(classname,obj){                       //创建一个获取类名的函数
	var obj=obj || document	;							//查找类名，若obj上找不到，则到document中找。
	if(obj.getElementsByClassName){                     //判断是否可以用getElementByClassName
		return obj.getElementsByClassName(classname);   //如果可以，则返回获取到的元素
	}else{												//否则
		var all=obj.getElementsByTagName('*');          //把所有的标签都取到
		var arr=[]										//创建一个空的新数组
		for(var i = 0;i<all.length;i++){                //把每一个标签上的类名都获取到
			if(check(all[i].className,classname)){           //判断获取到的类名是否相等
				arr.push(all[i])						//相等则把获取到的添加到新数组中
			} 					
		}
		return arr;										//返回新数组
	}
}
function check(classname,val){							
	var arr=classname.split(" ");
	for(var i=0;i<arr.length;i++){
		if(val==arr[i]){
			return true;
		}
	}
	return false; 
}

// 2、获取元素的样式
function getStyle(obj,pro){
	if(obj.currentStyle){
		return obj.currentStyle[pro];
	}else{
		return getComputedStyle(obj,null)[pro];

	}
}

// 3、  $函数 
// $("<a>")
function $(selector,obj){
	var obj=obj || document
	if(typeof selector=="string"){
		selector=selector.replace(/^\s*|\s*$/g,"")
		if(selector.charAt(0)==="."){
			return getClass(selector.slice(1),obj);
		}else if(selector.charAt(0)==="#"){
			return document.getElementById(selector.slice(1),obj);
		}else if(/^[a-z][a-z0-6]{0,8}$/.test(selector)){
			return obj.getElementsByTagName(selector,obj)
		}else if(/^<[a-z][a-z0-6]{0,8}>$/.test(selector)){
			return document.createElement(selector.slice(1,-1));
		}
	}else if(typeof selector=="function"){
		window.onload=function(){
			selector();
		}
	}
}






// 节点
// 4.1、找所有元素的节点
	// 1.功能：确定功能是找所有元素的节点
function getChilds(obj,type){				//传参：obj(谁下边的元素)type(有无文本)
	var type=type||"no"						//初始化条件
	var arr=[];								//给一个新的数组，用于返回--返回的是集合
	var obj = obj.childNodes;				//找所有元素的子节点
	for(var i=0;i<obj.length;i++){
		if(type=="no"){
			if(obj[i].nodeType==1){
				arr.push(obj[i]);		
			}
		}else if(type=="yes"){
			if(obj[i].nodeType==1||obj[i].nodeType==3&&obj[i].nodeValue.replace(/^\s*|\s*$/g,"")){
				arr.push(obj[i]);
			}
		}
	}
	return arr;
}

// 4.2、获取第一个节点
function getFirst(obj,type){
	var type=type||"no";
	if(type=="no"){
		return getChilds(obj,"no")[0];
	}else if(type=="yes"){
		return getChilds(obj,"yes")[0];
	}
}
// 4.3、获取最后一个节点
function getLast(obj,type){
	var type=type||"no";
	if(type=="no"){
		return getChilds(obj,"no")[getChilds(obj,"no").length-1]
	}else if(type=="yes"){
		return getChilds(obj,"yes")[getChilds(obj,"yes").length-1]
	}
}
// 4.4、获取第num个节点
function getNum(obj,num,type){
	var type=type||"no";
	if(type=="no"){
		return getChild(obj,"no")[num-1]
	}else if(type=="yes"){
		return getChilds(obj,"yes")[num-1];
	}
}
// 4.5、获取下一个节点
function getNext(obj,type){
	var type=type||"no";
	var next=obj.nextSibling;
	if(next==null){
		return false;
		if(type=="no"){
			while(next.nodeType==3||next.nodeType==8){
				next=next.nextSibling;
				if(next==null){
					return false;
				}
			}
		}
	}else if(type=="yes"){
		while(next.nodeType==3&&!next.nodeType.replace(/^\s*|\s*$/g,"")||next.nodeType==8){
				next=next.nextSibling;
				if(next==null){
					return false;
				}
			}
		}
	return next;
}
// 4.6、获取上一个

// 4.7、插入某个对象之前
function insertBefore(newObj,beforeObj){
	var parent=beforeObj.parentNode;
	parent.insertBefore(newObj,beforeObj)
}
// 4.8、插入某个对象之后
function insertAfter(newObj,beforeObj){
	var next=getNext(beforeObj,"yes");
	var parent=beforeObj.parentNode;
	if(next){
		parent.insertBefore(newObj,next)
	}else{
		parent.appendChild(newObj);
	}
}
//5. 添加事件处理程序
//obj 事件源  event 事件 fun事件处理程序
// function(){}改变this指针
function addEvent(obj,event,fun){
	if(obj.addEventListener){
		obj.addEventListener(event,function(e){
			var e =e||window.event;
			fun.call(obj,e)
		},false)
	}else{
		obj.attachEvent("on"+event,function(e){
			var e =e||window.event;
			fun.call(obj,e)
		})
	}
}
//6.删除事件处理程序
function removeEvent(obj,event,fun){
	if(obj.addEventListener){
		obj.removeEventListener(event,fun,false)
	}else{
		obj.detachEvent("on"+event,fun)
	}
}
// 7.滚轮事件
// 1)给谁加       --传参
// 2)向上还是向下 --传参
//注：滚动时：兼容IE与谷歌、火狐
    //在IE中绑定事件的时候，mousewheel
    //在谷歌、火狐中绑定事件，addEventListener
function mousewheel(obj,upFun,downFun){					
	if(obj.attachEvent){
		obj.attachEvent("onmousewheel",fun);
	}else{
		obj.addEventListener("mousewheel",fun,false);
		obj.addEventListener("DOMMousewheelScroll",fun,false);
	}
	function fun(e){						
		var ev=e||window.event;
		var num=ev.wheelDelta||ev.detail;
		if(num===120||num===-3){
			upFun.call(obj);
		}
		if(num===-120||num===3){
			downFun.call(obj);
		}
	}
}
//8.hover
//判断某个元素是否包含有另外一个元素
function contains (parent,child) {
  if(parent.contains){
    return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
}

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
function checkHover (e,target) {
  if(getEvent(e).type=="mouseover"){
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
      !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
  }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
      !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
  }
}
//鼠标移入移出事件
/*
 obj   要操作的对象
 overfun   鼠标移入需要处理的函数
 outfun     鼠标移除需要处理的函数
 */
function hover (obj,overfun,outfun) {
  if(overfun){
    obj.onmouseover=function  (e) {
      if(checkHover(e,obj)){
        overfun.call(obj,[e]);
      }
    }
  }
  if(outfun){
    obj.onmouseout=function  (e) {
      if(checkHover(e,obj)){
        outfun.call(obj,[e]);
      }
    }
  }
}
function getEvent (e) {
  return e||window.event;
}

//9. cookie的封装的函数
        //设置cookie
function setCookie(attr,value,time){
 	if(time){
 		var now=new Date();
        now.setTime(now.getTime()+time*1000);
        document.cookie=attr+"="+value+";expires="+now.toGMTString();
	}else{
        document.cookie=attr+"="+value;
 	}
}
//"aa=bb; bb=cc; dd=ee"
//["aa=bb","[bb=cc]","[dd=ee]"]
//[[aa,bb],[bb,cc],[dd,ee]]
// setCookie("aa","bb",30)
//获取其中值
function getCookie(val){
	var str=document.cookie;
	var arr=str.split("; ");
	for(var i=0;i<arr.length;i++){
		var arrvalue=arr[i].split("=");
		if(val==arrvalue[0]){
		return arrvalue[1];
		}
	}
	return false;
}
//删除cooie
function delCookie(attr,value,time){
  	var now=new Date();
  	now.setTime(now.getTime()-1);
	document.cookie=attr+"="+value+";expires="+now.toGMTString();
}



