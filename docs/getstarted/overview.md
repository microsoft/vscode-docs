---
ContentId: FC5262F3-D91D-4665-A5D2-BCBCCF66E53A
DateApproved: 8/19/2026
MetaDescription: Get started with Visual Studio Code, the open platform for AI agents. Install on Windows, macOS, or Linux and start building with agentic coding, extensions, and a powerful editor.
MetaSocialImage: images/quicksetup/quick-setup-social.png
---
# Get started with Visual Studio Code

Visual Studio Code is a free, open-source code editor for Windows, macOS, and Linux. Write code yourself with a powerful editor, or describe a task in natural language and let an AI agent plan, edit, and verify the work. Combine both approaches to fit how you like to work.

VS Code runs on your desktop or a [remote machine](/docs/remote/remote-overview.md), or you can access it instantly from your browser with [VS Code for the Web](/docs/remote/vscode-web.md).

VS Code ships weekly [Stable](/updates) releases with auto-update. To preview upcoming features, install the [Insiders](/insiders) build, which ships nightly and runs side by side with Stable.

<div class="docs-action" data-show-in-doc="true" data-show-in-sidebar="false" title="Get started with VS Code">
Complete your first coding task with an AI agent in VS Code.

* [Start quickstart](/docs/agents/quickstart.md)

</div>

Prefer to write code yourself first? Start with the [editor tutorial](/docs/editing/getting-started.md) instead.

## Get started in three steps

New to VS Code? These three steps take you from a fresh install to your first project.

1. **Install VS Code.** Download the installer for your platform and follow the [install steps](#install-vs-code) below.

1. **Open your code.** Open an existing folder, [clone a repository from GitHub](/docs/sourcecontrol/github.md#cloning-a-repository), or create a new file to start working.

1. **Choose how you want to work.** Complete a task with the [agents quickstart](/docs/agents/quickstart.md), or [learn the basics of writing code](/docs/editing/getting-started.md) yourself. The agents quickstart walks you through signing in to [enable AI features](#enable-ai-features). AI features are optional. You can use VS Code fully as a traditional editor without signing in.

## Install VS Code

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

Review the [system requirements](/docs/supporting/requirements.md) for details.

## Enable AI features

VS Code has built-in support for AI features like inline suggestions and AI agents that help you with coding tasks. Sign in with GitHub and use your GitHub Copilot subscription to get access to a variety of large language models and other AI features in VS Code.

Follow these steps to get started with Copilot in VS Code:

1. Select **Sign In** from the VS Code title bar or hover over the Copilot icon in the Status Bar and select **Enable AI features**.

    ![Screenshot showing a new VS Code window, highlighting the Copilot icon in the Status Bar and the Sign In button in the VS Code title bar.](images/overview/vscode-enable-ai-features.png)

1. Choose a sign-in method and follow the prompts.

    * If you already have a Copilot subscription for your account, VS Code will use that subscription.

    * If you don't have a Copilot subscription yet, you'll be signed up for the [Copilot Free plan](https://docs.github.com/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/managing-copilot-free/about-github-copilot-free) and get a monthly allowance of inline suggestions and AI credits.

1. Start using Copilot in VS Code!

> [!TIP]
> You can also use AI features in VS Code without using a Copilot subscription by bringing your own language model API key. Learn more about [using language models in VS Code](/docs/agent-customization/language-models.md#bring-your-own-language-model-key).

## What you can do with VS Code

VS Code adapts to how you want to work, whether you write every line yourself or hand off tasks to an AI agent. Most workflows combine both. Choose your [language model](/docs/agent-customization/language-models.md), whether from your GitHub Copilot subscription or your own API key, and pick the [agent](/docs/agents/overview.md) that fits the task.

* **Build with AI agents.** Describe what you want in natural language, and an agent plans a solution, edits files across your project, runs commands, and fixes its own errors. Run agents in the [Agents window](/docs/agents/run/agents-window.md) for an agent-first workflow, or in the [Chat view](/docs/agents/run/chat-view.md) while you write code in the editor. Learn more about [AI agents in VS Code](/docs/agents/overview.md).

    ![Screenshot of the Agents window with the integrated browser showing a development website and the changes panel showing a list of changes.](images/overview/agents-window-integrated-browser.png)

* **Write, test, and debug code.** Edit with IntelliSense, refactoring, and multi-cursor support, then find and fix problems with the built-in [debugger](/docs/debugtest/debugging.md) and [testing](/docs/debugtest/testing.md) tools. Track your work with integrated [source control](/docs/sourcecontrol/overview.md), and add [language support](/docs/languages/overview.md) for the stack you use.

    ![Screenshot of VS Code with the Debugger quick pick to select the target environment.](images/overview/debugger-nodejs.png)

* **Extend and customize.** Install [extensions](/docs/configure/extensions/extensions.md) and [MCP servers](/docs/agent-customization/mcp-servers.md) to add languages, tools, and data sources. Tailor the agent experience to your specific project needs with [custom instructions, custom agents, and your choice of language model](/docs/agent-customization/overview.md).

    ![Screenshot of the Extensions view with the search bar and a list of extensions.](images/overview/extensions-search-python.png)

## Explore VS Code

Pick a path based on what you want to do next.

<div class="card-grid">
    <a class="card" href="/docs/agents/quickstart">
        <i class="codicon codicon-hubot" aria-hidden="true"></i>
        <div>
            <p><strong>Agentic coding</strong></p>
            <p>Complete your first coding task with an AI agent.</p>
        </div>
    </a>
    <a class="card" href="/docs/editing/getting-started">
        <i class="codicon codicon-tools" aria-hidden="true"></i>
        <div>
            <p><strong>Editing and debugging</strong></p>
            <p>Learn the editor, debugging, and productivity basics.</p>
        </div>
    </a>
    <a class="card" href="/docs/languages/overview">
        <i class="codicon codicon-code" aria-hidden="true"></i>
        <div>
            <p><strong>Languages</strong></p>
            <p>Set up support for Python, JavaScript, C++, and more.</p>
        </div>
    </a>
</div>

### More ways to use VS Code

<div class="card-grid">
    <a class="card" href="/docs/configure/extensions/extensions">
        <i class="codicon codicon-extensions" aria-hidden="true"></i>
        <div>
            <p><strong>Extensions and MCP</strong></p>
            <p>Add tools, languages, and data sources to VS Code.</p>
        </div>
    </a>
    <a class="card" href="/docs/agent-customization/overview">
        <i class="codicon codicon-settings-gear" aria-hidden="true"></i>
        <div>
            <p><strong>Customize AI</strong></p>
            <p>Custom instructions, custom agents, and language models.</p>
        </div>
    </a>
    <a class="card" href="/docs/sourcecontrol/overview">
        <i class="codicon codicon-source-control" aria-hidden="true"></i>
        <div>
            <p><strong>Source control</strong></p>
            <p>Track changes and collaborate with built-in Git support.</p>
        </div>
    </a>
    <a class="card" href="/docs/remote/remote-overview">
        <i class="codicon codicon-remote" aria-hidden="true"></i>
        <div>
            <p><strong>Remote and web</strong></p>
            <p>Work in containers, WSL, SSH, or the browser.</p>
        </div>
    </a>
</div>

## Common questions

<details>
<summary>How do I create and run a new project?</summary>

VS Code doesn't include a traditional **File** > **New Project** dialog or preinstalled project templates. Add [additional components](/docs/setup/additional-components.md) and scaffolders based on your development workflow. Scaffolding tools like [Yeoman](https://yeoman.io/) and packages from the [npm](https://www.npmjs.com/) package manager provide templates and tools to create projects.

</details>

<details>
<summary>What are the system requirements for VS Code?</summary>

Review the [system requirements](/docs/supporting/requirements.md) for supported platforms and hardware.

</details>

<details>
<summary>How big is VS Code?</summary>

VS Code is a small download, less than 200 MB, and has a disk footprint of less than 500 MB.

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
