---
Order: 1
TOCTitle: Latest
PageTitle: Visual Studio Code February 0.10.10
MetaDescription: See what is new in the Visual Studio Code February Release (0.10.10)
---

# 0.10.10 (February 2016)

** TO DO **

## JavaScript - Salsa

The JavaScript language service in VS Code has always been powered by TypeScript. We are now migrating to a new JavaScript language service implementation called [Salsa](https://github.com/Microsoft/TypeScript/issues/4789). Salsa will become available with TypeScript 1.8 but for the January update, we are providing way to preview Salsa in VS Code.

### Salsa Improvements

Salsa provides important improvements over the existing JavaScript language service.

The JSDoc comment format is now understood and used to improve IntelliSense proposals and parameter hints:

![JSDoc comment format](images/January/jsdoc.png)

You now get IntelliSense proposals for properties in 'ECMAScript 3 style classes':

![ES3 style classes](images/January/es3-classes.png)

IntelliSense offers both *inferred* proposals and the global identifiers of the project. The inferred symbols are presented first, followed by the global identifiers (with the document icon), as you can see in the image above.

The `commonjs` support has been improved as well:

![commonjs support](images/January/salsa-commonjs.png)

>**Tip:** When using `commonjs`, exclude the `node_modules` folder using the `exclude` property in `jsconfig.json`. This is due to [issue 6673](https://github.com/Microsoft/TypeScript/issues/6673) which is fixed but not yet in `typescript@next`.

There is now support for JSX:

![JSX Support](images/January/jsx-salsa.png)

>**Tip:** To get IntelliSense for React/JSX, install the typings for `react-global` by running `tsd install react-global` from the terminal.

Salsa also understands JSX constructs inside JavaScript (`.js`) files to support React Native development. We haven't updated the grammar for `.js` files yet but you can enable JSX syntax coloring for JS using the [`js-is-jsx` extension](https://marketplace.visualstudio.com/items?itemName=eg2.js-is-jsx). This extension tell VS Code to treat `.js` files as `.jsx` files so that the JSX syntax coloring is used.

It is now possible to have mixed TypeScript and JavaScript projects. To enable JavaScript inside a TypeScript project, you can set the `allowJs` property to `true` in the `tsconfig.json`.

>**Tip:** The `tsc` compiler does not detect the presence of a `jsconfig.json` file automatically. Use the `–p` argument to make `tsc` use your `jsconfig.json` file, e.g. `tsc -p jsconfig.json`.

Finally, the TypeScript compiler `tsc` can down-level compile JavaScript files from ES6 to another language level.

### Changes from the existing VS Code JavaScript support

Salsa will undoubtedly provide a much better experience writing JavaScript applications in VS Code. By moving to this new service, we give up a few features previously available with our custom JavaScript language service.

* When using Salsa, the language level is always ECMAScript 6. In the existing JavaScript language service, the default level was ES6 but there was support to define a lower level using the `target` attribute inside `jsconfig.json`. This support has been removed and the `target` attribute is now only used by `tsc` to define the target version when a JavaScript file is compiled to a lower ECMAScript version.
* The existing JavaScript language service implicitly excluded some folders from the project, see the [JavaScript topic](/docs/languages/javascript.md#javascript-projects-jsconfigjson). This is no longer the case and you must exclude these folders explicitly in your `jsconfig.json` file.
* Salsa flags syntax errors but the JavaScript linting options `javascript.validate.lint.*` defined in the user settings are no longer supported. To get these linting options back, we recommend that you use a linter combined with a VS Code linter extension like [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) or [JSHint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.jshint).
* Salsa doesn't support the `AMD` module system.


## Editor

### Item

bla

## Workbench

### Item

bla

## Debugging

### VS Code no longer 'fixes' Relative Paths in Launch Configurations

In the January milestone we've deprectated the use of relative paths in launch configurations (but still continued to convert relative in absolute paths).
With this milestone we've dropped this 'automagical' fixing in favor of a more transparent strategy: VS Code does not modify launch configuration paths in any way when sending them to the debug adapter. This is now in line with treatment of paths in task configurations.

If you haven't already fixed your launch configuration paths for the January release, then you will now see this (or similar) errors when starting a debug session:

![install-mono-debug-help](images/February/relative-path-error.png)

Just prefixing the relative path with a `${workspaceRoot}/` should fix the problem.

## Node.js Debugging

### Support for 'nodemon' Development Setup

The VS Code node debugger now supports an automatic restart mode for the 'attach' launch configuration.
This feature is useful if you use `nodemon` to restart node.js on file changes.
Setting the launch config attribute `restart` to `true` makes node-debug automatically try to re-attach to node.js after a debug session has ended.

On the command line start your node program `server.js`:

```shell
nodemon --debug server.js
```

In VS Code create an 'attach' launch config:

```json
{
    "name": "Attach",
    "type": "node",
    "request": "attach",
    "port": 5858,
    "restart": true
}
```

>**Tip:** Pressing the Stop button stops the debug session and disconnects from node, but nodemon (and node) will continue to run. So to stop nodemon you will have to kill it from the command line.

>**Tip:** In case of (temporary) syntax errors, nodemon will not be able to start node.js successfully until the error has been fixed. In this case VS Code will continue trying to attach to node.js but eventually give up (after 10 seconds). To avoid this you can increase the timeout by adding a `timeout` attribute with a larger value (in milli seconds).

## Mono debugging

### Mono Debugging is now an Optional Install

Since C# support in VS Code has been turned into an optional install, we have done the same with the Mono debugger.
The Mono debugger has now become ['Mono Debug'](https://marketplace.visualstudio.com/items?itemName=ms-vscode.mono-debug) on the Visual Studio Marketplace.

You can either install Mono Debug with the VS Code 'Install Extension' command or if you already have a Mono based project with a mono launch configuration simply by starting a debug session. VS Code will then suggest to download and install Mono Debug automatically:

![install-mono-debug-help](images/February/mono-debug-install.png)


## Tasks Support

The `tasks.json` editor now has snippet support to insert common tasks commands. As a result, a fresh `tasks.json` is an empty file with IntelliSense populated. No longer will you need to comment and uncomment prefilled of sections.

![tasks.json](images/February/tasks-json.png)

## Localization

Support has been added to localize package.json files for extensions and CommonJS code. For localizing CommonJS code, we publish a new npm module `vscode-nls` which helps you create external localized strings.

## Linux Debian Package

A .deb package is now provided for easier installation on Debian-based distributions. To install simply download the .deb package from the [home page](code.visualstudio.com) and either double click to install through a GUI or install it via the command line with:

```bash
sudo dpkg -i vscode-amb64.deb
```

## Extension Authoring

### Opt out for telemetry

User's now have the option of optting out of usage telemetry, for more information <LINK TO THE DOCS>.

### Item

bla

## Notable Bug Fixes

* [999](https://github.com/Microsoft/vscode/issues/999): Issue Title

## Thank You

We received many contributions from the community that helped to make VS Code better.

A big Thank You goes out to:

**TO DO**
