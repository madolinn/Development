<?php

$host="localhost";
$username="tbsr";
$password="5FEwUMwsFpC5mfav";
$db_name="tbs";

mysql_connect("$host", "$username", "$password")or die("cannot connect");
mysql_select_db("$db_name")or die("cannot select DB");

$map = $_GET['m'];

$result = mysql_query("SELECT * FROM users WHERE online = 1");
while ($row = mysql_fetch_assoc($result)) {
	$pos = explode("|",$row['pos']);
	if ($pos[0]==$map) {
		echo $row['username'].",".implode(",",$pos).",".$row['model']."|";
	}
}
$result = mysql_query("SELECT * FROM npc");
while ($row = mysql_fetch_assoc($result)) {
	$pos = explode("|",$row['pos']);
	if ($pos[0]==$map) {
		echo $row['name'].",".implode(",",$pos).",".$row['model']."|";
	}
}

?>