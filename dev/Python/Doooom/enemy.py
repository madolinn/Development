import pygame, pygame.transform, math, skills, constants, gfuncs, random
from globals import _g

#Enemies, and 'subclasses'

class Enemy:
	#Very base of every enemy
	def __init__(self, pos = (0,0)):
		self.alive = True			#Is the object alive
		self.bouncy = [0]			#Not currently used on enemies, could be though. Makes the sprites 'bounce' when they walk
		self.bounce = 0				#Current index of bouncy
		self.dir = 1				#Facing direction
		self.vspeed = 0.0			#Vertical Speed
		self.hspeed = 0.0			#Horizontal Speed
		
		self.hp = 1					#Enemy's HP
		
		self.spdmod = 1.0			#Enemy's Movement speed modifier
		self.gravity = 0.2			#Enemy's Gravity
		
		self.buffs = []				#Enemy's Buffs
		
		self.pos = [pos[0],pos[1],_g['scale']*8,_g['scale']*8]						#Basically pygame.Rect syntax, without pygame because it only uses INT, we want Float.
		self.img = pygame.image.load('resources/images/generic.png')				#Load the image of the enemy
		self.img = pygame.transform.scale(self.img, (_g['scale']*8,_g['scale']*8))	#Scale it up according to scale.
	
	def step(self):
		skills.checkBuffs(self)		#Every enemy should check their buffs. (Not that they can have any at the moment)
		
		if (self.pos[0] < -100 or self.pos[0] > constants.WINDOW[0]+100):	#If we're off screen too far, delete.
			self.alive = False
		if (self.pos[1] < -100 or self.pos[1] > constants.WINDOW[1]+100):
			self.alive = False

class Melee(Enemy):					#Derived from the base class, Enemy
	def __init__(self, pos = (0,0)):
		Enemy.__init__(self)		#Run the Enemy constructor.
		
	def step(self):
		Enemy.step(self)			#Call the base class step() method.
		self.checkDir()				#Call its own checkDir
	
		if (self.pos[1] < constants.FLOOR):				#Check if he's above ground level, apply gravity if so.
			self.vspeed += self.gravity
		
		if (self.hspeed != 0.0):						#If he's moving horizontally,
			step = 1.0									#Step is the increments of collisions we will check.
			if (self.hspeed != int(self.hspeed)):		#If hspeed isn't an integer, apply more precise steps.
				step = 0.1
			ind = 0.0
			while ind < abs(self.hspeed):				#Check every step for a collision with player
				ind += step
				self.pos[0] += (math.copysign(1,self.hspeed)*step)	#Apply a horizontal movement in accordance with the step size and direction we're moving.
				self.checkHit()
		
		if (self.vspeed != 0.0):	#Same as horizontal.
			step = 1.0
			if (self.vspeed != int(self.vspeed)):
				step = 0.1
			ind = 0.0
			while ind < abs(self.vspeed):
				ind += step
				self.pos[1] += (math.copysign(1,self.vspeed)*step)
				if (self.pos[1] + (math.copysign(1,self.vspeed)*step) < constants.FLOOR):	#Check if we're hitting the floor though this time around.
					self.pos[1] += (math.copysign(1,self.vspeed)*step)
				else:
					self.vspeed = 0.0
					self.pos[1] = constants.FLOOR
					break
		
	def checkDir(self):	#Check the facing of the object, make sure his sprite is doing the same direction.
		if (self.hspeed > 0.0 and self.dir == 0):
			self.dir = 1
			self.img = pygame.transform.flip(self.img, True, False)
			
		if (self.hspeed < 0.0 and self.dir == 1):
			self.dir = 0
			self.img = pygame.transform.flip(self.img, True, False)
			
	def checkHit(self):	#Check to see if we're colliding with the player.
		if (gfuncs.isWithin(self.pos, _g['player'].pos) or gfuncs.isWithin((self.pos[0]+self.pos[2],self.pos[1]), _g['player'].pos) or gfuncs.isWithin((self.pos[0]+self.pos[2],self.pos[1]+self.pos[3]), _g['player'].pos) or gfuncs.isWithin((self.pos[0],self.pos[1]+self.pos[3]), _g['player'].pos)):
			_g['player'].alive = False	#If so, kill him, because he only has 1 life.

class Goblin(Melee):
	def __init__(self, pos = (constants.WINDOW[0]+50,constants.FLOOR-50)):
		Melee.__init__(self)
		self.pos = [pos[0],pos[1],_g['scale']*8,_g['scale']*8]
		self.img = pygame.image.load('resources/images/goblin.png')
		self.img = pygame.transform.scale(self.img, (_g['scale']*8,_g['scale']*8))
		
		self.reaction = 101	#Reaction time counter
		
	def step(self):
		Melee.step(self)
		
		if (self.reaction > 30):	#Change direction to face the player, once a second.
			if (_g['player'].pos[0]+(_g['player'].pos[2]/2) > self.pos[0]+(self.pos[2]/2)):
				self.hspeed = 1.0*self.spdmod
			else:
				self.hspeed = -1.0*self.spdmod
			self.reaction = 0
		self.reaction += 1
		
		if (self.pos[1] == constants.FLOOR):
			self.vspeed = -1
			
class Charger(Melee):
	def __init__(self, pos = (-50,constants.FLOOR-50)):
		Melee.__init__(self)
		self.pos = [pos[0],pos[1],_g['scale']*8,_g['scale']*8]
		self.img = pygame.image.load('resources/images/charger.png')
		self.img = pygame.transform.scale(self.img, (_g['scale']*8,_g['scale']*8))
		
		self.hspeed = 5.0
	
	def step(self):
		Melee.step(self)
		
		if (self.pos[1] == constants.FLOOR):
			self.vspeed = -0.5
		
class Ghost(Melee):
	def __init__(self, pos = (0,0), dir = -1):
		Melee.__init__(self)
		
		if (dir == -1):
			self.dir = random.randint(0,1)
		
		self.pos = [pos[0],pos[1],_g['scale']*8,_g['scale']*8]
		self.img = pygame.image.load('resources/images/ghost_blue.png')
		self.img = pygame.transform.scale(self.img, (_g['scale']*8,_g['scale']*8))
		if (self.dir == 0):
			self.img = pygame.transform.flip(self.img, True, False)
		
		if (pos[0] == 0 and pos[1] == 0):
			self.pos[0] = (constants.WINDOW[0]+50-(self.dir*(constants.WINDOW[0]+100)))
			self.pos[1] = random.randint(constants.FLOOR-200,constants.FLOOR)
		
		self.gravity = 0
		self.floating = 0
		self.hspeed = -3+(self.dir*6)
		
		print(self.dir)
		print(self.pos)
	
	def step(self):
		Melee.step(self)
		
		if (self.floating < 8):
			self.pos[1] += .5
		else:
			self.pos[1] -= .5

		self.floating += 1
		if (self.floating > 24):
			self.floating = 0
			
class RapidDemon(Ghost):
	def __init__(self, pos = (0,0), dir = -1):
		Ghost.__init__(self, pos, dir)
		
		self.img = pygame.image.load('resources/images/demon_wings.png')
		self.img = pygame.transform.scale(self.img, (_g['scale']*8,_g['scale']*8))
		if (self.dir == 0):
			self.img = pygame.transform.flip(self.img, True, False)
			
		if (pos[0] == 0 and pos[1] == 0):
			self.pos[1] = random.randint(constants.FLOOR-125,constants.FLOOR)
		
		self.hspeed = -8+(self.dir*16)
		
	def step(self):
		Ghost.step(self)