const $ = require('shelljs')

const { code, stdout } = $.exec('git lfs --version', { silent: true })

if (code === 0 && stdout.startsWith('git-lfs')) {
  process.exit(0)
} else {
  console.log('Please install Git LFS https://github.com/microsoft/vscode-docs#cloning for commiting {gif,mp4,jpg,png} files.')
  process.exit(1)
}