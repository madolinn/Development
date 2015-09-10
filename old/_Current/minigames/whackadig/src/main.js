_cv = [];
_g = {};
_spr = [];


function setupCanvas() {

	$("canvas").each(function(i) {
	
		_cv[i] = $(this)[0].getContext("2d");
	
	});

}

function buildImages() {

	_g.loaded = 0;

	_spr[0] = new Image;
	_spr[0].src = "src/nomole.png";
	_spr[1] = new Image;
	_spr[1].src = "src/mole.png";
	_spr[2] = new Image;
	_spr[2].src = "src/restart.png";
	
	_spr[0].onload = function() { _g.loaded++; if (_g.loaded == 2) { boot(); } }
	_spr[1].onload = function() { _g.loaded++; if (_g.loaded == 2) { boot(); } }
	_spr[2].onload = function() { _g.loaded++; if (_g.loaded == 2) { boot(); } }

}

function boot() {

	_cv[0].clearRect(0,0,288,288);
	_cv[1].clearRect(0,0,288,288);

	_cv[0].font = "bold 12px Monospace";
	_cv[0].textAlign = "center";
	_cv[0].textBaseline = "middle";
	_cv[0].fillStyle = "#ccc";
	_cv[0].fillText("Click To Begin", 144, 144);
	_g.state = 1;
	_g.points = 0;
	_g.tmole = 1;

}

function stateChange(st) {

	if (_g.state != st) {
	
		_g.state = st;
		
		if (st == 2) {
		
			_cv[0].clearRect(0,0,288,288);
			_cv[0].beginPath();
			_cv[0].moveTo(0,0);
			_cv[0].lineTo(100,0);
			_cv[0].quadraticCurveTo(80,5,70,15.5);
			_cv[0].lineTo(0,15.5);
			_cv[0].lineTo(0,0);
			_cv[0].closePath();
			_cv[0].fill();
			
			_cv[0].fillStyle = "#000";
			_cv[0].textAlign = "left";
			_cv[0].fillText("000000000",2,8);

			
			
			_g.mole = [];
			for (var x = 0; x < 9; x++) {
			
				_g.mole[x] = [];
				for (var y = 0; y < 9; y++) {
				
					_g.mole[x][y] = {st: -1, time: -1};
				
				}
			
			}

			addMoles(1);
			gameLoop();
			
		}
		
		if (st == 3) {
		
			_cv[0].fillStyle = "rgba(255,0,0,.4)";
			_cv[0].fillRect(0,0,288,288);
			_cv[0].textAlign = "center";
			_cv[0].fillStyle = "#000";
			_cv[0].fillText("The Angry Buttons have eaten your soul!",144,110);
			_cv[0].fillStyle = "#ccc";
			_cv[0].beginPath();
			_cv[0].moveTo(255,-1);
			_cv[0].lineTo(255,33);
			_cv[0].lineTo(289,33);
			_cv[0].closePath();
			_cv[0].fill();
			_cv[0].drawImage(_spr[2],256,0);
		
		}
		
	}
	
}

function addMoles(state) {

	if (state == 1) {
	
		_g.mole[4][4].st = 0;
	
	}

	if (state == 2) {
	
		_g.mole[3][4].st = 0;
		_g.mole[5][4].st = 0;
	
	}
	
	if (state == 3) {
	
		_g.mole[3][3].st = 0;
		_g.mole[4][3].st = 0;
		_g.mole[5][3].st = 0;
		_g.mole[3][5].st = 0;
		_g.mole[4][5].st = 0;
		_g.mole[5][5].st = 0;
	
	}
	
	if (state == 4) {
	
		_g.mole[2][2].st = 0;
		_g.mole[3][2].st = 0;
		_g.mole[4][2].st = 0;
		_g.mole[5][2].st = 0;
		_g.mole[6][2].st = 0;
		_g.mole[2][3].st = 0;
		_g.mole[2][4].st = 0;
		_g.mole[2][5].st = 0;
		_g.mole[2][6].st = 0;
		_g.mole[6][2].st = 0;
		_g.mole[6][3].st = 0;
		_g.mole[6][4].st = 0;
		_g.mole[6][5].st = 0;
		_g.mole[6][6].st = 0;
		_g.mole[2][6].st = 0;
		_g.mole[3][6].st = 0;
		_g.mole[4][6].st = 0;
		_g.mole[5][6].st = 0;
		_g.mole[6][6].st = 0;
	
	}
	
	_g.tmole = state;

}

function gameLoop() {

	for (var x = 0; x < 9; x++) {
		for (var y = 0; y < 9; y++) {
	
			var mole = _g.mole[x][y];
	
			if (mole.st == 0) {
			
				if (mole.time > 15) {
				
					if (Math.random()*100 > 80) {
					
						mole.st = 1;
						
					}
					
				} else {
				
					mole.time += (.5+(Math.random()*100>70)+((Math.random()*100>90)/2));
					if (mole.time > 15) { mole.time = 15.5; }
				
				}
				
			}
			
			if (mole.st == 1) {
			
				mole.time++;
				
				if (mole.time > 70) { stateChange(3); }
			
			}
	
		}
	}
	
	if (_g.tmole == 1) { if (_g.points >= 5) { addMoles(2); } }
	if (_g.tmole == 2) { if (_g.points >= 15) { addMoles(3); } }
	if (_g.tmole == 3) { if (_g.points >= 50) { addMoles(4); } }
	
	renderFore();

	if (_g.state == 2) { setTimeout(function() { gameLoop(); }, 100); }

}

function renderFore() {

	_cv[1].clearRect(0,0,288,288);
	for (var x = 0; x < 9; x++) {
		for (var y = 0; y < 9; y++) {
	
			if (_g.mole[x][y].st == 0) {
				_cv[1].drawImage(_spr[0],x*32,y*32);
			}
			
			if (_g.mole[x][y].st == 1) {
				_cv[1].drawImage(_spr[0],x*32,y*32);
				_cv[1].drawImage(_spr[1],x*32,y*32);
			}
	
		}
	}

}

function renderOver() {

	_cv[0].fillStyle = "#ccc";
	_cv[0].fillRect(0,0,70,14);
	_cv[0].fillStyle = "#000";
	
	var str = _g.points.toString();
	for (var i = str.length; i < 9; i++) {
		str = "0" + str;
	}
	
	_cv[0].fillText(str,2,8);
}

function binds() {

	$("canvas").click(function(e) {

		if (_g.state == 1) {
		
			stateChange(2);
		
		}
		
		if (_g.state == 2) {
		
			var x = Math.floor((e.pageX-$("#wrapper").offset().left)/32);
			var y = Math.floor((e.pageY-$("#wrapper").offset().top)/32);
			
			if (_g.mole[x][y].st == 1) {
			
				_g.mole[x][y].st = 0;
				_g.mole[x][y].time = 0;
				_g.points++;
				
				renderOver();
				
			}
		
		}
		
		if (_g.state == 3) {
		
			var x = Math.floor((e.pageX-$("#wrapper").offset().left)/32);
			var y = Math.floor((e.pageY-$("#wrapper").offset().top)/32);
		
			if (x == 8 && y == 0) { boot(); }
		
		}

	});

}

$(function() {

	_g.state = 0;
	setupCanvas();
	binds();
	buildImages();
	
});