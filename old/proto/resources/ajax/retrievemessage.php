<?php
header('Content-type: text/xml');

$host="localhost";
$username="jamieim";
$password="XhPQ8uJDGpZUwdVj";
$db_name="protoim";

mysql_connect("$host", "$username", "$password")or die("cannot connect");
mysql_select_db("$db_name")or die("cannot select DB");

$rec = $_GET['r'];

$rec = stripslashes($rec);
$rec = mysql_real_escape_string($rec);
$rec = htmlspecialchars($rec);

	$dom = new DOMDocument();
	$data = $dom->createElement('data');
	$dom->appendChild($data);

$result = mysql_query("SELECT * FROM messages");
while ($row = mysql_fetch_assoc($result)) {

	$recips = explode(",",$row['recp']);

	for ($i = 0; $i<count($recips); $i++) {
		$recips[$i] = strtolower($recips[$i]);
	}

	if($row['rec']!=="") {
		$recieved = explode(",",$row['rec']);
		for ($i = 0; $i<count($recieved); $i++) {
			$recieved[$i] = strtolower($recieved[$i]);
		}
	} else { $recieved = array(); }

	if(in_array(strtolower($rec),$recips)) {
		if(!in_array(strtolower($rec),$recieved)) {

				$re = $dom->createElement('rec');
				$rer = $dom->createTextNode($row['recp']);
				$re->appendChild($rer);

				$msg = $dom->createElement('msg');
				$msgr = $dom->createTextNode($row['msg']);
				$msg->appendChild($msgr);

				$data->appendChild($re);
				$data->appendChild($msg);

			$recieved = implode(",",$recieved).",".$rec;
			mysql_query("UPDATE messages SET rec = '$recieved' WHERE msg_id = $row[msg_id]");
		}
	}
}

	$xmlString = $dom->saveXML();
	echo $xmlString;

?>