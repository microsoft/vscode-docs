---
Order: 5
Area: remote
TOCTitle: GitHub Codespaces
PageTitle: Developing with GitHub Codespaces
ContentId: 8d30ed21-208f-4b4e-8510-5a4a33c42618
MetaDescription: Using GitHub Codespaces
DateApproved: 8/13/2020
---
# GitHub Codespaces

[GitHub Codespaces](https://github.com/features/codespaces) provides cloud-powered development environments for any activity - whether it's a long-term project, or a short-term task like reviewing a pull request. You can work with these environments from three possible clients: Visual Studio Code, a browser-based editor, or the Visual Studio IDE (currently in Private Preview).

<!-- ![Visual Studio Codespaces extension](images/codespaces/vscodespaces-extension.png) TBD -->

## Environments

An environment is the "backend" half of GitHub Codespaces. It's where all of the compute associated with software development happens: compiling, debugging, restoring, etc. When you need to work on a new project, pick up a new task, or review a PR, you can simply spin up a Cloud-hosted environment, and GitHub Codespaces takes care of configuring it correctly. It automatically configures everything you need to work on your project: the source code, runtime, compiler, debugger, editor, custom dotfile configurations, relevant editor extensions and more.

## Customization

GitHub Codespaces are fully customizable on a per project basis. This is accomplished by including a `devcontainer.json` file in the project's repository, similar to VS Code [Remote Container](/docs/remote/containers.md) development.

Example customizations include:

* Setting which Linux-based operating system to use.
* Automatically installing various tools, runtimes, and frameworks.
* Forwarding commonly used ports.
* Setting environment variables.
* Configuring editor settings and installing preferred extensions.

See the [Configuring Codespaces](https://docs.github.com/github/developing-online-with-codespaces/configuring-codespaces-for-your-project) documentation for codespace-specific `devcontainer.json` settings.

## Dotfile per user configuration

Dotfiles are files whose filename begins with a dot (.). They typically contain configuration information for applications and can control how terminals, editors, source control, and various other tools behave. `.bashrc`, `.gitignore` and `.editorconfig` are examples of dotfiles commonly used by developers.

You can specify a GitHub repo containing your dotfiles, a target location for the files, as well as install commands when creating a codespace.

See the [Personalizing Codespaces](https://docs.github.com/github/developing-online-with-codespaces/personalizing-codespaces-for-your-account) documentation to learn how to add your dotfile configurations to a codespace.

## Getting started

There are getting started topics for all three GitHub Codespaces clients. These will fast-track you through signing in to GitHub Codespaces, creating your first codespace, and connecting to it with your preferred client:

* [Codespaces in VS Code](https://docs.github.com/github/developing-online-with-codespaces/connecting-to-your-codespace-from-visual-studio-code) - Use the [Codespaces](https://marketplace.visualstudio.com/items?itemName=ms-vsonline.vsonline) extension to connect and work in your environment.
* [Codespaces in the browser](https://docs.github.com/github/developing-online-with-codespaces/creating-a-codespace) - Connect to your codespace through a browser-based editor.
* [Codespaces in Visual Studio IDE](https://docs.microsoft.com/visualstudio/codespaces/quickstarts/vs) - Try out the Visual Studio IDE Private Preview for Codespaces.

## How-to guides

In addition, there are How-to guides, which go into more detail about managing and configuring your environments:

* [How-to guide: Visual Studio Code](https://docs.microsoft.com/visualstudio/codespaces/how-to/vscode) - Create and configure a codespace from the VS Code client.
* [How-to guide: Browser](https://docs.microsoft.com/visualstudio/codespaces/how-to/browser) - Create and configure a codespace with only a browser.

## Extension authors

The VS Code extension API hides most of the implementation details of running remotely so many extensions will just work in GitHub Codespaces environments without any modification. However, we recommend that you test your extension in a codespace to be sure that all of its functionality works as expected. See the article on [Supporting Remote Development and GitHub Codespaces](/api/advanced-topics/remote-extensions.md) for details.

## Questions or feedback

If you have questions, you can consult the GitHub Codespaces [Troubleshooting guide](https://docs.github.com/github/developing-online-with-codespaces/troubleshooting-your-codespace). If you'd like to provide feedback, you can enter issues in the GitHub Codespaces [Support Community](https://github.community/c/codespaces-beta/45).
