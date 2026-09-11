---
ContentId: 3b7e6d52-0c41-4f8a-9d2e-1a5c7b9e4f60
DateApproved: 9/16/2026
MetaDescription: Manage agent permission levels, tool approvals, terminal auto-approval, and sandboxing in {% data variables.product.prodname_vscode_shortname %}.
MetaSocialImage: ../../images/shared/github-copilot-social.png
keywords:
- copilot
- ai
- agents
- chat
- approvals
- permissions
- sandbox
---
# Manage approvals and permissions

Agents in {% data variables.product.prodname_vscode %} can edit files, run terminal commands, and call external tools. {% data variables.product.prodname_vscode_shortname %} uses two security layers to help you control these actions:

* **Approvals** determine whether an action runs automatically or requires your confirmation.
* **Sandboxing** restricts the file system and network resources that agent terminal commands can access, even after the commands are approved.

This article explains how these layers work together and how to configure permission levels, tool and URL approvals, terminal auto-approval, and sandboxing. For the security concepts behind these controls, see [Trust and safety](/docs/agents/concepts/trust-and-safety.md).

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Trust and safety concepts">
Learn why {% data variables.product.prodname_vscode_shortname %} uses permission levels, tool approval, and sandboxing to keep you in control.

* [Read about trust and safety](/docs/agents/concepts/trust-and-safety.md)

</div>

| Mechanism | What it controls | Key setting |
|---|---|---|
| [Permission levels](#permission-levels) | The approval behavior for a chat session | `setting(chat.permissions.default)` |
| [Tool approval](#tool-approval) | Which tools require confirmation before or after they run | `setting(chat.tools.eligibleForAutoApproval)` |
| [URL approval](#url-approval) | Which URLs can be requested and which responses can enter the chat context | `setting(chat.tools.urls.autoApprove)` |
| [Terminal approval](#automatically-approve-terminal-commands) | Which terminal commands run without confirmation | `setting(chat.tools.terminal.autoApprove)` |
| [Sandboxing](#sandbox-agent-commands) | The file system and network boundaries for terminal commands | `setting(chat.agent.sandbox.enabled)` |

## Permission levels

Permission levels control how the agent handles approvals for the current chat session. Select a level from the permissions dropdown in the chat input. You can change it at any time.

New sessions use the level configured by `setting(chat.permissions.default)`.

**Assisted permissions** is available only for supported sessions that run on the [Agent Host](/docs/agents/concepts/agent-host.md). For the Copilot harness, choose **Folder** isolation because worktree sessions always use **Allow all**.

`feature(assisted-permissions)`

Enable the `setting(chat.assistedPermissions.enabled)` setting to show **Assisted permissions** in supported Agent Host permission pickers. An organization can also hide this option by [disabling global auto-approval](/docs/enterprise/ai-settings.md#disable-global-auto-approval).

| Permission level | Description |
|---|---|
| **Manual permissions** (default) | Uses your tool, URL, and terminal approval settings. Actions that are not auto-approved require your confirmation. |
| **Assisted permissions** | Uses an LLM judge to assess each tool call. Calls that the judge does not approve require your confirmation. |
| **Allow all** | Runs all tool calls without confirmation. |

Sandboxing is independent of the permission level. **Allow all** and **Autopilot** skip approval prompts, but an enabled sandbox still restricts terminal file system and network access. Because sandboxing applies only to terminal commands, use tool and URL approvals to control other actions with **Manual permissions**.

> [!IMPORTANT]
> **Assisted permissions** reduces approval interruptions but does not replace your judgment. The model-based risk assessment can make mistakes. The first time you select this level, a warning dialog asks you to confirm.

> [!CAUTION]
> **Allow all** and **Autopilot** skip confirmation for potentially destructive actions, including file edits, terminal commands, and external tool calls. The first time you select either option, a warning dialog asks you to confirm. Use these options only when you trust the workspace and understand the [security implications](/docs/agents/run/security.md).

### How Autopilot works

**Autopilot** is an agent mode, not a permission level. Select it from the mode picker in the chat input to let the agent work autonomously until it determines that the task is complete. Autopilot:

* Auto-approves all tools, like **Allow all**.
* Retries when it encounters errors.
* Responds automatically to questions that would otherwise block progress.

For differences between Autopilot on the Agent Host and extension host, see [Agent Host behavior](/docs/agents/concepts/agent-host.md#behavior-on-the-extension-host).

### Advanced autopilot (Preview)

Advanced Autopilot delegates the completion decision to a separate model. After each turn, a small, fast model evaluates whether the original request is complete and guides the next turn when more work is needed. Set `setting(chat.autopilot.advanced.enabled)` to `true` to use this preview feature.

> [!NOTE]
> Autopilot consumes AI credits like interactive chat. Learn more about [usage-based billing](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals).

### Allow all tools globally

To auto-approve tools across all workspaces, enable `setting(chat.tools.global.autoApprove)`. To bypass approvals only for the current supported local or {% data variables.copilot.copilot_cli_short %} session, use `/yolo` or `/autoApprove`. Use `/disableYolo` or `/disableAutoApprove` to restore the session's default permission level.

Prefer the session-scoped **Allow all** level when you do not need auto-approval in every workspace.

> [!CAUTION]
> Global auto-approval removes confirmation prompts in every workspace. Only enable it if you understand the [security implications](/docs/agents/run/security.md). The first time you enable it, a warning dialog asks you to confirm.

## Tool approval

Some tools can modify your environment or access external services. Their results can also contain prompt injection attempts. Tool approval protects against both risks.

When approval is required, review the tool name and input parameters, then approve a single use or grant approval for the session, workspace, or all future invocations.

![Screenshot of a tool confirmation dialog showing tool details and approval options.](../images/approvals/chat-approve-tool.png)

For files that contain secrets or sensitive configuration, require explicit approval for [edits to sensitive files](/docs/agents/run/review-code-edits.md#edit-sensitive-files).

> [!IMPORTANT]
> Always review tool parameters carefully before approving, especially for tools that modify files, run commands, or access external services. See the [Security considerations](/docs/agents/run/security.md) for using AI in {% data variables.product.prodname_vscode_shortname %}.

### Manage tool approvals

Run **Chat: Manage Tool Approval** from the Command Palette (`kb(workbench.action.showCommands)`) to review and configure approvals. Tools are grouped by source, such as an MCP server or extension.

| Approval | Effect |
|---|---|
| **Pre-approval** ("without approval") | Runs the tool without a confirmation dialog. |
| **Post-approval** ("without reviewing result") | Adds the tool result to the chat context without review. Use caution with external data that might contain prompt injection. |

Expand a source to configure approvals for individual tools, or select the top-level checkboxes to trust all tools from a specific MCP server or extension at once.

### Prevent tools from being auto-approved

Set a tool to `false` in `setting(chat.tools.eligibleForAutoApproval)` to always require manual approval. The confirmation dialog then does not offer an auto-approval option for that tool.

Organizations can also use device management policies to enforce manual approvals for specific tools. Learn more in the [Enterprise documentation](/docs/enterprise/ai-settings.md).

### Reset tool confirmations

Run **Chat: Reset Tool Confirmations** from the Command Palette (`kb(workbench.action.showCommands)`) to clear all saved approvals. To change individual approvals, use [**Chat: Manage Tool Approval**](#manage-tool-approvals).

## URL approval

When a tool accesses a URL, such as the `#web/fetch` tool, {% data variables.product.prodname_vscode_shortname %} separates approval into two decisions:

| Step | What you approve | Protection |
|---|---|---|
| **Request approval** | Contacting the URL or domain | Prevents data from being sent to an untrusted site. |
| **Response approval** | Adding the fetched content to the chat context | Helps prevent prompt injection from untrusted content. |

![Screenshot of a URL approval dialog showing URL details and approval options.](../images/approvals/chat-approve-url.png)

For each step, you can approve once or automatically approve future requests or responses for the URL or domain. Approving a request does not approve its response.

Request approval uses the [Trusted Domains](/docs/editing/editingevolved.md#outgoing-link-protection) list. A trusted domain does not require request approval, but its response still requires review unless you separately auto-approve responses for that domain.

Use `setting(chat.tools.urls.autoApprove)` to store exact URLs, glob patterns, or wildcards. Set a pattern to a boolean to control both steps, or use `approveRequest` and `approveResponse` to control them separately.

URL auto-approval examples:

```jsonc
{
  "chat.tools.urls.autoApprove": {
    "https://www.example.com": false,
    "https://*.contoso.com/*": true,
    "https://example.com/api/*": {
      "approveRequest": true,
      "approveResponse": false
    }
  }
}
```

## Automatically approve terminal commands

The agent uses one tool to run any [terminal command](/docs/agents/run/tools.md#run-terminal-commands). To avoid granting that tool unrestricted approval, {% data variables.product.prodname_vscode_shortname %} evaluates each command separately.

By default, common read-only commands run automatically, while risky commands such as `rm` and `del` require approval. Add rules to `setting(chat.tools.terminal.autoApprove)` to change this behavior:

* Set a command to `true` to auto-approve it.
* Set a command to `false` to require approval.
* Wrap a regular expression in `/` characters to match a command pattern.

For example:

```jsonc
{
  // Allow the `mkdir` command
  "mkdir": true,
  // Allow `git status` and commands starting with `git show`
  "/^git (status|show\\b.*)$/": true,

  // Always require approval for the `del` command
  "del": false,
  // Always require approval for commands containing "dangerous"
  "/dangerous/": false
}
```

A `false` rule requires approval. It does not block the command. To block a terminal tool call, use a [Preview `PreToolUse` hook](/docs/agent-customization/hooks.md#usage-scenarios) that returns `permissionDecision: "deny"`.

By default, rules match each subcommand. A compound command is auto-approved only when all its subcommands match a `true` rule and none match a `false` rule. A `false` rule always takes precedence.

To evaluate the full command line instead, use object syntax and set `matchCommandLine` to `true`.

Related settings:

* Disable `setting(chat.tools.terminal.enableAutoApprove)` to require approval for every command.
* `setting(chat.tools.terminal.blockDetectedFileWrites)` `feature(terminal-block-detected-file-writes)` defaults to `outsideWorkspace`, which requires approval for detected writes outside the workspace. The OS temporary folder (`/tmp` on macOS and Linux, `%TEMP%` on Windows) is exempt when session-level command approval is active.
* Enable the experimental `setting(chat.tools.terminal.ignoreDefaultAutoApproveRules)` setting to ignore the built-in rules and use only your rules. Built-in deny rules are designed to protect against dangerous commands.

> [!CAUTION]
> Terminal auto-approval is a best-effort convenience, not a security boundary. Command detection has these limitations:
>
> * The PowerShell and bash tree-sitter grammars might not identify every subcommand.
> * zsh and fish commands are parsed with the bash grammar, which can miss syntax differences.
> * File write detection is limited, and obfuscated commands can evade matching.
>
> If prompt injection is a concern or you work in a high-risk environment, [sandbox agent commands](#sandbox-agent-commands) or run {% data variables.product.prodname_vscode_shortname %} in a container.

## Sandbox agent commands

> [!NOTE]
> Agent sandboxing is currently in preview and might further evolve.

Agent sandboxing restricts file system and network access for terminal commands, including Copilot agent-host sessions that use the {% data variables.product.prodname_vscode_shortname %} terminal integration. It does not sandbox other agent tools. For the security model and OS-level implementation, see [Agent sandboxing](/docs/agents/concepts/trust-and-safety.md#agent-sandboxing).

Agent terminal sandboxing is available on macOS and Linux, including WSL2 environments.

### Configure the sandbox

On macOS and Linux, configure these settings:

| Setting | Default | Effect |
|---|---|---|
| `setting(chat.agent.sandbox.enabled)` | `off` | Set to `on` to run terminal commands with file system and network isolation. |
| `setting(chat.agent.sandbox.allowNetwork)` | `false` | Set to `true` to give sandboxed commands unrestricted network access. File system restrictions remain active. |
| `setting(chat.agent.sandbox.allowAutoApprove)` | `true` | Set to `false` to require the normal terminal approval flow for commands inside the sandbox. |

The **Sandboxing for terminal** checkbox in the permission picker updates `setting(chat.agent.sandbox.enabled)`.

With the default sandbox configuration, terminal commands:

* Have read access to workspace folders, the sandbox runtime temp folder, and any per-command paths that {% data variables.product.prodname_vscode_shortname %} adds automatically (for example, paths required by `git`, `node`, `npm`, `dotnet`). Reads from your home directory (`$HOME`) are denied by default.
* Have write access only to the current working directory and its subdirectories.
* Cannot access the network unless you configure domain access or unrestricted network access.
* Run without confirmation unless you disable `setting(chat.agent.sandbox.allowAutoApprove)`.

> [!IMPORTANT]
> If the required OS dependencies for sandboxing are not installed, {% data variables.product.prodname_vscode_shortname %} offers to install the necessary components. If you choose not to install them, sandboxing is not enabled.

### Configure file system access

Use `setting(chat.agent.sandbox.fileSystem.mac)` on macOS or `setting(chat.agent.sandbox.fileSystem.linux)` on Linux and WSL2 to change file system access.

Configure `allowRead`, `allowWrite`, `denyRead`, and `denyWrite` with literal paths. Glob patterns are not supported. Deny rules take precedence over allow rules.

Workspace folders, the sandbox runtime temp folder, and per-command read paths are allowed automatically. You typically only need `allowRead` for configuration or data outside the workspace.

```jsonc
{
  "chat.agent.sandbox.fileSystem.mac": {
    // Allow writes to the working directory
    "allowWrite": ["."],
    // Allow reads from an additional path outside the workspace
    "allowRead": ["/Users/me/.config/myapp"],
    // Block writes to specific subdirectories
    "denyWrite": ["./secrets/"],
    // Block reads from specific paths
    "denyRead": ["/etc/passwd"]
  }
}
```

### Configure network access

Sandbox network isolation and the agent network filter work together:

| Setting | Applies to | Behavior |
|---|---|---|
| `setting(chat.agent.networkFilter)` | Agent tools such as fetch and the integrated browser | When enabled, permits only domains in `setting(chat.agent.allowedNetworkDomains)`. |
| `setting(chat.agent.allowedNetworkDomains)` | Filtered agent tools and network-isolated terminal commands | Lists permitted domains. An empty list blocks all domains. |
| `setting(chat.agent.deniedNetworkDomains)` | Filtered agent tools and network-isolated terminal commands | Lists blocked domains and takes precedence over the allow list. |
| `setting(chat.agent.sandbox.allowNetwork)` | Sandboxed terminal commands | When enabled, permits unrestricted network access for terminal commands and ignores domain lists for those commands. |

When sandboxing is enabled and `setting(chat.agent.sandbox.allowNetwork)` is `false`, enable `setting(chat.agent.networkFilter)` and add allowed domains to give terminal commands selective network access. Domain lists support wildcards such as `*.example.com`.

When network restrictions block a sandboxed command, `setting(chat.agent.sandbox.retryWithAllowNetworkRequests)` controls the fallback. Its default value, `true`, prompts you to retry inside the sandbox with unrestricted network access. File system restrictions remain active.

```jsonc
{
    "chat.agent.networkFilter": true,
    "chat.agent.allowedNetworkDomains": [
        "api.github.com"
    ],
    "chat.agent.deniedNetworkDomains": [
        "example.com"
    ]
}
```

### Run commands outside the sandbox

If a command cannot run inside the sandbox, the agent asks for approval to run it outside the sandbox. Disable `setting(chat.agent.sandbox.allowUnsandboxedCommands)` to prevent this elevation option.

The agent tries the command inside the sandbox first, so commands that succeed there do not produce an elevation prompt.

## Related resources

* [Use tools with agents](/docs/agents/run/tools.md)
* [Security considerations for using AI in {% data variables.product.prodname_vscode_shortname %}](/docs/agents/run/security.md)
* [Trust and safety concepts](/docs/agents/concepts/trust-and-safety.md)
