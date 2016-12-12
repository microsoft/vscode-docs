---
Order: 22
TOCTitle: Customize VS Code Extension Roundup
PageTitle: Customize VS Code Extension Roundup
MetaDescription: Extensions to customize Visual Studio Code.
Date: 2016-12-12
ShortDescription: Extensions to customize Visual Studio Code.
Author: Wade Anderson
---

# Customize VS Code Extension Roundup

December 12, 2016 - Wade Anderson

You can customize Visual Studio Code in many ways. Install a new theme, add a snippet pack, or tweak your settings and keyboard shortcuts. We built VS Code to be flexible so you can make it work the way you do. You can install an extension from the VS Code [Marketplace](https://marketplace.visualstudio.com/vscode) or create your own (see [here](https://code.visualstudio.com/docs/extensions/overview) to get started writing an extension in JavaScript or TypeScript). In this blog, I want to highlight a few of my favorite extensions for customizing VS Code.

> **Tip:** Do you miss the keyboard shortcuts from Atom, Sublime Text, or Visual Studio? You can install a Keymap extension today to use those keyboard shortcuts in VS Code. See [the full list of keymap extensions](https://marketplace.visualstudio.com/search?target=vscode&category=Keymaps&sortBy=Downloads) in the Marketplace.

## Settings Sync

Marketplace - [Visual Studio Code Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)

Publisher - [Shan Khan](https://marketplace.visualstudio.com/search?term=publisher%3A%22Shan%20Khan%22&target=VSCode&sortBy=Relevance)

Do you use VS Code on multiple machines and wish you could easily share settings? Even using VS Code in a VM on the same machine will make it so your settings, snippets, etc. aren't the same. This extension solves this synchronization problem and is one of the highest rated in the Marketplace. The extension uses a private Gist on GitHub to share your VS Code settings, snippets, keybindings, etc across different machines. You can also make the Gist public to share your settings with others.

![setting sync](2016_12_12_settings_sync.png)

## Themes Galore

Color themes are important. When you are staring at your editor for hours each day, you want to look at something nice! I find myself changing my theme regularly to mix things up (in fact, that would be a fun extension for someone to make - an extension that changes the theme on a regular interval). There are hundreds of color themes in the VS Code Marketplace to install. You can preview your installed themes in VS Code by **File** > **Preferences** > **Color Theme**, by opening the **Command Palette** and typing "theme", or using the `kb(workbench.action.selectTheme)` keyboard shortcut.

Some of my favorite themes are:

> **Tip:** Color themes are tagged `color-theme` on their Marketplace page.

- [Sublime Material Theme](https://marketplace.visualstudio.com/items?itemName=jprestidge.theme-material-theme)
- [Flatland Monokai Theme](https://marketplace.visualstudio.com/items?itemName=gerane.Theme-FlatlandMonokai)
- [Hopscotch (Official)](https://marketplace.visualstudio.com/items?itemName=idleberg.hopscotch)
- [One Monokai Theme](https://marketplace.visualstudio.com/items?itemName=azemoh.one-monokai)

![animation showing my favorite themes](2016_12_12_theme-preview.gif)

Want to create your own theme? See the [documentation](https://code.visualstudio.com/docs/extensionAPI/extension-points#_contributesthemes) to get started.

VS Code also supports [File Icon](https://code.visualstudio.com/docs/customization/themes#_select-an-icon-theme) themes to add images to files and folders in the UI. You can preview your installed File Icon themes in VS Code by **File** > **Preferences** > **File Icon Theme** or by opening the **Command Palette** and typing "file icon".

Here are two File Icon themes I really like:

> **Tip:** File Icon themes are tagged `icon-theme`.

- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
- [Nomo Dark Icon Theme](https://marketplace.visualstudio.com/items?itemName=be5invis.vscode-icontheme-nomo-dark)

## Snippets Aplenty

Do you use snippets while writing code? Many snippets come built into VS Code and are shown in the IntelliSense suggest window while you type.

<video id="snippets-showcase" src="https://az754404.vo.msecnd.net/public/snippets_showcase.mp4" placeholder="/images/userdefinedsnippets_snippets_placeholder.png" autoplay loop controls muted>
    Sorry you're browser doesn't support HTML 5 video.
</video>

When you start using a new library or framework, check the Marketplace to see if there is a snippet pack for it. There are snippet packs for many popular JavaScript frameworks.

- [Bootstrap 3](https://marketplace.visualstudio.com/items?itemName=wcwhitehead.bootstrap-3-snippets)
- [Angular 2](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2)
- [jQuery](https://marketplace.visualstudio.com/items?itemName=donjayamanne.jquerysnippets)

Many language extensions come with snippets included.

- [Python](https://marketplace.visualstudio.com/items?itemName=donjayamanne.python)
- [Power Shell](https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell)
- [Ruby](https://marketplace.visualstudio.com/items?itemName=rebornix.Ruby)
- [C#](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp)
- [Elm](https://marketplace.visualstudio.com/items?itemName=sbrink.elm)

Want to make your own snippet pack? See the documentation for [how to create a snippet pack extension](https://code.visualstudio.com/docs/extensions/language-support#_source-code-snippets).

> **Tip:** You can search for extensions by category or tag in the Extensions view search box, using "category:{category name}" or "tag:{tag name}".

## Want to see your extension featured?

Have other extensions you like or want to see your extension in the next roundup? Ping me on [Twitter!](https://twitter.com/waderyan_).

Wade Anderson, VS Code Team Member
[@waderyan_](https://twitter.com/waderyan_)



