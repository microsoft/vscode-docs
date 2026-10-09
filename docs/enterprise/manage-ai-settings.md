---
ContentId: f8a9c3d2-4e7b-5f1a-b6c8-9d0e2f3a7b4c
DateApproved: 10/7/2026
MetaDescription: Manage enterprise AI controls that affect {% data variables.product.prodname_vscode_shortname %} and {% data variables.product.prodname_copilot_short %}.
---

# Manage AI settings in enterprise environments

Organizations can govern AI features in {% data variables.product.prodname_vscode_shortname %} through three management solutions: {% data variables.product.prodname_copilot_short %} enterprise-managed settings, {% data variables.product.prodname_vscode_shortname %} device policies, and GitHub organization or enterprise settings.

These solutions control different layers of the AI experience. An organization might use all three, but should configure an overlapping control in only one system.

> [!NOTE]
> If you're a developer and an agent, model, or tool is unavailable, first check the [AI troubleshooting guidance](/docs/agents/agent-troubleshooting/troubleshooting.md#start-with-basic-checks). For an organization-managed restriction, ask your administrator which capabilities are approved.

## Understand the three management solutions

Before you choose a solution, understand where each one is configured and what it controls.

### {% data variables.product.prodname_copilot_short %} enterprise-managed settings

Use enterprise-managed settings for {% data variables.product.prodname_copilot_short %} guardrails that should apply across supported clients, such as {% data variables.product.prodname_vscode_shortname %} and {% data variables.copilot.copilot_cli_short %}.

Administrators define these settings with the GitHub-supported server-managed, MDM-managed, or file-based delivery methods. Even when you use an MDM solution, enterprise-managed settings use the {% data variables.product.prodname_copilot_short %} configuration format and delivery path, not the {% data variables.product.prodname_vscode_shortname %} device-policy namespace.

For server-managed deployments, administrators can override supported settings for specific enterprise teams. GitHub applies the matching values based on each person's enterprise team membership. See [Override enterprise-managed settings for teams](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/override-settings-for-teams).

Refer to the [enterprise-managed settings setup guide](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started) and [settings reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings) for supported keys, client coverage, configuration schemas, and precedence.

### {% data variables.product.prodname_vscode_shortname %} device policies

Use device policies for editor-specific controls on managed {% data variables.product.prodname_vscode_shortname %} installations.

Administrators deploy these policies through platform management tools, such as Group Policy, Microsoft Intune, or macOS configuration profiles. The policies apply to the managed device and override the corresponding user settings in {% data variables.product.prodname_vscode_shortname %}.

Refer to the [{% data variables.product.prodname_vscode_shortname %} enterprise policy reference](/docs/enterprise/policies.md) for policy names, accepted values, supported platforms, and minimum versions.

### GitHub organization and enterprise settings

Use GitHub organization and enterprise settings for account-level and service-side controls, such as {% data variables.product.prodname_copilot_short %} access, model availability, content exclusions, and organization-provided customizations.

Administrators configure these controls on GitHub. They follow the signed-in GitHub account and its organization or enterprise membership rather than the {% data variables.product.prodname_vscode_shortname %} device-policy channel.

Refer to [Manage {% data variables.product.prodname_copilot_short %} for your enterprise](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise) for configuration and reference information about these controls.

## Choose a management solution

The solutions are not mutually exclusive. Choose the solution for each control based on the scope you need.

| Requirement | Management solution | Configuration location | Scope |
|-------------|---------------------|------------------------|-------|
| Apply consistent {% data variables.product.prodname_copilot_short %} guardrails across supported clients. | {% data variables.product.prodname_copilot_short %} enterprise-managed settings | GitHub-supported server, MDM, or file delivery | Supported {% data variables.product.prodname_copilot_short %} clients and keys |
| Control a {% data variables.product.prodname_vscode_shortname %}-specific editor feature on managed devices. | {% data variables.product.prodname_vscode_shortname %} device policies | Operating system or device management | Managed {% data variables.product.prodname_vscode_shortname %} installations |
| Control {% data variables.product.prodname_copilot_short %} access or GitHub-hosted organization and enterprise behavior. | GitHub organization or enterprise settings | GitHub organization or enterprise administration | Signed-in accounts and GitHub-hosted services |

Some controls are available through more than one solution. Review the [order of precedence](#understand-precedence) before you combine them.

Before a broad rollout, test the proposed configuration with a representative project, device, and account. Confirm that developers can complete approved tasks while the intended restrictions remain in place.

## Understand precedence

### Across managed-settings delivery methods

When the same managed setting is available from multiple sources, {% data variables.product.prodname_vscode_shortname %} applies them in this order:

1. MDM-managed settings.
1. Server-managed settings.
1. File-based settings.
1. User settings.

For most keys, the value from the highest-precedence source wins. Some keys, including `permissions.deny`, `permissions.ask`, and `permissions.allow`, combine restrictions from multiple sources in the most restrictive direction. See [Precedence of deployment methods](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings#precedence-of-deployment-methods) for the complete and current rules.

### With {% data variables.product.prodname_vscode_shortname %} device policies

Some enterprise-managed settings map to a {% data variables.product.prodname_vscode_shortname %} device policy. When an administrator configures both systems:

* If the systems configure different controls, both controls apply.
* If both systems configure the same control, the enterprise-managed setting takes precedence. The values are not merged.
* If enterprise-managed settings do not provide that control, the {% data variables.product.prodname_vscode_shortname %} device policy remains in effect.

Configure an overlapping control through one management solution when possible. Run **Developer: Policy Diagnostics** to inspect the effective value and its source.

## Use {% data variables.product.prodname_copilot_short %} enterprise-managed settings

Configure and administer enterprise-managed settings by following the GitHub documentation:

* [Get started with enterprise-managed settings](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started) explains delivery, configuration files, team overrides, validation, and troubleshooting.
* [Enterprise-managed settings reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings) lists supported keys, values, combination behavior, and client coverage.

Not every enterprise-managed setting applies to every client. Before you configure a setting for {% data variables.product.prodname_vscode_shortname %}, check the **Supported clients** column in the [enterprise-managed settings reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings#supported-keys).

### Verify applied managed settings

Run **Developer: Policy Diagnostics** in {% data variables.product.prodname_vscode_shortname %} to inspect effective policy values and their sources. For more information, see [Verify policy enforcement](/docs/enterprise/policies.md#verify-policy-enforcement).

If the diagnostics show a server-managed source with an unexpected value, check `copilot/managed-settings.json`, `copilot/team-mappings.json`, the mapped file under `copilot/teams/`, and the user's enterprise team memberships. GitHub resolves team overrides before it delivers the server-managed settings to {% data variables.product.prodname_vscode_shortname %}.

For GitHub-side validation errors or delivery troubleshooting, follow [Validate server-managed settings](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started#validate-server-managed-settings).

### Meet minimum version requirements

The managed-settings service can require a minimum {% data variables.product.prodname_vscode_shortname %} version before AI features are available. When the installed version does not meet the requirement:

* Chat shows the required and installed versions and provides the appropriate update action.
* The editor window shows a banner even when Chat is closed. Other editor features remain available.
* The {% data variables.copilot.agents_window %} shows a blocking notice with an **Open Editor Window** action.

If built-in updates are disabled by policy, the notice directs the developer to contact an administrator. AI features become available after the installed version meets the requirement.

### Apply managed telemetry in {% data variables.product.prodname_vscode_shortname %}

Managed OpenTelemetry configuration applies to the {% data variables.product.prodname_copilot_short %} Chat extension and the [Agent Host](/docs/agents/concepts/agent-host.md), the process that runs agent sessions. The extension might offer **Reload Window** after a configuration change. {% data variables.product.prodname_vscode_shortname %} restarts the Agent Host automatically after it resolves a managed telemetry change.

Identity capture is off by default and independent of content capture. Review both controls before deployment, and remove conflicting OpenTelemetry environment variables from managed devices. For the configuration schema and supported clients, see [`telemetry` in the enterprise-managed settings reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings#telemetry).

## Use {% data variables.product.prodname_vscode_shortname %} device policies

The following sections describe {% data variables.product.prodname_vscode_shortname %} device policies. Deploy them by following [Enterprise policies](/docs/enterprise/policies.md), and use the [policy reference](/docs/enterprise/policies.md#vs-code-enterprise-policy-reference) for accepted values and minimum versions.

Jump to:

* [Control access and feature availability](#control-access-and-feature-availability)
* [Configure models and data handling](#configure-models-and-data-handling)
* [Govern agents and tools](#govern-agents-and-tools)
* [Configure security and observability](#configure-security-and-observability)

### Control access and feature availability

#### Restrict AI features to approved GitHub organizations

Set the `ChatApprovedAccountOrganizations` policy to require developers to sign in with a GitHub account that belongs to an approved organization before AI features are activated.

Provide a JSON array of GitHub organization logins, such as `["contoso", "contoso-research"]`. Use `["*"]` to allow any signed-in GitHub account.

The policy is fail-closed. AI features remain disabled until account policy data resolves and the signed-in account belongs to an approved organization. Run **Developer: Policy Diagnostics** to inspect the **Account Policy Gate** state.

#### Enable or disable the use of agents

Set the `ChatAgentMode` policy to `false` to disable [agents](/docs/agents/overview.md). This policy controls `setting(chat.agent.enabled)`.

When the policy is disabled, the **Agent** option is not available in the agents dropdown. Developers can still use [ask or edit](/docs/chat/chat-overview.md) for code explanations and file edits.

#### Enable or disable extension language tools

Use the following policies to control extension, browser, and plugin tools:

* Set `ChatAgentExtensionTools` to `false` to disable tools contributed by extensions.
* Set `BrowserChatTools` to `false` to disable browser tools.
* Set `ChatPluginsEnabled` to `false` to disable agent plugin integration.

#### Configure {% data variables.product.prodname_copilot_short %} code review

Use `CopilotReviewSelection` to control code review for selected code. Use `CopilotReviewAgent` to control access to the code review agent for pull requests and changed files.

#### Configure next edit suggestions

Set `CopilotNextEditSuggestions` to `false` to disable next edit suggestions.

#### Enable or disable Claude Agent

Set `Claude3PIntegration` to `false` to disable Claude Agent sessions in {% data variables.product.prodname_vscode_shortname %}.

### Configure models and data handling

#### Set a default chat model

Set the `ChatDefaultModel` policy to choose the default model for new conversations. This policy controls `setting(chat.defaultModel)` and accepts `auto`, a model family name, or a full model ID.

Developers can select another model for an individual conversation. Reopened conversations keep their saved model.

#### Control dictation data

Use the following policies to control whether [dictation](/docs/configure/accessibility/voice.md#use-built-in-dictation) audio and transcripts leave the developer's device.

| Policy | Setting | Behavior |
|--------|---------|----------|
| `DictationEnabled` | `setting(dictation.enabled)` | Controls whether built-in dictation is available. |
| `DictationModel` | `setting(dictation.model)` | Selects an on-device model or the `mai` cloud transcription service. |
| `DictationLLMCleanup` | `setting(dictation.experimental.llmCleanup)` | Controls whether final transcripts are sent to a language model for cleanup. |

To keep dictation audio on the device, set `DictationModel` to `nemotron-3.5-asr-streaming-0.6b`. In {% data variables.product.prodname_vscode_shortname %} for the Web, where on-device transcription is not supported, this policy makes dictation unavailable.

To prevent transcript text from being sent to a language model, set `DictationLLMCleanup` to `false`. For more information, see [Dictation privacy](/docs/configure/accessibility/voice.md#understand-dictation-privacy).

### Govern agents and tools

#### Enable or disable hooks

Hook controls depend on the selected harness. For {% data variables.product.prodname_copilot_short %} sessions, use [Policy Hooks](#use-the-sdk-harness-for-policy-hooks) and the [managed hook-source controls](#restrict-hook-sources) below.

> [!NOTE]
> **For Local sessions:** Set the `ChatHooks` policy to `false` to disable hooks. This policy controls `setting(chat.useHooks)` and does not apply to {% data variables.product.prodname_copilot_short %} sessions.

<a name="use-the-sdk-harness-for-policy-hooks"></a>

##### Verify Policy Hook coverage

{% data variables.product.prodname_copilot_short %} Policy Hooks apply to Copilot sessions, which use the {% data variables.copilot.copilot_sdk_short %} hook implementation. Confirm that developers select **Copilot** as the [session target](/docs/agents/run/agent-harnesses.md#choose-a-session-target) before relying on these hooks for enforcement. Test the required hook behavior in the session that will perform the work.

Local sessions do not load SDK Policy Hooks. Configuring hooks for one harness does not enforce them in another harness. See [hook compatibility](/docs/agent-customization/hooks.md#choose-the-hook-implementation-for-your-session).

<a id="deploy-hooks-through-managed-plugins"></a>

##### Restrict hook sources

Set `ChatAllowManagedHooksOnly` to allow hooks only from enterprise-managed sources and plugins that policy force-enables. Set `ChatStrictPluginOnlyCustomization` when you also need to block standalone user and workspace skills, agents, instructions, and MCP servers.

Plugin distribution is a separate decision. To force-enable plugins or govern marketplaces across supported {% data variables.product.prodname_copilot_short %} clients, use the plugin controls in the [enterprise-managed settings reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings#enabledplugins).

#### Manage agent plugins and marketplaces

Use the following policies to govern [agent plugins](/docs/agent-customization/agent-plugins.md) in {% data variables.product.prodname_vscode_shortname %}:

* `ChatEnabledPlugins` force-enables or force-disables named plugins.
* `ChatExtraMarketplaces` adds plugin marketplaces.
* `ChatStrictMarketplaces` restricts plugin installation to approved marketplace sources. An empty list blocks installation from all marketplaces.

Plugins blocked by policy remain visible in the Extensions view but appear disabled. Marketplaces managed by policy are identified in the marketplace picker.

For cross-client plugin governance instead of {% data variables.product.prodname_vscode_shortname %}-only policy, use {% data variables.product.prodname_copilot_short %} enterprise-managed settings.

<!--
#### Configure MCP server access

Use the following policies to govern [MCP servers](/docs/agent-customization/mcp-servers.md) in {% data variables.product.prodname_vscode_shortname %}:

* `ChatMCP` controls whether developers can run servers from any source, only from the configured registry, or not at all.
* `McpGalleryServiceUrl` configures a private MCP server registry.
* `ChatAllowedMcpServers` defines servers that developers can install or run.
* `ChatDeniedMcpServers` defines servers that developers cannot install or run. Deny entries take precedence over allow entries.

`ChatAllowManagedMcpServersOnly` bridges the two management solutions. It tells {% data variables.product.prodname_vscode_shortname %} to accept grants only from the allowlist delivered through {% data variables.product.prodname_copilot_short %} enterprise-managed settings. Configure that allowlist by following the [GitHub MCP allowlist guidance](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist).
-->

#### Configure agent tool approvals

Use {% data variables.product.prodname_vscode_shortname %} device policies to control approval behavior for agent tools.

##### Disable global auto-approval

Set `ChatToolsAutoApprove` to `false` to prevent developers from enabling global auto-approval.

> [!CAUTION]
> Global auto-approval bypasses security prompts for tool invocations. Disable it unless your threat model explicitly supports this behavior.

##### Require manual approval for specific tools

Use `ChatToolsEligibleForAutoApproval` to require manual approval for specific tools.

##### Configure terminal auto-approval

Set `ChatToolsTerminalEnableAutoApprove` to `false` to require approval for terminal commands.

Learn more about [tool approval](/docs/agents/run/approvals.md#tool-approval).

### Configure security and observability

#### Configure agent sandboxing

For {% data variables.product.prodname_copilot_short %} sessions, use the [session sandbox controls](/docs/agents/run/agent-sandboxing.md#control-sandboxing-for-the-current-session) and verify the [effective sandbox policy](/docs/agents/run/agent-sandboxing.md#inspect-the-effective-sandbox-policy) on the machine where commands run.

<a id="deploy-copilot-managed-sandbox-settings"></a>

Check client support before attempting centralized enforcement. The current [enterprise-managed settings reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings#supported-keys) does not list the shared `sandbox` key as supported for {% data variables.product.prodname_vscode_shortname %}. Don't assume that a control supported by another client applies here.

<details>
<summary>Sandbox device policies for Local sessions</summary>

The following {% data variables.product.prodname_vscode_shortname %} device policies are deprecated and apply to Local sessions. They do not enforce sandboxing for Copilot sessions.

| Policy | Local-session behavior |
|--------|------------------------|
| `ChatAgentSandboxEnabled` | Requires or disables sandboxing for supported terminal commands. |
| `ChatAgentSandboxAllowNetwork` | Controls outbound network access for sandboxed terminal commands. |
| `ChatAgentSandboxAllowUnsandboxedCommands` | Controls whether a command can run outside the sandbox after user confirmation. |
| `ChatAgentSandboxAllowAutoApprove` | Controls automatic approval of sandboxed terminal commands. |

</details>

#### Configure agent network filtering

Set `ChatAgentNetworkFilter` to `true` to restrict network access according to the allowed and denied domain policies.

Use `ChatAgentAllowedNetworkDomains` for permitted domain patterns and `ChatAgentDeniedNetworkDomains` for blocked patterns. Denied domains take precedence.

Network filtering applies to the fetch tool and Integrated Browser. Terminal coverage depends on the session target, platform, and sandbox configuration. See [Configure sandbox network access](/docs/agents/run/agent-sandboxing.md#configure-network-access).

Restart {% data variables.product.prodname_vscode_shortname %} after you change network filtering settings so new Integrated Browser sessions use the updated policy.

#### Configure telemetry export with OpenTelemetry

Use the `CopilotOtel*` policies to control [OpenTelemetry](https://opentelemetry.io/) export for {% data variables.product.prodname_copilot_short %} in {% data variables.product.prodname_vscode_shortname %}. These policies cover export enablement, the collector endpoint and protocol, content and identity capture, the service name, resource attributes, and exporter headers.

For the complete list of policies and the settings they control, see the [enterprise policy reference](/docs/enterprise/policies.md#vs-code-enterprise-policy-reference).

## Use GitHub organization and enterprise settings

GitHub-hosted controls apply through the signed-in account and GitHub services. They are not {% data variables.product.prodname_vscode_shortname %} device policies.

Use GitHub organization and enterprise settings to manage {% data variables.product.prodname_copilot_short %} access, available models and features, content exclusions, and other service-side policies. See [Manage {% data variables.product.prodname_copilot_short %} for your enterprise](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise).

### Configure organization-level custom instructions

Organization administrators create custom instructions on GitHub. When `setting(github.copilot.chat.organizationInstructions.enabled)` is `true`, supported {% data variables.product.prodname_copilot_short %} sessions in {% data variables.product.prodname_vscode_shortname %} include organization instructions that the signed-in account can access.

Learn how to [add custom instructions for your organization](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-organization-instructions).

### Configure organization-level custom agents

Organization administrators create custom agents on GitHub. When `setting(github.copilot.chat.organizationCustomAgents.enabled)` is `true`, organization and enterprise agents that the signed-in account can access appear in the agents dropdown.

Learn how to [create custom agents for your organization](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/create-custom-agents).

## Security considerations

AI-powered development features can perform actions with user-level permissions. Review [AI security considerations](/docs/agents/run/security.md) before enabling agents or auto-approval.

For {% data variables.product.prodname_copilot_short %} security, privacy, compliance, and transparency information, see the [{% data variables.product.prodname_copilot_short %} Trust Center FAQ](https://copilot.github.trust.page/faq).

## Related resources

* [{% data variables.product.prodname_vscode_shortname %} enterprise policy reference](/docs/enterprise/policies.md)
* [Get started with {% data variables.product.prodname_copilot_short %} enterprise-managed settings](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started)
* [{% data variables.product.prodname_copilot_short %} enterprise-managed settings reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings)