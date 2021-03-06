import { screenHeight, groundHeight, groundY } from "./config";
import { P5Instance } from "utils";
import { on } from "mvdom";
import { Scene } from './scene';

const playerSize = 25;

let playerDirX = 0; // 1 is to the right, and -1 is to the left, 0 do not move
let playerDirY = 0; // 1 goes up, -1 goes down
const playerSpeed = 2;
const jumpMax = 50;
const jumpMaxY = screenHeight - groundHeight - playerSize - jumpMax;
const jumpSpeed = 2;

export class Player {
	x = 50;
	playerGroundY = groundY - playerSize
	y = this.playerGroundY;
	width = playerSize;
	height = playerSize;
	scene: Scene;

	constructor(scene: Scene) {
		this.scene = scene;
	}

	draw(p: P5Instance) {
		// draw player
		p.fill(57, 100, 243);

		//// calculate new x
		// TODO: canMoveX()
		const newX = this.x + (playerDirX * playerSpeed);
		if (this.scene.canMove({ x: newX, width: this.width })) {
			this.x = newX;
		}

		//// calculate new y (jump)
		const newY = this.y - (playerDirY * jumpSpeed);
		// up but below max, we change y
		if (playerDirY === 1 && newY > jumpMaxY) {
			this.y = newY;
		}
		// up but at max, then we change direction
		else if (playerDirY === 1 && newY <= jumpMaxY) {
			playerDirY = -1;
		}
		// down but beforejeieifwieieiejfieilslieijfjeijjfjfejjjejeje playerGroundY, then, we change y
		else if (playerDirY === -1 && newY < this.playerGroundY) {
			this.y = newY;
		}
		// // down but at playerGroundY, then we stop
		else if (playerDirY === -1 && newY >= this.playerGroundY) {
			playerDirY = 0;
		}


		p.rect(this.x, this.y, playerSize, playerSize);
	}
}

on(document, 'keydown', (evt) => {

	if (evt.key === 'a') {
		playerDirX = -1;
	} else if (evt.key === 'd') {
		playerDirX = 1;
	} else if (evt.key === 'w' || evt.key === ' ') {
		if (playerDirY === 0) {
			playerDirY = 1;
		}
	} else if (evt.key === 's') {
		// TODO: will force go down
	} else {
		playerDirX = 0;
	}
});

on(document, 'keyup', (evt) => {
	// when not key jump, we set play to not move
	if (evt.key !== 'w' || evt.key !== ' ') {
		playerDirX = 0;
	}
});