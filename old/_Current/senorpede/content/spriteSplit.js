_spriteSplit = {};

_spriteSplit.load = function(refs,scale) {

	_spr = [];

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
				slices == refs[a][b][2];
			} else {
				sprH = sprW;
				slices = refs[a][b][1];
			}
			
			$(this.cv).attr("width",sprW).attr("height",sprH);
		
			for (var i = 0; i < slices; i++) {
			
				//var sprW = (Math.floor(refs[a][b][0]) == refs[a][b][0]) ? Math.floor(refs[a][b][0]) : Math.floor(refs[a][b][0])*2;
				//var sprH = Math.floor(refs[a][b][0]);
			
				this.ct.clearRect(0,0,sprW,sprH);
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