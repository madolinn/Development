_spr = [];
_spriteSplit = {};

_spriteSplit.load = function(refs,scale) {

	// refs = [[img src, [sprite width, (optional: sprite height), sprite count], ....], ....]
	// scale = sprite scale amount, sharp!

	this.scale = scale || 1;

	var loaded = 0;

	for (var i = 0; i < refs.length; i++) {
	
		var preimg = new Image();
		preimg.src = refs[i][0];
		preimg.onload = function() { loaded++; if (loaded == refs.length) { _spriteSplit.start(refs); } }
	}
	
	this.temp = new Image();
	
	this.cv = $("<canvas/>");
	
	if (typeof _cv !== 'undefined') { if (_cv.length > 0) {
		_cv[0].font = "italic bold 12px Arial";
		_cv[0].textAlign = "center";
		_cv[0].textBaseline = "middle";
		_cv[0].fillStyle = "#FFF";
		_cv[0].strokeStyle = "#FFF";
		_cv[0].fillText("Loading",$("canvas").eq(0).width()/2,$("canvas").eq(0).height()/2);
		_cv[0].beginPath();
		_cv[0].moveTo(($("canvas").eq(0).width()/2)-22,($("canvas").eq(0).height()/2)+4.5);
		_cv[0].lineTo(($("canvas").eq(0).width()/2)+15,($("canvas").eq(0).height()/2)+4.5);
		_cv[0].stroke();
	}}
}

_spriteSplit.start = function(refs) {

	//$(this.cv).css("width",$(this.cv).attr("width")).css("height",$(this.cv).attr("height"));
	this.ct = $(this.cv)[0].getContext('2d');
		this.ct.imageSmoothingEnabled = false;
		this.ct.webkitImageSmoothingEnabled = false;
		this.ct.mozImageSmoothingEnabled = false;
	
	for (var a = 0; a < refs.length; a++) {
	
		var offset = 0;
		this.temp.src = refs[a][0];
		
		for (var b = 1; b < refs[a].length; b++) { 
		
			var slices;
			var sprW = refs[a][b][0];
			var sprH;
			
			if (refs[a][b].length == 3) {
				sprH = refs[a][b][1];
				slices = refs[a][b][2];
			} else {
				sprH = sprW;
				slices = refs[a][b][1];
			}
			
			$(this.cv).attr("width",sprW).attr("height",sprH);
		
			for (var i = 0; i < slices; i++) {
			
				//var sprW = (Math.floor(refs[a][b][0]) == refs[a][b][0]) ? Math.floor(refs[a][b][0]) : Math.floor(refs[a][b][0])*2;
				//var sprH = Math.floor(refs[a][b][0]);
				this.ct.clearRect(0,0,sprW,sprH);
				if (sprW > this.temp.width || sprH > this.temp.height) { console.warn("spriteSplit: Supplied Width or Height was larger than image"); _spr.push($(this.cv)[0].toDataURL()); continue; }
				this.ct.drawImage(this.temp,(i*sprW)%this.temp.width,(Math.floor(i/(this.temp.width/sprW))*sprH)+offset,sprW,sprH,0,0,sprW*this.scale,sprH*this.scale);
				_spr.push($(this.cv)[0].toDataURL());
	
			}
			
			offset+=(Math.floor(i/(this.temp.width/sprW))*sprH)+(sprH*(Math.floor(Math.floor(i/(this.temp.width/sprW))*sprH)!=((i/(this.temp.width/sprW))*sprH)));
		
		}

	}
	
	// Redraw with dataURLs to rebuild slow cache
	
	for (var i = 0; i < _spr.length; i++) {
	
		this.spr = new Image();
		this.spr.src = _spr[i];
		this.ct.drawImage(this.spr,0,0);
		
	}
	
	// Set a delay, hopefully it'll catch up by now.
	
	setTimeout(function(){ _g.init(); },1000);
	$(this.cv).remove();
	//delete _spriteSplit; @@@@@@@@@@@@@@@@@@@@@@@@@ Cleanup object? @@@@@@@@@@@@@@@@@@@@@@@@@

}