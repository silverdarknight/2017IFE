var componentModel = function(cfg , callback){
	this.cfg = cfg;
	this.El = '';
	this.createEl = function(){
		var model = $('<div class="model">'+
			'<div class="model_content">'+
				'<div class="model_content_title">'+this.cfg['title']+'</div>'+
				'<div class="model_content_main">'+this.cfg['main']+'</div>'+
				'<div class="model_content_YorN">'+
					'<button class="model_content_YorN_Y">确认</button>'+
					'<button class="model_content_YorN_N">取消</button>'+
				'</div>'+
			'</div>'+
		'</div>');
		this.El = model;
	}
	this.bindEvent = function(){
		this.El.find('.model_content_YorN_Y').on('click',function(e){
			callback();
			this.del($('body'));
		}.bind(this));
		this.El.find('.model_content_YorN_N').on('click',function(e){
			this.del($('body'));
		}.bind(this));
	}

	this.init = function(){
		this.createEl();
		this.bindEvent();
	}
	this.show = function(el){
		this.El.css('opacity','0');
		el.append(this.El);
		this.El.animate({'opacity':1}, 'fast');
	}
	this.del = function(el){
		this.El.animate({'opacity':0}, 'fast',function(){
			el.find('.model').remove();
		}.bind(this));
	}
	
	this.init();
}