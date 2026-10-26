---
ContentId: f8a9c3d2-4e7b-5f1a-b6c8-9d0e2f3a7b4c
DateApproved: 10/28/2026
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

### Set managed model defaults

Give developers a consistent starting model without preventing them from choosing another model for an individual task. Set the top-level `model` managed setting to `auto` or an available model ID.

For Copilot harness sessions, use `fusionTier` to set the starting Auto or Fusion tier:

| Value | Starting tier |
|-------|---------------|
| `"standard"` | Fusion **Standard**, or Auto **Balance** when Fusion is unavailable. |
| `"high"` | Fusion **High** when available, otherwise Auto **Intelligence**. |
| `"max"` | Fusion **Max** when available. If it isn't available, the runtime default remains in effect. |
| `"unmanaged"` | No managed tier selection. The legacy `autoTier` setting is also ignored. |

For example, add the following values to your enterprise-managed settings:

```json
{
    "model": "auto",
    "fusionTier": "high"
}
```

This example starts new conversations on Fusion **High** when [Copilot Fusion (Research preview)](/docs/agent-customization/language-models.md#use-copilot-fusion-research-preview) is available to the account. Otherwise, it uses Auto **Intelligence**. A managed `model` value of `"fusion"` is also accepted as `"auto"`; it doesn't enable Fusion or grant access to an unavailable tier.

`fusionTier` takes precedence over the legacy `autoTier` setting. It applies to the Copilot harness, not Local sessions.

Managed model defaults take precedence over saved personal preferences for new conversations in both the editor and the {% data variables.copilot.agents_window %}. Developers can still change the model or tier within a conversation, and existing conversations keep their selections. Removing a managed default lets new conversations use saved personal preferences again.

To verify the model default, check **Org default** in the model picker and the briefcase indicator for `setting(chat.defaultModel)` in Settings. See [Organization-managed model defaults](/docs/agent-customization/language-models.md#organization-managed-model-defaults).

### Claude and Codex availability

The Claude and Codex harness integrations in {% data variables.product.prodname_vscode_shortname %} are disabled while {% data variables.product.prodname_copilot_short %} enterprise-managed settings apply. This includes settings delivered through server-managed, MDM-managed, or file-based deployments.

The {% data variables.product.prodname_copilot_short %} runtime enforces these settings, but the Claude and Codex harnesses cannot enforce them. {% data variables.product.prodname_vscode_shortname %} disables those harnesses so a session cannot bypass your organization's controls.

This restriction does not delete existing Claude or Codex sessions.

The restriction depends on the presence of managed settings, not only on whether a particular restriction is enabled. For example:

* Managed permission settings, such as `permissions.disableBypassPermissionsMode`, `permissions.allow`, `permissions.ask`, or `permissions.deny`, disable the harnesses. An empty rule list still counts as a managed setting.
* Managed `sandbox.enabled` disables the harnesses even when its value is `false`.
* Other enterprise-managed controls, such as plugin or telemetry settings, can also disable the harnesses.

Setting `setting(chat.agentHost.claudeAgent.enabled)` or `setting(chat.agentHost.codexAgent.enabled)` to `true` does not override this restriction. Setting the `Claude3PIntegration` or `Codex3PIntegration` device policy to `true` does not override it either. The restriction also applies when you use a Claude API key or a ChatGPT account.

This restriction applies to harness availability, not to Claude or OpenAI models selected in a Copilot harness session. Model availability is governed separately.

#### If Claude or Codex is missing

If you need access to one of these harnesses:

1. Run **Developer: Policy Diagnostics** from the Command Palette to inspect the effective `Claude3PIntegration` and `Codex3PIntegration` policies and their sources.
1. Contact the IT team that deployed the managed settings. Share which harness is unavailable and the relevant policy values and sources.
1. If you don't know who owns the settings, ask your IT help desk to route the request to the administrator responsible for {% data variables.product.prodname_copilot_short %} enterprise-managed settings or device management.

Ask the administrator which harnesses are approved for your work and whether the deployed configuration needs review. You cannot restore access by changing your user or workspace settings.

#### Runtime policies and harness selection

The restriction on Claude and Codex is separate from automatic routing to the Copilot harness. The following managed settings require the Copilot harness unless the administrator enables the [temporary Local default](#keep-local-harness-as-default):

* `sandbox.enabled` set to `true`.
* A `permissions` object with at least one key.

An empty `permissions` object does not trigger that routing.

The temporary Local default does not re-enable Claude or Codex while enterprise-managed settings apply.

### Keep Local harness as default

Starting with {% data variables.product.prodname_vscode_shortname %} 1.142, organizations can keep the Local harness as the default for new agent sessions and prevent automatic selection of the Copilot harness.

Set `vscode.temporaryDefaultToLocalHarness` to `true` in your enterprise-managed settings:

```json
{
    "vscode": {
        "temporaryDefaultToLocalHarness": true
    }
}
```

This control suppresses [automatic routing to the Copilot harness](#enforce-runtime-policies-with-copilot-agent-host), including routing triggered by managed `sandbox.enabled` or `permissions` values. It does not change explicit, remembered, or current harness choices. Set `vscode.temporaryDefaultToLocalHarness` to `false` or remove the key to restore normal harness routing.

> [!WARNING]
> Local does not enforce runtime-only sandbox and permission rules. Those managed rules continue to be enforced in Copilot harness sessions. Review the security impact before you use this temporary control.

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

Managed OpenTelemetry configuration applies to the {% data variables.product.prodname_copilot_short %} Chat extension and the [Agent Host](/docs/agents/concepts/agent-host.md), the process that runs agent sessions. The extension might offer **Reload Window** after a configuration change. {% data variables.product.prodname_vscode_shortname %} restarts the local Agent Host automatically after it resolves a managed telemetry change.

Starting with {% data variables.product.prodname_vscode_shortname %} 1.143, use `telemetry.filePath` to save Copilot Agent Host telemetry to a JSONL file without a collector or personal OTel opt-in. The managed file destination takes precedence over collector configuration, unless managed `telemetry.enabled` is `false`, which turns off export. See [Export managed telemetry to a file](/docs/agents/guides/monitoring-agents.md#export-managed-telemetry-to-a-file) for configuration, path requirements, and removal behavior.

Starting with {% data variables.product.prodname_vscode_shortname %} 1.143, use `telemetry.headersProvider` to generate and refresh HTTP headers for OTLP export from Copilot Agent Host sessions. Headers can supply collector-specific metadata, route telemetry, or authenticate with the collector. Managed export does not require developers to opt in through personal OTel settings. For a configuration example and helper requirements, see [Configure dynamic headers](/docs/agents/guides/monitoring-agents.md#configure-dynamic-headers).

The [highest-precedence delivery source](#across-managed-settings-delivery-methods) that supplies `telemetry` owns the entire block. Fields omitted from that source do not inherit values from lower-precedence sources.

Identity capture is off by default and independent of content capture. Review both controls before deployment, and remove conflicting OpenTelemetry environment variables from managed devices. For the configuration schema and supported clients, see [`telemetry` in the enterprise-managed settings reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings#telemetry).

## Use {% data variables.product.prodname_vscode_shortname %} device policies

The following sections describe {% data variables.product.prodname_vscode_shortname %} device policies. Deploy them by following [Enterprise policies](/docs/enterprise/policies.md), and use the [policy reference](/docs/enterprise/policies.md#vs-code-enterprise-policy-reference) for accepted values and minimum versions.

> [!IMPORTANT]
> {% data variables.product.prodname_copilot_short %} harness sessions don't enforce every device policy the same way as Local harness sessions. The following sections note known differences. Test a policy in the harness that your developers use before you rely on it.

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

When the policy is disabled, the **Agent** option is not available in the agents dropdown, and the {% data variables.copilot.agents_window %} is unavailable. Developers can still use [ask or edit](/docs/chat/chat-overview.md) for code explanations and file edits.

The policy does not remove Agent Host session targets, such as **Copilot**, from the [**Session Target** UI control](/docs/agents/run/agent-harnesses.md#select-a-harness) in the editor. Developers can still start agent sessions from those targets.

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

Setting this policy to `true` does not override the [Claude and Codex restriction under enterprise-managed settings](#claude-and-codex-availability).

#### Enable or disable the copilot command

{% data variables.product.prodname_vscode_shortname %} includes a `copilot` command that runs {% data variables.copilot.copilot_cli %}. When {% data variables.copilot.copilot_cli_short %} isn't installed, the command offers to install it from GitHub. On Windows, setup can also [add the command to `PATH` and install {% data variables.copilot.copilot_cli_short %}](/docs/setup/windows.md#set-up-the-copilot-command).

Set the `CopilotCliCommand` policy to `false` to turn off the command. This policy controls `setting(chat.copilotCliCommand.enabled)`. When the policy is disabled:

* New integrated terminals don't include the `copilot` command.
* On Windows, setup doesn't show its **{% data variables.copilot.copilot_cli %}** page or install {% data variables.copilot.copilot_cli_short %}. The next time setup runs, for example during an update, it removes the `copilot` command from `PATH`. Until then, the command doesn't install {% data variables.copilot.copilot_cli_short %}.

The policy doesn't affect a {% data variables.copilot.copilot_cli_short %} installation that you deploy separately. To control which {% data variables.copilot.copilot_cli_short %} version developers use and where it comes from, disable the policy and deploy {% data variables.copilot.copilot_cli_short %} with your own software distribution tools. Learn more about [installing {% data variables.copilot.copilot_cli %}](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli).

Whether developers can use {% data variables.copilot.copilot_cli_short %} is controlled by your [GitHub organization and enterprise settings](#use-github-organization-and-enterprise-settings), which {% data variables.copilot.copilot_cli_short %} applies after sign-in.

### Configure models and data handling

#### Set a default chat model

Set the `ChatDefaultModel` policy to choose the default model for new conversations. This policy controls `setting(chat.defaultModel)` and accepts `auto`, a model family name, or a full model ID.

Developers can select another model for an individual conversation. Reopened conversations keep their saved model.

For defaults delivered through {% data variables.product.prodname_copilot_short %} enterprise-managed settings, see [Set managed model defaults](#set-managed-model-defaults).

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

Hook controls depend on the selected harness. For {% data variables.product.prodname_copilot_short %} harness sessions, use [Policy Hooks](#verify-policy-hook-coverage) and the [managed hook-source controls](#restrict-hook-sources) below.

> [!NOTE]
> **For Local harness sessions:** Set the `ChatHooks` policy to `false` to disable hooks. This policy controls `setting(chat.useHooks)` and does not apply to {% data variables.product.prodname_copilot_short %} harness sessions.

<a name="use-the-sdk-harness-for-policy-hooks"></a>

##### Verify Policy Hook coverage

{% data variables.product.prodname_copilot_short %} Policy Hooks apply to Copilot harness sessions, which use the {% data variables.copilot.copilot_sdk_short %} hook implementation. Confirm that developers select **Copilot** from the [**Session Target** UI control](/docs/agents/run/agent-harnesses.md#select-a-harness) before relying on these hooks for enforcement. Test the required hook behavior in the session that will perform the work.

Local harness sessions do not load SDK Policy Hooks. Configuring hooks for one harness does not enforce them in another harness. See [hook compatibility](/docs/agent-customization/hooks.md#choose-the-hook-implementation-for-your-session).

When moving to Copilot, inventory policy hooks, managed plugins, and any permitted user or repository hooks. Convert and test their scripts as well as their configuration. See [Migrate hooks](/docs/agent-customization/migrate-customizations.md#migrate-hooks).

> [!WARNING]
> Copilot policy hooks run on the host, outside the session sandbox. Keep their scripts in administrator-controlled locations. Do not promote a repository hook to a policy hook while retaining a workspace-controlled script path; that would run editable workspace code outside the sandbox. See [policy hooks and sandboxed sessions](https://docs.github.com/en/copilot/reference/hooks-reference#sandboxed-sessions).

Test failures and timeouts separately. The [Copilot command-hook reference](https://docs.github.com/en/copilot/reference/hooks-reference#exit-codes-for-command-hooks) documents timeouts as fail-open even for policy hooks. A requirement for complete audit coverage or fail-closed enforcement therefore needs more than the presence of a hook file.

<a id="deploy-hooks-through-managed-plugins"></a>

##### Restrict hook sources

Set `ChatAllowManagedHooksOnly` to allow hooks only from enterprise-managed sources and plugins that policy force-enables. Set `ChatStrictPluginOnlyCustomization` when you also need to block standalone user and workspace skills, agents, instructions, and MCP servers.

Plugin distribution is a separate decision. To force-enable plugins or govern marketplaces across supported {% data variables.product.prodname_copilot_short %} clients, use the plugin controls in the [enterprise-managed settings reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings#enabledplugins).

#### Manage agent plugins and marketplaces

Use the following policies to govern [agent plugins](/docs/agent-customization/agent-plugins.md) and customization discovery in {% data variables.product.prodname_vscode_shortname %}:

* `ChatEnabledPlugins` force-enables or force-disables named plugins.
* `ChatExtraMarketplaces` adds plugin marketplaces.
* `ChatStrictMarketplaces` restricts plugin installation to approved marketplace sources. An empty list blocks installation from all marketplaces.
* `ChatCustomizationMarketplace` controls the unified **Browse** discovery surface. When disabled, marketplace discovery remains available in the existing customization management pages.
* `ChatCopilotConnectors` controls connector discovery and whether connected connector MCP servers are available to {% data variables.product.prodname_copilot_short %} sessions.

Plugins blocked by policy remain visible but appear disabled. In **Customize** > **Plugins**, policy-managed plugins are identified as managed by policy, and their toggles are locked. Marketplaces managed by policy are identified in the marketplace picker.

For cross-client plugin governance instead of {% data variables.product.prodname_vscode_shortname %}-only policy, follow [Manage plugin marketplaces and plugins](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/manage-plugin-marketplaces-and-plugins) to configure {% data variables.product.prodname_copilot_short %} enterprise-managed settings.

Enterprise-managed plugin settings only require or block plugins. They don't set optional defaults.

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

Use {% data variables.product.prodname_copilot_short %} enterprise-managed settings to control session permission levels. Use {% data variables.product.prodname_vscode_shortname %} device policies for other approval behavior.

##### Manage permission levels

For Copilot harness sessions, use enterprise-managed settings to control which permission levels developers can select and the initial level for new sessions.

| Managed setting | Effect in {% data variables.product.prodname_vscode_shortname %} |
|-----------------|------------------------------------------------------------------|
| `permissions.disableBypassPermissionsMode` | Set to `"disable"` to disable **Allow all** in the permissions picker. |
| `permissions.disableAssistedPermissionsMode` | Set to `true` to disable **Assisted permissions** in the permissions picker. |
| `permissions.defaultMode` | Sets the initial permission level. Supported values are `"manual"`, `"assisted"`, and `"allow-all"`. |

For example, start sessions with **Assisted permissions** when available, while preventing **Allow all**:

```json
{
    "permissions": {
        "disableBypassPermissionsMode": "disable",
        "disableAssistedPermissionsMode": false,
        "defaultMode": "assisted"
    }
}
```

If the configured default is unavailable, new sessions use **Manual permissions**. Setting a default doesn't prevent developers from switching to another permission level that the organization allows.

In both the editor and the {% data variables.copilot.agents_window %}, supported permission levels restricted by policy remain visible but disabled. The picker shows **Disabled by policy** with a briefcase icon and an explanation. Unsupported permission levels aren't shown.

These managed settings control [session permission levels](/docs/agents/run/approvals.md#permission-levels). The `ChatToolsAutoApprove` device policy controls global auto-approval separately. Refer to the [enterprise-managed settings reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings) for configuration and deployment details.

##### Disable global auto-approval

Set `ChatToolsAutoApprove` to `false` to prevent developers from enabling global auto-approval. While this policy is set, tool confirmations offer only one-time approval, and tool approvals that developers saved earlier aren't applied.

> [!CAUTION]
> Global auto-approval bypasses security prompts for tool invocations. Disable it unless your threat model explicitly supports this behavior.

##### Require manual approval for specific tools

Use `ChatToolsEligibleForAutoApproval` to require manual approval for specific tools.

For {% data variables.product.prodname_copilot_short %} harness sessions, a tool marked `false` removes **Allow all** from the permissions picker for the whole session. It does not require confirmation for each call to that tool, so **Assisted permissions** and saved session approvals can still approve it.

##### Configure terminal auto-approval

Set `ChatToolsTerminalEnableAutoApprove` to `false` to turn off rule-based terminal auto-approval. For Local harness sessions, this policy does not prevent automatic approval of sandboxed commands or approval through session-level permissions.

For {% data variables.product.prodname_copilot_short %} harness sessions, the policy requires approval for commands that run through the built-in shell tool. Set `ChatAgentHostCustomTerminalTool` to `false` to keep these sessions on that tool.

Learn more about [tool approval](/docs/agents/run/approvals.md#tool-approval).

### Configure security and observability

#### Configure agent sandboxing

For {% data variables.product.prodname_copilot_short %} harness sessions, use the [session sandbox controls](/docs/agents/run/agent-sandboxing.md#control-sandboxing-for-the-current-session) and verify the [effective sandbox policy](/docs/agents/run/agent-sandboxing.md#inspect-the-effective-sandbox-policy) on the machine where commands run.

<a id="deploy-copilot-managed-sandbox-settings"></a>

The current [enterprise-managed settings reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings#supported-keys) does not list the shared `sandbox` key as supported for {% data variables.product.prodname_vscode_shortname %}. For Agent Host sessions, use the [session sandbox controls](/docs/agents/run/agent-sandboxing.md#control-sandboxing-for-the-current-session) and verify the [effective sandbox policy](/docs/agents/run/agent-sandboxing.md#inspect-the-effective-sandbox-policy).

<details>
<summary>Sandbox device policies for Local harness sessions</summary>

The following {% data variables.product.prodname_vscode_shortname %} device policies are deprecated and apply to Local harness sessions. They do not enforce sandboxing for Copilot harness sessions.

| Policy | Local-session behavior |
|--------|------------------------|
| `ChatAgentSandboxEnabled` | Requires or disables sandboxing for supported terminal commands. |
| `ChatAgentSandboxAllowNetwork` | Controls outbound network access for sandboxed terminal commands. |
| `ChatAgentSandboxAllowUnsandboxedCommands` | Controls whether a command can run outside the sandbox after user confirmation. |

Local harness sessions approve sandboxed terminal commands automatically. The [terminal auto-approval policy](#configure-terminal-auto-approval) controls rule-based approval, not sandbox auto-approval.

</details>

#### Configure agent network filtering

Set `ChatAgentNetworkFilter` to `true` to restrict network access according to the allowed and denied domain policies.

Use `ChatAgentAllowedNetworkDomains` for permitted domain patterns and `ChatAgentDeniedNetworkDomains` for blocked patterns. Denied domains take precedence.

In Local harness sessions, network filtering applies to the fetch tool and Integrated Browser. In {% data variables.product.prodname_copilot_short %} harness sessions, these policies also apply to the Integrated Browser.

When the `ChatAgentNetworkFilter` policy is `true` and the `ChatAgentAllowedNetworkDomains` policy contains permitted domains, {% data variables.product.prodname_copilot_short %} harness sessions block the runtime's web fetch tool from accessing domains outside that list, even with **Allow all** selected. This restriction does not require sandboxing.

Terminal coverage depends on the selected harness, platform, and sandbox configuration. See [Configure sandbox network access](/docs/agents/run/agent-sandboxing.md#configure-network-access).

Restart {% data variables.product.prodname_vscode_shortname %} after you change network filtering settings so new Integrated Browser sessions use the updated policy.

#### Configure telemetry export with OpenTelemetry

Use the `CopilotOtel*` policies to control [OpenTelemetry](https://opentelemetry.io/) export for {% data variables.product.prodname_copilot_short %} in {% data variables.product.prodname_vscode_shortname %}. These policies cover export enablement, the collector endpoint and protocol, content and identity capture, the service name, resource attributes, and exporter headers.

For the complete list of policies and the settings they control, see the [enterprise policy reference](/docs/enterprise/policies.md#vs-code-enterprise-policy-reference).

## Use GitHub organization and enterprise settings

GitHub-hosted controls apply through the signed-in account and GitHub services. They are not {% data variables.product.prodname_vscode_shortname %} device policies.

Use GitHub organization and enterprise settings to manage {% data variables.product.prodname_copilot_short %} access, available models and features, content exclusions, and other service-side policies. See [Manage {% data variables.product.prodname_copilot_short %} for your enterprise](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise).

To restrict the unified marketplace and {% data variables.product.prodname_copilot_short %} connectors, turn off **Editor preview features**. This forces `setting(chat.customizations.marketplace.enabled)` and `setting(chat.customizations.copilotConnectors.enabled)` off, even though both default to `true`. Developers can't override this restriction in Settings. Other eligibility requirements and managed restrictions still apply when preview features are permitted.

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
