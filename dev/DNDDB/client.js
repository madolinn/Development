var socket = io.connect('http://localhost:11000');

socket.on('serveConnected', function(data) {
	
	$("#login").css("display","block");
	$("#login_motd").html(data.motd);
	
});

socket.on('serveRoomed', function() {
	
	$("#room").slideDown(1000);
	$("#login").slideUp(300);
	
});

socket.on('serveBestiary', function() {
	
	$
	
}

function loginSubmit() {

	var r = $("#login_room").val();
	if (r == "" || r == "Room ID") { return; }
	socket.emit('tryLogin', { room : r });
	
}

$(function() {
	
	$('#room_tab_bestiary').click(function() {
		
		socket.emit('tryBestiary');
		alert("ok");
		
	});
	
});