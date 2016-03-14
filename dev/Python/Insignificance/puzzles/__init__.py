import sys, items, world
import puzzles.functions
import puzzles.puzzle_00 #Tutorial			#axe bow knife
import puzzles.puzzle_01 #Bear				#rawmeat
import puzzles.puzzle_02 #Unicorn			#unicornhorn
import puzzles.puzzle_03 #Merchants			#backpack ritualbook
import puzzles.puzzle_04 #Woodcutting		#log
import puzzles.puzzle_05 #Bridge-builder
import puzzles.puzzle_06 #Cultists
import puzzles.puzzle_07 #End
import puzzles.puzzle_08 #Blizzard			#strangeorb
import puzzles.puzzle_09 #Yak				#hide
import puzzles.puzzle_10 #Sawmill			#plank
import puzzles.puzzle_11 #Tanner			#?	jacket
import puzzles.puzzle_12 #Rope				#ropeplant
import puzzles.puzzle_13 #A HERRING!
import puzzles.puzzle_14 #Pond				#herring
import puzzles.puzzle_15 #Old Man			#fishingpole
import puzzles.puzzle_16 #Quiz?
import puzzles.puzzle_17 #Ravine			#machete
import puzzles.puzzle_18 #Thicket


pl = list()	#Make a list of puzzles.

#We want to be able to call these puzzles by an index, not by literally having to call their names.
#EX. 	puzzle.puzzle_01.begin isn't dynamic.
#		pl[1].begin is dynamic.

if (__name__ == "puzzles"):					#If this was initiated and not imported through a loop
	tosort = list()	
	for key in sys.modules.keys():			#Grab all loaded modules.
		if (key[:14] == "puzzles.puzzle"):	#If their name is puzzle.puzzle________
			tosort.append(key)				#Add to the new list as a string.
	tosort = sorted(tosort)					#Sort strings numerically.
	for key in tosort:						#Convert the strings to literals and then add them to the puzzle list.
		pl.append(getattr(eval(key), "begin"))