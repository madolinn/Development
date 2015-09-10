_cv = [];
_g = {i:0, x:0};

moduLoad("spriteSplit");

_g.init = function() {

	_g.sprites = [];
	_g.sprites[0] = new Image();
	_g.sprites[1] = new Image();
	_g.sprites[0].src = _spr[0];
	_g.sprites[1].src = _spr[1];

	_g.pedes = [];
	_g.pedes[0] = new Pede(-1, 0, 10);
	_g.cycle();

}

Pede = function(px, py, pl) {

		this.tick = 0;
		this.segs = [];
		for (var i = 0; i < pl; i++) {
			if (py < 0) {	this.segs[i] = {x:px, y:py-i, d:4, s:0};	}
			if (px < 0) {	this.segs[i] = {x:px-i, y:py, d:0, s:0};	}
			if (px > 30) {	this.segs[i] = {x:px+i, y:py, d:2, s:0};	}
		
		}

}

_g.movePedes = function() {

	for (var i = 0; i < _g.pedes.length; i++) {
	
		_g.pedes[i].tick++;
		if (_g.pedes[i].tick % 4 == 0) {
		
			for (var si = _g.pedes[i].segs.length-1; si > 0; si--) {
			
				_g.pedes[i].segs[si].x = _g.pedes[i].segs[si-1].x;
				_g.pedes[i].segs[si].y = _g.pedes[i].segs[si-1].y;
				_g.pedes[i].segs[si].s = _g.pedes[i].segs[si-1].s;
			
			}
			
			if (_g.pedes[i].segs[0].d == 0) {
				_g.pedes[i].segs[si].x += 1;
			} else if (_g.pedes[i].segs[0].d == 1) 
		
			_g.pedes[i].segs[0].s = (_g.pedes[i].segs[0].s == 0) ? 1 : 0;
		
		}
	
	}

}

_g.cycle = function() {

	_g.movePedes();
	_g.render();
	setTimeout(function() { _g.cycle(); }, 1000/30);
	
}

_g.render = function() {

	_cv[0].clearRect(0,0,480,480);
	_cv[0].fillStyle = "#000";
	_cv[0].fillRect(0,0,480,480);
	
	for (var i = 0; i < _g.pedes.length; i++) {
	
		for (var si = 0; si < _g.pedes[i].segs.length; si++) {
		
			_cv[0].drawImage(_g.sprites[_g.pedes[i].segs[si].s], _g.pedes[i].segs[si].x*16, _g.pedes[i].segs[si].y*16);
		
		}
	
	}

}

_cv.setupAll = function() {
	$("canvas").each(function(ind) {
		_cv[ind] = $(this)[0].getContext('2d');
	});
	return $("canvas").length;
}

_cv.setup = function(sel) {
	if ($("canvas"+sel).length == 1) { _cv.push($("canvas"+sel)[0].getContext('2d')); return _cv.length-1; }
	return -1;
}

$(function() {

	_cv.setupAll();
	_spriteSplit.load([["./content/pede.gif",[16,2]]]);

});