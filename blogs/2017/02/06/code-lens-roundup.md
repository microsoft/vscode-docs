---
Order: 24
TOCTitle: Extensions Fun with Code Lens
PageTitle: Extensions Fun with Code Lens
MetaDescription: Extensions Fun with Code Lens
Date: 2017-02-06
ShortDescription: Extensions Fun with Code Lens
Author: Wade Anderson
---
# Code Lens Extensions

January 28, 2016 Wade Anderson, [@waderyan_](https://twitter.com/waderyan_)

Code lens is a popular feature in VS Code. The essence of the feature is "actionable contextual information interspersed" in your code. That's quite a mouthful. Let me break it down for you. Code lens are links in your code. 

- **Actionable** - you can click on the link and something happens. 
- **Contextual** - the links are close to the code they are representing.
- **Interspersed** - the links can be in different places throughout your code. 

![animation showing code lens](2017_02_06_code_lens.gif)

VS Code comes with code lens for TypeScript. You can enable it in User Settings with `"typescript.referencesCodeLens.enabled": true`.

![code lens in TypeScript](2017_02_06_typescript_code_lens.png)

You can create your own extension with the code lens feature. Get started by checking out the [documentation](/docs/extensions/language-support.md#codelens-show-actionable-context-information-within-source-code). Additionally, you can find popular extensions in the Marketplace that use code lens. Here are some of my favorite. 

## Git Lens

Marketplace - [Git Lens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

Author - [eamodio](https://marketplace.visualstudio.com/search?term=publisher%3A%22eamodio%22&target=VSCode)

This feature rich extension will meet all your git needs. eamodio uses the code lens UI to show you the most recent commit, number of authors, inline blame annotations, and exposes the peek window for a full history view. See the extension's [README](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) for the full list of features. With 14 five stars, this is a highly rated, excellent extension. 

![animation showing gitlens](2017_02_06_preview_gitlens.gif)

## TypeLens

Marketplace - [Type Lens](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.typelens)

Author - [Kiss Tamás](https://marketplace.visualstudio.com/search?term=publisher%3A%22Kiss%20Tam%C3%A1s%22&target=VSCode&sortBy=Relevance)

VS Code now ships with reference counting for TypeScript files (simply set `"typescript.referencesCodeLens.enabled"` to `true`), but do you want reference counting for more than TypeScript files? This extension will reference count JavaScript, SASS, and LESS files. 

![animation showing type lens](2017_02_06_typelens.gif)

## Version Lens

Marketplace - [Version Lens](https://marketplace.visualstudio.com/items?itemName=pflannery.vscode-versionlens)

Author - [pflannery](https://marketplace.visualstudio.com/search?term=publisher%3A%22pflannery%22&target=VSCode)

With support for many package management systems, including npm, bower, dotnet, and jspm, this extension is very useful. Install the extension and see what packages are out of date. With a quick click of the mouse you can upgrade the version. 

![version lens demo](2017_02_06_versionlens.png)

## Pro Tip - Preview your Extension

Marketplace - [Extension Manifest Editor](https://marketplace.visualstudio.com/items?itemName=ms-devlabs.extension-manifest-editor)

Author - [Microsoft DevLabs](https://marketplace.visualstudio.com/search?term=publisher%3A%22Microsoft%20DevLabs%22&target=VSCode)

Sometimes when I'm making an extension, I think it would be great to preview the extension in the Marketplace before publishing. Let me present to you the Extension Manifest Editor. This extension allows you to preview your extension's Marketplace presentation within VS Code. 

![manifest preview](2017_02_06_manifest_preview.gif)

## Want to see your extension featured?

Have other extensions you like or want to see your extension in the next roundup? Ping me on Twitter!

Wade Anderson, VS Code Team Member 
[@waderyan_](https://twitter.com/waderyan_)