---
ContentId: 5b1e6f94-2c73-4a80-9d15-7f3c8e2a6b41
DateApproved: 7/31/2026
MetaDescription: Choose, use, and hand off between Local, Copilot, Claude, Codex, and {% data variables.copilot.copilot_cloud_agent_short %} harnesses in {% data variables.product.prodname_vscode_shortname %}, including isolation and permissions.
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

An agent harness coordinates an agent session, including tool calls, context, and code changes. In {% data variables.product.prodname_vscode %}, you choose an agent harness and where it runs with the **Session Target** control. This article helps you choose a harness and covers the capabilities that are specific to Local, Copilot, Claude, Codex, and cloud sessions.

For the relationship between harnesses, language models, agent roles, and execution environments, see [Agent harnesses](/docs/agents/concepts/agent-harnesses.md).

## Compare agent harnesses

Most harnesses share the same chat and session-management experience in {% data variables.product.prodname_vscode_shortname %}. Your choice primarily affects where the agent runs, which tools and models it can use, and how it applies code changes.

| Session target | Where it runs | Code access | Choose it for |
|----------------|---------------|-------------|---------------|
| **Local** | In the {% data variables.product.prodname_vscode_shortname %} extension host on your machine | Current workspace | Interactive work that needs {% data variables.product.prodname_vscode_shortname %} tools, extension tools, or any model configured in {% data variables.product.prodname_vscode_shortname %} |
| **Copilot** | On the Agent Host on your machine | Current folder or an isolated Git worktree | General coding tasks with the {% data variables.copilot.copilot_sdk_short %} and Copilot-specific capabilities |
| **Claude** | On your machine | Current folder or an isolated Git worktree | Anthropic's agent capabilities, slash commands, and permission modes |
| **Codex** | On your machine | Current folder or an isolated Git worktree | OpenAI's Codex capabilities for interactive or background work |
| **Cloud** | On the provider's remote infrastructure | A GitHub repository and pull request | Well-scoped tasks that can run independently and benefit from team review |

## Select an agent harness

You can select an agent harness when you start a new session in the {% data variables.copilot.chat_view %} or the {% data variables.copilot.agents_window %}. When you change the agent harness for an ongoing session, {% data variables.product.prodname_vscode_shortname %} considers this a [handoff](#hand-off-a-session) and carries the conversation history and context to the new harness.

To select an agent harness:

1. Open the {% data variables.copilot.chat_view %} (`kb(workbench.action.chat.open)`) or {% data variables.copilot.agents_window %}

1. Select **New Chat** (`+`)

1. Open the **Session Target** control and choose from the available agent harnesses.

    ![Screenshot of the Session Target control in the {% data variables.copilot.agents_window %}.](../images/agent-harnesses/agents-window-session-target.png)

1. Depending on the selected harness, other options for language model, isolation mode, or custom agents are available.

Learn more about [creating and managing sessions](/docs/agents/run/sessions/manage-sessions.md).

## Choose code isolation

Agent sessions that run on your machine (local, Copilot, Claude, and Codex) can make changes directly to your codebase or in an isolated Git worktree. You can choose the isolation mode when you start a new session in the {% data variables.copilot.chat_view %} or the {% data variables.copilot.agents_window %}.

Copilot, Claude, and Codex sessions that run on your machine can work in your current folder or a new Git worktree.

| Choice | Where changes go | Choose it for | Considerations |
|--------|------------------|---------------|----------------|
| **New Worktree** | A new branch and [worktree](/docs/sourcecontrol/branches-worktrees.md#understanding-worktrees) | Parallel tasks that should not modify your active workspace | Starts from committed Git state and requires you to integrate the result |
| **Folder** | Your current folder | Small, interactive tasks that should use your current files and uncommitted changes | Agent edits appear immediately in your active workspace |

When you [start a session in the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md#start-an-agent-session), select **New Worktree** and choose the base branch to isolate the session. If you leave **New Worktree** unselected, the agent works directly on the code in the workspace. Sessions that you start in the {% data variables.copilot.chat_view %} always use the current workspace.

![Screenshot of the New Worktree checkbox and base branch control in the {% data variables.copilot.agents_window %}.](../images/agent-harnesses/agents-window-new-worktree.png)

Worktree isolation requires a Git repository with at least one commit. A new worktree contains the committed files from the selected base branch. It does not automatically contain uncommitted tracked changes or untracked files from your primary worktree. Commit changes that the agent needs, or use folder isolation when the task depends on your current uncommitted state.

Git-ignored files, such as `.env` files and installed dependencies, are also absent by default. Use `setting(git.worktreeIncludeFiles)` to specify ignored files and folders that {% data variables.product.prodname_vscode_shortname %} should copy into new worktrees. Learn more about [including files in a worktree](/docs/sourcecontrol/branches-worktrees.md#include-files-when-creating-a-worktree).

Worktree sessions use **Bypass Approvals** because their code changes are separate from your active workspace. Folder sessions offer the [permission levels](/docs/agents/run/approvals.md#permission-levels) supported by the selected harness. Worktree isolation does not restrict commands, network access, or access outside the worktree. For those protections, configure [agent sandboxing](/docs/agents/concepts/trust-and-safety.md#agent-sandboxing).

## Use an agent harness

{% tabs id="agent-harness" %}
{% tab label="Local" %}

<a name="local"></a>

The Local harness runs interactively in the {% data variables.product.prodname_vscode_shortname %} extension host and works directly in your current workspace. It can use {% data variables.product.prodname_vscode_shortname %} built-in tools, extension-provided tools, MCP servers, and the models configured in {% data variables.product.prodname_vscode_shortname %}, including [bring your own key models](/docs/agent-customization/language-models.md#bring-your-own-language-model-key).

Choose Local for interactive tasks that need immediate feedback or access to editor context, such as diagnostics, test results, terminal output, or selections.

### Choose a built-in agent role

Local sessions provide these built-in agent roles:

* **Agent**: autonomously plans and performs complex coding tasks, edits files, runs commands, and iterates on results.
* **Plan**: researches a task and creates a structured implementation plan before code changes. Learn more about [planning with agents](/docs/agents/run/planning.md).

You can switch roles during a session from the agent picker. For specialized workflows, [create a custom agent](/docs/agent-customization/custom-agents.md).

{% /tab %}
{% tab label="Copilot" %}

<a name="copilot"></a>

The Copilot harness is powered by the [{% data variables.copilot.copilot_sdk_short %}](https://www.npmjs.com/package/@github/copilot-sdk) and runs on the [Agent Host](/docs/agents/concepts/agent-host.md). The Agent Host owns the session independently of the windows that display it, so a session can continue in the background, appear in multiple windows, and contain multiple chats.

Copilot sessions use the same GitHub authentication context as chat in {% data variables.product.prodname_vscode_shortname %}. If you use a GitHub Enterprise account for Copilot, the session uses that account. For managed user accounts on GHE.com, complete the setup in [Using GitHub Copilot with an account on GHE.com](https://docs.github.com/en/copilot/managing-copilot/configure-personal-settings/using-github-copilot-with-an-account-on-ghecom).

Copilot supports slash commands for common session operations. Enter `/` in the chat input to view available commands. For example, use `/compact` to reduce conversation context, `/research` to start deep research, or `/yolo` and `/autoApprove` to control [automatic tool approval](/docs/agents/run/approvals.md#frequently-asked-questions).

### Permissions and approvals

The available [permission levels](/docs/agents/run/approvals.md#permission-levels) depend on the isolation mode:

* **Worktree**: the permission level is **Bypass Approvals** and can't be changed.
* **Folder**: select **Default Approvals** or **Bypass Approvals** from the permissions picker. To also use **Assisted permissions**, turn on `setting(chat.assistedPermissions.enabled)`.

Because Copilot sessions run on the Agent Host, **Autopilot** is an [agent mode](/docs/agents/run/approvals.md#how-autopilot-works) rather than a permission level.

### Remote control Copilot sessions

Use `"/remote on"` to monitor and steer a running Copilot session from GitHub.com or the GitHub Mobile app. Session history, tool activity, status, approvals, and questions stay synchronized between {% data variables.product.prodname_vscode_shortname %} and GitHub.

To use remote control:

1. Start or resume a Copilot session.

1. Enter `"/remote on"` in the chat input.

1. Select **Open on GitHub** or scan the QR code to open the session on another device.

Run `"/remote"` to check the current status, or enter `"/remote off"` to stop sharing the session with GitHub.

Remote control requires GitHub authentication and a workspace that maps to a GitHub repository. To turn off remote control support in {% data variables.product.prodname_vscode_shortname %}, turn off `setting(github.copilot.chat.cli.remote.enabled)`.

### Use custom agents with Copilot

To use a [custom agent](/docs/agent-customization/custom-agents.md) in a Copilot session:

1. Create a workspace custom agent by running **Chat: New Custom Agent** from the Command Palette (`kb(workbench.action.showCommands)`).

1. Start a Copilot session and select the custom agent from the agent picker.

Only custom agents defined in the workspace are currently available to Copilot sessions.

### Run deep research with the research agent

> [!NOTE]
> The research agent is in preview and is available only in Copilot sessions in {% data variables.product.prodname_vscode_shortname %} Insiders.

The research agent investigates a topic and produces a detailed Markdown report with citations. It has read-only access and gathers information from your codebase, relevant GitHub repositories, and the web.

Enter `/research` followed by a topic:

```prompt
/research How does the authentication flow work in this codebase?
```

For research that feeds into an implementation plan, use the [Plan agent](/docs/agents/run/planning.md). For focused research that returns results to the current conversation, use [subagents](/docs/agents/run/subagents.md).

Learn more about [researching with {% data variables.copilot.copilot_cli %}](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/research).

### Copilot harness limitations

Copilot sessions don't have access to every {% data variables.product.prodname_vscode_shortname %} built-in or extension-provided tool. Enabled client-side tools are available to the agent only while {% data variables.product.prodname_vscode_shortname %} is connected to the session, and you manage which tools are enabled from [Manage tools for the Copilot harness](/docs/agent-customization/tools.md). Copilot sessions use the models available to the Copilot harness and can currently access only local MCP servers that don't require authentication.

{% /tab %}
{% tab label="Claude" %}

<a name="third-party-agents"></a>

Claude sessions use Anthropic's Claude Agent SDK and can run autonomously on your workspace. {% data variables.product.prodname_vscode_shortname %} integrates the harness through its SDK while keeping session management, chat, and code review in {% data variables.product.prodname_vscode_shortname %}. Turn support on or off with `setting(github.copilot.chat.claudeAgent.enabled)`.

Claude supports two authentication and billing options:

* **GitHub Copilot subscription**: sign in to GitHub to use Copilot-routed models. Usage is billed through your Copilot subscription.
* **Anthropic credentials**: use an existing Claude configuration with an Anthropic API key or Claude Code OAuth token. Usage is billed by Anthropic.

#### Choose a model provider

When both authentication methods are available, the model picker groups models by **Anthropic** and **Copilot**. The model you select determines the provider and billing method for the next turn. You can switch between Anthropic-native and Copilot-routed models in an existing Claude session.

<a name="use-claude-without-github-sign-in"></a>

#### Use Claude without GitHub sign-in (Experimental)

To use Claude without signing in to GitHub, configure your Anthropic credentials in the environment or in the `env` object in `~/.claude/settings.json`. For example:

```json
{
  "env": {
    "ANTHROPIC_API_KEY": "<your-key>"
  }
}
```

You can also use the `CLAUDE_CODE_OAUTH_TOKEN` environment variable with a token created by the `claude setup-token` command. Learn more about [Claude Code authentication](https://code.claude.com/docs/en/authentication).

Enable `setting(chat.agentHost.allowSignedOutWhenUsable)` to open the Agents window while signed out of GitHub. The model picker only shows Anthropic-native models until you sign in. After you sign in to GitHub, Copilot-routed models are also available.

Claude provides provider-specific slash commands. Enter `/` in the chat input to view the commands available in your session.

| Slash command | Description |
|---------------|-------------|
| `/agents` | Create and manage specialized Claude agents. |
| `/hooks` | Configure scripts that run at key points in the session lifecycle. |
| `/memory` | Open and edit `CLAUDE.md` memory files. |
| `/init` | Create a `CLAUDE.md` memory file for the project. |
| `/pr-comments` | Get comments from a pull request. |
| `/review` | Review changes in a pull request. |
| `/security-review` | Review pending changes for security issues. |

Claude supports these permission modes:

* **Edit automatically**: apply changes without asking for approval.
* **Request approval**: ask before applying changes.
* **Plan**: outline the approach before implementation.

> [!CAUTION]
> The `setting(github.copilot.chat.claudeAgent.allowDangerouslySkipPermissions)` setting bypasses all permission checks. Use it only in an isolated sandbox environment without internet access.

Learn more about [Claude subagents](https://code.claude.com/docs/en/sub-agents) and [Claude hooks](https://code.claude.com/docs/en/hooks).

{% /tab %}
{% tab label="Codex" %}

The Codex harness uses OpenAI Codex for interactive and background coding tasks. {% data variables.product.prodname_vscode_shortname %} keeps session management, chat, and code review in {% data variables.product.prodname_vscode_shortname %}. Install the [OpenAI Codex extension](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt) to use local Codex sessions. Authentication through a Copilot subscription requires Copilot Pro+.

Codex sessions run through the OpenAI Codex extension by default. Running Codex on the Agent Host is experimental and requires `setting(chat.agentHost.codexAgent.enabled)` and `setting(chat.editor.codex.preferAgentHost)`.

{% /tab %}
{% tab label="Cloud" %}

<a name="cloud"></a>

Cloud sessions run on remote infrastructure and work with a GitHub repository. The agent implements the task on a branch and opens a pull request for review. Choose Cloud for well-scoped tasks that can run without access to your local editor context, terminal output, or extension-provided tools.

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

You can also select a GitHub repository when you [start a session in the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md#start-an-agent-session), or [hand off an existing session](#hand-off-a-session) to a cloud harness. In a Copilot session, enter `/delegate` to continue the task in the cloud.

Cloud sessions use the tools, MCP servers, and models configured by the cloud service. They can't access {% data variables.product.prodname_vscode_shortname %} built-in tools or local runtime context.

{% /tab %}
{% /tabs %}

## Use {% data variables.copilot.copilot_cli_short %} from the terminal

{% data variables.product.prodname_vscode_shortname %} includes a **{% data variables.copilot.copilot_cli %}** terminal profile. Open it from the Terminal profile dropdown, run **Chat: New {% data variables.copilot.copilot_cli_short %} Session** from the Command Palette (`kb(workbench.action.showCommands)`), or enter `copilot` in an integrated terminal.

When you start a {% data variables.copilot.copilot_cli_short %} session in the terminal, {% data variables.product.prodname_vscode_shortname %} detects it and adds it to the sessions list. Right-click an existing Copilot session and select **Resume in Terminal** to continue it from the terminal.

## Hand off a session

Handoff changes the target for an ongoing session and carries the conversation history and context to the new target. Use handoff when another harness or execution environment is a better fit for the next part of the task.

For example, continue a Copilot session with Claude or Codex to use provider-specific capabilities, send a well-scoped task to a cloud harness for a pull request workflow, or move from the Plan agent to an implementation agent.

To hand off an ongoing session:

1. Open the session.

1. In the chat input, open the **Session Target** dropdown.

1. Select the target that should continue the work, such as Copilot, Claude, Codex, or Cloud.

{% data variables.product.prodname_vscode_shortname %} carries the conversation history and context to the selected target. The tools, permissions, and models might change because each target provides different capabilities.

> [!TIP]
> In {% data variables.copilot.copilot_cli_short %}, enter `/delegate` to continue the work with a {% data variables.copilot.copilot_cloud_agent_short %}.

### Hand off a plan to implementation

The [Plan agent](/docs/agents/run/planning.md) focuses on researching a task and creating a plan without changing code. After you review the plan:

1. Select **Start Implementation**.

1. Choose an available implementation agent.

The implementation agent receives the plan and conversation context and starts implementing it.

### Handoff compared to related actions

| Action | What it does |
|---|---|
| **Hand off** | Changes the session target and carries the conversation history and context to the new target. |
| **Fork a session** | Creates an independent session from a point in the conversation. Learn more about [forking sessions](/docs/agents/run/sessions/manage-sessions.md#fork-a-chat-session). |
| **Switch surfaces** | Opens the same session in the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) or [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md) without changing its target or context. |

For background on how handoff works, see [Sessions and handoff](/docs/agents/concepts/sessions.md#hand-off-a-session).

## Related resources

* [Agent harness concepts](/docs/agents/concepts/agent-harnesses.md)
* [Manage agent sessions](/docs/agents/run/sessions/manage-sessions.md)
* [Approvals and permissions](/docs/agents/run/approvals.md)
* [Agent Host architecture](/docs/agents/concepts/agent-host.md)
