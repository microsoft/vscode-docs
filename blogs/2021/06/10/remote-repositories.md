---
Order: 64
TOCTitle: Remote Repositories
PageTitle: Remote Repositories extension for Visual Studio Code
MetaDescription: Remotely browse and edit a source control repository from within Visual Studio Code.
Date: 2021-06-10
Author: Brigit Murtaugh, Eric Amodio
---
# Remote Repositories

June 10, 2021 by Brigit Murtaugh, [@BrigitMurtaugh](https://twitter.com/BrigitMurtaugh), Eric Amodio, [@eamodio](https://twitter.com/eamodio)

>**Note**: The Remote Repositories extension has been renamed to [GitHub Repositories](https://marketplace.visualstudio.com/items?itemName=github.remotehub) since this blog post was published. You can also check out the [latest documentation](/docs/sourcecontrol/github.md#github-repositories-extension), which will have the most updated information on the extension.

We're excited to present the new [Remote Repositories](https://marketplace.visualstudio.com/items?itemName=github.remotehub) extension for Visual Studio Code! This is a new experience that we've been building in partnership with our friends at GitHub to enable working with source code repositories quickly and safely inside VS Code.

[![Remote Repositories extension](remote-repositories-banner.png)](https://marketplace.visualstudio.com/items?itemName=github.remotehub)

## A quicker way to open source code repositories

In VS Code, we've offered integrated support for Git from the very beginning, and we've been supporting many other source control management (SCM) providers through extensions. This has allowed developers to clone and work with repositories directly within VS Code.

However, a large part of what developers do every day involves reading other people's code: reviewing pull requests, browsing open-source repositories, experimenting with new technologies or projects, inspecting upstream dependencies to debug applications, etc. What all of these have in common is that as a first step, you usually clone the repository locally and then open the code in your favorite code editor (which we hope is VS Code!). Yet, cloning a repository takes time, may lead you to review an outdated version of the repo if you forget to pull, and can sometimes be a security risk if you're unfamiliar with the code.

The new [Remote Repositories](https://marketplace.visualstudio.com/items?itemName=github.remotehub) extension, published by GitHub, makes the experience of opening source code repositories in VS Code instant and safe. With this, you can quickly browse, search, edit, and commit to any remote GitHub repository (and soon, Azure Repos) directly from within VS Code, no clone necessary!

You can work on as many repos as you like without having to save any source code on your machine. Remote Repositories saves you time and local disk space and empowers you to stay entirely within VS Code for all your source control tasks.

In this blog post, we'll explore just how easy it is to get started with Remote Repositories, what you can do after opening your first remote repo, technical details supporting this virtual environment, and how you can provide us with feedback today.

## Open your first remote repo in VS Code

Let's open a remote repo in VS Code. First, make sure you have installed the [Remote Repositories](https://marketplace.visualstudio.com/items?itemName=github.remotehub) extension.

Currently, Remote Repositories supports GitHub repos, with support for Azure Repos coming soon. In this blog post, we'll start by opening the VS Code repository [(microsoft/vscode)](https://github.com/microsoft/vscode).

After installing the Remote Repositories extension, we get instant access to its **Open Remote Repository** command by clicking on the remote indicator in the lower left of VS Code (along with commands from any other [Remote Development extensions](https://code.visualstudio.com/docs/remote/remote-overview) you have installed):

![Remote indicator in VS Code](remote-indicator.png)

If you haven't logged into GitHub from VS Code before, you'll be prompted to authenticate your GitHub account. Once logged in, search for a repo or PR, select the one you want, and you'll be ready to go.

In the short video below, we search for and select the VS Code repo, VS Code reloads, and the repo's contents loads as if we cloned it locally:

![Gif of using Open Remote Repository command, search for "microsoft/vscode," repo loads, open readme](remote-repositories1.gif)

You're able to explore and contribute to the repo without ever having to leave VS Code. You feel like you're working on local code, using the familiar VS Code interface, and can use features like the VS Code Explorer, search, timeline view, quick open, and of course source control.

You're now connected to what's known as a virtual workspace (more information on virtual workspaces [below](#virtual-file-systems-and-workspaces)); the remote indicator reads "GitHub." When you hover over the remote indicator, you are notified that some features are not available while in a virtual workspace:

![Hover over remote indicator for limited virtual workspace message](remote-indicator-hover.png)

A virtual workspace is a special setup, and some features, like extensions, are disabled or have limited functionality. You can easily find out which extensions are disabled by clicking on the **Some features** link shown when hovering over the remote indicator.

Clicking the link shows which extensions are disabled and which ones have limited functionality. The limited functionality can be seen when hovering over the extension.

![VS Code Extensions view with limited and disabled extensions](extension-limits.png)

If you would like to manually enable an extension in a virtual workspace, you can use the `extensions.supportVirtualWorkspaces` setting in your user `settings.json` file.

```json
    "extensions.supportVirtualWorkspaces": { "<extensionID>": true }
```

Keep in mind that an extension might not be implemented to handle a virtual workspace without access to the local file system, and so the extension might not work as expected.

## You opened a repo, what's next?

With your repo open, Remote Repositories makes it easy to contribute to your project.

### Simplified Git workflow that keeps your project up to date

Remote Repositories helps you stay on the latest version of your repos every time, without any complex Git commands.

Any time you open a new repo, you open the latest version. And whenever Remote Repositories detects there are new changes from GitHub, it will list how many commits you need to pull down in the Status bar:

![VS Code Status bar showing "GitHub" in remote indicator and 1 pending change](one-change-status-bar.png)

and highlights the modified files in the Explorer:

![VS Code Explorer listing files and README has 1 change](readme-one-change-explorer.png)

When you commit changes, they'll automatically show up on GitHub – you don't need to push your changes or publish any new branches you create.

### Create or check out pull requests

Remote Repositories works well with the [GitHub Pull Requests and Issues extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github), which allows you to review and manage pull requests and issues from GitHub directly in VS Code. Use the two extensions in parallel to quickly check out PRs and work on issues without ever having to clone code locally or leave VS Code.

You can make a change to your code, create a new branch and a pull request (PR) based on that change, and then check out the PR, all in a few clicks.

![Gif using GitHub Pull Request extension to create branch and PR, and check out that PR](remote-repositories3.gif)

You can learn more about the GitHub Pull Requests and Issues extension in our [Working with GitHub](https://code.visualstudio.com/docs/sourcecontrol/github) article.

### Keep changes isolated to branches

You may need to switch between branches as you complete your work. In a typical environment, this can get tricky when you need to decide which changes to stash or commit.

Remote Repositories lets you easily work on different branches simultaneously. When you pause work on one branch and switch to a new one, you won't be asked about stashing changes - they'll automatically stay on the previous branch. When you go back to a previous branch, your changes will still be there, and you can pick up right where you left off.

Let's explore how to push changes to a branch.

In the Status bar, select your current branch to open the list of branches, for example "main":

![VS Code Status bar on Main branch](main-branch.png)

Select **+ Create New Branch...** and type a name for your branch:

![VS Code Command Palette with options to create new branch](remote-branch.png)

You can then switch to that new branch:

![Remote Repositories prompt to switch to new branch](switch-branch.png)

The new branch will not include any changes from your previous branch.

## Limitations

There are certain limitations while working with Remote Repositories:

* Debugging, terminals, and tasks - Not currently supported. Terminals open on your local file system and don't have access to the virtual file system of the remote repository.
* Limited language intelligence - Features like IntelliSense and **Go to Definition** may be impacted as many languages don't yet understand the virtualized environment of Remote Repositories.
* Search - GitHub search itself has limitations, such as not indexing branches. Remote Repositories can avoid this limitation and perform a full-text search by enabling indexing. Indexing pulls a shallow clone of the repository from GitHub and performs a full search locally, providing greater power than GitHub's fuzzy default-branch native search. You can enable indexing in Remote Repositories from the Search view.
* Extension limitations - Not all extensions can support running in a virtual workspace, but more extensions will support it over time. Extensions that depend heavily on access to local files cannot support this setup. See the virtual workspace section [below](#virtual-file-systems-and-workspaces) for more details.

We are just getting started on this journey, so expect the feature set to grow and the limitations to shrink as we continue development.

## Continue working in a more powerful environment

Using Remote Repositories, VS Code operates in an environment where not all features are available because there is no physical file system. This is great to quickly get started browsing a repository, but what about when you're ready to do some more "advanced" work, such as:

* You want to actively **work on** the repository and get the full power of VS Code.
* You need to actively track the changes of the repository by **pulling from the remote** regularly.

To move to more advanced workflows, Remote Repositories provides a way for you to "upgrade" your environment and continue your work there, picking up from wherever you currently are.

Click the remote indicator in the lower left, then select **Continue Working on...**.

![VS Code Command Palette with "Continue Working on..." command](continue-working.png)

You'll be presented with three options:

* **Clone Repository Locally**: Clone the current repo to your local machine. A local file explorer will pop up, allowing you to select a location on disk to clone the remote repo.
* **Clone Repository in Container Volume**: Clone the current repo in a Docker [container volume](/docs/devcontainers/containers.md#quick-start-open-a-git-repository-or-github-pr-in-an-isolated-container-volume) using the Dev Containers extension (you'll need the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension and Docker installed). VS Code will reload and connect using Dev Containers, and the remote indicator will now read **Dev Container: {image name}**.
* **Open in Codespaces**: Continue your work in a [GitHub Codespace](https://github.com/features/codespaces). When you select this option, a browser will open and direct you to your list of Codespaces for this repository.

![VS Code Command Palette with options to continue locally, in a volume, or in Codespaces](continue-options.png)

Now that we've explored how to use Remote Repositories in VS Code, we'd like to describe some of the technical details powering the experience, and how you can ensure your extension will work in a Remote Repository session.

## Virtual file systems and workspaces

The core concepts powering this remote work are virtual file systems and virtual workspaces.

As an end user, all you need to know is which repo or PR you want to work on – VS Code will take care of the virtual file system and manage your workspace for you. As an extension developer, you'll want to adopt the virtual file system API to ensure your extension behaves as expected.

### How virtual file systems work

When you work in a traditional git workflow, you "git clone" a repo, and a copy is saved to your computer's local file system. But when working with Remote Repositories, the code doesn't live on your local computer; it's still just on GitHub.

You work with the code through a virtual file system, which is an abstraction away from files that exist physically on disk. Virtual file systems can serve content from code hosts like GitHub, from cloud storage, or from databases and seamlessly provide these as files to the user in VS Code.

When you open a workspace on a virtual file system, it's known as a virtual workspace. While working in a virtual workspace, you still get access to VS Code features, including extensions.

### Ensuring your extension works in a virtual workspace

For extensions to behave properly, they must support a virtual file system.

When an extension has no code but is a pure color theme, keybinding, snippets, or grammar extension, then it can run in a virtual workspace and no adoption is necessary.

Extensions that run actual code, meaning it defines a main entry point, require inspection and possibly adoption.

The [API support](https://github.com/microsoft/vscode/blob/dc8bd9cd7e5231745549ac6218266c63271f48cd/src/vs/vscode.d.ts#L7038) for virtual file systems is through the `FileSystemProvider` interface. A file system provider is registered for a new URI scheme (for example, `vscode-vfs`), and resources on that file system will be represented by URIs using that schema (`vscode-vfs://github/microsoft/vscode/package.json`).

There is a `capabilities` property in the extension's `package.json`, and the `virtualWorkspaces` sub-property is used to signal whether an extension works with virtual workspaces or not.

You can learn more about virtual file systems, workspaces, and how to implement them for extensions in the [virtual workspaces extension authors guide](https://github.com/microsoft/vscode/wiki/Virtual-Workspaces).

## Feedback & further reading

We are very excited for you to try out Remote Repositories and can't wait for your feedback.

Please install the [Remote Repositories](https://marketplace.visualstudio.com/items?itemName=github.remotehub) extension. You can file any [issues or feature requests](https://github.com/microsoft/vscode-remote-repositories-github) or Tweet us your thoughts [@code](https://twitter.com/code).

You can also check out our new [YouTube video](https://www.youtube.com/watch?v=wHsmaXoGIXI) about how to use the Remote Repositories extension.

If you're an extension author, check out the [Virtual Workspace Support for Extension Authors guide](https://github.com/microsoft/vscode/wiki/Virtual-Workspaces) and share any questions or feedback in our [tracking issue](https://github.com/microsoft/vscode/issues/123115). You can also join the Extension Authors community [Slack group](https://vscode-dev-community.slack.com/join/shared_invite/zt-ggynfxra-KAozfLTWe03w_PwRxwtfvA#/shared-invite/email).

Happy Coding!

Brigit Murtaugh, VS Code Program Manager [@BrigitMurtaugh](https://twitter.com/BrigitMurtaugh)<br>
Eric Amodio, VS Code Principal Software Engineer [@eamodio](https://twitter.com/eamodio)
