var backObj = document.getElementById("cv_background");
var back = backObj.getContext("2d");
var spritesObj = document.getElementById("cv_sprites");
var sprites = spritesObj.getContext("2d");
var overObj = document.getElementById("cv_overlay");
var over = overObj.getContext("2d");
var gH = 0; //gameHeight
var gW = 0; //gameWidth

var map;

var mouseX;
var mouseY;

var viewX = 0;
var viewY = 0;

var mapI = new Image();
mapI.src = "resources/images/overworld.jpg";
var mark = new Image();
mark.src = "resources/images/townSpot.png";


var debug = "tbs B0.001";
var fps = 5;
var renT;

//var newwindow=window.open('','code','height=240,width=800');
//var tmp = newwindow.document;

function getLocations() {
	var m = $.ajax("resources/php/getLocations.php?s="+sid).success(function(){
		map = m.responseText;
		map = map.split(",");
		render();
	});
}

function drawMap() {
	back.drawImage(mapI,viewX,viewY,gW,gH,0,0,gW,gH);
}

function drawSprites() {
	sprites.clearRect(0,0,gW,gH);
	for (var i = 0; i < locs.length; i++) {
		if (parseInt(map[i])) {
		if (locs[i][0] > viewX-40 && locs[i][0] < viewX+gW+40 && locs[i][1] > viewY-40 && locs[i][1] < viewY+gH+40 ) {
			sprites.drawImage(mark, locs[i][0]-viewX, locs[i][1]-viewY);
		}
		}
	}
}

function drawOverlay() {
	var ta = 1/4*Math.cos(1/720*Math.PI*time)+1/4;
	over.clearRect(0,0,gW,gH); //clear canvas
	over.fillStyle = "rgba(48,0,48,"+ta+")";
	over.fillRect(0,0,gW,gH);
	over.fillStyle = "rgba(0,0,0,.5)";
	over.fillRect(0,gH-25,gW,16);
	over.font = "bold 12px Arial";
	over.textBaseline = "middle";
	over.fillStyle = "rgba(255,255,255,1)";
	over.textAlign = "center";
	if (time%60 < 10) {
		over.fillText(Math.floor(time/60)+":0"+time%60,gW/2,gH-16);
	} else {
		over.fillText(Math.floor(time/60)+":"+time%60,gW/2,gH-16);
	}
	over.textAlign = "left";
	over.fillText(debug,16,16);//debug

	setTimeout(drawOverlay,1000/(fps*2));
}

function resizeCanvas() {
	gW = $(document).width()-256;
	gH = $(document).height();
	backObj.width=gW;
	backObj.height=gH;
	backObj.style.width=gW+"px";
	backObj.style.height=gH+"px";
	spritesObj.width=gW;
	spritesObj.height=gH;
	spritesObj.style.width=gW+"px";
	spritesObj.style.height=gH+"px";
	overObj.width=gW;
	overObj.height=gH;
	overObj.style.width=gW+"px";
	overObj.style.height=gH+"px";
	$("#menuCon").css("height",gH+"px");
}

function mouseBinds() {
	$(document).bind("contextmenu",function(e){ return false; });

	$(window).mousemove(function(e) {
		var w = gW/32;
		var h = gH/32;
		var xo = parseInt(cpos[1]); // X-Offset
		var yo = parseInt(cpos[2]); // Y-Offset

		mouseX = e.pageX;
		mouseY = e.pageY;
		
		debug = (mouseX+viewX)+":"+(mouseY+viewY);
	});
}

function render() {
	drawMap();
	drawSprites();
	renT = setTimeout(render,1000/fps);
}

function moveView() {
	var i = 0;
	if (mouseY > (0) && mouseY < (25)) { viewY-=20; i++; }
	if (mouseY > (gH-25) && mouseY < (gH)) { viewY+=20; i++; }
	if (mouseX > (0) && mouseX < (25)) { viewX-=20; i++; }
	if (mouseX > (gW-25) && mouseX < (gW)) { viewX+=20;i++; }
	if(i) {
		viewX = Math.max(0,Math.min(1000,viewX));
		viewY = Math.max(0,Math.min(1000,viewY));
		clearTimeout(renT);
		render();
	};
	setTimeout(moveView,100);
}

setInterval("time++",60*1000);
$(function(){
	cpos = pos.split("|");
	resizeCanvas();
	mouseBinds();
	$(window).resize(function() { resizeCanvas(); });
	getLocations();
	drawOverlay();
	moveView();
	
});