---
ContentId: f8a9c3d2-4e7b-5f1a-b6c8-9d0e2f3a7b4c
DateApproved: 7/1/2026
MetaDescription: Learn how to centrally manage AI settings in VS Code for enterprise environments, including agent mode, MCP servers, and tool approvals.
---

# Manage AI settings in enterprise environments

VS Code provides AI-powered development capabilities through GitHub Copilot, including agent mode, MCP servers, and chat tools. Organizations can centrally manage these features to control AI behavior, enforce security policies, and maintain compliance across their development teams.

This article covers the AI-related settings that IT admins can manage through [enterprise policies](/docs/enterprise/policies.md).

Users can control the functionality and behavior of AI features through VS Code settings. Organizations can enforce specific configurations by deploying enterprise policies via device management solutions. These policies override user-configured settings on managed devices.

Learn how to [deploy policies for VS Code](/docs/enterprise/policies.md) to your organization's devices.

## Deploy Copilot managed settings

Copilot managed settings are a centrally-managed governance layer that applies the same configuration across VS Code and GitHub Copilot CLI. When you set a managed setting, it maps to a VS Code enterprise policy and overrides the corresponding user setting on managed devices.

Managed settings differ from the [VS Code enterprise policies](/docs/enterprise/policies.md) that you deploy with ADMX templates or configuration profiles. Managed settings use Copilot-specific delivery channels and a Copilot-specific configuration shape, so a single definition governs both VS Code and Copilot CLI.

VS Code reads managed settings from three delivery channels. Choose the channel that fits how you manage devices:

* **Native MDM** - deliver settings through the Windows Registry or macOS managed preferences with an MDM solution such as Microsoft Intune.
* **Server-managed** - resolve settings from the developer's signed-in GitHub account, configured by your GitHub enterprise or organization admin.
* **File-based** - place a `managed-settings.json` file on disk, for use with configuration-management tools such as Chef, Puppet, or Ansible.

All three channels use the same managed setting keys and values. For the list of available keys and the VS Code settings they map to, see [Available managed settings](#available-managed-settings).

### Precedence across channels

When the same setting is available from more than one channel, VS Code uses a single authoritative channel rather than merging the channels. The channel with the highest precedence that provides any managed settings wins outright, and the other channels are ignored.

The precedence order is:

1. Native MDM
1. Server-managed
1. File-based

For example, if native MDM delivers any managed settings, VS Code uses the native MDM channel and ignores the server-managed and file-based channels entirely.

### Deliver managed settings through native MDM

On Windows and macOS, VS Code reads Copilot managed settings from OS-level managed preferences. Deliver them through your MDM solution, the same way you deliver other device policies.

| Operating system | Location |
|------------------|----------|
| Windows | Registry key `HKEY_LOCAL_MACHINE\SOFTWARE\Policies\GitHubCopilot` |
| macOS | Managed preferences for the `com.github.copilot` preference domain |

> [!IMPORTANT]
> These keys are specific to Copilot managed settings and are separate from the VS Code enterprise policy keys under `Software\Policies\Microsoft\VSCode`. Native MDM delivery of Copilot managed settings is available on Windows and macOS only. On Linux, use the file-based channel.

Scalar settings use their dot-separated key directly (for example, `permissions.disableBypassPermissionsMode`). Structured settings (for example, `enabledPlugins`) are provided as a JSON string value.

### Deliver managed settings from a file

VS Code can read Copilot managed settings from a `managed-settings.json` file on disk. Use this option when your organization manages devices with configuration-management tools, such as Chef, Puppet, or Ansible, and does not use Mobile Device Management (MDM).

Place `managed-settings.json` in the well-known location for each operating system:

| Operating system | Path |
|------------------|------|
| macOS | `/Library/Application Support/GitHubCopilot/managed-settings.json` |
| Windows | `%ProgramFiles%\GitHubCopilot\managed-settings.json` |
| Linux | `/etc/github-copilot/managed-settings.json` |

The file uses the Copilot managed settings shape. The following example disables bypass permissions mode:

```json
{
    "permissions": {
        "disableBypassPermissionsMode": "disable"
    }
}
```

### Deliver managed settings from the server

When developers sign in with a GitHub account, VS Code resolves managed settings that your GitHub enterprise or organization admin configures in `copilot/managed-settings.json`. Because these settings travel with the account, they apply across the developer's devices without local device management.

Server-managed settings are configured on the GitHub side. For more information, see [Manage Copilot for your enterprise](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise) in the GitHub documentation.

### Available managed settings

The following managed settings are available. Each key maps to a VS Code policy and the setting it controls. For full details on each policy's accepted values and behavior, see the [enterprise policy reference](/docs/enterprise/policies.md#vs-code-enterprise-policy-reference).

| Managed setting key | VS Code policy | Setting | Description |
|---------------------|----------------|---------|-------------|
| `permissions.disableBypassPermissionsMode` | `ChatToolsAutoApprove` | `setting(chat.tools.global.autoApprove)` | Set to `disable` to turn off global auto-approval ("YOLO mode") and hide the bypass and Autopilot options. |
| `model` | `ChatDefaultModel` | `setting(chat.defaultModel)` | Default chat model for new conversations. See [Set a default chat model](#set-a-default-chat-model). |
| `enabledPlugins` | `ChatEnabledPlugins` | `setting(chat.plugins.enabledPlugins)` | Allowlist of plugin IDs, with each plugin explicitly enabled or disabled. |
| `extraKnownMarketplaces` | `ChatExtraMarketplaces` | `setting(chat.plugins.extraMarketplaces)` | Additional plugin marketplaces to make available. |
| `strictKnownMarketplaces` | `ChatStrictMarketplaces` | `setting(chat.plugins.strictMarketplaces)` | Trust only the marketplaces supplied through managed settings. |
| `telemetry.*` | `CopilotOtel*` | `setting(chat.agentHost.otel.*)` | OpenTelemetry export configuration. See [Configure telemetry export with OpenTelemetry](#configure-telemetry-export-with-opentelemetry). |

### Verify applied managed settings

You can verify the applied values with the **Developer: Policy Diagnostics** command, which reports the policy state currently enforced on the device, including which managed settings channel is active. For more information, see [Verify policy enforcement](/docs/enterprise/policies.md#verify-policy-enforcement).

## Restrict AI features to approved GitHub organizations

Organizations can require developers to be signed in to a GitHub account that belongs to an approved organization before AI features in VS Code are activated. This enables enterprises to ensure that account-level policies set by their GitHub organization (for example, Copilot content exclusions or model availability) are in effect before chat, agents, or inline suggestions become available.

To enable this restriction, set the `ChatApprovedAccountOrganizations` policy to a JSON array of GitHub organization logins. For example, `["contoso", "contoso-research"]`. Use the wildcard value `["*"]` to allow any signed-in GitHub account.

When the policy is set, AI features are gated until both of the following are true:

* The user is signed in to a GitHub account that is a member of one of the approved organizations.
* Account-level policy data has resolved.

When the policy is not set, AI features are not restricted by this gate.

This policy is fail-closed: if the user is not signed in, is signed in with a non-GitHub account, or is signed in to a GitHub account that does not belong to an approved organization, AI features remain disabled.

IT admins can verify the gate state at any time with the **Developer: Policy Diagnostics** command, which includes an **Account Policy Gate** section. For more information, see [Verify policy enforcement](/docs/enterprise/policies.md#verify-policy-enforcement).

## Set a default chat model

Organizations can set a default model that applies to every new conversation, so developers start from an approved model without configuring it themselves.

To set the default model, set the `ChatDefaultModel` policy. This configures the `setting(chat.defaultModel)` setting in VS Code. You can also deliver it through Copilot managed settings with the `model` key.

The value accepts one of the following:

* `auto` - let Copilot pick the model.
* A model family name, such as `opus` or `gemini` - resolves to the latest available version in that family.
* A full model ID.

New conversations start at the configured model across the chat panel and the Agents window, including Copilot CLI sessions. Developers can still switch models within a conversation, and an explicit choice is never overridden by the configured default. Reopened conversations keep their own saved model. When the setting is not configured, model selection behavior is unchanged.

## Enable or disable the use of agents

[Agents](/docs/agents/overview.md) enable the AI to autonomously perform tasks like editing files, running terminal commands, and using tools. Agents enable developers to provide a high-level requirement and have the AI assistant analyze, plan, and execute the necessary steps to achieve that goal.

To disable agents entirely, set the `ChatAgentMode` policy to `false`. This configures the `setting(chat.agent.enabled)` setting in VS Code.

The **Agent** option will not be available in the agents dropdown in the Chat view when this policy is applied. Developers can still use [ask or edit](/docs/chat/chat-overview.md) for code explanations and file edits, but autonomous code generation and task execution are not available.

## Enable or disable hooks

[Hooks](/docs/agent-customization/hooks.md) enable you to execute custom shell commands at key lifecycle points during agent sessions, such as before or after tool invocations, at session start, or when an agent stops. Hooks can automate workflows, enforce security policies, and control agent behavior.

To disable hooks entirely, set the `ChatHooks` policy to `false`. This configures the `setting(chat.useHooks)` setting in VS Code.

When this policy is applied, hook configurations are ignored and no hook commands are executed during agent sessions.

## Enable or disable extension language tools

[Tools in chat](/docs/chat/chat-tools.md) extend the AI assistant's capabilities with specialized functions. These tools can come from built-in features, Model Context Protocol (MCP) servers, or third-party extensions.

Third-party extensions can contribute tools that integrate with chat by using the [Language Model Tools API](/api/extension-guides/ai/tools).

To prevent developers from using extension-contributed tools while still allowing built-in tools and MCP tools, set the `ChatAgentExtensionTools` policy to `false`. This configures the `setting(chat.extensionTools.enabled)` setting in VS Code.

Chat agents can also use browser tools to open and interact with web pages in the Integrated Browser. To disable browser tools for chat agents, set the `BrowserChatTools` policy to `false`. This configures the `setting(workbench.browser.enableChatTools)` setting in VS Code.

To disable agent plugin integration in chat, set the `ChatPluginsEnabled` policy to `false`. This configures the `setting(chat.plugins.enabled)` setting in VS Code.

## Manage agent plugins and marketplaces

[Agent plugins](/docs/agent-customization/agent-plugins.md) are prepackaged bundles of agent customizations that developers discover and install from plugin marketplaces. Organizations can centrally control which plugins and marketplaces are available, instead of having each developer configure them locally.

VS Code reads these policies from the same Copilot managed settings that drive [enterprise plugin standards for Copilot CLI](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/configure-enterprise-plugin-standards), so a single definition applies to both clients. You can deliver them through any of the [Copilot managed settings channels](#deploy-copilot-managed-settings).

The following policies are available:

* To allowlist the plugin IDs that developers can use, set the `ChatEnabledPlugins` policy. This configures the `setting(chat.plugins.enabledPlugins)` setting in VS Code. The organization explicitly enables or disables each plugin in the list.
* To make additional plugin marketplaces available, set the `ChatExtraMarketplaces` policy. This configures the `setting(chat.plugins.extraMarketplaces)` setting in VS Code. This policy has no user-facing setting and can only be configured through policy.
* To trust only the marketplaces supplied by policy, set the `ChatStrictMarketplaces` policy to `true`. This configures the `setting(chat.plugins.strictMarketplaces)` setting in VS Code. When this policy is enabled, marketplaces that developers add through `setting(chat.plugins.marketplaces)` are not trusted.

Plugins that are blocked by policy remain visible in the Extensions view but appear disabled. Marketplaces that are managed by policy are tagged as such in the marketplace picker.

IT admins can verify the applied plugin policies with the **Developer: Policy Diagnostics** command, which includes a **Managed Settings** section. For more information, see [Verify policy enforcement](/docs/enterprise/policies.md#verify-policy-enforcement).

## Configure MCP server access

[Model Context Protocol (MCP) servers](/docs/agent-customization/mcp-servers.md) extend chat with external tools and services. Organizations can control which MCP servers developers can use through both GitHub organization settings and VS Code policies.

### Restrict MCP server sources

The `ChatMCP` policy controls which sources MCP servers can be installed from. This configures the `setting(chat.mcp.access)` setting in VS Code.

The following values are supported:

| Value      | Description                                                      |
|------------|------------------------------------------------------------------|
| `all`      | Developers can run MCP servers from any source                   |
| `registry` | Developers can only run MCP servers from the configured registry |
| `none`     | MCP server support is disabled                                   |

### Configure a custom MCP registry

You can host a private MCP server registry for your organization and configure VS Code to use it through the `McpGalleryServiceUrl` policy. This enables you to:

* Provide a curated list of approved MCP servers
* Host internal MCP servers for your organization
* Block access to the public GitHub MCP registry

When configured, developers see MCP servers from your custom registry in the Extensions view when they enter `@mcp` in the search field.

Organizations with GitHub Copilot Enterprise or Business can also configure MCP server access through [GitHub organization settings](https://docs.github.com/en/copilot/how-tos/administer-copilot/configure-mcp-server-access).

## Configure agent tool approvals

Agent tools can perform actions that modify files, run commands, or access external services. VS Code includes approval prompts for potentially risky operations. Organizations can enforce stricter approval requirements or disable auto-approval entirely.

Learn more about [tool approval](/docs/agents/approvals.md#tool-approval) in VS Code.

### Disable global auto-approval

The `ChatToolsAutoApprove` policy controls the global auto-approval setting. When enabled, the AI assistant can execute all tools without manual approval. This is not recommended for security reasons.

To prevent developers from enabling global auto-approval, set the `ChatToolsAutoApprove` policy to `false`. This configures the `setting(chat.tools.global.autoApprove)` setting in VS Code and also hides the **Bypass Approvals** and **Autopilot** options from the [permissions picker](/docs/agents/approvals.md#permission-levels) in the Chat view.

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

### Configure agent sandboxing

Organizations should recommend that developers enable [agent sandboxing](/docs/agents/concepts/trust-and-safety.md#agent-sandboxing), especially in environments where auto-approval or Autopilot mode is used. Agent sandboxing uses OS-level isolation to restrict file system and network access for agent-executed commands, which provides stronger protection than approval rules alone.

The `ChatAgentSandboxEnabled` policy controls whether agent sandboxing is enabled or disabled. This configures the `setting(chat.agent.sandbox.enabled)` setting in VS Code.

When set to `true`, agent-executed terminal commands run inside a sandbox environment with restricted permissions. When set to `false`, no sandbox is applied.

## Configure agent network filtering

Network filtering restricts which domains agent tools (fetch tool, integrated browser) can access during chat sessions. When enabled, agents can only reach domains that are explicitly allowed by the configured domain lists.

### Enable network filtering

The `ChatAgentNetworkFilter` policy enables network domain filtering for agent tools. This configures the `setting(chat.agent.networkFilter)` setting in VS Code.

When the policy is set to `true`, network access by agent tools is restricted according to the allowed and denied domain lists. When set to `false` (the default), no network filtering is applied.

When both domain lists are empty and the filter is enabled, all network access by agent tools is blocked.

### Configure allowed domains

The `ChatAgentAllowedNetworkDomains` policy controls which domains agent tools are permitted to access. This configures the `setting(chat.agent.allowedNetworkDomains)` setting in VS Code.

Provide a list of domain patterns. Wildcards are supported, for example `*.example.com`. When [agent sandboxing](/docs/agents/concepts/trust-and-safety.md#agent-sandboxing) is also enabled, these domain rules additionally apply to terminal commands executed by the agent.

### Configure denied domains

The `ChatAgentDeniedNetworkDomains` policy controls which domains agent tools are blocked from accessing. This configures the `setting(chat.agent.deniedNetworkDomains)` setting in VS Code.

Denied domains always take precedence over allowed domains. Wildcards are supported, for example `*.example.com`.

## Configure Copilot code review

Copilot code review enables AI-powered review of code changes. Organizations can control access to these features.

The `CopilotReviewSelection` policy controls whether developers can request code review for selected code in the editor. This configures the `setting(github.copilot.chat.reviewSelection.enabled)` setting in VS Code.

The `CopilotReviewAgent` policy controls access to the Copilot code review agent for reviewing pull requests and changed files. This configures the `setting(github.copilot.chat.reviewAgent.enabled)` setting in VS Code.

## Configure next edit suggestions

Next edit suggestions (NES) propose a next edit based on recent changes, helping developers apply repetitive or related modifications more quickly.

To disable next edit suggestions, set the `CopilotNextEditSuggestions` policy to `false`. This configures the `setting(github.copilot.nextEditSuggestions.enabled)` setting in VS Code.

## Enable or disable Claude Agent

Claude Agent sessions let developers start and resume agentic coding sessions powered by Anthropic's Claude Agent SDK directly in the editor, using their existing Copilot subscription.

To disable Claude Agent sessions, set the `Claude3PIntegration` policy to `false`. This configures the `setting(github.copilot.chat.claudeAgent.enabled)` setting in VS Code.

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

## Configure telemetry export with OpenTelemetry

Organizations can mandate where Copilot sends [OpenTelemetry](https://opentelemetry.io/) (OTel) data, so that telemetry flows to an approved collector without each developer setting `OTEL_*` environment variables. Managed telemetry configuration applies to both the Copilot Chat extension and the agent host process.

Deliver these settings through the `telemetry` block in [Copilot managed settings](#deploy-copilot-managed-settings). Each field maps to a VS Code policy and a `chat.agentHost.otel.*` setting:

| Managed setting key | Setting | Description |
|---------------------|---------|-------------|
| `telemetry.enabled` | `setting(chat.agentHost.otel.enabled)` | Enable or disable Copilot OpenTelemetry export. When managed, users cannot override the value. |
| `telemetry.endpoint` | `setting(chat.agentHost.otel.otlpEndpoint)` | OTLP collector endpoint that receives the telemetry. |
| `telemetry.protocol` | `setting(chat.agentHost.otel.exporterType)` | OTLP transport, such as `otlp-http` or `otlp-grpc`. The managed wire protocol (protobuf or JSON) is applied to both surfaces. |
| `telemetry.captureContent` | `setting(chat.agentHost.otel.captureContent)` | Whether export captures prompt, response, and tool content. |
| `telemetry.lockCaptureContent` | — | Prevents developers from overriding the managed `captureContent` value. |
| `telemetry.serviceName` | `setting(chat.agentHost.otel.serviceName)` | The OTel `service.name` resource attribute. |
| `telemetry.resourceAttributes` | `setting(chat.agentHost.otel.resourceAttributes)` | Additional OTel resource attributes, provided as a JSON object. |
| `telemetry.headers` | `setting(chat.agentHost.otel.headers)` | OTLP exporter headers, such as an authentication token, provided as a JSON object. |

For each field, the resolved value is determined by the precedence order: policy, then environment variable, then user setting, then default. A managed value always wins.

> [!NOTE]
> Managed `telemetry.headers` are applied only to the Copilot Chat extension's OTLP exporter and are never passed through environment variables, so that a header value such as an authentication token can't leak into the tool subprocesses that the agent host spawns. As a result, managed headers are not delivered to the agent host process in this release.

The agent host computes its telemetry configuration when it starts. If a managed telemetry value changes after the agent host has started, reload VS Code to apply it.

## Security considerations

AI-powered development features can autonomously perform actions with user-level permissions. Refer to the [security documentation](/docs/agents/security.md) for a comprehensive overview of AI security considerations and best practices.

For environments where agents operate with elevated autonomy (auto-approval or Autopilot mode), recommend that developers enable [agent sandboxing](/docs/agents/concepts/trust-and-safety.md#agent-sandboxing) or work inside a [dev container](/docs/devcontainers/containers.md) to limit the impact of unintended or malicious actions.

### Agent deployment options and data residency

Agents can run on different infrastructure depending on the agent type, and each option has different data residency and access control characteristics:

* **Local agents and Copilot CLI** run on the developer's machine and process data locally.
* **Cloud agents** run on GitHub's infrastructure. Code and conversation data are subject to the GitHub Copilot data handling policies.

For GitHub Copilot's security, privacy, compliance, and transparency information, see the [GitHub Copilot Trust Center FAQ](https://copilot.github.trust.page/faq).

## Related resources

* [Enterprise policies reference](/docs/enterprise/policies.md) - Complete list of enterprise policies
* [Use tools in chat](/docs/chat/chat-tools.md) - Learn how tools work in VS Code chat
* [MCP servers in VS Code](/docs/agent-customization/mcp-servers.md) - Configure and use MCP servers
* [Custom instructions](/docs/agent-customization/custom-instructions.md) - Define custom instructions for AI responses
* [Custom agents](/docs/agent-customization/custom-agents.md) - Create custom AI personas and workflows
* [AI security considerations](/docs/agents/security.md) - Security best practices for AI features
* [GitHub Copilot Trust Center FAQ](https://copilot.github.trust.page/faq) - Security, privacy, and compliance information
