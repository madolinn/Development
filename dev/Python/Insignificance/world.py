#Make an object that can be readily imported into other files, handles all the world and game states.

_g = {
	#Tutorial fake world to be.
	'tworld' : '',
	
	#Player position
	'x' : 2,
	'y' : 2,
	
	#Main menu, Start or Exit.
	'mm_ind' : 0,
	
	#Used once or twice for cutscene.
	'state' : 0,
	
	#Make a list of the actual puzzle numbers in their order.
	'world' : [	8,10,13, 5, 2,
				 9,-1, 3,-1, 6,
				17, 1, 0,-1, 7,
				16,-1, 4,14,-1,
				12,-1,18,11,15],
				
	#Make a list of the discovered world.
	'dworld' : [-1,-1,-1,-1,-1,
				-1,-1,-1,-1,-1,
				-1,-1, 1,-1,-1,
				-1,-1,-1,-1,-1,
				-1,-1,-1,-1,-1],
				
	#Items the player actually has.
	'inv' : ["map","key"],
	
	#Current puzzle the player is on.
	'puzzle' : -1
}
