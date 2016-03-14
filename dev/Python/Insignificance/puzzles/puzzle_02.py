import os, world, puzzles.functions
from colorize import write

completed = 0

def begin():
	global completed
	if (completed != 0):
		write("I can't imagine finding two unicorns in one lifetime.")
		puzzles.functions.wait()
		return
	os.system('cls')
	write("What is that? A horse? It's massive and white. Oh my lord, it has a horn! Am I\ndreaming? They say a unicorn's horn is used in some weird medicine. But do I even need it?")
	write("\n\nWait, seriously? I want to kill a unicorn?")
	r = puzzles.functions.testInput("bow")
	if (r):
		puzzles.functions.wait()
		os.system('cls')
		write("I'm so sorry friend.\n You obtained a [unicornhorn]!")
		puzzles.functions.wait()
		world._g['inv'].append("unicornhorn")
		completed = 1
		return True