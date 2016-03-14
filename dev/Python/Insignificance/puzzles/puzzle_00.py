import os, world, puzzles.functions
from colorize import write

#Every puzzle will not be commented as most are the same thing happening.

completed = 0		#Is the puzzle completed?

def begin():
	global completed
	if (completed != 0):	#If it has been completed, show some text, don't bring to puzzle.
		write("The day has just begun. I don't think I need to come back here for a while.")
		puzzles.functions.wait()
		return
	os.system('cls')	#If not, clear screen, spew out puzzle text.
	write("Today is a new day. Time to get up. Bandits occasionally come around at night\nso I keep my things locked up. I should probably get them out of the lock-box.")
	write("\n\nAlright. Brain teaser for the morning. How to open this lock...")
	write("\n\n[Tutorial]: Typing will bring up things you have in your inventory.\n Try typing the word 'key'.")
	r = puzzles.functions.testInput("key")	#Call function, ask to match the correct answer as 'key'
	if (r):	#If successful
		puzzles.functions.wait()
		os.system('cls')
		write("Alright, got my [bow], [axe], and a [knife].\nWish I had something to put these in though. Off we go!\n\nNew useable items will be labeled as [item_name] in the text.")	#Say what we got.
		puzzles.functions.wait()
		world._g['inv'].append("bow")	#Add what we got.
		world._g['inv'].append("axe")
		world._g['inv'].append("knife")
		completed = 1					#Mark as completed.
		return True