var componentCalenderWithInput = function(el,date){
	this.currentYear = '';
	this.currentMonth = '';
	this.currentDay = '';

	var dateIn = date.split('/');
	this.targetYear = dateIn[0];
	this.targetMonth = dateIn[1]-1;
	this.targetDay = dateIn[2];
	this.endYear= dateIn[0];
	this.endMonth = dateIn[1]-1;
	this.endDay = dateIn[1];
	this.El = '';

	function getMonthDayNum(year,month,day){
		var d = new Date(year,month+1,day);
		d.setDate(0);
		return d.getDate();
	}
	function getCurrentFirstDay(year,month,day){//周一得到1，周日得到0
		var d = new Date(year,month,day);
		d.setDate(1);
		return (d.getUTCDay()+1)%7;
	}
	function getMonthArray(year,month,day){
		//通过年月日得到当前月的天数,1号的星期号,得到一个数组
		var d = new Date(year,month,day),ans = [],a = [];
		var dayNum = getMonthDayNum(year,month,day);
		var firstDayNum = getCurrentFirstDay(year,month,day);
		
		d.setDate(1-firstDayNum);
		var arrayFirstDay = d.getDate();
		for(var i=0;i<firstDayNum;i++){
			ans.push(arrayFirstDay+i);
		}
		for(i=0;i<dayNum;i++){
			ans.push(i+1);
		}
		for(i=0;i<42-dayNum-firstDayNum;i++){
			ans.push(i+1);
		}
		for(i=0;i<6;i++){
			a.push(ans.splice(0,7));
		}
		return a;
	}

	this.setTargetDate = function(year,month,day){
		this.targetYear = year;
		this.targetMonth = month;
		this.targetDay = day;
	}
	this.getCurrentDate = function(){
		var d = new Date();
		this.currentYear = d.getFullYear();
		this.currentMonth = d.getMonth();
		this.currentDay = d.getDate();
		//this.targetYear = this.currentYear;
		//this.targetMonth = this.currentMonth;
		//this.targetDay = this.currentDay;
	}
	this.createEl = function(year,month,day){
		var monthArr = getMonthArray(year,month,day);
		//添加El
		var el = $('<div class="calenderArea">'+
			'<input type="text" name="stopTime" class="calenderWithInput" />'+
			'</div>');
		var calender = $('<div class="calender"></div>');calender.css('opacity',"0");
		el.append(calender);
		var calenderTitle = $('<div class="calender_title"></div>');
		var calenderMain = $('<div class="calender_main"></div>');
		calender.append(calenderTitle)
			.append(calenderMain);
		var calenderTitleDetail = $('<div class="calender_title_detail">'+
										'<span class="calender_prev"></span>'+
										'<span class="calender_title_main">'+this.targetYear+'/'+(this.targetMonth+1)+'</span>'+
										'<span class="calender_next"></span>'+
									'</div>');
		var calenderTitleDate = $('<div class="calender_title_date">'+
										'<span class="calender_title_date_day">Mon</span>'+
										'<span class="calender_title_date_day">Tue</span>'+
										'<span class="calender_title_date_day">Wen</span>'+
										'<span class="calender_title_date_day">Thu</span>'+
										'<span class="calender_title_date_day">Fri</span>'+
										'<span class="calender_title_date_day">Sat</span>'+
										'<span class="calender_title_date_day">Sun</span>'+
									'</div>');
		calenderTitle.append(calenderTitleDetail)
			.append(calenderTitleDate);
		var calenderMainUl = $('<ul></ul>');
		for(var i=0;i<6;i++){
			var li = $('<li></li>'),j=0,h='';
			for(;j<7;j++){
				if(i==0&&monthArr[i][j]>7){
					h+='<span class="calender_main_date calender_date_no">'+monthArr[i][j]+'</span>';
				}
				else if(i>=4&&monthArr[i][j]<=14){
					h+='<span class="calender_main_date calender_date_no">'+monthArr[i][j]+'</span>';
				}
				else {
					if(this.currentDay == monthArr[i][j]&&this.currentMonth == this.targetMonth&&this.currentYear == this.targetYear) 
						h+='<span class="calender_main_date calender_currentDay">'+monthArr[i][j]+'</span>';
					else if(this.endDay == monthArr[i][j]&&this.endMonth == this.targetMonth&&this.endYear == this.targetYear)
						h+='<span class="calender_main_date calender_endDay">'+monthArr[i][j]+'</span>';
					else h+= '<span class="calender_main_date">'+monthArr[i][j]+'</span>';
				}
			}
			li.html(h);
			calenderMainUl.append(li);
		}
		calenderMain.append(calenderMainUl);
		el.find('input').val(this.targetYear+'/'+(this.targetMonth+1)+'/'+this.targetDay);
		this.El = el;
	}
	this.bindEvent = function(){
		this.El.find('.calenderWithInput').focus(function(event) {
			this.El.find('.calender').animate({'opacity':1}, 'fast');
		}.bind(this));
		this.El.find('.calender_prev').on('click',function(e){
			this.targetMonth--;
			if(this.targetMonth<0) {
				this.targetYear--;
				this.targetMonth = 11;
			}
			this.render(this.targetYear,this.targetMonth,this.targetDay);
		}.bind(this));
		this.El.find('.calender_next').on('click',function(e){
			this.targetMonth++;
			if(this.targetMonth>11) {
				this.targetYear++;
				this.targetMonth = 0;
			}
			this.render(this.targetYear,this.targetMonth,this.targetDay);
		}.bind(this));
		this.El.find('.calender_main_date').on('click',function(e){
			if(!$(e.target).hasClass('calender_date_no')){
				this.targetDay = e.target.innerText;
				this.endDay = e.target.innerText;
				this.endMonth = this.targetMonth;
				this.endYear = this.targetYear;
				this.El.find('.calenderWithInput').val(this.targetYear+'/'+(this.targetMonth+1)+'/'+this.targetDay);
				this.render(this.targetYear,this.targetMonth,this.targetDay);
				calenderHide.call(this);
			}
		}.bind(this));
	}
	function calenderHide(){
		this.El.find('.calender').animate({'opacity':0}, 'fast');
	}
	this.show = function(el){
		if(el.find('.calenderArea').length) el.find('.calenderArea').replaceWith(this.El);
		else el.append(this.El);
	}
	this.del = function(el){
		el.find('.calenderArea').remove();
	}
	this.render = function(year,month,day){
		this.setTargetDate(year,month,day);
		this.createEl(this.targetYear,this.targetMonth,this.targetDay);
		this.bindEvent();
		this.show($('.stopTime'));
		this.El.find('.calender').css('opacity','1');
	}
	this.init = function(){
		this.getCurrentDate();
		this.createEl(this.targetYear,this.targetMonth,this.targetDay);
		this.bindEvent();
		this.show(el);
	}
	this.init();
}