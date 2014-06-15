
function Wave(monstersType, route, game ){
	
	this.monstersCount = 3;
	this.route = route;
	this.game = game;
	this.layer = game.layer;
	this.monsterType = monstersType;
	this.eventEmitter = new EventEmitter();
	this.monsters = [];
	this.monstersType = monstersType;
	
	
}


Wave.prototype.spawn = function(){
	var interval = 0, i;
	
	f();
	
	var self = this;
	for(i = 0; i < this.monstersCount; i++){
		interval += 1500;
		setTimeout(function(){
			self.createMonster();
		}, interval);
	
	}	
	
};


function f() {

  f.count = ++f.count || 1 // f.count is undefined at first

  //alert("Call No " + f.count)

}




Wave.prototype.createMonster = function(){
	// create monster acording to monsterType
	
	
	
   
  
		
	//console.log('wave count - '+f.count);
	//if (f.count%=3){
	//		
	//	} if else {f.count%=5}{
	//		var monster = new ArmoredMonster();
	//	}
	//	else 
	//	{
	//		var monster = new SpeedMonster();
	//	}
	var monster = new NormalMonster();
	
	
	var self = this;
	monster.setMonsterInfo(this.route, this.game);
	
	this.monsters.push(monster);
	
	monster.eventEmitter.registerEvent('monsterDead', function(monster){
		var index = self.monsters.indexOf(monster);
		self.monsters.splice(index, 1);
		
		
		if(self.monsters.length === 0){
			self.eventEmitter.emit('waveCleared');
			console.log('Wave Cleared');
		}
	});
};


