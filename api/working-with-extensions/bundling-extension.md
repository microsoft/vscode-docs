# Bundling Extension

Popular extensions often grow quickly in size. They are authored in multiple source files and depend on modules from [npm](https://www.npmjs.com). Decomposition and reuse are best pratice when developing but they come at a cost when installing and running extensions. Loading 100 small files is much slower than loading 1 large file. That's why we recommend bundling. Bundling is the process of combining multiple small source files into a single file.

For JavaScript different bundlers are available, popular once are [rollup.js](https://rollupjs.org), [Parcel](https://parceljs.org), and [webpack](https://webpack.js.org/). This tutorial will focus on *webpack*, however, concepts and benefits of all bundlers are similar.

## Using Webpack

Webpack is a development tool that's available from [npm](https://www.npmjs.com). To acquire webpack and its command line interface, open the terminal and type:

`npm i --save-dev webpack webpack-cli`

This will install webpack and update your extension's `package.json`-file. Webpack is a JavaScript bundler but most extensions are written in TypeScript and only compiled to JavaScript. With the help of a loader webpack understands TypeScript - use the following to install one:

`npm i --save-dev ts-loader`

### Configure Webpack

With all tools installed webpack can be setup. By convention a `webpack.config.js`-file contains the configuration that instructs webpack how to bundle your extension. The following is a sample configuration for vscode extensions and should provide a good starting point:

```js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

//@ts-check

'use strict';

const path = require('path');

/**@type {import('webpack').Configuration}*/
const config = {
    target: 'node', // vscode extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/

    entry: './src/extension.ts', // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
    output: { // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
        path: path.resolve(__dirname, 'dist'),
        filename: 'extension.js',
        libraryTarget: "commonjs2",
        devtoolModuleFilenameTemplate: "../[resource-path]",
    },
    devtool: 'source-map',
    externals: {
        vscode: "commonjs vscode" // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
    },
    resolve: { // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [{
                loader: 'ts-loader',
            }]
        }]
    },
}
module.exports = config;
```

The file is [available](https://github.com/Microsoft/vscode-extension-samples/blob/master/webpack-sample/webpack.config.js) as part of the [webpack-extension](https://github.com/Microsoft/vscode-extension-samples/blob/master/webpack-sample) sample. Webpack configuration files are normal JavaScript modules that must export a configuration-object. In the sample above the following is defined

* The `target` is node because extensions run in a nodejs-context
* The entry point webpack should use. This compares to the `main`-property in `package.json` with the ceveat that you provide webpack with a "source" entry point, usually `src/extension.ts`, and not the "output" entry point. That's because webpack understands TypeScript, making a separate TypeScript compile step redundant.
* the `output` configuration tells webpack where to place the produced bundle-file. By convention, that is the `dist`-folder, in this sample webpack will produce a `dist/extension.js`-file.
* the `resolve` and `module/rules` configurations are there to support TypeScript and JavaScript input files.
* the `externals` configuration is used to declare exclusions, e.g. files and modules that cannot be included in the bundle. The `vscode`-module cannot be bundled because it doesn't exists on disk but is created by VS Code on-the-fly when being required. Depending on the node-modules an extension uses more exclusion might be neccessary.

### Run Webpack

With the `webpack.config.js`-file in hand webpack can be invoked. Invoking can be done via the terminal but to reduce repetition npm-scripts help. Merge these entries into the `scripts`-section in `package.json`:

```json
"scripts": {
  "vscode:prepublish": "webpack --mode production",
  "compile": "webpack --mode none",
  "watch": "webpack --mode none --watch",
},
```

The `compile` and `watch` scripts are for development, they produce the bundle file, the `vscode:prepublish` is being picked up by `vsce` and run before publishing an extension. The difference is in the [mode](https://webpack.js.org/concepts/mode/) and that controls the level of optimization. Using `production` yeilds in the smallest bundles but also takes longest, that's why `none` is used for development. To run above scripts, open the terminal and type `npm run compile` or select `F1 > Run Task`.

### Run Extension

Before running, the `main`-property in `package.json` must point to the bundle, according to the configuration above that must be [`"./dist/extension"`](https://github.com/Microsoft/vscode-references-view/blob/d649d01d369e338bbe70c86e03f28269cbf87027/package.json#L26). With that, the extension can be executed and tested. When debugging also make sure to update the `outFiles`-property in the `launch.json`-file.

### Publishing

Before publishing, update the `.vscodeignore`-file. Everything that's now bundled into the `dist/extension.js`-file can be excluded, that is usually the `out`-folder (in case you didn't delete it yet) and most importantly the `node_modules` folder. A typical ignore-file looks like this:

```
.vscode
node_modules
out/
src/
tsconfig.json
webpack.config.json
```

## Migrate Extension

Migrating an existing extension to use webpack is easy and very similar to the getting started guide above. A real world sample that adopted webpack for VS Code's references viewlet is this pull request: https://github.com/Microsoft/vscode-references-view/pull/50.

* add `webpack`, `webpack-cli`, and `ts-loader` as dev-dependencies
* *update* npm scripts so that webpack is used for development, *update* the `launch.json`-file
* add and tweak the `webpack.config.js` configuration file
* *update* `.vscodeignore` to exclude node_modules et al
* enjoy an extension that installs and loads much faster

## Trouble Shooting

### Minification

Bundling in `production`-mode also performs code minification. Minification compacts source code by removing whitespace and comments and by changing variable- and function-names into something ugly but short. That also means that code using `Function.prototype.name` works differently and that you should might have to disable minification.

### Webpack: Critical dependencies

When running webpack you might encounter a warning like `Critical dependencies: the request of a dependency is an expression`. Such warnings must be taken serious and likely mean you bundle won't work. The message means that webpack cannot statically determine how to bundle some dependency. This is usually caused by a dynamic require-statement, e.g. `require(someDynamicVariable)`, and means you should

* Try to make the dependency static so that it can be bundled, or
* Exclude that dependency via the `externals`-configuration. Then also make sure that those JS-files aren't excluded from the packaged extension, using a negated glob pattern in `.vscodeignore`, e.g. `!node_modules/mySpecialModule`
