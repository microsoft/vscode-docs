/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

var gulp = require('gulp');
var git = require('gulp-git');
var fs = require('fs');
var runSequence = require('run-sequence');
var rimraf = require('rimraf');
var common = require('./scripts/gulpfile.common.js');
var imagemin = require('gulp-imagemin');

require('./scripts/gulpfile.docs.js');
require('./scripts/gulpfile.releasenotes.js');
require('./scripts/gulpfile.api.js');
require('./scripts/gulpfile.blog.js');
require('./scripts/gulpfile.tutorial.js');

var BRANCH = process.env["branch"] ? process.env["branch"] : "master";
var URL = process.env["token"] ? 'https://' + process.env["token"] + '@github.com/microsoft/vscode-website' : 'https://github.com/microsoft/vscode-website';

gulp.task('compile-all', ['compile-docs', 'compile-releasenotes', 'compile-blog', 'compile-tutorial']);

gulp.task('clean-out-folder', common.rimraf('out'));

gulp.task('clone-vscode-website', ['clean-out-folder'], function (cb) {
	fs.mkdir('out');
	process.chdir('./out');
	git.clone(URL, function (err) {
		if (err) {
			console.log('could not clone vscode-website')
			console.log(err);
			cb(err);
		} else {
			process.chdir('./vscode-website');
			git.checkout(BRANCH, function (error) {
				console.log('checked out branch:', BRANCH);
				process.chdir('../../');
				cb(error);
			});
		}
	});
});

gulp.task('commit', function () {
	process.chdir('./out/vscode-website');
	return gulp.src(['./*'], { buffer: false })
		.pipe(git.add())
		.pipe(git.commit('syncing with vscode-docs'))

});

gulp.task('push', function (cb) {
	git.push(URL, BRANCH, { args: "-f" }, function (error) {
		if (!error) {
			console.log('successfully pushed to branch:', BRANCH);
		}
		cb(error);
	});
});

gulp.task('build-website', function (cb) {
	runSequence('compile',
		'clone-vscode-website',
		'generate-api-doc',
		'compile-all');
});

gulp.task('publish-releasenotes', function (cb) {
	runSequence('checkout-master',
		'copy-releasenotes-raw-images',
		'compile-releasenotes-markdown',
		'compile-releasenotes-css'
	);
});

gulp.task('checkout-master', function (cb) {
	console.log('Checkout vscode-website master...');
	process.chdir('./out/vscode-website');
	git.checkout('master', function (error) {
		console.log('checked out branch: master');
		process.chdir('../../');
		cb(error);
	});
});

gulp.task('sync-master', ['commit'], function (cb) {
	git.push(URL, 'master', { args: "-f" }, function (error) {
		if (!error) {
			console.log('successfully pushed to branch: master');
		}
		cb(error);
	});
});

gulp.task('sync', function (cb) {
	runSequence('commit', 'push');
});

gulp.task('minify-images', function () {
	return gulp.src(['**/*.{png,jpg,svg}', '!node_modules/**'], { nocase: true })
		.pipe(imagemin())
		.pipe(gulp.dest('.'));
});