<?


echo <<<END

<div id = "hidestatus">Hide</div>


<div id = "status"><div id = "statustitle"></div><table id = "statusstats"></table><div id = "statusdesc"></div></div>
<div id = "menu">
<span class = "menutab" id = "cargomenu">Cargo</span>
<span class = "menutab" id = "equipmenu">Equipment</span>
<span class = "menutab" id = "resmenu">Research</span>
</div>
<div id = "cargo">
END;

REQUIRE 'resources/php/getInv.php';
getInv($_SESSION['sid'], $_SESSION['kid'], 1);

echo <<<END
</div>

<script>

function getType (val) {
    if (typeof val === 'undefined') return 'undefined';
    if (typeof val === 'object' && !val) return 'null';
    return ({}).toString.call(val).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

function sign(int) {
	if (int!=0) { var n = (int/Math.abs(int));
	} else { n = 1; }
	return n;
}

$(function() {
	$("#hidestatus").click(function(){
		$("#status").stop().slideToggle(400);
		if ($("#hidestatus").html()=="Hide") { $("#hidestatus").html("Show");
			} else { $("#hidestatus").html("Hide"); }
	});
	$("#cargomenu").click(function(){updateCargo();});
	$("#equipmenu").click(function(){updateEquipment();});
	updateIcons(1);
});

function updateCargo() {
	$("#cargo").css("display","block");
	$("#equipment").css("display","none");
	$("#cargo").html("");
	var getinv = $.get("resources/php/getInv.php?s="+sid+"&k="+kid+"&m=1").success(function(){
		$("#cargo").html(getinv.responseText);
		updateIcons(1);
	});
}

function updateEquipment() {
	$("#equipment").css("display","block");
	$("#cargo").css("display","none");
	$("#equipment").html("");
	var getinv = $.ajax("resources/php/getInv.php?s="+sid+"&k="+kid+"&m=0").success(function(){
		$("#equipment").html(getinv.responseText);
		$("#equipment").children(".invcase").first().addClass("mechacase");
		
		updateIcons(0);
	});
}

function updateIcons(menu) {
	$(".invcase").each(function() {
		var set = reference(Math.floor($(this).attr("iid")));
		$(this).children(".invicon").css("background","url('resources/images/icons/"+set[3]+"')");
		$(this).children(".invname").css("color",col[set[1]]);

		$(this).mousedown(function(e) {
			if (e.which == 1){ viewStatus(Math.floor($(this).attr("iid"))); }
			else if (e.which == 3) { useItem(menu, $(this).index(), $(this).attr("iid")); }
		});

		if (($(this).attr("iid")%1)*100>0){
			$(this).children(".invcount").html("x"+Math.floor(($(this).attr("iid")%1)*100));
		}

		$(this).children(".invname").html(set[2]);
	});
}
</script>

<div id = "equipment"></div>
END;

?>