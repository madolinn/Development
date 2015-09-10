<html>
<head>
<link rel="stylesheet" type="text/css" href="style.css" />
<script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src = "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js"></script>
<script src = "functions.js"></script>
</head>
<body>
<div id = "beam"><h1><br></h1>
<div id = "header"><h3>JAMIE</h3><h3 class = "phy">PHY</h3>
<div id = "nav"><span>HOME</span> | <span>WORKS</span> | <span>ABOUT</span></div></div>
<br>

<? if(!isset($_GET['p']) || $_GET['p']=="works" || $_GET['p']=="about") {
/////////////////////////////////////////// Home ///////////////////////////////////////////
if(!isset($_GET['p'])) { ?>
<div class = "breaker">Recent News&nbsp;</div>

<div class = "bodye"><span class = "title">Photo Reel <span class = "lesser">: July 12th, 2012</span></span><br><br>

<div class = "content">
<center><a href = "photoreel.html">Photoreel</a></center>
Pretty simple photo reel. Smooth animations. Click on a photo in the lower region to display the full photo in the upper
region. Feel free to take the source code, credit or no credit, doesn't matter to me. It only requires JQuery to run. The
script itself is pretty self explanatory, as well as the call.
</div><br><br>
<div class = "breaker"></div>
<span class = "title">JamieIM <span class = "lesser">: July 2nd, 2012</span></span><br><br>

<div class = "content"><div style = "margin:5px 10px 10px 10px; float:left;"><img src = "jamieim.png"></div>
Introducing JamieIM, a [almost fully functional] chat client!<br><br>
After the tragic news that my favorite global chat client, Meebo, was going to be shut down,
my brother suggested that I make my own client so that we and our friends can stay in touch,
as we all previously used it. The client features registering, logging in, adding friends, and
chatting. Just the basics.<br><br>This was more of a programming challenge to use JQuery,
PHP, MySQL, and Ajax, as we are not actually going to use it, soley because Skype has voice,
and who wants to type out things when you can just talk? Still, it was a fun thing to program,
and if you wish mess around with it, you may do so at
<a href = "../proto/">http://.../proto/</a>. Feel free to register.
If you want to test drive the chatting, either grab a friend, or just add Test and you'll be able
to see your messages relayed back to you.
</div><br><br>
<div class = "breaker"></div>
<span class = "title">Web Portfolio goes Live <span class = "lesser">: July 3rd, 2012</span></span><br><br>

<div class = "content">Well I'm taking a new approach to finding enough programming to keep me busy
and entertained. Finally looking for a paying job! So here goes my web portfolio. Scrapping up all
I've done over the years and throwing it in here, along with some other not really related things.
Hopefully this will be enough to remove any doubts of my abilities. Although it's not much, it's
sure better than nothing.</div><br>
</div>
<br><div class = "breaker">&nbsp;</div>

<? /////////////////////////////////////////// Works ///////////////////////////////////////////
} if($_GET['p']=="works") { ?>

<div class = "breaker">Notice&nbsp;</div>
<div class = "bodye">&nbsp;<div class = "content"><center>- Attention -</center><br>
My dearest apologies! A majority of my portfolio does not exist anymore. Much of my work
has been lost from the need to reformat my computer years ago. And further more, my online backups
have been wiped away from my hosts dying off. Hopefully I will have more to add in the
short future.</div>&nbsp;</div><br>

<div class = "breaker">Web-Based Programming&nbsp;</div>
<div class = "bodye"><span class = "title">Photo Reel <span class = "lesser">: July 12th, 2012</span></span><br><br>

<div class = "content">
<center><a href = "photoreel.html">Photoreel</a></center>
Pretty simple photo reel. Smooth animations. Click on a photo in the lower region to display the full photo in the upper
region. Feel free to take the source code, credit or no credit, doesn't matter to me. It only requires JQuery to run. The
script itself is pretty self explanatory, as well as the call.
</div><br><br>
<div class = "breaker"></div>
<span class = "title">JamieIM <span class = "lesser">: July 2nd, 2012</span></span><br><br>

<div class = "content"><div style = "margin:5px 10px 10px 10px; float:left;"><img src = "jamieim.png"></div>
Introducing JamieIM, a [almost fully functional] chat client!<br><br>
After the tragic news that my favorite global chat client, Meebo, was going to be shut down,
my brother suggested that I make my own client so that we and our friends can stay in touch,
as we all previously used it. The client features registering, logging in, adding friends, and
chatting. Just the basics.<br><br>This was more of a programming challenge to use JQuery,
PHP, MySQL, and Ajax, as we are not actually going to use it, soley because Skype has voice,
and who wants to type out things when you can just talk? Still, it was a fun thing to program,
and if you wish mess around with it, you may do so at
<a href = "../proto/">http://.../proto/</a>. Feel free to register.
If you want to test drive the chatting, either grab a friend, or just add Test and you'll be able
to see your messages relayed back to you.
</div><br><br>
<div class = "breaker"></div>
<span class = "title">HTML5 : Canvas Play <span class = "lesser">: Undated</span></span><br><br>

<div class = "content">Right when HTML5 went live, the &#60;canvas&#62; tag wasn't very popular.
Who cares! It was interesting to me. It was like playing with Flash all over again, but in methods
that I could understand. It was, well, a canvas! Scribble, transform text, I messed with it all.
But this was an oppurtunity for me to be able to make in browser games without the need to stress
myself over Flash's oh so annoying language. Well, anyways. Here are just two of the things I've
recovered, although they're not much.<br>
<a href = "html5ball.html">Controllable Ball with Physics</a><br>
<a href = "html5plat.html">Platformer generated from an Array</a> - Controls : WASD
</div>&nbsp;</div><br>

<div class = "breaker">Other Programming&nbsp;</div>
<div class = "bodye"><span class = "title">TI-83 : Tough Love <span class = "lesser">: Undated</span></span><br><br>
<div class = "content">Through the early years of high school I didn't have much to do. I didn't
have a phone capable of gaming or anything to keep me busy when classes got boring. Luckily in math
we had a class set of graphing calculators. And this is how I spent the rest of my days. I never
achieved much, it took enourmous amounts of time to go through all the menus just for a simple function,
however I did make quite the detailed Pong with an AI. Nearly unbeatable. It'd take you about 15 minutes
per serve to get a point. Unfortunately that program rests with the class set, upon obtaining my own
TI-83+ I made my own Calculator Tanks. Variable Power, Angle, Wind, Terrain sets. Amazing (until everyone
got a smart phone.) I'm not going to provide a source, it'd just be pointless.</div>
<div class = "breaker"></div>
<span class = "title">GML : My Foundation of Game Design <span class = "lesser">: Undated</span></span><br><br>
<div class = "content"><a href = "http://www.yoyogames.com/make/">GameMaker</a> was a simple game creation software useful to all ranges of skill.
This is how I spent much of my early years. There was no cap on what you could create with this handy creator. All the coding was yours to do,
you were just provided with an easy GUI for creating classes and giving them functions, as well as
placing the objects onto your Worlds. Over the next releases, however, the creator become more sluggish,
less apealing, and the official website become... -whistles- Nevertheless, here are a few things I created
with it.<br>
<div style = "margin:5px 10px 10px 10px; float:left;"><img src = "gml_01.png" style = "height: 165px; width: 200px;"></div>
Holy smokes! What is this terrible quality picture of you ask? A space ship shooting projectiles at walls
as well as rockets that defy the need for oxygen! Featuring : Particles, Particles everywhere! And cool
wireframe objects that you can blow to smithereens. The project was never finished. But it's still fun
to mess around with.<br><br>
<div style = "margin:15px 10px 10px 10px; float:left;"><img src = "gml_02.png" style = "height: 200px; width: 200px;"></div>
Now this is a game! Manipulate the living creatures around you to do your bidding! Well okay, not quite.
In this game you make temorary clones of the animals on the levels to get past obstacles, as you are a
lazy Earthling who apparently lacks the ability to jump or climb. But that's okay! Frogs help you jump,
and that appears to be me riding up a turtle dove. And the fireflies! Well they did nothing, except look
awesome flying around lighting your way! This game was truly the gem of my younger days.
</div>&nbsp;</div>

<br>
<div class = "breaker">Non-Programming Related&nbsp;</div>

<div class = "bodye"><span class = "title">Engineering <span class = "lesser">: 2011 - 2012</span></span><br><br>

<div class = "content">With Engineering being my second career interest, I've been taking a majority of my
electives in the Engineering field. We've done some pretty sweet stuff this year. From compressed air powered
vehicles (not those little ones from boyscouts!), to drill driven battle bots. If I can recover any drawings
(I seem to be losing a lot of things recently) I'll gladly toss them up on here, but for now, here's a few
short clips of when my battle bot did work. Mine is the aluminum wedge.<br>
<span class = "link vid">Video 01</span>
<div><center><video controls="controls">
<source src = "battlebot_01.mp4" type = "video/mp4" />
Your browser does not support inline videos :c<br><a href = "battlebot_01.mp4">Download Video</a>
</video></center></div><br>
<span class = "link vid">Video 02</span>
<div><center><video controls="controls">
<source src = "battlebot_02.mp4" type = "video/mp4" />
Your browser does not support inline videos :c<br><a href = "battlebot_02.mp4">Download Video</a>
</video></center></div><br>
<span class = "link vid">Video 03</span>
<div><center>
<video controls="controls">
<source src = "battlebot_03.mp4" type = "video/mp4v" />
Your browser does not support inline videos :c<br><a href = "battlebot_03.mp4">Download Video</a>
</video></center></div><br>
</div>&nbsp;</div><br><div class = "breaker">&nbsp;</div>

<?/////////////////////////////////////////// About /////////////////////////////////////////// 
} if($_GET['p']=="about") { ?>
<div class = "breaker">Bio&nbsp;</div>

<div class = "bodye">&nbsp;<div class = "content">
<div style = "float:right; margin:5px 10px 10px 10px;"><img src = "profile.jpg" height="180"></div>
My name is Jamie Phy and I am 17 years of age. I have been programming websites for over 10 years. It all started
when my brother brought home 'HTML For Dummies' when I was 7, and I took it from him and read it
front to back. Ever since that day I've been interested in web design and hoped I could make it
into a career option.<br><br>I've always sought after challenges that can be solved with math and critical thinking,
however, throughout grade school there was never many programming classes offered
without having to take shuttles back and forth from schools. All of these courses were intro or beginner,
and I know too much to have to sit and bore myself with those. So as an alternative, I've been taking
engineering and technical based courses. Next year will be my 4th year in the engineering field, of which
I hope to retain my top of the class standings.
</div>&nbsp;</div>
<br>
<div class = "breaker">Knowledge and Abilities&nbsp;</div>
<div class = "bodye">&nbsp;<div class = "content">My programming skills range throughout a variety of languages.
This allows me to understand syntaxes of many languages, making it much easier to learn and adapt to concepts
newly exposed to me.<br><br>
I am knowledgeable in the areas of<br><br>
<span style = "margin-left:20px;">Web Design Related</span><br>
<div style = "margin:10px auto 10px auto; width:400px; border:1px solid #444444; height:100px;">
<div class = "cell">HTML/5</div><div class = "cell">Javascript</div><div class = "cell">JQuery</div><div class = "cell">CSS</div>
<div class = "cell">PHP + Ajax</div><div class = "cell">MySQL + Server</div><div class = "cell">Apache</div><div class = "cell">Photoshop</div>
<div class = "cell" style = "width:200px;">Image to Webpage conversion</div><div class = "cell" style = "width:200px">Cross Browser + Mobile Compatibility</div>
</div>
<span style = "margin-left:20px;">Other Related Knowledge</span><br>
<div style = "margin:10px auto 10px auto; width:400px; border:1px solid #444444; height:33px;">
<div class = "cell">C/#/++</div><div class = "cell">Java</div><div class = "cell">Flash</div><div class = "cell">Unity</div></div>
</div>&nbsp;</div>
<br>
<div class = "breaker">Contact&nbsp;</div>
<div class = "bodye">&nbsp;<div class = "content">
If for any reason you wish you contact me you may do so by sending me an email at<br>
<span style = "margin-left:20px;"><a href = "mailto:jamie.phy@gmail.com">jamie.phy@gmail.com</a></span><br>
Or you can contact me through Skype, my user name being <span class = "link">Madolinn</span>
</div>&nbsp;</div><br><div class = "breaker">&nbsp;</div>

<? }} else { echo "<h3>Oops! You broke something!</h3>"; } ?>
<center><h1>Copyright Jamie Phy, 2012</h1></center><br>
</div>
</body>