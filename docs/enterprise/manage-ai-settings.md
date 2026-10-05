---
ContentId: f8a9c3d2-4e7b-5f1a-b6c8-9d0e2f3a7b4c
DateApproved: 10/7/2026
MetaDescription: Manage enterprise AI controls that affect {% data variables.product.prodname_vscode_shortname %} and {% data variables.product.prodname_copilot_short %}.
---

# Manage AI settings in enterprise environments

{% data variables.product.prodname_vscode_shortname %} provides AI-powered development capabilities through {% data variables.product.prodname_copilot_short %}, including agents, MCP servers, chat tools, and code suggestions. Organizations can use {% data variables.product.prodname_vscode_shortname %} device policies and {% data variables.product.prodname_copilot_short %} enterprise-managed settings to govern these capabilities.

This article focuses on controls that directly affect {% data variables.product.prodname_vscode_shortname %}. For the setup, configuration format, and complete reference for {% data variables.product.prodname_copilot_short %} enterprise-managed settings, use the GitHub documentation.

> [!NOTE]
> If you're a developer and an agent, model, or tool is unavailable, first check the [AI troubleshooting guidance](/docs/agents/agent-troubleshooting/troubleshooting.md#start-with-basic-checks). For an organization-managed restriction, ask your administrator which capabilities are approved. Include the affected feature, the message you see, and the development task it prevents.

## Choose how to manage AI settings

Use the management system that owns the setting you need:

* **{% data variables.product.prodname_vscode_shortname %} device policies** control editor features on managed devices. Deploy these policies with ADMX templates, configuration profiles, or your device management solution. See [Deploy enterprise policies](/docs/enterprise/policies.md).

* **{% data variables.product.prodname_copilot_short %} enterprise-managed settings** govern supported clients through GitHub-owned configuration and delivery methods. See [Get started with enterprise-managed settings](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started).

Not every enterprise-managed setting applies to every supported client. Before you configure a setting for {% data variables.product.prodname_vscode_shortname %}, check the **Supported clients** column in the [{% data variables.product.prodname_copilot_short %} enterprise-managed settings reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings#supported-keys).

Some capabilities have both a {% data variables.product.prodname_vscode_shortname %} device policy and an equivalent {% data variables.product.prodname_copilot_short %} managed setting. Avoid configuring the same control through both systems. For the current precedence and combination rules, see the [{% data variables.product.prodname_copilot_short %} enterprise-managed settings reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings).

Before a broad rollout, test the proposed configuration with a representative project and account. Confirm that developers can complete approved tasks, review changes, and run the required checks while the intended restrictions remain in place. Publish the supported workflows and an access-request process alongside the configuration.

## Use {% data variables.product.prodname_copilot_short %} managed settings with {% data variables.product.prodname_vscode_shortname %}

Use GitHub to configure and administer {% data variables.product.prodname_copilot_short %} enterprise-managed settings. This includes choosing a delivery method, creating configuration files, configuring enterprise team overrides, validating settings, and troubleshooting delivery.

Use these GitHub resources:

* [Get started with enterprise-managed settings](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started) to configure and deploy settings.

* [Enterprise-managed settings reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings) for supported clients, keys, values, and combination rules.

Do not assume that a key in the shared configuration applies to {% data variables.product.prodname_vscode_shortname %}. GitHub's reference is the source of truth for client support.

### Verify applied managed settings

Run **Developer: Policy Diagnostics** in {% data variables.product.prodname_vscode_shortname %} to inspect effective policy values and their sources. For more information, see [Verify policy enforcement](/docs/enterprise/policies.md#verify-policy-enforcement).

For GitHub-side validation errors or delivery troubleshooting, follow [Get started with enterprise-managed settings](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started#validate-server-managed-settings).

## Restrict AI features to approved GitHub organizations

Organizations can require developers to sign in to a GitHub account that belongs to an approved organization before AI features in {% data variables.product.prodname_vscode_shortname %} are activated. This restriction helps ensure that account-level policies, such as {% data variables.product.prodname_copilot_short %} content exclusions or model availability, are in effect before chat, agents, or inline suggestions become available.

Set the `ChatApprovedAccountOrganizations` device policy to a JSON array of GitHub organization logins. For example, `["contoso", "contoso-research"]`. Use the wildcard value `["*"]` to allow any signed-in GitHub account.

When the policy is set, AI features are gated until both of the following conditions are true:

* The user is signed in to a GitHub account that is a member of an approved organization.
* Account-level policy data has resolved.

The policy is fail-closed. AI features remain disabled when the user is not signed in, uses a non-GitHub account, or uses an account outside the approved organizations.

Run **Developer: Policy Diagnostics** to inspect the **Account Policy Gate** state. For more information, see [Verify policy enforcement](/docs/enterprise/policies.md#verify-policy-enforcement).

## Require a minimum version for AI features

An organization can require a minimum {% data variables.product.prodname_vscode_shortname %} version before developers use AI features. This helps ensure that managed devices receive security or governance improvements without blocking unrelated editor work.

When the installed version does not meet the requirement:

* Chat shows the required and installed versions and provides the appropriate update action.
* The editor window shows a banner even when Chat is closed. Other editor features remain available.
* The {% data variables.copilot.agents_window %} shows a blocking notice with an **Open Editor Window** action.

If built-in updates are disabled by policy, the notice directs the developer to contact an administrator. AI features become available after the installed version meets the requirement.

## Set a default chat model

Set the `ChatDefaultModel` device policy to choose the default model for new conversations. This policy controls `setting(chat.defaultModel)` and accepts `auto`, a model family name, or a full model ID.

New conversations start with the configured model in the chat view and the {% data variables.copilot.agents_window %}. Developers can still select another model for a conversation, and reopened conversations keep their saved model.

To configure the same behavior through {% data variables.product.prodname_copilot_short %} enterprise-managed settings, use the [`model` setting](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings#model).

## Enable or disable the use of agents

[Agents](/docs/agents/overview.md) can edit files, run terminal commands, and use tools to complete development tasks.

Set the `ChatAgentMode` device policy to `false` to disable agents. This policy controls `setting(chat.agent.enabled)`.

When the policy is disabled, the **Agent** option is not available in the agents dropdown in the {% data variables.copilot.chat_view %}. Developers can still use [ask or edit](/docs/chat/chat-overview.md) for code explanations and file edits.

## Control dictation data

Built-in [dictation](/docs/configure/accessibility/voice.md#use-built-in-dictation) converts speech to text in chat, editors, and terminals. Organizations can use device policies to control whether dictation audio and transcripts leave the developer's device.

| Policy | Setting | Behavior |
|--------|---------|----------|
| `DictationEnabled` | `setting(dictation.enabled)` | Controls whether built-in dictation is available. |
| `DictationModel` | `setting(dictation.model)` | Selects an on-device model or the `mai` cloud transcription service. |
| `DictationLLMCleanup` | `setting(dictation.experimental.llmCleanup)` | Controls whether final transcripts are sent to a {% data variables.product.prodname_copilot_short %} language model for punctuation and formatting cleanup. |

To keep dictation audio on the device, set `DictationModel` to `nemotron-3.5-asr-streaming-0.6b`. In {% data variables.product.prodname_vscode_shortname %} for the Web, where on-device transcription is not supported, this policy makes dictation unavailable.

To prevent transcript text from being sent to a {% data variables.product.prodname_copilot_short %} model, set `DictationLLMCleanup` to `false`. For more information, see [Dictation privacy](/docs/configure/accessibility/voice.md#understand-dictation-privacy).

## Enable or disable hooks

[Hooks](/docs/agent-customization/hooks.md) run custom shell commands at key points during agent sessions.

Set the `ChatHooks` device policy to `false` to disable hooks in the **Local** harness. This policy controls `setting(chat.useHooks)`. It does not apply to {% data variables.product.prodname_copilot_short %} sessions that use Agent Host.

### Use the SDK harness for Policy Hooks

{% data variables.product.prodname_copilot_short %} Policy Hooks apply to sessions on the SDK harness, not to sessions that remain on Local. The SDK hooks implementation is generally available, while the {% data variables.product.prodname_vscode_shortname %} hooks surface remains in Preview during the transition.

Set the `ChatEditorPreferCopilotHarness` device policy to `true` to prefer the SDK harness for new editor chat sessions. This policy is available from {% data variables.product.prodname_vscode_shortname %} version 1.134 and controls `setting(chat.editor.preferCopilotHarness)` _(Experimental)_.

The preference does not migrate existing sessions or change explicit or remembered Claude and Codex selections. Check the [session target](/docs/agents/run/agent-harnesses.md#choose-a-session-target) during rollout.

### Deploy hooks through managed plugins

Use the `ChatAllowManagedHooksOnly` device policy to allow hooks only from enterprise-managed sources and plugins that policy force-enables. Use `ChatStrictPluginOnlyCustomization` when you also need to block standalone user and workspace skills, agents, instructions, and MCP servers.

For plugin enablement and marketplace configuration through {% data variables.product.prodname_copilot_short %} enterprise-managed settings, see [`enabledPlugins`](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings#enabledplugins), [`extraKnownMarketplaces`](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings#extraknownmarketplaces), and [`strictKnownMarketplaces`](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings#strictknownmarketplaces) in the GitHub reference.

Package reviewed hook scripts in an [agent plugin](/docs/agent-customization/agent-plugins.md#hooks-in-plugins), publish the plugin in an approved marketplace, and verify the applied policies with **Developer: Policy Diagnostics**. In a test session on the intended harness, confirm that approved hooks run and hooks from unapproved sources do not run.

## Enable or disable extension language tools

[Agent tools](/docs/agents/run/tools.md) can come from built-in features, MCP servers, or third-party extensions.

Use these {% data variables.product.prodname_vscode_shortname %} device policies to control extension and browser tools:

* Set `ChatAgentExtensionTools` to `false` to disable tools contributed by extensions. This policy controls `setting(chat.extensionTools.enabled)`.
* Set `BrowserChatTools` to `false` to disable browser tools. This policy controls `setting(workbench.browser.enableChatTools)`.
* Set `ChatPluginsEnabled` to `false` to disable agent plugin integration. This policy controls `setting(chat.plugins.enabled)`.

## Manage agent plugins and marketplaces

[Agent plugins](/docs/agent-customization/agent-plugins.md) are prepackaged bundles of agent customizations that developers install from plugin marketplaces.

Use these {% data variables.product.prodname_vscode_shortname %} device policies:

* `ChatEnabledPlugins` controls `setting(chat.plugins.enabledPlugins)` and force-enables or force-disables named plugins. Omitted plugins remain under normal user control.
* `ChatExtraMarketplaces` controls `setting(chat.plugins.extraMarketplaces)` and adds plugin marketplaces.
* `ChatStrictMarketplaces` controls `setting(chat.plugins.strictMarketplaces)` and restricts plugin installation to approved marketplace sources. An empty list blocks installation from all marketplaces.

For the equivalent {% data variables.product.prodname_copilot_short %} enterprise-managed settings, use the [GitHub reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings#enabledplugins). GitHub's reference defines the configuration schema and current client support.

Plugins blocked by policy remain visible in the Extensions view but appear disabled. Marketplaces managed by policy are identified in the marketplace picker. Run **Developer: Policy Diagnostics** to verify the applied policies.

## Configure MCP server access

[Model Context Protocol (MCP) servers](/docs/agent-customization/mcp-servers.md) extend chat with external tools and services. Organizations can control MCP access with {% data variables.product.prodname_vscode_shortname %} device policies or supported {% data variables.product.prodname_copilot_short %} enterprise-managed settings.

### Restrict MCP server sources

The `ChatMCP` device policy controls `setting(chat.mcp.access)`.

| Value | Behavior |
|-------|----------|
| `all` | Developers can run MCP servers from any source. |
| `registry` | Developers can run MCP servers only from the configured registry. |
| `none` | MCP server support is disabled. |

### Configure a custom MCP registry

Use the `McpGalleryServiceUrl` device policy to configure a private MCP server registry. Developers see servers from the custom registry in the Extensions view when they enter `@mcp` in the search field.

Organizations with {% data variables.copilot.copilot_enterprise %} or Business can also [configure an enterprise MCP server allowlist in GitHub](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist).

### Allow or deny individual MCP servers

Use these {% data variables.product.prodname_vscode_shortname %} device policies:

* `ChatAllowedMcpServers` defines servers that developers can install or run.
* `ChatDeniedMcpServers` defines servers that developers cannot install or run. Deny entries take precedence over allow entries.
* `ChatAllowManagedMcpServersOnly` requires the enterprise-managed allowlist to grant access.

Match servers by configured name, remote URL, or local command invocation. For accepted policy values and version requirements, see the [{% data variables.product.prodname_vscode_shortname %} enterprise policy reference](/docs/enterprise/policies.md#vs-code-enterprise-policy-reference).

To configure `allowedMcpServers` and `deniedMcpServers` through {% data variables.product.prodname_copilot_short %} enterprise-managed settings, use the [GitHub reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings#allowedmcpservers).

## Configure agent tool approvals

Agent tools can modify files, run commands, or access external services. {% data variables.product.prodname_vscode_shortname %} prompts for approval before potentially risky operations. Organizations can require stricter approval behavior.

For {% data variables.product.prodname_copilot_short %} sessions that use Agent Host, enterprise-managed settings support `permissions.allow`, `permissions.ask`, and `permissions.deny`. These settings can allow an operation without a prompt, require fresh approval, or block the operation. Use the [GitHub permissions reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings#deny-ask-allow) for rule syntax and combination behavior.

Learn more about [tool approval](/docs/agents/run/approvals.md#tool-approval) in {% data variables.product.prodname_vscode_shortname %}.

### Disable global auto-approval

Set the `ChatToolsAutoApprove` device policy to `false` to prevent developers from enabling global auto-approval. This policy controls `setting(chat.tools.global.autoApprove)` and hides the **Assisted permissions**, **Allow all**, and **Autopilot** options.

You can enforce the same restriction with [`permissions.disableBypassPermissionsMode`](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings#disablebypasspermissionsmode).

> [!CAUTION]
> Global auto-approval bypasses security prompts for tool invocations. Disable it in enterprise environments unless your threat model explicitly supports this behavior.

### Require manual approval for specific tools

The `ChatToolsEligibleForAutoApproval` device policy controls which tools can be auto-approved. Tools set to `false` always require manual approval. This policy controls `setting(chat.tools.eligibleForAutoApproval)`.

### Configure terminal auto-approval

The `ChatToolsTerminalEnableAutoApprove` device policy controls rule-based auto-approval for terminal commands. Set the policy to `false` to require approval for terminal commands. This policy controls `setting(chat.tools.terminal.enableAutoApprove)`.

## Configure agent sandboxing

Use [agent terminal sandboxing](/docs/agents/run/agent-sandboxing.md) to restrict the files and network resources that agent-executed commands can access. Sandboxing does not restrict built-in file tools or replace approval controls for other tools.

{% data variables.product.prodname_vscode_shortname %} sandbox device policies apply to Local sessions. They do not enforce sandboxing for {% data variables.product.prodname_copilot_short %} sessions that use Agent Host.

<a id="deploy-copilot-managed-sandbox-settings"></a>

### Understand managed sandbox support

GitHub's current enterprise-managed settings reference does not list the shared `sandbox` key as supported for {% data variables.product.prodname_vscode_shortname %}. Do not use this key to require sandboxing in {% data variables.product.prodname_vscode_shortname %}.

For Agent Host sessions, use [managed permission rules](#configure-agent-tool-approvals) to control file, shell, and network operations, and ask developers to verify the effective [session sandbox policy](/docs/agents/run/agent-sandboxing.md#inspect-the-effective-sandbox-policy).

### Configure {% data variables.product.prodname_vscode_shortname %} sandbox policies

The following deprecated device policies preserve Local-session behavior:

| Policy | Local-session behavior |
|--------|------------------------|
| `ChatAgentSandboxEnabled` | Requires or disables sandboxing for supported terminal commands. |
| `ChatAgentSandboxAllowNetwork` | Controls outbound network access for sandboxed terminal commands. |
| `ChatAgentSandboxAllowUnsandboxedCommands` | Controls whether a command can run outside the sandbox after user confirmation. |
| `ChatAgentSandboxAllowAutoApprove` | Controls automatic approval of sandboxed terminal commands. |

> [!IMPORTANT]
> In Local sessions, `setting(chat.agent.sandbox.retryWithAllowNetworkRequests)` can permit an approved retry inside the sandbox with unrestricted network access. This behavior is separate from running outside the sandbox and has no enterprise policy.

## Configure agent network filtering

Network filtering restricts which domains the fetch tool and integrated browser can access during chat sessions. For terminal commands, domain filtering is available in Local sessions and the Agent Host custom terminal tool on macOS and Linux when sandbox network isolation is enabled.

The Agent Host built-in shell and the Windows terminal sandbox do not use domain allowlists or denylists. Their sandbox network control permits or blocks outbound access as a whole. See [Configure sandbox network access](/docs/agents/run/agent-sandboxing.md#configure-network-access).

### Enable network filtering

Set the `ChatAgentNetworkFilter` device policy to `true` to enable network domain filtering. This policy controls `setting(chat.agent.networkFilter)`. When the filter is enabled and both domain lists are empty, affected tools cannot access any domain.

### Configure allowed domains

The `ChatAgentAllowedNetworkDomains` device policy controls `setting(chat.agent.allowedNetworkDomains)`. Provide a list of domain patterns, such as `*.example.com`.

### Configure denied domains

The `ChatAgentDeniedNetworkDomains` device policy controls `setting(chat.agent.deniedNetworkDomains)`. Denied domains take precedence over allowed domains.

Restart {% data variables.product.prodname_vscode_shortname %} after you change network filtering settings so new Integrated Browser sessions use the updated policy.

## Configure {% data variables.product.prodname_copilot_short %} code review

Use these device policies to control {% data variables.product.prodname_copilot_short %} code review:

* `CopilotReviewSelection` controls whether developers can request a review of selected code. This policy controls `setting(github.copilot.chat.reviewSelection.enabled)`.
* `CopilotReviewAgent` controls access to the {% data variables.product.prodname_copilot_short %} code review agent for pull requests and changed files. This policy controls `setting(github.copilot.chat.reviewAgent.enabled)`.

## Configure next edit suggestions

Next edit suggestions propose edits based on recent changes. Set the `CopilotNextEditSuggestions` device policy to `false` to disable them. This policy controls `setting(github.copilot.nextEditSuggestions.enabled)`.

## Enable or disable Claude Agent

Claude Agent sessions let developers start and resume agentic coding sessions powered by Anthropic's Claude Agent SDK.

Set the `Claude3PIntegration` device policy to `false` to disable Claude Agent sessions. This policy controls `setting(github.copilot.chat.claudeAgent.enabled)`.

## Configure organization-level AI customizations

{% data variables.product.prodname_copilot_short %} supports custom instructions and custom agents that GitHub organization administrators make available to organization members.

### Organization-level custom instructions

When `setting(github.copilot.chat.organizationInstructions.enabled)` is `true`, {% data variables.product.prodname_vscode_shortname %} applies organization-level instructions to chat requests for repositories owned by the organization.

Learn how to [add custom instructions for your organization](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-organization-instructions).

### Organization-level custom agents

When `setting(github.copilot.chat.customAgents.showOrganizationAndEnterpriseAgents)` is `true`, organization-level agents appear in the agents dropdown.

Learn how to [create custom agents for your organization](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/create-custom-agents).

Organization-level customizations are managed in GitHub, not through {% data variables.product.prodname_vscode_shortname %} device policies.

## Configure telemetry export with OpenTelemetry

Organizations can configure [OpenTelemetry](https://opentelemetry.io/) export for {% data variables.product.prodname_copilot_short %} in {% data variables.product.prodname_vscode_shortname %}. The `CopilotOtel*` device policies control whether export is enabled, the collector endpoint and protocol, content and identity capture, the service name, resource attributes, and exporter headers.

For the complete list of {% data variables.product.prodname_vscode_shortname %} policies and the settings they control, see the [enterprise policy reference](/docs/enterprise/policies.md#vs-code-enterprise-policy-reference).

To configure export through {% data variables.product.prodname_copilot_short %} enterprise-managed settings, use the [`telemetry` reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings#telemetry). GitHub's reference defines the configuration fields and supported clients.

Managed telemetry applies to the {% data variables.product.prodname_copilot_short %} Chat extension and Agent Host. The extension might offer **Reload Window** after a policy change. {% data variables.product.prodname_vscode_shortname %} restarts Agent Host automatically after it resolves an enterprise-managed telemetry change.

Identity capture is off by default and independent of content capture. Review both controls before deployment, and remove conflicting OpenTelemetry environment variables from managed devices.

## Security considerations

AI-powered development features can perform actions with user-level permissions. Review [AI security considerations](/docs/agents/run/security.md) before enabling agents or auto-approval.

For {% data variables.product.prodname_copilot_short %} security, privacy, compliance, and transparency information, see the [{% data variables.product.prodname_copilot_short %} Trust Center FAQ](https://copilot.github.trust.page/faq).

## Related resources

* [{% data variables.product.prodname_vscode_shortname %} enterprise policy reference](/docs/enterprise/policies.md)
* [Get started with {% data variables.product.prodname_copilot_short %} enterprise-managed settings](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started)
* [{% data variables.product.prodname_copilot_short %} enterprise-managed settings reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings)
