

function Game(){

	this.wavesCount = 10;
	this.wavesCreated = 0;
	
	this.assetsLoader = new AssetsLoader();
	
	this.stage = null;
	this.layer = null;
	this.coordsLayer = null;
	
	this.stageWidth = 900;
	this.stageHeight = 500;
	
	this.coordWidth = 53;
	this.coordHeight = 50;
	
	this.levelInfo = {};
	this.coordCells = [];

	
	
	
}



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
	var wave = new Wave(this.levelInfo.monsterType, this.levelInfo.route, this);
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
					
				this.coordCells.push(coord);
					
				this.coordsLayer.add(coord);
				
		}
	}
	
	this.coordsLayer.visible(false);
	this.coordsLayer.draw();

};

Game.prototype.startLevel=function(){

};

Game.prototype.finishLevel =function(){

};


Game.prototype.clickedTower =function(towerId){
	
};


