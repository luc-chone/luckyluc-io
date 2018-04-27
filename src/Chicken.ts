import { Scene, Vector3, Mesh, Animatable } from 'babylonjs';

export class Chicken {
	private _scene: Scene;
	private _body: Mesh;
	private _bodyAnim?: Animatable;

	constructor(scene: Scene) {
		this._scene = scene;

		// create body
		this._body = BABYLON.MeshBuilder.CreateSphere('sphere', { segments: 16, diameter: 2 }, this._scene);
		const head = BABYLON.MeshBuilder.CreateSphere('sphere', { segments: 16, diameter: 1 }, this._scene);
		head.setAbsolutePosition(new BABYLON.Vector3(0, 1, 1));
		head.parent = this._body;
		const sphereMaterial = new BABYLON.StandardMaterial("sphereMaterial", this._scene);
		// sphereMaterial.alpha = 0.9;
		// sphereMaterial.diffuseColor = new BABYLON.Color3(2, 1, 1);
		// sphereMaterial.specularColor = new BABYLON.Color3(0.1, 0.8, 0.87);
		sphereMaterial.emissiveColor = new BABYLON.Color3(.1, 0, 1);
		// sphereMaterial.ambientColor = new BABYLON.Color3(0.9, 0.1, 0);
		this._body.material = sphereMaterial;
		head.material = sphereMaterial;
	}

	position(x: number, y: number, z: number) {
		const vectorPosition = new BABYLON.Vector3(x, y, z);
		this._body.setAbsolutePosition(vectorPosition);
	}

	moveZ(direction: number) {
		this.move('position.z', this._body.position.z, direction);
	}

	moveX(direction: number) {
		this.move('position.x', this._body.position.x, direction);
	}

	private move(propertyName: string, position: number, direction: number) {
		const scene = this._scene!;
		const body: BABYLON.Mesh = this._body;

		if (direction === 0 && this._bodyAnim) {
			this._bodyAnim.stop();
		} else {
			const animation = new BABYLON.Animation("chickenAnimation", propertyName, 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
			const keyframes = [{ frame: 0, value: position }, { frame: 30, value: 10 * direction }];
			animation.setKeys(keyframes);
			this._body.animations = [animation];

			this._bodyAnim = scene.beginAnimation(this._body, 0, 90, true);
		}
	}
}