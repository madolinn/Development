var _cv = [];
var lat = 0;

function recievedPlayerData(data) {

	if (typeof data === "undefined") { return; }
	delete _cl.players;
	_cl.players = data;
	
	for (keys in _cl.players) {
		if (_cl.players[keys].name == _cl.player.name) { _cl.player.pos.x = _cl.players[keys].pos.x; _cl.player.pos.y = _cl.players[keys].pos.y; delete _cl.players[keys]; }
	}
	
	render();

}

function render() {

	var ms = new Date();
	var ms = ms.getTime();
	if (lat != 0) { $("#lat").html(ms-lat-1000); }
	lat = ms;

	_cv[0].clearRect(0,0,800,600);
	
	_cv[0].strokeStyle = "#FFF";
	_cv[0].fillStyle = "#FFF";
	_cv[0].font = "normal 12px Tahoma";

	for (keys in _cl.players) {
	
		_cv[0].fillText(_cl.players[keys].name, (_cl.players[keys].pos.x)-5-(_cl.player.pos.x)+395, (_cl.players[keys].pos.y)-15-(_cl.player.pos.y)+295);
		drawShip(_cl.players[keys].pos.x,_cl.players[keys].pos.y,0);
	
	}
	
	drawShip(400,300,0,4);
	_cv[0].fillText(_cl.player.name, 5, 15);
	
	// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ HUD @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //
	
	_cv[0].lineWidth = 5;
	
	//_cv[0].strokeStyle = "#34F";
	var g = _cv[0].createRadialGradient(40,10,45,40,10,55);
	g.addColorStop(0,"#34A");
	g.addColorStop(1,"#89F");
	_cv[0].strokeStyle = g;
	_cv[0].beginPath();
	_cv[0].arc(40,10,50,.5*Math.PI,1,true);
	_cv[0].stroke();
	
	//_cv[0].strokeStyle = "#999";
	var g = _cv[0].createRadialGradient(40,10,55,40,10,61);
	g.addColorStop(0,"#666");
	g.addColorStop(1,"#AAA");
	_cv[0].strokeStyle = g;
	_cv[0].beginPath();
	_cv[0].arc(40,10,58,.5*Math.PI,.7,true);
	_cv[0].stroke();
	
	//_cv[0].strokeStyle = "#3F4";
	var g = _cv[0].createRadialGradient(40,10,63,40,10,69);
	g.addColorStop(0,"#2A3");
	g.addColorStop(1,"#4B5");
	_cv[0].strokeStyle = g;
	_cv[0].beginPath();
	_cv[0].arc(40,10,66,.5*Math.PI,0,true);
	_cv[0].stroke();
	
	_cv[0].lineWidth = 1.5;
	_cv[0].strokeStyle = "#000";
	
	_cv[0].beginPath();
	_cv[0].moveTo(40,10);
	_cv[0].lineTo(140,110);
	_cv[0].stroke();
	
	_cv[0].beginPath();
	_cv[0].moveTo(40,10);
	_cv[0].lineTo(40+(Math.cos(1.17809724375))*100,10+(Math.sin(1.17809724375))*100);
	_cv[0].stroke();
	
	_cv[0].beginPath();
	_cv[0].moveTo(40,10);
	_cv[0].lineTo(40+(Math.cos(0.39269908125))*100,10+(Math.sin(0.39269908125))*100);
	_cv[0].stroke();
	
	var g = _cv[0].createRadialGradient(40,10,63,40,10,69);
	_cv[0].lineWidth = 5;
	_cv[0].strokeStyle = g;
	g.addColorStop(0,"#2A3");
	g.addColorStop(1,"#4B5");
	_cv[0].beginPath();
	_cv[0].moveTo(5,60);
	_cv[0].lineTo(37,60);
	_cv[0].stroke();
	
	_cv[0].beginPath();
	_cv[0].moveTo(5,68);
	_cv[0].lineTo(37,68);
	_cv[0].stroke();
	
	_cv[0].beginPath();
	_cv[0].moveTo(5,76);
	_cv[0].lineTo(37,76);
	_cv[0].stroke();
	
	// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ endHUD @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //
	
}

function drawShip(x,y,ind,team) {

	team = team || 0;

	// Frigates,
	// Neutral, Enemy, Ally, Me

	_cv[0].lineWidth = 2;
	
	if (team == 0) { _cv[0].strokeStyle = "#999"; }
	
	if (team == 4) {
	
		_cv[0].strokeStyle = "#34F";
		_cv[0].strokeRect(395,295,10,10);
		return;
	
	}
	
	if (ind == 0) {
		
		_cv[0].beginPath();
		_cv[0].moveTo(x-5-(_cl.player.pos.x)+395,y-5-(_cl.player.pos.y)+295);
		_cv[0].lineTo(x-5-(_cl.player.pos.x)+395,y+5-(_cl.player.pos.y)+295);
		_cv[0].lineTo(x+5-(_cl.player.pos.x)+395,y+5-(_cl.player.pos.y)+295);
		_cv[0].lineTo(x+5-(_cl.player.pos.x)+395,y-5-(_cl.player.pos.y)+295);
		_cv[0].lineTo(x-5-(_cl.player.pos.x)+395,y-5-(_cl.player.pos.y)+295);
		_cv[0].stroke();
	
	}

}

$(function() {

	$("canvas").each(function(ind) {
		$(this).attr("width",parseInt($(this).css("width"))).attr("height",parseInt($(this).css("height")));
		_cv[ind] = $(this)[0].getContext("2d");
	});

});