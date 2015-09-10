<? ob_start(); session_start(); REQUIRE 'resources/phpfunctions.php'; INCLUDE 'resources/cron.php'; ?>
<html>
<link rel="stylesheet" type="text/css" href="resources/style.css" />
<script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src = "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js"></script>
<script src = "resources/functions.js"></script>
<body>

<? if (!isset($_GET['a']) && !isset($_SESSION['username'])) {
if ($_GET['f']) { echo "<center><span id = 'error'>Username and/or Password is incorrect</span></center>"; }
 ?>

<center><div style = 'width:220px;'><div id = 'logincon'><form name = "login" method = "post" action = "index.php?a=1">
<input name = "fuser" type = "text" style="margin-top:6px;" class = "left"/>
<input name = "fpass" type = "password"/>
<span id = "regbutton">&gt;</span><br></div><div align = "right">
<div align = "center" id = 'regfloat'><a href = "#">Register</a></div></div></center>

<br>
<center><div id="regcon" class = "regconn">
<input name = "ruser" type="text" style="margin-top:8px;" class = "left" value="Username">
<input name = "rpasa" type="password" value="Password">
<input name = "rpasb" type="password" value="Password">
<span id = "regbutton" onclick = "checkReg()">&gt;</span>
</div></center><br>

<? } if (empty($_GET) && isset($_SESSION['username'])) { ?>

<? echo "<div id = 'friendslistcon' sid = '".$_SESSION['username']."' >"; ?>
<div class = "chathead"><div class = "chatheadtext">Friends List</div></div>
<div id = "addfriend">+</div>
<div id = "friendslist">

<? $fa = retrieveLists() ?>

<span class = "contract">—</span> Online<br><ul class = "online"><? retrieveList($fa[0],$fa[1],1); ?></ul>
<span class = "expand">+</span> Offline<br><ul class = "offline"><? retrieveList($fa[0],$fa[1],0); ?></ul>
<span class = "expand">+</span> Blocked<br><ul class = "blocked"><li>None</li></ul>

</div>
</div>

<div id = "floatlogout"><b>Sign Out<b></div>

<? } if ($_GET['a']==1) { checkLog(); }

if ($_GET['a']==2) {
	mysql_query("UPDATE users SET online = 0 WHERE username = '$_SESSION[username]'");
	session_destroy();
	header('location: index.php');
} 
?>