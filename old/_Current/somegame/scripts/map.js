var map = [];
var roomWidth;
var roomHeight;
var roomY;
var roomX;
var wallHeight = 3;
var tileSize = 24;
var roomList = [];
var can = [];
var noPassT = [1,16];
var passUnderT = [];
var floorT = [2];
var coords = true;
var hallMin = 2;
var hallMax = 4;

function createCanvasContexts() {
	var index = 0;
	$('canvas').each(function() {
		can[index] = $(this)[0].getContext('2d');
		index += 1;
	});
}

function drawMap() {
	can[0].clearRect(0,0,Game.width,Game.height);
	can[3].clearRect(0,0,Game.width,Game.height);
	can[0].fillStyle= 'rgb(0,0,0)';
	can[0].fillRect(0,0,Game.width,Game.height);
	var relTop = Game.player.y-Math.floor(Game.height/tileSize/2);
	var relLeft = Game.player.x-Math.floor(Game.width/tileSize/2);
	for (var y=0; y<Math.ceil(Game.height/tileSize); y++) {
		for (var x=0; x<Math.ceil(Game.width/tileSize); x++) {
			if ( relTop+y >= 0 && relTop+y < map.length && relLeft+x >= 0 && relLeft+x < map[0].length) {
				var r = map[relTop+y][relLeft+x] * 16;
				var g = map[relTop+y][relLeft+x] * 16;
				var b = map[relTop+y][relLeft+x] * 16;
				can[0].fillStyle= 'rgb('+r+','+g+','+b+')';
				can[0].fillRect(x*tileSize,y*tileSize,tileSize,tileSize);
				can[0].strokeStyle = 'rgba(0,0,0,.5)';
				can[0].strokeRect(x*tileSize,y*tileSize,tileSize,tileSize);
				//coords
				if (coords && tileSize>24) {
					can[3].font = "normal "+(tileSize/3)+"px Arial";
					can[3].textAlign = "center";
					can[3].textBaseline = "middle";
					can[3].fillStyle='rgb(224,128,128)';
					var coordX = relLeft+x;
					var coordY = relTop+y;
					can[3].fillText(coordX+","+coordY,(x*tileSize)+(tileSize/2),(y*tileSize)+(tileSize/2))
				} else if (coords) {
					if (x%4==0 && y%4==0) {
						can[3].strokeStyle = 'rgba(255,255,255,0.5)';
						can[3].strokeRect(x*tileSize,y*tileSize,tileSize,tileSize);
						can[3].font = "normal 12px Arial";
						can[3].textAlign = "center";
						can[3].textBaseline = "middle";
						can[3].fillStyle='rgba(255,64,64,.3)';
						var coordX = relLeft+x;
						var coordY = relTop+y;
						can[3].fillText(coordX+","+coordY,(x*tileSize)+(tileSize/2),(y*tileSize)+(tileSize/2))
					} else {
						can[3].strokeStyle = 'rgba(255,255,255,0.1)';
						can[3].strokeRect(x*tileSize,y*tileSize,tileSize,tileSize);
					}
				}
			}
		}
	}
}

function generateMap(width, height, rooms, rMin, rMax) {
	//generate full size blank map
	for (var y=0; y<height; y++) {
		map.push([]);
		for (var x=0; x<width; x++) {
			map[y][x] = 0;
		}
	}
	//add rooms
	var checked = false;
	for (var r=0; r<rooms; r++) {
		while (checked==false) {
			generateRoom(width, height, rMin, rMax);
			checked = checkRoom();
		}
		
		//add to roomList
		roomList[roomList.length] = [roomY, roomX, roomHeight, roomWidth],[];
		
		//put room in map		
		for (var ry=0; ry<roomHeight+wallHeight+1; ry++) {
			for (var rx=0; rx<roomWidth+2; rx++) {
				if (ry==0) {
					//nopass tile
					map[roomY-wallHeight+ry][roomX-1+rx] = noPassT[0];
				} else if (ry>0 && ry<wallHeight) {
					if (rx==0 || rx==roomWidth+1) {
						//nopass tile
						map[roomY-wallHeight+ry][roomX-1+rx] = noPassT[0];
					} else {
						//wall tile
						map[roomY-wallHeight+ry][roomX-1+rx] = noPassT[1];
					}
				} else if (ry==roomHeight+wallHeight) {
					//nopass tile
					map[roomY-wallHeight+ry][roomX-1+rx] = noPassT[0];
				} else {
					if (rx==0 || rx==roomWidth+1) {
						//nopass tile
						map[roomY-wallHeight+ry][roomX-1+rx] = noPassT[0];
					} else {
						//floor tile
						map[roomY-wallHeight+ry][roomX-1+rx] = floorT[0];
					}
				}
			}
		}
		checked = false;
	}
	//add halls
	var extraHalls = Math.floor(Math.random()*(Math.floor((rooms/3)*2)));
	generateHalls(rooms+extraHalls,hallMin,hallMax);
}

//rooms =========================================================================================
function generateRoom(mapWidth, mapHeight, roomMin, roomMax) {
	roomWidth = Math.floor((Math.random()*(roomMax-roomMin))+roomMin);
	roomHeight = Math.floor((Math.random()*(roomMax-roomMin))+roomMin);
	roomY = Math.floor(Math.random()*mapHeight);
	roomX = Math.floor(Math.random()*mapWidth);
}

function checkRoom() {
	var isGood = true;
	if (roomY-wallHeight>0 && roomY+roomHeight<map.length && roomX-1>0 && roomX+roomWidth<map[0].length) {
		for (var y=0; y<roomHeight+wallHeight+1; y++) {
			for (var x=0; x<roomWidth+2; x++) {
				if (map[roomY-wallHeight+y][roomX-1+x]!=0) {
					isGood = false;
				}
			}
		}
	} else {
		isGood = false;
	}
	return isGood;
}

//halls =========================================================================================
function generateHalls(halls,min,max) {
	for(var h=0; h<halls; h++) {
		var hallW = Math.floor((Math.random()*(max-min))+min);
		//first do one for each room (exclude last room)
		if (h<roomList.length-1) {
			//roomList[[y,x,h,w]]
			var currY = roomList[h][0]+Math.floor(roomList[h][2]/2);
			var currX = roomList[h][1]+Math.floor(roomList[h][3]/2);
			var nextY = roomList[h+1][0]+Math.floor(roomList[h+1][2]/2);
			var nextX = roomList[h+1][1]+Math.floor(roomList[h+1][3]/2);
		//then do random extra halls
		} else {
		
		}
	}
}