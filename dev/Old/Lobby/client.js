var socket = io.connect('http://10.0.0.4:11000');

socket.on('connect', function() {

	socket.emit('createRoom',{name: "Durp", size:2});
	socket.emit('joinRoom',"1");
	socket.emit('getRooms',"");
	
});

socket.on('chatMessage', function(data) {

	$("#wrapper").append(data+"<br>");
	
});

socket.on('getRooms', function(data) {

	for (i in data) {
		$("#wrapper").append("<br>Room ID: "+i+"<br>Room Name: "+data[i].name+"<br>Members: "+data[i].members+"<br>Occupants: "+data[i].size);
	}

});