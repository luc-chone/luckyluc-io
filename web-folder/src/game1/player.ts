import { screenHeight, groundHeight, groundY } from "./config";
import { P5Instance } from "utils";
import { on } from "mvdom";


const playerSize = 25;

let playerDirX = 0; // 1 is to the right, and -1 is to the left, 0 do not move
let playerDirY = 0; // 1 goes up, -1 goes down
const jumpMax = 50;
const jumpMaxY = screenHeight - groundHeight - playerSize - jumpMax;
const jumpSpeed = 2;

export class Player {
	x = 50;
	playerGroundY = groundY - playerSize
	y = this.playerGroundY;

	draw(p: P5Instance) {
		// draw player
		p.fill(57, 100, 243);

		// calculate x with playerDirX
		this.x = this.x + playerDirX;

		const newY = this.y - (playerDirY * jumpSpeed);

		// up but below max, we change y
		if (playerDirY === 1 && newY > jumpMaxY) {
			this.y = newY;
		}
		// up but at max, then we change direction
		else if (playerDirY === 1 && newY <= jumpMaxY) {
			playerDirY = -1;
		}
		// down but before playerGroundY, then, we change y
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
	console.log('', evt.key);
	if (evt.key === 'a') {
		playerDirX = -1;
	} else if (evt.key === 'd') {
		playerDirX = 1;
	} else if (evt.key === 'w' || evt.key === ' ') {
		// TODO: will do the jump
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
	if (evt.key !== 'w' || evt.key !== ' ') {

		playerDirX = 0;
	}
});