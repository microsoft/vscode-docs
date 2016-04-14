---
Order: 2
Area: extensionapi
TOCTitle: Extension Manifest
ContentId: C4F184A5-A804-4B0B-9EBA-AFE83B88EE49
PageTitle: Visual Studio Code Extension Manifest File - package.json
DateApproved: 4/14/2016
MetaDescription: At the core of Visual Studio Code's extensibility model is an extension (plug-in) manifest file where your extension declares its extension type(s), activation rules and runtime resources.
---

# Extension Manifest File - package.json

Every Visual Studio Code extension needs a manifest file `package.json` at the root of the extension directory structure.

## Fields

Name | Required | Type | Details
---- |:--------:| ---- | -------
`name` | Y | `string` | The name of the extension - should be all lowercase with no spaces.
`version` | Y | `string` | [SemVer](http://semver.org/) compatible version.
`publisher` | Y | `string` | The [publisher name](/docs/tools/vscecli.md#publishers-and-personal-access-tokens)
`engines` | Y | `object` | An object containing at least the `vscode` key matching the versions of VS Code that the extension is compatible with.  Cannot be `*`. For example: `^0.10.5` indicates compatibility with a minimum VS Code version of `0.10.5`.
`license` | | `string` | Refer to [npm's documentation](https://docs.npmjs.com/files/package.json#license). If you do have a `LICENSE` file in the root of your extension, the value for `license` should be `"SEE LICENSE IN <filename>"`.
`displayName` | | `string`| The display name for the extension used in the Marketplace.
`description` | | `string` | A short description of what your extension is and does.
`categories` | | `string[]` | the categories you want to use for the extensions allowed values: `[Languages, Snippets, Linters, Themes, Debuggers, Other]`
`keywords` | | `array` | An array of **keywords** or **tags** to make it easier to find the extension.
`galleryBanner` | | `object` | Helps format the Marketplace header to match your icon.  See details below.
`preview` | | `boolean` | Sets the extension to be flagged as a Preview in the Marketplace.
`main` | | `string` | The entry point to your extension.
[`contributes`](/docs/extensionAPI/extension-points.md) | | `object` | An object describing the extension's [contributions](/docs/extensionAPI/extension-points.md).
[`activationEvents`](/docs/extensionAPI/activation-events.md) | | `array` | An array of the [activation events](/docs/extensionAPI/activation-events.md) for this extension.
`dependencies` | | `object` | Any runtime Node.js dependencies your extensions needs. Exactly the same as [npm's `dependencies`](https://docs.npmjs.com/files/package.json#dependencies).
`devDependencies` | | `object` | Any development Node.js dependencies your extension needs. Exactly the same as [npm's `devDependencies`](https://docs.npmjs.com/files/package.json#devdependencies).
`extensionDependencies` | | `array` | An array with the ids of extensions that this extension depends on. The id of an extension is always `${publisher}.${name}`. For example: `vscode.csharp`.
`scripts` | | `object` | Exactly the same as [npm's `scripts`](https://docs.npmjs.com/misc/scripts) but with [extra VS Code specific fields](/docs/tools/vscecli.md#pre-publish-step).
`icon` | | `string` | The path to a 128x128 pixel icon.

Also check [npm's `package.json` reference](https://docs.npmjs.com/files/package.json).

## Example

Here is a complete `package.json`

```json
{
	"name": "Spell",
	"displayName": "Spelling and Grammar Checker",
	"description": "Detect mistakes as you type and suggest fixes - great for Markdown.",
	"icon": "images/spellIcon.svg",
	"version": "0.0.19",
	"publisher": "seanmcbreen",
	"galleryBanner": {
		"color": "#0000FF",
		"theme": "dark"
	},
	"license": "SEE LICENSE IN LICENSE.md",
	"bugs": {
		"url": "https://github.com/Microsoft/vscode-spell-check/issues",
		"email": "smcbreen@microsoft.com"
	},
	"homepage": "https://github.com/Microsoft/vscode-spell-check/blob/master/README.md",
	"repository": {
		"type": "git",
		"url": "https://github.com/Microsoft/vscode-spell-check.git"
	},
	"categories": [
		"Linters", "Languages", "Other"
	],
	"engines": {
		"vscode": "0.10.x"
	},
	"main": "./out/extension",
	"activationEvents": [
		"onLanguage:markdown"
	],
	"contributes": {
		"commands": [
			{
				"command": "Spell.suggestFix",
				"title": "Spell Checker Suggestions"
			}
		],
		"keybindings": [
			{
				"command": "Spell.suggestFix",
				"key": "Alt+."
			}
		]
	},
	"scripts": {
		"vscode:prepublish": "node ./node_modules/vscode/bin/compile",
		"compile": "node ./node_modules/vscode/bin/compile -watch -p ./"
	},
	"dependencies": {
		"teacher": "^0.0.1"
	},
	"devDependencies": {
		"vscode": "^0.11.x"
	}
}
```

## Marketplace Presentation Tips

Here are some tips and recommendations to make your extension look great when displayed on the [VS Code Marketplace](https://marketplace.visualstudio.com/VSCode).

Always use the latest `vsce` so `npm install -g vsce` to make sure you have it.

Have a `README.md` Markdown file in your extension's root folder and we will include the contents in the body of the extension details (on the Marketplace).  You can provide relative path image links in the `REAMDE.md`.

Here are a few examples:

1. [Spell-Checker](https://marketplace.visualstudio.com/items/seanmcbreen.Spell)
2. [MD Tools](https://marketplace.visualstudio.com/items/seanmcbreen.MDTools)


Provide a good display name and description. This is important for the Marketplace and in product displays.  These strings are also used for text search in VS Code and having relevant keywords will help a lot.
```json
	"displayName": "Spelling and Grammar Checker",
	"description": "Detect mistakes as you type and suggest fixes - great for Markdown.",
```

An Icon and a contrasting banner color looks great on the Marketplace page header.  The `theme` attribute refers to the font to be used in the banner - `dark` or `light`.
```json
	"icon": "images/spellIcon.svg",
	"galleryBanner": {
		"color": "#5c2d91",
		"theme": "dark"
	},
```

There are several optional links (`bugs`, `homepage`, `repository`) you can set and these are displayed under the **Resources** section of the Marketplace.
```json
	"license": "SEE LICENSE IN LICENSE.md",
	"bugs": {
		"url": "https://github.com/Microsoft/vscode-spell-check/issues"
	},
	"homepage": "https://github.com/Microsoft/vscode-spell-check/blob/master/README.md",
	"repository": {
		"type": "git",
		"url": "https://github.com/Microsoft/vscode-spell-check.git"
	}
```

Marketplace Resources link | package.json attribute
-----------------|-----------------------
Support | `bugs:url`
Get Started | `repository:url`
Learn | `homepage`
License | `license`

Set a `category` for your extension.  Extensions in the same `category` are grouped together on the Marketplace which improves filtering and discovery.

>**Note:** Only use the values that make sense for your extension - allowed values are `[Languages, Snippets, Linters, Themes, Debuggers, Other]`

```json
	"categories": [
		"Linters", "Languages", "Other"
	],
```

## Combining Extension Contributions

The `yo code` generator lets you easily package TextMate themes, colorizers and snippets and create new extensions.  When the generator is run, it creates a complete standalone extension package for each option.  However it is often more convenient to have a single extension which combines multiple contributions.  For example, if you are adding support for a new language, you'd like to provide users with both the language definition with colorization and also snippets and perhaps even debugging support.

To combine extension contributions, simply edit an existing extension manifest `package.json` and add the new contributions and associated files.

Below is an extension manifest which includes a LaTex language definition (language identifier and file extensions), colorization (`grammar`), and snippets.

```json
{
	"name": "language-latex",
	"description": "LaTex Language Support",
	"version": "0.0.1",
	"publisher": "someone",
	"engines": {
		"vscode": "0.10.x"
	},
	"categories": [
		"Languages",
		"Snippets"
	],
	"contributes": {
		"languages": [{
			"id": "latex",
			"aliases": ["LaTeX", "latex"],
			"extensions": [".tex"]
		}],
		"grammars": [{
			"language": "latex",
			"scopeName": "text.tex.latex",
			"path": "./syntaxes/latex.tmLanguage"
		}],
		"snippets": [{
			"language": "latex",
			"path": "./snippets/snippets.json"
		}]
	}
}
```

Notice that the extension manifest `categories` attribute now includes both `Languages` and `Snippets` for easy discovery and filtering on the Marketplace.

>**Tip:** Make sure your merged contributions are using the same identifiers.  In the example above, all three contributions are using "latex" as the language identifier.  This lets VS Code know that the colorizer (`grammar`) and snippets are for the LaTeX language and will be active when editing LaTeX files.

## Next Steps
To learn more about VS Code extensibility model, try these topic:

* [Contribution Points](/docs/extensionAPI/extension-points.md) - VS Code contribution points reference
* [Activation Events](/docs/extensionAPI/activation-events.md) - VS Code activation events reference
* [Extension Marketplace](/docs/editor/extension-gallery.md) - Read more about the VS Code Extension Marketplace

## Common Questions

Nothing yet

