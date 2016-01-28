---
Order: 1
TOCTitle: Latest
PageTitle: Visual Studio Code January 0.10.7
MetaDescription: See what is new in the Visual Studio Code January Release (0.10.7)
---

# 0.10.7 (January 2016)

Hi,

TO DO

These release notes only capture what's new in the core of Visual Studio Code. Do not forget to check out the [marketplace](https://marketplace.visualstudio.com/#VSCode) for new extensions.

## Editor

### Ligatures for Code

VS Code now supports fonts with programming ligatures, like [Hasklig](https://github.com/i-tu/Hasklig) and [Fira Code](https://github.com/tonsky/FiraCode). Those fonts provide compositions for character sequences commonly used
in programming, as `=>`, `>=`, `!=` etc. Enable ligatures with new `editor.fontLigatures`-setting and pick a font with programming ligatures. Special thanks to [@mattblagden](https://github.com/mattblagden) for initiating this.

![Ligatures for Code](images/January/editor-ligatures.png)


### Auto Save

VS Code always supported automatically saving dirty files after one second (`File | Auto Save`). We received a lot of feedback that users want more control over
when VS Code should save dirty files. The setting is now in the `settings.json` configuration file and provides more options:

* `files.autoSave`: Can be `off` to disable auto save, `afterDelay` to save files after a configured delay and `onFocusChange` to save files when focus moves out of the editor of the dirty file.
* `files.autoSaveDelay`: Configures the delay in milliseconds when `files.autoSave` is configured to `afterDelay`.
* This setting can be configured either globally for the user or per workspace through the workspace settings (`Preferences | Workspace Settings`).

**Note:** If you had auto save enabled previously, we will migrate your setting into the `settings.json` file automatically.

**Note:**: You will not see any dirty indicators in the UI if you configure auto save for 1s or below. In all other cases you will see the dirty indicators throughout the UI.

### File Picker

Some useful changes around the file picker (`kb(workbench.action.quickOpen)`) include:

* Fuzzy matching is now enabled by default and the previously introduced setting `filePicker.alternateFileNameMatching` is no longer needed.
* You can open any file (including line/column pattern at the end) that exists on disk by typing the full path or full workspace relative path even if your exclude settings hide it otherwise.

### Keyboard Accessibility

You will find that VS Code provides an exhaustive list of commands in the Command Palette (`kb(workbench.action.showCommands)`) so that you can operate VS Code without using the mouse. However, some parts of the UI could not be operated without using the mouse. We made a pass over these locations and added support to use the `Tab` key to jump between UI controls that you can interact with. Using `Tab` or `Shift-Tab` to jump between elements with actions in the UI is a very common pattern for keyboard accessibility. In addition to that, we now also draw an indicator around the UI element once the element gains focus.

Some areas where you can now jump to using keyboard only:

* View switcher
* Header of collapsible sections in a view to expand/collapse
* Actions in views and sections
* Actions for items in the tree

This is just the beginning of our journey to become more keyboard accessible, expect more areas to follow in the future!

### Hide the Menu Bar (Windows, Linux)

We added a new action to hide the menu bar on Windows and Linux (`View | Toggle Menu Bar`). You can still access the menu pressing the `Alt` key.

## JavaScript - Salsa Preview

The JavaScript language service in VS Code has always been powered by TypeScript. We are now
migrating to a new JavaScript language service implementation with the code name [Salsa](https://github.com/Microsoft/TypeScript/issues/4789).
Salsa will become available with TypeScript 1.8.
For the January update we provide a preview option of VS Code using Salsa.
We hope that you will enable the option, give Salsa a try and provide feedback.

### Salsa Improvements
Salsa provides several improvements over the existing JavaScript language service.

The JsDoc comment format is now understood and used to improve Intellisense proposals, paramter hints/signature help:

![JsDoc comment format](images/January/jsdoc.png)

You now get Intellisense proposals for properties in 'ECMAScript 3 style classes':

![ES3 style classes](images/January/es3-classes.png)

IntelliSense offers both inferred proposals and the global identifiers of the project. The inferred symbols are presented first,
followed by the global identifiers (with the document icon), see the image above. 

There is now support for JSX:

![JSX Support](images/January/jsx-salsa.png)

It is now possible to have mixed TypeScript and JavaScript projects. To enable a JavaScript inside a TypeScript project you can set the `allowJs` property to `true` in the `tsconfig.json`.

The TypeScript compiler `tsc` can downlevel compile JavaScript files from ES6 to another language level.

### Changes from the existing JavaScript support

- The language level is always ES6. In the existing JavaScript language service the default
level was ES6 but there was support to define a lower level using the `target` attribute inside the `jsconfig.json`. This support has been removed
and the `target` attribute is now only used by `tsc` to define the target version when a JavaScript file is compiled to a
lower ECMAScript version.
- The existing JavaScript language service implicitly excluded some folders from the project, see the [doc](https://code.visualstudio.com/docs/languages/javascript#_javascript-projects-jsconfigjson). This
is no longer the case and you must exclude these folders explicitly in your `jsconfig.json` file. 
- Salsa flags syntax errors but the JavaScript linting options `javascript.validate.lint.*` defined in the user settings are no longer supported. To get these linting options back we recommend that you use a linter
combined with a VSCode linter extension like [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) or [jshint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.jshint).
- Salsa doesn't support the `AMD` module system, `commonjs` is supported.

### Enabling Salsa
To enable Salsa for your workspace:
- Set the environment variable `CODE_TSJS`. On OS X it is recommended to change this in the `.bash_profile` using `export CODE_TSJS=1`, then the 
environment variable isn't "lost".
- Salsa requires TypeScript 1.8 but the final 1.8 release isn't available yet. Therefore you need to install the nightly TypeScript build either locally
`npm install typescript@next` or globally `npm install -g typescript@next`. 
- Define the `typescript.tsdk` setting with the path to the `lib` folder containing the `tsserver.js` file of the installed typescript module. An an alternative you 
can install the Typescript module locally inside the workspace, then the `typescript.sdk` setting is not needed and VS Code uses this TypeScript version.

You can verify that you have Salsa enabled and you have a TypeScript version installed that supports Salsa by checking the status indicator in the status bar. 
This shows that all is OK.

![Salsa status](images/January/salsa-status.png)

When the TypeScript version doesn't support Salsa then you see the indicator below. When you hover over the status indicator you see the path to the TypeScript 
installation that you have configured.

![Salsa status failure](images/January/salsa-status-failure.png)


### Tips/Known Issues
- When using `commonjs` always exclude the `node_modules` using the `exclude` property. 
- To get Intellisense for React/JSX install the typings for `react-global` using `tsd install react-global`.
- The final TypeScript 1.8 version will support JSX constructs inside .js. Until the final version is available, you can
install the `js-is-jsx` [extension](https://marketplace.visualstudio.com/items?itemName=eg2.js-is-jsx). This extension defines that .js files are treated as .jsx files.

## Workbench

### Horizontal panel
We have introduced a horizontal panel in the workbench. To gain more horizontal space, the output and debug consoles are now shown in the horizontal panel.
![output](images/January/output.png)

## Debugging

### Rich Object Hover

We are now using a tree widget in the debug hover to allow better rich object inspection.

![debug hover](images/January/debug-hover.png)

### Conditional Breakpoints

We now support adding conditions to breakpoints such that they will be only hit if the specified condition is true. In order for the condition to be taken into account the underlying debug adapter has to support conditional breakpoints (node does).

![conditional breakpoints](images/January/conditional-breakpoints.png)

### Changed Variable Indication

We now indicate in the debug and watch view what variables have changed values between step events.

![variables change](images/January/variables-change.png)

## Node.js Debugging

### Source Maps with Inlined Source

Node.js debugging now supports source maps with "inlined source" (in addition to "inlined source maps" which were already supported).
To avoid confusion, here is a brief explanation of these two source map options. "Inlined source" and "inlined source maps" are orthogonal features (and VS Code supports both either alone or in combination):

* *inlined source maps:* The contents of the source map does not live in a file but is a data URL at the end of the generated file.
* *inlined source:* The contents of the original source file does not live in a file but is included in the source map.

The strategy for which situations VS Code will use "inlined source" is as follows:

* VS Code always tries to locate the source on disk first.
* If it cannot find the source (e.g. because there is none in the VS Code workspace or because the paths in the source maps are broken), VS Code will use the "inlined source" if available.
* If there is no inlined source, VS Code will fall back to get the file contents from Node.js itself.

Whenever the editor contents is not loaded from the file system but comes from the debugger backend, the editor will be in read-only mode and the "origin" of the editor contents is shown in the editor title like this:

![Editor showing inlined source](images/January/debug-inlined-source.png)

### Remote Debugging

The followings improvements enable VS Code to support remote debugging (which includes debugging into a Docker container):

* The `attach` launch configuration now supports an `address` attribute where a remote host can be specified. Please note that remote debugging is only supported on recent versions of Node.js (>= 4.x).
* The `attach` launch configuration now supports a `localRoot` and a `remoteRoot` attribute that can be used to map paths between a local VS Code project and a (remote) Node.js folder. This works even locally on the same system or across different operating systems.
VS Code uses these paths in the following way: whenever a code path needs to be converted from the remote Node.js to a local VS Code path, the `remoteRoot` path is stripped off the path and replaced by `localRoot`. For the reverse conversion the `localRoot` path is replaced by the `remoteRoot`.

### launch.json relataive paths not automatically converted to absolute ones

In order to achieve consistency across our configuration files, we plan for the **February release** to no longer automatically convert certain paths from relative to absolute in `launch.json`.
We recommend that for the `program`, `cwd`, `outDir`, and `runtimeExecutable` attributes you prefix your relative paths with the `${workspaceRoot}` variable as soon as possible.
To make it easier for you to find the affected paths that need this treatment, we highlight them with a green squigglies for the January release.
(Please note: since we continue to automatically convert paths for the January release, your launch configurations will continue to work).

### "--nolazy" option not automatically added

In order to ensure that breakpoints are hit reliably, VS Code automatically adds the `--nolazy` option when launching Node.js. With the advent of Node.js alternatives that do not support this option (e.g. Chakra), we've removed this automatic behavior. So if you see that breakpoints are not hit reliably in Node.js, please verify that your launch config sets the `--nolazy` via the `runtimeArgs` attribute.

## Mono debugging

### Support for VS Code Debug Console

For VS Code Mono debugging support, we've added an `externalConsole` attribute, which controls whether the Mono target application is launched in an external console or in the built-in Debug Console (this is the default). Please note that the built-in Debug Console does not support keyboard input for your application.

## Localization

We also started work on localizing VS Code for different locales. We put tooling in place to externalize strings and to create language bundles. The screen shot below shows VS Code running under a German locale.

![VSCode in German](images/January/german-vscode.png)

Please note that the translation effort for VS Code haven't been completed yet and it will still take a while until we ship VS Code for languages other than English.

## Extension Authoring

### API Consumption

When you write an extension for VS Code, you are developing it against a set of APIs that we define through a file called `vscode.d.ts`. You can see this file
in our repository [here](https://github.com/Microsoft/vscode/blob/master/src/vs/vscode.d.ts). This file is picked up from our TypeScript and JavaScript language
service to provide you with nice validation and IntelliSense while you develop your extension.

As we make changes to the VS Code API between versions, `vscode.d.ts` changes and is updated and tagged from release to release. Previously, we stored the `vscode.d.ts`
file within the `vscode` npm module that all extensions automatically depend on. So in order to update to our latest API, you would just install a newer version of
the `vscode` npm module in your extension by typing `npm update vscode`.

We found that this approach has many issues:

* The `vscode` npm module needs to be updated and versioned independent from VS Code versions because it contains API unrelated code (e.g. for test running)
* The `engine` field of the `package.json` in your extension should be the only place that drives the decision which API to develop against.

To solve these issues, we made the following changes:

* The `vscode.d.ts` is no longer shipping within the `vscode` npm module.
* The value of the `engine` field in your extension is used to determine which version of `vscode.d.ts` to use.
* It is still very easy to update to a newer API via basic `npm` commands.

Since this is a breaking change for existing extensions, we increased the `vscode` npm module version to `0.11.0`. We encourage all extension writers to
update their dependency to `vscode` in their `package.json` to this new version (`^0.11.x`) to benefit from future updates to tooling for extensions.

The process of installing a specific version of the API into your extension is still very simple:

* Set the minimal version of VS Code that your extension requires in the `engine` field of the `package.json`.
* Make sure your dependency to the `vscode` module is at least `0.11.0`.
* Type `npm install` from the root of your extension.
* The `vscode` module will download the appropiate version of `vscode.d.ts` based on the `engine` field you declared.
* Go back to VS Code and see how the API for the specific version you chose appears in IntelliSense and validation.

### Extension API additions

We added a few API additions that enable you to write even more awesome extensions.

Quick Pick and Input

You can now validate user input, get called when an item is focused in Quick Pick, and Quick Pick now has room for additional details. Also Quick Pick now supports [GitHub Octicons](https://octicons.github.com) like the Status Bar.

Virtual Documents

We have introduced the concept of virtual documents. These are textual documents that don't have a representation on disk, but are generated at runtime.  For example, HTML generated from Markdown or source code from debug symbols.

![virtual document](images/January/api-virtual-documents.png)

Combine virtual documents with the new `vscode.previewHtml` command and you can come up with some creative solutions.

New Extension APIs

* There is now support for glob-patterns when associating files with a language.
* You can determine the current editor `ViewColumn`.
* There is a new `MarkedString` to display Markdown content in various UI elements.

### Debug Protocol Changes

We have changed the debug protocol in the following (backward compatible) ways:
* *Feature negotiation*: the response of the `InitializeRequest` now returns information about the capabilities of the debug adapter. The VS Code debugger uses this information to enable or configure features which only exist for certain debug adapters.
* *New request `ConfigurationDoneRequest`*: VS Code sends this request to indicate that the configuration (e.g. registering stored breakpoints and exception options) of the debug session has finished and that debugging is about to start. For backward compatibility VS Code will send this request only if the debug adapter returns the a value of `true` for the capability `supportsConfigurationDoneRequest`.
* Additional attributes for `Source` type:
  * an optional `origin` attribute to provide additional information about the source in the debug UI.
  * an optional `adapterData` attribute that the VS Code debug UI will transparently persist for breakpoints.
* *New type `SourceBreakpoint`*: an array of `SourceBreakpoint` is an alternate means to specify the individual breakpoints for the `SetBreakpointsRequest`. The `SourceBreakpoint` allows for specifying column and condition information for a breakpoint (in addition to the line).

### Test Suite for Debug Adapters

With the January release, we've started to simplify the process of writing automated tests for a debug adapter. The basic idea is to provide a toolkit with Promise-based building blocks for individual protocol requests (e.g. `stepInRequest`) and for common request sequences (e.g. `hitBreakpoint`). These building blocks can be easily configured for a specific adapter and combined to form complex scenarios.

Here are three example Mocha tests:

```js
var dc: DebugClient = ...;

test('should run program to the end', () => {
	return Promise.all([
		dc.configurationSequence(),
		dc.launch({ program: "main.js" }),
		dc.waitForEvent('terminated')
	]);
});

test('should stop on entry', () => {
	return Promise.all([
		dc.configurationSequence(),
		dc.launch({ program: "main.js", stopOnEntry: true }),
		dc.assertStoppedLocation('entry', 1)
	]);
});

test('should set a breakpoint and stop on it', () => {
	return dc.hitBreakpoint({ program: "main.js" }, "test.js", 15);
});
```

More examples can be found in these debug adapter projects on GitHub:

* [Microsoft/vscode-node-debug](https://github.com/Microsoft/vscode-node-debug)
* [Microsoft/vscode-mock-debug](https://github.com/Microsoft/vscode-mock-debug)
* [Microsoft/vscode-mono-debug](https://github.com/Microsoft/vscode-mono-debug)

You can see the Promise-based API in [DebugClient.ts](https://github.com/Microsoft/vscode-node-debug/blob/master/src/tests/DebugClient.ts) and an initial set of tests in [adapter.test.ts](https://github.com/Microsoft/vscode-node-debug/blob/master/src/tests/adapter.test.ts). We plan to make this API available as an npm module in February.

### New Default Themes
The light and dark themes have been in the center of attention recently due to colors being added and removed again.

More colors became visible due to the switch to Textmate tokenizers in November. In December we decided to remove
some of the newly added colors again, in order to stay compatible with the classic Visual Studio Dark and Light themes.
From reactions in [1270](https://github.com/Microsoft/vscode/issues/1270) and [1470](https://github.com/Microsoft/vscode/issues/1470)
 and other issues, we learned that we have fans of both the classic Visual Studio dark and light themes as well as the more colorful version.
So for the January release, we decided to bring the colors back in two new, additional, default themes: 'Dark+' and 'Light+'.
The new themes are built-in. If you installed the theme preview as extension, you can now uninstall these again.

In addition to 4 major colors in the Visual Studio themes (comments, strings, numbers and keywords)
the 'plus' tnemes add colors for
 - control flow keywords
 - type names
 - function names
 - variable and parameter names

![Light+ theme](images/January/light_plus_theme.png)
![Dark+ theme](images/January/dark_plus_theme.png)


### JSON mode is now an extension
From a user's perspective nothing really has changed when editing JSON, but under the hood, the JSON
language support has been refactored. The JSON language support drives the smartness when editing JSON files,
from valdiation based on schemes to code completion and formatting.
JSON is now a regular extension, using the same [VS Code extension APIs](https://code.visualstudio.com/docs/extensionAPI/overview)
as everyone else. The implementation is based on the language server infrastructure, which
makes it easy to run in a separate process. Read [here](https://code.visualstudio.com/docs/extensions/example-language-server)
for more on the language server.

## Notable Bug Fixes

* [1485](https://github.com/Microsoft/vscode/issues/1485): Windows 7: Deleting always fails with error message
* [1687](https://github.com/Microsoft/vscode/issues/1687): VSC 10.6 does not allow to attach debugger to running Electron app
* [1923](https://github.com/Microsoft/vscode/issues/1923): IntelliSense filtering has become slow again in huge lists
* [1962](https://github.com/Microsoft/vscode/issues/1962): Debugger fails when offline
