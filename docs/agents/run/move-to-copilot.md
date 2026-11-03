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

# Move from the Local to the Copilot harness

The Copilot harness brings the shared coding agent runtime behind {% data variables.copilot.copilot_cli_short %} and the {% data variables.copilot.github_copilot_app_short %} into {% data variables.product.prodname_vscode_shortname %}. Your editor workflows benefit from the same ongoing work on model integration, context efficiency, and tool use as those products. You can work alongside your code in the editor or use the {% data variables.copilot.agents_window %} to supervise tasks across projects.

For organizations, the shared runtime provides a common approach to governing agents across supported clients and development environments. Administrators can manage permissions and sandbox restrictions that the legacy Local harness cannot enforce, while developers use approved tools and services in their workflows.

If you already use agents through the Local harness, this guide helps you make that transition. Review the customizations and integrations your work depends on, continue existing conversations where needed, and verify your organization's controls. The goal is a working setup for your daily tasks, not just a different session target.

## Why move to the Copilot harness

An agent's ability to complete a task depends on more than the model you choose. The harness prepares the context the model receives, coordinates tool calls and approvals, and maintains the conversation as the work progresses. Changing the harness can change how the agent carries out your request, even when you use the same model.

With the Copilot harness, you can:

* Run builds, tests, and other agent commands within the file system and network boundaries you configure with [local sandboxing](/docs/agents/run/agent-sandboxing.md).
* Let [Copilot Fusion](/docs/agent-customization/language-models.md#use-copilot-fusion) choose models and coordinate drafting and review for your task.
* Delegate tasks across projects in the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md), then continue the same session in the editor when you want to edit, debug, or test. Both interfaces stay in sync.
* Spend less time approving routine tool calls with [assisted permissions](/docs/agents/run/approvals.md#permission-levels). Calls that the risk assessment doesn't approve still come to you for confirmation.
* Delegate work to a [cloud sandbox](/docs/agents/run/cloud-sandbox-sessions.md) `feature(cloud-sessions)` and close your laptop. Reconnect later to review progress and continue the task.
* Bring context from your team's services into agent tasks through [Copilot connectors](/docs/agent-customization/copilot-connectors.md) `feature(copilot-connectors)`, without configuring MCP servers yourself.
* Plan work on a task board or explore an interactive diagram with your agent through [canvases](/docs/agents/run/canvases.md) `feature(canvases)`.

For organizations, the Copilot harness adds governance that the Local harness cannot enforce. Administrators can:

* Enforce file system and network restrictions through [managed sandbox policy](/docs/enterprise/manage-ai-settings.md#configure-agent-sandboxing).
* Block operations your organization doesn't permit and control which [approval levels](/docs/enterprise/manage-ai-settings.md#manage-permission-levels) developers can use. The runtime enforces these restrictions, rather than relying on the model to follow instructions.
* Give the team a consistent [starting model and effort level](/docs/enterprise/manage-ai-settings.md#set-managed-model-defaults), while letting developers choose another available option for a particular task.

Administrators can also distribute approved skills, tools, and hooks through [required plugins and controlled marketplaces](/docs/enterprise/manage-ai-settings.md#manage-agent-plugins-and-marketplaces) across supported clients, without individual setup.

To put these capabilities and controls into practice, follow the [organization rollout steps](#roll-out-the-copilot-harness-in-your-organization).

## Understand what changes

**Local** and **Copilot** are harness choices in the **Session Target** picker. The Local harness is the legacy, editor-specific implementation. The Copilot harness uses the {% data variables.copilot.copilot_sdk_short %}, the shared runtime across {% data variables.product.prodname_copilot %} products. Switching between them changes the software that coordinates the agent's work, not whether you use {% data variables.product.prodname_copilot %}.

The harness is also separate from the model and where your code runs. Selecting a Claude model doesn't switch to the Claude harness, and selecting the Copilot harness doesn't move your files to the cloud. The [Agent Host](/docs/agents/concepts/agent-host.md) is the process that runs Copilot sessions. The editor's {% data variables.copilot.chat_view %} and the {% data variables.copilot.agents_window %} are interfaces for working with those sessions.

Use the Copilot harness for new workflows, but review compatibility before replacing an existing Local harness setup. Tools and customization support can differ, and personal settings don't automatically synchronize across clients. If an integration still requires the Local harness, review the [temporary fallback guidance](#use-the-local-harness-temporarily-for-a-blocker) with your administrator. For more background on these distinctions, see [agent harness concepts](/docs/agents/concepts/agent-harnesses.md).

## Before you start

* Update to your organization's current approved {% data variables.product.prodname_vscode_shortname %} release. Check feature-specific prerequisites and any [managed minimum-version requirement](/docs/enterprise/manage-ai-settings.md#meet-minimum-version-requirements).
* Sign in with the GitHub account that has your approved {% data variables.product.prodname_copilot_short %} access. Follow [Copilot setup](/docs/setup/copilot.md) or the [GHE.com account guidance](/docs/agents/run/agent-harnesses.md#copilot) as applicable.
* Choose a small task that already works in the Local harness. Record the expected result, required tools, customizations, and approvals so you can compare the workflow after the switch.
* Back up customization files and settings before changing them.

## Set up your workflow

### Start a Copilot session

1. Open the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) in the editor, or open the [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md).
1. Select **New Chat** (`+`) in the {% data variables.copilot.chat_view %}, or **New** in the {% data variables.copilot.agents_window %}. Select your project when prompted.
1. Open **Session Target** and select **Copilot**.
1. Select an available model and agent for your task.

To use assisted permissions, open the permissions picker in the chat input and select **Assisted permissions**. See [permission levels](/docs/agents/run/approvals.md#permission-levels) for the available options.

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
| Terminal environment | Verify that the agent's shell can run the commands your workflow needs. See [shell initialization](/docs/agents/run/tools.md#configure-shell-initialization) to configure the supported environment setup. |
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

## Roll out the Copilot harness in your organization

Standardize on the Copilot harness so developers can use its agent capabilities and administrators can enforce permissions and sandbox controls. Start with a pilot that covers the projects, integrations, and execution environments your developers use, including Remote SSH, WSL, and Dev Containers where applicable. Once those workflows are verified, require the harness for your rollout group and deploy the controls your organization needs.

Give pilot participants a support contact and the [steps for reporting a transition blocker](#troubleshoot-a-transition-blocker). Resolve blocking workflows before expanding the rollout.

### Require the Copilot harness

To require the Copilot harness for your rollout group, deploy these enterprise-managed settings on {% data variables.product.prodname_vscode_shortname %} 1.143 or later:

```json
{
    "vscode": {
        "temporaryAllowLocalHarness": false,
        "temporaryDefaultToLocalHarness": false
    }
}
```

Add these keys to your enterprise-managed settings, not to the editor's user or workspace settings. `temporaryAllowLocalHarness: false` prohibits the Local, Claude, and Codex harnesses. It takes precedence over the temporary Local default. Setting `temporaryDefaultToLocalHarness` to `false` also clears that rollout opt-out.

If you want to encourage adoption without requiring the harness yet, set the `ChatEditorPreferCopilotHarness` device policy to `true` instead. It selects the Copilot harness when a new editor chat would otherwise use the Local harness, without prohibiting other harnesses.

Configure the team's model and permission defaults separately from the harness requirement. For example, to make Copilot Fusion the starting model, set `model` to `"auto"` and choose a `fusionTier` of `"standard"`, `"high"`, or `"max"`. See [managed model defaults](/docs/enterprise/manage-ai-settings.md#set-managed-model-defaults) and [permission-level defaults](/docs/enterprise/manage-ai-settings.md#manage-permission-levels). A default sets the starting choice for a new conversation, not a restriction on later choices.

Requiring the harness doesn't turn on sandboxing or add permission rules. Deploy those controls separately. Starting with {% data variables.product.prodname_vscode_shortname %} 1.143, managed nonempty `permissions.deny` rules or `sandbox.enabled: true` also require the Copilot harness unless the temporary Local default applies. Other `permissions.*` settings and an empty deny list don't trigger that routing.

The separate [Claude and Codex availability rule](/docs/enterprise/manage-ai-settings.md#claude-and-codex-availability) depends on the presence of enterprise-managed settings, not only on the deny-list and sandbox routing triggers. Setting `temporaryAllowLocalHarness` to `true` doesn't override other restrictions.

After deployment, start a new editor chat and a new {% data variables.copilot.agents_window %} session. Confirm that they use the Copilot harness, prohibited harnesses are unavailable, and the intended model default appears. If the result differs, inspect **Developer: Policy Diagnostics** and check the effective temporary Local controls before changing the configuration. See [runtime policies and harness selection](/docs/enterprise/manage-ai-settings.md#runtime-policies-and-harness-selection).

### Deploy your organization controls

Keep the existing controls that your organization still needs. Switching harnesses doesn't replace editor-specific device policies.

* Use [Copilot enterprise-managed settings](/docs/enterprise/manage-ai-settings.md#use-copilot-enterprise-managed-settings) for supported runtime controls across clients. Follow GitHub's [setup guide](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started) and [settings reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings) for schemas, delivery methods, supported clients, and minimum versions.
* Use [device policies](/docs/enterprise/policies.md) for editor-specific controls.
* Use GitHub organization and enterprise settings for account access, approved models, and feature availability. Check **Editor preview features** before piloting connectors or other features that require it.

Review [precedence](/docs/enterprise/manage-ai-settings.md#understand-precedence) when controls overlap. Enterprise-managed settings take precedence over a device policy for the same control. Configure an overlapping control in one system where possible, and verify the effective value rather than assuming an existing policy is unchanged.

### Validate each execution environment

Check policy delivery, supported client versions, and enforcement on every approved client and execution host. Shared configuration doesn't guarantee identical coverage in the editor, {% data variables.copilot.agents_window %}, CLI, or other clients.

For remote and container sessions, check the machine or container where commands run, not only the connecting device. Confirm sandbox prerequisites and effective paths there. See [sandbox prerequisites](/docs/agents/run/agent-sandboxing.md#check-platform-availability) and [sandboxing in Dev Containers](/docs/agents/run/agent-sandboxing.md#use-sandboxing-in-dev-containers).

Don't treat a sandbox device policy for the Local harness as a Copilot runtime control. Review [sandbox administration](/docs/enterprise/manage-ai-settings.md#configure-agent-sandboxing) and the [device-policy coverage differences](/docs/enterprise/manage-ai-settings.md#use-vs-code-device-policies).

## Verify the workflow and controls

Before relying on the workflow in the Copilot harness:

1. Start a Copilot session in the intended environment and run the representative task. Check the actual edits, command results, and tests rather than only the agent's summary.
1. Confirm that the expected customizations load and that required tools are available. Exercise a migrated skill, hook, or MCP integration that your workflow depends on.
1. Run **Developer: Policy Diagnostics** from the Command Palette (`kb(workbench.action.showCommands)`). Check the effective policy values and their sources with your administrator.
1. In the Copilot session, run `/sandbox policy`. Check the execution host, sandbox state, file system access, and network restrictions. This report is also available when sandboxing is off.
1. With your administrator, test one approved operation and one harmless operation that policy should block. Use a disposable test path or an administrator-selected test destination. Confirm the restriction takes effect, not only that an approval prompt appears.
1. Repeat the checks on approved remote hosts and containers. If you also use another Copilot client, verify its supported controls separately.

Use the [effective sandbox policy report](/docs/agents/run/agent-sandboxing.md#inspect-the-effective-sandbox-policy) and [policy diagnostics](/docs/enterprise/policies.md#verify-policy-enforcement) to investigate unexpected results.

## Use the Local harness temporarily for a blocker

If an integration has no supported replacement in the Copilot harness yet, use the Local harness only when your organization's controls permit it. In the editor, start a new session and select **Local** under **Session Target**. The Local harness isn't available in the {% data variables.copilot.agents_window %}.

If the Local harness isn't available, ask your administrator to review the effective restrictions.

Administrators can temporarily set `vscode.temporaryDefaultToLocalHarness` to `true`. This keeps the Local harness available and stops automatic routing to the Copilot harness, even when managed deny rules or sandbox settings would normally require it. Explicit and remembered harness choices are preserved.

The temporary default doesn't override `vscode.temporaryAllowLocalHarness: false`. It also doesn't restore Claude and Codex when enterprise-managed settings disable them.

> [!WARNING]
> The Local harness cannot enforce Copilot runtime-only permission and sandbox controls. Keeping the same managed configuration while falling back to the Local harness does not preserve those protections. An administrator must review and accept this gap before permitting fallback.

These are temporary transition controls, not a long-term compatibility guarantee. Track the integration blocker, test a supported replacement, and remove the temporary exception after verification. See [Local harness availability settings](/docs/agents/run/agent-harnesses.md#can-i-keep-the-local-harness-available-while-migrating) and [the administrator fallback guidance](/docs/enterprise/manage-ai-settings.md#keep-local-harness-as-default).

## Frequently asked questions

### How do I try the Copilot harness features?

Start a Copilot harness session, then use the starting steps below. The linked guides cover platform requirements, account access, and organization controls.

| Feature | Get started |
|---------|-------------|
| [Local sandboxing](/docs/agents/run/agent-sandboxing.md#turn-on-sandboxing-where-commands-run) | Set `setting(chat.agent.sandbox.enabled)` to `on` on the execution host. Start a new session and run `/sandbox policy` to check the restrictions. |
| [Copilot Fusion](/docs/agent-customization/language-models.md#use-copilot-fusion) | Select **Copilot Fusion** in the model picker, then choose an available effort level. |
| [Assisted permissions](/docs/agents/run/approvals.md#permission-levels) | Open the permissions picker in the chat input and select **Assisted permissions**. |
| [Copilot connectors](/docs/agent-customization/copilot-connectors.md#connect-a-service) `feature(copilot-connectors)` | Run **Chat: Open Customizations**, select **Browse**, and choose **Copilot Connectors**. Select a service and choose **Connect**, then review and authorize its access. |
| [Canvases](/docs/agents/run/canvases.md#prerequisites) `feature(canvases)` | Turn on `setting(chat.canvases.enabled)`, start a new session, and send a message. Install a canvas-providing plugin from **Browse** > **Canvases**, then ask the agent to open its canvas. |

### Can I still review and undo the agent's edits?

Yes. Copilot harness sessions in the editor support **Keep** and **Undo** through the [working set](/docs/agents/run/review-code-edits.md#review-pending-edits-with-the-working-set) `feature(editor-working-set)`, which is on by default. Open a file from the changed-files list and use the inline controls to keep or undo individual changes. In the {% data variables.copilot.agents_window %}, use the [Changes view](/docs/agents/run/review-code-edits.md#review-changes-in-the-agents-window).

Pending edits are already saved to disk. **Keep** clears their pending-review state. It doesn't stage or commit them. The working set tracks supported agent edit tools, not changes made through terminal commands or scripts. Review those changes separately, for example in Source Control.

### Where do I choose which tools the agent can use?

With the Copilot harness selected, run **Chat: Open Customizations** and select **Tools**. Expand a tool group to select or clear individual tools. Your client-tool selection persists in the active user profile, rather than applying to only one request as in the Local harness picker.

The **Copilot** group lists the runtime's built-in tools, which aren't individually configurable in that list. Client-provided tools need the contributing client connected. Enabling a tool doesn't approve its use automatically. See [manage available tools](/docs/agents/run/tools.md#manage-available-tools).

### What happens to my existing memory?

The Local harness's memory files and Copilot Memory are separate systems. Switching harnesses doesn't convert the existing files. By default, Copilot harness sessions use [cloud-backed Copilot Memory](/docs/agents/run/memory.md#copilot-memory), subject to your account settings and organization policies.

An [Experimental repository-local storage option](/docs/agents/run/memory.md#store-copilot-memory-in-the-repository-experimental) is also available for Copilot harness sessions on your machine. It uses a different file from Local harness memory and doesn't support user-scoped memories. GitHub's cloud-memory settings and policies don't apply to that local store, so review its data-handling implications before turning it on.

Keep required team guidance in reviewed [instructions](/docs/agent-customization/custom-instructions.md) or [skills](/docs/agent-customization/agent-skills.md), rather than relying on learned memories alone.

### Why can the same model behave differently after switching harnesses?

The model is one part of the agent. The harness determines the context and instructions it receives, which tools it can use, and how tool results and approvals feed back into the conversation. The same prompt and model can therefore produce different results in Local and Copilot harness sessions.

Compare the result on a task you know, including the edits, test results, and intervention needed to complete it. Don't assume that changing the harness preserves every tool or customization. See [what the harness choice changes](/docs/agents/concepts/agent-harnesses.md#understand-what-the-harness-choice-changes).

### Do I need to install Copilot CLI or the SDK?

No. {% data variables.product.prodname_vscode_shortname %} includes the runtime needed for Copilot harness sessions. Sharing that runtime with {% data variables.copilot.copilot_cli_short %} and the {% data variables.copilot.copilot_sdk_short %} doesn't require you to install either product separately. Follow the [account and setup requirements](/docs/agents/run/agent-harnesses.md#copilot) for the harness.

### Do I need to rebuild all my customizations?

No. Review the customizations that depend on Local harness-specific locations, formats, or tools. For example, prompt files need conversion to skills, personal agents and instructions in editor profile storage need to move, and hooks need manual review. Other customizations might already use supported locations and formats.

Start with the [migration list](/docs/agent-customization/migrate-customizations.md#open-the-migration-list) rather than rewriting everything. Plugins and marketplaces are managed separately, but their tools and hooks still need a compatibility check. Supported formats can help you reuse customizations across clients; they don't guarantee identical tools or automatic synchronization of personal files.

### How do approvals, local sandboxing, and cloud sandboxes differ?

These controls solve different problems:

| Control | What it does |
|---------|--------------|
| [Approvals](/docs/agents/run/approvals.md) | Determine whether an action can run automatically or needs your confirmation. Approving a command doesn't isolate it. |
| [Local sandboxing](/docs/agents/run/agent-sandboxing.md) | Restricts the file system and network access of supported processes on the execution host. It doesn't move the task to another machine. |
| [Cloud sandbox](/docs/agents/run/cloud-sandbox-sessions.md) | Runs the agent, code, and tools in a managed cloud environment rather than on your development machine. The agent can still affect that workspace and services it has permission to access. |

Use the protections appropriate to the task. Neither approvals nor a separate execution environment removes the need to review the agent's changes and access.

With **Manual permissions**, choose **Allow Once** to approve only the current action. For broader access, review the [scope shown in the confirmation](/docs/agents/run/approvals.md#scope-approvals-in-copilot-sessions).

### Will our existing OpenTelemetry monitoring still work?

OpenTelemetry is available for both Local and Copilot harness sessions, including supported managed export configuration. You don't need to stay on the Local harness to export agent activity to an OTel collector.

Verify the exporter destination, capture settings, and attributes your dashboards depend on after the switch. See [monitor agent usage](/docs/agents/guides/monitoring-agents.md) for configuration and coverage details.

## Troubleshoot a transition blocker

* If the Copilot harness or a model is unavailable, check account access, the installed version, and organization restrictions in [AI troubleshooting](/docs/agents/agent-troubleshooting/troubleshooting.md#start-with-basic-checks).
* If a customization or MCP tool is missing, use the [customization migration FAQ](/docs/agent-customization/migrate-customizations.md#frequently-asked-questions).
* If a command is blocked or sandboxed tools fail to start, inspect `/sandbox policy` and follow [sandbox troubleshooting](/docs/agents/run/agent-sandboxing.md#troubleshoot-agent-sandboxing). Don't turn off enforcement as the first troubleshooting step.

If a workflow still fails, use the appropriate reporting or support channel:

* **Organization policy or rollout help**: Contact your organization's AI enablement or IT support team. They can review the deployed configuration and any temporary exception.
* **Product bugs or compatibility gaps**: [Report an unresolved issue](/docs/agents/agent-troubleshooting/troubleshooting.md#report-an-unresolved-issue) through the {% data variables.product.prodname_vscode_shortname %} Issue Reporter. The reporting guide explains how to include diagnostic evidence safely.
* **Assistance from GitHub Support**: {% data variables.copilot.copilot_business_short %} and {% data variables.copilot.copilot_enterprise_short %} customers can [open a support ticket](https://docs.github.com/en/support/contacting-github-support/creating-a-support-ticket). Use that support channel rather than posting private organization details in a public issue.

Include the product version, source and destination harnesses, operating system, execution environment, and minimal reproduction. Describe the missing capability and expected result. Remove credentials, private code, and sensitive policy details before sharing logs or configuration publicly.

## Related resources

* [Approvals and permissions](/docs/agents/run/approvals.md)
* [AI security considerations](/docs/agents/run/security.md)
