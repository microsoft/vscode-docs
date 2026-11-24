---
ContentId: c99a8442-e202-4427-b7c3-695469a00f92
DateApproved: 11/25/2026
MetaDescription: Choose controls for AI agent access, protect sensitive information, and review changes in {% data variables.product.prodname_vscode_shortname %}.
Keywords:
- security
- trust
- privacy
- agent
- MCP
- prompt injection
- enterprise
- sandbox
---
# Secure development with AI in {% data variables.product.prodname_vscode_shortname %}

Agents can change files, run programs, and act on external services using the access available to their session. Before starting a task, choose the capabilities and access it needs. During the task, review consequential actions. Before integrating the result, check the actual changes and validation.

This guide provides a practical baseline and steps for responding to unexpected behavior. Controls differ by [agent harness](/docs/agents/run/agent-harnesses.md) and execution environment. Don't assume that a setting for one harness protects another, or that completing a checklist eliminates the risk of mistakes or [prompt injection](/docs/agents/concepts/trust-and-safety.md#ai-limitations-to-watch-for).

## Recommended security baseline

1. **Review a project before trusting it.** Open unfamiliar projects in [Restricted Mode](/docs/editing/workspaces/workspace-trust.md). Check executable configuration, including tasks, hooks, and MCP server commands, before granting Workspace Trust. Workspace MCP configurations can start without a separate trust prompt after you trust the project.

1. **Confirm the session's workspace and execution environment.** Check the folder or worktree, harness, and whether commands run on your machine, a [remote host](#remote-connections-and-github-environments), or in the [cloud](#cloud-sessions). Access and credentials apply where the tools run.

1. **Choose an appropriate permission level.** In {% data variables.product.prodname_copilot_short %} sessions, **Manual permissions** lets you review actions that aren't already approved. Prefer one-time approval when unsure. Save an approval only when you intend to permit matching future calls. See [permission levels and approval scopes](/docs/agents/run/approvals.md).

1. **Restrict command access and verify it.** Where supported, turn on [sandboxing](/docs/agents/run/agent-sandboxing.md) and configure file and network access. Outbound network access is allowed by default in the {% data variables.product.prodname_copilot_short %} sandbox. Run `/sandbox policy` in a {% data variables.product.prodname_copilot_short %} session to check the effective restrictions.

1. **Limit tools and credentials to the task.** Review [tool sources](/docs/agents/run/tools.md#add-tools) before installing or connecting them. Use credentials with only the required service permissions, and don't place secrets in prompts or shared configuration.

1. **Review changes before integrating them.** Inspect the resulting files and tests before committing, merging, or creating a pull request. Include changes made through terminal commands and external tools, not just those listed by an edit tool. See [review agent changes](/docs/agents/run/review-code-edits.md).

## Limit access for the task

Choose a control based on what you want to limit:

| Your goal | Control to use | Important limit |
|---|---|---|
| Review actions before they run. | [Permission levels and tool approvals](/docs/agents/run/approvals.md). | **Manual permissions** doesn't prompt for every action. Runtime decisions, rules, and saved approvals can permit calls automatically. |
| Stop offering an optional capability. | [Tool availability](/docs/agents/run/tools.md#manage-available-tools) or the [MCP server controls](/docs/agents/run/manage-mcp-servers.md#control-or-remove-a-server). | Not every built-in tool can be deselected. A tool selection is different from approving its actions. |
| Restrict command access to files or networks. | [Agent sandboxing](/docs/agents/run/agent-sandboxing.md#understand-the-sandbox-boundary). | It covers supported processes, not every tool. Developer-tool directories and credentials can add access beyond the workspace. |
| Ask before supported edits to sensitive files. | [Sensitive-edit approval](/docs/agents/run/review-code-edits.md#require-approval-before-sensitive-edits). | It isn't a file-read restriction or a guarantee against changes from commands and other tools. Auto-approval modes can bypass these checks. |
| Keep concurrent code changes separate. | [Separate worktrees](/docs/agents/run/worktrees.md#choose-folder-or-worktree-isolation). | A worktree separates working files, not access to the machine or external services. |

If a sandboxed command is blocked, review the path or destination it needs. Prefer [narrow additional access](/docs/agents/run/agent-sandboxing.md#control-approval-and-fallback-behavior) over running the command outside the sandbox. Approval to run a command doesn't expand its sandbox access.

### Review executable customizations

Extensions, plugins, MCP servers, skills, and [hooks](/docs/agent-customization/hooks.md) can include code that runs in your environment. Review the publisher, source, requested access, and configured commands before using them. Trusting a publisher or connecting a server doesn't establish that every tool result is safe.

Workspace `.vscode/mcp.json` and `.mcp.json` configurations inherit Workspace Trust. Review them before trusting the repository, including changes made by others. For servers from other sources, review any separate [MCP trust prompt](/docs/agents/run/manage-mcp-servers.md#mcp-server-trust).

A hook can inspect an action or record events, but its coverage and failure behavior matter. Don't treat a custom hook as a universal permission check or a complete audit trail. Use [the supported hook contract](/docs/agent-customization/hooks.md#decisions-and-failures) and test the behavior you depend on. Instructions guide the model; they aren't an enforcement boundary.

## Protect credentials and external services

Before sharing project information, check your organization's requirements for the model provider and connected services. Working on local files doesn't mean model processing stays on your computer. See [where information goes](/docs/agents/concepts/trust-and-safety.md#where-information-goes) for the distinction between model requests, tool calls, and stored history.

Use the authentication method supported by each integration. For MCP servers, follow the [authentication and secrets guidance](/docs/agents/reference/mcp-configuration.md#authentication-and-secrets). Don't commit tokens or populated authentication headers, and don't assume a personal configuration file is a secret store.

Before approving an external action, check both **the destination** and **what the action will do**. Access to an allowed service can permit writes, deployments, or other changes, not just reading data. Review which credentials a sandboxed process can use, including [Git and GitHub CLI credentials](/docs/agents/run/agent-sandboxing.md#control-git-credentials) and [developer-tool configuration](/docs/agents/run/agent-sandboxing.md#limit-developer-tool-access).

For {% data variables.product.prodname_copilot_short %}'s built-in web fetch, URL approval permits contacting the destination. It doesn't provide a separate prompt to review the response before the model uses it. Treat returned content as data, not authorization for unrelated actions. The deprecated Local harness has [separate request and response controls](/docs/agents/run/approvals.md#local-url-approvals).

Supported shell-authentication prompts in {% data variables.product.prodname_copilot_short %} sessions use masked input for passwords and passphrases (Experimental). The answer goes to the requesting program, not to the model or chat history. This protection applies only to the dedicated authentication prompt. Review the requesting command and destination, and don't paste secrets into ordinary chat or command text.

For [{% data variables.copilot.computer_use %}](/docs/agents/run/tools.md#control-desktop-applications) `feature(computer-use)`, review application-access requests and avoid exposing sensitive information in other windows. Desktop tools can act outside your workspace. See the [provider's limitations and risks](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/computer-use#limitations-and-risks).

## Approvals and review

Review the actual tool inputs, not only the agent's explanation. Check commands, paths, URLs, accounts, and proposed changes against the task you requested. If an action is wrong, decline it and tell the agent what to change.

Keep saved approvals narrow. **In this Session** can remain effective when you resume that session; closing the window doesn't withdraw it. Use [approval management](/docs/agents/run/approvals.md#manage-tool-approvals) to inspect supported saved decisions, and check the documented limits for remote approvals.

In {% data variables.product.prodname_copilot_short %} sessions, **Autopilot** controls continued work, not the permission level. **Assisted permissions** uses model-based review that can make mistakes. **Allow all** and global auto-approval skip ordinary confirmation prompts. Choose these controls deliberately rather than treating fewer prompts as evidence that actions are safe. See [approval behavior by harness](/docs/agents/run/approvals.md#how-approvals-work).

Approving an edit and accepting its result are separate decisions. Edits can already be saved when you review them. Before integrating:

* Inspect changed and untracked files. The working set doesn't track every change made through commands, scripts, or external tools.
* Check the actual test and validation output. An agent's statement that the task is complete isn't proof that it meets the requirements.
* Review effects outside the repository, such as a deployment, created resource, or changed service configuration.

Use [the review workflow](/docs/agents/run/review-code-edits.md) for file changes. Use the affected service's controls to inspect or undo external actions.

## Remote and unattended work

Remote execution changes where actions happen. It doesn't remove the need to review access, credentials, and results.

### Remote connections and {% data variables.copilot.github_environments %}

[{% data variables.copilot.github_environments %}](/docs/agents/run/remote-agent-sessions.md#github-environments) `feature(github-environments)` let supported clients connect to sessions on a development machine. Those clients receive trusted-owner access to sessions, tools, and workspace resources, not just one conversation. Only connect from clients and devices you trust, and protect the account used to register the host.

Session actions are mirrored to {% data variables.product.prodname_github %} for catalog and history storage, and conversation content is not end-to-end encrypted. Review the sharing disclosure and your organization's data-handling requirements before registering a host.

For SSH or dev tunnels, protect the credentials and require tunnel authentication. Don't expose an agent host through anonymous access.

Disconnecting a client doesn't stop host tasks. To stop sharing, select **Remote Connections** > **Off** on the host. To halt active work, stop the task in its session. Neither action undoes completed effects. See [disconnect or stop sharing](/docs/agents/run/remote-agent-sessions.md#disconnect-or-stop-sharing).

### Cloud sessions

[Cloud sessions](/docs/agents/run/cloud-sandbox-sessions.md) `feature(cloud-sessions)` run tools in a managed environment. Check the repository, session permissions, credentials, and data-handling requirements before sending code or task context. Local editor state, extension tools, and uncommitted changes aren't automatically transferred.

Don't assume local sandbox or approval settings configure the cloud service. Review the cloud session's actual controls, changes, and test results. Cloud execution separates work from your local machine, but can still affect services the session can access.

Closing the client or marking a task done isn't a cloud-resource shutdown action. Deleting a task also shouldn't be treated as confirmation that its compute was deleted. Follow [cloud session lifecycle guidance](/docs/agents/run/cloud-sandbox-sessions.md#review-work-and-finish-a-session).

### Unattended cloud automations

Before enabling a [cloud automation](/docs/agents/run/automations.md#create-an-automation) `feature(cloud-automations)`, test its prompt with a manual run. Restrict its allowed tools and event filters, and use **Require write access to trigger** where appropriate. Local approval and sandbox settings don't configure the cloud service.

Keep secrets out of automation prompts. An **Only me** definition can be private while its run sessions and logs remain visible to people with repository access. Check [cloud automation security and usage](/docs/agents/run/automations.md#cloud-automation-security-and-usage).

Closing the application doesn't disable triggers. Disable the automation to prevent future runs, and use **Stop** separately to request cancellation of an active run. Neither action reverses completed changes.

## Respond to unexpected behavior

If the agent attempts unrelated work, uses an unexpected destination, or makes changes you didn't intend:

1. **Stop the active request.** Check whether background commands, other sessions, or scheduled automations are still running. Closing a chat or disconnecting from a host isn't a substitute for stopping work.
1. **Inspect what happened.** Review tool inputs and outputs, changed and untracked files, and any actions on external services. Distinguish a proposed action from one that already completed.
1. **Review access before continuing.** Check saved approvals, enabled tools, connected accounts, and sandbox exceptions. If an action was driven by untrusted content, don't approve follow-up requests solely because that content asks for them.
1. **Recover at the appropriate scope.** Use [file and checkpoint recovery](/docs/agents/run/review-code-edits.md#undo-changes-at-the-right-scope) for supported workspace changes. Use the external service's recovery controls for deployments or other remote effects.
1. **Follow your incident process if information might have been exposed.** Contact your organization's security team when required, and revoke or rotate exposed credentials through the affected service. Resetting approval preferences doesn't revoke credentials.

Stopping a request doesn't undo completed commands or network requests. Inspect the result before restarting the task.

## Enterprise policies

Your organization can restrict available harnesses, permission levels, tools, and network access. If a control is locked or required access is denied, contact the administrator rather than trying another harness to avoid the restriction.

Policy behavior differs by harness. For example, a policy that marks a tool ineligible for automatic approval doesn't necessarily require a person to confirm each call in a {% data variables.product.prodname_copilot_short %} session. Check [harness-specific policy behavior](/docs/enterprise/manage-ai-settings.md#limit-automatic-approval-for-specific-tools).

{% data variables.product.prodname_anthropic_claude_short %} and {% data variables.product.prodname_openai_codex_short %} can't enforce {% data variables.product.prodname_copilot_short %}'s enterprise-managed controls. They are disabled when those controls apply unless an administrator permits them. An exception doesn't make them enforce the same restrictions. See [Claude and Codex availability](/docs/enterprise/manage-ai-settings.md#claude-and-codex-availability).

Administrators should follow [Manage AI settings in enterprise environments](/docs/enterprise/manage-ai-settings.md) for configuration, deployment, and verification.

## Related resources

* [Understand trust and safety for AI agents](/docs/agents/concepts/trust-and-safety.md)
* [GitHub Copilot Trust Center](https://resources.github.com/copilot-trust-center/)
