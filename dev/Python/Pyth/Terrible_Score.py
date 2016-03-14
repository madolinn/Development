#Program Name: Terrible Score [Homework_03]
#Developer: Jamie Phy
#Date: 6/5/2014
#Description: Accept Scores, tell you how [terrible] it is.

#Requires: [Python 3.2.5]
#Additional Comments: Comments are aligned for Notepad++, IDLE doesn't display them so well.
import sys

print("Alright, type in a number and I'll tell you how terrible it is.")
ind = 0	#Loops done
scores = ("Extremely Terrible.","Very Very Terrible.","Very Terrible","Pretty Terrible","Somewhat Terrible","Terrible","Mediocre at Best")	#List of scores of terrib-ilitiy


while (ind < 10):	#While you've looped less than 10 times
	if (ind != 0):	#Don't print the intro text first time around.
		print("\n\n\nAlright, put in a new number.")

	sys.stdout.write(">>>")	#Print out >>> to help the user recognize they're supposed to be inputting text, but don't newline it.
	sys.stdout.flush()
	
	sc = input()
	scl = list(sc)	#Convert input to list of characters.
	sclc = list()	#New list, will be used to store accepted characters

	isanumber = True

	for str in scl:	#Loop through list of characters
		inte = ord(str)	#Convert character to a numerical representation. Easier to compare.
		if (inte >= 48 and inte <= 57):	#If character is a number(48-57) add to the new list.
			sclc.append(chr(inte))
		elif (inte == 46):	#If the character is a decimal(46) and there is a leading number then just skip the rest. Decimal places are dropped later anyways so don't bother.
			if (len(sclc) > 0):
				break
			else:			#If the decimal is the first 'numerical' character, add a 0 because technically .xxx == 0.xxx so it is a number.
				sclc.append('0')
				break
		else:
			isanumber = False	#If not a number or decimal place, say it's not a number.

	if len(sclc) == 0:	#If the user didn't enter a number, congratulate them.
		print(" No number is the best number. Good Job.")
		ind+=1
		continue	#Skip the rest of this loop
			
	sc = int(''.join(sclc))	#Convert the list of converted characters to a Float.

	if isanumber:
		print(" Well if I had to rate that number, it would be...")
	else:
		print(" First things first, that's not even a number...\n But if it were a number, it would be...")

	print(scores[min(max(sc//1000,0),len(scores)-1)])	#Divide the score by 1000, only take whole number, use this number and print out the string at the index of scores 	list
	ind+=1	#Incremenet loop.

print("\n\n\nI can't do this anymore. Goodbye.")
input()	#'Pause' to prevent closing if not run through IDLE.