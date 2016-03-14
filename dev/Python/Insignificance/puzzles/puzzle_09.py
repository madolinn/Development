import os, world, puzzles.functions
from colorize import write

completed = 0

def begin():
	global completed
	if (completed != 0):
		write("That place was scary, no thanks.")
		puzzles.functions.wait()
		return
	os.system('cls')
	write("It's really thick here. There's a clearing up ahead though.\nTwo animals are fighting, a yak and a snow leopard. Poor yak, doesn't look like\nhe's coming out on top. Something just spooked that lepoard though,\nhe's running away.")
	write("\n\nIt's dead alright. It's got a really nice hide, maybe it'll be useful.")
	r = puzzles.functions.testInput("knife")
	if (r):
		puzzles.functions.wait()
		os.system('cls')
		write("Skin this real quick. That'll do it.\nGot a [hide]!")
		puzzles.functions.wait()
		world._g['inv'].append("hide")
		completed = 1
		return True