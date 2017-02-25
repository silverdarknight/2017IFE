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
function getFirstPageData(keyWord){
	var t = Date.now();
		targetUrl = 'https://www.baidu.com/s?wd='+keyWord,
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
			page.render('BaiduSearch.png');
			var title = page.evaluate(function(){
				return document.title;
			});
			var ansListNum = page.evaluate(function(){
				return document.getElementsByClassName('result').length;
			});
			console.log(ansListNum);
			for(var i=0;i<ansListNum;i++){
				var data = {
					'title':'',
					'info':'',
					'link':'',
					'pic':''
				};
				data.title = page.evaluate(function(i){
					return document.getElementsByClassName('result')[i].childNodes[0].childNodes[0].innerText;
				},i);
				data.link = page.evaluate(function(i){
					return document.getElementsByClassName('result')[i].childNodes[0].childNodes[0].getAttribute('href');
				},i);
				data.info = page.evaluate(function(i){
					return document.getElementsByClassName('result')[i].getElementsByClassName('c-abstract')[0].innerText;
				},i);
				data.pic = page.evaluate(function(i){
					return document.getElementsByClassName('result')[i].getElementsByClassName('c-abstract')[0].parentNode.previousSibling.childNodes[0].childNodes[0].getAttribute('src');
				},i);
				ans.dataList.push(data);
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
}
getFirstPageData('bilibili');