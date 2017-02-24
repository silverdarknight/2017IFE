var containEl = $('.container');
var componentTime = function(){
	this.currentMonth = 0;
	this.currentYear = 0;
	this.currentDay = 0;
	this.targetYear = 0;
	this.targetMonth = 0;
	this.targetDay = 0;
	this.monthDays = [];
	this.El = '';
	self = this;
	this.cfgDate = function(year , month , day){
		this.currentYear = year;
		this.currentMonth = month;
		this.currentDay = day;
		this.targetYear = year;
		this.targetMonth = month;
		this.targetDay = day;
		this.getFullMonth(this.currentYear,this.currentMonth,this.currentDay);
		this.createComponent();
		this.appendToEl($('.container'));
	}
	this.getCurrentDate = function(){
		var currentDate = new Date();
		//console.log(currentDate);
		this.currentDay = currentDate.getDate();
		this.currentMonth = currentDate.getMonth()+1;
		this.currentYear = currentDate.getFullYear();
		this.targetYear = this.currentYear;
		this.targetMonth = this.currentMonth;
		this.targetDay = this.currentDay;
	}
	function getTargetMonthDayNum(year , month , date){
		var d = new Date(year,month,date);
		d.setDate(0);
		console.log(d.getDate());
		return d.getDate();
	}
	this.getFullMonth = function(year , month , date){
		console.log(year,month,date);
		var monthDayNum=0,monthDate = new Date(year , month-1 , date),dateWeek = [],monthStartWeekDay;
		var dateArray = [],ans = [];
		//得到本月天数
		monthDayNum = getTargetMonthDayNum(year,month,date);
		//得到第一天和最后一天的星期 ps:一为0，日为6
		monthDate = new Date(year , month-1 , date);
		monthDate.setDate(1);
		var firstDay = monthDate.getUTCDay();
		monthDate.setDate(monthDayNum);
		var lastDay = monthDate.getUTCDay();
		console.log(firstDay,lastDay);
		//得到7*6共42个数字代表日历的42个div
		monthDate.setDate(-firstDay);
		for(i=0;i<(firstDay+1)%7;i++){
			dateArray.push(monthDate.getDate()+i);
		}
		for(i=1;i<monthDayNum+1;i++){
			dateArray.push(i);
		}
		var l = dateArray.length;
		for(i=0;i<(42-l);i++){
			dateArray.push(i+1);
		}
		for(i=0;i<6;i++){
			ans.push(dateArray.slice(i*7, (i+1)*7));
		}
		this.monthDays = ans;
		return ans;
	}
	this.createComponent = function(){
		var AllDiv = $('<div></div>');
		var calenderDiv = $('<div class="calender"></div>');
		var calenderSelectDiv = $('<div class="calender_selectArea"><button></button></div>');
		var calenderInput = $('<input type="text"/>');
		calenderInput.val(this.targetYear+'/'+this.targetMonth+'/'+this.targetDay);
		calenderSelectDiv.append(calenderInput); 
		AllDiv.append(calenderSelectDiv);
		AllDiv.append(calenderDiv);
		var calenderTitleDiv = $('<div class="calender_title"></div>');
		var spanPrevMonth = $('<span class="prevMonth"></span>');
		var spanNextMonth = $('<span class="nextMonth"></span>');
		var spanTargetTitle = $('<span class="targetTitle"></span>');
		//titleDiv
		spanTargetTitle.text(this.targetYear+'/'+this.targetMonth+'/'+this.targetDay);
		calenderTitleDiv.append(spanPrevMonth)
			.append(spanTargetTitle)
			.append(spanNextMonth);
		var calenderMainDiv = $('<div class="calender_main"></div>');
		var calenderMainHead = $('<div class="calender_head"><div>日</div><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div></div>');
		//mainDIv
		calenderMainDiv.append(calenderMainHead);
		var calenderMainBodyTemp = $('<div class="calender_body"></div>');
		for(var i=0;i<7;i++){
			var innerDiv = $('<div></div>');
			if(this.monthDays[0][i]>=8) innerDiv.addClass('notCurrentMonth');
			else{
				if(this.monthDays[0][i] == this.currentDay) innerDiv.addClass('currentDay');
			}
			innerDiv.text(this.monthDays[0][i]);
			calenderMainBodyTemp.append(innerDiv);
		}
		calenderMainDiv.append(calenderMainBodyTemp)
		for(i=1;i<6;i++){
			var calenderMainBody = $('<div class="calender_body"></div>');
			for(var j=0;j<7;j++){
				var innerDiv = $('<div></div>');
				if(i>=4&&this.monthDays[i][j]<=14) innerDiv.addClass('notCurrentMonth');
				else{
					if(this.monthDays[i][j] == this.currentDay&&this.currentMonth == this.targetMonth) innerDiv.addClass('currentDay');
				}
				innerDiv.text(this.monthDays[i][j]);
				calenderMainBody.append(innerDiv);
			}
			calenderMainDiv.append(calenderMainBody);
		}
		//总Div
		calenderDiv.append(calenderTitleDiv)
			.append(calenderMainDiv);
		this.El = AllDiv;
	}
	this.bindEvent = function(el){
		this.El[0].addEventListener('click', function(e){
			if(e.target.className == 'prevMonth'){
				//self.targetYear--;
				self.targetMonth--;
				if(self.targetMonth<1){self.targetYear--;self.targetMonth = 12;}
				self.getFullMonth(self.targetYear,self.targetMonth,self.targetDay);
				self.createComponent();
				self.appendToEl(el);
			}
			else if(e.target.className == 'nextMonth'){
				//self.targetYear++;
				self.targetMonth++;
				console.log(self.targetMonth);
				if(self.targetMonth>=12) {self.targetYear++;self.targetMonth = 1;}
				self.getFullMonth(self.targetYear,self.targetMonth,self.targetDay);
				self.createComponent();
				self.appendToEl(el);
			}
		}, false);
		this.El.find('.calender_selectArea>input').focus(function(event) {
			/* Act on the event */
			self.El.find('.calender').animate({'opacity':'1'}, 'fast');
			$(this).val(self.currentYear+'/'+self.currentMonth+'/'+self.currentDay);
		});
		this.El.find('.calender_body>div').on('click',function(){
			if(!$(this).hasClass('notCurrentMonth')){
				self.currentDay = $(this).text();
				self.targetDay = $(this).text();
				self.El.find('.calender').fadeOut('fast', function() {
					self.cfgDate(self.currentYear,self.targetMonth,self.targetDay);
					self.El.find('.calender').css({'opacity':'0'});
				});
			}
		});
	}
	this.init = function(){
		this.getCurrentDate();
		this.getFullMonth(this.currentYear,this.currentMonth,this.currentDay);
		this.createComponent();
	}
	this.appendToEl = function(el){
		el.html('');
		this.bindEvent(el);
		el.append(this.El);
	}
	this.init();
}
var newComponent = new componentTime();
newComponent.appendToEl($('.container'));