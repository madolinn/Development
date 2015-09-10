var _cv;
var _ico;
var _img = new Image();
var _borders = [];


var _cat;
var _rar;

function preloadImages() {
	_borders.push(new Image());
	_borders[0].src = "http://tsunamidry.dyndns.org/_Finished/STB/src/whiteborder.png";
	_borders.push(new Image());
	_borders[1].src = "http://tsunamidry.dyndns.org/_Finished/STB/src/greenborder.png";
	_borders.push(new Image());
	_borders[2].src = "http://tsunamidry.dyndns.org/_Finished/STB/src/blueborder.png";
	_borders.push(new Image());
	_borders[3].src = "http://tsunamidry.dyndns.org/_Finished/STB/src/purpleborder.png";
	
	
	_borders.push(new Image());
	_borders[4].src = "http://tsunamidry.dyndns.org/_Finished/STB/src/blueprint.png";
	_borders.push(new Image());
	_borders[5].src = "http://tsunamidry.dyndns.org/_Finished/STB/src/banana.png";
}

function cvChange(id) {
	id = parseInt(id.substr(1));
	if (id != 0) {
		if (id < 4) {
			for (var i = 1; i < 5; i++) {
				if (i != id) { $("input[type=radio]").eq(i-1).prop("checked",false); }
				else { $("input[type=radio]").eq(i-1).prop("checked",true); }
			}
			_cat = id-1;
		}
		if (id > 3) {
			for (var i = 4; i < 8; i++) {
				if (i != id) { $("input[type=radio]").eq(i-1).prop("checked",false); }
				else { $("input[type=radio]").eq(i-1).prop("checked",true); }
			}
			_rar = id-1;
		}
	}
	
	if (_cat == 0 && _rar) {
		_cv.fillStyle = "#262626";
		_cv.fillRect(8,8,20,20);
		_cv.drawImage(_borders[_rar-3],0,0,36,36);
		if (_img.src) { _cv.drawImage(_img,2,2,32,32); }
	}
	if (_cat == 1) {
		_cv.fillStyle = "#262626";
		_cv.fillRect(8,8,20,20);
		_cv.drawImage(_borders[4],0,0,36,36);
		if (_img.src) { _cv.drawImage(_img,2,2,32,32); }
	}
	if (_cat == 2) {
		_cv.fillStyle = "#262626";
		_cv.fillRect(8,8,20,20);
		_cv.drawImage(_borders[5],0,0,36,36);
		if (_img.src) { _cv.drawImage(_img,2,2,32,32); }
	}
	
	
}

_img.onload = function() {
	_cv.drawImage(_img,2,2,32,32);
	cvChange("c0");
}

function handleFile(e) {
	var file = e.target.files;
	
	if (!file[0].type.match('image.*')) {
		return;
	}
	
	var reader = new FileReader();
	var f;
	
	reader.onload = (function(f) { return function(e) {
		_img.src = e.target.result;
	};})(f);
	
	reader.readAsDataURL(file[0]);
}

function init() {
	for (var i = 0; i < 6; i++) {
		$("input[type=radio]").eq(i).prop("checked",false);
	}
	preloadImages();
}

$(function() {
	_cv = $('canvas')[0].getContext('2d');
	_cv.mozImageSmoothingEnabled = false;
	_cv.webkitImageSmoothingEnabled = false;
	_cv.imageSmoothingEnabled = false;
	
	init();
	
	$("#_in").change(function(e){ handleFile(e); });
	$("label").click(function() { cvChange($(this).attr("for")); });
});