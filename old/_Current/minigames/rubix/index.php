<html>
<head>
<title>3D Cube Argh</title>
<link rel='stylesheet' type='text/css' href='web/default.css'>
<script src='http://10.0.0.2/jquery/jquery.min.js'></script>
<script>

_cv = [];
_g = {};


function setupCV() {
	$("canvas").each(function(index) { _cv[index] = $(this)[0].getContext('2d'); });
}

function setupBinds() {
	$(window).keypress(function(event) { Game.keyPress(event); });
}

Game = {}
Game.start = function() {
	_g.vs = [[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]]
	_g.roll = 0;
	Game.render();
}

Game.render = function() {

	_cv[0].fillStyle = "#CCC";
	_cv[0].clearRect(0,0,600,600);
	
	var vs = [];
	
	for (var set = 0; set < _g.vs.length; set++) {
	
		var v = [];
		v[0] = (_g.vs[set][0]*100)+300;
		v[1] = (_g.vs[set][1]*100)+300;
		v[2] = _g.vs[set][2];

		vs.push(v);
		
	}
	
	for (var set = 0; set < _g.vs.length; set+=4) {
	
		_cv[0].beginPath();
		_cv[0].moveTo(vs[set+0][0],vs[set+0][1]);
		_cv[0].lineTo(vs[set+1][0],vs[set+1][1]);
		_cv[0].lineTo(vs[set+2][0],vs[set+2][1]);
		_cv[0].lineTo(vs[set+3][0],vs[set+3][1]);
		_cv[0].fill();
	
	}

	setTimeout(function() { Game.render(); }, 1000/30);

}

Game.keyPress = function(e) {

	if (e.keyCode == 38) {
		_g.roll+=(Math.PI/16);
		
		for (var set = 0; set < _g.vs.length; set++) {
		
		console.log(Math.asin(_g.vs[set][1]));
			_g.vs[set][1] = Math.sin(Math.asin(_g.vs[set][1])+(Math.PI/4));
		
		}
		
	}
	if (e.keyCode == 40) { }
	if (e.keyCode == 37) { }
	if (e.keyCode == 39) { }

}

$(function() {

	setupCV();
	setupBinds();
	Game.start();

});

</script>
</head>
<body>

<canvas width = "600" height = "600">No El Support-o</canvas>

</body>
</html>