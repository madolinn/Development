<?php

function register($user) {

	$inv = "9002|,|";
	$pos = "1|1|1";

	mysql_query("UPDATE users SET inv = '$inv', pos = '$pos' WHERE username = '$user'");
}

?>