function checkLookup() {
	var text = $('#pokeSearch').val().toLowerCase();
	for (var i = 0; i < pokemon.length; i++) {
		if (pokemon[i][NAME].toLowerCase() == text) {
			lookup(i);
			break;
		};
	};
	for (var i = 0; i < pokemon.length; i++) {
		if (pokemon[i][NAME].toLowerCase().indexOf(text) == 0) {
			lookup(i);
			break;
		};
	};
}

function lookup(id) {
	var str = '<div class="lookup-header">'
		+ '<img src="' + pokemon[id][IMG] + '" />'
		+ '<span>' + pokemon[id][NAME] + '</span>'
		+ '<div class="lookup-id">#' + pokemon[id][ID] + '</div>'
		+ '<div class="type-container">'
		+ '<div class="type-icon type-' + pokemon[id][TYPE][0].toLowerCase() + '">' + pokemon[id][TYPE][0] + '</div>'
		+ ((pokemon[id][TYPE].length == 2) ? '<div class="type-icon type-' +  pokemon[id][TYPE][1].toLowerCase() + '">' + pokemon[id][TYPE][1] + '</div>' : '')
		+ '</div>'
		+ '</div>'
		+ '<div class="stat HP">HP: <span>' + pokemon[id][STAT.HP] + '</span>'
		+ '<div class="HP bar" style="width: ' + (pokemon[id][STAT.HP] / 255) * 170 + 'px;"></div></div>'
		+ '<div class="stat ATK">ATK: <span>' + pokemon[id][STAT.ATK] + '</span>'
		+ '<div class="ATK bar" style="width: ' + (pokemon[id][STAT.ATK] / 255) * 170 + 'px;"></div></div>'
		+ '<div class="stat DEF">DEF: <span>' + pokemon[id][STAT.DEF] + '</span>'
		+ '<div class="DEF bar" style="width: ' + (pokemon[id][STAT.DEF] / 255) * 170 + 'px;"></div></div>'
		+ '<div class="stat SPATK">SPATK: <span>' + pokemon[id][STAT.SPATK] + '</span>'
		+ '<div class="SPATK bar" style="width: ' + (pokemon[id][STAT.SPATK] / 255) * 170 + 'px;"></div></div>'
		+ '<div class="stat SPDEF">SPDEF: <span>' + pokemon[id][STAT.SPDEF] + '</span>'
		+ '<div class="SPDEF bar" style="width: ' + (pokemon[id][STAT.SPDEF] / 255) * 170 + 'px;"></div></div>'
		+ '<div class="stat SPD">SPD: <span>' + pokemon[id][STAT.SPD] + '</span>'
		+ '<div class="SPD bar" style="width: ' + (pokemon[id][STAT.SPD] / 255) * 170 + 'px;"></div></div>'		
		+ 'Total: ' + pokemon[id][STAT.TOTAL] + ' | '
		+ 'Average: ' + pokemon[id][STAT.AVERAGE] + ' | '
		+ 'XP: ' + pokemon[id][STAT.XP]
		+ '<div class="ev HP">' + pokemon[id][EV.HP] + '</div>'
		+ '<div class="ev ATK">' + pokemon[id][EV.ATK] + '</div>'
		+ '<div class="ev DEF">' + pokemon[id][EV.DEF] + '</div>'
		+ '<div class="ev SPATK">' + pokemon[id][EV.SPATK] + '</div>'
		+ '<div class="ev SPDEF">' + pokemon[id][EV.SPDEF] + '</div>'
		+ '<div class="ev SPD">' + pokemon[id][EV.SPD] + '</div>';
		
	$('#lookup').html(str);
};