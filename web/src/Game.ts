import { Animatable } from 'babylonjs';
import { Chicken } from './Chicken.js';
import { PlayerController } from './PlayerController.js';


export class Game {
	private _canvas: HTMLCanvasElement;
	private _engine: BABYLON.Engine;
	private _scene?: BABYLON.Scene;
	private _camera?: BABYLON.FreeCamera;
	private _light?: BABYLON.Light;
	private _chicken?: Chicken;
	private _sphereAnim?: BABYLON.Animatable;
	private _fpsElem?: HTMLElement;

	constructor(canvasElement: string, fpsElem?: HTMLElement | null) {
		// Create canvas and engine.
		this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
		this._engine = new BABYLON.Engine(this._canvas, true);
		this._fpsElem = (fpsElem) ? fpsElem : undefined;
	}

	createScene(): void {

		// Create a basic BJS Scene object.
		this._scene = new BABYLON.Scene(this._engine);
		this._scene.ambientColor = new BABYLON.Color3(1, 1, 1);

		//this._scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
		this._scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), new BABYLON.CannonJSPlugin());

		// Create a FreeCamera, and set its position to (x:0, y:5, z:-10).
		this._camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 20, -25), this._scene);

		// Target the camera to scene origin.
		this._camera.setTarget(BABYLON.Vector3.Zero());

		// Attach the camera to the canvas.
		this._camera.attachControl(this._canvas, false);

		// Create a basic light, aiming 0,1,0 - meaning, to the sky.
		this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this._scene);


		// Create a built-in "ground" shape
		let ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 40, height: 40, subdivisions: 2 }, this._scene);
		var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", this._scene);
		groundMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.7);
		ground.material = groundMaterial;
		const imp = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor,
			{ mass: 0, restitution: 0.9 }, this._scene);

		// create box
		const box = BABYLON.Mesh.CreateBox("box", 3.0, this._scene);
		new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor,
			{ mass: 0, restitution: 0.9 }, this._scene);

		// create box
		let box1 = BABYLON.MeshBuilder.CreateBox('box1', { width: 10, height: 3, depth: 5, }, this._scene);
		new BABYLON.PhysicsImpostor(box1, BABYLON.PhysicsImpostor.BoxImpostor,
			{ mass: 0, restitution: 0.9 }, this._scene);
		box1.setAbsolutePosition(new BABYLON.Vector3(0, 5, 20));

		// Create the chicken player
		this._chicken = new Chicken(this._scene, 0, 10, 0);
		// Assign the PlayerController to the chicken
		const pc = new PlayerController(this._chicken, this._scene);


		//this._bodyImposter.applyImpulse(new BABYLON.Vector3(0, 10, 0), this._body.getAbsolutePosition());
		////// Test bullet

		// Create & position Bullet
		const bullet = BABYLON.MeshBuilder.CreateSphere("bullet", { diameterX: 1, diameterY: 1, diameterZ: 1 }, this._scene);
		bullet.setAbsolutePosition(new BABYLON.Vector3(5, 10, 0));
		// add imposter
		const bulletImpostor = new BABYLON.PhysicsImpostor(bullet, BABYLON.PhysicsImpostor.SphereImpostor,
			{ mass: 0.1, restitution: 0.9 }, this._scene);
		// impulse
		bulletImpostor.applyImpulse(new BABYLON.Vector3(-1, 0, 0), bullet.getAbsolutePosition());
	}

	doRender(): void {
		// Run the render loop.
		this._engine.runRenderLoop(() => {
			this._scene!.render();
			if (this._fpsElem) {
				const fps = Math.round(this._engine.getFps());
				this._fpsElem.textContent = `${fps}FPS`;
			}
		});

		// The canvas/window resize event handler.
		window.addEventListener('resize', () => {
			this._engine.resize();
		});
	}

	/**
	 * Move the sphere on z axis
	 * @param direction 1 goes far, -1 goes close, 0 stop the animation
	 */
	moveChickenZ(direction: number): void {
		this._chicken!.moveZ(direction);
	}

	/**
	 * Move the sphere on z axis
	 * @param direction 1 goes far, -1 goes close, 0 stop the animation
	 */
	moveChickenX(direction: number): void {
		this._chicken!.moveX(direction);
	}

	rotateChickenY(direction: number): void {
		this._chicken!.rotateY(direction);
	}

}


