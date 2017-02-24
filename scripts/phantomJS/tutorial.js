/*
console.log('Hello,world!');
phantom.exit();
*/
//403forbiden
/*
var page = require('webpage').create();
page.open('http://img1.imgtn.bdimg.com/it/u=1138634959,2556588966&fm=23&gp=0.jpg',function(status){
	console.log('status:'+status);
	if(status == 'success'){
		page.render('example.png');
	}
	phantom.exit();
})
*/
/*
var page = require('webpage').create(),
	system = require('system'),
	t,address;
if(system.args.length == 1){
	console.log('Usage: loadspeed.js <some URL>');
	phantom.exit();
}

t = Date.now();
address = system.args[1];
page.open(address,function(status){
	if(status != 'success'){
		console.log('Fail to load the address');
	}else{
		t = Date.now() - t;
		console.log('loading'+system.args[1]);
		console.log('Loading'+t+'msec');
	}
	phantom.exit();
});
*/
/*
var page = require('webpage').create();
page.open('http://phantomjs.org/api/webpage/',function(status){
	var title = page.evaluate(function(){
		return document.title;
	});
	console.log('page Title Is:'+title);
	phantom.exit();
});
*/
var keyWord = '知乎',t = Date.now();
	targetUrl = 'https://www.baidu.com/s?wd='+keyWord+'&rsv_spt=1&rsv_iqid=0xb0defbd50000cc22&issp=1&f=8&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_sug3=5&rsv_sug1=4&rsv_sug7=100',
	page = require('webpage').create();
page.open(targetUrl,function(status){
	var ans = {
		code:1,
		msg:'抓取成功',
		word:keyWord,
		time:Date.now()-t,
		dataList:[]
	};
	if(status == 'success'){
		ans['time'] = Date.now() - t;
		var title = page.evaluate(function(){
			return document.title;
		});
		var ansList = page.evaluate(function(){
			return document.getElementById('content_left').getElementsByTagName('div');
		});
		for(var i=0;i<ansList.length;i++){
			console.log(JSON.stringify(ansList[i].querySelector('h3>a').innerText));
			/*
			var el = ansList[i],
				data = {
					'title':'',
					'info':'',
					'link':'',
					'pic':''
				};
			data['title'] = el.childNodes[0].childNodes[0].innerText;
			data['link'] = el.childNodes[0].childNodes[0].getAttribute('href');
			data['info'] = el.childNodes[1].childNodes[1].childNodes[0].innerText;
			data['pic'] = el.childNodes[1].childNodes[0].childNodes[0].childNodes[0].getAttribute('src');
			ans['dataList'].push(data);
			*/
		}
	}
	else{
		ans['code'] = 0;
		ans['msg'] = '抓取失败';
		ans['time'] = Date.now() - t;
	}
	console.log(JSON.stringify(ans));
	phantom.exit();
})