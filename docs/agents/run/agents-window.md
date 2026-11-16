---
ContentId: b3e7a1d4-5f2c-4e9a-8b6d-1c0f3a2e5d47
DateApproved: 11/11/2026
MetaDescription: Start and manage parallel agent sessions, review changes, and finish pull requests in the {% data variables.copilot.agents_window %}.
---
# Use the {% data variables.copilot.agents_window %}

The {% data variables.copilot.agents_window %} provides an agent-first interface in {% data variables.product.prodname_vscode %} for delegating and coordinating tasks across projects. Run independent tasks in parallel, monitor their progress, and review results in one place. Use [chat in the editor](/docs/agents/run/chat-view.md) when you want to collaborate with an agent alongside the code you're editing or debugging.

This guide follows the workflow from choosing where an agent makes changes to monitoring, validating, and integrating its work. Start with one task, then add independent tasks as needed. If you're new to agent-assisted coding, first complete the [agents quickstart](/docs/agents/quickstart.md).

<div class="docs-action" data-show-in-doc="false" data-show-in-sidebar="true" title="Get started with agents">
Follow a hands-on tutorial to build an app with AI agents in {% data variables.product.prodname_vscode_shortname %}.

* [Start agentic coding tutorial](/docs/agents/agents-tutorial.md)

</div>

## Open the {% data variables.copilot.agents_window %}

Select **Open in Agents** in the {% data variables.product.prodname_vscode_shortname %} title bar, or run **Chat: Open {% data variables.copilot.agents_window %}** from the Command Palette (`kb(workbench.action.showCommands)`). The window opens alongside your main editor window.

If you're already signed in to {% data variables.product.prodname_github %} in {% data variables.product.prodname_vscode_shortname %}, you'll also be signed in when the {% data variables.copilot.agents_window %} opens. From the command line, use `code --agents`.

## {% data variables.copilot.agents_window %} interface overview

The {% data variables.copilot.agents_window %} separates managing work across projects from working on an individual task. Use the Primary Side Bar to organize sessions and access automations and customizations, the central session area to collaborate with agents, and the Secondary Side Bar to inspect and validate the active session's work.

| Area | What you use it for |
|------|--------------------|
| **Primary Side Bar** | Start and switch between sessions across projects. Open **Automations** to manage automated tasks, or **Customizations** to configure your agents and workflows. |
| **Session area** | Send prompts, answer questions, review responses, and direct the agent. Arrange multiple sessions side by side to monitor parallel work. |
| **Secondary Side Bar** | Use **Files** to browse the workspace, **Changes** to review edits, **Search** to find code, and **Browser** to inspect an application. **Canvases**, when available, provide interactive content from the agent. |

The available tools depend on the session and enabled features.

<!-- TODO: Replace the overview screenshot with one annotated to show the primary side bar, session area, and secondary side bar as three regions. Include Automations and Customizations in the primary side bar. -->

![Screenshot showing the {% data variables.copilot.agents_window %} interface, with the sessions list, customizations action, chat area, changes panel, and files panel numbered.](../images/agents-window/agents-window-ui-annotated.png)

### Understand the active session

Selecting a session makes it the **active session** and determines which project and conversation the session tools apply to. When several session panes are visible, select a pane to make it active. The active session is highlighted in the sessions list.

Before you send feedback or run a command, confirm which session is active. Terminal commands and tasks run in that session's folder or worktree, and browser tabs belong to the session where you open them.

[Quick chats](#start-a-quick-chat) have no project workspace, so they don't show workspace-specific files and changes.

## Start an agent session

Choose a task with a clear outcome and checks you can run to verify it. The following steps start a session in a local project. For other environments or tasks without a project, see [Other ways to start a session](#other-ways-to-start-a-session).

![Screenshot showing the new session input with environment, workspace, and context controls.](../images/agents-window/new-session-input-2.png)

1. Select **New Session** at the top of the sidebar or press `kb(workbench.action.chat.newChat)`. To start directly in a specific workspace, hover over the workspace in the sessions list and select **+** (New Session).

1. Select **This Computer** from the environment picker above the input. In the workspace picker, select a recent folder or **Open Folder**.

    If the workspace isn't trusted, review the [Workspace Trust](/docs/editing/workspaces/workspace-trust.md) prompt before you continue.

1. For a Git repository, choose **Branch** to work in your current folder or **New Worktree** to keep changes separate. Review the [isolation choices and requirements](#choose-where-an-agent-makes-changes) before you send the prompt.

1. Review the permission level in the input toolbar. It controls which actions need your approval and is separate from file isolation. Learn about [permission levels](/docs/agents/run/approvals.md#permission-levels).

1. Describe the outcome you want, any constraints, and how the agent should check its work. Press `kbstyle(Enter)` to submit the prompt.

    For additional context, select **Add Context** (**+**). If prompted, select a repository first. Pasting an issue or pull request URL into the prompt also adds it as a context attachment.

    You can optionally change the [agent harness](/docs/agents/run/agent-harnesses.md#compare-agent-harnesses), agent, or model.

> [!TIP]
> To start a session in the background without navigating into it, press `kbstyle(Alt+Enter)` or hold `kbstyle(Alt)` and select **Send**. Focus stays in the composer so you can start another task. Select **Open Session** in the confirmation to open the sent conversation. With the [Inbox mode setting](/docs/agents/run/sessions/organize-sessions.md#turn-on-inbox-mode) enabled, you can also press `kbstyle(Ctrl+Enter)` (`kbstyle(Cmd+Enter)` on macOS).

### Choose where an agent makes changes

For a Git workspace you can choose between applying changes in the current branch or a new worktree. Use the isolation dropdown above the input to choose where the agent edits files.

![Screenshot showing the isolation dropdown with Branch and New Worktree options above the input.](../images/agent-harnesses/agents-window-new-worktree-2.png)

| Aspect | **Branch** | **New Worktree** |
|--------|------------|------------------|
| Best for | Working with your current files and uncommitted changes | Independent tasks running in parallel |
| Where edits go | Your current folder | A separate [Git worktree](/docs/sourcecontrol/branches-worktrees.md#understanding-worktrees) |
| Starting point | Your current files, or another existing local branch | Committed files from the selected base branch |
| Requirements | A clean working tree **when switching branches** | A Git repository with at least one commit |
| Uncommitted and untracked files | Available in the current folder | Not copied from the current folder |
| Integration | Edits are already in your selected folder | Integrate the reviewed worktree branch afterward |

Choosing a base branch for **New Worktree** doesn't switch the branch in your active workspace.

Git-ignored files, including dependencies and local configuration, are also absent from new worktrees by default. Run your project's setup or [configure which ignored files to include](#configure-isolation-defaults).

Dev Container sessions work directly in the container workspace and don't support **New Worktree**. See [Run a session in a Dev Container](#run-a-session-in-a-dev-container).

> [!IMPORTANT]
> Worktrees isolate working files, not the agent's access to your machine or external services. Either isolation mode supports the permission levels offered by your harness. For operating system-level restrictions, configure [agent sandboxing](/docs/agents/run/agent-sandboxing.md) or use [cloud sessions](/docs/agents/run/cloud-sandbox-sessions.md).

## Work with multiple sessions

You can run multiple agent sessions in parallel, either in the same project or across different projects. Each session has its own conversation and task context, so you can delegate independent work and review one result while another session continues. For example, one session can implement a feature in one project while another investigates a bug in a different project.

Use separate sessions for independent tasks you want to track and review separately. For related conversations you want to keep together, [work with multiple chats in a session](#work-with-multiple-chats-in-a-session).

To add another task, select **New Session**, choose its project, and submit a prompt. You don't need to wait for the other sessions to finish. Switch between them in the sessions list to check progress, answer questions, or give feedback. Sessions can run in parallel without being displayed side by side. [Arrange sessions in a grid](#arrange-sessions-in-a-grid) when you want to keep several conversations visible.

For parallel changes in the same repository, [use separate worktrees](#choose-where-an-agent-makes-changes) to keep edits apart. Separate sessions or chats don't automatically isolate files: those using the same folder can edit the same files. Choose tasks that can proceed independently. If one depends on another's result, complete that prerequisite first. For a walkthrough, follow [Delegate two tasks without mixing their changes](/docs/agents/guides/delegate-two-tasks.md).

Use the sessions list to check status and change statistics. Select a session to inspect its conversation:

* If it needs input, answer its question or review the approval request.
* While it works, check that its changes stay within the task's scope. Send corrections to that session, not another task's conversation.
* When it finishes, [review and validate the result](#review-and-finish-an-agent-session). A completed response isn't proof that the task is correct.

Confirm the [active session](#understand-the-active-session) before sending feedback or running commands. For steering and stopping requests, see [Use chat](/docs/chat/chat-overview.md). To group, pin, or prioritize sessions that need attention, see [Organize and triage sessions](/docs/agents/run/sessions/organize-sessions.md).

### Arrange sessions in a grid

To keep two sessions visible, right-click a session in the list and select **Open to the Side**. To start another session without replacing the current pane, hold `kbstyle(Alt)` (`kbstyle(Option)` on macOS) and select **New Session**.

Drag a session to the top, bottom, left, or right edge of another session to create a horizontal or vertical split. A placement preview shows where the session appears.

<video src="../images/agents-window/sessions-grid.mp4" title="Video showing agent sessions arranged in a grid in the {% data variables.copilot.agents_window %}." autoplay loop controls muted></video>

Only one pane is active at a time. Selecting another session in the list replaces an unpinned active view.

When multiple panes are visible, use the session header's **Session Layout** menu to arrange or resize them. **Maximize** expands one pane, and **Restore Size** returns to the grid. These actions are separate from **Session Layout**.

### Open chats in separate windows

`feature(agents-window-chat-windows)`

To keep a conversation and its files on another display, enable `setting(sessions.chatWindows.enabled)`, then right-click a session or chat in the sessions list and select **Open in** > **New Window**. The setting is on by default in Insiders.

You can also drag a chat tab or session title out of the window to open it separately, or into another chat window to move it there.

Use **Configure Layout** in the new window's title bar to show chat and editors side by side or stacked. In the stacked layout, run **Agents: Toggle Chat Conversation** from the Command Palette to hide the conversation and keep only the input visible.

To rearrange content, hover over the top edge of a chat, editor, or terminal area to reveal its layout handle. Drag the handle to an edge of another area, using the placement preview to choose its new position.

To move the window's chats and editors back to the main window, select **More Actions** (**...**) > **Move to Main Window** in the chat header.

## Review and finish an agent session

When an agent finishes a task, use the {% data variables.copilot.agents_window %} to review its changes, request revisions, and validate the result. Once the work meets your requirements, commit the changes and integrate them into your project, either locally or through a pull request.

Select the session you want to review to make its files, changes, and tools active.

For more in-depth coding or debugging, select **Open in Editor** to [continue a supported project session in the main editor window](#continue-in-another-interface), with the editor, debugger, and other development tools alongside the conversation.

### Inspect workspace files and changes

In the **Secondary Side Bar**, use **Files** to browse the workspace or worktree and **Changes** to review edits. In **Changes**, choose **Branch** for the branch diff, **Uncommitted** for pending changes, **Session** for the session's edits, or **Last Turn** for its latest turn. Review the full relevant change, not only the latest response.

![Screenshot showing the Changes panel in the {% data variables.copilot.agents_window %}, with the Files and Changes views visible.](../images/agents-window/agents-window-changes.png)

Check that the result meets your requested outcome, preserves required behavior, and contains no unrelated edits.

To provide immediate feedback, open a file's diff, select a range, and use the feedback controls to leave range-based feedback for the agent. For detailed review and recovery controls, see [Review AI-generated code edits](/docs/agents/run/review-code-edits.md).

### Validate changes

Run the project's tests, build, and any manual checks needed to verify the requested behavior. Check the output for failures or skipped checks rather than relying only on the agent's summary.

* Select **Terminal** in the session activity bar to run commands in that session's folder or worktree.

* Use the tasks control in the application title bar to run a configured task, or define a new one.

* For a web app, select a `localhost` link or open an HTML file in the [integrated browser](/docs/debugtest/integrated-browser.md). You can also ask the agent to [use browser tools](/docs/agents/run/browser-tools.md), then verify the result yourself.

If a check fails, send the evidence to the same session, request a correction, and repeat the affected checks.

### Commit changes

For uncommitted changes, open **Changes**, select **Uncommitted** from the changeset dropdown, and then select **Commit**. {% data variables.product.prodname_vscode_shortname %} generates a commit message and commits all current changes in the session's Git repository, so review them first. The available Git actions depend on the session type.

Generating the commit message requires [signing in to {% data variables.product.prodname_copilot %}](/docs/setup/copilot.md), even when the session uses another provider's credentials.

> [!IMPORTANT]
> The **Commit** action uses `git commit --no-verify`, which skips `pre-commit` and `commit-msg` hooks. Commits made by **Create PR** also skip these hooks. Run your project's required checks before using either action.

### Integrate the result

Committing records the changes but doesn't necessarily put them in the branch where you need them:

* With **Branch** isolation, edits are already in the selected folder. Follow your normal branch and pull request workflow.
* With **New Worktree**, edits remain in the separate worktree. Integrate the reviewed branch into your target branch locally, or [create a pull request](#create-a-pull-request). For a parallel-work example, follow [Integrate and retest](/docs/agents/guides/delegate-two-tasks.md#6-integrate-and-retest).

After combining changes from multiple sessions, rerun the relevant checks on the combined result. Keep the sessions available until that validation is complete, then [mark finished sessions as done](/docs/agents/run/sessions/manage-sessions.md#finish-and-restore-sessions).

### Create a pull request

If the session doesn't already have a pull request:

1. Select **Create PR** in the title bar. Review the repository, source and base branches, and generated title and description. You can edit the text while generation finishes.

1. Select **Create as Draft** if the changes aren't ready for review.

1. Under **After creation**, choose **Merge Manually** to retain control of merging, or **Auto-Merge** to let {% data variables.product.prodname_github %} merge when required checks and approvals pass. For auto-merge, select the merge method. Auto-merge isn't available for drafts and doesn't fix failed checks or review feedback.

    The optional **{% data variables.copilot.agent_merge_caps %}** choice (Experimental) can ask the agent to address blockers. Review its [configuration and safeguards](#finish-a-pull-request-with-agent-merge) before selecting it.

1. Select **Create PR**. Any uncommitted changes are committed and the branch is pushed before the pull request is created.

To have the agent create the pull request instead, select **Pull Request Actions** > **Send Create PR Message** in the form. This asks the agent to generate its own title and description, rather than use the form's text, with your selected draft status and merge options.

### Remove a pull request from a session

To remove a pull request artifact without closing the pull request on {% data variables.product.prodname_github %}, right-click its pill above the chat input and select **Remove Pull Request Artifact from Session**. If the pill contains multiple pull requests, open its dropdown and select the action for the relevant pull request.

A separate association, such as the one created when you start a session from a pull request, remains unchanged.

## Other ways to start a session

Use these workflows when your task needs a different starting point or execution environment.

### Start a quick chat

Quick chats aren't scoped to a project. Use one for a question or task that doesn't need a workspace. They appear in the **Chats** group at the top of the sessions list.

1. Select **+** on the **Chats** header (`kb(sessionsView.newQuickChat)`) or run **New Quick Chat** from the Command Palette.

    ![Screenshot showing the quick chats group in the {% data variables.copilot.agents_window %}, with the + button highlighted.](../images/agents-window/agents-window-quick-chat.png)

1. Choose an available harness, enter your prompt, and submit it.

Quick chats also support [nested sessions](#work-with-multiple-chats-in-a-session), where available. With **No Workspace** selected, each nested session uses its own temporary folder.

#### Continue a quick chat in a workspace

If a quick chat becomes project-specific, continue it in a local workspace without losing its conversation history.

> [!NOTE]
> This is supported for {% data variables.product.prodname_copilot_short %} and {% data variables.product.prodname_openai_codex_short %} harness quick chats. For {% data variables.product.prodname_openai_codex_short %}, use Interactive mode. Worktree isolation requires a local Git repository with at least one commit.

1. Ask the agent to continue in a specific local folder.
1. Confirm the folder and choose whether to edit it directly or use a worktree.
1. Review and approve the **Set Workspace** confirmation and any Workspace Trust prompt.

After setup, the chat moves to the workspace's group and the agent continues your request. For chats that already have a workspace, see [Move a chat to another folder or worktree](/docs/agents/run/sessions/manage-sessions.md#move-a-chat-to-another-folder-or-worktree).

### Open without GitHub sign-in (Experimental)

On desktop, you can run sessions using supported provider credentials instead of a {% data variables.product.prodname_github %} sign-in:

* Follow the [{% data variables.product.prodname_anthropic_claude_short %} BYOK setup](/docs/agents/run/agent-harnesses.md#claude) for a supported API key or provider configuration.
* Follow the [{% data variables.product.prodname_openai_codex_short %} setup](/docs/agents/run/agent-harnesses.md#codex) to use a ChatGPT sign-in.
* Configure a [supported BYOK model](/docs/agent-customization/language-models.md#bring-your-own-language-model-key) for the {% data variables.copilot.agents_window %}.

> [!NOTE]
> {% data variables.product.prodname_anthropic_claude_short %} and {% data variables.product.prodname_openai_codex_short %} harnesses are disabled when [enterprise-managed settings apply](/docs/enterprise/manage-ai-settings.md#claude-and-codex-availability), even with separate credentials. Existing sessions aren't deleted. Contact the IT team that deployed the settings to discuss access.

If no provider is configured, select **Add Models** or **Sign In** in the window. Models and operations that require {% data variables.product.prodname_github %} authentication prompt you when needed. The browser-based {% data variables.copilot.agents_window %} requires {% data variables.product.prodname_github %} sign-in.

### Run in another environment

For a {% data variables.product.prodname_github %} repository, select **Work in Repository** in the workspace picker. To work on another machine, select **SSH** or **Dev Tunnels** from the environment picker and follow the [remote session setup](/docs/agents/run/remote-agent-sessions.md).

For managed compute that runs independently of your local machine, [start a cloud session](/docs/agents/run/cloud-sandbox-sessions.md#start-a-cloud-session) `feature(cloud-sessions)`. To return to its work later, [reopen the existing session](/docs/agents/run/cloud-sandbox-sessions.md#continue-an-existing-cloud-session).

You can also [use the browser-based {% data variables.copilot.agents_window %}](/docs/agents/run/remote-agent-sessions.md#use-the-agents-window-in-the-browser) to access remote sessions from another device.

### Run a session in a Dev Container

Use a Dev Container to run the agent with your project's tools and dependencies. This is supported in the desktop app for local folders and folders on configured SSH, Tunnel, or WSL hosts, but not in the browser-based window.

Before starting:

* [Install and run Docker](/docs/devcontainers/containers.md#installation) on the host that contains the folder, with its CLI on `PATH`.
* Add a [Dev Container configuration](/docs/devcontainers/create-dev-container.md) at `.devcontainer/devcontainer.json` or `.devcontainer.json`.
* For remote folders, [configure the connection](/docs/agents/run/remote-agent-sessions.md) to a host that supports Dev Container sessions.

1. Select **New Session**.
1. In the workspace picker, expand the eligible folder's menu and select **Use Dev Container**. The workspace label gains the **- Dev Container** suffix.
1. Choose an available harness and submit your prompt.

To switch back before starting, select **Use This Computer** or **Use Remote Host** from the folder menu. Dev Container sessions edit the container workspace directly and don't support **New Worktree**. For command restrictions, see [sandboxing in Dev Containers](/docs/agents/run/agent-sandboxing.md#use-sandboxing-in-dev-containers).

If startup fails, check the workspace-specific **Dev Container** Output channel. The picker option isn't available for unsupported hosts or folders nested inside another remote environment. Dev Container support is on by default through `setting(chat.agentHost.devContainer.enabled)`.

Idle containers stop after five minutes when no session is working, waiting for input, or holding an unsent draft. Continuing a session restarts the container without losing the conversation. Change the timeout with `setting(chat.agentHost.devContainer.idleTimeout)` (`300` seconds by default, `0` to turn off automatic shutdown). Marking sessions as done or deleting them can still remove the container.

### Start a session from a pull request

For a local {% data variables.product.prodname_github %}-backed workspace, start from an existing pull request to ask questions or continue its changes. The session includes the pull request details, changes, and comments, and uses an isolated worktree that tracks its branch.

1. Group the sessions list by workspace.
1. Hover over the workspace, expand the **+** (New Session) action, and select **New Session from Pull Request**.

    ![Screenshot showing the New Session from Pull Request action in the workspace menu.](../images/agents-window/agents-window-new-session-from-pull-request.png)

1. Select a pull request. The session opens with its title and shows its changes in **Changes**.
1. Ask questions or request revisions. [Review, validate, and commit](#review-and-finish-an-agent-session) any new changes, then select **Sync Changes** in the title bar to update the existing pull request branch.

> [!NOTE]
> Pull requests from forks aren't supported and don't appear in the picker.

### Work with multiple chats in a session

For related conversations, select **+** (**New Nested Session**) on a supported session's row. Keep its folder, or choose another folder, **New Worktree**, or **No Workspace**, where supported. The nested session uses the parent's harness by default and stays on the same host.

For shared context, chat tabs, side chats, and moving conversations, see [Run multiple chats in a session](/docs/agents/run/sessions/manage-sessions.md#run-multiple-chats-in-a-session). To choose another harness, see [mixed-harness chats](/docs/agents/run/sessions/manage-sessions.md#use-different-harnesses-in-a-session) `feature(mixed-harness-chats)`.

### Compare model results

Run the same prompt with multiple models or harnesses to compare responses or isolated code changes. See [Compare model results](/docs/agents/run/compare-models.md) for setup, judging, and synthesis options.

## Continue in another interface

To edit or debug alongside a supported project conversation, select **Open in Editor** in the title bar. To return, select **Open in Agents**, then select the existing session. Check the [supported session types and continuation requirements](/docs/agents/run/sessions/manage-sessions.md#continue-between-the-chat-view-and-agents-window).

For continuity across apps and devices, use [{% data variables.copilot.github_environments %}](/docs/agents/run/remote-agent-sessions.md#github-environments) `feature(github-environments)`. For {% data variables.product.prodname_vscode_shortname %}-specific remote access, use [SSH or dev tunnels](/docs/agents/run/remote-agent-sessions.md#choose-how-to-connect). Keep the host and its required application or service running.

## Automate follow-up work

### Finish a pull request with {% data variables.copilot.agent_merge %}

`feature(agent-merge)`

{% data variables.copilot.agent_merge_caps %} monitors a session's pull request and asks the agent to address blockers. It can address reviews, fix failed required checks, resolve conflicts or update a branch, and optionally merge the result. It requires `setting(chat.agentMerge.enabled)` and a supported session.

> [!CAUTION]
> {% data variables.copilot.agent_merge_caps %} starts agent turns, changes and syncs the pull request branch, and consumes model requests. Enabling it changes the session to [Autopilot](/docs/agents/run/approvals.md#how-autopilot-works) with [Assisted permissions](/docs/agents/run/approvals.md#permission-levels). Review its options before enabling automatic merging.

1. Enable `setting(chat.agentMerge.enabled)` and open a session associated with a pull request.

1. Select **{% data variables.copilot.agent_merge_caps %}** in the title bar, and then select **Enable {% data variables.copilot.agent_merge %}**.

1. Review the options in its menu. You can also run **Configure {% data variables.copilot.agent_merge %} for Active Session** from the Command Palette.

    * **Blockers**: select **Address Reviews**, **Fix CI Failures**, or **Resolve Conflicts and Behind Branches**.
    * **Merge Pull Request**: choose **Off** to leave merging to you, **If Unchanged** to merge only if the agent makes no changes, or **When Ready** to merge after the selected work and required checks and approvals.

These choices are also available when you select **{% data variables.copilot.agent_merge_caps %}** in the [Create PR form](#create-a-pull-request). For all options, see the [{% data variables.copilot.agent_merge %} settings](/docs/agents/reference/ai-settings.md#agent-sessions).

<!-- TODO: Add a screenshot of the {% data variables.copilot.agent_merge_caps %} menu in the Agents window title bar. -->

For a draft pull request, use **Mark Ready** in **Changes** when it is ready for review. While blockers are being addressed, this action is in the action menu.

{% data variables.copilot.agent_merge_caps %} waits for required checks and rechecks readiness before merging or adding the pull request to the merge queue. It turns off if the session starts tracking another branch or pull request.

To review the changes from the most recent {% data variables.copilot.agent_merge %} repair cycle, open the **Changes** view and select **{% data variables.copilot.agent_merge_caps %} Changes** from the changeset dropdown. This changeset compares the latest completed {% data variables.copilot.agent_merge %} repair turn with the preceding completed user turn. It remains empty after your latest message until {% data variables.copilot.agent_merge %} completes another repair turn.

To stop monitoring the pull request, select **{% data variables.copilot.agent_merge_caps %}** in the title bar, and then select **Disable {% data variables.copilot.agent_merge %}**.

### Schedule recurring tasks

Automations run saved agent tasks on a schedule or, for cloud automations `feature(cloud-automations)`, in response to supported repository events. Select **Automations** in the sidebar to get started. Learn how to [create and manage agent automations](/docs/agents/run/automations.md).

## Configure the {% data variables.copilot.agents_window %}

You can personalize chat, adjust the window layout, configure settings and extensions, and choose how Markdown files open. See [Configure the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window-configuration.md) for all window-specific options.

For other interaction options, use [Voice Mode](/docs/configure/accessibility/voice.md#use-voice-mode) `feature(voice-mode)` or [canvases](/docs/agents/run/canvases.md) `feature(canvases)` where supported.

By default, the **Chats** group remains visible even when empty. Set `setting(sessions.list.showEmptyDefaultGroups)` to `false` to hide empty default groups.

### Configure isolation defaults

The `setting(sessions.useWorktree)` setting controls the initial isolation choice for a workspace that hasn't started a session before. After you start a session, {% data variables.product.prodname_vscode_shortname %} remembers that workspace's isolation choice instead. The branch selection isn't remembered.

Use `setting(git.worktreeIncludeFiles)` to [copy ignored files into new worktrees](/docs/sourcecontrol/branches-worktrees.md#include-files-when-creating-a-worktree). For large folders, `setting(git.worktreeSymlinkFolders)` (Experimental) can [symlink a folder instead](/docs/sourcecontrol/branches-worktrees.md#symlink-ignored-folders-when-creating-a-worktree). Changes through the symlink affect the original folder, so don't use it for files that must stay isolated.

## Limitations

* Sessions that use the [experimental Codex integration](/docs/agents/run/agent-harnesses.md#codex) can run in both the {% data variables.copilot.agents_window %} and the main {% data variables.product.prodname_vscode_shortname %} window. Local harness sessions `feature(local-harness)` and Codex sessions from the OpenAI extension run only in the main {% data variables.product.prodname_vscode_shortname %} window.

* Copilot Cloud sessions are only supported for GitHub-backed repositories. For non-GitHub projects, you can still use Copilot in the {% data variables.copilot.agents_window %}.

* The agents dropdown currently doesn't have the plan agent. You can use the `/plan` command in a Copilot or Claude agent session. In Copilot harness sessions, the plan agent is also automatically invoked when you ask it to create a plan.

* Running multiple chats in a single session is currently supported for sessions that use the Copilot or Claude harness.

* Multi-root sessions are not yet supported in the {% data variables.copilot.agents_window %}. You can ask the agent to work across projects in a single session.

## Next steps

* [Use chat in {% data variables.product.prodname_vscode_shortname %}](/docs/chat/chat-overview.md) - send and steer requests, add context, and navigate conversations.
* [Manage agent sessions](/docs/agents/run/sessions/manage-sessions.md) - organize, fork, archive, and export sessions.
* [Review AI-generated code edits](/docs/agents/run/review-code-edits.md) - inspect, revise, or undo agent changes.
