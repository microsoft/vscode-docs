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

> **Tip:** You can install all of these extensions at once by installing [Code Lens Roundup](TODO). How do you bundle extensions together? Check out [extension packs](Docs/extensionAPI/extension-manifest.md#extension-packs). 

## Git Lens

Marketplace - [Git Lens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

Author - [eamodio](https://marketplace.visualstudio.com/search?term=publisher%3A%22eamodio%22&target=VSCode)

This feature rich extension will meet all your git needs. eamodio uses the code lens UI to show you the most recent commit, number of authors, inline blame annotations, and exposes the peek window for a full history view. See the extension's [README](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) for the full list of features. With 14 five stars, this is a highly rated, excellent extension. 

![animation showing gitlens](2017_02_06_preview_gitlens.gif)

## Azure Application Insights

Marketplace - [Azure Application Insights](https://marketplace.visualstudio.com/items?itemName=VisualStudioOnlineApplicationInsights.application-insights)

Author - [Microsoft](https://marketplace.visualstudio.com/search?term=publisher%3A%22Microsoft%22&target=VSCode)

As you can imagine, this is a popular one on our team. Use this extension to see information on your production services right in VS Code!

![app insights](2017_02_06_appinsights.gif)

## CodeMetrics

Marketplace - []()

Author - [Kiss Tamás](https://marketplace.visualstudio.com/search?term=publisher%3A%22Kiss%20Tam%C3%A1s%22&target=VSCode)

So you have this colleague. He likes to write complex functions. He thinks its cool. Use this extension to show him the complexity of his functions and also to see the complexity of the code you are writing. 

![app insights](2017_02_06_code_lens.gif)

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