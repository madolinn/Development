<?php

$host="localhost";
$username="tbsr";
$password="5FEwUMwsFpC5mfav";
$db_name="tbs";

mysql_connect("$host", "$username", "$password")or die("cannot connect");
mysql_select_db("$db_name")or die("cannot select DB");

$bid = $_GET['b'];

$result = mysql_query("SELECT * FROM battles WHERE id = $bid");
while ($row = mysql_fetch_assoc($result)) {
	echo $row['bounds'];
}
?>