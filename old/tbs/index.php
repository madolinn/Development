<?php ob_start(); session_start();

REQUIRE 'resources/php/register.php';

$host="localhost";
$username="jamieim";
$password="XhPQ8uJDGpZUwdVj";
$db_name="tbs";

mysql_connect("$host", "$username", "$password")or die("cannot connect");
mysql_select_db("$db_name")or die("cannot select DB");

if($_GET['action']=="logout") { session_destroy(); header("location: index.php"); }

if($_GET['action']=="reging") {

$user = $_POST['ru'];
$pass = $_POST['rp'];
$passr = $_POST['rr'];

$user = mysql_real_escape_string($user);
$pass = mysql_real_escape_string($pass);
$passr = mysql_real_escape_string($passr);

$format = preg_replace('/[^a-zA-Z0-9]/', “”, $user);

if ($format == $user && strlen($user)>0) {
	if ($pass == $passr) {
		$pass = md5($pass);
		$result = mysql_query("SELECT * FROM users WHERE username = '$user'");
		if (mysql_num_rows($result) == 0) {
			mysql_query("INSERT INTO users (username, password) VALUES ( '$user', '$pass' )") or die(mysql_error());
			register($user);
			header("location: index.php?r=s");
		} else { header("location: index.php?r=d"); }
	} else { header("location: index.php?r=m"); }	
} else {
	header("location: index.php?r=i");
}
}
?>	
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<html>
<head>
<link rel="stylesheet" type="text/css" href="resources/style.css" />
<script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src = "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js"></script>
<script>
$(function() {
	$('#regform').hide();
	$('#regd').click(function(){ $('#regform').slideToggle(300); });

	$('[name="ru"]').focus(function() { if ($(this).attr("value") == "Username") { $(this).attr("value",""); }});
	$('[name="rp"]').focus(function() { if ($(this).attr("value") == "Password") { $(this).attr("value",""); }});
	$('[name="rr"]').focus(function() { if ($(this).attr("value") == "Re-Type Password") { $(this).attr("value",""); }});
	
});
</script>
</head>
<body>

<? if (isset($_GET['r'])) {
	echo "<center style = 'font-family:Tahoma; color:#00ffff;'>";
	switch ($_GET['r']) {
		case "d":
			echo "There is already a user with this name";
			break;
		case "m":
			echo "Passwords do not match";
			break;
		case "s":
			echo "Registration was successful";
			break;
		case "e":
			echo "Username or Password is incorrect";
			break;
		case "i":
			echo "Invalid user name. Please only use Alphanumeric names without spaces.";
			breal;
	}
	echo "</center>";
}

if ($_GET['action']=="login") {

	$user = $_POST['user'];
	$pass = $_POST['pass'];

	$user = stripslashes($user);
	$pass = stripslashes($pass);
	$user = mysql_real_escape_string($user);
	$pass = mysql_real_escape_string($pass);
	$user = htmlspecialchars($user);
	$pass = htmlspecialchars($pass);

	$pass = md5($pass);

	$result = mysql_query("SELECT * FROM users WHERE username = '$user' and password = '$pass'");
	if (mysql_num_rows($result)==1) {
		$row = mysql_fetch_assoc($result);
		$_SESSION['username']=$user;
		$nkid = rand(1,1000000);
		$_SESSION['kid']=$nkid;
		$_SESSION['sid']=$row['id'];
		mysql_query("UPDATE users SET kid = $nkid, online = 1 WHERE username = '$user'") or die(mysql_error());
		
		header("location: game.php");
	} else {
		header("location: index.php?r=e");
	}
}
?>

<? if (!isset($_SESSION['username'])) { ?>

<div id = "login"><div style = "float:left; width:100px;">
<form name = "login" method = "post" action = "index.php?action=login">
<input name = "user" type = "text" style = "-webkit-border-top-left-radius: 3px;-moz-border-radius-topleft: 3px;border-top-left-radius: 3px;">
<input name = "pass" type = "password" style = "-webkit-border-bottom-left-radius: 3px;-moz-border-radius-bottomleft: 3px;border-bottom-left-radius: 3px;">
</div>
<div style = "float:right;">
<input type = "submit" value = "Pew!" id = "pew">
</form>
</div>

<hr style = "clear:both; border:0px; border-bottom:1px solid #CCCCCC; padding-top:5px;">
<div id = "regform">
<form name = "reg" method = "post" action = "index.php?action=reging">
<input type = "text" name = "ru" maxlength = "12" value = "Username">
<input type = "text" name = "rp" value = "Password" onfocus = "this.type = 'password'">
<input type = "text" name = "rr" value = "Re-Type Password" onfocus = "this.type = 'password'">
<center><input type = "submit" value = "Submit"></center>
</form>
</div>
<div id = "regd">Register</div>
</div>

<? } else { header("location: game.php"); } ?>

</body>
</html>