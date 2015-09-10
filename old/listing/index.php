<?php

function isLocal() {

	$ip = sprintf('%u', ip2long($_SERVER['REMOTE_ADDR']));
	if (($ip >= 167772160) && ($ip <= 184549375)) {
		return true;
	} else { return false; }

}

if (!isLocal()) { exit("You're not supposed to be here."); }

?>

<html>
<head>
<title>Directory Listings</title>
<style>
body {
	margin:0;
	background:#111;
	overflow-y:scroll;
}

span.link, span.dir {
	color:#63B0B0;
	cursor:pointer;
}
span.link:hover, span.dir:hover {
	color:#71C9C9;
}

table {
	border-collapse:collapse;
	width:100%;
}

#listings {
	width: 600px;
	margin:auto;
}

tr {
	border-color:#111111;
	border-style:solid;
	border-width:1px 0;
	font:small-caps 16px normal Arial;
	height:33px;
	padding:0;
	background:#222;
}

td.icon {
	width:16px;
}

td.size {
	text-align:right;
	color:#CFA591;
}

.updimg {
	width:16px;
	height:16px;
	padding:0 8px;
	background:url("./../img/icon_parent.png") 8px 0px no-repeat;
}

.dirimg {
	width:16px;
	height:16px;
	padding:0 8px;
	background:url("./../img/icon_folder.png") 8px 0px no-repeat;
}

.imgimg {
	width:16px;
	height:16px;
	padding:0 8px;
	background:url("./../img/icon_image.png") 8px 0px no-repeat;
}

.audimg {
	width:16px;
	height:16px;
	padding:0 8px;
	background:url("./../img/icon_audio.png") 8px 0px no-repeat;
}

.arcimg {
	width:16px;
	height:16px;
	padding:0 8px;
	background:url("./../img/icon_archive.png") 8px 0px no-repeat;
}

.exeimg {
	width:16px;
	height:16px;
	padding:0 8px;
	background:url("./../img/icon_exe.png") 8px 0px no-repeat;
}

.txtimg {
	width:16px;
	height:16px;
	padding:0 8px;
	background:url("./../img/icon_text.png") 8px 0px no-repeat;
}

.pdfimg {
	width:16px;
	height:16px;
	padding:0 8px;
	background:url("./../img/icon_pdf.png") 8px 0px no-repeat;
}

.webimg {
	width:16px;
	height:16px;
	padding:0 8px;
	background:url("./../img/icon_web.png") 8px 0px no-repeat;
}

.fileimg {
	width:16px;
	height:16px;
	padding:0 8px;
	background:url("./../img/icon_file.png") 8px 0px no-repeat;
}
</style>
<script src = "http://10.0.0.2/jquery/jquery.min.js"></script>
<script>

$(function(){ 

	navListing("");
	keyBinds();

});

function keyBinds() {

	$(document).keydown(function(e) {
		if (e.which === 8) {
			e.preventDefault();
			navListing("");
		}
	});

}

function navListing(dir) {

	$.get("./scripts/ajaxDir.php?dir="+dir, function(d) {
	
		$("#listings").html(d);
		$("tr").filter(":even").css("background-color","#161616");
		bindListings();
	
	});

}

function bindListings() {

	$("span.link").each(function() {
		$(this).click(function() { window.open($(this).attr("href"), "_blank"); });
	});

	$("span.dir").each(function() {
		$(this).click(function() { navListing($(this).attr("href")); });
	});
}

</script>
</head>
<body>

<div id = "listings"></div>

</body>
</html>