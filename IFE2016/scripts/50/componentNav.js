var componentNav = function(){
	this.El = '';
	this.createEl = function(){
		var nav = $('<div class="nav"></div>');
		nav.css({
			'position':'fixed',
			'top':'0px',
			'left':'0px',
			'width': '100%',
			'height':'50px',
			'padding-left': '5%',
			'display': 'flex',
			'flex-direction':'row',
			'justify-content':'flex-start',
			'align-items':'center',
			'color':'white',
			'background-color': '#FF8C00'
		});
		var navLogoEl = $('<div class="navLogo"></div>');
		var navLogo = $('<span class="Logo"></span>');
		var navLogoTitle = $('<span><strong>问卷管理</strong></span>');
		navLogoEl.append(navLogo)
			.append(navLogoTitle)
			.css({
				'font-size': '20px',
				'display': 'flex',
				'flex-direction':'row',
				'justify-content':'flex-start',
				'align-items':'center'
			});
		navLogo.css({
			'display': 'inline-block',
			'width': '25px',
			'height': '25px',
			'background': 'url("../img/mission50/Logo.png")',
			'background-size': '100% 100%',
			'background-repeat': 'no-repeat'
		});
		var navMyArticals = $('<button class="nav_myArticals">我的问卷</button>');
		navMyArticals.css({
			'border':'none',
			'outline': 'none',
			'background-color': 'rgba(0,0,0,0)',
			'color':'white',
			'cursor': 'pointer',
			'margin-left': '80px'
		});
		nav.append(navLogoEl)
			.append(navMyArticals);
		this.El = nav;
	}
	this.appendToEl = function(el){
		el.append(this.El);
	}
	this.bindEvent = function(){
		
		$('.container').append(artical.El);
		this.El.find('.nav_myArticals').on('click',function(e){
			artical.init();
			if($('.container>.articalList').length) {
				$('.container').html('');
				$('.container').append(artical.El)
				//$('.container>.articalList').replaceWith(artical.El);
			}
			else {
				$('.container').html('');
				$('.container').append(artical.El);
				console.log('no',artical.El[0]);
			}
		}.bind(this));
	}
	this.init = function(){
		this.createEl();
		this.bindEvent();
	}
	this.init();
}