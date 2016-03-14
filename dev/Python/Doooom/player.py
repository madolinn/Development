import pygame, pygame.transform, pygame.key, math, skills, constants
from globals import _g

class Player:
	def __init__(self, pos = (0,0)):
		self.alive = True				#Descriptions on the Enemy objects.
		self.bouncy = [0,1,2,1,0]
		self.bounce = 0
		self.dir = 1
		self.vspeed = 0.0
		self.hspeed = 0.0
		
		self.skills = [3,9,0,6]			#Our skills we can use.
		self.cooldowns = [0,0,0,0]		#Cooldowns on the skills.
		self.buffs = []
		
		self.hp = 1
		
		self.spdmod = 1.0
		self.gravity = 0.5
		
		self.pos = [pos[0],pos[1],_g['scale']*8,_g['scale']*8]
		self.img = pygame.image.load('./resources/images/archer.png')
		self.img = pygame.transform.scale(self.img, (_g['scale']*8,_g['scale']*8))
	
	def step(self):
		skills.checkBuffs(self)
		for ind, cd in enumerate(self.cooldowns):
			self.cooldowns[ind] = max(cd-1,0)		#Decrease the cooldowns, if any are on, by one.
		self.displace()								#Apply our movements.
		
		
		#Check to see if buttons are being pressed, if so, do something.
		if (pygame.key.get_pressed()[pygame.K_LEFT] == True):
			self.move((-2,0))
			if (self.dir == 1):
				self.dir = 0
				self.img = pygame.transform.flip(self.img, True, False)
				
		if (pygame.key.get_pressed()[pygame.K_RIGHT] == True):
			self.move((2,0))
			if (self.dir == 0):
				self.dir = 1
				self.img = pygame.transform.flip(self.img, True, False)
				
		if (pygame.key.get_pressed()[pygame.K_UP] == True):
			self.move((0,-1))
			
		if (pygame.key.get_pressed()[pygame.K_z] == True):
			self.attack(0)
		if (pygame.key.get_pressed()[pygame.K_x] == True):
			self.attack(1)
		if (pygame.key.get_pressed()[pygame.K_c] == True):
			self.attack(2)
		if (pygame.key.get_pressed()[pygame.K_DOWN] == True):
			self.attack(3)
		
		#Player object uses bouncing, add a bounce and make sure it doesn't go over the size of the bounce list.
		if (self.bounce > 0):
			self.bounce += 1
			if (self.bounce > len(self.bouncy)-1):
				self.bounce = 0
	
	def displace(self):
		#Essentially identical to the Enemy's step.
		if (self.pos[1] < constants.FLOOR):
			self.vspeed += self.gravity
			
		if (self.hspeed != 0.0):
			step = 1.0
			if (self.hspeed != int(self.hspeed)):
				step = 0.1
			ind = 0.0
			while ind < abs(self.hspeed):
				ind += step
				if (self.pos[0] + (math.copysign(1,self.hspeed)*step) > 0):
					if (self.pos[0] + (math.copysign(1,self.hspeed)*step) < int(constants.WINDOW[0]/2)):
						self.pos[0] += (math.copysign(1,self.hspeed)*step)
					else:
						for obj in _g['game'].objects:
							obj.pos[0] -= (math.copysign(1,self.hspeed)*step)
						self.pos[0] += (math.copysign(1,self.hspeed)*step)
						_g['game'].score += (math.copysign(1,self.hspeed)*step)
		
		if (self.vspeed != 0.0):
			step = 1.0
			if (self.vspeed != int(self.vspeed)):
				step = 0.1
			ind = 0.0
			while ind < abs(self.vspeed):
				ind += step
				self.pos[1] += (math.copysign(1,self.vspeed)*step)
				if (self.pos[1] + (math.copysign(1,self.vspeed)*step) < constants.FLOOR):
					self.pos[1] += (math.copysign(1,self.vspeed)*step)
				else:
					self.vspeed = 0.0
					self.pos[1] = constants.FLOOR
					break
		
		self.hspeed = 0.0
	
	def move(self, rel):
		if (rel[0] != 0):
			self.hspeed = rel[0]*self.spdmod
			if (self.bounce == 0):
				self.bounce = 1
				
		if (rel[1] == -1):
			if (self.pos[1] == constants.FLOOR):
				self.vspeed = -5.0
	
	def attack(self, ind):
		#If our skill isn't on cooldown, try to use it.
		if (self.cooldowns[ind] == 0):
			skills.useSkill(self, ind)
			
		
		