//启用fis-spriter-csssprites插件
fis.match('::package',{
	spriter:fis.plugin('csssprites')
})

fis.match('*.css',{
	//给匹配到的文件分配属性'useSprite'
	useSprite:true
});

fis.match('*.js',{
	//fis-optimizer-uglify-js插件进行压缩
	optimizer:fis.plugin('uglify-js')
});

fis.match('*.css',{
	//fis-optimizer-clean-css插件进行压缩
	optimizer:fis.plugin('clean-css')
});

fis.match('*.png',{
	//fis-optimizer-png-compressor插件进行压缩
	optimizer:fis.plugin('png-compressor')
});


