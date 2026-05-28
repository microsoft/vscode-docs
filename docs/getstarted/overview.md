---
ContentId: FC5262F3-D91D-4665-A5D2-BCBCCF66E53A
DateApproved: 5/28/2026
MetaDescription: Get started with Visual Studio Code, the open platform for AI agents. Install on Windows, macOS, or Linux and start building with agentic coding, extensions, and a powerful editor.
MetaSocialImage: images/quicksetup/quick-setup-social.png
---
# Get started with Visual Studio Code

Visual Studio Code is the open platform for AI agents. Run any agent with any model across your full project in a free, open-source editor for Windows, macOS, and Linux. Agents plan, implement across files, run tests, and iterate autonomously, so you can focus on the ideas that matter.

VS Code is also built to be extended. Thousands of [extensions](/docs/configure/extensions/extension-marketplace.md) add language support, debuggers, themes, and integrations. Connect [MCP servers](/docs/agent-customization/mcp-servers.md), define [custom instructions](/docs/agent-customization/overview.md), and build your own tools with the [extension API](/api/get-started/your-first-extension.md). Under the hood, VS Code is a powerful code editor with built-in debugging, Git, IntelliSense, and support for every major language.

You can [download](https://code.visualstudio.com/download) and install VS Code on your desktop, or open it instantly in the browser at [vscode.dev](https://vscode.dev) with zero setup (learn more about [VS Code for the Web](/docs/remote/vscode-web.md)). VS Code ships weekly [Stable](/updates) releases with auto-update. To preview upcoming features, install the [Insiders](/insiders) build, which ships nightly and runs side by side with Stable.

[Download VS Code](https://code.visualstudio.com/download)

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with AI">
Follow a hands-on tutorial to build your first app with AI in VS Code.

* [Start tutorial](/docs/copilot/getting-started.md)

</div>

<div class="card-grid">
    <a class="card" href="/docs/agents/overview">
        <i class="codicon codicon-copilot" aria-hidden="true"></i>
        <p>AI agents</p>
    </a>
    <a class="card" href="/docs/configure/extensions/extension-marketplace">
        <i class="codicon codicon-extensions" aria-hidden="true"></i>
        <p>Extensible platform</p>
    </a>
    <a class="card" href="/docs/getstarted/getting-started">
        <i class="codicon codicon-tools" aria-hidden="true"></i>
        <p>Powerful editor</p>
    </a>
</div>

## Install VS Code

[Download the installer](https://code.visualstudio.com/download) for your platform and follow the steps below. VS Code is lightweight and runs on most available hardware. Review the [system requirements](/docs/supporting/requirements.md) for details.

<details>
<summary>Windows</summary>

1. Download the [User Setup installer](https://code.visualstudio.com/download) (`.exe`).
1. Run the installer and follow the prompts.
1. VS Code is ready to use. The installer adds `code` to your PATH so you can open a folder from the terminal with `code .`.

For System Setup, ZIP archive, or other options, see the [full Windows setup guide](/docs/setup/windows.md).

</details>

<details>
<summary>macOS</summary>

1. Download the [`.dmg` installer](https://code.visualstudio.com/download).
1. Open the `.dmg` file and drag **Visual Studio Code.app** to the **Applications** folder.
1. Open VS Code from the Applications folder or Spotlight.

To use the `code` command in the terminal, open the Command Palette (`kb(workbench.action.showCommands)`) and run **Shell Command: Install 'code' command in PATH**. For more options, see the [full macOS setup guide](/docs/setup/mac.md).

</details>

<details>
<summary>Linux</summary>

Download the package for your distribution from the [download page](https://code.visualstudio.com/download):

* **Debian / Ubuntu** - Download the `.deb` package and install it with `sudo apt install ./<file>.deb`.
* **Fedora / RHEL** - Download the `.rpm` package and install it with `sudo dnf install ./<file>.rpm`.

Installing the package sets up the apt or dnf repository for automatic updates. For Snap, Arch, Nix, and other options, see the [full Linux setup guide](/docs/setup/linux.md).

</details>

## Next steps

<div class="card-grid">
    <a class="card" href="/docs/getstarted/getting-started">
        <i class="codicon codicon-mortar-board" aria-hidden="true"></i>
        <p>Take the VS Code tutorial</p>
    </a>
    <a class="card" href="/docs/agents/agents-tutorial">
        <i class="codicon codicon-lightbulb" aria-hidden="true"></i>
        <p>Build apps with agents</p>
    </a>
    <a class="card" href="/docs/agent-customization/overview">
        <i class="codicon codicon-settings-gear" aria-hidden="true"></i>
        <p>Learn about customizing agents</p>
    </a>
    <a class="card" href="/docs/editing/tips-and-tricks">
        <i class="codicon codicon-book" aria-hidden="true"></i>
        <p>VS Code tips and tricks</p>
    </a>
</div>

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
