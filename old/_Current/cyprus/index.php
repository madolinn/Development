<html>
<head>
<title>Project Cyprus</title>
<link rel='stylesheet' type='text/css' href='web/default.css'>
<script src='http://10.0.0.2/jquery/jquery.min.js'></script>
<script src='http://10.0.0.4:1340/socket.io/socket.io.js'></script>
<script src='content/scripts/core.js'></script>
</head>
<body>

<div id = "wrapper" oncontextmenu = "return false;"><canvas>Use a Modern Browser :(</canvas><div id = "lat"></div></div>

<div id = "debug"></div>


<div id = "gamePrompt">
	<div class = "header">Sender: System</div>
	<div class = "content">
		<div class = "text"></div>
		<input type = "button" value = "OKAY">
		<input type = "text" id = "gamePromptInput">
		<input type = "button" value = "YES"><input type = "button" value = "NO">
	</div>
</div>

</body>
</html>