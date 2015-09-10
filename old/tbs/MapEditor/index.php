<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<html>
<head>
<script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src = "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js"></script>
<style>
body {
	background:#BBBBBB;
}
.tileClass {
	width:32px;
	height:32px;
	position:absolute;
	top:-50px;
	left:-50px;
	background-position:0px 0px;
	background-repeat: no-repeat;
}

.tileClass:hover {
	-moz-box-shadow: inset 0 0 5px #ccc;
	-webkit-box-shadow: inset 0 0 5px #ccc;
	box-shadow: inset 0 0 0px #ccc;
}

.hovering {
	-moz-box-shadow: inset 0 0 5px #ccc;
	-webkit-box-shadow: inset 0 0 5px #ccc;
	box-shadow: inset 0 0 5px #ccc;
}

button {
	position:absolute;
	bottom:8px;
	height:32px;
	width:32px;
}
#toolBar {
	position:absolute;
	bottom:0px;
	left:0px;
	height:48px;
	width:320px;
	z-index:1;
	background-color:#000;
}
input[type=text] {
	position:absolute;
	bottom:8px;
	height:32px;
	width: 64px;
} 
</style>
</head>
<body>
<script>
var xx = 10;//parseInt(prompt("Width",10));
var yy = 10;//parseInt(prompt("Height",10));
var ts = 1;//parseInt(prompt("Tileset",1));
var tileWindow = window.open("tiles.php?t="+ts, "tiles");
var radius = 0;
var hoveringOver;
var drawType = "square";
var brush = new Array();

var map = new Array(xx);
for (var i = 0; i < xx; i++) {
	map[i] = new Array(yy);
	for (var z = 0; z < yy; z++) {
		map[i][z] = "1";
	}
}

for (var i = 0; i < xx; i++) {
	for (var z = 0; z < yy; z++) {
		if (map[i][z]=="1") {
			$('body').append("<div class = 'tileClass' id = '"+i+"x"+z+"'>"); //XxY
			$("#"+i+"x"+z).css("top",(z*32)+"px")
				.css("left",(i*32)+"px")
				.css("background-image","url('../resources/images/ts"+ts+".png'")
				.click(function() { $("*").removeClass("selected"); $(this).addClass("selected") }
			);
		}
	}
}

$(function() {
	$('div').click(function() {
		var x = $(tileWindow.document.body).children("#selector").css("left");
		x = (parseInt(x.substring(0,x.length-2)))*-1;
		var y = $(tileWindow.document.body).children("#selector").css("top");
		y = (parseInt(y.substring(0,y.length-2)))*-1;
		$(".selected").css("background-position",x+"px "+y+"px");
	});

	$('#tileWindowButton').click(function() {
		tileWindow = window.open("tiles.php?t="+ts, "tiles");
	});

	$('#pickValue').change(function() {
		if ( $("#pickValue").val() > 0) {
			radius = parseInt(Math.floor($("#pickValue").val()));
		} else {
			radius = 0;
		}
	});

	$('.tileClass').hover(function() {
		hoveringOver = $(this).attr("id").split("x");
		highlightStuff(hoveringOver,radius);
	});
	$('.tileClass').mouseout(function() {
		$(this).css("box-shadow","inset 0 0 0px #ccc");
	});

});

function highlightStuff(h,r) {
	switch(drawType) {
		case "square":
			makeSquareBrush(h,r);
			break;
	}
}

function makeSquareBrush(h,r) {
	$("*").removeClass("hovering");
	brush = new Array();
	if (h[0]-radius < 0) {
		var left = 0;
	} else {
		var left = h[0]-radius;
	}
	if (h[0]+radius > xx-1) {
		var right = xx-1;
	} else {
		var right = h[0]+radius;
	}
	if (h[1]-radius < 0) {
		var top = 0;
	} else {
		var top = h[1]-radius;
	}
	if (h[1]+radius > yy-1) {
		var bottom = yy-1;
	} else {
		var bottom = h[1]+radius;
	}
	//alert(left+" "+right+" "+top+" "+bottom);
	for(i=left-0; i <= right; i++) {
		for(j=top-0; j <= bottom; j++) {
			brush.push([i,j]);
			$("#"+i.toString()+"x"+j.toString()).addClass("hovering");
		}
	}
	//alert(brush);
}
</script>

<div id = "toolBar">
	<button id = "tileWindowButton" style = "left:8px;">Open Tileset</button>
	<button id = "pickDrawSquare" style = "left:48px;">s</button>
	<button id = "pickDrawCircle" style = "left:88px;">c</button>
	<button id = "pickDrawHLine" style = "left:128px;">h</button>
	<button id = "pickDrawvLine" style = "left:168px;">v</button>
	<input type="text" id = "pickValue" style = "left:208px;" placeholder="size">
	<button id = "codeButton" style = "left:280px;">g</button>
</div>

</body>
</html>