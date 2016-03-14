#Program Name: Do Work [Homework_04]
#Developer: Jamie Phy
#Date: 6/5/2014
#Description: Use a global variable properly.

#Requires: [Python 3.2.5]
#Additional Comments: Comments are aligned for Notepad++, IDLE doesn't display them so well.

globalscopedvariable = "Global Scoped"	#Define a variable in global scope.

def main()
	global globalscopedvariable	#Tell the function to use the globally defined variable.
	globalscopedvariable = "Locally Changed"	#Set global variable to something else.

main()	#Call main.
print(globalscopedvariable)
input()