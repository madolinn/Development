// --------------------------------------------------- Start Definitions ------------------------------------------------------- \\

moduLoad("menus");
moduLoad("mapgen");
moduLoad("handlers");

_g = {};
_cv = {};

_spr = [new Image()];

//_spr[0].src = "rockwall.gif";


// --------------------------------------------------- Core Functions ---------------------------------------------------------- \\

function load() {

	_g.cell = 16;

	_g.menus = new menus;
	_g.map = new mapGen;
	
	$("canvas#foreground").attr("width",_g.map.xmax*_g.cell).attr("height",_g.map.ymax*_g.cell)
	$("canvas#foreground").css("width",$("canvas#foreground").attr("width")).css("height",$("canvas#foreground").attr("height"));
	_cv.fore = $("canvas#foreground")[0].getContext('2d');
	
	_g.menus.title();
	
	//_g.map.create();
	
}

$(function() { load(); });