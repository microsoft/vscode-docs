---
ContentId: b3e7a1d4-5f2c-4e9a-8b6d-1c0f3a2e5d47
DateApproved: 7/29/2026
MetaDescription: Use the Agents window in VS Code for an agent-first coding experience where agents and chat are the primary interface to build with AI.
MetaSocialImage: ../images/shared/github-copilot-social.png
---
# Use the Agents window (Preview)

The Agents window is a dedicated window in VS Code, built for an agent-first workflow. It's the natural complement to the VS Code editor window: the editor window is optimized for code-centric work in a single workspace, while the Agents window is optimized for orchestrating higher-level tasks across projects, with chat and the sessions list as the primary interface.

The Agents window gives you access to all your workspaces from one place and lets you run and track multiple sessions in parallel across your projects without opening each workspace in a separate window. It shares the same agent sessions, settings, and keybindings with the main VS Code window, so you can move freely between an editor-focused workflow and an agent-focused workflow at any time without losing context.

In this article, you learn about the Agents window and how to start and manage agent sessions across your projects. For mechanics that apply to both the Agents window and the [Chat view](/docs/agents/run/chat-view.md), see [Use chat in VS Code](/docs/chat/chat-overview.md) and [Review AI-generated code edits](/docs/agents/run/review-code-edits.md).

<video src="../images/agents-window/agents-demo-20260510.mp4" title="Video showing the Agents window experience in VS Code Insiders." controls></video>

> [!TIP]
> The Agents window (agent-first) and the [Chat view](/docs/agents/run/chat-view.md) (code-first) are the main surfaces for working with agents. They share the same sessions and settings, so you can move freely between them. For help choosing, see [Choose how you work with agents](/docs/agents/overview.md#choose-how-you-work-with-agents).

> [!NOTE]
> The Agents window is currently in preview. We're actively shaping it based on your feedback and are excited to learn alongside developers. Please share your experience by [filing issues on GitHub](https://github.com/microsoft/vscode/issues), or browse [existing issues](https://github.com/microsoft/vscode/issues?q=state%3Aopen%20label%3A%22agents-window%22).

## Prerequisites

* Visual Studio Code installed. [Download VS Code](/download).
* Access to GitHub Copilot. Follow the steps in [Set up GitHub Copilot in VS Code](/docs/setup/copilot.md) to sign in and activate your subscription.

## Open the Agents window

The Agents window opens as a dedicated VS Code window alongside your main editor window. To open the Agents window, use one of the following methods:

* In VS Code, select the **Open in Agents** button in the title bar, or run **Chat: Open Agents Window** from the Command Palette (`kb(workbench.action.showCommands)`).

    You can also open the Agents window directly from the VS Code welcome page.

    ![Screenshot showing how to open the Agents window from the Open in Agents button in the title bar and from the Welcome page.](../images/agents-window/vscode-open-in-agents.png)

* Run `code --agents` from the command line.

* Open <https://insiders.vscode.dev/agents> in a browser to use the Agents window from any device. See [remote agent sessions](/docs/agents/run/remote-agent-sessions.md#use-the-agents-window-in-the-browser) for setup instructions.

The Agents window requires GitHub authentication to access your Copilot subscription and sessions. If you're already signed in to GitHub in VS Code, you'll also be signed in when the Agents window opens.

If you prefer to stay in the editor window full-time, you can hide the **Open in Agents** button by right-clicking it in the title bar and selecting **Hide 'Open in Agents'**. You can still open the Agents window at any time from the Command Palette or command line.

## Interface overview

The Agents window picks up your existing Copilot, Cloud, and Claude agent sessions across your workspaces. You can switch between agent sessions across the different workspaces without needing to open each workspace in a separate window.

The Agents window has the following main areas:

1. **Sessions list**: in the sidebar, where you can view and manage all your sessions across workspaces. By default, sessions are grouped by workspace. Right-click a session to see more commands, such as renaming, marking as done, pinning, and more.

1. **Customizations panel**: below the sessions list, where you can access your agent customizations to tailor the agent behavior to your workflow and preferences.

1. **Chat area**: in the center, where you see the chat conversation history and where you can interact with the agent through prompts. You can [open multiple session views side by side](#open-multiple-sessions-side-by-side) to compare or review work in parallel.

1. **Changes panel**: on the right, where you can review file changes generated by your agent during a session.

1. **Files panel**: on the right, shows the file explorer of the workspace associated with the active session.

![Screenshot of the Agents window interface, showing the sessions list, customizations panel, chat area, changes panel, and files panel.](../images/agents-window/agents-window-ui-annotated.png)

## Start an agent session

To start a new agent session in the Agents window:

1. Select **New** at the top of the sidebar or press `kb(workbench.action.chat.newChat)`.

    ![Screenshot showing how to start a new agent session by selecting New at the top of the sidebar in the Agents window.](../images/agents-window/agents-window-new-session.png)

1. Use the workspace dropdown to select a local folder or GitHub repository.

    To start a session for a specific workspace, hover over that workspace in the sessions list and select **+** (New Session).

    If the folder or repository isn't trusted, VS Code prompts you to trust it before starting the session. The Agents window and main VS Code window share the same trust state. Learn more about [Workspace Trust](/docs/editing/workspaces/workspace-trust.md).

    > [!TIP]
    > You can track and create sessions that run on a remote machine via SSH or a dev tunnel. See [remote agent sessions](/docs/agents/run/remote-agent-sessions.md) for more information.

1. Choose an available harness from the **Session Target** control, and optionally configure the agent, language model, permission level, and isolation mode.

    The available harnesses depend on whether you selected a folder or repository. Learn how to [choose a harness and code isolation](/docs/agents/run/agent-harnesses.md).

1. Type a prompt that describes what you want to accomplish, and press `kbstyle(Enter)`.

The session is also available in the main VS Code window. Learn more about [creating and managing sessions](/docs/agents/run/sessions/manage-sessions.md).

> [!TIP]
> To start a session in the background without leaving the current session, press `kbstyle(Alt+Enter)` or hold `kbstyle(Alt)` and select **Send**. The newly started session appears in the sessions list once it commits.

## Work with the agent

After you start a session, use the Agents window to track work across projects, review changes, run parallel chats, and tailor the agent to your workflow.

### Manage your sessions

The sessions list shows your sessions across all workspaces. Select a session to show its conversation and make its workspace files and changes active. You can group sessions by workspace or time, create custom groups, pin sessions, and rearrange items with drag and drop. Learn how to [organize and manage sessions](/docs/agents/run/sessions/manage-sessions.md#sessions-list).

### Quick chats

Quick chats are lightweight chats that aren't scoped to a workspace. Use a quick chat when you want to ask a question or start a task that doesn't belong to a specific project, without setting up a workspace session.

Quick chats appear in the always-visible **Chats** section at the top of the sessions list, separate from your workspace-scoped sessions.

To start a quick chat, use one of the following methods:

* Select **+** on the **Chats** section header in the sessions list.
* Run **New Quick Chat** from the Command Palette (`kb(workbench.action.showCommands)`), or press `kb(sessionsView.newQuickChat)`.

Use the session-type picker in the composer to choose which agent runs the quick chat, for example Copilot or Claude. The quick chat then opens ready for your prompt. Because a quick chat has no workspace, the workspace picker doesn't apply, and the workspace-specific **Changes** and **Files** panes aren't shown.

Quick chats are restored with your other sessions after a window reload.

![Screenshot showing the quick chats group in the Agents window, with + button to start a new quick chat highlighted.](../images/agents-window/agents-window-quick-chat.png)

By default, the **Chats** group stays visible in the sessions list even when it's empty. To hide the default groups until they contain sessions, set `setting(sessions.list.showEmptyDefaultGroups)` to `false`.

### Review file changes

Use the **Changes** tab to view the diffs of the changes made by the agent in the active session. Use the dropdown to choose between the branch changes, uncommitted changes, all changes, and the changes from the last agent turn.

You can select a block of text in a change diff and leave range-based feedback for the agent to process. Learn how to [review AI-generated code edits](/docs/agents/run/review-code-edits.md).

If there are uncommitted changes, you can commit them to the Git repository. VS Code automatically generates a commit message based on the changes.

![Screenshot showing the Changes panel in the Agents window, with the Files and Changes views visible.](../images/agents-window/agents-window-changes.png)

### View and edit Markdown files in the Agents window

The Agents window supports both rendered Markdown preview and an experimental Markdown editor for `.md` files. Which editor opens by default depends on `setting(workbench.editor.markdownDefaultEditorInAgentsWindow)`.

* When enabled, `.md` files open with **Markdown Editor (Experimental)**.
* When disabled, `.md` files open with **Markdown Preview**.

In **Markdown Editor (Experimental)**, you can switch between **Editing** and **Locked** modes while keeping rendered Markdown context. In **Editing** mode, you can edit content directly. In **Locked** mode, the document remains rendered and read-only.

When you edit a Markdown file in **Markdown Editor (Experimental)**, the editor shows Git change markers in the margin:

* Green marker for added content.
* Blue marker for modified content.
* Red marker for deleted content.

These markers reflect your current Git changes in the file, persist after you save and reopen the file, and disappear when you undo or revert the corresponding changes.

### Work with agents remotely

Connect the Agents window to a machine over SSH or a dev tunnel, or open <https://insiders.vscode.dev/agents> to manage sessions from a browser. Learn how to [set up remote agent sessions](/docs/agents/run/remote-agent-sessions.md).

### Work with chats in a session

Supported agent host sessions can contain multiple independent chats that share the same workspace and worktree. Use peer chats for parallel tasks or side questions, and open delegated subagents as read-only chats. Learn how to [run multiple chats and ask side questions](/docs/agents/run/sessions/manage-sessions.md#run-multiple-chats-in-a-session) and [follow subagents](/docs/agents/run/subagents.md#what-you-see-in-chat).

### Customize agents for your project and workflow

Select a customization type in the **Customizations** panel below the sessions list to open the Agent Customizations editor. From there, manage agents, skills, instructions, hooks, MCP servers, and plugins for your workspace or user profile. Learn how to [customize agents in VS Code](/docs/agent-customization/overview.md#use-the-agent-customizations-editor).

## Validate agent changes locally

In addition to reviewing the individual code changes, you can also validate the edits made by the agent locally before committing or merging them.

### Create and run tasks in the Agents window

The Agents window supports running tasks and commands in the context of the current session. For example, you can run a build or tests to ensure that the changes made by the agent do not break your project, or start a development server to verify that the edits behave as expected in a running environment.

To configure tasks in the Agents window:

1. Start or open a session.

1. Select the **Tasks** dropdown in the title bar and select **Add Task**.

    ![Screenshot showing the Add Task dialog in the Agents window, where you can configure a task to run in the context of the current session.](../images/agents-window/agents-window-add-task.png)

1. Provide the task details:

    * **Name**: a descriptive name for the task.
    * **Command**: the command to run when the task is executed (for example, `npm run build` or `pytest`).
    * **Run Options**: automatically run the task when the session worktree is created.
    * **Save In**: choose whether to save the task configuration in the workspace or your user profile for reuse across projects.

1. Select **Add Task** to save the task configuration.

Once the task is configured, it will appear in the **Tasks** dropdown, and you can run it in the context of the current session to validate the changes made by the agent.

If you want to run terminal commands in the context of the current session, select the **Open Terminal** icon in the title bar to open an integrated terminal with its current working directory set to the session's folder or worktree.

### Use the integrated browser in the Agents window

If your application involves browser-based behavior, you can use the [integrated browser](/docs/debugtest/integrated-browser.md) in the Agents window. Select a `localhost` link from the chat session to open it in the integrated browser inside the Agents window. Alternatively, right-click a file in the **Files** panel and select **Open in Integrated Browser** to open it in the integrated browser.

Browser tabs are scoped to the session in which they were opened. Each session keeps its own set of browser tabs, isolated from other sessions, and those tabs persist across session switches, preserving the state of each page. When you switch sessions, you see the browser tabs that belong to the active session. If an agent opens a tab while its session isn't active, the tab isn't opened in the editor, but it remains usable and you can open it by selecting its label in the tool call in the chat session.

![Screenshot showing the integrated browser open in the Agents window, displaying a localhost page that was opened from a link in the chat session.](../images/agents-window/agents-window-integrated-browser.png)

Alternatively, you can also select a `localhost` link from the integrated terminal or open the integrated browser with the **Open Integrated Browser** command from the Command Palette (`kb(workbench.action.showCommands)`). You can use the layout controls in the integrated browser to show it as a modal window or embedded in the Agents window layout alongside other views.

## Open multiple sessions side by side

You can have more than one session open at the same time in the Agents window to compare results or review work in parallel. Open a session next to the active one by using any of the following methods:

* Right-click a session in the sessions list and select **Open to the Side**.
* Drag and drop a session from the sessions list into the view area.
* Hold `kbstyle(Alt)` and select a session in the sessions list.

<video src="../images/agents-window/sessions-grid.mp4" title="Video showing multiple agent sessions open side by side in the Agents window." autoplay loop controls muted></video>

Only one session view is *active* at any time. The **Terminal**, **Files**, and **Changes** views always reflect the active session. By default, selecting a session in the sessions list replaces the active view. Pin a session view (top-right toolbar) to prevent it from being replaced.

When you have multiple sessions open, you can use keyboard shortcuts to move between them and manage them, similar to working with editors:

* Press `kb(sessions.focusSessionInGrid1)` through `kb(sessions.focusSessionInGrid9)` to focus a session by its position in the grid, from left to right.
* Press `kb(sessions.closeAllSessions)` to close all open sessions and return to the new-session view. This shortcut applies when a session has focus.

These commands are also available in the Command Palette (`kb(workbench.action.showCommands)`).

> [!NOTE]
> **Experimental**: when you enable `setting(sessions.layout.autoCollapseSessionsSidebar)`, the Agents window hides the sessions sidebar on narrow windows when both the editor area and side panel are open. The sidebar appears again when there is room. The Agents window preserves a sidebar that you closed manually, and suspends auto-collapse while multiple sessions are open side by side.

## Configure the Agents window

The Agents window shares your GitHub account, VS Code settings, and default profile with the main VS Code window. Configure the following options when you want to adjust the agent-first experience.

### Switch to another GitHub account

To use a different GitHub account in the Agents window, select the account icon in the top right corner of the window and choose **Sign out**. After signing out, select **Sign in** to authenticate with a different GitHub account.

### Configure settings for the Agents window

The Agents window shares all of your VS Code settings, so the configuration you've already invested in carries over automatically. When you want different behavior in the Agents window than in the editor window, you can override specific settings just for the Agents window without affecting your main VS Code setup.

To override a setting for the Agents window only, edit your settings file and scope the value under the Agents window section. Open the Settings editor (`kb(workbench.action.openSettings)`) from the Agents window to see which scope a setting applies to.

![Screenshot showing the Settings editor open in the Agents window, with the different scopes for settings highlighted.](../images/agents-window/agents-window-settings.png)

### Use VS Code extensions in the Agents window

The Agents window can run your VS Code extensions, so you can bring the tools you rely on into your agent-first workflow.

Extensions that contribute only static content, such as themes, grammars, languages, and keybindings, activate in the Agents window automatically. We also tested the top 100 Marketplace extensions, and some of those activate as well when installed in your default VS Code profile.

For other extensions, you can opt them in by ID with the `setting(extensions.supportAgentsWindow)` setting:

```json
"extensions.supportAgentsWindow": {
    "myextension.id": true
}
```

Keep the following in mind when enabling extensions:

* Any extension you enable this way must be installed in your default VS Code profile.

* Extension support is still evolving. If an extension doesn't behave as expected in the Agents window, please [file an issue](https://github.com/microsoft/vscode/issues) so we can discuss.

If you're an extension author, we'd love to collaborate on what extension enablement in the Agents window unlocks. Whether you'd like to ideate on new scenarios that take advantage of running agents across projects, or share feedback on how your existing extension behaves in the Agents window, share feedback and ideas via [GitHub issues](https://github.com/microsoft/vscode/issues?q=state%3Aopen%20label%3A%22agents-window%22).

## Limitations

* The Agents window supports Copilot, cloud, Claude, and Codex sessions that run on the Agent Host. Use the Local harness and Codex sessions that run through the OpenAI extension from the main VS Code window.

* Copilot Cloud sessions are only supported for GitHub-backed repositories. For non-GitHub projects, you can still use Copilot in the Agents window.

* The agents dropdown currently doesn't have the plan agent. You can use the `/plan` command in a Copilot or Claude agent session. In Copilot sessions, the plan agent is also automatically invoked when you ask it to create a plan.

* Running multiple chats in a single session is currently supported for Copilot and Claude sessions.

* Multi-root sessions are not yet supported in the Agents window. You can ask the agent to work across projects in a single session.

## Next steps

* [Chat overview](/docs/chat/chat-overview.md) - add context, write effective prompts, and review changes.
* [Manage agent sessions](/docs/agents/run/sessions/manage-sessions.md) - organize, fork, archive, and export sessions.
* [Review AI-generated code edits](/docs/agents/run/review-code-edits.md) - inspect, revise, and integrate agent changes.
* [Remote agent sessions](/docs/agents/run/remote-agent-sessions.md) - SSH, dev tunnels, and browser-based access.
