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
var slash = require('gulp-slash');

var BLOG_ROOT = 'blogs';
var DEST_ROOT = 'out/vscode-website';

var blogs = [];

function mapFileToBlogArticle(file) {
	return {
		Area: file.data.Area ? file.data.Area.toLowerCase() : null,
		Link: slash(file.relative.substr(0, file.relative.lastIndexOf('.'))),
		Title: file.data.PageTitle,
		NavTitle: file.data.TOCTitle,
		MetaDescription: file.data.MetaDescription,
		MetaTags: !file.data.MetaTags ? [] : (file.data.MetaTags).join(','),
		Sections: [],
		Order: file.data.Order,
		Content: "",
		File: null,
		Date: file.data.Date,
		Author: file.data.Author,
		ShortDescription: file.data.ShortDescription,
		MetaSocialImage: file.data.MetaSocialImage
	};
}

function renderTemplate(file, article) {
	var template = common.swigCompiler('scripts/templates/blog-template.html');
	var result = template(article);

	file.contents = new Buffer(result, 'utf8');
	article.File = file;

	return file;
}

gulp.task('copy-blog-images', function () {
	console.log('Copying blog images..');

	var images = gulp.src([BLOG_ROOT + '/**/images/**/*.{png,PNG,jpg,JPG,svg,SVG}']);
	var gifs = gulp.src([BLOG_ROOT + '/**/images/**/*.{gif,GIF}']);

	return es.merge([images, gifs])
		.pipe(rename(function (path) {
			path.basename = path.dirname + '_' + path.basename;
			path.dirname = '';
		}))
		.pipe(gulp.dest(DEST_ROOT + '/client/dist'));
	;
})

gulp.task('compile-blog-markdown', function () {
	var sources = [
		BLOG_ROOT + '/**/**/**/*.md',
		'!' + BLOG_ROOT + '/README.md'
	];

	console.log('Parsing blog MD, applying templates...');
	return gulp.src(sources)
		.pipe(frontMatter({
			property: 'data',
			remove: true
		}))
		.pipe(es.mapSync(function (file) {
			var blogArticle = mapFileToBlogArticle(file);
			console.log("Compiling Blog: " + blogArticle.Title);

			blogArticle = common.compileMarkdown(file, blogArticle);

			if (blogArticle.Order) {
				blogs.push(blogArticle);
			}

			return renderTemplate(file, blogArticle);
		}))
		.pipe(rename({ extname: '.handlebars' }))
		.pipe(gulp.dest(DEST_ROOT + '/server/views/blogs'));
});

gulp.task('compile-blog', ['compile-blog-markdown', 'copy-blog-images'], function () {
	console.log('Creating blog index...');
	var template = common.swigCompiler('scripts/templates/blog-navigation-template.html');

	blogs = blogs.sort(function (a, b) {
		return parseFloat(b.Order) - parseFloat(a.Order);
	});

	var latest = new File({
		path: 'latest.html',
		contents: common.getLatestContent('blogs', blogs[0].Link, 'Visual Studio Code Blogs', 'The latest Visual Studio Code blogs')
	});

	es.readArray([latest])
		.pipe(gulp.dest(DEST_ROOT + '/server/views/blogs'));

	var file = new File({
		path: 'blogNavigation.handlebars',
		contents: new Buffer(template({ articles: blogs }))
	});

	compileAtomFeed();

	return es.readArray([file])
		.pipe(gulp.dest(DEST_ROOT + '/server/views/partials'));
});

function compileAtomFeed() {
	console.log('Creating atom feed...');
	var feed = common.swigCompiler('scripts/templates/blog-feed.template.xml');

	var FEED_LIMIT = 20;

	var feedXml = new File({
		path: 'feed.xml',
		contents: new Buffer(feed({ articles: blogs.slice(0, FEED_LIMIT), latest: blogs[0] }))
	})

	es.readArray([feedXml])
		.pipe(gulp.dest(DEST_ROOT + '/client/public'));
};