
import { Entity } from './Entity.js'
import { Mesh, Scene, Vector3 } from 'babylonjs';

export class PlayerController {
	private _entity: Entity;
	private _mesh: Mesh;
	private _scene: Scene;
	private _beforeRender: () => void;
	private _speed = 10;
	private _rotationSpeed = 100;

	private _moves = {
		forward: false,
		backward: false,
		left: false,
		right: false
	}

	private _rotates = {
		left: false,
		right: false,
		up: false,
		down: false
	}

	constructor(entity: Entity, scene: Scene) {
		this._entity = entity;
		this._mesh = entity.mainMesh;
		this._scene = scene;

		window.addEventListener("keydown", (e) => { return this.onKeyDown(e) }, false);
		window.addEventListener("keyup", (e) => { return this.onKeyUp(e) }, false);

		this._beforeRender = () => {
			let dt: number = this._scene.getEngine().getDeltaTime() / 1000;

			if (this.hasAnyMoves()) {
				this.performMove(dt);
			}
			if (this.hasAnyRotates()) {
				this.performRotate(dt)
			}
		}

		scene.registerBeforeRender(this._beforeRender);
	}

	private performMove(dt: number) {
		let moveVector: Vector3 | undefined;

		if (this._moves.forward) {
			moveVector = this._mesh.calcMovePOV(0, 0, dt * this._speed);
		} else if (this._moves.backward) {
			moveVector = this._mesh.calcMovePOV(0, 0, -1 * dt * this._speed);
		} else if (this._moves.left) {
			moveVector = this._mesh.calcMovePOV(-1 * dt * this._speed, 0, 0);
		} else if (this._moves.right) {
			moveVector = this._mesh.calcMovePOV(dt * this._speed, 0, 0);
		}

		if (moveVector) {
			this._mesh.moveWithCollisions(moveVector);
		}
	}

	private performRotate(dt: number) {
		let moveVector: Vector3 | undefined;
		const oneDegree = Math.PI / 180;

		if (this._rotates.left) {
			this._mesh.rotation.y = -1 * this._rotationSpeed * oneDegree * dt;
		} else if (this._rotates.right) {
			this._mesh.rotation.y = this._rotationSpeed * oneDegree * dt;
		}
	}



	private hasAnyMoves() {
		return (this._moves.backward || this._moves.forward || this._moves.left || this._moves.right);
	}

	private hasAnyRotates() {
		return (this._rotates.left || this._rotates.right);
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

		// This is for the moves
		if (event.key === 'w') {
			this._moves.forward = shouldMove;
		} else if (event.key === 's') {
			this._moves.backward = shouldMove;
		} else if (event.key === 'q') {
			this._moves.left = shouldMove;
		} else if (event.key === 'e') {
			this._moves.right = shouldMove;
		}
		// for the rotates
		else if (event.key === 'a') {
			this._rotates.left = shouldMove;
		} else if (event.key === 'd') {
			this._rotates.right = shouldMove;
		}
	}
}