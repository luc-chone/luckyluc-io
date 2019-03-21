import { startGame, P5Instance } from '../utils';
import { on } from 'mvdom';

// take the full screen width and height
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;


const groundHeight = 50;
const groundY = screenHeight - groundHeight;

const playerSize = 25;

let playerDirX = 0; // 1 is to the right, and -1 is to the left, 0 do not move
let playerDirY = 0; // 1 goes up, -1 goes down
const jumpMax = 50;
const jumpMaxY = screenHeight - groundHeight - playerSize - jumpMax;
const jumpSpeed = 2;

class Player {
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

const player = new Player();

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

// --------- Game Start --------- //
startGame(setup, draw);

/** Called once to setup the game values and information */
function setup(p: P5Instance) {
	p.createCanvas(screenWidth, screenHeight);
}

/** MAIN Draw function, called every frame and will redraw the whole screen */
function draw(p: P5Instance) {
	// reset the background
	p.background(90, 200, 255);

	// draw ground
	p.noStroke();
	p.fill(10, 210, 7);
	p.rect(0, screenHeight - groundHeight, screenWidth, groundHeight);


	player.draw(p);

}
// --------- /Game Start --------- //≤˜µ