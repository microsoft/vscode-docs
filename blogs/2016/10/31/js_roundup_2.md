---
Order:
TOCTitle: JavaScript Extensions Part 2
PageTitle: Visual Studio Code JavaScript Extensions Part 2 Oct 2016
MetaDescription: Essential JavaScript extensions for Visual Studio Code.
Date: 2016-10-31
ShortDescription: Essential JavaScript extensions for Visual Studio Code.
Author: Wade Anderson
---
# JavaScript Extensions Part 2

October 31, 2016 by Wade Anderson, [@waderyan_](https://twitter.com/waderyan_)

Visual Studio Code has excellent support for JavaScript out of the box. As with other languages, JavaScript is powered by a language service. The [JavaScript language service](https://github.com/microsoft/TypeScript/wiki/JavaScript-Language-Service-in-Visual-Studio) is implemented by the TypeScript team, allowing JavaScript developers to leverage the best IntelliSense experience.

But what other features can you get with VS Code? VS Code has a rich extensibility model and many features are provided through VS Code extensions. This post is a follow up to my [previous post](/blogs/2016/09/14/js_roundup_1.md) about JavaScript extensions.

> **Tip:** Install any of these extensions by clicking the Extensions View button, typing the name of the extension in the Search box, and clicking **Install**. Learn more at [Browse for extensions](/docs/editor/extension-marketplace.md#browse-for-extensions).

## Debugger for Chrome

Marketplace - [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)

Publisher - [Microsoft](https://marketplace.visualstudio.com/search?term=publisher%3A%22Microsoft%22&target=VSCode&sortBy=Relevance)

When you develop for the front end, you might not see the value of an integrated debugger in your editor. You use the browser's debugger right? This is where the Debugger for Chrome extension comes in. This extension lets you debug your JavaScript code in the Google Chrome browser, or any other targets that support the [Chrome Debugging Protocol](https://chromedevtools.github.io/debugger-protocol-viewer/) while staying in VS Code. No more context switching to debug!

Prefer to debug using a different browser? You can find extensions for [Edge](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-edge) and [Firefox](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-firefox-debug) as well.

![debugger for chrome image](chrome_debugger.png)

## Git Project Manager

Marketplace - [Git Project Manager](https://marketplace.visualstudio.com/items?itemName=felipecaputo.git-project-manager)

Publisher - [Felipe Caputo](https://marketplace.visualstudio.com/search?term=publisher%3A%22Felipe%20Caputo%22&target=VSCode&sortBy=Relevance)

Although not necessarily a JavaScript extension, Git Project Manager is a favorite in the VS Code team. This extension scans a directory (or directories) for Git repos and allows you to switch between them easily.

To use this extension, first install it and then add the following configuration to your `settings.json` file.

```json
"gitProjectManager.baseProjectsFolders": [
    "/path/to/your/base/project/folders"
]
```

![git project manager showcase](git_project_manager.gif)

## Beautify

Marketplace - [Beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify)

Publisher - [HookyQR](https://marketplace.visualstudio.com/search?term=publisher%3A%22HookyQR%22&target=VSCode)

Internally, VS Code uses [js-beautify](https://www.npmjs.com/package/js-beautify). This extension allows you to specify a `.jsbeautifyrc` file to indicate the formatting style for your JavaScript, CSS, Sass, and HTML code.

You can search the Marketplace for more formatters using the new [Formatters category](https://marketplace.visualstudio.com/search?target=VSCode&category=Formatters&sortBy=Downloads).

>**Note:** For extension authors, we are working on a blog post for source code formatters best practices. Stay tuned as it will be coming soon.

## Keymaps for Sublime Text and Atom

There are two extensions in this section, one for [Atom](https://marketplace.visualstudio.com/items?itemName=ms-vscode.atom-keybindings) and another for [Sublime Text](https://marketplace.visualstudio.com/items?itemName=ms-vscode.sublime-keybindings). If you have used these editors, you have likely memorized their keyboards shortcuts. These extensions bring the keyboard shortcuts from Atom and Sublime Text to VS Code.

These extensions are in preview because we want your feedback. There are still many shortcuts to include and it is easy for you to add any we may have missed.

1. Go to the extension's GitHub repository ([Atom](https://github.com/microsoft/vscode-atom-keybindings) and [Sublime Text](https://github.com/microsoft/vscode-sublime-keybindings)).
2. Open the `package.json` file ([Atom](https://github.com/microsoft/vscode-atom-keybindings/blob/main/package.json) and [Sublime Text](https://github.com/microsoft/vscode-sublime-keybindings/blob/main/package.json)).
3. Add a JSON object to `contributes.keybindings` section of `package.json` as seen below ([Atom](https://github.com/microsoft/vscode-atom-keybindings/blob/main/package.json) and [Sublime Text](https://github.com/microsoft/vscode-sublime-keybindings/blob/main/package.json)).
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

Do you have other editors or IDEs you'd like to make a keymap for? Simply follow the instructions in the [`contributes.keybindings` section](/docs/extensionAPI/extension-points#_contributeskeybindings) and the [Keybindings document](/docs/getstarted/keybindings).

## It's raining keyboard shortcuts

If you find that VS Code does not have a keyboard shortcut feature from Atom, Sublime Text or another product, please comment in one of these GitHub issues ([Atom](https://github.com/microsoft/vscode/issues/14316) and [Sublime Text](https://github.com/microsoft/vscode/issues/3776)) or create a new issue.

Additionally, there are many extensions in the Marketplace which add useful keyboard shortcuts:

* [join-lines](https://marketplace.visualstudio.com/items?itemName=wmaurer.join-lines)
* [Paste and Indent](https://marketplace.visualstudio.com/items?itemName=Rubymaniac.vscode-paste-and-indent)
* [FontSize Shortcuts](https://marketplace.visualstudio.com/items?itemName=peterjuras.fontsize-shortcuts)
* [Bracket Selection](https://marketplace.visualstudio.com/items?itemName=guosong.bracketselection)
* [change-case](https://marketplace.visualstudio.com/items?itemName=wmaurer.change-case)
* [expand-region](https://marketplace.visualstudio.com/items?itemName=letrieu.expand-region)
* [transpose](https://marketplace.visualstudio.com/items?itemName=v4run.transpose)
* [Close HTML/XML tag](https://marketplace.visualstudio.com/items?itemName=Compulim.compulim-vscode-closetag)

## Creating your own JavaScript extension

Not finding an extension that meets your needs. You can make your own with JavaScript or TypeScript! Check out the [documentation](/docs/extensions/overview.md) to learn more.

Wade Anderson, VS Code Team Member <br>
[@waderyan_](https://twitter.com/waderyan_)
