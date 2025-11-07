Snippets in Visual Studio Code

Code snippets are templates that make it easier to insert repeating code patterns, such as loops or conditional statements.

In Visual Studio Code, snippets appear in IntelliSense (kb(editor.action.triggerSuggest)), mixed with other suggestions, and in a dedicated snippet picker (Insert Snippet in the Command Palette). There's also support for tab completion: Enable it with "editor.tabCompletion": "on", type a snippet prefix (trigger text), and press kb(insertSnippet) to insert a snippet.

VS Code supports the TextMate snippet syntax
, with exceptions for 'interpolated shell code' and the use of \u (both are unsupported).

Built-in Snippets

VS Code includes built-in snippets for languages like JavaScript, TypeScript, Markdown, and PHP.

To view available snippets for a language, run the Insert Snippet command from the Command Palette. Note that this list includes both user-defined snippets and those provided by extensions.

Install Snippets from the Marketplace

Many extensions
 on the VS Code Marketplace offer snippets. To find them, search for extensions with the @category:"snippets" filter in the Extensions view (kb(workbench.view.extensions)).

After installing an extension, restart VS Code to make the new snippets available.

Create Your Own Snippets

You can easily create your own snippets without installing any extensions. To do so, select Configure Snippets under File > Preferences, then choose the language (by language identifier
) or New Global Snippets file for all languages.

VS Code handles the creation and management of your snippets files.

Snippet files are written in JSON, support C-style comments, and can define unlimited snippets. They support most TextMate syntax, intelligently format whitespace, and allow easy multi-line editing.

Example: A for loop snippet for JavaScript:

// in 'Code/User/snippets/javascript.json'
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

Snippet Explanation:

"For Loop": The name of the snippet, displayed in IntelliSense if no description is provided.

prefix: Defines trigger words for the snippet (e.g., "for" or "for-const").

body: Contains the snippet content. Multiple lines are automatically joined and formatted based on context.

description: Optional, displayed in IntelliSense.

The body includes placeholders, such as ${1:array}, ${2:element}, and $0. You can quickly navigate between these placeholders using kb(jumpToNextSnippetPlaceholder).

File Template Snippets

You can set the isFileTemplate attribute for snippets intended to populate a file. These snippets are displayed in the Snippets: Populate File from Snippet command when creating a new file.

Snippet Scope

Snippets are scoped by language or project:

Language scope: Snippets can be specific to a language (e.g., javascript.json).

Global scope: Snippets defined in a global .code-snippets file are available in all languages.

Project scope: Project-folder snippets are stored in a .vscode folder and shared among all users of the project.

Snippet Syntax

Snippets use special constructs to control text insertion:

Tabstops: Define cursor locations within the snippet ($1, $2, $0).

Placeholders: Allow default values (e.g., ${1:foo}) and can be nested.

Choices: Allow user selection from a list (e.g., ${1|one,two,three|}).

Variables: Insert dynamic values, such as the filename or current date.

Example: Insert a comment based on the language:

{
    "hello": {
        "scope": "javascript,html",
        "prefix": "hello",
        "body": "$BLOCK_COMMENT_START Hello World $BLOCK_COMMENT_END"
    }
}

Variable Transforms

You can use regular expressions to transform variables. For example, you can extract the filename without its extension:

"${TM_FILENAME/(.*)\\..+$/$1/}"

Using TextMate Snippets

VS Code supports TextMate snippets (.tmSnippets) as well. To use them, follow the TextMate Snippets guide
.

Assign Keyboard Shortcuts to Snippets

You can assign keyboard shortcuts to snippets. In keybindings.json, define a custom keybinding to insert a snippet directly:

{
  "key": "cmd+k 1",
  "command": "editor.action.insertSnippet",
  "when": "editorTextFocus",
  "args": {
    "snippet": "console.log($1)$0"
  }
}


You can also reference an existing snippet by specifying its langId and name:

{
  "key": "cmd+k 1",
  "command": "editor.action.insertSnippet",
  "when": "editorTextFocus",
  "args": {
    "langId": "csharp",
    "name": "myFavSnippet"
  }
}

Next Steps

Command Line
 - Explore VS Code's command-line interface for opening files and installing extensions.

Extension API
 - Extend VS Code through custom extensions.

Snippet Guide
 - Learn more about creating and using snippets in VS Code.

Common Questions

Can I use existing TextMate snippets from a .tmSnippet file?

Yes, you can package and use TextMate snippets in VS Code. See Using TextMate Snippets
 for details.

How can I add a variable in a snippet?

To include a variable, escape the $ symbol like this:

"VariableSnippet": {
    "prefix": "_Var",
    "body": "\\$MyVar = 2",
    "description": "A snippet that places a variable into script with the $ prefix"
}


Can I hide snippets from IntelliSense?

Yes, click the Hide from IntelliSense button to remove a snippet from IntelliSense suggestions while keeping it available in the Insert Snippet command.
