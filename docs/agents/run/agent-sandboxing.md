---
ContentId: 51cb4cc4-4f0a-4af7-b3c9-8c07795202cb
DateApproved: 9/16/2026
MetaDescription: Configure agent terminal sandboxing in {% data variables.product.prodname_vscode_shortname %} with file system, network, and platform-specific controls.
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
# Sandbox agent terminal commands

Agent terminal commands can run processes with the same operating system permissions as your user account. Agent sandboxing adds an operating system-level boundary that restricts the files and network resources these commands can access.

This article describes where agent terminal sandboxing is available, how to turn it on, and how to configure its file system and network boundaries.

## Understand the sandbox boundary

Sandboxing and approvals provide separate layers of protection:

| Protection | Purpose |
|---|---|
| [Approvals](/docs/agents/run/approvals.md) | Determine whether an action runs automatically or requires your confirmation. |
| Sandboxing | Restricts the file system and network resources that an approved terminal command can access. |

Sandboxing applies to terminal commands and their child processes. It does not apply to built-in file tools or other agent tools, and it does not replace the isolation provided by cloud sessions or Dev Containers. [MCP server sandboxing](/docs/agent-customization/mcp-servers.md#sandbox-mcp-servers) is a separate feature with its own configuration and platform support.

For the security model and threats that sandboxing helps mitigate, see [Trust and safety](/docs/agents/concepts/trust-and-safety.md#agent-sandboxing).

## Check platform availability

Agent terminal sandboxing has different lifecycle states and prerequisites by platform. The following table applies to Local sessions and the Agent Host custom terminal tool. Sandboxing for the [{% data variables.copilot.copilot_sdk_short %} built-in shell](#configure-sandboxing-for-an-agent-host-session) is Experimental on all supported platforms and uses separate enablement settings.

| Platform | Status | Enablement setting | Prerequisite |
|---|---|---|---|
| macOS | Preview | `setting(chat.agent.sandbox.enabled)` | None. |
| Linux and WSL2 | Preview | `setting(chat.agent.sandbox.enabled)` | Install `bubblewrap` and `socat`. |
| Windows | Experimental | `setting(chat.agent.sandbox.enabledWindows)` | Install the applicable September 8, 2026 Windows security update. |

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
> Windows support is Experimental. The Windows lifecycle status in this article applies only to agent terminal sandboxing. MCP server sandboxing is not available on Windows.

## Turn on agent sandboxing

For a Local session or an Agent Host session that uses the custom terminal tool, set the enablement setting for your platform to `on`.

| Platform | Setting | Default |
|---|---|---|
| macOS, Linux, and WSL2 | `setting(chat.agent.sandbox.enabled)` | `off` |
| Windows | `setting(chat.agent.sandbox.enabledWindows)` | `off` |

When available, you can also select **Sandboxing for terminal** (Experimental) in the permissions picker.

Sandboxing is independent of the selected [permission level](/docs/agents/run/approvals.md#permission-levels). For example, an enabled sandbox continues to restrict terminal commands even when you select **Allow all**.

If the required operating system dependencies are unavailable, {% data variables.product.prodname_vscode_shortname %} does not silently run the command without the sandbox. Follow the notification to install the missing dependency, or turn off sandboxing before you run the command.

### Configure sandboxing for an Agent Host session

Sandboxing is available for {% data variables.product.prodname_copilot_short %} sessions that run on the [Agent Host](/docs/agents/concepts/agent-host.md), in both the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md) and an editor window. An editor window can also contain Local sessions, which use the shared terminal settings above.

These {% data variables.product.prodname_copilot_short %} sessions use the {% data variables.copilot.copilot_sdk_short %} built-in shell by default. Its sandbox support is Experimental. Set the applicable setting to `on`:

| Platform | Setting | Default |
|---|---|---|
| macOS, Linux, and WSL2 | `setting(chat.agentHost.sdkSandbox.enabled)` | `off` |
| Windows | `setting(chat.agentHost.sdkSandbox.enabledWindows)` | `off` |

If you turn on the Experimental `setting(chat.agentHost.customTerminalTool.enabled)` setting, the session uses the Agent Host custom terminal tool instead. This setting defaults to `false`. The custom terminal tool uses `setting(chat.agent.sandbox.enabled)` or `setting(chat.agent.sandbox.enabledWindows)`, not the SDK-specific enablement settings.

Both terminal tools use the shared file system settings and `setting(chat.agent.sandbox.allowNetwork)`. Their [network filtering capabilities](#configure-network-access) differ. Start a new Agent Host session after changing the terminal tool or sandbox settings.

### Control sandboxing for an Agent Host session

For a {% data variables.product.prodname_copilot_short %} Agent Host session, the **Sandboxing for terminal** toggle applies only to the current session:

* A new session without an explicit selection inherits the applicable sandbox configuration from its Agent Host.
* Turning sandboxing on or off does not update User or Workspace settings or affect another session.
* An explicit session selection persists when you restore the session, reload the window, or restart {% data variables.product.prodname_vscode_shortname %}.
* A session without an explicit selection follows changes to its host's sandbox configuration. A session with a saved selection keeps that selection.
* Peer chats and subagents use the owning session's sandbox state.

The effective state uses the following precedence:

1. A managed setting that requires sandboxing and does not allow a bypass.
1. The saved selection for the current session.
1. The Agent Host's effective sandbox configuration.

For a local Agent Host, the applicable Workspace setting takes precedence over the User setting, followed by the effective product default. For a remote Agent Host, the inherited state comes from the connected host's configuration.

If a managed setting requires sandboxing without a bypass, the toggle is disabled. If the managed setting permits a bypass, the session starts with sandboxing on and you can turn it off for that session. Learn more about [managed agent sandboxing](/docs/enterprise/ai-settings.md#configure-agent-sandboxing).

## Configure file system access

With the default file system configuration, sandboxed terminal commands:

* Can read workspace folders, the sandbox runtime temporary folder, and paths that {% data variables.product.prodname_vscode_shortname %} adds for common developer tools.
* Can write to the current working directory and its subdirectories.
* Cannot read sensitive locations in your home directory by default.
* Apply the same restrictions to child processes, such as build scripts and package managers.

Use the file system setting for your platform to add or restrict paths:

| Platform | Setting | Rules | Path syntax |
|---|---|---|---|
| macOS | `setting(chat.agent.sandbox.fileSystem.mac)` | `allowRead`, `allowWrite`, `denyRead`, `denyWrite` | Literal paths and Git-style glob patterns. |
| Linux and WSL2 | `setting(chat.agent.sandbox.fileSystem.linux)` | `allowRead`, `allowWrite`, `denyRead`, `denyWrite` | Literal paths. |
| Windows | `setting(chat.agent.sandbox.fileSystem.windows)` | `allowRead`, `allowWrite`, `denyRead` | Literal paths. |

The following example grants read access to an application configuration folder and prevents access to an SSH folder on Linux:

```jsonc
{
    "chat.agent.sandbox.fileSystem.linux": {
        "allowRead": ["/home/me/.config/myapp"],
        "denyRead": ["/home/me/.ssh"]
    }
}
```

Workspace folders, the sandbox runtime temporary folder, and per-command read paths are added automatically. You typically only need `allowRead` for configuration or data outside the workspace.

## Configure network access

File system and network isolation are separate controls. By default, `setting(chat.agent.sandbox.allowNetwork)` is `true`, which permits unrestricted network access while preserving the file system boundary.

### All-or-nothing network access

The Agent Host's {% data variables.copilot.copilot_sdk_short %} built-in shell and the Windows terminal sandbox do not support hostname-based network restrictions:

* Set `setting(chat.agent.sandbox.allowNetwork)` to `false` to block outbound network access.
* Set it to `true` to permit unrestricted outbound network access.

The `setting(chat.agent.allowedNetworkDomains)` and `setting(chat.agent.deniedNetworkDomains)` lists do not provide domain filtering for these sandboxed commands. Do not rely on a domain allowlist to limit network access when `setting(chat.agent.sandbox.allowNetwork)` is `true`.

### Domain filtering on macOS and Linux

Local sessions and the Agent Host custom terminal tool support domain filtering on macOS, Linux, and WSL2. Set `setting(chat.agent.sandbox.allowNetwork)` to `false` to apply network isolation. An empty `setting(chat.agent.allowedNetworkDomains)` list then blocks all outbound network access. Add only the domains that terminal commands need, and use `setting(chat.agent.deniedNetworkDomains)` to block exceptions. Denied domains take precedence over allowed domains.

```jsonc
{
    "chat.agent.sandbox.allowNetwork": false,
    "chat.agent.allowedNetworkDomains": [
        "api.github.com"
    ],
    "chat.agent.deniedNetworkDomains": [
        "example.com"
    ]
}
```

The same domain lists apply to the fetch tool and integrated browser when you turn on `setting(chat.agent.networkFilter)`.

> [!NOTE]
> Restart {% data variables.product.prodname_vscode_shortname %} after you change `setting(chat.agent.networkFilter)`, `setting(chat.agent.allowedNetworkDomains)`, or `setting(chat.agent.deniedNetworkDomains)` to ensure new integrated browser sessions use the updated network policy.

> [!CAUTION]
> An agent can perform actions on an allowed domain, not only read data. For example, access to `api.github.com` can permit repository changes. Allow only domains that are required for the task.

In Local sessions, when a sandboxed command is blocked by network isolation, `setting(chat.agent.sandbox.retryWithAllowNetworkRequests)` controls whether the agent can ask you to retry the command inside the sandbox with unrestricted network access. The default is `true`. File system restrictions remain active for the approved retry.

## Control approval and fallback behavior

By default, terminal commands that run inside the sandbox are approved automatically. In Local sessions, set `setting(chat.agent.sandbox.allowAutoApprove)` to `false` to use the normal terminal approval flow for sandboxed commands.

If a command cannot run inside the sandbox, the agent can ask for confirmation to run it outside the sandbox. The `setting(chat.agent.sandbox.allowUnsandboxedCommands)` setting controls this fallback for Local and {% data variables.product.prodname_copilot_short %} Agent Host sessions:

* `true` (default): the agent can request permission to run outside the sandbox. Approve only if you trust the command to run without the sandbox's file system and network restrictions.
* `false`: **Allow Outside Sandbox** is not offered, and requests to run outside the sandbox fail instead of prompting for approval. Commands that comply with the sandbox policy can still run.

The agent tries the command inside the sandbox first. Rejecting the confirmation prevents the command from running outside the sandbox.

![Screenshot showing a prompt to run a command outside the agent sandbox.](../images/agent-sandboxing/sandbox-prompt.png)

## Related resources

* [Manage approvals and permissions](/docs/agents/run/approvals.md)
* [Understand trust and safety for AI agents](/docs/agents/concepts/trust-and-safety.md)
* [Manage AI settings in enterprise environments](/docs/enterprise/ai-settings.md)
