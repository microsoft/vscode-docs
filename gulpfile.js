const gulp = require('gulp')
const $ = require('shelljs')

const GITHUB_TOKEN = process.env['GITHUB_TOKEN']
const BRANCH = process.env['BUILD_SOURCEBRANCHNAME']

if (!GITHUB_TOKEN) {
  $.echo('This script clones vscode-website and requires access token')
  $.exit(1)
}

const URL = `https://${GITHUB_TOKEN}@github.com/microsoft/vscode-website`
const TAS_URL = `https://${GITHUB_TOKEN}@github.com/microsoft/TryAppServiceClient`

/**
 * This task
 * - Clones vscode-website
 * - Clones vscode-website-dist
 * - Uses vscode-docs:ext-docs + vscode-website:extensibility to build to vscode-website-dist:ext-docs
 */
gulp.task('build-dist', done => {
  if (!$.which('git')) {
    $.echo('This command requires git')
    $.exit(1)
    done()
  }

  // Go to _build
  if (!$.test('-e', '_build')) {
    $.mkdir('_build')
  }
  $.cd('_build')

  // Clone extensibility branch of vscode-website
  // If it exists, upgrade to latest
  if (!$.test('-e', 'vscode-website')) {
    $.exec(`git clone --depth=1 --branch=extensibility ${URL}`)
  } else {
    $.cd('vscode-website')
    $.exec('git pull origin extensibility')
    $.cd('..')
  }

  // Copy over MD/asset files
  $.mkdir('vscode-website/vscode-docs')
  $.cp('-R', ['../blogs', '../docs', '../images', '../release-notes', '../tutorials', '../build'], 'vscode-website/vscode-docs')

  // Clone tas-client
  $.exec(`git clone ${TAS_URL} vscode-website/tas-client`)
  $.cd('vscode-website/tas-client')
  $.exec('git checkout tags/v0.1-alpha')
  $.cd('../..')

  // Go to vscode-website
  $.cd('vscode-website')
  // Run setup to fetch vscode-website-dist
  $.echo('BRANCH is ' + BRANCH)
  $.exec(`scripts/setup.sh ${GITHUB_TOKEN} ${BRANCH}`)
  // Run build to sync changes to vscode-website-dist
  $.exec(`scripts/build.sh ${BRANCH}`)
})
