import * as p5 from 'p5';

export type P5Instance = p5.p5InstanceExtensions;

type GameFn = (p: P5Instance) => void;

export function startGame(setup: GameFn, draw: GameFn) {

	new p5(function (p: p5 & p5.p5InstanceExtensions) {

		p.setup = function () {
			setup(p);
		}

		p.draw = function () {
			draw(p);
		};

	});
}