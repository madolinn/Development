<?php

REQUIRE 'itemRefs.php';

$host="localhost";
$username="tbsru";
$password="2fHYUj6G9bQHWDXD";
$db_name="tbs";

mysql_connect("$host", "$username", "$password");
mysql_select_db("$db_name");

$sid = $_GET['si'];
$kid = $_GET['k'];
$menu = $_GET['m'];
$slot = $_GET['s'];

$user = mysql_real_escape_string($user);

$result = mysql_query("SELECT * FROM users WHERE id = $sid AND kid = $kid");
if (mysql_num_rows($result)==1) {
	$slot = explode(",",$slot);
	$row = mysql_fetch_assoc($result);
	$inv = $row['inv'];
	$inv = explode(",",$inv);
	for ($z = 0; $z < count($inv); $z++) {	$inv[$z] = explode("|",$inv[$z]); }

	if ($item[$inv[$menu][$slot[0]]][0]==1 && $menu == 0) {
		array_pop($inv[1]);
		array_push($inv[1],$inv[0][$slot[0]],"");
		$inv[0][$slot[0]] = 0;

		for ($z = 0; $z < count($inv); $z++) {	$inv[$z] = implode("|",$inv[$z]); }
		$inv = implode(",",$inv);

		mysql_query("UPDATE users SET inv = '$inv' WHERE id = $sid");
		echo "good";

	} else 	if ($item[$inv[$menu][$slot[0]]][0]==3) { swapMecha($inv); }
	else if ($item[$inv[$menu][$slot[0]]][0]==1 && $menu == 1) { swapItem($inv,1,0,$slot[0],$slot[1]); }

}

function swapMecha($inv) {
	global $item;

	$oldm = $inv[0][0];
	$inv[0][0] = $inv[1][$_GET['s']];
	$inv[1][$_GET['s']] = $oldm;

	array_pop($inv[1]);
	for ($i = 1; $i < count($inv[0]); $i++) { if ($inv[0][$i] != 0) { array_push($inv[1],$inv[0][$i]); }}
	array_push($inv[1],"");
	$inv[0] = array_splice($inv[0],0,1);
	for ($i = 0; $i < $item[$inv[0][0]][1]; $i++) { array_push($inv[0],0); }
	array_push($inv[0],"");

	for ($z = 0; $z < count($inv); $z++) {	$inv[$z] = implode("|",$inv[$z]); }
	$inv = implode(",",$inv);
	mysql_query("UPDATE users SET inv = '$inv' WHERE id = $_GET[si]");

	echo "good";
}

function swapItem($inv, $a, $b, $c, $d) {
	$oldi = $inv[$a][$c];
	if ($item[$oldi][0]==0) { unset($inv[$a][$c]); } else {	$inv[$a][$c] = $inv[$b][$d]; }
	$inv[$b][$d] = $oldi;
	for ($z = 0; $z < count($inv); $z++) {	$inv[$z] = implode("|",$inv[$z]); }
	$inv = implode(",",$inv);
	mysql_query("UPDATE users SET inv = '$inv' WHERE id = $_GET[si]");

	echo "good";
}

?>