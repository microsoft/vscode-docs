---
ContentId: b3e7a1d4-5f2c-4e9a-8b6d-1c0f3a2e5d47
DateApproved: 5/13/2026
MetaDescription: Use the Agents window in VS Code for an agent-first coding experience where agents and chat are the primary interface to build with AI.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Use the Agents window (Preview)

The Agents window is a dedicated window in VS Code, built for an agent-first workflow. It's the natural complement to the VS Code editor window: the editor window is optimized for code-centric work in a single workspace, while the Agents window is optimized for orchestrating higher-level tasks across projects, with chat and the sessions list as the primary interface.

The Agents window gives you access to all your workspaces from one place and lets you run and track multiple sessions in parallel across your projects without opening each workspace in a separate window. It shares the same agent sessions, settings, and keybindings with the main VS Code window, so you can move freely between an editor-focused workflow and an agent-focused workflow at any time without losing context.

In this article, you learn about the Agents window and how to start and manage agent sessions across your projects.

<video src="../images/agents-window/agents-demo-20260510.mp4" title="Video showing the Agents window experience in VS Code Insiders." controls></video>

> [!NOTE]
> The Agents window is currently in preview. We're actively shaping it based on your feedback and are excited to learn alongside developers. Please share your experience by [filing issues on GitHub](https://github.com/microsoft/vscode/issues), or browse [existing issues](https://github.com/microsoft/vscode/issues?q=state%3Aopen%20label%3A%22agents-window%22).

## Prerequisites

* Visual Studio Code installed. [Download VS Code](/download).
* Access to GitHub Copilot. Follow the steps in [Set up GitHub Copilot in VS Code](/docs/copilot/setup.md) to sign in and activate your subscription.

## Code-first vs. agent-first

There are different ways to work with AI in your development process, and the right approach depends on your preferences and the task at hand. There are two primary ways to work with AI in VS Code to support different workflows:

* **Code-first**: you write code in the editor and use AI as a coding assistant to help you implement features, fix bugs, and refactor code. Your primary interface is the editor for reviewing and editing code, testing, and debugging. You use AI to **enhance your existing coding workflow**.

* **Agent-first** or **Task-first**: you describe (high-level) tasks and requirements in chat and hand them to an AI agent. The agent plans, implements, and verifies the result. Your primary interface is chat and the sessions list for organizing work, while the editor is a secondary interface for reviewing and tweaking the AI's implementation when necessary. You use AI to shift how you work and **focus on defining the problem and reviewing solutions**.

The Agents window is built for the agent-first approach, natively in VS Code. It provides a focused environment for managing agent sessions across all your projects, with chat as the central interface for interacting with your agents. The Agents window complements the main VS Code window, which is optimized for the code-first approach.

Both surfaces share sessions and VS Code configuration like settings and keybindings, so you don't have to commit to only one or the other. Use the editor window when you want full-featured editing, debugging, notebooks, the extension ecosystem, and remote development, with AI assisting your coding. Use the Agents window when you want to think in prompts, orchestrate work across multiple projects, and keep AI customizations (like plugins, skills, and MCP) front and center.

## Open the Agents window

The Agents window opens as a dedicated VS Code window alongside your main editor window. To open the Agents window, use one of the following methods:

* In VS Code, select the **Open in Agents** button in the title bar, or run **Chat: Open Agents Window** from the Command Palette (`kb(workbench.action.showCommands)`).

    You can also open the Agents window directly from the VS Code welcome page.

    ![Screenshot showing how to open the Agents window from the Open in Agents button in the title bar and from the Welcome page.](../images/agents-window/vscode-open-in-agents.png)

* Run `code --agents` from the command line.

The Agents window requires GitHub authentication to access your Copilot subscription and sessions. If you're already signed in to GitHub in VS Code, you'll also be signed in when the Agents window opens.

If you prefer to stay in the editor window full-time, you can hide the **Open in Agents** button by right-clicking it in the title bar and selecting **Hide 'Open in Agents'**. You can still open the Agents window at any time from the Command Palette or command line.

## Interface overview

The Agents window picks up your existing Copilot CLI, Cloud, and Claude agent sessions across your workspaces. You can switch between agent sessions across the different workspaces without needing to open each workspace in a separate window.

The Agents window has the following main areas:

1. **Sessions list**: in the sidebar, where you can view and manage all your sessions across workspaces. By default, sessions are grouped by workspace. Right-click a session to see more commands, such as renaming, marking as done, pinning, and more.

1. **Customizations panel**: below the sessions list, where you can access your agent customizations to tailor the agent behavior to your workflow and preferences.

1. **Chat area**: in the center, where you see the chat conversation history and where you can interact with the agent through prompts.

1. **Changes panel**: on the right, where you can review file changes and other artifacts generated by your agent during a session, and view a file explorer of the workspace.

![Screenshot of the Agents window interface, showing the sessions list, customizations panel, chat area, and changes panel.](../images/agents-window/agents-window-ui-annotated.png)

## Start an agent session

The Agents window and the main VS Code window share the same underlying agent sessions (Copilot CLI, Copilot cloud, and Claude agent). This means that any session you start in the Agents window is immediately available in the main VS Code window.

To start a new agent session in the Agents window:

1. Select **New** at the top of the sidebar or press `kb(workbench.action.chat.newChat)`.

    ![Screenshot showing how to start a new agent session by selecting New at the top of the sidebar in the Agents window.](../images/agents-window/agents-window-new-session.png)

1. Use the workspace dropdown to select a local folder or GitHub repository for your chat session.

    You can directly start a session scoped to a specific workspace by hovering over a workspace in the sessions list and selecting **+** (New Session).

    If the folder or repository you select isn't trusted yet, you'll be [prompted to trust](#trust-a-folder) it before you can start a session.

    > [!TIP]
    > You can track and create sessions that run on a remote machine via SSH or a dev tunnel. See [Open a session on a remote machine](#open-a-session-on-a-remote-machine) for more information.

1. After selecting the workspace, choose the agent for the session from the dropdown.

    ![Screenshot showing how to select the agent type from the dropdown after selecting a workspace when starting a new agent session in the Agents window.](../images/agents-window/agents-window-agent-dropdown.png)

    The available agent types are determined by the type of workspace you select:

    * **Folder**: choose between the Copilot CLI or Claude agent to start a new session. You can select **Continue In** to hand off the session to a Copilot Cloud agent at any time during the session.
    * **Repository**: sessions started in a GitHub repository use the Copilot cloud agent.

1. For Copilot CLI sessions, choose between folder and worktree [isolation](/docs/copilot/agents/copilot-cli.md#isolation-modes) for the session.

    * **Worktree isolation**: the agent operates in a separate folder backed by a [Git worktree](/docs/sourcecontrol/branches-worktrees.md), which keeps changes isolated from your main workspace until you're ready to merge them.
    * **Folder isolation**: the agent operates in your main workspace, and changes are applied directly to your files. This is the default behavior for non-Git projects.

    Optionally, select a source control branch to base the session on.

    ![Screenshot showing how to select folder or worktree isolation and optionally choose a source control branch when starting a new agent session in the Agents window.](../images/agents-window/agents-window-isolation-branch.png)

1. Optionally, select a custom agent and language model for the session. You can change these at any point during the session.

1. Type a prompt that describes what you want to accomplish, and press `kbstyle(Enter)`.

    The agent breaks down your task into steps, writes code, runs commands, and self-corrects when something goes wrong. Continue the conversation to refine the results or change direction.

## Manage and review file changes

The Changes panel in the Agents window provides a dedicated view with detailed information about the files and agent edits made during a session. The Changes panel is split into two main tabs:

* **Files tab**: a file explorer view of all files in the workspace.
* **Changes tab**: a list of files that have been changed, added, or deleted by the agent. Select the **Branch Changes** dropdown to choose which changes to view.

To review changes made by the agent, select a file in the **Changes** tab to open a diff view that shows the edits the agent has made compared to the current state of the workspace.

![Screenshot showing the diff view in a modal window in the Agents window, with the layout controls in the diff view toolbar visible.](../images/agents-window/agents-window-diff-view.png)

You can open the diff view side-by-side with the Chat view inside the Agents window or open it in a modal window to focus on the changes. Use the layout controls in the diff view toolbar to toggle between different display modes.

While reviewing the changes in the diff view, click inside an edit and then select **Add Feedback** to enter a feedback comment directly in the file and signal the agent to make adjustments.

![Screenshot showing how to add feedback from the diff view in the Agents window, with the Add Feedback button visible in the toolbar.](../images/agents-window/agents-window-add-feedback.png)

After reviewing the changes, the Changes panel provides the following options to act on the edits made by the agent:

* **Commit**: when using folder isolation, commit the changes made by the agent directly to your workspace.
* **Merge**: when using worktree isolation, merge (and optionally sync upstream) and create a pull request.
* **Checkout**: for Copilot Cloud sessions, check out the branch associated with the session's pull request locally to review or request further edits.
* **Discard**: discard one or more edits directly from the Changes panel if you don't want to keep them.

![Screenshot showing the Changes panel in the Agents window, with the Files and Changes views visible.](../images/agents-window/agents-window-changes.png)

When you create a new session, the **Files** panel includes a sync button that lets you pull in upstream changes from the base branch before the agent gets to work. This helps the agent start from the latest state of your branch and reduces the chance of merge conflicts when you bring its changes back.

## Validate agent changes locally

In addition to reviewing changes in the Changes panel, you can also validate the edits made by the agent locally before committing or merging them. The Agents window supports running tasks and commands in the context of the current session. For example, you can run a build or tests to ensure that the changes made by the agent do not break your project, or start a development server to verify that the edits behave as expected in a running environment.

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

If your application involves browser-based behavior, you can use the [integrated browser](/docs/debugtest/integrated-browser.md) in the Agents window. Select a `localhost` link from the chat session to open it in the integrated browser inside the Agents window. The browser tab will persist across session switches, so if you open another session, the browser tab will open to the same page you had open previously and preserve the state of that page.

![Screenshot showing the integrated browser open in the Agents window, displaying a localhost page that was opened from a link in the chat session.](../images/agents-window/agents-window-integrated-browser.png)

Alternatively, you can also select a `localhost` link from the integrated terminal or open the integrated browser with the **Open Integrated Browser** command from the Command Palette (`kb(workbench.action.showCommands)`). You can use the layout controls in the integrated browser to show it as a modal window or embedded in the Agents window layout alongside other views.

If you want to run terminal commands in the context of the current session, select the **Open Terminal** icon in the title bar to open an integrated terminal with its current working directory set to the session's folder or worktree.

## Open a session on a remote machine

You can connect to a remote machine to start a session there or track the progress of an existing session running on that machine. This is useful when you're away from your main development machine but still want to check in on your agent's work, or to take advantage of the remote machine's resources, such as specialized hardware or a specific environment configuration.

The Agents window connects to the remote machine using the Agent Host Protocol (AHP) over SSH or a dev tunnel. When you connect, the Agents window automatically installs and starts the Copilot CLI on the remote machine. This also means that the remote machine must be powered on and accessible over the network.

> [!TIP]
> You can also connect to a remote machine from the browser-based Agents window in VS Code for the Web by using a dev tunnel connection at <https://insiders.vscode.dev/agents>.

### Connect via SSH

**Prerequisite**: the remote machine must be accessible over SSH. No extra agent installation is needed on the remote machine.

To start a session on a remote machine via SSH:

1. Select **New** or press `kb(workbench.action.chat.newChat)` to start a new agent session.

1. In the workspace dropdown, select the **Remote** tab, and then select **SSH**. If you've already set up SSH connections, they will appear as options in the dropdown.

    ![Screenshot showing how to select SSH in the workspace dropdown when starting a new agent session in the Agents window.](../images/agents-window/agents-window-remote.png)

1. Enter the SSH connection string for the remote machine (for example, `user@hostname`).

1. Select the folder on the remote machine to use for the session.

1. Type a prompt and press `kbstyle(Enter)` to start the session.

### Connect via dev tunnel

**Prerequisite**: a dev tunnel is already running on the remote machine. See [Developing with Remote Tunnels](/docs/remote/tunnels.md) for setup instructions.

To start a session on a remote machine via dev tunnel:

1. Select **New** or press `kb(workbench.action.chat.newChat)` to start a new agent session.

1. In the workspace dropdown, select the **Remote** tab, and then select **Tunnels** and choose your account type.

    ![Screenshot showing how to select Tunnels in the workspace dropdown when starting a new agent session in the Agents window.](../images/agents-window/agents-window-remote.png)

1. Choose the active dev tunnel from the list.

1. Select the folder on the remote machine to use for the session.

1. Type a prompt and press `kbstyle(Enter)` to start the session.

## Create a sub-session

When you have an active session, you can start a sub-session to give the agent a separate, parallel task within the same workspace. A sub-session shares the same workspace and worktree as the parent session, but starts with a blank chat. The sub-session doesn't carry over the parent's conversation history.

This is useful when you want to work on an independent task in the same project without interrupting the ongoing session or starting a completely new one from scratch.

To create a sub-session:

1. In an active session, select **New Sub-Session** (`+`) in the window title bar.

    Notice that a new tab appears in the chat area for the sub-session, alongside the tab for the parent session. The sub-session does not appear as a separate item in the sessions list.

    ![Screenshot showing how a new sub-session tab appears in the chat area alongside the parent session tab in the Agents window.](../images/agents-window/agents-window-new-subsession.png)

1. Type a prompt and press `kbstyle(Enter)` to start the sub-session.

> [!TIP]
> To explore an alternative direction from a specific point in a session's conversation, [fork the session](/docs/copilot/chat/chat-sessions.md#fork-a-chat-session). Forking a session creates a new independent session with a copy of the conversation history up to a specific point.

## Manage your sessions

The sessions list in the sidebar shows all your active sessions across workspaces. You can group sessions by project or by timeframe to keep track of related work. Each session item surfaces the key information such as session name, workspace, agent type, and file change stats.

Use the filter and search options to narrow down the list and find the session you want to work on.

Select any session to view the chat conversation history and pick up where you left off. The Changes panel surfaces the latest file updates from the agent and a file explorer view of the workspace.

![Screenshot showing the sessions list in the sidebar in the Agents window.](../images/agents-window/agents-window-session-list.png)

Right-click on any session in the list to see additional management options, such as renaming, deleting, and more. For advanced session management, such as archiving, forking, checkpoints, and exporting, see [Manage chat sessions](/docs/copilot/chat/chat-sessions.md) in chat documentation.

> [!TIP]
> Use the arrow buttons in the top-left of the title bar to navigate between recent sessions without leaving the window.

## Customize agents for your project and workflow

The **Customizations** panel gives you direct access to all AI customization options:

| Customization | What it does |
|---|---|
| **Agents** | Define custom agent personas with specific tools and instructions. [Learn more](/docs/copilot/customization/custom-agents.md). |
| **Skills** | Add portable instruction folders that agents load when relevant. [Learn more](/docs/copilot/customization/agent-skills.md). |
| **Instructions** | Set guidelines that shape how the AI generates code. [Learn more](/docs/copilot/customization/custom-instructions.md). |
| **Hooks** | Run shell commands at lifecycle points during agent sessions. [Learn more](/docs/copilot/customization/hooks.md). |
| **MCP Servers** | Connect AI to external tools and services via the MCP standard. [Learn more](/docs/copilot/customization/mcp-servers.md). |
| **Plugins** | Install prepackaged bundles of customizations. [Learn more](/docs/copilot/customization/agent-plugins.md). |

The Agent Customizations panel enables you to easily manage all your customizations in one place:

* View and edit existing customizations for the project (workspace), or across all your projects (user).
* Add new customzations by using the built-in editor or by generating them from a prompt.
* Install plugins or MCP servers from the marketplace.
* Enable or disable customizations without removing them.

Use the dropdown in the top left of the Agent Customizations panel to choose which agent the customizations should apply to.

![Screenshot showing the Agent Customizations panel in the Agents window, with the list of available customizations visible.](../images/agents-window/agents-window-customizations.png)

## Trust a folder

When you first open a new folder or repository in the Agents window, you're prompted to trust the folder and its subfolders. Folder trust is a security measure that prevents agents from running in untrusted folders, which could result in malicious code being executed on your machine.

If you choose not to trust the folder, you can't start or continue agent sessions for that folder in the Agents window.

![Screenshot of the folder trust prompt in the Agents window, asking the user to trust the folder before starting an agent session.](../images/agents-window/agents-window-folder-trust.png)

The Agents window shares the same workspace trust state with the main VS Code window. If you trust a folder in VS Code, it is also trusted in the Agents window, and vice versa. Learn more about workspace trust in the [Workspace Trust documentation](/docs/editing/workspaces/workspace-trust.md).

## Switch to another GitHub account

To use a different GitHub account in the Agents window, select the account icon in the top right corner of the window and choose **Sign out**. After signing out, select **Sign in** to authenticate with a different GitHub account.

## Configure settings for the Agents window

The Agents window shares all of your VS Code settings, so the configuration you've already invested in carries over automatically. When you want different behavior in the Agents window than in the editor window, you can override specific settings just for the Agents window without affecting your main VS Code setup.

To override a setting for the Agents window only, edit your settings file and scope the value under the Agents window section. Open the Settings editor (`kb(workbench.action.openSettings)`) from the Agents window to see which scope a setting applies to.

## Use VS Code extensions in the Agents window

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

* The agent can't directly open the integrated browser for you for now. You can start the integrated browser from the Command Palette (**Browser: Open Integrated Browser**) or by selecting a `localhost` link in the Agents window.

* The Agents window currently only supports the following agent types: Copilot CLI, Copilot Cloud, and Claude agent. To use local or other third-party agents, manage your sessions from the main VS Code window.

* Copilot Cloud sessions are only supported for GitHub-backed repositories. For non-GitHub projects, you can still use Copilot CLI in the Agents window.

* The agents dropdown currently doesn't have the plan agent. You can still use the `/plan` command in a Copilot CLI or Claude agent session. In Copilot CLI sessions, the plan agent is also automatically invoked when you refer ask for creating a plan in your prompt.

* Sub-sessions are currently not yet supported for Claude agent sessions.

* Multi-root sessions are not yet supported in the Agents window. You can ask the agent to work across projects in a single session.

## Frequently asked questions

<details>
<summary>When should I use the Agents window?</summary>

Use the Agents window when you want a streamlined, agent-first workflow inside VS Code. It provides a focused interface built around orchestrating agents end-to-end (validation, review, PRs) across multiple projects, with agent customization (plugins, skills, MCP) front and center.

Use the main VS Code window when you want the full-featured editor with debugging, notebooks, the extension ecosystem, and remote development, where AI assists your coding rather than being the central experience.

Both surfaces support agentic development: the Agents window is purpose-built for it, while the main VS Code window offers it alongside everything else.

</details>

<details>
<summary>Can I continue sessions started in the main VS Code window in the Agents window?</summary>

Yes, sessions started in the main VS Code window with supported agent types (Copilot CLI, Copilot Cloud, and Claude agent) automatically appear in the Agents window. You can switch between the two surfaces without losing any session history or context.

</details>

<details>
<summary>Can I use the Agents window with local or third-party CLI agents?</summary>

The Agents window currently only supports sessions with Copilot CLI, Copilot Cloud, and Claude agent. If you use local or third-party CLI agents, you can still manage those sessions from the main VS Code window, but they won't yet appear in the Agents window.

</details>

<details>
<summary>Why are changes from a Copilot CLI session not applied in my main workspace?</summary>

By default, Copilot CLI sessions from the Agents window are created with Git worktree isolation. This means that the agent operates in a separate folder created by Git worktree, which keeps changes isolated from your main workspace until you're ready to merge them. This allows you to review and test the agent's changes before integrating them into your main codebase.

You can merge the worktree from the Agents window back into your main workspace or create a pull request to review the changes.

</details>

<details>
<summary>How do I install and update the Agents window?</summary>

The Agents window is built into VS Code Insiders and updates alongside it. No additional installation or setup is needed.

</details>

<details>
<summary>Can I use the integrated browser in the Agents window?</summary>

Yes. You can access the integrated browser via the run menu in the top right of the Agents window, run the command **Browser: Open Integrated Browser**, or select a `localhost` link in the Agents window to open the integrated browser.

</details>

## Next steps

* [Manage chat sessions](/docs/copilot/chat/chat-sessions.md) - checkpoints, forking, archiving, and exporting sessions.
* [Using agents](/docs/copilot/agents/overview.md) - agent types, delegation, and autonomy levels.
* [Customize AI](/docs/copilot/customization/overview.md) - full customization reference.
* [Best practices](/docs/copilot/best-practices.md) - tips for effective prompting.
