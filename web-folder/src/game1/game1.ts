import { P5Instance, startGame } from '../utils';
import { Block } from './block';
import { Scene } from './scene';
import { groundHeight, screenHeight, screenWidth, groundY } from './config';
import { Player } from './player';

const scene = new Scene({ groundY: groundY });

const player = new Player(scene);

const block1 = new Block({ x: 100, y: groundY - 20, width: 20, height: 20 });
const block2 = new Block({ x: 200, y: groundY - 20, width: 20, height: 20 });
scene.addBlock(block1);
scene.addBlock(block2);

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

	// draw the blocks
	for (const block of scene.getBlocks()) {
		block.draw(p);
	}

	// draw the player
	player.draw(p);


}
// --------- /Game Start --------- //≤˜µ