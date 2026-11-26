---
ContentId: 51cb4cc4-4f0a-4af7-b3c9-8c07795202cb
DateApproved: 11/25/2026
MetaDescription: Configure file system and network isolation for {% data variables.product.prodname_copilot_short %} agents and troubleshoot sandbox failures.
keywords:
- copilot
- ai
- agents
- sandbox
- sandboxing
- terminal
- security
- permissions
- network
---
# Sandbox {% data variables.product.prodname_copilot_short %} agent sessions

Agent sandboxing restricts which files terminal commands can read or change and which network destinations they can reach. The restrictions also apply to programs those commands start, such as build scripts and package managers.

This guide covers {% data variables.product.prodname_copilot_short %} harness sessions in VS Code using the default shell on your machine or a connected remote machine. Use it to [turn on and verify sandboxing](#turn-on-sandboxing-where-commands-run), [adjust file access](#configure-file-system-access), [configure network access](#configure-network-access), or [troubleshoot a blocked operation](#troubleshoot-agent-sandboxing). The deprecated Local harness and the optional custom terminal tool have [separate compatibility guidance](#local-harness-sessions-and-custom-terminal-tools).

## Sandboxing by harness

The **Sandboxing for terminal** toggle described in this guide applies to the {% data variables.product.prodname_copilot_short %} harness. Turning it on doesn't configure sandboxing for {% data variables.product.prodname_anthropic_claude_short %} or {% data variables.product.prodname_openai_codex_short %} sessions.

| Harness | Sandbox controls |
|---|---|
| **{% data variables.product.prodname_copilot_short %}** | Uses the session toggle and settings described below. Permission levels are separate: **Allow all** doesn't turn off an enabled sandbox. |
| **{% data variables.product.prodname_anthropic_claude_short %}** | Uses its own runtime configuration rather than the {% data variables.product.prodname_copilot_short %} sandbox settings. Its [permission modes](/docs/agents/run/approvals.md#claude-permission-modes) control tool approvals. Don't treat a permission mode as confirmation that commands are sandboxed. |
| **{% data variables.product.prodname_openai_codex_short %}** (direct integration, Experimental) | The [approval preset](/docs/agents/run/approvals.md#codex-approval-presets) also controls sandboxing. **Default Permissions** and **Auto-Review** use the same sandbox with workspace write access. **Full Access** removes that sandbox's restrictions and skips approval prompts. |

{% data variables.product.prodname_anthropic_claude_short %} and {% data variables.product.prodname_openai_codex_short %} can't enforce {% data variables.product.prodname_copilot_short %}'s enterprise-managed sandbox settings. They are [disabled when those managed settings apply](/docs/enterprise/manage-ai-settings.md#claude-and-codex-availability) unless an administrator permits them. Permitting a harness doesn't make it enforce those settings.

## Understand the sandbox boundary

In {% data variables.product.prodname_copilot_short %} sessions, [permissions and approvals](/docs/agents/run/approvals.md) determine whether an action can run without asking you. Sandboxing limits at the operating system level what it can access when it runs. Selecting **Allow all** or saving a command approval doesn't turn off the sandbox or make a read-only folder writable.

The sandbox covers terminal commands and their child processes. It can also cover [MCP and language servers managed for the session](#configure-managed-servers-and-credentials). It doesn't cover every agent tool. Tools that don't start operating system processes have their own permission checks.

The working directory is writable by default, but it isn't the only location the sandbox can access. Common developer-tool directories and caches are also accessible by default. Use the [effective policy report](#inspect-the-effective-sandbox-policy) to see the restrictions for your specific session rather than assuming everything outside the workspace is blocked.

Sandboxed processes still run under your account on the execution machine. Sandboxing isn't a virtual machine, a user-account boundary, or a replacement for endpoint security. It is also different from running the session in a [Dev Container](#use-sandboxing-in-dev-containers) or a [managed cloud environment](/docs/agents/run/cloud-sandbox-sessions.md) `feature(cloud-sessions)`. For the security model and limitations, see [Trust and safety](/docs/agents/concepts/trust-and-safety.md#agent-sandboxing).

> [!IMPORTANT]
> Turning on sandboxing doesn't block outbound network access by default. Configure [network access](#configure-network-access) separately if you need to restrict connections.

<a name="turn-on-sandboxing-on-the-execution-host"></a>

## Turn on sandboxing where commands run

You can control sandboxing from either the {% data variables.copilot.chat_view %} or the {% data variables.copilot.agents_window %}. First check which machine runs the session's commands. For a [remote agent session](/docs/agents/run/remote-agent-sessions.md), prerequisites and paths refer to the remote machine, not the computer displaying chat.

<a name="control-sandboxing-for-an-agent-host-session"></a>

### Control sandboxing for the current session

To enable sandboxing for the current session:

1. Check the [platform requirements](#check-platform-availability) on the machine running the session.

1. In a {% data variables.product.prodname_copilot_short %} session, open the permissions picker and turn on **Sandboxing for terminal**.

1. Enter `/sandbox policy` in the chat input to [verify the effective restrictions](#inspect-the-effective-sandbox-policy).

The toggle changes only the current session. It doesn't update User or Workspace settings or change other sessions. Your selection persists when you resume the session, unless an organization-managed restriction overrides it.

If the toggle is locked or unavailable, check [organization restrictions](#when-your-organization-manages-sandboxing) and the [platform requirements](#check-platform-availability). If a required operating system dependency is missing, commands don't silently run without sandboxing.

### Inspect the effective sandbox policy

Run `/sandbox policy` in the session to check whether sandboxing is active and which file system and network restrictions apply. The report opens in the editor. Select **Open Sandbox Policy** in the response to reopen it.

Check the execution machine, sandbox state, accessible paths, and network policy. You can run the command while sandboxing is off to confirm that its restrictions aren't active. It doesn't start a model turn or change settings.

Run the command again after changing access to refresh the report. Earlier links also open the latest report for that session. To check the default for new sessions, start a new session and run the command there.

### Check platform availability

Use the operating system where commands run to select the requirements. For WSL or a container, check the Linux environment, not the host desktop.

| Platform | Requirement |
|---|---|
| macOS | macOS 15 or later. No additional sandbox packages. |
| glibc-based Linux and WSL2 | `bubblewrap` 0.5.0 or later, `slirp4netns`, util-linux 2.35 or later, and compatible `iptables` tools. See [dependency installation](#install-missing-sandbox-dependencies). |
| Windows (Experimental) | Windows 11 with BaseContainer and the required OS updates listed below. |
| Alpine Linux and other musl-based distributions | Sandboxed shell execution isn't supported. Use a supported glibc-based Linux environment. |

WSL1 isn't supported because it lacks the Linux kernel features required by the sandbox.

<details>
<summary>Windows update baselines</summary>

* Windows 11 25H2: [KB5124010](https://support.microsoft.com/en-us/servicing/os/windows-11/2026/09/kb5124010-windows-11-24h2-25h2-update), build 26200.9550 or later.
* Windows 11 26H1: [KB5124006](https://support.microsoft.com/en-us/servicing/os/windows-11/2026/09/kb5124006-windows-11-26h1-update), build 28000.3086 or later.

</details>

On Windows, a proxy, domain restrictions, or credential masking also requires [access to the proxy's local listener](#check-windows-sandbox-proxy-access).

### Set the default for new sessions

Use `setting(chat.agent.sandbox.enabled)` to choose the default: `on` or `off`. The default is `off`. Start a new session and run `/sandbox policy` to check the result.

Changing the default isn't the same as changing a session that already has an explicit sandbox selection. Use the [session toggle](#control-sandboxing-for-the-current-session) for that session.

<a name="configure-sandboxing-for-an-agent-host-session"></a>

### Use sandboxing across windows and machines

Connecting to a remote session doesn't move its commands to your computer. Use the session toggle to change sandboxing for that session on the remote machine. Defaults for new sessions come from the remote machine's effective sandbox configuration.

File paths and network destinations are evaluated where commands run. For example, a local development server on the remote machine isn't a server on your laptop. When saving [user-level path permissions](#choose-the-scope-of-a-path-approval), note that those permissions are forwarded to connected Agent Hosts.

### When your organization manages sandboxing

Enterprise-managed sandboxing (Preview) can require sandboxing and restrict file or network access. If policy prevents bypass, the session toggle is locked in the on position. You can't relax those restrictions by changing a local setting or approving a tool call.

If your organization requires sandboxing and the execution environment doesn't support it, commands can't run. Follow the [troubleshooting steps](#troubleshoot-agent-sandboxing) or contact your administrator.

Administrators should use [{% data variables.product.prodname_copilot_short %} managed sandbox settings](/docs/enterprise/manage-ai-settings.md#deploy-copilot-managed-sandbox-settings) for enforcement. Legacy sandbox device policies don't enforce the same restrictions in the {% data variables.product.prodname_copilot_short %} harness.

### Use sandboxing in Dev Containers

When sandboxing is on for a new [Dev Container session](/docs/agents/run/dev-containers.md), {% data variables.product.prodname_vscode_shortname %} adds Docker options that let the sandbox run inside the container. A default container doesn't have all of these capabilities. Recreate an existing container with sandboxing on if it was started without them.

> [!CAUTION]
> These Docker options relax the container's isolation from the host. Commands that the agent runs still run inside the sandbox, but other processes in the container don't gain that protection automatically.

<details>
<summary>Docker options used for sandboxing</summary>

| Docker option | Why it is needed |
|---|---|
| `--security-opt seccomp=unconfined` | Permits system calls that create sandbox namespaces. |
| `--security-opt apparmor=unconfined` | Permits mount operations used to set up the sandbox. |
| `--security-opt systempaths=unconfined` | Lets the sandbox mount its own `/proc` instead of inheriting Docker's masked system paths. |
| `--device /dev/net/tun` | Lets `slirp4netns` provide sandbox network access. |

</details>

## Configure file system access

Start with `/sandbox policy` to see which paths the session can already access. If a command needs an additional folder, prefer a narrow path approval rather than allowing unrestricted file access.

### Choose the scope of a path approval

When offered, **Allow sandbox path access and retry?** lets you add access and retry the operation **inside the sandbox**. Check the displayed path and whether the operation needs read-only or read and write access. Approval can cover a folder and its contents, not just the file that triggered the request.

Choose the narrowest scope that meets the task:

| Option | Where access applies |
|---|---|
| **Allow for This Session** (default) | All chats in this session, including after reload or resume. It doesn't change User or Workspace settings or apply to unrelated sessions. |
| **Allow for This Workspace** (when available) | Sessions with the same set of workspace folders on the same Agent Host. Access is saved on that host and survives reopening the workspace, without changing settings files. |
| **Allow for This User** | Saved in local User settings under `setting(chat.agent.sandbox.fileSystem.userConfiguredPaths)`. Applies across sessions and workspaces and is forwarded to connected Agent Hosts. |
| **Skip** | Declines this request without saving access or a permanent deny rule. |

Path approvals remain subject to organization restrictions. The prompt requires [bypass requests to be permitted](#control-approval-and-fallback-behavior), but accepting a path approval doesn't approve execution outside the sandbox.

Run `/sandbox policy` again after approving access to verify the result.

### Configure persistent path permissions

To configure paths directly, use `setting(chat.agent.sandbox.fileSystem.userConfiguredPaths)` in the [Settings editor](/docs/configure/settings.md#settings-editor). Its three lists default to empty:

| Property | Permission |
|---|---|
| `readwritePaths` | Read and change files. |
| `readonlyPaths` | Read files without changing them. |
| `deniedPaths` | No access. |

For example, allow writing build output, reading shared source, and no access to a sensitive folder. Replace the placeholders with absolute paths on the machine where commands run:

```json
{
    "chat.agent.sandbox.fileSystem.userConfiguredPaths": {
        "readwritePaths": ["<absolute-path-to-build-output>"],
        "readonlyPaths": ["<absolute-path-to-shared-source>"],
        "deniedPaths": ["<absolute-path-to-sensitive-data>"]
    }
}
```

In JSON, escape Windows backslashes, such as `C:\\projects\\build-output`. If a path appears in more than one list, denied access takes precedence over read-only access, which takes precedence over read and write access.

The working directory and runtime defaults also contribute to the effective policy. Common developer-tool locations can be accessible even when these lists are empty. To restrict that access, see [developer-tool access](#limit-developer-tool-access). Verify the combined restrictions with `/sandbox policy`.

### Read attached files and folders

Files and folders you explicitly [attach to a message](/docs/chat/copilot-chat-context.md#add-files-as-context) can receive read access for the sandboxed session without changing settings. In **Manual permissions**, reading those attachments doesn't require another outside-workspace read approval. This doesn't permit edits.

Attachments don't override denied paths or an organization's explicit read-only path list. A folder attachment doesn't include symlink targets outside that folder. Attaching a parent of the workspace or another writable folder doesn't grant read access to that whole parent. Attach specific files instead.

## Configure network access

By default, outbound network access is allowed and local-network access is off. Choose the access the task needs:

| Your task | Configuration |
|---|---|
| Keep outbound access available. | Leave `setting(chat.agent.sandbox.network.allowNetwork)` at `true`. Domain restrictions still apply. |
| Block outbound access. | Set `setting(chat.agent.sandbox.network.allowNetwork)` to `false`. This also blocks outbound access for the integrated browser in the sandboxed session. |
| Limit network destinations. | Keep outbound access on and configure `setting(chat.agent.sandbox.network.allowedDomains)` and `setting(chat.agent.sandbox.network.deniedDomains)`. |
| Reach a service on the execution machine or private network. | Turn on `setting(chat.agent.sandbox.network.allowLocalNetwork)` only if the task needs that access. |

A nonempty allowed-domain list limits destinations to matching entries. Denied domains take precedence. Both lists support patterns such as `*.example.com`. In a sandboxed session, an empty allowed-domain list adds no restriction. To block outbound access, set `setting(chat.agent.sandbox.network.allowNetwork)` to `false`.

For example, this configuration allows outbound connections to `api.github.com` rather than arbitrary sites:

```json
{
    "chat.agent.sandbox.network.allowNetwork": true,
    "chat.agent.sandbox.network.allowedDomains": [
        "api.github.com"
    ]
}
```

Add other destinations only when the task needs them. These domain restrictions also apply to the integrated browser in sandboxed {% data variables.product.prodname_copilot_short %} sessions. Restart {% data variables.product.prodname_vscode_shortname %} after changing domain settings so new integrated browser sessions use the updated policy.

On Windows, using a proxy, domain restrictions, or credential masking requires `setting(chat.agent.sandbox.network.allowLocalNetwork)` to be `true`. Sandboxed processes use it to reach a local proxy listener. Without it, commands that need the proxy can't launch. Turning it on also permits additional access to the local network.

Your organization can enforce narrower network restrictions. Use `/sandbox policy` to inspect the effective configuration rather than relying on your settings alone.

> [!CAUTION]
> Access to an allowed destination isn't limited to reading data. A command can send workspace content or use available credentials to change resources on that service. Allow only the access the task requires.

## Control approval and fallback behavior

When the sandbox blocks an operation, check what the command needs before changing access:

* **A file or folder:** use a [scoped path approval](#choose-the-scope-of-a-path-approval) when offered, or configure a narrow path permission.
* **A network destination:** review the [network settings](#configure-network-access).
* **Access blocked by organization policy:** contact your administrator. A tool approval doesn't override policy.

If the command can't run inside the sandbox, the agent can request **Allow Outside Sandbox** when your settings and organization permit it. This is separate from approving a command or allowing a path.

Use `setting(chat.agent.sandbox.allowUnsandboxedCommands)` to control these requests:

* `true` (default): the agent can ask to run outside the sandbox. Where offered, you can approve one operation or the current session.
* `false`: requests to run outside the sandbox fail instead of prompting. Commands that comply with the sandbox policy can still run.

Prompts for additional sandbox path access also require bypass to be allowed by your settings and managed policy. Allowing requests doesn't automatically approve either path access or unsandboxed execution.

> [!CAUTION]
> Approving execution outside the sandbox removes its file and network restrictions for that operation. A session-wide bypass also removes those restrictions from subsequent terminal commands until you turn sandboxing back on. Prefer a narrow path permission when it can meet the task.

![Screenshot showing a prompt to run a command outside the agent sandbox.](../images/agent-sandboxing/sandbox-prompt.png)

## Configure managed servers and credentials

These settings let development tools work inside the sandbox. They can also give processes access to resources beyond your project. Keep only the access the task needs.

### Sandbox MCP and language servers

When sandboxing is on, `setting(chat.agent.sandbox.mcpServers)` and `setting(chat.agent.sandbox.lspServers)` both default to `true`. They sandbox MCP and language servers started or managed for the session.

These controls don't cover servers you start independently. Turning a setting off leaves the corresponding managed server processes outside the sandbox. [Per-server MCP sandboxing](/docs/agents/run/manage-mcp-servers.md#sandbox-mcp-servers) is a separate feature with different configuration and platform support.

### Limit developer-tool access

`setting(chat.agent.sandbox.fileSystem.allowDevToolAccess)` defaults to `true`. It permits reading tool directories on `PATH`, toolchain directories, developer-tool configuration and caches, including registry tokens. Shared build caches receive read and write access.

Turn it off to remove those automatic permissions, then configure [narrower paths](#configure-persistent-path-permissions) as needed. Check `/sandbox policy` to verify the resulting access.

### Control Git credentials

`setting(chat.agent.sandbox.credentials.authenticategit)` and `setting(chat.agent.sandbox.credentials.authenticategh)` both default to `true`. They let sandboxed processes use your credentials for HTTPS Git operations and the GitHub CLI.

Turn off credential access that the task doesn't need. Authenticated commands can act with the permissions of your account, including making changes on external services.

### Mask environment variables

Use `setting(chat.agent.sandbox.credentials.envVars)` to protect environment variable values from sandboxed tools. Tools receive placeholders, and the sandbox supplies the real values only in HTTPS requests to the hosts listed in `injectHosts`.

Enter variable names, not secret values. For example, mask `API_TOKEN` and supply its value only to `api.example.com`:

```json
{
    "chat.agent.sandbox.credentials.envVars": {
        "API_TOKEN": {
            "injectHosts": ["api.example.com"]
        }
    }
}
```

On Windows, masking requires [local-network access](#configure-network-access). On Windows and macOS, tools that rely on the operating system's certificate store might also need [sandbox CA certificate trust](#trust-the-sandbox-ca-certificate-on-windows-and-macos).

For the configuration reference, see [AI sandbox and network settings](/docs/agents/reference/ai-settings.md#sandboxing-and-network-access).

## Troubleshoot agent sandboxing

Run `/sandbox policy` first to identify the execution machine and effective restrictions. Then follow the guidance for the problem you see:

| Symptom | Next step |
|---|---|
| The sandbox can't start or reports missing dependencies. | Check [platform requirements](#check-platform-availability) and [install dependencies](#install-missing-sandbox-dependencies) where the agent runs. |
| A command can't read or write a path. | Check [file permissions](#configure-file-system-access) before considering [unsandboxed execution](#control-approval-and-fallback-behavior). |
| A network request is blocked. | Review the allowed destinations and outbound-access setting in [network configuration](#configure-network-access). |
| A Windows command can't reach the sandbox proxy. | Check [local-network access](#check-windows-sandbox-proxy-access). |
| Tools report HTTPS, certificate-verification, or authentication errors. | Check [sandbox CA certificate trust](#trust-the-sandbox-ca-certificate-on-windows-and-macos). A certificate error doesn't necessarily mean an account or token is invalid. |
| The sandbox toggle is locked or a restriction can't be relaxed. | Check [organization-managed sandboxing](#when-your-organization-manages-sandboxing). |

### Install missing sandbox dependencies

Install packages and OS updates on the machine running the agent, not necessarily the computer displaying chat. For WSL, install inside the relevant Linux distribution. For a remote machine, Dev Container, or Codespace, install in that environment.

{% tabs id="sandbox-dependencies" %}
{% tab label="Linux and WSL2" %}

On Debian and Ubuntu, update the package index:

```bash
sudo apt-get update
```

After the update succeeds, install the packages:

```bash
sudo apt-get install bubblewrap slirp4netns util-linux iptables
```

On Fedora:

```bash
sudo dnf install bubblewrap slirp4netns util-linux iptables-nft
```

On Arch Linux, the following command also upgrades the system. Review the changes before approving:

```bash
sudo pacman -Syu bubblewrap slirp4netns util-linux iptables
```

On other glibc-based distributions, use the package manager or ask your administrator for:

* `bwrap` 0.5.0 or later and `slirp4netns`.
* `unshare` and `nsenter` from util-linux 2.35 or later. `unshare` must support `--map-current-user` and `--keep-caps`.
* All four firewall commands: `iptables`, `ip6tables`, `iptables-restore`, and `ip6tables-restore`, with a compatible firewall backend.

The environment also needs unprivileged user and network namespaces and read and write access to `/dev/net/tun`. If these are blocked, ask your administrator or container owner to adjust the environment. Installing packages doesn't make musl-based distributions such as Alpine Linux supported.

{% /tab %}
{% tab label="macOS" %}

No additional sandbox packages are needed. Open **System Settings > General > Software Update** and install applicable updates. Check the [minimum OS version](#check-platform-availability).

{% /tab %}
{% tab label="Windows" %}

There is no standalone sandbox package. Open **Settings > Windows Update > Check for updates**, install applicable updates, and restart when prompted. Check the [supported update baselines](#check-platform-availability).

{% /tab %}
{% /tabs %}

### Check Windows sandbox proxy access

If a sandboxed command can't reach the local proxy, open the [Settings editor](/docs/configure/settings.md#settings-editor) and find `setting(chat.agent.sandbox.network.allowLocalNetwork)`. Turn it on only if you accept the additional access to the execution machine and private network.

This requirement applies when using a proxy, domain restrictions, or credential masking. If your organization manages the setting, contact your administrator. See [network access](#configure-network-access) for the security implications.

### Trust the sandbox CA certificate on Windows and macOS

If chat reports **Sandbox trusted CA is not installed**, a tool that relies on the operating system's certificate store might fail when using sandbox credentials. Installing the sandbox's **certificate authority (CA) certificate** lets those tools trust the credential proxy's HTTPS connections.

Installation is optional. Tools that support the runtime's per-process certificate bundle can work without it. Missing OS trust doesn't prevent chat from starting, and opening a chat never changes certificate trust. On Linux, the runtime supplies a per-process bundle rather than installing a system trust root.

> [!CAUTION]
> Only install the CA on an agent host you trust. It changes which certificates applications trust, including applications outside the sandbox that use the same store. On Windows, trust applies to all users on the machine and requires administrator approval. On macOS, it applies to your login Keychain and can require your login password.

> [!WARNING]
> Don't disable TLS certificate verification to work around certificate errors.

Choose the procedure for the machine where the agent runs. Installing the CA on your computer doesn't establish trust on a remote machine.

{% tabs id="sandbox-certificate-location" %}
{% tab label="Session on your machine" %}

#### Manage certificate trust in VS Code

For sessions running on your Windows or macOS computer, use {% data variables.product.prodname_vscode_shortname %} to install the sandbox CA certificate in the operating system's trust store.

1. Select **Install** in the **Sandbox trusted CA is not installed** notice, or run **Sandbox: Manage Trusted CA** from the Command Palette (`kb(workbench.action.showCommands)`) in a local desktop window.

1. Confirm the target computer and operation, then complete any OS authorization.

1. Restart affected sandboxed tools if needed after the certificate changes.

The command manages trust on that computer, even if the selected chat runs remotely or no chat is open. It doesn't install the certificate on a remote host.

Use the same command to rotate the certificate or remove OS trust. Removing trust can cause tools that rely on the OS store to stop working. It retains the stored certificate and private key, and tools using the per-process bundle can continue to work.

On Windows, installation uses the machine's trusted root certificate store. Installing only in the current user's store isn't sufficient for sandboxed tools.

{% /tab %}
{% tab label="Remote session" %}

#### Remote environments

For a Windows or macOS remote agent host, run the following commands on that host. Desktop {% data variables.product.prodname_vscode_shortname %} and a separate {% data variables.product.prodname_copilot_short %} CLI installation aren't required there. Use `code-insiders` instead of `code` for {% data variables.product.prodname_vscode_shortname %} Insiders.

1. Open a terminal on the remote machine using the same OS account as the agent host. If the host sets `COPILOT_HOME`, use the same value.

    Run the commands yourself, not through an agent-executed terminal tool in chat.

1. Create the CA and add it to OS trust:

    ```sh
    code agent sandbox ca create
    code agent sandbox ca trust
    ```

1. Accept the confirmation and any OS authorization. Windows requires administrator approval. macOS might request Keychain authorization.

    If the remote terminal can't complete authorization, use an interactive login on the host. Don't run the agent host as Administrator or SYSTEM to work around authorization errors.

1. Check that the status is `installed`:

    ```sh
    code agent sandbox ca status
    ```

1. Return to the client and select **Refresh** in the certificate notice. This checks trust status without changing settings or restarting the host.

If no **Refresh** action is available, restart the remote agent host and reconnect. Reloading only the client doesn't reliably clear the host's cached status.

To remove OS trust, use the same account and `COPILOT_HOME` on that host:

```sh
code agent sandbox ca remove
code agent sandbox ca status
```

Accept the confirmation and any OS authorization. The status becomes `notInstalled`. The stored CA certificate and private key remain.

{% /tab %}
{% /tabs %}

If installation is unavailable, fails, or is managed by your organization, contact your administrator or support.

<details>
<summary>How certificate trust and rotation work</summary>

When credentials are masked, sandboxed tools receive placeholders. For approved destinations, a local proxy substitutes real credentials. It establishes separate encrypted connections with the tool and the destination, presenting its own TLS certificate to the tool and independently verifying the destination's certificate.

{% data variables.product.prodname_copilot_short %} generates a local, self-signed CA, not one issued by a public certificate authority. Installation adds only the public CA certificate to OS trust, not an authentication token. The CA is constrained to configured credential destinations and their DNS subdomains and to TLS server authentication, not code signing or client authentication.

The private key stays in local storage, not in sandboxed tools. It is unencrypted and protected by file system permissions, so other programs running as the same user can access it. Protect that storage and follow your organization's certificate policies. Don't manually copy certificate files or private keys.

Rotating the CA replaces it, which can be necessary when credential destinations change. If the CA was trusted, rotation also updates OS trust and can require authorization.

Domain filtering alone doesn't require CA installation: the proxy can tunnel HTTPS without decrypting it. Installing the certificate doesn't itself redirect or intercept other applications' traffic.

</details>

## Local harness sessions and custom terminal tools

The guidance above targets the default {% data variables.product.prodname_copilot_short %} shell. The following implementations have different configuration and platform support.

### Local harness (deprecated)

The Local harness `feature(local-harness)` sandboxes terminal commands on macOS and Linux only. Commands inside its sandbox are approved automatically unless they require confirmation to run outside it or with unrestricted network access. Turning off `setting(chat.tools.terminal.enableAutoApprove)` doesn't prevent approval through sandboxing or session permissions.

These legacy settings don't configure the default {% data variables.product.prodname_copilot_short %} sandbox:

* `setting(chat.agent.sandbox.fileSystem.mac)` and `setting(chat.agent.sandbox.fileSystem.linux)` are deprecated platform-specific path settings.
* `setting(chat.agent.sandbox.retryWithAllowNetworkRequests)` is a deprecated Local terminal setting for requesting a network-enabled retry.
* The former `setting(chat.agent.sandbox.allowNetwork)` setting migrates to `setting(chat.agent.sandbox.network.allowNetwork)`.

See [Move to {% data variables.product.prodname_copilot_short %}](/docs/agents/run/move-to-copilot.md) when migrating an existing workflow.

### Agent Host custom terminal tool (Experimental)

The optional Agent Host custom terminal tool is separate from both the deprecated Local harness and the default {% data variables.product.prodname_copilot_short %} shell. It uses a different terminal sandbox implementation. It isn't supported on Windows, where sessions use the default shell and sandbox runtime.

Don't assume that sandbox capabilities are identical across implementations. Use the default {% data variables.product.prodname_copilot_short %} shell for the setup described in this guide.

## Related resources

* [Manage approvals and permissions](/docs/agents/run/approvals.md)
* [Understand trust and safety for AI agents](/docs/agents/concepts/trust-and-safety.md)
* [Review AI sandbox and network settings](/docs/agents/reference/ai-settings.md#sandboxing-and-network-access)
