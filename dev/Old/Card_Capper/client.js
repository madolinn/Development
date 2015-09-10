var selectedcard = -1;

var socket = io.connect('http://10.0.0.4:11000');

socket.on('updatecards', function(cards) {
	$("#leftcards").html("");
	$("#rightcards").html("");
	$("#board").html("");
	for (var i = 0; i < cards.length; i++) {
		if (i < 5) {
			var appending = $("#leftcards");
			var color = "rgba(255,0,0,.2)";
		} else {
			var appending = $("#rightcards");
			var color = "rgba(0,0,255,.2)";
		}
		if (cards[i].x > -1 || cards[i].y > -1) {
			if (cards[i].owner == 0) { var color = "rgba(255,0,0,.2)"; } else { var color = "rgba(0,0,255,.2)" }
			var c = $("<div />", {
				"class":"card",
				"ind":i,
				text:cards[i].stats
			})
			.appendTo("#board")
			.css("background",color)
			.css("position","absolute")
			.css("top",cards[i].y*100)
			.css("left",cards[i].x*100);
			for (var z = 0; z < 8; z++) {
				if (cards[i].dir[z] == 1) {
				
					var d = [];
					if (z == 0) { d[0] = 0; d[1] = 5; }
					if (z == 1) { d[0] = 43; d[1] = 5; }
					if (z == 2) { d[0] = 86; d[1] = 5; }
					if (z == 3) { d[0] = 86; d[1] = 47; }
					if (z == 4) { d[0] = 86; d[1] = 90; }
					if (z == 5) { d[0] = 43; d[1] = 90; }
					if (z == 6) { d[0] = 0; d[1] = 90; }
					if (z == 7) { d[0] = 0; d[1] = 47; }
				
					$("<div />", {
						"class":"direction",
						text:"*"
					})
					.css("left",d[0])
					.css("top",d[1])
					.appendTo(c);
				}
			}
		} else {
			var c = $("<div />", {
				"class":"card",
				"ind":i,
				text:cards[i].stats
			})
			.css("background",color)
			.appendTo(appending);
			for (var z = 0; z < 8; z++) {
				if (cards[i].dir[z] == 1) {
				
					var d = [];
					if (z == 0) { d[0] = 0; d[1] = 5; }
					if (z == 1) { d[0] = 43; d[1] = 5; }
					if (z == 2) { d[0] = 86; d[1] = 5; }
					if (z == 3) { d[0] = 86; d[1] = 47; }
					if (z == 4) { d[0] = 86; d[1] = 90; }
					if (z == 5) { d[0] = 43; d[1] = 90; }
					if (z == 6) { d[0] = 0; d[1] = 90; }
					if (z == 7) { d[0] = 0; d[1] = 47; }
				
					$("<div />", {
						"class":"direction",
						text:"*"
					})
					.css("left",d[0])
					.css("top",d[1])
					.appendTo(c);
				}
			}
		}
	}
});

function movecard(e) {
	if (selectedcard > -1) {
		var x = e.clientX - $("#board").offset().left;
		var y = e.clientY - $("#board").offset().top;
		socket.emit('movecard',{ind: selectedcard, loc: [x, y]});
	}
}

$(function() {
	$(document).on("click",".card",function() {
		selectedcard = parseInt($(this).attr("ind"));
	});
	$("#board").click(function(e) {
		movecard(e);
	})
});