<html>
<body>
<script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src = "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js"></script>
<script>

var d = window.open("index.php", "tile","target=_blank,width=200,height=200");


function go() {

	alert($(d.document.body).children(".selected").index());

}

</script>

<button onclick = "go()">Poo</button>