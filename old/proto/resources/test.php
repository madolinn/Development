<?php
$host="localhost";
$username="jamieim";
$password="XhPQ8uJDGpZUwdVj";
$db_name="protoim";

mysql_connect("$host", "$username", "$password")or die("cannot connect");
mysql_select_db("$db_name")or die("cannot select DB");

//mail( '5864535293@messaging.sprintpcs.com', '', 'Now to spam Andy!' );
?>