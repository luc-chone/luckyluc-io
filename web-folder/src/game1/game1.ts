import { P5Instance, startGame } from '../utils';
import { Block } from './block';
import { groundHeight, screenHeight, screenWidth, groundY } from './config';
import { Player } from './player';


const player = new Player();

const block = new Block({ x: 100 });

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
	block.draw(p);

}
// --------- /Game Start --------- //≤˜µ