<html>
<head>
<title>Chords Experiment</title>
<link rel='stylesheet' type='text/css' href='web/default.css'>
<script src='http://10.0.0.2/jquery/jquery.min.js'></script>
<script>

_cv = [];
_g = {};


function setupCV() {
	$("canvas").each(function(index) { _cv[index] = $(this)[0].getContext('2d'); });
}

function setupBinds() {
	$("canvas").eq(0).mousemove(function(event) { Game.mouseMove(event); });
}

Game = {}
Game.start = function() {
	_g.mX = 300;
	_g.mY = 300;
	_g.chordLength = 100;
	Game.render();
}

Game.render = function() {

	_cv[0].clearRect(0,0,600,600);
	_cv[0].fillStyle = "#FFF";
	_cv[0].beginPath();
	_cv[0].arc(300,300,3,0,2*Math.PI);
	_cv[0].fill();
	
	_cv[0].strokeStyle = "#FFF";
	_cv[0].beginPath();
	_cv[0].moveTo(300,300);
	//if (_g.mX == 300) {
	
		if (_g.mY <= 300) {
			if (300 - _g.mY >= _g.chordLength) {
				_cv[0].lineTo(300,300-_g.chordLength);
			} else {
				_cv[0].lineTo(300,300+((_g.chordLength-(300 - _g.mY))/2));
				_cv[0].lineTo(300,_g.mY);
			}
		} else {
			if (_g.mY - 300 <= _g.chordLength) {
				_cv[0].lineTo(300,300+((_g.chordLength-(300 - _g.mY))/2));
				_cv[0].lineTo(300,_g.mY);
			} else {
				_cv[0].lineTo(300,300+_g.chordLength);
			}
		}
		
	//} else {
		//Draw Arrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrggggggggggggggggggggggggghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh-c
	//}
	_cv[0].stroke();

	setTimeout(function() { Game.render(); }, 1000/30);

}

Game.mouseMove = function(e) {

	_g.mX = e.pageX - $("canvas").eq(0).offset().left;
	_g.mY = e.pageY - $("canvas").eq(0).offset().top;

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