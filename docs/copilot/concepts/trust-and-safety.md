---
ContentId: a7b8c9d0-1e2f-3a4b-5c6d-7e8f9a0b1c2d
DateApproved: 3/25/2026
MetaDescription: Learn about AI safety controls in VS Code, including agent sandboxing, tool approval, and security considerations for AI-assisted development.
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

# Trust and safety

AI-generated output requires review. Visual Studio Code includes multiple mechanisms to keep you in control of what changes reach your codebase. This article explains the control mechanisms, AI limitations, and security considerations you should be aware of.

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Learn more about AI safety">
Understand the control mechanisms and safety considerations for using AI in VS Code.

* [Learn about AI safety](/docs/copilot/security.md)

</div>

## Stay in control

Agents can read files, edit code, run terminal commands, and call external services. VS Code provides several mechanisms to ensure you remain in charge of what happens in your workspace:

* **Review edits before applying.** Agents show file changes in a diff view. You can review each change, accept or reject individual edits, and modify the code before saving. Learn more about [reviewing code edits](/docs/copilot/chat/review-code-edits.md).

* **Use checkpoints to revert.** Agent sessions create checkpoints as work progresses. If the agent takes a wrong turn, return to a previous checkpoint and try a different approach. Learn more about [checkpoints](/docs/copilot/chat/chat-checkpoints.md).

* **Approve tool calls.** VS Code asks for your approval before running terminal commands or using tools with side effects. You control which tools can run automatically and which require confirmation. Use the **Chat: Manage Tool Approval** command to centrally [manage approvals](/docs/copilot/agents/agent-tools.md#manage-tool-approvals) for all tools.

* **Choose a permission level.** Control how much autonomy the agent has: **Default Approvals** requires confirmation for sensitive tools, **Bypass Approvals** auto-approves all tool calls, and **Autopilot** (Preview) also auto-responds to questions and continues autonomously. For higher autonomy levels, pair with [agent sandboxing](#agent-sandboxing) or a container.

* **Trust boundaries.** VS Code enforces security boundaries around file access, URL access, [agent sandboxing](#agent-sandboxing), and MCP server interactions. Learn more about [AI security](/docs/copilot/security.md).

Always review AI-generated code before committing. Verify that it handles edge cases, follows your project's conventions, and doesn't introduce security issues.

## Agent sandboxing

> [!NOTE]
> Agent sandboxing is currently in preview and is supported on macOS, Linux, and Windows WSL2.

Agent sandboxing uses operating system-level isolation to restrict what agents can access on your machine. Instead of relying solely on approval prompts before each action, sandboxing defines strict boundaries for file system and network access that are enforced by the OS itself.

VS Code currently applies sandboxing to terminal commands (`runInTerminal` agent tool) that are executed during an agent session. Learn how to [configure agent sandboxing](/docs/copilot/agents/agent-tools.md#sandbox-agent-commands).

When sandboxing is enabled, VS Code automatically approves commands and tool calls without a confirmation prompt because they already run in a controlled environment.

### Why sandboxing matters

Approval-based security requires you to confirm each terminal command or tool call before it runs. While this provides control, it has practical limits:

* **Approval fatigue.** Repeatedly approving commands can cause you to pay less attention to what you're approving, especially during long agent sessions.

* **Parsing limitations.** Auto-approval rules use best-effort command parsing, which has known limitations. Shell aliases, quote concatenation, and complex shell syntax can bypass the rules and slip through undetected.

* **Prompt injection.** Malicious content in files, tool outputs, or web pages can attempt to trick the agent into running harmful commands. If you approve without careful review, it might result in unintended actions and security risks.

* **Unintended actions on external services.** Even without malicious intent, an agent with network access can perform actions on your behalf that are difficult to reverse. For example, the agent might provision cloud resources, modify infrastructure settings, push code to a remote repository, or call an API that triggers a deployment or a financial transaction. Network isolation ensures the agent can only reach domains you explicitly permit, reducing the risk of unintended side effects on external services.

Sandboxing addresses these challenges by enforcing boundaries at the OS level. The sandbox prevents auto-approved commands from accessing files or network resources outside the permitted scope. If additional permissions are required, VS Code prompts you to run the command outside the sandbox.

### How sandboxing works

Sandboxing enforces two types of isolation: **file system access** and **network access**. Both are applied at the OS level and can't be bypassed by the commands running inside the sandbox.

#### File system isolation

Without file system isolation, a compromised command could modify files anywhere on your machine, for example, injecting malicious code into your shell configuration (`~/.bashrc`, `~/.zshrc`) or reading SSH keys from `~/.ssh/`. File system isolation prevents this by restricting access to explicitly permitted paths.

* **Default behavior.** Read access is allowed across the entire file system. Write access is limited to the current working directory and its subdirectories. When a request is made that requires additional permissions, VS Code prompts you to allow running the command outside the sandbox.

    ![Screenshot of a VS Code prompt asking the user to allow a command to run outside the sandbox for additional permissions.](../images/trust-and-safety/sandbox-prompt.png)

* **Configurable rules.** You can grant write access to additional paths, or deny read or write access to specific paths. Deny rules always take precedence over allow rules.

* **Inherited restrictions.** All child processes spawned by a sandboxed command inherit the same file system boundaries. This means tools like `npm`, `pip`, or build scripts are also restricted.

#### Network isolation

Without network isolation, a compromised command could exfiltrate sensitive data or could perform unintended actions on external services. Network isolation prevents this by blocking all outbound connections by default.

* **Domain allowlist.** You can explicitly permit access to specific domains.

    > [!CAUTION]
    > The agent can perform actions on allowed domains on your behalf, not just read data. For example, allowing `api.github.com` means the agent could create pull requests or modify repository settings. Allowing a cloud service API domain could lead to cloud resource modifications. Only configure this setting if absolutely required. This configuration is specified in a setting and applies to all sandboxed commands, not only the current task.

* **Inherited restrictions.** All child processes inherit the same network restrictions, so scripts or tools that spawn subprocesses cannot bypass the network rules.

### OS-level enforcement

Agent sandboxing relies on OS-level security primitives to enforce file system and network restrictions. Because the enforcement happens at the kernel level, sandboxed processes and all of their child processes cannot bypass these boundaries, even if a command is crafted to attempt it.

| Platform | Technology | Prerequisites |
|----------|-----------|---------------|
| macOS | Apple's sandboxing framework ("Seatbelt"), built into the operating system. Enforces fine-grained file system and network restrictions at the kernel level. | None. Works out of the box. |
| Linux and WSL2 | [bubblewrap](https://github.com/containers/bubblewrap) for file system isolation and `socat` for network proxying. | Install required packages: `sudo apt-get install bubblewrap socat` (Debian and Ubuntu) or `sudo dnf install bubblewrap socat` (Fedora). |

WSL version 1 is not supported because bubblewrap requires Linux kernel features (user namespaces) that are only available in WSL2.

### What sandboxing does not cover

Agent sandboxing applies only to shell subprocesses (terminal commands). It does not cover built-in file tools. The agent's read, edit, and write tools use VS Code's permission system directly, rather than running through the sandbox. The web fetch tool also runs outside the sandbox and is not subject to the sandbox's network restrictions.

Use the [review flow](/docs/copilot/chat/review-code-edits.md) and [sensitive file protection](/docs/copilot/chat/review-code-edits.md#edit-sensitive-files) to control these operations.

For full environment isolation, pair sandboxing with a [dev container](/docs/devcontainers/containers.md). Dev containers provide a complete boundary around the entire development environment, including all tools, file access, and network access.

Agent sandboxing is currently in preview and continues to evolve to cover more tools and scenarios.

## AI limitations to watch for

**Incorrect output.** Models can generate code that looks correct but contains bugs, uses deprecated APIs, or doesn't handle edge cases. Always test AI-generated code, especially for logic that affects security, data integrity, or critical flows.

**Prompt injection.** Malicious content in files, tool outputs, or web pages can attempt to redirect the agent's behavior. This is why VS Code includes tool approval gates and trust boundaries. Learn more about [AI security](/docs/copilot/security.md).

Treat AI-generated output as a first draft: useful as a starting point, but always requiring your review and judgment. For more on how models work, including nondeterminism, knowledge boundaries, and context limits, see [Language models](/docs/copilot/concepts/language-models.md).

## Related resources

* [AI security considerations](/docs/copilot/security.md)
* [Terminal sandbox configuration](/docs/copilot/agents/agent-tools.md#sandbox-terminal-commands)
* [Reviewing code edits](/docs/copilot/chat/review-code-edits.md)
* [Checkpoints](/docs/copilot/chat/chat-checkpoints.md)
* [Tool approval](/docs/copilot/agents/agent-tools.md#tool-approval)
