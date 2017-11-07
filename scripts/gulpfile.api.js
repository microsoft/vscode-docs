/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

var gulp = require('gulp');
var typedoc = require("gulp-typedoc");
var es = require('event-stream');
var gutil = require('gulp-util');
var doc = require('./api-doc/doc');
var path = require('path');
var request = require('request');
var fs = require('fs');
var common = require('./gulpfile.common');

var VSCODE_PATH = 'out/vscode.d.ts';
var TEMPLATE = 'docs/extensionAPI/vscode-api.template';
var DIST = 'docs/extensionAPI/vscode-api.md';

var VSCODE_VERSION = process.env['vscode-lastest'] ? process.env['vscode-lastest'] : 'af39ef560060e7e8ba8d75983c9ec1da3f4d2a20' /* 1.18.0 */;

function getVSCodeDefFileURL() {
    if (VSCODE_VERSION === "latest") {
        return 'https://raw.githubusercontent.com/Microsoft/vscode/master/src/vs/vscode.d.ts';
    } else {
        return 'https://raw.githubusercontent.com/Microsoft/vscode/' + VSCODE_VERSION + '/src/vs/vscode.d.ts';
    }
}

gulp.task("download-vscode.d.ts", function (cb) {
    var url = getVSCodeDefFileURL();
    request(url, function (error, resp, body) {
        if (error) {
            console.log('Error download vscode.d.ts', url);
            console.log(error);
        } else {
            fs.writeFile(VSCODE_PATH, body);
        }

        cb(error);
    });
});

gulp.task("api-doc-json", ["download-vscode.d.ts"], function () {
    return gulp
        .src(VSCODE_PATH)
        .pipe(typedoc({
            module: "commonjs",
            target: "es5",
            json: "../tmp/vscode.api.json",
            includeDeclarations: true,
            name: "VS Code API",
            excludeExternals: true
        }));;
});

gulp.task("generate-api-doc", ["api-doc-json"], function () {
    return gulp
        .src("../tmp/vscode.api.json")
        .pipe(es.mapSync(function (file) {
            var md = doc(file.contents.toString());
            var tpl = common.swigCompiler(TEMPLATE);
            // escape @ in cshtml
            md = md.replace(/@/g, '@@');
            // add a whiteline before a <pre> to workaround https://github.com/markdown-it/markdown-it/issues/187
            md = md.replace(/<pre>/g, '\n<pre>');
            var result = tpl({
                Content: md
            });
            var contents = new Buffer(result, 'utf8');
            return new gutil.File({
                path: DIST,
                contents: contents
            });
        }))
        .pipe(gulp.dest('.'));
});
