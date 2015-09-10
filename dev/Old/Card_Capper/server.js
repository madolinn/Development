var clients = {};
var cards = [];
var dishedcards = [];

makecards();

var io = require('socket.io').listen(11000);

io.sockets.on('connection', function(socket) {

	clients[socket.id] = socket;
	
	socket.on('disconnect', function () {
		delete clients[socket.id];
	});
	
	setdishedcards();
	socket.emit('updatecards', dishedcards);
	
	socket.on('movecard', function (data) {
		movecard(data.ind,data.loc);
	});
});

function setdishedcards() {
	delete dishedcards;
	for (var i = 0; i < 10; i++) {
	
		dishedcards[i] = {name: "Card"+i, stats: [0,0,0,0], x:-1, y:-1};
		for (var z = 0; z < 4; z++) {
			if (z != 1) {
				dishedcards[i].stats[z] = Math.floor((cards[i].stats[z]-1)/16);
			}
		}
		dishedcards[i].stats[1] = cards[i].stats[1];
		dishedcards[i].x = cards[i].x;
		dishedcards[i].y = cards[i].y;
		dishedcards[i].dir = cards[i].dir.slice(0);
		dishedcards[i].owner = cards[i].owner;
		
		dishedcards[i].stats = dishedcards[i].stats.join("");
	}
}

function cardbattle(ind) {
	
	for (var i = 0; i < 8; i++) {
		if (cards[ind].dir[i] == 1) {
		
			if (i == 0) { var d = [-1,-1]; }
			if (i == 1) { var d = [0,-1]; }
			if (i == 2) { var d = [1,-1]; }
			if (i == 3) { var d = [1,0]; }
			if (i == 4) { var d = [1,1]; }
			if (i == 5) { var d = [0,1]; }
			if (i == 6) { var d = [-1,1]; }
			if (i == 7) { var d = [-1,0]; }
			
			for (var z = 0; z < 10; z++) {
				if (cards[z].x == cards[ind].x+d[0] && cards[z].y == cards[ind].y+d[1]) {
					if (cards[z].owner != cards[ind].owner) {
					
							// 0 1 2
							// 7 . 3
							// 6 5 4
					
						if (i == 0) { var r = 4 }
						if (i == 1) { var r = 5; }
						if (i == 2) { var r = 6; }
						if (i == 3) { var r = 7; }
						if (i == 4) { var r = 0; }
						if (i == 5) { var r = 1; }
						if (i == 6) { var r = 2; }
						if (i == 7) { var r = 3; }
						
						if (cards[z].dir[r] == 1) {
							if (cards[ind].stats[1] == 0) {
								var s = 2;
							}
							if (cards[ind].stats[1] == 1) {
								var s = 3;
							}
							//if (cards[ind].stats[0]
						} else {
							cards[z].owner = cards[ind].owner;
						}
					}
				}
			}
		}
	}
}

function movecard(ind, loc) {
	if (loc[0] > 0 && loc[0] < 400 && loc[0] > 0 && loc[0] < 400) {
		if (cards[ind].x == -2) {
			var obstructed = false;
			for (var i = 0; i < 10; i++) {
				if (cards[i].x == Math.floor(loc[0]/100) && cards[i].y == Math.floor(loc[1]/100)) { obstructed = true; }
			}
			if (!obstructed) {
				cards[ind].x = Math.floor(loc[0]/100);
				cards[ind].y = Math.floor(loc[1]/100);
			}
		}
		cardbattle(ind);
		setdishedcards();
		io.sockets.emit('updatecards', dishedcards);
	}
}

function makecards() {
	for (var i = 0; i < 10; i++) {
		cards[i] = {name: "Card "+i, stats: [Math.floor(Math.random()*16)+1,Math.floor(Math.random()*2),Math.floor(Math.random()*16)+1,Math.floor(Math.random()*16)+1], x: -2, y: -2, dir: [0,0,0,0,0,0,0,0], owner:Math.floor(i/5)};
		for (var z = 0; z < 8; z++) {
			cards[i].dir[z] = (0 == Math.floor(Math.random()*3));
		}
	}
};