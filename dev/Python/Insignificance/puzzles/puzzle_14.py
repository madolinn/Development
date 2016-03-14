import os, world, puzzles.functions
from colorize import write

completed = 0

def begin():
	global completed
	if (completed != 0):
		write("I've enough fish for today.")
		puzzles.functions.wait()
		return
	os.system('cls')
	write("A decent sized pond sits in front of me. Next to the sitting pond\nis a normal pond, not sitting, but in the ground as it should be.")
	write("\n\nThat thing would be helpful here.")
	r = puzzles.functions.testInput("fishingpole")
	if (r):
		puzzles.functions.wait()
		os.system('cls')
		write("I've got a big one! Let's take a look. As I'm looking at the fish...")
		puzzles.functions.wait()
		write("\n'A HERRRRRINNGGGG!'\nWho said that? Well... Got a [herring]?")
		puzzles.functions.wait()
		world._g['inv'].append("herring")
		completed = 1
		return True