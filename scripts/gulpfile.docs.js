/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
 
var gulp = require('gulp');
var es = require('event-stream');
var frontMatter = require('gulp-front-matter');
var slash = require('gulp-slash');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var File = require('vinyl');
var common = require('./gulpfile.common');

var DOCS_SRC_ROOT = 'docs'; 
var DEST_ROOT = 'out/vscode-website/src'; 

var areas = {
	setup: { title: 'Setup', path: 'setup', include: true, articles: [] },
	editor: { title: 'Editor', path: 'editor', include: true, articles: [] },
	customization: {title: 'Customization', path: 'customization', include: true, articles: []},
	languages: { title: 'Languages', path: 'languages', include: true, articles: [] },
	runtimes: { title: 'Runtimes', path: 'runtimes', include: true, articles: [] },
	extensions: { title: 'Extensions', path: 'extensions', include: true, articles: [] },
	extensionapi: { title: 'Extensibility Reference', path: 'extensionAPI', include: true, articles: [] },
	tools: { title: 'Tools', path: 'tools', include: true, articles: [] },
	supporting: { title: 'Supporting', path: 'supporting', include: false, articles: [] }
};

gulp.task('copy-images', function () {
	console.log('Copying over rest of static content files...');

	var images = gulp.src([DOCS_SRC_ROOT + '/**/images/**/*.{png,PNG,jpg,JPG}'])
					.pipe(imagemin());

	var gifs = gulp.src([DOCS_SRC_ROOT + '/**/images/**/*.{gif,GIF}']);
	
	return es.merge([images, gifs])
		.pipe(rename(function (path) { path.basename = path.dirname + '_' + path.basename; path.dirname = ''; }))
		.pipe(rename({ dirname: '' }))
		.pipe(gulp.dest(DEST_ROOT + '/dist/images'));
;})

gulp.task('compile-docs', ['compile-docs-markdown', 'copy-images'], function () {
	console.log('Creating docs index...');
	var tpl = common.swigCompiler('scripts/templates/portaldocs-nav-template.html');
	
	for (var a in areas) {
		var ar = areas[a].articles;
		areas[a].articles = ar.sort(function (a, b) {
			return parseFloat(a.Order) - parseFloat(b.Order);
		});
	}

	var file = new File({
		path: 'docNav.handlebars',
		contents: new Buffer(tpl({ areas: areas }))
	});

	return es.readArray([file])
		.pipe(gulp.dest(DEST_ROOT + '/views/partials'));
});

gulp.task('compile-docs-markdown', function () {
	var sources = [
		DOCS_SRC_ROOT + '/**/*.md',
		'!' + DOCS_SRC_ROOT + '/README.md',
		'!' + DOCS_SRC_ROOT + '/CONTRIBUTING.md',
		'!' + DOCS_SRC_ROOT + '/LICENSE.md',
	];

	console.log('Docs destination: ' + DEST_ROOT);
	console.log('Parsing docs MD, applying templates...');
	return gulp.src(sources, { base: DOCS_SRC_ROOT + '/.' })
		.pipe(frontMatter({ property: 'data', remove: true }))
		.pipe(slash())
		.pipe(es.mapSync(function (file) {
			if (file.data.Exclude) {
				return;
			}

			var doc = common.mapFileToArticle(file);
			console.log("Compiling DOC: " + doc.Title);
			doc = common.compileMarkdown(file, doc);

			if (doc.Area && doc.Order) {  // Only add articles that have the area and order metadata
				areas[doc.Area].articles.push(doc);
			}

			// Render template
			var tpl = common.swigCompiler('scripts/templates/portaldocs-template.html');
			var result = tpl(doc);

			file.contents = new Buffer(result, 'utf8');

			return file;
		}))
		.pipe(rename({ extname: '.handlebars' }))
		.pipe(gulp.dest(DEST_ROOT + '/views/docs'));
});
