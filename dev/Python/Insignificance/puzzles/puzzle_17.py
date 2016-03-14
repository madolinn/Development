import os, world, puzzles.functions
from colorize import write

completed = 0

def begin():
	global completed
	if (completed != 0):
		write("Already made some unsafe bridges.")
		puzzles.functions.wait()
		return
	os.system('cls')
	write("There's a huge ravine in front of me. Doesn't look like there's anything to\nclimb over to get to the other side. It's not very wide, however. Still not\nnarrow enough for me to jump across.")
	write("\n\nHave I got anything that could be of use?")
	r = puzzles.functions.testInput("log")
	if (r):
		puzzles.functions.wait()
		os.system('cls')
		write("Good thing I was carrying a log in my pocket.\nAnd now that I'm here, I see a machete. Doesn't look like anyone is using it.\nGot a [machete]!")
		puzzles.functions.wait()
		world._g['inv'].append("machete")
		completed = 1
		return True