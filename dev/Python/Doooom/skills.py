import constants, projectile
from globals import _g

def useSkill(obj, ind):
	
	skill = obj.skills[ind]
	
	if (skill == 0):							#Speed boost skill
		obj.spdmod *= 2.0
		obj.cooldowns[ind] = 10*constants.FPS
		obj.buffs.append([0,3*constants.FPS])	#Add a buff so that after 3 seconds we can revert the speed change.
		
	if (skill == 3):							#Arrow shoot skill
		team = 0
		if (obj == _g['player']):
			team = 1
		_g['game'].objects.append(projectile.Projectile(obj.pos[0], obj.pos[1]+(_g['scale']*3), team, obj.dir))
		obj.cooldowns[ind] = .5*constants.FPS
	
	if (skill == 6):							#Moonbounce skill
		obj.vspeed = -4.0
		obj.gravity /= 5.0
		obj.buffs.append([1,2*constants.FPS])
		obj.cooldowns[ind] = 5*constants.FPS
		
	if (skill == 9):							#Skull bomb skill
		team = 0
		if (obj == _g['player']):
			team = 1
		_g['game'].objects.append(projectile.Dynamite(obj.pos[0], obj.pos[1]+(_g['scale']*3), team, obj.dir))
		obj.cooldowns[ind] = 8*constants.FPS
		
def checkBuffs(obj):

	newBuffs = []
	
	#Go through all the buffs on the object, revert the changes made if the buff is expiring.
	for buff in obj.buffs:
		if (buff[0] == 0):
			if (buff[1] == 0):
				obj.spdmod /= 2.0
		
		if (buff[0] == 1):
			if (buff[1] == 0):
				obj.gravity *= 5.0
		
		if (buff[1] > 0):
			newBuffs.append(buff)
			
		buff[1] -= 1
		
	obj.buffs = newBuffs[:]