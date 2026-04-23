---
ContentId: b3e7a1d4-5f2c-4e9a-8b6d-1c0f3a2e5d47
DateApproved: 3/25/2026
MetaDescription: Use the standalone VS Code Agents application for an agent-first coding experience where agents and chat are the primary interface to build with AI.
MetaSocialImage: images/shared/github-copilot-social.png
---
# Use the VS Code Agents application

The VS Code Agents application is a dedicated application for building software with AI agents through a an agent-first approach. You focus on describing tasks to be done and monitoring progress, while agents handle the implementation. Work on a single task at a time, or run multiple sessions in parallel across CLI and cloud agents to tackle several tasks at once. The Agents application gives you a central place to coordinate all of that activity.

The Agents application is installed together with VS Code and runs as a separate instance that shares your sessions with the main VS Code window. You can switch between the two interfaces at any time, using the one that best fits your current workflow. For example, you might use the Agents application to manage multiple agent sessions across projects, while using the main VS Code window for focused coding and debugging in a specific project.

<!-- TODO: screenshot of the Agents application after launch -->
![Screenshot of the Agents application after launch.](images/agents-app/sessions-window.png)

> [!NOTE]
> The Agents application is currently in preview.

## Code-first vs. agent-first

There are two ways to work with AI in VS Code:

* **Code-first**: you write code in the editor and use AI as a coding assistant to help you implement features, fix bugs, and refactor code. Your primary interface is the editor for writing and editing code, running and debugging. You use AI to enhance your existing coding workflow.

* **Agent-first**: you describe what you want in terms of requirements and hand off the task to an AI agent, which plans, implements, and verifies the result. Your primary interface is chat and the sessions list for managing your work, while the editor is a secondary interface for reviewing and tweaking the AI's implementation when necessary. You use AI to shift how you work and focus more on defining the problem and reviewing solutions.

The Agents application is built for the agent-first approach. It provides a focused environment for managing agent sessions across all your projects, with chat as the central interface for interacting with your agents, instead of focusing on editor tabs and file navigation.

## Prerequisites

The Agents application is installed together with VS Code or VS Code Insiders. It doesn't require a separate download or installation to access it.

* Visual Studio Code installed. [Download VS Code](/download).
* Access to GitHub Copilot. Follow the steps in [Set up GitHub Copilot in VS Code](/docs/copilot/setup.md) to sign in and activate your subscription.

## Start the Agents application

The Agents application is a separate application that runs alongside your main VS Code window. You can access it directly without starting VS Code, via the command-line, or from within VS Code. You can switch between the Agents application and your main VS Code window at any time, depending on your workflow and the task at hand.

1. Open the Agents application using one of these methods:

    * On Windows or Mac, you can open the Agents application directly from your Start menu or Applications folder by launching **Agents** (or **Agents - Insiders** for the Insiders version).

        > [!NOTE]
        > The option to launch the Agents application from the OS is currently not available on Linux. You can still access the Agents application on Linux through the command line or from within VS Code.

    * In VS Code, run **Chat: Open Agents Application** from the Command Palette (`kb(workbench.action.showCommands)`).

    * From the command line, run `code --agents`.

1. After first launch, sign in to GitHub if you haven't already. The Agents application requires GitHub authentication to access your Copilot subscription and sessions.

    ![Screenshot of the GitHub sign-in screen in the Agents application.](images/agents-app/sign-in.png)

The Agents application picks up your existing Copilot CLI and Cloud agent sessions across your workspaces, so you can switch between the Agents application and your main VS Code window without losing any session history or context. If you start a new session in the Agents application, it will also appear in your main VS Code window.

## Interface overview

The Sessions Window has the following main areas:

1. **Sessions list**: in the sidebar, where you can view and manage all your sessions across workspaces.

1. **Customizations panel**: on the left, where you can start new sessions, monitor and manage existing sessions, and customize your AI setup.

1. **Chat area**: in the center, where you interact with your AI agent through chat during a session.

1. **Changes panel**: on the right, where you can review file updates and other artifacts generated by your agent during a session.

## Start an agent session

With the Agents application, you can start agent sessions across all your projects without needing to open each project in a separate VS Code window. This simplifies working with multiple sessions for different tasks and projects, and gives you a central place to monitor and manage all your agent activity.

To start a new agent session:

1. Select **+ Session** at the top of the sidebar or hover over a workspace in the sessions list and select **+** to start a session scoped to that workspace.

1. Use the workspace dropdown to select a local folder or GitHub repository for the session.

    All new sessions use the Copilot CLI agent. You can use **Continue In** to hand off to a Copilot Cloud agent at any time during the session.

1. Choose between workspace and worktree [isolation](/docs/copilot/agents/copilot-cli.md#isolation-modes) for the session.

    With **worktree isolation**, the agent operates in a separate folder created by Git worktree, which keeps changes isolated from your main workspace until you're ready to merge them.

    With **workspace isolation**, the agent operates directly in your main workspace, and changes are applied directly to your files. This is the default behavior for non-Git projects.

1. Optionally, select a custom agent and language model for the session. You can change these at any time during the session.

1. Type a prompt that describes what you want to accomplish, and press `kbstyle(Enter)`.

    The agent breaks your task into steps, writes code, runs commands, and self-corrects when something goes wrong. Continue the conversation to refine the results or change direction.

> [!TIP]
> To run a session on a remote machine via SSH or dev tunnel, see [Open a session on a remote machine](#open-a-session-on-a-remote-machine). This is useful when you need to check the agent's work or start a new session while you're away from your main development machine.

<!-- TODO: screenshot or video of a session in progress -->

## Open a session on a remote machine


You can connect to a remote machine to start a session there or track the progress of an existing session running on that machine. This is useful when you're away from your main development machine but still want to check in on your agent's work, or to take advantage of the remote machine's resources, such as specialized hardware or a specific environment configuration.

The Agents application connects to the remote machine using the Agent Host Protocol (AHP) over SSH or a dev tunnel. When you connect, the application automatically installs and starts the Copilot CLI on the remote machine. This also means that the remote machine must be powered on and accessible over the network.

> [!NOTE]
> You can also connect to a remote machine from the browser-based version of the Agents application by using a dev tunnel connection.

<!-- TODO: screenshot of the remote machine connection dialog -->

### Connect via SSH

**Prerequisite**: the remote machine must be accessible over SSH. No extra agent installation is needed on the remote machine.

To start a session on a remote machine via SSH:

1. Select **+ Session** to start a new session.

1. In the workspace dropdown, select **SSH**. If you've already set up SSH connections, they will appear as options in the dropdown.

1. Enter the SSH connection string for the remote machine (for example, `user@hostname`).

1. Select the folder on the remote machine to use for the session.

1. Type a prompt and press `kbstyle(Enter)` to start the session.

### Connect via dev tunnel

**Prerequisites**:

* A dev tunnel is already running on the remote machine. See [Developing with Remote Tunnels](/docs/remote/tunnels.md) for setup instructions.

To start a session on a remote machine via dev tunnel:

1. Select **+ Session** to start a new session.

1. In the workspace dropdown, select **Tunnels** and choose your account type.

1. Choose the active dev tunnel from the list.

1. Select the folder on the remote machine to use for the session.

1. Type a prompt and press `kbstyle(Enter)` to start the session.

<!-- TODO: explain difference with /remote in Copilot CLI session -->

## Monitor and resume sessions

The sessions list in the sidebar shows all your active sessions across workspaces. You can group sessions by project or by timeframe to keep track of related work. Each session item surfaces the key information such as session name, workspace, agent type, and file change stats.

Use the filter and search options to narrow down the list and find the session you want to work on.

Select any session to view its chat history, where you can continue the conversation. If the session has code changes, the changes panel is opened and shows the pending changes and a file explorer.

<!-- TODO: screenshot of the sessions list and changes panel -->

Right-click on any session in the list to see additional management options, such as renaming, deleting, and more. For advanced session management, such as archiving, forking, checkpoints, and exporting, see [Manage chat sessions](/docs/copilot/chat/chat-sessions.md) in chat documentation.

## Manage file changes

As agents complete their work, you may want to review the actual changes more closely: diffs, edits, and pull requests.

The Changes panel gives you a full overview of all changes across the session. Run a code review, view all changes or just the last turn's changes, or discard individual files you don't want. You can also switch to the Files tab to browse the project's full file tree.

You can click on any file in the agent's chat response to open a modal diff view - see exactly what changed, make edits inline, and save them back. If something's off, select specific lines in a file, leave a comment, and the agent picks up your feedback and adjusts.

When it's time to ship, the Merge Changes dropdown lets you merge to your branch, merge and sync upstream, and create or draft a pull request. PR checks surface right in the panel so you can track CI status without leaving Agents. For non-git folders, you can initialize a repository right from the panel. Under the hood, these actions are powered by built-in [skills](/docs/copilot/customization/agent-skills) like commit, create-pr, merge-changes, and sync-upstream, which you can review and customize from the Customizations panel.

## Customize agents for your project and workflow

The **Customizations** panel gives you direct access to all AI customization options. Each item shows a count badge when configurations exist in your workspace.

| Customization | What it does |
|---|---|
| **Agents** | Define custom agent personas with specific tools and instructions. [Learn more](/docs/copilot/customization/custom-agents.md). |
| **Skills** | Add portable instruction folders that agents load when relevant. [Learn more](/docs/copilot/customization/agent-skills.md). |
| **Instructions** | Set guidelines that shape how the AI generates code. [Learn more](/docs/copilot/customization/custom-instructions.md). |
| **Prompts** | Create reusable prompt files for common tasks. [Learn more](/docs/copilot/customization/prompt-files.md). |
| **Hooks** | Run shell commands at lifecycle points during agent sessions. [Learn more](/docs/copilot/customization/hooks.md). |
| **MCP Servers** | Connect AI to external tools and services via the MCP standard. [Learn more](/docs/copilot/customization/mcp-servers.md). |
| **Plugins** | Install prepackaged bundles of customizations. [Learn more](/docs/copilot/customization/agent-plugins.md). |

Select any item to view its configurations. Create new items or edit existing ones with the built-in inline editor. Browse the marketplace to discover and install MCP servers and plugins. Enable or disable individual configurations without removing them.

<!-- TODO: screenshot of the Customizations panel -->

## Reviewing changes

TODO

mention that you can comment inside the diff view and the agent will pick up those comments and adjust accordingly.

## Merging changes and creating pull requests

TODO

## Switch to another GitHub account

TODO

## Limitations

* You can start the integrated browser from the Command Palette or by selecting links. The agent can't open the integrated browser for you for now.

* Only supports sessions with Copilot CLI and Copilot Cloud agents. To use local or third-party CLI agents, manage your sessions from the main VS Code window.

* Copilot Cloud sessions in the Sessions are only supported for Git-backed repositories. For non-Git projects, you can still use Copilot CLI in the Agents application.

* By default, Copilot CLI sessions are started with Git worktree isolation. Enable the `setting(github.copilot.chat.cli.isolationOption.enabled)` setting to enable choosing between workspace and worktree isolation on session creation.

## Frequently asked questions

<details>
<summary>Can I continue sessions created in VS Code in the Agents app?</summary>

Yes, sessions created in the main VS Code window with supported agent types (Copilot CLI and Copilot Cloud) will automatically appear in the Agents app. You can switch between the two interfaces without losing any session history or context.

</details>

<details>
<summary>Can I use the Agents app with local or third-party CLI agents?</summary>

The Agents app currently only supports sessions with Copilot CLI and Copilot Cloud agents. If you use local or third-party CLI agents, you can still manage those sessions from the main VS Code window, but they won't yet appear in the Agents app.

</details>

<details>
<summary>Why are changes from a Copilot CLI session not applied in my main workspace?</summary>

By default, Copilot CLI sessions from the Agents app are created with Git worktree isolation. This means that the agent operates in a separate folder created by Git worktree, which keeps changes isolated from your main workspace until you're ready to merge them. This allows you to review and test the agent's changes before integrating them into your main codebase.

You can merge the worktree from the Agents app back into your main workspace or create a pull request to review the changes.

</details>

<details>
<summary>When would I use the Agents app instead of VS Code?</summary>

Use VS Code Agents when you want a streamlined, agent-first workflow. The Agents app provides a minimal interface built around orchestrating agents end-to-end (validation, review, PRs) across multiple projects, with agent customization (plugins, skills, MCP) front and center.

Use VS Code when you want the full-featured editor, with support for the extensive extension ecosystem, debugging, notebooks, remote development, where AI assists your coding rather than being the central experience.

Both experiences support agentic development: Agents is purpose-built for it, while VS Code offers it alongside everything else.

</details>

<details>
<summary>How do I install and update the Agents app?</summary>

The Agents app is installed and updated alongside VS Code, no additional installation or setup is needed.

</details>

<details>
<summary>Can I use the integrated browser in the Agents app?</summary>

Yes! You can run the command **Browser: Open Integrated Browser** in the Agents app, and you can enable the `setting(workbench.browser.openLocalhostLinks)` setting to automatically open localhost links in the integrated browser.

</details>

## Next steps

* [Manage chat sessions](/docs/copilot/chat/chat-sessions.md) - checkpoints, forking, archiving, and exporting sessions.
* [Using agents](/docs/copilot/agents/overview.md) - agent types, delegation, and autonomy levels.
* [Customize AI](/docs/copilot/customization/overview.md) - full customization reference.
* [Best practices](/docs/copilot/best-practices.md) - tips for effective prompting.
