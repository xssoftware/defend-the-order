

function Game(){
	
	
	//var wavesCounter = 1; // private variable

    //this.privilegedMethod = function () {
    //  alert(wavesCounter);
    //};
	
	
	
	this.wavesCount = 6;
	this.wavesCreated = 0;
	this.waves = [];
	
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
	this.assetsLoader.addImage('monster2Url', levelInfo.monster2Url);
	this.assetsLoader.addImage('monster3Url', levelInfo.monster3Url);
	this.assetsLoader.addImage('tower1', levelInfo.tower1Url);
	this.assetsLoader.addImage('tower2', levelInfo.tower2Url);
	this.assetsLoader.addImage('tower3', levelInfo.tower3Url);
	
	
	
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
	
	if(this.wavesCreated > this.wavesCount){
		return;
	}
	
	this.waves.push(wave);
	
	wave.spawn();
	
	wave.eventEmitter.registerEvent('waveCleared', function(){
		self.createWave();
	});

};

Game.prototype.drawTerrain = function(){
	var i, j, coord;

	for(i = 0; i < this.stageWidth / this.coordWidth; i++){
		for(j = 0; j < this.stageHeight / this.coordHeight; j++){

				coord = new Kinetic.Rect({
					  width: this.coordWidth,
					  height: this.coordHeight,
					  x : i * this.coordWidth,
					  y : j * this.coordHeight,
					  stroke: 'grey',
					  strokeWidth: 0.5,
					  dash : [1,2]
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
		


	var i;
	var self = this;
	if (towerId==1){var image = new Kinetic.Image({
		image : this.assetsLoader.getImage('tower1'),	
		x:0,
		y:0,
		width:50,
		height:50
	});
	} else if (towerId==2){
	var image = new Kinetic.Image({
		image : this.assetsLoader.getImage('tower2'),	
		x:0,
		y:0,
		width:50,
		height:50
	});
	} else {
	var image = new Kinetic.Image({
		image : this.assetsLoader.getImage('tower3'),	
		x:0,
		y:0,
		width:50,
		height:50
	});}
	
	
	
	
	this.coordsLayer.add(image);
	this.coordsLayer.visible(true);
	image.setZIndex(1);
	this.coordsLayer.draw();
	
	for(i = 0; i < this.coordCells.length; i++){
		this.coordCells[i].setZIndex(2);
		this.coordCells[i].on('mouseover', function(cell){
			return function(){
				var position = cell.position();
				var gameCoords = self.screenToGameCoords(position.x, position.y);
				var i;
				
				for(i = 0; i < self.levelInfo.route.length; i++){
					if(self.levelInfo.route[i].x == gameCoords.x && self.levelInfo.route[i].y == gameCoords.y){
						return false;
					}
				}
				
				image.position(cell.position());
				self.coordsLayer.draw();
			};
		}(this.coordCells[i]));
		
		this.coordCells[i].on('click', function(cell){
			return function(){
				var position = cell.position();
				var gameCoords = self.screenToGameCoords(position.x, position.y);
				var i;
				
				for(i = 0; i < self.levelInfo.route.length; i++){
					if(self.levelInfo.route[i].x == gameCoords.x && self.levelInfo.route[i].y == gameCoords.y){
						return false;
					}
				}
				self.placeTower(towerId, position.x, position.y);
				for(i = 0; i < self.coordCells.length; i++){
					self.coordCells[i].off('click');
					self.coordCells[i].off('mouseover');
				}
				image.remove();
				self.coordsLayer.visible(false);
			};
		}(this.coordCells[i]));
	}
};


Game.prototype.placeTower =function(towerId, x, y){
	if (towerId==1){var tower = new Tower_1(this);} 
	else if (towerId==2){var tower = new Tower_2(this);}
	else {var tower = new Tower_3(this);}
	
	tower.init(x,y);
};


Game.prototype.screenToGameCoords =function(x, y){
	var coordX = x  / this.coordWidth + 1;
	var coordY = y  / this.coordHeight + 1;
	return {x : coordX, y : coordY};
};

Game.prototype.gameToScreenCoords =function(x, y){
	var coordX = x  * this.coordWidth;
	var coordY = y  * this.coordHeight;
	return {x : coordX, y : coordY};
};



