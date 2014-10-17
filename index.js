var CheckerBoardTexture = require('threejs-texture-checkerboard');

function CheckerRoom(width, depth, height) {
	width = width || 10;
	depth = depth || 10;
	height = height || 10;
	THREE.Object3D.call(this);
	var floor = new THREE.Mesh(
		new THREE.PlaneGeometry(width, depth, 1, 1, 1),
		new THREE.MeshPhongMaterial({
			map: new CheckerBoardTexture(0x7f7f7f, 0xffffff, width, depth)
		})
	)
	this.add(floor);
	floor.rotation.x = -Math.PI * .5;
	var colors = [
		[0xff7f7f, 0x7f0000],
		[0x7fff7f, 0x007f00],
		[0xffff7f, 0x7f7f00],
		[0x7f7fff, 0x00007f]
	]
	var totalWalls = 4;
	for (var i = totalWalls - 1; i >= 0; i--) {
		var wallLength = ((i % 2) == 0) ? width : depth;
		var wallDistance = wallLength == depth ? width : depth;
		var ratio = i / totalWalls;
		var angle = ratio * Math.PI * 2;
		var wall = new THREE.Mesh(
			new THREE.PlaneGeometry(wallLength, height, 1, 1),
			new THREE.MeshPhongMaterial({
				map: new CheckerBoardTexture(colors[i][0], colors[i][1], wallLength, height)
			})
		)
		this.add(wall);
		wall.position.y = height * .5;
		wall.position.x = Math.sin(angle) * wallDistance * .5;
		wall.position.z = Math.cos(angle) * wallDistance * .5;
		wall.rotation.y = angle + Math.PI;
	};
}

CheckerRoom.prototype = Object.create(THREE.Object3D.prototype);

module.exports = CheckerRoom;