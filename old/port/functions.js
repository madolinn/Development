$(function() {
	var navs = $.makeArray($("#nav > span"));
	$(navs[0]).click(function() { window.location.replace("index.php"); });
	$(navs[1]).click(function() { window.location.replace("index.php?p=works"); });
	$(navs[2]).click(function() { window.location.replace("index.php?p=about"); });

	$(".vid + div").slideUp(0);
	$(".vid").click(function() { $(this).next("div").slideDown(500); });
});