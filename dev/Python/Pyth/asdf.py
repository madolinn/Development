import os, msvcrt, ctypes, struct, sys, random, time
import colorize, puzzles
from colorize import Colors, set_color, set_cursor, set_cursor_attr

os.system("mode con: lines=25 cols=80")

def write(arr):
	for strs in arr:
		sys.stdout.write(strs)
	sys.stdout.flush() #Push it out, otherwise colors will be put onto wrong rows.

set_color(Colors['White'], Colors['Black'])

_g = {
	'mm_ind' : 0,
	'state' : 0,
	'world' : '',
	'dworld' : ''
}

def print_main_menu():
	set_cursor_attr(100,False)
	os.system('cls')
	w = 80
	write([
		"/"*w,
		"//"," "*((w-46)//2)," Some Game Name That Serves No Importance "," "*((w-46)//2),"//",
		"/"*w
		])
	set_color(Colors['Gray'], Colors['Black'])
	write([" "*(w-15),"// Jamie Phy //"])
	set_color(Colors['White'], Colors['Black'])
	write(["     Main Menu \x18\x19"])
	set_color(Colors['Gray'], Colors['Black'])
	write([" "*(w-32),"///////////////\n"])
	set_color(Colors['White'], Colors['Black'])
	if (_g['mm_ind'] == 0):
		print("\t\x10 Start\n\t  Exit")
	else:
		print("\t  Start\n\t\x10 Exit")

def show_intro():
	set_color(Colors['BWhite'], Colors['White'])
	flakes = []
	flake_pattern = ('\\','|','/','-')
	dorfx = -10
	dorfy = 12
	color_stages = (Colors['BWhite'], Colors['White'], Colors['Gray'], Colors['Black'])
	color_stage = 0.0
	
	while (_g['state'] == 0):
		flakes.append([80,(int.from_bytes(os.urandom(1), byteorder='big') // 10),0])	
		if ((int.from_bytes(os.urandom(1), byteorder='big') // 64) == 0): # 1/4 Chance
			flakes.append([80,(int.from_bytes(os.urandom(1), byteorder='big') // 10),0])			
		scr = list("."*24*80)
		for flake in flakes:
			flake[0]-=2
			if (flake[0]>=0 and flake[0]<=79 and flake[1]>=0 and flake[1]<=23):
				flake[2]+=1
				if (flake[2] > len(flake_pattern)-1):
					flake[2] = 0
				scr[flake[0]+(flake[1]*80)] = flake_pattern[flake[2]]
		if (dorfx >= 0):
			scr[int(dorfx)+(dorfy*80)]="\x02"
		if (dorfx < 50):
			dorfx+=(.4-((dorfx>43)*.3))
			if ((int.from_bytes(os.urandom(1), byteorder='big') // 32) == 0):
				if ((int.from_bytes(os.urandom(1), byteorder='big') // 128) == 1):
					dorfy = min(dorfy+1,20)
				else:
					dorfy = max(dorfy-1,5)
		else:
			set_color(color_stages[min(3,int(color_stage))], color_stages[min(3,int(color_stage+1))])
			color_stage += .05
			if (color_stage >= 6):
				_g['state'] = 1
		os.system('cls')
		write([''.join(scr)])
		time.sleep(.1)
	
		
def show_main_menu():
	print_main_menu()
	while (_g['state'] == 0):
		keypress = int.from_bytes(msvcrt.getch(), byteorder='big')
		if (keypress == 80):
			_g['mm_ind'] = min(1,_g['mm_ind']+1)
			print_main_menu()
		elif (keypress == 72):
			_g['mm_ind'] = max(0,_g['mm_ind']-1)
			print_main_menu()
		elif (keypress == 13):
			show_intro()

def create_world():
	_g['dworld'] = list(' '*24*80)

	_g['dworld'][coord(40,12)] = 'H'

def show_world():
	old = colorize.current
	#print(''.join(_g['dworld']))
	for plot in _g['dworld']:
		if plot == '.' or plot == 'H':
			set_color(Colors['Gray'])
		elif plot == ':':
			set_color(Colors['Green'])
		else:
			set_color(Colors['Magenta'])
		write(plot)
	set_color(old[0],old[1])

def wait():
	while True:
		k = int.from_bytes(msvcrt.getch(), byteorder='big')
		if (k):
			break
	return
	
def coord(x,y):
	return (y*80)+x

def start_puzzle(puz):
	if (puz == 1):
		asidnmaisdkma = ""
		

def start_tutorial():
	create_world()
	show_world()
	set_cursor(0,0)
	write("Welcome to Insignificance.\nWhat you're looking at right now is the world map.\n")
	wait()
	write("\nThe H in the center represents your starting camp. The map is currently bare\nbecause you have yet to explore the world.\n")
	wait()
	os.system('cls')
	_g['dworld'][coord(39,12)] = '.'
	_g['dworld'][coord(38,12)] = ':'
	_g['dworld'][coord(38,11)] = '.'
	
	_g['dworld'][coord(41,12)] = '?'
	_g['dworld'][coord(40,11)] = '?'
	_g['dworld'][coord(40,13)] = '?'
	_g['dworld'][coord(39,11)] = '?'
	_g['dworld'][coord(39,13)] = '?'
	_g['dworld'][coord(38,13)] = '?'
	_g['dworld'][coord(38,10)] = '?'
	_g['dworld'][coord(37,11)] = '?'
	_g['dworld'][coord(37,12)] = '?'
	show_world()
	set_cursor(0,0)
	write("Upon completing puzzles, new locations will become available for you to\nexplore. These will be marked with magenta [?]s.\n")
	wait()
	write("\nThe game is not a straight path though. Be sure to revisit locations that have\nnot been marked completed, but have already been partially solved, after\nacquring new items. They could prove useful in these places. These will be\nrepresented by green [:]s.\n")
	wait()
	start_puzzle(0)
	
start_tutorial()