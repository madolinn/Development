//Set up server on port.
var io = require('socket.io').listen(11000);

// io.set("log level", 2); :: To get rid of annoying debug level messages. Not very helpful.

//On Socket Connect, set up event catchers.
io.sockets.on('connection', function(socket) {
	
	//socket.on('clInput', function(data) { }); :: Custom event. Holds {data} object passed by the client. Can be an actual object or value.
	//socket.on('disconnect', function() { }); :: Standard on Client Disconnect.
	
	socket.emit("SayHello", {from: "Server", msg: "Please go away<img src = 'Untitled.png'>"});
	
});