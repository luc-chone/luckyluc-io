import { Scene, Vector3, Mesh, Animatable, Material } from 'babylonjs';
import { Entity } from './Entity.js'

export class Chicken implements Entity {
	private _head: Mesh;
	private _scene: Scene;
	private _body: Mesh;
	private _bodyAnim?: Animatable;
	private _animByProperty: { [property: string]: BABYLON.Animation } = {};
	constructor(scene: Scene) {
		this._scene = scene;
		// create body
		// this._body = BABYLON.MeshBuilder.CreateSphere('sphere', { segments: 16, diameter: 2 }, this._scene);
		// const head = BABYLON.MeshBuilder.CreateSphere('sphere', { segments: 16, diameter: 1 }, this._scene);
		this._body = BABYLON.MeshBuilder.CreateBox('body', { width: 2, height: 2, depth: 3 }, this._scene);
		this._body.rotation = new BABYLON.Vector3(0, Math.PI, 0);
		this._head = BABYLON.MeshBuilder.CreateBox('head', { width: 1, height: 1, depth: 1 }, this._scene);


		this._head.setAbsolutePosition(new BABYLON.Vector3(0, 1, -3));
		this._head.parent = this._body;

		const mat = new BABYLON.StandardMaterial("mat", this._scene);
		// mat.alpha = 0.9;
		mat.diffuseColor = new BABYLON.Color3(155/255,88/255, 10/255);
		mat.specularColor = new BABYLON.Color3(1, 1, 1);
		mat.emissiveColor = new BABYLON.Color3(.1, .1, .1);
		// mat.ambientColor = new BABYLON.Color3(0.9, 0.1, 0);
		this._body.material = mat;

		const matHead = new BABYLON.StandardMaterial("matHead", this._scene);
		matHead.diffuseTexture = new BABYLON.Texture("images/texture-chicken.jpg", scene);
		this._head.material = matHead;
		
		const imp = new BABYLON.PhysicsImpostor(this._body, BABYLON.PhysicsImpostor.SphereImpostor,
			{ mass: 1, restitution: 0.9 }, this._scene);

	}

	// Entity implementation
	get mainMesh() {
		return this._body;
	}

	position(x: number, y: number, z: number) {
		const vectorPosition = new BABYLON.Vector3(x, y, z);
		this._body.setAbsolutePosition(vectorPosition);
	}

	moveZ(direction: number) {
		this.anim('position.z', this._body.position.z, direction);
	}

	moveX(direction: number) {

		this.anim('position.x', this._body.position.x, direction);
	}

	rotateY(direction: number) {
		const oneDegreeInPi = Math.PI / 180;
		this.anim('rotation.y', this._body.rotation.y, direction, oneDegreeInPi * 10);
	}

	private anim(propertyName: string, position: number, direction: number, multiplier = 10) {
		const scene = this._scene!;
		const body: BABYLON.Mesh = this._body;
		const animationName = `chickenAnimation-${propertyName}`;

		this._body.animations = this._body.animations || [];
		if (direction === 0) {
			this._scene.stopAnimation(this._body, animationName);
			this._body.animations = this._body.animations.filter((item) => item.name !== animationName);
		} else {
			const animation = new BABYLON.Animation(animationName, propertyName, 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
			const keyframes = [{ frame: 0, value: position }, { frame: 30, value: multiplier * direction }];
			animation.setKeys(keyframes);
			animation.enableBlending = true;
			this._body.animations.push(animation);

			this._bodyAnim = scene.beginAnimation(this._body, 0, 90, true);
		}
	}
}