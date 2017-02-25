var componentShowData = function(){
	this.El = '';
	this.cfg = {
		'title':'my second article',
		'state':'finish',//inLine,finish,outLine
		'stopTime':'2017/1/1',
		'questions':[],
	};
	this.pieData = [];
	this.createPiePic = function(dataset,elSelector){
		var width = 104;  //画布的宽度
		var height = 104;   //画布的高度
		var svg = d3.select(elSelector)     //选择文档中的body元素
		    .append("svg")          //添加一个svg元素
		    .attr("width", width)       //设定宽度
		    .attr("height", height);
		var pie =  d3.layout.pie();
		var piedata = pie(dataset);
		var outerRadius = 52;
		var innerRadius = 0;
		var color = d3.scale.category10();
		var arc = d3.svg.arc()
			.innerRadius(innerRadius)
			.outerRadius(outerRadius);
		var arcs = svg.selectAll('g')
			.data(piedata)
			.enter()
			.append('g')
			.attr("transform","translate("+ (width/2) +","+ (width/2) +")");
		arcs.append("path")
		    .attr("fill",function(d,i){
		        return color(i);
		    })
		    .attr("d",function(d){
		        return arc(d);   //调用弧生成器，得到路径值
		    });
		
		arcs.append("text")
		    .attr("transform",function(d){
		        return "translate(" + arc.centroid(d) + ")";
		    })
		    .attr("text-anchor","middle")
		    .text(function(d){
		        return d.data;
		    });
	}
	this.createEl = function(){
		var queList = this.cfg['questions'];
		var hr = $('<hr />');
		var el = $('<div class="showData_content"></div>');
		var articalTitle = $('<div class="showData_title">'+
			'<div class="showData_title_backArea">'+
				'<span class="showData_title_backArea_back">&lt;</span>'+
				'<span class="showData_title_text">返回</span>'+
			'</div>'+
			'<div class="showData_title_detail">'+
				'<h3 class="showData_title_detail_title">'+this.cfg['title']+'</h3>'+
				'<p class="showData_title_detail_dicription">此统计只包含完整回收的数据</p>'+
			'</div>'+
		'</div>');
		var articalMain = $('<div class="showData_main"></div>');
		var articalBack = $('<div class="showData_back"><button class="showData_back_back">返回</button></div>');
		el.append(articalTitle)
			.append(articalMain)
			.append(articalBack);
		var articalMainUl = $('<ul></ul>');
		articalMain.append(articalMainUl);
		for(var i=0;i<queList.length;i++){
			var li = $('<li></li>');
			var dataChoseArea = $('<div class="showData_main_chosesArea">'+
				'<div class="showData_main_title">'+
					'<span class="showData_main_title_questionN">Q'+(i+1)+'</span>'+
					'<span class="showData_main_title_questionTitle">'+queList[i]['questionTitle']+'</span>'+
				'</div>'+
			'</div>');
			//分single,many,text情况
			//single
			if(queList[i]['type'] == 'single'){
				for(var j=0;j<queList[i]['choses'].length;j++){
					var p = $('<p>'+queList[i]['choses'][j]+'</p>');
					dataChoseArea.append(p);
				}
				var dataShowArea = $('<div class="showData_main_dataArea"><p class="showData_main_dataArea_title">数据占比(单选)</p></div>');
				for(j=0;j<queList[i]['data'].length;j++){
					var showDataBar = $('<div class="showData_bar"></div>');
					var showDataBarSpan = $('<span></span>');
					var dataAll = queList[i]['data'].reduce(function(acc,val){
						return acc+val;
					});
					showDataBarSpan.css('width',Math.round(100*queList[i]['data'][j]/dataAll)+'%');
					showDataBar.append(showDataBarSpan);
					dataShowArea.append(showDataBar);
				}
			}
			else if(queList[i]['type'] == 'many'){
				for(var j=0;j<queList[i]['choses'].length;j++){
					var p = $('<p>'+queList[i]['choses'][j]+'</p>');
					dataChoseArea.append(p);
				}
				var dataShowArea = $('<div class="showData_main_dataArea"><p class="showData_main_dataArea_title">数据占比(多选)</p></div>');
				var showDataBar = $('<div class="showData_pie" id="question'+(i+1)+'"></div>');
				dataShowArea.append(showDataBar);
				this.pieData.push([queList[i]['data'],'#question'+(i+1)]);
			}
			else{
				var dataShowArea = $('<div class="showData_main_dataArea"><p class="showData_main_dataArea_title">有效回答占比</p></div>');
				var showDataBar = $('<div class="showData_bar"></div>');
				var showDataBarSpan = $('<span></span>');
				showDataBarSpan.css('width',queList[i]['data']+'%');
				showDataBar.append(showDataBarSpan);
				dataShowArea.append(showDataBar);
			}
			li.append(dataChoseArea)
				.append(dataShowArea);
			articalMainUl.append(li);
		}
		this.El = el;
	}
	this.show = function(){
		$('.container').html('')
			.append(this.El);
		for(var i=0;i<this.pieData.length;i++){
			this.createPiePic(this.pieData[i][0],this.pieData[i][1]);
		}
		this.pieData = [];
	}
	this.render = function(mycfg){
		this.cfg = mycfg;
		this.createEl();
		this.bindEvent();
		this.show();
	}
	this.bindEvent = function(){
		this.El.find('.showData_title_backArea').on('click',function(e){
			window.artical.show($('.container'));
		});
		this.El.find('.showData_back_back').on('click',function(e){
			window.artical.show($('.container'));
		});
	}
	this.init = function(){
		this.createEl();
		this.bindEvent();
	}
	this.init();
}