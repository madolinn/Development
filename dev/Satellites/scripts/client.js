// --------------------------------------------------- Start Definitions ------------------------------------------------------- \\

moduLoad("canvas");

moduLoad("menus");
moduLoad("mapgen");
moduLoad("handlers");

_g = {};

_spr = [new Image()];

//_spr[0].src = "rockwall.gif";


// --------------------------------------------------- Core Functions ---------------------------------------------------------- \\

function load() {

	_g.cell = 16;

	_g.menus = new menus;
	_g.map = new mapGen;
	_g.handlers = new handlers;
	
	createCanvas("fore",_g.map.xmax*_g.cell,_g.map.ymax*_g.cell,"#wrapper")
	
	_g.menus.title();
	
	//_g.map.create();
	
}

$(function() { load(); });