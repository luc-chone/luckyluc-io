import { P5Instance } from 'utils';

type Data = {
	x: number;
}

export class Block {

	x: number;

	constructor(data: Data) {
		this.x = data.x;
	}

	draw(p: P5Instance) {
		p.fill(150, 150, 150);
		//p.rect(this.x, this.y, this.width, this.height);
	}
}