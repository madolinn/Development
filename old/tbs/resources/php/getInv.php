<?php

$host="localhost";
$username="tbsr";
$password="5FEwUMwsFpC5mfav";
$db_name="tbs";

mysql_connect("$host", "$username", "$password");
mysql_select_db("$db_name");

if(isset($_GET['s']) && isset($_GET['k']) && isset($_GET['m'])) { getInv($_GET['s'],$_GET['k'],$_GET['m']); }

function getInv($sid, $kid, $menu) {

	$result = mysql_query("SELECT * FROM users WHERE id = '$sid' AND kid = $kid");
	if (mysql_num_rows($result)==1) {
		$row = mysql_fetch_assoc($result);
		$inv = $row['inv'];
		$inv = explode(",",$inv);
		$inv = explode("|",$inv[$menu]);

		for ($i = 0; $i < count($inv)-1; $i++) { echo '<div class = "invcase"  iid = "'.$inv[$i].'"><div class = "invicon"></div><div class = "invname"></div><div class = "invcount"></div></div>'; }
	}
}
?>