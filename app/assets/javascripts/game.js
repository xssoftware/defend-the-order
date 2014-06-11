

function Game(){

	this.wavesCount = 10;
	this.wavesCreated = 0;
	
	this.assetsLoader = new AssetsLoader();
	
	this.stage = null;
	this.layer = null;
	this.coordsLayer = null;
	
	this.stageWidth = 900;
	this.stageHeight = 500;
	
	this.coordWidth = 50;
	this.coordHeight = 50;
	
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
	

	
	this.assetsLoader.addImage('background', levelInfo.backgroundUrl);
	this.assetsLoader.addImage('monster1Url', levelInfo.monster1Url);
	
	
	this.stage = new Kinetic.Stage({
	  width: this.stageWidth,
	  height: this.stageHeight,
	  container: containerId
	});
	
	this.layer = new Kinetic.Layer();
	this.coordsLayer = new Kinetic.Layer();
	
	this.stage.add(this.layer);
	this.stage.add(this.coordsLayer);
	
	
	this.assetsLoader.eventEmitter.registerEvent('ready', function(){
		self.initLevel();
	});

};


Game.prototype.initLevel = function(){
	
	
	  this.drawTerrain();
	  
	  
	  
	  
	  
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
	var wave = new Wave(this.levelInfo.monsterType, this.levelInfo.route, this.layer);
	this.wavesCreated++;
	
	wave.spawn();
	
	wave.eventEmitter.registerEvent('waveCleared', function(){
		self.createWave();
	});

}

Game.prototype.drawTerrain = function(){
	var i, j, coord;

	for(i = 0; i < this.stageWidth / this.coordWidth; i++){
		for(j = 0; j < this.stageHeight / this.coordHeight; j++){

				coord = new Kinetic.Rect({
					  width: this.coordWidth,
					  height: this.coordHeight,
					  x : i * this.coordWidth,
					  y : j * this.coordHeight,
					  stroke: 'black',
					  strokeWidth: 1
					});
					
				this.coordsLayer.add(coord);
		}
	}
	
	this.coordsLayer.draw();

};

Game.prototype.startLevel=function(){

}

Game.prototype.finishLevel =function(){

}