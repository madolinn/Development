// --------------------------------------------------- Menu Functions ---------------------------------------------------------- \\

function menus() {

	this.pos = 0;

}

menus.prototype.title = function() {

	_cv.fore.fillStyle = "#000";
	_cv.fore.fillRect(0,0,_g.map.xmax*_g.cell,_g.map.ymax*_g.cell);
	
	_cv.fore.fillStyle = "#59F";
	_cv.fore.font = "20px Tahoma";
	_cv.fore.textBaseline = "middle";
	_cv.fore.textAlign = "center";
	_cv.fore.fillText("Delve",_g.map.xmax*_g.cell/2,_g.map.ymax*_g.cell/2);
	_cv.fore.fillStyle = "#379";
	_cv.fore.font = "12px Tahoma";
	_cv.fore.fillText("[Press Buttons]",_g.map.xmax*_g.cell/2,(_g.map.ymax*_g.cell/2)+24);

}