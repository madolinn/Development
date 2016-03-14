import os, world, puzzles.functions
from colorize import write

completed = 0

def begin():
	global completed
	if (completed != 0):
		write("I'd rather not speak with those creepy men again.")
		puzzles.functions.wait()
		return
	os.system('cls')
	write("Seems like a gathering of some kind. Eh, they're all in hooded robes.\nI think I know what this is.. And so close to home.\nHopefully they aren't summoning some giant peacock to\nwreck my house or something.")
	write("\n\nThey won't even acknowledge my existance. Lucky me, no sarcasm.")
	r = puzzles.functions.testInput("ritualbook")
	if (r):
		puzzles.functions.wait()
		os.system('cls')
		write("They look very pleased. What did I just do..\nThey usher me further up the mountain.")
		puzzles.functions.wait()
		completed = 1
		return True