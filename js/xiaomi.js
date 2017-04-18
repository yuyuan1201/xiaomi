window.onload = function() { /*加载网页*/
	setPlay(); //中间的大图片自动轮播
	a.onmouseover = function() { stopPlay(); }
	a.onmouseout = function() { setPlay(); }
}

var a = document.getElementsByClassName('pic')[0];
var b = document.getElementsByClassName('pic-li');
var bWidth = b[0].offsetWidth; //获取图片的宽度
var index1 = -1; //将其定义在外面方便后面的onmouseover和onmouseout修改初数值

var pic_list = document.getElementsByClassName("pic-list")[0]; //图片的小点列表
var pic_list_li = pic_list.getElementsByTagName('li');
for(var j = 0; j < b.length; j++) { //起始index1不好解决。。
	pic_list_li[j].index = j;
	pic_list_li[j].onmouseover = function() {
		pic_list_omover(this.index);
	}
	pic_list_li[j].onmouseout = function() {
		pic_list_omout(this.index);
	}
	pic_list_li[j].onclick = function() {
		pic_list_dj(this.index);
	}
}

function stopPlay() {
	clearInterval(returnNumber1);
}

function setPlay() {
	returnNumber1 = setInterval(function() { //returnNumber1表示大图片切换设置的定时器返回值
		//打开页面时赋初值为-1保证了后面一轮过后的index1值为当前图片的下标
		if(++index1 == b.length) {
			index1 = 0;
		}
		bandle_pic_and_list(index1);
	}, 3000);
}

function pic_list_dj(i1) { //点击小点时切换图片
	index1 = i1; //传入下标进行处理
	clearInterval(returnNumber1);
	bandle_pic_and_list(index1);
	setPlay();
}

function bandle_pic_and_list(i1) { // 将图片和小点序列在一起绑定
	pic_list_omover(i1);
	a.style.marginLeft = -(bWidth * i1) + "px";
	for(var j = 0; j < b.length; j++) {
		if(j != i1) {
			pic_list_omout(j);
		}
	}
}

function pic_list_omout(i1) {
	if(i1 != index1) { //防止当前小点序列在li:hover的作用下出现也消出当前图标的提示;
		pic_list_li[i1].style.backgroundColor = "rgba(0, 0, 0, 0.4)";
		pic_list_li[i1].style.borderColor = "rgba(0, 0, 0, 0.2)";
	}
}

function pic_list_omover(i1) {
	pic_list_li[i1].style.backgroundColor = "white";
	pic_list_li[i1].style.borderColor = "rgba(0, 0, 0, 0.4)";
}

function pic_oclick(i1) { //图片左右的按钮点击触发事件
	clearInterval(returnNumber1);
	var k = index1 + i1;
	if(index1 == 4 && i1 == 1) { //在为index == 4，点击右边div切图
		index1 = 0;
	} else if((index1 == -1 || index1 == 0) && i1 == -1) { //在为index == -1/0，点击左边div切图
		index1 = 4;
	} else if(index1 == -1 && i1 == 1) { //防止页面一打开直接点击右边div不切换图片；
		index1 = 1;
	} else {
		index1 = k;
	}
	bandle_pic_and_list(index1);
	setPlay();
}

/*
 * 1小米明星单品--通过左右点击来回切换图片效果
 * 2为你推荐
 * */
var display_div = document.getElementsByClassName("part2-single-activity");
var display_ul = document.getElementsByClassName("part2-single-content");
var width_display_div = display_div[0].offsetWidth;
var act_left = document.getElementsByClassName("single-left");
var act_right = document.getElementsByClassName("single-right");
var s = [];
singlePlay();
navPlay();
display_ul[0].onmouseover = function() { clearInterval(s[0]) };
display_ul[1].onmouseover = function() { clearInterval(s[1]) };
display_ul[0].onmouseout = function() { singlePlay(); };
display_ul[1].onmouseout = function() { navPlay(); };
/*小米明星单品*/
act_left[0].onclick = function() {
	point_left(0, 0);
}
act_right[0].onclick = function() {
	point_right(1, 0);
}
act_left[0].onmouseover = function() {
	s_hover(0, 0);
}
act_right[0].onmouseover = function() {
	s_hover(1, 0);
}
act_left[0].onmouseout = function() {
	s_hout(0, 0);
}
act_right[0].onmouseout = function() {
	s_hout(1, 0);
}
/*为你推荐
左： onclick="point_left(-1)" onmouseover="s_hover(0)"onmouseout="s_hout(0)"
右：onclick="point_right(0)" onmouseover="s_hover(1)"onmouseout="s_hout(1)"
 * */
act_left[1].onclick = function() {
	point_left(0, 1);
}
act_right[1].onclick = function() {
	point_right(1, 1);
}
act_left[1].onmouseover = function() {
	s_hover(0, 1);
}
act_right[1].onmouseover = function() {
	s_hover(1, 1);
}
act_left[1].onmouseout = function() {
	s_hout(0, 1);
}
act_right[1].onmouseout = function() {
	s_hout(1, 1);
}

/*
 * 小米明星单品格式公用
 */
var single_index1 = 1; //single_index为0呈现左边内容，为1时呈现右边内容；
function singlePlay() {
	s[0] = setInterval(function() { //图片自身实现来回的切换效果
		if(single_index1 == 0) {
			move_left(0);
			single_index1 = 1;
		} else {
			move_right(0);
			single_index1 = 0;
		}
	}, 5000);
}

var single_index2 = 1;

function navPlay() {
	s[1] = setInterval(function() { //图片自身实现来回的切换效果
		if(single_index2 == 0) {
			move_left(1);
			single_index2 = 1;
		} else {
			move_right(1);
			single_index2 = 0;
		}
	}, 5000);
}

function point_left(i1, i) {
	move_left(i); //调用呈现左边内容的方法；
	if(i == 0) {
		single_index1 = i1; //点击左边按钮呈现左边内容
	}
	if(i == 1) {
		single_index2 = i1;
	}
}

function point_right(i1, i) { //点击右边时ul向左边移动一个显示框的宽度；
	move_right(i); //调用呈现右边内容方法
	if(i == 0) {
		single_index1 = i1; //点击右边按钮呈现右边内容
	}
	if(i == 1) {
		single_index2 = i1; //点击右边按钮呈现右边内容
	}
}

function move_left(i) { //呈现左边内容的方法并绑定右按钮图标
	act_left[i].style.cursor = "default";
	act_right[i].style.cursor = "pointer";
	leftSAndRightD(i); //右边图标颜色深
	display_ul[i].style.marginLeft = '0'; //默认左边为marginLeft为0px
}

function move_right(i) { //呈现右边内容的方法并绑定左按钮图标
	act_right[i].style.cursor = "default";
	act_left[i].style.cursor = "pointer";
	leftDAndRightS(i); //左边图标颜色深
	display_ul[i].style.marginLeft = -width_display_div + "px";
}

function s_hover(i1, i) {
	if(act_left[i].style.cursor == "pointer") {
		if(!i1) {
			act_left[i].style.color = "#ff6700";
			act_right[i].style.color = "#e0e0e0";
		}
	} else {
		if(i1) {
			act_right[i].style.color = "#ff6700";
			act_left[i].style.color = "#e0e0e0";
		}
	}
}

function s_hout(i1, i) {
	if(act_left[i].style.cursor == "pointer") {
		if(!i1) { leftDAndRightS(i); }
	} else {
		if(i1) { leftSAndRightD(i); }
	}
}

function leftSAndRightD(i) {
	act_right[i].style.color = "#b0b0b0";
	act_left[i].style.color = "#e0e0e0";
}

function leftDAndRightS(i) {
	act_left[i].style.color = "#b0b0b0";
	act_right[i].style.color = "#e0e0e0";
}

/*
 * 搭配格式通用
 */

function listChange(obj,index) {
	
		var span = obj.getElementsByTagName('span');
		for(var j = 0; j < span.length; j++) {
			if(j == index) {
				obj[j].className = "sec-title";
			} else {
				obj[j].className = "";
			}
		}
	}

function displayAndShadow(s_list, s_content) {
	for(var i1 = 0; i1 < s_list.length; i1++) {
		s_list[i1].index = i1; //自定义标记
		s_list[i1].onmouseover = function() {
			
			for(var j = 0; j < s_list.length; j++) {
				var span = s_list[j].getElementsByTagName('span');
				if(j == this.index) {
					span[0].className = "sec-title";
				} else {
					span[0].className = "";
				}
			}
			
			
			for(var i2 = 0; i2 < s_list.length; i2++) {
				if(i2 == this.index) s_content[i2].style.display = "block";
				else s_content[i2].style.display = "none";
			}
		}
		
	}
}

/*
 * 搭配
 */
var dp_div = document.getElementsByClassName("dp-list")[0];
var dp_list = dp_div.getElementsByClassName("list-item");
var dp_content = dp_div.getElementsByClassName("shop-middle-content-right");
displayAndShadow(dp_list, dp_content);
/*
 * 配件
 */
var pj_div = document.getElementsByClassName("pj-list")[0];
var pj_list = pj_div.getElementsByClassName("list-item");
var pj_content = pj_div.getElementsByClassName("shop-middle-content-right");
displayAndShadow(pj_list, pj_content);
/*
 * 周边
 */
var zb_div = document.getElementsByClassName("zb-list")[0];
var zb_list = zb_div.getElementsByClassName("list-item");
var zb_content = zb_div.getElementsByClassName("shop-middle-content-right");
displayAndShadow(zb_list, zb_content);
/*
 * 为你推荐----直接应用小米明星单品
 */

/*
 * 内容部分
 * */
var nr_list_div = document.getElementsByClassName("nr-list-div");
var nr_list_ul = document.getElementsByClassName("nr-list-ul");
var nr_list_item = nr_list_div[0].getElementsByClassName("nr-list-item");
var itemWidth = nr_list_item[0].offsetWidth;
var nr_left = document.getElementsByClassName("nr-left");
var nr_right = document.getElementsByClassName("nr-right");
function selectPoint(obj,index) {
	for(var j = 0; j < obj.length; j++) {
		if(j == index) {
			obj[j].className = "nr-list-li";
		} else {
			obj[j].className = "";
		}
	}
}
//function nrLeftPoint(listDiv, listIndex, listLi) {
//	if(--listIndex < 0) {
//		listIndex = 0;
//	}
//	selectPoint(listLi, listIndex);
//	listDiv.style.marginLeft = -itemWidth * listIndex + "px";
//}
//
//function nrRightPoint(listDiv, listIndex, listLi) {
//	if(++listIndex > listLi.length - 1) {
//		listIndex = listLi.length - 1;
//	}
//	selectPoint(listLi, listIndex);
//	listDiv.style.marginLeft = -itemWidth * listIndex + "px";
//}
/*图书*/
var nr_list_li0 = nr_list_ul[0].getElementsByTagName("li");
var nr_list_index0 = 0;
for(var i = 0; i < nr_list_li0.length; i++) {
	nr_list_li0[i].index = i;
	nr_list_li0[i].onclick = function() {
		nr_list_index0 = this.index;
		point_onclick0(this.index);
		selectPoint(nr_list_li0,nr_list_index0);
	}
}
nr_left[0].onclick = function() {
	if(--nr_list_index0 < 0) {
		nr_list_index0 = 0;
	}
	selectPoint(nr_list_li0,nr_list_index0);
	nr_list_div[0].style.marginLeft = -itemWidth * nr_list_index0 + "px";
}
nr_right[0].onclick = function() {
	if(++nr_list_index0 > nr_list_li0.length - 1) {
		nr_list_index0 = nr_list_li0.length - 1;
	}
	selectPoint(nr_list_li0,nr_list_index0);
	nr_list_div[0].style.marginLeft = -itemWidth * nr_list_index0 + "px";
}

function point_onclick0(i) { //点击第i个点向左移动距离
	nr_list_div[0].style.marginLeft = -itemWidth * i + "px";
}

/*主题*/
var nr_list_li1 = nr_list_ul[1].getElementsByTagName("li");
var nr_list_index1 = 0;
for(var i = 0; i < nr_list_li1.length; i++) {

	nr_list_li1[i].index = i;
	nr_list_li1[i].onclick = function() {
		nr_list_index1 = this.index;
		point_onclick1(this.index);
		selectPoint(nr_list_li1,nr_list_index1);
	}
}
nr_left[1].onclick = function() {
	if(--nr_list_index1 < 0) {
		nr_list_index1 = 0;
	}
	selectPoint(nr_list_li1,nr_list_index1);
	nr_list_div[1].style.marginLeft = -itemWidth * nr_list_index1 + "px";
}
nr_right[1].onclick = function() {
	if(++nr_list_index1 > nr_list_li1.length - 1) {
		nr_list_index1 = nr_list_li1.length - 1;
	}
	selectPoint(nr_list_li1,nr_list_index1);
	nr_list_div[1].style.marginLeft = -itemWidth * nr_list_index1 + "px";
}

function point_onclick1(i) { //点击第i个点向左移动距离
	nr_list_div[1].style.marginLeft = -itemWidth * i + "px";
}

/*游戏*/
var nr_list_li2 = nr_list_ul[2].getElementsByTagName("li");
var nr_list_index2 = 0;
for(var i = 0; i < nr_list_li2.length; i++) {

	nr_list_li2[i].index = i;
	nr_list_li2[i].onclick = function() {
		nr_list_index2 = this.index;
		point_onclick2(this.index);
		selectPoint(nr_list_li2,nr_list_index2);
	}
}
nr_left[2].onclick = function() {
	if(--nr_list_index2 < 0) {
		nr_list_index2 = 0;
	}
	selectPoint(nr_list_li2,nr_list_index2);
	nr_list_div[2].style.marginLeft = -itemWidth * nr_list_index2 + "px";
}
nr_right[2].onclick = function() {
	if(++nr_list_index2 > nr_list_li2.length - 1) {
		nr_list_index2 = nr_list_li2.length - 1;
	}
	selectPoint(nr_list_li2,nr_list_index2);
	nr_list_div[2].style.marginLeft = -itemWidth * nr_list_index2 + "px";
}

function point_onclick2(i) { //点击第i个点向左移动距离
	nr_list_div[2].style.marginLeft = -itemWidth * i + "px";
}

/*应用*/
var nr_list_li3 = nr_list_ul[3].getElementsByTagName("li");
var nr_list_index3 = 0;
for(var i = 0; i < nr_list_li3.length; i++) {

	nr_list_li3[i].index = i;
	nr_list_li3[i].onclick = function() {
		nr_list_index3 = this.index;
		point_onclick3(this.index);
		selectPoint(nr_list_li3,nr_list_index3);
	}
}
nr_left[3].onclick = function() {
	if(--nr_list_index3 < 0) {
		nr_list_index3 = 0;
	}
	selectPoint(nr_list_li3,nr_list_index3);
	nr_list_div[3].style.marginLeft = -itemWidth * nr_list_index3 + "px";
}
nr_right[3].onclick = function() {
	if(++nr_list_index3 > nr_list_li3.length - 1) {
		nr_list_index3 = nr_list_li3.length - 1;
	}
	selectPoint(nr_list_li3,nr_list_index3);
	nr_list_div[3].style.marginLeft = -itemWidth * nr_list_index3 + "px";
}

function point_onclick3(i) { //点击第i个点向左移动距离
	nr_list_div[3].style.marginLeft = -itemWidth * i + "px";
}

//点击返回顶部按钮
var toTopBtn = document.getElementById('toTopBtn');
toTopBtn.onclick = function() {

	var n = 50; //缓冲到顶部的距离;
	var scrollToTop = setInterval(function() {
		var m = document.body.scrollTop;
		if(m == 0) {
			clearInterval(scrollToTop);
		}
		window.scrollBy(0, Math.floor(-(m / n))); //向下取整保证了能够让m在小于n时值为-1取直到top为0停止定时器
	}, 10);
}
/*搜索框*/
var searchInput = document.getElementById('searchInput');
var input1 = document.getElementsByClassName('input1');
searchInput.onfocus = function() {
	for(var i = 0; i < input1.length; i++) {
		input1[i].style.display = 'none';
	}
}
searchInput.onblur = function() {
	for(var i = 0; i < input1.length; i++) {
		input1[i].style.display = 'block';
	}
}
/*part2部分的hover*/
var partTopCenterLi = document.getElementsByClassName('part2-top-center-li');
var onli = false;
for(var partli = 0; partli < partTopCenterLi.length; partli++) {
	partTopCenterLi[partli].onmouseover = function() {
		//		if(!onli){
		//			onli = true;
		var partTopCenterLiSec = this.getElementsByClassName('part2-top-center-li-sec')[0];
		partTopCenterLiSec.style.height = 201 + 'px';
		//		}
	}
	partTopCenterLi[partli].onmouseout = function() {
		var partTopCenterLiSec = this.getElementsByClassName('part2-top-center-li-sec')[0];
		//		if(!onli){
		//			onli = flase;
		partTopCenterLiSec.style.height = 0 + 'px';
		//		}else{
		//			partTopCenterLiSec.style.height = 201 + 'px';
		//		}
	}
}