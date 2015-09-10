Status = function() { /* */ };

Status.TakeTurn = function(monster) {

	for (var i = 0; i < monster.status.length; i++) {
		if (Status.hasOwnProperty(monster.status[i])) {
			window["Status"][monster.status[i]]();
		} else {
			
		}
	}

}

Status.heu = function() {

	alert("hahahah");

}

Monster = function() { /* */ };

Monster.Base = function() {
	this.isalive = true;	// Has AI
	this.maxhealth = 3;
	this.health = this.maxhealth;

	this.isblind = false;	// Can it see
	this.sightrad = 3;		// Sight in darkness Radius
	this.hasnightvision = false;
	
	this.isdeaf = false;	// Can it hear
	this.hearingrad = 4;	// Radius to recognize 'something'
	
	this.iscrippled = false;// Can it move
	this.movespeed = 1; 	// Tiles per turn to move
	this.isflying = false;	// Can fly over holes/low walls
	
	this.team = "critter";	// Enemy, Ally, Critter, Neutral
	this.status = [];		// Container for Status effects
	
	this.sprite = new Image();
	this.sprite.src = "../images/egg.png";
	
	this.TakeTurn = function() {
	
		Status.TakeTurn(this);
	
	}
}

var poo = new Monster.Base();

poo.status.push("heu");
poo.TakeTurn();