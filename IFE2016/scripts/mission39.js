var componentTable = function(n , dataList){
	this.El = '';
	this.data = [];
	this.cfg = dataList;

	var offsetTop,offsetLeft;
	function getIndexFromList(n , list){
		for(var i=0;i<list.length;i++){
			if(n == list[i]) return i;
		}
		return false;
	}
	function sortClick(e){
		if(e.target.className == 'bot'){
			var name = e.target.parentNode.previousSibling.innerText;
			this.getSortData('bot',name);
		}
		else if(e.target.className == 'top'){
			var name = e.target.parentNode.previousSibling.innerText;
			this.getSortData('top',name);
		}
	}
	var sortNTop = function(a,b){
		//console.log(a);
		return b[index] - a[index];
	}
	var sortNBot = function(a,b){
		//console.log(a);
		return a[index] - b[index];
	}
	//初始化
	this.init = function(){
		var h = '',i=0,self = this;
		var tableDiv = document.createElement('table');
		var trEl = document.createElement('tr');
		h+='<th><div class="th_contain"><span>'+this.cfg[0]+'</span></div></th>';
		for(i=1;i<this.cfg.length;i++){
			h+='<th><div class="th_contain"><span>'+this.cfg[i]+'</span><div class="thDiv"><span class="top"></span><span class="bot"></span></div></div></th>';
		}
		trEl.innerHTML = h;
		tableDiv.appendChild(trEl);
		tableDiv.addEventListener('click', function(e){
			sortClick.call(self,e);
		}, false);
		this.El = tableDiv;
		document.getElementsByClassName('container')[0].innerHTML = '';
		document.getElementsByClassName('container')[0].appendChild(this.El);
		offsetTop = $('table>tr:first-child').offset().top;
		offsetLeft = $('table>tr:first-child').offset().left;
		this.bindEvent();
	}
	//通过this.data渲染
	this.render = function(){
		var i=0;
		this.init();
		for(;i<this.data.length;i++){
			var h='',trEl = document.createElement('tr');
			for(var j=0;j<this.data[i].length;j++){
				h+='<td>'+this.data[i][j]+'</td>';
			}
			trEl.innerHTML = h;
			this.El.appendChild(trEl);
		}
		//console.log(newTable.El);
		document.getElementsByClassName('container')[0].innerHTML = '';
		document.getElementsByClassName('container')[0].appendChild(this.El);
		this.bindEvent();
	}
	//添加+render
	this.addData = function(d){
		var h='',trEl = document.createElement('tr');
		this.data.push(d);
		for(var i=0;i<d.length;i++){
			h+='<td>'+d[i]+'</td>';
		}
		trEl.innerHTML = h;
		this.El.appendChild(trEl);
	}
	//删除+render
	this.delData = function(name){
		for(var i=0;i<this.data.length;i++){
			if(this.data[i][0] == name) this.data.splice(i,1);
		}
		this.render();
	}
	//排序
	this.getSortData = function(type , name){
		index = getIndexFromList(name,this.cfg);
		if(type == 'top'){
			this.data.sort(sortNTop);
			this.render();
		}
		else if(type == 'bot'){
			this.data.sort(sortNBot);
			this.render();
		}
		index = 0;
	}
	this.bindEvent = function(){
		$(window).on('scroll',function(){
			var scrollTop = $(window).scrollTop();
			var Elheight = $('table>tr:first-child').height();
			var tableHeight = $('table').height();
			//console.log(scrollTop,offsetTop,Elheight);
			if((scrollTop>=offsetTop)&&(scrollTop<offsetTop+tableHeight)) $('table>tr:first-child').css({
				'position': 'fixed',
				'top': '0px',
				'left':offsetLeft+'px'
			});
			else $('table>tr:first-child').css({
				'position': 'absolute',
				'top': '0px',
				'left':'0px'
			});
		});
	}

	this.init();
}
var index=0;//sort调用函数的参数
var newTable = new componentTable(5,['姓名','语文','数学','英语','总分']);
document.getElementsByClassName('container')[0].appendChild(newTable.El);
newTable.addData(['小敏',80,90,70,80+90+70]);
newTable.addData(['小王',30,60,40,30+60+50]);
newTable.addData(['小wang',10,100,20,100+10+20]);
newTable.addData(['小敏',80,90,70,80+90+70]);
newTable.addData(['小王',30,60,40,30+60+50]);
newTable.addData(['小wang',10,100,20,100+10+20]);
newTable.addData(['小敏',80,90,70,80+90+70]);
newTable.addData(['小王',30,60,40,30+60+50]);
newTable.addData(['小wang',10,100,20,100+10+20]);
newTable.addData(['小敏',80,90,70,80+90+70]);
newTable.addData(['小王',30,60,40,30+60+50]);
newTable.addData(['小wang',10,100,20,100+10+20]);
newTable.addData(['小敏',80,90,70,80+90+70]);
newTable.addData(['小王',30,60,40,30+60+50]);
newTable.addData(['小wang',10,100,20,100+10+20]);
newTable.addData(['小敏',80,90,70,80+90+70]);
newTable.addData(['小王',30,60,40,30+60+50]);
newTable.addData(['小wang',10,100,20,100+10+20]);
newTable.addData(['小敏',80,90,70,80+90+70]);
newTable.addData(['小王',30,60,40,30+60+50]);
newTable.addData(['小wang',10,100,20,100+10+20]);
newTable.addData(['小敏',80,90,70,80+90+70]);
newTable.addData(['小王',30,60,40,30+60+50]);
newTable.addData(['小wang',10,100,20,100+10+20]);
newTable.addData(['小敏',80,90,70,80+90+70]);
newTable.addData(['小王',30,60,40,30+60+50]);
newTable.addData(['小wang',10,100,20,100+10+20]);
newTable.addData(['小敏',80,90,70,80+90+70]);
newTable.addData(['小王',30,60,40,30+60+50]);
newTable.addData(['小wang',10,100,20,100+10+20]);
newTable.addData(['小敏',80,90,70,80+90+70]);
newTable.addData(['小王',30,60,40,30+60+50]);
newTable.addData(['小wang',10,100,20,100+10+20]);
newTable.addData(['小敏',80,90,70,80+90+70]);
newTable.addData(['小王',30,60,40,30+60+50]);
newTable.addData(['小wang',10,100,20,100+10+20]);
newTable.getSortData('bot','数学');
newTable.delData('小wang');