/* 轮播图IIFE */ 
(function(){
	/* 获取轮播图片和按钮的DOM对象 */
	var banner_ul = document.getElementsByTagName('ul')[0];
	var banner_li = banner_ul.getElementsByTagName('li');
	var slide_ul = document.getElementsByTagName('ul')[1];
	var slide_li = slide_ul.getElementsByTagName('li');
	/* 给按钮绑定点击事件 */
	var image_number = slide_li.length;
	for(var i = 0;i < image_number;i++){
		addEvent(slide_li[i],'click',slideClick);
	}
	/* 按钮事件 - slideClick */
	function slideClick(){
		/* clear函数用于清除前一张选中的图片 */
		clear();
		this.className = 'selected';
		for(i = 0;i < image_number;i++){
			if(slide_li[i].className == 'selected'){
				banner_li[i].className = 'selected';
				fadeIn(banner_li[i],50);
			}
		}
	}
	function clear(){
		for(i = 0;i < image_number;i++){
			if(banner_li[i].className == 'selected'){
				banner_li[i].className = '';
			}
			if(slide_li[i].className == 'selected'){
				slide_li[i].className = '';
			}
		}
	}
	/* 图片渐入函数 - fadeIn */
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

	/* 绑定鼠标hover事件 */
	var IntervalID;
	addEvent(banner_ul,'mouseenter',removeAutoPlay);
	addEvent(banner_ul,'mouseleave',autoPlay);
	/* 事件函数 */
	function autoPlay(){
		var i = 1;
		IntervalID = setInterval(function(){
			clear();
			slide_li[i].className = 'selected';
			banner_li[i].className = 'selected';
			fadeIn(banner_li[i],50);
			if(i < 2){
				i++;
			}else{ 
				i = 0;
			}
		},5000);
	}	
	function removeAutoPlay(){
		clearInterval(IntervalID);
	}
	/* 轮播图自动播放 */
	autoPlay();
})();

console.log(getStyleSelector());
/* 关闭顶部通知条IIFE */
(function(){
	var tip_div = getElementByClassName('div','m-tip');
	var button_div = tip_div.getElementsByTagName('div')[0];
	/* 检测cookie是否设置 */
	if(/read=true/g.test(document.cookie)){
		getStyleSelector('.g-head .m-tip').style.display = 'none';
	}
	/* 若cookie未设置绑定点击事件 */
	if(!getCookie('read')){
		addEvent(button_div,'click',disappear);
	}
	/* 事件函数disappear */
	function disappear(){
		getStyleSelector('.g-head .m-tip').style.display = 'none';
		setCookie('read','true',10);
	}
})();

/* 点击Tab切换课程、点击页码切换课程 */
(function(){
	var tab_div = getElementByClassName('div','tab');
	var tabChild_div = tab_div.getElementsByTagName('div');
	var pageNumber_li = document.getElementsByTagName('ol')[0].getElementsByTagName('li');
	var type = 10;
	var courseNum = 20;
	var pageNum = 1;
	/* 检测浏览器窗口大小 */
	checkWindow();
	addEvent(window,'resize',onresize);
	/* 事件函数 -- 检测浏览器窗口大小 */
	function onresize(){
		checkWindow();
	}
	function checkWindow(){
		if(window.innerWidth < 1205){
			courseNum = 15;
		}else{
			courseNum = 20;
		}
		ajax('GET','http://study.163.com/webDev/couresByCategory.htm?pageNo=' + pageNum + '&psize=' + courseNum + '&type='+ type,callBack);
	}
	/* 点击Tab切换课程 */
	for(i = 0;i < tabChild_div.length;i++){
		addEvent(tabChild_div[i],'click',clickChange);
	}
	function clickChange(){
		var currentPage;
		/* 变换页码前先清除之前选择的页码 */
		for(i = 0;i < tabChild_div.length;i++){
			if(tabChild_div[i].className == 'selected'){
				tabChild_div[i].className = '';
			}
		}
		this.className = 'selected';
		for(i = 0;i < tabChild_div.length;i++){
			if(tabChild_div[i].className == 'selected'){
				/* 判断Tab项的内容，返回对应类型课程 */
				if(this.innerHTML == '编程语言'){
					type = 20;
				}else{
					type = 10;
				}
			}
		}
		ajax('GET','http://study.163.com/webDev/couresByCategory.htm?pageNo=' + pageNumber_li[pageNum].innerHTML + '&psize=' + courseNum + '&type='+ type,callBack);
	}

	/* 给所有页码绑定点击事件 */
	for(i = 1;i < pageNumber_li.length - 1;i++){
		addEvent(pageNumber_li[i],'click',selectedEvent);
	}
	/* 事件绑定函数selectedEvent */
	function selectedEvent(){
		var that = this;
		/* 获取当前页码 */
		function getCourseData(self){
			for(i = 0;i < pageNumber_li.length;i++){
				if(pageNumber_li[i].className == 'selected'){
					pageNumber_li[i].className = '';
				}
			}
			self.className = 'selected';
			for(i = 0;i < pageNumber_li.length;i++){
				if(pageNumber_li[i].className == 'selected'){
					pageNum = i;
					ajax('GET','http://study.163.com/webDev/couresByCategory.htm?pageNo=' + pageNumber_li[i].innerHTML + '&psize=' + courseNum + '&type='+ type,callBack);
				}
			}
		}
		getCourseData(that);
	}

	/* 课程处理函数 */
	function callBack(jsonObj){
		jsonObj = JSON.parse(jsonObj);
		var course_ul = getElementByClassName('div','content').getElementsByTagName('ul')[0];
		var course_li = course_ul.getElementsByTagName('li');
		/* 删除前面所选页的节点 */
		for(i = 0;i < 20;i++){
			if(course_li.length != 0){
				course_ul.removeChild(course_li[0]);
			}else{
				break;
			}
		}
		/* 创建课程节点 */
		for(i = 0;i < courseNum;i++){
			var course_li = document.createElement('li');
			/* 课程图片 */
			var courseImage_div = document.createElement('div');
			var courseImage_img = document.createElement('img');
			courseImage_img.src = jsonObj.list[i].bigPhotoUrl;
			courseImage_img.setAttribute('width','223px');
			courseImage_img.setAttribute('height','124px');
			courseImage_div.appendChild(courseImage_img);
			/* 课程名 */
			var courseTile_h3 = document.createElement('h3');
			courseTile_h3.innerHTML = jsonObj.list[i].name;
			/* 提供者 */
			var courseintroduce_span = document.createElement('span');
			courseintroduce_span.innerHTML = jsonObj.list[i].provider;
			/* 人数 */
			var coursepeople_div = document.createElement('div');
			coursepeople_div.innerHTML = "<img src='static/image/people-count.png'/><span>"+ jsonObj.list[i].learnerCount +"</span>";
			/* 价格 */
			var coursePrice_span = document.createElement('span');
			coursePrice_span.innerHTML = '￥' + jsonObj.list[i].price;
			/* 将节点追加到<li>中 */
			course_li.appendChild(courseImage_div);
			course_li.appendChild(courseTile_h3);
			course_li.appendChild(courseintroduce_span);
			course_li.appendChild(coursepeople_div);
			course_li.appendChild(coursePrice_span);
			/* 追加课程详细信息DOM节点 */
			var courseDetail_div = document.createElement('div');
			courseDetail_div.className = 'courseDetail';
			/* 课程 -- 摘要 */
			var courseAbstract_div = document.createElement('div');
			courseAbstract_div.className = 'courseAbstract';
			/* 摘要 -- 图片容器 */
			var courseImg_div = document.createElement('div');
			/* 图片容器 -- 图片 */
			var courseImg_img = document.createElement('img');
			courseImg_img.src = jsonObj.list[i].bigPhotoUrl;
			courseImg_img.setAttribute('width','223px');
			courseImg_img.setAttribute('height','124px');	
			courseImg_div.appendChild(courseImg_img);	
			/* 摘要容器 -- 图片以外部分 */
			var courseOther_div = document.createElement('div');
			/* 图片以外部分 -- 标题 */
			var courseOther_h3 = document.createElement('h3');
			courseOther_h3.innerHTML = jsonObj.list[i].name;
			courseOther_div.appendChild(courseOther_h3);
			/* 图片以外部分 -- 人数 */
			var courseOtherPeople_div = document.createElement('div');
			courseOtherPeople_div.innerHTML = "<img src='static/image/people-count.png'/><span>"+ jsonObj.list[i].learnerCount +"</span><span>人在学</span>";
			courseOther_div.appendChild(courseOtherPeople_div);
			/* 图片以外部分 -- 发布者 */
			var courseOtherPublisher_div = document.createElement('div');
			courseOtherPublisher_div.innerHTML = '<span>发布者：</span><span>'+ jsonObj.list[i].provider +'</span>';
			courseOther_div.appendChild(courseOtherPublisher_div);
			/* 图片以外部分 -- 分类 */
			var courseOtherClassify_div = document.createElement('div');
			courseOtherClassify_div.innerHTML = '<span>分类：</span><span>'+ jsonObj.list[i].categoryName +'</span>';
			courseOther_div.appendChild(courseOtherClassify_div);
			/* 将图片容器和图片以外部分追加到摘要部分中 */
			courseAbstract_div.appendChild(courseImg_div);		
			courseAbstract_div.appendChild(courseOther_div);				
			/* 课程 -- 介绍 */
			var courseIntroduce_p = document.createElement('p');
			courseIntroduce_p.innerHTML = jsonObj.list[i].description;
			/* 将摘要部分和课程介绍部分追加到课程详情中 */
			courseDetail_div.appendChild(courseAbstract_div);
			courseDetail_div.appendChild(courseIntroduce_p);
			course_li.appendChild(courseDetail_div);
			course_ul.appendChild(course_li);
		}
		/* 对每一门课程绑定hover事件 */
		var course_li = course_ul.getElementsByTagName('li');
		for(i = 0;i < courseNum;i++){
			addEvent(course_li[i],'mouseenter',onmouseenter);
			addEvent(course_li[i],'mouseleave',onmouseleave);
		}
		/* 事件函数 */
		function onmouseenter(ev){
			var event = ev || window.event;
			/* 若追加过课程详细信息DOM节点，那么只需要将让其显示即可 */
			event.target.lastChild.style.display = 'block';
		}
		function onmouseleave(ev){
			var event = ev || window.event;
			event.target.lastChild.style.display = 'none';			
		}
	}
})();

/* 最热排行 */
(function(){
	var course_ul = getElementByClassName('ul','list');
	var course_li = course_ul.getElementsByTagName('li');
	var current = 11;
	/* 热门课程数据获取 */
	ajax('GET','http://study.163.com/webDev/hotcouresByCategory.htm',callBack);
	function callBack(jsonObj){
		jsonObj = JSON.parse(jsonObj);
		for(var i = 0;i < 10;i++){
			/* 热门排行 -- 课程创建 */
			addCourses(i);
		}
		/* 新课程添加函数 */
		function addCourses(num){
			var course_li = document.createElement('li');
			/* 课程图片 */
			var courseImage_div = document.createElement('div');
			var courseImage_img = document.createElement('img');
			courseImage_img.setAttribute('src',jsonObj[num].smallPhotoUrl);
			courseImage_img.setAttribute('width','50px');
			courseImage_img.setAttribute('height','50px');
			courseImage_div.appendChild(courseImage_img);
			/* 课程名 */
			var courseIntroduce_div = document.createElement('div');
			var courseIntroduce_h3 = document.createElement('h3');
			courseIntroduce_h3.innerHTML = jsonObj[num].name;
			courseIntroduce_div.appendChild(courseIntroduce_h3);
			/* 课程介绍 */
			var courseIntroduce_div1 = document.createElement('div');
			var courseIntroduce_img = document.createElement('img');
			courseIntroduce_img.setAttribute('src','static/image/people-count.png');
			courseIntroduce_div1.appendChild(courseIntroduce_img);
			var courseIntroduce_span = document.createElement('span');
			courseIntroduce_span.innerHTML = jsonObj[num].learnerCount;
			courseIntroduce_div1.appendChild(courseIntroduce_span);
			courseIntroduce_div.appendChild(courseIntroduce_div1);
			/* 将新建节点追加到对应父节点中 */
			course_li.appendChild(courseImage_div);
			course_li.appendChild(courseIntroduce_div);
			course_ul.appendChild(course_li);
		}
		/* 动态更新课程 */
		function change(){
			course_ul.removeChild(course_li[1]);
			addCourses(current);
			if(current == 19){
				current = 1;
			}else{
				current++;
			}
		}
		setInterval(change,5000);
	}
})();

/* 机构介绍 -- 视频介绍 */
(function(){
	/* 给图片绑定弹窗 */
	var video_div = getElementByClassName('div','video').getElementsByTagName('div')[0];
	var x_div = getElementByClassName('div','container').getElementsByTagName('div')[0];
	var video_video = document.getElementsByTagName('video')[0];
	addEvent(video_div,'click',onclick);
	addEvent(x_div,'click',onclick);
	/* 事件委托技术优化性能 */
	function onclick(ev){
		var event = ev || window.event;
		switch(event.currentTarget.className){
			case 'videoImg':
			getStyleSelector('.g-mask').style.display = 'block';
			break;
			/* 点击x号关闭弹窗 */
			case 'xImg':
			getStyleSelector('.g-mask').style.display = 'none';
			video_video.load();
			break;
		}
	}
})();

/* 点击关注 */
(function(){
	var noattention_div = getElementByClassName('div','focus');
	addEvent(noattention_div,'click',onclick);
	/* 点击事件函数 */
	function onclick(){
		/* 判断登录cookie是否设置 */
		if(getCookie('loginSuc')){
			getStyleSelector('.m-head .focus').style.display = 'none';
			getStyleSelector('.m-head .attention').style.display = 'block';
		}else{
			getStyleSelector('.g-mask1').style.display = 'block';
		}
	}
})();

/* 登录弹窗 */
(function(){
	var userName = document.getElementsByTagName('input')[0];
	var password = document.getElementsByTagName('input')[1];
	var mask_label = document.getElementsByTagName('label')[0];
	addEvent(userName,'blur',onblur);
	addEvent(password,'blur',onblur);
	addEvent(userName,'focus',onfocus);
	addEvent(password,'focus',onfocus);
	/* 采用事件委托技术提升性能 */
	function onblur(ev){
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
	function onfocus(ev){
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
	/* 给登录按钮绑定ajax */
	var submit_div = getElementByClassName('div','submit');
	var login_div = getElementByClassName('div','g-mask1');
	var noattention_div = getElementByClassName('div','focus');
	var attention_div = getElementByClassName('div','attention');
	addEvent(submit_div,'click',onclick);
	function onclick(){
		ajax('get','http://study.163.com/webDev/login.htm?userName=' + hex_md5(userName.value) + '&password=' + hex_md5(password.value),fn);
		function fn(data){
			if (data == 1) {
				/* 登录成功后调用关注API设置cookie */
				setCookie('loginSuc','true',30);
				ajax('get','http://study.163.com/webDev/attention.htm',setAttention);
				function setAttention(){
					setCookie('followSuc','true',30);
					getStyleSelector('.g-mask1').style.display = 'none';
					getStyleSelector('.m-head .focus').style.display = 'none';
					getStyleSelector('.m-head .attention').style.display = 'block';
				}	
			}else{
				alert('账号/密码错误');
				userName.value = '';
				password.value = '';
				userName.focus();
			}
		}
	}
})();

/* 检测登录cookie和关注cookie是否同时存在 */
(function(){
	if(getCookie('loginSuc') && getCookie('followSuc')){
		getStyleSelector('.m-head .focus').style.display = 'none';
		getStyleSelector('.m-head .attention').style.display = 'block';
	}
})();

