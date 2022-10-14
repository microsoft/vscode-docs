---
Order: 69
TOCTitle: vscode.dev
PageTitle: vscode.dev Visual Studio Code for the Web
MetaDescription: Announcing vscode.dev Visual Studio Code for the Web
Date: 2021-10-20
Author: Chris Dias
---

# vscode.dev(!)

October 20, 2021 by Chris Dias, [@chrisdias](https://twitter.com/chrisdias)

Back in 2019, when the `.dev` top-level domain opened, we picked up `vscode.dev` and quickly parked it, pointing at our website `code.visualstudio.com` (or, if you are from the Boston area like me, we "pahked it"). Like a lot of people who buy a `.dev` domain, we had no idea what we were going to do with it. And we certainly didn't anticipate that it would end up being the fulfillment of a mission over a decade in the making.

## Bringing VS Code to the browser

Fast forward to today. Now when you go to [https://vscode.dev](https://vscode.dev), you'll be presented with a lightweight version of VS Code running fully in the browser. Open a folder on your local machine and start coding.

No install required.

[![vscode.dev running in the browser](vscode-dev.png)](/assets/blogs/2021/10/20/vscode-dev.png)

With the availability of vscode.dev, we begin to finally realize our original vision of building a development tool that can run fully serverless in the browser. For a full history lesson, check out Erich Gamma's VS Code Day talk ["VS Code An Overnight Success…10 Years in the Making"](https://www.youtube.com/watch?v=hilznKQij7A&list=PLj6YeMhvp2S6uB23beQaffszlavLq3lNq).

So, what can you do on VS Code for the Web? Quite a bit actually…

## Local development with cloud tools

[!["The Cat said No" application source code in vscode.dev](the-cat-said-no-vscode-dev.png)](/assets/blogs/2021/10/20/the-cat-said-no-vscode-dev.png)

Modern browsers that support the [File System Access API](https://developer.mozilla.org/docs/Web/API/File_System_Access_API) (Edge and Chrome today) allow web pages to access the local file system (with your permission). This simple gateway to the local machine quickly opens some interesting scenarios for using VS Code for the Web as a zero-installation local development tool, such as:

* Local file viewing and editing. Quickly take notes (and preview!) in Markdown. Even if you are on a restricted machine where you cannot install the full VS Code, you may still be able to use vscode.dev to view and edit local files.
* Build client-side HTML, JavaScript, and CSS applications in conjunction with the browser tools for debugging.
* Edit your code on lower powered machines like Chromebooks, where you can't ([easily](https://code.visualstudio.com/blogs/2020/12/03/chromebook-get-started)) install VS Code.
* Develop on your iPad. You can upload/download files (and even store them in the cloud using the Files app), as well as open repositories remotely with the built-in GitHub Repositories extension.

And, if your browser doesn't support local file system APIs, you'll still be able to open individual files by uploading and downloading them via the browser.

![Local File System Access is Unsupported message dialog](local-file-system-unsupported.png)

**A Light(er)weight Experience**

Since VS Code for the Web is running completely within the browser, some experiences will naturally be more constrained, when compared to what you can do in the desktop app. For example, the terminal and debugger are not available, which makes sense since you can't compile, run, and debug a Rust or Go application within the browser sandbox (although emerging technologies like Pyodide and web containers may someday change this).

A bit more nuanced are the code editing, navigation, and browsing experiences, which, on the desktop, are generally powered by language services and compilers that expect a file system, runtime, and compute environment. In the browser, these experiences are powered by language services *running fully in the browser* (no file system, no runtimes) that provide source code tokenization and syntax colorization, completions, and many single-file operations.

As a result, when in the browser, experiences generally fall into the following categories:

**Good**: For most programming languages, vscode.dev gives you code syntax colorization, text-based completions, and [bracket pair colorization](https://code.visualstudio.com/blogs/2021/09/29/bracket-pair-colorization). Using a [Tree-sitter](https://tree-sitter.github.io/tree-sitter) syntax tree, we're able to [provide additional experiences](https://github.com/microsoft/vscode-anycode) such as [Outline/Go to Symbol](https://code.visualstudio.com/docs/editor/editingevolved#_go-to-symbol) and [Symbol Search](https://code.visualstudio.com/docs/editor/editingevolved#_open-symbol-by-name) for popular languages such as C/C++, C#, Java, PHP, Rust, and Go.

**Better**: The TypeScript, JavaScript, and [Python](https://devblogs.microsoft.com/python/python-in-visual-studio-code-september-2021-release/#a-rich-python-editing-experience-in-the-browser-via-github-dev) experiences are all powered by language services that run natively in the browser. With these programming languages, you'll get the "**Good**" experience plus rich single file completions, semantic highlighting, syntax errors, and more.

**Best**: For many "webby" languages, such as JSON, HTML, CSS, and LESS, the coding experience in vscode.dev is nearly identical to the desktop (including Markdown preview!).

## Extensions

Most UI customization extensions such as themes, key maps, and snippets all work in vscode.dev and you can even enable roaming between the browser, the desktop, and GitHub Codespaces through [Settings Sync](https://code.visualstudio.com/docs/editor/settings-sync).

Extensions that run Node.js code that use OS-specific modules, or shell out to local executables, still show in search results, but are clearly marked as unavailable.

![Notification that extension is not available in Visual Studio Code for the Web](extension-not-available.png)

That said, there are a growing number of extensions that have been updated to work in the browser, with more coming every day.

>**Note**: If you are an extension author and want to have your extension available in the browser (we do!), check out our [Web Extensions authoring guide](https://code.visualstudio.com/api/extension-guides/web-extensions).

For example, the [Luna Paint - Image Editor](https://marketplace.visualstudio.com/items?itemName=Tyriar.luna-paint) extension lets you edit raster images directly in VS Code. The extension brings rich design tools (for example, layer and blend tools) to VS Code, and of course you can save images to your local disk.

[![Luna Paint - Image Editor extension running in vscode.dev](luna-paint-vscode-dev.png)](/assets/blogs/2021/10/20/luna-paint-vscode-dev.png)

The [GitHub Issue Notebooks](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-github-issue-notebooks) extension brings the Notebook experience to GitHub Issues. With that you can interleave queries, results, and even Markdown describing the purpose of the queries, together into a single editor.

[![GitHub Issue Notebooks extension running in vscode.dev](github-issue-notebooks-vscode-dev.png)](/assets/blogs/2021/10/20/github-issue-notebooks-vscode-dev.png)

## GitHub

Many extensions for VS Code work with source code that is stored in GitHub. For example, the [CodeTour](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour) extension lets you create guided walkthroughs of a code base and the [WikiLens](https://marketplace.visualstudio.com/items?itemName=lostintangent.wikilens) extension turns VS Code and your repository into a powerful note taking tool (with bi-directional linking). To make it easy to access your code in GitHub, VS Code for the Web comes with the [GitHub Repositories](https://code.visualstudio.com/docs/sourcecontrol/github#_github-repositories-extension), [Codespaces](https://code.visualstudio.com/docs/remote/codespaces), and [Pull Request](https://code.visualstudio.com/docs/sourcecontrol/github#_getting-started-with-github-pull-requests-and-issues) extensions built in. You can make quick edits, review PRs, and **Continue on** to a local clone or even better, to a [GitHub Codespace](https://github.com/features/codespaces), if you want more powerful language experiences or need to build, run, and test the changes prior to merging the commits.

![Continue on dropdown showing Clone Repository Locally or Create New Codespace](continue-on-dropdown.png)

Whoa, sounds a lot like `github.dev` doesn't it? Are they different? The same? Why two??!!

Good question(s)! `github.dev` is a customized instance of VS Code for the Web that is deeply integrated into GitHub. Login is automatic, the URL format follows github.com's `/organization/repo` model so that you can simply change `.com` to `.dev` to edit a repo, and it is customized for GitHub with the light and dark themes.

In addition to repositories on GitHub, VS Code for the Web supports Azure Repos (part of Azure DevOps). To work with both, VS Code for the Web supports two routes, `vscode.dev/github` and `vscode.dev/azurerepos`. You don't have to remember that though, simply prefix whatever URL you have with "vscode.dev".

For example, change `https://github.com/microsoft/vscode` to 'https://**vscode.dev**/github.com/Microsoft/vscode'.

For Azure Repos, do the same. Change `https://dev.azure.com/…` to 'https://**vscode.dev**/dev.azure.com /…'.

Today, support for Azure Repos is in preview mode for reading repositories, but we're working hard to bring full read/write capabilities as soon as we can.

If you are not on GitHub or Azure DevOps, support for additional repository hosting services can be provided through extensions, just like on the desktop. Those extensions, as noted above, will need to support running fully in the browser.

## Speaking of URLs…

Like in the desktop, you can customize VS Code for the Web through a rich ecosystem of extensions that support just about every back end, language, and service. Unlike in the desktop, it's easy for us to deliver customized experiences with pre-installed extensions through unique `vscode.dev` URLs (like `vscode.dev/github` and `vscode.dev/azurerepos` as mentioned above).

For example, try browsing to [https://vscode.dev/theme/sdras.night-owl](https://vscode.dev/theme/sdras.night-owl).

[![Night Owl color theme in vscode.dev](night-owl-theme-vscode-dev.png)](/assets/blogs/2021/10/20/night-owl-theme-vscode-dev.png)

Here you can experience the popular [Night Owl](https://marketplace.visualstudio.com/items?itemName=sdras.night-owl) color theme by [@sarah_edo](https://twitter.com/sarah_edo) "live", without having to go through the download and install process, just to see if you like it. No install necessary! If you are a theme author, you can even create a badge in your `README.md` to let users test drive your theme directly from the Marketplace (learn more in the [VS Code for the Web](https://code.visualstudio.com/docs/editor/vscode-web#_themes) user guide).

Feel free to use this URL to share your favorite themes with friends. Personally, I'm a big fan of [@wesbos](https://twitter.com/wesbos)' [Cobalt2](https://marketplace.visualstudio.com/items?itemName=wesbos.theme-cobalt2) theme, check out [https://vscode.dev/theme/wesbos.theme-cobalt2](https://vscode.dev/theme/wesbos.theme-cobalt2). Note, the `theme` URL only works with themes that are fully declarative (no code).

As you can see, `vscode.dev` URLs are a powerful way for us to deliver new, lightweight experiences. Another example is that Live Share guest sessions will also be available in the browser through the `https://vscode.dev/liveshare` URL. The `sessionId` will be passed to the extension to make joining a seamless experience.

![Live Share dialog with option to join session from the browser](join-live-share.png)

The possibilities with `vscode.dev` URLs are endless, and we've got a lot of ideas that we're excited to share with you in the coming months.

## Where to next?

Bringing VS Code to the browser is the realization of the original vision for the product. It is also the start of a completely new one. An ephemeral editor that is available to anyone with a browser and an internet connection is the foundation for a future where we can truly edit anything from anywhere.

Stay tuned for more… 😉

Happy Coding,

Chris

P.S. In case you missed it, you can watch our [VS Code for the Web](https://youtu.be/sy3TUb_iVJM) live stream.
