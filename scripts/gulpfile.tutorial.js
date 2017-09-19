var gulp = require('gulp');
var es = require('event-stream');
var markdownIt = require('markdown-it');
var frontMatter = require('gulp-front-matter');
var rename = require('gulp-rename');
var keybindings = require('./keybindings/doc.keybindings');
var File = require('vinyl');
var common = require('./gulpfile.common');
var slash = require('gulp-slash');

var TUTORIAL_ROOT = 'tutorials';
var DEST_ROOT = 'out/vscode-website';

var tutorials = [];

function mapFileToTutorialArticle(file) {
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
    var template = common.swigCompiler('scripts/templates/tutorial-template.html');
    var result = template(article);

    file.contents = new Buffer(result, 'utf8');
    article.File = file;

    return file;
}

gulp.task('copy-tutorial-images', function () {
	console.log('Copying tutorial images..');

	var images = gulp.src([TUTORIAL_ROOT + '/**/images/**/*.{png,PNG,jpg,JPG,svg,SVG}']);
	var gifs = gulp.src([TUTORIAL_ROOT + '/**/images/**/*.{gif,GIF}']);

	return es.merge([images, gifs])
		.pipe(rename(function (path) {
			console.log(path);
            path.basename = path.dirname + '_' + path.basename;
            path.dirname = '';
        }))
		.pipe(gulp.dest(DEST_ROOT + '/client/assets'));
;})

gulp.task('compile-tutorial-markdown', function () {
	var sources = [
		TUTORIAL_ROOT + '/**/**/*.md',
        '!' + TUTORIAL_ROOT + '/README.md'
	];

	console.log('Parsing tutorial MD, applying templates...');
	return gulp.src(sources)
		.pipe(frontMatter({
            property: 'data',
            remove: true
        }))
		.pipe(es.mapSync(function (file) {
			var tutorialArticle = mapFileToTutorialArticle(file);
			console.log("Compiling Tutorial: " + tutorialArticle.Title);

			tutorialArticle = common.compileMarkdown(file, tutorialArticle);

			if (tutorialArticle.Order) {
				tutorials.push(tutorialArticle);
			}

            return renderTemplate(file, tutorialArticle);
		}))
		.pipe(rename({ extname: '.handlebars' }))
		.pipe(gulp.dest(DEST_ROOT + '/server/views/tutorials'));
});

gulp.task('compile-tutorial', ['compile-tutorial-markdown', 'copy-tutorial-images'], function () {
	console.log('Creating tutorial index...');
	var template = common.swigCompiler('scripts/templates/tutorial-navigation-template.html');

	tutorials = tutorials.sort(function (a, b) {
		return parseFloat(a.Order) - parseFloat(b.Order);
	});

    var latest = new File({
       path: 'latest.html',
	   contents: common.getLatestContent('tutorials', tutorials[0].Link)
    });

    es.readArray([latest])
        .pipe(gulp.dest(DEST_ROOT + '/server/views/tutorials'));

	var file = new File({
		path: 'tutorialNavigation.handlebars',
		contents: new Buffer(template({ articles: tutorials }))
	});

	return es.readArray([file])
        .pipe(gulp.dest(DEST_ROOT + '/server/views/partials'));
});