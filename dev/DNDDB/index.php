<meta charset="utf-8">
<html>
<head>
<link rel="stylesheet" type="text/css" href="style.css">
<script src = "http://localhost:11000/socket.io/socket.io.js"></script>
<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
<script src = "client.js"></script>
</head>
<body>

<div id = "wrapper">

	<div id = "login">
		<div id = "login_motd"></div>
		<input id = "login_room" value = "Room ID"><button id = "login_submit" onclick = "loginSubmit()">Go</button>
	</div>

	<div id = "room">
		<div id = "room_header">
			<div id = "room_tab_home" class = "room_tab"></div>
			<div id = "room_tab_bestiary" class = "room_tab"></div>
		</div>
		
		<div id = "room_wrapper">
			<div id = "room_home"></div>
			<div id = "room_bestiary"></div>
		</div>
	</div>
	
</div>

</body>
</html>