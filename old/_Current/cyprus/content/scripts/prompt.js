function makePrompt(t, kind, callback, args) {
	
	$("#gamePrompt > .content > .text").html(t);
	$("#gamePrompt > .content > input").hide();
	$("#gamePrompt > .content > input").eq(kind).show();
	if (kind == 2) { $("#gamePrompt > .content > input").eq(3).show(); };
	var wr = $("#wrapper");
	var xx = wr.offset().left + (wr.width()/2) - ($("#gamePrompt").width()/2);
	var yy = wr.offset().top + (wr.height()/2) - ($("#gamePrompt").height()/2);
	$("#gamePrompt").css("left",xx).css("top",yy);
	
	for (var ind = 0; ind < 4; ind++) {
		if (ind != 1) { $("#gamePrompt > .content > input").eq(ind).click(function() { $(this).submit(); }); }
	}
	
	$("#gamePromptInput").keypress(function(e) { if (e.which == 13) { $(this).submit(); $(this).unbind(); } });
	$("#gamePrompt").show();
	
	if (callback == undefined) { $("#gamePrompt > .content > input").submit(function() { promptComplete(); }); } else {
		try {
	
			$("#gamePrompt > .content > input").submit(function() { callback(args); });
	
		}
		catch(err) {
		
			$("#gamePrompt > .content > input").submit(alert("Error!\n"+err));
		
		}
	}
}

function promptComplete() {

	$("#gamePrompt > .content > .text").html("");
	$("#gamePromptInput").val("");
	$("#gamePrompt").hide();
	$("#gamePrompt > .content > input").unbind();
	
}

$(function() {

	$(window).resize(function() { var wr = $("#wrapper"); var xx = wr.offset().left + (wr.width()/2) - ($("#gamePrompt").width()/2); var yy = wr.offset().top + (wr.height()/2) - ($("#gamePrompt").height()/2); $("#gamePrompt").css("left",xx).css("top",yy); });

});