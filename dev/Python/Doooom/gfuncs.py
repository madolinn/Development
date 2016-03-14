#General functions.

#Determine if a point is within a rectangle.
def isWithin(coords, within):
	if (coords[0] >= within[0] and coords[0] <= within[0]+within[2] and coords[1] >= within[1] and coords[1] <= within[1]+within[3]):
		return True
	else:
		return False