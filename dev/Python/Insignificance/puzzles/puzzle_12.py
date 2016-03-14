import os, world, puzzles.functions
from colorize import write

completed = 0

def begin():
	global completed
	if (completed != 0):
		write("Too many bugs, don't want to go back.")
		puzzles.functions.wait()
		return
	os.system('cls')
	write("So humid, gross. Bugs, everywhere. It's like a rainforest in here.\nNeat plants over this way though. And I mean ones that aren't going to eat me.\nDo do dooo. Ah here. Some Rope Plant, my personal\nunimaginative nickname for this.")
	write("\n\nShould be useful, do I have something to cut this down with?")
	r = puzzles.functions.testInput("knife")
	if (r):
		puzzles.functions.wait()
		os.system('cls')
		write("These are nice and strong. And you can detangle them into\nsingle strands as well.\nGot some [ropeplant]!")
		puzzles.functions.wait()
		world._g['inv'].append("ropeplant")
		completed = 1
		return True