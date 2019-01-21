import { startGame, P5Instance } from '../utils';
import { on } from 'mvdom';

// take the full screen width and height
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;


const groundHeight = 50;
const groundY = screenHeight - groundHeight;

const playerSize = 25;

class Player {
	x = 50;
	y = groundY - playerSize;

	draw(p: P5Instance) {
		// draw player
		p.fill(57, 100, 243);
		p.rect(this.x, this.y, playerSize, playerSize);
	}
}

const player = new Player();

// --cons------- Game Start --------- //
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