//@ts-check
'use strict';

const { spawnSync } = require('child_process');

function hasGitLfs() {
	const result = spawnSync('git', ['lfs', 'version'], { encoding: 'utf8' });
	return result.status === 0 && result.stdout.startsWith('git-lfs');
}

if (require.main === module && !hasGitLfs()) {
	console.error('Please install Git LFS for committing {gif,mp4,jpg,png} files. See https://github.com/microsoft/vscode-docs#cloning for instructions.');
	process.exit(1);
}

module.exports = { hasGitLfs };
