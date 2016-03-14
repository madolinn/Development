import os, world, puzzles.functions
from colorize import write

completed = 0

def begin():
	global completed
	if (completed == 2):
		write("Don't need to bother them anymore.")
		puzzles.functions.wait()
		return
	if (completed == 1):
		os.system('cls')
		write("Looks like they're making other stuff in the mean time.")
		write("\n\nTougher string. Hmmm.")
		r = puzzles.functions.testInput("ropeplant")
		if (r):
			puzzles.functions.wait()
			os.system('cls')
			write("Wait around for a bit and they'll make quick work of it.\nGot a [jacket]!\n\nSo warm. This should be handy.")
			puzzles.functions.wait()
			world._g['inv'].append("jacket")
			completed = 2
			return True
	if (completed == 0):
		os.system('cls')
		write("Looks like a little cabin up ahead. Wonder if anyone is home.\nSure enough, a small family is outside. They say they're looking for some\nheavier materials, this winter is going to be rough. They'd be happy to make\nme something if I came across anything.")
		write("\n\nDo I have anything that fits the bill.")
		r = puzzles.functions.testInput("hide")
		if (r):
			puzzles.functions.wait()
			os.system('cls')
			write("That'll work they say. But I'll need to get them some tougher thread to sew it.")
			puzzles.functions.wait()
			completed = 1
			return True