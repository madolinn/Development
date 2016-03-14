import os, world, puzzles.functions, time, random, msvcrt
from colorize import write, set_color, set_cursor, set_cursor_attr

completed = 0

def begin():
	global completed
	if (completed != 0):
		write("I can't deal with the creepers anymore.")
		puzzles.functions.wait()
		return
	os.system('cls')
	write("Oh jeeze what now. Who is this clown? Dressed in a clown suit in the middle\nof a forest.")
	puzzles.functions.wait()
	write("\n\nHe gestures me over. Whatever. Let's get this over with.\nHe begins talking.. But I have other plans")
	puzzles.functions.wait()
	time.sleep(1)
	os.system('cls')
	write("Press the corresponding keys on the keyboard as they appear on the screen.\nPressing them quickly will net you a better score.")
	puzzles.functions.wait()
	time.sleep(1)
	os.system('cls')
	time.sleep(1)
	set_color(4)
	write("\tWELCOME")
	time.sleep(1)
	write("\n\t\tTO")
	time.sleep(1)
	write("\n\t\t\tPUNCH PUNCH")
	time.sleep(1)
	write("\n\t\t\t\t\t~REVOLUTION~")
	time.sleep(2)
	os.system('cls')
	
	score = 0
	letter = -1
	timer = 0
	
	start = time.clock()
	
	set_cursor_attr(100,False)
	
	while score < 30:
		set_color(6)
		set_cursor(0,0)
		write(["SCORE: ",score," "*20])
		if (letter == -1):
			timer = time.clock()
			letter = random.randint(0,25)
		else:
			set_color(8)
			set_cursor(40,5)
			write(chr(letter+97))
		if msvcrt.kbhit():
			keycode = int.from_bytes(msvcrt.getch(), byteorder='big')
			if (keycode >= 97 and keycode <= 122):
				if (keycode-97 == letter):
					score += int(((timer+4)-time.clock()))
					letter = -1
	os.system('cls')
	write(["Congratulations, you punched out the creeper in ",str(int((time.clock()-start)*10)/10)," seconds!"])
	time.sleep(1)
	puzzles.functions.wait()
	return True
	