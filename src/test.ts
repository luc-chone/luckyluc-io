
import { Game } from './Game.js';

window.addEventListener('DOMContentLoaded', function () {
	// Create the game using the 'renderCanvas'.
	let game = new Game('renderCanvas');

	// Create the scene.
	game.createScene();

	// Start render loop.
	game.doRender();

	document.addEventListener('keydown', function (evt) {
		if (evt.repeat) {
			return;
		}

		if (evt.key === 'w') {
			game.moveSphereZ(1);
		} else if (evt.key === 's') {
			game.moveSphereZ(-1);
		}
	});

	document.addEventListener('keyup', function (evt) {
		if (evt.key === 'w') {
			game.moveSphereZ(0);
		} else if (evt.key === 's') {
			game.moveSphereZ(0);
		}
	});
});
