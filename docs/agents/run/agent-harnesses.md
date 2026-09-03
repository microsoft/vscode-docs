---
ContentId: 5b1e6f94-2c73-4a80-9d15-7f3c8e2a6b41
DateApproved: 9/2/2026
MetaDescription: Choose an agent harness in {% data variables.product.prodname_vscode %}, configure code isolation and permissions, start a session, and hand off work.
MetaSocialImage: ../../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- agents
- agent harness
- session target
- claude
- codex
- "{% data variables.copilot.copilot_cloud_agent_short %}"
- worktree
---

# Choose and use an agent harness

{% data variables.product.prodname_vscode %} supports the Local, GitHub Copilot, Anthropic Claude, and OpenAI Codex agent harnesses. It also provides a Cloud target for running an available cloud agent remotely. An agent harness coordinates an agent session, including tool calls, context, and code changes. Use the **Session Target** control to choose a harness and where it runs. This article helps you choose a target, configure the available options, start a session, and hand off ongoing work.

For the relationship between harnesses, language models, agent roles, and execution environments, see [Agent harnesses](/docs/agents/concepts/agent-harnesses.md).

## Choose a session target

If you're unsure which target to choose, use these guidelines:

* Choose **Copilot** for general coding tasks that use Copilot-provided models and capabilities. The [agents quickstart](/docs/agents/quickstart.md) uses this option.
* Choose **Local** when the task needs {% data variables.product.prodname_vscode_shortname %} built-in tools, extension-provided tools, or a model configured in {% data variables.product.prodname_vscode_shortname %}.
* Choose **Claude** or **Codex** when the task benefits from that provider's workflow, tools, or permission options.
* Choose **Cloud** for a well-scoped task that can run independently against a GitHub repository and return a pull request.

Most targets share the same chat and session-management experience in {% data variables.product.prodname_vscode_shortname %}. Your choice primarily affects where the agent runs, which tools and models it can use, and how it applies code changes.

| Session target | Where tools run | Code access | Choose it for |
|----------------|-----------------|-------------|---------------|
| **Local** | In the {% data variables.product.prodname_vscode_shortname %} extension host on your machine | Current workspace | Interactive work that needs {% data variables.product.prodname_vscode_shortname %} tools, extension tools, or any model configured in {% data variables.product.prodname_vscode_shortname %} |
| **Copilot** | In the Agent Host on your machine | Current folder or an isolated Git worktree | General coding tasks, background sessions, and Copilot-specific capabilities |
| **Claude** | On your machine | Current folder or an isolated Git worktree | Claude-specific agent capabilities, slash commands, and permission modes |
| **Codex** | On your machine | Current folder or an isolated Git worktree | Codex-specific capabilities for interactive or background work |
| **Cloud** | On a provider's remote infrastructure | A GitHub repository and pull request | Independent tasks that don't need local editor context and benefit from team review |

**Local** is the name of one harness. Copilot, Claude, and Codex can also run locally. **Cloud** is an execution target that groups the cloud agents available to you.

## Start a session

You can select a session target when you start a session in the {% data variables.copilot.chat_view %} or the {% data variables.copilot.agents_window %}. When you change the target for an ongoing session, {% data variables.product.prodname_vscode_shortname %} considers this a [handoff](#hand-off-a-session) and carries the conversation history and context to the new target.

The **Session Target** control only lists targets that are available in the current window. If your preferred harness is not listed, review its prerequisites in [Configure an agent harness](#configure-an-agent-harness).

To start a session:

1. Open the {% data variables.copilot.chat_view %} (`kb(workbench.action.chat.open)`) or the {% data variables.copilot.agents_window %}.

1. Select **New Chat** (`+`) in the {% data variables.copilot.chat_view %}, or select **New** in the {% data variables.copilot.agents_window %}.

1. If you're using the {% data variables.copilot.agents_window %}, select the folder or GitHub repository for the session.

1. Open the **Session Target** control and select an available harness or the Cloud target.

    ![Screenshot of the Session Target control in the {% data variables.copilot.agents_window %}.](../images/agent-harnesses/agents-window-session-target.png)

1. Configure any available agent role, language model, permission level, and code-isolation options for the selected target.

1. Enter a prompt and submit it.

1. Review approval requests while the agent works. When the task is complete, [review its changes and validation results](/docs/agents/run/review-code-edits.md).

For a guided first task, complete the [agents quickstart](/docs/agents/quickstart.md). Learn more about [creating and managing sessions](/docs/agents/run/sessions/manage-sessions.md).

## Choose code isolation

> [!NOTE]
> The code isolation option (worktree or folder) is only available in {% data variables.copilot.agents_window %}.

AI agents can apply code changes to your workspace. To isolate code changes and avoid conflicts with your active workspace, you can choose to run sessions in a new [Git worktree](/docs/sourcecontrol/branches-worktrees.md#understanding-worktrees). When you choose the Local harness, changes are always applied in the active workspace.

Code isolation controls where the agent applies file changes. The permission level controls which actions require your approval. Worktree isolation keeps changes out of your active workspace, but it does not restrict the commands or network access available to the agent.

| Choice | Choose it for | Considerations |
|--------|---------------|----------------|
| **New Worktree** | Parallel tasks that should not modify your active workspace | Starts from committed Git state and requires you to integrate the result |
| **Folder** | Small, interactive tasks that should use your current files and uncommitted changes | Agent edits appear immediately in your active workspace |

When you [start a session in the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md#start-an-agent-session), select **New Worktree** and choose the base branch to isolate the session. If you leave **New Worktree** unselected, the agent works directly on the code in the workspace. Sessions that you start in the {% data variables.copilot.chat_view %} always use the current workspace.

![Screenshot of the New Worktree checkbox and base branch control in the {% data variables.copilot.agents_window %}.](../images/agent-harnesses/agents-window-new-worktree.png)

Worktree isolation requires a Git repository with at least one commit. A new worktree contains the committed files from the selected base branch. It does not automatically contain uncommitted tracked changes or untracked files from your primary worktree. Commit changes that the agent needs, or use folder isolation when the task depends on your current uncommitted state.

Git-ignored files, such as `.env` files and installed dependencies, are also absent by default. Use `setting(git.worktreeIncludeFiles)` to specify ignored files and folders that {% data variables.product.prodname_vscode_shortname %} should copy into new worktrees. Learn more about [including files in a worktree](/docs/sourcecontrol/branches-worktrees.md#include-files-when-creating-a-worktree).

Worktree sessions use **Bypass Approvals** because their code changes are separate from your active workspace. Folder sessions offer the [permission levels](/docs/agents/run/approvals.md#permission-levels) supported by the selected harness. For operating system-level file system and network restrictions, configure [agent sandboxing](/docs/agents/concepts/trust-and-safety.md#agent-sandboxing).

<a name="configure-an-agent-harness"></a>

## Configure a harness or Cloud target

Expand a target to review its setup and capabilities.

<a name="local"></a>

<details>
<summary>Local</summary>

The Local harness runs interactively in the {% data variables.product.prodname_vscode_shortname %} [extension host](/docs/agents/concepts/agent-host.md#behavior-on-the-extension-host) and works directly in your active workspace. It can use {% data variables.product.prodname_vscode_shortname %} built-in tools, extension-provided tools, MCP servers, and the models configured in {% data variables.product.prodname_vscode_shortname %}, including [bring your own key models](/docs/agent-customization/language-models.md#bring-your-own-language-model-key).

Choose Local for interactive tasks that need immediate feedback or access to editor context, such as diagnostics, test results, terminal output, or selections.

### Choose a built-in agent role

Local sessions provide these built-in agent roles:

* **Ask**: asks questions and provides guidance without making changes to the code.
* **Agent**: autonomously plans and performs complex coding tasks, edits files, runs commands, and iterates on results.
* **Plan**: researches a task and creates a structured implementation plan before code changes. Learn more about [planning with agents](/docs/agents/run/planning.md).

You can switch roles during a session from the agent picker.

</details>

<a name="copilot"></a>

<details>
<summary>Copilot</summary>

<a name="use-the-copilot-harness"></a>

The Copilot harness is powered by the [{% data variables.copilot.copilot_sdk_short %}](https://www.npmjs.com/package/@github/copilot-sdk) and runs locally on your machine in the [Agent Host](/docs/agents/concepts/agent-host.md). The Agent Host owns the session independently of the window that displays it, letting you pick up your session from the sessions list in another window or even in the browser.

### Setup and authentication

Copilot sessions use the same GitHub authentication context as chat in {% data variables.product.prodname_vscode_shortname %}. If you use a GitHub Enterprise account for Copilot, the session uses that account. For managed user accounts on GHE.com, complete the setup in [Using GitHub Copilot with an account on GHE.com](https://docs.github.com/en/copilot/managing-copilot/configure-personal-settings/using-github-copilot-with-an-account-on-ghecom).

### Permissions and approvals

The available [permission levels](/docs/agents/run/approvals.md#permission-levels) depend on the isolation mode:

* **Worktree**: the permission level is **Bypass Approvals** and can't be changed.
* **Folder**: select **Default Approvals** or **Bypass Approvals** from the permissions picker. To also use **Assisted permissions** `feature(assisted-permissions)`, turn on `setting(chat.assistedPermissions.enabled)`.

Because Copilot sessions run on the Agent Host, **Autopilot** is an [agent mode](/docs/agents/run/approvals.md#how-autopilot-works) rather than a permission level.

### Provider-specific capabilities

* **Slash commands**: enter `/` in the chat input to view the slash commands available in a Copilot session. For example, use `/compact` to reduce conversation context or `/yolo` and `/autoApprove` to control [automatic tool approval](/docs/agents/run/approvals.md#frequently-asked-questions).

#### Get a second opinion with Rubber Duck

`feature(rubber-duck)`

Rubber Duck is a built-in, read-only critic that gives Copilot a second opinion on its plans, code, and tests. It uses a complementary model to look for substantive issues, such as logic errors, design flaws, security vulnerabilities, and missing test coverage. Rubber Duck groups its feedback into blocking issues, non-blocking issues, and suggestions. Copilot summarizes the critique and decides how to act on it, but Rubber Duck doesn't edit files or run commands that change your environment.

For non-trivial work, Copilot might consult Rubber Duck automatically at key points, such as:

* After creating a plan, before implementation.
* During a complex implementation.
* After writing tests.
* After repeated failures or unexpected results.

For smaller tasks, Copilot typically skips this review. To request a review at any time, ask Copilot in natural language:

```prompt
Get a second opinion on the changes you made so far.
```

You can also enter `/rubber-duck <question>` in the chat input. For example, enter `/rubber-duck What edge cases are missing?`.

> [!NOTE]
> Rubber Duck is available only when the main session uses a Claude or GPT model and a suitable complementary model is available. The additional model pass adds latency and model usage.

Learn more about the [Rubber Duck agent](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/rubber-duck) in the GitHub documentation.

<a name="remote-control-copilot-sessions"></a>

* **Remote control**: enter `"/remote on"` to monitor and steer a running Copilot session from GitHub.com or the GitHub Mobile app. Session history, tool activity, status, approvals, and questions stay synchronized. Remote control requires GitHub authentication and a workspace that maps to a GitHub repository. Enter `"/remote off"` to stop sharing the session.

<a name="run-deep-research-with-the-research-agent"></a>

* **Research agent** _(Preview)_: in {% data variables.product.prodname_vscode_shortname %} Insiders, enter `/research <topic>` to produce a detailed Markdown report with citations from your codebase, relevant GitHub repositories, and the web. For research that feeds into an implementation plan, use the [Plan agent](/docs/agents/run/planning.md). For focused research that returns results to the current conversation, use [subagents](/docs/agents/run/subagents.md).

<a name="use-copilot-cli-from-the-terminal"></a>

* **Terminal integration**: open the **{% data variables.copilot.copilot_cli %}** terminal profile, run **Chat: New {% data variables.copilot.copilot_cli_short %} Session** from the Command Palette (`kb(workbench.action.showCommands)`), or enter `copilot` in an integrated terminal. {% data variables.product.prodname_vscode_shortname %} adds the session to the sessions list. To continue an existing Copilot session from the terminal, right-click it and select **Resume in Terminal**.

### Limitations

Copilot sessions don't have access to every {% data variables.product.prodname_vscode_shortname %} built-in or extension-provided tool. Enabled client-side tools are available to the agent only while {% data variables.product.prodname_vscode_shortname %} is connected to the session, and you [manage which tools are available to Copilot](/docs/agents/run/tools.md#manage-tool-availability-for-copilot). Copilot sessions can currently access only local MCP servers that don't require authentication.

</details>

<a name="claude-preview"></a>
<a name="third-party-agents"></a>

<details>
<summary>Claude</summary>

Claude sessions use Anthropic's Claude Agent SDK and can run autonomously on your workspace. {% data variables.product.prodname_vscode_shortname %} integrates the harness through its SDK while keeping session management, chat, and code review in {% data variables.product.prodname_vscode_shortname %}.

### Setup and authentication

Claude support is enabled by default. Turn it on or off with `setting(github.copilot.chat.claudeAgent.enabled)`.

Claude supports two authentication and billing options:

* **GitHub Copilot subscription**: sign in to GitHub to use Copilot-routed models. Usage is billed through your Copilot subscription.
* **Anthropic credentials**: use an Anthropic API key or Claude Code OAuth token. Usage is billed by Anthropic.

When both authentication methods are available, the model picker groups models by **Anthropic** and **Copilot**. The model you select determines the provider and billing method for the next turn. You can switch between Anthropic-native and Copilot-routed models in an existing Claude session.

<a name="use-claude-without-github-sign-in"></a>
<a name="use-claude-without-github-sign-in-experimental"></a>

To use Claude without signing in to GitHub _(Experimental)_, set `ANTHROPIC_API_KEY` in your environment or in the `env` object in `~/.claude/settings.json`. Alternatively, set `CLAUDE_CODE_OAUTH_TOKEN` to a token created with `claude setup-token`. Learn more about [Claude Code authentication](https://code.claude.com/docs/en/authentication).

Enable `setting(chat.agentHost.allowSignedOutWhenUsable)` to open the {% data variables.copilot.agents_window %} while signed out of GitHub. The model picker only shows Anthropic-native models until you sign in. After you sign in to GitHub, Copilot-routed models are also available.

### Permissions and approvals

Claude supports these permission modes:

* **Edit automatically**: apply changes without asking for approval.
* **Request approval**: ask before applying changes.
* **Plan**: outline the approach before implementation.

> [!CAUTION]
> The `setting(github.copilot.chat.claudeAgent.allowDangerouslySkipPermissions)` setting bypasses all permission checks. Use it only in an isolated sandbox environment without internet access.

### Provider-specific capabilities

Enter `/` in the chat input to view commands for managing Claude-native agents, hooks, memory files, and code review. Learn more about [Claude subagents](https://code.claude.com/docs/en/sub-agents) and [Claude hooks](https://code.claude.com/docs/en/hooks).

</details>

<a name="codex"></a>

<details>
<summary>Codex</summary>

The Codex harness uses OpenAI Codex for interactive and background coding tasks. It runs through the OpenAI Codex extension or, experimentally, on the Agent Host. {% data variables.product.prodname_vscode_shortname %} provides session management, chat, and code review for both integrations.

### Setup and authentication

Codex is not listed by default. Complete one of these options before you select it. You don't need both:

* **Use the OpenAI Codex extension in the {% data variables.copilot.chat_view %}**: install and enable the [OpenAI Codex extension](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt).
* **Use Codex on Agent Host in the {% data variables.copilot.agents_window %}** _(Experimental)_: enable `setting(chat.agentHost.codexAgent.enabled)`.

To use the Agent Host implementation in the {% data variables.copilot.chat_view %}, also enable `setting(chat.editor.codex.preferAgentHost)`.

On the Agent Host, Codex supports two authentication and subscription options:

* **GitHub Copilot subscription**: sign in to GitHub to use Copilot-backed models. This option requires {% data variables.copilot.copilot_pro_plus_short %}.
* **ChatGPT subscription**: open the account menu and select **Sign in to ChatGPT**. A free ChatGPT account is sufficient.

When both accounts are signed in, the model picker groups models by **Copilot** and **ChatGPT**. Your selection determines which subscription is used, and {% data variables.product.prodname_vscode_shortname %} saves that provider with the session.

<a name="use-codex-without-github-sign-in"></a>
<a name="use-codex-without-github-sign-in-experimental"></a>

To use Codex without signing in to GitHub _(Experimental)_, sign in to ChatGPT and enable `setting(chat.agentHost.allowSignedOutWhenUsable)`. The desktop {% data variables.copilot.agents_window %} then shows ChatGPT-backed models while signed out. Copilot-backed models prompt you to sign in to GitHub, and the browser-based {% data variables.copilot.agents_window %} still requires GitHub sign-in.

### Permissions and approvals

On the Agent Host, Codex provides these approval presets:

* **Default Permissions**: read and edit workspace files and run routine local commands. Codex asks before using the internet or accessing resources outside the workspace.
* **Auto-Review**: use the same workspace access as **Default Permissions**, but send approval requests to an automatic reviewer instead of prompting you.
* **Full Access**: edit files outside the workspace and use the internet without asking.

> [!CAUTION]
> **Full Access** gives Codex unrestricted disk and network access. Use it only when you intend to give the agent full access to your machine.

</details>

<a name="cloud"></a>

<details>
<summary>Cloud target</summary>

The Cloud target runs an available provider harness on remote infrastructure and works with a GitHub repository. The agent implements the task on a branch and opens a pull request for review. Choose Cloud for well-scoped tasks that can run without access to your local editor context, terminal output, or extension-provided tools.

{% data variables.product.prodname_vscode_shortname %} supports:

* **{% data variables.copilot.copilot_cloud_agent %}** for implementing features, addressing review feedback, and creating pull requests.
* **Claude and Codex {% data variables.copilot.copilot_cloud_agent_short %}s** for provider-specific capabilities. Third-party {% data variables.copilot.copilot_cloud_agent_short %}s are currently in preview.

To use Claude or Codex in the cloud, turn on support in your Copilot account settings. See [Managing policies for third-party {% data variables.copilot.copilot_cloud_agent_short %}s](https://docs.github.com/en/copilot/how-tos/manage-your-account/manage-policies#enabling-or-disabling-third-party-coding-agents-in-your-repositories). You don't need the provider's {% data variables.product.prodname_vscode_shortname %} extension for a cloud session.

### Start a cloud session

1. Open the {% data variables.copilot.chat_view %} and select **New Chat**.

1. Select **Cloud** from the **Session Target** control.

1. Choose the cloud provider and, when available, a custom agent and model.

1. Enter a prompt and submit it.

The session runs remotely and appears in the sessions list. Sessions that you create by assigning an issue or pull request to a {% data variables.copilot.copilot_cloud_agent_short %} on GitHub.com also appear in {% data variables.product.prodname_vscode_shortname %}.

You can also select a GitHub repository when you [start a session in the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md#start-an-agent-session), or [hand off an existing session](#hand-off-a-session) to the Cloud target. In a Copilot session, enter `/delegate` to continue the task in the cloud.

Cloud sessions use the tools, MCP servers, and models configured by the cloud service. They can't access {% data variables.product.prodname_vscode_shortname %} built-in tools or local runtime context.

</details>

## Hand off a session

Handoff continues ongoing work with a different agent configuration and carries the conversation history and context with it. A handoff can change the harness, execution environment, or agent role. Use handoff when another configuration is a better fit for the next part of the task.

For example, continue a Copilot session with Claude or Codex to use provider-specific capabilities, send a well-scoped task to the Cloud target for a pull request workflow, or move from the Plan agent to an implementation agent.

To hand off a session to another harness or execution environment:

1. Open the session.

1. In the chat input, open the **Session Target** dropdown.

1. Select the target that should continue the work, such as Copilot, Claude, Codex, or Cloud.

{% data variables.product.prodname_vscode_shortname %} carries the conversation history and context to the selected target. The tools, permissions, and models might change because each harness, execution environment, or agent role provides different capabilities.

To hand off a completed plan, select **Start Implementation**, and then choose an available implementation agent. Learn more about [planning with agents](/docs/agents/run/planning.md).

> [!TIP]
> In {% data variables.copilot.copilot_cli_short %}, enter `/delegate` to continue the work with a {% data variables.copilot.copilot_cloud_agent_short %}.

### Handoff compared to related actions

| Action | What it does |
|---|---|
| **Hand off** | Continues the work with a different harness, execution environment, or agent role and carries the conversation history and context with it. |
| **Fork a session** | Creates an independent session from a point in the conversation. Learn more about [forking sessions](/docs/agents/run/sessions/manage-sessions.md#fork-a-chat-session). |
| **Switch surfaces** | Opens the same session in the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) or [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md) without changing its harness or context. |

For background on how handoff works, see [Sessions and handoff](/docs/agents/concepts/sessions.md#hand-off-a-session).

## Related resources

* [Agent harness concepts](/docs/agents/concepts/agent-harnesses.md)
* [Manage agent sessions](/docs/agents/run/sessions/manage-sessions.md)
* [Approvals and permissions](/docs/agents/run/approvals.md)
