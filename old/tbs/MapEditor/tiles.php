<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<html><head>
<script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src = "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js"></script>
<style>
div {
	width: 32px;
	height: 32px;
	position: absolute;
}
#selector {
	-moz-box-shadow: inset 0 0 5px #ff0000;
	-webkit-box-shadow: inset 0 0 5px #ff0000;
	box-shadow: inset 0 0 5px #ff0000;
}
#divCursor {
	-moz-box-shadow: inset 0 0 5px #ccc;
	-webkit-box-shadow: inset 0 0 5px #ccc;
	box-shadow: inset 0 0 5px #ccc;
}
body {
	background-image:url('../resources/images/ts1.png');
}
</style>
</head><body>
<div style='left: 0px; top: 0px;' id="selector"></div>
<div style='left: 0px; top: 0px;' id="divCursor"></div>
<script>
var mouseX;
var mouseY;
<?php echo "var tileSet = ".$_GET['t'].";"; ?>

function mouseBinds() {
	$(document).bind("contextmenu",function(e){ return false; });

	$(window).mousedown(function(e) {
		moveSelector('#selector');
	});
	$(window).mousemove(function(e) {
		mouseX = Math.floor(e.pageX/32)*32;
		mouseY = Math.floor(e.pageY/32)*32;
		moveSelector('#divCursor');
	});
}

function moveSelector(which) {
	$(which).css("left",mouseX)
	.css("top",mouseY);
}

mouseBinds();
</script>
</body></html>