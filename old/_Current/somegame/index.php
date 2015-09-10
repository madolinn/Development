<html><head><title>Some Game Probably</title>

<?php 
error_reporting(E_ERROR | E_PARSE);
$opt = stream_context_create(array('http' => array('timeout' => .1 )));
if(file_get_contents("http://10.0.0.2:1337", 0, $opt) === false) { echo "Game is down right now :("; } else { ?>

<script src='http://tsunamidry.dyndns.org:1340/socket.io/socket.io.js'></script>
<script src='http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'></script>
<script src='scripts/map.js'></script>
<script src='scripts/input.js'></script>
<script src='scripts/main.js'></script>
<link rel='stylesheet' type='text/css' href='css/default.css'>
</head><body>
<div class='container'>
	<canvas id='canBack' width='800' height='600'></canvas>
	<canvas id='canMid' width='800' height='600'></canvas>
	<canvas id='canFore' width='800' height='600'></canvas>
	<canvas id='canOverlay' width='800' height='600'></canvas>
	<canvas id='canUIBack' width='800' height='600'></canvas>
	<canvas id='canUIMid' width='800' height='600'></canvas>
	<canvas id='canUIFore' width='800' height='600'></canvas>
	<canvas id='canUIOverlay' width='800' height='600'></canvas>
	<div class='debug'>
		<p id='debug1'></p>
		<p id='debug2'></p>
		<p id='debug3'></p>
		<p id='debug4'></p>
		<span id='debug5'>Coords</span>
	</div>
</div>
<script>
$('span#debug5').click(function() {
	if (coords == true) {
		coords = false;
	} else {
		coords = true;
	}
});
</script>
<div id = "preloader"></div>

<?php } ?>

</body></html>