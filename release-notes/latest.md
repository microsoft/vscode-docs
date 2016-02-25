---
Order: 1
TOCTitle: Latest
PageTitle: Visual Studio Code February 0.10.10
MetaDescription: See what is new in the Visual Studio Code February Release (0.10.10)
---

# 0.10.10 (February 2016)

February is our last full iteration before we start the end game for the Build 2016 milestone at the end of March. It comes with many improvements:
- Salsa is now the default JavaScript language service.
- Folding, the most requested feature, is now available.
- There is support for localization and accessiblity.

In addition, we continued to listen to your issues and feature requests.

## Languages - JavaScript

The [Salsa](https://github.com/Microsoft/TypeScript/issues/4789) JavaScript language service was available as preview in January and it is now the default language service for JavaScript in the February update. 

### Changes
These are the changes that you must be aware of and that you should review and act accordingly.

#### Install and configure a linter
The existing JavaScript language support provided some linting options that could be enabled by the `javascript.validate.lint.*` settings. With `jshint` and `eslint` there are powerful linters for JavaScript available. Also, there are now extensions for VS Code available that integrate these linters. Therefore, we have decided to deprecate the built-in linter and Salsa now reports **syntax errors only**. We therefore strongly recommend that you install and configure a JavaScript linter if your project hasn't done so already. 

In particular, the existing JavaScript infrastructure provided an implicit 'lint rule' which warned about undeclared variables unless they are mentioned in a /\*global\*/ comment block. This implicit 'lint rule' is no longer active and needs to be configured in your linter of choice. 

Here are the steps to setup `eslint`:
- `npm install -g eslint`
- install the VS Code [eslint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).
- use `eslint --init` to create an initial eslint configuration by answering questions or by picking a popular configuration. 

**Tip** If you use JSON as the format of the eslint config file, then VS Code can provide you with Intellisense when you edit the file.

Notice, if you answer `yes` to "Do you use React", then the setting `experimentalObjectRestSpread` is enabled. Support for ObjectRestSpread is not yet provided by Salsa (see [#2103](https://github.com/Microsoft/TypeScript/issues/2103)).

Finally, this [.eslintrc.json](https://gist.github.com/egamma/65c0e2a832393e3b625a) corresponds roughly to the lint settings of the old JavaScript infrastructure.

#### Review and update the `exclude` lists in the `jsconfig.json`
The existing JavaScript language service had a built-in list for folders that should be excluded from the project context. This list included the folders: `node_modules`, `bower_components`, `jspm_packages`, `tmp`, and `temp`. This implicit behaviour has been changed in favor of an explicit list defined by the user. Therefore if you use...
- `node` exclude the `node_modules` folder
- `bower` exclude the `bower_components` folder
- `ember` exclude the `tmp` and `temp` folder
- `jspm` exclude the `jspm_packages` folder
- `webpack` then exclude the output folder, e.g., `dist`.

*Tip* After editing the `jsconfig.json` do not forget to run the `Reload JavaScript` command to ensure that everything is up to date. 

#### Changed default values in `jsconfig.json`
If you do not have a `jsconfig.json` defined in your workspace then the following defaults are used:
- the `module` attribute is `commonjs`
- the `exclude` list includes the `node_modules` folder and the folder defined by the `out` attribute.

#### Uninstall the `js-is-jsx` extension
If you have installed the `js-is-jsx` extension to get syntax coloring for JSX constructs inside JavaScript files, then please uninstall this extension. It is no longer needed and you get coloring for JSX constructs inside `.js` files out of the box.

#### No longer supported
Salsa undoubtedly provides a much better experience writing JavaScript applications in VS Code. By moving to Salsa, we give up a few features previously available with our old JavaScript language service:
- the source language level is now always ECMAScript 6. Previously there was support to define a lower level using the `target` attribute inside `jsconfig.json`. This support has been removed and the `target` attribute is now only used by `tsc` to define the target version when a JavaScript file is compiled to a lower ECMAScript version.
- The existing JavaScript infrastructure attempted to resolve references for `AMD` modules. This hasn't worked in all cases and support for `AMD` to resolve references across files is currently no longer supported.
- There is no longer support for Intellisense in `script` sections inside HTML documents.
- The `javascript.validate.*` settings are no longer supported and are ignored (see above).

### Salsa Improvements
These are the great improvements you get from Salsa.

The JSDoc comment format is now understood and used to improve IntelliSense proposals and parameter hints:

![JSDoc comment format](images/January/jsdoc.png)

You now get IntelliSense proposals for properties in 'ECMAScript 3 style classes':

![ES3 style classes](images/January/es3-classes.png)

IntelliSense offers both *inferred* proposals and the global identifiers of the project. The inferred symbols are presented first, followed by the global identifiers (with the document icon), as you can see in the image above.

The `commonjs` support has been improved as well:

![commonjs support](images/January/salsa-commonjs.png)

There is now support for JSX/React:

![React/JSX Support](images/January/jsx-salsa.png)

>**Tip:** To get IntelliSense for React/JSX, install the typings for `react-global` by running `tsd install react-global` or `typings install --ambient react-global` from the terminal.

There is now support for ReactNative:

![React/JSX Support](images/February/react-native.png)

>**Tip:** To get IntelliSense for ReactNative, install the typings for `react-native` by running `tsd install react-native` or `typings install --ambient react-native` from the terminal. Or even better... or if you also want 
debugging support then install the preview of the [ReactNative extension](https://marketplace.visualstudio.com/items?itemName=vsmobile.vscode-react-native).

It is now possible to have mixed TypeScript and JavaScript projects. To enable JavaScript inside a TypeScript project, you can set the `allowJs` property to `true` in the `tsconfig.json`.

>**Tip:** The `tsc` compiler does not detect the presence of a `jsconfig.json` file automatically. Use the `–p` argument to make `tsc` use your `jsconfig.json` file, e.g. `tsc -p jsconfig.json`.

Finally, the TypeScript compiler `tsc` can down-level compile JavaScript files from ES6 to another language level.

## Languages - TypeScript
Code now ships with the latest TypeScript 1.8.2 version.

## Editor

### Indentation
TODO@Isidor

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

### Function Breakpoints
TODO@Isidor

### Improved Accessibility
TODO@Isidor

### Pre Launch Task Improvements
TODO@Isidor


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
