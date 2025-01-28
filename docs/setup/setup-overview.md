---
Order: 1
Area: setup
TOCTitle: Overview
ContentId: FC5262F3-D91D-4665-A5D2-BCBCCF66E53A
PageTitle: Setting up Visual Studio Code
DateApproved: 12/11/2024
MetaDescription: Get Visual Studio Code up and running.
MetaSocialImage: images/quicksetup/quick-setup-social.png
---
# Setting up Visual Studio Code

VS Code is a free code editor, which runs on the macOS, Linux, and Windows operating systems. Getting up and running with Visual Studio Code is quick and easy. It is a small download so you can install in a matter of minutes and give VS Code a try.

VS Code is lightweight and should run on most available hardware and platform versions. You can review the [System Requirements](/docs/supporting/requirements.md) to check if your computer configuration is supported.

## Set up VS Code for your platform

1. Download and install Visual Studio Code for your platform

    * [macOS](/docs/setup/mac.md)
    * [Linux](/docs/setup/linux.md)
    * [Windows](/docs/setup/windows.md)

    > [!NOTE]
    > VS Code ships monthly releases and supports [auto-update](#update-cadence) when a new release is available.

1. [Install additional components](/docs/setup/additional-components.md)

    Install Git, Node.js, TypeScript, language runtimes, and more.

1. [Install VS Code extensions from the Visual Studio Marketplace](https://marketplace.visualstudio.com/VSCode)

    Customize VS Code with themes, formatters, language extensions and debuggers for your favorite languages, and more.

1. [Set up AI-assisted coding with GitHub Copilot](/docs/copilot/setup-simplified.md)

    > [!TIP]
    > If you don't yet have a Copilot subscription, you can use Copilot for free by signing up for the [Copilot Free plan](https://github.com/github-copilot/signup) and get a monthly limit of completions and chat interactions.

1. [Get started with the VS Code tutorial](/docs/getstarted/getting-started.md)

    Discover the user interface and key features of VS Code.

## Update cadence

VS Code releases a new version [each month](/updates) with new features and important bug fixes. Most platforms support auto updating and you are prompted to install the new release when it becomes available.

You can also manually check for updates by running **Help** > **Check for Updates** on Linux and Windows, or running **Code** > **Check for Updates** on macOS.

> [!NOTE]
> You can [disable auto-update](/docs/supporting/faq.md#how-do-i-opt-out-of-vs-code-autoupdates) if you prefer to update VS Code on your own schedule.

## Insiders nightly build

If you'd like to try our nightly builds to see new features early or verify bug fixes, you can install our [Insiders build](/insiders). The Insiders build installs side-by-side with the monthly Stable build and you can freely work with either on the same machine. The Insiders build is the same one the VS Code development team uses on a daily basis and we really appreciate people trying out new features and providing feedback.

## Portable mode

Visual Studio Code supports [Portable mode](https://en.wikipedia.org/wiki/Portable_application) installation. This mode enables all data created and maintained by VS Code to live near itself, so it can be moved around across environments, for example, on a USB drive. See the [VS Code Portable Mode](/docs/editor/portable.md) documentation for details.

## Next steps

Once you have installed VS Code, these topics will help you learn more about it:

* [VS Code tutorial](/docs/getstarted/getting-started.md) - A quick hands-on tour of the key features of VS Code.
* [Tips and Tricks](/docs/getstarted/tips-and-tricks.md) - A collection of productivity tips for working with VS Code.
* [AI-assisted coding](/docs/copilot/overview.md) - Learn about using GitHub Copilot in VS Code to help you write code faster.

## Common questions

### What are the system requirements for VS Code?

We have a list of [System Requirements](/docs/supporting/requirements.md).

### How big is VS Code?

VS Code is a small download (< 200 MB) and has a disk footprint of less than 500 MB, so you can quickly install VS Code and try it out.

### How do I create and run a new project?

VS Code doesn't include a traditional **File** > **New Project** dialog or pre-installed project templates. You'll need to add [additional components](/docs/setup/additional-components.md) and scaffolders depending on your development interests. With scaffolding tools like [Yeoman](https://yeoman.io/) and the multitude of modules available through the [npm](https://www.npmjs.com/) package manager, you're sure to find appropriate templates and tools to create your projects.

### How do I know which version I'm running?

On Linux and Windows, choose **Help** > **About**. On macOS, use **Code** > **About Visual Studio Code**.

### Why is VS Code saying my installation is unsupported?

VS Code has detected that some installation files have been modified, perhaps by an extension. Reinstalling VS Code will replace the affected files. See our [FAQ topic](/docs/supporting/faq.md#installation-appears-to-be-corrupt-unsupported) for more details.

### How can I do a 'clean' uninstall of VS Code?

If you want to remove all user data after [uninstalling](/docs/setup/uninstall.md) VS Code, you can delete the user data folders `Code` and `.vscode`. This returns you to the state before you installed VS Code. This can also be used to reset all settings if you don't want to uninstall VS Code.

The folder locations vary depending on your platform:

* **Windows** - Delete `%APPDATA%\Code` and `%USERPROFILE%\.vscode`.
* **macOS** - Delete `$HOME/Library/Application Support/Code` and `~/.vscode`.
* **Linux** - Delete `$HOME/.config/Code` and `~/.vscode`.
