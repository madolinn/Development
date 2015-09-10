var _cl = {};
_cl.player = {};
_cl.player.pos = {x:-99999, y:-99999};

$.ajaxSetup({ async: false });

$.getScript("content/scripts/mouse.js");
$.getScript("content/scripts/prompt.js");
$.getScript("content/scripts/login.js");
$.getScript("content/scripts/render.js");

if (typeof io === 'undefined') { throw 'No connection could be made to the server.' };

var socket = io.connect('http://10.0.0.4:1340');


socket.on("connect", function() {	$("#debug").append("<p>Connected.</p>");	startupRoutine();	});
socket.on("motd", function(lines) {	for (var i = 0; i < lines.length; i++) { $("#debug").append("<p>"+lines[i]+"</p>"); } });
socket.on("SR_login", function(err) { if (err < 1) { clientLoginFailed(err); } else { clientLoginSuccess(); } });
socket.on("SR_sendPlayerData", function(data) { recievedPlayerData(data); });

function startupRoutine() {
	if (_cl.player.name || $("#gamePrompt").css("display") != "none") { $("input").unbind(); makePrompt("Please Refresh your browser!",0); return; }
	makePrompt("Hello Citizen, who will you be checking in as?",1,clientLogin);
}

//setInterval(function() { socket.emit("CL_poll",""); },500);