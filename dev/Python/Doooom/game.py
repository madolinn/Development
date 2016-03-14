import pygame, pygame.locals, pygame.time, pygame.key, pygame.font, _screen, sys, enemy, player, random, constants, time
from globals import _g
from constants import *

class Game:
	def __init__(self):
	
		_g['screen'] = pygame.display.set_mode(WINDOW, 0, 32)
	
		pygame.init()
		pygame.display.set_caption("Doooom : The Arena of Life")
		
		pygame.display.update()
		
		self.objects = []	#List of world objects.
		
		self.player = _g['player'] = player.Player((100,350))	#Make a new player, add him to the world.
		self.objects.append(self.player)
		
		self.score = 0.0
		self.counter = 0
		self.enemy = [enemy.Goblin, enemy.Charger, enemy.Ghost, enemy.RapidDemon]	#List of enemies to spawn.
		
	def main(self):
	
		pygame.time.set_timer(UPDATE, int(1000/FPS))	#Call the update event every 1000/FPS Milliseconds.
		
		Looping = True
		
		while Looping:
			for e in pygame.event.get():
				if (e.type == pygame.locals.QUIT):
					pygame.quit()
					sys.exit()
					
				if (e.type == UPDATE):	#Update event called, call the function.
					self.update()
				if (e.type == GAMEOVER):
					self.gameOver()
					Looping = False
	
	def gameOver(self):
		_screen.gameOver(self.score)
		
		time.sleep(1)	#Sleep so that we don't accidentally hit a button too fast to see our score.
		
		while True:
			for e in pygame.event.get():
				if (e.type == 2 or e.type == 0):	#If we fire the quit event, or press a Key, quit.
					pygame.quit()
					sys.exit()
	
	def update(self):
		alive = []		#New list of alive objects.
	
		for obj in self.objects:	#Go through all the objects, do their step events
			obj.step()
			if (obj.alive == True):	#Determine if the object is alive after the step, then add them to the new alive list.
				alive.append(obj)
			else:
				if (obj == self.player):	#If the player died, display game over.
					pygame.event.post(pygame.event.Event(GAMEOVER))
		
		_screen.render(self.objects)	#Send the alive objects off for rendering.
		
		self.objects = []				#Clean the objects list, COPY the UNREFERENCED alive list into it.
		self.objects = alive[:]
		
		self.counter += 1
		if (self.counter >= max(10,FPS-(_g['game'].score//1000))):	#Randomly spawn an enemy roughly every second, based on score.
			if (random.randint(0,30) >= (20 - (self.score / 500))):
				self.objects.append(self.enemy[random.randint(0,min(len(self.enemy)-1,0+(_g['game'].score // 500)))]())	#Enemies available to spawn increase with score.
				self.counter = random.randint(-20,10)
			else:
				self.counter = FPS/3