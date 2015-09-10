var _captcha = document.getElementById('captcha');
_captcha.style.width = '180px';
_captcha.style.height = '37px';

var _decaptcha = document.getElementById('decaptcha');

_decaptcha.style.width = '180px';
_decaptcha.style.height = '37px';

var cap = _captcha.getContext('2d');
var decap = _decaptcha.getContext('2d');

var captcha = new Image();
//captcha.src = $("#sbvdcapimg").attr("src");
captcha.src = 'http://app2.swagbucks.com/images/captcha1/182929771ouhhtd.jpg';

cap.drawImage(captcha, 0, 0);

function thresh(context) {
	var imgd = context.getImageData(0, 0, 180, 37);
	var da = imgd.data;

	for (var i = 0; i < da.length; i += 4) {
		var c = (da[i] + da[i+1] + da[i+2] > 360) ? 255 : 0;
		da[i] = da[i+1] = da[i+2] = c;
	}

	context.putImageData(imgd, 0, 0);
}

function invert(context) {
	var imgd = context.getImageData(0, 0, 180, 37);
	var da = imgd.data;

	var out = "";

	for (var i = 0; i < da.length; i += 4) {
		da[i  ] = 255 - da[i  ];
		da[i+1] = 255 - da[i+1];
		da[i+2] = 255 - da[i+2];
	}

	context.putImageData(imgd, 0, 0);
}

var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var binds = new Array();

function bounds(context) {
	var imgd = context.getImageData(0, 0, 180, 37);
	var da = imgd.data;

	var bound = false;

	for (var z = 0; z < 180*4; z+=4) {

		var col = new Array();

		for (var i = 0; i < da.length; i += (180*4)) {
			if (da[i+z]==255) { col.push(1); }
		}

		if (bound) { if (col.length==0) { binds.push(z); bound=false; }
		} else { if (col.length > 0) { binds.push(z); bound=true; }}
	}

	bound = false;

	for (var n = 0; n < 6; n+=2) {
	for (var i = 0; i < 37; i++) {

		var col = new Array();

		for (var z = binds[n]; z < binds[n+1]; z+=4) {
			if (da[z+(i*180*4)] == 255) { col.push(1); }
		}

		if (bound) { if (col.length==0) { binds.push(i); bound=false; }
		} else { if (col.length > 0) { binds.push(i); bound=true; }}

	}
	}

	alert(binds);

}

function solve(context) {
	var results = [99999,''];

	context.textAlign = "left";
	context.textBaseline = "top";
	context.font = "bold 18pt Arial";
	context.fillStyle = "#000000";

	var a = cap.getImageData(0,0,180,37).data;

	for (var n = 0; n < 3; n++) {
	for (var i = 0; i < letters.length; i++) {
		decap.putImageData(cap.getImageData(0, 0, 180, 37), 0, 0);
		context.fillText(letters.slice(i,i+1),binds[n*2]/4-2,binds[(n*2)+6]-2);
		var b = context.getImageData(0,0,180,37).data;

		var failcount = 0;
		for (var x = 0; x < b.length; x+=4) { if (b[x] == 255) {  failcount++; }}
		if (failcount < results[0]) { results[0]=failcount; results[1]=letters.slice(i,i+1); }
	}
		alert(results[1]);
		results = [999999,''];
	}


}
	

thresh(cap);
invert(cap);
bounds(cap);
solve(decap);