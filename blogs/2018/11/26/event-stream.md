---
Order: 44
TOCTitle: Event-Stream Package Security Update
PageTitle: Event-Stream Package Security Update
MetaDescription: Event-Stream Package Security Update
Date: 2018-11-26
ShortDescription: Event-Stream Package Security Update
Author: Kai Maetzel
---
# Event-Stream Package Security Update

November 26, 2018 Kai Maetzel, [@kaimaetzel](https://twitter.com/kaimaetzel)

You might already have heard that the popular event-stream NPM package includes a malicious dependency. The details can be found in the following GitHub issue: [https://github.com/dominictarr/event-stream/issues/116](https://github.com/dominictarr/event-stream/issues/116). This vulnerability has been in existence for about two months but was only recently discovered.

>**TL;DR**: Visual Studio Code is not affected by the industry-wide NPM `event-stream` package security issue, and we've proactively protected our user base by temporarily removing extensions affected by this package from the VS Code Marketplace.

We immediately checked if and how we are affected. First, we scanned Visual Studio Code. Both product installs of Visual Studio Code (Stable as well as Insiders) are safe.

Secondly, we scanned all extensions in the VS Code Marketplace. We identified several extensions as affected. We decided to take aggressive actions to protect our users as well as the authors of those extensions and to automatically uninstall those extensions. Users don’t need to take any action to remove those extensions. The extensions will also be unlisted from the Marketplace.

Currently unlisted and blocked extensions:

* `ardenivanov.svelte-intellisense`
* `Fr43nk.seito-openfile`
* `JacobeanResearchandDevelopmentLLC.vscode-scxml-preview`
* `joe-re.sql-language-server`
* `jomiller.rtags-client`
* `KazuoCode.gthubsum`
* `roboceo.robojsx-plugin`
* `salbert.comment-ts`
* `tboevil.webpaste`
* `tintrinh.php-refactor`

We are in the process of notifying the authors of those extensions. Once the authors have updated their extensions and we have received their notification, we will verify the update. You will then be able to reinstall the extension from the Marketplace.

A note to extension authors: When you generated an extension with the `yeoman` code generator, you may have installed the malicious code as part of the dev dependencies. Delete your `node_modules` folder, clean your npm cache with `npm cache clean --force`, and rerun `npm install`.

Extension authors needs to update the `vscode` module to `1.1.22`.

We'll keep you posted.

[Kai Maetzel (Microsoft)](https://twitter.com/kaimaetzel)
