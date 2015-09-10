<?php

$host="localhost";
$username="jamieim";
$password="XhPQ8uJDGpZUwdVj";
$db_name="protoim";

mysql_connect("$host", "$username", "$password")or die("cannot connect");
mysql_select_db("$db_name")or die("cannot select DB");

$user = $_GET['u'];
$pass = $_GET['p'];

$user = stripslashes($user);
$pass = stripslashes($pass);
$user = mysql_real_escape_string($user);
$pass = mysql_real_escape_string($pass);
$user = htmlspecialchars($user);
$pass = htmlspecialchars($pass);
$pass = md5($pass);


$result = mysql_query("SELECT * FROM users WHERE username = '$user'") or die(mysql_error());
if (mysql_num_rows($result)==0) {
	mysql_query("INSERT INTO users (username, password, online) VALUES ( '$user', '$pass', 0)");
	$que = 'jQuery(".regconn").remove()';
	echo "lbAlert('Registration for $user was successful. You may now login.', 200, 75, '".$que."');";
} else {
	echo "lbAlert('The user $user already exists. Please choose another name.', 200, 75);";	
}
?>