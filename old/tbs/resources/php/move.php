<?php

$host="localhost";
$username="jamieim";
$password="XhPQ8uJDGpZUwdVj";
$db_name="tbs";

mysql_connect("$host", "$username", "$password")or die("cannot connect");
mysql_select_db("$db_name")or die("cannot select DB");

$sid = $_GET['s'];
$kid = $_GET['k'];
$dest = $_GET['d'];

$kid = intval($kid);

$result = mysql_query("SELECT * FROM users WHERE id = $sid AND kid = $kid");
if (mysql_num_rows($result)==1) {
	$row = mysql_fetch_assoc($result);
	$cpos = explode("|",$row['pos']);
	$dest = explode("|",$dest);

	$bmap = file_get_contents("../maps/".$cpos[0].".b.map");
	$bmap = explode("|",$bmap);
	for ($i = 0; $i < count($bmap); $i++) { $bmap[$i] = explode(",",$bmap[$i]); }

	if ((abs($cpos[1]+$cpos[2]-$dest[1]-$dest[2])==1) && ($cpos[0]==$dest[0])) {
	if ($bmap[$dest[1]][$dest[2]]==1) {
		$dest = implode("|",$dest);
		mysql_query("UPDATE users SET pos = '$dest' WHERE id = $sid");
		echo "good";
	} else { echo "badmove"; }
	} else {
		echo "badmove";
	}
} else {
	// Force DeSync, Hax Hax
	echo "badlog";
}

?>