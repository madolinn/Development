var item = new Array(10000);

function reference(id) {
	var result = new Array();
	result = item[id].slice(0);
	return result;
}

function addItem(index, kind, q, name, icon, desc, shield, hull, energy, speed) {
	item[index] = new Array();
	item[index].push(kind, q, name, icon, desc, shield, hull, energy, speed);
}

// 0 Junk, 1 Equip, 2 Consumeable, 3 Mecha

addItem(0,0,2,"Empty Slot","transparent","It would appear a module would go here.");
addItem(1,0,9,"Brain Slushie", "icon.png", "c2|Brainnnnnns.e| b| c1|Consume to wine|");
addItem(2,0,8,"Booster Batteries", "batteries.png", "To boost your actions per day. Oh wait, this ain't no Facebook game.");
addItem(5000,1,2,"Militia Rocket Launcher", "singleTurret.png", "A standard launcher issued to all rookies.","Range†cr|2e| - cg|4e|,Damage†6");
addItem(9000,3,2,"Militia Issue Mecha","icon.png","A standard Mecha given to all qualified rookies.","Modules†2,Shield†50,Hull†30,Speed†3");
addItem(9001,3,8,"Trusty Cardboard Box","box.png","This box served you well growing up over the years, striving to become a real pilot. Epic times.","Modules†4,Shield†10,Hull†5,Speed†4");

var col = new Array(10);
col[0]="transparent"; // Dummy Objects
col[1]="#CCCCCC"; // Junk
col[2]="#FFFFFF"; // Common
col[8]="#d517e1"; // Epic
col[9]="#ffac1b"; // Legendary	

function viewStatus(id) {
	var set = reference(id);

	$("#statustitle").css("color",col[set[1]]);
	$("#statustitle").html(set[2]);

	var desc = parseText(set[4]);
	$("#statusdesc").html(desc);

	if (getType(set[5])!="undefined") {
	var stat = parseText(set[5]);
	stat = stat.split(",");

	$("#statusstats").html("");

	for (var i = 0; i < stat.length; i++) {
		stat[i] = stat[i].split("†");
		var dum = $("#statusstats").html()+"<tr><td>"+stat[i][0]+"</td><td>"+stat[i][1]+"</td></tr>";
		$("#statusstats").html(dum);
	}
	} else { $("#statusstats").html(""); }
}

function parseText(str) {
	str = str.replace(/b\|/g,"<br>");
	str = str.replace(/cg\|/g,"<span style = 'color:#2cda31'>");
	str = str.replace(/cr\|/g,"<span style = 'color:#ba1414'>");
	str = str.replace(/c1\|/g,"<span style = 'color:#00ffff'>");
	str = str.replace(/c2\|/g,"<span style = 'color:#b41414'>");
	str = str.replace(/e\|/g,"</span>");

	return str;
}

function useItem(menu, slot, iid) {
	iid = Math.floor(iid);
	var set = reference(iid);
	if (menu == 1) {			 // Cargo
		if (set[0]==2 || set[0]==3) { 	// Consumeable or Mecha item
			var equ = $.ajax("resources/php/useItem.php?si="+sid+"&k="+kid+"&m=1&s="+slot).success(function() {
				if (equ.responseText=="good") {	updateCargo(); } else { alert(equ.responseText); }
			});
		} else if (set[0]==1) { // Equipable
			updateEquipment();
			$(document).ajaxComplete(function(e, xhr, s){
				if (s.url.substring(14,20)=="getInv") {
					$("#equipment").children(".invcase").each(function() {
						var d = $(this).unbind("mousedown")
						.mousedown(function(){ useItem(0.5, Array(slot,$(this).index()), $(this).attr("iid")); $(document).unbind("mousedown"); });
						$(document).mousedown(function() { updateCargo(); d.unbind("mousedown"); $(this).unbind("mousedown"); });
					});
					$(this).unbind("ajaxComplete");
				}
			});
		}
	} else if (menu == 0) { 		 // Equipment
		if (set[0]==1) {		// Equipable
			var equ = $.ajax("resources/php/useItem.php?si="+sid+"&k="+kid+"&m=0&s="+slot).success(function() {
				if (equ.responseText=="good") {	updateEquipment(); } else { alert(equ.responseText); }
			});
		}
	} else if (menu == 0.5) { // Attempting to Equip
		if (slot[1]>0) {
			var equ = $.ajax("resources/php/useItem.php?si="+sid+"&k="+kid+"&m=1&s="+slot).success(function() {
				if (equ.responseText=="good") {	updateCargo(); } else { alert(equ.responseText); }
			});
		}
	}
}