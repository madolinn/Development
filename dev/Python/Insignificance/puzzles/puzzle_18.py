import os, world, puzzles.functions
from colorize import write

completed = 0

def begin():
	global completed
	if (completed != 0):
		write("One path is enough.")
		puzzles.functions.wait()
		return
	os.system('cls')
	write("Here the forest-jungle-mountain-ravine terrain gets super thick.\nI'm going to need some way to get rid of these to get through\notherwise I'm going to get really scratched up and tattered.")
	write("\n\nAnything in my handy dandy backpack?")
	r = puzzles.functions.testInput("machete")
	if (r):
		puzzles.functions.wait()
		os.system('cls')
		write("Easy as... pie? That doesn't even make sense..")
		puzzles.functions.wait()
		completed = 1
		return True