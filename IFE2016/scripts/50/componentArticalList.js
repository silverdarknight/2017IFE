function objectIsNull(obj){
	var isNull = true;
	for(var i in obj) isNull = false;
	return isNull;
}
var componentArticalList = function(cfg){
	var self = this;
	this.req = cfg;
	this.El = '';
	this.modelCfgOne = {'title':'提示','main':'确认要删除此问卷？'};
	this.modelCfgAll = {'title':'提示','main':'确认要删除全部问卷？'};
	this.createEl = function(){
		if(objectIsNull(this.req)){
			var articalList = $('<div class="articalList">'+
				'<div class="newArtical"><button class="createNewArtical">+新建问卷</button></div>'+
			'</div>');
		}
		else{
			var articalList = $('<div class="articalList"></div>');
			var articalTitle = $('<div class="articalList_title">'+
				'<span class="articalList_radioArea">'+
				'</span><span class="articalList_titleArea">标题</span>'+
				'<span class="articalList_timeArea">时间</span>'+
				'<span class="articalList_stateArea">状态</span>'+
				'<span class="articalList_actionArea">操作</span>'+
			'</div>');
			var articalTitle_btn = $('<button class="createNewArtical">+新建问卷</button>');
			articalTitle.append(articalTitle_btn);

			var article_ul = $('<ul></ul>'),j=0;
			for(var i in this.req){
				var artical_ul_li = $('<li class="artical_ul_li">'+
					'<div class="articalList_radioArea"><input type="radio" name="targetArtical" /></div>'+
					'<div class="articalList_titleArea">'+this.req[i]['title']+'</div>'+
					'<div class="articalList_timeArea"><span>'+this.req[i]['stopTime']+'</span></div>'+
				'</li>');
				artical_ul_li.attr('data-id',j++);
				var artical_ul_li_state = $('<div class="articalList_stateArea"></div>');
				var artical_ul_li_state_class=$('<span class="state"></span>');
				var artical_ul_li_btns = $('<div class="changeBtns">'+
					'<button class="editBtn">编辑</button>'+
					'<button class="delBtn">删除</button>'+
				'</div>');
				var artical_ul_li_btns_showBtn = $('<button></button>');
				if(this.req[i]['state'] == 'inLine') {
					artical_ul_li_state_class.addClass('inLine')
						.text('发布中');
					artical_ul_li_btns_showBtn.addClass('showData')
						.text('查看数据');
				}
				else if(this.req[i]['state'] == 'finish'){
					artical_ul_li_state_class.addClass('finish')
						.text('已结束');
					artical_ul_li_btns_showBtn.addClass('showData')
						.text('查看数据');
				}
				else{
					artical_ul_li_state_class.addClass('outLine')
						.text('未发布');
					artical_ul_li_btns_showBtn.addClass('showAnswers')
						.text('查看问卷');
				}
				artical_ul_li_btns.append(artical_ul_li_btns_showBtn);
				artical_ul_li_state.append(artical_ul_li_state_class);
				artical_ul_li.append(artical_ul_li_state)
					.append(artical_ul_li_btns);
				article_ul.append(artical_ul_li);
			}
			var artical_delAllArea = $('<div class="delAllArea">'+
					'<div class="articalList_radioArea"><input type="radio" name="selectAll" class="delAllRadio" /></div><label>全选</label>'+
					'<button class="delAllBtn">删除</button>'+
				'</div>');
			articalList.append(articalTitle)
				.append(article_ul)
				.append(artical_delAllArea);
		}
		this.El = articalList;
	}

	this.bindEvent = function(){
		this.El.find('li').on('click',function(e){
			$(this).find('.articalList_radioArea>input').attr('checked',true);
			$(this).find('.changeBtns>button').addClass('choseBtn');
			$(this).siblings().find('.changeBtns>button').removeClass('choseBtn');
		});
		this.El.find('.delBtn').on('click',function(e){
			function render(){
				//console.log(self);
				self.req.splice(delId,1);
				self.init(self.req);
				$('.container').html('')
					.append(self.El);
			}
			var newModel = new componentModel(self.modelCfgOne,render);
			if($(this).hasClass('choseBtn')){
				var delId = $(this).parent().parent()[0].dataset.id;
				newModel.show($('body'));
				//render();
				e.stopPropagation();
			}
		});
		this.El.find('.delAllBtn').on('click',function(e){
			function render(){
				//console.log(self);
				self.req = [];
				self.init(self.req);
				$('.container .articalList').replaceWith(self.El);
			}
			
			var newModel = new componentModel(self.modelCfgAll,render);
			if($('.articalList_radioArea>.delAllRadio')[0]['checked']) {
				newModel.show($('body'));
				//render();
				e.stopPropagation();
			}
		});
		this.El.find('.createNewArtical').on('click',function(e){
			var questionPage = new componentCreateNewArtical();
			questionPage.show($('.container'));
		});
		this.El.find('.editBtn').on('click',function(e){
			if($(this).hasClass('choseBtn')){
				var articalId = e.target.parentNode.parentNode.dataset.id;
				var questionPage = new componentCreateNewArtical(self.req[articalId],articalId);
				questionPage.show($('.container'));
			}
		});
		this.El.find('.showData').on('click',function(e){
			if($(this).hasClass('choseBtn')){
				var queId = e.target.parentNode.parentNode.dataset['id'];
				window.showData.render(self.req[queId]);
			}
		});
	}
	this.show = function(el){
		el.html('');
		this.init();
		el.append(this.El);
		this.El.css('opacity','0');
		this.El.animate({'opacity':'1'}, 'fast');
	}
	this.del = function(el){
		this.El.animate({'opacity':'0'}, 'fast',function(){
			$('.articalList').remove();
		});
	}
	this.init = function(){
		this.createEl();
		this.bindEvent();
	}

	this.init();
}