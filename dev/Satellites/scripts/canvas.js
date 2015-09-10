// --------------------------------------------------- Canvas Functions --------------------------------------------------------- \\

_cv = {};

function createCanvas(id, width, height, elem) {

	elem = elem || "body";
	
	$("<canvas/>", {
		"id" : id
	}).appendTo(elem);
	
	$("canvas#"+id).css("width",width).css("height",height).attr("width",width).attr("height",height);
	_cv[id] = $("canvas#"+id)[0].getContext('2d');

}