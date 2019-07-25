---
# DO NOT TOUCH — Managed by doc writer
ContentId: cd928e7f-bb5a-43b0-8e15-d398e416386d
DateApproved: 7/3/2019

# Summarize the whole topic in less than 300 characters for SEO purpose
MetaDescription: A guide to configure language support for any language in Visual Studio Code.
---

# Language Configuration Guide

The [`contributes.languages`](/api/references/contribution-points#contributes.languages) Contribution Point allows you to define a language configuration that controls the following Declarative Language Features:

- Comment toggling
- Brackets definition
- Autoclosing
- Autosurrounding
- Folding
- Word pattern
- Indentation Rules

Here is a [Language Configuration Sample](https://github.com/Microsoft/vscode-extension-samples/tree/master/language-configuration-sample) that configures the editing experience for JavaScript files. This guide explains the content of `language-configuration.json`:

**Note: If your language configuration file name is or ends with `language-configuration.json`, you will get auto-completion and validation in VS Code.**

```json
{
  "comments": {
    "lineComment": "//",
    "blockComment": ["/*", "*/"]
  },
  "brackets": [["{", "}"], ["[", "]"], ["(", ")"]],
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
    "increaseIndentPattern": "^((?!\\/\\/).)*(\\{[^}\"'`]*|\\([^)\"'`]*|\\[[^\\]\"'`]*)$",
    "decreaseIndentPattern": "^((?!.*?\\/\\*).*\\*/)?\\s*[\\}\\]].*$"
  }
}
```

## Comment toggling

VS Code offers two commands for comment toggling. **Toggle Line Comment** and **Toggle Block Comment**. You can specify `comments.blockComment` and `comments.lineComment` to control how VS Code should comment out lines / blocks.

```json
{
  "comments": {
    "lineComment": "//",
    "blockComment": ["/*", "*/"]
  }
}
```

## Brackets definition

When you move the cursor to a bracket defined here, VS Code will highlight that bracket together with its matching pair.

```json
{
  "brackets": [["{", "}"], ["[", "]"], ["(", ")"]]
}
```

Moreover, when you run **Go to Bracket** or **Select to Bracket**, VS Code will use the definition above to find the nearest bracket and its matching pair.

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
`ES6's Template String`;
```

The single quote will not be autoclosed.

Users can tweak the autoclosing behavior with the `editor.autoClosingQuotes` and `editor.autoClosingBrackets` settings.

### Autoclosing before

By default, VS Code only autocloses pairs if there is whitespace right after the cursor. So when you type `{` in the following JSX code, you would not get autoclose:

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

## Autosurrounding

When you select a range in VS Code and enter an opening bracket, VS Code surrounds the selected content with a pair of brackets. This feature is called Autosurrounding, and here you can define the autosurrounding pairs for a specific language:

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

Users can tweak the autosurrounding behavior with the `editor.autoSurround` setting.

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

## Word Pattern

`wordPattern` defines what's considered as a word in the programming language. So when you use word related commands, like **Move cursor to word start** (`kb(cursorWordStartLeft)`) or **Move cursor to word end** (`kb(cursorWordEndRight)`)，the editor will use this regex to find the word boundaries.

```json
{
  "wordPattern": "(-?\\d*\\.\\d\\w*)|([^\\`\\~\\!\\@\\#\\%\\^\\&\\*\\(\\)\\-\\=\\+\\[\\{\\]\\}\\\\\\|\\;\\:\\'\\\"\\,\\.\\<\\>\\/\\?\\s]+)"
}
```

## Indentation Rules

`indentationRules` defines how the editor should adjust the indentation of current line or next line when you type, paste, and move lines.

```json
{
  "indentationRules": {
    "increaseIndentPattern": "^((?!\\/\\/).)*(\\{[^}\"'`]*|\\([^)\"'`]*|\\[[^\\]\"'`]*)$",
    "decreaseIndentPattern": "^((?!.*?\\/\\*).*\\*/)?\\s*[\\)\\}\\]].*$"
  }
}
```

For example, `if (true) {` matches `increasedIndentPattern`, then if you press `kbstyle(Enter)` after the open bracket `{`, the editor will automatically indent once, and your code will end up as:

```javascript
if (true) {
	console.log();
```

If there is no indentation rule set for the programming language, the editor will indent when the line ends with an open bracket and outdent when you type an closing bracket. The _bracket_ here is defined by `brackets`.

Notice that `editor.formatOnPaste` setting is controlled by the [`DocumentRangeFormattingEditProvider`](/api/references/vscode-api#DocumentRangeFormattingEditProvider) and not affected by auto indentation.
