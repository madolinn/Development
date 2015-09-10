Planet = function() {

	this.x = 250;
	this.y = 250;
	this.velocity = 0;
	this.velocityAngle = 0;
	this.mass = 10;
	
	this.dampening = 0.01;

}

Planet.prototype.addForce = function(force, angle) {

	var ca = (Math.cos(this.velocityAngle)*this.velocity);
	var sa = (Math.sin(this.velocityAngle)*this.velocity);
	
	
	var cb = (Math.cos(angle)*(force/this.mass));
	var sb = (Math.sin(angle)*(force/this.mass));
	
	
	var r = Math.sqrt(Math.pow((ca+cb),2)+Math.pow((sa+sb),2));
	var rd = Math.atan2((sa+sb),(ca+cb));
	
	this.velocity = r;
	this.velocityAngle = rd;

}

Planet.prototype.Physics = function() {

	if (isKeyDown(39)) {	this.addForce(1,0);			}
	if (isKeyDown(40)) {	this.addForce(1,Math.PI*0.5);	}
	if (isKeyDown(37)) {	this.addForce(1,Math.PI);		}
	if (isKeyDown(38)) {	this.addForce(1,Math.PI*1.5);	}

	this.x += (Math.cos(this.velocityAngle)*this.velocity);
	this.y += (Math.sin(this.velocityAngle)*this.velocity);
	
	this.velocity *= (1-this.dampening);
	
}