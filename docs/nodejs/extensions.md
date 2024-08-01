---
Order: 12
Area: nodejs
TOCTitle: Extensions
ContentId: 3224f624-a3fc-4eeb-81d1-eb653a90a6fc
PageTitle: JavaScript Extensions in Visual Studio Code
DateApproved: 08/01/2024
MetaDescription: Learn more about installing and integrating JavaScript and Node.js extensions in the Visual Studio Code editor.
---
# JavaScript extensions for VS Code

Visual Studio Code supports many features for JavaScript and Node.js development. The features that ship with the downloaded product are the core features: debugging, IntelliSense, code navigation, etc.

In addition, to these core features, you can install a large number of quality extensions to add features to VS Code for JavaScript development.

> **Tip:** To see how to install and manage your extensions, please refer to the [extension documentation](/docs/editor/extension-marketplace.md).

## Finding extensions

You can find JavaScript extensions by typing `JavaScript` in the Extension view search bar. Alternatively, you can find JavaScript extensions using tags: "tag:javascript". Search for more extensions in VS Code or in the [Marketplace](https://marketplace.visualstudio.com/vscode).

<div class="marketplace-extensions-javascript-curated"></div>

In addition you can search for `Node.js` extensions.

<div class="marketplace-extensions-node-curated"></div>

> Tip: The extensions shown above are dynamically queried. Click on an extension tile above to read the description and reviews to decide which extension is best for you. See more in the [Marketplace](https://marketplace.visualstudio.com/vscode).

## Recommended extensions

If you are just getting started, here are the extensions we recommend trying out.

### ESLint

Marketplace - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Publisher - [Microsoft](https://marketplace.visualstudio.com/publishers/Microsoft)

Easily integrate [ESLint](https://eslint.org/) into your project. If ESLint isn't your favorite linter, choose among a variety of other linter extensions, including [JSHint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.jshint), [JSCS](https://marketplace.visualstudio.com/items?itemName=ms-vscode.jscs), and [JS Standard](https://marketplace.visualstudio.com/items?itemName=chenxsan.vscode-standardjs).

Read more about setting up JavaScript linters in the VS Code [documentation](/docs/languages/javascript.md#linters).

![ESLint animation](images/extensions/eslint.gif)

### SonarLint

Marketplace - [SonarLint](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode)

Publisher - [SonarSource](https://marketplace.visualstudio.com/publishers/SonarSource)

SonarLint helps you find and fix bugs and security issues as you code. The extension runs in the background and, just like a spell checker, highlights coding issues. SonarLint not only tells you what the issue is but also provides in-context guidance on why an issue is harmful and how to fix it, with related examples. The extension supports [200+ JS/TS rules](https://rules.sonarsource.com/javascript) and includes several [Quick Fixes](https://rules.sonarsource.com/javascript/quickfix) to automatically handle your coding issues.

Search for 'SonarLint' in the VS Code Marketplace and install. No configuration is required. You can start with a default profile that fits most users and customize it based on your specific needs.

![SonarLint animation](images/extensions/sonarlint.gif)

### JavaScript (ES6) code snippets

Marketplace - [JavaScript (ES6) code snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets)

Publisher - [charalampos karypidis](https://marketplace.visualstudio.com/search?term=publisher%3A%22charalampos%20karypidis%22&target=VSCode)

VS Code comes with many built-in code snippets. The **JavaScript (ES6) code snippets** extension adds snippets for ES6 (ECMAScript 6) syntax. Here is a small sampling of the snippets provided by this extension. See the extension's [README](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets) to see the dozens of snippets this pack gives you.

![javascript snippets](images/extensions/javascript_snippets.png)

You can read more about JavaScript snippets in the VS Code [documentation](/docs/languages/javascript.md#snippets). For additional snippet packs, including [Angular 1](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular1), [Angular 2](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2), [Bootstrap 3](https://marketplace.visualstudio.com/items?itemName=wcwhitehead.bootstrap-3-snippets), [ReactJs](https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets), and [jQuery](https://marketplace.visualstudio.com/items?itemName=donjayamanne.jquerysnippets), check out the Marketplace's [Snippets category](https://marketplace.visualstudio.com/vscode/Snippets?sortBy=Installs).

### npm IntelliSense

Marketplace - [npm IntelliSense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)

Publisher - [Christian Kohler](https://marketplace.visualstudio.com/search?term=publisher%3A%22Christian%20Kohler%22&target=VSCode)

This extension provides IntelliSense for npm modules when using `import` or `require`.

![npm intellisense](images/extensions/npm_intellisense.gif)
