#Colorize module I made myself. Handles colors of CMD text, cursor position changing, and some other random bits.
#Uses external C++ calls to extend the capability of the console,




#				just like random and time modules do.
#				just like random and time modules do.
#				just like random and time modules do.
#				just like random and time modules do.
#				just like random and time modules do.
#				just like random and time modules do.
#				just like random and time modules do.
#				just like random and time modules do.
#				just like random and time modules do.



#Already commented this exact file up previously, you hate what it does, end.


import ctypes, sys

current = [7,0]

Colors = { #Define colors as names as well, incase you want to be neat and use words. (colorize.)Colors["Red"] etc.
	'Black' : 0,
	'Blue' : 1,
	'Green' : 2,
	'Cyan' : 3,
	'Red' : 4,
	'Magenta' : 5,
	'Yellow' : 6,
	'White' : 7,
	'Gray' : 8,
	
	'BBlue' : 9,
	'BGreen' : 10,
	'BCyan' : 11,
	'BRed' : 12,
	'BMagenta' : 13,
	'BYellow' : 14,
	'BWhite' : 15
}

class COORD(ctypes.Structure):
	# Windows COORD structure
	_fields_ = [
		('X', ctypes.c_short),
		('Y', ctypes.c_short)
	]
	
class CONSOLE_CURSOR_INFO(ctypes.Structure):
	# Windows COORD structure
	_fields_ = [
		('dwSize', ctypes.c_int),
		('bVisible', ctypes.c_bool)
	]

STDOUT = ctypes.windll.kernel32.GetStdHandle(-11)

def set_color(FORE, BACK=0):
	ctypes.windll.kernel32.SetConsoleTextAttribute(STDOUT, FORE + (BACK*16))
	current = [FORE, BACK]
	
def set_cursor(col, row=24):
	coords = COORD()
	coords.X = col
	coords.Y = row
	ctypes.windll.kernel32.SetConsoleCursorPosition(STDOUT, coords)

def set_cursor_attr(size, visi=True):
	cInfo = CONSOLE_CURSOR_INFO()
	cInfo.dwSize = size
	cInfo.bVisible = visi
	ctypes.windll.kernel32.SetConsoleCursorInfo(STDOUT, ctypes.byref(cInfo))

def get_cursor_attr():
	cInfo = CONSOLE_CURSOR_INFO()
	ctypes.windll.kernel32.GetConsoleCursorInfo(STDOUT, ctypes.byref(cInfo))
	return cInfo

def write(arr):
	for strs in arr:
		sys.stdout.write(str(strs))
	sys.stdout.flush() #Push it out, otherwise colors will be put onto wrong rows.