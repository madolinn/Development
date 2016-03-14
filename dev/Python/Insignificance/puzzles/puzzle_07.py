import os, world, puzzles.functions
from colorize import write

completed = 0

def begin():
	global completed
	if (completed != 0):
		write("How'd you manage this.")
		puzzles.functions.wait()
		return
	os.system('cls')
	write("Creepy looking cave they brought me to. It's so dark though,\nI can't see anything.\nThey gesture to me something, but I don't understand. Guess I'm on my own.")
	write("\n\nCome on brain, help me out.")
	r = puzzles.functions.testInput("strangeorb")
	if (r):
		puzzles.functions.wait()
		os.system('cls')
		write("They're telling me to raise it up. I can see something in it.\nIt looks like... me?\nI've got a really bad feeling about this...")
		puzzles.functions.wait()
		completed = 1
		return "End"