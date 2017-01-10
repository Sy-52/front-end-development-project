(function(){
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
	/* 全局变量 -- 课程显示 */
	var tab_div = getElementByClassName('div','tab');
	var tabChild_div = tab_div.getElementsByTagName('div');
	var pageNumber_ol = document.getElementsByTagName('ol')[0];
	var type = 10;
	var courseNum = 20;
	var pageNum = 1;
	var tpBackups,tp1Backups;
	var course_ul = getElementByClassName('div','content').getElementsByTagName('ul')[0];
	var course_li = course_ul.getElementsByTagName('li');
	/* 全局变量 -- 机构介绍 */
	var video_video = document.getElementsByTagName('video')[0];
	/* 全局变量 -- 热门课程滚动 */
	var hotCourse_ul = getElementByClassName('ul','list');
	var hotCourse_li = hotCourse_ul.getElementsByTagName('li');
	var current = 11;

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

	/* 课程 */
	(function(){
		/* 请求服务器数据前先保存模板 */
		tpBackups = document.getElementById('tp').innerHTML;
		/* 检测浏览器窗口大小 */
		checkWindow();
		addEvent(window,'resize',onresize);	
		/* 给"产品设计"与"编程语言"按钮绑定点击事件 */
		for(i = 0;i < tabChild_div.length;i++){
			addEvent(tabChild_div[i],'click',clickTabChange);
		}
	})();

	/* 最热排行 */
	(function(){
		tp1Backups = document.getElementById('tp1').innerHTML;
		/* 热门课程数据获取 */
		ajax('GET','http://study.163.com/webDev/hotcouresByCategory.htm',callBack1);
	})();

	/* 机构介绍 -- 视频介绍 */
	(function(){
		/* 给图片绑定弹窗 */
		var video_div = getElementByClassName('div','video').getElementsByTagName('div')[0];
		var x_div = getElementByClassName('div','container').getElementsByTagName('div')[0];
		addEvent(video_div,'click',clickIntro);
		addEvent(x_div,'click',clickIntro);
	})();

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

	/* 浏览器窗口变化触发的事件函数 */
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

	/* 点击Tab切换函数 */
	function clickTabChange(){
		var currentPage;
		/* Tab切换前先清除前一个Tab上的class名 */
		for(i = 0;i < tabChild_div.length;i++){
			if(tabChild_div[i].className == 'selected'){
				tabChild_div[i].className = '';
			}
		}
		this.className = 'selected';
		/* 根据类型请求课程数据 */
		for(i = 0;i < tabChild_div.length;i++){
			if(tabChild_div[i].className == 'selected'){
				if(this.innerHTML == '编程语言'){
					type = 20;
				}else{
					type = 10;
				}
			}
		}
		ajax('GET','http://study.163.com/webDev/couresByCategory.htm?pageNo=' + pageNum + '&psize=' + courseNum + '&type='+ type,callBack);
	}

	/* 回调函数 1 */
	function callBack(jsonObj){
		var data = [];
		var i;
		var totlePageCount = '';
		/* 把从服务器取得的JSON数据变化为字符串 */
		responseObj = JSON.parse(jsonObj);
		/* 删除前面所选页的节点 */
		for(i = 0;i < responseObj.list.length;i++){
			if(course_li.length != 0){
				course_ul.removeChild(course_li[0]);
			}else{
				break;
			}
		}
		/* 利用underscore.js的_template函数创建课程节点 */
		for(i = 0 ; i< responseObj.list.length ; i++){
			data[i] = new Object();
			data[i].name = responseObj.list[i].name;
			data[i].bigPhotoUrl = responseObj.list[i].bigPhotoUrl;
			data[i].provider = responseObj.list[i].provider;
			data[i].learnerCount = responseObj.list[i].learnerCount;
			data[i].price = responseObj.list[i].price;
			data[i].categoryName = responseObj.list[i].categoryName;
			data[i].description = responseObj.list[i].description;
		}
		/* 进行模板的赋值 */
		var compiled = _.template(tpBackups);
		var str = compiled(data);
		course_ul.innerHTML = str;
		/* 给每门课程绑定事件，鼠标悬停到课程上方时触发 */
		for(i = 0;i < responseObj.list.length;i++){
			addEvent(course_li[i],'mouseenter',mouseEnterDisplay);
			addEvent(course_li[i],'mouseleave',mouseLeaveDisappear);
		}
		/* 检测服务器中能显示的页码数量并动态生成页码 */
		for(i = 0;i < responseObj.pagination.totlePageCount + 2;i++){
			switch(i){
				case 0:totlePageCount = totlePageCount + '<li></li>';break;
				case responseObj.pagination.totlePageCount + 1:totlePageCount = totlePageCount + '<li></li>';break;
				default:totlePageCount = totlePageCount + '<li>' + i + '</li>';
			}
		}	
		pageNumber_ol.innerHTML = totlePageCount;
		pageNumber_ol.getElementsByTagName('li')[pageNum].className = 'selected';

		/* 给页码绑定点击事件 */
		for(i = 1;i < pageNumber_ol.getElementsByTagName('li').length - 1;i++){
			addEvent(pageNumber_ol.getElementsByTagName('li')[i],'click',selectPageNumChange);
		}
	}

	/* 课程详情显示函数 */
	function mouseEnterDisplay(ev){
		var event = ev || window.event;
		for(var i = 0;i < ev.target.childNodes.length;i++){
			if(ev.target.childNodes[i].className == 'courseDetail disappear'){
				ev.target.childNodes[i].className = 'courseDetail';
			}
		}
	}

	/* 课程详情消失函数 */
	function mouseLeaveDisappear(ev){
		var event = ev || window.event;
		for(var i = 0;i < ev.target.childNodes.length;i++){
			if(ev.target.childNodes[i].className == 'courseDetail'){
				ev.target.childNodes[i].className = 'courseDetail disappear';
			}
		}		
	}

	/* 点击页码触发该事件 */
	function selectPageNumChange(){
		var that = this;
		getCourseData(that);
	}

	/* 点击页码获取对应页课程数据 */
	function getCourseData(self){
		var pageNumber_li = pageNumber_ol.getElementsByTagName('li');
		for(i = 0;i < pageNumber_li.length;i++){
			if(pageNumber_li[i].className == 'selected'){
				pageNumber_li[i].className = '';
			}
		}
		self.className = 'selected';
		for(i = 0;i < pageNumber_li.length;i++){
			if(pageNumber_li[i].className == 'selected'){
				pageNum = pageNumber_li[i].innerHTML;
				console.log(pageNum);
				ajax('GET','http://study.163.com/webDev/couresByCategory.htm?pageNo=' + pageNum + '&psize=' + courseNum + '&type='+ type,callBack);		
			}
		}
	}

	/* 点击结构介绍图片触发该事件 */
	function clickIntro(ev){
		var event = ev || window.event;
		switch(event.currentTarget.className){
			case 'videoImg':
			getElementByClassName('div','g-mask disappear').className = 'g-mask';
			break;
			/* 点击x号关闭弹窗 */
			case 'xImg':
			getElementByClassName('div','g-mask').className = 'g-mask  disappear';
			video_video.load();
			break;
		}
	}

	/* 回调函数 2 */
	function callBack1(jsonObj){
		var data = [];
		var inputArr = [];
		var compiled,str;
		jsonObj = JSON.parse(jsonObj);
		for(var i = 0;i < 20;i++){
			data[i] = new Object();
			data[i].name = jsonObj[i].name;
			data[i].smallPhotoUrl = jsonObj[i].smallPhotoUrl;
			data[i].learnerCount = jsonObj[i].learnerCount;
		}
		inputArr = data.slice(0,10);
		/* 新课程添加函数 */
		compiled = _.template(tp1Backups);
		str = compiled(inputArr);
		hotCourse_ul.innerHTML = str;
	    /* 热门课程滚动实现 */
	    setInterval(function(){
	    	inputArr.shift();
	    	inputArr.push(data[current]);
			/* 新课程添加函数 */
			if(current == 19){
				current = 1;
			}else{
				current++;
			}
			//将数组配凑好后渲染模板
			compiled = _.template(tp1Backups);
			str = compiled(inputArr);
			hotCourse_ul.innerHTML = str;
		},5000);
	}
})();