#Colorize module I made myself. Handles colors of CMD text, cursor position changing, and some other random bits.
import ctypes, sys

def write(arr):	#Print() replacement. I suppose I could just overwrite Print but I get lazy and use it sometimes.
	for strs in arr:	#If the strings came in as a list, go through it.
		sys.stdout.write(str(strs))	#Write each index as a string to the buffer.
	sys.stdout.flush() #Push it out, otherwise colors will be put onto wrong rows.

Colors = {	#Define colors as names as well, incase you want to be neat and use words. (colorize.)Colors["Red"] etc.
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

#Create C structures based on what the DLL would use. Structures can be obtained from Microsoft's website.

class COORD(ctypes.Structure):	#Ctypes library handles C type variables, as most DLLs are based on C types, not mutateable weird python ones.
	# Windows COORD structure
	_fields_ = [				#Assign a tuple, two indexes, X and Y, and make them both C type shorts.
		('X', ctypes.c_short),
		('Y', ctypes.c_short)
	]
	
class CONSOLE_CURSOR_INFO(ctypes.Structure):
	# Windows COORD structure
	_fields_ = [
		('dwSize', ctypes.c_int),	#Assign a tuple, two indexes, and make one C type int, the other a C type bool.
		('bVisible', ctypes.c_bool)
	]
	
STDOUT = ctypes.windll.kernel32.GetStdHandle(-11)	#STDOUT is the buffer the user sees. Microsoft says this is static at -11

def set_color(FORE, BACK=0):		#Make a function for changing colors.
	#Ordinarily the DLL uses a hex value for the background and foreground. First byte is back, second byte is fore.
	#Problem is that bitshifting is just an annoying thing to do. Luckily it can handle integers and convert them
	#To bytes as long as we base them in sets of 16s.
	#So if we take the first byte and multiply it by 16, we get the integer value.
	#Example - 0x15.
	#	First byte 1	Second byte 5
	#This would be equivalent to 21. (1*16)+5 = 21.
	ctypes.windll.kernel32.SetConsoleTextAttribute(STDOUT, FORE + (BACK*16))
	
def set_cursor(col, row=24):		#Make a function to set the cursor position.
	coords = COORD()				#Assign a data structure.
	coords.X = col					#Plug in the values.
	coords.Y = row
	ctypes.windll.kernel32.SetConsoleCursorPosition(STDOUT, coords)	#Send the values off to the DLL to handle.

def set_cursor_attr(size, visi=True):	#Make a function to set the cursor's size, or make it invisible completely.
	cInfo = CONSOLE_CURSOR_INFO()		#Assign structure.
	cInfo.dwSize = size					#Plug in.
	cInfo.bVisible = visi
	ctypes.windll.kernel32.SetConsoleCursorInfo(STDOUT, ctypes.byref(cInfo))	#Send.

def get_cursor_attr():					#Get the current cursor's size, and visibility. Useful for checking defaults.
	cInfo = CONSOLE_CURSOR_INFO()
	ctypes.windll.kernel32.GetConsoleCursorInfo(STDOUT, ctypes.byref(cInfo))
	return cInfo