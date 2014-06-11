

function Game(){

	this.wavesCount = 10;
	this.wavesCreated = 0;
	
	this.assetsLoader = new AssetsLoader();
	
	this.stage = null;
	this.layer = null;
	
	this.stageWidth = 500;
	this.stageHeight = 500;
	
	this.levelInfo = {};

}


//const TILE_H = 15;
//const TILE_W = 15;
//const MAP_H = 30;
//const MAP_W = 80;

/*
function level1(i,j)
{
	if(	(i == 0 && (j >= 0 && j <= 2))
		|| (j == 2 && (i >=0 && i < 70))
		|| (i == 70 && (j >=2 && j <= 28))
		|| (j == 28 && (i <= 70 && i >= 60))
		|| (i == 60 && (j <= 28 && j >= 5))
		|| (j == 5 && (i <= 60 && i >= 40))
		|| (i == 40 && (j >= 5 && j <= 25))
		|| (j == 25 && (i <= 40 && i >= 30))
		|| (i == 30 && (j >= 20 && j <= 25))
		|| (j == 20 && (i <= 30 && i >= 5))
		|| (i == 5 && (j <= 20 && j >= 10))
		|| (j == 10 && (i >= 5 && i <= 80))
		)
	{
		return true;
	}
	return false;
}
*/


Game.prototype.init = function(levelInfo, containerId){
	var self = this;
	
	this.levelInfo = levelInfo;
	
	this.assetsLoader.addImage('monsters1', 'url to monsters sprite');
	this.assetsLoader.addImage('monsters2', 'url to monsters sprite');
	this.assetsLoader.addImage('monsters3', 'url to monsters sprite');
	this.assetsLoader.addImage('monsters4', 'url to monsters sprite');
	this.assetsLoader.addImage('monsters5', 'url to monsters sprite');
	
	this.assetsLoader.addImage('background', levelInfo['url to monsters sprite']);
	....
	
	
	this.stage = new Kinetic.Stage({
	  width: 500,
	  height: 800,
	  container: containerId
	});
	
	this.layer = new Kinetic.Layer();
	
	this.stage.add(this.layer);
	
	
	this.assetsLoader.eventEmitter.registerEvent('ready', function(){
		self.initLevel();
	});

};


Game.prototype.initLevel = function(){
	
	var background = new Kinetic.Image({
		x: 0,
		y: 0,
		image: this.assetsLoader.getImage('background'),
		width: this.stageWidth,
		height: this.stageHeight
	  });
	  
	  
	  this.layer.add(background);
	  this.layer.draw();
	  
	  this.createWave();
		

};



Game.prototype.createWave = function(){
	var self = this;
	var wave = new Wave(this.levelInfo.monsterType, this.levelInfo.route);
	this.wavesCreated++;
	
	wave.spawn();
	
	wave.eventEmitter.registerEvent('waveCleared', function(){
		self.createWave();
	});

}

Game.prototype.drawTerrain=function(){

}

Game.prototype.startLevel=function(){

}

Game.prototype.finishLevel =function(){

}