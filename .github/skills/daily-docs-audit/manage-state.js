//@ts-check
'use strict';

const state = require('../../../build/audit-state');

if (require.main === module) {
	try {
		state.main(process.argv.slice(2), process.env, process.cwd());
	} catch (error) {
		process.stderr.write(`${error.message}\n`);
		process.exitCode = 1;
	}
}

module.exports = state;
