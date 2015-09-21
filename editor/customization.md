---
Order: 10
Area: editor
TOCTitle: Customization
PageTitle: Customize Visual Studio Code
DateApproved: 9/10/2015
MetaDescription: You can configure VS Code to work the way you like to work.  Here is a quick primer on some of the most common ways to configure VS Code.
---

# Customize Visual Studio Code
You can configure VS Code to work the way you like to work.  Here is a quick primer on some of the most common ways to configure VS Code.

In addition to the customization described here, you can integrate VS Code into your workflow with [tasks](tasks), create your own user-defined [snippets](editingevolved#_snippets-and-emmet-abbreviations), and of course it would not be a great editor if you could not customize [key bindings](keybindings).


## Changing the Color Theme
There are several out-of-the-box color themes for VS Code for you to try out.

1. Open the Color Theme picker with `kb(workbench.action.selectTheme)`
2. Use the cursor keys to preview the colors of the theme
3. Select the theme you want and hit Enter

![Themes in the Command Palette](images/customization/colorthemes.png)

You can also find this on the menu under `File | Preferences | Color Theme`.


## User Defined Snippets
You can define your own snippets for specific languages: Open `User Snippets` under `File`, `Preferences` and select the language for which the snippets should appear.

Each snippet defines a prefix under which it will appear in IntelliSense via (`kb(editor.action.triggerSuggest)`) as well as a body to be inserted when the snippet is selected. The snippet syntax follows the [TextMate snippet syntax](https://manual.macromates.com/en/snippets) with the exception of 'regular expression replacements', 'interpolated shell code' and 'transformations', which are not supported.

![User Snippets](images/customization/usersnippets.png)

Once you have added a new snippet you can try it out right away, no restart is needed.

## User and Workspace Settings
It's easy to configure VS Code the way you want by editing the various setting files where you will find a great number of settings to play with.

VS Code provides two different scopes for settings:
* **User** these settings apply globally to any instance of VS Code you open
* **Workspace** these settings are stored inside your workspace in a `.vscode` folder and only apply when the workspace is opened. Settings defined on this scope overwrite the user scope.

The menu under `File`, `Preferences` provides entries to configure user and workspace settings. You are provided with a list of default settings. Copy any setting that you want to change to the related settings file.

Depending on your platform, this file is located here:
* **Windows** `%APPDATA%\Code\User\settings.json`
* **Mac** `$HOME/Library/Application Support/Code/User/settings.json`
* **Linux** `$HOME/.config/Code/User/settings.json`

In the example below, we disabled line numbers in the editor and configured line wrapping to wrap automatically based on the size of the editor.

![Settings](images/customization/settings.png)

The `settings.json` file is divided into these sections:

- **Editor Configuration** - font, word wrapping, tabsize, line numbers, indentiation, ...
- **Files Configuration** - exclude filters, default encoding, trim trailing whitespace
- **HTTP Configuration** - Proxy settings
- **File Explorer Configuration** - Working Files behavior
- **Search Configuration** - file exclude filters
- **CSS Configuration** - CSS linting configuration
- **JavaScript Configuration** - Language specific settings
- **JSON Configuration** - Schemas associated with certain JSON files
- **Markdown Preview Configuration** - Add a custom CSS to the Markdown preview
- **Less Configuration** - Control Linting for Less
- **Sass Configuration** - Control linting for Sass
- **TypeScript Configuration** - Language specific settings

Below is a copy of the default `settings,json` file.

>**Tip:** While in the `settings.json` file, press `kb(workbench.action.gotoSymbol)` to see an outline of all available settings and navigate through the file.

```
// Overwrite settings by placing them into your settings file.
{

	//-------- Editor configuration --------

	// Controls the font family.
	"editor.fontFamily": "",

	// Controls the font size.
	"editor.fontSize": 0,

	// Controls the line height.
	"editor.lineHeight": 0,

	// Controls visibility of line numbers
	"editor.lineNumbers": true,

	// Controls visibility of the glyph margin
	"editor.glyphMargin": false,

	// Controls the rendering size of tabs in characters. Accepted values: "auto", 2, 4, 6, etc. If set to "auto", the value will be guessed when a file is opened.
	"editor.tabSize": "auto",

	// Controls if the editor will insert spaces for tabs. Accepted values:  "auto", true, false. If set to "auto", the value will be guessed when a file is opened.
	"editor.insertSpaces": "auto",

	// Controls if selections have rounded corners
	"editor.roundedSelection": true,

	// Controls if the editor will scroll beyond the last line
	"editor.scrollBeyondLastLine": true,

	// Controls after how many characters the editor will wrap to the next line. Setting this to 0 turns on viewport width wrapping
	"editor.wrappingColumn": 300,

	// Controls the indentation of wrapped lines. Can be one of 'none', 'same' or 'indent'.
	"editor.wrappingIndent": "same",

	// A multiplier to be used on the `deltaX` and `deltaY` of mouse wheel scroll events
	"editor.mouseWheelScrollSensitivity": 1,

	// Controls if quick suggestions should show up or not while typing
	"editor.quickSuggestions": true,

	// Controls the delay in ms after which quick suggestions will show up
	"editor.quickSuggestionsDelay": 10,

	// Controls if the editor should automatically close brackets after opening them
	"editor.autoClosingBrackets": true,

	// Controls if the editor should automatically format the line after typing
	"editor.formatOnType": false,

	// Controls if suggestions should automatically show up when typing trigger characters
	"editor.suggestOnTriggerCharacters": true,

	// Controls whether the editor should highlight similar matches to the selection
	"editor.selectionHighlight": true,

	// Controls the number of decorations that can show up at the same position in the overview ruler
	"editor.overviewRulerLanes": 3,

	// Controls if the cursor should be hidden in the overview ruler.
	"editor.hideCursorInOverviewRuler": false,

	// Controls whether the editor should render whitespace characters
	"editor.renderWhitespace": false,

	// Controls if the editor shows reference information for the modes that support it
	"editor.referenceInfos": true,


	//-------- Files configuration --------

	// Configure glob patterns for excluding files and folders.
	"files.exclude": {
		"**/.git": true,
		"**/.DS_Store": true
	},

	// The default character set encoding to use when reading and writing files.
	"files.encoding": "utf8",

	// When enabled, will trim trailing whitespace when you save a file.
	"files.trimTrailingWhitespace": false,


	//-------- HTTP configuration --------

	// The proxy setting to use. If not set will be taken from the http_proxy and https_proxy environment variables
	"http.proxy": "",


	//-------- File Explorer configuration --------

	// Maximum number of working files to show before scrollbars appear.
	"explorer.workingFiles.maxVisible": 9,

	// Controls if the height of the working files section should adapt dynamically to the number of elements or not.
	"explorer.workingFiles.dynamicHeight": true,


	//-------- Search configuration --------

	// Configure glob patterns for excluding files and folders in searches. Inherits all glob patterns from the file.exclude setting.
	"search.exclude": {
		"**/node_modules": true,
		"**/bower_components": true
	},


	//-------- CSS configuration --------

	// Controls problem severities used in the lint validation.

	// When using a vendor-specific prefix make sure to also include all other vendor-specific properties
	"css.lint.compatibleVendorPrefixes": "ignore",

	// When using a vendor-specific prefix also include the standard property
	"css.lint.vendorPrefix": "warning",

	// Do not use duplicate style definitions
	"css.lint.duplicateProperties": "ignore",

	// Do not use empty rulesets
	"css.lint.emptyRules": "warning",

	// Import statements do not load in parallel
	"css.lint.importStatement": "ignore",

	// Do not use width or height when using padding or border
	"css.lint.boxModel": "ignore",

	// The universal selector (*) is known to be slow
	"css.lint.universalSelector": "ignore",

	// No unit for zero needed
	"css.lint.zeroUnits": "ignore",

	// @@font-face rule must define 'src' and 'font-family' properties
	"css.lint.fontFaceProperties": "warning",

	// Hex colors must consist of three or six hex numbers
	"css.lint.hexColorLength": "error",

	// Invalid number of parameters
	"css.lint.argumentsInColorFunction": "error",

	// Unknown property.
	"css.lint.unknownProperties": "warning",

	// IE hacks are only necessary when supporting IE7 and older
	"css.lint.ieHack": "ignore",

	// Unknown vendor specific property.
	"css.lint.unknownVendorSpecificProperties": "ignore",

	// Property is ignored due to the display. E.g. with 'display: inline', the width, height, margin-top, margin-bottom, and float properties have no effect
	"css.lint.propertyIgnoredDueToDisplay": "warning",

	// Avoid using !important. It is an indication that the specificity of the entire CSS has gotten out of control and needs to be refactored.
	"css.lint.important": "ignore",

	// Avoid using 'float'. Floats lead to fragile CSS that is easy to break if one aspect of the layout changes.
	"css.lint.float": "ignore",

	// Selectors should not contain IDs because these rules are too tightly coupled with the HTML.
	"css.lint.idSelector": "ignore",


	//-------- JavaScript configuration --------

	// Controls how JavaScript IntelliSense works.

	// Always include all words from the current document.
	"javascript.suggest.alwaysAllWords": true,

	// Complete functions with their parameter signature.
	"javascript.suggest.useCodeSnippetsOnMethodSuggest": false,

	// Controls how JavaScript validation works.

	// Run linter checks for JavaScript files - overrides validate.lint.* settings.
	"javascript.validate.semanticValidation": true,

	// Check JavaScript files for syntax errors.
	"javascript.validate.syntaxValidation": true,

	// Controls various aspects of validation.

	// Don't spare curly brackets.
	"javascript.validate.lint.curlyBracketsMustNotBeOmitted": "ignore",

	// Empty block should have a comment.
	"javascript.validate.lint.emptyBlocksWithoutComment": "ignore",

	// Use '!==' and '===' instead of '!=' and '=='.
	"javascript.validate.lint.comparisonOperatorsNotStrict": "ignore",

	// Missing semicolon.
	"javascript.validate.lint.missingSemicolon": "ignore",

	// Unexpected output of the 'typeof'-operator.
	"javascript.validate.lint.unknownTypeOfResults": "warning",

	// Semicolon instead of block.
	"javascript.validate.lint.semicolonsInsteadOfBlocks": "ignore",

	// Function inside loop.
	"javascript.validate.lint.functionsInsideLoops": "ignore",

	// Function with lowercase name used as constructor.
	"javascript.validate.lint.newOnLowercaseFunctions": "warning",

	// Looks for mistyped triple-slash references.
	"javascript.validate.lint.tripleSlashReferenceAlike": "warning",

	// Unused local variable.
	"javascript.validate.lint.unusedVariables": "warning",

	// Unused local function.
	"javascript.validate.lint.unusedFunctions": "ignore",

	// Parameter don't match a function signature
	"javascript.validate.lint.parametersDontMatchSignature": "ignore",

	// Don't re-declare a variable and change its type.
	"javascript.validate.lint.redeclaredVariables": "warning",

	// Don't use an undeclared variable.
	"javascript.validate.lint.undeclaredVariables": "warning",

	// Don't use an unknown property.
	"javascript.validate.lint.unknownProperty": "ignore",

	// Don't require an unknown module.
	"javascript.validate.lint.unknownModule": "warning",

	// Don't re-declare a variable type by an assignment.
	"javascript.validate.lint.forcedTypeConversion": "warning",

	// Only use numbers for arthimetic operations.
	"javascript.validate.lint.mixedTypesArithmetics": "warning",

	// Don't use instanceof with primitive types.
	"javascript.validate.lint.primitivesInInstanceOf": "error",

	// Function with return-statement used as constructor.
	"javascript.validate.lint.newOnReturningFunctions": "warning",


	//-------- JSON configuration --------

	// Associate schemas to JSON files in the current project
	"json.schemas": [
		{
			"fileMatch": [
				"/bower.json",
				"/.bower.json"
			],
			"url": "http://json.schemastore.org/bower"
		},
		{
			"fileMatch": [
				"/package.json"
			],
			"url": "http://json.schemastore.org/package"
		},
		{
			"fileMatch": [
				"/project.json"
			],
			"url": "http://json.schemastore.org/project"
		},
		{
			"fileMatch": [
				"*.schema.json"
			],
			"url": "http://json-schema.org/draft-04/schema#"
		},
		{
			"fileMatch": [
				"/global.json"
			],
			"url": "http://json.schemastore.org/global"
		},
		{
			"fileMatch": [
				"/ticino.plugin.json"
			],
			"url": "http://opentools.azurewebsites.net/ticino.plugin.json"
		},
		{
			"fileMatch": [
				"/tsconfig.json"
			],
			"url": "http://json.schemastore.org/tsconfig"
		},
		{
			"fileMatch": [
				"/jsconfig.json"
			],
			"url": "http://opentools.azurewebsites.net/jsconfig"
		},
		{
			"fileMatch": [
				"/.bowerrc"
			],
			"url": "http://json.schemastore.org/bowerrc"
		},
		{
			"fileMatch": [
				"/.jshintrc"
			],
			"url": "http://json.schemastore.org/jshintrc"
		},
		{
			"fileMatch": [
				"/.jscsrc"
			],
			"url": "http://json.schemastore.org/jscsrc"
		}
	],


	//-------- Markdown preview configuration --------

	// A list of URLs or local paths to CSS style sheets to use from the markdown preview.
	"markdown.styles": [],


	//-------- LESS configuration --------

	// Controls problem severities used in the LESS lint validation.

	// When using a vendor-specific prefix make sure to also include all other vendor-specific properties
	"less.lint.compatibleVendorPrefixes": "ignore",

	// When using a vendor-specific prefix also include the standard property
	"less.lint.vendorPrefix": "warning",

	// Do not use duplicate style definitions
	"less.lint.duplicateProperties": "ignore",

	// Do not use empty rulesets
	"less.lint.emptyRules": "warning",

	// Import statements do not load in parallel
	"less.lint.importStatement": "ignore",

	// Do not use width or height when using padding or border
	"less.lint.boxModel": "ignore",

	// The universal selector (*) is known to be slow
	"less.lint.universalSelector": "ignore",

	// No unit for zero needed
	"less.lint.zeroUnits": "ignore",

	// @@font-face rule must define 'src' and 'font-family' properties
	"less.lint.fontFaceProperties": "warning",

	// Hex colors must consist of three or six hex numbers
	"less.lint.hexColorLength": "error",

	// Invalid number of parameters
	"less.lint.argumentsInColorFunction": "error",

	// Unknown property.
	"less.lint.unknownProperties": "warning",

	// IE hacks are only necessary when supporting IE7 and older
	"less.lint.ieHack": "ignore",

	// Unknown vendor specific property.
	"less.lint.unknownVendorSpecificProperties": "ignore",

	// Property is ignored due to the display. E.g. with 'display: inline', the width, height, margin-top, margin-bottom, and float properties have no effect
	"less.lint.propertyIgnoredDueToDisplay": "warning",

	// Avoid using !important. It is an indication that the specificity of the entire CSS has gotten out of control and needs to be refactored.
	"less.lint.important": "ignore",

	// Avoid using 'float'. Floats lead to fragile CSS that is easy to break if one aspect of the layout changes.
	"less.lint.float": "ignore",

	// Selectors should not contain IDs because these rules are too tightly coupled with the HTML.
	"less.lint.idSelector": "ignore",


	//-------- Sass configuration --------

	// Controls problem severities used in the Sass lint validation.

	// When using a vendor-specific prefix make sure to also include all other vendor-specific properties
	"sass.lint.compatibleVendorPrefixes": "ignore",

	// When using a vendor-specific prefix also include the standard property
	"sass.lint.vendorPrefix": "warning",

	// Do not use duplicate style definitions
	"sass.lint.duplicateProperties": "ignore",

	// Do not use empty rulesets
	"sass.lint.emptyRules": "warning",

	// Import statements do not load in parallel
	"sass.lint.importStatement": "ignore",

	// Do not use width or height when using padding or border
	"sass.lint.boxModel": "ignore",

	// The universal selector (*) is known to be slow
	"sass.lint.universalSelector": "ignore",

	// No unit for zero needed
	"sass.lint.zeroUnits": "ignore",

	// @@font-face rule must define 'src' and 'font-family' properties
	"sass.lint.fontFaceProperties": "warning",

	// Hex colors must consist of three or six hex numbers
	"sass.lint.hexColorLength": "error",

	// Invalid number of parameters
	"sass.lint.argumentsInColorFunction": "error",

	// Unknown property.
	"sass.lint.unknownProperties": "warning",

	// IE hacks are only necessary when supporting IE7 and older
	"sass.lint.ieHack": "ignore",

	// Unknown vendor specific property.
	"sass.lint.unknownVendorSpecificProperties": "ignore",

	// Property is ignored due to the display. E.g. with 'display: inline', the width, height, margin-top, margin-bottom, and float properties have no effect
	"sass.lint.propertyIgnoredDueToDisplay": "warning",

	// Avoid using !important. It is an indication that the specificity of the entire CSS has gotten out of control and needs to be refactored.
	"sass.lint.important": "ignore",

	// Avoid using 'float'. Floats lead to fragile CSS that is easy to break if one aspect of the layout changes.
	"sass.lint.float": "ignore",

	// Selectors should not contain IDs because these rules are too tightly coupled with the HTML.
	"sass.lint.idSelector": "ignore",


	//-------- TypeScript configuration --------

	// Complete functions with their parameter signature.
	"typescript.useCodeSnippetsOnMethodSuggest": false,

	// Specifies the folder path containing the tsserver and lib*.d.ts files to use.
	"typescript.tsdk": null

}
```


## Next Steps

OK, so now you know how to customize Visual Studio Code.  Whats next...

* [Keybindings](keybindings) - review the keybindings in Code and learn how to update them
* [Language Support](/docs/languages/overview) - Our Good, Better, Best language grid to see what you can expect
* [Debugging](debugging) - This is where VS Code really shines
* [Node.js](/docs/runtimes/nodejs) - End to end Node scenario with a sample app with a sample app


## Common Questions
**Q: Will you allow us to make our own themes?**

**A:** Yes, we would like to do this. Help us prioritize this work over in our [user voice](http://go.microsoft.com/fwlink/?LinkID=533482) site.

**Q: What is the broader extensibility story?**

**A:** Extensibility is something we definitely plan to add to VS Code.  Help push it up the list on our [user voice](http://go.microsoft.com/fwlink/?LinkID=533482) site.

**Q: When does it make sense to use workspace settings?**

**A:** If you're using a workspace that needs custom settings but you don't want to apply them to your other VS Code projects. A good example is language-specific linting rules.

