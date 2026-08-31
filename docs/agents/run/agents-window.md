---
ContentId: b3e7a1d4-5f2c-4e9a-8b6d-1c0f3a2e5d47
DateApproved: 9/2/2026
MetaDescription: Use the {% data variables.copilot.agents_window %} in {% data variables.product.prodname_vscode_shortname %} to run parallel coding sessions, review agent changes, and customize the chat experience.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Use the {% data variables.copilot.agents_window %} (Preview)

The {% data variables.copilot.agents_window %} is a dedicated {% data variables.product.prodname_vscode_shortname %} window focused on chat as the primary interface. It works across all your workspaces from one window, so you can assign high-level tasks, evaluate the outcomes, and run and track multiple agents in parallel. The {% data variables.copilot.agents_window %} is optimized for agent-first workflows.

In this article, you learn how to open the {% data variables.copilot.agents_window %} and start, monitor, and review agent sessions across your projects.

<!-- <video src="../images/agents-window/agents-demo-20260510.mp4" title="Video showing the {% data variables.copilot.agents_window %} experience in {% data variables.product.prodname_vscode_shortname %} Insiders." controls></video> -->

> [!NOTE]
> The {% data variables.copilot.agents_window %} is currently in preview. Share feedback by [filing an issue on GitHub](https://github.com/microsoft/vscode/issues), or browse [existing {% data variables.copilot.agents_window %} issues](https://github.com/microsoft/vscode/issues?q=state%3Aopen%20label%3A%22agents-window%22).

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with agents">
Follow a hands-on tutorial to build an app with AI agents in {% data variables.product.prodname_vscode_shortname %}.

* [Start agentic coding tutorial](/docs/agents/agents-tutorial.md)

</div>

## Why use the {% data variables.copilot.agents_window %}?

* **Orchestrate work across projects from one place**: manage sessions for all your workspaces without opening each one in a separate window, so you can assign and track work across projects at the same time.
* **Work agent-first, not code-first**: describe the outcome you want in high-level requirements and let the agent figure out the implementation, rather than framing prompts around specific code changes.
* **Switch freely between surfaces**: move to the [{% data variables.copilot.chat_view %}](/docs/agents/run/chat-view.md) whenever you want to get closer to the code. Both surfaces share the same sessions, settings, and keybindings, so you never lose context.

For help choosing between the {% data variables.copilot.agents_window %} and the {% data variables.copilot.chat_view %}, see [Choose how you work with agents](/docs/agents/overview.md#ways-to-work-with-agents). For chat mechanics that apply to both surfaces, see [Use chat in {% data variables.product.prodname_vscode_shortname %}](/docs/chat/chat-overview.md) and [Review AI-generated code edits](/docs/agents/run/review-code-edits.md).

## Prerequisites

* {% data variables.product.prodname_vscode %} installed. [Download {% data variables.product.prodname_vscode_shortname %}](/download).
* One of the following authentication options:
  * Access to GitHub Copilot. Follow the steps in [Set up GitHub Copilot in {% data variables.product.prodname_vscode_shortname %}](/docs/setup/copilot.md) to sign in and activate your subscription.
  * An [existing Claude configuration](/docs/agents/run/agent-harnesses.md#use-claude-without-github-sign-in-experimental) for the experimental signed-out experience.
  * An [existing ChatGPT sign-in for Codex](/docs/agents/run/agent-harnesses.md#use-codex-without-github-sign-in-experimental) for the experimental signed-out experience.

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

On desktop, you can open the {% data variables.copilot.agents_window %} without signing in to GitHub if Claude is configured with Anthropic credentials or Codex is signed in to ChatGPT. Enable `setting(chat.agentHost.allowSignedOutWhenUsable)` before you open the window. This setting is off by default, but it might be enabled by an experiment.

To use a ChatGPT subscription, enable `setting(chat.agentHost.codexAgent.enabled)`, open the account menu in the {% data variables.copilot.agents_window %}, and select **Sign in to ChatGPT**. After you sign in, you can sign out of GitHub and continue to use ChatGPT-backed Codex models.

While you're signed out of GitHub, the model picker only shows models from providers with available credentials. Sign in to GitHub from the account menu to add Copilot-backed models. If both Copilot and ChatGPT provide a model with the same name, the model picker identifies the provider.

When {% data variables.product.prodname_vscode_shortname %} discovers an existing Claude configuration, a notification indicates that Claude is available without GitHub sign-in. Dismiss the notification with **X** to hide it for the current window. Select **Don't Show Again** to hide it for future windows on the same machine.

If {% data variables.product.prodname_vscode_shortname %} doesn't find a provider that can run with its own credentials, the {% data variables.copilot.agents_window %} shows the existing GitHub sign-in experience. Providers, models, and operations that require GitHub authentication prompt you to sign in when you select them. The browser-based {% data variables.copilot.agents_window %} always requires GitHub sign-in.

## {% data variables.copilot.agents_window %} interface overview

The {% data variables.copilot.agents_window %} has the following main areas:

1. **Sessions list**: view and manage sessions across workspaces. By default, sessions are grouped by workspace. Select a session to [make it active](#understand-the-active-session).

1. **Customizations panel**: access agent customizations for your workflow and preferences

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

The {% data variables.copilot.agents_window %} lets you start a new session for any of your workspaces, including local folders, GitHub repositories, and [remote workspaces](/docs/agents/run/remote-agent-sessions.md). You can also start a [quick chat](#start-a-quick-chat) that isn't associated with a workspace to ask a question or run a task that doesn't belong to a specific project.

To start a new agent session in the {% data variables.copilot.agents_window %}:

1. Select **New** at the top of the sidebar or press `kb(workbench.action.chat.newChat)`.

    To directly start a session for a specific workspace, hover over that workspace in the sessions list and select **+** (New Session).

1. Use the workspace dropdown to select a local folder, GitHub repository, or remote workspace via SSH or a dev tunnel.

    If the folder or repository isn't trusted, {% data variables.product.prodname_vscode_shortname %} prompts you to trust it before starting the session. The {% data variables.copilot.agents_window %} and main {% data variables.product.prodname_vscode_shortname %} window share the same trust state. Learn more about [Workspace Trust](/docs/editing/workspaces/workspace-trust.md).

1. Choose an available [agent harness](/docs/agents/concepts/agent-harnesses.md) from the dropdown, such as Copilot, Claude, or Codex.

    The available harnesses depend on whether you selected a folder or repository. Learn how to [choose a harness and code isolation](/docs/agents/run/agent-harnesses.md).

1. Optionally, configure the agent, language model, permission level, and isolation mode.

1. Type a prompt that describes what you want to accomplish, and press `kbstyle(Enter)` to submit it to the agent.

    The agent starts working on your request and responds in the chat area. The **Files** and **Changes** views update as the agent makes changes in the session's workspace.

    > [!TIP]
    > To start a session in the background without leaving the current session, press `kbstyle(Alt+Enter)` or hold `kbstyle(Alt)` and select **Send**. The new session appears in the sessions list after you send the prompt.

After you start a session, its row in the sessions list shows its status and change statistics. You can make another session active while the agent works, then select the session again to check its progress or respond to a request for input.

The session is also available in the main {% data variables.product.prodname_vscode_shortname %} window. Learn more about [creating and managing sessions](/docs/agents/run/sessions/manage-sessions.md).

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

By default, the **Chats** group stays visible in the sessions list even when it's empty. To hide empty default groups, set `setting(sessions.list.showEmptyDefaultGroups)` to `false`.

## Review and finish an agent session

When the agent finishes a task, select the session active to inspect, validate, or commit its changes.

### Inspect workspace files and changes

1. Select the session in the sessions list to make it active.

1. Select **Files** to browse the session's workspace folder or worktree and open a file.

1. Select **Changes** to see the files that changed in the active session.

1. Use the dropdown in the **Changes** view to choose the branch changes, uncommitted changes, all changes, or changes from the last agent turn.

1. Select a changed file to review its diff. Select a block of text in the diff to leave range-based feedback for the agent. Learn more about [reviewing AI-generated code edits](/docs/agents/run/review-code-edits.md).

![Screenshot showing the Changes panel in the {% data variables.copilot.agents_window %}, with the Files and Changes views visible.](../images/agents-window/agents-window-changes.png)

### Validate changes locally

In addition to reviewing individual code changes, validate the agent's work in the active session before you commit or merge it.

#### Use the integrated browser

If your application involves browser-based behavior, use the [integrated browser](/docs/debugtest/integrated-browser.md) in the {% data variables.copilot.agents_window %}. Select a `localhost` link from the chat or terminal to open it in the integrated browser. You can also right-click a file in the **Files** view and select **Open in Integrated Browser**.

Browser tabs belong to the session in which you open them. Each session keeps its own tabs and page state when you switch sessions. If an agent opens a tab while its session isn't active, select the tab label in the chat tool call to open it.

![Screenshot showing the integrated browser open in the {% data variables.copilot.agents_window %}, displaying a localhost page that was opened from a link in the chat session.](../images/agents-window/agents-window-integrated-browser.png)

You can also run **Open Integrated Browser** from the Command Palette (`kb(workbench.action.showCommands)`). Use the browser layout controls to show it as a modal window or embed it alongside other views.

#### Create and run tasks

The {% data variables.copilot.agents_window %} supports running tasks and commands in the context of the active session. For example, run a build or tests to ensure that the agent's changes don't break your project, or start a development server to verify the changes in a running application.

To configure a task in the {% data variables.copilot.agents_window %}:

1. Select the session in the sessions list to make it active.

1. Select the **Tasks** dropdown in the title bar, and then select **Add Task**.

    ![Screenshot showing the Add Task dialog in the {% data variables.copilot.agents_window %}, where you can configure a task to run in the context of the current session.](../images/agents-window/agents-window-add-task.png)

1. Provide the task details:

    * **Name**: a descriptive name for the task.
    * **Command**: the command to run when the task is executed, such as `npm run build` or `pytest`.
    * **Run Options**: automatically run the task when the session worktree is created.
    * **Save In**: save the task configuration in the workspace or your user profile.

1. Select **Add Task**.

After you configure the task, select it from the **Tasks** dropdown to run it in the context of the active session.

To run terminal commands, select the **Open Terminal** icon in the title bar. The terminal opens with its current working directory set to the active session's folder or worktree.

### Commit changes

If the active session has uncommitted changes, select **Commit Changes** in the **Changes** view. {% data variables.product.prodname_vscode_shortname %} generates a commit message based on the changes and commits all current changes. Depending on the session type, you might also have a **Commit and Sync Changes** action.

## Work with multiple sessions

The sessions list shows sessions across all your workspaces. You can group sessions by workspace or time, create custom groups, pin sessions, and rearrange items with drag and drop. Learn how to [organize and manage sessions](/docs/agents/run/sessions/manage-sessions.md#sessions-list).

### Open multiple sessions side by side

Open multiple sessions at the same time to compare results or review work in parallel. To open a session next to the active one:

* Right-click a session in the sessions list and select **Open to the Side**.
* Drag a session from the sessions list into the view area.
* Hold `kbstyle(Alt)` and select a session in the sessions list.

<video src="../images/agents-window/sessions-grid.mp4" title="Video showing multiple agent sessions open side by side in the {% data variables.copilot.agents_window %}." autoplay loop controls muted></video>

Only one session view is active at a time. Select anywhere in a session view to make it active. The **Files**, **Changes**, **Terminal**, **Tasks**, and browser actions then apply to that session.

By default, selecting a session in the sessions list replaces the active view. Pin a session view from its toolbar to prevent it from being replaced.

When multiple sessions are open, use keyboard shortcuts to move between and manage them:

* Press `kb(sessions.focusSessionInGrid1)` through `kb(sessions.focusSessionInGrid9)` to focus a session by its position in the grid, from left to right.
* Press `kb(sessions.closeAllSessions)` to close all open sessions and return to the new-session view. This shortcut applies when a session has focus.

These commands are also available in the Command Palette (`kb(workbench.action.showCommands)`).

### Work with multiple chats in a session

Supported agent host sessions can contain multiple independent chats that share the same workspace and worktree. Arrange peer chats, side chats, and read-only subagent chats in horizontal or vertical groups to work with multiple conversations at the same time. Learn how to [run multiple chats and ask side questions](/docs/agents/run/sessions/manage-sessions.md#run-multiple-chats-in-a-session) and [follow subagents](/docs/agents/run/subagents.md#what-you-see-in-chat).

## Customize and configure the {% data variables.copilot.agents_window %}

The {% data variables.copilot.agents_window %} shares your GitHub account, {% data variables.product.prodname_vscode_shortname %} settings, and default profile with the main {% data variables.product.prodname_vscode_shortname %} window. Configure the following options when you want to adjust the agent-first experience.

### Customize the chat background

`feature(agents-window-chat-backgrounds)`

Add a decorative background to the chat area of the {% data variables.copilot.agents_window %} without changing chat in the main {% data variables.product.prodname_vscode_shortname %} window.

To set a background, run the **Chat: Set Background...** command from the Command Palette (`kb(workbench.action.showCommands)`) or right-click an empty area of the chat. Then, choose one of these options:

* **Codicons**: use a theme-aware pattern of built-in {% data variables.product.prodname_vscode_shortname %} icons.
* **Image...**: select an image from your machine.
* **Recently used**: reuse one of your five most recent background images.

For an image background, run **Chat: Change Background Layout...** to repeat, stretch, center, or position the image along an edge or in a corner. Moving through the layout options previews each one. Select an option to save it, or dismiss the picker to restore the previous layout.

To remove the background for the current color theme, run **Chat: Clear Background**.

> [!NOTE]
> Light and dark color themes have separate backgrounds. Background choices are stored on the current machine and don't sync, while the image layout syncs across devices.

Backgrounds are hidden in high contrast themes to preserve chat readability. The background commands are also unavailable while a high contrast theme is active.

### Customize agents for your project and workflow

Select a customization type in the **Customizations** panel below the sessions list to open the Agent Customizations editor. From there, manage agents, skills, instructions, hooks, MCP servers, and plugins for your workspace or user profile. Learn how to [customize agents in {% data variables.product.prodname_vscode_shortname %}](/docs/agent-customization/overview.md#agent-customizations-editor).

### Adjust the window layout

#### Use the single-pane editor panel (Experimental)

The experimental single-pane layout replaces the separate editor and side panel with one docked pane. A shared tab bar spans the editor and the **Changes** or **Files** detail view. Files and diffs open in the docked editor next to the chat instead of in a modal window.

To use the single-pane layout, enable `setting(sessions.layout.singlePaneDetailPanel)` and reload the window. The setting is read when the {% data variables.copilot.agents_window %} starts.

<!-- TODO: Add a screenshot of the single-pane editor panel showing the shared tab bar, editor, and detail panel. -->

In the shared tab bar, select **New Tab** (`+`) to open **Changes**, **Files**, **Browser**, or **Search**. Use **Hide Editor**, **Toggle Details**, and **Maximize Editor Area** or **Restore Editor Area** to adjust the layout. **Toggle Details** is available only for tabs that support a detail panel.

Each session restores its side-pane width, open editors, active editor, and per-file collapsed state when you switch sessions or reload the window.

#### Automatically collapse the sessions sidebar (Experimental)

When you enable `setting(sessions.layout.autoCollapseSessionsSidebar)`, the {% data variables.copilot.agents_window %} hides the sessions sidebar on narrow windows when both the editor area and side panel are open. The sidebar appears again when there is room. The {% data variables.copilot.agents_window %} preserves a sidebar that you closed manually and suspends auto-collapse while multiple sessions are open side by side.

### View and edit Markdown files

The {% data variables.copilot.agents_window %} supports rendered Markdown preview and an experimental Markdown editor for `.md` files. Which editor opens by default depends on `setting(workbench.editor.markdownDefaultEditorInAgentsWindow)`.

* When enabled, `.md` files open with **Markdown Editor (Experimental)**.
* When disabled, `.md` files open with **Markdown Preview**.

In **Markdown Editor (Experimental)**, switch between **Editing** and **Locked** modes while keeping the rendered Markdown context. In **Editing** mode, edit content directly. In **Locked** mode, the document remains rendered and read-only.

When you edit a Markdown file, the editor shows Git change markers in the margin. Green indicates added content, blue indicates modified content, and red indicates deleted content. The markers reflect the current Git changes and disappear when you undo or revert the corresponding changes.

### Switch to another GitHub account

To use a different GitHub account in the {% data variables.copilot.agents_window %}, select the account icon in the top right corner of the window and choose **Sign out**. After signing out, select **Sign in** to authenticate with a different GitHub account.

### Configure settings for the {% data variables.copilot.agents_window %}

The {% data variables.copilot.agents_window %} shares all of your {% data variables.product.prodname_vscode_shortname %} settings, so the configuration you've already invested in carries over automatically. When you want different behavior in the {% data variables.copilot.agents_window %} than in the editor window, you can override specific settings just for the {% data variables.copilot.agents_window %} without affecting your main {% data variables.product.prodname_vscode_shortname %} setup.

To override a setting for the {% data variables.copilot.agents_window %} only, edit your settings file and scope the value under the {% data variables.copilot.agents_window %} section. Open the Settings editor (`kb(workbench.action.openSettings)`) from the {% data variables.copilot.agents_window %} to see which scope a setting applies to.

![Screenshot showing the Settings editor open in the {% data variables.copilot.agents_window %}, with the different scopes for settings highlighted.](../images/agents-window/agents-window-settings.png)

### Use {% data variables.product.prodname_vscode_shortname %} extensions in the {% data variables.copilot.agents_window %}

The {% data variables.copilot.agents_window %} can run {% data variables.product.prodname_vscode_shortname %} extensions. Extensions that contribute only static content, such as themes, grammars, languages, and keybindings, activate automatically.

For other extensions, you can opt them in by ID with the `setting(extensions.supportAgentsWindow)` setting:

```json
"extensions.supportAgentsWindow": {
    "myextension.id": true
}
```

Keep the following in mind when enabling extensions:

* Any extension you enable this way must be installed in your default {% data variables.product.prodname_vscode_shortname %} profile.

* Extension support is still evolving. If an extension doesn't behave as expected, [file an issue](https://github.com/microsoft/vscode/issues).

## Limitations

* The {% data variables.copilot.agents_window %} supports Copilot, cloud, Claude, and Codex sessions that run on the Agent Host. Use the Local harness and Codex sessions that run through the OpenAI extension from the main {% data variables.product.prodname_vscode_shortname %} window.

* Copilot Cloud sessions are only supported for GitHub-backed repositories. For non-GitHub projects, you can still use Copilot in the {% data variables.copilot.agents_window %}.

* The agents dropdown currently doesn't have the plan agent. You can use the `/plan` command in a Copilot or Claude agent session. In Copilot sessions, the plan agent is also automatically invoked when you ask it to create a plan.

* Running multiple chats in a single session is currently supported for Copilot and Claude sessions.

* Multi-root sessions are not yet supported in the {% data variables.copilot.agents_window %}. You can ask the agent to work across projects in a single session.

## Next steps

* [Chat overview](/docs/chat/chat-overview.md) - add context, write effective prompts, and review changes.
* [Manage agent sessions](/docs/agents/run/sessions/manage-sessions.md) - organize, fork, archive, and export sessions.
* [Review AI-generated code edits](/docs/agents/run/review-code-edits.md) - inspect, revise, and integrate agent changes.
* [Remote agent sessions](/docs/agents/run/remote-agent-sessions.md) - SSH, dev tunnels, and browser-based access.
