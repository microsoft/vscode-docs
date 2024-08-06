---
Order: 17
Area: editor
TOCTitle: Snippets
ContentId: 79CD9B45-97FF-48B1-8DD5-2555F56206A6
PageTitle: Snippets in Visual Studio Code
DateApproved: 08/01/2024
MetaDescription: It is easy to add code snippets to Visual Studio Code both for your own use or to share with others on the public Extension Marketplace. TextMate .tmSnippets files are supported.
---
# Snippets in Visual Studio Code

Code snippets are templates that make it easier to enter repeating code patterns, such as loops or conditional-statements.

In Visual Studio Code, snippets appear in IntelliSense (`kb(editor.action.triggerSuggest)`) mixed with other suggestions, as well as in a dedicated snippet picker (**Insert Snippet** in the Command Palette). There is also support for tab-completion: Enable it with `"editor.tabCompletion": "on"`, type a **snippet prefix** (trigger text), and press `kb(insertSnippet)` to insert a snippet.

The snippet syntax follows the [TextMate snippet syntax](https://manual.macromates.com/en/snippets) with the exceptions of 'interpolated shell code' and the use of `\u`; both are not supported.

![ajax snippet](images/userdefinedsnippets/ajax-snippet.gif)

## Built-in snippets

VS Code has built-in snippets for a number of languages such as: JavaScript, TypeScript, Markdown, and PHP.

![builtin javascript snippet](images/userdefinedsnippets/builtin-javascript-snippets.png)

You can see the available snippets for a language by running the **Insert Snippet** command in the Command Palette to get a list of the snippets for the language of the current file. However, keep in mind that this list also includes user snippets that you have defined, and any snippets provided by extensions you have installed.

## Install snippets from the Marketplace

Many [extensions](/docs/editor/extension-marketplace.md) on the [VS Code Marketplace](https://marketplace.visualstudio.com/vscode) include snippets. You can search for extensions that contains snippets in the Extensions view (`kb(workbench.view.extensions)`) using the `@category:"snippets"` filter.

![Searching for extensions with snippets](images/userdefinedsnippets/category-snippets.png)

If you find an extension you want to use, install it, then restart VS Code and the new snippets will be available.

## Create your own snippets

You can easily define your own snippets without any extension. To create or edit your own snippets, select **Configure User Snippets** under **File** > **Preferences**, and then select the language (by [language identifier](/docs/languages/identifiers.md)) for which the snippets should appear, or the **New Global Snippets file** option if they should appear for all languages. VS Code manages the creation and refreshing of the underlying snippets file(s) for you.

![snippet dropdown](images/userdefinedsnippets/snippet-dropdown.png)

Snippets files are written in JSON, support C-style comments, and can define an unlimited number of snippets. Snippets support most TextMate syntax for dynamic behavior, intelligently format whitespace based on the insertion context, and allow easy multiline editing.

Below is an example of a `for` loop snippet for JavaScript:

```json
// in file 'Code/User/snippets/javascript.json'
{
    "For Loop": {
        "prefix": [
          "for",
          "for-const"
        ],
        "body": [
          "for (const ${2:element} of ${1:array}) {",
          "\t$0",
          "}"
        ],
        "description": "A for loop."
    }
}
```

In the example above:

* "For Loop" is the snippet name. It is displayed via IntelliSense if no `description` is provided.
* `prefix` defines one or more trigger words that display the snippet in IntelliSense. Substring matching is performed on prefixes, so in this case, "fc" could match "for-const".
* `body` is one or more lines of content, which will be joined as multiple lines upon insertion. Newlines and embedded tabs will be formatted according to the context in which the snippet is inserted.
* `description` is an optional description of the snippet displayed by IntelliSense.

Additionally, the `body` of the example above has three placeholders (listed in order of traversal): `${1:array}`, `${2:element}`, and `$0`. You can quickly jump to the next placeholder with `kb(jumpToNextSnippetPlaceholder)`, at which point you may edit the placeholder or jump to the next one. The string after the colon `:` (if any) is the default text, for example `element` in `${2:element}`. Placeholder traversal order is ascending by number, starting from one; zero is an optional special case that always comes last, and exits snippet mode with the cursor at the specified position.

### File template snippets

You can add the `isFileTemplate` attribute to your snippet's definition if the snippet is intended to populate or replace a file's contents. File template snippets are displayed in a dropdown when you run the **Snippets: Populate File from Snippet** command in a new or existing file.

## Snippet scope

Snippets are scoped so that only relevant snippets are suggested. Snippets can be scoped by either:

1. the **language(s)** to which snippets are scoped (possibly all)
2. the **project(s)** to which snippets are scoped (probably all)

### Language snippet scope

Every snippet is scoped to one, several, or all ("global") languages based on whether it is defined in:

1. a **language** snippet file
2. a **global** snippet file

Single-language user-defined snippets are defined in a specific language's snippet file (for example `javascript.json`), which you can access by language identifier through **Snippets: Configure User Snippets**. A snippet is only accessible when editing the language for which it is defined.

Multi-language and global user-defined snippets are all defined in "global" snippet files (JSON with the file suffix `.code-snippets`), which is also accessible through **Snippets: Configure User Snippets**. In a global snippets file, a snippet definition may have an additional `scope` property that takes one or more [language identifiers](/docs/languages/identifiers.md), which makes the snippet available only for those specified languages. If no `scope` property is given, then the global snippet is available in **all** languages.

Most user-defined snippets are scoped to a single language, and so are defined in a language-specific snippet file.

### Project snippet scope

You can also have a global snippets file (JSON with file suffix `.code-snippets`) scoped to your project. Project-folder snippets are created with the **New Snippets file for '<folder-name>'...** option in the **Snippets: Configure User Snippets** dropdown menu and are located at the root of the project in a `.vscode` folder. Project snippet files are useful for sharing snippets with all users working in that project. Project-folder snippets are similar to global snippets and can be scoped to specific languages through the `scope` property.

## Snippet syntax

The `body` of a snippet can use special constructs to control cursors and the text being inserted. The following are supported features and their syntaxes:

### Tabstops

With tabstops, you can make the editor cursor move inside a snippet. Use `$1`, `$2` to specify cursor locations. The number is the order in which tabstops will be visited, whereas `$0` denotes the final cursor position. Multiple occurrences of the same tabstop are linked and updated in sync.

### Placeholders

Placeholders are tabstops with values, like `${1:foo}`. The placeholder text will be inserted and selected such that it can be easily changed. Placeholders can be nested, like `${1:another ${2:placeholder}}`.

### Choice

Placeholders can have choices as values. The syntax is a comma-separated enumeration of values, enclosed with the pipe-character, for example `${1|one,two,three|}`. When the snippet is inserted and the placeholder selected, choices will prompt the user to pick one of the values.

### Variables

With `$name` or `${name:default}`, you can insert the value of a variable. When a variable isn't set, its **default** or the empty string is inserted. When a variable is unknown (that is, its name isn't defined) the name of the variable is inserted and it is transformed into a placeholder.

The following variables can be used:

* `TM_SELECTED_TEXT` The currently selected text or the empty string
* `TM_CURRENT_LINE` The contents of the current line
* `TM_CURRENT_WORD` The contents of the word under cursor or the empty string
* `TM_LINE_INDEX` The zero-index based line number
* `TM_LINE_NUMBER` The one-index based line number
* `TM_FILENAME` The filename of the current document
* `TM_FILENAME_BASE` The filename of the current document without its extensions
* `TM_DIRECTORY` The directory of the current document
* `TM_FILEPATH` The full file path of the current document
* `RELATIVE_FILEPATH` The relative (to the opened workspace or folder) file path of the current document
* `CLIPBOARD` The contents of your clipboard
* `WORKSPACE_NAME` The name of the opened workspace or folder
* `WORKSPACE_FOLDER` The path of the opened workspace or folder
* `CURSOR_INDEX` The zero-index based cursor number
* `CURSOR_NUMBER` The one-index based cursor number

For inserting the current date and time:

* `CURRENT_YEAR` The current year
* `CURRENT_YEAR_SHORT` The current year's last two digits
* `CURRENT_MONTH` The month as two digits (example '02')
* `CURRENT_MONTH_NAME` The full name of the month (example 'July')
* `CURRENT_MONTH_NAME_SHORT` The short name of the month (example 'Jul')
* `CURRENT_DATE` The day of the month as two digits (example '08')
* `CURRENT_DAY_NAME` The name of day (example 'Monday')
* `CURRENT_DAY_NAME_SHORT` The short name of the day (example 'Mon')
* `CURRENT_HOUR` The current hour in 24-hour clock format
* `CURRENT_MINUTE` The current minute as two digits
* `CURRENT_SECOND` The current second as two digits
* `CURRENT_SECONDS_UNIX` The number of seconds since the Unix epoch
* `CURRENT_TIMEZONE_OFFSET` The current UTC time zone offset as `+HH:MM` or `-HH:MM` (example `-07:00`).

For inserting random values:

* `RANDOM` 6 random Base-10 digits
* `RANDOM_HEX` 6 random Base-16 digits
* `UUID` A Version 4 UUID

For inserting line or block comments, honoring the current language:

* `BLOCK_COMMENT_START` Example output: in PHP `/*` or in HTML `<!--`
* `BLOCK_COMMENT_END` Example output: in PHP `*/` or in HTML `-->`
* `LINE_COMMENT` Example output: in PHP `//`

The snippet below inserts `/* Hello World */` in JavaScript files and `<!-- Hello World -->` in HTML files:

```json
{
    "hello": {
        "scope": "javascript,html",
        "prefix": "hello",
        "body": "$BLOCK_COMMENT_START Hello World $BLOCK_COMMENT_END"
    }
}
```

### Variable transforms

Transformations allow you to modify the value of a variable before it is inserted. The definition of a transformation consists of three parts:

1. A regular expression that is matched against the value of a variable, or the empty string when the variable cannot be resolved.
2. A "format string" that allows to reference matching groups from the regular expression. The format string allows for conditional inserts and simple modifications.
3. Options that are passed to the regular expression.

The following example inserts the name of the current file without its ending, so from `foo.txt` it makes `foo`.

```
${TM_FILENAME/(.*)\\..+$/$1/}
  |           |         |  |
  |           |         |  |-> no options
  |           |         |
  |           |         |-> references the contents of the first
  |           |             capture group
  |           |
  |           |-> regex to capture everything before
  |               the final `.suffix`
  |
  |-> resolves to the filename
```

### Placeholder-Transform

Like a Variable-Transform, a transformation of a placeholder allows changing the inserted text for the placeholder when moving to the next tab stop.
The inserted text is matched with the regular expression and the match or matches - depending on the options - are replaced with the specified replacement format text.
Every occurrence of a placeholder can define its own transformation independently using the value of the first placeholder.
The format for Placeholder-Transforms is the same as for Variable-Transforms.

### Transform examples

The examples are shown within double quotes, as they would appear inside a snippet body, to illustrate the need to double escape certain characters. Sample transformations and the resulting output for the filename `example-123.456-TEST.js`.

Example | Output | Explanation
-------------|--------|------------
`"${TM_FILENAME/[\\.]/_/}"` | `example-123_456-TEST.js` | Replace the first `.` with `_`
`"${TM_FILENAME/[\\.-]/_/g}"` | `example_123_456_TEST_js` | Replace each `.` or `-` with `_`
`"${TM_FILENAME/(.*)/${1:/upcase}/}"` | `EXAMPLE-123.456-TEST.JS` | Change to all uppercase
`"${TM_FILENAME/[^0-9a-z]//gi}"` | `example123456TESTjs` | Remove non-alphanumeric characters

### Grammar

Below is the EBNF ([extended Backus-Naur form](https://en.wikipedia.org/wiki/Extended_Backus-Naur_form)) for snippets. With `\` (backslash), you can escape `$`, `}`, and `\`. Within choice elements, the backslash also escapes comma and pipe characters. Only the characters required to be escaped can be escaped, so `$` should not be escaped within these constructs and neither `$` or `}` should be escaped inside choice constructs.

```
any         ::= tabstop | placeholder | choice | variable | text
tabstop     ::= '$' int
                | '${' int '}'
                | '${' int  transform '}'
placeholder ::= '${' int ':' any '}'
choice      ::= '${' int '|' text (',' text)* '|}'
variable    ::= '$' var | '${' var '}'
                | '${' var ':' any '}'
                | '${' var transform '}'
transform   ::= '/' regex '/' (format | text)+ '/' options
format      ::= '$' int | '${' int '}'
                | '${' int ':' '/upcase' | '/downcase' | '/capitalize' | '/camelcase' | '/pascalcase' '}'
                | '${' int ':+' if '}'
                | '${' int ':?' if ':' else '}'
                | '${' int ':-' else '}' | '${' int ':' else '}'
regex       ::= JavaScript Regular Expression value (ctor-string)
options     ::= JavaScript Regular Expression option (ctor-options)
var         ::= [_a-zA-Z] [_a-zA-Z0-9]*
int         ::= [0-9]+
text        ::= .*
if          ::= text
else        ::= text
```

## Using TextMate snippets

You can also use existing TextMate snippets (.tmSnippets) with VS Code. See the [Using TextMate Snippets](/api/language-extensions/snippet-guide.md#using-textmate-snippets) topic in our Extension API section to learn more.

## Assign keybindings to snippets

You can create custom [keybindings](/docs/getstarted/keybindings.md) to insert specific snippets. Open `keybindings.json` (**Preferences: Open Keyboard Shortcuts File**), which defines all your keybindings, and add a keybinding passing `"snippet"` as an extra argument:

```json
{
  "key": "cmd+k 1",
  "command": "editor.action.insertSnippet",
  "when": "editorTextFocus",
  "args": {
    "snippet": "console.log($1)$0"
  }
}
```

The keybinding will invoke the **Insert Snippet** command but instead of prompting you to select a snippet, it will insert the provided snippet. You define the custom [keybinding](/docs/getstarted/keybindings.md) as usual with a keyboard shortcut, command ID, and optional [when clause context](/docs/getstarted/keybindings.md#when-clause-contexts) for when the keyboard shortcut is enabled.

Also, instead of using the `snippet` argument value to define your snippet inline, you can reference an existing snippet by using the `langId` and `name` arguments. The `langId` argument selects the language for which the snippet denoted by `name` is inserted, e.g the sample below selects the `myFavSnippet` that's available for `csharp`-files.

```json
{
  "key": "cmd+k 1",
  "command": "editor.action.insertSnippet",
  "when": "editorTextFocus",
  "args": {
    "langId": "csharp",
    "name": "myFavSnippet"
  }
}
```

## Next steps

* [Command Line](/docs/editor/command-line.md) - VS Code has a rich command-line interface to open or diff files and install extensions.
* [Extension API](/api) - Learn about other ways to extend VS Code.
* [Snippet Guide](/api/language-extensions/snippet-guide.md) - You can package snippets for use in VS Code.

## Common questions

### What if I want to use existing TextMate snippets from a .tmSnippet file?

You can easily package TextMate snippets files for use in VS Code. See [Using TextMate Snippets](/api/language-extensions/snippet-guide.md#using-textmate-snippets) in our Extension API documentation.

### How do I have a snippet place a variable in the pasted script?

To have a variable in the pasted script, you need to escape the '$' of the `$variable` name so that it isn't parsed by the snippet expansion phase.

```json
"VariableSnippet":{
    "prefix": "_Var",
    "body": "\\$MyVar = 2",
    "description": "A basic snippet that places a variable into script with the $ prefix"
  }
```

This results in the pasted snippet as:

```
$MyVar = 2
```

### Can I remove snippets from IntelliSense?

Yes, you can hide specific snippets from showing in IntelliSense (completion list) by selecting the **Hide from IntelliSense** button to the right of snippet items in the **Insert Snippet** command dropdown.

 ![Hide from IntelliSense button in Insert Snippet dropdown](images/userdefinedsnippets/hide-from-intellisense.png)

 You can still select the snippet with the **Insert Snippet** command but the hidden snippet won't be displayed in IntelliSense.
