import os, world, puzzles.functions
from colorize import write

completed = 0

def begin():
	global completed
	if (completed == 2):
		write("Looks like they're packing up for the day.")
		puzzles.functions.wait()
		return
	if (completed == 1):
		os.system('cls')
		write("Still the odd group of merchants 5 feet from home are here.")
		write("\n\nThis particular merchant says he's looking a mystical beast horn.\nPerhaps he's gone looney.")
		r = puzzles.functions.testInput("unicornhorn")
		if (r):
			puzzles.functions.wait()
			os.system('cls')
			write("He hands me a black [ritualbook]. Looks creepy.\nWoah, where'd he go.. Guess I'm not getting any hints to what this is.")
			puzzles.functions.wait()
			world._g['inv'].append("ritualbook")
			completed = 2
			return True
	if (completed == 0):
		os.system('cls')
		write("It looks like there's a group of merchants here. Odd. I never looked 5 feet to\nthe north to see them before. No sense worrying now!\nLet's see if they want anything.")
		write("\n\nThis particular merchant says he's looking for some food stock.")
		r = puzzles.functions.testInput("rawmeat")
		if (r):
			puzzles.functions.wait()
			os.system('cls')
			write("Oh nice, he says he'll barter with a [backpack]. Of course.\nNow I don't have to hold this raw meat in my hands.")
			puzzles.functions.wait()
			world._g['inv'].append("backpack")
			completed = 1
			return True