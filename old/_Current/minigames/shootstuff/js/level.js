function Level(parent) {
	this.p = parent;
	this.lvl = 1;
	this.img = [];
	this.img[0] = new Image();
	this.img[0].src = './img/bg1.png';
	this.img[1] = new Image();
	this.img[1].src = './img/bg2.png';
	this.skyColor = [45, 18, 7];
};