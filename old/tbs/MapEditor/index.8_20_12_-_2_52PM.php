<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<html>
<head>
<script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src = "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js"></script>
<style>
body {
	background:#BBBBBB;
}
div {
	width:32px;
	height:32px;
	position:absolute;
	top:-50px;
	left:-50px;
	background-image:url('../lern_too_due/ts1.png');
	background-position:0px 0px;
}

button {
	position:absolute;
	bottom:0px;
	z-index:1;
}
</style>
</head>
<body>
<script>
var xx = parseInt(prompt("Array width",10));
var yy = parseInt(prompt("Array height",10));

var map = new Array(xx);
for (var i = 0; i < xx; i++) {			// Create Map with Size xx yy
	map[i] = new Array(yy);
	for (var z = 0; z < yy; z++) {
		map[i][z] = "1";
	}
}

for (var i = 0; i < xx; i++) {			// Create a Div for each tile.
for (var z = 0; z < yy; z++) {
	if (map[i][z]=="1") {
		$('body').append("<div style = 'top:"+z*32+"px; left:"+i*32+"px;'></div>");
	}
}}

function changeTile(index) {
	var offset = parseInt(prompt("Index","0"));
	if (offset>-1){
		index.style.backgroundImage = "url('../resources/images/ts1.png')"	// If not -1, change background and offset to index
		index.style.backgroundPosition = "-"+(offset)*32+"px 0px";
	} else {
		index.style.backgroundImage = "";					// else, blank tile.
		index.style.background = "transparent";
	}
}

$(function() {
	$('div').click(function() { changeTile(this); });

	$('#sub').click(function() {
		var list = "";
		var dum = "";
		var d = $.makeArray($('div'));
		for (var i = 1; i < d.length+1; i++) {
			if ($(d[i-1]).css("background-image").indexOf("ts1.png")!= -1) { // If not blank tile
				dum = $(d[i-1]).css("background-position");	// dum = index*32
				dum = dum.replace("px 0px","");			// Strip off Styling
				dum = Math.abs(parseInt(dum)/32);		// Divide index
				dum = dum.toString()+",";			// Add a ,
				if ((i / xx) == Math.floor(i/xx)) {
					dum = dum.substring(0,dum.length-1);	// If last in column, strip off comman, add ],[
					dum += "],[";
				} 
			} else {
				dum = "-1,";					// blank tile, -1
				if ((i / xx) == Math.floor(i/xx)) {
					dum = dum.substring(0,dum.length-1);	// if last in col, | Why do I have seperate dividers? No idea
					dum += "|";
				}
			}
			list += dum;						// Add to list
		}
		list = list.substring(0,list.length-2);
		alert(list);
	});
});
</script>

<button id = "sub">Submit</button>

</body>
</html>