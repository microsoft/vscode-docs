/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const path = require('path');

var gulp = require('gulp');
var frontMatter = require('gulp-front-matter');
var rename = require('gulp-rename');
var slash = require('gulp-slash');
var es = require('event-stream');
var File = require('vinyl');

var keybindings = require('./keybindings/doc.keybindings');
var common = require('./gulpfile.common');

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
    MetaTags: !file.data.MetaTags ? [] : file.data.MetaTags.join(','),
    Sections: [],
    Order: file.data.Order,
    Content: '',
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

gulp.task('copy-blog-images', function() {
  console.log('Copying blog images..');

  return gulp.src([BLOG_ROOT + '/**/*.{png,PNG,jpg,JPG,svg,SVG,gif,GIF}'])
    .pipe(gulp.dest(DEST_ROOT + '/client/assets/blog'));
});

gulp.task('compile-blog-markdown', function() {
  var sources = [BLOG_ROOT + '/**/*.md', '!' + BLOG_ROOT + '/README.md'];

  return gulp
    .src(sources)
    .pipe(
      frontMatter({
        property: 'data',
        remove: true
      })
    )
    .pipe(
      es.mapSync(function(file) {
        var blogArticle = mapFileToBlogArticle(file);

        const fileDir = path.parse(file.relative).dir;
        blogArticle = common.compileMarkdownWithImagePrefix(file, blogArticle, path.join('/assets/blog', fileDir));

        if (blogArticle.Order) {
          blogs.push(blogArticle);
        }

        return renderTemplate(file, blogArticle);
      })
    )
    .pipe(rename({ extname: '.handlebars' }))
    .pipe(gulp.dest(DEST_ROOT + '/server/views/blogs'));
});

gulp.task('compile-blog', ['compile-blog-markdown', 'copy-blog-images'], function() {
  console.log('Creating blog index...');
  var template = common.swigCompiler('scripts/templates/blog-navigation-template.html');

  blogs = blogs.sort(function(a, b) {
    return parseFloat(b.Order) - parseFloat(a.Order);
  });

  var latest = new File({
    path: 'latest.html',
    contents: common.getLatestContent(
      'blogs',
      blogs[0].Link,
      'Visual Studio Code Blogs',
      'The latest Visual Studio Code blogs'
    )
  });

  es.readArray([latest]).pipe(gulp.dest(DEST_ROOT + '/server/views/blogs'));

  var file = new File({
    path: 'blogNavigation.handlebars',
    contents: new Buffer(template({ articles: blogs }))
  });

  compileAtomFeed();

  return es.readArray([file]).pipe(gulp.dest(DEST_ROOT + '/server/views/partials'));
});

function compileAtomFeed() {
  console.log('Creating atom feed...');
  var feed = common.swigCompiler('scripts/templates/blog-feed.template.xml');

  var FEED_LIMIT = 20;

  var feedXml = new File({
    path: 'feed.xml',
    contents: new Buffer(feed({ articles: blogs.slice(0, FEED_LIMIT), latest: blogs[0] }))
  });

  es.readArray([feedXml]).pipe(gulp.dest(DEST_ROOT + '/client/dist'));
}
