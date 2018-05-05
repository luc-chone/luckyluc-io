
import { Game } from './Game.js';

window.addEventListener('DOMContentLoaded', function () {
	// Create the game using the 'renderCanvas'.
	let game = new Game('renderCanvas', document.getElementById('fpsElem'));

	// Create the scene.
	game.createScene();

	// Start render loop.
	game.doRender();

	// document.addEventListener('keydown', function (evt) {
	// 	if (evt.repeat) {
	// 		return;
	// 	}

	// 	if (evt.key === 'w') {
	// 		game.moveChickenZ(1);
	// 	} else if (evt.key === 's') {
	// 		game.moveChickenZ(-1);
	// 	} else if (evt.key === 'e') {
	// 		game.moveChickenX(1);
	// 	} else if (evt.key === 'q') {
	// 		game.moveChickenX(-1);
	// 	} else if (evt.key === 'd') {
	// 		game.rotateChickenY(1);
	// 	} else if (evt.key === 'a') {
	// 		game.rotateChickenY(-1);
	// 	}
	// });

	// document.addEventListener('keyup', function (evt) {
	// 	if (evt.key === 'w') {
	// 		game.moveChickenZ(0);
	// 	} else if (evt.key === 's') {
	// 		game.moveChickenZ(0);
	// 	} else if (evt.key === 'q') {
	// 		game.moveChickenX(0);
	// 	} else if (evt.key === 'e') {
	// 		game.moveChickenX(0);
	// 	} else if (evt.key === 'a') {
	// 		game.rotateChickenY(0);
	// 	} else if (evt.key === 'd') {
	// 		game.rotateChickenY(0);
	// 	}
	// });
});
