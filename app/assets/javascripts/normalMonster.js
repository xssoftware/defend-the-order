'use strict';


function NormalMonster(){


}

NormalMonster.prototype.plsWork = function(){
 var stage = new Kinetic.Stage({
        container: 'container',
        width: 578,
        height: 200
      });
      var layer = new Kinetic.Layer();
      var animations = {
        idle: [{
          x: 2,
          y: 2,
          width: 70,
          height: 119
        }, {
          x: 71,
          y: 2,
          width: 74,
          height: 119
        }, {
          x: 146,
          y: 2,
          width: 81,
          height: 119
        }, {
          x: 226,
          y: 2,
          width: 76,
          height: 119
        }],
        punch: [{
          x: 2,
          y: 138,
          width: 74,
          height: 122
        }, {
          x: 76,
          y: 138,
          width: 84,
          height: 122
        }, {
          x: 346,
          y: 138,
          width: 120,
          height: 122
        }]
      };

      var imageObj = new Image();
      imageObj.onload = function() {
        var blob = new Kinetic.Sprite({
          x: 250,
          y: 40,
          image: imageObj,
          animation: 'idle',
          animations: animations,
          frameRate: 7,
          index: 0
        });

        // add the shape to the layer
        layer.add(blob);

        // add the layer to the stage
        stage.add(layer);

        // start sprite animation
        blob.start();

        // resume transition
        document.getElementById('punch').addEventListener('click', function() {
          blob.setAnimation('punch');

          blob.afterFrame(2, function() {
            blob.setAnimation('idle');
          });
        }, false);
      };
      imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/blob-sprite.png';

}


NormalMonster.setMonsterInfo= new MonsterBase();



NormalMonster.prototype = new MonsterBase();