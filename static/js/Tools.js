/* 事件绑定函数(兼容形式) */
function addEvent(ele,type,fn){
	if(window.addEventListener){
		ele.addEventListener(type,fn);
	}else if(window.attachEvent){
		ele.attachEvent('on'+type,fn);
	}else{
		ele['on'+type] = fn;
	}
}

/* 样式获取函数 */
function getStyle(ele,attr){
	if(window.getComputedStyle){
		return window.getComputedStyle(ele).getPropertyValue(attr);
	}else{
		return window.currentStyle(ele).getAttribute(attr);
	}
}

/* 
  cookie设置函数 -- setCookie()
  其实该函数并不完善，仅设置了cookie名、值、过期时间，对于cookie使用的路径、域名并没有提及
  toUTCString()返回dateObject的字符串表示，不过要先将本地时区变为格林尼治时区
 */
function setCookie(name,value,expiredays){
	var date = new Date();
	date.setTime(date.getTime()+ expiredays*60000);
	document.cookie = name + "=" + escape(value) + '; expires=' + date.toUTCString();
}

/* cookie检测函数 */
function getCookie(name){
	var start,end;
	if(document.cookie.length > 0){
		start = document.cookie.indexOf(name+'=');
		if(start != -1){
			start = start + name.length + 1;
			end = document.cookie.indexOf(';',start)
			if(end != -1)end = document.cookie.length;
			return unescape(document.cookie.substring(start,end));
		}else{
			return '';
		}
	}else{
		return '';
	}
}

/* Ajax */
function ajax(method,url,fn){
	var xhr;
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest();
	}else{
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	xhr.open(method,url);
	xhr.send(null);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			fn(xhr.responseText);
		}
	}
}

/* 根据类名获取DOM对象 */
function getElementByClassName(label,className){
	var arr = document.getElementsByTagName(label);
	for(var i = 0;i < arr.length;i++){
		if(arr[i].className == className){
			return arr[i];
			break;
		}
	}
}

/* 
  根据选择器名获取css样式表中指定的css规则
  经测试，IE8及以上、其余主流浏览器的CSSStyleSheet对象都同时有指向CSSStyleRule对象的cssRules与rules属性；
  所以此处取消以前写的莫名其妙的兼容。
 */
function getStyleSelector(selectorName){
	var cssRules = document.styleSheets[0].cssRules;
	for(var i = 0;i < cssRules.length;i++){
		if(selectorName == cssRules[i].selectorText){
			return cssRules[i];
			break;
		}
	}
}