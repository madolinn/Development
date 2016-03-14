import os, world, puzzles.functions
from colorize import write

completed = 0

def begin():
	global completed
	if (completed != 0):
		write("I've got plenty of wood. Deforestation, bad.")
		puzzles.functions.wait()
		return
	os.system('cls')
	write("Wow, what a forest. It's so vibrant. Woah! No way, Featherwhite trees!\nThese things don't weigh anything, I should grab a few of these.")
	write("\n\nI know I've got it in here somewhere..")
	r = puzzles.functions.testInput("axe")
	if (r):
		puzzles.functions.wait()
		os.system('cls')
		write("Timbbeeeerrrrrrrr.\n Got some [log]s!")
		puzzles.functions.wait()
		world._g['inv'].append("log")
		completed = 1
		return True