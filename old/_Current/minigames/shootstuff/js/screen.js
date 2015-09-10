function Screen(parent) {
	this.h = 0;
	this.w = 0;
	this.p = parent;
	this.can = [];
	this.buffBuild = [];
	this.buffCurrent = [];
	this.bgOffset = [0, 0];
	/* BUFFER FORMAT
		can, save/restore (2)							| Save/Reset rotation/origin
		0,   1
		can, a (2)										| Rotate canvas (radians)
		0    1
		can, x, y (3)									| Move origin
		0    1  2
		can, x, y, image (4)							| Image; default size
		0    1  2  3
			OR
		can, x, y, w, h, image (6)						| Image; scaled
		0    1  2  3  4  5
			OR
		can, x, y, w, h, r, g, b (8)					| Stroke rect;
		0    1  2  3  4  5  6  7
			OR
		can, x, y, w, h, r, g, b, a (9)					| Fill rect;
		0    1  2  3  4  5  6  7  8
			OR
		can, x, y, font, r, g, b, a, align, text (10)	| Text;
		0    1  2  3     4  5  6  7  8      9
	CANVAS INFO
		[0] canBackA		- Back
		[1] canBackB		- Mid
		[2] canBackC		- Over
		[3] canEnemyA		- Ship sprites
		[4] canEnemyB		- Effect overlays
		[5] canPlayerA		- Ship sprites
		[6] canPlayerB		- Effect overlays
		[7] canProjectileA	- Player bullets
		[8] canProjectileB	- Enemy bullets
		[9] canUIA			- Back
		[10] canUIB			- Mid
		[11] canUIC			- Over
		[12] inputCapture	- Used for player input capture
	*/
	this.createCanvasContexts();
};

Screen.prototype.createCanvasContexts = function() {
	var me = this;
	$('.gameCanvas').each(function(index) {
		me.can[index] = $(this)[0].getContext('2d');
		if (this.height > me.h) {
			me.h = this.height;
		};
		if (this.width > me.w) {
			me.w = this.width;
		};
	});
	//temp bg
	this.can[0].fillStyle = 'rgba(0,0,0,1)';
	this.can[0].fillRect(0,0,this.w,this.h);
};

Screen.prototype.pushBuffer = function() {
	this.buffCurrent.length = 0;
	this.buffCurrent = this.buffBuild.slice(0);
	this.buffBuild.length = 0;
};

Screen.prototype.draw = function() {
	//wipe turds
	this.can[0].clearRect(0,0,this.w,this.h);
	this.can[1].clearRect(0,0,this.w,this.h);
	this.can[2].clearRect(0,0,this.w,this.h);
	this.can[3].clearRect(0,0,this.w,this.h);
	this.can[4].clearRect(0,0,this.w,this.h);
	this.can[5].clearRect(0,0,this.w,this.h);
	this.can[6].clearRect(0,0,this.w,this.h);
	this.can[7].clearRect(0,0,this.w,this.h);
	this.can[8].clearRect(0,0,this.w,this.h);
	this.can[9].clearRect(0,0,this.w,this.h);
	this.can[10].clearRect(0,0,this.w,this.h);
	this.can[11].clearRect(0,0,this.w,this.h);
	this.can[12].clearRect(0,0,this.w,this.h);
	//draw
	this.drawBackground();
	for (var i=0; i<this.buffCurrent.length; i++) {
		var b = this.buffCurrent[i];
		switch(b.length) {
			case 2:
				if (isNaN(b[1])) {
					if (b[1] == 's') {
						this.can[b[0]].save();
						//console.log('State saved.');
					} else if (b[1] == 'r') {
						this.can[b[0]].restore();
						//console.log('State restored.');
					} else {
						console.log('I don\'t know how to: ' + b[1]);
					};
				} else {
					this.can[b[0]].rotate(b[1]);
					//console.log('Rotate: ' + b[1]);
				};
				break;
			case 3:
				this.can[b[0]].translate(b[1], b[2]);
				//console.log('Translate: ' + b[1] + ',' + b[2]);
				break;
			case 4:
				this.can[b[0]].drawImage(b[3], b[1], b[2]);
				//console.log('Image at: ' + b[1] + ',' + b[2]);
				break;
			case 6:
				this.can[b[0]].drawImage(b[5], b[1], b[2], b[3], b[4]);
				break;
			case 8:
				this.can[b[0]].strokeStyle = 'rgb(' + b[5] + ',' + b[6] + ',' + b[7] + ')';
				this.can[b[0]].strokeRect(b[1], b[2], b[3], b[4]);
				break;
			case 9:
				this.can[b[0]].fillStyle = 'rgba(' + b[5] + ',' + b[6] + ',' + b[7] + ',' + b[8] + ')';
				this.can[b[0]].fillRect(b[1], b[2], b[3], b[4]);
				break;
			case 10:
				this.can[b[0]].font = b[3];
				this.can[b[0]].textAlign = b[8];
				this.can[b[0]].fillStyle = 'rgba(' + b[4] + ',' + b[5] + ',' + b[6] + ',' + b[7] + ')';
				this.can[b[0]].fillText(b[9], b[1], b[2]);
				break;
			default:
				var contents = '';
				for (var j=0; j<b.length; j++) {
					contents = contents + b[j].toString() + ', ';
				};
				console.log('Tried to render something bad: ' + contents);
		};
	};
	/*
	clearInterval(this.p.interval);
	this.p.paused = true;
	*/
};

Screen.prototype.drawBackground = function() {

	this.can[0].globalCompositeOperation = 'source-over';
	this.can[0].drawImage(this.p.level.img[0], 0, Math.round(this.bgOffset[0]));
	this.can[0].drawImage(this.p.level.img[0], 0, Math.round(this.bgOffset[0]) - this.p.level.img[0].height);
	if (this.bgOffset[0] < this.p.level.img[0].height) {
		this.bgOffset[0] += 20 * (this.p.level.lvl / 100);
	} else {
		this.bgOffset[0] = 0;
	};
	this.can[0].globalCompositeOperation = 'lighter';
	this.can[0].drawImage(this.p.level.img[1], 0, Math.round(this.bgOffset[1]));
	this.can[0].drawImage(this.p.level.img[1], 0, Math.round(this.bgOffset[1]) - this.p.level.img[1].height);
	if (this.bgOffset[1] < this.p.level.img[1].height) {
		this.bgOffset[1] += 20 * (this.p.level.lvl / 50);
	} else {
		this.bgOffset[1] = 0;
	};
	this.can[0].globalCompositeOperation = 'source-over';
	this.can[0].fillStyle = 'rgba(' + this.p.level.skyColor[0] + ','
			+ this.p.level.skyColor[1] + ','
			+ this.p.level.skyColor[2] + ',0.75)';
	this.can[0].fillRect(0, 0, this.w, this.h);
	this.can[0].fillStyle = 'rgba(0, 0, 0, 0.3)';
	this.can[0].fillRect(0, 0, this.w, this.h);
};