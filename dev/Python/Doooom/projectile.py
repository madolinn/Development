import pygame, pygame.transform, math, skills, constants, gfuncs
from globals import _g

class Projectile:
	def __init__(self, x, y, team, dir, angle = -361):
		#Works much like the Enemy and player do, because it's handled the same way.
		#Base projectile is an Arrow.
		self.alive = True
		self.bouncy = [0]
		self.bounce = 0
		
		self.gravity = 0.2
		self.hp = 1
		
		self.spdmod = 7.0	#Speed of the projectile.
		self.dir = dir
		if (angle == -361):
			self.angle = (200+(140*dir))*(math.pi/180)	#If an angle wasn't specified, default it to slightly above horizontal.
		else:
			self.angle = angle
		self.pos = [x,y,_g['scale']*8,_g['scale']*8]
		
		self.team = team	#Team 0 is enemy, Team 1 is player.
		
		self.img = pygame.image.load('resources/images/arrow.png')
		self.img = pygame.transform.scale(self.img, (_g['scale']*7,_g['scale']*3))
		if (dir == 1):
			self.img = pygame.transform.flip(self.img, True, False)
		
	def step(self):
		resultant = math.sqrt(math.pow(math.cos(self.angle) * self.spdmod,2) + math.pow(math.sin(self.angle) * self.spdmod + self.gravity,2))	#Add gravity to the object using vector addition.
		self.angle = math.atan2(math.sin(self.angle) * self.spdmod + self.gravity, math.cos(self.angle) * self.spdmod)	#Get the new angle from the resultant.
		self.spdmod = resultant		#Resultant is the magnitude, aka, the speed.
		
		self.pos[0] += math.cos(self.angle) * self.spdmod		#Add the vectors to the position.
		self.pos[1] += math.sin(self.angle) * self.spdmod
		
		if (self.pos[0] < -100 or self.pos[0] > constants.WINDOW[0]+100):	#If we're off screen too far, delete.
			self.alive = False
		if (self.pos[1] < -100 or self.pos[1] > constants.WINDOW[1]+100):
			self.alive = False
		
		self.checkHit()
			
	def checkHit(self):
		hitbox = (self.pos[0]+(self.dir*(_g['scale']*6)),self.pos[1]+_g['scale'])		#We only use a point for arrows, because only the point is fatal
		if (self.team == 0):															#If the enemies shot it, only check to see if it hit the player by referencing it.
			if (gfuncs.isWithin(hitbox, _g['player'].pos)):
				_g['player'].alive = False
				self.alive = False
		else:																			#Otherwise, go through every object.
			for obj in _g['game'].objects:												#Note: Player shot projectiles can stop enemy ones!
				if (obj != _g['player'] and obj != self):
					if (gfuncs.isWithin(hitbox, obj.pos)):
						obj.hp -= 1
						if (obj.hp <= 1):
							obj.alive = False
						self.alive = False
						break
						
class Dynamite(Projectile):
	def __init__(self, x, y, team, dir, angle = -361):
		Projectile.__init__(self, x, y, team, dir, angle)
		
		self.warmup = 0
		self.gravity = 0.0
		self.spdmod = 0
		
		self.img = pygame.image.load('resources/images/floating_skull.png')
		self.img = pygame.transform.scale(self.img, (_g['scale']*8,_g['scale']*8))
	
	def step(self):
		self.warmup += 4
		if (self.warmup == 120):
			self.pos[0] += self.img.get_width()/2
			self.pos[1] += self.img.get_height()/2
		
		if (self.warmup >= 120):
			self.img = pygame.image.load('resources/images/circle.png')
			self.img = pygame.transform.scale(self.img, (_g['scale']*(self.warmup-119),_g['scale']*(self.warmup-119)))
			self.pos[0] -= self.img.get_width()/(self.warmup-119)/2*4	#Positions of objects are top left corners. As the sprite expands, we need to move it so that it stays 'centered'
			self.pos[1] -= self.img.get_height()/(self.warmup-119)/2*4
			
			self.pos[2] = self.img.get_width()
			self.pos[3] = self.img.get_height()
			
			for obj in _g['game'].objects:
				if (obj != self):
					if (math.sqrt(math.pow((self.pos[0]+self.pos[2]/2)-(obj.pos[0]+obj.pos[2]/2),2)+math.pow((self.pos[1]+self.pos[3]/2)-(obj.pos[1]+obj.pos[3]/2),2)) <= _g['scale']*(self.warmup-119)/2):
						obj.alive = False
			
		if (self.warmup > 180):
			self.alive = False