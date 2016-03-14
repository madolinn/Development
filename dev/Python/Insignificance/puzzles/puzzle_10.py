import os, world, puzzles.functions
from colorize import write

completed = 0

def begin():
	global completed
	if (completed != 0):
		write("That man was kind, I shouldn't bother him anymore.")
		puzzles.functions.wait()
		return
	os.system('cls')
	write("A sawmill in the forest, neat. Let's see if anyone is home. 'Helloooo~!'\nA short man came out from the cabin. He says he's taking the day off today,\nso I'm free to use the sawmill for personal use. So kind.")
	write("\n\nNow, do I actually have anything to use?")
	r = puzzles.functions.testInput("log")
	if (r):
		puzzles.functions.wait()
		os.system('cls')
		write("Toss these on through.\n Got some [plank]s!\n\nNow lighter than before.")
		puzzles.functions.wait()
		world._g['inv'].append("plank")
		completed = 1
		return True