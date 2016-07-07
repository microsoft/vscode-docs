---
Order: 3
Area: editor
TOCTitle: Extension Marketplace
ContentId: 319916C4-93F2-471F-B448-FD416736C40C
PageTitle: Managing Extensions in Visual Studio Code
DateApproved: 7/7/2016
MetaDescription: Find out how to discover, add, update, disable and uninstall Visual Studio Code extensions (plug-ins) through the Extension Marketplace.
---

# VS Code Extension Marketplace

## Increase the power of VS Code through Extensions

The features that VS Code includes out-of-the-box are just the start. VS Code extensions let you add languages, debuggers, and tools to your installation to support your development workflow. VS Code's rich extensibility model lets extension authors plug directly into the VS Code UI and contribute functionality through the same APIs used by VS Code.  This topic explains how to find, install, and manage VS Code extensions.

## Browse and Install Extensions in VS Code

You can browse and install extensions from within VS Code. Bring up the Extension view by clicking on the Extensions icon in the View Bar on the side of VS Code.

![Extension View icon](images/extension-gallery/extensions-view-icon.png)

This will show you a list of the most popular VS Code extensions on the [VS Code Marketplace](https://marketplace.visualstudio.com/VSCode).

Each extension in the list includes a brief description, the publisher, the download count and a five star rating. You can click on the extension item to display the extension's [VS Code Marketplace](https://marketplace.visualstudio.com/VSCode) page where you can learn more.

>**Note:** If your computer's Internet access goes through a proxy server, you will need to configure the proxy server. See [Proxy Server Support](/docs/setup/setup-overview.md#proxy-server-support) for details.

## Install an Extension

Simply click the **Install** button and after a successful install, you'll see an **Enable** button which will prompt you to restart VS Code to enable the new extension.

## Search for an Extension

You can clear the Search box at the top of the Extensions View and type in the name of the extension, tool or programming language you're looking for. For example, typing 'python' will bring up a list of Python language extensions.

You can see a list of recommended extensions (based on your workspace file types), using the `Extensions: Show Extension Recommendations` command which uses the '@recommended' filter.

## List Installed Extensions

You can also review your installed extensions with the `Extensions: Show Installed Extensions` command or by typing `kb(workbench.action.quickOpen)` (**Quick Open**) and `ext ` with a trailing space.  Clearing the Extensions view search box will also show your installed extensions.

## Uninstall an Extension

To uninstall an extension, bring up the `Extensions: Show Installed Extensions` list and click the **Uninstall** button. This will uninstall the extension and prompt you to restart VS Code.

## Update an Extension

You can quickly look for extension updates by using the `Extensions: Show Outdated Extensions` command which uses the '@outdated' filter.  This will display any available updates for your currently installed extensions. Simply click the **Update** button for the outdated extension and the update will be installed and you'll be prompted to restart VS Code.

## Browse Extensions

Additionally, you can browse and search for VS Code extensions through the [VS Code Marketplace](https://marketplace.visualstudio.com/VSCode) site. Below is a sampling of the most popular extensions. 

<div class="marketplace-extensions-top"></div>

You can review our handy **Featured**, **Most Popular**, and **Recently Added** extension lists and filter by **Category** (Debuggers, Languages, Linters, etc).

![marketplace-categories](images/extension-gallery/marketplace-categories.png)

## Command Line Extension Management

To make it easier to automate and configure VS Code, it is possible to list, install, and uninstall extensions from the command line. When identifying an extension, provide the full name of the form `publisher.extension`, for example `donjayamanne.python`.

Example:

```
code --list-extensions
code --install-extension ms-vscode.cpptools
code --uninstall-extension ms-vscode.csharp
```

## Next Steps

Here are a few topics you may find interesting...

* [Publishing to the Marketplace](/docs/tools/vscecli.md) - Publish your own customization or extension to the VS Code Marketplace
* [Customization](/docs/customization/overview.md) - Learn how to integrate TextMate themes, colorizers and snippets into Visual Studio Code.
* [Yo Code](/docs/tools/yocode.md) - Learn how the Yo Code extension generator can scaffold out new extensions and package existing TextMate files.
* [Extending Visual Studio Code](/docs/extensions/overview.md) - Start learning about VS Code extensibility
* [Your First Extension](/docs/extensions/example-hello-world.md) - Try creating a simple Hello World extension

## Common Questions

**Q: The `Extensions: Install Extension` command just hangs and never shows a dropdown listing available extensions?**

**A:** This could be due to an incomplete uninstall of an extension which left some extension files under [your `.vscode/extensions` folder](/docs/extensions/install-extension.md#your-extensions-folder).  Navigate to `.vscode/extensions` and see if there is an extension folder (named for the publisher and extension as `publisher.extension`) for a recently deleted extension.  Delete that folder and restart VS Code.

**Q: Can VS Code read TextMate bundles directly?**

**A**: No, VS Code can read some TextMate files such as .tmTheme and .tmLanguage but can not install full TextMate bundles. Also in order to use TextMate theme and syntax files, VS Code needs extra metadata for integration.  The [Yo Code](/docs/tools/yocode.md) extension generator makes it easy to package these files for use in VS Code.

**Q: Can I install Visual Studio Community extensions (shipped in .vsix) in Visual Studio Code?**

**A:** No, Visual Studio Code's extensibility points are different from Visual Studio Community.

**Q: Whenever I try to install any extension, I get a connect ETIMEDOUT error.**

**A:** You may see this error if your machine is going through a proxy server to access the Internet.  See the [Proxy Server Support](/docs/setup/setup-overview.md#proxy-server-support) section in SETUP topic for details.