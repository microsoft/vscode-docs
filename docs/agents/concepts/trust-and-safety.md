---
ContentId: a7b8c9d0-1e2f-3a4b-5c6d-7e8f9a0b1c2d
DateApproved: 11/4/2026
MetaDescription: Understand AI limitations, data handling, approvals, and isolation in {% data variables.product.prodname_vscode_shortname %}.
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

Agents can change files and act on external systems, so using them requires more than checking the final answer. {% data variables.product.prodname_vscode %} provides controls for limiting actions and reviewing results.

This article explains AI limitations, where information goes, and how approvals, trust, and isolation work together. Use it to understand the protections you need before following the [security setup guidance](/docs/agents/run/security.md).

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Learn more about AI safety">
Understand the control mechanisms and safety considerations for using AI in {% data variables.product.prodname_vscode_shortname %}.

* [Learn about AI safety](/docs/agents/run/security.md)

</div>

## AI limitations to watch for

**Incorrect output.** A model can generate a convincing explanation or code that looks correct but contains bugs, uses deprecated APIs, or misses edge cases. Verify explanations against their sources and test generated code. The agent's report that a task is complete is not proof that it meets your requirements.

**Misunderstood intent.** An agent can choose an unwanted approach or take actions beyond what you intended. Define the scope and success criteria, review plans for complex changes, and redirect the work when needed. Instructions guide behavior, but [aren't enforcement](/docs/agents/concepts/customization.md#model-driven-vs-deterministic-behavior).

**Prompt injection.** Files, tool outputs, and web pages can contain instructions that attempt to redirect an agent. For example, a retrieved document might tell the agent to disregard your request and follow a different workflow. Content retrieved for a task is not automatically a trustworthy instruction, even when it comes from a service you authorized.

Treat AI-generated output as a draft that requires your judgment. For nondeterminism, training knowledge, and context limits, see [language models](/docs/agents/concepts/language-models.md).

## Stay in control

Agents can read files, edit code, run terminal commands, and call external services. {% data variables.product.prodname_vscode_shortname %}'s trust model layers several control mechanisms so you remain in charge of what reaches your codebase:

* **Review before integrating.** Agents can save edits directly in the session folder or worktree. Inspect the changes in a diff before you commit, merge, or create a pull request. For supported sessions, [checkpoints](/docs/agents/run/review-code-edits.md#edit-requests-and-restore-checkpoints) restore affected workspace files and chat to an earlier point.
* **Approve sensitive actions.** With [Manual permissions](/docs/agents/run/approvals.md#permission-levels) in Copilot harness sessions, actions that aren't covered by your approval settings require confirmation. File edits might be auto-approved. Configure [sensitive-file approval](/docs/agents/run/review-code-edits.md#require-approval-before-sensitive-edits) when an edit must require confirmation before it is applied.
* **Constrain autonomy.** Choose the [available tools](/docs/agents/run/tools.md#manage-available-tools) and the [permission level](/docs/agents/run/approvals.md#permission-levels) appropriate for the task. Making a tool available and approving a specific use of that tool are separate decisions.
* **Restrict process access.** [Agent sandboxing](#agent-sandboxing) limits the file system and network resources that covered processes can access. It complements approval checks rather than replacing them.
* **Trust boundaries.** {% data variables.product.prodname_vscode_shortname %} uses trust decisions for workspaces, extensions, MCP servers, and network domains. Workspace MCP servers inherit Workspace Trust.

For approval rules, sensitive-file protection, sandboxing setup, and organization policies, see [AI security in {% data variables.product.prodname_vscode_shortname %}](/docs/agents/run/security.md).

Always review AI-generated code before committing. Verify that it handles edge cases, follows your project's conventions, and doesn't introduce security issues. Stopping a request or restoring workspace files doesn't reverse completed terminal commands, network requests, deployments, or changes to external services.

## Trust boundaries

{% data variables.product.prodname_vscode_shortname %}'s security model uses trust boundaries to limit the potential impact of untrusted code. Trust must be granted before a boundary is considered trusted. A single trust decision can cover related boundaries, such as a workspace and its MCP server configuration.

* **Workspace**: controls whether {% data variables.product.prodname_vscode_shortname %} enables features like tasks, debugging, and workspace settings that can execute code from the project. An untrusted workspace runs in [restricted mode](/docs/editing/workspaces/workspace-trust.md), which also disables agents.
* **Extension publisher**: controls whether extensions from a given publisher can be installed and run. {% data variables.product.prodname_vscode_shortname %} prompts you to [trust the publisher](/docs/configure/extensions/extension-runtime-security.md) before activating their extensions.
* **MCP server**: controls whether an MCP server can start and provide tools. Servers configured in `.vscode/mcp.json` or workspace-root `.mcp.json` inherit Workspace Trust. Servers from other sources can require a [separate MCP server trust decision](/docs/agents/run/manage-mcp-servers.md#mcp-server-trust) and prompt again after configuration changes.
* **Network domain**: controls whether the agent can fetch content from a URL, integrated with the [Trusted Domains](/docs/editing/editingevolved.md#outgoing-link-protection) list. Network controls for fetch and browser tools are separate from [sandbox network controls](/docs/agents/run/agent-sandboxing.md#configure-network-access) for terminal commands.

Trust permits access or execution; it doesn't certify that every result or action is safe. For configuring and reviewing these decisions, see [AI security in {% data variables.product.prodname_vscode_shortname %}](/docs/agents/run/security.md).

Authorizing a [{% data variables.product.prodname_copilot_short %} connector](/docs/agent-customization/copilot-connectors.md) `feature(copilot-connectors)` grants access to the connected service. This is separate from approval of individual tool calls. The session's permission and approval settings still determine whether a tool action requires confirmation.

## Where information goes

Working on local files doesn't necessarily mean AI processing stays on your machine. Consider three separate flows:

* **Model requests** include the context supplied to the selected model, such as messages, code snippets, instructions, and tool results. The model can be hosted by a provider even when the agent edits files locally.
* **External tools** communicate with the services they connect to. Tool inputs can send information to a service, and returned content can become context for a later model request.
* **Stored history and memory** can persist beyond the current request. Where they are stored and who can access them depend on the harness, service, and configuration. See [session history](/docs/agents/run/sessions/session-history.md) and [agent memory](/docs/agents/run/memory.md).

Local model execution doesn't by itself make a workflow offline. Connected tools, indexing, and other services can still use the network. A sandbox also isn't a guarantee that no data leaves your machine: permitted network access and tools outside the sandbox have separate controls.

Before sharing work code or sensitive information, review your organization's requirements and the applicable provider's data-handling policies. For {% data variables.product.prodname_copilot %}, see the [GitHub Copilot Trust Center](https://resources.github.com/copilot-trust-center/). Models accessed through other credentials or your own API key follow the applicable provider's terms. {% data variables.product.prodname_vscode_shortname %} telemetry settings are separate from AI-provider data handling.

## Agent sandboxing

Agent sandboxing uses operating system-level isolation to restrict what terminal commands can access on the machine where they run. Instead of relying solely on approval prompts before each action, sandboxing enforces configured file system and network boundaries.

In {% data variables.product.prodname_copilot_short %} sessions that use the default tools, sandboxing covers shell execution and child processes. It can also cover MCP and language servers started or managed for the session when configured. Built-in and other non-process tools remain outside this process sandbox and use separate permission checks.

Sandboxing and approval answer different questions:

| Control | Question it answers |
|---------|---------------------|
| **Approval** | Can this action run without asking for confirmation? |
| **Sandboxing** | Which resources can this covered process access when it runs? |

Turning on sandboxing doesn't block outbound network access by default. Configure network access separately. For prerequisites, default behavior, and harness differences, see [configure agent sandboxing](/docs/agents/run/agent-sandboxing.md).

### Why sandboxing matters

Approval-based security requires you to confirm each terminal command or tool call before it runs. While this provides control, it has practical limits:

* **Approval fatigue.** Repeatedly approving commands can cause you to pay less attention to what you're approving, especially during long agent sessions.

* **Parsing limitations.** Auto-approval rules use best-effort command parsing. A command matching a rule isn't proof that its effects are safe.

* **Prompt injection.** Malicious content in files, tool outputs, or web pages can attempt to trick the agent into running harmful commands. If you approve without careful review, it might result in unintended actions and security risks.

* **Unintended actions on external services.** Even without malicious intent, an agent with network access can perform actions on your behalf that are difficult to reverse. For example, the agent might provision cloud resources, modify infrastructure settings, push code to a remote repository, or call an API that triggers a deployment or a financial transaction. Blocking outbound connections, or limiting them to required domains where domain filtering is supported, reduces this risk for sandboxed commands.

Sandbox restrictions apply to covered processes even when their actions are auto-approved. If an action needs access outside the sandbox, review that request rather than treating broader access as a routine way to make the task succeed.

### How sandboxing works

Sandboxing enforces two types of isolation:

* **File system isolation** limits read and write access to configured paths. It protects sensitive locations, such as SSH keys and shell configuration, and applies to child processes such as package managers and build scripts.
* **Network isolation** blocks outbound connections or, where supported, limits them to configured domains. Domain-filtering capabilities vary by terminal implementation and platform.

Terminal and child-process restrictions use operating system protections. Other supported operations can use checks inside the process that runs the agent. The implementation and supported restrictions depend on the platform and harness. Check the [platform prerequisites](/docs/agents/run/agent-sandboxing.md#check-platform-availability) on the machine where commands run.

### What sandboxing does not cover

Agent sandboxing is an added layer for the processes it covers. It is not a virtual machine or user-account boundary, a standalone security boundary, or a replacement for endpoint security. The sandbox does not protect credentials that you explicitly inject. Developer-tool configuration and caches, allowed paths, unrestricted or local network access, unsandboxed fallback, and bypass also weaken its isolation.

Built-in and other non-process tools are not covered by the process sandbox. The agent's read, edit, and write tools use {% data variables.product.prodname_vscode_shortname %}'s permission system directly.

Use the [review flow](/docs/agents/run/review-code-edits.md) and [sensitive file protection](/docs/agents/run/review-code-edits.md#require-approval-before-sensitive-edits) to control these operations.

Other forms of isolation serve different purposes:

* A [Git worktree](/docs/agents/concepts/agent-harnesses.md#relate-execution-environments-and-code-isolation) separates code changes. It doesn't restrict commands, network access, or access to other files.
* A [Dev Container](/docs/agents/run/agents-window.md#run-a-session-in-a-dev-container) provides a containerized development environment. Its access to the host and network depends on mounts, permissions, and networking configuration.

Neither replaces the applicable permission controls or your review of the result.

## Related resources

* [AI security considerations](/docs/agents/run/security.md)
* [Terminal sandbox configuration](/docs/agents/run/agent-sandboxing.md)
* [Reviewing code edits](/docs/agents/run/review-code-edits.md)
