---
ContentId: e54adfc9-1394-4d06-94c5-70f7b9cc9aa8
DateApproved: 11/02/2026
MetaDescription: Move workflows from the Local harness to the Copilot harness in {% data variables.product.prodname_vscode_shortname %}. Review customizations and verify organization controls.
MetaSocialImage: ../images/agent-harnesses/agents-window-session-target-2.png
Keywords:
- copilot
- local harness
- migration
- enterprise
- managed settings
---

# Move from Local to the Copilot harness

The Copilot harness brings the shared coding agent runtime behind {% data variables.copilot.copilot_cli_short %} and the {% data variables.copilot.github_copilot_app_short %} into {% data variables.product.prodname_vscode_shortname %}. Your editor workflows benefit from the same ongoing work on model integration, context efficiency, and tool use as those products. You can work alongside your code in the editor or use the {% data variables.copilot.agents_window %} to supervise tasks across projects.

For organizations, the shared runtime provides a common approach to governing agents across supported clients and development environments. Administrators can manage permissions and sandbox restrictions that the legacy Local harness cannot enforce, while developers use approved tools and services in their workflows.

If you already use agents through the Local harness, this guide helps you make that transition. Review the customizations and integrations your work depends on, continue existing conversations where needed, and verify your organization's controls. The goal is a working setup for your daily tasks, not just a different session target.

## Why move

An agent's ability to complete a task depends on more than the model you choose. The harness prepares the context the model receives, coordinates tool calls and approvals, and maintains the conversation as the work progresses. Changing the harness can change how the agent carries out your request, even when you use the same model.

With the Copilot harness, you can:

* Run tasks in a [cloud sandbox](/docs/agents/run/cloud-sandbox-sessions.md) `feature(cloud-sessions)` without keeping your development machine online. Reconnect to continue the session while code and tools stay in the managed cloud environment.
* Limit file system and network access for commands and tool servers started by the agent with [local sandboxing](/docs/agents/run/agent-sandboxing.md).
* Let [Copilot Fusion](/docs/agent-customization/language-models.md#use-copilot-fusion) choose models and coordinate drafting and review for your task.
* Delegate tasks across projects in the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md), then continue the same session in the editor when you want to edit, debug, or test. Both interfaces stay in sync.
* Reduce approval interruptions with [Assisted permissions](/docs/agents/run/approvals.md#permission-levels). A model-based judge assesses tool calls and asks for your confirmation when it doesn't approve a call.
* Give the agent tools from services you use through [Copilot connectors](/docs/agent-customization/copilot-connectors.md) `feature(copilot-connectors)`.
* Collaborate through [canvases](/docs/agents/run/canvases.md) `feature(canvases)` in Copilot sessions hosted on your machine.

For organizations, the Copilot harness adds governance that the Local harness cannot enforce. Administrators can:

* Enforce file system and network restrictions through [managed sandbox policy](/docs/enterprise/manage-ai-settings.md#configure-agent-sandboxing).
* Block specific operations with runtime permission rules. Use [approval controls](/docs/enterprise/manage-ai-settings.md#manage-permission-levels) to prevent developers from selecting **Allow all** or **Assisted permissions**. The runtime enforces these restrictions, rather than relying on the model to follow instructions.
* Choose the team's [starting Fusion tier](/docs/enterprise/manage-ai-settings.md#set-managed-model-defaults) with `fusionTier`. New conversations use it as the default. Developers can select another available tier for a particular task.

Administrators can also [require or block plugins and restrict marketplaces](/docs/enterprise/manage-ai-settings.md#manage-agent-plugins-and-marketplaces) across supported clients. Required plugins give the team approved skills, tools, and hooks without individual setup. Developers can't turn off those plugins, and their toggles are locked.

Deploy these controls where the agent runs, including remote hosts and containers, and [verify enforcement](#verify-the-workflow-and-controls) on each approved client and execution host.

## Understand what changes

**Local** and **Copilot** are harness choices in the **Session Target** picker. Local is the legacy, editor-specific implementation. The Copilot harness uses the {% data variables.copilot.copilot_sdk_short %}, the shared runtime across {% data variables.product.prodname_copilot %} products. Switching between them changes the software that coordinates the agent's work, not whether you use {% data variables.product.prodname_copilot %}.

The harness is also separate from the model and where your code runs. Selecting a Claude model doesn't switch to the Claude harness, and selecting the Copilot harness doesn't move your files to the cloud. The [Agent Host](/docs/agents/concepts/agent-host.md) is the process that runs Copilot sessions. The editor's {% data variables.copilot.chat_view %} and the {% data variables.copilot.agents_window %} are interfaces for working with those sessions.

Use the Copilot harness for new workflows, but review compatibility before replacing an existing Local setup. Tools and customization support can differ, and personal settings don't automatically synchronize across clients. If an integration still requires Local, review the [temporary fallback guidance](#use-local-temporarily-for-a-blocker) with your administrator. For more background on these distinctions, see [agent harness concepts](/docs/agents/concepts/agent-harnesses.md).

## Before you start

* Update to your organization's current approved {% data variables.product.prodname_vscode_shortname %} release. Check feature-specific prerequisites and any [managed minimum-version requirement](/docs/enterprise/manage-ai-settings.md#meet-minimum-version-requirements). This guide describes current behavior, not every intermediate upgrade.
* Sign in with the GitHub account that has your approved {% data variables.product.prodname_copilot_short %} access. Follow [Copilot setup](/docs/setup/copilot.md) or the [GHE.com account guidance](/docs/agents/run/agent-harnesses.md#copilot) as applicable.
* Choose a small task that already works in the Local harness. Record the expected result, required tools, customizations, and approvals so you can compare the workflow after the switch.
* Back up customization files and settings before changing them. Don't put credentials in the backup or in source control.

## Set up your workflow

### Start a Copilot session

1. Open the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) in the editor, or open the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md).
1. Select **New Chat** (`+`) in the {% data variables.copilot.chat_view %}, or **New** in the {% data variables.copilot.agents_window %}. Select your project when prompted.
1. Open **Session Target** and select **Copilot**.
1. Select an available model and agent for your task.

To use **Assisted permissions**, choose **Folder** isolation and select **Assisted permissions** from the permissions picker. See [permission levels](/docs/agents/run/approvals.md#permission-levels) for the available options.

To check an existing session, [identify its current harness](/docs/agents/run/agent-harnesses.md#identify-your-current-harness). Choosing a different model or opening the session in another interface doesn't change its harness.

### Review customizations and integrations

Selecting **Copilot** doesn't convert every customization. Open **Chat: Open Customizations**, select **Migrations**, and review the detected items. Follow [Migrate customizations to the Copilot harness](/docs/agent-customization/migrate-customizations.md) for file locations, supported conversions, and manual steps.

Use this compatibility checklist for the workflows you need:

| Check | What to verify |
|-------|----------------|
| Prompt files | Convert recurring prompts to skills. Recheck agent, model, and tool choices that the conversion doesn't preserve. |
| Personal agents, instructions, and skills | Review profile storage and configured search locations. Use the Copilot harness's native locations for workflows that must work without the editor. |
| Hooks | Review the supported events, script inputs and outputs, and failure behavior. Hooks have no automatic conversion. |
| MCP servers and authentication | Verify server configuration, authorization, tools, and sandbox behavior. Input prompts and stored editor secrets don't automatically transfer. |
| Built-in and extension tools | Check the tools available in the Copilot session. Extension tools require an editor window where the extension is running. |
| Tool sets and chat participants | Replace Local-specific aliases and participant workflows with supported tools, agents, skills, or publisher integrations. |

For MCP servers that use `${input:...}` or `${command:...}`, review [authentication and secret limitations](/docs/agent-customization/migrate-customizations.md#why-are-mcp-servers-with-input-prompts-missing) before moving configuration. Don't replace a secret placeholder with a literal credential in a shared or personal configuration file.

Original and migrated files don't synchronize. Keep backups until you verify the result, and avoid leaving duplicate active copies. **Migrate** performs supported file moves and conversions. **Migrate with Agent** `feature(user-customization-migration)` starts an agent-led conversation to adapt the workflow and uses Copilot credits.

### Continue an existing Local conversation

If you need context from an existing conversation, open the Local session in the editor. In its chat input, open **Session Target** and select **Copilot**. The handoff carries the conversation history and context to the destination session. Review the available model, tools, and permissions before continuing, because they can differ between harnesses. This is not a two-way harness switch. See [hand off from Local](/docs/agents/run/agent-harnesses.md#hand-off-from-a-local-harness-session).

When organization policy requires the Copilot harness, opening an unarchived Local conversation can move it automatically instead. The result depends on whether the host supports conversation import:

* With import support, the move preserves your history and unsent draft. The original Local conversation is archived as read-only.
* Without import support, **Continue in Copilot** starts a new conversation with the transcript attached as context and preserves your unsent draft. The original remains available.

Neither option submits a prompt automatically.

If earlier work doesn't appear, check the original workspace, execution host, and **Archived** or **Done** filters before treating it as lost. Local sessions are editor-only. Follow [find a missing session](/docs/agents/run/sessions/manage-sessions.md#find-a-missing-session), and report a blocker if the history or draft is unavailable.

### Continue between interfaces

You can continue a Copilot session in either interface:

* From the editor, select **Open in Agents**, then select the existing session.
* From the {% data variables.copilot.agents_window %}, select **Open in Editor**.

The session keeps its harness, workspace, and worktree. See [continue between interfaces](/docs/agents/run/sessions/manage-sessions.md#continue-between-the-chat-view-and-agents-window).

The session's Agent Host must stay running. For sessions on your machine, don't quit {% data variables.product.prodname_vscode_shortname %} or shut down the machine. [Editor-provided tools](/docs/agents/concepts/agent-host.md#session-lifetime-and-client-dependencies) still require a connected editor window.

## Roll out in your organization

Pilot the transition with developers who use representative projects, operating systems, and integrations. Include Remote SSH, WSL, and Dev Containers where your organization uses them.

### Choose management channels

Keep the existing controls that your organization still needs. Switching harnesses doesn't replace editor-specific device policies.

* Use [Copilot enterprise-managed settings](/docs/enterprise/manage-ai-settings.md#use-copilot-enterprise-managed-settings) for supported runtime controls across clients. Follow GitHub's [setup guide](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started) and [settings reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings) for schemas, delivery methods, supported clients, and minimum versions.
* Use [device policies](/docs/enterprise/policies.md) for editor-specific controls.
* Use GitHub organization and enterprise settings for account access, approved models, and feature availability. Check **Editor preview features** before piloting connectors or other features that require it.

Review [precedence](/docs/enterprise/manage-ai-settings.md#understand-precedence) when controls overlap. Enterprise-managed settings take precedence over a device policy for the same control. Configure an overlapping control in one system where possible, and verify the effective value rather than assuming an existing policy is unchanged.

### Distinguish a default from a requirement

A harness default guides selection for new sessions. It isn't an enforcement boundary. For example, the `ChatEditorPreferCopilotHarness` device policy prefers the Copilot harness when a new chat would otherwise use Local. It doesn't prohibit other harnesses.

Starting with {% data variables.product.prodname_vscode_shortname %} 1.143, managed nonempty `permissions.deny` rules or `sandbox.enabled: true` require the Copilot harness unless the temporary Local default applies. Other `permissions.*` settings and an empty deny list don't trigger that routing.

To prohibit Local, Claude, and Codex, set `vscode.temporaryAllowLocalHarness` to `false` in enterprise-managed settings. This takes precedence over `vscode.temporaryDefaultToLocalHarness: true`. Setting it to `true` doesn't override other restrictions.

The separate [Claude and Codex availability rule](/docs/enterprise/manage-ai-settings.md#claude-and-codex-availability) depends on the presence of enterprise-managed settings, not only on the deny-list and sandbox routing triggers. Don't use Local routing behavior to infer whether those harnesses are available.

See [runtime policies and harness selection](/docs/enterprise/manage-ai-settings.md#runtime-policies-and-harness-selection) for administrator guidance.

### Validate each execution environment

Check policy delivery, supported client versions, and enforcement on every approved client and execution host. Shared configuration doesn't guarantee identical coverage in the editor, {% data variables.copilot.agents_window %}, CLI, or other clients.

For remote and container sessions, check the machine or container where commands run, not only the connecting device. Confirm sandbox prerequisites and effective paths there. See [sandbox prerequisites](/docs/agents/run/agent-sandboxing.md#check-platform-availability) and [sandboxing in Dev Containers](/docs/agents/run/agent-sandboxing.md#use-sandboxing-in-dev-containers).

Don't treat a sandbox device policy for Local as a Copilot runtime control. Review [sandbox administration](/docs/enterprise/manage-ai-settings.md#configure-agent-sandboxing) and the [device-policy coverage differences](/docs/enterprise/manage-ai-settings.md#use-vs-code-device-policies).

## Verify the workflow and controls

Before relying on the workflow in the Copilot harness:

1. Start a Copilot session in the intended environment and run the representative task. Check the actual edits, command results, and tests rather than only the agent's summary.
1. Confirm that the expected customizations load and that required tools are available. Exercise a migrated skill, hook, or MCP integration that your workflow depends on.
1. Run **Developer: Policy Diagnostics** from the Command Palette (`kb(workbench.action.showCommands)`). Check the effective policy values and their sources with your administrator.
1. In the Copilot session, run `/sandbox policy`. Check the execution host, sandbox state, file system access, and network restrictions. This report is also available when sandboxing is off.
1. With your administrator, test one approved operation and one harmless operation that policy should block. Use a disposable test path or an administrator-selected test destination. Confirm the restriction takes effect, not only that an approval prompt appears.
1. Repeat the checks on approved remote hosts and containers. If you also use another Copilot client, verify its supported controls separately.

Use the [effective sandbox policy report](/docs/agents/run/agent-sandboxing.md#inspect-the-effective-sandbox-policy) and [policy diagnostics](/docs/enterprise/policies.md#verify-policy-enforcement) to investigate unexpected results.

## Use Local temporarily for a blocker

If an integration has no supported replacement in the Copilot harness yet, use the Local harness only when your organization's controls permit it. In the editor, start a new session and select **Local** under **Session Target**. Local isn't available in the {% data variables.copilot.agents_window %}.

If Local isn't available, ask your administrator to review the effective restrictions. Don't remove managed settings or copy secrets into configuration to work around a blocker.

Administrators can temporarily set `vscode.temporaryDefaultToLocalHarness` to `true`. This keeps Local available and stops automatic routing to the Copilot harness, even when managed deny rules or sandbox settings would normally require it. Explicit and remembered harness choices are preserved.

The temporary default doesn't override `vscode.temporaryAllowLocalHarness: false`. It also doesn't restore Claude and Codex when enterprise-managed settings disable them.

> [!WARNING]
> Local cannot enforce Copilot runtime-only permission and sandbox controls. Keeping the same managed configuration while falling back to Local does not preserve those protections. An administrator must review and accept this gap before permitting fallback.

These are temporary transition controls, not a long-term compatibility guarantee. Track the integration blocker, test a supported replacement, and remove the temporary exception after verification. See [Local availability settings](/docs/agents/run/agent-harnesses.md#can-i-keep-local-available-while-migrating) and [the administrator fallback guidance](/docs/enterprise/manage-ai-settings.md#keep-local-harness-as-default).

## Frequently asked questions

### Why can the same model behave differently after switching harnesses?

The model is one part of the agent. The harness determines the context and instructions it receives, which tools it can use, and how tool results and approvals feed back into the conversation. The same prompt and model can therefore produce different results in Local and Copilot sessions.

Compare the result on a task you know, including the edits, test results, and intervention needed to complete it. Don't assume that changing the harness preserves every tool or customization. See [what the harness choice changes](/docs/agents/concepts/agent-harnesses.md#understand-what-the-harness-choice-changes).

### Do I need to install Copilot CLI or the SDK?

No. {% data variables.product.prodname_vscode_shortname %} includes the runtime needed for Copilot harness sessions. Sharing that runtime with {% data variables.copilot.copilot_cli_short %} and the {% data variables.copilot.copilot_sdk_short %} doesn't require you to install either product separately. Follow the [account and setup requirements](/docs/agents/run/agent-harnesses.md#copilot) for the harness.

### Do I need to rebuild all my customizations?

No. Review the customizations that depend on Local-specific locations, formats, or tools. For example, prompt files need conversion to skills, personal agents and instructions in editor profile storage need to move, and hooks need manual review. Other customizations might already use supported locations and formats.

Start with the [migration list](/docs/agent-customization/migrate-customizations.md#open-the-migration-list) rather than rewriting everything. Plugins and marketplaces are managed separately, but their tools and hooks still need a compatibility check. Supported formats can help you reuse customizations across clients; they don't guarantee identical tools or automatic synchronization of personal files.

### Does the Agents window replace the editor?

No. Use the editor when you want to edit, debug, and test alongside the agent. Use the {% data variables.copilot.agents_window %} when you want to assign tasks across projects, monitor progress, and review results. Both interfaces support Copilot sessions, and switching harnesses doesn't require you to change interfaces. See [continue between interfaces](#continue-between-interfaces).

### How do approvals, local sandboxing, and cloud sandboxes differ?

These controls solve different problems:

| Control | What it does |
|---------|--------------|
| [Approvals](/docs/agents/run/approvals.md) | Determine whether an action can run automatically or needs your confirmation. Approving a command doesn't isolate it. |
| [Local sandboxing](/docs/agents/run/agent-sandboxing.md) | Restricts the file system and network access of supported processes on the execution host. It doesn't move the task to another machine. |
| [Cloud sandbox](/docs/agents/run/cloud-sandbox-sessions.md) | Runs the agent, code, and tools in a managed cloud environment rather than on your development machine. The agent can still affect that workspace and services it has permission to access. |

Use the protections appropriate to the task. Neither approvals nor a separate execution environment removes the need to review the agent's changes and access.

### Will our existing OpenTelemetry monitoring still work?

OpenTelemetry is available for both Local and Copilot harness sessions, including supported managed export configuration. You don't need to stay on Local to export agent activity to an OTel collector.

Verify the exporter destination, capture settings, and attributes your dashboards depend on after the switch. For example, developer and machine identity capture currently applies only to Local harness sessions. Agent Host telemetry doesn't include those identity attributes. See [monitor agent usage](/docs/agents/guides/monitoring-agents.md) and [identity capture](/docs/agents/guides/monitoring-agents.md#identity-capture).

## Troubleshoot a transition blocker

* If the Copilot harness or a model is unavailable, check account access, the installed version, and organization restrictions in [AI troubleshooting](/docs/agents/agent-troubleshooting/troubleshooting.md#start-with-basic-checks).
* If a customization or MCP tool is missing, use the [customization migration FAQ](/docs/agent-customization/migrate-customizations.md#frequently-asked-questions).
* If a command is blocked or sandboxed tools fail to start, inspect `/sandbox policy` and follow [sandbox troubleshooting](/docs/agents/run/agent-sandboxing.md#troubleshoot-agent-sandboxing). Don't turn off enforcement as the first troubleshooting step.

For an organization-managed restriction, contact the team that deployed it. For a product or compatibility blocker, [report an issue](https://github.com/microsoft/vscode/issues) with the product version, source and destination harnesses, operating system, execution environment, and minimal reproduction. Describe the missing capability and expected result. Remove credentials, private code, and sensitive policy details before sharing logs or configuration publicly.

## Related resources

* [Approvals and permissions](/docs/agents/run/approvals.md)
* [AI security considerations](/docs/agents/run/security.md)
