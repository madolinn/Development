
var gems = ["Abyssal Cry",
"Ancestral Protector",
"Anger",
"Animate Guardian",
"Cleave",
"Decoy Totem",
"Determination",
"Devouring Totem",
"Dominating Blow",
"Earthquake",
"Enduring Cry",
"Flame Totem",
"Glacial Hammer",
"Ground Slam",
"Heavy Strike",
"Herald of Ash",
"Ice Crash",
"Immortal Call",
"Infernal Blow",
"Leap Slam",
"Molten Shell",
"Molten Strike",
"Punishment",
"Purity of Fire",
"Rallying Cry",
"Reckoning",
"Rejuvenation Totem",
"Searing Bond",
"Shield Charge",
"Shockwave Totem",
"Static Strike",
"Summon Flame Golem",
"Summon Stone Golem",
"Sunder",
"Sweep",
"Vengeance",
"Vigilant Strike",
"Vitality",
"Warlord's Mark",
"Animate Weapon",
"Arctic Armour",
"Barrage",
"Bear Trap",
"Blade Vortex",
"Bladefall",
"Blast Rain",
"Blink Arrow",
"Blood Rage",
"Burning Arrow",
"Caustic Arrow",
"Cyclone",
"Desecrate",
"Detonate Dead",
"Double Strike",
"Dual Strike",
"Elemental Hit",
"Ethereal Knives",
"Explosive Arrow",
"Fire Trap",
"Flicker Strike",
"Freeze Mine",
"Frenzy",
"Frost Blades",
"Grace",
"Haste",
"Hatred",
"Herald of Ice",
"Ice Shot",
"Ice Trap",
"Lightning Arrow",
"Lightning Strike",
"Mirror Arrow",
"Phase Run",
"Poacher's Mark",
"Projectile Weakness",
"Puncture",
"Purity of Ice",
"Rain of Arrows",
"Reave",
"Riposte",
"Shrapnel Shot",
"Siege Ballista",
"Smoke Mine",
"Spectral Throw",
"Split Arrow",
"Summon Ice Golem",
"Temporal Chains",
"Tornado Shot",
"Viper Strike",
"Whirling Blades",
"Wild Strike",
"Ancestral Warchief",
"Arc",
"Arctic Breath",
"Assassin's Mark",
"Ball Lightning",
"Bone Offering",
"Clarity",
"Cold Snap",
"Conductivity",
"Contagion",
"Conversion Trap",
"Convocation",
"Discharge",
"Discipline",
"Elemental Weakness",
"Enfeeble",
"Essence Drain",
"Fire Nova Mine",
"Fireball",
"Firestorm",
"Flame Dash",
"Flame Surge",
"Flameblast",
"Flammability",
"Flesh Offering",
"Freezing Pulse",
"Frost Bomb",
"Frost Wall",
"Frostbite",
"Frostbolt",
"Glacial Cascade",
"Herald of Thunder",
"Ice Nova",
"Ice Spear",
"Incinerate",
"Kinetic Blast",
"Lacerate",
"Lightning Tendrils",
"Lightning Trap",
"Lightning Warp",
"Magma Orb",
"Orb of Storms",
"Power Siphon",
"Purity of Elements",
"Purity of Lightning",
"Raise Spectre",
"Raise Zombie",
"Righteous Fire",
"Shock Nova",
"Spark",
"Spirit Offering",
"Storm Call",
"Summon Chaos Golem",
"Summon Lightning Golem",
"Summon Raging Spirit",
"Summon Skeletons",
"Tempest Shield",
"Vortex",
"Vulnerability",
"Wither",
"Wrath"];

moduLoad.ready = function() {

	var r = Math.floor(Math.random()*gems.length);
	
	var c = "#22F";
	
	if (r < 91) { c = "#2F2"; }
	if (r < 39) { c = "#F22"; }
	
	$("#wrapper").css("color",c);
	
	$("#wrapper").html(gems[r]);

}