import { startGame, P5Instance } from '../utils';
import { on } from 'mvdom';


const w = Math.round(window.innerWidth / 10) * 10 - 20;
const h = Math.round(window.innerHeight / 10) * 10 - 20;

const groundHeight = 32;
const jumpHeight = 96;
const jumpSpeed = 5;

const boxSize = 30;

const moveSpeed = 4;

const groundY = h - groundHeight - boxSize;
const topY = h - groundHeight - jumpHeight - boxSize;

let dirX = 0;

class Player {
	x = 50;
	y = h - groundHeight - boxSize;
	jumping = 0; // 0: no jump, 1: jump up, 2: jump coming down;

	constructor() {
		on(document, 'keydown', (evt) => {
			const kevt = <unknown>evt as KeyboardEvent;
			if (kevt.key === 'a') {
				dirX = -1;
			} else if (evt.key === 'd') {
				dirX = 1;
			} else if (evt.key === 'w' || evt.key === 'Space') {
				this.jump();
				// this.y = (this.y > 0) ? this.y - scl : 0;
			} else if (evt.key === 's') {
				// this.y = (this.y < (h - 2 * scl)) ? this.y + scl : h - scl;
			}
		});

		on(document, 'keyup', (evt) => {
			const kevt = <unknown>evt as KeyboardEvent;
			if (kevt.key === 'a' || kevt.key === 'd') {
				dirX = 0;
			}
		})
	}

	jump() {
		if (this.jumping === 0) {
			this.jumping = 1;
		}
	}

	draw(p: P5Instance) {
		p.fill(255, 0, 0);
		p.stroke(0, 0, 0, 0);
		// compute x if jumping 

		//#region    ---------- Jump Logic ---------- 
		if (this.jumping === 1) {
			if (topY < this.y - 1 * jumpSpeed) {
				this.y = this.y - 1 * jumpSpeed;
			} else {
				this.jumping = 2;
			}
		}
		if (this.jumping === 2) {
			if (groundY > this.y + 1 * jumpSpeed) {
				this.y = this.y + 1 * jumpSpeed;
			} else {
				this.y = groundY;
				this.jumping = 0;
			}
		}
		//#endregion ---------- /Jump Logic ---------- 

		// move logic
		this.x = this.x + dirX * moveSpeed;

		// drawing
		p.rect(this.x, this.y, boxSize, boxSize);
	}
}

const player = new Player();

startGame(setup, draw);

function setup(p5: P5Instance) {
	p5.createCanvas(w, h);
	p5.frameRate(60);
}

function draw(p5: P5Instance) {
	// reset the background
	p5.background(90, 200, 255);

	// draw the ground
	p5.fill(0, 255, 0);
	p5.rect(0, h - groundHeight, w, groundHeight);

	// make sure 
	player.draw(p5);

}



