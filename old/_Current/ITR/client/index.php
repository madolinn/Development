<html>
<head>
<title>Into The Ring</title>
<link rel='stylesheet' type='text/css' href='web/default.css'>
<script src='http://10.0.0.2/jquery/jquery.min.js'></script>
<script src='http://10.0.0.2:1340/socket.io/socket.io.js'></script>

<script>

var socket = io.connect('http://10.0.0.2:1340');

socket.on("SR_playerLimbsStatus", function(data) { recievedLimbsStatus(data); });

function recievedLimbsStatus(data) {

	for (keys in data) {
	
		var co = "green";
		
		if (data[keys].hasOwnProperty("status")) {
			if (data[keys].status == 1) { co = "yellow"; }
			if (data[keys].status == 2) { co = "red"; }
			if (data[keys].status == 3) { co = "black"; }
		}
	
		var name;
	
		if (keys == "head") { name = "Head"; }
		if (keys == "teeth") { name = "Teeth"; }
		if (keys == "torso") { name = "Torso"; }
		if (keys == "larm") { name = "Left Arm"; }
		if (keys == "lhand") { name = "Left Hand"; }
		if (keys == "rarm") { name = "Right Arm"; }
		if (keys == "rhand") { name = "Righ Hand"; }
		if (keys == "lleg") { name = "Left Leg"; }
		if (keys == "lfoot") { name = "Left Foot"; }
		if (keys == "rleg") { name = "Right Leg"; }
		if (keys == "rfoot") { name = "Right Foot"; }
	
		$("<div/>", {
		
			style: "color:"+co+";",
			text: name
		
		}).appendTo("body");
	
	}

}

</script>

</head>
<body>
</body>
</html>