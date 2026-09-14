---
ContentId: b3e7a1d4-5f2c-4e9a-8b6d-1c0f3a2e5d47
DateApproved: 9/9/2026
MetaDescription: Run parallel agent sessions, review changes, and finish pull requests in the {% data variables.copilot.agents_window %}.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Use the {% data variables.copilot.agents_window %} (Preview)

The {% data variables.copilot.agents_window %} is a dedicated, agent-first {% data variables.product.prodname_vscode %} window for assigning high-level tasks and tracking agent sessions across workspaces.

In this article, you learn how to open the {% data variables.copilot.agents_window %} and start, monitor, review, and finish agent sessions across your projects. To compare it with the {% data variables.copilot.chat_view %} and other interfaces, see [Ways to work with agents](/docs/agents/overview.md#ways-to-work-with-agents). For conversation controls shared across chat surfaces, see [Use chat in {% data variables.product.prodname_vscode_shortname %}](/docs/chat/chat-overview.md).

<!-- <video src="../images/agents-window/agents-demo-20260510.mp4" title="Video showing the {% data variables.copilot.agents_window %} experience in {% data variables.product.prodname_vscode_shortname %} Insiders." controls></video> -->

> [!NOTE]
> The {% data variables.copilot.agents_window %} is currently in preview. Share feedback by [filing an issue on GitHub](https://github.com/microsoft/vscode/issues), or browse [existing {% data variables.copilot.agents_window %} issues](https://github.com/microsoft/vscode/issues?q=state%3Aopen%20label%3A%22agents-window%22).

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with agents">
Follow a hands-on tutorial to build an app with AI agents in {% data variables.product.prodname_vscode_shortname %}.

* [Start agentic coding tutorial](/docs/agents/agents-tutorial.md)

</div>

## Prerequisites

* {% data variables.product.prodname_vscode %} installed. [Download {% data variables.product.prodname_vscode_shortname %}](/download).
* One of the following authentication options:
  * Access to GitHub Copilot. Follow the steps in [Set up GitHub Copilot in {% data variables.product.prodname_vscode_shortname %}](/docs/setup/copilot.md) to sign in and activate your subscription.
  * An [existing Claude configuration](/docs/agents/run/agent-harnesses.md#use-claude-without-github-sign-in-experimental) for the experimental signed-out experience.
  * An [existing ChatGPT sign-in for Codex](/docs/agents/run/agent-harnesses.md#use-codex-without-github-sign-in-experimental) for the experimental signed-out experience.
  * A [BYOK model](/docs/agent-customization/language-models.md#bring-your-own-language-model-key) configured for Agent Host sessions.

## Open the {% data variables.copilot.agents_window %}

The {% data variables.copilot.agents_window %} opens as a dedicated {% data variables.product.prodname_vscode_shortname %} window alongside your main editor window. To open the {% data variables.copilot.agents_window %}, use one of the following methods:

* Select the **Open in Agents** button in the {% data variables.product.prodname_vscode_shortname %} title bar

* Run the **Chat: Open {% data variables.copilot.agents_window %}** command from the Command Palette (`kb(workbench.action.showCommands)`)

* Select **Try out the new {% data variables.copilot.agents_window %}** link from the {% data variables.product.prodname_vscode_shortname %} welcome page

* Run `code --agents` from the command line.

* Open <https://insiders.vscode.dev/agents> in a browser to use the {% data variables.copilot.agents_window %} from any device. See [remote agent sessions](/docs/agents/run/remote-agent-sessions.md#use-the-agents-window-in-the-browser) for setup instructions.

By default, the {% data variables.copilot.agents_window %} requires GitHub authentication to access your Copilot subscription and sessions. If you're already signed in to GitHub in {% data variables.product.prodname_vscode_shortname %}, you'll also be signed in when the {% data variables.copilot.agents_window %} opens.

> [!NOTE]
> You can hide the **Open in Agents** button by right-clicking it in the title bar and selecting **Hide 'Open in Agents'**. You can still open the {% data variables.copilot.agents_window %} at any time from the Command Palette or command line.

### Open without GitHub sign-in (Experimental)

On desktop, you can open the {% data variables.copilot.agents_window %} without signing in to GitHub when at least one of these options is available:

* Claude configured with Anthropic credentials.
* Codex signed in to ChatGPT.
* A visible BYOK model configured in {% data variables.product.prodname_vscode_shortname %}. Enable `setting(chat.agentHost.byokModels.enabled)` to make BYOK models available to Agent Host sessions.

Enable `setting(chat.agentHost.allowSignedOutWhenUsable)` before you open the window. This setting is off by default, but it might be enabled by an experiment.

To use a ChatGPT subscription, enable `setting(chat.agentHost.codexAgent.enabled)`, open the account menu in the {% data variables.copilot.agents_window %}, and select **Sign in to ChatGPT**. After you sign in, you can sign out of GitHub and continue to use ChatGPT-backed Codex models.

While you're signed out of GitHub, the model picker only shows models from providers with available credentials or keys. Sign in to GitHub from the account menu to add Copilot-backed models. If multiple providers offer a model with the same name, the model picker identifies the provider.

When {% data variables.product.prodname_vscode_shortname %} discovers an existing Claude configuration, a notification indicates that Claude is available without GitHub sign-in. Dismiss the notification with **X** to hide it for the current window. Select **Don't Show Again** to hide it for future windows on the same machine.

If {% data variables.product.prodname_vscode_shortname %} doesn't find a provider that can run with its own credentials, the {% data variables.copilot.agents_window %} shows the existing GitHub sign-in experience. Providers, models, and operations that require GitHub authentication prompt you to sign in when you select them. The browser-based {% data variables.copilot.agents_window %} always requires GitHub sign-in.

## {% data variables.copilot.agents_window %} interface overview

The {% data variables.copilot.agents_window %} has the following main areas:

1. **Sessions list**: view and manage sessions across workspaces. By default, sessions are grouped by workspace. Select a session to [make it active](#understand-the-active-session).

1. **Customizations panel**: access agent customizations for your workflow and preferences, and open [Automations](#schedule-recurring-tasks) when enabled.

1. **Chat area**: view and interact with the active agent chat conversation

1. **Changes panel**: review changes for the active session

1. **Files panel**: browse the workspace associated with the active session

![Screenshot of the {% data variables.copilot.agents_window %} interface, showing the sessions list, customizations panel, chat area, changes panel, and files panel.](../images/agents-window/agents-window-ui-annotated.png)

By default, the **Changes** and **Files** views appear in a separate side panel. Files and diffs open in an editor beside the chat or in a modal window.

## Understand the active session

The {% data variables.copilot.agents_window %} picks up your agent sessions across your workspaces. The **active session** is the session that currently has focus. Its conversation and project context determine what you see and which workspace your actions apply to.

Select a session in the sessions list to open it and make it active. When you [open multiple sessions side by side](#open-multiple-sessions-side-by-side), select anywhere in a session view to make that session active. The active session is highlighted in the sessions list.

The following parts of the window update when the active session changes:

| Area | What it shows for the active session |
|------|--------------------------------------|
| **Chat** | The conversation history and prompt input. |
| **Files** | The files in the session's workspace folder or worktree. This view includes all workspace files, not only files changed by the agent. |
| **Changes** | The changes and Git actions for the session. Use the dropdown to choose the branch changes, uncommitted changes, all changes, or changes from the last agent turn. |
| **Terminal and Tasks** | Commands and tasks that run in the session's workspace folder or worktree. |
| **Browser** | Browser tabs and page state that belong to the session. |

[Quick chats](#start-a-quick-chat) aren't associated with a workspace. When a quick chat is active, the workspace-specific **Files** and **Changes** views aren't shown.

## Start an agent session

Start a session for a local folder, GitHub repository, or [remote workspace](/docs/agents/run/remote-agent-sessions.md). You can attach other projects, issues, and pull requests as context before you send the first prompt. For work that doesn't belong to a project, start a [quick chat](#start-a-quick-chat).

To start a new agent session in the {% data variables.copilot.agents_window %}:

1. Select **New** at the top of the sidebar or press `kb(workbench.action.chat.newChat)`. To start directly in a specific workspace, hover over the workspace in the sessions list and select **+** (New Session).

1. Select **Folder** or **Repository** to choose the primary execution workspace for the session. The first folder or repository you select determines where the agent runs and changes files.

    To connect through SSH or a dev tunnel, select **Remote Setup**. If the workspace isn't trusted, review the [Workspace Trust](/docs/editing/workspaces/workspace-trust.md) prompt before you continue.

1. Optionally, attach more context to the request:

    * Select **Folder** or **Repository** to attach more projects as context without adding workspace roots.
    * For a GitHub-backed workspace, select **Issue/PR**, and then choose an item or paste its URL.

    ![Screenshot of the new-session input highlighting the folder name and the Create PR control.](../images/agents-window/new-session-input.png)

1. Choose an available agent harness, and optionally configure the agent, language model, permission level, and isolation mode. The available options depend on the workspace. Learn how to [choose a harness and code isolation](/docs/agents/run/agent-harnesses.md).

1. Type a prompt that describes what you want to accomplish, and press `kbstyle(Enter)` to submit it to the agent.

    > [!TIP]
    > To start a session in the background without leaving the current session, press `kbstyle(Alt+Enter)` or hold `kbstyle(Alt)` and select **Send**. The new session appears in the sessions list after you send the prompt.

The sessions list shows the session's status and change statistics while it works. The session is also available in the main {% data variables.product.prodname_vscode_shortname %} window. Learn more about [managing sessions](/docs/agents/run/sessions/manage-sessions.md).

### Start a session from a pull request

For a local GitHub-backed workspace, start a session from an existing pull request to ask questions about the proposed changes or continue working on the pull request. The session includes the pull request details, changes, and comments as context. It uses an [isolated Git worktree](/docs/agents/run/agent-harnesses.md#choose-code-isolation) that tracks the pull request branch.

To start a session from a pull request:

1. In the sessions list, group sessions by workspace.

1. Hover over the workspace for the pull request, expand the **+** (New Session) action, and select **New Session from Pull Request**.

    ![Screenshot showing the New Session from Pull Request action and pull request picker in the {% data variables.copilot.agents_window %}.](../images/agents-window/agents-window-new-session-from-pull-request.png)

1. Select a pull request from the list.

    The new session opens with the pull request title. Use the chat to ask questions about the pull request or enter a prompt to make more changes. The **Changes** view shows the pull request changes.

1. Review and validate the changes, then select **Commit Changes** and **Sync Changes** in the title bar.

    **Sync Changes** updates the pull request branch on GitHub, so the existing pull request includes your commits.

> [!NOTE]
> Pull requests from forks are not supported and don't appear in the pull request picker.

## Start a quick chat

Quick chats are lightweight chats that aren't scoped to a workspace. Use a quick chat to ask a question or start a task that doesn't belong to a specific project. Quick chats appear in the **Chats** section at the top of the sessions list, separate from your workspace-scoped sessions.

To start a new quick chat in the {% data variables.copilot.agents_window %}:

1. Select **+** on the **Chats** section header (`kb(sessionsView.newQuickChat)`) or run **New Quick Chat** from the Command Palette (`kb(workbench.action.showCommands)`).

    ![Screenshot showing the quick chats group in the {% data variables.copilot.agents_window %}, with + button to start a new quick chat highlighted.](../images/agents-window/agents-window-quick-chat.png)

1. Choose the agent harness from the dropdown.

1. Enter a prompt in the input box to submit it to the agent. The agent responds in the chat area.

To use speech instead of typing, start [Voice Mode](/docs/configure/accessibility/voice.md#use-voice-mode) from the chat input. Voice Mode works with the active chat or agent session in the {% data variables.copilot.agents_window %}. `feature(voice-mode)`

By default, the **Chats** group stays visible in the sessions list even when it's empty. To hide empty default groups, set `setting(sessions.list.showEmptyDefaultGroups)` to `false`.

### Continue a quick chat in a workspace

If a quick chat becomes project-specific, attach a local workspace and continue the same conversation. The session retains its title, conversation history, and current request. After workspace setup finishes, the agent automatically continues your request with access to the project files.

> [!NOTE]
> This option is currently available for quick chats that use the Copilot harness. The target must be a local folder. [Worktree isolation](/docs/agents/run/agent-harnesses.md#choose-code-isolation) requires a local Git repository with at least one commit.

To continue a quick chat in a workspace:

1. Ask the agent to continue the task in a specific local workspace.

1. When prompted, confirm the folder and choose whether the agent should make changes directly in the folder or use an isolated Git worktree.

1. Review and approve the **Set Workspace** tool confirmation.

    If the folder isn't trusted, review the [Workspace Trust](/docs/editing/workspaces/workspace-trust.md) prompt before you proceed.

1. Wait for workspace setup to finish. The quick chat becomes a workspace session and moves from the **Chats** group to the selected workspace in the sessions list. The agent then continues the original request.

## Review and finish an agent session

When an agent finishes a task, make the session active to inspect its workspace and access its validation and Git actions.

### Inspect workspace files and changes

Select **Files** to browse the active session's workspace folder or worktree. Select **Changes** to review branch changes, uncommitted changes, all changes, or changes from the last agent turn. Open a changed file to inspect its diff or leave range-based feedback for the agent.

![Screenshot showing the Changes panel in the {% data variables.copilot.agents_window %}, with the Files and Changes views visible.](../images/agents-window/agents-window-changes.png)

For complete instructions about feedback, revisions, checkpoints, and integrating changes, see [Review AI-generated code edits](/docs/agents/run/review-code-edits.md).

### Validate changes

Use the [integrated browser](/docs/debugtest/integrated-browser.md) to validate web applications in the active session. Select a `localhost` link from the chat or terminal, right-click a file in **Files** and select **Open in Integrated Browser**, or run **Open Integrated Browser** from the Command Palette (`kb(workbench.action.showCommands)`). Browser tabs and page state belong to the session where you open them. Learn how agents can [use browser tools](/docs/agents/run/browser-tools.md) to inspect and interact with a web page.

To run a workspace task, select **Tasks** > **Add Task**, and then provide its name, command, run options, and save location. Run configured tasks from the **Tasks** dropdown. To run an ad hoc command in the active session's folder or worktree, select **Open Terminal** in the title bar.

### Commit changes

If the active session has uncommitted changes, select **Commit Changes** in the **Changes** view. {% data variables.product.prodname_vscode_shortname %} generates a commit message based on the changes and commits all current changes. Depending on the session type, you might also have a **Commit and Sync Changes** action.

### Finish a pull request with Agent Merge

`feature(agent-merge)`

Agent Merge monitors the pull request associated with an agent session and asks the agent to address blockers until the pull request is ready to merge. Depending on how you configure it, Agent Merge can:

* Address unresolved review threads, changes-requested reviews, and new comments from repository maintainers or the Copilot pull request reviewer.
* Fix failed required CI checks.
* Update a branch that is behind its base branch and resolve merge conflicts.
* Merge the pull request or add it to the merge queue after the selected maintenance work is complete.

To use Agent Merge:

1. Enable `setting(chat.agentMerge.enabled)`.

1. Open a session that is associated with a pull request. To create one, follow the steps in [Start a session from a pull request](#start-a-session-from-a-pull-request).

1. Select **Agent Merge** in the title bar, and then select **Enable Agent Merge**.

1. From the **Agent Merge** menu, configure which blockers the agent should address and whether to merge the pull request when it is ready.

    You can also run **Configure Agent Merge for Active Session** from the Command Palette (`kb(workbench.action.showCommands)`). For a complete list of options, see the [Agent Merge settings](/docs/agents/reference/ai-settings.md#agent-sessions).

<!-- TODO: Add a screenshot of the Agent Merge menu in the Agents window title bar. -->

> [!CAUTION]
> Agent Merge starts agent turns, changes and syncs the pull request branch, and consumes model requests. Enabling it changes the session to [Autopilot](/docs/agents/run/approvals.md#how-autopilot-works) with [Assisted permissions](/docs/agents/run/approvals.md#permission-levels). Review the Agent Merge options before you enable automatic merging.

Agent Merge waits while required checks are pending and checks that the pull request is ready immediately before it merges or adds it to the merge queue. If the session starts tracking a different branch or pull request, Agent Merge turns off and requires you to enable it again.

To stop monitoring the pull request, select **Agent Merge** in the title bar, and then select **Disable Agent Merge**.

## Work with multiple sessions

The sessions list shows sessions across all your workspaces. You can group sessions by workspace or time, create custom groups, pin sessions, and rearrange items with drag and drop. Learn how to [organize and manage sessions](/docs/agents/run/sessions/manage-sessions.md#sessions-list).

### Open multiple sessions side by side

Open multiple sessions at the same time to compare results or review work in parallel. To open a session next to the active one:

* Right-click a session in the sessions list and select **Open to the Side**.
* Drag a session from the sessions list into the view area.
* Hold `kbstyle(Alt)` and select a session in the sessions list.

<video src="../images/agents-window/sessions-grid.mp4" title="Video showing multiple agent sessions open side by side in the {% data variables.copilot.agents_window %}." autoplay loop controls muted></video>

Only one session view is active at a time. Select a view to make it active and direct the **Files**, **Changes**, **Terminal**, **Tasks**, and browser actions to that session. Selecting another session replaces an unpinned active view.

When multiple sessions are open, use keyboard shortcuts to move between and manage them:

* Press `kb(sessions.focusSessionInGrid1)` through `kb(sessions.focusSessionInGrid9)` to focus a session by its position in the grid, from left to right.
* Press `kb(sessions.closeAllSessions)` to close all open sessions and return to the new-session view. This shortcut applies when a session has focus.

These commands are also in the Command Palette (`kb(workbench.action.showCommands)`).

### Work with multiple chats in a session

Supported agent host sessions can contain multiple independent chats that share the same workspace and worktree. Arrange peer chats, side chats, and read-only subagent chats in horizontal or vertical groups to work with multiple conversations at the same time. Learn how to [run multiple chats and ask side questions](/docs/agents/run/sessions/manage-sessions.md#run-multiple-chats-in-a-session) and [follow subagents](/docs/agents/run/subagents.md#what-you-see-in-chat).

## Schedule recurring tasks

`feature(automations)`

Automations run recurring agent tasks from a saved prompt and schedule. Enable `setting(chat.automations.enabled)`, and then select **Automations** in the sidebar to get started. You can run a task on demand or schedule it to run hourly, daily, or weekly.

Learn how to [create an automation and review its results](/docs/agents/run/automations.md).

## Configure the {% data variables.copilot.agents_window %}

You can personalize chat, adjust the window layout, configure settings and extensions, and choose how Markdown files open. See [Configure the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window-configuration.md) for all window-specific options.

## Limitations

* Agent Host Codex sessions can run in both the {% data variables.copilot.agents_window %} and the main {% data variables.product.prodname_vscode_shortname %} window. The Local harness and Codex sessions from the OpenAI extension run only in the main {% data variables.product.prodname_vscode_shortname %} window.

* Copilot Cloud sessions are only supported for GitHub-backed repositories. For non-GitHub projects, you can still use Copilot in the {% data variables.copilot.agents_window %}.

* The agents dropdown currently doesn't have the plan agent. You can use the `/plan` command in a Copilot or Claude agent session. In Copilot sessions, the plan agent is also automatically invoked when you ask it to create a plan.

* Running multiple chats in a single session is currently supported for Copilot and Claude sessions.

* Multi-root sessions are not yet supported in the {% data variables.copilot.agents_window %}. You can ask the agent to work across projects in a single session.

## Next steps

* [Use chat in {% data variables.product.prodname_vscode_shortname %}](/docs/chat/chat-overview.md) - send and steer requests, add context, and navigate conversations.
* [Manage agent sessions](/docs/agents/run/sessions/manage-sessions.md) - organize, fork, archive, and export sessions.
* [Review AI-generated code edits](/docs/agents/run/review-code-edits.md) - inspect, revise, and integrate agent changes.
