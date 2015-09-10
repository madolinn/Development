var io = require('socket.io').listen(11000);
var fs = require('fs');

var db = {monsters : {}, spells : {}};
var rooms = [];

function appendEntry(file) {
	
	fs.readFile(file, {encoding : 'utf8'}, function (err, data) {
	
		if (err) throw err;
		var mon = data.split('\r\n');
		
		db.monsters[mon[0]] = {};
		db.monsters[mon[0]].size = mon[1];
		db.monsters[mon[0]].alignment = mon[2];
		db.monsters[mon[0]].ac = mon[3];
	
	});
	
}

fs.readdir('./DB/', function (err, files) {
	
	for (var f = 0; f < files.length; f++) {
		
		appendEntry('./DB/'+files[f]);
		
		fs.watchFile('./DB/'+files[f], function() {
	
			appendEntry('./DB/'+files[f]);
	
		});
		
	}
	
});



io.sockets.on('connection', function(socket) {
	
	//Shipping
	socket.emit('serveConnected', { motd: "Durp Merp Burp" });
	
	
	//Recieving
	socket.on('disconnect', function() { cleanupRoom(socket); });
	socket.on('tryLogin', function(data) { tryLogin(socket, data.room); });
	socket.on('tryBestiary', function() { tryBestiary(socket); });
	socket.on('tryInfo', function(data) { tryInfo(socket, data); });
	
});

function cleanupRoom(socket) {
	
	console.log("Cleanup");
	
}

function tryLogin(socket, room) {
	
	if (socket.inRoom) { return; }
	
	for (var r = 0; r < rooms.length; r++) {
		
		if (rooms[r].name == room) {

			rooms[r].members.push(socket);
			socket.inRoom = true;
			socket.emit('serveRoomed');
			return;
			
		}
		
	}
	
	
	var mems = [socket];
	rooms.push({name : room, members : mems, dm : socket.id});
	socket.inRoom = true;
	socket.emit('serveRoomed');
	
}

function tryBestiary(socket) {
	
	for (var r = 0; r < rooms.length; r++) {
		
		if (rooms[r].dm == socket.id) {
			socket.emit('serveBestiary', {monsters : mons});
		} else {
			//Only poop out spells and known monsters
			console.log("Room's DM is "+rooms[r].dm+", this guy's is "+socket.id);
		}
	
	}
}

function tryInfo(socket, data) {
	
	for (var r = 0; r < rooms.length; r++) {
		
		if (rooms[r].dm == socket.id) {
			
			if (data.name in db[data.type]) {
				socket.emit('serveInfo', db[data.type][data.name]);
			}
			
		}
	}
	
}