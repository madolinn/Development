#Program Name: Hanging Worm [Homework_05]
#Developer: Jamie Phy
#Date: 6/15/2014
#Description: Hangman

#Requires: [Python 3.2.5]
#Additional Comments: Comments are aligned for Notepad++, IDLE doesn't display them so well.

import os, colorize, msvcrt, random
os.system('mode con: LINES=26 COLS=26')	#Set console size to 26x26

#Set up my noose picture.
noose = """\t________
\t||     |
\t||
\t||
\t||
\t||
\t||
\t||
\t||======"""

_g = {	#Make a game object container. _If_ I needed to pass things to functions it'd be easier to pass an object.
	"available_words" : ["sandwhich man","radioactive","hypothermia","hyperthermia","rotten socks","politics","in the navy","sausage gravy","a big ol yacht","obamacare","obama dont care","superfish","ham and bacon","fourteenth word","a phrase"],	#Word list.
	"phrase" : "",		#Current phrase
	"revealed" : "",	#Unspoiled phrase that the player has guessed thus far.
	"guessed" : 0,		#Placeholder for a list of guessed letters.
	"wrong" : 0			#Numerical representation of how many times the player has guessed wrong.
}

def setRevealed():
	reveal = _g["phrase"]							#Copy correct phrase.
	conv = "abcdefghijklmnopqrstuvwxyz"				#Set up a conversion string.
	for ind, let in enumerate(_g["guessed"]):		#Loop through guessed list as an enumerated list.
		if (_g["guessed"][ind] == 0):				#If letter at position ind in the guessed list hasn't been guessed
			reveal = reveal.replace(conv[ind],"_")	#Replace that would be letter with an underscore
	return reveal									#Return the editted list
	

def showEndGame():
	if (_g["wrong"] == 10):	#If you lost, say so, ask if you want to play again.
		os.system('cls')
		print("\n\nOh no! Sir Wiggles has\n been hung. The correct\n phrase was: \n"+_g["phrase"]+"\n\n     Would you like to\n        play again?")
	else:
		os.system('cls')	#Draw fancy Sir Wiggles
		colorize.set_cursor(12,3)
		colorize.write("O")
		colorize.set_cursor(12,4)
		colorize.write("|")
		colorize.set_cursor(12,5)
		colorize.write("|")
		colorize.set_cursor(13,6)
		colorize.write("\\")
		colorize.set_cursor(14,6)
		colorize.write("_")
		colorize.set_cursor(15,6)
		colorize.write("/")
		colorize.set_cursor(16,5)
		colorize.write("|")
		colorize.set_cursor(17,4)
		colorize.write("_")
		colorize.set_cursor(18,4)
		colorize.write("_")
		colorize.set_cursor(19,5)
		colorize.write("\\")
		colorize.set_cursor(0,10)
		colorize.write("Hurray you saved Sir\n Wiggles from death by\n hanging. ")
		if (_g["wrong"] > 0):	#Display how many times Sir Wiggles was injured if a wrong guess came up.
			s = ""
			if (_g["wrong"] > 1):	#Grammar.
				s = "s"
			colorize.write("He was only\n injured "+str(_g["wrong"])+" time"+s+".")
		print("\n\n     Would you like to\n        play again?")
	getRetry()	#Ask if you want to retry, regardless of win or loss.
	
def newPhrase():
	return _g["available_words"][random.randint(0,len(_g["available_words"])-1)]	#Return a random phrase from the list between 0 and the length of the list-1

def showWrong():
	colorize.set_cursor(0,1)
	colorize.write(noose)	#Draw my noose at (0,1)
	if (_g["wrong"] >= 1):	#Draw pieces of Sir Wiggles for each one wrong, up to 10.
		colorize.set_cursor(15,3)
		colorize.write("O")
	if (_g["wrong"] >= 2):
		colorize.set_cursor(15,4)
		colorize.write("|")
	if (_g["wrong"] >= 3):
		colorize.set_cursor(15,5)
		colorize.write("|")
	if (_g["wrong"] >= 4):
		colorize.set_cursor(16,6)
		colorize.write("\\")
	if (_g["wrong"] >= 5):
		colorize.set_cursor(17,6)
		colorize.write("_")
	if (_g["wrong"] >= 6):
		colorize.set_cursor(18,6)
		colorize.write("/")
	if (_g["wrong"] >= 7):
		colorize.set_cursor(19,5)
		colorize.write("|")
	if (_g["wrong"] >= 8):
		colorize.set_cursor(20,4)
		colorize.write("_")
	if (_g["wrong"] >= 9):
		colorize.set_cursor(21,4)
		colorize.write("_")
	if (_g["wrong"] >= 10):
		colorize.set_cursor(22,5)
		colorize.write("\\")
	colorize.set_cursor(0,10)	#Set the cursor back to where it should be.
	
def checkGuess(k):
	letter = chr(k)								#Convert numeric to a letter.
	if (_g["guessed"][k-97] == 0):				#The letter a = 97. So [a-97 = 0]. Index 0 represents the letter a, b is 1, c is 2, etc. Check if not guessed
		_g["guessed"][k-97] = 1					#1 represents a right guess.
		_g["revealed"] = setRevealed()			#Update the revealed phrase.
		if (_g["phrase"].find(letter) == -1):	#If you can't find the letter in the phrase
			_g["guessed"][k-97] = 2				#2 represents a wrong guess.
			_g["wrong"] += 1					#You got one wrong. Increment.
	if (_g["revealed"].find("_") == -1):		#Check to see if you won by attempting to find underscores.
		return True								#Return True if you won. Otherwise ignore it and it'll assume null/false.

def getInput():
	while (_g["wrong"] < 10):					#While you still have guesses left.
		refreshScreen()							#Update the screen
		k = int.from_bytes(msvcrt.getch(), byteorder='big')	#Get the user key input, convert to integer
		if (k <= 122 and k >= 97):				#If the key was between 122 and 97, (a-z), check it against.
			r = checkGuess(k)
			if (r):								#Check guess will return True if you won.
				break							#End loop prematurely.

def getRetry():
	k = 0
	while (k != 110):							#110 is letter n, for "No".
		k = int.from_bytes(msvcrt.getch(), byteorder='big')
		if (k == 121):							#121 is letter y, for "Yes"
			init()								#If you do want to retry, start the init over again.
			break								#Cleanly break. Probably a memory leak until then though depending on how many games you've played since it won't leave this function after each reset.
			
def refreshScreen():
	os.system('cls')							#Tell CMD to clear the screen.
	showWrong()
	print("\n\nYour Phrase:")
	print("\t"+_g["revealed"])					#Feed the user what letters he has discovered.
	conv = "abcdefghijklmnopqrstuvwxyz"
	colorize.set_cursor(0,15)					#Set the cursor to COORD 0,15
	for ind, let in enumerate(conv):			#Enumerate the list again, as before.
		if (_g["guessed"][ind] == 0):			#If you haven't guessed, set color to gray.
			colorize.set_color(8)
		elif (_g["guessed"][ind] == 1):			#If the letter is in the phrase, set color to green.
			colorize.set_color(2)
		elif (_g["guessed"][ind] == 2):			#If the letter is not in the phrase, set color to red.
			colorize.set_color(4)
		colorize.write(let)						#Write the letter
		colorize.set_color(7)					#Set color to default.
	
def init():
	_g["guessed"] = [0]*26						#Make a list of 26 0's. These represent guessed letters and right or wrong.
	_g["phrase"] = newPhrase()					#Make a new phrase.
	_g["revealed"] = setRevealed()				#Convert phrase to underscores.
	_g["wrong"] = 0								#Reset Score.
	getInput()									#Main loop.
	showEndGame()								#If the main loop breaks or finishes, display the end screen.

	
if (__name__ == "__main__"):					#In case I wanted to import this file, it won't start the game automatically.
	init()										#Start the game!