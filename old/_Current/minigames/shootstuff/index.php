<html><head><title>Shoot Stuff And Stuff.</title>
<script src='http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'></script>
<script src='js/static.js'></script>
<script src='js/ships.js'></script>
<script src='js/game.js'></script>
<script src='js/screen.js'></script>
<script src='js/player.js'></script>
<script src='js/enemy.js'></script>
<script src='js/projectile.js'></script>
<script src='js/level.js'></script>
<script src='js/debug.js'></script>
<script src='js/main.js'></script>
<link rel='stylesheet' type='text/css' href='css/default.css'>
</head><body>
<div class='container'>
	<canvas class='gameCanvas' id='canBackA' width='800' height='700'></canvas>
	<canvas class='gameCanvas' id='canBackB' width='800' height='700'></canvas>
	<canvas class='gameCanvas' id='canBackC' width='800' height='700'></canvas>
	<canvas class='gameCanvas' id='canEnemyA' width='800' height='700'></canvas>
	<canvas class='gameCanvas' id='canEnemyB' width='800' height='700'></canvas>
	<canvas class='gameCanvas' id='canPlayerA' width='800' height='700'></canvas>
	<canvas class='gameCanvas' id='canPlayerB' width='800' height='700'></canvas>
	<canvas class='gameCanvas' id='canProjectileA' width='800' height='700'></canvas>
	<canvas class='gameCanvas' id='canProjectileB' width='800' height='700'></canvas>
	<canvas class='gameCanvas' id='canUIA' width='800' height='700'></canvas>
	<canvas class='gameCanvas' id='canUIB' width='800' height='700'></canvas>
	<canvas class='gameCanvas' id='canUIC' width='800' height='700'></canvas>
	<canvas class='gameCanvas' id='inputCapture' width='800' height='700'></canvas>
	<div class='debug'>
		<p id='debug1'></p>
		<p id='debug2'></p>
		<p id='debug3'></p>
		<p id='debug4'></p>
		<span id='debug5'>Debug</span>
		<span id='debug6'>Coords</span>
		<span id='debug7'>---</span>
		<span id='debug8'>---</span>
		<span id='debug9'>---</span>
	</div>
</div>
<script>
$('span#debug5').click(function() {
	if (game.debugging == true) {
		game.debugging = false;
		$(this).css('background', '#551111');
	} else {
		game.debugging = true;
		$(this).css('background', '#115511');
	}
});
$('span#debug6').click(function() {
	if (game.debug.coords == true) {
		game.debug.coords = false;
		$(this).css('background', '#551111');
	} else {
		game.debug.coords = true;
		$(this).css('background', '#115511');
	}
});
</script>
<div id = "preloader"></div>

</body></html>