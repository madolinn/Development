//                  owner, origin x, y, projectile type PROJECTILE[i], angle
function Projectile(owner, x, y, i, angle) {
	this.o = owner;
	this.layer = this.o.projLayer;
	this.parentAngle = angle;
	this.angle = (Math.random() * (toRad(PROJECTILE[i][1]))) + (this.parentAngle - (toRad(PROJECTILE[i][1]/2)));
	this.startV = PROJECTILE[i][2];
	this.v = this.startV + this.o.v;
	this.maxV = PROJECTILE[i][3] + this.o.v;
	this.a = PROJECTILE[i][4] / this.o.p.fps;
	this.sprite = PROJECTILE[i][5];
	this.damage = PROJECTILE[i][8];
	this.r = PROJECTILE[i][6];
	this.homingStr = PROJECTILE[i][7];
	this.x = x - (this.r / 2);
	this.y = y - (this.r / 2);
	this.color = this.o.projColor;
	this.killMe = false;
};

Projectile.prototype.update = function() {
	/*if (this.layer == 8) {
		var dx = this.o.p.player.x - this.x;
		var dy = this.o.p.player.y - this.y;
		var playerAngle = Math.atan2(dy, dx);
		var s = Math.sin(this.angle);
		var ps = Math.sin(playerAngle);
		var c = Math.cos(this.angle);
		var pc = Math.cos(this.angle);
		if (c < pc) {
			if (s < ps) {
				this.angle 
		$('#debug3').html(this.o.projectiles[0].angle + ' | ' + adjust);
	};*/
	this.v = Math.min(this.maxV, this.v + this.a);
	var nY = this.y - (Math.sin(this.angle) * this.v);
	var nX = this.x - (Math.cos(this.angle) * this.v);
	if (nY + this.r < 0 || nY > this.o.p.screen.h || nX + this.r < 0 || nX > this.o.p.screen.w) {
		this.killMe = true;
	} else if (this.collide()) {
		this.killMe = true;
	} else {
		this.y = nY;
		this.x = nX;
		if (this.sprite) {
		
		} else {
			var _r = this.colorMe(0);
			var _g = this.colorMe(1);
			var _b = this.colorMe(2);
			this.o.p.screen.buffBuild.push([this.layer, Math.round(this.x), Math.round(this.y), this.r, this.r, _r, _g, _b, 1]);
		};
	};
};

Projectile.prototype.colorMe = function(i) {
	return Math.floor((255 - this.color[i]) + (this.color[i] * ((this.v - this.startV) / (this.maxV - this.startV))));
};

Projectile.prototype.collide = function() {
	var hit = false;
	if (this.layer == 7) {
		for (var i=0; i<this.o.p.enemy.length; i++) {
			if (this.o.p.enemy[i].killMe == false) {
				if (collisionCheck(this.x, this.y, this.r, this.r
						, this.o.p.enemy[i].x, this.o.p.enemy[i].y
						, this.o.p.enemy[i].sprite[0].width
						, this.o.p.enemy[i].sprite[0].height
					)) {
						this.o.p.enemy[i].hit(this.damage);
						this.o.health = Math.min(100, (this.o.health + (this.damage / 4)));
						hit = true;
						i += this.o.p.enemy.length;
				};
			};
		};
	} else if (this.layer == 8) {
		if (collisionCheck(this.x, this.y, this.r, this.r
				, this.o.p.player.x, this.o.p.player.y
				, this.o.p.player.sprite[0].width
				, this.o.p.player.sprite[0].height
			)) {
				this.o.p.player.hit(this.damage);
				hit = true;
		};
	};
	return hit;
};