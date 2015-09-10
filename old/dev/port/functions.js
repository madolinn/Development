$(function() {
	var navs = $.makeArray($("#nav > span"));
	$(navs[0]).click(function() { window.location.replace("index.php"); });
	$(navs[1]).click(function() { window.location.replace("index.php?p=works"); });
	$(navs[2]).click(function() { window.location.replace("index.php?p=about"); });

	$(document).scroll(headerHide);
	$("#head").mouseover(function(){ $("#head").animate({ top: "0px", opacity: "1"},{duration: 500, queue: false}) });
	$("#head").mouseleave(function() { if ($(document).scrollTop()!=0) { $("#head").animate({ top: "-50px", opacity: ".7"},{duration: 500, queue: false}); } });
	//$("*").css("box-shadow","0 0 0 #000");

	//$("body").css("height",$("#footer").position().top-50+"px");

});

function headerHide() {
	if ($(document).scrollTop()==0) {
		$("#head").animate({ top: "0px", opacity: "1"},{duration: 500, queue: false});
	} else {
		$("#head").animate({ top: "-50px", opacity: ".7"},{duration: 100, queue: false});
	}
}

function cSlideReel() {
	var n = arguments.length;
	offset = 1;
	for (i = 0+offset; i < n; i++) {
		$("#reelcontainer").append("<div class = 'reelframe'><img src = '"+arguments[i]+"' class = 'reelimg'></div>");
	}
	$(".reelframe").mouseover(function() { $(this).animate({width:100},{duration:200, queue:false}).css("z-index",2); });
	$(".reelframe").mouseleave(function() { $(this).animate({width:20},{duration:200, queue:false}).css("z-index",1); });
	$(".reelframe").click(function() { $("#displaycontainer > img").attr("src",$(this).children("img").attr("src")); });
}