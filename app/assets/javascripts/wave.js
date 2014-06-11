
function Wave(monstersType, route ){
	
	this.monstersCount = 10;
	this.route = route;
	this.monsterType=monsterType;
	this.eventEmitter = new EventEmitter();
	this.monsters = [];
	this.monstersType = monstersType;
	
}

Wave.prototype.spawn = function(){
	var interval = 0;
	var self = this;
	for(i = 0; i < this.monstersCount; i++){
		interval += 1000;
		setTimeout(function(){
			self.createMonster();
		}, interval);
	
	}
	
};


Wave.prototype.createMonster = function(){
	var monster = new Monster_1(route);
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