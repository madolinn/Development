//Connect to server on port
var socket = io.connect('http://localhost:11000');

socket.on('connect', function() {

	//Doesn't NEED to do anything here. Server knows you're connected.
	$("body").append("<br>Connected." + "<br>");

});

socket.on('SayHello', function(data) {

	$("body").append(data.from + ": " + data.msg + "<br>");

});