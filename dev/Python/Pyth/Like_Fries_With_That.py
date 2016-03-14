#Program Name: Would You Like Fries with that? [Homework_02]
#Developer: Jamie Phy
#Date: 5/29/2014
#Description: Accept Inputs, Items, calc : total 15%tip 20%tip

#Requires: [Python 3.2.5]
#Additional Comments: Comments are aligned for Notepad++, IDLE doesn't display them so well.

import msvcrt, sys, os		#msvcrt for key handling in place of input() 
							#sys for custom write() in place of print()
							#os for console text clearing
							
from math import ceil		#Ceil for rounding pennies up. math.ceil is annoying to type.

items = {					#List of items. Add as many as you want.
	'Burger' : 4.99,
	'Fries' : 0.99,
	'Nuggets' : 1.99,
	'Drink' : 1.25,
	'Salad' : 0.99,
	'Pineapple' : 2.49
}

entry_string = ""			#What the user has physically entered. We won't be using input()
bought = [0]*len(items)		#Make a list of items that were bought, size of items list.
has_ordered = False			#If the user has ordered. Functions as the loop break in the end.

def write(*str):			#print() whitespace formatting is annoying to suppress manually each time.
	for s in str:
		sys.stdout.write(s)
	sys.stdout.flush()

def screen_refresh():		#Reprint the screen from scratch.
	os.system('cls')		#Clear screen
	show_menu()
	show_suggestions()
	write(entry_string)
	
def do_backspace():			#Need to handle backspace properly.
	global entry_string		#entry_string is modified, declare it to be the global scope variable
	entry_string = entry_string[:-1]
	screen_refresh()
	
def show_suggestions():		#Make a auto-complete suggestion box for inputted text.
	if (entry_string == ""):
		write('\n'*len(items))
	else:
		sug = []
		for item in sorted(items):		#Sort the list alphabetically, loop.
			esL = len(entry_string)
			if (entry_string == item[:esL].lower()):	#If the entry_string matches the substring of an item name
				sug.append(item)						#Add that item name to the suggestions
		if (len(sug) < len(items)):						#Add empty lines so that the box isn't expanding/contracting oddly
			sug.extend(['']*(len(items)-len(sug)))
		for item in reversed(sug):						#Write out suggestions 'bottom up'.
			write('\t'+item+'\n')

def show_menu():
	print("Welcome to Good Burger home of the Good Burger. What do you want?")
	print("Just submit an item one at a time. When you're done ordering, submit nothing.\n")
	for ind, item in enumerate(sorted(items)):			#Loop through foods, print out list and prices
		char = ''
		if (bought[ind] == 1):							#If the item is bought, put a smile next to it.
			char = '\x02'
		print('\t',char,item,'\t','$'+str(items[item])) #Crappy align hack, works though. 

def submit_entry():										#Handle Enter key.
	global bought, entry_string
	if (entry_string == "" and (max(bought) > 0)):		#Make sure people are actually buying things.
		finalize_order()
		return
	for ind, item in enumerate(sorted(items)):			#Add items being suggested to the bought list.
		esL = len(entry_string)
		if (entry_string == item[:esL].lower()):
			bought[ind] = abs(bought[ind]-1)			#One line toggling of 0-1
	entry_string = ""									#Erase entry. Don't want to have to backspace.
	screen_refresh()									#Update screen with new info.

def finalize_order():
	global has_ordered
	total = 0.00
	os.system('cls')									#Clear screen, draw new screen.
	write("Alright, here's your order of\n")
	for ind, item in enumerate(sorted(items)):
		if (bought[ind] == 1):							#Add up bought items.
			write('\t',item,'   \t$',str(items[item]),'\n')
			total += items[item]
	write('\n\t\tFor a total of \t$',str(total),'\n')
	write('\t\t15% Tip\t\t$',str(ceil(total*1.15*100)/100),'\n','\t\t20% Tip\t\t$',str(ceil(total*1.20*100)/100),'\n')
	has_ordered = True;									#has_ordered breaks the infinite loop
			
		
show_menu()
show_suggestions()

while (has_ordered == False):									#msvcrt.getch() grabs keypress events for us.
	keycode = int.from_bytes(msvcrt.getch(), byteorder='big')	#Convert it to an int so we can more easily compare.
	if (keycode >= 97 and keycode <= 122):						#97 = a, 122 = z. Just make sure it's a letter.
		write(chr(keycode))
		entry_string += chr(keycode)							#Convert from int:keycode to a letter, add to entry_string
		screen_refresh()
	elif (keycode == 8):	#Backspace keycode.
		do_backspace()
	elif (keycode == 13):	#Enter keycode.
		submit_entry()
	elif (keycode == 27):	#Escape keycode.
		break

write('\nHave a nice day! [ENTER]')
input()			#'Pause' so we can see the results screen.