
function Wave(monstersType, route, game ){
	
	this.monstersCount = 10;
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
	var self = this;
	for(i = 0; i < this.monstersCount; i++){
		interval += 1000;
		setTimeout(function(){
			self.createMonster();
		}, interval);
	
	}	
	
};


Wave.prototype.createMonster = function(){
	// create monster acording to monsterType
	var monster = new NormalMonster();
	monster.setMonsterInfo(this.route, this.game);
	
	this.monsters.push(monster);
	
	monster.eventEmitter.registerEvent('mosterDead', function(monster){
		var index = this.monsters.indexOf(monster);
		this.monster.splice(index, 1);
		
		if(this.monsters.length === 0){
			this.eventEmitter.emit('waveCleared');
		}
	});
};


Wave.prototype.remove =function(){

}