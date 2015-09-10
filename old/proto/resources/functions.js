$(function() {
	$(document).ready(function(){
		$("#rebutton").click(function () { $("form")[0].submit(); });
		$("form[name='login'] > input").keypress(function(e) {if(e.which == 13) {$("form")[0].submit(); e.preventDefault();}});
		$("#regcon > input").keypress(function(e) {if(e.which == 13) {checkReg(); $(this).blur(); e.preventDefault();}});
		$("#regcon").css("opacity","1").hide();
		$("#regfloat > a").click(function() {$('#regcon').fadeIn(1000);});
		$(".contract").click(expandContract);
		$(".expand").click(expandContract);
		$(".expand").next().next().slideUp(0);
		$("#friendslistcon").draggable({ containment: "window", handle: ".chathead" });
		$("#friendslistcon").resizable({alsoResize: "#friendslist", minWidth: 200});
		$("#floatlogout").click(function() { window.location.href = "index.php?a=2" });
		$("#addfriend").click(addFriend);
		$(".contact").click(openChat);
});});

function openChat(e, sid, forced ) {
	if(sid==undefined) { sid = $(this).attr("id"); }
	if(forced==undefined) { forced = false; }
	if(forced==false) {
		inRoom = new Array();
		inRoom.push(sid,$("#friendslistcon").attr("sid"));
		inRoom.sort();
	} else {
		inRoom = sid.split(",");
		inRoom.sort();

		sid = inRoom.slice(0);

		sid = sid.splice($.inArray($("#friendslistcon").attr("id"),inRoom),1);
		sid = sid.join(",");
	}
	if(!$("#"+sid+".chatcon").is('*')) {
		$("body").append("<div class = 'chatcon' id = '"+sid+"' in = '"+inRoom+"'></div>");
		$("#"+sid+".chatcon")
			.css("top",(Math.floor(Math.random()*300)+100)+"px")
			.css("left",(Math.floor(Math.random()*600)+100)+"px")
			.draggable({ containment: "window", handle: ".chathead", stack: ".chatcon" })
			.resizable({ alsoResize: "#"+sid+".recbox" })
			.append("<div class = 'chathead'><div class = 'chatheadtext'>"+sid+"</div><div class = 'chatclose' id = '"+sid+"'>X</div></div>")
  			.append("<div class = 'recbox' id = '"+sid+"'></div>")
  			.append("<textarea class = 'sendbox' id = '"+sid+"'></textarea>");
		$("#"+sid+".chatcon").resizable({ resize: function(event, ui) {
			$("#"+sid+".sendbox").css("top",ui.size.height-55+"px")
			.css("width",ui.size.width-3+"px")}});
		$("#"+sid+".sendbox").keypress(sendMessage);
		$("#"+sid+".chatclose").click(function() { $("#"+$(this).attr("id")+".chatcon").remove(); });
	}
}

function sendMessage(e) {
	sid = $("#"+$(this).attr("id")+".chatcon").attr("in");
	msg = $("#friendslistcon").attr("sid")+": "+$(this).val();
	if((e.which==13) && (e.shiftKey==false)) {
		e.preventDefault();
		$.ajax("resources/ajax/sendmessage.php?r="+sid+"&m="+msg);
		$(this).val("");
	}
}

function retrieveMessage() {
	var reg = $.ajax("resources/ajax/retrievemessage.php?r="+$('#friendslistcon').attr('sid'))
		.done(function() {
    			var inc = reg.responseXML;
    			var rec = inc.getElementsByTagName("rec");
    			var msg = inc.getElementsByTagName("msg");

			for (var i=0; i<rec.length; i++) {
				if($(".chatcon[in='"+rec[i].childNodes[0].nodeValue+"']").is('*')) {
					var elem = $(".chatcon[in='"+rec[i].childNodes[0].nodeValue+"'] > .recbox");
					var scrolled = false;
					if(elem.prop("scrollHeight")-elem.scrollTop()-168<= 20) { scrolled = true; }
					elem.append(msg[i].childNodes[0].nodeValue+"<BR>");
					if (scrolled) { elem.animate({ scrollTop: elem.height() }, 0); }
				} else {
					openChat('', rec[i].childNodes[0].nodeValue, true);
					$(".chatcon[in='"+rec[i].childNodes[0].nodeValue+"'] > .recbox").append(msg[i].childNodes[0].nodeValue+"<BR>");
				}
			}
		setTimeout("retrieveMessage();",500);
		});
}
retrieveMessage();

function expandContract() {
	par = $(this);
	child = $(this).next().next();
	if(child.css("display")=="none") {
		par.removeClass("expand");
		par.addClass("contract");
		par.html("—");
		child.slideDown(400);
	} else {
		par.removeClass("contract");
		par.addClass("expand");
		par.html("+");
		child.slideUp(400);
	}
}

function addFriend() {
	onSub = "var reg = $.ajax('resources/ajax/addfriend.php?u='+$('#friendslistcon').attr('sid')+'&a='+$('#addName').val()).done(function() { eval(reg.responseText); });";
	lbAlert('Add Friend<br><input id = "addName" />',200,90,null,onSub);
}

function updateFriendslist() {
	var reg = $.ajax("resources/ajax/updatefriendslist.php?u="+$('#friendslistcon').attr('sid'))
		.done(function() {
			list = reg.responseText.split(":");
			$("ul.online").html(list[0]);
			$("ul.offline").html(list[1]);
		});
	
}

function lbAlert( str , w, h, que, onSub ) {

	str = str || 'Default Message<BR><BR><BR>';
	w = w || '200';
	h = h || '75';
	if(que) { eval(que); }

	$("body").append("<div id = 'lightbox'></div>");

	$("#lightbox")
		.append("<div id = 'lbmsg'></div>");

	$("#lbmsg")
		.css("width",w+"px")
		.css("height",h+"px")
		.css("margin-left","-"+(w/2)+"px")
		.css("margin-top","-"+((h/2)+100)+"px")
		.html(str)
		.append("<br><br><hr><span id = 'lbbutton'>Okay</span>");
	$("#lbbutton").click(function() {if(onSub) { eval(onSub); } $("#lightbox").remove(); });
	$("body").keypress(function(e) {if(e.which == 13) {$("#lbbutton").click(); $("body").unbind("keypress"); e.preventDefault();}});

	$("#lightbox").animate({opacity: 1},500);
}

function checkReg() {

	if($('[name="ruser"]').val()) {
		if($('[name="rpasa"]').val() == $('[name="rpasb"]').val()) {
			var reg = $.ajax("resources/ajax/register.php?u="+$('[name="ruser"]').val()+"&p="+$('[name="rpasa"]').val())
				.done(function() { eval(reg.responseText); });
		} else { lbAlert('Passwords do not match.', 200, 75); }
	}

}