---
ContentId: FC5262F3-D91D-4665-A5D2-BCBCCF66E53A
DateApproved: 6/10/2026
MetaDescription: Get started with Visual Studio Code, the open platform for AI agents. Install on Windows, macOS, or Linux and start building with agentic coding, extensions, and a powerful editor.
MetaSocialImage: images/quicksetup/quick-setup-social.png
---
# Get started with Visual Studio Code

Visual Studio Code is a free, open-source code editor for Windows, macOS, and Linux. It is the open platform for AI agents, built to be extended, and backed by a powerful editor with built-in debugging, Git, and IntelliSense.

You can [download](https://code.visualstudio.com/download) and install VS Code on your desktop, or open it instantly in the browser at [vscode.dev](https://vscode.dev) with zero setup (learn more about [VS Code for the Web](/docs/remote/vscode-web.md)).

![Screenshot of VS Code with a travel blog project open, showing an agent session in the Chat view and previewing the site in the integrated browser.](images/overview/vscode-overview.png)

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with VS Code">
Follow a hands-on tutorial to build your first app with AI in VS Code.

* [Start tutorial](/docs/getstarted/getting-started.md)

</div>

## Install VS Code

[Download the installer](https://code.visualstudio.com/download) for your platform and follow the steps below. VS Code is lightweight and runs on most available hardware. Review the [system requirements](/docs/supporting/requirements.md) for details.

VS Code ships weekly [Stable](/updates) releases with auto-update. To preview upcoming features, install the [Insiders](/insiders) build, which ships nightly and runs side by side with Stable.

{% tabs id="os" %}
{% tab label="Windows" %}

1. Download the [User Setup installer](https://code.visualstudio.com/download) (`.exe`).
1. Run the installer and follow the prompts.
1. VS Code is ready to use. The installer adds `code` to your PATH so you can open a folder from the terminal with `code .`.

For System Setup, ZIP archive, or other options, see the [full Windows setup guide](/docs/setup/windows.md).

{% /tab %}
{% tab label="macOS" %}

1. Download the [`.dmg` installer](https://code.visualstudio.com/download).
1. Open the `.dmg` file and drag **Visual Studio Code.app** to the **Applications** folder.
1. Open VS Code from the Applications folder or Spotlight.

To use the `code` command in the terminal, open the Command Palette (`kb(workbench.action.showCommands)`) and run **Shell Command: Install 'code' command in PATH**. For more options, see the [full macOS setup guide](/docs/setup/mac.md).

{% /tab %}
{% tab label="Linux" %}

Choose your distribution below for installation instructions. Installing the package sets up the apt or dnf repository for automatic updates. For Snap, Arch, Nix, and other options, see the [full Linux setup guide](/docs/setup/linux.md).

* **Debian / Ubuntu**
     1. Download the `.deb` package from the [VS Code download page](/download)
     1. Install it with `sudo apt install ./<file>.deb`

* **Fedora / RHEL**
     1. Download the `.rpm` package from the [VS Code download page](/download)
     1. Install it with `sudo dnf install ./<file>.rpm`

{% /tab %}
{% /tabs %}

## Enable AI features

VS Code has built-in support for AI features like inline suggestions and AI agents that help you with coding tasks. You can get started with AI features by signing in to GitHub and use your GitHub Copilot subscription to get access to a variety of large language models and other AI features in VS Code.

Follow these steps to get started with Copilot in VS Code:

1. Select **Sign In** from the VS Code title bar or hover over the Copilot icon in the Status Bar and select **Enable AI features**.

    ![Screenshot showing a new VS Code window, highlighting the Copilot icon in the Status Bar and the Sign In button in the VS Code title bar.](images/overview/vscode-enable-ai-features.png)

1. Choose a sign-in method and follow the prompts.

    * If you already have a Copilot subscription for your account, VS Code will use that subscription.

    * If you don't have a Copilot subscription yet, you'll be signed up for the [Copilot Free plan](https://docs.github.com/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/managing-copilot-free/about-github-copilot-free) and get a monthly allowance of inline suggestions and AI credits.

1. Start using Copilot in VS Code!

> [!TIP]
> You can also use AI features in VS Code without using a Copilot subscription by bringing your own language model API key. Learn more about [using language models in VS Code](/docs/agent-customization/language-models.md#bring-your-own-language-model-key).

## Next steps

<div class="card-grid">
    <a class="card" href="/docs/getstarted/getting-started">
        <i class="codicon codicon-hubot" aria-hidden="true"></i>
        <div>
            <p><strong>AI agents</strong></p>
            <p>Learn about AI agents in our hands-on guide.</p>
        </div>
    </a>
    <a class="card" href="/docs/editing/getting-started">
        <i class="codicon codicon-tools" aria-hidden="true"></i>
        <div>
            <p><strong>Powerful editor</strong></p>
            <p>Learn the basics of editing, debugging, and language support in VS Code.</p>
        </div>
    </a>
    <a class="card" href="/docs/configure/extensions/extensions">
        <i class="codicon codicon-extensions" aria-hidden="true"></i>
        <div>
            <p><strong>Extensible platform</strong></p>
            <p>Extensions, MCP servers, custom instructions, and an open API.</p>
        </div>
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
