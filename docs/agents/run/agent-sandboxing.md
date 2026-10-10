---
ContentId: 51cb4cc4-4f0a-4af7-b3c9-8c07795202cb
DateApproved: 10/7/2026
MetaDescription: Restrict file system and network access for {% data variables.product.prodname_copilot_short %} agent commands and verify each session's sandbox policy.
MetaSocialImage: ../images/shared/github-copilot-social.png
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

{% data variables.product.prodname_copilot_short %} sessions can run terminal commands and start language or tool servers on your machine or a connected remote machine. Agent sandboxing confines these processes to the file system and network access that you configure on the machine where they run.

Use this article to understand the security boundary, turn on sandboxing, grant the minimum required access, and inspect the effective policy for a session.

The settings and behavior below apply to Copilot sessions that use the default tools in the shared runtime.

> [!NOTE]
> **For Local sessions and custom terminal tools:** The settings and behavior differ from those described here. See [Local sessions and custom terminal tools](#local-sessions-and-custom-terminal-tools) for compatibility details.

## Understand the sandbox boundary

Sandboxing and approvals provide separate layers of protection:

| Protection | Purpose |
|---|---|
| [Approvals](/docs/agents/run/approvals.md) | Determine whether an action runs automatically or requires your confirmation. |
| Sandboxing | Restricts the file system and network resources that supported agent operations can access. |

Sandboxing applies to terminal commands and their child processes. When configured, it also applies to MCP and language servers started or managed for the session. Built-in tools that don't start operating system processes use their own permission checks.

Sandboxing is not a virtual machine or user-account boundary, and it does not replace endpoint security. A sandboxed process still runs on the execution host under your account. Network access, extra paths, credentials, developer tool access, and permission to run outside the sandbox all weaken isolation. Grant only the access that a task requires.

Depending on the operation and platform, restrictions use operating system protections or checks within the process that runs the agent. Sandboxing does not replace the isolation provided by cloud sessions or Dev Containers. [Per-server MCP sandboxing](/docs/agent-customization/mcp-servers.md#sandbox-mcp-servers) is a separate feature with its own configuration and platform support.

For the security model and threats that sandboxing helps mitigate, see [Trust and safety](/docs/agents/concepts/trust-and-safety.md#agent-sandboxing).

> [!IMPORTANT]
> Turning on sandboxing does not block outbound network access by default. `setting(chat.agent.sandbox.network.allowNetwork)` defaults to `true`. Configured allowed and denied network domains still restrict destinations. [Configure network access](#configure-network-access) separately if you need to restrict outbound connections.

## Check platform availability

Check the operating system where commands run against the following prerequisites. For remote sessions, install dependencies and operating system updates on the remote machine, not the machine where you connect to the session.

| Platform | Prerequisite |
|---|---|
| macOS | None. |
| Linux and WSL2 | Install `bubblewrap` and `socat`. |
| Windows | Install the applicable September 8, 2026 Windows security update. |

On Debian and Ubuntu, install the Linux dependencies:

```bash
sudo apt-get install bubblewrap socat
```

On Fedora, install the Linux dependencies:

```bash
sudo dnf install bubblewrap socat
```

WSL version 1 is not supported because it does not provide the Linux kernel features that `bubblewrap` requires.

On Windows, install the update that applies to your Windows version:

* Windows 11 24H2 or 25H2: [KB5124008](https://support.microsoft.com/en-us/servicing/os/windows-11/2026/09/kb5124008-windows-11-24h2-25h2-security-update).
* Windows 11 26H1: [KB5124012](https://support.microsoft.com/en-us/servicing/os/windows-11/2026/09/kb5124012-windows-11-26h1-security-update).

> [!NOTE]
> Windows support is Experimental. The separate [per-server MCP sandboxing feature](/docs/agent-customization/mcp-servers.md#sandbox-mcp-servers) is not available on Windows.

<a name="turn-on-sandboxing-on-the-execution-host"></a>

## Turn on sandboxing where commands run

The `setting(chat.agent.sandbox.enabled)` setting controls sandboxing on all supported platforms. It accepts `off` or `on` and defaults to `off`.

Configure sandboxing on the machine where the session runs commands. For a remote session, the remote machine's platform determines the sandbox implementation and prerequisites. Settings are resolved on that machine, and all configured paths refer to its file system.

> [!NOTE]
> Sandbox device policies don't enforce these controls for Copilot sessions. Administrators should use [{% data variables.product.prodname_copilot_short %} managed settings](/docs/enterprise/manage-ai-settings.md#deploy-copilot-managed-sandbox-settings) to require sandboxing.

1. Meet the [platform prerequisites](#check-platform-availability) on the execution host.
1. Set `setting(chat.agent.sandbox.enabled)` to `on` in the settings for that host.
1. Start a new Copilot session.
1. [Inspect the effective sandbox policy](#inspect-the-effective-sandbox-policy) to verify the session's restrictions.

To enable sandboxing in your settings JSON:

```json
{
    "chat.agent.sandbox.enabled": "on"
}
```

If an operating system dependency is unavailable, the command does not silently run without the sandbox. Follow the notification to install the missing dependency.

<a name="control-sandboxing-for-an-agent-host-session"></a>

### Control sandboxing for the current session

Open **Permissions** and select **Sandboxing for terminal** to change sandboxing for the current session. This control does not update User or Workspace settings, change other sessions, or set the default for new sessions.

A new session inherits the effective configuration of its execution host. An explicit session selection persists when you restore the session unless an organization-managed restriction overrides it.

Sandboxing is independent of the selected [permission level](/docs/agents/run/approvals.md#permission-levels). For example, the sandbox continues to restrict processes when you select **Allow all**.

<a name="configure-sandboxing-for-an-agent-host-session"></a>

### Use sandboxing across windows and machines

{% data variables.product.prodname_copilot_short %} sessions are available in both the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md) and an editor window. They use the built-in shell from the shared runtime by default. You do not need to change terminal implementations to use sandboxing.

For a remote session, use the [session toggle](#control-sandboxing-for-the-current-session) to change the current session's sandbox state. Defaults for new sessions come from the remote machine's sandbox configuration, not from the machine where you connect to the session.

<a name="agent-host-sandbox-settings"></a>

## Sandbox settings

The following settings configure sandboxing for Copilot sessions that use the default tools. Shared setting names do not imply that other harnesses use the same behavior.

| Setting | Default | Purpose |
|---|---|---|
| `setting(chat.agent.sandbox.enabled)` | `off` | Enable sandboxing on all supported platforms. |
| `setting(chat.agent.sandbox.network.allowNetwork)` | `true` | Permit outbound network access, subject to configured hostname restrictions. |
| `setting(chat.agent.sandbox.network.allowLocalNetwork)` | `false` | Permit access to hosts on the local network. |
| `setting(chat.agent.sandbox.network.allowedDomains)` | `[]` | Configure allowed network destinations. |
| `setting(chat.agent.sandbox.network.deniedDomains)` | `[]` | Configure blocked network destinations. |
| `setting(chat.agent.sandbox.fileSystem.userConfiguredPaths)` | Empty path lists | Customize read and write, read-only, and denied paths. |
| `setting(chat.agent.sandbox.fileSystem.allowDevToolAccess)` | `true` | Grant access to common developer tools, configuration, and caches. |
| `setting(chat.agent.sandbox.mcpServers)` | `true` | Run locally launched MCP servers in the sandbox when sandboxing is enabled. |
| `setting(chat.agent.sandbox.lspServers)` | `true` | Run language servers in the sandbox when sandboxing is enabled. |
| `setting(chat.agent.sandbox.credentials.authenticategit)` | `true` | Use your credentials for HTTPS Git operations inside the sandbox. |
| `setting(chat.agent.sandbox.credentials.authenticategh)` | `true` | Use your GitHub account for `gh` commands inside the sandbox. |
| `setting(chat.agent.sandbox.allowUnsandboxedCommands)` | `true` | Permit requests to run outside the sandbox after confirmation. |

## Inspect the effective sandbox policy

In a Copilot session, run `/sandbox policy` to verify whether sandboxing is active or investigate why a process is blocked. This command isn't available in Local sessions.

* Enter `/sandbox policy` in the chat input and submit it. The report opens automatically in the editor as a Markdown preview. Select **Open Sandbox Policy** in the response to reopen it.

The generated `sandbox-policy.md` report describes the execution host, whether sandboxing is enabled, the operating system's sandbox implementation, and the effective file system and network policy. You can also run the command when sandboxing is off. In that case, the report indicates that sandbox restrictions are not active.

The command does not start a model turn or change your sandbox settings.

Run `/sandbox policy` again after a change to refresh the report. The command updates the same report for the session, so earlier links also open the latest generated report. To check the defaults for new sessions, start a new session before running the command.

## Configure file system access

The sandbox automatically grants read and write access to the current working directory. Use `setting(chat.agent.sandbox.fileSystem.userConfiguredPaths)` to customize path permissions on all supported platforms:

| Property | Access |
|---|---|
| `readwritePaths` | Read and write access. |
| `readonlyPaths` | Read access without write access. |
| `deniedPaths` | No access. |

For a path listed in more than one property, `deniedPaths` takes precedence over `readonlyPaths`, which takes precedence over `readwritePaths`. Paths refer to the machine where the agent runs commands, including for remote sessions.

The following example grants read and write access to a build output folder, read access to shared source, and prevents access to sensitive data:

```jsonc
{
    "chat.agent.sandbox.fileSystem.userConfiguredPaths": {
        "readwritePaths": ["/path/to/build-output"],
        "readonlyPaths": ["/path/to/shared-source"],
        "deniedPaths": ["/path/to/sensitive-data"]
    }
}
```

The arrays default to empty.

The `setting(chat.agent.sandbox.fileSystem.allowDevToolAccess)` setting defaults to `true`. It grants read access to tool directories on `PATH`, toolchain directories, developer-tool configuration and caches, including registry tokens, and read and write access to shared build caches. Set it to `false` to remove these automatic developer-tool grants, and add narrower paths if necessary.

Use `/sandbox policy` to inspect the effective permissions, including runtime defaults and organization-managed restrictions.

## Configure managed servers and credentials

When sandboxing is on, these settings control the servers and credentials available to the session:

* `setting(chat.agent.sandbox.mcpServers)` defaults to `true` and applies sandboxing to MCP servers started or managed for the session.
* `setting(chat.agent.sandbox.lspServers)` defaults to `true` and applies sandboxing to language servers started or managed for the session.
* `setting(chat.agent.sandbox.credentials.authenticategit)` defaults to `true` and provides Git authentication to sandboxed processes.
* `setting(chat.agent.sandbox.credentials.authenticategh)` defaults to `true` and provides GitHub CLI authentication to sandboxed processes.

These server controls apply to processes managed by the [Agent Host](/docs/agents/concepts/agent-host.md), the process that runs the session. They don't cover servers you start independently. Turning off MCP or language server sandboxing leaves the corresponding managed server processes outside the sandbox.

Turn off credential access that a task does not need. A process with credentials can act with the permissions of the associated account.

## Configure network access

File system and network isolation are separate controls:

* `setting(chat.agent.sandbox.network.allowNetwork)` defaults to `true` and permits outbound network access. Set it to `false` to block outbound access, including for the integrated browser.
* `setting(chat.agent.sandbox.network.allowLocalNetwork)` defaults to `false` and controls access to hosts on the local network.
* `setting(chat.agent.sandbox.network.allowedDomains)` and `setting(chat.agent.sandbox.network.deniedDomains)` restrict destinations when outbound access is enabled.

Allow local network access only when the task must connect to a service on the execution host or private network. Use `/sandbox policy` to inspect the effective network policy for the current session.

To enable outbound access subject to domain filtering:

```jsonc
{
    "chat.agent.sandbox.network.allowNetwork": true,
    "chat.agent.sandbox.network.allowedDomains": [
        "api.github.com"
    ],
    "chat.agent.sandbox.network.deniedDomains": [
        "example.com"
    ]
}
```

> [!IMPORTANT]
> On Windows, a proxy, hostname restrictions, or credential masking requires `setting(chat.agent.sandbox.network.allowLocalNetwork)` to be `true`. The sandbox uses host loopback to reach a local listener. If local-network access is disabled in that configuration, the sandboxed command does not launch. Enable this setting only when you accept the additional local-network access.

> [!CAUTION]
> A process can perform actions on an allowed network destination, not only read data. Network access can also expose credentials or workspace content. Grant only the destinations that the task requires.

Your organization can enforce network restrictions that you cannot relax with a local setting. See [{% data variables.product.prodname_copilot_short %} managed sandbox settings](/docs/enterprise/manage-ai-settings.md#deploy-copilot-managed-sandbox-settings).

## Control approval and fallback behavior

If a command is blocked, check the applicable [file system](#configure-file-system-access) or [network](#configure-network-access) restriction first. Grant only the access needed for the task rather than turning off the sandbox.

If a command cannot run inside the sandbox, the agent can ask for confirmation to run it outside the sandbox. The `setting(chat.agent.sandbox.allowUnsandboxedCommands)` setting controls this fallback:

* `true` (default): the agent can request permission to run outside the sandbox. Where offered, you can approve one operation or the current session. Approve only if you trust the command to run without the sandbox's file system and network restrictions.
* `false`: **Allow Outside Sandbox** is not offered, and requests to run outside the sandbox fail instead of prompting for approval. Commands that comply with the sandbox policy can still run.

The agent requests approval when a sandboxed command fails or sandbox restrictions would block it. Rejecting the confirmation prevents the command from running outside the sandbox.

![Screenshot showing a prompt to run a command outside the agent sandbox.](../images/agent-sandboxing/sandbox-prompt.png)

> [!CAUTION]
> Approval to run outside the sandbox removes file system and network restrictions for that operation. If you approve a session-wide bypass, subsequent terminal commands in that session also run without those restrictions until you turn sandboxing back on.

<a name="legacy-local-and-custom-terminal-behavior"></a>

## Local sessions and custom terminal tools

Local sessions and custom terminal tools have different sandbox behavior. The following compatibility settings don't configure the Copilot sandbox described in this article:

* The removed `chat.agent.sandbox.enabledWindows` setting is replaced by the unified `setting(chat.agent.sandbox.enabled)` setting on Windows.
* The former `setting(chat.agent.sandbox.allowNetwork)` setting migrates to `setting(chat.agent.sandbox.network.allowNetwork)`.
* `setting(chat.agent.sandbox.retryWithAllowNetworkRequests)` is a deprecated setting for the Local terminal tool. It can offer a network-enabled retry inside that tool's sandbox and does not apply to Copilot's default tools.
* `setting(chat.agent.sandbox.allowAutoApprove)` controls terminal approval behavior for Local sessions. It does not configure the Copilot sandbox.
* `setting(chat.agent.sandbox.fileSystem.mac)`, `setting(chat.agent.sandbox.fileSystem.linux)`, and `setting(chat.agent.sandbox.fileSystem.windows)` are deprecated platform-specific settings. Copilot's default tools ignore them.

Domain allow and deny controls are available for compatible terminal tools. Their capabilities differ by implementation and platform. For Copilot sessions, use [the effective sandbox policy report](#inspect-the-effective-sandbox-policy) rather than inferring restrictions from another tool's behavior.

## When your organization manages sandboxing

Managed sandbox enforcement is in Preview. Your organization can require sandboxing, prevent bypass, or restrict network access. Enforced controls are locked, but you can select a more restrictive value where a control remains editable.

If a setting is locked or you need access that policy denies, contact your administrator. For policy details, see [enterprise agent sandboxing](/docs/enterprise/manage-ai-settings.md#configure-agent-sandboxing).

## Related resources

* [Manage approvals and permissions](/docs/agents/run/approvals.md)
* [Understand trust and safety for AI agents](/docs/agents/concepts/trust-and-safety.md)
* [Review AI settings](/docs/agents/reference/ai-settings.md#sandboxing-and-network-access)
