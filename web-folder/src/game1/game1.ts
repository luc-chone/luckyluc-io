import { startGame, P5Instance } from '../utils';
import { on } from 'mvdom';


const w = Math.round(window.innerWidth / 10) * 10 - 20;
const h = Math.round(window.innerHeight / 10) * 10 - 20;

const groundHeight = 32;
const jumpHeight = 64;
const jumpSpeed = 5;

let scl = 30;

const groundY = h - groundHeight - scl;
const topY = h - groundHeight - jumpHeight - scl;

class Player {
	x = 50;
	y = h - groundHeight - scl;
	jumping = 0; // 0: no jump, 1: jump up, 2: jump coming down;

	constructor() {
		on(document, 'keydown', (evt) => {
			const kevt = <unknown>evt as KeyboardEvent;
			console.log("" + evt.code);
			if (kevt.key === 'a') {
				this.x = (this.x > scl) ? this.x - scl : 0;
			} else if (evt.key === 'd') {
				this.x = (this.x < (w - 2 * scl)) ? this.x + scl : w - scl;
			} else if (evt.key === 'w' || evt.key === 'Space') {
				this.jump();
				// this.y = (this.y > 0) ? this.y - scl : 0;
			} else if (evt.key === 's') {
				// this.y = (this.y < (h - 2 * scl)) ? this.y + scl : h - scl;
			}
		});
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
		p.rect(this.x, this.y, scl, scl);
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



