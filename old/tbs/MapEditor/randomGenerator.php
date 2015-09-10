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
	background-image:url('../resources/images/ts2.png');
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
for (var i = 0; i < xx; i++) {
	map[i] = new Array(yy);
	for (var z = 0; z < yy; z++) {
		map[i][z] = "1";
	}
}

for (var i = 0; i < xx; i++) {
for (var z = 0; z < yy; z++) {
	if (map[i][z]=="1") {
		$('body').append("<div style = 'top:"+z*32+"px; left:"+i*32+"px;'></div>");
	}
}}

function changeTile(index) {
	var offset = parseInt(prompt("Index","0"));
	if (offset>-1){
		index.style.backgroundImage = "url('../resources/images/ts2.png')"
		index.style.backgroundPosition = "-"+(offset)*32+"px 0px";
	} else {
		index.style.backgroundImage = "";
		index.style.background = "transparent";
	}
}

$(function() {
	$('div').click(function() { changeTile(this); });

	$('#sub').click(function() {
		var list = "";
		var dum = "";
		var d = $.makeArray($('div'));
		var j = 1;
		for (var i = 1; i < d.length+1; i++) {
			if ($(d[i-1]).css("background-image").indexOf("ts1.png")!= -1) {
				dum = $(d[i-1]).css("background-position");	
				dum = dum.replace("px 0px","");
				dum = Math.abs(parseInt(dum)/32);
				dum = dum.toString()+",";
				if ((i / xx) == Math.floor(i/xx)) {
					dum = dum.substring(0,dum.length-1);
					dum += "|";
				} 
			} else {
				dum = "-1,";
				if ((i / xx) == Math.floor(i/xx)) {
					dum = dum.substring(0,dum.length-1);
					dum += "?";
				}
			}
			var num = Math.floor(Math.random()*9);
			if (j < xx) {
				list +=  num.toString()+",";
				j++;
			} else {
				list +=  num.toString()+"|";
				j = 1;
			}
		}
		var lol = Math.floor(Math.random()*9);
		list += lol.toString();
		list = list.substring(0,list.length-2);
			newwindow=window.open('','code','height=240,width=800');
			var tmp = newwindow.document;
			tmp.write(list);
			tmp.close();
	});
});
</script>

<button id = "sub">Submit</button>

</body>
</html>