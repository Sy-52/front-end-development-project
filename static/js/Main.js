/* 全局变量 -- 消息通知栏 */
var tip_div = getElementByClassName('div','m-tip');
/* 全局变量 -- 关注按钮 */
var focus_div = getElementByClassName('div','focus');
var attention_div = getElementByClassName('div','attention disappear');
/* 全局变量 -- 登录窗口 */
var mask1_div = getElementByClassName('div','g-mask1 disappear');
var userName = document.getElementsByTagName('input')[0];
var password = document.getElementsByTagName('input')[1];
var mask_label = document.getElementsByTagName('label')[0];
var submit_div = getElementByClassName('div','submit');
/* 全局变量 -- 轮播图 */
var banner_ul = document.getElementsByTagName('ul')[0];
var banner_li = banner_ul.getElementsByTagName('li');
var slide_ul = document.getElementsByTagName('ul')[1];
var slide_li = slide_ul.getElementsByTagName('li');
var IntervalID;

/* 顶部通知条 */
(function(){
	/* 没想到getElementByClassName与getElementsByTagName居然可以连用 */
	var button_div = tip_div.getElementsByTagName('div')[0];
	/* 检测cookie是否设置 */
	if(/read=true/g.test(document.cookie)){
		tip_div.className = 'm-tip disappear';
	}
	/* 若cookie未设置绑定点击事件 */
	if(!getCookie('read')){
		addEvent(button_div,'click',disappear);
	}
})();

/* 载入页面时loginSuc、followSuc同时存在才能显示"已关注"按钮 */
(function(){
	if(getCookie('loginSuc') && getCookie('followSuc')){
		focus_div.className = 'focus disappear';
		attention_div.className = 'attention';
	}
})();

/* 点击关注 */
(function(){
	addEvent(focus_div,'click',clickFocusButton);
})();

/* 登录弹窗 */
(function(){
	addEvent(userName,'blur',inputBlur);
	addEvent(userName,'focus',inputFocus);
	addEvent(password,'blur',inputBlur);
	addEvent(password,'focus',inputFocus);
	addEvent(submit_div,'click',clickSubmitButton);
})();

/* 轮播图 */ 
(function(){
	/* 给三个按钮分别绑定点击事件 */
	for(var i = 0;i < 3;i++){
		addEvent(slide_li[i],'click',slideClick);
	}	
	/* 绑定鼠标hover事件 */
	addEvent(banner_ul,'mouseenter',removeAutoPlay);
	addEvent(banner_ul,'mouseleave',autoPlay);
	/* 轮播图自动播放 */
	autoPlay();
})();

/* 点击Tab切换课程、点击页码切换课程 */
// (function(){
// 	var tab_div = getElementByClassName('div','tab');
// 	var tabChild_div = tab_div.getElementsByTagName('div');
// 	var pageNumber_li = document.getElementsByTagName('ol')[0].getElementsByTagName('li');
// 	var type = 10;
// 	var courseNum = 20;
// 	var pageNum = 1;
	/* 检测浏览器窗口大小 */
	// checkWindow();
	// addEvent(window,'resize',onresize);
	/* 事件函数 -- 检测浏览器窗口大小 */
	// function onresize(){
	// 	checkWindow();
	// }
	// function checkWindow(){
	// 	if(window.innerWidth < 1205){
	// 		courseNum = 15;
	// 	}else{
	// 		courseNum = 20;
	// 	}
	// 	ajax('GET','http://study.163.com/webDev/couresByCategory.htm?pageNo=' + pageNum + '&psize=' + courseNum + '&type='+ type,callBack);
	// }
	/* 点击Tab切换课程 */
	// for(i = 0;i < tabChild_div.length;i++){
	// 	addEvent(tabChild_div[i],'click',clickChange);
	// }
	// function clickChange(){
	// 	var currentPage;
		/* 变换页码前先清除之前选择的页码 */
	// 	for(i = 0;i < tabChild_div.length;i++){
	// 		if(tabChild_div[i].className == 'selected'){
	// 			tabChild_div[i].className = '';
	// 		}
	// 	}
	// 	this.className = 'selected';
	// 	for(i = 0;i < tabChild_div.length;i++){
	// 		if(tabChild_div[i].className == 'selected'){
	// 			 判断Tab项的内容，返回对应类型课程 
	// 			if(this.innerHTML == '编程语言'){
	// 				type = 20;
	// 			}else{
	// 				type = 10;
	// 			}
	// 		}
	// 	}
	// 	ajax('GET','http://study.163.com/webDev/couresByCategory.htm?pageNo=' + pageNumber_li[pageNum].innerHTML + '&psize=' + courseNum + '&type='+ type,callBack);
	// }

	/* 给所有页码绑定点击事件 */
	// for(i = 1;i < pageNumber_li.length - 1;i++){
	// 	addEvent(pageNumber_li[i],'click',selectedEvent);
	// }
	/* 事件绑定函数selectedEvent */
	// function selectedEvent(){
	// 	var that = this;
		/* 获取当前页码 */
	// 	function getCourseData(self){
	// 		for(i = 0;i < pageNumber_li.length;i++){
	// 			if(pageNumber_li[i].className == 'selected'){
	// 				pageNumber_li[i].className = '';
	// 			}
	// 		}
	// 		self.className = 'selected';
	// 		for(i = 0;i < pageNumber_li.length;i++){
	// 			if(pageNumber_li[i].className == 'selected'){
	// 				pageNum = i;
	// 				ajax('GET','http://study.163.com/webDev/couresByCategory.htm?pageNo=' + pageNumber_li[i].innerHTML + '&psize=' + courseNum + '&type='+ type,callBack);
	// 			}
	// 		}
	// 	}
	// 	getCourseData(that);
	// }

	/* 课程处理函数 */
	// function callBack(jsonObj){
	// 	jsonObj = JSON.parse(jsonObj);
	// 	var course_ul = getElementByClassName('div','content').getElementsByTagName('ul')[0];
	// 	var course_li = course_ul.getElementsByTagName('li');
		/* 删除前面所选页的节点 */
		// for(i = 0;i < 20;i++){
		// 	if(course_li.length != 0){
		// 		course_ul.removeChild(course_li[0]);
		// 	}else{
		// 		break;
		// 	}
		// }
		/* 创建课程节点 */
		// for(i = 0;i < courseNum;i++){
		// 	var course_li = document.createElement('li');
			/* 课程图片 */
			// var courseImage_div = document.createElement('div');
			// var courseImage_img = document.createElement('img');
			// courseImage_img.src = jsonObj.list[i].bigPhotoUrl;
			// courseImage_img.setAttribute('width','223px');
			// courseImage_img.setAttribute('height','124px');
			// courseImage_div.appendChild(courseImage_img);
			/* 课程名 */
			// var courseTile_h3 = document.createElement('h3');
			// courseTile_h3.innerHTML = jsonObj.list[i].name;
			/* 提供者 */
			// var courseintroduce_span = document.createElement('span');
			// courseintroduce_span.innerHTML = jsonObj.list[i].provider;
			/* 人数 */
			// var coursepeople_div = document.createElement('div');
			// coursepeople_div.innerHTML = "<img src='static/image/people-count.png'/><span>"+ jsonObj.list[i].learnerCount +"</span>";
			/* 价格 */
			// var coursePrice_span = document.createElement('span');
			// coursePrice_span.innerHTML = '￥' + jsonObj.list[i].price;
			/* 将节点追加到<li>中 */
			// course_li.appendChild(courseImage_div);
			// course_li.appendChild(courseTile_h3);
			// course_li.appendChild(courseintroduce_span);
			// course_li.appendChild(coursepeople_div);
			// course_li.appendChild(coursePrice_span);
			/* 追加课程详细信息DOM节点 */
			// var courseDetail_div = document.createElement('div');
			// courseDetail_div.className = 'courseDetail';
			/* 课程 -- 摘要 */
			// var courseAbstract_div = document.createElement('div');
			// courseAbstract_div.className = 'courseAbstract';
			/* 摘要 -- 图片容器 */
			// var courseImg_div = document.createElement('div');
			/* 图片容器 -- 图片 */
			// var courseImg_img = document.createElement('img');
			// courseImg_img.src = jsonObj.list[i].bigPhotoUrl;
			// courseImg_img.setAttribute('width','223px');
			// courseImg_img.setAttribute('height','124px');	
			// courseImg_div.appendChild(courseImg_img);	
			/* 摘要容器 -- 图片以外部分 */
			// var courseOther_div = document.createElement('div');
			/* 图片以外部分 -- 标题 */
			// var courseOther_h3 = document.createElement('h3');
			// courseOther_h3.innerHTML = jsonObj.list[i].name;
			// courseOther_div.appendChild(courseOther_h3);
			/* 图片以外部分 -- 人数 */
			// var courseOtherPeople_div = document.createElement('div');
			// courseOtherPeople_div.innerHTML = "<img src='static/image/people-count.png'/><span>"+ jsonObj.list[i].learnerCount +"</span><span>人在学</span>";
			// courseOther_div.appendChild(courseOtherPeople_div);
			/* 图片以外部分 -- 发布者 */
			// var courseOtherPublisher_div = document.createElement('div');
			// courseOtherPublisher_div.innerHTML = '<span>发布者：</span><span>'+ jsonObj.list[i].provider +'</span>';
			// courseOther_div.appendChild(courseOtherPublisher_div);
			/* 图片以外部分 -- 分类 */
			// var courseOtherClassify_div = document.createElement('div');
			// courseOtherClassify_div.innerHTML = '<span>分类：</span><span>'+ jsonObj.list[i].categoryName +'</span>';
			// courseOther_div.appendChild(courseOtherClassify_div);
			/* 将图片容器和图片以外部分追加到摘要部分中 */
			// courseAbstract_div.appendChild(courseImg_div);		
			// courseAbstract_div.appendChild(courseOther_div);				
			/* 课程 -- 介绍 */
			// var courseIntroduce_p = document.createElement('p');
			// courseIntroduce_p.innerHTML = jsonObj.list[i].description;
			/* 将摘要部分和课程介绍部分追加到课程详情中 */
		// 	courseDetail_div.appendChild(courseAbstract_div);
		// 	courseDetail_div.appendChild(courseIntroduce_p);
		// 	course_li.appendChild(courseDetail_div);
		// 	course_ul.appendChild(course_li);
		// }
		/* 对每一门课程绑定hover事件 */
		// var course_li = course_ul.getElementsByTagName('li');
		// for(i = 0;i < courseNum;i++){
		// 	addEvent(course_li[i],'mouseenter',onmouseenter);
		// 	addEvent(course_li[i],'mouseleave',onmouseleave);
		// }
		/* 事件函数 */
		// function onmouseenter(ev){
		// 	var event = ev || window.event;
			/* 若追加过课程详细信息DOM节点，那么只需要将让其显示即可 */
// 			event.target.lastChild.style.display = 'block';
// 		}
// 		function onmouseleave(ev){
// 			var event = ev || window.event;
// 			event.target.lastChild.style.display = 'none';			
// 		}
// 	}
// })();

/* 最热排行 */
// (function(){
// 	var course_ul = getElementByClassName('ul','list');
// 	var course_li = course_ul.getElementsByTagName('li');
// 	var current = 11;
	/* 热门课程数据获取 */
	// ajax('GET','http://study.163.com/webDev/hotcouresByCategory.htm',callBack);
	// function callBack(jsonObj){
	// 	jsonObj = JSON.parse(jsonObj);
	// 	for(var i = 0;i < 10;i++){
			/* 热门排行 -- 课程创建 */
		// 	addCourses(i);
		// }
		/* 新课程添加函数 */
		// function addCourses(num){
		// 	var course_li = document.createElement('li');
			/* 课程图片 */
			// var courseImage_div = document.createElement('div');
			// var courseImage_img = document.createElement('img');
			// courseImage_img.setAttribute('src',jsonObj[num].smallPhotoUrl);
			// courseImage_img.setAttribute('width','50px');
			// courseImage_img.setAttribute('height','50px');
			// courseImage_div.appendChild(courseImage_img);
			/* 课程名 */
			// var courseIntroduce_div = document.createElement('div');
			// var courseIntroduce_h3 = document.createElement('h3');
			// courseIntroduce_h3.innerHTML = jsonObj[num].name;
			// courseIntroduce_div.appendChild(courseIntroduce_h3);
			/* 课程介绍 */
			// var courseIntroduce_div1 = document.createElement('div');
			// var courseIntroduce_img = document.createElement('img');
			// courseIntroduce_img.setAttribute('src','static/image/people-count.png');
			// courseIntroduce_div1.appendChild(courseIntroduce_img);
			// var courseIntroduce_span = document.createElement('span');
			// courseIntroduce_span.innerHTML = jsonObj[num].learnerCount;
			// courseIntroduce_div1.appendChild(courseIntroduce_span);
			// courseIntroduce_div.appendChild(courseIntroduce_div1);
			/* 将新建节点追加到对应父节点中 */
		// 	course_li.appendChild(courseImage_div);
		// 	course_li.appendChild(courseIntroduce_div);
		// 	course_ul.appendChild(course_li);
		// }
		/* 动态更新课程 */
// 		function change(){
// 			course_ul.removeChild(course_li[1]);
// 			addCourses(current);
// 			if(current == 19){
// 				current = 1;
// 			}else{
// 				current++;
// 			}
// 		}
// 		setInterval(change,5000);
// 	}
// })();

/* 机构介绍 -- 视频介绍 */
// (function(){
	/* 给图片绑定弹窗 */
	// var video_div = getElementByClassName('div','video').getElementsByTagName('div')[0];
	// var x_div = getElementByClassName('div','container').getElementsByTagName('div')[0];
	// var video_video = document.getElementsByTagName('video')[0];
	// addEvent(video_div,'click',onclick);
	// addEvent(x_div,'click',onclick);
	/* 事件委托技术优化性能 */
// 	function onclick(ev){
// 		var event = ev || window.event;
// 		switch(event.currentTarget.className){
// 			case 'videoImg':
// 			getStyleSelector('.g-mask').style.display = 'block';
// 			break;
// 			/* 点击x号关闭弹窗 */
// 			case 'xImg':
// 			getStyleSelector('.g-mask').style.display = 'none';
// 			video_video.load();
// 			break;
// 		}
// 	}
// })();

/* 
  "通知消息"消失函数 -- disappear 
   本来想写为可复用的组件函数，但是"通知消息"消失的逻辑必须在该事件函数中执行，所以作罢
 */
function disappear(){
	tip_div.className = 'm-tip disappear';
	setCookie('read','true',10);
}

/* "点击关注按钮"函数 */
function clickFocusButton(){
	if(getCookie('loginSuc')){
		focus_div.className = 'focus disappear';
		attention_div.className = 'attention';
	}else{
		mask1_div.className = 'g-mask1';
	}
}

/* "输入框失去焦点"事件函数 */
function inputBlur(ev){
	var event = window.event || ev;
	if(event.target){
		var target = event.target;
	}else{
		target = event.srcElement;
	}
	switch(target.id){
		case 'userName':
		if(event.target.value == ''){
			event.target.style.backgroundColor = '#fafafa';
			event.target.style.color = '#ccc';
			event.target.value = '账号';
		}
		break;
		/* 密码框失去焦点处理 */
		case 'password':
		if(event.target.value == ''){
			mask_label.style.display = 'block';
		}
		break;
	}
}

/* "输入框获得焦点"事件函数 */
function inputFocus(ev){
	var event = window.event || ev;
	if(event.target){
		var target = event.target;
	}else{
		target = event.srcElement;
	}
	switch(target.id){
		case 'userName':
		event.target.style.backgroundColor = '#fff';
		event.target.style.color = '#666';
		if(event.target.value == '账号'){
			event.target.value = '';
		}
		break;
		/* 密码框获得焦点处理 */
		case 'password':
		event.target.style.backgroundColor = '#fff';
		event.target.style.color = '#666';
		mask_label.style.display = 'none';
		break;
	}
}

/* "点击登录按钮"事件函数 */
function clickSubmitButton(){
	ajax('get','http://study.163.com/webDev/login.htm?userName=' + hex_md5(userName.value) + '&password=' + hex_md5(password.value),loginSuc);
}

/* 登录成功后回调处理函数 */
function loginSuc(data){
	if (data == 1) {
		/* 登录成功后调用关注API设置cookie */
		setCookie('loginSuc','true',30);
		ajax('get','http://study.163.com/webDev/attention.htm',setAttention);
	}else{
		alert('账号/密码错误');
		userName.value = '';
		password.value = '';
		userName.focus();
	}
}

/* 关注成功后回调处理函数 */
function setAttention(data){
	if(data == 1){
		setCookie('followSuc','true',30);
		focus_div.className = 'focus disappear';
		attention_div.className = 'attention';
		mask1_div.className = 'g-mask1 disappear';
    }
}	

/* 点击轮播图按钮触发事件 */
function slideClick(){
	clear();
	this.className = 'selected';
	for(i = 0;i < 3;i++){
		if(slide_li[i].className == 'selected'){
			banner_li[i].className = 'selected';
			fadeIn(banner_li[i],50);
		}
	}
}

/* clear函数用于清除前一张选中的图片 */
function clear(){
	var i;
	for(i = 0;i < 3;i++){
		if(banner_li[i].className == 'selected'){
			banner_li[i].className = '';
		}
		if(slide_li[i].className == 'selected'){
			slide_li[i].className = '';
		}
	}
}

/* 图片渐入函数 */
function fadeIn(ele,time){
	var stepLength = 1/time;
	var tmpOffset = 0;
	var IntervalID = setInterval(function(){
		if(tmpOffset < 1){
			tmpOffset = tmpOffset + stepLength;
			getStyleSelector('.m-slide .banner .selected').style.opacity = tmpOffset;
		}else{
			getStyleSelector('.m-slide .banner .selected').style.opacity = 1;
			clearInterval(IntervalID);
		}
	},10);
}

/* 
  轮播图自动播放函数 
  该方法其实不完善，如果鼠标悬停3图并离开后，下一张图刷的是2图而非1图,所以稍作改动
  JS是单线程语言,"异步任务"要等执行栈中的同步任务执行完毕后才将"task queue"中挂起的异步任务推入执行栈执行。异步任务必须指定回调函数（被主线程挂起来的代码）
  JS的这种执行任务机制又称为Event Loop
 */
function autoPlay(){
	var nextImg , i;
	IntervalID = setInterval(function(){
		for(i = 0;i < 3;i++){
			/* 查了一下午，结果Bug在这 : == 和 = ！！ */
			if(slide_li[i].className == 'selected'){
				nextImg = i + 1;
				break;
			}
		}
		clear();
		if(nextImg == 3){nextImg = 0}
		slide_li[nextImg].className = 'selected';
		banner_li[nextImg].className = 'selected';
		fadeIn(banner_li[nextImg],50);
	},5000);
}	

function removeAutoPlay(){
	clearInterval(IntervalID);
}