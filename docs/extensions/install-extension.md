---
Order: 9
Area: extensions
TOCTitle: Installing Extensions
ContentId: 8D19F206-8CB3-498D-BDD1-317B4104EDD0
PageTitle: Installing Visual Studio Code Extensions
DateApproved: 4/14/2016
MetaDescription: Learn how to install Visual Studio Code extensions (plug-ins) from the public Marketplace, shared with other developers or privately on your own machine.
---

# Installing Extensions

## Your Extensions Folder

VS Code looks for extensions under your extensions folder `.vscode/extensions`. Depending on your platform it is located:

* **Windows** `%USERPROFILE%\.vscode\extensions`
* **Mac** `~/.vscode/extensions`
* **Linux** `~/.vscode/extensions`

If you want to load your extension or customization each time VS Code runs, copy your project to a new folder under `.vscode/extensions`. For example: `~/.vscode/extensions/myextension`.

## Sharing Privately with Others (Side-loading)

If you want to share your extension or customization with others privately, you can simply send them a copy of the output from the generator and ask them to add it under their `.vscode/extensions` folder. Alternatively, package your extension using the [vsce publishing tool](/docs/tools/vscecli.md) by running `vsce package` and send them the `.vsix` file.

## Install a Packaged Extension (.vsix)

You can manually install an VS Code extension packaged in a `.vsix` file.  Simply install using the VS Code command line providing the path to the `.vsix` file.

```
code myextension.vsix
```

The extension will be installed under your user `.vscode/extensions` folder. You may provide multiple `.vsix` files on the command line to install multiple extensions at once.

You can also install a `.vsix` by opening the file from within VS Code.  Run **File** > **Open File...** or `kb(workbench.action.files.openFile)` and select the extension `.vsix`.

## Publishing to the Marketplace

If you want to share your extension with others in the VS Code [Extension Marketplace](/docs/editor/extension-gallery.md), you can use the [vsce publishing tool](/docs/tools/vscecli.md) to package it up and submit it.

## Next Steps

* [Extension Marketplace](/docs/editor/extension-gallery.md) - Learn more about VS Code's public extension Marketplace.
* [Publishing Extensions](/docs/tools/vscecli.md) - Learn how to package and publish your extensions.