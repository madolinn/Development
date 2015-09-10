_cv = [];
moduLoad("npc");
moduLoad("player");

_g = {};

_cv.setupAll = function() {
	$("canvas").each(function(ind) {
		_cv[ind] = $(this)[0].getContext('2d');
	});
	return $("canvas").length;
}

_g.angle = .06;

$(document).keypress(function(e) {

});

moduLoad.ready = function() {
	
	_cv.setupAll();
	_g.objects = [new player()];
	
	for (var i = 0; i < _g.objects.length; i++) {
		_g.objects[i].draw();
	}
	
};