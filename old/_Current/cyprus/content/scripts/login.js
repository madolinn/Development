function clientLogin() {

	socket.emit("CL_login",$("#gamePromptInput").val());
	_cl.player.name = $("#gamePromptInput").val();
	promptComplete();

}

function clientLoginFailed(err) {

	var t = "We're sorry, ";
	if (err == 0) { t+="somebody by that name is already here. Can you supply another name?"; }
	makePrompt(t,1,clientLogin);

}

function clientLoginSuccess() {

	makePrompt("Welcome to the station "+_cl.player.name+"!",0);
	render();
	
}