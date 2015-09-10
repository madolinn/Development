<html>
<head>
<link rel="stylesheet" type="text/css" href="src/theme.css">
<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>

<script>

$(function() {

	$(".champcon").css("display","none");

	$(".header").click(function() {
	
		$(this).next().slideToggle(500);
	
	});

});

</script>

</head>
<body>

<div style = "height:100px;"></div>

<div class = "header first"><span class = "champname">Vi</span></div>
<div class = "champcon"><img src = "src/vi.png"></div>

<div class = "header"><span class = "champname">Hecarim</span></div>
<div class = "champcon"><img src = "src/hecarim.png"></div>

<div class = "header last"><span class = "champname">Udyr</span></div>
<div class = "champcon"><img src = "src/udyr.png"></div>

</body>
</html>