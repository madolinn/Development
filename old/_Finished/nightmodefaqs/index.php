<html>
<head>
<style>

body {
	background:black;
	color:#ccc;
}

input {
	background:black;
	color:#ccc;
	border:1px solid #ccc;
}

button {
	background:linear-gradient(#222,#333);
	color:#ccc;
	border:1px solid #ccc;
}

ul {
	margin:0;
	display:none;
}

#wrapper {
	margin:auto;
	width:882px;
}

.pad {
	width:200px;
	height:300px;
	float:left;
}

#toc {
	width:400px;
	border:1px solid #ccc;
	padding:40px;
	float:left;
	min-height:78px;
}

#tabcon {
	width:300px;
	float:right;
}

.tab {
	clear:both;
	float:right;
	border:1px solid #ccc;
	border-right:1px solid #000;
	padding:3px 7px 3px 7px;
	position:relative;
	left:1px;
	background:#000;
	overflow:hidden;
	height:20px;
	max-width:0px;
	transition: max-width 1s;
	transition-timing-function: linear;
	cursor:pointer;
}

.tab:hover {
	max-width:300px !important;
}

#linksTemp {
	margin:auto;
	width:400px;
	padding:40px;
}

a {
	text-decoration:none;
	color:#679;
}

h1 {
	margin:0;
	font-size:26px;
	cursor:pointer;
}

hr {
	border:0px;
	border-bottom:1px solid #ccc;
}

</style>
<script src = "http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js?"></script>
<script>

$(function(){

	$("button").click(function() {
	
		window.location.href = "/_Finished/nightmodefaqs/index.php?u="+$("#url").val();
	
	});
	
	$(".tab").click(function() {
	
		$(".tab").css("max-width","0px").css("transition","max-width .5s linear 0s");
		$(this).css("max-width",$(this).width()+14).css("transition","none");
		$("ul").css("display","none");
		$("ul").eq($(this).index()).css("display","block");
	
	});

	$("a").attr("target","_blank");
	$(".tab").eq(0).css("max-width",$(".tab").eq(0).width()+14);
	
});

</script>
</head>
<body>
<?php
if (isset($_GET["u"])) {

	$str = file_get_contents($_GET["u"]);
	$str = preg_match('#\<pre\>(.+)\</pre\>#s', $str, $text);
	echo $text[0];
	
} else {

?>

<input id = "url"></input><button>Go</button>


<div id = "wrapper">
<div class = "pad">
<div id = "tabcon">
<div class = "tab" style = "max-width:300px;">Dragon Quest IX</div>
<div class = "tab">Temp1</div>
<div class = "tab">Temp2</div>
<div class = "tab">Temp3</div>
<div class = "tab">Temp4</div>
</div>
</div>
<div id = "toc">

<ul style = "display:block">
<li><a href = "http://10.0.0.2/_Finished/nightmodefaqs/index.php?u=http://www.gamefaqs.com/ds/937281-dragon-quest-ix-sentinels-of-the-starry-skies/faqs/60936">Equipment</a></li>
<li><a href = "http://10.0.0.2/_Finished/nightmodefaqs/index.php?u=http://www.gamefaqs.com/ds/937281-dragon-quest-ix-sentinels-of-the-starry-skies/faqs/61151">Grotto Mechanics</a></li>
<li><a href = "http://10.0.0.2/_Finished/nightmodefaqs/index.php?u=http://www.gamefaqs.com/ds/937281-dragon-quest-ix-sentinels-of-the-starry-skies/faqs/60450">Bestiary</a></li>
<li><a href = "http://10.0.0.2/_Finished/nightmodefaqs/index.php?u=http://www.gamefaqs.com/ds/937281-dragon-quest-ix-sentinels-of-the-starry-skies/faqs/60451">Alchemy</a></li>
<li><a href = "http://10.0.0.2/_Finished/nightmodefaqs/index.php?u=http://www.gamefaqs.com/ds/937281-dragon-quest-ix-sentinels-of-the-starry-skies/faqs/60679">Item Location</a></li>
<li><a href = "http://10.0.0.2/_Finished/nightmodefaqs/index.php?u=http://www.gamefaqs.com/ds/937281-dragon-quest-ix-sentinels-of-the-starry-skies/faqs/60562">Item Farming</a></li>
<li><a href = "http://10.0.0.2/_Finished/nightmodefaqs/index.php?u=http://www.gamefaqs.com/ds/937281-dragon-quest-ix-sentinels-of-the-starry-skies/faqs/60617">Quests</a></li>
<li><a href = "http://10.0.0.2/_Finished/nightmodefaqs/index.php?u=http://www.gamefaqs.com/ds/937281-dragon-quest-ix-sentinels-of-the-starry-skies/faqs/60597">Vocations</a></li><hr>
<li><a href = "http://www.woodus.com/den/games/dq9ds/dq9_grotto.html">Grotto Name Analysis</a>&nbsp-&nbsp<a href = "http://www.woodus.com/den/games/dq9ds">Woodus</a></li>
<li><a href = "http://www.woodus.com/den/gallery/graphics/dq9ds/maps_overworld/my_material_map.png">Material Map</a></li>
</ul>

<ul>
<li><a href = "http://10.0.0.2/_Finished/nightmodefaqs/index.php?u=http://www.gamefaqs.com/ds/937281-dragon-quest-ix-sentinels-of-the-starry-skies/faqs/60936">Temp1</a></li>
</ul>

<ul>
<li><a href = "http://10.0.0.2/_Finished/nightmodefaqs/index.php?u=http://www.gamefaqs.com/ds/937281-dragon-quest-ix-sentinels-of-the-starry-skies/faqs/60936">Temp2</a></li>
</ul>

<ul>
<li><a href = "http://10.0.0.2/_Finished/nightmodefaqs/index.php?u=http://www.gamefaqs.com/ds/937281-dragon-quest-ix-sentinels-of-the-starry-skies/faqs/60936">Temp3</a></li>
</ul>

<ul>
<li><a href = "http://10.0.0.2/_Finished/nightmodefaqs/index.php?u=http://www.gamefaqs.com/ds/937281-dragon-quest-ix-sentinels-of-the-starry-skies/faqs/60936">Temp4</a></li>
</ul>

</div>
<div class = "pad"></div>
</div>
<?php } ?>
</body>
</html>