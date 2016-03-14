import pygame, constants, pygame.font
from globals import _g

#Make a list of images to use later, only make them once, not on each render.
imgs = [None, None, None, None, None, None]
imgs[0] = pygame.image.load('resources/images/header.png')
imgs[1] = pygame.image.load('resources/images/skill_z.png')
imgs[2] = pygame.image.load('resources/images/skill_x.png')
imgs[3] = pygame.image.load('resources/images/skill_c.png')
imgs[4] = pygame.image.load('resources/images/skill_down.png')
imgs[5] = pygame.image.load('resources/images/foreground.png')
imgs[5] = pygame.transform.scale(imgs[5], (imgs[5].get_width()*_g['scale'],imgs[5].get_height()*_g['scale']))

def render(objs):
	_g['screen'].fill((0,0,0))				#Overwrite screen with black.
	for obj in objs:						#Go through all the objects
		pos = list(obj.pos)
		pos[1] -= obj.bouncy[obj.bounce]	#Add 'bouncy' to position of sprite. It doesn't affect hitboxes so we only do it during render.
		_g['screen'].blit(obj.img, pos)		#Paste the object onto the screen.
	
	Font = pygame.font.SysFont(None, int(11*_g['scale']))	#Make a new font, default font, size 11 * scale.
	
	pygame.draw.polygon(_g['screen'], (108,81,40), ((133,0), (255,0), (255,32), (133,32)))	#Draw to the screen, a rectangle.
	_g['screen'].blit(imgs[0],(0,0))	#Paste a sprite in.
	
	for ind in range(0,4):								#Loop through all the skills
		_g['screen'].blit(imgs[ind+1],(136+(ind*30),3))	#Paste the image
		if (_g['player'].cooldowns[ind] > 0):			#If a skill is on cooldown
			pygame.draw.polygon(_g['screen'], (30,30,30), ((136+(ind*30),3), (162+(ind*30),3), (162+(ind*30),29), (136+(ind*30),29)))	#Paint it gray
			text = Font.render(str(int(_g['player'].cooldowns[ind]/constants.FPS)), 0, (200,200,200))									#Show the number of seconds left.
			_g['screen'].blit(text, ((143+(ind*30)-(7*(len(str(int(_g['player'].cooldowns[ind]/constants.FPS)))-1))),6))
	
	Font = pygame.font.SysFont(None, int(20/3*_g['scale']))
	
	text = Font.render('score', 0, (255,255,255))		#Make some text, render it. x2
	_g['screen'].blit(text, (5,0))
	text = Font.render(str(int(_g['game'].score)), 0, (255,255,255))
	_g['screen'].blit(text, (55,1))
	
	_g['screen'].blit(imgs[5], (-int((_g['game'].score)%2250/3),234))	#Make the grass, move it according to the player score so it looks like we're moving.
	pygame.draw.polygon(_g['screen'], (93,138,71), ((0,245),(constants.WINDOW[0],245),(constants.WINDOW[0],constants.WINDOW[1]),(0,constants.WINDOW[1])))	#Draw a big block under the grass.
	
	pygame.display.update()	#Update screen.
	
def gameOver(score):
	#Draw a polygon, make a new font, draw 'Score' and the actual score, update screen.
	pygame.draw.polygon(_g['screen'], (193,148,76), ((constants.WINDOW[0]/4, constants.WINDOW[1]/4),(constants.WINDOW[0]/4*3, constants.WINDOW[1]/4),(constants.WINDOW[0]/4*3, constants.WINDOW[1]/4*3),(constants.WINDOW[0]/4, constants.WINDOW[1]/4*3)))
	Font = pygame.font.SysFont(None, 80)
	text = Font.render('SCORE', 0, (255,255,255))
	_g['screen'].blit(text, (constants.WINDOW[0]/4+10, constants.WINDOW[1]/4+10))
	text = Font.render(str(int(score)), 0, (255,255,255))
	_g['screen'].blit(text, (constants.WINDOW[0]/4*1.5, constants.WINDOW[1]/2))
	
	pygame.display.update()