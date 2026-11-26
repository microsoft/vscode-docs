---
ContentId: b3e7a1d4-5f2c-4e9a-8b6d-1c0f3a2e5d47
DateApproved: 11/25/2026
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
> To start a session in the background without navigating into it, press `kbstyle(Alt+Enter)` or hold `kbstyle(Alt)` and select **Send**. Focus stays in the composer so you can start another task. Select **Open Session** in the confirmation to open the sent conversation. With [Inbox grouping](/docs/agents/run/sessions/organize-sessions.md#turn-on-inbox-mode) selected, you can also press `kbstyle(Ctrl+Enter)` (`kbstyle(Cmd+Enter)` on macOS).

### Choose where an agent makes changes

For a Git workspace, use the isolation dropdown above the input to choose where the agent edits files:

* **Branch**: Work directly in the selected folder. If you choose another local branch, switching branches requires a clean working tree.
* **New Worktree**: Work in a separate directory and branch. Use the branch picker to choose the base branch before sending the prompt. Choosing a base branch doesn't switch the branch in your active workspace.

![Screenshot showing the isolation dropdown with Branch and New Worktree options above the input.](../images/agent-harnesses/agents-window-new-worktree-2.png)

For the folder-versus-worktree comparison, Git requirements, and dependency setup, see [Work with agents in worktrees](/docs/agents/run/worktrees.md). To change the initial choice, [configure isolation defaults](/docs/agents/run/agents-window-configuration.md#configure-isolation-defaults).

Dev Container sessions work directly in the container workspace and don't support **New Worktree**. See [Work with agents in Dev Containers](/docs/agents/run/dev-containers.md).

> [!IMPORTANT]
> Worktrees isolate working files, not the agent's access to your machine or external services. Review the [permission and sandboxing considerations](/docs/agents/run/worktrees.md#choose-folder-or-worktree-isolation) before starting a task.

### Save and resume drafts

`feature(agents-window-drafts)`

Prepare requests for several tasks and return to them when you're ready to send them. In the {% data variables.copilot.agents_window %}, drafts save unsent **New Session** requests without starting an agent session.

1. Open Settings (`kb(workbench.action.openSettings)`) and enable `setting(sessions.drafts.enabled)`. The setting is off by default.

1. Select **New Session** and compose a request, including any context attachments and session options.

1. Navigate to another conversation. When the new-session input is no longer visible, the request is saved in **Drafts** in the sidebar.

1. Select **Resume Draft** beside a saved draft, or **Open Draft** in the notification. Review or edit the request, then send it when you're ready.

Each draft keeps its text, attachments, inline references, workspace, agent, model, and configuration. Saved drafts remain available after restarting the window. To save a new draft, navigate away from the input first. Restarting alone doesn't add it to **Drafts**.

The draft is removed from the list after the request is accepted. To discard one without sending it, select **Delete Draft**.

Turning off `setting(sessions.drafts.enabled)` hides saved drafts and stops saving new ones, but doesn't delete them. Turn it back on to access them again.

<a name="send-a-request-later"></a>
<a name="change-or-cancel-a-scheduled-request"></a>
<a name="ask-the-agent-to-schedule-a-follow-up"></a>

To schedule a one-time request for a later time instead of sending it immediately, see [Send a request later](/docs/agents/run/automations.md#send-a-request-later) `feature(agents-window-send-later)`.

## Work with multiple sessions

You can run multiple agent sessions in parallel, either in the same project or across different projects. Each session has its own conversation and task context, so you can delegate independent work and review one result while another session continues. For example, one session can implement a feature in one project while another investigates a bug in a different project.

Use separate sessions for independent tasks you want to track and review separately. For related conversations you want to keep together, [work with multiple chats in a session](#work-with-multiple-chats-in-a-session).

<a name="arrange-sessions-in-a-grid"></a>
<a name="open-chats-in-separate-windows"></a>

To add another task, select **New Session**, choose its project, and submit a prompt. You don't need to wait for the other sessions to finish. Switch between them in the sessions list to check progress, answer questions, or give feedback. Sessions can run in parallel without being displayed side by side. To keep several conversations visible together or move a chat to another display, [arrange sessions in a grid](/docs/agents/run/agents-window-configuration.md#arrange-sessions-in-a-grid) or [open chats in separate windows](/docs/agents/run/agents-window-configuration.md#open-chats-in-separate-windows).

For parallel changes in the same repository, [use separate worktrees](#choose-where-an-agent-makes-changes) to keep edits apart. Separate sessions or chats don't automatically isolate files: those using the same folder can edit the same files. Choose tasks that can proceed independently. If one depends on another's result, complete that prerequisite first. For a walkthrough, follow [Delegate two tasks without mixing their changes](/docs/agents/guides/delegate-two-tasks.md).

Use the sessions list to check status and change statistics. Select a session to inspect its conversation:

* If it needs input, answer its question or review the approval request.
* While it works, check that its changes stay within the task's scope. Send corrections to that session, not another task's conversation.
* When it finishes, [review and validate the result](#review-and-finish-an-agent-session). A completed response isn't proof that the task is correct.

Confirm the [active session](#understand-the-active-session) before sending feedback or running commands. For steering and stopping requests, see [Use chat](/docs/chat/chat-overview.md). To group, pin, or prioritize sessions that need attention, see [Organize and triage sessions](/docs/agents/run/sessions/organize-sessions.md).

## Review and finish an agent session

When an agent finishes a task, use the {% data variables.copilot.agents_window %} to review its changes, request revisions, and validate the result. Once the work meets your requirements, commit the changes and integrate them into your project, either locally or through a pull request.

Select the session you want to review to make its files, changes, and tools active.

For more in-depth coding or debugging, select **Open in Editor** to [continue a supported project session in the main editor window](#continue-automate-and-configure), with the editor, debugger, and other development tools alongside the conversation.

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

To reclaim disk space from inactive or leftover worktrees, run **Chat: Open Worktree Cleanup**. The [shared cleanup procedure](/docs/agents/run/worktrees.md#clean-up-session-worktrees) covers both windows, local and remote worktrees, and what is preserved.

## Work with pull requests

Create pull requests directly from finished sessions, start sessions from existing pull requests, or monitor blockers with {% data variables.copilot.agent_merge %}.

### Create a pull request

If the session doesn't already have a pull request:

1. Select **Create PR** in the title bar. Review the repository, source and base branches, and generated title and description. You can edit the text while generation finishes.

1. Select **Create as Draft** if the changes aren't ready for review.

1. Under **After creation**, choose **Merge Manually** to retain control of merging, or **Auto-Merge** to let {% data variables.product.prodname_github %} merge when required checks and approvals pass. For auto-merge, select the merge method. Auto-merge isn't available for drafts and doesn't fix failed checks or review feedback.

    The optional **{% data variables.copilot.agent_merge_caps %}** choice (Experimental) can ask the agent to address blockers. Review its [configuration and safeguards](#finish-a-pull-request-with-agent-merge) before selecting it.

1. Select **Create PR**. Any uncommitted changes are committed and the branch is pushed before the pull request is created.

To have the agent create the pull request instead, select **Pull Request Actions** > **Send Create PR Message** in the form. This asks the agent to generate its own title and description, rather than use the form's text, with your selected draft status and merge options.

### Start a session from a pull request

For a local {% data variables.product.prodname_github %}-backed workspace, start from an existing pull request to ask questions or continue its changes. The session includes the pull request details, changes, and comments, and uses an isolated worktree that tracks its branch.

1. Group the sessions list by workspace.
1. Hover over the workspace, expand the **+** (New Session) action, and select **New Session from Pull Request**.

    ![Screenshot showing the New Session from Pull Request action in the workspace menu.](../images/agents-window/agents-window-new-session-from-pull-request.png)

1. Select a pull request. The session opens with its title and shows its changes in **Changes**.
1. Ask questions or request revisions. [Review, validate, and commit](#review-and-finish-an-agent-session) any new changes, then select **Sync Changes** in the title bar to update the existing pull request branch.

> [!NOTE]
> Pull requests from forks aren't supported and don't appear in the picker.

### Finish a pull request with {% data variables.copilot.agent_merge %}

`feature(agent-merge)`

{% data variables.copilot.agent_merge_caps %} monitors a session's pull request and asks the agent to address blockers. It can address reviews, fix failed required checks, resolve conflicts or update a branch, and optionally merge the result. It requires `setting(chat.agentMerge.enabled)` and a supported session.

> [!CAUTION]
> {% data variables.copilot.agent_merge_caps %} starts agent turns, changes and syncs the pull request branch, and consumes model requests. Enabling it changes the session to [Autopilot](/docs/agents/run/approvals.md#autopilot-mode) with [Assisted permissions](/docs/agents/run/approvals.md#permission-levels). Review its options before enabling automatic merging.

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

<a name="open-without-github-sign-in-experimental"></a>
<a name="run-a-session-in-a-dev-container"></a>
<a name="use-your-projects-dev-container"></a>
<a name="create-a-container-without-a-project-experimental"></a>
<a name="ask-the-agent-to-continue-in-a-new-container-experimental"></a>

### Run in another environment

* **Dev Containers:** Run an agent inside a project's Dev Container or a standalone container on this computer or a connected host. See [Work with agents in Dev Containers](/docs/agents/run/dev-containers.md).
* **Remote hosts and browser access:** Select **SSH** or **Dev Tunnels** from the environment picker, or connect from a browser. See [Run and manage remote agent sessions](/docs/agents/run/remote-agent-sessions.md).
* **Cloud compute:** [Start a cloud session](/docs/agents/run/cloud-sandbox-sessions.md#start-a-cloud-session) `feature(cloud-sessions)` to run independently of your local machine, or select **Work in Repository** for a {% data variables.product.prodname_github %} repository.
* **Provider credentials without {% data variables.product.prodname_github %} sign-in:** Configure {% data variables.product.prodname_anthropic_claude_short %}, {% data variables.product.prodname_openai_codex_short %}, or BYOK credentials in [Manage AI providers and accounts](/docs/agents/run/agents-window-configuration.md#manage-ai-providers-and-accounts).

### Work with multiple chats in a session

For related conversations, select **+** (**New Nested Session**) on a supported session's row. Keep its folder, or choose another folder, **New Worktree**, or **No Workspace**, where supported. The nested session uses the parent's harness by default and stays on the same host.

For shared context, chat tabs, side chats, and moving conversations, see [Run multiple chats in a session](/docs/agents/run/sessions/manage-sessions.md#run-multiple-chats-in-a-session). To choose another harness, see [mixed-harness chats](/docs/agents/run/sessions/manage-sessions.md#use-different-harnesses-in-a-session) `feature(mixed-harness-chats)`.

### Compare model results

Run the same prompt with multiple models or harnesses to compare responses or isolated code changes. See [Compare model results](/docs/agents/run/compare-models.md) for setup, judging, and synthesis options.

<a name="continue-in-another-interface"></a>

## Continue, automate, and configure

* **Continue in another interface:** Select **Open in Editor** in the title bar to edit or debug alongside a supported project conversation, or select **Open in Agents** to return. For continuity across apps and devices, use [{% data variables.copilot.github_environments %}](/docs/agents/run/remote-agent-sessions.md#github-environments) `feature(github-environments)` or [SSH and dev tunnels](/docs/agents/run/remote-agent-sessions.md#choose-how-to-connect). See [continue between the Chat view and Agents window](/docs/agents/run/sessions/manage-sessions.md#continue-between-the-chat-view-and-agents-window) for requirements.
* **Automate and schedule tasks:** Enter `/automate` in a chat or select **Automations** in the sidebar to set up recurring or event-triggered tasks. For one-time deferred requests, use [Send Later](/docs/agents/run/automations.md#send-a-request-later) `feature(agents-window-send-later)`. See [Create and manage agent automations](/docs/agents/run/automations.md).
<a name="configure-isolation-defaults"></a>
* **Configure the window:** Personalize chat, adjust grid or tab layouts, set isolation defaults, and manage extensions in [Configure the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window-configuration.md). For other interaction modes, see [Voice Mode](/docs/configure/accessibility/voice.md#use-voice-mode) `feature(voice-mode)` and [canvases](/docs/agents/run/canvases.md) `feature(canvases)`.

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
