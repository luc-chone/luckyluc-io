import { P5Instance } from 'utils';

type Data = {
	x: number;
	y: number;
	width: number;
	height: number;
}

export class Block {

	x: number;
	y: number;
	height: number;
	width: number;


	constructor(data: Data) {
		this.x = data.x;
		this.y = data.y;
		this.width = data.width;
		this.height = data.height;
	}

	draw(p: P5Instance) {
		p.fill(153, 153, 153);
		p.rect(this.x, this.y, this.width, this.height);
	}
}