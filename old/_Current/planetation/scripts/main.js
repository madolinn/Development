_cv = [];
_keys = {};
_g = {};

moduLoad(["planet","spriteSplit","asteroid"]);

_cv.setupAll = function() {
	$("canvas").each(function(ind) {
		_cv[ind] = $(this)[0].getContext('2d');
	});
	return $("canvas").length;
}

_g.init = function() {

	_g.planet = new Planet();
	_g.objects = new Array();
	
	_g.cycle();

}

_g.cycle = function() {

	if (Math.random()*100 > 99 && _g.objects.length < 11) {
		_g.objects.push(new Asteroid());
	}
	_g.planet.Physics()
	_g.render();
	setTimeout(function() { _g.cycle(); },1000/30);

}

_g.render = function() {

	_cv[0].clearRect(0,0,500,500);
	
	for (var i = 0; i < _g.objects.length; i++) {
		if (typeof _g.objects[i] !== 'undefined') {
			_g.objects[i].render();
		}
	}
	_cv[0].strokeStyle = "#CCC";
	_cv[0].beginPath();
	_cv[0].arc(_g.planet.x,_g.planet.y,_g.planet.mass,0,2*Math.PI);
	_cv[0].stroke();

}

function isKeyDown(key) {

	if (_keys.hasOwnProperty(key)) { if (_keys[key] == 1) { return true; }}
	return false;

}

function bindKeys() {

	$(document).keydown(function(e) {
		_keys[e.which] = 1;
	});
	
	$(document).keyup(function(e) {
		_keys[e.which] = 0;
	});

}

$(function() {

	bindKeys();
	_cv.setupAll();
	_spriteSplit.load([["warning_small.png",[100,86,1]]])
	

});