//$.ajax("/resources/php/move.php?u="+username+"&k="+kid+"&d="+destination);
var ts = new Image();
var CHAR_IMG = new Image();
var map;
var mapT; //map tile image array
//var mapB; //map tile behavior array
var tsN = 1; //tileset number
var fps = 5; //fps as per client
var pi = Math.PI;
var debug; //debug
var p;
var gameObj = document.getElementById("game");
var game = gameObj.getContext("2d");
var dudeObj = document.getElementById("dude");
var dude = dudeObj.getContext("2d");
var overObj = document.getElementById("over");
var over = overObj.getContext("2d");
var gH = 0; //gameHeight
var gW = 0; //gameWidth
var m;
var peeps;
var canMove = true;
var charIndex = [1,0]; //x,y index of char image y: 0=S 1=W 2=E 3=N
var walkStep = 0; //step of walk animation
var animMod = 0; //animation index
var walkTimer;
var offX;
var offY;
var nameTag = new Array();

var newwindow=window.open('','code','height=240,width=800');
var tmp = newwindow.document;

function loadMap() {
	var mp = pos.split("|");
	m = mp[0];
	var turds = $.get("resources/maps/"+m+".map").success(function() {
		map = turds.responseText;
		ts.src = "resources/images/ts"+tsN+".png"; //current map tileset
//===============================================================================================
		CHAR_IMG.src = "resources/images/charTEST.png";
//===============================================================================================
		var mapT = map.split("|");
		var l = mapT.length;
		var pee = 0;
		while (pee < l) {
			mapT[pee]=mapT[pee].split(",");
			pee++;
		}
		map = mapT;
		renderGame(); //go!
	});
}
function drawMap() {
	var c = gW/32; //number of columns available on screen to render
	var r = gH/32; //number of rows available on screen to render
	var drawY = 0; //current tile y coord
	var drawX = 0; //current tile x coord
	var tile = 0;
	if(peeps) { var get = pos.split("|"); var px = parseInt(get[1]); var py = parseInt(get[2]); offX = px - c; offY = py - r; } else { offX = 0; offY = 0; }
	game.clearRect(0,0,gW,gH); //clear canvas
	for (var drawY = 0; drawY < Math.min(r,map.length); drawY++) {
		for (var drawX = 0; drawX < Math.min(c,map[0].length); drawX++) {
			var tile = map[drawY][drawX];
			game.drawImage(ts,
					(tile%24)*32,
					Math.floor(tile/24)*32,
					32,
					32,
					32*(drawX-offX),
					32*(drawY-offY),
					32,
					32);
		}
	}
	setTimeout(drawMap,1000/fps);
}

function renderGame() {
	drawMap();
	getDudes();
	drawDudes();
	drawOverlay();
}
function getDudes() {
	if (peeps) {
		var l = peeps.length;
		var preX = new Array();
		var preY = new Array();
		for (var pee = 0; pee < l - 1; pee++) {
			preX[pee] = parseInt(peeps[pee][2]);
			preY[pee] = parseInt(peeps[pee][3]);
		}
	}
	var turds = $.get("resources/php/getCharsOnMap.php?m="+m).success(function() {
		var charOnMap = turds.responseText;
		peeps = charOnMap.split("|");
		var l = peeps.length;
		for (var pee = 0; pee < l - 1; pee++) {
			peeps[pee] = peeps[pee].split(",");
			if (!peeps[pee][4]){ peeps[pee][4] = 0; } //0=S 1=W 2=E 3=N
			if (preX && preY) {
				var delX = parseInt(peeps[pee][2])-parseInt(preX[pee]);
				var delY = parseInt(peeps[pee][3])-preY[pee];
			} else { var delX = 0; var delY = 0; }
			if(delX > 0) {
				peeps[pee][4] = 2; //0=S 1=W 2=E 3=N
				peeps[pee][5] = 1; //is walking
			} else if (delX < 0) {
				peeps[pee][4] = 1; //0=S 1=W 2=E 3=N
				peeps[pee][5] = 1; //is walking
			} else if (delY > 0) {
				peeps[pee][4] = 0; //0=S 1=W 2=E 3=N
				peeps[pee][5] = 1; //is walking
			} else if (delY < 0) {
				peeps[pee][4] = 3; //0=S 1=W 2=E 3=N
				peeps[pee][5] = 1; //is walking
			} else {
				peeps[pee][5] = 0; //not walking
			}
			tmp.write("delX: "+delX.toString()+"  [4]: "+peeps[2][4].toString()+"  ");
				//debug = peeps;
				//over.fillText("X: "+peeps[0][2].toString()+"  "+peeps[1][2].toString()+"  "+peeps[2][2].toString()+"  "+peeps[3][2].toString(),16,48+16*pee);
				//over.fillText("Y: "+peeps[0][3].toString()+"  "+peeps[1][3].toString()+"  "+peeps[2][3].toString()+"  "+peeps[3][3].toString(),16,112+16*pee);
		}
	});
	setTimeout(getDudes,1000/5);
}
function drawDudes() {
	if (peeps){
		dude.clearRect(0,0,gW,gH); //clear canvas
		var l = peeps.length;
		nameTag = new Array();
		for (var pee = 0; pee < l - 1; pee++) {
			charIndex[1] = parseInt(peeps[pee][4]); //[4] char direction
			if(peeps[pee][0].toString()!=user.toString()){
				dude.drawImage(CHAR_IMG,
					charIndex[0]*32,
					charIndex[1]*32,
					32,
					32,
					parseInt(peeps[pee][2])*32,
					parseInt(peeps[pee][3])*32,
					32,
					32);
			} else {
				dude.drawImage(CHAR_IMG,
					charIndex[0]*32,
					charIndex[1]*32,
					32,
					32,
					gW/2,
					gH/2,
					32,
					32);
			}
			nameTag[pee] = new Array(peeps[pee][0].toString(),parseInt(peeps[pee][2])*32,parseInt(peeps[pee][3])*32);
			debug = nameTag;
		}
	}
	setTimeout(drawDudes,1000/fps);
}
function drawOverlay() {
	var ta = 1/4*Math.cos(1/720*pi*time)+1/4;
	over.clearRect(0,0,gW,gH); //clear canvas
	over.fillStyle = "rgba(48,0,48,"+ta+")";
	over.fillRect(0,0,gW,gH);
	over.fillStyle = "rgba(0,0,0,.5)";
	over.fillRect(0,gH-25,gW,16);
	over.font = "bold 12px Arial";
	over.textBaseline = "middle";
	over.fillStyle = "rgba(255,255,255,1)";
	if (time%60 < 10) {
		over.fillText(Math.floor(time/60)+":0"+time%60,gW/2,gH-16);
	} else {
		over.fillText(Math.floor(time/60)+":"+time%60,gW/2,gH-16);
	}
	if (nameTag) {
		var l = nameTag.length;
		for ( var i = 0; i < l; i++ ) {
			over.fillText(nameTag[i][0],nameTag[i][1],nameTag[i][2]);
		}
	}
	over.fillText(debug,16,16);//debug
	setTimeout(drawOverlay,1000/fps);
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
					move(0,1);
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

function move(vx,vy) {
	var dest = pos.split("|");
	dest[1] = parseInt(dest[1])+vx;
	dest[2] = parseInt(dest[2])+vy;
	dest = dest.join("|");
	var result = $.ajax("resources/php/move.php?u="+user+"&k="+kid+"&d="+dest).success(function() {
		if (result.responseText == "good") {
			//moveAnim(vx,vy);
			canMove=false;
			setTimeout("canMove=true",1000/3);
			pos = dest;
		}
	});
}
function moveAnim(h,v) {
	walkStep++;
	walkTimer = setTimeout(moveAnim,1000/12);
				tmp.write(walkStep+",");
	if (walkStep > 3) { walkStep = 0; clearTimeout(walkTimer); }
}