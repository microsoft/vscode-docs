
# Web Extensions

The original VS Code is a desktop application built on the Electron runtime. The user interface runs in a Chromium-based UI renderer, and the backend in a Node.js runtime. One of the backend processes is the extension host process, where all extensions are run. Extensions are Node.js applications, with access to the Node.js APIs and node modules.

Today, VS Code is no longer bound to Electron and Node.js. The UI can run in the browser and the backend, including the extension host, can also run in a browser.

* **VS Code Desktop**: UI in Electron, extension host in Electron-Node.js.
* **VS Code Desktop with Remote**: UI in Electron, extension host on Node.js on a remote machine. Examples: Remote SSH, GitHub Codespaces, Remote Containers, Remote WSL.
* **VS Code Web with Remote**: UI in browser, extension host on Node.js on a remote machine: Example: Web UI for GitHub Codespaces.
* **VS Code Web alone**: UI in the browser, extension host in the browser: Example: github.dev (reached by pressing `.` in GitHub **<> Code** tab).

When the extension host runs in a browser, we call it the 'web extension host'. An extension that can run in a web extension host is called a 'web extension'.

Web extensions share the same structure as regular extensions, but given the different runtime, don't run with the same code as extensions written for a Node.js runtime. Web extensions still have access to the full VS Code API, but no longer to the Node.js APIs and runtime. Instead, web extensions are restricted by the browser sandbox and are limited compared to normal extensions.

## Web extension anatomy

A web extension is [structured like a regular extension](/api/get-started/extension-anatomy). The extension manifest (`package.json`) defines the entry file with the source code and declares extension contributions.

For web extensions, the [entry file](/api/get-started/extension-anatomy#extension-entry-file) is defined by the `browser` property, and not by the `main` property as with regular extensions.

The `contributes` property works the same way for both web and regular extensions:

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

Extensions that have only a `main` entry point, but no `browser` are not web extensions. They are ignored by the web extension host and not available for download in the Extensions view.

Extensions with only declarative contributions are web extensions. They can be installed and used without any modifications by the extension author. Examples of extensions with declarative contributions include themes, grammars, and snippets.

Extensions can have both a `browser` and `main` entry point to run in browser and in Node.js backends. The properties could point to the same source file, but given the different runtime and the restrictions for web extension main files, this only works in few cases. The [Web Extension Main File](#web-extension-main-file) section describes how entry files for web extensions need to look like.

If an extension has `localizations`, `debuggers`, `terminal`, or `typescriptServerPlugins` contributions, these indicate that an extension is not suited for running in the web extension host. The extension will not be loaded and will not be available for download. Developers can override this behavior by adding a `browser` entry point or by adding `web` to `extensionKind`.

The [Web extension enablement](#web-extension-enablement) section lists the rules used to decide whether an extension can be loaded on a web extension host.

The example above is from the [helloworld-web-sample](https://github.com/microsoft/vscode-extension-samples/tree/main/helloworld-web-sample).


### Web extension main file

The web extension's main file runs in the web extension in a [Browser WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) environment. It is restricted by the browser worker sandbox and is limited compared to normal extensions running in a Node.js runtime.


* THe web extension main file is expected to be single file. Importing or requiring other modules is not supported. `importScripts` is not available as well.
* The VS Code API can be loaded via the pattern `require('vscode')`. This will work because we shim require, but this cannot be used to load additional extension files or additional npm modules. It only works with `require('vscode')`.
* Node.js globals and libraries such as `process`, `os`, `setImmediate`, `path`, `util`, `url` are not available at runtime. They can, however, be shimmed with tools like WebPack or Browserify.
* The opened workspace or folder is on a virtual file system. Accesses to the workspace need to go through `vscode.workspace.fs`.
* [Extension context](/api/references/vscode-api#ExtensionContext) locations (`ExtensionContext.extensionUri`), storage location (`ExtensionContext.storageUri`, `globalStorageUri`) are also on a virtual file system also need to go through `vscode.workspace.fs`.
* For accessing web resources, the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API must be used. Accessed resources need to support [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) (CORS)
* Creating child processes or running executables is not possible. However, web workers can be created through the [Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker) API
* As with regular extensions, the extensions activate/deactivate functions need to be exported via the pattern `exports.activate = ....`

## Develop a web extension

Thankfully, tools like TypeScript and WebPack can hide many of the runtime aspects and allows us to write web extensions the same way as regular extensions. Often both a web extension and a regular extension can be generated from the same code.

That's why the `Hello Web Extension` generated by `yo code` only differs in the build scripts.

## Create a web extension

To scaffold a new web extension, use `yo code --insiders` and pick **New Web Extension**. The extension that is created consists of the extension's source code (a command showing a hello world notification), the `package.json` manifest file, and a webpack configuration file.

* `src/web/extension.ts` is the source of the extension's entry file. It's identical to the regular hello extension.
* `package.json` is the extension manifest.
  * It points to the entry file using the `browser` property.
  * It provides scripts: `compile-web`, `watch-web` and `package-web` to run, watch and package.
* `build/web-extension.webpack.config.js` is the WebPack config file that compiles and bundles the extension sources into a single file.
* `.vscode/launch.json` contains the launch configurations that run the web extension and the tests in desktop VS Code with a web extension host (setting `extensions.webWorker` is no longer needed).

### Webpack configuration

The webpack configuration file automatically generated for you when you use `yo code` takes the source code from your extension and produces a single JavaScript file to be used in the browser.

[web-extension.webpack.config.js](https://github.com/microsoft/vscode-extension-samples/blob/main/helloworld-web-sample/build/web-extension.webpack.config.js)

Some important fields of `web-extension.webpack.config.js` are:

1. The `entry` field contains the main entry point into your extension and test suite.
    1. You may need to adjust this path to appropriately point to the entry point for your extension.
    2. You do not have to create another entry point if you have an existing extension, you can just point this path to the file you're using currently for `main` of your `package.json`.
    3. If you do not want to package your tests, you can omit out the test suite field.
2. The `output` field indicates where the compiled file will be.
    1. The number of compiled files will be one to one with the number of fields in `entry` and the `name` variable corresponds to the name from entry. So in the generated config file it will produce `dist/web/extension.js` and `dist/web/test/suite/index.js`.
3. The `target` field indicates which type of environment the compiled JavaScript file will run. For web extensions, you want this to be `webworker`.
4. The `resolve` field contains the ability to add fallbacks for node libraries with the `fallback` field.
    1. If you're using a library like `path`, you can specify how to resolve `path` in a web compiled context. You can point to a file in the project that defines `path` or you can use the Browserify node packaged version of the library called `path-browserify`.

## Test your web extension

There are currently three ways to test a web extension before publishing it to the Marketplace.

* Use the [@vscode/test-web](https://github.com/microsoft/vscode-test-web) node module to open a browser containing VS Code Web including your extension, served from a local server.
* Use VS Code Desktop with the `--extensionDevelopmentKind=web` option to run your web extension in a web extension host running in VS Code Desktop.
* Sideload your extension in a running VS Code Web instance.

### Test your web extension in a browser using `@vscode/test-web`

The [@vscode/test-web](https://github.com/microsoft/vscode-test-web) node module offers APIs and a CLI to test a web extension in a browser of choice.

The `vscode-test-web` utility downloads the web bits of VS Code, starts a local server, and opens a browser (Chromium, Firefox, and Webkit) with VS Code.

* Create a web extension `yo code --insiders -t=web`. Make sure to use the latest version of the generator-code (>= generator-code@1.5.2)

* Try the web extension in a browser:

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

### Test your web extension in VS Code Desktop

To use the existing extension development experience in VS Code, VS Code Desktop supports running a web extension host along with the regular Node.js extension host.

To open VS Code (Insiders) Desktop with your web extension running in a web extension host:

```bash
code  --extensionDevelopmentPath=$pathToExtensionFolder --extensionDevelopmentKind=web
```

or use the launch configuration provided by the **New Web Extension** generator.


### Sideloading your web extension in a running VS Code Web instance

For this scenario, you need to make the bits of the extension accessible to the service that runs VS Code.

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

Web extension tests are supported as well and can be implemented very similar to regular extension tests. See the [Testing Extensions Article](https://code.visualstudio.com/api/working-with-extensions/testing-extension) to learn the basic structure of extension tests.

The [@vscode/test-web](https://github.com/microsoft/vscode-test-web) node module is the equivalent to [@vscode/test-web](https://github.com/microsoft/vscode-test) (previously named `vscode-test`). It allows to run extension tests from the command line on Chromium, Firefox and Safari. It starts VS Code Web from a local web server, opens the specified browser and runs the provided test runner script. With that you can run the tests in continuous builds to ensure that the extension works on all browsers.

The test runner script is run on the web extension host with the same restrictions as the [web extension main file](#web-extension-main-file):
 - All bundled in a single file. It should containing the test runner (e.g. mocha) as well as all tests (typically *.test.ts)
 - Only `require('vscode`)` is supported.

The [webpack config](https://github.com/microsoft/vscode-extension-samples/blob/main/helloworld-web-sample/build/web-extension.webpack.config.js) that is generated by `yo code` web extension generator has a section for tests. It expects the test runner script at `./src/web/test/suite/index.ts`. The provided [test runner script](https://github.com/microsoft/vscode-extension-samples/blob/main/helloworld-web-sample/src/web/test/suite/index.ts) uses the web version of Mocha and contains WebPack-specific syntax to import all test files.

To run the web test from the command line run the following in the extension folder:

```bash
npx vscode-test-web --browserType=webkit --extensionDevelopmentPath=. --extensionTestsPath=dist/web/test/suite/index.js
```

(or use `npm test`)

Supported values for `browserType` are `chromium`, `firefox`, and `webkit`.

To run (and debug) extension tests in VS Code (Insiders) Desktop:

```bash
code-insiders --extensionDevelopmentPath=$pathToExtensionFolder --extensionTestsPath=$pathToExtensionTests --extensionDevelopmentKind=web
```

or use the launch configuration provided by the **New Web Extension** generator.

## Publish a web extension

Web extensions are hosted on the Marketplace along with other extensions. Make sure to use the latest version of `vsce` to publish your extension. `vsce` tags all web extension using the [rules](#web-extension-enablement) that define if an extension can run on a web extension host.

## Miscellaneous

### Web extension restrictions

As described above, web extensions are restricted by the browser runtime environment. This disqualifies extensions that depend on libraries written in other languages other than JavaScript. Invoking OS commands and forking processes are not possible.

However, some libraries can be recombined to [WebAssembly](https://webassembly.org/). [vscode-anycode](https://github.com/microsoft/vscode-anycode) is an example as that.

WebWorkers can be used an alternative to forking processes. We have ported several language servers to run as web extensions, including the built-in [json](https://github.com/microsoft/vscode/tree/main/extensions/json-language-features), [css](https://github.com/microsoft/vscode/tree/main/extensions/css-language-features) and [html](https://github.com/microsoft/vscode/tree/main/extensions/html-language-features) language servers. The paragraph below gives more details.

Web Extensions don't have access to the operating system file system. All file operations need to go through the asynchronous vscode `workspace.fs` API.

### Web extension candidates

Extensions that are well suited to be web extensions:

* Basic language extension:
  * TextMate tokenization and colorization
  * Language-specific editing support: bracket pairs, comments, on enter rules, folding markers
  * Snippets
* Color and icon themes
* Language extensions that provide single-file language support, depending in the currently open document:
  * Document symbols (outline), folding, selection ranges
  * Document highlights, semantic highlighting, document colors
  * Completions, hovers, signature help, find references/declarations based on symbols on the current file and on static language libraries
  * Formatting, linked editing
  * Syntax validation and same-file semantic validation and code actions
* extensions that work on the currently open document
  * visualizations (for example bracket colorizers, code smartness)

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

The `extensionKind` property is optional for web. If undefined, or if it contains other values (typically an array with either `ui` and `workspace` or both), `web` is internally added based on the `main`, `browser` and `contributes` properties. If an extension is both a web and a regular extension, then the `extensionKind` property defines the order of preference if multiple extension hosts are available. It is best to leave `extensionKind` undefined unless you fully understand how `extensionKind` works.
