$(document).ready(function(){
	// var rym=jQuery.noConflict();
//头部小轮播
	var n=0;
	var width=$('ul.bo div').width();
	function move1(){
		n++;
		if(n>=$('ul.bo div').length){
			n=0;
		}
		$('ul.bo').animate({left:-width*n});
	}
	function move2(){
		n--;
		if(n<0){
			n=$('ul.bo div').length-1;
		}
		$('ul.bo').animate({left:-width*n});
	}
	$('.icon_pre').on("click",function(){
		move2();
	})
	$('.icon_next').on("click",function(){
		move1();
	})
//广告小轮播
	var height=$('.clickscroll li').height();
	// console.log(height)
	var t2=setInterval(move4,2000);
	function move4(){
		$('.clickscroll').animate({top:-height},500,function(){
			$('.clickscroll').append($('.clickscroll').children().first());
			$('.clickscroll').css("top",0);
		})
	}
	function move5(){
		$('.clickscroll').prepend($('.clickscroll').children().last());
		$('.clickscroll').css("top",-height);
		$('.clickscroll').animate({top:0},500)
	}
	$('.upbt').click(function(){
		move5();
	})
	$('.downbt').click(function(){
		move4();
	})
	//鼠标移入事件
	$('.rightNav').mouseover(function(){
		clearInterval(t2);
	})
	$('.rightNav').mouseout(function(){
		t2=setInterval(move4,2000);
	})
//banner图
	var now=0;
	var next=0;
	var flag=true;
	var t=setInterval(move,3000)
	function move(type){
		type=type||"r";
		if(type=="r"){
			next=now+1;
			if(next>=$('.imgbox ul li').length){
				next=0;
			}
		}else if(type=="l"){
			next=now-1;
			if(next<0){
				next=$('.imgbox ul li').length-1;
			}
		}
		$('.imgbox ul li').eq(now).css("opacity",1);
		$('.imgbox ul li').eq(now).animate({opacity:0},800);
		$('.imgbox ul li').eq(next).animate({opacity:1,zIndex:20},800,function(){
			flag=true;
		});
		$('.circle li').eq(now).removeClass();
		$('.circle li').eq(next).addClass('first');
		now=next;
	}
	//鼠标移入事件
	$('ul.imgbox').mouseover(function(){
		clearInterval(t);
	})
	$('ul.imgbox').mouseout(function(){
		t=setInterval(move,3000);
	})
	//圆点点击事件
	$('.circle li').hover(function(){
		if($(this).index()!=now){
			$('.imgbox ul li').eq(now).animate({opacity:0},500).end().eq($(this).index()).animate({opacity:1},500,function(){
				flag=true;
			});
			$(".circle").children().removeClass().end().find($(this)).addClass("first");
		}
		now=$(this).index();
	},function(){})
		// $('.circle li').hover(function(){
		// 	if($(this).index()>now){
		// 		$('.imgbox ul li').eq(now).animate({opacity:0},800)
		// 		$('.imgbox ul li').eq($(this).index()).animate({opacity:1,zIndex:20},800)
		// 	}else if($(this).index()<now){
		// 		$('.imgbox ul li').eq(now).animate({opacity:0},800)
		// 		$('.imgbox ul li').eq($(this).index()).animate({opacity:1,zIndex:20},800)
		// 	}
		// 	$('.circle li').eq(now).removeClass();
		// 	$('.circle li').eq($(this).index()).addClass('first');
		// 	now=$(this).index();
		// },function(){})
	//左右按钮点击事件
	// console.log($('.btn_pre'))
	$('.btn_next').click(function(){
		// alert(1)
		if(flag){
			flag=false;
			move("r");
		}
	})
	$('.btn_pre').click(function(){
		// alert(2)
		if(flag){
			flag=false;
			move("l");
		}
	})
//猜你喜欢轮播
	var now1=0;
	var next1=0;
	var flag1=true;
	$('.change_btn .hou').on("click",function(){
		if(flag1){
			flag1=false;
			next1=now1+1;
			if(next1>=$('.guess_main ul').length){
				next1=0;
			}
			$('.guess_main ul').eq(now1).animate({opacity:0},500).end().eq(next1).animate({opacity:1},500,function(){
				flag1=true;
			});
			now1=next1;
		}
	})
	$('.change_btn .hou').on("click",function(){
		if(flag1){
			flag1=false;
			next1=now1-1;
			if(next1<0){
				next1=$('.guess_main ul').length-1;
			}
			$('.guess_main ul').eq(now1).animate({opacity:0},500).end().eq(next1).animate({opacity:1},500,function(){
				flag1=true;
			});
			now1=next1;
		}
	})
//楼层效果
	$('.floor').each(function(index,val){
		//楼层轮播
		var now2=0;
		var next2=0;
		var now3=0;
		var next3=0;
		var flag2=true;
		var t1=setInterval(move3,1500);
		function move3(type2){
			type2=type2||"r";
			if(type2=="r"){
				next2=now2+1;
				next3=now3+1;
				// 2个
				if(next2>=$(val).find('.brand_slide ul').length){
					next2=0;
				}
				// 3个
				if(next3>=$(val).find('.slider li').length){
					next3=0;
				}
			}else if(type2=="l"){
				next2=now2-1;
				next3=now3-1;
				if(next2<0){
					next2=$(val).find('.brand_slide ul').length-1;
				}
				if(next3<0){
					next3=$(val).find('.slider li').length-1;
				}
			}
			$(val).find(".slider li").eq(now3).animate({opacity:0},500);
			$(val).find(".slider li").eq(next3).animate({opacity:1},500,function(){
				flag2=true;
			});
			$(val).find(".brand_slide ul").eq(now2).animate({opacity:0},500);
			$(val).find(".brand_slide ul").eq(next2).animate({opacity:1},500,function(){
				flag2=true;
			});
			$(val).find(".nav li").eq(now3).removeClass();
			$(val).find(".nav li").eq(next3).addClass("first");
			now2=next2;
			now3=next3;
		}
		// 鼠标移入事件
		$(val).find('.box_l').hover(function(){
			clearInterval(t1);
		},function(){
			t1=setInterval(move3,1500);
		})
		// 按钮点击事件
		$(val).find(".you").on("click",function(){
			if(flag2){
				flag2=false;
				move3("r");
			}
		})
		$(val).find(".zuo").on("click",function(){
			if(flag2){
				flag2=false;
				move3("l");
			}
		})
		//圆点点击事件
		// console.log($(index))
		$(val).find(".nav li").hover(function(){
			if($(this).index()!=now){
				$(val).find(".slider li").eq(now3).animate({opacity:0},500);
				$(val).find(".slider li").eq($(this).index()).animate({opacity:1},500);
				$(val).find(".nav").children().removeClass();
				$(val).find(".nav").find($(this)).addClass("first");
			}
			now3=$(this).index();
		},function(){})
		//选项卡
		$(val).find('.t_tab li').hover(function(){
			// console.log($(val).find('.t_tab').children().removeClass().end().find($(this)))
			$(val).find('.t_tab').children().removeClass().end().find($(this)).addClass('tab_first');
			// console.log($(val).find($(this)))
			$(val).find('.c_r_box').css("display","none").end().find('.c_r_box').eq($(this).index()).css("display","block");
		},function(){})
	})
//楼层跳转
	var flag3=true;
	var nowIndex=0;
	$(window).scroll(function(){
	var ch=$(window).height();
	// console.log(ch) 	
	// console.log($(document).scrollTop)
	// console.log($('.floor').eq(0).offset().top)
	// console.log($('.floor').eq(0).offset().top-ch)
	//在规定范围内让其出现--滚动条滚的高度大于一楼的高度并且小于底部的高度
		if($(document).scrollTop()>=$('.floor').eq(0).offset().top-ch&&$(document).scrollTop()<$('.foot').eq(0).offset().top-ch){
			$('.elevator').css("display","block");
	//满足其中一个条件即让其消失--滚动条滚的高度小于一楼的高度或者大于等于底部的高度
		}else if($(document).scrollTop()<$('.floor').eq(0).offset().top-ch||$(document).scrollTop()>=$('.foot').eq(0).offset().top-ch){
			$('.elevator').css("display","none");
		}
	//色块颜色随着楼层变化而显示
		if(flag3){
			// console.log($('.elevator li'))
			// console.log($('.fl_list li'))
			$('.fl_list li').each(function(index1,dom){
				if($(document).scrollTop()>$('.floor').eq(index1).offset().top-ch+350){
					// console.log($(this))
					// console.log(index1,dom)
					$('.fl_list li').removeClass();
					$(dom).addClass('current');
				}
			})
		}
	})
	//鼠标点击变色
	$('.fl_list li').each(function(index3,dom2){
		// console.log($(this))
		$(this).on("click",function(){
				$('.fl_list li').removeClass();
				// console.log($(this))
				// console.log(dom2)
				$(dom2).addClass('current');
		})
	})
	//鼠标点击跳转
	jQuery.extend({
		//封装：传入参数(形参,实参)--要点击的对象,要到达的位置
		goback:function(obj,local){
			obj.on("click",function(){
				// console.log($(obj))
				// console.log($(obj).hasClass("current"))
				flag3=false;
				var top=$(document).scrollTop();
				console.log(top)
				var newobj={top:top};
				$(newobj).animate({top:local},{
					duration:800,function(){flag3=true;},
					step:function(){
						$(document).scrollTop(newobj.top);
					},
					complete:function(){
						flag3=true;
					}
				})
			})
		}
	})
	$('.fl_list li').each(function(index4,dom3){
		// console.log($(dom3))
		// console.log($('.floor').eq($(this).index()).offset().top)
		$.goback($(dom3),$('.floor').eq(index4).offset().top);
		$.goback($('.fl_btn .fl_top'),0);
		$.goback($('.fl_btn .fl_bottom'),8470)
	})
	//返回顶部
		// jQuery.extend({
		// 	goback:function(obj1,time1){
		// 		obj1.on("click",function(){
		// 			flag3=false;
		// 			var top1=$(document).scrollTop();
		// 			var newobj1={top1:top};
		// 			$(newobj1).animate({top1:0},{
		// 				duration:800,function(){flag3=true;},
		// 				step:function(){
		// 					$(document).scrollTop(newobj1.top1);
		// 				}
		// 			})
		// 		})
		// 	}
		// })
		// $.goback($('.fl_btn .fl_top'))
	//回到底部
		// jQuery.extend({
		// 	goback1:function(obj2,time2){
		// 		obj2.on("click",function(){
		// 			flag3=false;
		// 			var top2=$(document).scrollTop();
		// 			var newobj2={top2:top};
		// 			$(newobj2).animate({top2:8000},{
		// 				duration:800,function(){flag3=true;},
		// 				step:function(){
		// 					$(document).scrollTop(newobj2.top2);
		// 				}
		// 			})
		// 		})
		// 	}
		// })
		// $.goback1($('.fl_btn .fl_bottom'))
//最右侧
	// console.log($('li .membericon'))
	$('li.btn_member').hover(function(){
		$('.btn_member a').toggle();
		$('.btn_member b').toggle();
		$('li.btn_member').toggleClass('hover')
		$('.btn_member a').toggleClass('hover')
		// console.log($('.membericon a'))
		
	},function(){
		// $('.btn_member a').hide();
	})
	// 首页反馈
	$('#btn_survey').hover(function(){
		$('#btn_survey div').css("transform","translate(0px,0px)");
		$('#btn_survey').addClass('hover');
	},function(){
		$('#btn_survey div').css("transform","translate(110%,0px)");
		$('#btn_survey').removeClass('hover');
	})
	// 在线客服
	$('#btn_service').hover(function(){
		$('#btn_service div').css("transform","translate(0px,0px)");
		$('#btn_service').addClass('hover');
	},function(){
		$('#btn_service div').css("transform","translate(110%,0px)");
		$('#btn_service').removeClass('hover');
	})
	// 返回顶部
	$(window).scroll(function(){
		// console.log($('.gome_nav').eq(0))
		if($(document).scrollTop()>=$('.gome_nav').eq(0).offset().top){
			$('#btn_backtop').css("visibility","visible");
		}else{
			$('#btn_backtop').css("visibility","hidden");
		}
	})
	jQuery.extend({
		backtop:function(obj3,time){
			obj3.on("click",function(){
				var top3=$(document).scrollTop();
				console.log(top3)
				var newobj3={top3:top};
				$(newobj3).animate({top3:0},{
					duration:800,
					step:function(){
						$(document).scrollTop(newobj3.top)
					}
				})
			})
		}
	})
	$.backtop($('#btn_backtop'));
	$('#btn_backtop').hover(function(){
		$('#btn_backtop div').css("transform","translate(0px,0px)");
		$('#btn_backtop').addClass('hover');
	},function(){
		$('#btn_backtop div').css("transform","translate(110%,0px)");
		$('#btn_backtop').removeClass('hover');
	})
})