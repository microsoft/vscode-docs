---
Order: 2
Area: languages
TOCTitle: JavaScript
PageTitle: JavaScript Programming with Visual Studio Code
DateApproved: 10/12/2015
MetaDescription: Get the best out of Visual Studio Code for JavaScript development
---

# JavaScript

## Rich Editing Support
Visual Studio Code uses the TypeScript language service to make authoring JavaScript easy. In addition to syntactical features like format, format on type and outlining, you also get language service features such as
 Peek, Go to Definition, Find all References, and Rename Symbol just by right clicking in any JavaScript file.

![Right Click](images/javascript/rightclick.png)


## JavaScript Projects (jsconfig.json)
You can create a JavaScript project by dropping in a `jsconfig.json` file. It's a subset of [tsconfig.json](https://github.com/Microsoft/TypeScript/wiki/tsconfig.json). The presence of a `jsconfig.json` file in a directory indicates that the directory is the root of a JavaScript project. The file itself lists the files belonging to the project as well as compiler options.

>**Tip:** Just as in `tsconfig.json`, if no "files" property is present, we default to including all files in the containing directory and subdirectories. When a "files" property is specified, only those files are included.

![jsonconfig.json](images/javascript/jsconfigjson.png)

>**Tip:** VS Code optionally supports multiple `jsconfig.json` files. This is good, for instance, when you wish to exclude subdirectories.

### /// References for .d.ts
With the introduction of `jsconfig.json`, you no longer need to use `///` references in each file (these were required in the initial versions of VS Code). As the file set is defined in `jsconfig.json`, VS Code knows what files and symbols are part of your project.

As an example, you can just drop a new type definition `.d.ts` file into your project folder and VS Code will pick it up automatically.

### Defining Global Variables Outside .d.ts
VS Code also supports the global directive ```/*global varName*/``` to declare variables. In comparison to ```.d.ts``` files, it’s a faster but less powerful way to define variables to be used inside source files.

![Global directive](images/javascript/jsglobalvariable.png)


## IntelliSense Support
VS Code provides IntelliSense for built-in symbols of browsers, Node.js, and virtually all other environments through the use of type definition ```.d.ts``` files. [DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped) is a repository of typings files for all major JavaScript libraries and environments. The typings are easily managed using [TSD](http://definitelytyped.org/tsd/), the TypeScript Definition manager. IntelliSense is automatically provided for CommonJS and AMD modules inside your project folders.



## Snippets for JavaScript
VS Code has several built-in snippets that will come up as you type or you can press `kb(editor.action.triggerSuggest)` (Trigger Suggest) and you will see a context specific list of suggestions.

![Try Suggestions](images/javascript/trysnippet.png)

Selecting the snippet with `tab` results in:

![Try Result](images/javascript/tryresult.png)

>**Tip:** You can add in your own User Defined Snippets for JavaScript.  See [User Defined Snippets](/docs/customization/userdefinedsnippets) to find out how.


## ES6 Support
VS Code supports ES6 (ECMAScript 6, the latest update of JavaScript) and understands the new ES6 syntax elements and their semantics. A good overview of the new ES6 features can be found here: <https://github.com/lukehoban/es6features>

>**Note:** Super-references in deriving object-literals is still on our plate; currently if you try this in VS Code you'll receive a faulty compiler error, which you can suppress by setting the `javescript.validate._surpressSuperWithoutSuperTypeError: [true|false]` option.

We have a sample on GitHub that shows off some of the ES6 love in VS Code:

```
git clone https://github.com/jrieken/es6-vscode-sample
cd es6-vscode-sample
npm install
```


### Run Babel inside VS Code
The Babel transpiler turns ES6 files into readable ES5 JavaScript with Source Maps.  You can easily integrate Babel into your workflow by adding this code to your `tasks.json` file. The `isBuildCommand` switch makes this task the `Task: Run Build Task` gesture.  `isWatching` tells VS Code not to wait for this task to finish. To learn more go to [Tasks](/docs/editor/tasks).

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


Once you have added this you can start Babel with the `kb(workbench.action.tasks.build)` gesture and it will compile all files from the `src-directory` into the `lib-directory`.


## JavaScript Linters (ESLint, JSHint)

VS Code provides support for [ESLint](http://eslint.org/) and [JSHint](http://jshint.com/). If enabled the JavaScript code is validated as you type and
reported problems can be navigated to and fixed inside VS Code.

To enable one of the linters do the following:

* install the corresponding linter globally or inside the workspace folder that contains the JavaScript code to be validated.
  For example using `npm install eslint` or `npm install jshint`, respectively.
* enable ESLint or JSHint via the corresponding settings `"eslint.enable": true` or `"jshint.enable": true`, respectively.
* optionally disable VS Code's built-in JavaScript validation via the setting `"javascript.validate.enable": false`
* use the .eslintrc or .jshintrc file to configure the linter.


## JavaScript Validation Settings

Validation is supported by a set of configuration rules. In addition to syntax checks, [User Settings](/docs/customization/userandworkspace) allow you to configure additional checks for JavaScript files. Such as:

Id|Description|Default
---|------------|----
comparisonOperatorsNotStrict | Favors the use of ```!==``` and ```===``` over ```!=``` and ```==```. | ignore
curlyBracketsMustNotBeOmitted | Even single-line block-statements should have curly brackets | ignore
emptyBlocksWithoutComment | An empty block should at least have a comment | ignore
forcedTypeConversion | Don’t force a type conversion | ignore
functionsInsideLoops | Function inside loops often don’t do what you think they do | ignore
missingSemicolon | Statements should be terminated with a semi-colon | ignore
mixedTypesArithmetics | Don’t force a conversion with arithmetic operations, like ```”C” + 0 + “de”``` | ignore
newOnLowercaseFunctions | Functions that are used as constructors should be upper-case | ignore
newOnReturningFunctions | Functions that are used as constructors should not return something | ignore
parametersDontMatchSignature | Invoking a function with wrong types or wrong number of parameters | ignore
primitivesInInstanceOf | The ```instanceof```=operator cannot be used with primitive types | error
redeclaredVariables | Don’t redeclare a variable with a different type | warning
semicolonsInsteadOfBlocks | Don’t replace a block with a semi-colon, as in ```while(true);{ break; }``` | warning
tripleSlashReferenceAlike | A comment that looks like a ///-reference | warning
undeclaredVariables | Use of an undeclared variable | warning
unknownProperty | Use of an unknown property | ignore
unknownTypeOfResults | The ```typeof```-operation has a fixed set of possible results | warning
unusedFunctions | A function that isn’t used | warning
unusedVariables | A variable that isn’t used | warning






## Next Steps
OK, read on to find out about:

* [TypeScript](typescript) - VS Code has great support for TypeScript which brings structure and strong typing to your JavaScript code, without compromising the good parts

## Common Questions

**Q: Can you Debug minified/uglified JavaScript?**

**A:** Yes, you can. :)
