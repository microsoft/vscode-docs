---
---

# Language Configuration Guide

The [`contributes.languages`](/api/references/contribution-points#contributes.languages) Contribution Point allows you to define a language configuration that controls the following language features:

- Comment toggling
- Brackets definition for auto-indentation
- Autoclosing
- Autosurronding
- Folding
- TODO: Word pattern
- TODO: Indentation Rules

Here is a [Language Configuration Sample](https://github.com/Microsoft/vscode-extension-samples/tree/master/language-configuration-sample) that configures the experience for JavaScript files. This guide will explain the source:

`language-configuration.json`
```json
{
	"comments": {
		"lineComment": "//",
		"blockComment": [ "/*", "*/" ]
	},
	"brackets": [
		["{", "}"],
		["[", "]"],
		["(", ")"]
	],
	"autoClosingPairs": [
		{ "open": "{", "close": "}" },
		{ "open": "[", "close": "]" },
		{ "open": "(", "close": ")" },
		{ "open": "'", "close": "'", "notIn": ["string", "comment"] },
		{ "open": "\"", "close": "\"", "notIn": ["string"] },
		{ "open": "`", "close": "`", "notIn": ["string", "comment"] },
		{ "open": "/**", "close": " */", "notIn": ["string"] }
  ],
	"autoCloseBefore": ";:.,=}])>` \n\t",
	"surroundingPairs": [
		["{", "}"],
		["[", "]"],
		["(", ")"],
		["'", "'"],
		["\"", "\""],
		["`", "`"]
	],
	"folding": {
		"markers": {
			"start": "^\\s*//\\s*#?region\\b",
			"end": "^\\s*//\\s*#?endregion\\b"
		}
	},
	"wordPattern": "(-?\\d*\\.\\d\\w*)|([^\\`\\~\\!\\@\\#\\%\\^\\&\\*\\(\\)\\-\\=\\+\\[\\{\\]\\}\\\\\\|\\;\\:\\'\\\"\\,\\.\\<\\>\\/\\?\\s]+)",
	"indentationRules": {
		"increaseIndentPattern": "^((?!.*?\\/\\*).*\\*\/)?\\s*[\\}\\]].*$",
		"decreaseIndentPattern": "^((?!\\/\\/).)*(\\{[^}\"'`]*|\\([^)\"'`]*|\\[[^\\]\"'`]*)$"
	}
}
```

## Comment toggling

VS Code offers two commands for comment toggling. `Toggle Line Comment` and `Toggle Block Comment`. You can specify `comments.blockComment` and `comments.lineComment` to control how VS Code should comment out lines / blocks.

```json
{
	"comments": {
		"lineComment": "//",
		"blockComment": [ "/*", "*/" ]
	}
}
```

## Brackets definition

When you move the cursor to a bracket defined here, VSCode will highlight that bracket together with its matching pair.

```json
{
	"brackets": [
		["{", "}"],
		["[", "]"],
		["(", ")"]
	]
}
```

Moreover, when you run `Go to Bracket` or `Select to Bracket`, VSCode will use the defintion above to find the nearest bracket and its matching pair.

## Autoclosing

When you type `'`, VS Code creates a pair of single quotes and puts your cursor in the middle: `'|'`. This section defines such pairs.

```json
{
	"autoClosingPairs": [
		{ "open": "{", "close": "}" },
		{ "open": "[", "close": "]" },
		{ "open": "(", "close": ")" },
		{ "open": "'", "close": "'", "notIn": ["string", "comment"] },
		{ "open": "\"", "close": "\"", "notIn": ["string"] },
		{ "open": "`", "close": "`", "notIn": ["string", "comment"] },
		{ "open": "/**", "close": " */", "notIn": ["string"] }
	]
}
```

The `notIn` key disables this feature in certain code ranges. For example, when you are writing the following code:

```js
// ES6's Template String
`ES6's Template String`
```

The single quote will not be autoclosed.

Users can tweak the autoclosing behavior with `editor.autoClosingQuotes` and `editor.autoClosingBrackets`.

### Autoclosing before

In the past, VS Code only autocloses pairs if there is whitespace right after the cursor. So when you type `{` in the following JSX code, you would not get autoclose:

```js
const Component = () =>
  <div className={>
                  ^ Does not get autoclosed by default
  </div>
```
However, this definition overrides that behavior:

```json
{
	"autoCloseBefore": ";:.,=}])>` \n\t"
}
```

Now when you enter `{` right before `>`, VS Code autocloses it with `}`.

## Autosurronding

When you select a range in VS Code and enters an opening bracket, VS Code would surrond the selected content with a pair of brackets. This feature is called Autosurronding, and here you can define the autosurronding pairs for a specific language:

```json
{
	"surroundingPairs": [
		["{", "}"],
		["[", "]"],
		["(", ")"],
		["'", "'"],
		["\"", "\""],
		["`", "`"]
	]
}
```
Users can tweak the autosurronding behavior with `editor.autoSurround`.

## Folding

In VS Code, there are three kinds of folding:

- Indentation based folding: This is VS Code's default folding behavior. When it sees two lines of the same indentation level, it creates a folding marker that allows you to collapse that region.
- Language configuration folding: When VS Code finds both the `start` and `end` regex defined in `folding.markers`, it creates a folding marker enclosing the content inside the pair. The following JSON creates folding markers for `//#region` and `//#endregion`.

```json
{
	"folding": {
		"markers": {
			"start": "^\\s*//\\s*#?region\\b",
			"end": "^\\s*//\\s*#?endregion\\b"
		}
	}
}
```

- Language server folding: The Language Server responds to the [`textDocument/foldingRange`](https://microsoft.github.io/language-server-protocol/specification#textDocument_foldingRange) request with a list of folding ranges, and VS Code would render the ranges as folding markers. Learn more about the folding support in Language Server Protocol at the [Programmatic Language Feature](/api/language-extensions/programmatic-language-features) topic.

**TODO: PINE - Add folding illustration to the programmatic language features topic**

## Word Pattern

`wordPattern` defines what's being considered as a word in a the programming language. So when you use word related commands, like `Move cursor to word start`(`kb(cursorWordStartLeft)`) or `Move cursor to word end` (`kb(cursorWordEndRight)`)，the editor will use this regex to find the word boundaries.

```json
"wordPattern": "(-?\\d*\\.\\d\\w*)|([^\\`\\~\\!\\@\\#\\%\\^\\&\\*\\(\\)\\-\\=\\+\\[\\{\\]\\}\\\\\\|\\;\\:\\'\\\"\\,\\.\\<\\>\\/\\?\\s]+)",
```

## Indentation Rules

`indentationRules` defines how the editor should adjust the indentation of current line or next line when you type, paste and move lines.

```json
"indentationRules": {
	"increaseIndentPattern": "^((?!.*?\\/\\*).*\\*\/)?\\s*[\\}\\]].*$",
	"decreaseIndentPattern": "^((?!\\/\\/).)*(\\{[^}\"'`]*|\\([^)\"'`]*|\\[[^\\]\"'`]*)$"
}
```

For example, `if (true) {` matches `increasedIndentPattern`, then if you press enter after the open bracket `{`, the editor will automatically indent once and your code will end up as

```javascript
if (true) {
	console.log();
```

If there is no indentation rule set for the programming language, the editor will indent when the line ends with an open bracket and outdent when you type an closing bracket. The *bracket* here is defined by `brackets`.