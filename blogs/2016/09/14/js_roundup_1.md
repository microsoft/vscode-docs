---
Order: 17
TOCTitle: Essential JavaScript Extensions Part 1
PageTitle: Visual Studio Code JavaScript Extensions Part 1 Sep 2016
MetaDescription: Essential JavaScript extensions for VS Code. 
Date: 2016-09-14
ShortDescription: Essential JavaScript extensions for VS Code. 
Author: Wade Anderson
---

# Essential JavaScript Extensions

September 14, 2016 by Wade Anderson, [@waderyan_](https://twitter.com/waderyan_)

> This is part one of a series on JavaScript extensions. 

I learned JavaScript during an internship in the summer of 2013. Although not a difficult language to learn, JavaScript didn't come easy. I used a lightweight editor with the rest of my team and missed the deep language integration features from Visual Studio (C#) and Eclipse (Java). 

Visual Studio Code is not an IDE, but you can extend it to do many of the things an IDE can do. VS Code extensions effectively bridge the gap between what you miss from IDEs and what you gain with a lightweight editor (read [here](https://code.visualstudio.com/docs/extensions/our-approach#_stability-extension-isolation) about how maintain high performance as extensions are added). The following are some of the essential JavaScript extensions I, and many of you, are using everyday. 

> Tip: Install any of these extensions by clicking the Extensions View button, typing the name of the extension in the Search box, and clicking **Install**. See more instructions [here](https://code.visualstudio.com/docs/editor/extension-gallery#_browse-and-install-extensions-in-vs-code).

## ESLint

Marketplace - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Publisher - [Dirk Baeumer](https://marketplace.visualstudio.com/search?term=publisher%3A%22Dirk%20Baeumer%22&target=VSCode)

Easily integrate ESLint into your project. Dirk is a member of the VS Code team and he mantains this extension. There was a recent release that fixed some common issues. If ESLint is your jam, choose among a variety of other linters, including [JSHint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.jshint), [JSCS](https://marketplace.visualstudio.com/items?itemName=ms-vscode.jscs), and [JS Standard](https://marketplace.visualstudio.com/items?itemName=shinnn.standard).

Read more about setting up JavaScript linters in the [documentation](/docs/languages/javascript.md#linters). 

![eslint animation](2016_09_14_eslint.gif)

## JavaScript (ES6) Code Snippets

Marketplace - [JavaScript Code Snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets)

Publisher - [charalampos karypidis](https://marketplace.visualstudio.com/search?term=publisher%3A%22charalampos%20karypidis%22&target=VSCode)

VS Code comes with many built in snipets. JavaScript (ES6) Code Snippets adds code snippets for ES6 syntax. Here is a small sampling of the snippets provided by this extension. See the extension's [README](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets) to see the dozens of snippets this pack gives you. 

![javascript snippets](2016_09_14_javascript_snippets.png)

You can read more about JavaScript snippets in the [documentation](/docs/languages/javascript.md#snippets). For additional snippet packs, including for [Angular 1](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular1), [Angular 2](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2), [Bootstrap 3](https://marketplace.visualstudio.com/items?itemName=wcwhitehead.bootstrap-3-snippets), [ReactJs](https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets), and [jQuery](https://marketplace.visualstudio.com/items?itemName=donjayamanne.jquerysnippets), check out the Marketplace's [snippet category](https://marketplace.visualstudio.com/vscode/Snippets?sortBy=Downloads). 

## Path IntelliSense

Marketplace - [Path IntelliSense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)

Publisher - [Christian Kohler](https://marketplace.visualstudio.com/search?term=publisher%3A%22Christian%20Kohler%22&target=VSCode)

This highly rated extension autocompletes file paths in your code. Use this in JavaScript, HTML, CSS files and more. 

![path intellisense](2016_09_14_path_intellisense.gif)

## NPM IntelliSense

Marketplace - [Npm IntelliSense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)

Publisher - [Christian Kohler](https://marketplace.visualstudio.com/search?term=publisher%3A%22Christian%20Kohler%22&target=VSCode)

A second, incredily useful and highly rated from Christian Kohler. This extension provides IntelliSense for npm moduels. 

![npm intellisense](2016_09_14_npm_intellisense.gif)


## Want to see your extension featured?

Have other extensions you like or want to see your extension in the next roundup? Ping me on [Twitter](https://twitter.com/waderyan_)!

Wade Anderson, VS Code Team Member <br>
[@waderyan_](https://twitter.com/waderyan_)
