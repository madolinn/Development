player = function() {
	this.prototype = new npc();
	this.equip = [];
}

player.prototype.step = function() {
	
	
	
}

player.prototype.draw = function() {
	
	_cv[0].drawImage(this.prototype.spr,0,0);
	
}