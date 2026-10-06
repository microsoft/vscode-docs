---
ContentId: 51cb4cc4-4f0a-4af7-b3c9-8c07795202cb
DateApproved: 10/7/2026
MetaDescription: Configure and verify {% data variables.product.prodname_copilot_short %} Agent Host sandboxing with file system and network access controls.
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
# Sandbox {% data variables.product.prodname_copilot_short %} Agent Host sessions

{% data variables.product.prodname_copilot_short %} [Agent Host sessions](/docs/agents/concepts/agent-host.md) can run terminal commands and start language or tool servers on your local machine or a connected remote host. Agent sandboxing confines these processes to the file system and network access that you configure on the execution host.

Use this article to understand the security boundary, turn on sandboxing, grant the minimum required access, and inspect the effective policy for a session.

## Understand the sandbox boundary

Sandboxing and approvals provide separate layers of protection:

| Protection | Purpose |
|---|---|
| [Approvals](/docs/agents/run/approvals.md) | Determine whether an action runs automatically or requires your confirmation. |
| Sandboxing | Restricts the file system and network resources that an approved process can access. |

Sandboxing applies to terminal commands and their child processes. When configured, it also applies to MCP and language servers that the Agent Host launches or manages. Built-in tools that don't start operating system processes use their own permission checks.

Sandboxing is not a virtual machine or user-account boundary, and it does not replace endpoint security. A sandboxed process still runs on the execution host under your account. Network access, extra paths, credentials, developer tool access, and permission to run outside the sandbox all weaken isolation. Grant only the access that a task requires.

For the security model and threats that sandboxing helps mitigate, see [Trust and safety](/docs/agents/concepts/trust-and-safety.md#agent-sandboxing).

> [!IMPORTANT]
> Turning on sandboxing does not block internet access by default. `setting(chat.agent.sandbox.network.allowNetwork)` defaults to `true`. Configure [network access](#configure-network-access) separately when you need network confinement.

## Check platform availability

Agent Host sandboxing has the following platform prerequisites:

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

## Turn on sandboxing on the execution host

The `setting(chat.agent.sandbox.enabled)` setting controls Agent Host sandboxing on all platforms. It accepts `off` or `on` and defaults to `off`.

For a local Agent Host, the execution host is your local machine. For a connected remote Agent Host, its platform determines the sandbox implementation and prerequisites. Settings are resolved on that host, and all configured paths refer to its file system, not the client machine.

1. Meet the [platform prerequisites](#check-platform-availability) on the execution host.
1. Set `setting(chat.agent.sandbox.enabled)` to `on` in the settings for that host.
1. Start a new Agent Host session.
1. [Inspect the effective sandbox policy](#inspect-the-effective-sandbox-policy) to verify the session's restrictions.

If an operating system dependency is unavailable, the Agent Host does not silently run the command without the sandbox. Follow the notification to install the missing dependency.

### Control sandboxing for the current session

In an Agent Host session, open **Permissions** and select **Sandboxing for terminal** to change sandboxing for that session. This control does not update User or Workspace settings, change other sessions, or set the default for new sessions.

A new session inherits the effective configuration of its execution host. An explicit session selection persists when you restore the session unless an organization-managed restriction overrides it.

Sandboxing is independent of the selected [permission level](/docs/agents/run/approvals.md#permission-levels). For example, the sandbox continues to restrict processes when you select **Allow all**.

## Inspect the effective sandbox policy

The `/sandbox policy` slash command is available only in Agent Host sessions. Run it to verify whether sandboxing is active or investigate why a process is blocked.

The command opens a generated `sandbox-policy.md` report that describes the execution host, sandbox implementation, and effective file system and network policy. It does not start a model turn or change your settings.

Run `/sandbox policy` again after you change a setting or session control. Each report is a snapshot of the policy that applied when you ran the command.

## Configure file system access

The Agent Host automatically grants access to the session's working directory. Use `setting(chat.agent.sandbox.fileSystem.userConfiguredPaths)` to add other execution-host paths:

```jsonc
{
    "chat.agent.sandbox.fileSystem.userConfiguredPaths": {
        "readwritePaths": ["/path/to/build-output"],
        "readonlyPaths": ["/path/to/shared-source"],
        "deniedPaths": ["/path/to/sensitive-data"]
    }
}
```

The arrays default to empty. If entries overlap, `deniedPaths` takes precedence over `readonlyPaths`, and `readonlyPaths` takes precedence over `readwritePaths`.

`setting(chat.agent.sandbox.fileSystem.allowDevToolAccess)` defaults to `true`. This grants access to directories, configuration, and caches used by developer tools. These locations can contain credentials such as package registry tokens. Set the setting to `false` when the task does not need this access, and add narrower paths if necessary.

## Configure managed servers and credentials

When sandboxing is on, these settings determine whether processes managed by the Agent Host run with specific sandbox access:

* `setting(chat.agent.sandbox.mcpServers)` defaults to `true` and applies sandboxing to MCP servers launched or managed by the Agent Host.
* `setting(chat.agent.sandbox.lspServers)` defaults to `true` and applies sandboxing to language servers launched or managed by the Agent Host.
* `setting(chat.agent.sandbox.credentials.authenticategit)` defaults to `true` and provides Git authentication to sandboxed processes.
* `setting(chat.agent.sandbox.credentials.authenticategh)` defaults to `true` and provides GitHub CLI authentication to sandboxed processes.

Turning off MCP or language server sandboxing leaves those Agent Host-managed server processes outside the sandbox. Servers that you start independently are also outside the Agent Host's management. Turn off credential access that a task does not need. A process with credentials can act with the permissions of the associated account.

## Configure network access

File system and network isolation are separate controls:

* `setting(chat.agent.sandbox.network.allowNetwork)` defaults to `true` and permits external network access.
* `setting(chat.agent.sandbox.network.allowLocalNetwork)` defaults to `false` and controls access to local network resources.

Set `setting(chat.agent.sandbox.network.allowNetwork)` to `false` when the session does not need network access. Allow local network access only when the task must connect to a service on the execution host or private network.

The public `setting(chat.agent.allowedNetworkDomains)` and `setting(chat.agent.deniedNetworkDomains)` settings support domain controls, but their effect varies by terminal implementation and platform. Do not assume that a domain list restricts every sandboxed process. Use `/sandbox policy` to inspect the effective network policy for the current Agent Host session.

> [!CAUTION]
> A process can perform actions on an allowed network destination, not only read data. Network access can also expose credentials or workspace content. Grant only the destinations that the task requires.

## Control fallback outside the sandbox

If a command cannot run in the sandbox, the Agent Host can ask for confirmation to run it without sandbox restrictions. `setting(chat.agent.sandbox.allowUnsandboxedCommands)` controls this fallback:

* `true` (default): the Agent Host can request permission to run an operation outside the sandbox.
* `false`: the Agent Host does not offer **Allow Outside Sandbox**, and the operation fails if it cannot comply with the sandbox policy.

Rejecting the request prevents the operation from running outside the sandbox.

![Screenshot showing a prompt to run a command outside the agent sandbox.](../images/agent-sandboxing/sandbox-prompt.png)

> [!CAUTION]
> Approval to run outside the sandbox removes file system and network restrictions for that operation. If you approve a session-wide bypass, subsequent terminal commands in that session also run without those restrictions until you turn sandboxing back on.

## Legacy Local and custom terminal behavior

Legacy Local sessions and custom terminal implementations don't use all Agent Host settings in the same way. The following compatibility settings don't configure the standard Agent Host sandbox:

* The removed `chat.agent.sandbox.enabledWindows` setting is replaced by the unified `setting(chat.agent.sandbox.enabled)` setting on Windows.
* The former `setting(chat.agent.sandbox.allowNetwork)` setting migrates to `setting(chat.agent.sandbox.network.allowNetwork)`.
* `setting(chat.agent.sandbox.retryWithAllowNetworkRequests)` is a deprecated Local terminal setting. It can offer a network-enabled retry inside the legacy sandbox and does not apply to Agent Host.
* `setting(chat.agent.sandbox.allowAutoApprove)` controls legacy Local terminal approval behavior. It is not an Agent Host sandbox setting.
* `setting(chat.agent.sandbox.fileSystem.mac)`, `setting(chat.agent.sandbox.fileSystem.linux)`, and `setting(chat.agent.sandbox.fileSystem.windows)` are deprecated platform-specific settings. Agent Host ignores them.

Domain allow and deny controls remain public for compatible terminal implementations. Their capabilities differ by implementation and platform, so don't use legacy behavior to infer the effective Agent Host policy.

## When your organization manages sandboxing

Managed sandbox enforcement is in Preview. Your organization can require sandboxing, prevent bypass, or restrict network access. Enforced controls are locked, but you can select a more restrictive value where a control remains editable.

If a setting is locked or you need access that policy denies, contact your administrator. For deployment details, see [managed agent sandboxing](/docs/enterprise/manage-ai-settings.md#configure-agent-sandboxing).

## Related resources

* [Manage approvals and permissions](/docs/agents/run/approvals.md)
* [Understand trust and safety for AI agents](/docs/agents/concepts/trust-and-safety.md)
* [Review AI settings](/docs/agents/reference/ai-settings.md#sandboxing-and-network-access)
