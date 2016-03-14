import os, world, puzzles.functions
from colorize import write

completed = 0

def begin():
	global completed
	if (completed != 0):
		write("Not much left here to do. Unless I want to eat some grass... next to a bear den.")
		puzzles.functions.wait()
		return
	os.system('cls')
	write("Well lets go for a walk shall we. And looky here, we've got a bear.\nSeems to be guarding its den. Maybe there's some goodies in\nthere, who knows. Regardless, I'm hungry.")
	write("\n\nLet's see. How to dispatch this beast today.")
	r = puzzles.functions.testInput("bow")
	if (r):
		puzzles.functions.wait()
		os.system('cls')
		write("I sure hope it's dead.\n Got some [rawmeat]!\n\nAnything in the den? Let's have a looksie.")
		puzzles.functions.wait()
		world._g['inv'].append("rawmeat")
		completed = 1
		return True