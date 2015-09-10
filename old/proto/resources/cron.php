<?php
$host="localhost";
$username="root";
$password="jamiefate1";
$db_name="protoim";

mysql_connect("$host", "$username", "$password")or die("cannot connect");
mysql_select_db("$db_name")or die("cannot select DB");

$result = mysql_query("SELECT * FROM messages");
while ($row = mysql_fetch_assoc($result)) {
	if(strlen($row['rec']) > strlen($row['recp'])) {
		mysql_query("DELETE FROM messages WHERE msg_id = $row[msg_id]");
	}
}

echo mysql_error();

?>