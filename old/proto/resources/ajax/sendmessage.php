<?php

$host="localhost";
$username="jamieim";
$password="XhPQ8uJDGpZUwdVj";
$db_name="protoim";

mysql_connect("$host", "$username", "$password")or die("cannot connect");
mysql_select_db("$db_name")or die("cannot select DB");

$rec = $_GET['r'];
$msg = $_GET['m'];

$rec = stripslashes($rec);
$msg = stripslashes($msg);
$rec = mysql_real_escape_string($rec);
$msg = mysql_real_escape_string($msg);
$rec = htmlspecialchars($rec);
$msg = htmlspecialchars($msg);

$msg = "[".date("H:i")."] ".$msg;

mysql_query("INSERT INTO messages (recp, msg) VALUES ('$rec', '$msg')");

?>