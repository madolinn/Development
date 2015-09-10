function Game() {
	this.startTime = cTime();
	// DEBUG =======
	this.debugLoop = 0;
	this.debug;
	this.debugging = true;
	// =============
	this.screen;
	this.player;
	this.level;
	this.enemy = [];
	this.fps = 60;
	this.interval;
	this.paused = false;
};

Game.prototype.create = function() {
	this.level = new Level(this);
	this.screen = new Screen(this);
	this.player = new Player(this);
	//this.enemy.push(new Enemy(this));
	this.debug = new Debug(this);
	this.run();
};

Game.prototype.run = function() {
	this.paused = false;
	var tick = 0;
	this.interval = setInterval(function() {
		tick += 1;
		if (tick == 1) {
			this.update();
		} else if (tick == 2) {
			this.screen.pushBuffer();
			this.screen.draw();
			this.debugLoop += 1;
			tick = 0;
		} else {
			console.log('WHY ARE WE AT THIS TICK? > ' + this.tick);
		};
	}.bind(this),1000/(this.fps*2));
};

Game.prototype.update = function() {
	this.player.update();
	for (var i=0; i<this.enemy.length; i++) {
		if (this.enemy[i].killMe && this.enemy[i].projectiles.length == 0) {
			this.enemy.splice(i,1);
			i = Math.max(i-1,0);
		} else {
			this.enemy[i].update();
		}
	}
	if (this.enemy.length < this.level.lvl) {
		this.enemy.push(new Enemy(this));
	};
	
	// DEBUG ==========
	if (this.debugging) { this.debug.run(); };
};