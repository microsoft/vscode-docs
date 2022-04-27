---
Order: 68
TOCTitle: Webview UI Toolkit
PageTitle: Webview UI Toolkit for Visual Studio Code
MetaDescription: Announcing the public preview of the Webview UI Toolkit for Visual Studio Code
Date: 2021-10-11
Author: David Dossett
---

# Webview UI Toolkit for Visual Studio Code

October 11, 2021 by David Dossett, [@david_dossett](https://twitter.com/david_dossett) and Hawk Ticehurst, [@hawkticehurst](https://twitter.com/hawkticehurst)

We're so excited to announce the public preview of the [Webview UI Toolkit for Visual Studio Code](https://github.com/microsoft/vscode-webview-ui-toolkit). With this toolkit, extensions developers can quickly and easily create [webview-based extensions](https://code.visualstudio.com/api/extension-guides/webview) in Visual Studio Code that look, feel, and act like the editor itself.

![Webview UI Toolkit for Visual Studio Code: gallery view of components](webview-ui-toolkit-artwork.png)

## What is the Webview UI Toolkit?

At its core, the toolkit is a library of components that developers can use to build user interfaces inside extension webviews. Note that this doesn't change our recommendation to [avoid the use of webviews](https://code.visualstudio.com/api/ux-guidelines/webviews) in extensions unless you absolutely need them.

Features of the library include:

- **Implements the Visual Studio Code design language:** Create extensions that have a consistent look and feel with the rest of the editor.
- **Automatic support for color themes:** All components are designed with theming in mind and will automatically display the current editor theme.
- **Use any tech stack:** The library ships as a set of web components, meaning developers can use the toolkit no matter what tech stack (React, Vue, Svelte, etc.) their extension is built with.
- **Accessible out of the box:** All components ship with web standard compliant ARIA labels and keyboard navigation.

## Why did we build it?

We wanted to ensure that extensions that use webviews are predictable, consistent, and accessible for their users.

Any time an extension uses the [Webview API](https://code.visualstudio.com/api/extension-guides/webview), the responsibility of creating UI that adheres to the webview guidelines lies with the extension author. As a result, webviews run the risk of appearing and behaving differently than the rest of Visual Studio Code. In the worst cases, users must navigate inaccessible extension UIs that look nothing like the rest of the editor.

With the Webview UI Toolkit, we now share some of that responsibility with extension authors. We get to worry about the nitty gritty details of theming, accessibility, and behavioral/styling implementation of core UI components so you don't have to. It means improved ease of development, improved developer velocity, and ultimately more time to work on the parts of your extension that make it unique!

## We need your feedback!

We can't wait for you to give the Webview UI Toolkit a try! Let us know how we can improve the experience for creating webview-based extensions as we move towards a 1.0 release.

If you'd like to learn more, you can refer to the [Webview UI Toolkit for Visual Studio Code](https://github.com/microsoft/vscode-webview-ui-toolkit) documentation. Additionally, if you have any questions, encounter any issues, or have feature requests, please don’t hesitate to reach out.

Happy Coding,

David and Hawk
