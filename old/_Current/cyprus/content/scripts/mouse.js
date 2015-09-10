function mouseClick(e) {

	if (e.which == 3) {
	
		var ex = e.clientX - $("#wrapper").offset().left - ($("#wrapper").width()/2);
		var ey = e.clientY - $("#wrapper").offset().top - ($("#wrapper").height()/2);
		socket.emit("CL_playerMove", [ex,ey]);
	
	}

}

$(function() {

	$("canvas").mousedown(function(e) { mouseClick(e); });

});