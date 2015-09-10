<?php

$host="localhost";
$username="jamieim";
$password="XhPQ8uJDGpZUwdVj";
$db_name="protoim";

mysql_connect("$host", "$username", "$password")or die("cannot connect");
mysql_select_db("$db_name")or die("cannot select DB");

$user = $_GET['u'];

	$result = mysql_query("SELECT * FROM users WHERE username = '$user'");
	$row = mysql_fetch_assoc($result);

	$fra = explode(",",strtolower($row['friends']));

	$friends = implode("','",explode(",",$row['friends']));

	$result = mysql_query("SELECT * FROM users WHERE username IN ('".$friends."')");
	while ($row = mysql_fetch_assoc($result)) {
		$status[array_search(strtolower($row[username]),$fra)] = $row['online'];
	}

	ksort($status);

	$friends = explode("','",$friends);


function retrieveList( $friends, $status, $type ) {;
	for ($i = 0; $i < count($friends); $i++) {
		if(!$friends[$i]=="") {
			if($status[$i]==$type) {
				echo "<li id = '".$friends[$i]."' class = 'contact'>".$friends[$i]."</li>";
			}
		}
	}
}

retrieveList($friends, $status, 1);
echo ":";
retrieveList($friends, $status, 0);

?>