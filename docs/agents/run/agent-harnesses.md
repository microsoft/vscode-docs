---
ContentId: 5b1e6f94-2c73-4a80-9d15-7f3c8e2a6b41
DateApproved: 10/7/2026
MetaDescription: Choose an agent harness in {% data variables.product.prodname_vscode %} and configure sessions, permissions, and code isolation.
MetaSocialImage: ../../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- agents
- agent harness
- copilot harness
- session target
- claude
- codex
- "{% data variables.copilot.copilot_cloud_agent_short %}"
- worktree
---

# Choose and use an agent harness

Start with the [{% data variables.product.prodname_copilot_short %} harness](#use-the-copilot-harness) for day-to-day coding and agent tasks. Use it to work on your project and continue the same session in the {% data variables.copilot.chat_view %} or {% data variables.copilot.agents_window %}. Choose another harness when you need its specific tools or workflows, or delegate an independent change to a cloud agent that returns a pull request.

An agent harness coordinates tool calls, context, and code changes. {% data variables.product.prodname_vscode %} supports the {% data variables.product.prodname_copilot %}, {% data variables.product.prodname_anthropic_claude %}, and {% data variables.product.prodname_openai_codex %} harnesses, plus a Cloud target for available cloud agents.

Use the **Session Target** control to choose an available harness or the Cloud target. Each harness remains distinct, so tools, models, permissions, customizations, and change-review workflows can differ.

For the relationship between harnesses, language models, agent roles, and execution environments, see [Agent harnesses](/docs/agents/concepts/agent-harnesses.md).

## Understand the session controls

The controls in the chat input configure separate parts of the session. For your first coding task in a workspace, use these starting choices:

| Control | What it determines | Start with |
|---------|--------------------|------------|
| **Session Target** | Which agent implementation and capabilities the session uses | **Copilot** for a general coding task |
| **Agent** | Which instructions, tools, and behavior apply | **Agent** for implementation or **Plan** to review an approach first. Use **Ask** for questions when the selected target provides it. |
| **Language model** | How the agent reasons, how quickly it responds, and how it consumes AI credits | **Auto** when it is available |
| **Permissions** | Which actions require your confirmation | **Manual permissions** |
| **Code isolation** | Whether changes go into the current folder or a separate Git worktree | **Folder** for the guided quickstart or current uncommitted files |

Use **New Worktree** when you want changes separate from your active workspace and the task can start from committed Git state. Worktree sessions use **Allow all**, so choose **Folder** when you want manual approval prompts. A worktree isolates code changes but isn't a security boundary.

The models you can select depend on the harness and how you [access models](/docs/agent-customization/language-models.md), such as through a {% data variables.product.prodname_copilot %} subscription, another supported account, or your own API key. Changing the model or access source doesn't switch harnesses.

## Choose a session target

To change reasoning, speed, or model cost, you may first want to [choose a different model](/docs/agent-customization/language-models.md#change-the-model-for-chat) within the current harness when one is available. Changing the model does not switch harnesses or convert your project customizations to another format.

To decide whether another harness better fits your workflow, use these guidelines:

* Choose **Copilot** for day-to-day coding and agent tasks, whether you stay in your editor or continue elsewhere. The [agents quickstart](/docs/agents/quickstart.md) uses this option.
* Choose **Claude** or **Codex** when you already use that provider's agent workflow and want its supported project configuration and permission options while working in {% data variables.product.prodname_vscode_shortname %}. Check [Claude setup and capabilities](#claude-preview) or [Codex setup and capabilities](#codex) before switching.
* Choose **Cloud** for a well-scoped task that can run independently against a GitHub repository and return a pull request.

{% data variables.product.prodname_vscode_shortname %} provides common chat and session-management interfaces across targets. Available controls and workflows depend on the selected target. Your choice affects which tools and models the agent can use, which execution environments it supports, and how it applies code changes.

| Session target | Where tools run | Code access | Choose it for |
|----------------|-----------------|-------------|---------------|
| **Copilot** | On your machine, on a remote machine, or in a Dev Container | Current folder, an isolated Git worktree, or a Dev Container workspace | Day-to-day coding, with the option to continue work across supported interfaces |
| **Claude** | On your machine | Current folder or an isolated Git worktree | Use a familiar Claude agent workflow and its permission modes while reviewing changes in {% data variables.product.prodname_vscode_shortname %} |
| **Codex** | On your machine | Current folder or an isolated Git worktree | Use a familiar Codex workflow for interactive or background coding tasks in {% data variables.product.prodname_vscode_shortname %} |
| **Cloud** | On a provider's remote infrastructure | A GitHub repository and pull request | Independent tasks that don't need local editor context and benefit from team review |

**Cloud** is an execution target that runs on provider-managed infrastructure, not a background mode for a harness running on your machine or a connected host.

> [!NOTE]
> **For Local sessions:** The [Local harness](#local) works in your current workspace in the {% data variables.copilot.chat_view %} and has different tools, customization settings, and review controls. **Local** is a session-target name, not the only way to run an agent on your machine. Copilot, Claude, and Codex can also run on your machine.

Harness-specific customizations, including [hooks](/docs/agent-customization/hooks.md#choose-the-hook-implementation-for-your-session), follow the selected harness. Each harness defines its own hook implementation and supported schema.

Dev Container execution is available only in the desktop {% data variables.copilot.agents_window %}. Use the workspace picker to run a session inside your project's Dev Container, on your machine or an SSH, Tunnel, or WSL host. This selects the execution environment. Use the **Session Target** control separately to choose the harness. Dev Container sessions work directly in the container workspace and don't support **New Worktree**. Learn about requirements and how to [run an agent session in a Dev Container](/docs/agents/run/agents-window.md#run-a-session-in-a-dev-container).

<a name="use-the-copilot-harness"></a>

## Work with the {% data variables.product.prodname_copilot_short %} harness

Use the {% data variables.product.prodname_copilot_short %} harness to ask questions, plan changes, edit code, and run tests. The harness uses a shared runtime for core capabilities and more consistent behavior across {% data variables.product.prodname_vscode_shortname %}, {% data variables.copilot.copilot_cli %}, and the {% data variables.copilot.github_copilot_app %}.

* **Keep work going across interfaces**: open the same live session in the {% data variables.copilot.chat_view %} or {% data variables.copilot.agents_window %}. A task can continue after you close its project folder. {% data variables.product.prodname_vscode_shortname %} can also [discover and continue supported sessions created in {% data variables.copilot.copilot_cli %} and the {% data variables.copilot.github_copilot_app %}](/docs/agents/run/sessions/manage-sessions.md#view-sessions-from-other-applications). To continue a {% data variables.product.prodname_vscode_shortname %} {% data variables.product.prodname_copilot_short %} session in the terminal, use [**Resume in Terminal**](#use-copilot-cli-from-the-terminal).
* **Run where your code lives**: work with a project on your machine, on a connected remote machine, or inside a Dev Container. Workspace file edits and commands use the selected environment.
* **Reuse project guidance**: share coding conventions through [custom instructions](/docs/agent-customization/custom-instructions.md) and recurring workflows through [Agent Skills](/docs/agent-customization/agent-skills.md). For example, use the same repository skill to run your project's test workflow in {% data variables.product.prodname_vscode_shortname %} and {% data variables.copilot.copilot_cli_short %}.
* **Reuse supported hooks (Preview)**: {% data variables.product.prodname_copilot_short %} sessions use the [same SDK hook implementation](/docs/agent-customization/hooks.md#choose-the-hook-implementation-for-your-session) as {% data variables.copilot.copilot_cli_short %}. Check the supported events and tool payloads before reusing a hook.

For sessions running on your machine and managed by desktop {% data variables.product.prodname_vscode_shortname %}, keep the application running. Closing a project folder is different from quitting the application. Tools provided by a window also require that window to stay connected.

Tools, models, permissions, and customizations can differ between experiences. Using a shared runtime across products does not mean that all sessions or personal settings synchronize between them.

For more information, see [tool availability](/docs/agents/run/tools.md#manage-tool-availability-for-copilot), [reviewing changes](/docs/agents/run/review-code-edits.md), and [{% data variables.product.prodname_copilot_short %} setup and limitations](#copilot).

## Start a session

You select a session target when you start a session in the {% data variables.copilot.chat_view %} or the {% data variables.copilot.agents_window %}. To continue an existing task with a different configuration, see the available [handoff options](#hand-off-a-session).

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

AI agents can apply code changes to your workspace. To isolate code changes and avoid conflicts with your active workspace, you can choose to run sessions in a new [Git worktree](/docs/sourcecontrol/branches-worktrees.md#understanding-worktrees).

Code isolation controls where the agent applies file changes. The permission level controls which actions require your approval. Worktree isolation keeps changes out of your active workspace, but it does not restrict the commands or network access available to the agent.

| Choice | Choose it for | Considerations |
|--------|---------------|----------------|
| **New Worktree** | Parallel tasks that should not modify your active workspace | Starts from committed Git state and requires you to integrate the result |
| **Folder** | Small, interactive tasks that should use your current files and uncommitted changes | Agent edits appear immediately in your active workspace |

For a walkthrough that uses separate worktrees for two independent coding tasks, follow [Delegate two tasks without mixing their changes](/docs/agents/guides/delegate-two-tasks.md).

When you [start a session in the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md#start-an-agent-session), select **New Worktree** and choose the base branch to isolate the session. The base branch provides the initial contents of the new worktree and does not change the branch in your active workspace.

If you leave **New Worktree** unselected, the agent works directly on the code in the workspace. For a local Git repository with at least one branch, you can select an existing local branch to check out before the agent starts. Checking out a branch changes the branch in your active workspace and requires a clean working tree. Commit or stash your changes before you select another branch. The branch selection is not remembered for later sessions.

Sessions that you start in the {% data variables.copilot.chat_view %} always use the current workspace. **Local** sessions also always apply changes in the active workspace.

In {% data variables.product.prodname_vscode_shortname %} Insiders, `setting(sessions.useWorktree)` controls whether **New Worktree** is selected when you create your first workspace session. After you start a session, {% data variables.product.prodname_vscode_shortname %} remembers your isolation choice across workspaces and uses it instead of this setting.

![Screenshot of the New Worktree checkbox and base branch control in the {% data variables.copilot.agents_window %}.](../images/agent-harnesses/agents-window-new-worktree.png)

Worktree isolation requires a Git repository with at least one commit. A new worktree contains the committed files from the selected base branch. It does not automatically contain uncommitted tracked changes or untracked files from your primary worktree. Commit changes that the agent needs, or use folder isolation when the task depends on your current uncommitted state.

Git-ignored files, such as `.env` files and installed dependencies, are also absent by default. Use `setting(git.worktreeIncludeFiles)` to [copy ignored files into new worktrees](/docs/sourcecontrol/branches-worktrees.md#include-files-when-creating-a-worktree). For large ignored folders, `setting(git.worktreeSymlinkFolders)` (Experimental) can [symlink a folder instead](/docs/sourcecontrol/branches-worktrees.md#symlink-ignored-folders-when-creating-a-worktree). Changes an agent makes through the symlink affect the folder in the original checkout.

Worktree sessions use **Allow all** because their code changes are separate from your active workspace. Folder sessions offer the [permission levels](/docs/agents/run/approvals.md#permission-levels) supported by the selected harness. For operating system-level file system and network restrictions, configure [agent sandboxing](/docs/agents/run/agent-sandboxing.md).

<a name="configure-an-agent-harness"></a>

## Configure a harness or Cloud target

Expand a target to review its setup and capabilities.

<a name="copilot"></a>

<details>
<summary>Copilot</summary>

For a summary of the {% data variables.product.prodname_copilot_short %} harness and supported workflows, see [Work with the {% data variables.product.prodname_copilot_short %} harness](#use-the-copilot-harness).

### Setup and authentication

Copilot sessions use the same GitHub authentication context as chat in {% data variables.product.prodname_vscode_shortname %}. If you use a GitHub Enterprise account for Copilot, the session uses that account. For managed user accounts on GHE.com, complete the setup in [Using GitHub Copilot with an account on GHE.com](https://docs.github.com/en/copilot/managing-copilot/configure-personal-settings/using-github-copilot-with-an-account-on-ghecom).

<a name="prefer-copilot-for-new-editor-chat-sessions"></a>

### Enterprise hook configuration

Copilot sessions use the shared SDK hooks implementation and load Copilot Policy Hooks. For configuration requirements, see [enterprise hook configuration](/docs/enterprise/manage-ai-settings.md#use-the-sdk-harness-for-policy-hooks).

> [!NOTE]
> **For Local sessions:** SDK Policy Hooks are not loaded. Check [hook compatibility](/docs/agent-customization/hooks.md#migrate-hooks-between-harnesses) before reusing hooks with another harness.

### Permissions and approvals

The available [permission levels](/docs/agents/run/approvals.md#permission-levels) depend on the isolation mode:

* **Worktree**: the permission level is **Allow all** and can't be changed.
* **Folder**: select **Manual permissions** or **Allow all** from the permissions picker. To also use **Assisted permissions** `feature(assisted-permissions)`, turn on `setting(chat.assistedPermissions.enabled)`.

In Copilot sessions, **Autopilot** is an [agent mode](/docs/agents/run/approvals.md#how-autopilot-works) rather than a permission level.

### Provider-specific capabilities

* **Shell initialization** `feature(agent-host-shell-initialization)`: keep agent shell commands aligned with your development environment. In Copilot sessions running on your machine that use the SDK built-in shell tool, enable `setting(chat.agentHost.shellTool.initScript.enabled)` to load `~/.bashrc` on macOS and Linux or your PowerShell profiles on Windows before each command. With [Python Environments](/docs/python/environments.md#terminal-settings) installed and `setting(python-envs.terminal.autoActivationType)` set to `shellStartup`, the selected workspace environment is also activated. This does not apply to remote sessions or the custom terminal tool override.

* **Slash commands**: enter `/` in the chat input to view the slash commands available in a Copilot session. For example, use `/compact` to reduce conversation context, `/yolo` and `/autoApprove` to control [automatic tool approval](/docs/agents/run/approvals.md#allow-all-tools-globally), or [`/plugin`](/docs/agent-customization/agent-plugins.md#manage-plugins-with-slash-commands) to manage plugins and marketplaces.

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

Copilot sessions don't have access to every {% data variables.product.prodname_vscode_shortname %} built-in or extension-provided tool. Enabled client-side tools are available to the agent only while {% data variables.product.prodname_vscode_shortname %} is connected to the session, and you [manage which tools are available to Copilot](/docs/agents/run/tools.md#manage-tool-availability-for-copilot). Check [MCP configuration compatibility](/docs/agent-customization/mcp-servers.md#configure-the-mcpjson-file) before reusing an existing server configuration.

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
* **Bring your own key (BYOK)**: use a Claude API key or another supported Claude BYOK option. Usage is billed by your configured provider.

When both options are available, the model picker groups models by **Anthropic** and **Copilot**. The model you select determines the provider and billing method for the next turn. You can switch between BYOK-backed and Copilot-routed models in an existing Claude session.

<a name="use-claude-without-github-sign-in"></a>
<a name="use-claude-without-github-sign-in-experimental"></a>

To use Claude without signing in to GitHub _(Experimental)_, configure a Claude API key or another supported Claude BYOK option. For an Anthropic API key, set `ANTHROPIC_API_KEY` in your environment or in the `env` object in `~/.claude/settings.json`. Learn more about [Claude Code authentication](https://code.claude.com/docs/en/authentication).

Enable `setting(chat.agentHost.allowSignedOutWhenUsable)` to open the {% data variables.copilot.agents_window %} while signed out of GitHub. The model picker only shows models from your Claude BYOK configuration until you sign in. After you sign in to GitHub, Copilot-routed models are also available.

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

The Codex harness uses {% data variables.product.prodname_openai_codex %} for interactive and background coding tasks. You can use it through the OpenAI Codex extension or configure it directly in {% data variables.product.prodname_vscode_shortname %} with the experimental Agent Host integration. {% data variables.product.prodname_vscode_shortname %} provides session management, chat, and code review for both integrations.

### Setup and authentication

Codex is not listed by default. Complete one of these options before you select it. You don't need both:

* **Use the OpenAI Codex extension in the {% data variables.copilot.chat_view %}**: install and enable the [OpenAI Codex extension](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt).
* **Configure Codex directly in {% data variables.product.prodname_vscode_shortname %}** _(Experimental)_: enable `setting(chat.agentHost.codexAgent.enabled)`. This makes Codex available in the {% data variables.copilot.agents_window %} without the OpenAI Codex extension. To use this integration in the {% data variables.copilot.chat_view %}, also enable `setting(chat.editor.codex.preferAgentHost)` and restart {% data variables.product.prodname_vscode_shortname %} when prompted.

Only one Codex implementation appears in each window. When you select the directly configured integration for the {% data variables.copilot.chat_view %}, it replaces the Codex target from the OpenAI extension in that window.

The following authentication options and permission presets apply to the directly configured integration. For the extension-based integration, use the OpenAI Codex extension's documentation.

Codex supports two authentication and subscription options:

* **GitHub Copilot subscription**: sign in to GitHub to use Copilot-backed models. This option requires {% data variables.copilot.copilot_pro_plus_short %}.
* **ChatGPT subscription**: open the account menu and select **Sign in to ChatGPT**. A free ChatGPT account is sufficient.

When both accounts are signed in, the model picker groups models by **Copilot** and **ChatGPT**. Your selection determines which subscription is used, and {% data variables.product.prodname_vscode_shortname %} saves that provider with the session.

<a name="use-codex-without-github-sign-in"></a>
<a name="use-codex-without-github-sign-in-experimental"></a>

To use Codex without signing in to GitHub _(Experimental)_, sign in to ChatGPT and enable `setting(chat.agentHost.allowSignedOutWhenUsable)`. The desktop {% data variables.copilot.agents_window %} then shows ChatGPT-backed models while signed out. Copilot-backed models prompt you to sign in to GitHub, and the browser-based {% data variables.copilot.agents_window %} still requires GitHub sign-in.

### Permissions and approvals

Codex provides these approval presets:

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

Cloud sessions use the tools, MCP servers, and models configured by the cloud service. They can't access {% data variables.product.prodname_vscode_shortname %} built-in tools or local development context.

</details>

<a name="local"></a>

<details>
<summary>Local</summary>

If you select **Local**, the session works directly in your active workspace in the {% data variables.copilot.chat_view %}. It can use {% data variables.product.prodname_vscode_shortname %} built-in tools, extension-provided tools, MCP servers, and the models configured in {% data variables.product.prodname_vscode_shortname %}, including [bring your own key models](/docs/agent-customization/language-models.md#bring-your-own-language-model-key).

Local sessions have different [customization settings](/docs/agent-customization/custom-instructions.md) and [review controls](/docs/agents/run/review-code-edits.md#review-local-session-changes). For technical background, see [extension-host session behavior](/docs/agents/concepts/agent-host.md#behavior-on-the-extension-host).

### Choose a built-in agent role

Local sessions provide these built-in agent roles:

* **Ask**: asks questions and provides guidance without making changes to the code.
* **Agent**: autonomously plans and performs complex coding tasks, edits files, runs commands, and iterates on results.
* **Plan**: researches a task and creates a structured implementation plan before code changes. Learn more about [planning in a Local session](/docs/agents/run/planning.md#plan-in-a-local-session).

You can switch roles during a session from the agent picker.

</details>

## Hand off a session

Handoff continues ongoing work with a different agent configuration and carries the conversation history and context with it. A handoff can change the harness, execution environment, or agent role. Use handoff when another configuration is a better fit for the next part of the task.

For example, move from the Plan agent to an implementation agent, or continue a well-scoped task in the cloud. In a Copilot session, enter `/delegate` to continue the task with a cloud agent.

### Hand off from a Local session

**Local** sessions also support changing the session target for ongoing work. Copilot and Claude sessions, and Codex sessions using the [experimental integration](#codex), can receive these handoffs but don't show a **Session Target** dropdown once the session has started, whether they run on your machine or remotely.

To hand off a Local session to another harness or execution environment:

1. Open the session.

1. In the chat input, open the **Session Target** dropdown.

1. Select the target that should continue the work, such as Copilot, Claude, Codex, or Cloud.

{% data variables.product.prodname_vscode_shortname %} carries the conversation history and context to the selected target. The tools, permissions, and models might change because each harness, execution environment, or agent role provides different capabilities.

To implement a plan from the built-in **Plan** agent in a Local session, select **Start Implementation**. This switches to **Agent** in the current conversation and submits the implementation request. To continue in another supported session, open the dropdown next to **Start Implementation** and select an available **Continue in** destination. For the different controls in Local and {% data variables.product.prodname_copilot_short %} sessions, see [planning with agents](/docs/agents/run/planning.md).

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
