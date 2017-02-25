var questionItem = function(cfg,i){
	if(cfg['type'] == 'single'){
		var li = $('<li data-id="'+i+'">'+
						'<div class="newArtical_questionList_title">'+
							'<span>Q'+i+'</span>'+
							'<span>'+cfg['questionTitle']+'</span>'+
						'</div>'+
						'<div class="newArtical_questionList_ansList">'+
						'</div>'+
						'<div class="newArtical_questionList_footer">'+
							'<button class="newArtical_questionList_footer_moveTop">上移</button>'+
							'<button class="newArtical_questionList_footer_moveBot">下移</button>'+
							'<button class="newArtical_questionList_footer_moveDel">删除</button>'+
						'</div>'+
					'</li>');
		for(var j=0;j<cfg['choses'].length;j++){

			var choice = $('<div class="newArtical_questionList_ansList_input">'+
								'<input type="radio" name="question'+(i+1)+'">'+
								'<span>'+cfg['choses'][j]+'</span>'+
							'</div>');
			li.find('.newArtical_questionList_ansList').append(choice);
		}
		return li
	}
	else if(cfg['type'] == 'many'){
		var li = $('<li data-id="'+i+'">'+
						'<div class="newArtical_questionList_title">'+
							'<span>Q'+i+'</span>'+
							'<span>'+cfg['questionTitle']+'</span>'+
						'</div>'+
						'<div class="newArtical_questionList_ansList">'+
						'</div>'+
						'<div class="newArtical_questionList_footer">'+
							'<button class="newArtical_questionList_footer_moveTop">上移</button>'+
							'<button class="newArtical_questionList_footer_moveBot">下移</button>'+
							'<button class="newArtical_questionList_footer_moveDel">删除</button>'+
						'</div>'+
					'</li>');
		for(var j=0;j<cfg['choses'].length;j++){
			var choice = $('<div class="newArtical_questionList_ansList_input">'+
								'<input type="checkbox" name="question'+i+'">'+
								'<span>'+cfg['choses'][j]+'</span>'+
							'</div>');
			li.find('.newArtical_questionList_ansList').append(choice);
		}
		return li;
	}
	else{
		var li = $('<li data-id="'+i+'">'+
						'<div class="newArtical_questionList_title">'+
							'<span>Q'+i+'</span>'+
							'<span>'+cfg['questionTitle']+'</span>'+
							'<span class="newArtical_questionList_title_must"><input name=question'+i+
							' type="checkbox" '+(cfg['must']?'checked="checked"':'')+'>此题是否必填</span>'+
						'</div>'+
						'<div class="newArtical_questionList_ansList">'+
							'<div class="newArtical_questionList_ansList_input">'+
								'<textarea name="question3" id="" cols="60" rows="10"></textarea>'+
							'</div>'+
						'</div>'+
						'<div class="newArtical_questionList_footer">'+
							'<button class="newArtical_questionList_footer_moveTop">上移</button>'+
							'<button class="newArtical_questionList_footer_moveBot">下移</button>'+
							'<button class="newArtical_questionList_footer_moveDel">删除</button>'+
						'</div>'+
					'</li>');
		return li;
	}
}
var componentCreateNewArtical = function(cfg,index){
	this.El = '',self = this;
	this.cfg = cfg?cfg:{
		'title':'this is title',
		'state':'outLine',//inLine,finish,outLine
		'stopTime':'2017/1/1',
		'questions':[],
	};
	this.createEl = function(){
		var hr = $('<hr/>');
		var articals_contain = $('<div class="newArtical_contain" data-artid="'+index+'"></div>');
		var artical_title = $('<div class="newArtical_title"><span>'+this.cfg['title']+'</span></div>');
		var artical_questionList = $('<div class="newArtical_questionList"></div>');
		var artical_footer = $('<div class="newArtical_footer"></div>');
		articals_contain.append(artical_title)
			.append(hr)
			.append(artical_questionList)
			.append(hr)
			.append(artical_footer);
		var artical_questionList_ul = $('<ul></ul>');
		var addQuestionBtn = $('<div class="newArtical_questionList_addQuestion"><span>+添加问题</span></div>');
		artical_questionList.append(artical_questionList_ul)
			.append(addQuestionBtn);
		for(var i=0;i<this.cfg['questions'].length;i++){
			artical_questionList_ul.append(questionItem(this.cfg['questions'][i],i+1));
		}
		var articalFooterStopTime = $('<div class="stopTime"><span>问卷截止日期：</span></div>');
		var articalFooterBtns = $('<div class="newArtical_footer_btns">'+
						'<button class="newArtical_footer_btns_saveBtn">保存问卷</button>'+
						'<button class="newArtical_footer_btns_inLineBtn">发布问卷</button>'+
					'</div>');
		var calender = new componentCalenderWithInput(articalFooterStopTime,this.cfg['stopTime']);
		artical_footer.append(articalFooterStopTime)
			.append(articalFooterBtns);
		//console.log(articals_contain);
		this.El = articals_contain;
	}
	this.show = function(el){
		el.html('');
		el.append(this.El);
	}
	this.bindEvent = function(){
		this.El.find('.newArtical_title>span').on('click',function(e){
			var changeAnsTitle = $('<input type="text" name="changeAnswerTitle" />');
			changeAnsTitle.focusout(function(event) {
				var val = changeAnsTitle.val();console.log(this);
				self.cfg['title'] = val;
				$(event.target).replaceWith($('<div class="newArtical_title"><span>'+self.cfg['title']+'</span></div>'));
			});
			console.log($(this));
			$(this).replaceWith(changeAnsTitle);
		});
		this.El.find('.newArtical_questionList_addQuestion').on('click',function(e){
			var addWithBtns = $('<div class="newArtical_questionList_addQuestion">'+
				'<div class="newArtical_questionList_addQuestion_choseType">'+
					'<button class="newArtical_questionList_addQuestion_choseType_single">单选</button>'+
					'<button class="newArtical_questionList_addQuestion_choseType_many">多选</button>'+
					'<button class="newArtical_questionList_addQuestion_choseType_text">文本</button>'+
				'</div>'+
				'<span>+添加问题</span>'+
			'</div>');
			var addBtnArea = $('<div><input type="text"/></div>');
			var addBtn = $('<button class="add">添加</button>');
			addBtnArea.append(addBtn);

			function fakeData(len){
				var ans = [];
				for(var i=0;i<len;i++){
					ans.push(Math.round(Math.random()*100));
				}
				return ans;
			}
			function singleAndManyBtnEvent(self,type,event){
				//得到以空格做分隔符的几个参数 第一个是questions[title] 之后的是question[choses]
				var questionCfg = $('.newArtical_questionList_addQuestion_choseType>div>input').val().split(' ');
				var title = questionCfg.splice(0,1)[0];
				var questionList = questionCfg;
				//将title,type,questions存入this.cfg.questions
				self.cfg['questions'].push({'type':type,'questionTitle':title,'choses':questionList,'data':fakeData(questionList.length)});

				//var nodeLi = questionItem({'type':type,'questionTitle':title,'choses':questionList},self.cfg['questions'].length);
				//添加nodeLi到self.El.find('ul')
				//self.El.find('ul').append(nodeLi);
				self.render();
			}
			function textBtnEvent(self,type){
				var questionCfg = $('.newArtical_questionList_addQuestion_choseType>div>input').val().split(' ');
				var title = questionCfg.splice(0,1)[0];
				var must = false;
				//将title,type,questions存入this.cfg.questions
				self.cfg['questions'].push({'type':type,'questionTitle':title,'must':must});

				//var nodeLi = questionItem({'type':type,'questionTitle':title,'must':must},self.cfg['questions'].length);
				//self.El.find('ul').append(nodeLi);
				self.render();
			}

			$(this).replaceWith(addWithBtns);
			//单选 多选 文本三按钮event
			addWithBtns.find('.newArtical_questionList_addQuestion_choseType_single').on('click',function(e){
				var type = 'single';
				//添加input和btn
				if($('.newArtical_questionList_addQuestion_choseType>div').length) 
					{
						$('.newArtical_questionList_addQuestion_choseType>div').replaceWith(addBtnArea);
					}
				else $('.newArtical_questionList_addQuestion_choseType').append(addBtnArea);

				//给btn先删除绑定click再加event
				addBtn.off('click');
				addBtn.on('click',function(e){
					singleAndManyBtnEvent(this,type,e);
				}.bind(self));
			});
			addWithBtns.find('.newArtical_questionList_addQuestion_choseType_many').on('click',function(e){
				var type = 'many';
				//添加input和btn
				if($('.newArtical_questionList_addQuestion_choseType>div').length) 
					{
						$('.newArtical_questionList_addQuestion_choseType>div').replaceWith(addBtnArea);
					}
				else $('.newArtical_questionList_addQuestion_choseType').append(addBtnArea);

				//给btn先删除绑定click再加event
				addBtn.off('click');
				addBtn.on('click',function(e){
					singleAndManyBtnEvent(this,type,e);
				}.bind(self));
			});
			addWithBtns.find('.newArtical_questionList_addQuestion_choseType_text').on('click',function(e){
				var type = 'text';
				//添加input和btn
				if($('.newArtical_questionList_addQuestion_choseType>div').length) 
					{
						$('.newArtical_questionList_addQuestion_choseType>div').replaceWith(addBtnArea);
					}
				else $('.newArtical_questionList_addQuestion_choseType').append(addBtnArea);
				addBtn.off('click');
				addBtn.on('click',function(e){
					textBtnEvent(this,type);
				}.bind(self));
			});
		});
		//删除 上移 下移三按钮event
		this.El.find('.newArtical_questionList_footer_moveTop').on('click',function(e){
			var questionId = e.target.parentNode.parentNode.dataset.id;
			var questionNum = self.cfg['questions'].length;
			//上移
			if(questionId!=1){
				var delItem = self.cfg['questions'].splice(questionId-1,1);debugger;
				console.log(delItem);
				self.cfg['questions'].splice(questionId-2,0,delItem[0]);
				self.render();
			}
		});
		this.El.find('.newArtical_questionList_footer_moveBot').on('click',function(e){
			var questionId = e.target.parentNode.parentNode.dataset.id;
			var questionNum = self.cfg['questions'].length;
			if(questionId!=questionNum){
				var delItem = self.cfg['questions'].splice(questionId-1,1);
				console.log(delItem);
				self.cfg['questions'].splice(questionId,0,delItem[0]);
				self.render();
			}
		});
		this.El.find('.newArtical_questionList_footer_moveDel').on('click',function(e){
			var questionId = e.target.parentNode.parentNode.dataset.id;
			var questionNum = self.cfg['questions'].length;
			//删除
			console.log(self.cfg['questions']);
			self.cfg['questions'].splice(questionId-1,1);
			console.log(self.cfg['questions']);
			self.render();
		});
		//保存 发布
		this.El.find('.newArtical_footer_btns_saveBtn').on('click',function(e){
			self.cfg['stopTime'] = self.El.find('.calenderWithInput').val();
			if(self.El[0].dataset['artid'] == 'undefined') {
				window.artical.req.push(self.cfg);
			}
			else{
				window.artical.req[self.El[0].dataset['artid']] = self.cfg;
			}
			window.artical.show($('.container'));
		});
		this.El.find('.newArtical_footer_btns_inLineBtn').on('click',function(e){
			function render(){
				self.cfg['stopTime'] = self.El.find('.calenderWithInput').val();
				self.cfg['state'] = 'inLine';
				if(self.El[0].dataset['artid'] == 'undefined') {
					window.artical.req.push(self.cfg);
				}
				else{
					window.artical.req[self.El[0].dataset['artid']] = self.cfg;
				}
				window.artical.show($('.container'));
			}
			var modelCfgOne = {'title':'提示','main':'是否发布问卷？<br/>(此问卷截至时期为'+self.cfg['stopTime']+')'};
			var newModel = new componentModel(modelCfgOne,render);
			newModel.show($('body'));
				//render();
				e.stopPropagation();
		});
	}
	this.render = function(){
		$('.container').html('');
		this.createEl();
		this.bindEvent();
		$('.container').append(this.El);
	}
	this.init = function(){
		this.createEl();
		this.bindEvent();
	}
	this.init();
}