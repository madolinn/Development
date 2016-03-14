import os, world, puzzles.functions
from colorize import write
from time import sleep

completed = 0

def begin():
	global completed
	if (completed != 0):
		write("Never again.")
		puzzles.functions.wait()
		return
	os.system('cls')
	write("There's a man sitting in a rocking chair in the middle of the field.\nNothing around for miles. What a looney. As I approach he turns to me.")
	write("\nNow sonny. Did I ever tell you about the day I got beat up by a girl?")
	puzzles.functions.wait()
	sleep(3)
	write("\n\nWell it all started many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many many....\nI think he fell asleep.")
	puzzles.functions.wait()
	sleep(8)
	write("\n\nHe's got a fishing pole in his hands. It's not like he's using it, I'll just-\nOH SORRY SONNY. Anyways. I was just resting my eyes. I was on a boat in the\nmiddle of January on this very desert. It was such a nice day. The birds were\nfalling out of the sky, precooked, ready to be eaten. The sand was so hot it\nturned to glass and reflected the sun...")
	puzzles.functions.wait()
	sleep(5)
	write("\n\nThere he goes again...")
	puzzles.functions.wait()
	sleep(3)
	write("\n\nWah huh. Oh. Oh yeah. I remember you.\nOh brother... He looks at me, not knowing who I am at all.\nCan I have your fishing pole?")
	puzzles.functions.wait()
	sleep(3)
	write("\n\nHe looks at me. Well, looks past me. It's like he's peering into my soul. It's\nspooky. Jeeze old man, you really are looney.\nHello? What's the deal old man?")
	puzzles.functions.wait()
	sleep(3)
	write("\n\nHUH WAH, Is it time for dinner already? Oh sonny, sonny. How nice of you to\nvisit again. He's out like a lamp again.")
	puzzles.functions.wait()
	sleep(3)
	write("\n\nI'll take his fi- OH SONNY I REMEMBERED.\nJEEZE THIS MAN IS INSANE. BRAIN PLEASE. SHUT OFF I CAN'T STAND IT.")
	puzzles.functions.wait()
	sleep(3)
	write("\n\nOh Phillup. I'm so.. Phil. My dear Phil. Did I ever tell you about the day\nI ate a cake and there was a stapler in it?\nI wonder why old man...\nIt was a wonderful day, I tell you. Well sit down, I'll tell you a story Donald.")
	puzzles.functions.wait()
	sleep(8)
	write("\nI can't. Deal. Endure. I need that fishing pole. I'll just play some music in\nmy head until he's done.")
	puzzles.functions.wait()
	sleep(8)
	os.system('cls')
	write("He's out for good.\n\nI should replace the rod with something so he doesn't wake up and notice\nright away.")
	r = puzzles.functions.testInput("log")
	if (r):
		puzzles.functions.wait()
		os.system('cls')
		write("I'll swap his [fishingpole] for a [log]. He's senile anyways.")
		puzzles.functions.wait()
		world._g['inv'].append("fishingpole")
		completed = 1
		return True