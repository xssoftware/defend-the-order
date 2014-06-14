'use strict';


function MonsterBase(){
	this.x = 0;
	this.y = 0;
	this.screenX = 0;
	this.screenY = 0;
	this.game = null;
	this.width = 0;
	this.height = 0;
	this.routeIndex = 0;
	this.speed = 1;
	this.eventEmitter = new EventEmitter();
	this.health = 0;
	this.routeIndex = 1;
	
}

MonsterBase.prototype.setMonsterInfo = function(route, layer){

	

};


MonsterBase.prototype.moveTo = function(coordX, coordY){
	var currentX = this.screenX;
	var currentY = this.screenY;
	this.x = coordX;
	this.y = coordY;
	this.calculateScreenCoords();
	

	
	var dx = this.screenX - currentX;
	var dy = this.screenY - currentY;
	var dist = Math.sqrt(dx * dx + dy * dy);
	
	var direction = '';
	var tweenDuration = dist / this.speed;
	var self = this;

	
	
	if(this.screenX > currentX){
		direction = 'walking_right';
	} else if(this.screenX < currentX){
		direction = 'walking_left';
	} else if(this.screenY < currentY){
		direction = 'walking_back';
	} else {
		direction = 'walking_front';
	}
	
	this.sprite.animation(direction);


	this.routeIndex++;
	
	var tween = new Kinetic.Tween({
	  node: this.container,
	  x : this.screenX,
	  y : this.screenY,
	  duration: tweenDuration,
	  easing: Kinetic.Easings.Linear,
	  onFinish: function(){	 
		if(self.route[self.routeIndex]){
			self.moveTo(self.route[self.routeIndex].x, self.route[self.routeIndex].y);
		}
		
	  }
	}).play();

};



MonsterBase.prototype.die = function(){
	this.container.remove();
	this.eventEmitter.emit('monsterDead', this);
};

MonsterBase.prototype.calculateScreenCoords = function(){
	this.screenX = this.x * this.game.coordWidth - this.game.coordWidth / 2;
	this.screenY = this.y * this.game.coordHeight - this.game.coordHeight / 2;
};