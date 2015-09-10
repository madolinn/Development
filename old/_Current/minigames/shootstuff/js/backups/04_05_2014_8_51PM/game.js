function Game() {
	this.debugLoop = 0;
	this.screen;
	this.player;
	this.level;
	this.enemy = [];
	this.fps = 60;
	this.tick = 0; //maths, pop, push, draw?
};

Game.prototype.create = function() {
	this.screen = new Screen(this);
	this.player = new Player(this);
	this.level = new Level();
	this.run();
};

Game.prototype.run = function() {
	setInterval(function() {
		this.tick += 1;
		if (this.tick == 1) {
			this.update();
		} else if (this.tick == 2) {
			this.screen.pushBuffer();
			this.screen.draw();
			this.debugLoop += 1;
			this.tick = 0;
		} else {
			console.log('WHY ARE WE AT THIS TICK? > ' + this.tick);
		};
	}.bind(this),1000/(this.fps*2));
};

Game.prototype.update = function() {
	this.player.update();
	if (this.debugLoop % 64 == 0) {
		$('#debug1').html('Loops done: ' + this.debugLoop);
	};
	/*for (var i=0; i<this.enemy.length; i++) {
		this.enemy[i].update();
	};*/
};

function Screen(parent) {
	this.h = 600;
	this.w = 800;
	this.p = parent;
	this.can = [];
	this.buffBuild = [];
	this.buffCurrent = [];
	/* BUFFER FORMAT
		can, x, y, image (4)
		0    1  2  3
			OR
		can, x, y, w, h, image (6)
		0    1  2  3  4  5
			OR
		can, x, y, w, h, r, g, b (8)
		0    1  2  3  4  5  6  7
			OR
		can, x, y, w, h, r, g, b, a (9)
		0    1  2  3  4  5  6  7  8
			OR
		can, x, y, font, r, g, b, a, align, text (10)
		0    1  2  3     4  5  6  7  8      9
	*/
	this.createCanvasContexts();
};

Screen.prototype.createCanvasContexts = function() {
	var me = this;
	$('canvas').each(function(index) {
		me.can[index] = $(this)[0].getContext('2d');
	});
	//temp bg
	this.can[0].fillStyle = 'rgba(50,50,50,1)';
	this.can[0].fillRect(0,0,this.w,this.h);
};

Screen.prototype.pushBuffer = function() {
	this.buffCurrent.length = 0;
	this.buffCurrent = this.buffBuild.slice(0);
	this.buffBuild.length = 0;
};

Screen.prototype.draw = function() {
	//wipe turds
	this.can[1].clearRect(0,0,this.w,this.h);
	this.can[2].clearRect(0,0,this.w,this.h);
	this.can[3].clearRect(0,0,this.w,this.h);
	this.can[4].clearRect(0,0,this.w,this.h);
	this.can[5].clearRect(0,0,this.w,this.h);
	this.can[6].clearRect(0,0,this.w,this.h);
	this.can[7].clearRect(0,0,this.w,this.h);
	//draw
	for (var i=0; i<this.buffCurrent.length; i++) {
		var b = this.buffCurrent[i];
		switch(b.length) {
			case 4:
				this.can[b[0]].drawImage(b[3], b[1], b[2]);
				break;
			case 6:
				this.can[b[0]].drawImage(b[5], b[1], b[2], b[3], b[4]);
				break;
			/*case 8:
				this.can[b[0]].fillStyle = 'rgb(' + b[5] + ',' + b[6] + ',' + b[7] + ')';
				this.can[b[0]].fillRect(b[1], b[2], b[3], b[4]);
				break;*/
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
};

function Player(parent) {
	this.sprite = [];
	this.sprite[0] = new Image();
	this.sprite[0].src = './img/ship.png';
	this.sprite[1] = new Image();
	this.sprite[1].src = './img/thruster.png';
	this.layer = 2;
	this.p = parent;
	this.x;
	this.y;
	this.gunXY = [[16, 8], [48, 8]];
	this.projectiles = [];
	this.bindMouse();
};

Player.prototype.bindMouse = function() {
	var me = this;
	$(window).mousemove(function(event) {
		me.moveShip(event);
	});
	$(window).mousedown(function(event) {
		me.shoot(event);
	});
	$(window).click(function(event) {
		event.preventDefault();
	});
	$('#canUIOverlay').mouseover(function(event) {
		$('#canUIOverlay').css('cursor', 'none');
	});
	$('#canUIOverlay').mouseout(function(event) {
		$('#canUIOverlay').css('cursor', 'default');
	});
};

Player.prototype.moveShip = function(event) {
	var mX = event.pageX - $('#canUIOverlay').offset().left - (this.sprite[0].width/2);
	mX = Math.max(0 - (this.sprite[0].width/2), Math.min(mX, this.p.screen.w - (this.sprite[0].width/2)));
	var mY = event.pageY - $('#canUIOverlay').offset().top - (this.sprite[0].height/2);
	mY = Math.max(0 - (this.sprite[0].height/2), Math.min(mY, this.p.screen.h - (this.sprite[0].height/2)));
	this.x = mX;
	this.y = mY;
};

Player.prototype.shoot = function(event) {
	if (event.which == 1) {
		for (var i=0; i<this.gunXY.length; i++) {
			this.projectiles.push(new Projectile(this, this.x + this.gunXY[i][0], this.y + this.gunXY[i][1]));
		};
	};
	if (event.which == 2) {
		
	};
	if (event.which == 3) {
		
	};
};

Player.prototype.update = function() {
	for (var i=0; i<this.projectiles.length; i++) {
		if (this.projectiles[i].killMe) {
			this.projectiles.splice(i,1);
			i = Math.max(i-1,0);
		} else {
			this.projectiles[i].update();
		}
	}
	this.p.screen.buffBuild.push([this.layer, this.x, this.y, this.sprite[0]]);
	this.p.screen.buffBuild.push([this.layer, this.x + (this.sprite[0].width/2), this.y + (3*this.sprite[0].height/4), "12px monospace", 255, 255, 255, 0.8, "center", this.x+','+this.y]);
};

function Projectile(owner, x, y) {
	this.o = owner;
	this.x = x;
	this.y = y;
	this.layer = 1;
	this.degree = (Math.random()*20)+80;
	this.rad = this.degree*(Math.PI/180);
	this.v = 2;
	this.sprite;
	this.killMe = false;
};

Projectile.prototype.update = function() {
	var nY = this.y - (Math.sin(this.rad) * this.v);
	var nX = this.x - (Math.cos(this.rad) * this.v);
	if (nY < 0 || nY > this.o.p.screen.h || nX < 0 || nX > this.o.p.screen.w) {
		this.killMe = true;
	} else {
		this.y = nY;
		this.x = nX;
		this.o.p.screen.buffBuild.push([this.layer, this.x, this.y, 4, 4, 255, 255, 255, 1]);
	};
};

Projectile.prototype.kill = function() {
	delete this;
};

function Level() {
	this.number = 1;
};

Level.prototype.setup = function() {
	
};