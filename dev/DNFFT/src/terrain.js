terrain = function() {
	this.ter = [];
}

terrain.prototype.random = function(w, h, variance) {
	this.w = w;
	this.h = h;
	for (var y = 0; y < h; y++) {
		this.ter[y] = [];
		for (var x = 0; x < w; x++) {
			this.ter[y][x] = Math.floor(Math.random()*variance);
		}
	}
}

terrain.prototype.draw = function() {
	var x = 0;
	var y = 0;
	var i = 0;
	var a = _g.angle;
	while (i < this.w + this.h) {
		y = Math.min(this.h-1,i);
		x = Math.max(i,this.w)-this.w;
		while (y > -1 && x < this.w) { 
			_cv[0].fillStyle = "rgb("+y*20+","+x*20+","+this.ter[y][x]*40+")";
			//_cv[0].fillRect(120-(Math.cos(a*Math.PI)*(10*i))+(15*x),Math.sin(a*Math.PI)*(15*(i)),10,10);
			_cv[0].beginPath();
			_cv[0].moveTo((200-(Math.cos(a*Math.PI)*(16*i))+(32*x))*2,50+((-this.ter[y][x])*2+Math.sin(a*Math.PI)*(32*(i)))*2);
			_cv[0].lineTo((200-(Math.cos(a*Math.PI)*(16*i))+(32*x)+16)*2,50+((-this.ter[y][x])*2+Math.sin(a*Math.PI)*(32*(i))-6)*2);
			_cv[0].lineTo((200-(Math.cos(a*Math.PI)*(16*i))+(32*x)+32)*2,50+((-this.ter[y][x])*2+Math.sin(a*Math.PI)*(32*(i)))*2);
			_cv[0].lineTo((200-(Math.cos(a*Math.PI)*(16*i))+(32*x)+16)*2,50+((-this.ter[y][x])*2+Math.sin(a*Math.PI)*(32*(i))+6)*2);
			_cv[0].lineTo((200-(Math.cos(a*Math.PI)*(16*i))+(32*x))*2,50+((-this.ter[y][x])*2+Math.sin(a*Math.PI)*(32*(i)))*2);
			_cv[0].fill();
			_cv[0].closePath();
			_cv[0].fillRect(700+(x*15),240+(y*15),10,10);
			y--;
			x++;
		}
		i++;
	}
}