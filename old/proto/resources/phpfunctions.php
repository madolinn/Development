<?php

$host="localhost";
$username="jamieim";
$password="XhPQ8uJDGpZUwdVj";
$db_name="protoim";

mysql_connect("$host", "$username", "$password")or die("cannot connect");
mysql_select_db("$db_name")or die("cannot select DB");


function checkLog() {
	$user = $_POST['fuser'];
	$pass = $_POST['fpass'];

	$user = stripslashes($user);
	$pass = stripslashes($pass);
	$user = mysql_real_escape_string($user);
	$pass = mysql_real_escape_string($pass);
	$user = htmlspecialchars($user);
	$pass = htmlspecialchars($pass);
	$pass = md5($pass);

	$result = mysql_query("SELECT * FROM users WHERE username = '$user' AND password = '$pass'");
	if (mysql_num_rows($result)==1) {
		$_SESSION['username'] = $user;
		mysql_query("UPDATE users SET online = 1 WHERE username = '$_SESSION[username]'");
		header('location: index.php');
	} else {
		header('location: index.php?f=1');
	}
}

function retrieveLists() {

	$result = mysql_query("SELECT * FROM users WHERE username = '$_SESSION[username]'");
	$row = mysql_fetch_assoc($result);

	$fra = explode(",",strtolower($row['friends']));

	$friends = implode("','",explode(",",$row['friends']));

	$result = mysql_query("SELECT * FROM users WHERE username IN ('".$friends."')");
	while ($row = mysql_fetch_assoc($result)) {
		$status[array_search(strtolower($row[username]),$fra)] = $row['online'];
	}

	ksort($status);

	$friends = explode("','",$friends);

	return array($friends,$status);

}

function retrieveList( $friends, $status, $type ) {;
	for ($i = 0; $i < count($friends); $i++) {
		if(!$friends[$i]=="") {
			if($status[$i]==$type) {
				echo "<li id = '".$friends[$i]."' class = 'contact'>".$friends[$i]."</li>";
			}
		}
	}
}

?>