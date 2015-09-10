<?php
	$host="localhost";
	$username="jamieim";
	$password="XhPQ8uJDGpZUwdVj";
	$db_name="tbs";

	mysql_connect("$host", "$username", "$password")or die("cannot connect");
	mysql_select_db("$db_name")or die("cannot select DB");
?>

