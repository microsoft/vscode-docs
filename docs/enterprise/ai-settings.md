---
ContentId: f8a9c3d2-4e7b-5f1a-b6c8-9d0e2f3a7b4c
DateApproved: 02/04/2026
MetaDescription: Learn how to centrally manage AI settings in VS Code for enterprise environments, including agent mode, MCP servers, and tool approvals.
---

# Manage AI settings in enterprise environments

VS Code provides AI-powered development capabilities through GitHub Copilot, including agent mode, MCP servers, and chat tools. Organizations can centrally manage these features to control AI behavior, enforce security policies, and maintain compliance across their development teams.

This article covers the AI-related settings that IT admins can manage through [enterprise policies](/docs/enterprise/policies.md).

Users can control the functionality and behavior of AI features through VS Code settings. Organizations can enforce specific configurations by deploying enterprise policies via device management solutions. These policies override user-configured settings on managed devices.

Learn how to [deploy policies for VS Code](/docs/enterprise/policies.md) to your organization's devices.

## Enable or disable the use of agents

[Agents](/docs/copilot/agents/overview.md) enable the AI to autonomously perform tasks like editing files, running terminal commands, and using tools. Agents enable developers to provide a high-level requirement and have the AI assistant analyze, plan, and execute the necessary steps to achieve that goal.

To disable agents entirely, set the `ChatAgentMode` policy to `false`. This configures the `setting(chat.agent.enabled)` setting in VS Code.

The **Agent** option will not be available in the agents dropdown in the Chat view when this policy is applied. Developers can still use [ask or edit](/docs/copilot/chat/copilot-chat.md) for code explanations and file edits, but autonomous code generation and task execution are not available.

## Enable or disable hooks

[Hooks](/docs/copilot/customization/hooks.md) enable you to execute custom shell commands at key lifecycle points during agent sessions, such as before or after tool invocations, at session start, or when an agent stops. Hooks can automate workflows, enforce security policies, and control agent behavior.

To disable hooks entirely, set the `ChatHooks` policy to `false`. This configures the `setting(chat.useHooks)` setting in VS Code.

When this policy is applied, hook configurations are ignored and no hook commands are executed during agent sessions.

## Enable or disable extension language tools

[Tools in chat](/docs/copilot/agents/agent-tools.md) extend the AI assistant's capabilities with specialized functions. These tools can come from built-in features, Model Context Protocol (MCP) servers, or third-party extensions.

Third-party extensions can contribute tools that integrate with chat by using the [Language Model Tools API](/api/extension-guides/ai/tools).

To prevent developers from using extension-contributed tools while still allowing built-in tools and MCP tools, set the `ChatAgentExtensionTools` policy to `false`. This configures the `setting(chat.extensionTools.enabled)` setting in VS Code.

## Configure MCP server access

[Model Context Protocol (MCP) servers](/docs/copilot/customization/mcp-servers.md) extend chat with external tools and services. Organizations can control which MCP servers developers can use through both GitHub organization settings and VS Code policies.

### Restrict MCP server sources

The `ChatMCP` policy controls which sources MCP servers can be installed from. This configures the `setting(chat.mcp.access)` setting in VS Code.

The following values are supported:

| Value          | Description                                                      |
|----------------|------------------------------------------------------------------|
| `allowed`      | Developers can run MCP servers from any source                   |
| `registryOnly` | Developers can only run MCP servers from the configured registry |
| `off`          | MCP server support is disabled                                   |

### Configure a custom MCP registry

You can host a private MCP server registry for your organization and configure VS Code to use it through the `McpGalleryServiceUrl` policy. This enables you to:

* Provide a curated list of approved MCP servers
* Host internal MCP servers for your organization
* Block access to the public GitHub MCP registry

When configured, developers see MCP servers from your custom registry in the Extensions view when they enter `@mcp` in the search field.

Organizations with GitHub Copilot Enterprise or Business can also configure MCP server access through [GitHub organization settings](https://docs.github.com/en/copilot/how-tos/administer-copilot/configure-mcp-server-access).

## Configure agent tool approvals

Agent tools can perform actions that modify files, run commands, or access external services. VS Code includes approval prompts for potentially risky operations. Organizations can enforce stricter approval requirements or disable auto-approval entirely.

Learn more about [tool approval](/docs/copilot/agents/agent-tools.md#tool-approval) in VS Code.

### Disable global auto-approval

The `ChatToolsAutoApprove` policy controls the global auto-approval setting, also known as "YOLO mode". When enabled, the AI assistant can execute all tools without manual approval. This is not recommended for security reasons.

To prevent developers from enabling global auto-approval, set the `ChatToolsAutoApprove` policy to `false`. This configures the `setting(chat.tools.global.autoApprove)` setting in VS Code.

> [!CAUTION]
> Global auto-approval bypasses all security prompts for tool invocations. Disabling this feature is strongly recommended for enterprise environments.

### Require manual approval for specific tools

The `ChatToolsEligibleForAutoApproval` policy controls which tools can be auto-approved. Tools set to `false` always require manual approval and cannot be auto-approved by users.

Configure this policy with a JSON object that lists tool names and their approval eligibility. This configures the `setting(chat.tools.eligibleForAutoApproval)` setting in VS Code.

The following JSON snippet shows an example configuration that requires manual approval for task execution, URL fetching, and terminal commands:

```json
{
    "runTask": false,
    "fetch": false,
    "runInTerminal": false
}
```

### Configure terminal auto-approval

The `ChatToolsTerminalEnableAutoApprove` policy specifically controls the rule-based auto-approval system for terminal commands. When enabled, VS Code applies a set of rules to automatically approve safe commands while prompting for potentially dangerous ones.

To disable terminal auto-approval entirely, set the policy to `false`. This configures the `setting(chat.tools.terminal.enableAutoApprove)` setting in VS Code.

## Configure Copilot code review

Copilot code review enables AI-powered review of code changes. Organizations can control access to these features.

The `CopilotReviewSelection` policy controls whether developers can request code review for selected code in the editor. This configures the `setting(github.copilot.chat.reviewSelection.enabled)` setting in VS Code.

The `CopilotReviewAgent` policy controls access to the Copilot code review agent for reviewing pull requests and changed files. This configures the `setting(github.copilot.chat.reviewAgent.enabled)` setting in VS Code.

## Configure organization-level AI customizations

GitHub Copilot supports defining custom instructions and custom agents at the GitHub organization level. These customizations are automatically available to all organization members when they work in VS Code on repositories owned by the organization.

### Organization-level custom instructions

Organization administrators can define custom instructions that apply to all repositories in their organization. These instructions ensure consistent AI behavior across teams, such as enforcing coding standards, security guidelines, or documentation requirements.

When developers have `setting(github.copilot.chat.organizationInstructions.enabled)` set to `true`, VS Code automatically detects and applies organization-level instructions to all chat requests. The instructions appear in the **Chat Instructions** menu alongside personal and workspace instructions.

Learn how to [add custom instructions for your organization](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-organization-instructions) in the GitHub documentation.

### Organization-level custom agents

Organizations can also define custom agents that are shared across all repositories. These agents provide specialized AI personas with specific tools and instructions tailored to your organization's workflows.

When developers have `setting(github.copilot.chat.customAgents.showOrganizationAndEnterpriseAgents)` set to `true`, organization-level agents appear in the Agents dropdown alongside built-in and personal agents.

Learn how to [create custom agents for your organization](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents) in the GitHub documentation.

> [!NOTE]
> Organization-level customizations are managed through GitHub organization settings, not VS Code enterprise policies. Individual developers control whether to use these customizations through their VS Code settings.

## Security considerations

AI-powered development features can autonomously perform actions with user-level permissions. Refer to the [security documentation](/docs/copilot/security.md) for a comprehensive overview of AI security considerations and best practices.

## Related resources

* [Enterprise policies reference](/docs/enterprise/policies.md) - Complete list of enterprise policies
* [Use tools in chat](/docs/copilot/agents/agent-tools.md) - Learn how tools work in VS Code chat
* [MCP servers in VS Code](/docs/copilot/customization/mcp-servers.md) - Configure and use MCP servers
* [Custom instructions](/docs/copilot/customization/custom-instructions.md) - Define custom instructions for AI responses
* [Custom agents](/docs/copilot/customization/custom-agents.md) - Create custom AI personas and workflows
* [AI security considerations](/docs/copilot/security.md) - Security best practices for AI features
