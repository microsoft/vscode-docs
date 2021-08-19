
# Web Extensions

The original VS Code is a desktop application built on the Electron runtime. The user interface runs in a Chromium-based UI renderer, and the backend in a Node.js runtime. One of the backend processes is the extension host process, where all extensions are run. Extensions are Node.js applications, with access to the Node.js APIs and node modules.

Today, VS Code is no longer bound to Electron and Node.js. The UI can run in the browser and the backend, including the extension host, can also run in a browser.


- **VS Code Desktop**: UI in Electron, extension host in Electron-Node.js.
- **VS Code Desktop Remote**: UI in Electron, extension host on Node.js on a remote machine. Examples: Remote SSH, Codespaces, Remote Containers, Remote WSL
- **VS Code Web with Remote**: UI in Browser, extension host on Node.js on a remote machine: Example: Web UI for Codespaces
- **VS Code Browser: UI in Browser**: Extension host in the browser: Example: github.dev (reached by pressing `.` in GitHub Code tab.)

When the extension host runs in a browser, we call it the 'web extension host'. An extension that can run in a web extension host is called a 'web extension'.

Web extensions share the same structure as regular extensions, but given the different runtime, don't run with the same code as extensions written for a Node.js runtime. Web extension still have access to the full VS Code API, but no longer to node APIs and runtime. Instead, they are restricted by the browser sandbox. Consequently, web extensions are limited compared to normal extension.

## Web Extension Anatomy

A web extension is [structured like a regular extension](/api/get-started/extension-anatomy). The extension manifest (`package.json`) defines the entry file with the source code and declares extension contributions.

For web extensions, the [entry file](/api/get-started/extension-anatomy#extension-entry-file) is defined by the `browser` property, and not by the `main` property as with regular extensions.


The `contributes` property works the same way for both web and regular extensions.
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

Extensions that have only a `main` entry point, but no `browser` are not web extensions. They are ignored by the web extension host and not available for download in the extensions viewlet.

Extensions with only declarative contributions are web extensions. They can be installed and used without any adoption needed by web authors. This includes themes, grammars and snippets extensions.

Extensions can have a both `browser` and `main` and run in browser and in node backends. The properties could point to the same source file, but given the different runtime and the restrictions for web extension main files, this only works in few cases . The [Web Extension Main File](#Web_Extension_Main_File) section describes how entry files for web extensions need to look like.

If an extension has a `localizations`, `debuggers`, `terminal` or `typescriptServerPlugins` contribution , we use that as indication that an extension is not suited for web extension hosts.
The extension will again not be loaded and not available for download.
Developers can override this by adding a `browser` entry point or by adding `web` to `extensionKind`.

The [Web Extension Enablement](#web-extension-enablement) section lists the rules used to decide whether an extension can be loaded on a web extension host.

### Web Extension Main File

At runtime, a web extension's entry file is invoked in a WebWorker.

- the extensions activate/deactivate functions need to be exported via the pattern `exports.activate = ....`
- web extensions are expected to be single file: Importing or requiring other modules is not supported. Also `importScripts` is also unavailable.
- the vscode API can be loaded via the pattern `require('vscode')`. This will work because we shim require, but this cannot be used to load additional extension files or additional npm modules. It only works to use `require('vscode')`.

- node globals and libraries such as `process`, `os`, `setImmediate`, `path`, `util`, `url` are not available at runtime. They can, however, be shimmed with tools like WebPack or Browserify.
- the opened workspace or folder are on a virtual file system. Accesses to the workspace need to go through `vscode.workspace.fs`.
- extension locations (`ExtensionContext.extensionUri`), storage location (`ExtensionContext.storageUri`, `globalStorageUri`) are also on a virtual file system also need to go through `vscode.workspace.fs`.
- for accessing web resources, the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API must be used. Accessed resources need to support [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) (CORS)
- creating child processes or running executables is not possible. However, web workers can be created through the [Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker) API


## Develop a Web Extension

Thankfully, tools like TypeScript and WebPack can hide many of the runtime aspects and allows us to write web extensions the same way as regular extensions. Often both a web extension and a regular extension can be generated form the same code.

That's why the `Hello Web Extension` generated by `yo code` only differs in the build scripts.

## Create a Web Extension

To scaffold a new web extension use `yo code --insiders` and pick `New Web Extension`.
The extension that is created consists of the extension's source code (a command showing a hello world notification), the `package.json` manifest file and a webpack configuration file.
* `src/web/extension.ts` is the source of the extension's entry file. It's identical to the regular hello extension
* `package.json` is the extension manifest.
  * It points to the entry file using the `browser` property.
  * It provides scripts: `compile-web`, `watch-web` and `package-web` to run, watch and package.
* `build/web-extension.webpack.config.js` is the WebPack config file that compiles and bundles the extension sources into a single file.
* `.vscode/launch.json` contains the launch configurations that run the web extension and the tests in desktop VS Code with a web extension host (setting `extensions.webWorker` is no longer needed)

### Webpack Configuration

The webpack configuration file automatically generated for you when you use `yo code` takes the source code from your extension and produces a single JavaScript file to be used in the browser.

Some important fields of `web-extension.webpack.config.js` are:

1. The `entry` field contains the main entry point into your extension and test suite.
    1. You may need to adjust this path to appropriately point to the entry point for your extension.
    2. You do not have to create another entry point if you have an existing extension, you can just point this path to the file you're using currently for `main` of your `package.json`.
    3. If you do not want to package your tests you can omit out the test suite field.
2. The `output` field indicates where the compiled file will be.
    1. The number of compiled files will be one to one with the number of fields in `entry` and the `name` variable corresponds to the name from entry. So in the generated config file it will produce `dist/web/extension.js` and `dist/web/test/suite/index.js`.
3. The `target` field indicates which type of environment the compiled JavaScript file will run. For web extensions you want this to be `webworker`.
4. The `resolve` field contains the ability to add fallbacks for node libraries with the `fallback` field.
    1. If you're using a library like `path`, you can specify how to resolve `path` in a web compiled context. You can point to a file in the project that defines `path` or you can use the Browserify node packaged version of the library called `path-browserify`.

## Test your Web Extension

We currently offer 3 ways to test a web extension before publishing it to the Marketplace.

- Use the [vscode-test-web](https://github.com/microsoft/vscode-test-web) node module to open a browser containing VS Code Browser including your extension, served from a local server
- Use VS Code Desktop with the `--extensionDevelopmentKind=web` option to run your web extension in a web extension host running in VS Code Desktop
- Sideload your extension in a running VS Code Browser service

### Test your web extension in a browser using `vscode-test-web`

The [vscode-test-web](https://github.com/microsoft/vscode-test-web) node module offers APIs and a CLI to test a web extension in a browser of choice.

It downloads the web bits of VS Code, starts a local server and opens a browser (Chromium, Firefox and Webkit) with VS Code.

- create a web extension `yo code --insiders -t=web`. Make sure to use the latest version of the generator-code (>= generator-code@1.5.2)

- try the web extension a in browser:
```
npx vscode-test-web --browserType=chromium --extensionDevelopmentPath=.
```

- run web extension test in a browser:
```
npx vscode-test-web --browserType=webkit --extensionDevelopmentPath=. --extensionTestsPath=dist/web/test/suite/index.js
```
(or use `npm test`)

Check the [vscode-test-web readme](https://www.npmjs.com/package/vscode-test-web) for more CLI options:
```
--browserType 'chromium' | 'firefox' | 'webkit': The browser to launch
--extensionDevelopmentPath path. [Optional]: A path pointing to a extension to include.
--extensionTestsPath path.  [Optional]: A path to a test module to run
--folder-uri.  [Optional]: The folder to open VS Code on
--version. 'insiders' (Default) | 'stable' | 'sources' [Optional]
--open-devtools. Opens the dev tools  [Optional]
--headless. Whether to show the browser. Defaults to true when an extensionTestsPath is provided, otherwise false. [Optional]
```

https://github.com/microsoft/vscode-internalbacklog/issues/2232 has the launch configuration to directly debug in the Browser (still work in progress)

![Debugging Web Extension Tests](https://github.com/microsoft/vscode-internalbacklog/raw/main/internal-release-notes/serverless-release-notes/images/1_58/debugging-web-in-browser.png)


### Test your web extension in VS Code Desktop

To leverage the existing extension development experience in VS Code, VS Code Desktop supports running a web extension host along with the regular Node extension host.

To open VS Code (Insiders) Desktop with your web extension running in a web extension host:
```
code  --extensionDevelopmentPath=$pathToExtensionFolder --extensionDevelopmentKind=web
```
or use the launch configuration provided by the `New Web Extension` generator.

To run extension tests in VS Code (Insiders) Desktop:

```sh
code-insiders --extensionDevelopmentPath=$pathToExtensionFolder --extensionTestsPath=$pathToExtensionTests --extensionDevelopmentKind=web
```
or use the launch configuration provided by the `New Web Extension` generator.


### Sideloading your web extension in a running VS Code Browser service

For that you need to make the bits of the extension accessible to the service that runs VS Code.

From your extension's path, start an HTTP server by running `npx serve --cors`:

```
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

```
$ npx localtunnel -p 5000
npx: installed 22 in 1.048s
your url is: https://dangerous-cat-40.loca.lt
```

Click the link returned by `localtunnel`, to accept the usage terms.

Finally, in VS Code Browser run the command `F1 > Developer: Install Web Extension...` and paste the URL from above, eg `https://dangerous-cat-40.loca.lt`.

## Web Extension Deployment

Web extensions are hosted on the Marketplace amongst the regular extensions. Make sure to use the latest version of `vsce` to publish your extension. `vsce` tags all web extension using the [rules](#web-extension-enablement) that define if an extension can run on a web extension host.


## Miscellaneous 

### Web Extension Restrictions

As described above, web extensions are restricted by the browser runtime environment. This disqualifies extensions that depend on libraries written in other languages other than JavaScript. Invoking OS commands and forking processes are not possible.

However, some libraries can be recombined to [WebAssembly](https://webassembly.org/). [vscode-anycode](https://github.com/microsoft/vscode-anycode) is an example as that.

WebWorkers can be used an alternative to forking processes. We have ported several language servers to run as web extensions, including the built-in [json](https://github.com/microsoft/vscode/tree/main/extensions/json-language-features), [css](https://github.com/microsoft/vscode/tree/main/extensions/css-language-features) and [html](https://github.com/microsoft/vscode/tree/main/extensions/html-language-features) language servers. The paragraph below gives more details.

Web Extensions don't have access to OS'es file system. All file operations need to go through the asynchronous vscode workspace.fs API.

### Web Extension Candidates

Extensions that are well suited to be implemented as web extensions:
- basic language extension:
  - TextMate tokenization and colorization,
  - language specific editing support: bracket pairs, comments, on enter rules, folding markers
  - snippets Snippets
- color and icon themes
- language extensions that provide single-file language support, depending in the currently open document:
  - document symbols (outline), folding, selection ranges
  - document highlights, semantic highlighting, document colors
  - completions, hovers, signature help, find references/declarations based on symbols on the current file and on static language libraries
  - formatting, linked editing
  - syntax validation and same-file semantic validation and code actions
- extensions that work on the currently open document
  - visualizations (e.g. bracket colorizers, code smartness

### LSP in web extensions

[vscode-languageserver-node](https://github.com/Microsoft/vscode-languageserver-node) is an implementation of the language server protocol that is used as a foundation to language server implementations such as [json](https://github.com/microsoft/vscode/tree/main/extensions/json-language-features), [css](https://github.com/microsoft/vscode/tree/main/extensions/css-language-features) and [html](https://github.com/microsoft/vscode/tree/main/extensions/html-language-features).

Since 3.16.0, the client and server now also provide a browser implementation. The server can run in a web worker and the connection is based on the webworkers `postMessage` protocol.

The client for the browser can be found at 'vscode-languageclient/browser':

```
import { LanguageClient } from `vscode-languageclient/browser`
```

The server at `vscode-languageserver/browser`.


The [lsp-web-extension-sample](https://github.com/microsoft/vscode-extension-samples/tree/main/lsp-web-extension-sample) shows how this works.


### Web Extension Enablement

Here are complete rules we internally use to decide if an extension can be enabled on a web extension host. If at least one of the conditions is fulfilled, the extension can run on the web extension host. The same rules are used in the extension viewlet to decide whether an extension can be installed in VS Code Browser.
- extension manifest (`package.json`) has a `browser` entry point
- extension manifest has neither a `main` and `browser` entry point and does not define one of the following contribution points: `localizations`, `debuggers`, `terminal`, `typescriptServerPlugins`
- extension manifest has neither a `main` and `browser` entry point, but it has `web` listed in the `extensionKind` property


Extensions that have only a `main` entry point, but no `browser` are not considered web extensions and are ignored by the web extension host.

The `extensionKind` property is optional for web. If undefined, or if it contains other values (typically an array with either `ui` and `workspace` or both), `web` is internally added based on the `main`, `browser` and `contributes` properties.
If an extension is both a web and a regular extension, then the `extensionKind` property defines the order of preference if multiple
extension hosts are available.
It is recommended to leave `extensionKind` undefined unless you fully understand how `extensionKind` works.
