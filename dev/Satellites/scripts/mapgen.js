// --------------------------------------------------- Map Gen Functions ------------------------------------------------------- \\

function mapGen() {

	this.xmax = 50;
	this.ymax = 50;
	this.worms = 1;
	this.alive = true;
	this.airCount = 0;
	this.checkCount = 0;
	this.eatenMax = ((this.xmax*this.ymax)/8)+(Math.random()*(this.xmax*this.ymax)/4);
	this.eaten = 0;

}

mapGen.prototype.create = function() {

	this.counting = this.worms;

	this.mapData = new Array(this.xmax);
	for (var x = 0; x < this.xmax; x++) {
	
		this.mapData[x] = new Array(this.ymax);
		for (var y = 0; y < this.ymax; y++) {
			this.mapData[x][y] = 1;
		}
	
	}
	
	this.worm = [];
	
	for (var i = 0; i < this.worms; i++) {
	
		this.worm[i] = new worldWorm;
		
		if (this.worms > 1) {
		
			this.worm[i].stx = Math.floor(Math.random()*this.xmax);
			this.worm[i].sty = Math.floor(Math.random()*this.ymax);
		
		} else {

			this.worm[i].stx = Math.floor(this.xmax/2);
			this.worm[i].sty = Math.floor(this.ymax/2);

		}		
		
		this.worm[i].eat();
	
	}
	_g.map.step();

}

mapGen.prototype.step = function() {

	this.alive = false;
	
	/*_cv.fore.clearRect(0,0,this.xmax*_g.cell,this.ymax*_g.cell);
	for (var x = 0; x < this.xmax; x++) {
	
		for (var y = 0; y < this.ymax; y++) {
		
			//if (x/2 == Math.floor(x/2) && y/2 == Math.floor(y/2)) { _cv.fore.drawImage(_spr[0],x*_g.cell,y*_g.cell); }
			
			if (this.mapData[x][y] == 1) {
				
				_cv.fore.fillStyle = "#000";
				_cv.fore.fillRect(x*_g.cell,y*_g.cell,_g.cell,_g.cell);
				
			} else {
			
				_cv.fore.fillStyle = "rgb("+Math.floor(this.mapData[x][y]/1000000)+","+(Math.floor(this.mapData[x][y]/1000)%1000)+","+(Math.floor(this.mapData[x][y]%1000))+")";
				_cv.fore.fillRect(x*_g.cell,y*_g.cell,_g.cell,_g.cell);
			
			}
			
			if (this.mapData[x][y] == 0) {
			
				//_cv.fore.fillStyle = "#666";
				//_cv.fore.fillRect(x*_g.cell,y*_g.cell,_g.cell,_g.cell);
			
			}
				
		}
		
	}*/
	for (var i = 0; i < this.worm.length; i++) {
		
		if (this.worm[i].alive) { this.worm[i].eat(); this.alive = true; }
		
	}
	if (this.alive == true) {
	
		setTimeout(function(){_g.map.step();},1);
		
	} else {
	
		delete this.worm;
		this.worm = [];
		
		
		
	}
}

mapGen.prototype.check = function() {
	
	for (var x = 0; x < this.xmax; x++) {
	
		for (var y = 0; y < this.ymax; y++) {
			
			if (this.mapData[x][y] == 0 || this.mapData[x][y] == 0.1) {
			
				if (this.airCount == 0) {
				
					new checkMaggot(x,y);
					
				}
				
				this.airCount++;
			
			}
			
		}
		
	}
	
	if (this.airCount != this.checkCount) {
	
		_g.map = new mapGen;
		setTimeout(function(){_g.map.create();},1000);
	
	} else {
	
		
	
	}
	
}

function checkMaggot(x, y) {
	
	if (_g.map.mapData[x][y] == 0) { _g.map.checkCount++; } else { return; }
	
	_g.map.mapData[x][y] = 0.1;
	
	if (x+1 < _g.map.xmax)	{ if (_g.map.mapData[x+1][y] == 0) { new checkMaggot(x+1,y); } }
	if (x-1 > -1)			{ if (_g.map.mapData[x-1][y] == 0) { new checkMaggot(x-1,y); } }
	if (y-1 > -1)			{ if (_g.map.mapData[x][y-1] == 0) { new checkMaggot(x,y-1); } }
	if (y+1 < _g.map.ymax)	{ if (_g.map.mapData[x][y+1] == 0) { new checkMaggot(x,y+1); } }
	
}

function worldWorm() {

	this.stx = -1;
	this.sty = -1;
	this.x = -1;
	this.y = -1;
	this.alive = true;
	this.immune = false;
	
	this.col = (Math.floor(Math.random()*256))+(Math.floor(Math.random()*256)*1000)+(Math.floor(Math.random()*256)*1000000);
	
}

worldWorm.prototype.eat = function() {

	if (this.x == -1) {
	
		this.x = this.stx;
		this.y = this.sty;
	
	}
	
	var choices = [];
	
	if (this.x+1 < _g.map.xmax)	{ if (_g.map.mapData[this.x+1][this.y] == 1 || _g.map.eaten < _g.map.eatenMax) { choices.push(0); } }
	if (this.x-1 > -1)			{ if (_g.map.mapData[this.x-1][this.y] == 1 || _g.map.eaten < _g.map.eatenMax) { choices.push(2); } }
	if (this.y-1 > -1)			{ if (_g.map.mapData[this.x][this.y-1] == 1 || _g.map.eaten < _g.map.eatenMax) { choices.push(1); } }
	if (this.y+1 < _g.map.ymax) { if (_g.map.mapData[this.x][this.y+1] == 1 || _g.map.eaten < _g.map.eatenMax) { choices.push(3); } }
	
	if (choices.length > 0) {
	
		var d = choices[Math.floor(Math.random()*choices.length)];
		
		if (d == 0) { this.x++; }
		if (d == 2) { this.x--; }
		if (d == 1) { this.y--; }
		if (d == 3) { this.y++; }
		
		_g.map.mapData[this.x][this.y] = this.col;
		
		if (Math.random()*100 > 98) {
			
			_g.map.worm.push(new worldWorm);
			_g.map.worm[_g.map.worm.length-1].stx = this.x;
			_g.map.worm[_g.map.worm.length-1].sty = this.y;
			_g.map.worm[_g.map.worm.length-1].eat();
		
		}
		
		_g.map.eaten++;
		
	} else {

		this.alive = false;
		
	}

}