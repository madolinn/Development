var gameObj = document.getElementById("game");
var game = gameObj.getContext("2d");
var dudeObj = document.getElementById("dude");
var dude = dudeObj.getContext("2d");
var overObj = document.getElementById("over");
var over = overObj.getContext("2d");
var gH = 0; //gameHeight
var gW = 0; //gameWidth

var map;
var chars;
var cpos = new Array();
var canMove = true;
var animTime = 0;
setInterval("animTime = Math.abs(animTime-1)",500);

var ts = new Image();
ts.src = "resources/images/ts1.png";
var CHAR_IMG = new Image();
CHAR_IMG.src = "resources/images/charTEST.png";

var mouseX;
var mouseY;


var debug = "tbs B0.001";
var fps = 5;

//var newwindow=window.open('','code','height=240,width=800');
//var tmp = newwindow.document;

function loadMap() {
	var lm = $.get("resources/maps/"+cpos[0]+".map").success(function() {
		map = lm.responseText;
		map = map.split("|");
		for (var i = 0; i < map.length; i++) {	map[i] = map[i].split(","); }
		init();	
	});
}

function drawMap() {
	var w = gW/32;
	var h = gH/32;
	var xo = parseInt(cpos[1]); // X-Offset
	var yo = parseInt(cpos[2]); // Y-Offset
	var tile = 0;
	game.clearRect(0,0,gW,gH);
	for (var xx = 0; xx < w; xx++) {
		for (var yy = 0; yy < h; yy++) {
			if ((xo-(Math.floor(w/2))+xx) < map.length && (xo-(Math.floor(w/2))+xx) > -1) {
				if ((yo-(Math.floor(h/2))+yy) < map[0].length && (yo-(Math.floor(h/2))+yy) > -1) {
					var tile = Math.floor(map[xo-(Math.floor(w/2))+xx][yo-(Math.floor(h/2))+yy]);
					var alt = Math.floor((map[xo-(Math.floor(w/2))+xx][yo-(Math.floor(h/2))+yy]%1)*100);
					if (tile > 215) { var animated = 1; } else { var animated = 0; };
					//if (tile >
					game.drawImage(ts,
						(tile%18)*32+(animTime*96*animated),
						Math.floor(tile/18)*32,
						32,
						32,
						32*(xx),
						32*(yy),
						32,
						32);
					if (alt>0) {
						var co = (127.5*(2*sign(alt-50)));
						var al = (Math.abs(alt-50)*.05);
						game.fillStyle = "rgba("+co+","+co+","+co+","+al+")";
						game.fillRect(32*(xx),32*(yy),32,32);
					}
				}
			}
		}
	}
}

function getChars() {
	//name,map,x,y
	var gc = $.get("resources/php/getCharsOnMap.php?m="+cpos[0]).success(function() {
		chars = gc.responseText.split("|");
		chars.pop(); // Remove the empty char holder
		for (var i = 0; i < chars.length; i++) {
			chars[i] = chars[i].split(",");
		}
		setTimeout(getChars,1000/5);
	});
}

function drawChars() {
	if (chars) {
		dude.clearRect(0,0,gW,gH);
		dude.font = "bold 12px Arial";
		dude.textBaseline = "middle";
		dude.fillStyle = "rgba(255,255,255,1)";
		dude.textAlign = "center";
		var w = gW/32;
		var h = gH/32;
		var xo = parseInt(cpos[1]); // X-Offset
		var yo = parseInt(cpos[2]); // Y-Offset
		var nameTag = new Array();
		for (var i = 0; i < chars.length; i++) {
			nameTag.push(chars[i]);
			if (chars[i][0]!=user) {
				dude.drawImage(CHAR_IMG,
					32,
					32,
					32,
					32,
					(Math.floor(w/2)*32)+((chars[i][2]-xo)*32),
					(Math.floor(h/2)*32)+((chars[i][3]-yo)*32),
					32,
					32);
			} else {
				dude.drawImage(CHAR_IMG,
					32,
					32,
					32,
					32,
					(Math.floor(w/2)*32),
					(Math.floor(h/2)*32),
					32,
					32);
			}

		}
		for (var i = 0; i < nameTag.length; i++) {
			if (nameTag[i][0]!=user) {
				dude.fillText(nameTag[i][0],
					(Math.floor(w/2)*32)+((nameTag[i][2]-xo)*32)+16,
					(Math.floor(h/2)*32)+((nameTag[i][3]-yo)*32)-8);
			} else {
				dude.fillText(nameTag[i][0],
					(Math.floor(w/2)*32+16),
					(Math.floor(h/2)*32)-8);
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

	over.strokeStyle = "rgba(0,80,202,.5)";
	over.lineWidth = 2;
	over.beginPath();
	over.moveTo(mouseX,mouseY);
	over.lineTo(mouseX+32,mouseY);
	over.lineTo(mouseX+32,mouseY+32);
	over.lineTo(mouseX,mouseY+32);
	over.lineTo(mouseX,mouseY);
	over.stroke();
	

	setTimeout(drawOverlay,1000/(fps*2));
}
function resizeCanvas() {
	gW = $(document).width()-256;
	gH = $(document).height();
	gameObj.width=gW;
	gameObj.height=gH;
	gameObj.style.width=gW+"px";
	gameObj.style.height=gH+"px";
	dudeObj.width=gW;
	dudeObj.height=gH;
	dudeObj.style.width=gW+"px";
	dudeObj.style.height=gH+"px";
	overObj.width=gW;
	overObj.height=gH;
	overObj.style.width=gW+"px";
	overObj.style.height=gH+"px";
	$("#menuCon").css("height",gH+"px");
}
function keyBinds() {
	$(window).keydown(function(e) {
		if (canMove == true) {
			switch (e.which){
				case 65: //a 97 press
					move(-1,0);
					break;
				case 83: //s 115 press
					move(0,+1);
					break;
				case 68: //d 100 press
					move(1,0);
					break;
				case 87: //w 119 press
					move(0,-1);
					break;
			}
		}
	});
}

function mouseBinds() {
	$(document).bind("contextmenu",function(e){ return false; });

	$(window).mousemove(function(e) {
		var w = gW/32;
		var h = gH/32;
		var xo = parseInt(cpos[1]); // X-Offset
		var yo = parseInt(cpos[2]); // Y-Offset

		mouseX = Math.floor(e.pageX/32)*32;
		mouseY = Math.floor(e.pageY/32)*32;

	});
}

function move(vx,vy) {
	var dest = cpos.slice(0);
	dest[1] = parseInt(dest[1])+vx;
	dest[2] = parseInt(dest[2])+vy;
	dest = dest.join("|");
	var result = $.ajax("resources/php/move.php?u="+user+"&k="+kid+"&d="+dest).success(function() {
		if (result.responseText == "good") {
			canMove=false;
			setTimeout("canMove=true",1000/3);
			cpos = new Array();
			cpos = dest.split("|");
		}
	});
}

function init() {
	getChars();
	renderGame();
	drawOverlay();
}

function renderGame() { //Calling at the same time /helps/ prevents a 'desync' between chars and map, prevent people from snapping back to the spot they are actually in.
	drawMap();
	drawChars();
	setTimeout(renderGame,1000/fps);
}

setInterval("time++",60*1000);
$(function(){
	cpos = pos.split("|");
	resizeCanvas();
	loadMap();
	keyBinds();
	mouseBinds();
	$(window).resize(function() { resizeCanvas(); });
});