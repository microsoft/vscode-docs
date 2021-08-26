
# Web Extensions

VS Code can run as an editor ('VS Code Web editor') in the browser for example in github.dev (reached by pressing `.` in GitHub **<> Code** tab). When VS Code runs in a browser, then extensions are run in an extension host in the browser. We call it the 'web extension host'. An extension that can run in a web extension host is called a 'web extension'.

Web extensions share the same structure as regular extensions, but given the different runtime, don't run with the same code as extensions written for a Node.js runtime. Web extensions still have access to the full VS Code API, but no longer to the Node.js APIs and runtime. Instead, web extensions are [restricted by the browser sandbox](#web_extension_restrictions) and are limited compared to normal extensions.

## Web extension anatomy

A web extension is [structured like a regular extension](/api/get-started/extension-anatomy). The extension manifest (`package.json`) defines the entry file with the source code and declares extension contributions.

For web extensions, the [main entry file](#web-extension-main-file) is defined by the `browser` property, and not by the `main` property as with regular extensions.

The `contributes` property works the same way for both web and regular extensions. The example below shows the `package.json` for a simple hello world example, that runs in the web only (it only has a `browser` entry point):

```json
{
  "name": "helloworld-web-sample",
  "displayName": "helloworld-web-sample",
  "description": "HelloWorld example for VS Code in the browser",
  "version": "0.0.1",
  "publisher": "vscode-samples",
  "repository": "https://github.com/microsoft/vscode-extension-samples/helloworld-web-sample",
  "engines": {
    "vscode": "^1.58.0"
  },
  "categories": ["Other"],
  "activationEvents": ["onCommand:helloworld-web-sample.helloWorld"],
  "browser": "./dist/web/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "helloworld-web-sample.helloWorld",
        "title": "Hello World"
      }
    ]
  },
  "scripts": {
    "vscode:prepublish": "npm run package-web",
    "compile-web": "webpack --config ./build/web-extension.webpack.config.js",
    "watch-web": "webpack --watch --config ./build/web-extension.webpack.config.js",
    "package-web": "webpack --mode production --devtool hidden-source-map --config ./build/web-extension.webpack.config.js",
  },
  "devDependencies": {
    "@types/node": "14.x",
    "@types/vscode": "^1.59.0",
    "ts-loader": "^9.2.2",
    "webpack": "^5.38.1",
    "webpack-cli": "^4.7.0",
    "@types/webpack-env": "^1.16.0",
    "process": "^0.11.10"
  }
}
```

The example above is from the [helloworld-web-sample](https://github.com/microsoft/vscode-extension-samples/tree/main/helloworld-web-sample)


Extensions that have only a `main` entry point, but no `browser` are not web extensions. They are ignored by the web extension host and not available for download in the Extensions view.

![extension view](images/web-extensions/extensions-view-item-disabled.png)

Extensions with only declarative contributions (only `contributes`, no `main` and `browser`) are web extensions. They can be installed and used without any modifications by the extension author. Examples of extensions with declarative contributions include themes, grammars, and snippets.

Extensions can have both a `browser` and `main` entry point to run in browser and in Node.js backends.

The [Web extension enablement](#web-extension-enablement) section lists the rules used to decide whether an extension can be loaded on a web extension host.

### Web extension main file

The web extension's main file is defined by the `browser` property. The script runs in the web extension host in a [Browser WebWorker](https://developer.mozilla.org/docs/Web/API/Web_Workers_API) environment. It is restricted by the browser worker sandbox and is limited compared to normal extensions running in a Node.js runtime.

* Importing or requiring other modules is not supported. `importScripts` is not available as well. As a consequence, the code must be packaged to a single file.
* The [VS Code API](/api/references/vscode-api) can be loaded via the pattern `require('vscode')`. This will work because we shim require, but this cannot be used to load additional extension files or additional node modules. It only works with `require('vscode')`.
* Node.js globals and libraries such as `process`, `os`, `setImmediate`, `path`, `util`, `url` are not available at runtime. They can, however, be added with tools like Webpack. The [Webpack configuration](#webpack_configuration) section explains how this is done.
* The opened workspace or folder is on a virtual file system. Accesses to the workspace need to go the [file system](/api/references/vscode-api#FileSystem) API accessible at `vscode.workspace.fs`.
* [Extension context](/api/references/vscode-api#ExtensionContext) locations (`ExtensionContext.extensionUri`), storage location (`ExtensionContext.storageUri`, `globalStorageUri`) are also on a virtual file system and also need to go through `vscode.workspace.fs`.
* For accessing web resources, the [fetch](https://developer.mozilla.org/docs/Web/API/Fetch_API) API must be used. Accessed resources need to support [Cross-Origin Resource Sharing](https://developer.mozilla.org/docs/Web/HTTP/CORS) (CORS)
* Creating child processes or running executables is not possible. However, web workers can be created through the [Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker) API. This is used for running language servers as described in the [LSP in web extensions](#lsp_in_web_extensions) section.
* As with regular extensions, the extension's `activate/deactivate` functions need to be exported via the pattern `exports.activate = ...`.

## Develop a web extension

Thankfully, tools like TypeScript and Webpack can hide many of the runtime aspects and allow us to write web extensions the same way as regular extensions. Often both a web extension and a regular extension can be generated from the same code.

That's why the `Hello Web Extension` generated by `yo code` only differs in the build scripts. You can run and debug the generated extension just like traditional Node.js extensions by using the provided launch configurations accessible using the **Debug: Select and Start Debugging** command.

## Create a web extension

To scaffold a new web extension, use `yo code` and pick **New Web Extension**. Make sure to use the latest version of the generator-code (>= generator-code@1.6
)
The extension that is created consists of the extension's source code (a command showing a hello world notification), the `package.json` manifest file, and a webpack configuration file.

* `src/web/extension.ts` is the source of the extension's entry file. It's identical to the regular hello extension.
* `package.json` is the extension manifest.
  * It points to the entry file using the `browser` property.
  * It provides scripts: `compile-web`, `watch-web` and `package-web` to run, watch and package.
* `build/web-extension.webpack.config.js` is the webpack config file that compiles and bundles the extension sources into a single file.
* `.vscode/launch.json` contains the launch configurations that run the web extension and the tests in desktop VS Code with a web extension host (setting `extensions.webWorker` is no longer needed).
* `.vscode/task.json` contains the build task used by the launch configuration. They run `npm run compile-web` and `npm run watch-web` and depend on the `ts-webpack` resp. `ts-webpack-watch` problem matchers.
* `.vscode/extensions.json` contains the extensions that provide the  `ts-webpack` resp. `ts-webpack-watch` problem matchers. They need to be installed for the launch configurations to work.

The generated code in [helloworld-web-sample](https://github.com/microsoft/vscode-extension-samples/tree/main/helloworld-web-sample) is very similar to what's generated by the generator.

### Webpack configuration

The webpack configuration file is automatically generated by `yo code`. It bundles the source code from your extension into a single JavaScript file to be loaded in the web extension host.

[web-extension.webpack.config.js](https://github.com/microsoft/vscode-extension-samples/blob/main/helloworld-web-sample/build/web-extension.webpack.config.js)

```js
const path = require('path');
const webpack = require('webpack');

module.exports = /** @type WebpackConfig */ {
  context: path.dirname(__dirname),
  mode: 'none', // this leaves the source code as close as possible to the original (when packaging we set this to 'production')
  target: 'webworker', // extensions run in a webworker context
  entry: {
    'extension': './src/web/extension.ts',
    'test/suite/index': './src/web/test/suite/index.ts'
  },
  resolve: {
    mainFields: ['browser', 'module', 'main'],
    extensions: ['.ts', '.js'], // support ts-files and js-files
    alias: {
    },
    fallback: {
      // Webpack 5 no longer polyfills Node.js core modules automatically.
      // see https://webpack.js.org/configuration/resolve/#resolvefallback
      // for the list of Node.js core module polyfills.
      'assert': require.resolve('assert')
    }
  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'ts-loader'
        }
      ]
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser', // provide a shim for the global `process` variable
    }),
  ],
  externals: {
    'vscode': 'commonjs vscode', // ignored because it doesn't exist
  },
  performance: {
    hints: false
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist/web'),
    libraryTarget: 'commonjs'
  },
  devtool: 'nosources-source-map' // create a source map that points to the original source file
};
```

Some important fields of `web-extension.webpack.config.js` are:

1. The `entry` field contains the main entry point into your extension and test suite.
    1. You may need to adjust this path to appropriately point to the entry point of your extension.
    2. You do not have to create another entry point if you have an existing extension, you can just point this path to the file you're using currently for `main` of your `package.json`.
    3. If you do not want to package your tests, you can omit the test suite field.
2. The `output` field indicates where the compiled file will be located.
    1. `[name]` will be replaced by the key used in `entry`. So in the generated config file it will produce `dist/web/extension.js` and `dist/web/test/suite/index.js`.
3. The `target` field indicates which type of environment the compiled JavaScript file will run. For web extensions, you want this to be `webworker`.
4. The `resolve` field contains the ability to add fallbacks for node libraries that don't work in the browser with the `fallback` field.
    1. If you're using a library like `path`, you can specify how to resolve `path` in a web compiled context. For instance, you can point to a file in the project that defines `path` with `path: path.resolve(__dirname, 'src/my-path-implementation-for-web.js')`. Or you can use the Browserify node packaged version of the library called `path-browserify` and specify `path: require.resolve('path-browserify')`.
    2. See https://webpack.js.org/configuration/resolve/#resolvefallback for the list of Node.js core module polyfills.
5. The `plugins` section uses the [DefinePlugin plugin](https://webpack.js.org/plugins/define-plugin/) to polyfills globals such as the `process` Node global.

## Test your web extension

There are currently three ways to test a web extension before publishing it to the Marketplace.

* Use VS Code running on the Desktop with the `--extensionDevelopmentKind=web` option to run your web extension in a web extension host running in VS Code.
* Use the [@vscode/test-web](https://github.com/microsoft/vscode-test-web) node module to open a browser containing VS Code Web including your extension, served from a local server.
* Sideload your extension in a running VS Code Web instance.


### Test your web extension in VS Code running on the Desktop

To use the existing extension development experience in VS Code, VS Code running on the Desktop supports running a web extension host along with the regular Node.js extension host.

Use the launch configuration provided by the **New Web Extension** generator:
```json
{
	"version": "0.2.0",
	"configurations": [
		{
			"name": "Run Web Extension in VS Code",
			"type": "pwa-extensionHost",
			"debugWebWorkerHost": true,
			"request": "launch",
			"args": [
				"--extensionDevelopmentPath=${workspaceFolder}",
				"--extensionDevelopmentKind=web"
			],
			"outFiles": [
				"${workspaceFolder}/dist/web/**/*.js"
			],
			"preLaunchTask": "npm: watch-web"
		}
  ]
}
```
It uses the task `npm: watch-web"` to compile the extension by calling `npm run watch-web`. That task is expected in `tasks.json`:
```json
{
	"version": "2.0.0",
	"tasks": [
		{
			"type": "npm",
			"script": "watch-web",
			"group": "build",
			"isBackground": true,
			"problemMatcher": [
				"$ts-webpack-watch"
			]
		}
	]
}
```

`$ts-webpack-watch` is a problem matcher that can parse the output from the Webpack tool. It is provided by the [TypeScript + Webpack Problem Matchers](https://marketplace.visualstudio.com/items?itemName=eamodio.tsl-problem-matcher) extension.

In the `[Extension Development Host]` that opens, the web extension will be available and running in a web extension host. You can verify this looking at the `Running Extensions` view (command: `Developer: Show Running Extensions`))


### Test your web extension in a browser using `@vscode/test-web`

The [@vscode/test-web](https://github.com/microsoft/vscode-test-web) node module offers APIs and a CLI to test a web extension in a browser of choice.

The `vscode-test-web` utility downloads the web bits of VS Code, starts a local server, and opens a browser (Chromium, Firefox, and Webkit) with VS Code.

If you have `@vscode/test-web` installed as development dependency you can test the web extension in a browser from the command line

```bash
npx vscode-test-web --browserType=chromium --extensionDevelopmentPath=.
```

Check the [@vscode/test-web readme](https://www.npmjs.com/package/vscode-test-web) for more CLI options:

```bash
--browserType 'chromium' | 'firefox' | 'webkit': The browser to launch
--extensionDevelopmentPath path. [Optional]: A path pointing to a extension to include.
--extensionTestsPath path.  [Optional]: A path to a test module to run
--folder-uri.  [Optional]: The folder to open VS Code on
--version. 'insiders' (Default) | 'stable' | 'sources' [Optional]
--open-devtools. Opens the dev tools  [Optional]
--headless. Whether to show the browser. Defaults to true when an extensionTestsPath is provided, otherwise false. [Optional]
```

The web bits of VS Code are downloaded to a folder `.vscode-test-web`. You want to add this to your `.gitignore` file.

### Sideloading your web extension in a running VS Code Web instance

For this scenario, you need to make the bits of the extension accessible to the service that runs VS Code.

Note: Sideloading is not supported on github.dev.


From your extension's path, start an HTTP server by running `npx serve --cors`:

```bash
$ npx serve --cors -l 5000
npx: installed 78 in 2.196s

   ┌───────────────────────────────────────────────────┐
   │                                                   │
   │   Serving!                                        │
   │                                                   │
   │   - Local:            http://localhost:5000       │
   │   - On Your Network:  http://172.19.255.26:5000   │
   │                                                   │
   │   Copied local address to clipboard!              │
   │                                                   │
   └───────────────────────────────────────────────────┘
```

Then, in another terminal:

```bash
$ npx localtunnel -p 5000
npx: installed 22 in 1.048s
your url is: https://dangerous-cat-40.loca.lt
```

Click the link returned by `localtunnel` and accept the usage terms.

Finally, in VS Code Web, run the command **Developer: Install Web Extension...** and paste the URL from above, for example, `https://dangerous-cat-40.loca.lt`.

## Web extension tests

Web extension tests are supported as well and can be implemented similar to regular extension tests. See the [Testing Extensions](/api/working-with-extensions/testing-extension) article to learn the basic structure of extension tests.

The [@vscode/test-web](https://github.com/microsoft/vscode-test-web) node module is the equivalent to [@vscode/test-electron](https://github.com/microsoft/vscode-test) (previously named `vscode-test`). It allows you to run extension tests from the command line on Chromium, Firefox, and Safari. The utility
 1. starts the VS Code Web editor from a local web server
 2. opens the specified browser
 3. runs the provided test runner script.

You can run the tests in continuous builds to ensure that the extension works on all browsers.

The test runner script is running on the web extension host with the same restrictions as the [web extension main file](#web-extension-main-file):

* All files are bundled into a single file. It should contain the test runner (for example, Mocha) and all tests (typically `*.test.ts`).
* Only `require('vscode`)` is supported.

The [webpack config](https://github.com/microsoft/vscode-extension-samples/blob/main/helloworld-web-sample/build/web-extension.webpack.config.js) that is created by the `yo code` web extension generator has a section for tests. It expects the test runner script at `./src/web/test/suite/index.ts`. The provided [test runner script](https://github.com/microsoft/vscode-extension-samples/blob/main/helloworld-web-sample/src/web/test/suite/index.ts) uses the web version of Mocha and contains Webpack-specific syntax to import all test files.

To run the web test from the command line, run the following command in the extension folder:

```bash
npx vscode-test-web --browserType=webkit --extensionDevelopmentPath=. --extensionTestsPath=dist/web/test/suite/index.js
```

(or use `npm test`)

Supported values for `browserType` are `chromium`, `firefox`, and `webkit`.

To run (and debug) extension tests in VS Code (Insiders) Desktop use the `Extension Tests in VS Code` launch configuration:
```json
{
	"version": "0.2.0",
	"configurations": [
		{
			"name": "Extension Tests in VS Code",
			"type": "extensionHost",
			"debugWebWorkerHost": true,
			"request": "launch",
			"args": [
				"--extensionDevelopmentPath=${workspaceFolder}",
				"--extensionDevelopmentKind=web",
				"--extensionTestsPath=${workspaceFolder}/dist/web/test/suite/index"
			],
			"outFiles": [
				"${workspaceFolder}/dist/web/**/*.js"
			],
			"preLaunchTask": "npm: watch-web"
		}
	]
}
```

## Publish a web extension

Web extensions are hosted on the Marketplace along with other extensions. Make sure to use the latest version of `vsce` to publish your extension. `vsce` tags all web extensions using the [rules](#web-extension-enablement) that define if an extension can run on a web extension host.

## Miscellaneous

### Web extension restrictions

As described above, web extensions are restricted by the browser runtime environment. This disqualifies extensions that depend on libraries written in other languages other than JavaScript. Invoking OS commands and forking processes are not possible.

However, some libraries can be compiled to [WebAssembly](https://webassembly.org/). The [vscode-anycode](https://github.com/microsoft/vscode-anycode) extension is an example.

WebWorkers can be used as an alternative to forking processes. We have added several language servers to run as web extensions, including the built-in [json](https://github.com/microsoft/vscode/tree/main/extensions/json-language-features), [css](https://github.com/microsoft/vscode/tree/main/extensions/css-language-features) and [html](https://github.com/microsoft/vscode/tree/main/extensions/html-language-features) language servers. The [LSP](LSP_in_web extensions) section below gives more details.

Web extensions don't have access to the operating system file system. All file operations need to go through the asynchronous vscode `workspace.fs` API.

### Update existing extensions to Web extensions

Extensions that have no code, but only contribution points (for example, themes, snippets, and basic language extensions) don't need any modification. They can run in a web extension host and can be installed from the Extensions view. Republishing is not necessary, but when publishing a new version of the extension, make sure to use the most current version of `vsce`.

Extensions with source code (defined by the `main` property) need to add the `browser` property to point to a [web extension main file](#web-extension-main-file).

 * Add a Webpack config file as shown in the [Webpack cnfiguration](#webpack_configuration) paragraph. You can also add new sections to your existing Webpack config file.
 * Add the `launch.json` and `tasks.json` files as shown above

To make sure as much code as possible can be reused, here are a few techniques:

* Separate your code in a browser part, node part and common part. In common only use code that works in both browser and node runtime. Create abstractions for functionality that has different implementations in node and browser.
* Some node modules have separate `browser` and `main` entry points and Webpack will automatically select the correct one. Example for that are [request-light](https://github.com/microsoft/node-request-light) and [vscode-nls](https://github.com/Microsoft/vscode-nls).
* Alternatively use [resolve.alias](https://webpack.js.org/configuration/resolve/#resolvealias) in the Webpack file to provide an alternative implementation for a node module.

Look out for usages of `path`, `URI.file`, `context.extensionPath`, `rootPath`. `uri.fsPath`. These will not work with virtual workspaces (non-`file`) as they are used in VS Code Web. Instead use URIs with `URI.parse`, `context.extensionUri`. The [vscode-uri](https://www.npmjs.com/package/vscode-uri) node modules provides `joinPath`, `dirName`, `baseName`, `extName`, `resolvePath`.

Look out for usages of `fs`. Replace by using vscode `workspace.fs`

It is ok to provide less functionality in the Web. Use [when clause contexts](https://code.visualstudio.com/api/references/when-clause-contexts) to control which commands, views and task are available or hidden in the Web respective in a virtual workspace.

* Use the `virtualWorkspace` context variable to find out if the current workspace is a non-file workspace.
* Use `resourceScheme` to check if the current resource is a `file` resource.
* Use `shellExecutionSupported` if there is a shell present.
Implement alternative command handles that show a dialog that explain why the command is not applicable.

### LSP in web extensions

[vscode-languageserver-node](https://github.com/Microsoft/vscode-languageserver-node) is an implementation of the language server protocol that is used as a foundation to language server implementations such as [json](https://github.com/microsoft/vscode/tree/main/extensions/json-language-features), [css](https://github.com/microsoft/vscode/tree/main/extensions/css-language-features) and [html](https://github.com/microsoft/vscode/tree/main/extensions/html-language-features).

Since 3.16.0, the client and server now also provide a browser implementation. The server can run in a web worker and the connection is based on the webworkers `postMessage` protocol.

The client for the browser can be found at 'vscode-languageclient/browser':

```typescript
import { LanguageClient } from `vscode-languageclient/browser`
```

The server at `vscode-languageserver/browser`.

The [lsp-web-extension-sample](https://github.com/microsoft/vscode-extension-samples/tree/main/lsp-web-extension-sample) shows how this works.

### Web extension enablement

Here are the complete rules used internally to decide if an extension can be enabled on a web extension host. If at least one of the conditions is fulfilled, the extension can run on the web extension host. The same rules are used in the Extensions view to decide whether an extension can be installed in VS Code Web.

* The extension manifest (`package.json`) has a `browser` entry point.
* The extension manifest has neither a `main` and `browser` entry point and does not define one of the following contribution points: `localizations`, `debuggers`, `terminal`, `typescriptServerPlugins`.
* The extension manifest has neither a `main` and `browser` entry point, but it has `web` listed in the `extensionKind` property.

Extensions that have only a `main` entry point, but no `browser` are not considered web extensions and are ignored by the web extension host.

We use the `localizations`, `debuggers`, `terminal`, or `typescriptServerPlugins` contributions as an indication that an extension is not suited for running in the web extension host. Developers can override this behavior by adding a `browser` entry point or by adding `web` to `extensionKind`.

The `extensionKind` property is optional for web. If undefined, or if it contains other values (typically an array with either `ui` and `workspace` or both), `web` is internally added based on the `main`, `browser` and `contributes` properties. If an extension is both a web and a regular extension, then the `extensionKind` property defines the order of preference if multiple extension hosts are available. It is best to leave `extensionKind` undefined unless you fully understand how `extensionKind` works.
