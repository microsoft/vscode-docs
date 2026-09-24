---
ContentId: FC5262F3-D91D-4665-A5D2-BCBCCF66E53A
DateApproved: 9/16/2026
MetaDescription: Install {% data variables.product.prodname_vscode %}, open a project, and choose a guided path to learn editor basics or complete a task with an AI agent.
MetaSocialImage: images/quicksetup/quick-setup-social.png
---
# Get started with {% data variables.product.prodname_vscode %}

Use this guide to install {% data variables.product.prodname_vscode %}, open your code, and choose a hands-on path for your first task. You can learn the editor and write code yourself, use an AI agent, or combine both approaches.

AI features are optional. You don't need an account to use the core editor.

## Get started in three steps

1. **Install {% data variables.product.prodname_vscode_shortname %}.** Download the installer for your platform and follow the [installation steps](#install-vs-code).

1. **Open your code.** Open an existing folder, clone a repository, or create a folder for a new project.

1. **Complete your first task.** Follow the [editor tutorial](/docs/editing/getting-started/editor-tutorial.md) to learn the basics, or use the [agents quickstart](/docs/agents/quickstart.md) to build an app from a natural-language prompt.

## Install {% data variables.product.prodname_vscode_shortname %}

{% tabs id="os" %}
{% tab label="Windows" %}

1. Download the [User Setup installer](https://code.visualstudio.com/download) (`.exe`).
1. Run the installer and follow the prompts.
1. Open {% data variables.product.prodname_vscode_shortname %}. The installer adds `code` to your PATH, so you can also open a folder from the terminal with `code .`.

For System Setup, ZIP archive, or other options, see the [full Windows setup guide](/docs/setup/windows.md).

{% /tab %}
{% tab label="macOS" %}

1. Download the [`.dmg` installer](https://code.visualstudio.com/download).
1. Open the `.dmg` file and drag **{% data variables.product.prodname_vscode %}.app** to the **Applications** folder.
1. Open {% data variables.product.prodname_vscode_shortname %} from the Applications folder or Spotlight.

To use the `code` command in the terminal, open the Command Palette (`kb(workbench.action.showCommands)`) and run **Shell Command: Install 'code' command in PATH**. For more options, see the [full macOS setup guide](/docs/setup/mac.md).

{% /tab %}
{% tab label="Linux" %}

Choose your distribution for installation instructions. Installing the package sets up the apt or dnf repository for automatic updates. For Snap, Arch, Nix, and other options, see the [full Linux setup guide](/docs/setup/linux.md).

* **Debian or Ubuntu**
     1. Download the `.deb` package from the [{% data variables.product.prodname_vscode_shortname %} download page](/download).
     1. Install it with `sudo apt install ./<file>.deb`.

* **Fedora or RHEL**
     1. Download the `.rpm` package from the [{% data variables.product.prodname_vscode_shortname %} download page](/download).
     1. Install it with `sudo dnf install ./<file>.rpm`.

{% /tab %}
{% /tabs %}

Review the [system requirements](/docs/supporting/requirements.md) before you install {% data variables.product.prodname_vscode_shortname %} on an older or managed device.

## Open your code

In {% data variables.product.prodname_vscode_shortname %}, a folder that contains your project files is called a *workspace*. Opening a folder gives the editor, terminal, source control, debugger, and AI agents access to the same project context.

1. Open {% data variables.product.prodname_vscode_shortname %} and select **File** > **Open Folder...**.

1. Select an existing project folder. To start a new project, create a folder in the dialog and then open it.

1. If the Workspace Trust dialog appears, review the folder contents and choose whether you trust its authors.

    Only trust code from sources you know. You can safely browse unfamiliar code in Restricted Mode. Learn more about [Workspace Trust](/docs/editing/workspaces/workspace-trust.md).

When the folder name and files appear in the Explorer view, you're ready to start working. You can also [clone a GitHub repository](/docs/sourcecontrol/github.md#cloning-a-repository) directly from {% data variables.product.prodname_vscode_shortname %}.

## Choose your first task

Choose a guided path based on how you want to start. Both paths introduce the workspace and core {% data variables.product.prodname_vscode_shortname %} features.

<div class="card-grid">
    <a class="card" href="/docs/editing/getting-started/editor-tutorial">
        <i class="codicon codicon-tools" aria-hidden="true"></i>
        <div>
            <p><strong>Learn the editor basics</strong></p>
            <p>Create and edit files, use extensions and source control, and run and debug code.</p>
        </div>
    </a>
    <a class="card" href="/docs/agents/quickstart">
        <i class="codicon codicon-hubot" aria-hidden="true"></i>
        <div>
            <p><strong>Complete a task with an AI agent</strong></p>
            <p>Build and validate a small web app, then review the generated changes.</p>
        </div>
    </a>
</div>

If you're new to code editors, start with the editor tutorial. You can enable AI features at any time.

## Enable AI features

We recommend {% data variables.product.prodname_copilot %} for getting started with AI in {% data variables.product.prodname_vscode_shortname %}. It provides inline suggestions and access to multiple language models, and is the option used in the agents quickstart. You can also [use AI without a Copilot subscription](#use-ai-without-a-copilot-subscription).

To get started with {% data variables.product.prodname_copilot_short %}:

1. Select **Sign In** from the {% data variables.product.prodname_vscode_shortname %} title bar, or hover over the Copilot icon in the Status Bar and select **Enable AI features**.

    ![Screenshot showing a new {% data variables.product.prodname_vscode_shortname %} window, highlighting the Copilot icon in the Status Bar and the Sign In button in the {% data variables.product.prodname_vscode_shortname %} title bar.](images/overview/vscode-enable-ai-features.png)

1. Choose a sign-in method and follow the prompts.

    * If your account has a Copilot subscription, {% data variables.product.prodname_vscode_shortname %} uses that subscription.

    * If you don't have a Copilot subscription, you can sign up for the [{% data variables.copilot.copilot_free_short %} plan](https://docs.github.com/en/copilot/managing-copilot/managing-copilot-as-an-individual-subscriber/managing-copilot-free/about-github-copilot-free), which includes a monthly allowance of inline suggestions and AI credits.

### Use AI without a Copilot subscription

You don't need a {% data variables.product.prodname_copilot %} subscription to use AI in {% data variables.product.prodname_vscode_shortname %}. You can bring your own models or use another provider's agent:

* **Bring your own key (BYOK):** [Connect a supported model provider](/docs/agent-customization/language-models.md#bring-your-own-language-model-key) or [use Claude with an API key or another supported BYOK option (Experimental)](/docs/agents/run/agent-harnesses.md#use-claude-without-github-sign-in).
* **Provider subscription:** Use [Codex with your ChatGPT account](/docs/agents/run/agent-harnesses.md#codex).
* **Local model:** [Run a model on your own machine, such as Ollama](/docs/agent-customization/language-models.md#bring-your-own-language-model-key), including offline.

Setup, available features, and usage charges depend on the provider and integration. API-key and local models don't provide features that rely on the {% data variables.product.prodname_copilot %} service, such as inline suggestions, semantic search, and embeddings.

### Can I use {% data variables.product.prodname_vscode_shortname %} without signing in?

Yes. You don't need an account to use the editor, terminal, debugger, source control, extensions, or other core features.

AI doesn't always require GitHub sign-in either. You can use API-key or local models without a GitHub account. You can also [use Claude with a supported BYOK configuration or Codex with a ChatGPT account](#use-ai-without-a-copilot-subscription). Running these agents in the {% data variables.copilot.agents_window %} without GitHub sign-in is experimental. Follow the linked setup instructions for your chosen option.

To hide the built-in AI features, see [Remove AI features from {% data variables.product.prodname_vscode_shortname %}](/docs/setup/copilot.md#remove-ai-features-from-vs-code).

## Explore the main parts of {% data variables.product.prodname_vscode_shortname %}

The {% data variables.product.prodname_vscode_shortname %} interface brings your project files, editing tools, terminal, source control, and AI chat into one workspace.

![Screenshot showing the Explorer, editor, integrated browser, terminal, and Chat view in {% data variables.product.prodname_vscode_shortname %}.](images/overview/vscode-overview.png)

* **Explorer and editor:** Browse project files and edit code with IntelliSense, refactoring, and multi-cursor support.

* **Run, debug, and test:** Run your application, set breakpoints, inspect program state, and run tests without leaving the editor.

* **Source Control:** Review changes and work with Git repositories through the built-in source control interface.

* **Extensions and settings:** Add support for your programming languages and tools, then personalize the interface and editor behavior.

* **AI chat and agents:** Ask coding questions or delegate a task to an agent that can edit files, run commands, and verify its work.

## Next steps

<div class="card-grid">
    <a class="card" href="/docs/languages/overview">
        <i class="codicon codicon-code" aria-hidden="true"></i>
        <div>
            <p><strong>Add language support</strong></p>
            <p>Set up editing, running, and debugging for your programming language.</p>
        </div>
    </a>
    <a class="card" href="/docs/getstarted/personalize-vscode">
        <i class="codicon codicon-settings-gear" aria-hidden="true"></i>
        <div>
            <p><strong>Personalize your setup</strong></p>
            <p>Configure settings, keyboard shortcuts, themes, and display language.</p>
        </div>
    </a>
    <a class="card" href="/docs/sourcecontrol/overview">
        <i class="codicon codicon-source-control" aria-hidden="true"></i>
        <div>
            <p><strong>Use source control</strong></p>
            <p>Track changes and collaborate with built-in Git support.</p>
        </div>
    </a>
</div>

## Common questions

<details>
<summary>How do I create and run a new project?</summary>

{% data variables.product.prodname_vscode_shortname %} doesn't include a **File** > **New Project** dialog or preinstalled project templates. Install the [components for your development workflow](/docs/setup/additional-components.md), and then use the tools for your programming language or framework to create and run a project.

</details>

<details>
<summary>Should I use Stable or Insiders?</summary>

Stable releases ship weekly and update automatically. Install the [Insiders build](/insiders) to preview upcoming features in a nightly build that runs side by side with Stable.

</details>

<details>
<summary>Can I use {% data variables.product.prodname_vscode_shortname %} in a browser or on a remote machine?</summary>

Yes. Use [{% data variables.product.prodname_vscode_shortname %} for the Web](/docs/remote/vscode-web.md) in a browser, or connect your desktop editor to a [remote machine](/docs/remote/remote-overview.md).

</details>

For installation and update troubleshooting, see the [{% data variables.product.prodname_vscode_shortname %} FAQ](/docs/supporting/faq.md).
