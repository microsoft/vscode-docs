---
Order: 15
Area: languages
TOCTitle: Ruby
ContentId: 33c079a7-f8d5-48fc-9d92-16be760b42ab
PageTitle: Ruby with Visual Studio Code
DateApproved: 3/23/2023
MetaDescription: Learn about Visual Studio Code editor features (code completion, debugging, snippets, linting) for Ruby.
---
# Ruby in Visual Studio Code

[Ruby](https://www.ruby-lang.org) is a dynamic, open-source programming language known for its simplicity and productivity. With an expressive and elegant syntax, part of the Ruby philosophy is to make developers happy. It is often used for web development with a range of different frameworks, and for scripting, allowing for fast iterations when building prototypes.

This topic goes into detail about setting up and using Ruby within Visual Studio Code, with the
[Ruby LSP](https://marketplace.visualstudio.com/items?itemName=Shopify.ruby-lsp) extension.

![Ruby extension banner](images/ruby/ruby_lsp_extension.png)

## Installation

### Install Ruby through a version manager

While Ruby is installed by default on some operating systems (such as macOS and some distributions of Linux), we recommend using a version manager such as [rbenv](https://github.com/rbenv/rbenv) to be able to access newer versions of Ruby on Windows, macOS, and Linux. Follow the [installation guidance](https://github.com/rbenv/rbenv#installation) for your platform.

>**Note**: As with installing any new toolset on your machine, you'll want to make sure to restart your terminal/Command Prompt and VS Code instances to use the updated toolset location in your platform's PATH variable.

### Install the Ruby LSP extension in VS Code

You can find and install the Ruby LSP extension from within VS Code via the Extensions view
(`kb(workbench.view.extensions)`) and searching for 'Ruby LSP'.

![Ruby LSP extension in the Extensions view](images/ruby/ruby_lsp_extensions_view.png)

We'll discuss many of Ruby LSP features in this topic but you can also refer to the extension's documentation at [https://github.com/Shopify/vscode-ruby-lsp](https://github.com/Shopify/vscode-ruby-lsp).

### Check your installation

After installing, check the language status item to see the status of the Ruby LSP server. If the version manager has been configured, it should display the right Ruby version for your project. The server status should display starting or running, but not error.

![Ruby LSP language status center](images/ruby/ruby_lsp_status_center.png)

The extension generates a `.ruby-lsp` folder automatically with a custom bundle that includes the language server gem `ruby-lsp`. No configuration should be required.

By default, the extension tries to automatically detect the Ruby version manager you're using and use the right versions and paths accordingly. If you want to customize that behavior, set the following configuration in your user [settings](/docs/getstarted/settings.md):

```json
"rubyLsp.rubyVersionManager": "rbenv"
```

The extension will automatically try to update the `ruby-lsp` language server gem once per day; if you want to force that to happen, use the Command Palette (`kb(workbench.action.showCommands)`) to execute **Ruby LSP: Update language server gem**.

If you have any problems, see [troubleshooting](https://github.com/Shopify/vscode-ruby-lsp#troubleshooting) for next steps.

## Main features

### Symbol detection

Ruby LSP parses source code and provides symbol detection and navigation for the Outline pane, file breadcrumbs, and symbol searches (accessible with `kb(workbench.action.gotoSymbol)` by default).

![Ruby document symbols](images/ruby/ruby_lsp_symbols.png)

To learn more about moving quickly through your source code with VS Code, check out [Code Navigation](/docs/editor/editingevolved.md).

### Inlay hints

Ruby LSP is able to display useful information about inferred or implicit values in your code. In the example below, you can see `StandardError` being shown as the implicit exception class being rescued in an empty `rescue` call.

![Ruby program with inlay hints displayed](images/ruby/ruby_lsp_inlay_hints.png)

While inlay hints can be helpful for understanding your code, you can also disable the feature via the **Editor > Inlay Hints: Enabled** setting (`editor.inlayHints.enabled`) or use the following to disable this feature only for Ruby LSP:

```json
"rubyLsp.enabledFeatures": {
    "inlayHint": false,
}
```

### Code snippets

As you type in a Ruby file, Ruby LSP might suggest expanding snippets used for common Ruby operations such as creating a new method, class, block, or test boilerplate. To see the full list, check out the snippets file in the Ruby LSP [GitHub repository](https://github.com/Shopify/vscode-ruby-lsp/blob/main/snippets.json).

### Semantic syntax highlighting

Ruby LSP is able to use [semantic syntax highlighting](https://github.com/microsoft/vscode/wiki/Semantic-Highlighting-Overview) and styling due to its rich understanding of a project source code.

For example, it can highlight:

* Method invocations consistently, without confusing it with local variables.
* Local arguments (such as method, block or lambda arguments) consistently inside the scope in which they exist.

![Ruby LSP semantic highlighting](images/ruby/ruby_lsp_semantic_highlighting.png)

>**Note**: This screenshot is using the Spinel theme included in the [Ruby extension pack](https://marketplace.visualstudio.com/items?itemName=Shopify.ruby-extensions-pack). Themes must use the information surfaced by the Ruby LSP in order to provide rich highlighting for Ruby files.

To use this feature, the editor must have semantic highlighting enabled.

```json
"editor.semanticHighlighting.enabled": true,
```

### Linting and formatting

By default, Ruby LSP provides linting and formatting through an integration with [RuboCop](https://github.com/rubocop/rubocop). You can format your Ruby file using `kb(editor.action.formatDocument)` or by running the **Format Document** command from the Command Palette (`kb(workbench.action.showCommands)`) or the context menu in the editor.

If your project does not use RuboCop, the Ruby LSP will format files using [SyntaxTree](https://ruby-syntax-tree.github.io/syntax_tree).

![Linting a Ruby file](images/ruby/ruby_lsp_linting.png)

You can also run the formatter on each save (**Editor: Format On Save**) to keep your Ruby code properly formatted automatically while you are working. To do that, you must enable format on save.

```json
"editor.formatOnSave": true
```

The Ruby LSP extension also provides some convenient completions using format on type. For example, it will auto-continue comment lines and auto-close `end` tokens, pipes, or string interpolation curly braces. To use format on type, make sure it's enabled in the editor with:

```json
"editor.formatOnType": true
```

### Quick Fixes

When the linter finds errors and warnings in your source code, Ruby LSP can often provide suggested Quick Fixes (also called Code Actions), which are available via a light bulb hover in the editor. You can quickly open available Quick Fixes via the `kb(editor.action.quickFix)`.

![Quick Fixes for linting violations](images/ruby/ruby_lsp_quickfix.png)

### Refactoring

In addition to Quick Fixes, the Ruby LSP also provides refactor options through Code Actions. For example, it can extract a Ruby expression into a local variable with a single click.

![Refactor extract to variable](images/ruby/ruby_lsp_refactor.png)

## Debugging support with rdbg

For debug support inside of VS Code, the Ruby LSP requires the VS Code RDBG extension to connect to debug (Ruby's official debugger).

### Install debugging support

Install the [VS Code RDBG](https://marketplace.visualstudio.com/items?itemName=KoichiSasada.vscode-rdbg) extension.

### Set up debugging configuration

To use the debugger, you will need to create [debugging configurations](/docs/editor/debugging.md#launch-configurations) in a `launch.json` file. The configuration lets you pass arguments to your program, run pre-launch tasks, set environment variables, and much more.

To create a `launch.json` for a Ruby program:

1. In the Debug view (`kb(workbench.view.debug)`), select the **create a launch.json file** link.
2. This displays a dropdown with several default launch configuration types. You can pick the first option, but we'll add more configurations.
3. We can now edit the created `.vscode/launch.json` file to add more ways to launch your Ruby program for debugging.

Example:

```json
{
    "version": "0.2.0",
    "configurations": [
        // Run all tests in a file using Minitest
        {
            "type": "rdbg",
            "name": "Minitest - current file",
            "request": "launch",
            "script": "-Itest ${file}",
            "askParameters": false
        },
        // If your test runner supports line numbers, such as in Rails,
        // you can add a task like this one to run only the test under the cursor
        {
            "name": "Minitest - current line",
            "type": "rdbg",
            "request": "launch",
            "command": "${workspaceRoot}/bin/rails",
            "script": "test",
            "args": [
                "${file}:${lineNumber}"
            ],
            "askParameters": false,
        },
        // Attach the debugger to an active process (for example, Rails server)
        {
            "type": "rdbg",
            "name": "Attach with rdbg",
            "request": "attach"
        }
    ]
}
```

After adding the launch configurations, we can debug Ruby programs by adding breakpoints and executing our launch tasks.

1. Open a Ruby file and click the left gutter in the editor to set a break point. It should display as a red dot.

   ![Red breakpoint dot in the left gutter of the editor](images/ruby/ruby_lsp_breakpoint.png)

2. Start debugging by selecting the desired task under **Run and Debug** and clicking the start debugging button (default keyboard shortcut `kb(workbench.action.debug.start)`).

   ![Debug session stopped at breakpoint](images/ruby/ruby_lsp_debugging_session.png)

## Next steps

This has been a brief overview showing the Ruby LSP extension features within VS Code. For more information, see the details provided in the Ruby LSP [README](https://github.com/Shopify/vscode-ruby-lsp), including how to tune specific [VS Code editor](https://github.com/Shopify/vscode-ruby-lsp#configuration) configurations.

To stay up to date on the latest features/bug fixes for the Ruby LSP extension, see the Releases page for the [language server gem](https://github.com/Shopify/ruby-lsp/releases) and for the [Ruby LSP extension](https://github.com/Shopify/vscode-ruby-lsp/releases).

If you have any issues or feature requests, feel free to log them in the Ruby LSP extension [GitHub repo](https://github.com/Shopify/vscode-ruby-lsp/issues).

If you'd like to learn more about VS Code, try these topics:

* [Basic Editing](/docs/editor/codebasics.md) - A quick introduction to the basics of the VS Code editor.
* [Install an Extension](/docs/editor/extension-marketplace.md) - Learn about other extensions are available in the [Marketplace](https://marketplace.visualstudio.com/vscode).
* [Code Navigation](/docs/editor/editingevolved.md) - Move quickly through your source code.
