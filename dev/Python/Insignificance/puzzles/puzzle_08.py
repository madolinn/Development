import os, world, puzzles.functions
from colorize import write

completed = 0

def begin():
	global completed
	if (completed != 0):
		write("I can't imagine finding much else in that blizzard without freezing.")
		puzzles.functions.wait()
		return
	os.system('cls')
	write("It's so cold, I better turn back unless I've got something to warm me up.")
	write("\n\nReally should hurry this up brain.")
	r = puzzles.functions.testInput("jacket")
	if (r):
		puzzles.functions.wait()
		os.system('cls')
		write("I hope that's not what I think it is.\nOh, no no. Poor guy. He's dead alright. He's half buried in snow and\nfrozen stiff.\nI wonder if he's got anything I could use inside his backpack.\nRotted wood? Shattered tools. Broken bow string.. and what's this..\n Got a... [strangeorb]?\n\nI'll come back for him when it's not as bad.")
		puzzles.functions.wait()
		world._g['inv'].append("strangeorb")
		completed = 1
		return True