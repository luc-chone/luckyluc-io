import { Block } from './block';



export class Scene {
	private groundY: any;
	private blocks: Block[] = [];

	constructor(options: { groundY: number }) {
		this.groundY = options.groundY;
	}

	getBlocks() {
		return this.blocks;
	}

	addBlock(block: Block) {
		this.blocks.push(block);
	}

	canMove(obj: { x: number, width: number }) {
		for (const block of this.blocks) {
			const objLeft = obj.x;
			const objRight = obj.x + obj.width;
			const blockLeft = block.x;
			const blockRight = block.x + block.width;
		}
		return true;
	}

}