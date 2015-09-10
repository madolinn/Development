dialogBox = {};
dialogBox.draw = function(txt, x, y, cv) {
	
	var style = {};
	var sty = {};
	
	if (typeof x === "object") { sty = x; x = dialogBox.x; } 							//If 'x' is actually a styling object, set it up.
	
	for (key in dialogBox.style) {
		if (sty.hasOwnProperty(key)) { style[key] = sty[key]; } else { style[key] = dialogBox.style[key]; }	//Can't set new stuff until we make a copy, can't make
	}																										//a copy until we figure out which canvas it's on :(
	
		var x = x || style.x;
		var y = y || style.y;
		var cv = cv || style.cv;
	
	var tmps = {}; 																		//Store old stuff so it doesn't interfere with other things.
	for (key in style) {
		if (key in _cv[cv]) { tmps[key] = _cv[cv][key]; _cv[cv][key] = style[key];} 	//May as well start setting new stuff while we're in this loop.
	} tmps.fillStyle = _cv[cv].fillStyle; 												//Add fillstyle manually since it's named differently.
	
	
	var border = style.border.split(" "); border[0] = parseInt(border[0]);
	if (border[0] > 0) {
		_cv[cv].fillStyle = border[2];
		_cv[cv].fillRect(x,y,style.w+(border[0]*2),style.h+(border[0]*2));
	}
	
	_cv[cv].fillStyle = style.bg;
	_cv[cv].fillRect(x+border[0],y+border[0],style.w,style.h);
	
	_cv[cv].fillStyle = style.color;
	_cv[cv].fillText(txt,x+style.padding+border[0],y+style.padding+border[0]);
	
	
	for (key in tmps) { 																//Start bringing back the old stuff.
		if (key in _cv[cv]) { _cv[cv][key] = tmps[key]; }
	}
	
}
dialogBox.style = {
	x:0,
	y:0,
	w:200,
	h:75,
	cv:0,
	bg:"#000",
	color:"#FFF",
	font:"12px Tahoma",
	textAlign:"left",
	textBaseline:"top",
	padding:5,
	border:"2px solid #F00"
};