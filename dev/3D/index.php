<html>
<head>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>

<script>

_cv = [];

function create_canvas(name, w, h) {

	w = w || 600;
	h = h || 600;

	$("<canvas>", { id : name, height : h, width : w }).appendTo("body");
	$("#"+name).attr("height",h).attr("width",w);
	_cv.push($("#"+name)[0].getContext("2d"));
	_cv[_cv.length-1].imageSmoothingEnabled = _cv[_cv.length-1].mozImageSmoothingEnabled = _cv[_cv.length-1].webkitImageSmoothingEnabled = _cv[_cv.length-1].msImageSmoothingEnabled = "false";

}

$(function() {

	create_canvas("cv_main");
	
	_cv[0].fillStyle = "#568033";
	_cv[0].fillRect(0,0,600,600);
	_cv[0].fillStyle = "#234507";
	_cv[0].scale(2,2);
	_cv[0].beginPath();
	_cv[0].moveTo(50,50);
	_cv[0].lineTo(70,70);
	_cv[0].stroke();

});

</script>

</head>
<body>

</body>
</html>
