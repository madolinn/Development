<html>
<head>
<title>Starbound Icon Maker</title>
<script src='http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'></script>
<script src = "src/generator.js"></script>
<link rel='stylesheet' type='text/css' href='src/default.css'>
</head>
<body>

<div style = "height:150px;"></div>

<div id = "head"><span>Issues? Contact Madolinn on the Forums or Wiki</span></div>

<div id = "wrapper">

<div id = "header">Starbound Icon Maker<div id = "instructions">| <span>Instructions</span></div></div>


<div class = "lbl">Upload Icon</div>
<div class = "bumper"></div><div id = "upload">UPLOAD<input type = "file" id = "_in"></input></div>

<div class = "lbl">Choose Category</div>
<div class = "bumper"></div><div id = "category"><input id = "c1" type = "radio"><label for = "c1">Item</label><input id = "c2" type = "radio"><label for = "c2">Recipe</label><input id = "c3" type = "radio"><label for = "c3">Tech</label></div>

<div class = "lbl">Choose Rarity</div>
<div class = "bumper"></div><div id = "rarity"><input id = "c4" type = "radio"><label for = "c4">Common</label><input id = "c5" type = "radio"><label for = "c5">Uncommon</label><input id = "c6" type = "radio"><label for = "c6">Rare</label><input id = "c7" type = "radio"><label for = "c7">Legendary</label></div>

<div class = "lbl">Output</div>
<div class = "bumper"></div><div id = "output"><canvas id = "cv_gen" width = "36" height = "36">Sorry! Your browser doesn't support canvasses :(</canvas></div>

</div>

</body>
</html>