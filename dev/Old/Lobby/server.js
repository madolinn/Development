var io = require('socket.io').listen(11000);

var rooms = {};
var rindex = 0;

io.set("log level", 2);

io.sockets.on('connection', function(socket) {

	socket.join('lobby');
	
	socket.on('joinRoom', function(data) { joinRoom(socket, data); });
	socket.on('createRoom', function(data) { createRoom(socket, data); });
	socket.on('getRooms', function(data) { dishRooms(socket, data); });
	
});

function dishRooms(cl, data) {
	
	var filter = data.filter;
	var r = {};
	for (i in rooms) {
		if (i != "/lobby" && i != "") {
			r[i] = {};
			r[i].members = rooms[i].members;
			r[i].name = rooms[i].name;
			r[i].size = (r[i].members.length)+"/"+(rooms[i].size);
		}
	}
	cl.emit('getRooms',r);
	
}

function createRoom(cl, data) {

	var name = data.name;
	var size = Math.max(parseInt(data.size),2);

	rindex++;
	cl.join(rindex);
	updateRooms();
	rooms["/"+rindex].name = name;
	rooms["/"+rindex].size = size;
	
	cl.emit('chatMessage',"#SERVER: Room "+name+" has successfully been created of size "+size+".");
}

function joinRoom(cl, room) {

	if (rooms["/"+room] != undefined) {
		if (rooms["/"+room].members.length == rooms["/"+room].size) {
			cl.join(room);
			updateRooms();
		} else {
			cl.emit('chatMessage',"#SERVER: That room is full.");
		}
	} else {
		cl.emit('chatMessage',"#SERVER: That room is no longer available.");
	}
	
}

function updateRooms() {

	var mr = io.sockets.manager.rooms;
	for (cr in rooms) {	rooms[cr].passCheck = false; }
	for (ur in mr) {
		if (rooms[ur]) { rooms[ur].passCheck = true; } else { rooms[ur] = {}; rooms[ur].members = mr[ur]; rooms[ur].passCheck = true; }		
	}
	for (cr in rooms) { if (rooms[cr].passCheck == false) { delete rooms[cr]; } }
	
}