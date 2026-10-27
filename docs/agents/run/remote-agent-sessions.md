---
ContentId: c7e2f4a1-8d3b-4a6e-9c5d-2f1b3e8a7d4c
DateApproved: 10/28/2026
MetaDescription: Connect to and manage agent sessions through GitHub Environments, SSH, or dev tunnels in {% data variables.product.prodname_vscode_shortname %}.
---
# Run and manage remote agent sessions

Continue agent work from another app or device while your workspace, tools, and running sessions stay on your development machine. Use GitHub Environments to make that machine available across supported {% data variables.product.prodname_copilot_short %} clients, or use SSH and dev tunnels to connect from {% data variables.product.prodname_vscode_shortname %}.

This guide helps you choose a connection, share a host, manage remote environments, and continue an existing remote session without starting over.

To prevent this client from connecting to remote agent hosts, turn off `setting(chat.remoteAgentHostsEnabled)`.

## Choose how to connect

Choose based on where you want to interact with the session and how you can reach its host:

| Connection | When to use it |
|------------|----------------|
| **[GitHub Environments (Preview)](#github-environments-preview)** | Register your machine for remote agent access from supported {% data variables.product.prodname_copilot_short %} clients, including {% data variables.product.prodname_vscode_shortname %}, the {% data variables.copilot.github_copilot_app %}, {% data variables.copilot.copilot_cli_short %}, GitHub.com, and GitHub Mobile. Available session types and actions vary by client. |
| **[SSH](#connect-via-ssh)** | Connect the {% data variables.copilot.agents_window %} to a remote host through SSH. |
| **[Dev tunnels](#connect-via-dev-tunnel)** | Connect from {% data variables.product.prodname_vscode_shortname %} or the [browser-based {% data variables.copilot.agents_window %}](#use-the-agents-window-in-the-browser) to a host through an authenticated tunnel. |

SSH and dev tunnels provide {% data variables.product.prodname_vscode_shortname %}-specific client-to-host access in these workflows. GitHub Environments provides machine registration for access across supported {% data variables.product.prodname_copilot_short %} surfaces, not just another {% data variables.product.prodname_vscode_shortname %} instance.

The files and development tools stay on the machine where the agent runs. Keep that machine powered on and reachable, and keep its agent host running. For a session hosted by desktop {% data variables.product.prodname_vscode_shortname %}, keep the application running.

Connecting doesn't move a local session or copy its workspace to another machine. To continue an existing remote session, connect to the host where it already runs. For managed compute that doesn't depend on keeping your own host online, use [cloud sandboxes (Experimental)](/docs/agents/run/cloud-sandbox-sessions.md).

## Manage remote environments (Experimental)

Use the Remote Environments editor in the {% data variables.copilot.agents_window %} to find and manage your remote machines in one place. The table groups known SSH hosts, dev tunnels, and WSL distributions on Windows. When [GitHub Environments](#github-environments-preview) is available and enabled, the **Environments** group also lists your registered machines, including offline ones. These are user-shared machines, not managed cloud sandboxes.

Remote environment management requires `setting(sessions.chat.experimental.environmentPicker)`, `setting(sessions.chat.experimental.environmentPickerManageRemotes)`, and `setting(chat.remoteAgentHostsEnabled)`. All three settings are on by default.

![Screen showing the Remote Environments editor in the Agents window.](../images/remote-agent-sessions/remote-environments-editor.png)

### Open remote environment management

Run **Agents: Manage Remote Environments** from the Command Palette (`kb(workbench.action.showCommands)`), or select **Manage Remote Environments** from the sessions list **More Actions** (`...`) menu.

If the experimental new-session composer layout is enabled (`setting(sessions.chat.experimental.newSessionComposerLayout)`), you can also open the editor from the **Environment** picker:

1. Create a new chat or session in the {% data variables.copilot.agents_window %}.

1. Open the **Environment** picker and select **Manage**.

    ![Screen showing the Environment picker and its Manage entry.](../images/remote-agent-sessions/environment-picker-manage.png)

### Find and organize remote machines

Use the table to search, connect, and organize your remote machines. Keep these behaviors in mind:

* Disconnecting doesn't stop running tasks. Refreshing discovers machines without connecting.

* Renaming or hiding a machine affects only this client. Hiding doesn't disconnect it or remove sessions. Leave a name empty to restore the default.

* **Delete** is available only for GitHub Environments. It removes the registration and disconnects this client without deleting files. The environment can reappear if its owning application registers it again.

## GitHub Environments (Preview)

GitHub Environments supports continuity across apps and devices: register your development machine with your {% data variables.product.prodname_github %} account, then access its supported agent sessions from another client. Registration doesn't provision a new machine or copy your code.

**Prerequisites**:

* Sign in to the host and connecting client with the same {% data variables.product.prodname_github %} account.


* Check your [organization's controls](/docs/enterprise/manage-ai-settings.md#control-github-environments-preview) if the option is managed or unavailable.

### Register your machine

On the machine that contains your workspace and runs the agent:

1. Open **Remote Connections** in the {% data variables.copilot.agents_window %} title bar or the editor's {% data variables.copilot.chat_view %} input area.

1. Select **GitHub Environments**. Selecting this method starts sharing the machine. Complete any sign-in or confirmation prompts.

1. Check the registered environment name in the menu. Select the name if you want to rename the environment so you can recognize it on another device.

<!-- TODO: Add a screenshot showing the Remote Connections menu with GitHub Environments selected and the registered environment name. -->

> [!IMPORTANT]
> Connected clients receive trusted-owner access to the host's sessions, tools, and workspace resources. Session actions are mirrored to {% data variables.product.prodname_github %} for catalog and history storage, and conversation content is not end-to-end encrypted. Review [remote connection security](/docs/agents/run/security.md#remote-connections-and-github-environments) before sharing a machine.

The `setting(chat.agentHost.remoteConnections)` setting records your preferred connection method. Changing the setting directly turns sharing off. To start sharing, select the method in **Remote Connections**.

### Connect from another client

In another desktop {% data variables.product.prodname_vscode_shortname %} instance:

1. Sign in with the same {% data variables.product.prodname_github %} account you used to register the host.

1. Open the Command Palette (`kb(workbench.action.showCommands)`) and run **Connect to Environment...**.

1. Select the registered machine. Use **Refresh Environments** in the picker if it hasn't appeared yet.

1. After connecting, [select the existing remote session](#continue-an-existing-remote-session).

<!-- TODO: Add a screenshot showing the Connect to Environment picker with a registered machine and its connection status. -->

For other supported {% data variables.product.prodname_copilot_short %} clients, use that client's environment connection controls. Registration makes the machine discoverable; it doesn't guarantee that every client supports the same harnesses, sessions, or actions.

On desktop {% data variables.product.prodname_vscode_shortname %}, discovering a machine doesn't connect to it for the first time. Connect explicitly. With `setting(chat.remoteAgentHostsAutoConnect)` on, previously connected online environments can reconnect for the same profile and account. Explicitly disconnecting suppresses automatic reconnection until you connect manually again.

### Disconnect or stop sharing

* **Disconnect a client** to end that client's connection. This doesn't stop the host or its running tasks.

* **Stop sharing the host** by opening **Remote Connections** on the host and selecting **Off**. This stops sharing without changing the preferred connection method.

* **Stop an agent task** in its session when you want to halt active work. Disconnecting or turning sharing off is not a task-cancellation action.

Keep the host awake, online, and its owning application or Agent Host running while you need remote access. Connecting to an offline registered machine doesn't start the host.

### Troubleshoot GitHub Environments

| Symptom | What to check |
|---------|---------------|
| GitHub Environments or the connection command is missing | Check Preview availability, `setting(chat.agentHost.githubEnvironments.enabled)`, `setting(chat.remoteAgentHostsEnabled)`, and organization policy. |
| The machine isn't listed | Confirm that sharing is on at the host and both clients use the same account. Refresh the environment picker. |
| The environment is offline or won't connect | Keep the host awake and online, with its application or Agent Host running. Registration alone doesn't keep the host running. |
| A session is missing | Check the connected host, supported session types, workspace group, and [sessions list filters](/docs/agents/run/sessions/manage-sessions.md#sessions-list). Starting a new session doesn't resume a missing one. |
| A transcript is visible but can't accept messages | Reconnect to the host. A cached transcript or [synced history](/docs/agents/run/sessions/session-history.md) is not a live connection. |

## Connect via SSH

**Prerequisite**: the remote machine must be accessible over SSH. {% data variables.product.prodname_vscode_shortname %} installs the required CLI on the remote machine when needed.

To connect to a remote machine via SSH:

1. Select **New** or press `kb(workbench.action.chat.newChat)`.

1. In the workspace dropdown, select the **Remote** tab, and then select **SSH**. If you've already set up SSH connections, they appear as options in the dropdown.

    ![Screenshot showing how to select SSH in the workspace dropdown when starting a new agent session in the {% data variables.copilot.agents_window %}.](../images/agents-window/agents-window-remote.png)

1. Enter the SSH connection string for the remote machine (for example, `user@hostname`).

After connecting, [open an existing remote session or start a new one](#continue-an-existing-remote-session).

## Connect via dev tunnel

**Prerequisite**: a dev tunnel is already running on the remote machine. See [Developing with Remote Tunnels](/docs/remote/tunnels.md) for setup instructions.

To connect to a remote machine via dev tunnel:

1. Select **New** or press `kb(workbench.action.chat.newChat)`.

1. In the workspace dropdown, select the **Remote** tab, and then select **Tunnels** and choose your account type.

    ![Screenshot showing how to select Tunnels in the workspace dropdown when starting a new agent session in the {% data variables.copilot.agents_window %}.](../images/agents-window/agents-window-remote.png)

1. Choose the active dev tunnel from the list.

After connecting, [open an existing remote session or start a new one](#continue-an-existing-remote-session).

> [!IMPORTANT]
> Ensure your dev tunnel requires authentication (GitHub or Microsoft account). If the tunnel allows anonymous access, anyone who discovers the URL can reach your machine and start agent sessions. This is especially dangerous when auto-approval modes are active, because unauthorized users can trigger AI-assisted command execution with your credentials. For more information, see [Security](/docs/agents/run/security.md).

## Continue an existing remote session

After connecting to the host, select the existing session from the {% data variables.copilot.agents_window %} [sessions list](/docs/agents/run/sessions/manage-sessions.md#sessions-list). Check the host, workspace group, and list filters if the session isn't visible.

For a separate task, select **New**, choose a folder on the connected remote machine, select an available harness, and enter a prompt. This starts a new conversation rather than continuing a session from your local machine.

## Use the {% data variables.copilot.agents_window %} in the browser

The {% data variables.copilot.agents_window %} is also available as a web client at <https://insiders.vscode.dev/agents>, so you can manage agent sessions from any device with a browser. This is useful when you're away from your main development machine, working from a mobile device, or want to check in on sessions running on a remote machine without installing {% data variables.product.prodname_vscode %} locally.

The browser acts only as a client for chatting, reviewing changes, and managing sessions. Agent sessions run on your development machine. Connect through a [dev tunnel](/docs/remote/tunnels.md), as described below, or use [GitHub Environments (Preview)](#github-environments-preview) for a registered machine. The browser doesn't connect directly over SSH.

### Set up a dev tunnel

To use the dev tunnel route, start a tunnel on the machine you want to connect to:

1. On your remote machine, run the following command to start a dev tunnel:

    ```bash
    code-insiders tunnel
    ```

    If you're using the stable release, run `code tunnel` instead.

    The first time you run this command, you're prompted to authenticate with your GitHub or Microsoft account. The tunnel requires authentication by default for security.

1. After the tunnel is running, open <https://insiders.vscode.dev/agents> in a browser on any device.

1. Sign in with **Continue with GitHub** when prompted. If you're already authenticated, the {% data variables.copilot.agents_window %} loads directly.

1. Your tunnel host appears in the hosts bar at the top of the window. Select it to connect.

1. Select an existing session from the sessions list to continue it. For a new task, choose a folder on the remote machine, select an agent, and enter a prompt.

### Host management

For dev tunnel connections, the hosts bar in the browser-based {% data variables.copilot.agents_window %} shows machines with configured tunnels. Each machine displays its connection status:

* **Online**: the host is reachable and you can start or continue sessions on it.
* **Offline**: the tunnel on the host is not running. Start the tunnel on the host to bring it back online.

You can connect and disconnect from machines directly through the hosts bar. If a machine goes offline while you have an active session, the session shows a disconnected state. When the machine comes back online, the session reconnects automatically.

## Start a chat without a workspace on a remote host

Use a chat without a workspace when a task needs the resources or environment of a remote host but doesn't need a repository. First, connect the host over SSH or a dev tunnel.

To start a chat without a workspace:

1. Select **New** or press `kb(workbench.action.chat.newChat)` to start a new agent session.

1. In the workspace picker, select the **Chat** entry for a connected remote host without choosing a folder. The entry identifies the host where the chat runs.

1. Choose an agent harness, enter your prompt, and press `kbstyle(Enter)`.

The main workspace picker also shows folders from connected remote hosts alongside local folders. Select a remote folder there when the task needs an existing workspace.

## Run a session in a remote Dev Container

`feature(agent-host-dev-containers)`

Run agents inside your remote project's Dev Container to use its configured tools and dependencies without installing them directly on the remote machine. Starting in {% data variables.product.prodname_vscode_shortname %} 1.139, this is supported for SSH, Tunnel, and WSL connections in the {% data variables.copilot.agents_window %}.

Dev Container support (`setting(chat.agentHost.devContainer.enabled)`) is on by default. Docker must be installed and running on the remote host, and the project must contain a [Dev Container configuration](/docs/devcontainers/create-dev-container.md).

To run a session in a remote Dev Container:

1. Connect over SSH, through a tunnel, or to WSL, and select the project folder in the workspace picker.

1. Expand the menu for the remote folder and select **Use Dev Container**.

    The workspace label gains the **- Dev Container** suffix.

1. Choose an available agent harness, configure the session, and enter your prompt.

The **Use Dev Container** option appears only when the source machine advertises Dev Container support. It isn't available for unsupported machines or for folders whose source is nested inside another remote environment. For more information about prerequisites, switching back to the source machine, and troubleshooting, see [Run a session in a Dev Container](/docs/agents/run/agents-window.md#run-a-session-in-a-dev-container).

<a name="delegate-work-to-remote-agent-hosts-experimental"></a>

## Delegate tasks to remote machines (Experimental)

In the {% data variables.copilot.agents_window %}, ask the agent to delegate a task to a connected remote machine. Turn on `setting(chat.remoteSessions.tools.enabled)` and connect the machines that the agent can use. You don't need to select the target machine in the workspace picker.

The remote delegation tools let an agent:

* Use `list_agent_hosts` to discover connected remote machines, available models, resource capacity, and session load.
* Use `create_remote_session` to start a session on a specific remote machine or choose a target automatically. For automatic placement, specify criteria such as Windows, Linux, or macOS, minimum memory, logical CPU count, and an optional model. Among matching machines, placement favors the machine with the fewest running sessions and pending session creations. If no connected machine meets all the criteria, the tool reports an error instead of selecting a nonmatching machine.
* Use `get_remote_session` to check a remote session's status and latest response.
* Use `send_remote_message` to send follow-up work or report results and questions to the exact originating chat. If that chat is busy, the message waits in its queue.

For repository work, specify an existing trusted folder on the target machine, either directly or in a new Git worktree. The tools don't clone or copy the coordinating session's workspace to the remote machine. If you don't specify a workspace, the remote session starts without one.

Normal approval requirements still apply to delegated work and messages. Review the selected host, folder, and worktree before you approve a tool call, especially when the agent uses automatic placement.

Keep the coordinating {% data variables.copilot.agents_window %} open and connected while delegated work runs so messages can flow between sessions. A remote session's final response isn't forwarded automatically. Ask the remote agent to use `send_remote_message` to report its result.

Turning off `setting(chat.remoteSessions.tools.enabled)` removes the remote delegation tools, but doesn't disconnect remote machines or stop remote sessions that are already running.

## Related resources

* [Use the {% data variables.copilot.agents_window %}](/docs/agents/run/agents-window.md) - agent-first workflows across multiple projects.
* [Developing with Remote Tunnels](/docs/remote/tunnels.md) - set up and manage dev tunnels.
* [Agent Host architecture](/docs/agents/concepts/agent-host.md) - technical details about remote connections and session execution.
