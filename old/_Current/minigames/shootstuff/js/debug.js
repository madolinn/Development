function Debug(g) {
	this.g = g;
	this.debugTime = cTime();
	this.debugFlash = [true, 0.5]; //render, flash duration (seconds)
	this.coords = false;
};

Debug.prototype.run = function() {
	// DO EVERY SECOND
	if (this.g.debugLoop % this.g.fps == 0) {
		this.fps();
	};

	// DO EVERY TICK
	this.flash();	
	this.player();
};

Debug.prototype.fps = function() {
		var t = cTime();
		var ETime = msConv(t - this.g.startTime);
		var LTime = Math.floor((this.g.fps / ((t - this.debugTime) / 1000)) * 10) / 10;			
		$('#debug7').html(ETime[0] + ':' + ETime[1] + ':' + ETime[2] + '.' + ETime[3]);
		//$('#debug8').html();
		$('#debug9').html(LTime);
		this.debugTime = t;
};

Debug.prototype.flash = function() {
	if (this.g.debugLoop % (this.g.fps * this.debugFlash[1]) == 0) {
		if (this.debugFlash[0]) {
			this.debugFlash[0] = false;
		} else {
			this.debugFlash[0] = true;
		};
	};
};

Debug.prototype.player = function() {
	$('#debug1').html('Health: ' + (Math.round(this.g.player.health * 10) / 10));
	this.g.screen.buffBuild.push([
			11
			, 0
			, this.g.screen.h - 16
			, Math.max(0, ((this.g.player.health / 100) * this.g.screen.w))
			, 16
			, 255
			, 0
			, 0
			, 0.6
		]);
	$('#debug2').html('Enemies (-)/(=): ' + this.g.level.lvl);
	if (this.coords) {
		this.g.screen.buffBuild.push([
				this.g.player.layer
				, this.g.player.x + (this.g.player.sprite[0].width/2)
				, this.g.player.y + (3*this.g.player.sprite[0].height/4)
				, "12px monospace", 255, 255, 255, 0.8, "center"
				, this.g.player.x+','+this.g.player.y
				]);
		/*if (this.g.enemy.length > 0) {
			this.g.screen.buffBuild.push([
					this.g.enemy[0].layer
					, this.g.enemy[0].x + (this.g.enemy[0].sprite[0].width/2)
					, this.g.enemy[0].y + (3*this.g.enemy[0].sprite[0].height/4)
					, "12px monospace", 255, 255, 255, 0.8, "center"
					, PROJECTILE[this.g.enemy[0].currentWeapon][0]
					]);
		};*/
		
		// ===================================================================================
		// ================================ START PROJECTILE =================================
		// ===================================================================================
		var pad = 4;
		if (this.g.player.projectiles[0]) {
			$('#debug8').html(this.g.screen.h - this.g.player.projectiles[0].r - (pad * 2));
			this.g.screen.buffBuild.push([
					this.g.player.projectiles[0].layer
					, 0 + this.g.player.projectiles[0].r + (pad * 4)
					, this.g.screen.h - pad
					, "12px monospace", 255, 255, 255, 1, "left"
					, Math.round(this.g.player.projectiles[0].x) + ','
					+ Math.round(this.g.player.projectiles[0].y)
					]);
		};
		if (this.debugFlash[0]) {
			if (this.g.player.projectiles[0]) {
				this.g.screen.buffBuild.push([
						this.g.player.projectiles[0].layer
						, Math.round(this.g.player.projectiles[0].x) - pad
						, Math.round(this.g.player.projectiles[0].y) - pad
						, this.g.player.projectiles[0].r + (pad * 2)
						, this.g.player.projectiles[0].r + (pad * 2)
						, Math.max(255 - this.g.player.projColor[0], 110)
						, Math.max(255 - this.g.player.projColor[1], 110)
						, Math.max(255 - this.g.player.projColor[2], 110)
						]);
				this.g.screen.buffBuild.push([
						this.g.player.projectiles[0].layer
						, 0 + pad
						, this.g.screen.h - this.g.player.projectiles[0].r - (pad * 3)
						, this.g.player.projectiles[0].r + (pad * 2)
						, this.g.player.projectiles[0].r + (pad * 2)
						, Math.max(255 - this.g.player.projColor[0], 110)
						, Math.max(255 - this.g.player.projColor[1], 110)
						, Math.max(255 - this.g.player.projColor[2], 110)
						]);
			};
		};
		// ===================================================================================
		// =============================== END PROJECTILE ====================================
		// ===================================================================================
		
	} else {
		this.g.screen.buffBuild.push([
				this.g.player.layer
				, this.g.player.x + (this.g.player.sprite[0].width/2)
				, this.g.player.y + (3*this.g.player.sprite[0].height/4)
				, "12px monospace", 255, 255, 255, 0.8, "center"
				, PROJECTILE[this.g.player.currentWeapon][0] + '\n' + this.g.player.cd[this.g.player.currentWeapon]
				]);
	};
};