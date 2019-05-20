import { startGame, P5Instance } from '../utils';
import { on } from 'mvdom';
import { screenWidth, screenHeight, groundHeight } from './config';
import { Player } from './player';


const player = new Player();


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