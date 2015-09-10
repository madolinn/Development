var color = require('C:/Program Files/nodejs/node_modules/npm/node_modules/colog');
var io = require('C:/Program Files/nodejs/node_modules/npm/node_modules/socket.io').listen(1340);

io.set('log level', 1);

_g = {};
_g.uni = {};

io.sockets.on('connection', function(socket) {

	makeUniverse(socket);
	
	socket.on("CL_requestAIDuel", function(data) { CL_login(data, socket); });
	socket.on("disconnect", function() { removeUniverse(socket));
	
	//socket.on("CL_poll", function() { console.log(_g.players[socket]); })
	
});

function makeUniverse(soc) {

	color.nl();
	console.log(color.green("   Making a new Unicorn for ")+color.yellow(soc.id));

	_g.uni[soc.id] = {};
	_g.uni[soc.id].player = new Template.Player();
	Equipment.addEquipment(_g.uni[soc.id].player, Equipment.starterPack());
	
	color.dump(_g.uni[soc.id].player);
	
	color.log("Armor values for [larm]:");
	color.dump(Get.LimbArmorValues(_g.uni[soc.id].player, "larm"));
	
	soc.emit("SR_playerLimbsStatus", Get.playerLimbsStatus(_g.uni[soc.id].player));

}

function removeUniverse(soc) {

	for (keys in _g.uni) {
	
		if (keys == soc.id) { 
		
			delete _g.uni[keys];
			console.log(color.green("   Removed Unicorn belonging to ")+color.yellow(soc.id));
			return;
		
		}
	
	}

}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Get @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
	Get = { /* Get Placeholder */ };
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

Get.playerLimbsStatus = function(ply) {

	var limbs = {};

	if (ply.hasOwnProperty('player')) { ply = ply.player; color.warning("Get.playerLimbsStatus called slowly (Entire 'uni' object sent)"); }
	
	for (keys in ply.limbs) {
	
		//Add Limbs to new object to send off. Only add status flags, client can do the rest.
		limbs[keys] = {};
		if (ply.limbs[keys].status != 0) { limbs[keys].status = ply.limbs[keys].status;	}
		
		//Check if the limb has organs, if so, prepare an organ property. If no organs are damaged, delete it.
		if (Object.keys(ply.limbs[keys].organs).length > 0) {
			limbs[keys].organs = {};
			for (orgs in ply.limbs[keys].organs) {
				if (ply.limbs[keys].organs[orgs].status != 0) { limbs[keys].organs[orgs] = ply.limbs[keys].organs[orgs].status; }
			}
			if (Object.keys(limbs[keys].organs).length == 0) { delete limbs[keys].organs; }
		}
	}
	
	return limbs;

}

Get.LimbArmorValues = function(ply, lim) {

	var armor = {};

	if (ply.hasOwnProperty('player')) { ply = ply.player; color.warning("Get.LimbArmorValues called slowly (Entire 'uni' object sent), assuming player."); }

	if (ply.limbs.hasOwnProperty(lim)) {
	
		if (ply.limbs[lim].armorinfluence.length > 0) {
		
			for (var ind = 0; ind < ply.equipment.length; ind++) {
			
				if (ply.limbs[lim].armorinfluence.indexOf(ply.equipment[ind].kind) > -1) {
				
					for (keys in ply.equipment[ind].resistances) {
					
						if (!armor.hasOwnProperty(ply.equipment[ind].resistances[keys])) {
						
							armor[keys] = 0;
						
						}
					
						armor[keys] += ply.equipment[ind].resistances[keys];
					
					}
				
				}
			
			}
			
		}
		

	
	} else {
	
		color.warning("Get.LimbArmorValues : No such limb ["+lim+"]");
	
	}
	
	return armor;

}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Limbs @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
	Limb = function() { /* Limbs Placeholder */ }
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

Limb.addChild = function(obj, par, chi) {

	obj.limbs[par].children.push(chi);
	obj.limbs[chi].parent.push(par);

}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Templates @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
	Template = function() { /* Placeholder */ }
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

Template.Player = function() {

	this.limbs = {};
	this.blood = 100;
	this.species = "Human";
	this.equipment = [];
	
	//Build Hiearchy
	this.limbs.head = new Template.Limb();
	this.limbs.teeth = new Template.Limb();
	this.limbs.torso = new Template.Limb();
	this.limbs.larm = new Template.Limb();
	this.limbs.lhand = new Template.Limb();
	this.limbs.rarm = new Template.Limb();
	this.limbs.rhand = new Template.Limb();
	this.limbs.lleg = new Template.Limb();
	this.limbs.lfoot = new Template.Limb();
	this.limbs.rleg = new Template.Limb();
	this.limbs.rfoot = new Template.Limb();
	Limb.addChild(this, "head", "teeth");
	Limb.addChild(this, "head", "torso");
	Limb.addChild(this, "torso", "larm");
	Limb.addChild(this, "larm", "lhand");
	Limb.addChild(this, "torso", "rarm");
	Limb.addChild(this, "rarm", "rhand");
	Limb.addChild(this, "torso", "lleg");
	Limb.addChild(this, "lleg", "lfoot");
	Limb.addChild(this, "torso", "rleg");
	Limb.addChild(this, "rleg", "rfoot");
	
	//Put in the little things
	this.limbs.head.organs = {brain: new Template.Organ(), leye: new Template.Organ(), reye: new Template.Organ()};
	this.limbs.torso.organs = {heart: new Template.Organ(), llung: new Template.Organ(), rlung: new Template.Organ()};
	
	
	//Assign properties
	this.limbs.head.vital = true;
	
	this.limbs.head.armorinfluence.push("helm","shield");
	this.limbs.teeth.armorinfluence.push("helm","shield");
	this.limbs.torso.armorinfluence.push("chest","shield");
	this.limbs.larm.armorinfluence.push("chest","shield");
	this.limbs.rarm.armorinfluence.push("chest","shield");
	this.limbs.lhand.armorinfluence.push("gloves","shield");
	this.limbs.rhand.armorinfluence.push("gloves","shield");
	this.limbs.lleg.armorinfluence.push("legs");
	this.limbs.rleg.armorinfluence.push("legs");
	this.limbs.lfoot.armorinfluence.push("boots");
	this.limbs.rfoot.armorinfluence.push("boots");
	
	this.limbs.lhand.grasp = 100;
	this.limbs.rhand.grasp = 100;
	//this.limbs.teeth.graspable = 10;
	
}

Template.Limb = function() {

	this.grasp = 0;
	this.armorinfluence = [];
	this.status = 0;
	this.vital = false;
	this.parent = [];
	this.children = [];
	this.organs = {};

}

Template.Organ = function() {

	this.size = 1;
	this.status = 0;
	this.vital = false;
	this.functional = [];

}

Template.equipment = function() {

	this.kind = "dummy";
	this.actions = [];

}

Template.equipment.Dagger = function() {

	this.kind = "weapon";
	this.graspable = 10;
	this.actions = ["stab", "slash"];

}
Template.equipment.Dagger.prototype = new Template.equipment();

Template.equipment.Sword = function() {

	this.kind = "weapon";
	this.graspable = 100;
	this.actions = ["stab", "slash"];

}
Template.equipment.Sword.prototype = new Template.equipment();

Template.equipment.Shield = function() {

	this.kind = "shield";
	this.graspable = 100;
	this.actions = ["bash", "block"];
	this.resistances = {stab:100, pissproof:10000000};

}
Template.equipment.Shield.prototype = new Template.equipment();

Template.equipment.Chest = function() {

	this.kind = "chest";

}
Template.equipment.Chest.prototype = new Template.equipment();

Template.equipment.Legs = function() {

	this.kind = "legs";

}
Template.equipment.Legs.prototype = new Template.equipment();

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Equipment @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
	Equipment = function() { /* Equipment Placeholder */ }
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

Equipment.starterPack = function() {

	var equ = [];
	equ.push(Equipment.generateWeapon(0, ["sword","dagger"]));
	equ.push(Equipment.generateWeapon(0, "shield"));
	equ.push(Equipment.generateArmor(0, "chest"));
	equ.push(Equipment.generateArmor(0, "legs"));
	
	return equ;
}

Equipment.generateArmor = function(lvl, kind) {

	kind = Str.toCap(kind);
	var equ = {};

	if (typeof kind === "object") {
	
		console.log("Armor Generation : ["+kind.join(" or ")+"]");
		
		var ran = Math.floor(Math.random()*kind.length);
		if (Template.equipment.hasOwnProperty(kind[ran])) {
			equ = new Template.equipment[kind[ran]]();
		} else { color.error("Equipment.generateArmor : Invalid kind ["+kind[ran]+"] using a Chest placeholder"); equ = new Template.equipment.Chest(); }
		
	} else {
	
		console.log("Armor Generation : "+kind);
		if (Template.equipment.hasOwnProperty(kind)) {
			equ = new Template.equipment[kind]();
		} else { color.error("Equipment.generateArmor : Invalid kind ["+kind+"] using a Chest placeholder"); equ = new Template.equipment.Chest(); }
	
	}
	
	return equ;

}

Equipment.generateWeapon = function(lvl, kind) {

	kind = Str.toCap(kind);
	var equ = {};

	if (typeof kind === "object") {
	
		console.log("Weapon Generation : ["+kind.join(" or ")+"]");
		
		var ran = Math.floor(Math.random()*kind.length);
		if (Template.equipment.hasOwnProperty(kind[ran])) {
			equ = new Template.equipment[kind[ran]]();
		} else { color.error("Equipment.generateWeapon : Invalid kind ["+kind[ran]+"] using a Dagger placeholder"); equ = new Template.equipment.Dagger(); }
		
	} else {
	
		console.log("Weapon Generation : "+kind);
		if (Template.equipment.hasOwnProperty(kind)) {
			equ = new Template.equipment[kind]();
		} else { color.error("Equipment.generateWeapon : Invalid kind ["+kind+"] using a Dagger placeholder"); equ = new Template.equipment.Dagger(); }
	
	}
	
	return equ;

}

Equipment.addEquipment = function(ply, equ) {
	// To accomadate packs, we'll act as if everything is part of a pack (Array).
	if (Array.isArray(equ) == false) { var swap = []; swap.push(equ); equ = swap; }
	if (ply.hasOwnProperty('player')) { ply = ply.player; color.warning("Equipment.addEquipment called slowly (Entire 'uni' object sent), assuming adding to player."); }
	
	for (var ind = 0; ind < equ.length; ind++) {
	
		if (equ[ind].kind == "weapon" || equ[ind].kind == "shield") {
			//If weapon or shield, attempt to put it in a hand.
			var choices = [];
		
			for (lim in ply.limbs) {
				if (equ[ind].graspable <= ply.limbs[lim].grasp) {
					//Don't attempt to put item in a hand that is already holding something.
					var cangrasp = true;
					for (var equind = 0; equind < ply.equipment.length; equind++) {
						if (ply.equipment[equind].grasped == lim) { cangrasp = false; }
					}
					if (cangrasp) { choices.push(lim); }
				}
			}
			
			if (choices.length > 0) {
			
				var ran = Math.floor(Math.random()*choices.length);
				ply.equipment.push(equ[ind]);
				ply.equipment[ply.equipment.length-1].grasped = choices[ran];
			
			} else { color.warning("Equipment.addEquipment : No place to equip weapon!"); }
		
		} else {
			//Otherwise, treat as armor and just make sure there's only one of a kind.
			var canwear = true;
			for (var equind = 0; equind < ply.equipment.length; equind++) {
				if (ply.equipment[equind].kind == equ[ind].kind) { canwear = false; color.warning("Already wearing a ["+equ[ind].kind+"]"); }
			}
			if (canwear) {
				canwear = false;
				for (lim in ply.limbs) {
					if (ply.limbs[lim].armorinfluence.indexOf(equ[ind].kind) > -1) {
						canwear = true;
					}
				}
				if (canwear) { ply.equipment.push(equ[ind]); } else { color.warning("Nothing capable of wearing ["+equ[ind].kind+"]"); }
			}
			
		}
	
	}

}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ String Manipulation @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
	Str = { /* No sense making it a function, it's just a container not a constructor */ };
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
Str.toCap = function(obj) {

	if (typeof obj === "object") {
	
		for (var i = 0; i < obj.length; i++) {
			var cap = [];
			cap = obj[i].split("");
			cap[0] = cap[0].toUpperCase();
			cap = cap.join("");
			obj[i] = cap;
		}
	
	}
	
	if (typeof obj === "string") {
	
			var cap = [];
			cap = obj.split("");
			cap[0] = cap[0].toUpperCase();
			cap = cap.join("");
			obj = cap;
	
	}
	
	return obj;

}