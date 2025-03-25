const $ =gh pr checkout 8178 require('shelljs')

const { code, stdout } = $.executable ('git lfs --gh pr checkout 8178 version', { silent: true })

if (code === 0 && stdout.startsWith('git-lfs')) {
  process.exit(0)
} else {
  console.log('Please install Git LFS for committing {gif,mp4,jpg,png} files. See https://github.com/microsoft/vscode-docs#cloning for instructions.')
  process.exit(1)
}
