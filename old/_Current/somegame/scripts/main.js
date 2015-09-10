var socket = io.connect('http://tsunamidry.dyndns.org:1340');

// Game =============================================================

var Game = {
	fps: 15,
	width: 800,
	height: 600
};

Game.start = function() {
	createCanvasContexts();
	generateMap(64,64,2,8,16);
	Game.player = new Player();
	Game.otherPlayers = [];
	setInterval(Game.run, 1000/Game.fps);
};

Game.run = (function() {
	var loops = 0, skipTicks = 1000 / Game.fps,
		maxFrameSkip = 10,
		nextGameTick = (new Date).getTime(),
		lastGameTick;

	return function() {
		loops = 0;
		while ((new Date).getTime() > nextGameTick) {
			Game.update();
			nextGameTick += skipTicks;
			loops++;
		}
		if (loops) Game.draw();
	}
})();

Game.draw = function() {
	drawMap();
	Game.player.draw();
	Game.otherPlayers.forEach(this.draw());
};

Game.update = function() {
	Game.player.update();
};

// Player ===========================================================

function Player() {
	this.x = roomList[0][1]+Math.floor(roomList[0][3]/2);
	this.y = roomList[0][0]+Math.floor(roomList[0][2]/2);
	
	this.img = new Image();
	this.img.src = "pots.png";
}

Player.prototype.draw = function(context) {
	can[1].clearRect(0,0,Game.width,Game.height);
	can[1].fillStyle = '#FF00FF';
    //canc.fillRect(Math.floor(Game.width/2), Math.floor(Game.height/2), tileSize, tileSize);
	
	
		//Crappy method do not use. Should create a sprite object with all the sprites pinned out already, that way we don't have to make a new image every draw.
		//Also, preload with CSS. Currently sitting at the bottom of the stylesheet.
		
		can[1].drawImage(this.img,8,0,8,8,Math.floor(Game.width/tileSize/2)*tileSize, Math.floor(Game.height/tileSize/2)*tileSize,tileSize,tileSize);
		//Put this somewhere not crappy too. Causes pixel scaling as opposed to blended scaling. Sprites will become blurred otherwise.
		//Not guarnteed to work in all browsers :( We could always precrop and scale images using a seperate canvas, and then save those editted images into a variable to be used later.
		//This would also leave the option for making loading bars since we can check how many are completed.
		can[1].imageSmoothingEnabled = false;
		can[1].webkitImageSmoothingEnabled = false;
		can[1].mozImageSmoothingEnabled = false;
		
		//debug
		$('p#debug2').html(this.x+","+this.y)
	
	
};

Player.prototype.move = function(mx,my,type) {
	var tempX = (this.x * type) + mx;
	var tempY = (this.y * type) + my;
	if (noPassT.indexOf(map[tempY][tempX]) < 0) {
		this.x = tempX;
		this.y = tempY;
	}
};
    
Player.prototype.update = function() {
	if (Key.isDown(Key.UP)) this.move(0,-1,1);
	if (Key.isDown(Key.LEFT)) this.move(-1,0,1);
	if (Key.isDown(Key.DOWN)) this.move(0,1,1);
	if (Key.isDown(Key.RIGHT)) this.move(1,0,1);
};

// Temp other people =============

function OtherPlayer(name, x, y) {
	this.name = name;
	this.x = x;
	this.y = y;
	this.img = new Image();
	this.img.src = "pots.png";
}

OtherPlayer.prototype.draw = function() {
	can[1].clearRect(0,0,Game.width,Game.height);
	can[1].fillStyle = '#FF00FF';
    //canc.fillRect(Math.floor(Game.width/2), Math.floor(Game.height/2), tileSize, tileSize);
	
	
		//Crappy method do not use. Should create a sprite object with all the sprites pinned out already, that way we don't have to make a new image every draw.
		//Also, preload with CSS. Currently sitting at the bottom of the stylesheet.
		
		can[1].drawImage(this.img,8,0,8,8,Math.floor(Game.width/tileSize/2)*tileSize, Math.floor(Game.height/tileSize/2)*tileSize,tileSize,tileSize);
		//Put this somewhere not crappy too. Causes pixel scaling as opposed to blended scaling. Sprites will become blurred otherwise.
		//Not guarnteed to work in all browsers :( We could always precrop and scale images using a seperate canvas, and then save those editted images into a variable to be used later.
		//This would also leave the option for making loading bars since we can check how many are completed.
		can[1].imageSmoothingEnabled = false;
		can[1].webkitImageSmoothingEnabled = false;
		can[1].mozImageSmoothingEnabled = false;
		
		//debug
		//$('p#debug2').html(this.x+","+this.y)
}

$(function() {
	Game.start();
	//debug roomList
	for (var ly=0; ly<roomList.length; ly++) {
		for (var lx=0; lx<roomList[ly].length; lx++) {
			oldText = $('p#debug1').html();
			$('p#debug1').html(oldText+ly+","+lx+": <span class='value'>"+roomList[ly][lx]+"</span>&nbsp&nbsp&nbsp&nbsp")
		}
	}
	oldText = $('p#debug1').html();
	$('p#debug1').html("roomList YXHW = "+oldText)
	$('p#debug2').html("p#debug2");
	$('p#debug3').html("p#debug3");
	$('p#debug4').html("p#debug4");
});

// Connection ==============================================================

function makeClientTime() {
	var clientTime = new Date().getTime();
	return clientTime;
}

socket.on('connect', function() {
	$("p#debug3").css("color", "#FFFF00");
	$("p#debug3").text("Connected.; ");
	var name = prompt("Name:","Bob Dole");
	socket.emit("CreateClient", {name: name});
});

socket.on('SayHello', function(data) {
	var CTime = makeClientTime();
	var DTime = data.time - CTime;
	$("p#debug3").append(data.from + ": " + data.msg + " [" + data.time + " - " + CTime + " = " + DTime + "]; ");
});

socket.on('PlayerStart', function(data) {
	map = data.map;
	Game.player.x = data.x;
	Game.player.y = data.y;
});

socket.on('AddPlayer', function(data) {
	Game.otherPlayers[data.name] = new OtherPlayer(data.name, data.x, data.y);
});

socket.on('UpdatePlayer', function(data) {
	Game.otherPlayers[data.name].x = data.x;
	Game.otherPlayers[data.name].y = data.y;
});
	