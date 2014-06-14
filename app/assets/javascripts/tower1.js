'use strict';


function Tower_1(game){
	this.game = game;
	this.layer = game.layer;
	this.range = 1000;
	this.interval = null;
	this.width = 50;
	this.height = 50;
	this.reloadInterval = 800;
	this.lastFired = 0;
	this.damage = 10;
}


Tower_1.prototype = new TowerBase();

Tower_1.prototype.init = function(x, y){
	this.screenX = x + this.width / 2;
	this.screenY = y + this.height / 2;
	var self = this;
	
	this.image = new Kinetic.Image({
		image : this.game.assetsLoader.getImage('tower1'),
		x : this.screenX,
		y : this.screenY,
		width:this.width,
		height:this.height
	});
	
	this.image.offsetX(this.width / 2);
	this.image.offsetY(this.height / 2);
	
	this.game.layer.add(this.image);
	this.game.layer.draw();
	
	setInterval(function(){
		self.scan();
	}, 100);
	
};




