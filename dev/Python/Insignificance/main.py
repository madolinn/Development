import os, msvcrt, ctypes, struct, sys, random, time
import colorize, puzzles
from colorize import Colors, set_color, set_cursor, set_cursor_attr, write
from world import _g
	
def print_main_menu():
	set_cursor_attr(100,False)	#Turn cursor off.
	os.system('cls')
	w = 80						#Constant for width of console.
	write([
		"/"*w,
		"//"," "*((w-20)//2)," Insignificance "," "*((w-20)//2),"//",	#Add Blanks to pad the text to the center.
		"/"*w
		])
	set_color(Colors['Gray'], Colors['Black'])		#Write my name in gray.
	write([" "*(w-15),"// Jamie Phy //"])
	set_color(Colors['White'], Colors['Black'])
	write(["     Main Menu \x18\x19"])
	set_color(Colors['Gray'], Colors['Black'])
	write([" "*(w-32),"///////////////\n"])
	set_color(Colors['White'], Colors['Black'])
	if (_g['mm_ind'] == 0):
		print("\t\x10 Start\n\t  Exit")				#If the cursor is over start, show it.
	else:
		print("\t  Start\n\t\x10 Exit")				#Otherwise put the cursor on Exit.

def show_intro():
	set_color(Colors['BWhite'], Colors['White'])
	flakes = []										#Make a list of flakes to be.
	flake_pattern = ('\\','|','/','-')				#What the possible flakes could look like.
	dorfx = -10										#Set cutscene guy position.
	dorfy = 12
	color_stages = (Colors['BWhite'], Colors['White'], Colors['Gray'], Colors['Black'])	#Make a list of stages the colors will go through.
	color_stage = 0.0	#Index of color stage.
	
	while (_g['state'] == 0):	#While in cutscene.
		flakes.append([80,(int.from_bytes(os.urandom(1), byteorder='big') // 10),random.randint(0,3)])		#Try a different random method. Add a flake on a random Y
		if ((int.from_bytes(os.urandom(1), byteorder='big') // 64) == 0): 					# 1/4 Chance
			flakes.append([80,(int.from_bytes(os.urandom(1), byteorder='big') // 10),0])	#Add more than one flake randomly.
		scr = list("."*24*80)																#Make the screen as a series of .'s
		for flake in flakes:																#Go through all created flakes.
			flake[0]-=2																		#Move them left.
			if (flake[0]>=0 and flake[0]<=79 and flake[1]>=0 and flake[1]<=23):				#If on the screen.
				flake[2]+=1																	#Change flake pattern
				if (flake[2] > len(flake_pattern)-1):										#If it's out of range, make it 0 to be in range.
					flake[2] = 0
				scr[flake[0]+(flake[1]*80)] = flake_pattern[flake[2]]						#Set the position on the screen equal to the flake's pattern.
		if (dorfx >= 0):
			scr[int(dorfx)+(dorfy*80)]="\x02"	#If he's in screen, draw him.
		if (dorfx < 50):						#If he's less than 50 X, move him. If he's more than 43, move him slower.
			dorfx+=(.4-((dorfx>43)*.3))
			if ((int.from_bytes(os.urandom(1), byteorder='big') // 32) == 0):		#Chance to move vertically. Chance of a Chance to move in a direction.
				if ((int.from_bytes(os.urandom(1), byteorder='big') // 128) == 1):
					dorfy = min(dorfy+1,20)
				else:
					dorfy = max(dorfy-1,5)
		else:
			set_color(color_stages[min(3,int(color_stage))], color_stages[min(3,int(color_stage+1))])	#Screen begins to fade, set colors.
			color_stage += .05																			#Increment screen fading.
			if (color_stage >= 5):
				_g['state'] = 1		#Fading ended, so does cutscene.
		os.system('cls')
		write([''.join(scr)])		#Draw the screen list onto the screen.
		time.sleep(.1)
	
		
def show_main_menu():
	print_main_menu()
	while (_g['state'] == 0):
		keypress = int.from_bytes(msvcrt.getch(), byteorder='big')		#See if player is pressing Up or Down, move menu likewise.
		if (keypress == 80):
			_g['mm_ind'] = min(1,_g['mm_ind']+1)
			print_main_menu()
		elif (keypress == 72):
			_g['mm_ind'] = max(0,_g['mm_ind']-1)
			print_main_menu()
		elif (keypress == 13):
			if (_g['mm_ind'] == 0):		#If over Start and presses enter, show intro.
				show_intro()
				return True
			else:						#Otherwise, must be on Exit, quit game.
				return False

def create_tut_world():
	_g['tworld'] = list(' '*24*80)	#Make a fake world, same way we did cutscene.

	_g['tworld'][coord(40,12)] = 'H'	#Add Home in the middle.

def show_tut_world():
	old = colorize.current
	for plot in _g['tworld']:
		if plot == '.' or plot == 'H':	#Go through the world list, draw each index with correct color.
			set_color(Colors['Gray'])
		elif plot == ':':
			set_color(Colors['Green'])
		else:
			set_color(Colors['Magenta'])
		write(plot)
	set_color(old[0],old[1])
	
def coord(x,y):
	return (y*80)+x		#Convert X-Y to fake-world index.

def start_tutorial():	#Create fake world, explain how the world works.
	create_tut_world()
	show_tut_world()
	set_cursor(0,0)
	write("Welcome to Insignificance.\nWhat you're looking at right now is the world map.\n")
	puzzles.functions.wait()
	write("\nThe H in the center represents your starting camp. The map is currently bare\nbecause you have yet to explore the world.\n")
	puzzles.functions.wait()
	os.system('cls')
	_g['tworld'][coord(39,12)] = '.'
	_g['tworld'][coord(38,12)] = ':'
	_g['tworld'][coord(38,11)] = '.'
	
	_g['tworld'][coord(41,12)] = '?'
	_g['tworld'][coord(40,11)] = '?'
	_g['tworld'][coord(40,13)] = '?'
	_g['tworld'][coord(39,11)] = '?'
	_g['tworld'][coord(39,13)] = '?'
	_g['tworld'][coord(38,13)] = '?'
	_g['tworld'][coord(38,10)] = '?'
	_g['tworld'][coord(37,11)] = '?'
	_g['tworld'][coord(37,12)] = '?'
	show_tut_world()
	set_cursor(0,0)
	write("Upon completing puzzles, new locations will become available for you to\nexplore. These will be marked with magenta [?]s.\n")
	puzzles.functions.wait()
	write("\nThe game is not a straight path though. Be sure to revisit locations that have\nnot been completed, green [:]'s, after finding new items.")
	puzzles.functions.wait()
	write("\n\nIf you get stuck on a puzzle, just type [map] or press the Escape\nbutton to go back to the world.")
	puzzles.functions.wait()
	puzzles.functions.start(2,2)

def init():	#Start game, make screen 80x25
	os.system("mode con: lines=25 cols=80")
	set_color(Colors['White'], Colors['Black'])
	
	r = show_main_menu()	#Show menu, if Start, proceed, else, quit.
	if (r):
		start_tutorial()

if (__name__ == "__main__"):	#If not imported, start game.
	init()