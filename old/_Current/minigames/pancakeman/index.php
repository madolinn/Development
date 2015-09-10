<html>
<head>
<title>Pancake Man</title>
<link rel='stylesheet' type='text/css' href='web/default.css'>
<script src='http://10.0.0.2/jquery/jquery.min.js'></script>
<script>

_cv = [];
_g = {};
_g.player = new Player();

function Player() {

	this.x = 10;

}

function setupCV() {
	$("canvas").each(function(index) { _cv[index] = $(this)[0].getContext('2d'); });
}

function setupBinds() {
	$(window).keypress(function(event) { Game.keyPress(event); });
}

Game = {}
Game.start = function() {

	_g.jawClose = 0;
	_g.jawSpeed = 1;
	_g.points = 0;

	Game.newLevel();
	Game.cycle();
}

Game.gameOver = function() {

	_g.lose = true;
	_g.loseblood = [];
	for (var i = 0; i < 84; i++) {
		_g.loseblood[i] = (Math.random()*100)-100;
	}
	
	Game.renderLose();

}

Game.cycle = function() {

	$("div").eq(1).html("Points: "+_g.points);

	if (_g.jawClose < 224) {
		_g.jawClose+=_g.jawSpeed;
	} else {
		_g.points++;
		Game.newLevel();
		_g.jawSpeed+=.25;
	}
	
	if (_g.jawClose > 208) {
		if (_g.level[_g.player.x] == Math.floor(_g.level[_g.player.x])) {
			Game.gameOver();
		}
	}
	
	Game.render();
	if (!_g.lose) { setTimeout(function() { Game.cycle(); }, 1000/30); }

}

Game.newLevel = function() {

	_g.jawClose = 0;
	_g.level = [];
	for (var i = 0; i < 21; i++) {
		_g.level[i] = Math.floor(Math.random()*6)-3;
	}
	_g.level[Math.floor(Math.random()*21)]+=.1;
	
}

Game.render = function() {

	_cv[0].clearRect(0,0,600,600);
	_cv[0].fillStyle = "#FFF";
	
	_cv[0].strokeStyle = "#FFF";
	_cv[0].beginPath();
	
	//Bottom Jaw
	
	for (var i = 0; i < 21; i++) {
	
		if (i == 0) {
			_cv[0].moveTo(0,(Math.floor(_g.level[i])*16)+224);
			_cv[0].lineTo(16,(Math.floor(_g.level[i])*16)+224);
		} else {
			_cv[0].lineTo(i*16,(Math.floor(_g.level[i])*16)+224);
			_cv[0].lineTo((i+1)*16,(Math.floor(_g.level[i])*16)+224);
		}
	
	}
	
	_cv[0].stroke();
	
	//Top Jaw
	
	_cv[0].beginPath();
	
	for (var i = 0; i < 21; i++) {
	
	var offset = 16;
	
	if (_g.level[i] == Math.floor(_g.level[i])) { offset=0; }
	
		if (i == 0) {
			_cv[0].moveTo(0,(Math.floor(_g.level[i])*16)+_g.jawClose-offset);
			_cv[0].lineTo(16,(Math.floor(_g.level[i])*16)+_g.jawClose-offset);
		} else {
			_cv[0].lineTo(i*16,(Math.floor(_g.level[i])*16)+_g.jawClose-offset);
			_cv[0].lineTo((i+1)*16,(Math.floor(_g.level[i])*16)+_g.jawClose-offset);
		}
	
	}
	
	////////////////
	
	_cv[0].stroke();

	_cv[0].fillRect(_g.player.x*16,((_g.level[_g.player.x]-1)*16)+224,16,16);
	
	if (_g.lose) {
	
		_cv[0].strokeStyle = "#F00";
		for (var i = 0; i < 21; i++) {
			if (_g.level[i]-Math.floor(_g.level[i]) > 0) {
				_cv[0].strokeRect(i*16,(Math.floor(_g.level[i])*16)+208-(224-_g.jawClose),16,(224-_g.jawClose)+16);
			}
		}
	
	}

}

Game.renderLose = function() {

	for (var i = 0; i < 84; i++) {
	
		_cv[0].fillStyle = "rgba(255,0,0,.05)";
		_cv[0].fillRect(i*4,0,4,Math.floor(_g.loseblood[i]));
		_g.loseblood[i] += ((Math.floor((_g.loseblood[i]-Math.floor(_g.loseblood[i]))*10))*.5)+2;
	}

	if (_g.lose) { setTimeout(function() { Game.renderLose(); }, 1000/30); }

}

Game.keyPress = function(e) {

	if (!_g.lose) {

		if (e.keyCode == 37) {
			_g.player.x = Math.max(0,_g.player.x-1);
		}
		if (e.keyCode == 39) {
			_g.player.x = Math.min(20,_g.player.x+1);
		}
	
	} else {
	
		_g.jawSpeed = 1;
		_g.points = 0;
		_g.lose = false;
		Game.newLevel();
		Game.cycle();
	
	}

}

$(function() {

	setupCV();
	setupBinds();
	Game.start();

});

</script>
</head>
<body>

<canvas width = "336" height = "336">No El Support-o</canvas>
<div style = "width:338; margin:auto;"><div style = "float:right; width:75px; font-family:Tahoma; font-size:11px; text-align:center; border:1px solid #777; border-top:0px; color:white;"></div></div>

</body>
</html>