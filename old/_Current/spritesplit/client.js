
// --------------------------------------------------- Start Definitions ------------------------------------------------------- \\

_g = {};
_cv = {};
_parse = {};

_spr = [];

// --------------------------------------------------- Start Parse Functions --------------------------------------------------- \\

_parse.load = function(refs) {

	var loaded = 0;

	for (var i = 0; i < refs.length; i++) {
	
		var preimg = new Image();
		preimg.src = refs[i][0];
		preimg.onload = function() { loaded++; if (loaded == refs.length) { _parse.start(refs); } }
	}
	
	this.temp = new Image();

}

_parse.start = function(refs) {

	$("canvas#parse").css("width",$("canvas#parse").attr("width")).css("height",$("canvas#parse").attr("height"));
	this.cv = $("canvas#parse")[0].getContext('2d');
		this.cv.imageSmoothingEnabled = false;
		this.cv.webkitImageSmoothingEnabled = false;
		this.cv.mozImageSmoothingEnabled = false;
	
	for (var a = 0; a < refs.length; a++) {
	
		var offset = 0;
		this.temp.src = refs[a][0];
		
		for (var b = 1; b < refs[a].length; b++) { 
		
			for (var i = 0; i < refs[a][b][1]; i++) {
			
				var sprW = (Math.floor(refs[a][b][0]) == refs[a][b][0]) ? Math.floor(refs[a][b][0]) : Math.floor(refs[a][b][0])*2;
				var sprH = Math.floor(refs[a][b][0]);
			
				this.cv.clearRect(0,0,48,48);
				this.cv.drawImage(this.temp,(i*sprW)%this.temp.width,(Math.floor(i/(this.temp.width/sprW))*sprH)+offset,sprW,sprH,0,0,sprW*3,sprH*3);
				_spr.push($("canvas#parse")[0].toDataURL());
	
			}
			
			offset+=(Math.floor(i/(this.temp.width/sprW))*sprH)+(sprH*(Math.floor(Math.floor(i/(this.temp.width/sprW))*sprH)!=((i/(this.temp.width/sprW))*sprH)));
		
		}

	}
	
	// Redraw with dataURLs to rebuild slow cache
	
	for (var i = 0; i < _spr.length; i++) {
	
		this.spr = new Image();
		this.spr.src = _spr[i];
		this.cv.drawImage(this.spr,0,0);
		
	}
	
	// Set a delay, hopefully it'll catch up by now.
	
	setTimeout(function(){ init(); },1000);
	$("canvas#parse").remove();
	delete _parse;

}

// --------------------------------------------------- Start Player Functions --------------------------------------------------- \\

function Player() {

	this.x = 2;
	this.y = 2;
	
	this.spr = new Image();
	this.spr.src = _spr[25];
	
	this.render();

}

Player.prototype.render = function() {

	//for (var i = 0; i < _spr.length; i++) {
	//	this.spr.src = _spr[i];
	//	_cv.fore.drawImage(this.spr,i*24,this.y*24);
		_cv.fore.drawImage(this.spr,24,24);
	//}
}

// --------------------------------------------------- Start Core Functions ---------------------------------------------------- \\

function init() {

	_g.player = new Player();

}

function load() {

	_parse.load([["lofi_char_a.png", [8,240], [8.5,8], [16,24], [8,15], [8,5], [8,7], [16,3], [8,5], [8,32]],["pots.png", [8,4]]]);
	
	$("canvas#foreground").css("width",$("canvas#foreground").attr("width")).css("height",$("canvas#foreground").attr("height"));
	_cv.fore = $("canvas#foreground")[0].getContext('2d');
	
}

$(function() { load(); });

// --------------------------------------------------- Crap ------------------------------------------------------------------- \\

function roll() { if (_g.player) { var a = Math.floor(Math.random()*272); _g.player.spr.src = _spr[a]; _g.player.render(); $("button").html(a); } }