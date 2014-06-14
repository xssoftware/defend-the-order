'use strict';


function Tower_1(game){
	this.game = game;
	this.layer = game.layer;
	this.range = 100;
	this.interval = null;
	this.width = 50;
	this.height = 50;
}


Tower_1.prototype.init = function(x, y){
	this.screenX = x;
	this.screenY = y;
	var self = this;
	
	this.image = new Kinetic.Image({
		image : this.game.assetsLoader.getImage('tower1'),
		x : this.screenX,
		y : this.screenY,
		width:50,
		height:50
	});
	
	this.image.offsetX(this.width / 2);
	this.image.offsetY(this.height / 2);
	
	this.game.layer.add(this.image);
	this.game.layer.draw();
	
	setInterval(function(){
		self.scan();
	}, 200);
	
};


Tower_1.prototype.scan = function(){
	var i;
	var monsters = [];
	for(i = 0; i < this.game.waves.length; i++){
		monsters = monsters.concat(this.game.waves[i].monsters);
	}

	for(i = 0; i < monsters.length; i++){
		if(this.isInRange(monsters[i].screenX, monsters[i].screenY)){
			this.rotateTo(monsters[i].screenX, monsters[i].screenY);
			this.fire(monsters[i]);
		}
	}
	
};


Tower_1.prototype.isInRange = function(x, y){
	var dx = this.screenX - x;
	var dy = this.screenY - y;
	var dist = Math.sqrt(dx * dx + dy * dy);

	return dist <= this.range;
};


Tower_1.prototype.rotateTo = function(x, y){
	var dx = this.screenX - x;
	var dy = this.screenY - y;
	var angle = Math.atan2(dy, dx);
	angle = angle * 180 / Math.PI;

	this.image.rotation(angle);
};


Tower_1.prototype.fire = function(monster){
	
};