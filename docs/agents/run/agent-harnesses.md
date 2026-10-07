---
ContentId: 5b1e6f94-2c73-4a80-9d15-7f3c8e2a6b41
DateApproved: 10/7/2026
MetaDescription: Use the {% data variables.product.prodname_copilot_short %} harness in {% data variables.product.prodname_vscode %} and compare it with Local.
MetaSocialImage: ../../images/shared/github-copilot-social.png
Keywords:
- copilot
- ai
- agents
- agent harness
- copilot harness
- local harness
- session target
- claude
- codex
- "{% data variables.copilot.copilot_cloud_agent_short %}"
- worktree
---

# Choose and use an agent harness

Use the {% data variables.product.prodname_copilot_short %} harness for day-to-day coding on your machine, from asking questions and planning work to implementing and testing changes. Choose another harness when your task needs its specific capabilities or tools. This guide explains Copilot's benefits and helps you choose the tools, permissions, and working environment for your task.

An agent harness connects a language model to the instructions and tools it uses to complete your task. Use the **Session Target** control to choose an available harness, such as **Copilot**, **Claude**, **Codex**, or **Local**. Choose **Cloud** for a task that runs against a GitHub repository.

For the relationship between harnesses, language models, agent roles, and execution environments, see [Agent harnesses](/docs/agents/concepts/agent-harnesses.md).

<a name="use-the-copilot-harness"></a>

## Work with the {% data variables.product.prodname_copilot_short %} harness

You can use {% data variables.product.prodname_copilot_short %} entirely within your editor window. When you want to step away from a task or continue it elsewhere, you also have these options:

* **Keep work going**: close the project folder or the editor window where you started a session without stopping its work, as long as {% data variables.product.prodname_vscode_shortname %} remains running. Return to the session later to check progress and review changes.
* **Continue work across interfaces and applications**: use the same live session in the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) and [{% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md), with the same conversation and progress in both. You can also [open and continue supported local sessions from {% data variables.copilot.copilot_cli %} and the {% data variables.copilot.github_copilot_app %}](/docs/agents/run/sessions/manage-sessions.md#view-sessions-from-other-applications) in {% data variables.product.prodname_vscode_shortname %}, or [resume a Copilot session in {% data variables.copilot.copilot_cli_short %}](#use-copilot-cli-from-the-terminal).
* **Use a remote development environment**: [run sessions on another machine](/docs/agents/run/remote-agent-sessions.md) with the project's files and tools, and connect from the desktop or a browser to monitor and steer the work. The remote machine must remain running and accessible.
* **Reuse familiar workflows**: use supported [project instructions](/docs/agent-customization/custom-instructions.md) and [Agent Skills](/docs/agent-customization/agent-skills.md) across {% data variables.product.prodname_vscode_shortname %}, {% data variables.copilot.copilot_cli %}, and the {% data variables.copilot.github_copilot_app %}. For example, reuse a repository skill that describes how to run your project's tests.

> [!IMPORTANT]
> For sessions running on your machine, keep {% data variables.product.prodname_vscode_shortname %} running. Closing a folder is different from quitting the application. Tools supplied by an editor window are available only while that window remains connected to the session.

For parallel tasks that must not modify the same files, start separate sessions with [worktree isolation](#choose-code-isolation) in the {% data variables.copilot.agents_window %}. Separate conversations alone don't isolate code changes.

You can also reuse [supported hooks (Preview)](/docs/agent-customization/hooks.md#choose-the-hook-implementation-for-your-session) with {% data variables.copilot.copilot_cli_short %}.

Tools, models, permissions, and supported customizations can differ between experiences. Familiar workflows don't mean that all capabilities are identical or that personal settings and sessions automatically synchronize between products. See [{% data variables.product.prodname_copilot_short %} setup and capabilities](#copilot) and the [FAQ about working across {% data variables.product.prodname_copilot_short %} experiences](/docs/agents/agent-troubleshooting/faq.md#working-across-copilot-experiences).

<a name="choose-a-model-provider-and-harness"></a>

## Choose a model for your harness

Choose a harness for its tools and workflows, then choose a compatible model. You access models through a supported account, subscription, or configured model provider. This model source determines which credentials and billing apply, and might require a paid plan or usage-based billing.

{% data variables.product.prodname_copilot %} can provide compatible models within the **Copilot**, **Claude**, **Codex**, and **Local** harnesses when the harness is available and your account has access to those models. Signing in to {% data variables.product.prodname_copilot_short %} doesn't by itself make every harness available.

Each harness supports specific models and access options. For example, the Claude harness uses Claude-family models, accessed through {% data variables.product.prodname_copilot %} or an existing Claude configuration. Selecting a Claude model in the Copilot harness doesn't switch to the Claude harness. Selecting a different model source can change authentication and billing without changing the harness.

The model picker shows compatible, selectable models for your current harness and chat mode. Your account access, organization policies, configuration, and model visibility settings also affect the list. Learn more about [model access and harnesses](/docs/agents/concepts/language-models.md#model-providers-and-harnesses).

## Compare Copilot and Local

Both harnesses can work in the background while you use another chat, and both support multiple sessions. The distinction is not whether you watch the agent work. It is how sessions continue, which tools and customizations they support, and how you review changes.

| Workflow | Copilot | Local |
|----------|---------|-------|
| Continue work | Use the same session in the Chat view and Agents window, continue supported local sessions from {% data variables.copilot.copilot_cli %} and the {% data variables.copilot.github_copilot_app %}, or resume in {% data variables.copilot.copilot_cli_short %}. Keep {% data variables.product.prodname_vscode_shortname %} running for sessions it runs on your machine. | Work in the current editor window. Closing that window stops its running agent work. |
| Isolate code changes | Use the current workspace in the Chat view, or choose a folder or separate worktree in the Agents window. | Work directly in the current workspace. |
| Review edits | Edits are saved directly. Review diffs before you commit or integrate the changes. | Edits are saved and marked as pending so you can keep or undo them. |
| Use tools | Use Copilot's built-in tools and supported editor, extension, and MCP integrations. Tool selections persist in your user profile. | Use tools available in the editor, including built-in, extension, and MCP tools. Select tools for the request. |
| Choose models | Choose compatible models through {% data variables.product.prodname_copilot %} or the experimental [BYOK integration](/docs/agent-customization/language-models.md#bring-your-own-language-model-key). | Use compatible general chat models through {% data variables.product.prodname_copilot %} or configured model providers, including BYOK models. |
| Reuse customizations | Use supported project instructions, skills, custom agents, and Copilot hooks. Check supported formats and locations when reusing Local customizations. | Use Local customization formats and locations, including prompt files and user-profile customizations. |

Choose Local when a task depends on a tool, model integration, or customization that your Copilot session doesn't support. Selecting Copilot for a new session doesn't migrate an existing Local conversation.

For the details, see [tool availability](/docs/agents/run/tools.md#manage-tool-availability-for-copilot), [reviewing changes](/docs/agents/run/review-code-edits.md), and [customization locations](/docs/agent-customization/overview.md).

## Understand the session controls

The controls in the chat input configure separate parts of the session. For a first local coding task, use these starting choices:

| Control | What it determines | Start with |
|---------|--------------------|------------|
| **Session Target** | Which harness runs the session and where its tools operate | **Copilot** for a general coding task |
| **Agent** | Which instructions, tools, and behavior apply | **Agent** for implementation or **Plan** to review an approach first. Use **Ask** for questions when the selected target provides it. |
| **Language model** | How the agent reasons, how quickly it responds, and how it consumes AI credits | **Auto** when it is available |
| **Permissions** | Which actions require your confirmation | **Manual permissions** |
| **Code isolation** | Whether changes go into the current folder or a separate Git worktree | **Folder** for the guided quickstart or current uncommitted files |

Use **New Worktree** when you want changes separate from your active workspace and the task can start from committed Git state. Worktree sessions use **Allow all**, so choose **Folder** when you want manual approval prompts. A worktree isolates code changes but isn't a security boundary.

## Choose a session target

Start with **Copilot** for work on your machine. Choose another harness when you need its specific functionality or tools. To change reasoning, speed, or model cost, [choose a different model](/docs/agent-customization/language-models.md#change-the-model-for-chat) within your harness when the model is available. Changing the model does not switch harnesses or convert your project customizations to another format.

Use these guidelines to choose a target:

* Choose **Copilot** for day-to-day coding and agent tasks. [Continue supported sessions across {% data variables.product.prodname_vscode_shortname %}, {% data variables.copilot.copilot_cli %}, and the {% data variables.copilot.github_copilot_app %}](#use-the-copilot-harness) to use the interface that suits your task without starting the conversation over. The [agents quickstart](/docs/agents/quickstart.md) uses this harness.
* Choose **Claude** or **Codex** when your task needs those harnesses' specific tools, project configuration, or permission options. Check [Claude setup and capabilities](#claude-preview) or [Codex setup and capabilities](#codex) before switching.
* Choose **Cloud** for a well-scoped task that can run independently against a GitHub repository and return a pull request.
* Choose **Local** when the task depends on an editor integration or customization that your Copilot session doesn't support. See [Compare Copilot and Local](#compare-copilot-and-local).

Most targets share the same chat and session-management experience in {% data variables.product.prodname_vscode_shortname %}. Your choice primarily affects where the agent runs, which tools and models it can use, and how it applies code changes.

| Session target | Where tools run | Code access | Choose it for |
|----------------|-----------------|-------------|---------------|
| **Copilot** | On your machine, a connected remote machine, or in a supported Dev Container | Current folder, an isolated Git worktree, or a Dev Container workspace | Day-to-day coding, with the option to continue work across interfaces |
| **Claude** | On your machine | Current folder or an isolated Git worktree | Tasks that need Claude-specific tools, project configuration, or permissions |
| **Codex** | On your machine | Current folder or an isolated Git worktree | Tasks that need Codex-specific tools or workflows |
| **Cloud** | On a provider's remote infrastructure | A GitHub repository and pull request | Independent tasks that don't need local editor context and benefit from team review |
| **Local** | In the current workspace, including a Remote Development workspace | Current workspace | Tasks that depend on an editor integration or customization not supported by your Copilot session |

**Local** is the name of one harness. Copilot, Claude, and Codex can also run locally. **Cloud** is an execution target that groups the cloud agents available to you.

Customizations, including [hooks](/docs/agent-customization/hooks.md#choose-the-hook-implementation-for-your-session), follow the selected harness. A shared chat interface does not mean that every harness uses the same hook format.

Dev Container execution is available only in the desktop {% data variables.copilot.agents_window %}. Use the workspace picker to start a session in a local project's Dev Container or one on an SSH, Tunnel, or WSL host. This selects the execution environment. Use the **Session Target** control separately to choose an available harness. Dev Container sessions work directly in the container workspace and don't support **New Worktree**. Learn about requirements and how to [run an agent session in a Dev Container](/docs/agents/run/agents-window.md#run-a-session-in-a-dev-container). `feature(agent-host-dev-containers)`

## Start a session

You can select a session target when you start a session in the {% data variables.copilot.chat_view %} or the {% data variables.copilot.agents_window %}. Changing the target for an ongoing Local session is a [handoff](#hand-off-a-session), which carries the conversation history and context to the new target.

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

For a walkthrough that uses separate worktrees for two independent coding tasks, follow [Delegate two tasks without mixing their changes](/docs/agents/guides/delegate-two-tasks.md).

When you [start a session in the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md#start-an-agent-session), select **New Worktree** and choose the base branch to isolate the session. The base branch provides the initial contents of the new worktree and does not change the branch in your active workspace.

If you leave **New Worktree** unselected, the agent works directly on the code in the workspace. For a local Git repository with at least one branch, you can select an existing local branch to check out before the agent starts. Checking out a branch changes the branch in your active workspace and requires a clean working tree. Commit or stash your changes before you select another branch. The branch selection is not remembered for later sessions.

Sessions that you start in the {% data variables.copilot.chat_view %} always use the current workspace.

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

For session continuity, remote work, and reusable workflows, see [Work with the {% data variables.product.prodname_copilot_short %} harness](#use-the-copilot-harness).

### Setup and authentication

Copilot sessions use the same GitHub authentication context as chat in {% data variables.product.prodname_vscode_shortname %}. If you use a GitHub Enterprise account for Copilot, the session uses that account. For managed user accounts on GHE.com, complete the setup in [Using GitHub Copilot with an account on GHE.com](https://docs.github.com/en/copilot/managing-copilot/configure-personal-settings/using-github-copilot-with-an-account-on-ghecom).

### Prefer Copilot for new editor-chat sessions

Enable `setting(chat.editor.preferCopilotHarness)` _(Experimental)_ to use the {% data variables.product.prodname_copilot_short %} harness when Local would otherwise be selected for a new editor-chat session. It does not migrate existing sessions or change explicit or remembered Claude and Codex selections.

Enterprise admins can enforce the preference with the `ChatEditorPreferCopilotHarness` device policy, available from version 1.134. Copilot sessions load Copilot Policy Hooks. Local sessions do not load these hooks. See [migrate hooks between harnesses](/docs/agent-customization/hooks.md#migrate-hooks-between-harnesses) and [enterprise hook configuration](/docs/enterprise/manage-ai-settings.md#use-the-sdk-harness-for-policy-hooks).

### Permissions and approvals

The available [permission levels](/docs/agents/run/approvals.md#permission-levels) depend on the isolation mode:

* **Worktree**: the permission level is **Allow all** and can't be changed.
* **Folder**: select **Manual permissions** or **Allow all** from the permissions picker. To also use **Assisted permissions** `feature(assisted-permissions)`, turn on `setting(chat.assistedPermissions.enabled)`.

In Copilot sessions, **Autopilot** is an [agent mode](/docs/agents/run/approvals.md#how-autopilot-works) rather than a permission level.

### Provider-specific capabilities

* **Shell initialization** `feature(agent-host-shell-initialization)`: keep agent shell commands aligned with your development environment. In Copilot sessions on your machine, enable `setting(chat.agentHost.shellTool.initScript.enabled)` to load `~/.bashrc` on macOS and Linux or your PowerShell profiles on Windows before each command run by Copilot's built-in shell tool. With [Python Environments](/docs/python/environments.md#terminal-settings) installed and `setting(python-envs.terminal.autoActivationType)` set to `shellStartup`, the selected workspace environment is also activated. This does not apply to remote sessions or other terminal tools.

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

Copilot sessions don't have access to every {% data variables.product.prodname_vscode_shortname %} built-in or extension-provided tool. Tools supplied by an editor window are available only while that window remains connected to the session. You can [manage which tools are available to Copilot](/docs/agents/run/tools.md#manage-tool-availability-for-copilot).

MCP configuration also needs to be compatible with the selected harness. For example, server configurations that require interactive input aren't forwarded from {% data variables.product.prodname_vscode_shortname %} to Copilot. See [MCP configuration locations and compatibility](/docs/agent-customization/mcp-servers.md#configure-the-mcpjson-file) before reusing an existing configuration.

</details>

<a name="claude-preview"></a>
<a name="third-party-agents"></a>

<details>
<summary>Claude</summary>

Claude sessions provide Anthropic's agent workflow for autonomous work in your workspace, with session management, chat, and code review in {% data variables.product.prodname_vscode_shortname %}.

### Setup and authentication

Claude support is enabled by default. Turn it on or off with `setting(chat.agentHost.claudeAgent.enabled)` _(Experimental)_.

Claude supports these model-access sources:

* **GitHub Copilot subscription**: sign in to GitHub to use Copilot-routed models. Usage is billed through your Copilot subscription.
* **Existing Claude configuration**: use a supported Claude account or API key configuration. Authentication and billing follow that configuration.

Both sources provide compatible Claude-family models, not the full model catalog available through your {% data variables.product.prodname_copilot_short %} plan.

When both sources are available, the model picker groups models by **Anthropic** and **Copilot**. The **Anthropic** group uses your existing Claude configuration, which determines how usage is billed. You can switch model sources in an existing Claude session without changing the harness.

<a name="use-claude-without-github-sign-in"></a>
<a name="use-claude-without-github-sign-in-experimental"></a>

To use Claude without signing in to GitHub _(Experimental)_, use a supported Claude account or API key configuration. For an Anthropic API key, set `ANTHROPIC_API_KEY` in your environment or in the `env` object in `~/.claude/settings.json`. Learn more about [Claude Code authentication](https://code.claude.com/docs/en/authentication).

Enable `setting(chat.agentHost.allowSignedOutWhenUsable)` to open the {% data variables.copilot.agents_window %} while signed out of GitHub. The model picker shows models available through your existing Claude configuration. After you sign in to GitHub, compatible Copilot-routed models can also appear, depending on your account access.

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

The Codex harness uses OpenAI Codex for interactive and background coding tasks. You can use the OpenAI Codex extension or the experimental built-in integration. Both provide session management, chat, and code review in {% data variables.product.prodname_vscode_shortname %}.

### Setup and authentication

Codex is not listed by default. Complete one of these options before you select it. You don't need both:

* **Use the OpenAI Codex extension in the {% data variables.copilot.chat_view %}**: install and enable the [OpenAI Codex extension](https://marketplace.visualstudio.com/items?itemName=openai.chatgpt).
* **Use Codex in the {% data variables.copilot.agents_window %}** _(Experimental)_: enable `setting(chat.agentHost.codexAgent.enabled)`. To also use this integration in the {% data variables.copilot.chat_view %}, enable `setting(chat.editor.codex.preferAgentHost)` and restart {% data variables.product.prodname_vscode_shortname %} when prompted.

Only one Codex integration appears in each window. Choosing the built-in integration in the {% data variables.copilot.chat_view %} replaces the Codex target from the OpenAI extension in that window.

The built-in Codex integration supports these model-access sources:

* **GitHub Copilot subscription**: sign in to GitHub to use compatible Copilot-backed models. Availability depends on your Copilot plan and organization policies.
* **ChatGPT account**: open the account menu and select **Sign in to ChatGPT**. Model access depends on your ChatGPT plan.

When both sources are available, the model picker groups models by **Copilot** and **ChatGPT**. Your selection determines which account is used, and {% data variables.product.prodname_vscode_shortname %} saves that model source with the session. Changing the source doesn't change the Codex harness.

<a name="use-codex-without-github-sign-in"></a>
<a name="use-codex-without-github-sign-in-experimental"></a>

To use Codex without signing in to GitHub _(Experimental)_, sign in to ChatGPT and enable `setting(chat.agentHost.allowSignedOutWhenUsable)`. The desktop {% data variables.copilot.agents_window %} then shows ChatGPT-backed models while signed out. Copilot-backed models prompt you to sign in to GitHub, and the browser-based {% data variables.copilot.agents_window %} still requires GitHub sign-in.

### Permissions and approvals

The built-in Codex integration provides these approval presets:

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

<a name="local"></a>

<details>
<summary>Local</summary>

The Local harness works directly in your active workspace and uses the tools and models available in your editor window. These include {% data variables.product.prodname_vscode_shortname %} built-in tools, extension-provided tools, MCP servers, and [bring your own key models](/docs/agent-customization/language-models.md#bring-your-own-language-model-key).

Choose Local when your task depends on an integration or customization that isn't available in the Copilot harness. Both harnesses support interactive work, so compare their [tools and workflows](#compare-copilot-and-local) rather than choosing based on whether you want to watch the agent work.

### Choose a built-in agent role

Local sessions provide these built-in agent roles:

* **Ask**: asks questions and provides guidance without making changes to the code.
* **Agent**: autonomously plans and performs complex coding tasks, edits files, runs commands, and iterates on results.
* **Plan**: researches a task and creates a structured implementation plan before code changes. Learn more about [planning in a Local session](/docs/agents/run/planning.md#plan-in-a-local-session).

You can switch roles during a session from the agent picker.

</details>

## Hand off a session

Handoff continues ongoing work with a different agent configuration and carries the conversation history and context with it. A handoff can change the harness, execution environment, or agent role. Use handoff when another configuration is a better fit for the next part of the task.

For example, continue a Local session with Copilot, Claude, or Codex to use that harness's capabilities, send a well-scoped task to the Cloud target for a pull request workflow, or move from the Plan agent to an implementation agent.

The **Session Target** dropdown for switching an existing session is available only in Local sessions. Other harnesses remain available as destinations. Opening the same Copilot session in another window is not a handoff and doesn't change its harness.

To hand off a session to another harness or execution environment:

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
