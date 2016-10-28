---
Order: 18
TOCTitle: JavaScript Extensions Part 2
PageTitle: Visual Studio Code JavaScript Extensions Part 2 Oct 2016
MetaDescription: Essential JavaScript extensions for Visual Studio Code. 
Date: 2016-10-31
ShortDescription: Essential JavaScript extensions for Visual Studio Code. 
Author: Wade Anderson
---

# JavaScript Extensions Part 2

October 31, 2016 by Wade Anderson, [@waderyan_](https://twitter.com/waderyan_)

Visual Studio Code has excellent support for JavaScript out of the box. As with other languages, JavaScript is powered by a language service. The [JavaScript language service](https://github.com/Microsoft/TypeScript/wiki/Salsa) is implemented by the TypeScript team, allowing JavaScript developers to leverage the best IntelliSense experience. 

But what other features can you get with VS Code? Because of VS Code's rich extensibilty model, there are many features extensions can provide. This post is a follow up to my previous post about JavaScript extensions and a brief introduction to writing your own JavaScript extension. 

## Do you want to build an extension? 

You can build an extension with JavaScript. To write your first extension takes only three simpe steps. 

1. [Decide what to build](http://code.visualstudio.com/docs/extensions/overview) - Read the various [ways to contribute](http://code.visualstudio.com/docs/extensionAPI/extension-points). Want to add your custom snippets or keybindings? You can do that easily. 
2. [Install the extension generator](http://code.visualstudio.com/docs/tools/yocode) - Installed via yo, the starter kit starts you off on the right foot. 
3. [Code, debug](http://code.visualstudio.com/docs/extensions/debugging-extensions), and [publish](http://code.visualstudio.com/docs/tools/vscecli) - Write code for your extension, debug using VS Code, and then publish with a single CLI command. 

```zsh
# Install the necessary tools
npm install -g yo generator-code vsce

# Install the extension generator
yo code

# Write code, debug, then publish
vsce publish
```

You can use the extensions below as a model for how to build your own and install them to accelerate your JavaScript coding productivity. 

> **Tip:** Install any of these extensions by clicking the Extensions View button, typing the name of the extension in the Search box, and clicking **Install**. See more instructions [here](/docs/editor/extension-gallery.md#browse-and-install-extensions-in-vs-code).

## Debugger for Chrome

Marketplace - [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)

Publisher - [Microsoft](https://marketplace.visualstudio.com/search?term=publisher%3A%22Microsoft%22&target=VSCode&sortBy=Relevance)

When you develop on the front end you might not see the value of an integrated debugger in your editor. You use the browser's debugger right? This is where the Debugger for Chrome extension comes in. This extension let's you debug your JavaScript code in the Google Chrome browser, or other targets that support the [Chrome Debugging Protocol](https://chromedevtools.github.io/debugger-protocol-viewer/) while staying in VS Code. No more context switching to debug! 

Prefer to debug using a different browser? You can find extensions for [Safari](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-ios-web), [Edge](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-edge), and [Firefox](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-firefox-debug) as well. 

![debugger for chrome image](2016_10_31_chrome_debugger.png)

## Git Project Manager

Marketplace - [Git Project Manager](https://marketplace.visualstudio.com/items?itemName=felipecaputo.git-project-manager)

Publisher - [Felipe Caputo](https://marketplace.visualstudio.com/search?term=publisher%3A%22Felipe%20Caputo%22&target=VSCode&sortBy=Relevance)

Although not necessarily JavaScript specific, this is a favorite for many VS Code team members. This extension scans a directory (or directories) for git repos and allows you to switch between them easily. 

To use this extension, first install it and then add the following code to your `settings.json` file. 

```json
"gitProjectManager.baseProjectsFolders": [
    "/path/to/your/base/project/folders"
]
```

![git project manager showcase](2016_10_31_git_project_manager.gif)

## Document This

Marketplace - [Document This](https://marketplace.visualstudio.com/items?itemName=joelday.docthis)

Publisher - [Joel Day](https://marketplace.visualstudio.com/search?term=publisher%3A%22Joel%20Day%22&target=VSCode)

Joel Day has built an exceptionally useful extension for writing JavaScript and TypeScript docs. This extension will automatically generates detailed JSDoc comments for your code. 

![document this](2016_10_31_document_this.gif)

## Beautify 

Marketplace - [Beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify)

Publisher - [HookyQR](https://marketplace.visualstudio.com/search?term=publisher%3A%22HookyQR%22&target=VSCode)

Internally, VS Code uses [js-beautify](https://www.npmjs.com/package/js-beautify). This extension allows you to specify a `.jsbeautifyrc` file to indicate the formatting style for your JavaScript, CSS, Sass, and HTML code. 

You can search the Marketplace for more formatters using the new [Formatters category](https://marketplace.visualstudio.com/search?target=VSCode&category=Formatters&sortBy=Downloads). 

>**Note:** For extension authors, we are working on a blog post for Formatting best practices. Stay tuned as it will be coming soon. 

# Keymaps for Sublime Text and Atom

There are two extensions in this section, one for [Atom](https://marketplace.visualstudio.com/items?itemName=ms-vscode.atom-keybindings) and another for [Sublime Text](https://marketplace.visualstudio.com/items?itemName=ms-vscode.sublime-keybindings). If you have used these editors you have likely developed habits with your keyboards shortcuts. These extensions bring the keyboard shortcuts from Atom and Sublime Text to VS Code. 

These extensions are in preview because we want your feedback. There are still many keyboard shortcuts to add. Adding keyboard shortcuts we missed is easy. 

1. Go to the extension's GitHub repository ([Atom](https://github.com/waderyan/vscode-atom-keybindings) and [Sublime Text](https://github.com/Microsoft/vscode-sublime-keybindings))
2. Open package.json ([Atom](https://github.com/waderyan/vscode-atom-keybindings/blob/master/package.json) and [Sublime Text](https://github.com/Microsoft/vscode-sublime-keybindings/blob/master/package.json)).
3. Add a JSON object to `contributions.keybindings` section of `package.json` as seen below ([Atom](https://github.com/waderyan/vscode-atom-keybindings/blob/master/package.json#L25) and [Sublime Text](https://github.com/Microsoft/vscode-sublime-keybindings/blob/master/package.json#L25)).
4. Open a pull request.

```json
{
    "mac": "<keyboard shortcut for mac>",
    "linux": "<keyboard shortcut for linux",
    "win": "<keyboard shortcut for windows",
    "key": "<default keyboard shortcut>",
    "command": "<name of the command in VS Code"
}
```

If you find that VS Code does not have a feature from Atom or Sublime Text, please comment in these Github issues ([Atom](https://github.com/waderyan/vscode/issues/14316) and [Sublime Text](https://github.com/Microsoft/vscode/issues/3776)). Additionally, there are many extensions in the Marketplace to add the missing features. 

* [Join Lines](https://marketplace.visualstudio.com/items?itemName=wmaurer.join-lines)
* [Paste and Indent](https://marketplace.visualstudio.com/items?itemName=Rubymaniac.vscode-paste-and-indent)
* [FontSize Shortcuts](https://marketplace.visualstudio.com/items?itemName=peterjuras.fontsize-shortcuts)
* [Bracket Selection](https://marketplace.visualstudio.com/items?itemName=guosong.bracketselection)
* [change case](https://marketplace.visualstudio.com/items?itemName=wmaurer.change-case)
* [expand-region](https://marketplace.visualstudio.com/items?itemName=letrieu.expand-region)
* [transpose](https://marketplace.visualstudio.com/items?itemName=v4run.transpose)
* [Close HTML/XML tag](https://marketplace.visualstudio.com/items?itemName=Compulim.compulim-vscode-closetag)

Do you have other editors or IDEs you'd like to make a keymap for? Simply follow the instructions in the [`contribrutions.keybindings` section](http://code.visualstudio.com/docs/extensionAPI/extension-points#_contributeskeybindings) and the [Customization -> Keybindings document](http://code.visualstudio.com/docs/customization/keybindings). 

## Want to see your extension featured?

Have other extensions you like or want to see your extension in the next roundup? Ping me on [Twitter](https://twitter.com/waderyan_)!

Wade Anderson, VS Code Team Member <br>
[@waderyan_](https://twitter.com/waderyan_)
