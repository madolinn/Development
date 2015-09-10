_cv = [];
moduLoad("terrain");

_g = {};

_cv.setupAll = function() {
	$("canvas").each(function(ind) {
		_cv[ind] = $(this)[0].getContext('2d');
	});
	return $("canvas").length;
}

_g.angle = .06;

$(document).keypress(function(e) {
	if (e.keyCode == 37) {
		_g.angle -= .01;
		_cv[0].clearRect(0,0,1000,1000);
		terrain.draw();
	}
	if (e.keyCode == 39) {
		_g.angle += .01;
		_cv[0].clearRect(0,0,1000,1000);
		terrain.draw();
	}
	if (e.keyCode == 38) {
		alert(_g.angle);
	}
});

moduLoad.ready = function() {
	
	_cv.setupAll();
	map = new terrain();
	map.random(12, 12, 5);
	map.draw();
	
	
};