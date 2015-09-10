function Player(parent) {
	this.sprite = [];
	this.sprite[0] = new Image();
	this.sprite[0].src = './img/ship.png';
	this.sprite[1] = new Image();
	this.sprite[1].src = './img/thruster.png';
	this.layer = 5;
	this.p = parent;
	this.x = 0;
	this.y = 0;
	this.v = 0;
	this.gunXY = [[10, 4], [50, 4]];
	this.projColor = [200, 200, 50];
	this.projLayer = 7;
	this.currentWeapon = 0;
	this.health = 100;
	this.projectiles = [];
	this.bindInputs();
	this.cd = [];
	for (var i=0; i<PROJECTILE.length; i++) {
		this.cd.push(0);
	};
	this.kills = 0;
};

Player.prototype.bindInputs = function() {
	var me = this;
	$(window).mousemove(function(event) {
		me.moveShip(event);
	});
	$(window).mousedown(function(event) {
		me.mouseEvents(event);
	});
	$(window).click(function(event) {
		event.preventDefault();
	});
	$(window).dblclick(function(event) {
		event.preventDefault();
	});
	$(window).on('keypress',function(event) {
		me.keyEvents(event);
	});
	$(INPUTCANVAS).mouseover(function(event) {
		//$(this).css('cursor', 'none');
	});
	$(INPUTCANVAS).mouseout(function(event) {
		//$('#canUIOverlay').css('cursor', 'default');
	});
};

Player.prototype.moveShip = function(event) {
	var mX = event.pageX - $(INPUTCANVAS).offset().left - (this.sprite[0].width/2);
	mX = Math.max(0 - (this.sprite[0].width/2), Math.min(mX, this.p.screen.w - (this.sprite[0].width/2)));
	var mY = event.pageY - $(INPUTCANVAS).offset().top - (this.sprite[0].height/2);
	mY = Math.max(0 - (this.sprite[0].height/2), Math.min(mY, this.p.screen.h - (this.sprite[0].height/2)));
	this.x = mX;
	this.y = mY;
};

Player.prototype.mouseEvents = function(event) {
	if (event.which == 1) {
		if (this.cd[this.currentWeapon] <= 0) {
			for (var i=0; i<this.gunXY.length; i++) {
				this.projectiles.push(new Projectile(this, this.x + this.gunXY[i][0], this.y + this.gunXY[i][1], this.currentWeapon, toRad(90)));
			};
			this.cd[this.currentWeapon] += (PROJECTILE[this.currentWeapon][9] * this.p.fps);
		};
	};
	if (event.which == 2) {
		if (this.p.debug) {
			this.p.startTime = cTime();
			this.p.debugLoop = 0;
		};
	};
	if (event.which == 3) {
		if (this.currentWeapon < PROJECTILE.length - 1) {
			this.currentWeapon += 1;
		} else {
			this.currentWeapon = 0;
		};
	};
};

Player.prototype.keyEvents = function(event) {
	switch(event.which) {
		case 45: // -
			if (this.p.level.lvl > 1) {
				this.kills = 0;
				this.p.level.lvl -= 1;
			};
			break;
		case 61: // =
			this.p.level.lvl += 1;
			break;
		case 99: // C
			console.clear();
			console.log(this.p.enemy.length);
			for (var i=0; i<this.p.enemy.length; i++) {
				console.log('x,y: ' + this.p.enemy[i].x + ','
						+ this.p.enemy[i].y + '\n'
						+ 'projectiles.length: ' + this.p.enemy[i].projectiles.length + '\n'
						+ 'center: ' + this.p.enemy[i].center + '\n'
						+ 'gunXY: ' + this.p.enemy[i].gunXY + '\n'
						+ 'gunDXY: ' + this.p.enemy[i].gunDXY
					);
			};
			break;
		case 112: // P
			if (this.p.paused) {
				this.p.run();
			} else {
				clearInterval(this.p.interval);
				this.p.paused = true;
			};
			break;
		default:
			$('#debug4').html('Keypress: ' + event.which);
	};
};

Player.prototype.update = function() {
	if (this.health <= 0) {
		this.kills = 0;
		this.health = 100;
		this.p.level.lvl = 1;
		this.p.enemy.length = 0;
	};
	if (this.kills == this.p.level.lvl) {
		this.kills = 0;
		this.p.level.lvl += 1;
	};
	for (var j=0; j<this.cd.length; j++) {
		if (this.cd[j] > 0) {
			this.cd[j] = Math.max(0, (this.cd[j] - 1));
		};
	};
	for (var i=0; i<this.projectiles.length; i++) {
		if (this.projectiles[i].killMe) {
			this.projectiles.splice(i,1);
			i = Math.max(i-1,0);
		} else {
			this.projectiles[i].update();
		}
	}

	this.p.screen.buffBuild.push([
			this.layer
			, this.x
			, this.y
			, this.sprite[0]
		]);	
};

Player.prototype.hit = function(dmg) {
	this.p.screen.buffBuild.push([
			this.layer
			, this.x + 4
			, this.y + 4
			, this.sprite[0].width - 8
			, this.sprite[0].height - 8
			, 255, 0, 0]);
	this.health -= dmg;
	if (this.health <= 0) {
		// you ded
	};
};