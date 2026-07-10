---
ContentId: a7b8c9d0-1e2f-3a4b-5c6d-7e8f9a0b1c2d
DateApproved: 7/15/2026
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

* [Learn about AI safety](/docs/agents/security.md)

</div>

## Stay in control

Agents can read files, edit code, run terminal commands, and call external services. VS Code's trust model layers several control mechanisms so you remain in charge of what reaches your codebase:

* **Review before applying.** All file changes surface in a diff view for keep/undo decisions, and [checkpoints](/docs/chat/chat-checkpoints.md) let you roll back a session.
* **Approve before acting.** Tools with side effects and terminal commands prompt for approval, with per-session, per-workspace, or per-user scoping.
* **Constrain autonomy.** [Permission levels](/docs/agents/approvals.md#permission-levels) decide how much the agent runs on its own, from per-call approvals to fully autonomous Autopilot.
* **Enforce boundaries at the OS level.** [Agent sandboxing](#agent-sandboxing) restricts file system and network access for terminal commands so auto-approved actions cannot escape a defined scope.
* **Trust boundaries.** VS Code prompts you before granting trust to workspaces, extensions, MCP servers, and network domains.

For step-by-step configuration of these controls — approval rules, sensitive-file protection, sandboxing setup, organization policies — see [AI security in VS Code](/docs/agents/security.md).

Always review AI-generated code before committing. Verify that it handles edge cases, follows your project's conventions, and doesn't introduce security issues.

## Agent sandboxing

> [!NOTE]
> Agent sandboxing is currently in preview and might further evolve.

Agent sandboxing uses operating system-level isolation to restrict what agents can access on your machine. Instead of relying solely on approval prompts before each action, sandboxing defines strict boundaries for file system and network access that are enforced by the OS itself.

VS Code applies sandboxing to terminal commands (`runInTerminal` agent tool) that are executed during an agent session, including Copilot CLI agent-host sessions that use the VS Code agent terminal integration. Learn how to [configure agent sandboxing](/docs/agents/approvals.md#sandbox-agent-commands).

When sandboxing is enabled, VS Code automatically approves terminal commands that run in the sandbox without a confirmation prompt because they already run in a controlled environment.

### Why sandboxing matters

Approval-based security requires you to confirm each terminal command or tool call before it runs. While this provides control, it has practical limits:

* **Approval fatigue.** Repeatedly approving commands can cause you to pay less attention to what you're approving, especially during long agent sessions.

* **Parsing limitations.** Auto-approval rules use best-effort command parsing, which has known limitations. Shell aliases, quote concatenation, and complex shell syntax can bypass the rules and slip through undetected.

* **Prompt injection.** Malicious content in files, tool outputs, or web pages can attempt to trick the agent into running harmful commands. If you approve without careful review, it might result in unintended actions and security risks.

* **Unintended actions on external services.** Even without malicious intent, an agent with network access can perform actions on your behalf that are difficult to reverse. For example, the agent might provision cloud resources, modify infrastructure settings, push code to a remote repository, or call an API that triggers a deployment or a financial transaction. Network isolation ensures the agent can only reach domains you explicitly permit, reducing the risk of unintended side effects on external services.

Sandboxing addresses these challenges by enforcing boundaries at the OS level. The sandbox prevents auto-approved commands from accessing files or network resources outside the permitted scope. If additional permissions are required, VS Code prompts you to run the command outside the sandbox. You can configure VS Code to try the command inside the sandbox before showing that elevation prompt.

### How sandboxing works

Sandboxing enforces two types of isolation: **file system access** and **network access**. Both are applied at the OS level and can't be bypassed by the commands running inside the sandbox.

#### File system isolation

Without file system isolation, a compromised command could modify files anywhere on your machine, for example, injecting malicious code into your shell configuration (`~/.bashrc`, `~/.zshrc`) or reading SSH keys from `~/.ssh/`. File system isolation prevents this by restricting access to explicitly permitted paths.

* **Default behavior.** Read access is allowed for workspace folders and the sandbox runtime temp folder. Reads from your home directory (`$HOME`) are denied by default to protect sensitive files such as SSH keys, shell configuration, and credentials. Write access is limited to the current working directory and its subdirectories. When a request is made that requires additional permissions, VS Code prompts you to allow running the command outside the sandbox.

    ![Screenshot of a VS Code prompt asking the user to allow a command to run outside the sandbox for additional permissions.](../images/trust-and-safety/sandbox-prompt.png)

* **Per-command read paths.** Before a command runs, VS Code parses it and grants read access to the specific paths the command needs. This covers common developer workflows such as `git`, `node`, `npm`, `dotnet`, Java, and Rust. For example, running a `node` command automatically allows reads from the Node version manager directory, and running a `git` command allows reads from `~/.gitconfig`.

* **Configurable rules.** You can grant read or write access to additional paths, or deny read or write access to specific paths. Deny rules always take precedence over allow rules.

* **Inherited restrictions.** All child processes spawned by a sandboxed command inherit the same file system boundaries. This means tools like `npm`, `pip`, or build scripts are also restricted.

#### Network isolation

Without network isolation, a compromised command could exfiltrate sensitive data or could perform unintended actions on external services. Network isolation prevents this by blocking all outbound connections by default.

Sandbox enablement and unrestricted network access are separate controls. When sandboxing is enabled and `setting(chat.agent.sandbox.allowNetwork)` is off, all outbound network access is blocked unless you explicitly allow specific domains. When `setting(chat.agent.sandbox.allowNetwork)` is on, commands can reach external services freely while file system restrictions still apply. Sandbox enablement uses `setting(chat.agent.sandbox.enabled)` on macOS and Linux, and `setting(chat.agent.sandbox.enabledWindows)` on Windows; both accept `off` (default) or `on`.

VS Code provides network domain filtering that applies to both agent tools (fetch tool, integrated browser) and sandboxed terminal commands. Enable `setting(chat.agent.networkFilter)` to activate network filtering. Use `setting(chat.agent.allowedNetworkDomains)` and `setting(chat.agent.deniedNetworkDomains)` to control which domains the agent can access. Learn how to [configure network access](/docs/agents/approvals.md#configure-network-access).

* **Retry with network access.** When a sandboxed command is blocked by network restrictions, the agent first asks for confirmation to retry inside the sandbox with unrestricted network access before falling back to running the command outside the sandbox.

* **Domain allowlist.** You can explicitly permit access to specific domains.

    > [!CAUTION]
    > The agent can perform actions on allowed domains on your behalf, not just read data. For example, allowing `api.github.com` means the agent could create pull requests or modify repository settings. Allowing a cloud service API domain could lead to cloud resource modifications. Only configure this setting if absolutely required. This configuration is specified in a setting and applies to all agent tools and sandboxed commands, not only the current task.

* **Inherited restrictions.** All child processes inherit the same network restrictions, so scripts or tools that spawn subprocesses cannot bypass the network rules.

### OS-level enforcement

Agent sandboxing relies on OS-level security primitives to enforce file system and network restrictions. Because the enforcement happens at the kernel level, sandboxed processes and all of their child processes cannot bypass these boundaries, even if a command is crafted to attempt it.

| Platform | Technology | Prerequisites |
|----------|-----------|---------------|
| macOS | Apple's sandboxing framework ("Seatbelt"), built into the operating system. Enforces fine-grained file system and network restrictions at the kernel level. | None. Works out of the box. |
| Linux and WSL2 | [bubblewrap](https://github.com/containers/bubblewrap) for file system isolation and `socat` for network proxying. | Install required packages: `sudo apt-get install bubblewrap socat` (Debian and Ubuntu) or `sudo dnf install bubblewrap socat` (Fedora). |
| Windows | MXC runtime (`wxc-exec.exe`) for sandboxed agent terminal commands. | The MXC runtime must be available. |

WSL version 1 is not supported because bubblewrap requires Linux kernel features (user namespaces) that are only available in WSL2.

### What sandboxing does not cover

Agent sandboxing applies to shell subprocesses, including terminal commands from VS Code agent sessions and Copilot CLI agent-host sessions. It does not cover built-in file tools. The agent's read, edit, and write tools use VS Code's permission system directly, rather than running through the sandbox.

> [!TIP]
> The `setting(chat.agent.networkFilter)` setting provides network domain filtering for agent tools like the fetch tool and integrated browser, independently of sandboxing. When both sandboxing and network filtering are enabled, network rules apply to all agent tools and terminal commands.

Use the [review flow](/docs/chat/review-code-edits.md) and [sensitive file protection](/docs/chat/review-code-edits.md#edit-sensitive-files) to control these operations.

For full environment isolation, pair sandboxing with a [dev container](/docs/devcontainers/containers.md). Dev containers provide a complete boundary around the entire development environment, including all tools, file access, and network access.

Agent sandboxing is currently in preview and continues to evolve to cover more tools and scenarios.

## AI limitations to watch for

**Incorrect output.** Models can generate code that looks correct but contains bugs, uses deprecated APIs, or doesn't handle edge cases. Always test AI-generated code, especially for logic that affects security, data integrity, or critical flows.

**Prompt injection.** Malicious content in files, tool outputs, or web pages can attempt to redirect the agent's behavior. This is why VS Code includes tool approval gates and trust boundaries. Learn more about [AI security](/docs/agents/security.md).

Treat AI-generated output as a first draft: useful as a starting point, but always requiring your review and judgment. For more on how models work, including nondeterminism, knowledge boundaries, and context limits, see [Language models](/docs/agents/concepts/language-models.md).

## Related resources

* [AI security considerations](/docs/agents/security.md)
* [Terminal sandbox configuration](/docs/agents/approvals.md#sandbox-agent-commands)
* [Reviewing code edits](/docs/chat/review-code-edits.md)
* [Checkpoints](/docs/chat/chat-checkpoints.md)
* [Tool approval](/docs/agents/approvals.md#tool-approval)
