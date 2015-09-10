game = {};

function cTime() {
	var time = new Date();
	return time.getTime();
};

function msConv(ms) {
	var ot = ms;
	var h = Math.floor(ms / 3600000);
	ms -= h * 3600000;
	var m = Math.floor(ms / 60000);
	ms -= m * 60000;
	var s = Math.floor(ms / 1000);
	ms -= s * 1000;
	return [h, m, s, ms, ot];
};

function toRad(deg) {
	var rad = deg * (Math.PI / 180);
	return rad;
};

function relativeToCenter(me) {
	var newGunXY = [];
	for (var i=0; i<me.gunXY.length; i++) {
		newGunXY.push([
				(me.gunXY[i][0] + me.x) - me.center[0]
				, (me.gunXY[i][1] + me.y) - me.center[1]
			]);
	};
	me.gunXY.length = 0;
	me.gunXY = newGunXY;
};

function collisionCheck(ax, ay, aw, ah, bx, by, bw, bh) {
	var collided = false;
	if (ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by) {
		collided = true;
	};
	return collided;
};

$(function startUp() {
	game = new Game();
	game.create();
	//game.run();
});