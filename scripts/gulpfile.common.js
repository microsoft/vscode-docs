/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const path = require('path');

var gulp = require('gulp');
var tsb = require('gulp-tsb');
var slash = require('gulp-slash');
var markdownIt = require('markdown-it');
var externalLinks = require('markdown-it-external-links');
var highlightjs = require('highlight.js');
var swig = require('swig');
var rimraf = require('rimraf');

var keybindings = require('./keybindings/doc.keybindings');

exports.filterText = function(orig) {
  var output = orig.replace(/[^a-zA-Z0-9\s]/g, "");
  output = output.replace(/\s+/g, " ");
  output = output.replace(/\s/g, "-");
  if (output.charAt(output.length) === '-') {
    return output.substr(0, output.length - 1);
  }
  return output;
}

exports.swigCompiler = function(templatePath) {
  return swig.compileFile(templatePath, { autoescape: false, varControls: ['{$', '$}'] });
}

exports.tableRendererRule = function(tokens, idx, options, env, self) {
  var tableToken = tokens[idx];
  tableToken.attrPush(['class', 'table table-striped']);
  tokens[idx] = tableToken;
  return self.renderToken(tokens, idx, options);
}

exports.imageRendererRule = function(tokens, idx, options, env, self) {
  var imageToken = tokens[idx];
  var src = imageToken.attrs[imageToken.attrIndex('src')][1];

    imageToken.attrs[imageToken.attrIndex('src')][1] = "/images/" + src.replace('images/', '').replace('/', '_');

  // DO NOT REMOVE - from original rule
  imageToken.attrs[imageToken.attrIndex('alt')][1] = self.renderInlineAsText(imageToken.children, options, env);

  return self.renderToken(tokens, idx, options);
}

exports.mapFileToArticle = function(file) {
  var article = {
    Area: file.data.Area ? file.data.Area.toLowerCase() : null,
    Link: slash(file.relative.substr(0, file.relative.lastIndexOf('.'))),
    Title: file.data.PageTitle,
    NavTitle: file.data.TOCTitle,
        ContentId: file.data.ContentId,
    DateApproved: file.data.DateApproved,
    MetaDescription: file.data.MetaDescription,
    MetaTags: !file.data.MetaTags ? [] : (file.data.MetaTags).join(','),
    Sections: [],
    Order: file.data.Order,
    Content: "",
    MetaSocialImage: file.data.MetaSocialImage
  };
  return article;
}

exports.getLatestContent = function(base, link, title, description) {
  return new Buffer('' +
    '<!DOCTYPE html>' +
    '<html>' +
      '<head>' +
        '<title>' + title + '</title>' +
        '<meta http-equiv="refresh" content="0; url=/' + base + '/' + link + '">' +
        '<meta name="description" content="' + description + '">' +
        '<meta name="robots" content="noindex">' +
        '<link rel="canonical" href="/' + base + '/' + link + '" />' +
      '</head>' +
    '</html>'
  , 'utf8');
}

exports.compileMarkdown = function(file, article) {
  var md = markdownIt({ html: true, langPrefix: '' });
  md.use(externalLinks, {
    externalTarget: "_blank",
    internalDomains: ["code.visualstudio.com", "vscode-update.azurewebsites.net"]
  });

  // Apply custom markdown rules
  md.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
    var headerToken = tokens[idx];
    var title = tokens[idx + 1];
    if ((headerToken.tag === 'h2') || (headerToken.tag === 'h3')) {
      var anchor = "_" + exports.filterText(title.content).toLowerCase();
      var section = {
        Title: title.content,
        Anchor: anchor
      };
      if (headerToken.tag === 'h2') {
        article.Sections.push(section);
      }
      headerToken.attrPush(['id', anchor]);
            headerToken.attrPush(['data-needslink', anchor]);
      tokens[idx] = headerToken;
    }

    return self.renderToken(tokens, idx, options);
  };
  md.renderer.rules.table_open = exports.tableRendererRule;
  md.renderer.rules.image = exports.imageRendererRule;

  // Highlight code using highlight.js
  md.options.highlight = function(code, lang) {
    if (!lang) {
      return code;
    }
    try {
      var result = highlightjs.highlight(lang, code, true);
      if (result && result.value) {
        return result.value;
      }
    } catch (err) {
      console.error('WARNING -- WILL NOT HIGHLIGHT CODE BLOCK (```) at ' + file.path + ' DUE TO ERROR :::' + err.message);
      return code;
    }
    return code;
  }

  // Keybindings pre-process
  var fileContents = file.contents.toString('utf8');

    // remove .md file extensions from topic links (only our relative links)
  fileContents = fileContents.replace(/\(\/(blogs|updates|docs).+\.md\)/g, function(str) { return str.replace(/\.md\)/g, ')'); } );

  // need to remove embedded .md before # section tags and place _ underscore after for cshtml navigation
  fileContents = fileContents.replace(/.md#/g, "#_");

  // place underscore after a single # section tags for cshtml navigation
  fileContents = fileContents.replace(/\(#/g, "(#_");

  // remove the markdown stylesheet and scroll-to-top button that we intend only for the release notes that show in the product
  fileContents = fileContents.replace('<a id="scroll-to-top" role="button" aria-label="scroll to top" href="#"><span class="icon"><\/span><\/a>\n<link rel="stylesheet" type="text\/css" href="css\/inproduct_releasenotes.css"\/>', "");

  // Render markdown
  article.Content = md.render(fileContents);

  // Keybindings post-process
  article.Content = keybindings.postProcessFile(article.Content);
  return article;
}

exports.compileMarkdownWithImagePrefix = function(file, article, imagePrefix) {
  var md = markdownIt({ html: true, langPrefix: '' });
  md.use(externalLinks, {
    externalTarget: "_blank",
    internalDomains: ["code.visualstudio.com", "vscode-update.azurewebsites.net"]
  });

  // Apply custom markdown rules
  md.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
    var headerToken = tokens[idx];
    var title = tokens[idx + 1];
    if ((headerToken.tag === 'h2') || (headerToken.tag === 'h3')) {
      var anchor = "_" + exports.filterText(title.content).toLowerCase();
      var section = {
        Title: title.content,
        Anchor: anchor
      };
      if (headerToken.tag === 'h2') {
        article.Sections.push(section);
      }
      headerToken.attrPush(['id', anchor]);
            headerToken.attrPush(['data-needslink', anchor]);
      tokens[idx] = headerToken;
    }

    return self.renderToken(tokens, idx, options);
  };
  md.renderer.rules.table_open = exports.tableRendererRule;
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    var imageToken = tokens[idx];
    var src = imageToken.attrs[imageToken.attrIndex('src')][1];

    imageToken.attrs[imageToken.attrIndex('src')][1] = path.join(imagePrefix, src);

    // DO NOT REMOVE - from original rule
    imageToken.attrs[imageToken.attrIndex('alt')][1] = self.renderInlineAsText(imageToken.children, options, env);

    return self.renderToken(tokens, idx, options);
  }

  // Highlight code using highlight.js
  md.options.highlight = function(code, lang) {
    if (!lang) {
      return code;
    }
    try {
      var result = highlightjs.highlight(lang, code, true);
      if (result && result.value) {
        return result.value;
      }
    } catch (err) {
      console.error('WARNING -- WILL NOT HIGHLIGHT CODE BLOCK (```) at ' + file.path + ' DUE TO ERROR :::' + err.message);
      return code;
    }
    return code;
  }

  // Keybindings pre-process
  var fileContents = file.contents.toString('utf8');

    // remove .md file extensions from topic links (only our relative links)
  fileContents = fileContents.replace(/\(\/(blogs|updates|docs).+\.md\)/g, function(str) { return str.replace(/\.md\)/g, ')'); } );

  // need to remove embedded .md before # section tags and place _ underscore after for cshtml navigation
  fileContents = fileContents.replace(/.md#/g, "#_");

  // place underscore after a single # section tags for cshtml navigation
  fileContents = fileContents.replace(/\(#/g, "(#_");

  // remove the markdown stylesheet and scroll-to-top button that we intend only for the release notes that show in the product
  fileContents = fileContents.replace('<a id="scroll-to-top" role="button" aria-label="scroll to top" href="#"><span class="icon"><\/span><\/a>\n<link rel="stylesheet" type="text\/css" href="css\/inproduct_releasenotes.css"\/>', "");

  // Render markdown
  article.Content = md.render(fileContents);

  // Keybindings post-process
  article.Content = keybindings.postProcessFile(article.Content);
  return article;
}

exports.rimraf = function(dir) {
  return function (cb) {
    rimraf(dir, cb);
  };
};

var compilation = tsb.create(require('./tsconfig.json').compilerOptions);

gulp.task('compile', function() {
  return gulp.src('./scripts/**/*.ts', { base: '.' })
    .pipe(compilation())
    .pipe(gulp.dest(''));
});