import os, world, puzzles.functions
from colorize import write

completed = 0

def begin():
	global completed
	if (completed != 0):
		write("I shouldn't need to inspect this thing, I did just repair it.")
		puzzles.functions.wait()
		return
	os.system('cls')
	write("What a ricketty looking bridge. I hate these things. Oh jeeze.\nOn top of it all, most of the planks seem rotted out. I could\n never make it across.")
	write("\n\nDo I have anything in here that'll help..")
	r = puzzles.functions.testInput("plank")
	if (r):
		puzzles.functions.wait()
		os.system('cls')
		write("That should do it. Lucky I had these.")
		puzzles.functions.wait()
		completed = 1
		return True