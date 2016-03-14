import os, world, puzzles.functions, time
from colorize import write

completed = 0

def begin():
	global completed
	if (completed != 0):
		write("He's no where to be seen.")
		puzzles.functions.wait()
		return
	os.system('cls')
	write("A knight wearing all black stands in my way. He's eyeing me up and down.\nHe's coming up real close to me.")
	puzzles.functions.wait()
	write("\n\nBring me....")
	puzzles.functions.wait()
	time.sleep(2)
	write("\nA HERRRING!!!!!!!!!")
	write("\n\nHow to dispatch THIS beast.")
	r = puzzles.functions.testInput("herring")
	if (r):
		puzzles.functions.wait()
		os.system('cls')
		write("'Now take this, and cut dow-' he turns to point to something in the distance\nbut misses his step and falls down the hill.\nPath is clear.")
		puzzles.functions.wait()
		completed = 1
		return True