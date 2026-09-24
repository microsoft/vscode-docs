---
ContentId: a7b8c9d0-1e2f-3a4b-5c6d-7e8f9a0b1c2d
DateApproved: 9/16/2026
MetaDescription: Understand approvals, review, sandboxing, and security considerations for AI agents in {% data variables.product.prodname_vscode_shortname %}.
MetaSocialImage: ../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- trust
- safety
- security
- sandbox
- sandboxing
- review
- checkpoints
- tool approval
- limitations
- prompt injection
---

# Understand trust and safety for AI agents

AI-generated output requires review. {% data variables.product.prodname_vscode %} includes multiple mechanisms to keep you in control of what changes reach your codebase. This article explains the control mechanisms, AI limitations, and security considerations you should be aware of.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Learn more about AI safety">
Understand the control mechanisms and safety considerations for using AI in {% data variables.product.prodname_vscode_shortname %}.

* [Learn about AI safety](/docs/agents/run/security.md)

</div>

## Stay in control

Agents can read files, edit code, run terminal commands, and call external services. {% data variables.product.prodname_vscode_shortname %}'s trust model layers several control mechanisms so you remain in charge of what reaches your codebase:

* **Review before integrating.** Agents can save edits directly in the session folder or worktree. Inspect the changes in a diff before you commit, merge, or create a pull request. For supported sessions, [checkpoints](/docs/agents/run/review-code-edits.md#edit-requests-and-restore-checkpoints) restore affected workspace files and chat to an earlier point.
* **Approve sensitive actions.** With [Manual permissions](/docs/agents/run/approvals.md#permission-levels) in Agent Host sessions, actions that aren't covered by your approval settings require confirmation. File edits might be auto-approved. Configure [sensitive-file approval](/docs/agents/run/review-code-edits.md#edit-sensitive-files) when an edit must require confirmation before it is applied.
* **Constrain autonomy.** [Permission levels](/docs/agents/run/approvals.md#permission-levels) decide how much the agent runs on its own, from per-call approvals to broad auto-approval, up to fully autonomous operation with Autopilot.
* **Enforce boundaries at the OS level.** [Agent sandboxing](#agent-sandboxing) restricts file system and network access for terminal commands so auto-approved actions cannot escape a defined scope.
* **Trust boundaries.** {% data variables.product.prodname_vscode_shortname %} uses trust decisions for workspaces, extensions, MCP servers, and network domains. Workspace MCP servers inherit Workspace Trust.

For step-by-step configuration of these controls — approval rules, sensitive-file protection, sandboxing setup, organization policies — see [AI security in {% data variables.product.prodname_vscode_shortname %}](/docs/agents/run/security.md).

Always review AI-generated code before committing. Verify that it handles edge cases, follows your project's conventions, and doesn't introduce security issues. Stopping a request or restoring workspace files doesn't reverse completed terminal commands, network requests, deployments, or changes to external services.

## Trust boundaries

{% data variables.product.prodname_vscode_shortname %}'s security model uses trust boundaries to limit the potential impact of untrusted code. Trust must be granted before a boundary is considered trusted. A single trust decision can cover related boundaries, such as a workspace and its MCP server configuration.

* **Workspace**: controls whether {% data variables.product.prodname_vscode_shortname %} enables features like tasks, debugging, and workspace settings that can execute code from the project. An untrusted workspace runs in [restricted mode](/docs/editing/workspaces/workspace-trust.md), which also disables agents.
* **Extension publisher**: controls whether extensions from a given publisher can be installed and run. {% data variables.product.prodname_vscode_shortname %} prompts you to [trust the publisher](/docs/configure/extensions/extension-runtime-security.md) before activating their extensions.
* **MCP server**: controls whether an MCP server can start and provide tools. Servers configured in `.vscode/mcp.json` or workspace-root `.mcp.json` inherit Workspace Trust. Servers from other sources can require a [separate MCP server trust decision](/docs/agent-customization/mcp-servers.md#mcp-server-trust) and prompt again after configuration changes.
* **Network domain**: controls whether the agent can fetch content from a URL. {% data variables.product.prodname_vscode_shortname %} prompts you to trust a domain before making requests to it, integrated with the [Trusted Domains](/docs/editing/editingevolved.md#outgoing-link-protection) list. You can also enable `setting(chat.agent.networkFilter)` to restrict which domains agent tools and sandboxed terminal commands can access.

You can revoke trust at any time through dedicated commands in the Command Palette. Changing Workspace Trust controls whether workspace MCP servers can run. For servers with a separate trust decision, run **MCP: Reset Trust**. For steps to configure these controls, see [AI security in {% data variables.product.prodname_vscode_shortname %}](/docs/agents/run/security.md).

## Agent sandboxing

> [!NOTE]
> Agent sandboxing is in Preview on macOS, Linux, and WSL2, and Experimental on Windows.

Agent sandboxing uses operating system-level isolation to restrict what agents can access on your machine. Instead of relying solely on approval prompts before each action, sandboxing defines strict boundaries for file system and network access that are enforced by the OS itself.

{% data variables.product.prodname_vscode_shortname %} applies sandboxing to terminal commands (`runInTerminal` agent tool) that are executed during an agent session, including Copilot Agent Host sessions. Learn how to [configure agent terminal sandboxing](/docs/agents/run/agent-sandboxing.md).

By default, {% data variables.product.prodname_vscode_shortname %} automatically approves terminal commands that run in the sandbox without a confirmation prompt because they already run in a controlled environment.

### Why sandboxing matters

Approval-based security requires you to confirm each terminal command or tool call before it runs. While this provides control, it has practical limits:

* **Approval fatigue.** Repeatedly approving commands can cause you to pay less attention to what you're approving, especially during long agent sessions.

* **Parsing limitations.** Auto-approval rules use best-effort command parsing, which has known limitations. Shell aliases, quote concatenation, and complex shell syntax can bypass the rules and slip through undetected.

* **Prompt injection.** Malicious content in files, tool outputs, or web pages can attempt to trick the agent into running harmful commands. If you approve without careful review, it might result in unintended actions and security risks.

* **Unintended actions on external services.** Even without malicious intent, an agent with network access can perform actions on your behalf that are difficult to reverse. For example, the agent might provision cloud resources, modify infrastructure settings, push code to a remote repository, or call an API that triggers a deployment or a financial transaction. Network isolation ensures the agent can only reach domains you explicitly permit, reducing the risk of unintended side effects on external services.

Sandboxing addresses these challenges by enforcing boundaries at the OS level. The sandbox prevents auto-approved commands from accessing files or network resources outside the permitted scope. If additional permissions are required, {% data variables.product.prodname_vscode_shortname %} prompts you to run the command outside the sandbox. You can configure {% data variables.product.prodname_vscode_shortname %} to try the command inside the sandbox before showing that elevation prompt.

### How sandboxing works

Sandboxing enforces two types of isolation:

* **File system isolation** limits read and write access to configured paths. It protects sensitive locations, such as SSH keys and shell configuration, and applies to child processes such as package managers and build scripts.
* **Network isolation** limits outbound connections to configured domains. It reduces the risk of data exfiltration and unintended actions on external services.

Both boundaries are applied at the operating system level and inherited by child processes. You can configure file system and network access separately. For default behavior and configuration steps, see [Sandbox agent terminal commands](/docs/agents/run/agent-sandboxing.md).

### OS-level enforcement

Agent sandboxing relies on OS-level security primitives to enforce file system and network restrictions. Because the enforcement happens at the kernel level, sandboxed processes and all of their child processes cannot bypass these boundaries, even if a command is crafted to attempt it.

| Platform | Technology | Prerequisites |
|----------|-----------|---------------|
| macOS | Apple's sandboxing framework ("Seatbelt"), built into the operating system. Enforces fine-grained file system and network restrictions at the kernel level. | None. Works out of the box. |
| Linux and WSL2 | [bubblewrap](https://github.com/containers/bubblewrap) for file system isolation and `socat` for network proxying. | Install required packages: `sudo apt-get install bubblewrap socat` (Debian and Ubuntu) or `sudo dnf install bubblewrap socat` (Fedora). |
| Windows | Microsoft MXC process containers apply file system and network policies to the command process. | Install the applicable Windows security update. Windows support is Experimental. |

WSL version 1 is not supported because bubblewrap requires Linux kernel features (user namespaces) that are only available in WSL2.

### What sandboxing does not cover

Agent sandboxing applies to shell subprocesses, including terminal commands from {% data variables.product.prodname_vscode_shortname %} agent sessions and Copilot agent-host sessions. It does not cover built-in file tools. The agent's read, edit, and write tools use {% data variables.product.prodname_vscode_shortname %}'s permission system directly, rather than running through the sandbox.

> [!TIP]
> The `setting(chat.agent.networkFilter)` setting provides network domain filtering for agent tools like the fetch tool and integrated browser, independently of sandboxing. When both sandboxing and network filtering are enabled, network rules apply to all agent tools and terminal commands.

Use the [review flow](/docs/agents/run/review-code-edits.md) and [sensitive file protection](/docs/agents/run/review-code-edits.md#edit-sensitive-files) to control these operations.

For full environment isolation, pair sandboxing with a [dev container](/docs/devcontainers/containers.md). Dev containers provide a complete boundary around the entire development environment, including all tools, file access, and network access.

Agent sandboxing continues to evolve to cover more tools and scenarios.

## AI limitations to watch for

**Incorrect output.** Models can generate code that looks correct but contains bugs, uses deprecated APIs, or doesn't handle edge cases. Always test AI-generated code, especially for logic that affects security, data integrity, or critical flows.

**Prompt injection.** Malicious content in files, tool outputs, or web pages can attempt to redirect the agent's behavior. This is why {% data variables.product.prodname_vscode_shortname %} includes tool approval gates and trust boundaries. Learn more about [AI security](/docs/agents/run/security.md).

Treat AI-generated output as a first draft: useful as a starting point, but always requiring your review and judgment. For more on how models work, including nondeterminism, knowledge boundaries, and context limits, see [Language models](/docs/agents/concepts/language-models.md).

## Related resources

* [AI security considerations](/docs/agents/run/security.md)
* [Terminal sandbox configuration](/docs/agents/run/agent-sandboxing.md)
* [Reviewing code edits](/docs/agents/run/review-code-edits.md)
