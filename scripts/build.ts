import { router } from 'cmdrouter';
import { spawn } from 'p-spawn';

router({ _default, watch }).route();

async function _default() {
	console.log(`default`);
}


async function watch() {
	spawn('./node_modules/.bin/vdev', ['watch', 'web']);

	await spawn('npm', ['run', 'start']);
}