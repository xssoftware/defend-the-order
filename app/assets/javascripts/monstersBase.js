'use strict';


function MonsterBase(){

}

MonsterBase.prototype.setMonsterInfo = function(route, layer){

	this.x = route[0].x;
	this.y = route[0].y;
	
	this.eventEmitter = new EventEmitter();

	this.speed = 0;
	this.health = 0;
	
	
	this.route = [{x:1, y:1}, {x:20, y :33}];
	this.routeIndex = 0;
	
	this.layer = layer;
	
	/*
	this.sprite = new Kinetic.Sprite({
		x: 1,
		y: 1,
		image: imageObj,
		animation: 'walking_left',
		animations: {
		  walking_left: [
			// x, y, width, height (6 frames)
			0, 0, 49, 109,
			52, 0, 49, 109,
			105, 0, 49, 109,
			158, 0, 49, 109,
			210, 0, 49, 109,
			262, 0, 49, 109
		  ]         
		},
		frameRate: 7,
		frameIndex: 0
  );
  */
  this.container = new Kinetic.Group({
	x:this.x,
	y:this.y,
	width: this.width,
	height: this.height
  });
  
  //this.container(this.sprite);
  
  //this.container.add(this.sprite);
  this.layer.add(this.container);
	this.layer.draw();

};


MonsterBase.prototype.moveTo = function(coordX, coordY){
	var dx = coordX - this.x;
	var dy = coordY - this.y;
	var dist = Math.sqrt(dx * dx + dy * dy);
	var tweenDuration = distance / this.speed;
	var self = this;
	
	this.routeIndex++;
	
	var tween = new Kinetic.Tween({
	  node: this.container,
	  x : coordX,
	  y : coordY,
	  duration: tweenDuration,
	  easing: Kinetic.Easings.EaseInOut,
	  onFinish: function(){	  
		self.movetTo(self.route[routeIndex].x, self.route[routeIndex].y);
	  }
	});

};



MonsterBase.prototype.die = function(){
	this.container.remove();
	this.eventEmitter.emit('monsterDead', this);
};
