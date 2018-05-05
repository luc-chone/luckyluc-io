
import { Entity } from './Entity.js'
import { Mesh, Scene } from 'babylonjs';

export class PlayerController {
	private _entity: Entity;
	private _scene: Scene;
	private _beforeRender: () => void;

	private _moves = {
		forward: false,
		backward: false,
		left: false,
		right: false
	}

	private _rotate = {
		left: false,
		right: false,
		up: false,
		down: false
	}

	constructor(entity: Entity, scene: Scene) {
		this._entity = entity;
		this._scene = scene;

		window.addEventListener("keydown", (e) => { return this.onKeyDown(e) }, false);
		window.addEventListener("keyup", (e) => { return this.onKeyUp(e) }, false);

		this._beforeRender = () => {
			if (this.hasAnyMoves()) {
				this.performMove();
			}
		}

		scene.registerBeforeRender(this._beforeRender);
	}

	private performMove() {
		console.log(`will perform move`, this._moves);
	}

	private hasAnyMoves() {
		return (this._moves.backward || this._moves.forward || this._moves.left || this._moves.right);
	}

	private onKeyDown(e: Event) {
		var event: KeyboardEvent = <KeyboardEvent>e;
		this.onKey(event, true);
	}

	private onKeyUp(e: Event) {
		var event: KeyboardEvent = <KeyboardEvent>e;
		this.onKey(event, false);
	}

	private onKey(event: KeyboardEvent, shouldMove: boolean) {
		if (event.key === 'w') {
			this._moves.forward = shouldMove;
		} else if (event.key === 's') {
			this._moves.backward = shouldMove;
		} else if (event.key === 'q') {
			this._moves.left = shouldMove;
		} else if (event.key === 'e') {
			this._moves.right = shouldMove;
		}
	}
}