import { router } from 'cmdrouter';
import { spawn } from 'p-spawn';

router({ _default, watch }).route();

async function _default() {
	console.log(`default`);
}


async function watch() {
	spawn('tsc', ['-w', '-p', 'web/']);
	await spawn('./node_modules/.bin/ts-node', ['server/src/start.ts']);
}