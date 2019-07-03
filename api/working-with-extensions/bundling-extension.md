---
# DO NOT TOUCH — Managed by doc writer
ContentId: 26f0c0d6-1ea8-4cc1-bd10-9fa744056e7c
DateApproved: 7/3/2019

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: Bundling Visual Studio Code extensions (plug-ins) with webpack.
---

# Bundling Extension

Visual Studio Code extensions often grow quickly in size. They are authored in multiple source files and depend on modules from [npm](https://www.npmjs.com). Decomposition and reuse are development best practices but they come at a cost when installing and running extensions. Loading 100 small files is much slower than loading one large file. That's why we recommend bundling. Bundling is the process of combining multiple small source files into a single file.

For JavaScript, different bundlers are available. Popular ones are [rollup.js](https://rollupjs.org), [Parcel](https://parceljs.org), and [webpack](https://webpack.js.org/). This tutorial will focus on **webpack**, however, concepts and benefits of all bundlers are similar.

## Using webpack

Webpack is a development tool that's available from [npm](https://www.npmjs.com). To acquire webpack and its command line interface, open the terminal and type:

```bash
npm i --save-dev webpack webpack-cli
```

This will install webpack and update your extension's `package.json` file to include webpack in the `devDependencies`. Webpack is a JavaScript bundler but many VS Code extensions are written in TypeScript and only compiled to JavaScript. With the help of a loader `ts-loader`, webpack can understand TypeScript. Use the following to install `ts-loader`:

```bash
npm i --save-dev ts-loader
```

## Configure webpack

With all tools installed, webpack can now be configured. By convention, a `webpack.config.js` file contains the configuration to instruct webpack to bundle your extension. The sample configuration below is for VS Code extensions and should provide a good starting point:

```javascript
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

The file is [available](https://github.com/Microsoft/vscode-extension-samples/blob/master/webpack-sample/webpack.config.js) as part of the [webpack-extension](https://github.com/Microsoft/vscode-extension-samples/blob/master/webpack-sample) sample. Webpack configuration files are normal JavaScript modules that must export a configuration object.

In the sample above, the following are defined:

* The `target` is 'node' because extensions run in a Node.js context.
* The entry point webpack should use. This is similar to the `main` property in `package.json` except that you provide webpack with a "source" entry point, usually `src/extension.ts`, and not an "output" entry point. The webpack bundler understands TypeScript, so a separate TypeScript compile step is redundant.
* The `output` configuration tells webpack where to place the generated bundle file. By convention, that is the `dist` folder. In this sample, webpack will produce a `dist/extension.js` file.
* The `resolve` and `module/rules` configurations are there to support TypeScript and JavaScript input files.
* The `externals` configuration is used to declare exclusions, for example files and modules that should not be included in the bundle. The `vscode` module should not be bundled because it doesn't exist on disk but is created by VS Code on-the-fly when required. Depending on the node modules that an extension uses, more exclusion may be necessary.

## Run webpack

With the `webpack.config.js` file created, webpack can be invoked. You can run webpack from the command line but to reduce repetition, using npm scripts is helpful.

Merge these entries into the `scripts` section in `package.json`:

```json
"scripts": {
  "vscode:prepublish": "webpack --mode production",
  "compile": "webpack --mode none",
  "watch": "webpack --mode none --watch",
  "test-compile": "tsc -p ./",
},
```

The `compile` and `watch` scripts are for development and they produce the bundle file. The `vscode:prepublish` is used by `vsce`, the VS Code packaging and publishing tool, and run before publishing an extension. The difference is in the [mode](https://webpack.js.org/concepts/mode/) and that controls the level of optimization. Using `production` yields the smallest bundle but also takes longer, so `none` is used for development. To run above scripts, open a terminal and type `npm run compile` or select **Tasks: Run Task** from the Command Palette (`kb(workbench.action.showCommands)`).

## Run the extension

Before you can run the extension, the `main` property in `package.json` must point to the bundle, which for the configuration above is [`"./dist/extension"`](https://github.com/Microsoft/vscode-references-view/blob/d649d01d369e338bbe70c86e03f28269cbf87027/package.json#L26). With that change, the extension can now be executed and tested. For debugging configuration, make sure to update the `outFiles` property in the `launch.json` file.

## Tests

Extension authors often write unit tests for their extension source code. With the correct architectural layering, where the extension source code doesn't depend on tests, the webpack produced bundle shouldn't contain any test code. To run unit tests, only a simple compile is necessary. In the sample, there is a `test-compile` script, which uses the TypeScript compiler to compile the extension into the `out` folder. With that intermediate JavaScript available, the following snippet for `launch.json` is enough to run tests.

```json
{
    "name": "Extension Tests",
    "type": "extensionHost",
    "request": "launch",
    "runtimeExecutable": "${execPath}",
    "args": [
        "--extensionDevelopmentPath=${workspaceFolder}",
        "--extensionTestsPath=${workspaceFolder}/out/test"
    ],
    "outFiles": [
        "${workspaceFolder}/out/test/**/*.js"
    ],
    "preLaunchTask": "npm: test-compile"
}
```

This configuration for running tests is the same for non-webpacked extensions. There is no reason to webpack unit tests because they are not part of the published portion of an extension.

## Publishing

Before publishing, you should update the `.vscodeignore` file. Everything that's now bundled into the `dist/extension.js` file can be excluded, usually the `out` folder (in case you didn't delete it yet) and most importantly, the `node_modules` folder.

A typical `.vscodeignore` file looks like this:

```bash
.vscode
node_modules
out/
src/
tsconfig.json
webpack.config.js
```

## Migrate an existing extension

Migrating an existing extension to use webpack is easy and similar to the getting started guide above. A real world sample that adopted webpack is the VS Code's References view through this [pull request](https://github.com/Microsoft/vscode-references-view/pull/50).

There you can see:

* Add `webpack`, `webpack-cli`, and `ts-loader` as `devDependencies`.
* Update npm scripts so that webpack is used for development.
* Update the debugger configuration `launch.json` file.
* Add and tweak the `webpack.config.js` configuration file.
* Update `.vscodeignore` to exclude `node_modules` and intermediate output files.
* Enjoy an extension that installs and loads much faster!

## Troubleshooting

### Minification

Bundling in `production` mode also performs code minification. Minification compacts source code by removing whitespace and comments and by changing variable  and function names into something ugly but short. Source code that uses `Function.prototype.name` works differently and so you might have to disable minification.

### webpack critical dependencies

When running webpack, you might encounter a warning like **Critical dependencies: the request of a dependency is an expression**. Such warnings must be taken seriously and likely your bundle won't work. The message means that webpack cannot statically determine how to bundle some dependency. This is usually caused by a dynamic `require` statement, for example `require(someDynamicVariable)`.

To address the warning, you should either:

* Try to make the dependency static so that it can be bundled.
* Exclude that dependency via the `externals` configuration. Also make sure that those JavaScript files aren't excluded from the packaged extension, using a negated glob pattern in `.vscodeignore`, for example `!node_modules/mySpecialModule`.

## Next steps

* [Extension Marketplace](/docs/editor/extension-gallery) - Learn more about VS Code's public extension Marketplace.
* [Testing Extensions](/api/working-with-extensions/testing-extension) - Add tests to your extension project to ensure high quality.
* [Continuous Integration](/api/working-with-extensions/continuous-integration) - Learn how to run extension CI builds on Azure Pipelines.
