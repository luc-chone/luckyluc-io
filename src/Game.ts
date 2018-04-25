import { Animatable } from "babylonjs";

export class Game {
	private _canvas: HTMLCanvasElement;
	private _engine: BABYLON.Engine;
	private _scene?: BABYLON.Scene;
	private _camera?: BABYLON.FreeCamera;
	private _light?: BABYLON.Light;
	private _sphere?: BABYLON.Mesh;
	private _sphereAnim?: BABYLON.Animatable;

	constructor(canvasElement: string) {
		// Create canvas and engine.
		this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
		this._engine = new BABYLON.Engine(this._canvas, true);
	}

	createScene(): void {
		// Create a basic BJS Scene object.
		this._scene = new BABYLON.Scene(this._engine);
		this._scene.ambientColor = new BABYLON.Color3(1, 1, 1);

		// Create a FreeCamera, and set its position to (x:0, y:5, z:-10).
		this._camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), this._scene);

		// Target the camera to scene origin.
		this._camera.setTarget(BABYLON.Vector3.Zero());

		// Attach the camera to the canvas.
		this._camera.attachControl(this._canvas);

		// Create a basic light, aiming 0,1,0 - meaning, to the sky.
		this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this._scene);

		// Create a built-in "sphere" shape; with 16 segments and diameter of 2.
		this._sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { segments: 16, diameter: 2 }, this._scene);

		this._sphere.setAbsolutePosition(new BABYLON.Vector3(0, 3, 0));
		var sphereMaterial = new BABYLON.StandardMaterial("sphereMaterial", this._scene);
		sphereMaterial.wireframe = true;
		this._sphere.material = sphereMaterial;

		// Create a built-in "ground" shape.
		let ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 20, height: 20, subdivisions: 2 }, this._scene);
		var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", this._scene);
		groundMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.7);
		ground.material = groundMaterial;
	}

	doRender(): void {
		// Run the render loop.
		this._engine.runRenderLoop(() => {
			this._scene!.render();
		});

		// The canvas/window resize event handler.
		window.addEventListener('resize', () => {
			this._engine.resize();
		});
	}

	/**
	 * 
	 * @param direction 1 goes far, -1 goes close, 0 stop the animation
	 */
	moveSphereZ(direction: number): void {
		const scene = this._scene!;
		const sphere: BABYLON.Mesh = this._sphere!;

		if (direction === 0 && this._sphereAnim) {
			this._sphereAnim.stop();
		} else {
			const animation = new BABYLON.Animation("myAnimation", "position.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
			const keyframes = [{ frame: 0, value: sphere.position.z }, { frame: 30, value: 10 * direction }]
			animation.setKeys(keyframes);
			sphere.animations = [animation];

			this._sphereAnim = scene.beginAnimation(sphere, 0, 90, true);
		}

	}
}