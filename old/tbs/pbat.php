<?php
	$host="localhost";
	$username="jamieim";
	$password="XhPQ8uJDGpZUwdVj";
	$db_name="tbs";

	mysql_connect("$host", "$username", "$password")or die("cannot connect");
	mysql_select_db("$db_name")or die("cannot select DB");

	session_start(); ob_start();
?>

<html>
<body>
<?php
	$result = mysql_query("SELECT * FROM battles WHERE id = 1");
	if (mysql_num_rows($result)) {
		$row = mysql_fetch_assoc($result);
		$pa = explode("|",$row['parti']);
		for ($i = 0; $i < count($pa); $i++) {
			$pa[$i] = explode(",",$pa[$i]);
			for ($z = 0; $z < count($pa[$i]); $z++) {
				$pa[$i][$z] = explode("†",$pa[$i][$z]);
			}
		}
		
		$t = $row['turn'];
		
		echo "It is currently ".time().".<br>";
		echo "The turn started at ".$row['time'].". The next turn will start at ".($row['time']+30).".<br>";
		
		echo $pa[$t][1][0]."'s turn.<br>".$pa[$t][2][0]." of 100 speed.<br>".$pa[$t][3][0]." of ".$pa[$t][3][1]." shield.<br>Has a speed increment of ".$pa[$t][4][0].".";
	}
?>