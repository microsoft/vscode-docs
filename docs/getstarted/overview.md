---
ContentId: FC5262F3-D91D-4665-A5D2-BCBCCF66E53A
DateApproved: 11/8/2026
MetaDescription: Download and install {% data variables.product.prodname_vscode %} on Windows, macOS, or Linux, then choose a starting path.
MetaSocialImage: images/overview/vscode-overview.png
---
# Download and install {% data variables.product.prodname_vscode %}

Install {% data variables.product.prodname_vscode %} on Windows, macOS, or Linux, then open the application and choose where to start.

AI features are optional. You don't need an account to use the core editor.

Already installed? [Get to know {% data variables.product.prodname_vscode_shortname %}](/docs/getstarted/what-is-vscode.md) or go directly to a [hands-on starting path](#next-steps).

## Install {% data variables.product.prodname_vscode_shortname %}

Review the [system requirements](/docs/supporting/requirements.md) before installing. On a managed device, check your organization's installation policies or contact your administrator.

{% tabs id="os" %}
{% tab label="Windows" %}

1. Download the [Windows User Installer](https://code.visualstudio.com/download) (`.exe`).
1. Run the installer and follow the prompts.
1. Open {% data variables.product.prodname_vscode_shortname %} from the Start menu.

User setup doesn't require administrator permissions. For System setup, ZIP archives, or command-line setup, see the [Windows installation guide](/docs/setup/windows.md).

{% /tab %}
{% tab label="macOS" %}

1. Download the [macOS `.dmg` installer](https://code.visualstudio.com/download).
1. Open the `.dmg` file and drag **{% data variables.product.prodname_vscode %}.app** to the **Applications** folder.
1. Open {% data variables.product.prodname_vscode_shortname %} from the **Applications** folder or Spotlight.

For command-line setup and other options, see the [macOS installation guide](/docs/setup/mac.md).

{% /tab %}
{% tab label="Linux" %}

Choose the package for your distribution. Replace `<file>` with the downloaded package's file name and run the installation command from the folder containing it.

* **Debian or Ubuntu**
     1. Download the `.deb` package from the [{% data variables.product.prodname_vscode_shortname %} download page](https://code.visualstudio.com/download).
     1. Install it with `sudo apt install ./<file>.deb`.

* **Fedora or RHEL**
     1. Download the `.rpm` package from the [{% data variables.product.prodname_vscode_shortname %} download page](https://code.visualstudio.com/download).
     1. Install it with `sudo dnf install ./<file>.rpm`.

Open {% data variables.product.prodname_vscode_shortname %} from your desktop's applications menu. For package repositories, automatic updates, Snap, and other options, see the [Linux installation guide](/docs/setup/linux.md).

{% /tab %}
{% /tabs %}

The download page provides Stable builds. To try upcoming changes, install [Insiders](https://code.visualstudio.com/insiders), which runs alongside Stable.

For installation and update troubleshooting, see the [{% data variables.product.prodname_vscode_shortname %} FAQ](/docs/supporting/faq.md).

## Open your code

Select **File** > **Open Folder** to open an existing project folder or a new folder you created. You can also [clone a repository](/docs/sourcecontrol/repos-remotes.md#clone-repositories). When the folder and its files appear in the Explorer, your project is open.

If prompted, only trust projects from sources you know. [Workspace Trust](/docs/editing/workspaces/workspace-trust.md) lets you browse unfamiliar projects in Restricted Mode.

## Enable AI features

To try AI, follow the [{% data variables.product.prodname_copilot %} setup guide](/docs/setup/copilot.md), which covers sign-in, account access, and usage. For other providers and access options, [explore AI in {% data variables.product.prodname_vscode_shortname %}](/docs/agents/overview.md#choose-your-models-agents-and-tools). Your organization might restrict the available AI features.

## Next steps

<div class="card-grid">
    <a class="card" href="/docs/getstarted/what-is-vscode">
        <i class="codicon codicon-book" aria-hidden="true"></i>
        <div>
            <p><strong>Get to know {% data variables.product.prodname_vscode_shortname %}</strong></p>
            <p>Understand how projects, language tools, and optional AI fit together.</p>
        </div>
    </a>
    <a class="card" href="/docs/editing/getting-started/editor-tutorial">
        <i class="codicon codicon-tools" aria-hidden="true"></i>
        <div>
            <p><strong>Learn the editor</strong></p>
            <p>Create, edit, preview, and debug a small app without AI.</p>
        </div>
    </a>
    <a class="card" href="/docs/agents/quickstart">
        <i class="codicon codicon-hubot" aria-hidden="true"></i>
        <div>
            <p><strong>Try an AI agent</strong></p>
            <p>Build and validate a small app with an agent, then review the changes.</p>
        </div>
    </a>
</div>
