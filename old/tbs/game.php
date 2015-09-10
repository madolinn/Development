<?php
	$host="localhost";
	$username="jamieim";
	$password="XhPQ8uJDGpZUwdVj";
	$db_name="tbs";

	mysql_connect("$host", "$username", "$password")or die("cannot connect");
	mysql_select_db("$db_name")or die("cannot select DB");

	session_start(); ob_start();
?>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<html>
<head>
<link rel="stylesheet" type="text/css" href="resources/style.css" />
<link rel="stylesheet" type="text/css" href="resources/menu.css" />
<script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src = "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js"></script>
<script src = "/tbs/resources/refre.js"></script>
<script src = '/tbs/resources/js/worldLoc.js'></script>
<style>
html {
	height:100%;
}
</style>
</head>
<body>
<div id = "texttest">ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz</div>
<canvas id="cv_background"></canvas><canvas id="cv_sprites"></canvas><canvas id="cv_overlay"></canvas><div id = "menuCon"><? REQUIRE '/resources/php/menu.php' ?></div>
<script src = "/tbs/resources/js/game.js"></script>
<script type="text/javascript"><!--
<?php
	$ta = getdate();
	echo "var time = ".($ta[hours]*60+$ta[minutes]).";\n";

		$user = $_SESSION['username'];
		$kid = $_SESSION['kid'];
		$sid = $_SESSION['sid'];

		echo "var user = '$user';\n";
		echo "var kid = $kid;\n";
		echo "var sid = $sid;\n";
	
	$result = mysql_query("SELECT * FROM users WHERE id = '$sid' AND kid = $kid");
	if (mysql_num_rows($result)==1) {
		$row = mysql_fetch_assoc($result);
		echo "var pos = '".$row['pos']."';\n";
		if (substr($row['pos'],0,1) == "-") { header("location: battle.php"); }
	} else {
		session_destroy();
		header("location: index.php");
		die("Died");
	}
?>
//--></script>

</body>
</html>