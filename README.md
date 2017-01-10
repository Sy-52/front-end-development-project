# 网易web前端开发实践
## 1 文档规范
1、待做标注为 `//TODO`<br/>
2、已做标注为`//DONE`
## 2 前言
前端开发实践项目是网易前端微专业的结业项目。在给出交互稿、视觉稿、后端接口的前提下，要求你实现前端页面。<br/>
这里插句题外话，简单说说上前端微专业的感受：<br/>
网易的前端微专业软硬适中，用来前端入门很合适。其'页面架构基础'部分(html、css、布局法)，由浅入深且伴有网易云音乐开发的实例，很好食用，但'页面逻辑开发'部分(js、前端工程化)则很难啃。像原型链、闭包这些较深的js概念，讲师讲的快但又说不清楚（和《高级程序设计》上说法不一）；而库、框架、git、模块化这块对初学者来说太超前了一些，很难吸收。<br/>
后面听说前端微专业调低了'页面逻辑开发'这部分的难度，不知道怎么样。<br/>
最后一点，给恰好看到这篇文章且正在或准备上前端微专业的同学一个小小建议：不要相信所谓的"有了微专业优秀证书就可以直通名企"。微专业只是你用来打基础用的，最后去名企还是要靠你自己平时在前端这条路上不断的努力和积累。<br/>
so，加油，祝好。<br/>
## 3 使用
--> 下载本项目<br/>
--> 将本项目放置在WAMP的服务器根目录中<br/>
--> 在浏览器中键入'127.0.0.1/front-end-development-project/index.html'，打开即可<br/>
--> 项目界面如下图：<br/>
![screenshoots](screenshoots.jpg)
## 4 技术选型
HTML + CSS + Javascript + FIS3 + underscore.js<br/>
由于题目要求不允许用任何的JS框架，当时犹豫了一下，抱着打基础的心态用了原生JS...记得项目中有个部分涉及到了大剂量的节点操作，因为那时不是很清楚框架和库的区别，老实的用appendChild()、createElment()方法去循环追加节点，结果差点没给我干出腱鞘炎。<br/>
这里使用underscore.js工具库主要是为了用其前端模板函数\_.template()去简化大剂量的节点插入操作，使用这种方式在导入节点时只用将接口数据处理后渲染到页面即可，十分方便。<br/>
选用FIS3的目的是想对项目做做优化，现在看来自己当时也是naive，在网易的项目中用百度的构建工具简直做大死。<br/>
由于FIS3在[loveFish](https://github.com/Sy-52/LoveFish)中提过，这里就不多做赘述了。

