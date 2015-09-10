function Enemy(parent) {
	var i = Math.floor(Math.random() * SHIPS.length);
	//
	this.sprite = [];
	this.sprite[0] = new Image();
	this.sprite[0].src = SHIPS[i][0];
	this.w = SHIPS[i][1][0];
	this.h = SHIPS[i][1][1];
	//this.sprite[1] = new Image();
	//this.sprite[1].src = './img/thruster.png';
	this.layer = 3;
	this.p = parent;
	this.x = Math.floor(Math.random() * (this.p.screen.w - this.w));
	this.y = 0 - this.h;
	this.center = [(this.x + (this.w / 2)), (this.y + (this.h / 2))];
	this.angle = toRad(-90);//toRad((Math.random() * 20) + (-90 - 10)); //-90 straight down
	this.angleVar = [SHIPS[i][6]
			, Math.floor(Math.random() * (SHIPS[i][6] * 2))
			, Math.round(Math.random())];
	this.gunXY = [];
	for (var j=0; j<SHIPS[i][2].length; j++) {
		this.gunXY.push(SHIPS[i][2][j]);
	};
	this.gunDXY = [];
	relativeToCenter(this);
	this.projColor = [50, 200, 200];
	this.projLayer = 8;
	this.currentWeapon = SHIPS[i][3][Math.floor(Math.random() * SHIPS[i][3].length)];
	this.fireSpeed = PROJECTILE[this.currentWeapon][9];
	this.v = SHIPS[i][4];
	this.projectiles = [];
	this.health = SHIPS[i][5];
	this.killMe = false;
};

Enemy.prototype.move = function() {
	if (this.p.debugLoop % (this.p.fps * 0.1) == 0) {
		switch(this.angleVar[2]) {
			case 0:
				if (this.angleVar[1] < this.angleVar[0] * 2) {
					this.angleVar[1] += 1;
				} else {
					this.angleVar[2] = 1;
				};
				break;
			case 1:
				if (this.angleVar[1] > 0) {
					this.angleVar[1] -= 1;
				} else {
					this.angleVar[2] = 0;
				};
				break;
		};
		this.angle += toRad(this.angleVar[0]) - toRad(this.angleVar[1]);
	};
	this.y -= (Math.sin(this.angle) * this.v);
	this.x -= (Math.cos(this.angle) * this.v);
	this.center[1] -= (Math.sin(this.angle) * this.v);
	this.center[0] -= (Math.cos(this.angle) * this.v);
	if (this.x + this.sprite[0].width < 0 || this.y > this.p.screen.h || this.y + this.sprite[0].height < 0 || this.x > this.p.screen.w) {
		this.killMe = true;
	};
};

Enemy.prototype.shoot = function() {
	if (this.p.debugLoop % (this.p.fps * this.fireSpeed) == 0) {
		for (var i=0; i<this.gunDXY.length; i++) {
			this.projectiles.push(new Projectile(this, this.gunDXY[i][0] + this.center[0], this.gunDXY[i][1] + this.center[1], this.currentWeapon, this.angle));
		};
	};
};

Enemy.prototype.hit = function(dmg) {
	this.p.screen.buffBuild.push([
			this.layer
			, this.x + 4
			, this.y + 4
			, this.sprite[0].width - 8
			, this.sprite[0].height - 8
			, 255, 0, 0]);
	this.health -= dmg;
	if (this.health <= 0) {
		this.p.player.kills += 1;
		this.killMe = true;
	};
};

Enemy.prototype.update = function() {
	if (this.killMe == false) {
		this.move();
		this.rotation();
		this.shoot();
		this.render();
	};
	for (var i=0; i<this.projectiles.length; i++) {
		if (this.projectiles[i].killMe) {
			this.projectiles.splice(i,1);
			i = Math.max(i-1,0);
		} else {
			this.projectiles[i].update();
		};
	};
};

Enemy.prototype.rotation = function() {
	this.gunDXY.length = 0;
	for (var i=0; i<this.gunXY.length; i++) {
		var dx = this.gunXY[i][0];
		var dy = this.gunXY[i][1];
		var c = Math.cos(this.angle - toRad(90));
		var s = Math.sin(this.angle - toRad(90));
		var nx = ((dx * c) - (dy * s));
		var ny = ((dx * s) + (dy * c));
		this.gunDXY.push([nx, ny]);
	};
};
	
Enemy.prototype.render = function() {
	this.p.screen.buffBuild.push([this.layer, 's']);
	this.p.screen.buffBuild.push([this.layer
			, this.center[0]
			, this.center[1]
		]);
	this.p.screen.buffBuild.push([this.layer, (this.angle - toRad(90))])
	this.p.screen.buffBuild.push([
			this.layer
			, Math.round(0 - (this.sprite[0].width / 2))
			, Math.round(0 - (this.sprite[0].height / 2))
			, this.sprite[0]
		]);
	this.p.screen.buffBuild.push([this.layer, 'r']);
};