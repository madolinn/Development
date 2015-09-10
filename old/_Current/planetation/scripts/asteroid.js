Asteroid = function(pars) {

	this.x = 250;
	this.y = -10;
	this.velocity = 1;
	this.velocityAngle = (Math.PI*0.5);

	this.massMax = 10;
	this.massMin = 1;
	
	this.rotationSpeed = (Math.random()*1)-.5;
	
	if (typeof pars === 'object') {
		for (keys in pars) {
			this[keys] = keys;
		}
	}
	
	this.mass = Math.floor(Math.random()*(this.massMax-this.massMin))+this.massMin;
	
	this.ra = this.mass;
	this.rotation = 0;
	this.verticesMax = Math.max(7,this.ra/2);
	this.vertices = [];
	
	for (var i = 0; i < this.verticesMax; i++) {
	
		this.vertices[i] = [];
		this.vertices[i][0] = (((Math.PI*2)/this.verticesMax)*i)-((Math.PI*2)/this.verticesMax/6)+(Math.random()*((Math.PI*2)/this.verticesMax/3));
		this.vertices[i][1] = (Math.random()*(this.ra/5))-(this.ra/10);
	
	}

}

Asteroid.prototype.render = function() {

	this.x += (Math.cos(this.velocityAngle)*this.velocity);
	this.y += (Math.sin(this.velocityAngle)*this.velocity);

	/*_cv[0].strokeStyle = "#CCC";
	_cv[0].beginPath();
	_cv[0].arc(this.x,this.y,this.mass,0,2*Math.PI);
	_cv[0].stroke();*/
	
	_cv[0].strokeStyle = "rgb(100,100,100)"
	_cv[0].lineWidth = 1;
	_cv[0].beginPath();
	_cv[0].arc(this.x,this.y,this.ra,0,2*Math.PI);
	_cv[0].stroke();
	
	_cv[0].strokeStyle = "#CCC"
	_cv[0].beginPath();
	_cv[0].moveTo(this.x+(Math.cos(this.vertices[0][0]+this.rotation)*(this.ra+(this.vertices[0][1]))),this.y+(Math.sin(this.vertices[0][0]+this.rotation)*(this.ra+this.vertices[0][1])));
	
	for (var i = 0; i < this.vertices.length; i++) {
		_cv[0].lineTo(this.x+(Math.cos(this.vertices[i][0]+this.rotation)*(this.ra+(this.vertices[i][1]))),this.y+(Math.sin(this.vertices[i][0]+this.rotation)*(this.ra+this.vertices[i][1])));
	}
	_cv[0].lineTo(this.x+(Math.cos(this.vertices[0][0]+this.rotation)*(this.ra+(this.vertices[0][1]))),this.y+(Math.sin(this.vertices[0][0]+this.rotation)*(this.ra+this.vertices[0][1])));
	
	_cv[0].stroke();
	
	this.rotation+=this.rotationSpeed;

}