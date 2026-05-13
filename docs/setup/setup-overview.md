---
ContentId: FC5262F3-D91D-4665-A5D2-BCBCCF66E53A
DateApproved: 5/13/2026
MetaDescription: Install Visual Studio Code on Windows, macOS, or Linux and choose related setup options for your workflow.
MetaSocialImage: images/quicksetup/quick-setup-social.png
---
# Setting up Visual Studio Code

Visual Studio Code is a code editor for Windows, macOS, and Linux. Use this article to choose an installation path, check requirements, and find related setup options.

VS Code is lightweight and should run on most available hardware and platform versions. Review the [system requirements](/docs/supporting/requirements.md) to check if your computer configuration is supported.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with AI">
Follow a hands-on tutorial to build your first app with AI in VS Code.

* [Start tutorial](/docs/copilot/getting-started.md)

</div>

## Set up VS Code for your platform

Choose the setup path that matches where you want to work.

<div class="card-grid">
    <a class="card" href="/docs/setup/windows.md">
        <i class="codicon codicon-device-desktop" aria-hidden="true"></i>
        <p>Install on Windows</p>
    </a>
    <a class="card" href="/docs/setup/mac.md">
        <i class="codicon codicon-device-desktop" aria-hidden="true"></i>
        <p>Install on macOS</p>
    </a>
    <a class="card" href="/docs/setup/linux.md">
        <i class="codicon codicon-terminal" aria-hidden="true"></i>
        <p>Install on Linux</p>
    </a>
    <a class="card" href="/docs/setup/vscode-web.md">
        <i class="codicon codicon-globe" aria-hidden="true"></i>
        <p>Use VS Code for the Web</p>
    </a>
</div>

> [!NOTE]
> VS Code ships weekly releases. Most desktop installs support [auto-update](#update-cadence) when a new release is available.

## After installation

After you install VS Code, finish setup for your development workflow:

* [Install additional components](/docs/setup/additional-components.md), including Git, Node.js, TypeScript, language runtimes, and command-line tools.
* [Install extensions from the Visual Studio Marketplace](https://marketplace.visualstudio.com/VSCode) to add themes, formatters, debuggers, and language support.
* [Set up GitHub Copilot](/docs/copilot/setup.md) to use AI features in VS Code.
* [Start the VS Code tutorial](/docs/getstarted/getting-started.md) for a hands-on tour of the user interface and key features.

> [!TIP]
> New Copilot users can start with the [Copilot Free plan](https://github.com/github-copilot/signup), which includes a monthly limit of inline suggestions and chat interactions.

## Update cadence

VS Code releases a new version [each week](/updates) with new features and important bug fixes. Most platforms support auto update and prompt you to install the new release when it becomes available.

To check for updates manually, run **Help** > **Check for Updates** on Windows and Linux, or run **Code** > **Check for Updates** on macOS.

> [!NOTE]
> [Disable auto-update](/docs/supporting/faq.md#how-do-i-opt-out-of-vs-code-auto-updates) if you prefer to update VS Code on your own schedule.

## Insiders nightly build

To try nightly builds, preview new features, or verify bug fixes, install the [Insiders build](/insiders). The Insiders build installs side by side with the weekly Stable build. The VS Code development team uses the Insiders build every day and welcomes feedback from people trying new features early.

Because Insiders builds are released nightly, multiple builds often share the same product version number. To uniquely identify a specific Insiders build, use the commit ID shown in the **About** dialog in addition to the version number.

## Portable mode

Visual Studio Code supports [portable mode](https://en.wikipedia.org/wiki/Portable_application). Portable mode stores VS Code data near the application so the installation can move between environments, such as on a USB drive. See the [VS Code portable mode](/docs/editor/portable.md) documentation for details.

## Next steps

These topics help you learn more after setup:

* [VS Code tutorial](/docs/getstarted/getting-started.md) - A quick hands-on tour of the key features of VS Code.
* [Tips and Tricks](/docs/getstarted/tips-and-tricks.md) - A collection of productivity tips for working with VS Code.
* [AI-assisted coding](/docs/copilot/overview.md) - Learn how GitHub Copilot in VS Code helps you write code faster.

## Common questions

<details>
<summary>What are the system requirements for VS Code?</summary>

Review the [system requirements](/docs/supporting/requirements.md) for supported platforms and hardware.

</details>

<details>
<summary>How big is VS Code?</summary>

VS Code is a small download, less than 200 MB, and has a disk footprint of less than 500 MB.

</details>

<details>
<summary>How do I create and run a new project?</summary>

VS Code doesn't include a traditional **File** > **New Project** dialog or preinstalled project templates. Add [additional components](/docs/setup/additional-components.md) and scaffolders based on your development workflow. Scaffolding tools like [Yeoman](https://yeoman.io/) and packages from the [npm](https://www.npmjs.com/) package manager provide templates and tools to create projects.

</details>

<details>
<summary>How do I know which version I'm running?</summary>

On Linux and Windows, choose **Help** > **About**. On macOS, use **Code** > **About Visual Studio Code**. The **About** dialog shows the version number and the commit ID. For Insiders builds, multiple builds can share the same version number, so use the commit ID to uniquely identify your build.

</details>

<details>
<summary>Why is VS Code saying my installation is unsupported?</summary>

VS Code has detected that some installation files have been modified, perhaps by an extension. Reinstalling VS Code will replace the affected files. See our [FAQ topic](/docs/supporting/faq.md#installation-appears-to-be-corrupt-unsupported) for more details.

</details>

<details>
<summary>How can I do a 'clean' uninstall of VS Code?</summary>

To remove all user data after [uninstalling](/docs/setup/uninstall.md) VS Code, delete the user data folders `Code` and `.vscode`. This returns VS Code to the state before installation and can reset all settings without uninstalling VS Code.

The folder locations vary depending on your platform:

* **Windows** - Delete `%APPDATA%\Code` and `%USERPROFILE%\.vscode`.
* **macOS** - Delete `$HOME/Library/Application Support/Code` and `~/.vscode`.
* **Linux** - Delete `$HOME/.config/Code` and `~/.vscode`.

</details>
