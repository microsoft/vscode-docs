---
Order: 4
Area: remote
TOCTitle: Visual Studio Codespaces
PageTitle: Developing with Visual Studio Codespaces
ContentId: 8d30ed21-208f-4b4e-8510-5a4a33c42618
MetaDescription: Using Visual Studio Code Codespaces
DateApproved: 6/10/2020
---
# Visual Studio Codespaces

[Visual Studio Codespaces](https://docs.microsoft.com/visualstudio/online/overview/what-is-vsonline) provides cloud-powered development environments for any activity - whether it's a long-term project, or a short-term task like reviewing a pull request. You can work with these environments from three possible clients: Visual Studio Code, a browser-based editor, or the Visual Studio IDE (currently in Private Preview).

![Visual Studio Codespaces extension](images/codespaces/vscodespaces-extension.png)

## Environments

An [environment](https://docs.microsoft.com/visualstudio/online/overview/what-is-vsonline#environments) is the "backend" half of Visual Studio Codespaces. It's where all of the compute associated with software development happens: compiling, debugging, restoring, etc. When you need to work on a new project, pick up a new task, or review a PR, you can simply spin up a Cloud-hosted environment, and Visual Studio Codespaces takes care of configuring it correctly. It automatically configures everything you need to work on your project: the source code, runtime, compiler, debugger, editor, custom dotfile configurations, relevant editor extensions and more.

## Customization

Visual Studio Codespaces are fully customizable on a per project basis. This is accomplished by including a `devcontainer.json` file in the project's repository, similar to VS Code [Remote Container](/docs/remote/containers.md) development.

Example customizations include:

* Setting which Linux-based operating system to use.
* Automatically installing various tools, runtimes, and frameworks.
* Forwarding commonly used ports.
* Setting environment variables.
* Configuring editor settings and installing preferred extensions.

See the [Codespace Configuring](https://docs.microsoft.com/visualstudio/online/reference/configuring) documentation for Codespace-specific `devcontainer.json` settings.

## Dotfile per user configuration

Dotfiles are files whose filename begins with a dot (.). They typically contain configuration information for applications and can control how terminals, editors, source control, and various other tools behave. `.bashrc`, `.gitignore` and `.editorconfig` are examples of dotfiles commonly used by developers.

You can specify a GitHub repo containing your dotfiles, a target location for the files, as well as install commands when creating a Codespace.

See the [Codespace Personalizing](https://docs.microsoft.com/visualstudio/online/reference/personalizing) documentation to learn how to add your dotfile configurations to a Codespace.

## Getting started

The Visual Studio Codespaces documentation has Quickstarts for all three clients. The Quickstarts will fast-track you through signing in to Visual Studio Codespaces, creating your first environment, and connecting to it with your preferred client:

* [Codespaces in VS Code](https://docs.microsoft.com/visualstudio/online/quickstarts/vscode) - Use the [Visual Studio Codespaces](https://marketplace.visualstudio.com/items?itemName=ms-vsonline.vsonline) extension to connect and work in your environment.
* [Codespaces in the browser](https://docs.microsoft.com/visualstudio/online/quickstarts/browser) - Connect to your Codespace through a browser-based editor.
* [Codespaces in Visual Studio IDE](https://docs.microsoft.com/visualstudio/online/quickstarts/vs) - Try out the Visual Studio IDE Private Preview for Visual Studio Codespaces.

## How-to guides

In addition to the Quickstarts, there are How-to guides, which go into more detail about managing and configuring your environments:

* [How-to guide: Visual Studio Code](https://docs.microsoft.com/visualstudio/online/how-to/vscode) - Create and configure a Codespace from the VS Code client.
* [How-to guide: Browser](https://docs.microsoft.com/visualstudio/online/how-to/browser) - Create and configure a Codespace with only a browser.

## Self-hosted environments

If you already have a working development environment, you can connect your own [self-hosted environments](https://docs.microsoft.com/visualstudio/online/how-to/vscode#self-hosted) to Visual Studio Codespaces. This lets you and your team have the same consistent development experience, whether you are working on a managed cloud-hosted environment or your own infrastructure.

## Extension authors

The VS Code extension API hides most of the implementation details of running remotely so many extensions will just work in Visual Studio Codespaces environments without any modification. However, we recommend that you test your extension in a Codespace to be sure that all of its functionality works as expected. See the article on [Supporting Remote Development and Visual Studio Codespaces](/api/advanced-topics/remote-extensions.md) for details.

## Questions or feedback

If you have questions, you can consult the Visual Studio Codespaces [Troubleshooting guide](https://docs.microsoft.com/visualstudio/online/resources/troubleshooting) and [FAQ](https://docs.microsoft.com/visualstudio/online/resources/faq). If you want to provide [Feedback](https://docs.microsoft.com/visualstudio/online/resources/feedback), you can enter issues in the Visual Studio Codespaces GitHub [repository](https://github.com/MicrosoftDocs/vsonline).
