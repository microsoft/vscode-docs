const gulp = require('gulp')
const $ = require('shelljs')

const GITHUB_TOKEN = process.env['GITHUB_TOKEN']
const BRANCH = process.env['BUILD_SOURCEBRANCHNAME']

// For testing purposes, we'll create a default task that doesn't require GITHUB_TOKEN
gulp.task('default', (done) => {
  $.echo('VS Code Docs - Gulp 5.0 is ready!')
  $.echo('Available tasks: build-dist')
  $.echo('Note: build-dist requires GITHUB_TOKEN environment variable')
  done()
})

if (!GITHUB_TOKEN) {
  $.echo('Warning: GITHUB_TOKEN not found. Some tasks will not work without it.')
  // Don't exit here - let other tasks be available
} else {
  $.echo('GITHUB_TOKEN found - all tasks available')
}

const URL = `https://${GITHUB_TOKEN}@github.com/microsoft/vscode-website`

/**
 * This task
 * - Clones vscode-website
 * - Clones vscode-website-dist
 * - Uses vscode-docs:[current-branch] + vscode-website:release/prod to build to vscode-website-dist:[current-branch]
 */
gulp.task('build-dist', (done) => {
  if (!GITHUB_TOKEN) {
    $.echo('Error: GITHUB_TOKEN environment variable is required for build-dist task')
    return done(new Error('GITHUB_TOKEN required'))
  }

  if (!$.which('git')) {
    $.echo('This command requires git')
    $.exit(1)
  }

  // Go to _build
  if (!$.test('-e', '_build')) {
    $.mkdir('_build')
  }
  $.cd('_build')

  // Clone release/prod branch of vscode-website
  // If it exists, upgrade to latest
  if (!$.test('-e', 'vscode-website')) {
    $.exec(`git clone --depth=1 --branch=release/prod ${URL}`)
  } else {
    $.cd('vscode-website')
    $.exec('git pull origin release/prod')
    $.cd('..')
  }

  // Copy over MD/asset files
  $.mkdir('vscode-website/vscode-docs')
  $.cp('-R', ['../blogs', '../docs', '../images', '../release-notes', '../remote-release-notes', '../learn', '../build', '../api'], 'vscode-website/vscode-docs')

  // Go to vscode-website
  $.cd('vscode-website')
  // Run setup to fetch vscode-website-dist
  $.echo('BRANCH is ' + BRANCH)
  const setup = $.exec(`scripts/setup.sh ${GITHUB_TOKEN} ${BRANCH}`)
  if (setup.code !== 0) {
    console.log('Failed to setup')
    done(setup.stderr)
  }
  // Run build to sync changes to vscode-website-dist
  const build = $.exec(`scripts/build.sh ${BRANCH}`)
  if (build.code !== 0) {
    console.log('Failed to build')
    done(build.stderr)
  }

  done()
})
