var energySystem = function(){
	var energy = 100;
	var self = this;
	var setThisEnergy = function(){
		if(energy<=97) energy+=3;
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
var powerSystem = function(shipName){
	this.Energy = new energySystem();
	this.speed = 20;
	this.state = 'stop';
	this.elDiv = '';
	var angle = 0;
	var timer,rotateTimer,self=this;
	var usingPower = function(){
		var currentEnergy = this.Energy.getEnergy();
		if(currentEnergy>=5) this.Energy.setEnergy(currentEnergy-5);
		else this.stop();
	}
	function shipFly(el){
		//console.log(this);
		function rotateShip(){
			angle+=10;
			el.rotate({
				animateTo:angle,
				duration:100,
				center:['50px','180px'],
				easing: function (x,t,b,c,d){
		            return c*(t/d)*3+b;
		        }
			});
		}
		return setInterval(rotateShip,100);
	}
	function stopShip(){
		clearInterval(rotateTimer);
		this.elDiv.stopRotate();
	}
	function flashEnergy(){
		this.elDiv.text(shipName+' '+this.Energy.getEnergy());
	}
	function renderShip(){
		setInterval(function(){
			flashEnergy.call(self);
		},500)
	}
	this.init = function(){
		var el = $('<div class="spaceShip"></div>');
		el.text(shipName);
		this.elDiv = el;
		console.log(this.elDiv);
		renderShip();
	};
	this.fly = function(){
		console.log(this);
		if(this.state == 'stop'){
			rotateTimer = shipFly(this.elDiv);
			this.state = 'flying';
			timer = setInterval(function(){
				usingPower.call(self)
			},1000);
		}
	};
	this.stop = function(){
		if(this.state == 'flying') {
			stopShip.call(this);
			clearInterval(timer);
			this.state = 'stop';
		}
	};
	this.init();
}
var signalGetSystem = function(media,text){
	var self = this;
	function getMsgEachTime(media){
		//console.log(this);
		if(!msgIsNull(media.msg)){
			//console.log(media.msg);
			if(media.msg['id'] == this.shipName){
				switch(media.msg['command']){
					case 'stop':
						this.Power.stop();
						deleteAll(media.msg);
						break;
					case 'flying':
						this.Power.fly();
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
	this.init = function(){
		this.getMsg(media);
	};
	this.Power = new powerSystem(text);
	this.shipName = text;
	this.destory = function(){
		console.log('destory the spaceShip!');
		this.Power.elDiv.remove();
		deleteAll(this);
	}
	this.getMsg = function(media){
		setInterval(function(){
			getMsgEachTime.call(self,media);
		},1000);
	}
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
	this.addSpaceShip = function(media,shipName){
		var newShip = new signalGetSystem(media , shipName);
		$('.container').append(newShip.Power.elDiv);
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
var media1 = new Mediator();
var commanderJohn = new commander();
var ship1 = new signalGetSystem(media1,'ship1');
$('.container').append(ship1.Power.elDiv);
//setInterval('console.log(energy.power)', 1000);