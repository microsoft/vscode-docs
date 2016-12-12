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

You can customize Visual Studio Code in many ways. Install a new theme, snippet pack, keymap, or tweak your settings and keyboard shortcuts. We built VS Code to be flexible so you can make it your own. You can install an extension in the VS Code [Marketplace](https://marketplace.visualstudio.com/vscode) or create your own (see [here](https://code.visualstudio.com/docs/extensions/overview) to get started writing an extension in JavaScript or TypeScript). In this blog I want to highlight a few of my favorite extensions for customizing VS Code.  

> **Tip:** Have you missed your keyboard shorctus from Atom, Sublime Text, or Visual Studio? You can install a keymap extension today to use those keyboard shortcuts in VS Code. See [the full list of keymap extensions](https://marketplace.visualstudio.com/search?target=vscode&category=Keymaps&sortBy=Downloads) in the Marketplace. 

## Settings Sync

Marketplace - [Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync) 

Publisher - [Shan Khan](https://marketplace.visualstudio.com/search?term=publisher%3A%22Shan%20Khan%22&target=VSCode&sortBy=Relevance) 

Do you use VS Code on multiple machines? I know I do. Even using VS Code in a VM on the same machine will make it so your settings, snippets, etc. aren't the same. This extension is one of the highest rated in the Marketplace with 77 ratings and reviews (and counting) to solve setting synchronization problem. Using a secret gist on GitHub (optional to make the gist public), Shan has created an excellent route to sync your VS Code settings, snippets, keybindings, etc.  

![setting sync](2016_12_12_settings_sync.png) 

## Theming Galore 

Themes are important. When you are staring at your editor for hours each day,  you need to look at something nice! I find myself changing my theme regularly to mix things up (in fact, that would be a fun extension for someone to make - an extension that changes theme on a set interval). There are hundreds of themes in the VS Code Marketplace to install. You can preview your installed themes in VS Code by opening the command palatte, typing "themes", and hitting enter.  
Some of my favorite themes are:

> **Tip:** Themes that provide icons are tagged `icon-them` and themes that provide editor colorization are tagged `color-theme` in their respective READMEs.  

- [Sublime Material Theme](https://marketplace.visualstudio.com/items?itemName=jprestidge.theme-material-theme) 
- [Flatland Monokai Theme](https://marketplace.visualstudio.com/items?itemName=gerane.Theme-FlatlandMonokai) 
- [Hopscotch (Official)](https://marketplace.visualstudio.com/items?itemName=idleberg.hopscotch) 
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) 
- [One Monokai Theme](https://marketplace.visualstudio.com/items?itemName=azemoh.one-monokai) 
- [Nomo Dark Icon Theme](https://marketplace.visualstudio.com/items?itemName=be5invis.vscode-icontheme-nomo-dark) 

![animation showing my favorite themes](2016_12_12_theme-preview.gif) 

Want to create your own theme? See the [documentation](https://code.visualstudio.com/docs/extensionAPI/extension-points#_contributesthemes) to get started.  

## Wicked Snippets 

Do you use snippets while writing code? Many snippets come built into VS Code. Snippets are shown in the IntelliSense suggest window while you type.  

<video id="snippets-showcase" src="https://az754404.vo.msecnd.net/public/snippets_showcase.mp4" placeholder="/images/userdefinedsnippets_snippets_placeholder.png" autoplay loop controls muted>
    Sorry you're browser doesn't support HTML 5 video. 
</video>

When you start using a new library or framework, check out the Marketplace to see if there is a snippet pack for it. There are snippet packs for many popular JavaScript frameworks.  

- [Bootstrap 3](https://marketplace.visualstudio.com/items?itemName=wcwhitehead.bootstrap-3-snippets) 
- [Angular 2](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2) 
- [Jquery](https://marketplace.visualstudio.com/items?itemName=donjayamanne.jquerysnippets) 

Many language extensions come with snippets packed in.  
- [Python](https://marketplace.visualstudio.com/items?itemName=donjayamanne.python) 
- [Power Shell](https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell) 
- [Ruby](https://marketplace.visualstudio.com/items?itemName=rebornix.Ruby) 
- [C#](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp) 
- [Elm](https://marketplace.visualstudio.com/items?itemName=sbrink.elm) 

Want to make your own snippet pack? See the documentation for [how to create a snippet pack extension](https://code.visualstudio.com/docs/extensions/language-support#_source-code-snippets).  

> **Tip:** You can search for extensions by category in the product, using "category:[category name]".  

## Want to see your extension featured? 

Have other extensions you like or want to see your extension in the next roundup? Ping me on [Twitter!](https://twitter.com/waderyan_). 

Wade Anderson, VS Code Team Member  
[@waderyan_](https://twitter.com/waderyan_) 
 
  
  
 