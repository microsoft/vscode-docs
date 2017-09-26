/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

var gulp = require('gulp');
var es = require('event-stream');
var markdownIt = require('markdown-it');
var frontMatter = require('gulp-front-matter');
var rename = require('gulp-rename');
var keybindings = require('./keybindings/doc.keybindings');
var File = require('vinyl');
var common = require('./gulpfile.common');

var RN_SRC_ROOT = 'release-notes';
var DEST_ROOT = 'out/vscode-website';
var RAW_ROOT = DEST_ROOT + '/server/views/raw';

var releaseNotes = [];

var sources = [
		RN_SRC_ROOT + '/**/*.md'
];

var css = [
		RN_SRC_ROOT + '/**/css/*.{css,CSS}'
];

function getStaticContent() {
	var images = gulp.src([RN_SRC_ROOT + '/**/images/**/*.{png,PNG,jpg,JPG}']);

	var gifs = gulp.src([RN_SRC_ROOT + '/**/images/**/*.{gif,GIF}']);

	return [images, gifs];
}

gulp.task('copy-releasenotes-images', function () {
	console.log('Copying over rest of release notes static content files...');

	return es.merge(getStaticContent())
		.pipe(rename(function (path) {
			path.basename = path.dirname + '_' + path.basename; path.dirname = '';
		}))
		.pipe(gulp.dest(DEST_ROOT + '/client/assets'));
});

gulp.task('copy-releasenotes-raw-images', function () {
	console.log('Copying over release note images for raw services...');

	return es.merge(getStaticContent())
		.pipe(gulp.dest(RAW_ROOT));
});

gulp.task('compile-releasenotes', ['compile-releasenotes-handlebars', 'copy-releasenotes-raw-images', 'copy-releasenotes-images', 'compile-releasenotes-markdown', 'compile-releasenotes-css'], function () {
	console.log('Creating release notes index...');
	var tpl = common.swigCompiler('scripts/templates/releasenotes-nav-template.html');

	releaseNotes = releaseNotes.sort(function (a, b) {
		return parseFloat(b.Order) - parseFloat(a.Order);
	});

    // Compile most recent releasenotes as latest.handlebars
    var template = common.swigCompiler('scripts/templates/releasenotes-template.html');

    var latest = new File({
       path: 'latest.html',
       contents: common.getLatestContent('updates', releaseNotes[0].Link, 'Visual Studio Code Updates', 'The latest release notes from Visual Studio Code')
    });

    es.readArray([latest])
        .pipe(gulp.dest(DEST_ROOT + '/server/views/updates'));

	var file = new File({
		path: 'updateNav.handlebars',
		contents: new Buffer(tpl({ articles: releaseNotes }))
	});

	return es.readArray([file])
		.pipe(gulp.dest(DEST_ROOT + '/server/views/partials'));
});

function applyHtmlTemplate(file) {
	var rn = common.mapFileToArticle(file);

	console.log("Compiling RN: " + rn.Title);
	rn = common.compileMarkdown(file, rn);

	if (rn.Order) {  // Only add articles that have the order metadata
		releaseNotes.push(rn);
	}

	// Render template
	var tpl = common.swigCompiler('scripts/templates/releasenotes-template.html');
	var result = tpl(rn);

	file.contents = new Buffer(result, 'utf8');

	return file;
}

gulp.task('compile-releasenotes-handlebars', function () {
	console.log('Parsing release notes MD, applying templates...');
	return gulp.src(sources)
		.pipe(frontMatter({ property: 'data', remove: true }))
		.pipe(es.mapSync(applyHtmlTemplate))
		.pipe(rename({ extname: '.handlebars' }))
		.pipe(gulp.dest(DEST_ROOT + '/server/views/updates'));
});

gulp.task('compile-releasenotes-markdown', function() {
		console.log('Parsing markdown and moving to public folder...');
		return gulp.src(sources)
			.pipe(frontMatter({ property: 'data', remove: true }))
			.pipe(gulp.dest(RAW_ROOT));
});

gulp.task('compile-releasenotes-css', function () {
	console.log('Copying CSS styles for in-product release notes markdown...');
	return gulp.src(css)
		.pipe(gulp.dest(RAW_ROOT));
});