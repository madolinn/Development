_g = {};
_g.chapter = 0;
_g.manga = "";
_g.hidden = false;

$.ajaxPrefilter( function (options) {
  if (options.crossDomain && jQuery.support.cors) {
    var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
    options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
    //options.url = "http://cors.corsproxy.io/url=" + options.url;
  }
});


load = function() {
	_g.manga = $("#inputManga").val();
	
	$(document).keypress(function(e) {
		if (e.keyCode == 39) {
			clearPage();
			_g.chapter++;
			$("#inputChapter").val(_g.chapter);
			loadChapter(_g.chapter);
		}
		if (e.keyCode == 37) {
			clearPage();
			_g.chapter--;
			$("#inputChapter").val(_g.chapter);
			loadChapter(_g.chapter);
		}
	});
	
	$("#inputChapter").focus(function() {
		var v = $("#inputChapter").val();
		if (v == "Chapter Number") {
			$("#inputChapter").val("");
		}
	});
	
	$("#buttonSubmit").click(function() {
		var ch = parseInt($("#inputChapter").val());
		if (isNaN(ch)) { ch = 1; }
		_g.chapter = ch;
		var ma =  $("#inputManga").val().replace(" ","_").toLowerCase();
		_g.manga = ma;
		loadChapter(_g.chapter);
	});
	
	$("#divHideManga").click(function() {
		if (_g.hidden) {
			$("#inputManga").animate({ width: "140px" }, 1000);
			_g.hidden = false;
		}
		else {
			$("#inputManga").animate({ width: "0px" }, 1000);
			_g.hidden = true;
		}
	});
}

loadChapter = function(ch) {
	pages = 0;
	$("#divProgress").css("display","inline-block");
	$.get("http://www.goodmanga.net/"+_g.manga+"/chapter/"+ch, function(data) {
		//pages = data.match(
		var st = data.search("<span>of ");
		var ex = data.substr(st+9,2);
		pages = parseInt(ex);
		makePages(ch, pages);
	}).fail(function() {
		$("<div>", { html : "Uh oh! Something went wrong. Please try again. ["+_g.manga+" : Chapter "+ch+"]", class : "img"}).appendTo("body");
	}).always(function() {
		$("#divProgress").css("display","none");
	});
}

makePages = function(ch, pages) {
	for (var i = 1; i < pages; i++) {
		$("<div>", { html : "<img src = 'http://www.goodmanga.net/images/manga/"+_g.manga+"/"+ch+"/"+i+".jpg'>" , class : "img"}).appendTo("body");
	}
}

clearPage = function() {
	$(".img").remove();
}

$(function() { load(); });