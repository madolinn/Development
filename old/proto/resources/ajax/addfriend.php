<?php

$host="localhost";
$username="jamieim";
$password="XhPQ8uJDGpZUwdVj";
$db_name="protoim";

mysql_connect("$host", "$username", "$password")or die("cannot connect");
mysql_select_db("$db_name")or die("cannot select DB");

$user = $_GET['u'];
$add = $_GET['a'];

$user = stripslashes($user);
$add = stripslashes($add);
$user = mysql_real_escape_string($user);
$add = mysql_real_escape_string($add);
$user = htmlspecialchars($user);
$add = htmlspecialchars($add);

$result = mysql_query("SELECT * FROM users WHERE username = '$user'");
$row = mysql_fetch_assoc($result);

$curfr = explode(",",$row['friends']);
for ($i = 0; $i<count($curfr); $i++) {
	$curfrl[] = strtolower($curfr[$i]);
}

if (!$add=="") {
	if (mysql_num_rows(mysql_query("SELECT * FROM users WHERE username = '$add'"))==1) {
		if (!in_array(strtolower($add),$curfrl)) {
			mysql_query("UPDATE users SET friends = '".implode(",",$curfr).",".$add."' WHERE username = '$user'");
			echo "lbAlert('$add has been added to your friends list.'); updateFriendslist();";
		} else {
			echo "lbAlert('$add has already been added to your friends list.');";
		}
	} else {
		echo "lbAlert('$add does not exist.');";
	}
}
?>