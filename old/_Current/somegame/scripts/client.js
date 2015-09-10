Player.prototype.draw = function(context) {
	can[1].clearRect(0,0,Game.width,Game.height);
	can[1].fillStyle = '#FF00FF';
    //canc.fillRect(Math.floor(Game.width/2), Math.floor(Game.height/2), tileSize, tileSize);
	
	
		//Crappy method do not use. Should create a sprite object with all the sprites pinned out already, that way we don't have to make a new image every draw.
		//Also, preload with CSS. Currently sitting at the bottom of the stylesheet.
		
		can[1].drawImage(this.img,104,72,8,8,Math.floor(Game.width/tileSize/2)*tileSize, Math.floor(Game.height/tileSize/2)*tileSize,tileSize,tileSize);
		//Put this somewhere not crappy too. Causes pixel scaling as opposed to blended scaling. Sprites will become blurred otherwise.
		//Not guarnteed to work in all browsers :( We could always precrop and scale images using a seperate canvas, and then save those editted images into a variable to be used later.
		//This would also leave the option for making loading bars since we can check how many are completed.
		can[1].imageSmoothingEnabled = false;
		can[1].webkitImageSmoothingEnabled = false;
		can[1].mozImageSmoothingEnabled = false;
		
		//debug
		$('p#debug2').html(this.x+","+this.y)
	
	
};

Player.prototype.update = function() {
	if (Key.isDown(Key.UP)) this.move(0,-1,1);
	if (Key.isDown(Key.LEFT)) this.move(-1,0,1);
	if (Key.isDown(Key.DOWN)) this.move(0,1,1);
	if (Key.isDown(Key.RIGHT)) this.move(1,0,1);
};



function createCanvasContexts() {
	var index = 0;
	$('canvas').each(function() {
		can[index] = $(this)[0].getContext('2d');
		index += 1;
	});
}

function drawMap() {
	can[0].clearRect(0,0,Game.width,Game.height);
	can[3].clearRect(0,0,Game.width,Game.height);
	can[0].fillStyle= 'rgb(0,0,0)';
	can[0].fillRect(0,0,Game.width,Game.height);
	var relTop = Game.player.y-Math.floor(Game.height/tileSize/2);
	var relLeft = Game.player.x-Math.floor(Game.width/tileSize/2);
	for (var y=0; y<Math.ceil(Game.height/tileSize); y++) {
		for (var x=0; x<Math.ceil(Game.width/tileSize); x++) {
			if ( relTop+y >= 0 && relTop+y < map.length && relLeft+x >= 0 && relLeft+x < map[0].length) {
				var r = map[relTop+y][relLeft+x] * 16;
				var g = map[relTop+y][relLeft+x] * 16;
				var b = map[relTop+y][relLeft+x] * 16;
				can[0].fillStyle= 'rgb('+r+','+g+','+b+')';
				can[0].fillRect(x*tileSize,y*tileSize,tileSize,tileSize);
				can[0].strokeStyle = 'rgba(0,0,0,.5)';
				can[0].strokeRect(x*tileSize,y*tileSize,tileSize,tileSize);
				//coords
				if (coords && tileSize>24) {
					can[3].font = "normal "+(tileSize/3)+"px Arial";
					can[3].textAlign = "center";
					can[3].textBaseline = "middle";
					can[3].fillStyle='rgb(224,128,128)';
					var coordX = relLeft+x;
					var coordY = relTop+y;
					can[3].fillText(coordX+","+coordY,(x*tileSize)+(tileSize/2),(y*tileSize)+(tileSize/2))
				} else if (coords) {
					if (x%4==0 && y%4==0) {
						can[3].strokeStyle = 'rgba(255,255,255,0.5)';
						can[3].strokeRect(x*tileSize,y*tileSize,tileSize,tileSize);
						can[3].font = "normal 12px Arial";
						can[3].textAlign = "center";
						can[3].textBaseline = "middle";
						can[3].fillStyle='rgba(255,64,64,.3)';
						var coordX = relLeft+x;
						var coordY = relTop+y;
						can[3].fillText(coordX+","+coordY,(x*tileSize)+(tileSize/2),(y*tileSize)+(tileSize/2))
					} else {
						can[3].strokeStyle = 'rgba(255,255,255,0.1)';
						can[3].strokeRect(x*tileSize,y*tileSize,tileSize,tileSize);
					}
				}
			}
		}
	}
}