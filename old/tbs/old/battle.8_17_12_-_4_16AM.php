<html>
<head>
<link rel="stylesheet" type="text/css" href="../style.css" />
<script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src = "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js"></script>
<style>
html {
	height:100%;
}
</style>
</head>
<body>
<canvas id="game"></canvas>

<script type="text/javascript"><!--
var ts = new Image();
var map;
var mapT; //map tile image array
var mapB; //map tile behavior array
var m = 9; //map number
var tsN = 1; //tileset number
var tileSize = 32; //tile size per client
var fps = 30; //fps as per client
var pi = Math.PI;
<?php
	$ta = getdate();
	echo "var time = ".($ta[hours]*60+$ta[minutes]).";\n";
?>
setInterval("time++",60*1000);
function loadMap() {
	var turds = $.get(m+".map").success(function() {
		map = turds.responseText;
		ts.src = "ts"+tsN+".png"; //current map tileset
		mapT = map.split("|");
		var l = mapT.length;
		var pee = 0;
		while (pee < l) {
			mapT[pee]=mapT[pee].split(",");
			pee++;
		}
		map = mapT;

		drawMap();
		
	});
}
function drawMap() {
	var c = gW/tileSize; //number of columns available on screen to render
	var r = gH/tileSize; //number of rows available on screen to render
	var drawY = 0; //current tile y coord
	var drawX = 0; //current tile x coord
	var tile = 0;
	game.clearRect(0,0,gW,gH); //clear canvas
	for (var drawY = 0; drawY < Math.min(r,map.length); drawY++) {
		for (var drawX = 0; drawX < Math.min(c,map[0].length); drawX++) {
			var tile = map[drawY][drawX];
			game.drawImage(ts,
					(tile%24)*tileSize,
					Math.floor(tile/24)*tileSize,
					tileSize,
					tileSize,
					tileSize*drawX,
					tileSize*drawY,
					tileSize,
					tileSize);
		}
	}
	var ta = 1/4*Math.cos(1/12*pi*time)+1/4;
	game.fillStyle = "rgba(48,0,48,"+ta+")";
	game.fillRect(0,0,gW,gH);
	game.font = "bold 12px Arial";
	game.textBaseline = "middle";
	game.fillStyle = "rgba(255,255,255,1)";
	if (time%60 < 10) {
		game.fillText(Math.floor(time/60)+":0"+time%60,gW/2,gH-16);
	} else {
		game.fillText(Math.floor(time/60)+":"+time%60,gW/2,gH-16);
	}
	setTimeout(drawMap,1000/fps);
}
var gameObj = document.getElementById("game");
var game = gameObj.getContext("2d");
var gH = 0; //gameHeight
var gW = 0; //gameWidth
function resizeCanvas() {
	var tW = $(document).width();
	gW = tW-tW%tileSize;
	var tH = $(document).height();
	gH = tH-tH%tileSize;
	gameObj.width=gW;
	gameObj.height=gH;
	gameObj.style.width=gW+"px";
	gameObj.style.height=gH+"px";
}

$(function(){
	resizeCanvas();
	loadMap();
	$(window).resize(function() {
		resizeCanvas();
	});
});//--></script>

</body>
</html>