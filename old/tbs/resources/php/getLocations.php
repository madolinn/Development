<?php

$host="localhost";
$username="tbsr";
$password="5FEwUMwsFpC5mfav";
$db_name="tbs";

mysql_connect("$host", "$username", "$password")or die("cannot connect");
mysql_select_db("$db_name")or die("cannot select DB");

$sid = $_GET['s'];

$result = mysql_query("SELECT * FROM users WHERE id = $sid");
if (mysql_num_rows($result) == 1) {
	$row = mysql_fetch_assoc($result);
	echo $row['world'];
}
?>