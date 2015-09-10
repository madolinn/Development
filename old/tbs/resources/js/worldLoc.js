var locs = new Array(5);

loc(0,500,500);
loc(1,1764,666);
loc(2,1110,930);
loc(3,609,1167);
loc(4,400,500);

function loc(index, x, y) {
	locs[index] = new Array();
	locs[index].push(x, y);
}