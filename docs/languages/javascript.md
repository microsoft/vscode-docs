---
Order: 2
Area: languages
TOCTitle: JavaScript
ContentId: F54BB3D4-76FB-4547-A9D0-F725CEBB905C
PageTitle: JavaScript Programming with Visual Studio Code
DateApproved: 12/14/2016
MetaDescription: Get the best out of Visual Studio Code for JavaScript development
---

# JavaScript in VS Code

Visual Studio Code provides IntelliSense, debugging, and powerful editor features for JavaScript. VS Code uses the [JavaScript language service](https://github.com/Microsoft/TypeScript/wiki/Salsa) to make authoring JavaScript easy. In addition to syntactical features like format, format on type and outlining, you also get language service features such as **Peek**, **Go to Definition**, **Find all References**, and **Rename Symbol**.

![JavaScript find all references](images/javascript/javascript_find_all_references.png)

## IntelliSense

VS Code [IntelliSense](/docs/editor/intellisense.md) is intelligent code completion, parameter info, and member lists. VS Code provides IntelliSense using TypeScript definition files (for example node.d.ts) to provide metadata about the JavaScript based frameworks you are consuming in your application. Because TypeScript definition files are written in TypeScript, they can express the data types of parameters and functions, allowing VS Code to provide a rich IntelliSense experience. 

Thanks to a feature called `Automatic Typing Acquisition` you as user do not have to worry about these typings file. VS Code will install them automatically for you.

![JavaScript intellisense animation](images/javascript/javascript_intellisense.gif)

For the details of how JavaScript IntelliSense works, including being based on type inference, JsDoc annotations, TypeScript declarations, and mixing JavaScript and TypeScript projects, see the [JavaScript language service documentation](https://github.com/Microsoft/TypeScript/wiki/Salsa). 

When type inference does not provide the desired information, type information may be provided explicitly with JSDoc annotations. This document describes the [JSDoc annotations](https://github.com/Microsoft/TypeScript/wiki/JsDoc-support-in-JavaScript) currently supported. In addition to objects, methods, and properties, the JavaScript IntelliSense window also provides basic word completion for the symbols in your file. 

VS Code ships with the most stable version of the JavaScript language service. The same language service powers both JavaScript and TypeScript, so if you want to use a newer version, you can define the `typescript.tsdk` [setting](/docs/customization/userandworkspace.md) to point to a directory containing the TypeScript `tsserver.js` file. See more details [here](/docs/languages/typescript.md#using-newer-typescript-versions).

## Automatic Type Acquisition

VS Code JavaScript IntelliSense for third-party libraries and modules is powered by type definition `*.d.ts` files. TypeScript definition files are written in TypeScript so they can express the data types of parameters and functions, allowing VS Code to provide rich IntelliSense.

In this image you can see IntelliSense, including the method signature, parameter info, and the method's documentation, for a popular library called [lodash](https://lodash.com/).

![lodash typings](images/javascript/lodash_typings.png)

Typings files are automatically download and managed by Visual Studio Code for packages listed in your project's `package.json`.

```json
    "dependencies": {
        "lodash": "^4.17.0"
    }
```

If you are using Visual Studio Code 1.8+, you can alternately explicitly list packages to acquire typings for in your `jsconfig.json`.

```json
    "typeAcquisition": {
        "include": [
            "lodash"
        ]
    }
```

Now when you `require` or `import` **lodash**, Visual Studio Code will use the automatically downloaded typings files for the library to provide rich Intellisense. Most common JavaScript libraries have typings available.

## JavaScript Project (jsconfig.json)

The presence of a [jsconfig.json](/docs/languages/jsconfig.md) file in a directory indicates that the directory is the root of a JavaScript project. `jsconfig.json` specifies the root files and the options for the language features provided by the [JavaScript language service](https://github.com/Microsoft/TypeScript/wiki/Salsa). For common setups a `jsconfig.json` file is not required, however, there are situations when you will want to add a `jsconfig.json`. 

- Not all files should be in your JavaScript project (i.e. you want to exclude some files from showing IntelliSense). This situation is common with front-end and back-end code. 
- Your workspace contains more then one project context. In this situation, you should add a `jsconfig.json` file at the root folder for each project.
- You are using the TypeScript compiler to down-level compile JavaScript source code.

### Location of jsconfig.json

To define our code as a JavaScript project, create `jsconfig.json` at the root of your JavaScript code as shown below. A JavaScript project is the source files of the project and should not include the derived or packaged files (such as a `dist` directory).

![jsconfig setup](images/javascript/jsconfig_setup.png)

In more complex projects, you may have more than one `jsconfig.json` file defined inside a workspace. You will want to do this so that the source code in one project does not appear in the IntelliSense of another project.

Illustrated below is a project with a `client` and `server` folder, showing two separate JavaScript projects:

![multiple jsconfigs](images/javascript/complex_jsconfig_setup.png)

### Writing jsconfig.json

Below is a simple template for `jsconfig.json` file which defines the JavaScript `target` to be `ES6` and the `exclude` attribute excludes the `node_modules` folder. You can copy and paste this code into your `jsconfig.json` file.

```json
{
    "compilerOptions": {
        "target": "ES6"
    },
    "exclude": [
        "node_modules"
    ]
}
```

The `exclude` attribute tells the language service which files are and are not part of your source code. If IntelliSense is slow, add folders to your `exclude` list (VS Code will prompt you to do this if it detects slow completions). You will want to `exclude` files generated by a build process (such as a `dist` directory). These files will cause suggestions to show up twice and will slow down IntelliSense.

You can explicitly set the files in your project using the `files` attribute. If no `files` attribute is present, then this defaults to including all files in the containing directory and subdirectories. When a `files` attribute is specified, only those files are included.

Here is an example with an explicit `files` attribute:

```json
{
    "compilerOptions": {
        "target": "ES6"
    },
    "files": [
        "src/"
    ]
}
```

> **Tip:** Best practice, and least error prone route, is to use the `files` attribute with a single `src` folder. 

The `files` attribute cannot be used with the `exclude` attribute. If both are specified, the `files` attribute will take precedence.

> **Tip:** The file paths in `excludes` and `files` are relative to the location of `jsconfig.json`.

See [here](/docs/languages/jsconfig.md) for the full documentation of `jsconfig.json`.

> **Note:** `jsconfig.json` is the same as a `tsconfig.json` file, only with `allowJS` set to true. See [the documentation for `tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) here to see other available options.

## Debugging

VS Code comes with great debugging support for JavaScript. Set breakpoints, inspect objects, navigate the call stack, and execute code in the Debug Console. See more about debugging [here](/docs/editor/debugging.md).

### Debug Client Side

You can debug your client side code using a browser debugger such as [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) or [Debugger for Edge](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-edge).

### Debug Server Side

Debug Node.js in VS Code using the built-in debugger. Setup is easy and you can read a walk-through for Node.js debugging [here](/docs/runtimes/nodejs.md#debugging-your-express-application).

![debug data inspection](images/javascript/debug_data_inspection.gif)

## Linters

A [linter](https://en.wikipedia.org/wiki/Lint_%28software%29) is a tool that provides warnings for suspicious looking code. VS Code supports linters through [extensions](/docs/editor/extension-gallery.md). Linters provide warnings, errors, and light bulb actions.

VS Code provides support for JavaScript linters, including [ESLint](http://eslint.org/), [JSHint](http://jshint.com/) and [StandardJS](http://standardjs.com/).  If enabled, the JavaScript code is validated as you type and you can navigate to reported problems and fix them inside VS Code.

 ![linter warning](images/javascript/eslint_warning.png)

> **Tip:** In the above example, the error comes from `eslint`. Error messages will be prefixed (see above `[eslint]`) by the originator of the message. Error messages from the JavaScript language service are prefixed `js`.

<div class="marketplace-extensions-javascript-linters"></div>

> **Tip:** This list is dynamically queried from the [VS Code Marketplace](https://marketplace.visualstudio.com). Read the description and reviews to decide if the extension is right for you.

A linter extension may require an external tool. The steps below show how to setup ESLint. The process is similar for other linters.

1. Install the linter globally or inside the workspace folder that contains the JavaScript code to be validated. For example, using `npm install -g eslint`.
2. Install the [ESLint](https://marketplace.visualstudio.com/items/dbaeumer.vscode-eslint) extension.
3. Create a `.eslintrc.json` file in the root of your workspace to configure the linter. You can use `eslint --init` to create an initial version of the `.eslintrc.json` file.

>**Tip:** You get IntelliSense and hovering inside the `.eslintrc.json` file.

>**Tip:** The linter is enabled after installation. You can disable a linter with the corresponding `.enable` [setting](/docs/customization/userandworkspace.md). For ESLint, this would be setting `"eslint.enable" : false`.

It is recommended that you enable the linter rules that warn about undefined and unused variables. To do this, put the following options in your `.eslintrc.json` file.

```json
"no-undef": 1,
"no-unused-vars": 1,
```

You can also control when a linter runs with the linter `.run` setting. The two options are the default `onType` after each key stroke and `onSave` after you save your file.

Here are a few useful resources when using ESLint.

* [Complete list of ESLint Rules](http://eslint.org/docs/rules/)
* [Configuring ESLint](http://eslint.org/docs/user-guide/configuring)
* [Getting Started with ESLint](http://eslint.org/docs/user-guide/getting-started)

## Snippets

VS Code has several built-in snippets that will come up as you type or you can press `kb(editor.action.triggerSuggest)` (**Trigger Suggest**) and you will see a context specific list of suggestions.

![built in javascript snippet foreach](images/javascript/javascript_snippets.gif)

> **Tip:** You can add in your own snippets for JavaScript. See [User Defined Snippets](/docs/customization/userdefinedsnippets.md) to find out how.

You may not want to show snippets. You can disable them by setting `editor.snippetSuggestions` to `"none"` in your [settings](/docs/customization/userandworkspace.md) file. If you'd like to see snippets, you can specify the order relative to suggestions; at the top (`"top"`), at the bottom (`"bottom"`), or inlined ordered alphabetically (`"inline"`). The default is `"inline"`.

You can enable tab completions with `editor.tabCompletion` setting. After typing the prefix of a snippet, press `kbstyle(Tab)` to insert it.

## Use Next Generation JavaScript

### Run Babel inside VS Code

The [Babel](https://babeljs.io) transpiler turns ES6 files into readable ES5 JavaScript with Source Maps. You can easily integrate **Babel** into your workflow by adding the configuration below to your `tasks.json` file (located under the workspace's `.vscode` folder). The `isBuildCommand` switch makes this task the **Task: Run Build Task** gesture.  `isWatching` tells VS Code not to wait for this task to finish. To learn more, go to [Tasks](/docs/editor/tasks.md).

```json
{
    "version": "0.1.0",
    "command": "${workspaceRoot}/node_modules/.bin/babel",
    "isShellCommand": true,
    "tasks": [
        {
            "args": ["src", "--out-dir", "lib", "-w", "--source-maps"],
            "taskName": "watch",
            "suppressTaskName": true,
            "isBuildCommand": true,
            "isWatching": true
        }
    ]
}
```

Once you have added this, you can start **Babel** with the `kb(workbench.action.tasks.build)` (**Run Build Task**) command and it will compile all files from the `src` directory into the `lib` directory.

> **Tip:** For help with Babel CLI see the instructions [here](http://babeljs.io/docs/setup/#installation). The example above uses the CLI option. 

### Use the TypeScript Compiler

One of the key features TypeScript provides is the ability to use the latest JavaScript language features, and emit code that can execute in JavaScript runtimes that don't yet understand those newer features. With JavaScript using the same language service, it too can now take advantage of this same feature.

The TypeScript compiler `tsc` can down-level compile JavaScript files from ES6 to another language level. Configure the `jsconfig.json` with the desired options and then use the –p argument to make `tsc` use your `jsconfig.json` file, e.g. `tsc -p jsconfig.json` to down-level compile.

Read more about the compiler options for down level compilation [here](/docs/languages/jsconfig.md#down-level-compilation-with-typescript-compiler).

## Formatting

As with other languages, you can format your JavaScript code in VS Code. 

![formatter](images/javascript/formatter.gif)

VS Code provides several formatting settings for JavaScript. They can all be found in the `javascript.format` [settings](/docs/customization/userandworkspace.md) namespace.

```typescript
// Defines space handling after a comma delimiter
"javascript.format.insertSpaceAfterCommaDelimiter": boolean,

// Defines space handling after a semicolon in a for statement
"javascript.format.insertSpaceAfterSemicolonInForStatements": boolean,

// Defines space handling after a binary operator
"javascript.format.insertSpaceBeforeAndAfterBinaryOperators": boolean,

// Defines space handling after keywords in control flow statement
"javascript.format.insertSpaceAfterKeywordsInControlFlowStatements": boolean,

// Defines space handling after function keyword for anonymous functions
"javascript.format.insertSpaceAfterFunctionKeywordForAnonymousFunctions": boolean,

// Defines space handling after opening and before closing non empty parenthesis
"javascript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis": boolean,

// Defines space handling after opening and before closing non empty brackets
"javascript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets": boolean,

// Defines whether an open brace is put onto a new line for functions or not
"javascript.format.placeOpenBraceOnNewLineForFunctions": boolean,

// Defines whether an open brace is put onto a new line for control blocks or not
"javascript.format.placeOpenBraceOnNewLineForControlBlocks": boolean,
```

## Popular Extensions

VS Code ships with excellent support for JavaScript but you can additionally install debuggers, snippets, linters, and other JavaScript tools through [extensions](/docs/editor/extension-gallery.md).

<div class="marketplace-extensions-javascript"></div>

> **Tip:** The extensions shown above are dynamically queried. Click on an extension tile above to read the description and reviews to decide which extension is best for you. See more in the [Marketplace](https://marketplace.visualstudio.com).

## Next Steps

Read on to find out about:

* [jsconfig.json](/docs/languages/jsconfig.md) - Detailed description of the `jsconfig.json` project file.
* [IntelliSense](/docs/editor/intellisense.md) - Learn more about IntelliSense and how to use it effectively for your language.
* [Debugging](/docs/editor/debugging.md) - Learn how to set up debugging for your application.
* [Node.js](/docs/runtimes/nodejs.md) - A walkthrough to create an Express Node.js application.
* [TypeScript](/docs/languages/typescript.md) - VS Code has great support for TypeScript which brings structure and strong typing to your JavaScript code.

Watch these introductory videos:

* [Quick Tour using JavaScript](/docs/introvideos/quicktour.md) - See a three-minute overview of using JavaScript in VS Code. 
* [IntelliSense](/docs/introvideos/intellisense.md) - Tutorial on IntelliSense with JavaScript.
* [Debugging](/docs/introvideos/debugging.md) - Learn how to debug a Node.js application.

## Common Questions

**Q: Does VS Code support JSX and React Native?**

**A:** VS Code supports **JSX** and **React Native**. To get IntelliSense for **React/JSX**, install the typings for `react` by running `typings install dt~react --global --save` from the terminal. To get IntelliSense for **React Native**, run `typings install dt~react-native --global --save`. Additionally, you can install the popular [React Native extension](https://marketplace.visualstudio.com/items?itemName=vsmobile.vscode-react-native) from  the Marketplace.

**React Native** examples often use the experimental **Object Rest/Spread** operator. This is not yet supported by VS Code. If you want to use it, it is recommended that you disable the built-in syntax checking (see below).

To enable ES6 import statements for **React Native**, you need to set the `allowSyntheticDefaultImports` compiler option to `true`. This tells the compiler to create synthetic default members and you get IntelliSense. **React Native** uses **Babel** behind the scenes to create the proper run-time code with default members. If you also want to do debugging of **React Native** code then you can install the [React Native Extension](https://marketplace.visualstudio.com/items?itemName=vsmobile.vscode-react-native).

**Q: IntelliSense is not working for external libraries.**

**A:** `Automatic Type Acquisition` works for dependencies downloaded by npm (specified in `package.json`), Bower (specified in `bower.json`), and for many of the most common libraries listed in your folder structure (i.e. `jquery-3.1.1.min.js`). 

**ES6 Style imports are not working.**

When you want to use ES6 style imports but the typings do not yet use ES6 style exports, then set the [TypeScript compiler option](https://www.typescriptlang.org/docs/handbook/compiler-options.html) `allowSyntheticDefaultImports` to true.

```javascript
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    // This is the line you want to add
    "allowSyntheticDefaultImports": true
  },
  "exclude": [
    "node_modules"
  ]
}
```

**Q: Can I debug minified/uglified JavaScript?**

**A:** Yes, you can. You can see this working using JavaScript source maps in the Node.js section of the [Debugging](/docs/editor/debugging.md#node-debugging) topic.

**Q: How do I disable Syntax Validation when using non ES6 constructs?**

**A:** Some users want to use syntax constructs like the proposed Object Rest/Spread Properties. However, these are currently not supported by VS Code's JavaScript language service and are flagged as errors. For users who still want to use these future features, we provide the `javascript.validate.enable` [setting](/docs/customization/userandworkspace.md).

With `javascript.validate.enable: false`, you disable all built-in syntax checking. If you do this, we recommend that you use a linter like [ESLint](http://eslint.org) to validate your source code. Since VS Code's JavaScript support doesn't understand ES7 constructs, features like IntelliSense might not be fully accurate.

