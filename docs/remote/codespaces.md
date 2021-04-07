---
Order: 5
Area: remote
TOCTitle: GitHub Codespaces
PageTitle: Developing with GitHub Codespaces
ContentId: 8d30ed21-208f-4b4e-8510-5a4a33c42618
MetaDescription: Using GitHub Codespaces
DateApproved: 3/31/2021
---
# GitHub Codespaces

[GitHub Codespaces](https://github.com/features/codespaces) provides cloud-powered development environments for any activity - whether it's a long-term project, or a short-term task like reviewing a pull request. You can work with these environments from Visual Studio Code or in a browser-based editor.

![GitHub Codespaces extension](images/codespaces/github-codespaces-extension.png)

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

There are getting started topics for both GitHub Codespaces clients. These will fast-track you through signing in to GitHub Codespaces, creating your first codespace, and connecting to it with your preferred client:

* [Codespaces in VS Code](https://docs.github.com/github/developing-online-with-codespaces/using-codespaces-in-visual-studio-code) - Use the [GitHub Codespaces](https://marketplace.visualstudio.com/items?itemName=GitHub.codespaces) extension to connect and work in your environment.
* [Codespaces in the browser](https://docs.github.com/github/developing-online-with-codespaces/creating-a-codespace) - Connect to your codespace through a browser-based editor.

## Extension authors

The VS Code extension API hides most of the implementation details of running remotely so many extensions will just work in GitHub Codespaces environments without any modification. However, we recommend that you test your extension in a codespace to be sure that all of its functionality works as expected. See the article on [Supporting Remote Development and GitHub Codespaces](/api/advanced-topics/remote-extensions.md) for details.

## Common questions

### Why is an extension not installable in the browser

There are a small number of extensions that have built-in assumptions or need to run on the desktop. Examples are when an extension accesses files from the VS Code installation on the desktop or when an extension depends on a executable that must run in a desktop environment. When you try to install such an extension in the browser, you will be informed that the extension is not available.

**Notice** such an extension can still be used when connecting to a Codespace from VS Code running on the desktop.

### How do I allow VS Code to access my clipboard for reading?

In certain cases, VS Code might ask you for permission to access the clipboard when reading from it. You should be able to grant access to the clipboard from your browser either through settings (search for "site permissions") or by looking for this option in the address bar on the right:

![Allow clipboard access in browser](images/codespaces/allow-clipboard-access.png)

Once you have granted VS Code access to the clipboard, you can retry the operation.

## Questions or feedback

If you have questions, you can consult the GitHub Codespaces [Troubleshooting guide](https://docs.github.com/github/developing-online-with-codespaces/troubleshooting-your-codespace). If you'd like to provide feedback, you can enter issues in the GitHub Codespaces [Support Community](https://github.community/c/codespaces-beta/45).
