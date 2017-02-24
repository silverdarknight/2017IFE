var energySystem = function(rate){
	var energy = 100;
	var self = this;
	var setThisEnergy = function(){
		if(energy<=97) energy+=rate;
		else energy = 100;
	}
	this.getEnergyFromUniverse = function(){
		setInterval(function(){
			setThisEnergy.call(self);
		}, 1000);
	}
	this.setEnergy = function(n){
		energy = n;
	}
	this.getEnergy = function(){
		return energy;
	}
	this.getEnergyFromUniverse();
}
var powerSystem = function(energyType , speed , decreaseRate){
	this.Energy = energyType;
	this.speed = speed;
	this.decreaseRate = decreaseRate;
	var self=this;
	function usingPower_child(){
		var currentEnergy = this.Energy.getEnergy();
		if(currentEnergy>=this.decreaseRate) this.Energy.setEnergy(currentEnergy-this.decreaseRate);
	}
	this.usingPower = function(){
		return setInterval(function(){
			usingPower_child.call(self);
		},500);
	}
}
var signalGetSystem = function(powerSystem , media , text){
	var self = this,rotateTimer,timer,renderTimer,angle = 0;
	function getMsgEachTime(media){
		//console.log(this);
		if(!msgIsNull(media.msg)){
			//console.log(media.msg);
			if(media.msg['id'] == this.shipName){
				switch(media.msg['command']){
					case 'stop':
						this.stop();
						deleteAll(media.msg);
						break;
					case 'flying':
						this.fly();
						deleteAll(media.msg);
						break;
					case 'destory':
						this.destory();
						deleteAll(media.msg);
						break;
				}
			}
		}
	}
	function stopShip(){
		clearInterval(rotateTimer);
		this.elDiv.stopRotate();
	}
	function shipFly(el){
		var temp = this.Power.speed;
		function rotateShip(){
			//console.log(this);
			angle+=10*temp/20;
			el.rotate({
				animateTo:angle,
				duration:100,
				center:['75px','180px'],
				easing: function (x,t,b,c,d){
					//console.log(temp);
		            return c*(t/d)+b;
		        }
			});
		}
		return setInterval(function(){
			rotateShip.call(self)
		},100);
	}
	function flashEnergy(){
		//console.log(this.Power.Energy.getEnergy());
		this.elDiv.text(this.shipName+' '+this.Power.Energy.getEnergy());
		if(this.Power.Energy.getEnergy() < this.Power.decreaseRate) this.stop();
	}
	
	this.elDiv = '';
	this.Power = powerSystem;
	this.state = 'stop';
	this.shipName = text;
	this.destory = function(){
		console.log('destory the spaceShip!');
		this.elDiv.remove();
		clearInterval(timer);
		clearInterval(rotateTimer);
		clearInterval(renderTimer);
		deleteAll(this);
	}
	this.getMsg = function(media){
		setInterval(function(){
			getMsgEachTime.call(self,media);
		},1000);
	}
	this.fly = function(){
		if(this.state == 'stop'){
			//console.log('ship flying',this);
			rotateTimer = shipFly.call(this,this.elDiv);
			this.state = 'flying';
			timer = this.Power.usingPower();
		}
	}
	this.stop = function(){
		if(this.state == 'flying'){
			console.log('stop ship');
			stopShip.call(this);
			clearInterval(timer);
			this.state = 'stop';
		}
	}

	this.renderShip = function(){
		//console.log(this);
		renderTimer = setInterval(function(){
			flashEnergy.call(self);
		},500)
	}
	this.init = function(){
		this.getMsg(media);
		var el = $('<div class="spaceShip"></div>');
		el.text(this.shipName);
		this.elDiv = el;
		this.renderShip();
	};
	this.init();
}

var Mediator = function(){
	this.lostRate = 0.3;
	this.msg = {};
}

var commander = function(){
	this.sendMsg = function(media , command , id){
		var rate = Math.random();console.log(rate);
		if(rate>media.lostRate) {
			setTimeout(function(){
				media.msg = {
					'id':id,
					'command':command
				};
			}, 1000);
		}
	}
	this.addSpaceShip = function(sysEnergyCfg , sysPowerCfg , media , shipName){
		var energySys,powerSys;
		energySys = new energySystem(sysEnergyCfg);
		powerSys = new powerSystem(energySys,sysPowerCfg[0],sysPowerCfg[1]);
		var newShip = new signalGetSystem(powerSys , media , shipName);
		console.log(newShip);
		$('.container').append(newShip.elDiv);
		var controlDiv = $('<div class="shipArea"><span class="shipId">'+shipName+'</span><span>号ship:</span><button class="fly">飞</button><button class="stop">停</button><button class="destory">自爆</button></div>');
		$('.control').append(controlDiv);
	}
}


function msgIsNull(msg){
	var isNull = true;
	for(var i in msg){
		isNull=false;
	}
	return isNull;
}
function deleteAll(msg){
	for(var i in msg){
		delete msg[i];
	}
}
function addBtn(){
	function checkedVal(list){
		var i=0;
		for(i=0;i<list.length;i++){
			if(list[i].checked) return list[i].value;
		}
	}
	var energyCfg =  checkedVal($('#add')[0].energy);
	var powerCfg = checkedVal($('#add')[0].power).split('_');
	
	energyCfg = parseInt(energyCfg);
	for(var j=0;j<powerCfg.length;j++){
		powerCfg[j] = parseInt(powerCfg[j]);
	}
	//console.log(energyCfg,powerCfg);
	commanderJohn.addSpaceShip(energyCfg,powerCfg,media1,currentShipKey++);
}
var currentShipKey = 1;
var media1 = new Mediator();
var commanderJohn = new commander();
//var ship1 = new signalGetSystem(media1,'ship1');
//var ship1 = new signalGetSystem(powerSystem1,media1,'spaceShip1');
$('#addBtn').click(function(event) {
	/* Act on the event */
	addBtn();
});
$('.control')[0].addEventListener('click', function(e){
	if(e.target.nodeName.toLowerCase() == 'button'){
		if(e.target.className == 'fly'){
			var shipId = $(e.target).parent('.shipArea').find('.shipId').text();
			shipId = parseInt(shipId);
			commanderJohn.sendMsg(media1,'flying',shipId);
		}
		else if(e.target.className == 'stop'){
			var shipId = $(e.target).parent('.shipArea').find('.shipId').text();
			shipId = parseInt(shipId);
			commanderJohn.sendMsg(media1,'stop',shipId);
		}
		else if(e.target.className == 'destory'){
			var shipId = $(e.target).parent('.shipArea').find('.shipId').text();
			shipId = parseInt(shipId);
			commanderJohn.sendMsg(media1,'destory',shipId);
		}
	}
}, false);

//setInterval('console.log(energy.power)', 1000);