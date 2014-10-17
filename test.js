var onReady = function() {
	var View = require('threejs-managed-view').View,
		CheckerRoom = require('./');

	var view = new View({
		stats: true
	});

	//dolly
	var dolly = new THREE.Object3D();
	view.scene.add(dolly);
	// view.camera.position.z = 10;
	dolly.add(view.camera);

	//lights
	var light = new THREE.PointLight(0xffffff, .5);
	light.position.x = 5;
	light.position.y = 30;
	view.scene.add(light);
	var hemisphereLight = new THREE.HemisphereLight(0x7f6f5f, 0x7f0000);
	view.scene.add(hemisphereLight);

	var checkerRoom = new CheckerRoom(6, 10, 3);
	view.scene.add(checkerRoom);

	view.renderManager.onEnterFrame.add(function() {
		dolly.rotation.y += .005;
	})

}

var loadAndRunScripts = require('loadandrunscripts');
loadAndRunScripts(
	[
		'bower_components/three.js/three.js',
		'lib/stats.min.js',
		'lib/threex.rendererstats.js',
	],
	onReady
);
