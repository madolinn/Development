import sys, os, msvcrt, items, world, puzzles, time
from colorize import write, set_cursor, set_color, set_cursor_attr

entry_string = ""			#What the user has physically entered. We won't be using input()

def start(x, y):

	coord = world._g['world'][(y*5)+x]			#Change an X,Y into an integer.

	if (coord >= 0 and coord <= len(puzzles.pl)-1):		#Make sure you're not somehow going out of range
		set_cursor_attr(100)							#Make cursor a big block.
		world._g['puzzle'] = coord						#Set curren puzzle.
		r = puzzles.pl[coord]()							#Start it. Get result.
		if (r == "End"):
			show_ending()
			return True
		if (r):
			world._g['dworld'][(y*5)+x] = 1				#If True, mark as completed
			expand_map(x,y)								#Expand the map to explore new areas.
			goto_map()									#And go to it.
		else:
			goto_map()									#If you 'map'ed or 'Esc'ed then go back to map.

def wait():			#Wait for any key to be pressed.
	while True:
		k = int.from_bytes(msvcrt.getch(), byteorder='big')
		if (k):
			break
	return
			
def testInput(ans):
	global entry_string
	set_cursor(0,20)
	while (True):													#msvcrt.getch() grabs keypress events for us.
		keycode = int.from_bytes(msvcrt.getch(), byteorder='big')	#Convert it to an int so we can more easily compare.
		if (keycode >= 97 and keycode <= 122):						#97 = a, 122 = z. Just make sure it's a letter.
			if (len(entry_string) < 15):							#Make sure someone isn't filling up the screen for some reason.
				write(chr(keycode))
				entry_string += chr(keycode)						#Convert from int:keycode to a letter, add to entry_string
				screen_refresh()
		elif (keycode == 8):	#Backspace keycode.
			do_backspace()
		elif (keycode == 13):	#Enter keycode.
			r = submit_entry()
			if (entry_string == ans and r == True):					#If it passed submit_entry, and the answer is the answer we're looking for, return true
				entry_string = ""
				return True
			if (entry_string == "map"):								#If we typed in "map" go back to map.
				entry_string = ""
				return False
			entry_string = ""
			screen_refresh()
		elif (keycode == 27):										#Esc, handle as if "map".
			entry_string = ""
			return False

def screen_refresh():		#Reprint the screen from scratch.
	show_suggestions()
	set_cursor(0,20)
	write([entry_string,(" "*15)])
	set_cursor(len(entry_string),20)
	
def do_backspace():			#Need to handle backspace properly.
	global entry_string		#entry_string is modified, declare it to be the global scope variable
	entry_string = entry_string[:-1]
	screen_refresh()
	
def show_suggestions():		#Make a auto-complete suggestion box for inputted text.
	sug = []
	if (len(entry_string) > 0):
		for item in sorted(world._g['inv']):		#Sort the list alphabetically, loop.
			esL = len(entry_string)
			if (len(sug) > 3):
				break
			if (entry_string == item[:esL].lower()):	#If the entry_string matches the substring of an item name
				sug.append(item)						#Add that item name to the suggestions
	while (len(sug) < 4):
		sug.append("")
	for ind, item in enumerate(sug):						#Write out suggestions 'bottom up'.
		set_cursor(5,19-ind)
		write('\t'+item+(" "*(20-len(item))))


def submit_entry():										#Handle Enter key.
	global entry_string
	for it in items.item:								#loop through items in world list.
		if (entry_string == it[0]):						#If it equals its name
			has = False
			for ite in world._g['inv']:					#Make sure you actually HAVE the item
				if (entry_string == ite):				#If so, true
					has = True
			preserved = entry_string
			entry_string = ""									#Erase entry. Don't want to have to backspace.
			screen_refresh()									#Update screen with new info.
			entry_string = preserved
			if (has == True):							#if you do have the item, say yay, go on.
				show_answer_text(it)
				return True

def show_answer_text(it):								#Respond to an answer with flavor text.
	set_cursor(1,15)
	write(" "*79)
	if (world._g['puzzle']+1 < len(it)):				#Make sure that there's an index for the response.
		if (it[world._g['puzzle']+1] != ""):			#If so, say it.
			set_cursor(1,15)
			print(it[world._g['puzzle']+1])
			return
	set_cursor(1,15)									#If not, display "What."
	print("What.")

def show_ending():		#Show the end dialog. It's on a time sequence for failed suspense.
	os.system('cls')
	write("Jeeze, it's snowing pretty hard. Even my hide jacket isn't protecting me.")
	time.sleep(4)
	write("\nWait, I was just in a cave on a mountain.. Where am I!")
	time.sleep(4)
	write("\nWhat! Am I going crazy? There's nothing behind me, I swear..")
	time.sleep(4)
	write("\nThis is inanse.. Is that someone up ahead?")
	time.sleep(3)
	write("\n'Hey!'  ")
	time.sleep(1)
	write("'HEY")
	time.sleep(1)
	write("Y")
	time.sleep(1)
	write("Y")
	time.sleep(1)
	write("Y!'")
	time.sleep(5)
	write("\nNo reply. I'll try and catch up...")
	time.sleep(4)
	write("so cold..")
	time.sleep(4)
	write("I can't..")
	time.sleep(7)
	write("-poof-")
	time.sleep(7)
	os.system('cls')
	set_cursor(39,5)
	set_color(0,4)
	write("End")
	wait()
	os._exit(1)	#Kill system because python does weird things and won't exit properly on its own.
	
def expand_map(x,y):
	coord = (y*5)+x			#X-Y to int.
	if (coord - 5 > -1):	#Reveal tile above current one as long as it's not out of range.
		world._g['dworld'][coord-5] = max(0,world._g['dworld'][coord-5])
	if (coord + 5 < 24):	#Reveal tile below current one as long as it's not out of range.
		world._g['dworld'][coord+5] = max(0,world._g['dworld'][coord+5])
	if (coord % 5 > 0):		#Reveal tile left current one as long as it's not out of range.
		world._g['dworld'][coord-1] = max(0,world._g['dworld'][coord-1])
	if (coord % 5 < 4):		#Reveal tile right current one as long as it's not out of range.
		world._g['dworld'][coord+1] = max(0,world._g['dworld'][coord+1])

def goto_map():
	set_cursor_attr(100,False)	#Don't display cursor.
	os.system('cls')
	map_input()					#Handle map movement

def draw_map():
	set_cursor(37,7)			#Set cursor to somewhere in the middle.
	for ind, visi in enumerate(world._g['dworld']):
		if (ind % 5 == 0):		#If it's the first index of a row, set the cursor's position.
			set_cursor(37,7+(ind//5))
		if (ind == 12):			#Special case for your Home.
			set_color(8)
			write("H")
			continue
		if (ind == 7 and visi == 1):	#Special case for merchants.
			set_color(2)
			write(":")
			continue
		if (ind == 23 and visi == 1):	#Special case for leatherworkers.
			set_color(2)
			write(":")
			continue
		if (visi == -1 or (world._g['world'][ind]==-1)):	#Make sure that we're not revealing maps we don't have discovered, or ones that don't have a puzzle.
			write(" ")
		elif (visi == 0):	#If visible but not completed
			set_color(5)
			write("?")
		elif (visi > 0):	#If completed
			set_color(8)
			write(".")
	set_color(7)
	set_cursor(world._g['x']+37,world._g['y']+7)	#Move cursor to current position. Draw face.
	write("\x02")
	set_cursor(0,0)
		
	
def map_input():
	while (True):
		draw_map()
		keycode = int.from_bytes(msvcrt.getch(), byteorder='big')	#Convert it to an int so we can more easily compare.
		if (keycode == 75):		#Move Left
			world._g['x'] = max(0,world._g['x']-1)	#Keep in range of map.
		elif (keycode == 77):	#Move Right
			world._g['x'] = min(4,world._g['x']+1) 	#''
		elif (keycode == 80):	#Move Down
			world._g['y'] = min(4,world._g['y']+1)	#''
		elif (keycode == 72):	#Move Up
			world._g['y'] = max(0,world._g['y']-1)	#''
		elif (keycode == 13):	#Enter keycode.
			if (world._g['dworld'][(world._g['y']*5)+world._g['x']] != -1):	#If it's visible, try to start puzzle at player position.
				start(world._g['x'], world._g['y'])
	