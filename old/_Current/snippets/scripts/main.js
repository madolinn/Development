_cv = [];
moduLoad("dialogBox");

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
	_cv[0].fillStyle = "#452";
	_cv[0].fillRect(0,0,10,10);
	dialogBox.draw("Hello", {x:100});
	_cv[0].fillRect(10,10,10,10);
	//dialogBox.draw("Wee");

});